"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";

// `import type` only — erased at build time, so it pulls no runtime code.
//
// AuthProvider lives in the root layout, so anything it imports statically
// lands in the chunk every single page loads. Importing the Firebase Auth and
// Firestore SDKs here put ~570 KB of JavaScript in front of a static blog
// article that never touches an account: a blog page was shipping 1.17 MB of
// JS in total. The SDK is now pulled in with a dynamic import after mount, so
// it downloads in parallel with rendering instead of blocking it, and the
// initial bundle no longer carries it at all.
//
// /login, /dashboard and Aim Lab still import Firebase statically. That is
// correct — those routes cannot function without it, and the cost lands only
// on their own chunks.

export interface SavedProfile {
  id: string;
  name: string;
  sens: number;
  dpi: number;
  game: string;
  createdAt: string;
}

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
  /** Named, multi-entry sensitivity presets — separate from the single
   * "active" savedSettings above, which Aim Lab reads directly. */
  savedProfiles?: SavedProfile[];
  aimLabHistory?: {
    mode: string;
    score: number;
    accuracy: number;
    avgReaction: number;
    timestamp: string;
  }[];
  /** $1 one-time standalone unlock for Aim Lab only — separate from subscriptionStatus. */
  aimLabAccess?: boolean;
  aimLabPurchasedAt?: string;
  /** Viral Video Studio credits & GTA VI Day-One Promo Pack */
  videoCreditsGranted?: number;
  videoCreditsUsed?: number;
  videoCreditsPack?: string;
  gta6ProPack?: boolean;
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
    let cancelled = false;
    let unsubscribeAuth: (() => void) | undefined;

    (async () => {
      const [{ onAuthStateChanged }, { auth }] = await Promise.all([
        import("firebase/auth"),
        import("@/lib/firebase"),
      ]);
      if (cancelled) return;

      unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        if (!firebaseUser) {
          setUserData(null);
          setLoading(false);
        }
      });
    })().catch((error) => {
      // A blocked or failed SDK load must not leave the whole site stuck on a
      // loading state — every consumer treats `loading: false, user: null` as
      // "signed out", which is the correct fallback here.
      console.error("Auth failed to initialise:", error);
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      unsubscribeAuth?.();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    let unsubscribeDoc: (() => void) | undefined;

    (async () => {
      const [{ doc, onSnapshot }, { db }] = await Promise.all([
        import("firebase/firestore"),
        import("@/lib/firebase"),
      ]);
      if (cancelled) return;

      // Real-time listener on the user's Firestore document.
      unsubscribeDoc = onSnapshot(
        doc(db, "users", user.uid),
        (docSnap) => {
          setUserData(docSnap.exists() ? (docSnap.data() as UserData) : null);
          setLoading(false);
        },
        (error) => {
          console.error("Failed to read the user document:", error);
          setLoading(false);
        }
      );
    })().catch((error) => {
      console.error("Firestore failed to initialise:", error);
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      unsubscribeDoc?.();
    };
  }, [user]);

  const logout = async () => {
    const [{ signOut }, { auth }] = await Promise.all([
      import("firebase/auth"),
      import("@/lib/firebase"),
    ]);
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
