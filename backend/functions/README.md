# SubTrack Backend - Firebase Cloud Functions

Lightweight backend for SubTrack subscription tracker using Firebase Cloud Functions, Express, Clerk auth, and Firestore.

## Prerequisites

- Node.js 18+
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project with Firestore enabled
- Clerk account with API keys

## Setup

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Project
```bash
# Update .firebaserc with your project ID
# Or run:
firebase use --add
```

### 4. Install Dependencies
```bash
cd functions
npm install
```

### 5. Set Environment Variables

**For Local Development:**
```bash
cd functions
cp .env.example .env
# Edit .env and add your CLERK_SECRET_KEY
```

**For Production (Firebase):**
```bash
firebase functions:config:set clerk.secret_key="sk_live_xxxxx"
```

Then create `.runtimeconfig.json` for local emulator:
```bash
firebase functions:config:get > .runtimeconfig.json
```

Or manually set in `.env`:
```
CLERK_SECRET_KEY=sk_test_xxxxx
```

### 6. Build the Project
```bash
cd functions
npm run build
```

## Running Locally

### Start Emulators
```bash
# From project root
firebase emulators:start

# Or just functions
cd functions
npm run serve
```

The API will be available at: `http://localhost:5001/YOUR_PROJECT_ID/us-central1/api`

### Emulator UI
Open `http://localhost:4000` to access Firebase Emulator UI.

## Deploy to Production

```bash
# Deploy functions only
firebase deploy --only functions

# Deploy everything
firebase deploy
```

## API Endpoints

Base URL: `https://us-central1-YOUR_PROJECT.cloudfunctions.net/api`

### Health Check (Public)
```bash
curl https://YOUR_FUNCTION_URL/health
```

### All other endpoints require Clerk JWT in Authorization header

### List Subscriptions
```bash
curl -H "Authorization: Bearer YOUR_CLERK_JWT" \
  https://YOUR_FUNCTION_URL/api/subscriptions
```

### Get Single Subscription
```bash
curl -H "Authorization: Bearer YOUR_CLERK_JWT" \
  https://YOUR_FUNCTION_URL/api/subscriptions/SUBSCRIPTION_ID
```

### Create Subscription
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_CLERK_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Netflix",
    "provider": "Netflix Inc",
    "category": "entertainment",
    "amount": 649,
    "currency": "INR",
    "billingCycle": "monthly",
    "nextRenewalDate": "2026-02-15T00:00:00.000Z",
    "status": "active",
    "reminderEnabled": true,
    "reminderDaysBefore": 3,
    "notes": "Family plan"
  }' \
  https://YOUR_FUNCTION_URL/api/subscriptions
```

### Update Subscription
```bash
curl -X PUT \
  -H "Authorization: Bearer YOUR_CLERK_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 799,
    "notes": "Upgraded to premium"
  }' \
  https://YOUR_FUNCTION_URL/api/subscriptions/SUBSCRIPTION_ID
```

### Delete Subscription
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_CLERK_JWT" \
  https://YOUR_FUNCTION_URL/api/subscriptions/SUBSCRIPTION_ID
```

### Get Analytics Summary
```bash
curl -H "Authorization: Bearer YOUR_CLERK_JWT" \
  https://YOUR_FUNCTION_URL/api/analytics/summary
```

## Response Format

### Success
```json
{
  "success": true,
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

## Subscription Schema

| Field | Type | Required | Default |
|-------|------|----------|---------|
| name | string | Yes | - |
| provider | string | No | - |
| category | enum | Yes | - |
| amount | number | Yes | - |
| currency | string | No | "INR" |
| billingCycle | enum | Yes | - |
| nextRenewalDate | ISO string | Yes | - |
| status | enum | No | "active" |
| reminderEnabled | boolean | No | true |
| reminderDaysBefore | number | No | 3 |
| notes | string | No | - |

**Category values:** entertainment, productivity, fitness, utilities, education, other

**BillingCycle values:** monthly, yearly, weekly

**Status values:** active, trial, cancelled

## Project Structure

```
functions/
├── src/
│   ├── index.ts           # Main entry, Express app
│   ├── config/
│   │   └── firebase.ts    # Firebase Admin init
│   ├── middleware/
│   │   └── auth.ts        # Clerk auth middleware
│   ├── routes/
│   │   ├── health.ts      # Health check route
│   │   ├── subscriptions.ts # CRUD routes
│   │   └── analytics.ts   # Analytics route
│   ├── validators/
│   │   └── subscription.ts # Zod schemas
│   └── types/
│       └── index.ts       # TypeScript types
├── package.json
├── tsconfig.json
└── .env.example
```

## Troubleshooting

### "Cannot find module" errors
```bash
cd functions
npm run build
```

### Emulator not connecting to Firestore
Ensure Firestore emulator is running on port 8080.

### Auth errors
- Verify CLERK_SECRET_KEY is set correctly
- Ensure JWT is valid and not expired
- Check Authorization header format: `Bearer <token>`

## License

MIT
