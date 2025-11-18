# Cursor IDE Task: Full Firebase Auth + Realtime DB Implementation (Signup, Login, Profile, UI & reCAPTCHA)

**Goal (single-step instructions for Cursor AI agent):**
Implement a production-ready Firebase Authentication system and Firebase Realtime Database integration for the existing website. Build separate pages for **Create Account**, **Login**, **Forgot Password**, and **Profile** (editable), add automatic login detection (global), integrate Google and Phone (SMS OTP) sign-in, add client-side reCAPTCHA for both create-account and login flows, and place `Create Account` / `Login` buttons in the header to the right of the existing Chatbot button (replace with a Profile icon when logged in). Persist every user’s profile under `/users/{uid}` in RTDB. Ensure every page is attractive and uses Tailwind + Framer Motion for polished interactions.

---

## High-level acceptance criteria

1. Navbar shows `Chatbot` then a gap then either `Create account` + `Login` (not logged in) or a rounded profile avatar (logged in) with dropdown (Profile, Logout). Buttons appear on the right side of Chatbot with visual gap.
2. Auth flows supported: Email+Password signup/login, Google Sign-In, Phone+OTP. All sign-ins result in a user entry in RTDB `/users/{uid}` with consistent fields.
3. Signup and Login pages execute Google reCAPTCHA Enterprise client-side and send the token to a server endpoint for verification before proceeding.
4. Profile page shows: displayName, email, phone (country code + number), address (country + optional fields), gender dropdown, profile picture upload. All fields editable and saved to RTDB and Storage for images.
5. Real-time sync: when a logged-in user revisits the site their profile fields auto-sync with RTDB and the navbar updates automatically.
6. UI: Tailwind + Framer Motion for micro-interactions. Pages must look modern and unique (not generic bootstrap). Use accessible form controls.
7. Security: Validate inputs, verify reCAPTCHA tokens on server, enable rules in RTDB that require auth for writing user profiles.

---

## Files to create/update (cursor agent should generate these exact files)

* `src/firebase.js` (initialize firebase: Auth, Realtime DB, Storage)
* `src/contexts/AuthContext.jsx` (React context: onAuthStateChanged, auth helpers)
* `src/components/Navbar.jsx` (header with Chatbot + gap + auth buttons/profile avatar)
* `src/pages/signup.jsx` (full create account form + grecaptcha.execute integration + backend POST to `/api/verify-recaptcha`)
* `src/pages/login.jsx` (email login + Google sign-in + phone OTP flows + recaptcha)
* `src/pages/forgot-password.jsx`
* `src/pages/profile.jsx` (editable profile, upload to Storage)
* `src/server/api/verify-recaptcha.js` (Node/Express or serverless endpoint to verify tokens using secret key)
* `src/utils/dbHelpers.js` (helpers to read/write profile into RTDB under `/users/{uid}`)
* `tailwind.config.js` and basic Tailwind setup (if not present)

---

## Important implementation details (exact behavior)

1. **Firebase config**: use the project config provided in the repo (do not hard-code a different project). Initialize `auth`, `database`, `storage` in `src/firebase.js` and export them.
2. **AuthContext**:

   * Expose `user`, `profile`, `loading`, `signUpWithEmail`, `signInWithEmail`, `signInWithGoogle`, `signInWithPhone`, `signOutUser`, `updateProfile`, `sendPasswordReset`.
   * Use `onAuthStateChanged` to set `user` and fetch `profile` from RTDB `onValue` so profile stays synchronized.
3. **RTDB structure (strict):**

   ```text
   /users
     /{uid}
       displayName: string
       email: string
       phone: string
       countryCode: string
       address:
         country
         state
         city
         street
       gender: string
       photoURL: string
       provider: 'google'|'email'|'phone'
       createdAt: timestamp
   ```
4. **Signup/login behavior**:

   * Call `grecaptcha.enterprise.execute(siteKey, {action:'SIGNUP'|'LOGIN'})` then POST token to `/api/verify-recaptcha`. If response OK create/sign-in user. Do reCAPTCHA check on server using secret.
   * For Phone sign-in use Firebase `RecaptchaVerifier` from `firebase/auth` for safety and `signInWithPhoneNumber` flow for OTP.
   * After signup, write profile to RTDB under `/users/{uid}`. If user created through Google, prefill fields from `user` (displayName, email, photoURL) and leave other fields blank for user to edit.
5. **Profile picture**: upload to `storage` under `profiles/{uid}/avatar.jpg`, then set `photoURL` in RTDB with `getDownloadURL`.
6. **Navbar behavior**: when `user == null` show `Create account` (primary) and `Login` (outline) to the right of Chatbot with a 12–16px gap; when logged show avatar inside a circle; clicking opens a dropdown with `View Profile`, `Settings` (optional), `Logout`.
7. **reCAPTCHA**: load `https://www.google.com/recaptcha/enterprise.js?render=<SITE_KEY>` in `_document` or `index.html`. Use enterprise `grecaptcha.enterprise.execute`. Implement server-side verification with secret and pass/fail check.

---

## Server endpoint example (cursor agent should create)

* `POST /api/verify-recaptcha` accepts `{token, action}`. It calls Google verify API with the secret key and returns `{success:true}` only when score and action acceptable. Use environment vars for the secret.

---

## Styling & UX notes (make it top-class)

* Use a split form layout for signup: left column for visual/design (illustration, subtle gradient, animated SVG), right column for form.
* Use large type for headings, soft shadows, glassmorphism panels, 2xl rounded corners, 16px gap spacing.
* Use Framer Motion micro-interactions for button hover, avatar dropdown, and page transitions.
* Use country dropdown library (or a curated list) for address country.

---

## Cursor execution checklist

1. Create files above; wire `AuthContext` into `_app.jsx` or the site root so auth state is global.
2. Add routes `/signup`, `/login`, `/forgot-password`, `/profile` and wire navigation in Navbar.
3. Add server endpoint `/api/verify-recaptcha` and test token verification using a provided secret (set via env var `RECAPTCHA_SECRET`).
4. Add RTDB security rules requiring `.write` under `/users/{uid}` to be authenticated `auth != null && auth.uid == $uid`.
5. Test flows: signup email, login email, Google login, phone OTP, forgot password, profile update, avatar upload, logout. Test profile auto-sync across tab refreshes.
6. Commit changes and open PR with screenshots of each page.

---

## Environment & secrets

* `FIREBASE_CONFIG` (project config already in repo or env)
* `RECAPTCHA_SITE_KEY` (client) and `RECAPTCHA_SECRET` (server)
* Ensure Firebase console: enable Email/Password, Google, Phone providers and Realtime Database

---

When implemented, run a quick acceptance checklist in the PR description describing results and any remaining TODOs.

---

If you need me to implement the React code files and server endpoints directly here, run the task and I'll provide full code for each file next.


Below I give a full, implementable plan and production-grade code snippets you can drop into your React site (or adapt for Next.js). It covers Firebase initialization, the Auth context (auto-login detection + sync), Navbar changes, Signup/Login/Forgot/OTP flows, Profile page, Firebase Realtime Database structure and storage for avatars, reCAPTCHA integration, server-side recaptcha verification example, and recommended UI/UX notes.

---

# Quick architecture & file map (what to add/update)

* `src/firebase.js` — Firebase initialization (Auth, Realtime DB, Storage).
* `src/contexts/AuthContext.jsx` — global auth state, onAuthStateChanged + profile sync.
* `src/components/Navbar.jsx` — Chatbot + gap + auth buttons / profile avatar + dropdown.
* `src/pages/signup.jsx` — Create account page (form + grecaptcha + phone support).
* `src/pages/login.jsx` — Login page (email, Google, phone OTP, recaptcha).
* `src/pages/forgot-password.jsx`
* `src/pages/profile.jsx` — editable profile, profile picture upload.
* `src/server/api/verify-recaptcha.js` — server endpoint to verify recaptcha tokens.
* `src/utils/dbHelpers.js` — helper functions to read/write `/users/{uid}`.
* Tailwind + Framer Motion recommended for polished UI.

---

# 1) `src/firebase.js`

```js
// src/firebase.js
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
```

> Note: If `storageBucket` or other fields differ in your real config, use the repo’s config.

---

# 2) AuthContext (global auto-detection + profile sync)

```jsx
// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  recapthcaVerifier,
  // phone functions handled where needed
} from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, set, onValue, update } from "firebase/database";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // firebase user
  const [profile, setProfile] = useState(null); // RTDB profile
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const profileRef = ref(database, `users/${u.uid}`);
        onValue(profileRef, (snap) => {
          setProfile(snap.val());
          setLoading(false);
        }, { onlyOnce: false });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  // create user by email
  async function signUpWithEmail(data) {
    // data = { email, password, displayName, phone, countryCode, address, gender }
    const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const uid = res.user.uid;
    const profileData = {
      displayName: data.displayName || null,
      email: data.email,
      phone: data.phone || null,
      countryCode: data.countryCode || null,
      address: data.address || {},
      gender: data.gender || null,
      photoURL: data.photoURL || null,
      provider: 'email',
      createdAt: Date.now()
    };
    await set(ref(database, `users/${uid}`), profileData);
    return res;
  }

  async function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    // Ensure RTDB entry exists
    const u = res.user;
    const userRef = ref(database, `users/${u.uid}`);
    await set(userRef, {
      displayName: u.displayName || "",
      email: u.email || "",
      phone: u.phoneNumber || "",
      countryCode: "",
      address: {},
      gender: "",
      photoURL: u.photoURL || "",
      provider: "google",
      createdAt: Date.now()
    });
    return res;
  }

  async function signOutUser() {
    await signOut(auth);
  }

  async function updateProfileData(uid, updates) {
    await update(ref(database, `users/${uid}`), updates);
  }

  const value = {
    user,
    profile,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOutUser,
    updateProfileData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

> This context automatically listens to auth state and streams RTDB `users/{uid}` for real-time sync.

---

# 3) Navbar (place buttons to the right of Chatbot, with a gap)

```jsx
// src/components/Navbar.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link"; // or react-router Link
import { Menu } from "@headlessui/react"; // optional

export default function Navbar() {
  const { user, profile, signOutUser } = useAuth();

  return (
    <header className="bg-black text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="logo flex items-center">
          {/* logo + site name */}
          <img src="/logo.svg" alt="logo" className="h-8 mr-2" />
          <span className="font-bold text-lg">EncryptArx</span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm items-center">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          {/* ... */}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Chatbot button */}
        <button className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-md">
          <svg className="h-4 w-4" /* icon */></svg>
          <span className="text-sm">AI Assistant</span>
        </button>

        {/* gap between Chatbot and auth buttons */}
        <div style={{ width: 12 }} />

        {/* auth area */}
        {user ? (
          <Menu as="div" className="relative">
            <Menu.Button className="rounded-full overflow-hidden w-10 h-10 ring-2 ring-offset-2 ring-slate-700">
              <img src={profile?.photoURL || "/default-avatar.png"} alt="profile" className="w-full h-full object-cover" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg p-2 min-w-[150px]">
              <Menu.Item><a href="/profile" className="block px-3 py-2">View Profile</a></Menu.Item>
              <Menu.Item><a href="/settings" className="block px-3 py-2">Settings</a></Menu.Item>
              <Menu.Item><button className="w-full text-left px-3 py-2" onClick={signOutUser}>Logout</button></Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/signup">
              <button className="px-4 py-1 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 text-white">Create account</button>
            </Link>
            <Link href="/login">
              <button className="px-3 py-1 rounded-md border border-slate-700">Login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
```

> The two auth buttons are to the right of the Chatbot; a small `<div style={{ width: 12 }} />` creates the gap.

---

# 4) Signup page — reCAPTCHA + store profile

Key points:

* Load `https://www.google.com/recaptcha/enterprise.js?render=SITE_KEY` in `<head>`.
* On submit call `grecaptcha.enterprise.execute(SITE_KEY, {action: 'SIGNUP'})` to obtain token.
* POST `{ token, action:'SIGNUP' }` to your server endpoint `/api/verify-recaptcha`.
* If server verifies OK, call `signUpWithEmail(...)` from AuthContext and create RTDB profile.

Snippet (client-side submit):

```js
async function handleSignup(e) {
  e.preventDefault();
  const token = await grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY, { action: 'SIGNUP' });
  const verify = await fetch('/api/verify-recaptcha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, action: 'SIGNUP' })
  }).then(r => r.json());
  if (!verify.success) {
    alert("reCAPTCHA failed");
    return;
  }
  // call signUpWithEmail from context, then redirect to profile
}
```

> For phone signup use Firebase `RecaptchaVerifier` for the OTP send flow; after OTP verify, create profile similarly.

---

# 5) Login page

* Email/password login: run grecaptcha.enterprise.execute with `{action:'LOGIN'}` and verify with server, then `signInWithEmail`.
* Google sign-in: call `signInWithGoogle()` from context (no recaptcha necessary, but you can run one).
* Phone login: use Firebase phone number OTP flow with `RecaptchaVerifier`.

---

# 6) Forgot password

Use Firebase `sendPasswordResetEmail(auth, email)`.

---

# 7) Profile page (editable, image upload)

* Read `profile` from AuthContext (RTDB data).
* Allow inline edit fields and `Save` button calling `updateProfileData(uid, updates)`.
* For avatar: use `uploadBytes` to storage path `profiles/{uid}/avatar.jpg`, then `getDownloadURL` and update RTDB `photoURL`.

Example avatar upload:

```js
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

async function uploadAvatar(file, uid) {
  const sRef = storageRef(storage, `profiles/${uid}/avatar.jpg`);
  await uploadBytes(sRef, file);
  const url = await getDownloadURL(sRef);
  await update(ref(database, `users/${uid}`), { photoURL: url });
}
```

---

# 8) RTDB rules (example)

Put these rules in Firebase console to ensure users can only write their own data:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

---

# 9) Server-side reCAPTCHA verifier (Node/Express example)

```js
// src/server/api/verify-recaptcha.js (serverless/express)
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/api/verify-recaptcha', async (req, res) => {
  const { token, action } = req.body;
  const secret = process.env.RECAPTCHA_SECRET; // set in env
  const resp = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`
  });
  const data = await resp.json();
  // data.success, data.score, data.action
  if (data.success && (data.score || 0) >= 0.3) {
    return res.json({ success: true, data });
  }
  return res.status(400).json({ success: false, data });
});

module.exports = router;
```

> Use enterprise verification if required by your reCAPTCHA plan. Keep secrets in env.

---

# 10) UI suggestions (design guidance)

* Use Tailwind + Framer Motion.
* Signup: left visual panel with animated SVG/illustration and right glass form card.
* Inputs: floating labels, subtle shadows, large CTA gradient for Create account.
* Add country picker (select) with flags (optional).
* Profile page: card layout with avatar, summary, and edit modal for each block.

---

# 11) Database tree example (sample)

```text
/users
  /K1a2b3c4d5e
    displayName: "Mr. Rosul"
    email: "..."
    phone: "9876543210"
    countryCode: "+91"
    address:
      country: "India"
      state: "Punjab"
      city: "Ludhiana"
      street: "..."
    gender: "Male"
    photoURL: "https://..."
    provider: "google"
    createdAt: 1699999999999
```

---

# 12) Next steps I can do for you (pick any and I’ll implement now)

* Generate full ready-to-run React/Next.js files for each page and component (I’ll produce the full code).
* Implement serverless `verify-recaptcha` endpoint (Netlify/Azure/Node).
* Produce Tailwind CSS + Framer Motion UI templates (Signup/Login/Profile).
* Provide test checklist and sample unit/e2e tests for auth flows.


Firebase SDk

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional1475963
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);