import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light font-sans flex flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <Icon name="subscriptions" />
          <span className="text-lg font-bold text-text-main">SubTrack</span>
        </Link>
        <Link to="/student" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-bold">Log In</Link>
      </header>

      <main className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-text-main mb-4">Track Subscriptions. Stop Overspending.</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Flexible plans designed to help you manage all your subscriptions efficiently.</p>
        </div>

        <div className="flex justify-center mb-10">
           <div className="bg-gray-100 p-1 rounded-xl flex">
              <button className="px-6 py-2 bg-white shadow-sm rounded-lg text-sm font-medium text-text-main">Monthly</button>
              <button className="px-6 py-2 text-sm font-medium text-text-secondary">Yearly</button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
           {/* Free Plan */}
           <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="text-text-secondary text-sm mt-1">Basic tracking for casual users.</p>
              <div className="mt-4 mb-6">
                 <span className="text-5xl font-black">$0</span>
                 <span className="text-text-secondary"> / month</span>
              </div>
              <Link to="/student" className="block w-full py-3 rounded-xl border border-gray-200 text-center font-bold hover:bg-gray-50 transition-colors">Get Started</Link>
              <div className="mt-6 space-y-3">
                 <div className="flex items-center gap-3 text-sm font-medium"><Icon name="check" className="text-green-600" size={20}/> Up to 5 subscriptions</div>
                 <div className="flex items-center gap-3 text-sm font-medium"><Icon name="check" className="text-green-600" size={20}/> Basic renewal reminders</div>
                 <div className="flex items-center gap-3 text-sm font-medium opacity-50"><Icon name="close" size={20}/> Spending analytics</div>
              </div>
           </div>

           {/* Pro Plan */}
           <div className="bg-white rounded-2xl p-8 border-2 border-primary relative shadow-xl transform md:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
              <h3 className="text-xl font-bold text-primary">Pro</h3>
              <p className="text-text-secondary text-sm mt-1">Full control for power users.</p>
              <div className="mt-4 mb-6">
                 <span className="text-5xl font-black">$4.99</span>
                 <span className="text-text-secondary"> / month</span>
              </div>
              <Link to="/student" className="block w-full py-3 rounded-xl bg-primary text-white text-center font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">Subscribe Now</Link>
              <div className="mt-6 space-y-3">
                 <div className="flex items-center gap-3 text-sm font-medium"><Icon name="check_circle" className="text-primary" size={20}/> Unlimited subscriptions</div>
                 <div className="flex items-center gap-3 text-sm font-medium"><Icon name="check_circle" className="text-primary" size={20}/> Advanced reminders & analytics</div>
                 <div className="flex items-center gap-3 text-sm font-medium"><Icon name="check_circle" className="text-primary" size={20}/> Export CSV/PDF reports</div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};