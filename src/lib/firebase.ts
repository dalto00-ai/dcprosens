import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Credenciais reais geradas automaticamente para o projeto DCPROSENS
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCL_CGL53h9jol_KhNszjUBXL3hbrxuzyg",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dcprosens-saas.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dcprosens-saas",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dcprosens-saas.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "748253825721",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:748253825721:web:8738596a83422042c2e968"
};

// Evita re-inicializar o Firebase em desenvolvimento devido ao hot-reloading do Next.js
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
