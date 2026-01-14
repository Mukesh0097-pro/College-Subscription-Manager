import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const subscriptions = [
  { id: '1', title: 'Netflix Premium', date: 'Renews Jan 17', provider: 'Netflix', image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop', type: 'Entertainment', price: 15.99, status: 'Active', isProOnly: false },
  { id: '2', title: 'Spotify Family Plan', date: 'Renews Jan 21', provider: 'Spotify', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600&h=400&fit=crop', type: 'Pro Only', price: 16.99, status: 'Active', isProOnly: true },
  { id: '3', title: 'Amazon Prime', date: 'Renews Jan 25', provider: 'Amazon', image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=600&h=400&fit=crop', type: 'Trial Ending', price: 14.99, status: 'Trial', isProOnly: false, urgent: true },
  { id: '4', title: 'Adobe Creative Cloud', date: 'Renews Feb 05', provider: 'Adobe', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop', type: 'Productivity', price: 54.99, status: 'Active', isProOnly: false },
];

export const ExploreEvents: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
       <div className="w-full bg-white/95 backdrop-blur-sm z-10 sticky top-0 border-b border-gray-100">
          <div className="px-6 md:px-8 pt-8 pb-4 max-w-[1440px] mx-auto w-full flex flex-col gap-6">
             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                   <h1 className="text-3xl font-bold text-text-main">My Subscriptions</h1>
                   <p className="text-text-secondary">Track Netflix, Spotify, Prime, gym memberships, and all your services.</p>
                </div>
                <div className="w-full lg:max-w-md relative">
                   <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                   <input type="text" placeholder="Search by service, category, or tag..." className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                </div>
             </div>
             <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2 overflow-x-auto pb-1">
                   {['Category: All', 'Status: Active', 'Billing: Any'].map((filter, i) => (
                      <button key={i} className="flex items-center gap-2 h-9 px-4 rounded-lg bg-white border border-gray-200 hover:border-primary/50 text-sm font-medium whitespace-nowrap">
                         <Icon name={i===0?'category':i===1?'check_circle':'payments'} size={18} />
                         {filter}
                         <Icon name="arrow_drop_down" size={18} className="text-gray-400" />
                      </button>
                   ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                   <span className="text-text-secondary">Sort by:</span>
                   <span className="text-primary cursor-pointer flex items-center gap-1">Price: High to Low <Icon name="sort" size={18} /></span>
                </div>
             </div>
          </div>
       </div>

       <div className="p-6 md:p-8 max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {subscriptions.map((sub) => (
                <div key={sub.id} className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border ${sub.isProOnly ? 'border-yellow-500/30' : 'border-gray-100'}`}>
                   <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                      <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${sub.isProOnly ? 'grayscale-[50%]' : ''}`} style={{backgroundImage: `url(${sub.image})`}}></div>
                      {sub.isProOnly ? (
                         <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Icon name="lock" size={14} />
                            <p className="text-xs font-bold uppercase">Pro Only</p>
                         </div>
                      ) : (
                         <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md shadow-sm ${sub.urgent ? 'bg-error text-white animate-pulse' : 'bg-white/90 text-primary'}`}>
                            <p className="text-xs font-bold uppercase tracking-wider">{sub.type}</p>
                         </div>
                      )}
                      {!sub.isProOnly && <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>}
                   </div>
                   
                   <div className={`flex flex-col flex-1 p-5 gap-4 ${sub.isProOnly ? 'bg-yellow-50/30' : ''}`}>
                      <div>
                         <h3 className="text-xl font-bold text-text-main line-clamp-2 mb-2 group-hover:text-primary transition-colors">{sub.title}</h3>
                         <div className="flex flex-col gap-1.5 text-sm text-text-secondary">
                            <div className="flex items-center gap-2"><Icon name="calendar_month" size={18} /> <span className={sub.urgent ? 'text-error font-semibold' : ''}>{sub.date}</span></div>
                            <div className="flex items-center gap-2"><Icon name="payments" size={18} /> ${sub.price}/month</div>
                         </div>
                      </div>

                      <div className="mt-auto">
                         {sub.isProOnly ? (
                            <>
                               <p className="text-sm text-text-secondary mb-3 flex items-center gap-2"><Icon name="info" className="text-yellow-600" size={16} /> Requires Pro Plan to track</p>
                               <Link to="/pricing" className="w-full h-10 flex items-center justify-center rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-700 text-sm font-bold transition-all">Upgrade to Pro</Link>
                            </>
                         ) : (
                            <>
                               <div className="flex justify-between items-center mb-3">
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${sub.status === 'Trial' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>
                                     <Icon name={sub.status === 'Trial' ? 'hourglass_top' : 'check_circle'} size={14} /> {sub.status}
                                  </span>
                                  <span className="text-sm font-bold text-primary">${sub.price}/mo</span>
                               </div>
                               <div className="flex gap-2">
                                  <Link to="/student/event/1" className="flex-1 h-10 flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors shadow-lg shadow-primary/20">View</Link>
                                  <button className="h-10 px-3 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-text-secondary text-sm font-semibold transition-colors">
                                     <Icon name="edit" size={18} />
                                  </button>
                               </div>
                            </>
                         )}
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};