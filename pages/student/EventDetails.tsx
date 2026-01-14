import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';

export const EventDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
       <nav className="flex mb-6 text-sm">
          <Link to="/student" className="text-gray-500 hover:text-primary">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/student/explore" className="text-gray-500 hover:text-primary">Subscriptions</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-text-main font-medium">Netflix Premium</span>
       </nav>

       <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&h=600&fit=crop")'}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md border border-white/30">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span> Active Subscription
             </span>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-8">
             <div>
                <div className="flex gap-2 mb-4">
                   <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium">Entertainment</span>
                   <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium">Premium Plan</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-text-main mb-4 leading-tight">Netflix Premium</h1>
                <p className="text-lg text-text-secondary leading-relaxed">4K Ultra HD streaming, up to 4 screens simultaneously, ad-free experience.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-y border-gray-100">
                <div className="flex items-start gap-4">
                   <div className="p-2.5 rounded-lg bg-gray-100 text-gray-700"><Icon name="calendar_month" /></div>
                   <div>
                      <p className="font-semibold text-text-main">Renewal Date</p>
                      <p className="text-sm text-text-secondary mt-0.5">January 17, 2026</p>
                      <p className="text-sm text-text-secondary">Monthly billing cycle</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="p-2.5 rounded-lg bg-gray-100 text-gray-700"><Icon name="credit_card" /></div>
                   <div>
                      <p className="font-semibold text-text-main">Payment Method</p>
                      <p className="text-sm text-text-secondary mt-0.5">Visa •••• 4242</p>
                      <a href="#" className="text-sm text-primary font-medium hover:underline">Change Method</a>
                   </div>
                </div>
             </div>

             <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold mb-4">Subscription Details</h3>
                <p className="text-text-secondary mb-4">Your Netflix Premium subscription includes access to the entire library of movies, TV shows, and Netflix Originals in stunning 4K quality.</p>
                <h4 className="text-lg font-bold mb-3">What's Included</h4>
                <ul className="space-y-2 mb-6 text-text-secondary">
                   <li className="flex gap-2"><Icon name="check_circle" className="text-success" size={20} /> 4K Ultra HD + HDR streaming</li>
                   <li className="flex gap-2"><Icon name="check_circle" className="text-success" size={20} /> Watch on 4 devices at once</li>
                   <li className="flex gap-2"><Icon name="check_circle" className="text-success" size={20} /> Download on 6 devices</li>
                </ul>
             </div>

             <div>
                <h3 className="text-xl font-bold mb-6">Usage Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Icon name="play_circle" size={32} /></div>
                      <div>
                         <p className="font-bold text-text-main">Last Used</p>
                         <p className="text-xs font-medium text-primary uppercase mb-1">2 hours ago</p>
                         <p className="text-sm text-gray-500 line-clamp-1">Watched "The Crown"</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-600"><Icon name="trending_up" size={32} /></div>
                      <div>
                         <p className="font-bold text-text-main">Monthly Usage</p>
                         <p className="text-xs font-medium text-green-600 uppercase mb-1">High</p>
                         <p className="text-sm text-gray-500 line-clamp-1">45 hours this month</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="relative lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg">
                   <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">Subscription Actions</h3>
                      <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded">Active</span>
                   </div>
                   <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                         <span className="text-gray-600 font-medium">Monthly Cost</span>
                         <span className="text-primary font-bold">$15.99/mo</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                         <span className="text-gray-600 font-medium">Yearly Total</span>
                         <span className="text-text-main font-bold">$191.88/yr</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Next charge on January 17, 2026</p>
                   </div>
                   <div className="flex items-center gap-3 p-3 mb-6 rounded-lg bg-green-50 border border-green-100">
                      <div className="bg-green-100 rounded-full p-1 text-success"><Icon name="check" size={16} /></div>
                      <div>
                         <p className="text-sm font-semibold text-green-800">Reminder Set</p>
                         <p className="text-xs text-green-700">3 days before renewal</p>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                         <Icon name="edit" size={20} />
                         <span>Edit Subscription</span>
                      </button>
                      <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-text-main font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
                         <Icon name="notifications" size={20} />
                         <span>Set Reminder</span>
                      </button>
                      <button className="w-full bg-red-50 border border-red-100 hover:bg-red-100 text-red-600 font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
                         <Icon name="cancel" size={20} />
                         <span>Cancel Subscription</span>
                      </button>
                   </div>
                </div>
                
                <div className="rounded-xl p-5 bg-white border border-gray-100 shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Icon name="lightbulb" size={20} /></div>
                      <div>
                         <p className="text-xs font-semibold">Savings Tip</p>
                         <p className="text-[10px] text-gray-500">Switch to yearly for 16% off</p>
                      </div>
                   </div>
                   <button className="text-primary text-sm font-bold">Learn More</button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};