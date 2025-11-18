// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVrqHewmc62b4UlE37VJ-OmMJQ3Ewwf5o",
  authDomain: "ecx-website.firebaseapp.com",
  databaseURL: "https://ecx-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecx-website",
  storageBucket: "ecx-website.firebasestorage.app",
  messagingSenderId: "953629445154",
  appId: "1:953629445154:web:65d7a4bd555ee3d8de4e7b",
  measurementId: "G-X5EL3C9LK0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export default app;

