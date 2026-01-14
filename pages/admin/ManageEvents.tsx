import React from 'react';
import { Icon } from '../../components/Icon';

export const ManageEvents: React.FC = () => {
  const events = [
    { name: 'Freshman Orientation 2024', id: 'EVT-2041', date: 'Oct 12, 2024', cat: 'Social', type: 'Gold', seats: 120, total: 200, status: 'Published', icon: 'event', color: 'indigo' },
    { name: 'Alumni Networking Night', id: 'EVT-2045', date: 'Nov 05, 2024', cat: 'Networking', type: 'Silver', seats: 85, total: 100, status: 'Active', icon: 'groups', color: 'blue' },
    { name: 'Mid-Year Gala', id: 'EVT-2088', date: 'Dec 15, 2024', cat: 'Social', type: 'Gold', seats: 300, total: 350, status: 'Draft', icon: 'celebration', color: 'pink' },
    { name: 'Career Fair Spring', id: 'EVT-2102', date: 'Feb 20, 2025', cat: 'Academic', type: 'All Access', seats: 50, total: 500, status: 'Scheduled', icon: 'work', color: 'orange' },
    { name: 'Guest Lecture: AI Ethics', id: 'EVT-2115', date: 'Mar 10, 2025', cat: 'Academic', type: 'Silver', seats: 15, total: 40, status: 'Cancelled', icon: 'psychology', color: 'red' },
  ];

  return (
    <div className="p-4 md:p-10 max-w-[1200px] mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center">
         <h1 className="text-3xl font-black">Manage Events</h1>
         <button className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2"><Icon name="add" size={20} /> Create New Event</button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
         <div className="relative flex-1">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search events..." className="w-full pl-10 h-10 rounded-lg border-gray-200 text-sm focus:border-primary focus:ring-primary" />
         </div>
         <select className="h-10 rounded-lg border-gray-200 text-sm w-48"><option>Filter by Status</option></select>
         <select className="h-10 rounded-lg border-gray-200 text-sm w-48"><option>Filter by Category</option></select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                     {['Event Name', 'Date', 'Category', 'Access', 'Seats', 'Status', 'Actions'].map((h,i) => (
                        <th key={i} className={`p-4 text-xs font-semibold text-text-secondary uppercase ${i===6?'text-right':''}`}>{h}</th>
                     ))}
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                  {events.map((evt, i) => (
                     <tr key={i} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-4">
                           <div className="flex items-center gap-3">
                              <div className={`size-10 rounded-lg bg-${evt.color}-50 flex items-center justify-center text-${evt.color}-600`}><Icon name={evt.icon} /></div>
                              <div><div className="font-medium">{evt.name}</div><div className="text-xs text-text-secondary">ID: #{evt.id}</div></div>
                           </div>
                        </td>
                        <td className="p-4 text-sm font-medium">{evt.date}</td>
                        <td className="p-4"><span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium">{evt.cat}</span></td>
                        <td className="p-4"><span className="border border-yellow-200 bg-yellow-50 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><span className="size-1.5 rounded-full bg-yellow-500"></span> {evt.type}</span></td>
                        <td className="p-4 text-sm">
                           <div className="flex gap-1 font-medium"><span>{evt.seats}</span><span className="text-gray-400">/ {evt.total}</span></div>
                           <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5"><div className="bg-primary h-1.5 rounded-full" style={{width: `${(evt.seats/evt.total)*100}%`}}></div></div>
                        </td>
                        <td className="p-4">
                           <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${evt.status==='Cancelled'?'bg-red-50 text-red-700':evt.status==='Draft'?'bg-gray-100 text-gray-600':'bg-green-50 text-green-700'}`}>
                              <Icon name={evt.status==='Cancelled'?'cancel':evt.status==='Draft'?'edit_note':'check_circle'} size={14} /> {evt.status}
                           </span>
                        </td>
                        <td className="p-4 text-right">
                           <button className="text-gray-400 hover:text-primary"><Icon name="more_vert" /></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
            <span className="text-sm text-text-secondary">Showing 1-5 of 50</span>
            <div className="flex gap-2">
               <button className="px-3 py-1 bg-white border border-gray-200 rounded text-sm disabled:opacity-50">Previous</button>
               <button className="px-3 py-1 bg-white border border-gray-200 rounded text-sm">Next</button>
            </div>
         </div>
      </div>
    </div>
  );
};