# SubTrack Backend API

A comprehensive backend API for managing subscription tracking, built with Express, TypeScript, Firebase, and Clerk authentication.

## Features

- 🔐 **Authentication** - Secure authentication using Clerk
- 📊 **Subscription Management** - Full CRUD operations for subscriptions
- 📈 **Analytics** - Spending trends and insights
- 🔔 **Notifications** - User notification system
- 👤 **User Profiles** - User management and preferences
- 🛡️ **Security** - Rate limiting, helmet, CORS protection
- 📝 **Logging** - Comprehensive logging with Winston
- ✅ **Validation** - Request validation with Zod

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Clerk
- **Validation**: Zod
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Firebase project with Firestore enabled
- Clerk account for authentication

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your credentials
```

### Environment Variables

Create a `.env` file with the following variables:

```env
NODE_ENV=development
PORT=5000

# Clerk
CLERK_SECRET_KEY=your_clerk_secret_key

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Development

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## API Endpoints

### Health Check

- `GET /health` - Check API health status

### Authentication

All `/api/*` endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <clerk_session_token>
```

### Subscriptions

- `GET /api/subscriptions` - List all user subscriptions
  - Query params: `status`, `limit`, `page`
- `GET /api/subscriptions/:id` - Get single subscription
- `POST /api/subscriptions` - Create new subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription

### Analytics

- `GET /api/analytics/summary` - Get subscription analytics summary
- `GET /api/analytics/spending-trends` - Get spending trends
  - Query params: `period` (6months, 12months)

### Users

- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users/stats` - Get user statistics

### Notifications

- `GET /api/notifications` - Get user notifications
  - Query params: `unreadOnly`, `limit`
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Firebase configuration
│   ├── middleware/
│   │   ├── auth.ts              # Authentication middleware
│   │   ├── errorHandler.ts     # Error handling
│   │   └── rateLimiter.ts      # Rate limiting
│   ├── routes/
│   │   ├── analytics.ts         # Analytics endpoints
│   │   ├── health.ts            # Health check
│   │   ├── notifications.ts     # Notifications
│   │   ├── subscriptions.ts     # Subscriptions CRUD
│   │   └── users.ts             # User management
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── utils/
│   │   └── logger.ts            # Winston logger
│   ├── validators/
│   │   └── subscription.ts      # Zod schemas
│   └── index.ts                 # App entry point
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Error Handling

The API uses a centralized error handling system with custom error codes:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

Common error codes:
- `UNAUTHORIZED` - Missing or invalid authentication
- `FORBIDDEN` - Access denied
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid request data
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_SERVER_ERROR` - Server error

## Security Features

1. **Helmet** - Sets security HTTP headers
2. **CORS** - Configurable cross-origin resource sharing
3. **Rate Limiting** - Prevents abuse with configurable limits
4. **Input Validation** - Zod schemas validate all inputs
5. **Authentication** - Clerk token verification
6. **Logging** - All requests and errors logged

## License

MIT
