// src/lib/dbHelpers.ts
import { ref, set, update, get } from "firebase/database";
import { database } from "./firebase";

export interface UserProfile {
  displayName: string | null;
  email: string;
  phone: string | null;
  countryCode: string | null;
  country?: string | null;
  address: {
    country?: string | null;
    state?: string;
    city?: string;
    street?: string;
  };
  gender: string | null;
  photoURL: string | null;
  provider: 'google' | 'email' | 'phone';
  createdAt: number;
}

export async function createUserProfile(uid: string, profileData: UserProfile): Promise<void> {
  const userRef = ref(database, `users/${uid}`);
  await set(userRef, profileData);
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  const userRef = ref(database, `users/${uid}`);
  await update(userRef, updates);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = ref(database, `users/${uid}`);
  const snapshot = await get(userRef);
  return snapshot.exists() ? snapshot.val() : null;
}

