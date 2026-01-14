import React from 'react';
import { Icon } from '../../components/Icon';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-[1080px] w-full mx-auto p-4 md:p-8 flex flex-col gap-8 pb-20">
      <div className="flex flex-col gap-2">
         <h1 className="text-3xl md:text-4xl font-black text-text-main">Profile & Settings</h1>
         <p className="text-text-secondary">Manage your account, plan, and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
               <div className="relative">
                  <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-cover bg-center border-4 border-white shadow-md" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBw0hmt7LMJueM8VNX1QxrZIwQJAVStUdCAnmeA-aVpXmGPJVDA7pbW2IoueLUgfRhhkG8rlQfHPx70S0cxRrZkqFMg2vYquuimhwIHu7dkQKdjW-zx4o5HGuEh1fpX-f3-WI68VjimzgIbvLDKljpD6t_EuKIimgedlTsqeWhmeumAziFxn04S47aiGeiCgkayuV8oGEMPkDl6dsU1nl3xJqDsISkOGBb8WtK_nz1UjNOzDBmcTXjCxwQzHyAYSkcO8_W-gFverNMb")'}}></div>
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white shadow-sm"><Icon name="edit" size={16} /></button>
               </div>
               <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-text-main">Alex Johnson</h2>
                  <p className="text-text-secondary font-medium">Pro User since 2024</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-text-secondary mt-1">
                     <Icon name="badge" size={18} /> <span>ID: USR-8891</span>
                  </div>
               </div>
            </div>
            <button className="flex items-center gap-2 h-10 px-6 rounded-lg bg-background-light text-text-main font-semibold text-sm hover:bg-gray-200 transition-colors">
               <Icon name="photo_camera" size={20} /> <span>Edit Photo</span>
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold">Plan Status</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">Active</span>
               </div>
               <div className="p-6 flex flex-col gap-6">
                  <div className="flex justify-between items-center p-5 rounded-xl border border-primary/20 bg-primary/5">
                     <div className="flex gap-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary"><Icon name="workspace_premium" /></div>
                        <div>
                           <p className="font-bold text-text-main">SubTrack Pro</p>
                           <p className="text-sm text-text-secondary mt-1">Monthly Plan • Valid until Jan 14, 2027</p>
                        </div>
                     </div>
                     <button className="h-9 px-4 bg-primary text-white text-sm font-medium rounded-lg shadow-sm">Manage</button>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-sm font-medium"><p>Renewal Progress</p><p>25 days remaining</p></div>
                     <div className="h-2.5 bg-background-light rounded-full overflow-hidden"><div className="h-full bg-primary w-3/4"></div></div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
               <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-bold">Personal Information</h3></div>
               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Full Name', 'Email Address', 'Phone Number', 'Department'].map((label, i) => (
                     <div key={i} className="flex flex-col gap-2">
                        <label className="text-sm font-medium">{label}</label>
                        <input type="text" defaultValue={['Alex Johnson', 'alex.j@university.edu', '+1 (555) 012-3456', 'Computer Science'][i]} className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                     </div>
                  ))}
               </div>
               <div className="px-6 pb-6 pt-2 flex justify-end">
                  <button className="h-10 px-6 bg-text-main text-white text-sm font-bold rounded-lg hover:opacity-90">Save Changes</button>
               </div>
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
               <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-bold">Notifications</h3></div>
               <div className="p-6 space-y-5">
                  {[
                     { l: 'Renewal Reminders', d: 'Get notified before renewals' },
                     { l: 'Spending Alerts', d: 'Alerts for spending limits' },
                     { l: 'Weekly Digest', d: 'Summary of spending', off: true }
                  ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <div><p className="text-sm font-medium">{item.l}</p><p className="text-xs text-text-secondary">{item.d}</p></div>
                        <label className="relative inline-flex items-center cursor-pointer">
                           <input type="checkbox" className="sr-only peer" defaultChecked={!item.off} />
                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
               {['Change Password', 'Two-Factor Auth'].map((l, i) => (
                  <button key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-background-light transition-colors group">
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${i===0?'bg-blue-50 text-blue-600':'bg-purple-50 text-purple-600'}`}><Icon name={i===0?'lock_reset':'security'} size={20} /></div>
                        <span className="text-sm font-medium">{l}</span>
                     </div>
                     <Icon name="chevron_right" className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>
               ))}
            </div>

            <div className="mt-auto space-y-3">
               <button className="w-full h-11 flex items-center justify-center gap-2 rounded-lg border border-gray-200 text-text-secondary font-semibold text-sm hover:bg-gray-100"><Icon name="logout" size={20} /> Log Out</button>
               <button className="w-full py-2 text-error text-xs font-medium hover:text-red-700">Delete Account</button>
            </div>
         </div>
      </div>
    </div>
  );
};