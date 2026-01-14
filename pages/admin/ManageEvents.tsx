import React from 'react';
import { Icon } from '../../components/Icon';

export const ManageEvents: React.FC = () => {
  const subscriptions = [
    { name: 'Netflix Premium', id: 'SUB-2041', date: 'Jan 17, 2026', cat: 'Entertainment', type: 'Monthly', price: 15.99, total: 191.88, status: 'Active', icon: 'movie', color: 'red' },
    { name: 'Spotify Family', id: 'SUB-2045', date: 'Jan 21, 2026', cat: 'Entertainment', type: 'Monthly', price: 16.99, total: 203.88, status: 'Active', icon: 'music_note', color: 'green' },
    { name: 'Adobe Creative Cloud', id: 'SUB-2088', date: 'Feb 05, 2026', cat: 'Productivity', type: 'Yearly', price: 54.99, total: 659.88, status: 'Active', icon: 'brush', color: 'pink' },
    { name: 'Amazon Prime', id: 'SUB-2102', date: 'Jan 25, 2026', cat: 'Shopping', type: 'Trial', price: 14.99, total: 179.88, status: 'Trial', icon: 'shopping_cart', color: 'orange' },
    { name: 'HBO Max', id: 'SUB-2115', date: 'Ended Dec 10', cat: 'Entertainment', type: 'Monthly', price: 15.99, total: 0, status: 'Cancelled', icon: 'tv', color: 'purple' },
  ];

  return (
    <div className="p-4 md:p-10 max-w-[1200px] mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center">
         <h1 className="text-3xl font-black">Manage Subscriptions</h1>
         <button className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2"><Icon name="add" size={20} /> Add New Subscription</button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
         <div className="relative flex-1">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search subscriptions..." className="w-full pl-10 h-10 rounded-lg border-gray-200 text-sm focus:border-primary focus:ring-primary" />
         </div>
         <select className="h-10 rounded-lg border-gray-200 text-sm w-48"><option>Filter by Status</option></select>
         <select className="h-10 rounded-lg border-gray-200 text-sm w-48"><option>Filter by Category</option></select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                     {['Subscription Name', 'Next Renewal', 'Category', 'Billing', 'Price', 'Status', 'Actions'].map((h,i) => (
                        <th key={i} className={`p-4 text-xs font-semibold text-text-secondary uppercase ${i===6?'text-right':''}`}>{h}</th>
                     ))}
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                  {subscriptions.map((sub, i) => (
                     <tr key={i} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-4">
                           <div className="flex items-center gap-3">
                              <div className={`size-10 rounded-lg bg-${sub.color}-50 flex items-center justify-center text-${sub.color}-600`}><Icon name={sub.icon} /></div>
                              <div><div className="font-medium">{sub.name}</div><div className="text-xs text-text-secondary">ID: #{sub.id}</div></div>
                           </div>
                        </td>
                        <td className="p-4 text-sm font-medium">{sub.date}</td>
                        <td className="p-4"><span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium">{sub.cat}</span></td>
                        <td className="p-4"><span className="border border-blue-200 bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><span className="size-1.5 rounded-full bg-blue-500"></span> {sub.type}</span></td>
                        <td className="p-4 text-sm">
                           <div className="flex gap-1 font-medium"><span>${sub.price}</span><span className="text-gray-400">/mo</span></div>
                           <div className="text-xs text-gray-500">${sub.total}/yr</div>
                        </td>
                        <td className="p-4">
                           <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${sub.status==='Cancelled'?'bg-red-50 text-red-700':sub.status==='Trial'?'bg-orange-100 text-orange-600':'bg-green-50 text-green-700'}`}>
                              <Icon name={sub.status==='Cancelled'?'cancel':sub.status==='Trial'?'hourglass_top':'check_circle'} size={14} /> {sub.status}
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
            <span className="text-sm text-text-secondary">Showing 1-5 of 24</span>
            <div className="flex gap-2">
               <button className="px-3 py-1 bg-white border border-gray-200 rounded text-sm disabled:opacity-50">Previous</button>
               <button className="px-3 py-1 bg-white border border-gray-200 rounded text-sm">Next</button>
            </div>
         </div>
      </div>
    </div>
  );
};