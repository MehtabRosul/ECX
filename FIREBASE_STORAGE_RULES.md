# Firebase Storage Security Rules

Copy and paste these rules into your Firebase Console → Storage → Rules tab:

```javascript
service firebase.storage {
  match /b/{bucket}/o {
    // Profile pictures - users can only upload/read their own
    match /profiles/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Default: deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## What these rules do:

1. **Profile pictures path** (`/profiles/{userId}/`):
   - **Read**: Any authenticated user can read (to display avatars)
   - **Write**: Only the owner (matching userId) can upload/update
   - **Delete**: Only the owner can delete their own images

2. **All other paths**: Denied by default for security

## How to apply:

1. Go to Firebase Console → Storage → Rules tab
2. Replace the existing rules with the rules above
3. Click "Publish" to save

## Important Notes:

- These rules require users to be authenticated (`request.auth != null`)
- Users can only upload to their own profile folder (`profiles/{userId}/`)
- The `{allPaths=**}` pattern matches all files and subdirectories
- Make sure Storage is enabled in your Firebase project

## Troubleshooting:

If uploads still fail after applying rules:
1. Check that Storage is enabled in Firebase Console
2. Verify the user is authenticated (logged in)
3. Check browser console for specific error codes:
   - `storage/unauthorized` - Rules don't allow the operation
   - `storage/unauthenticated` - User not logged in
   - `storage/quota-exceeded` - Storage quota reached
   - `storage/object-not-found` - File doesn't exist

