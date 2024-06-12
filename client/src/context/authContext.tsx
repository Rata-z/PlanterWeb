"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as signOutUser,
  onAuthStateChanged,
  User,
  UserCredential,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";

interface AuthContextTypes {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  continueWithGoogle: () => Promise<UserCredential>;
  sendVerificationLink: (user: User) => Promise<void>;
  sendResetLink: (email: string) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextTypes | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const continueWithGoogle = async () => {
    return await signInWithPopup(auth, provider);
  };

  const signUp = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const signOut = async () => {
    await signOutUser(auth);
    window.location.reload();
    return;
  };
  const sendResetLink = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
  };
  const sendVerificationLink = async (user: User) => {
    return await sendEmailVerification(user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const values = {
    currentUser,
    loading,
    signIn,
    signOut,
    signUp,
    sendResetLink,
    sendVerificationLink,
    continueWithGoogle,
  };
  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth is undefined");
  }
  return context;
}
