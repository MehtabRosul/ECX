# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google Cloud Project Configuration
GOOGLE_CLOUD_PROJECT_ID=ecx-website

# reCAPTCHA Enterprise Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LePWw4sAAAAAC1uN1p2WdvuYR8APIg13cyGFrya

# Google Cloud Authentication
# Option 1: Use service account key file (recommended for local development)
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json

# Option 2: Or use Application Default Credentials (for production/GCP)
# No need to set GOOGLE_APPLICATION_CREDENTIALS if using ADC
```

## Setting Up Google Cloud Authentication

### Option 1: Service Account Key (Recommended for Local Development)

1. Go to [Google Cloud Console - IAM & Admin - Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts?project=ecx-website)
2. Make sure you're in the **ecx-website** project
3. Click **+ CREATE SERVICE ACCOUNT**
4. Fill in:
   - **Service account name**: `recaptcha-verifier` (or any name you prefer)
   - **Service account ID**: (auto-generated)
   - Click **CREATE AND CONTINUE**
5. Grant it the role: **reCAPTCHA Enterprise Agent**
   - Click **ADD ANOTHER ROLE**
   - Search for "reCAPTCHA Enterprise Agent"
   - Select it
   - Click **CONTINUE**
6. Click **DONE**
7. Click on the newly created service account
8. Go to the **KEYS** tab
9. Click **ADD KEY** → **Create new key**
10. Choose **JSON** format
11. Click **CREATE** - the JSON file will download automatically
12. **IMPORTANT**: 
    - Move the downloaded JSON file to your project root (or a `keys/` folder)
    - **DO NOT commit this file to git** (it's already in `.gitignore`)
    - Example: `./service-account-key.json` or `./keys/recaptcha-key.json`
13. Add the path to your `.env.local`:
    ```env
    GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
    ```
    (Use the actual path where you saved the file)

### Option 2: Application Default Credentials (Alternative for Local Development)

If you have `gcloud` CLI installed:

1. Install Google Cloud SDK if not already installed: https://cloud.google.com/sdk/docs/install
2. Run: `gcloud auth application-default login`
3. This will use your personal Google account credentials
4. No need to set `GOOGLE_APPLICATION_CREDENTIALS` in this case

### Option 3: Application Default Credentials (Production)

If deploying to Google Cloud (Cloud Run, App Engine, Compute Engine, etc.), the SDK will automatically use the service account attached to your Cloud resource. No additional setup needed.

## Quick Setup Checklist

- [ ] Created service account in Google Cloud Console
- [ ] Granted "reCAPTCHA Enterprise Agent" role
- [ ] Downloaded JSON key file
- [ ] Placed key file in project (not in git)
- [ ] Added `GOOGLE_APPLICATION_CREDENTIALS` to `.env.local`
- [ ] Restarted Next.js dev server

## Firebase Configuration

Firebase config is already hardcoded in `src/lib/firebase.ts`. If you need to use environment variables instead, add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDVrqHewmc62b4UlE37VJ-OmMJQ3Ewwf5o
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ecx-website.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://ecx-website-default-rtdb.asia-southeast1.firebasedatabase.app
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ecx-website
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ecx-website.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=953629445154
NEXT_PUBLIC_FIREBASE_APP_ID=1:953629445154:web:65d7a4bd555ee3d8de4e7b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-X5EL3C9LK0
```

## Important Notes

- **Never commit `.env.local` or service account keys to git**
- The `.env.local` file is already in `.gitignore`
- Restart your Next.js dev server after adding/changing environment variables
- For production, set these variables in your hosting platform's environment settings

