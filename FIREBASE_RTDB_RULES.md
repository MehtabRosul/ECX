# Firebase Realtime Database Security Rules

Copy and paste these rules into your Firebase Realtime Database Rules section:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        ".validate": "newData.hasChildren(['email', 'provider', 'createdAt']) && newData.child('email').isString() && newData.child('provider').val().matches(/^(google|email|phone)$/) && newData.child('createdAt').isNumber()"
      }
    }
  }
}
```

## What these rules do:

1. **`.read": "$uid === auth.uid"`** - Users can only read their own profile data
2. **`.write": "$uid === auth.uid"`** - Users can only write/update their own profile data
3. **`.validate"`** - Ensures required fields (email, provider, createdAt) are present and have correct types

## How to apply:

1. Go to Firebase Console → Realtime Database → Rules tab
2. Replace the existing rules with the rules above
3. Click "Publish" to save

## Important Notes:

- These rules ensure that only authenticated users can access their own data
- Users cannot read or modify other users' profiles
- The validation ensures data integrity for required fields
- Profile pictures are stored in Firebase Storage, not RTDB (only the URL is stored in RTDB)

