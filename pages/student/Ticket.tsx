import React from 'react';
import { Icon } from '../../components/Icon';

export const Ticket: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 w-full max-w-[1440px] mx-auto min-h-[80vh]">
      <div className="w-full max-w-[460px] flex flex-col gap-8 animate-fade-in-up">
         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
            <div className="h-2 w-full bg-gradient-to-r from-primary to-blue-500"></div>
            <div className="px-8 pt-8 pb-10 flex flex-col items-center relative z-10">
               <div className="text-center w-full mb-6">
                  <h1 className="text-2xl font-bold text-text-main mb-2">Graduation Ceremony</h1>
                  <p className="text-text-secondary text-sm font-medium tracking-wide uppercase">Class of 2024</p>
               </div>
               <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-6 mx-auto">
                  <div className="h-48 w-48 md:h-56 md:w-56 bg-contain bg-center bg-no-repeat rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA69RlxrEPEdQk1UVWoT5ypJs3hntbPIJNRLPMXkFPkQMkt30OpmkBIKla4Af1bHb2m2pXRZBNBjTSKe0BjEY0-XuU4kNtt5Vovz9tO7q54DdFBkc82CiPi-3pLGF8K_3Xm8A10meYv0iMz8OrEy1spuVeNKmBxdfM5lbbEUOPgrtG1s1LTCSO4bS7SdmIB7iniS9TgcvHUSd5QEUXdVPoUaPn8tB0Knnx1U3BswFd7vWFh90dTIats3NPO2SLgBvN64rjWpxRFAqib")'}}></div>
               </div>
               <div className="mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200">
                     <Icon name="verified" className="text-success" size={16} />
                     <span className="text-green-700 text-xs font-bold uppercase tracking-wider">Valid Ticket</span>
                  </div>
               </div>
               <div className="w-full h-px border-t border-dashed border-gray-300 mb-8"></div>
               <div className="grid grid-cols-2 gap-y-6 gap-x-4 w-full text-left">
                  <div className="flex flex-col gap-1.5">
                     <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Student</span>
                     <span className="text-text-main font-bold text-base md:text-lg truncate">Alex Johnson</span>
                  </div>
                  <div className="flex flex-col gap-1.5 items-end text-right">
                     <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Booking ID</span>
                     <span className="text-text-main font-bold text-base md:text-lg font-mono">#CP-88429</span>
                  </div>
                  <div className="flex flex-col gap-1.5 col-span-2 bg-background-light p-3 rounded-lg">
                     <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold pl-1">Date & Time</span>
                     <div className="flex items-center gap-2.5 text-text-main">
                        <div className="bg-white p-1.5 rounded-md shadow-sm flex items-center justify-center text-primary"><Icon name="calendar_month" size={20} /></div>
                        <span className="font-semibold text-sm md:text-base">May 24, 2024 • 10:00 AM</span>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1.5 col-span-2 bg-background-light p-3 rounded-lg">
                     <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold pl-1">Venue</span>
                     <div className="flex items-center gap-2.5 text-text-main">
                        <div className="bg-white p-1.5 rounded-md shadow-sm flex items-center justify-center text-primary"><Icon name="location_on" size={20} /></div>
                        <span className="font-semibold text-sm md:text-base">Grand Hall, Main Campus</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25">
               <Icon name="download" /> <span>Download</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-text-main px-5 py-3.5 rounded-xl font-semibold transition-colors">
               <Icon name="calendar_today" className="text-gray-500" /> <span>Calendar</span>
            </button>
         </div>
         <p className="text-gray-400 text-xs text-center mt-2">This ticket is non-transferable and subject to terms of service.</p>
      </div>
    </div>
  );
};