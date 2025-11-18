'use client';

// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
import { auth, database } from "@/lib/firebase";
import { ref, set, onValue, update, off } from "firebase/database";
import { UserProfile, createUserProfile, updateUserProfile } from "@/lib/dbHelpers";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUpWithEmail: (data: {
    email: string;
    password: string;
    displayName?: string;
    phone?: string;
    countryCode?: string;
    address?: UserProfile['address'];
    gender?: string;
  }) => Promise<{ user: User }>;
  signInWithEmail: (email: string, password: string) => Promise<{ user: User }>;
  signInWithGoogle: () => Promise<{ user: User }>;
  signOutUser: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const profileRef = ref(database, `users/${u.uid}`);
        // Set loading to false initially, then update when profile loads
        setLoading(false);
        const handleProfileChange = (snapshot: any) => {
          try {
            const profileData = snapshot.exists() ? snapshot.val() : null;
            setProfile(profileData);
            setLoading(false);
          } catch (error) {
            console.error('Error processing profile data:', error);
            setProfile(null);
            setLoading(false);
          }
        };
        
        onValue(profileRef, handleProfileChange);
        unsubscribeProfile = () => {
          off(profileRef, 'value', handleProfileChange);
        };
      } else {
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  async function signUpWithEmail(data: {
    email: string;
    password: string;
    displayName?: string;
    phone?: string;
    countryCode?: string;
    address?: UserProfile['address'];
    gender?: string;
  }) {
    const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const uid = res.user.uid;
    const profileData: UserProfile = {
      displayName: data.displayName || null,
      email: data.email,
      phone: data.phone || null,
      countryCode: data.countryCode || null,
      country: data.address?.country || null,
      address: data.address || {},
      gender: data.gender || null,
      photoURL: null,
      provider: 'email',
      createdAt: Date.now()
    };
    await createUserProfile(uid, profileData);
    return { user: res.user };
  }

  async function signInWithEmail(email: string, password: string) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { user: res.user };
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    const u = res.user;
    
    // Check if profile exists, if not create it
    const profileRef = ref(database, `users/${u.uid}`);
    const snapshot = await import("firebase/database").then(m => m.get(profileRef));
    
    if (!snapshot.exists()) {
      const profileData: UserProfile = {
        displayName: u.displayName || "",
        email: u.email || "",
        phone: u.phoneNumber || null,
        countryCode: "",
        country: null,
        address: {},
        gender: "",
        photoURL: u.photoURL || "",
        provider: "google",
        createdAt: Date.now()
      };
      await createUserProfile(u.uid, profileData);
    } else {
      // Update existing profile with latest Google data if needed
      const existingProfile = snapshot.val() as UserProfile;
      if (existingProfile.provider === 'google') {
        await update(ref(database, `users/${u.uid}`), {
          displayName: u.displayName || existingProfile.displayName,
          email: u.email || existingProfile.email,
          photoURL: u.photoURL || existingProfile.photoURL,
        });
      }
    }
    
    return { user: res.user };
  }

  async function signOutUser() {
    await signOut(auth);
  }

  async function updateProfile(updates: Partial<UserProfile>) {
    if (!user) throw new Error("No user logged in");
    await updateUserProfile(user.uid, updates);
  }

  async function sendPasswordReset(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOutUser,
    updateProfile,
    sendPasswordReset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

