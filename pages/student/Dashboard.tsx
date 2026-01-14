import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1200px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <header className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-text-main">Welcome back, Alex! 👋</h2>
         <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"><Icon name="search" size={20} /></span>
               <input type="text" placeholder="Search events..." className="w-full h-10 rounded-full border-none bg-white pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20" />
            </div>
            <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-text-main hover:bg-gray-100 relative">
               <Icon name="notifications" size={20} />
               <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-error rounded-full ring-1 ring-white"></span>
            </button>
         </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Gold Member Card */}
         <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#7c3aed] p-6 shadow-lg text-white">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
               <div className="flex justify-between items-start">
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                        <Icon name="workspace_premium" className="text-yellow-300" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-white/90">Gold Member</span>
                     </div>
                     <h3 className="text-3xl font-bold">Student Premium Pass</h3>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                     <p className="text-xs font-medium">Expires Dec 2024</p>
                  </div>
               </div>
               <div className="flex items-end justify-between mt-4">
                   <div className="text-sm text-white/90 space-y-1">
                      <p>Unlimited access to workshops & gym.</p>
                      <p>Priority booking for main events.</p>
                   </div>
                   <Link to="/pricing" className="bg-white text-primary px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-gray-50 transition-colors">
                      Upgrade Plan
                   </Link>
               </div>
            </div>
         </div>

         {/* Stats */}
         <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
               <div>
                  <p className="text-text-secondary text-sm font-medium">Events Attended</p>
                  <p className="text-2xl font-bold mt-1">12</p>
               </div>
               <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600"><Icon name="check_circle" /></div>
            </div>
            <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
               <div>
                  <p className="text-text-secondary text-sm font-medium">Upcoming</p>
                  <p className="text-2xl font-bold mt-1">3</p>
               </div>
               <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Icon name="calendar_month" /></div>
            </div>
         </div>
      </div>

      {/* Quick Actions */}
      <div>
         <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
               { icon: 'qr_code_scanner', label: 'Scan QR', path: '/student/ticket' },
               { icon: 'search', label: 'Browse', path: '/student/explore' },
               { icon: 'add_card', label: 'Top Up', path: '/pricing' },
               { icon: 'confirmation_number', label: 'My Tickets', path: '/student/ticket' }
            ].map((action, i) => (
               <Link key={i} to={action.path} className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all group">
                  <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center text-text-main group-hover:bg-primary group-hover:text-white transition-colors">
                     <Icon name={action.icon} />
                  </div>
                  <span className="text-sm font-semibold">{action.label}</span>
               </Link>
            ))}
         </div>
      </div>

      {/* Upcoming Events Horizontal Scroll */}
      <div>
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Upcoming Events</h3>
            <Link to="/student/explore" className="text-sm font-semibold text-primary hover:text-primary-dark">View All</Link>
         </div>
         <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[
               { title: "Startup Networking Night", date: "Today, 4:00 PM", loc: "Innovation Hub", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfBYYZHWBkI21SltUHz4EXKRRlRkKJe8myfeoTgWryzZSNhZApFKVAW6Vs5b23ZXGpZ90T3lBcPYVWVlSdM6Hs4RLQnpFd8_f48z8AO1B98bcjTvnhgZIUdYJeDfcPTyLBgqfE5OQLCMBPVgh5PNL8zB0ednLnlPZ_8iVxwnp-AASmX2sY6O4kJrDEUU-k4jb5wPngbhUW3atVnU5-QFuqPEWfjrX8wDjxGOJIqoQLe1lRIaQvZVZD_NKymTiz38invrzpo_bA2pEJ", day: "24", month: "OCT" },
               { title: "Morning Yoga Workshop", date: "Tomorrow, 9:00 AM", loc: "Student Gym", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWJ5bwjzWr46OMjl46oKuGc2JMu7KbzmNKjPjEcZSZOhbjzbnZpte9JJPei99_o3K0OW4oFPDKX5DicJ3IjIEVL_Fz-zqjCq6hUtk53UQmkynTPVtRV-KhJcmJCTIM5O0XRaher60O0TwYqGfHId6TkN3XopKh9neUJjuexNFZaImInOhOOE2YdqZi4LHA1AliEjQ--Yjd8amcMvsUAF9iQooVgkrR1IpnzRwionGDODNEeTTtjf88Z5LhA5pyFpVKcLmJuHi1S8MY", day: "25", month: "OCT" },
               { title: "Finals Prep Study Group", date: "Monday, 2:00 PM", loc: "Library", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxK9_zfIVGt7xKmaLMRQXNiGQ3D99xhCOkwf2HipIfo3HQGhffw7zMbXBmJKgcFDV65GhF2E700UBwcKQwZTG6dkAUcCdNbGqPDgs_jhJsup0qNKuvwTZEMWdjJvuqH9UDnSvWjAKuPzIJIIDdyr6yB2p0GxfKj4VWE-zDfih2JRMkfxchkieBlfT5s3EsGkBjZjP37a0tBz36n3zS7eU2NEGkONYNRLpjifNviyuXAC232so3caslFpNvyW9dfT83hmoUCmtrsaZr", day: "28", month: "OCT" }
            ].map((evt, i) => (
               <Link key={i} to={`/student/event/${i}`} className="min-w-[300px] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-32 w-full bg-cover bg-center relative" style={{backgroundImage: `url(${evt.img})`}}>
                     <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 flex flex-col items-center min-w-[50px]">
                        <span className="text-[10px] font-bold text-error uppercase">{evt.month}</span>
                        <span className="text-lg font-bold leading-none">{evt.day}</span>
                     </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                     <div className="flex items-center gap-2 text-xs font-medium text-primary">
                        <Icon name="schedule" size={16} />
                        <span>{evt.date}</span>
                     </div>
                     <h4 className="font-bold text-text-main truncate">{evt.title}</h4>
                     <div className="flex items-center gap-1 text-xs text-text-secondary">
                        <Icon name="location_on" size={16} />
                        <span>{evt.loc}</span>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
    </div>
  );
};