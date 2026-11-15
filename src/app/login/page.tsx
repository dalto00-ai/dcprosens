"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import styles from "./login.module.css"; // We will create this file next

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Se o usuário já estiver logado, redireciona diretamente para o dashboard
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'dcprosens.com') {
      window.location.replace('https://app.dcprosens.com/login/');
      return;
    }
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      
      // Cria o documento do usuário no Firestore caso não exista
      const userRef = doc(db, "users", loggedUser.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: loggedUser.uid,
          email: loggedUser.email,
          displayName: loggedUser.displayName || "Player",
          subscriptionStatus: "free", // Whop/Stripe controlará isto
          createdAt: new Date().toISOString(),
        });
        
        // Envia o e-mail de boas-vindas automático via Hostinger Agentic Mail API
        try {
          fetch("/api/welcome-email.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: loggedUser.email, name: loggedUser.displayName || "Player" })
          }).catch(() => {});
        } catch {}
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setError("Error logging in with Google: " + message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError("");

    try {
      if (isRegister) {
        // Cadastro
        if (!displayName.trim()) {
          setError("Please enter your username.");
          setAuthLoading(false);
          return;
        }
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = credential.user;

        // Salva documento do usuário no Firestore
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid,
          email: newUser.email,
          displayName: displayName,
          subscriptionStatus: "free",
          createdAt: new Date().toISOString(),
        });

        // Envia o e-mail de boas-vindas automático via Hostinger Agentic Mail API
        try {
          fetch("/api/welcome-email.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: newUser.email, name: displayName })
          }).catch(() => {});
        } catch {}
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      const code = err instanceof FirebaseError ? err.code : undefined;
      if (code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (code === "auth/wrong-password" || code === "auth/user-not-found" || code === "auth/invalid-credential") {
        setError("Incorrect email or password.");
      } else if (code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        const message = err instanceof Error ? err.message : String(err);
        setError("Error: " + message);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  if (loading || user) {
    return (
      <div className={styles.loadingContainer}>
        <h1 className={styles.title}>
          DC<span>PROSENS</span>
        </h1>
        <div className={styles.spinner}></div>
        <p>Verifying authentication...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        
        <h1 className={styles.title}>
          DC<span>PROSENS</span>
        </h1>
        <p className={styles.subtitle}>
          {isRegister 
            ? "Create your account to calibrate your aim and access premium tools." 
            : "Access your members area to view routines and saved configurations."}
        </p>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleEmailAuth} className={styles.form}>
          {isRegister && (
            <div className={styles.inputGroup}>
              <label htmlFor="display-name" className={styles.label}>Username</label>
              <input
                id="display-name"
                type="text"
                className={styles.input}
                placeholder="e.g. Demon1"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={authLoading} className={styles.submitBtn}>
            {authLoading ? "Processing..." : (isRegister ? "Register Account" : "Log In to Dashboard")}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button onClick={handleGoogleLogin} disabled={authLoading} className={styles.googleBtn}>
          <svg className={styles.googleIcon} viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign In with Google
        </button>

        <div className={styles.toggleText}>
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => setIsRegister(false)}>
                Log in
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button type="button" onClick={() => setIsRegister(true)}>
                Sign up now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
