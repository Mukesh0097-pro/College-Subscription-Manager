# SubTrack Frontend

React-based frontend application for subscription tracking.

## Features

- 🎨 Modern React UI with TypeScript
- 🔐 Clerk authentication integration
- 📱 Responsive design
- 🎭 Student and Admin role-based dashboards
- 🎫 Event management and ticketing
- 📊 Profile and subscription management

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Authentication**: Clerk React

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file with:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000
GEMINI_API_KEY=your_gemini_api_key
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── components/
│   ├── Icon.tsx
│   └── Layout.tsx
├── pages/
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Pricing.tsx
│   ├── Signup.tsx
│   ├── TestDatabase.tsx
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── ManageEvents.tsx
│   │   └── Scanner.tsx
│   └── student/
│       ├── Dashboard.tsx
│       ├── EventDetails.tsx
│       ├── ExploreEvents.tsx
│       ├── Profile.tsx
│       └── Ticket.tsx
├── services/
│   ├── api.ts
│   └── hooks.ts
├── App.tsx
├── index.tsx
├── types.ts
└── package.json
```

## Available Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/pricing` - Pricing information

### Student Routes
- `/student` - Student dashboard
- `/student/explore` - Explore events
- `/student/event/:id` - Event details
- `/student/ticket` - Tickets
- `/student/profile` - User profile

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/events` - Manage events
- `/admin/scanner` - QR code scanner

## License

MIT
