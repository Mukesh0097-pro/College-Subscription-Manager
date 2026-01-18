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
               <input type="text" placeholder="Search subscriptions..." className="w-full h-10 rounded-full border-none bg-white pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20" />
            </div>
            <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-text-main hover:bg-gray-100 relative">
               <Icon name="notifications" size={20} />
               <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-error rounded-full ring-1 ring-white"></span>
            </button>
         </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Pro Member Card */}
         <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#7c3aed] p-6 shadow-lg text-white">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
               <div className="flex justify-between items-start">
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                        <Icon name="workspace_premium" className="text-yellow-300" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-white/90">Pro Member</span>
                     </div>
                     <h3 className="text-3xl font-bold">SubTrack Pro Plan</h3>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                     <p className="text-xs font-medium">Renews Jan 2027</p>
                  </div>
               </div>
               <div className="flex items-end justify-between mt-4">
                   <div className="text-sm text-white/90 space-y-1">
                      <p>Unlimited subscriptions tracking.</p>
                      <p>Advanced analytics & reminders.</p>
                   </div>
                   <Link to="/pricing" className="bg-white text-primary px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-gray-50 transition-colors">
                      Manage Plan
                   </Link>
               </div>
            </div>
         </div>

         {/* Stats */}
         <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
               <div>
                  <p className="text-text-secondary text-sm font-medium">Total Subscriptions</p>
                  <p className="text-2xl font-bold mt-1">12</p>
               </div>
               <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600"><Icon name="subscriptions" /></div>
            </div>
            <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
               <div>
                  <p className="text-text-secondary text-sm font-medium">Monthly Spend</p>
                  <p className="text-2xl font-bold mt-1">$127.45</p>
               </div>
               <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Icon name="payments" /></div>
            </div>
         </div>
      </div>

      {/* Quick Actions */}
      <div>
         <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
               { icon: 'add_circle', label: 'Add Subscription', path: '/student/explore' },
               { icon: 'notifications_active', label: 'Set Reminder', path: '/student/ticket' },
               { icon: 'insights', label: 'View Spending', path: '/student/explore' },
               { icon: 'subscriptions', label: 'My Subscriptions', path: '/student/explore' }
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

      {/* Upcoming Renewals Horizontal Scroll */}
      <div>
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Upcoming Renewals</h3>
            <Link to="/student/explore" className="text-sm font-semibold text-primary hover:text-primary-dark">View All</Link>
         </div>
         <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[
               { title: "Netflix Premium", date: "Renews in 3 days", price: "$15.99/mo", img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop", day: "17", month: "JAN" },
               { title: "Spotify Family", date: "Renews in 7 days", price: "$16.99/mo", img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop", day: "21", month: "JAN" },
               { title: "Adobe Creative Cloud", date: "Renews in 14 days", price: "$54.99/mo", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop", day: "28", month: "JAN" }
            ].map((sub, i) => (
               <Link key={i} to={`/student/event/${i}`} className="min-w-[300px] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-32 w-full bg-cover bg-center relative" style={{backgroundImage: `url(${sub.img})`}}>
                     <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 flex flex-col items-center min-w-[50px]">
                        <span className="text-[10px] font-bold text-error uppercase">{sub.month}</span>
                        <span className="text-lg font-bold leading-none">{sub.day}</span>
                     </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                     <div className="flex items-center gap-2 text-xs font-medium text-primary">
                        <Icon name="schedule" size={16} />
                        <span>{sub.date}</span>
                     </div>
                     <h4 className="font-bold text-text-main truncate">{sub.title}</h4>
                     <div className="flex items-center gap-1 text-xs text-text-secondary">
                        <Icon name="payments" size={16} />
                        <span>{sub.price}</span>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
    </div>
  );
};