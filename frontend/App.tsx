import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { DashboardLayout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Pricing } from './pages/Pricing';
import { TestDatabase } from './pages/TestDatabase';
import { StudentDashboard } from './pages/student/Dashboard';
import { ExploreEvents } from './pages/student/ExploreEvents';
import { EventDetails } from './pages/student/EventDetails';
import { Ticket } from './pages/student/Ticket';
import { Profile } from './pages/student/Profile';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageEvents } from './pages/admin/ManageEvents';
import { Scanner } from './pages/admin/Scanner';
import { UserRole } from './types';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/sso-callback" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/sso-callback" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/test-db" element={<TestDatabase />} />

        {/* Student Routes */}
        <Route path="/student" element={<DashboardLayout role={UserRole.STUDENT}><StudentDashboard /></DashboardLayout>} />
        <Route path="/student/explore" element={<DashboardLayout role={UserRole.STUDENT}><ExploreEvents /></DashboardLayout>} />
        <Route path="/student/event/:id" element={<DashboardLayout role={UserRole.STUDENT}><EventDetails /></DashboardLayout>} />
        <Route path="/student/ticket" element={<DashboardLayout role={UserRole.STUDENT}><Ticket /></DashboardLayout>} />
        <Route path="/student/profile" element={<DashboardLayout role={UserRole.STUDENT}><Profile /></DashboardLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout role={UserRole.ADMIN}><AdminDashboard /></DashboardLayout>} />
        <Route path="/admin/events" element={<DashboardLayout role={UserRole.ADMIN}><ManageEvents /></DashboardLayout>} />
        <Route path="/admin/scanner" element={<DashboardLayout role={UserRole.ADMIN}><Scanner /></DashboardLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;