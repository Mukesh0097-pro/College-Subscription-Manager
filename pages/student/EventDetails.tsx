import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';

export const EventDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
       <nav className="flex mb-6 text-sm">
          <Link to="/student" className="text-gray-500 hover:text-primary">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/student/explore" className="text-gray-500 hover:text-primary">Events</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-text-main font-medium">Future of AI</span>
       </nav>

       <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY3cl50jKPBaH5gpESCiBsTaWivjOguCd7Pstit2nCrVVoZa-XEmEsSVGZNdoPDgUhu99u-Z8eI6DGUPR1hTKbeo8HBXwcf_rCBdvuuiFMat7E3AyFgnsMr4DLJw-v4CyNHeYgFo0Srhw_GcaJVxEI4RkA5N0za6yFZg9-oKDKbkMoqtnJmxTc8_11wdk5KEiMzamvG5bvX8MLQ7xYVxpPhqQScLlmCUFZ6pupHq_wQLjHj-1kb1fbLXc88MT_EvzE8O6koEzW5yPR")'}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md border border-white/30">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span> Open for Registration
             </span>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-8">
             <div>
                <div className="flex gap-2 mb-4">
                   <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium">Technology Workshop</span>
                   <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium">Intermediate Level</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-text-main mb-4 leading-tight">Future of AI in Education Summit 2024</h1>
                <p className="text-lg text-text-secondary leading-relaxed">Join us for a deep dive into AI's impact on learning strategies and campus technology.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-y border-gray-100">
                <div className="flex items-start gap-4">
                   <div className="p-2.5 rounded-lg bg-gray-100 text-gray-700"><Icon name="calendar_month" /></div>
                   <div>
                      <p className="font-semibold text-text-main">Date & Time</p>
                      <p className="text-sm text-text-secondary mt-0.5">Oct 24, 2024</p>
                      <p className="text-sm text-text-secondary">10:00 AM - 2:00 PM EST</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="p-2.5 rounded-lg bg-gray-100 text-gray-700"><Icon name="location_on" /></div>
                   <div>
                      <p className="font-semibold text-text-main">Location</p>
                      <p className="text-sm text-text-secondary mt-0.5">Innovation Hub, Room 304</p>
                      <a href="#" className="text-sm text-primary font-medium hover:underline">View on Map</a>
                   </div>
                </div>
             </div>

             <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold mb-4">About this Event</h3>
                <p className="text-text-secondary mb-4">The rapid advancement of Artificial Intelligence is transforming every sector. This summit brings together thought leaders to discuss ethical AI integration.</p>
                <h4 className="text-lg font-bold mb-3">Key Takeaways</h4>
                <ul className="space-y-2 mb-6 text-text-secondary">
                   <li className="flex gap-2"><Icon name="check_circle" className="text-success" size={20} /> Understanding Prompt Engineering</li>
                   <li className="flex gap-2"><Icon name="check_circle" className="text-success" size={20} /> AI Detection Strategies</li>
                   <li className="flex gap-2"><Icon name="check_circle" className="text-success" size={20} /> Networking with EdTech Innovators</li>
                </ul>
             </div>

             <div>
                <h3 className="text-xl font-bold mb-6">Featured Speakers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcS71nMgcYkQZ4lBI73GwSTcYxAgoRe38X-S3w1Fp5cJ9QjMmF2ulP8_y2vwOvQ3W7cfRGTV1zvS1_QTYZzRY3C3uV9zFo1Hot22Gmsr83mScUzhydeX6Krqrl9XUJ-C2LjbUdUXFFCi4R-IW2kjJrkWmdlpMVeDpGq5Lf4-hJf4TUlCt5TWYC2Lu2vRRlqHkDkMuL9uTNFdBcM_EkZV3r7OdvvhbRwXDqB4W0_H54lcuRQfmLnT7EJPcFEeDzvFCwY6YuslGs9PGm" className="w-16 h-16 rounded-full object-cover bg-gray-200" alt="Speaker" />
                      <div>
                         <p className="font-bold text-text-main">Dr. Elena Fisher</p>
                         <p className="text-xs font-medium text-primary uppercase mb-1">Head of CS Dept</p>
                         <p className="text-sm text-gray-500 line-clamp-1">Neural Networks Researcher</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKGBViA8ivMXx8BsymCjCal8MzYqjIAndpH0Tz-6sQFZsV2WomHLtHsnPVCnMkv-reijqOJKEmXBgN63V8beHeN_Peop4TMNhfOUeaFixyrVVRVS73ciZCK6m-EP67qN1fPUV-apZvUWcHi3WYOqk0tW2b3_kn8Iwolo6EgMsLLkFNsLoHVoG1qP1fmM7qHYJjw0iQHoZlW2QzTsv3I2lFV39yYyDN9UY4fLVlToUCVxn7BHnAxvFJ4nw9bbHs6ASmGrarvcpsCMfW" className="w-16 h-16 rounded-full object-cover bg-gray-200" alt="Speaker" />
                      <div>
                         <p className="font-bold text-text-main">Mark Doe</p>
                         <p className="text-xs font-medium text-primary uppercase mb-1">AI Research Lead</p>
                         <p className="text-sm text-gray-500 line-clamp-1">Ex-Google Engineer</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="relative lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg">
                   <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">Registration</h3>
                      <span className="bg-orange-50 text-orange-700 text-xs font-bold px-2 py-1 rounded">Selling Fast</span>
                   </div>
                   <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                         <span className="text-gray-600 font-medium">Availability</span>
                         <span className="text-primary font-bold">45/50 Filled</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                         <div className="bg-primary h-2.5 rounded-full w-[90%]"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Only 5 spots left for this session.</p>
                   </div>
                   <div className="flex items-center gap-3 p-3 mb-6 rounded-lg bg-green-50 border border-green-100">
                      <div className="bg-green-100 rounded-full p-1 text-success"><Icon name="check" size={16} /></div>
                      <div>
                         <p className="text-sm font-semibold text-green-800">You are eligible</p>
                         <p className="text-xs text-green-700">Free with your CampusPass Plus</p>
                      </div>
                   </div>
                   <Link to="/student/ticket" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                      <span>Book Event</span>
                      <Icon name="arrow_forward" size={20} />
                   </Link>
                </div>
                
                <div className="rounded-xl p-5 bg-white border border-gray-100 shadow-sm flex items-center justify-between">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => <div key={i} className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 bg-cover" style={{backgroundImage: `url(https://picsum.photos/32/32?random=${i+10})`}}></div>)}
                      <div className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">+42</div>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-semibold">42 Colleagues</p>
                      <p className="text-[10px] text-gray-500">are attending</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};