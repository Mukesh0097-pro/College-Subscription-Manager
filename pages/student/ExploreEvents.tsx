import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const events = [
  { id: '1', title: 'Annual Tech Hackathon 2024', date: 'Oct 24 • 10:00 AM', location: 'Main Engineering Hall', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmiBj6kAU312LnVdpM-E-UF4lFI3bUCCCwWnqF4IDc1T5MrNI2NgOs4O_adcJcHD7YLWhOXQPGT0fB-8sdewb8RQI06pC7oeE5cRXEpp4UQb4jhDzgqN4PhS4ltv-i8SICso_3Bhx7d89LcxIeeFUNbLpn3duNbwDZZsdR1_pUIqCmCK4tkiNV4XlVNxFKfsWXQR_g7JPaYjf3bi2ejfJXSq5KOicwig8am4Fv_IRRxKPzP7b_z9DiwO_LtL3z8XY61Eobbm2TAVCl', type: 'Workshop', progress: 85, seats: 12, isGold: false },
  { id: '2', title: 'VIP Alumni Networking Night', date: 'Nov 02 • 06:00 PM', location: 'Student Union Lounge', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcaISl1ZIzA-WgUq9fVY2UiVk4DeD1PSiINpI_o93pVhL-h23F87KJPKJ7THvU3LXPgZBB1VAPczlol8UeEiVs8jbE1dD-3x8Mm008JZVEFP1O1j7P4LxOCe1XfAi3XrRJ1iRMKdAgnmXns77Ab9MjGV6JkxdhZ2gYDveS4iM77kcbmO7TSzzWqtnIv5NBRjKyU-F7okfWWFLjGzWYwBSRRx2r6ZB5q6sqalbvbydEhzXgcL5bSPbrs7R9gTylHPUdJYueFMRzGq_D', type: 'Gold Only', progress: 0, seats: 0, isGold: true },
  { id: '3', title: 'Varsity Basketball Finals', date: 'Tonight • 07:30 PM', location: 'Campus Arena', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPxBvnLFqPpr5SyddfzgPAS8nGWuoTWvDRpkT0gEccet2A3rc10VIVXfK1et47gZxOLMZu9iXhEzM9rjB68noNr50wHX22IIS3BcKDMOpFcErl5Bqmb8RWdlV0FZEVx94bHBN9aDFhPLy8A-s-5kt-n3gPF2NEd4-vsQj-FiSFegDfRPPeUDtVKev5pw49mziJ-sNwL9AI6InGDI6xqYqhxHQG3ZgGEJa4dyu-TLwXwD4xOB-YFNn6EqSsFLw3KbrJNbOPeQ6o2WqX', type: 'Selling Out', progress: 95, seats: 5, isGold: false, urgent: true },
  { id: '4', title: 'Fall Music Festival', date: 'Nov 05 • 02:00 PM', location: 'The Quad', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS6hT4dItz2fGUJFhPXX-ce_cvmZmd6c-aEoUs4wKZiG9xN8hqkxjs01OVT2WO4ZIaJ2dKLkWo99aWddSAfhmCZpwyGXFUULCxUaU0VxAXbv_czSzgraIGCQNZDrFog5Te4s_ErroG37ggcILCv7_oI5KewuANfkiQIpYVgnuIO0GdNg4EOv2lD52dbyjhOUIrEzHtKZBXN7GLhzjUlNf--evvKp-IgEbzH67Nc2PTd5IXW259WaG0Iod0g9kCre8pd-HiLxiv93lV', type: 'Social', progress: 45, seats: 500, isGold: false },
];

export const ExploreEvents: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
       <div className="w-full bg-white/95 backdrop-blur-sm z-10 sticky top-0 border-b border-gray-100">
          <div className="px-6 md:px-8 pt-8 pb-4 max-w-[1440px] mx-auto w-full flex flex-col gap-6">
             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                   <h1 className="text-3xl font-bold text-text-main">Explore Events</h1>
                   <p className="text-text-secondary">Find workshops, seminars, and social activities on campus.</p>
                </div>
                <div className="w-full lg:max-w-md relative">
                   <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                   <input type="text" placeholder="Search by event, venue, or tag..." className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                </div>
             </div>
             <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2 overflow-x-auto pb-1">
                   {['Category: All', 'Date: This Week', 'Access: Any'].map((filter, i) => (
                      <button key={i} className="flex items-center gap-2 h-9 px-4 rounded-lg bg-white border border-gray-200 hover:border-primary/50 text-sm font-medium whitespace-nowrap">
                         <Icon name={i===0?'category':i===1?'calendar_today':'lock_open'} size={18} />
                         {filter}
                         <Icon name="arrow_drop_down" size={18} className="text-gray-400" />
                      </button>
                   ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                   <span className="text-text-secondary">Sort by:</span>
                   <span className="text-primary cursor-pointer flex items-center gap-1">Recommended <Icon name="sort" size={18} /></span>
                </div>
             </div>
          </div>
       </div>

       <div className="p-6 md:p-8 max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {events.map((evt) => (
                <div key={evt.id} className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border ${evt.isGold ? 'border-yellow-500/30' : 'border-gray-100'}`}>
                   <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                      <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${evt.isGold ? 'grayscale-[50%]' : ''}`} style={{backgroundImage: `url(${evt.image})`}}></div>
                      {evt.isGold ? (
                         <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Icon name="lock" size={14} />
                            <p className="text-xs font-bold uppercase">Gold Only</p>
                         </div>
                      ) : (
                         <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md shadow-sm ${evt.urgent ? 'bg-error text-white animate-pulse' : 'bg-white/90 text-primary'}`}>
                            <p className="text-xs font-bold uppercase tracking-wider">{evt.type}</p>
                         </div>
                      )}
                      {!evt.isGold && <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>}
                   </div>
                   
                   <div className={`flex flex-col flex-1 p-5 gap-4 ${evt.isGold ? 'bg-yellow-50/30' : ''}`}>
                      <div>
                         <h3 className="text-xl font-bold text-text-main line-clamp-2 mb-2 group-hover:text-primary transition-colors">{evt.title}</h3>
                         <div className="flex flex-col gap-1.5 text-sm text-text-secondary">
                            <div className="flex items-center gap-2"><Icon name="calendar_month" size={18} /> <span className={evt.urgent ? 'text-error font-semibold' : ''}>{evt.date}</span></div>
                            <div className="flex items-center gap-2"><Icon name="location_on" size={18} /> {evt.location}</div>
                         </div>
                      </div>

                      <div className="mt-auto">
                         {evt.isGold ? (
                            <>
                               <p className="text-sm text-text-secondary mb-3 flex items-center gap-2"><Icon name="info" className="text-yellow-600" size={16} /> Requires Gold Membership</p>
                               <Link to="/pricing" className="w-full h-10 flex items-center justify-center rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-700 text-sm font-bold transition-all">Upgrade to Book</Link>
                            </>
                         ) : (
                            <>
                               <div className="flex justify-between items-end mb-1.5 text-xs">
                                  <span className={`font-medium ${evt.urgent ? 'text-error' : 'text-text-secondary'}`}>{evt.urgent ? 'Almost Full!' : 'Seats Filling Fast'}</span>
                                  <span className={`font-bold ${evt.urgent ? 'text-error' : 'text-primary'}`}>{evt.urgent ? `${evt.seats} seats left` : `${evt.seats} seats left`}</span>
                               </div>
                               <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                  <div className={`h-full rounded-full ${evt.urgent ? 'bg-error' : 'bg-primary'}`} style={{width: `${evt.progress}%`}}></div>
                               </div>
                               <Link to="/student/event/1" className="mt-4 w-full h-10 flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors shadow-lg shadow-primary/20">Book Now</Link>
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