"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface UserData {
  uid?: string;
  email?: string;
  displayName?: string;
  subscriptionStatus?: string;
  subscriptionPlan?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  trialUsedAt?: string;
  discordUserId?: string;
  discordUsername?: string;
  savedSettings?: {
    sens: number;
    dpi: number;
    game: string;
  };
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      
      if (!firebaseUser) {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Escuta alterações em tempo real no documento do usuário no Firestore
    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data() as UserData);
      } else {
        setUserData(null);
      }
      setLoading(false);
    }, (error) => {
      console.error("Erro ao obter documento do usuário:", error);
      setLoading(false);
    });

    return () => unsubscribeDoc();
  }, [user]);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
