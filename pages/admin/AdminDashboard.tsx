import React from 'react';
import { Icon } from '../../components/Icon';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
       {/* Header */}
       <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
             <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white flex items-center gap-2 shadow-sm">
                <Icon name="add" size={18} /> Create Event
             </button>
          </div>
       </header>

       {/* Stats Grid */}
       <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
             { label: 'Active Members', val: '1,240', icon: 'person', color: 'text-primary', change: '12%', up: true },
             { label: 'Total Bookings', val: '856', icon: 'local_activity', color: 'text-purple-600', change: '5%', up: true },
             { label: 'Attendance Rate', val: '88%', icon: 'co_present', color: 'text-orange-600', change: '2%', up: false },
          ].map((stat, i) => (
             <div key={i} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex justify-between items-start">
                   <div><span className="text-sm font-medium text-text-secondary">{stat.label}</span><p className="text-3xl font-bold mt-1">{stat.val}</p></div>
                   <div className={`rounded-lg p-2 bg-gray-50 ${stat.color}`}><Icon name={stat.icon} /></div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                   <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${stat.up ? 'text-success bg-green-50' : 'text-error bg-red-50'}`}>
                      <Icon name={stat.up ? 'trending_up' : 'trending_down'} size={14} className="mr-1" /> {stat.change}
                   </span>
                   <span className="text-xs text-text-secondary">from last month</span>
                </div>
             </div>
          ))}
       </section>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart placeholder */}
          <div className="col-span-1 lg:col-span-2 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
             <div className="mb-6 flex justify-between">
                <div><h3 className="font-semibold">Weekly Attendance</h3><p className="text-sm text-text-secondary">Current vs Previous</p></div>
                <select className="text-xs border-gray-200 rounded-lg"><option>This Week</option></select>
             </div>
             <div className="relative h-64 w-full flex items-end justify-between gap-4 pl-8">
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-text-secondary"><span>500</span><span>250</span><span>0</span></div>
                {[45, 55, 65, 85, 60, 35, 25].map((h, i) => (
                   <div key={i} className="relative flex-1 h-full flex flex-col justify-end group">
                      <div className="w-full rounded-t-md bg-primary hover:bg-primary-dark transition-all" style={{height: `${h}%`}}></div>
                      <span className="text-center text-xs mt-2 text-text-secondary">{['M','T','W','T','F','S','S'][i]}</span>
                   </div>
                ))}
             </div>
          </div>
          
          {/* Activity Feed */}
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 flex flex-col">
             <h3 className="font-semibold mb-4">Recent Activity</h3>
             <div className="space-y-6 overflow-y-auto">
                {[
                   { user: 'Sarah J.', action: "booked 'Yoga Session'", time: '2 min ago', color: 'bg-primary' },
                   { user: 'System', action: "Alert: Hall B at 95%", time: '1 hour ago', color: 'bg-warning' },
                   { user: 'Mark T.', action: "cancelled booking", time: '3 hours ago', color: 'bg-gray-300' },
                   { user: 'New Event', action: "created: 'Career Fair'", time: '5 hours ago', color: 'bg-success' }
                ].map((item, i) => (
                   <div key={i} className="flex gap-3">
                      <div className={`mt-1 h-2 w-2 rounded-full ${item.color}`}></div>
                      <div className="flex flex-col gap-1">
                         <p className="text-sm">{item.user} <span className="text-text-secondary">{item.action}</span></p>
                         <span className="text-xs text-text-secondary">{item.time}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};