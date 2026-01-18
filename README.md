# SubTrack - Subscription Tracking Platform

A full-stack subscription tracking platform with separate frontend and backend services.

## Project Structure

```
.
├── frontend/          # React frontend application
├── backend/           # Express backend API
├── firebase.json      # Firebase configuration
├── firestore.rules    # Firestore security rules
└── README.md         # This file
```

## Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
# Create .env with VITE_CLERK_PUBLISHABLE_KEY
npm run dev
```

Frontend runs on: `http://localhost:3000`

## Features

### Backend
- RESTful API with Express & TypeScript
- Clerk authentication
- Firebase Firestore database
- Comprehensive logging with Winston
- Rate limiting and security headers
- Full CRUD for subscriptions, users, notifications
- Analytics and spending trends

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Clerk authentication
- React Router for navigation
- Role-based dashboards (Student/Admin)
- Event management and ticketing

## Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## Tech Stack

**Frontend:**
- React, TypeScript, Vite, React Router, Clerk

**Backend:**
- Node.js, Express, TypeScript, Firebase Admin, Clerk, Winston, Zod

## Development

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Access app at `http://localhost:3000`

## License

MIT
