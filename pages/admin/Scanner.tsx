import React, { useState } from 'react';
import { Icon } from '../../components/Icon';

export const Scanner: React.FC = () => {
  const [result, setResult] = useState<'pending' | 'success' | 'error'>('pending');

  const simulateScan = () => {
     setResult('success');
     setTimeout(() => setResult('pending'), 3000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full relative overflow-hidden">
      {/* Scanner View */}
      <section className="flex-1 bg-background-dark flex flex-col items-center justify-center p-6 relative">
         <div className="w-full max-w-3xl flex flex-col items-center">
            <h1 className="text-white text-3xl font-bold mb-2">Scan QR Code</h1>
            <p className="text-gray-400 text-sm mb-8">Align the student's ticket within the frame.</p>
            
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 group cursor-pointer" onClick={simulateScan}>
               <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhs5oSWgLsIx2R1-hFdyCkwTp-yCen-fcLEV_3Tq-sFmTnFVkO9-OZSh4BK2QvWSxcxoCDVtD0VL47PgJwK3Nzx1iWneege8inlm03wAOnVUoF4bR8zBjy4MnrH8hNwNX2vsb0uA5Qwt-jd-eQFHQNZFLsWvtYvQkyEAjFhVElywTCV4_4FrP0a6gXRjk1NN7MRC2jzufVQvmQryhfVgRA0Fei9l8DWxw7Gf36aTdphtB7IUz0bRifOA5_gA5o20ZhoI3cpfFCi1jk")'}}></div>
               <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs border border-white/10">
                  <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span></span>
                  Camera Active
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 border-2 border-white/30 rounded-lg">
                     <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                     <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                     <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                     <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                     <div className="absolute top-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_15px_rgba(55,19,236,0.8)] animate-scan"></div>
                  </div>
               </div>
               <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                  <button className="bg-white/20 p-3 rounded-full text-white"><Icon name="cameraswitch" /></button>
                  <button className="bg-white/20 p-3 rounded-full text-white"><Icon name="flash_on" /></button>
               </div>
               
               {/* Click Hint Overlay */}
               <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg">Click to Simulate Scan</span>
               </div>
            </div>
         </div>
      </section>

      {/* Result Panel */}
      <aside className="w-full lg:w-[400px] bg-background-light border-l border-gray-200 flex flex-col h-full shadow-xl z-10">
         {result === 'success' ? (
             <div className="p-8 bg-white border-b border-gray-100 flex flex-col gap-6 animate-fade-in-up">
                <div className="flex justify-between items-center">
                   <h3 className="font-bold text-lg">Scanned Result</h3>
                   <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold uppercase">New Scan</span>
                </div>
                <div className="flex flex-col items-center gap-4 py-2">
                   <div className="relative">
                      <div className="size-24 rounded-full bg-cover bg-center border-4 border-white shadow-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_tan4GUbHGSnMtx6PUlx6hMRcZvehMFUH0ZYTlhP0dJkasTB90qvacS5iAHQHW-3OY_52z2Jmk6fT-y7YpmGN18xXApCqONIukKkH08C7ht_fXybp94bQFTATEo4cWC6R_8CK2zqZu3XbHlu6KZEaVzRLMGlpiNRkMnn_mRWrMwbTDVfoejGe29v-CHlAUshT9XbI9CVpEOmUWGH4ApEi8aouIXlqXG3_apge9gZYL6HtEMX2Zt0wulU3dtOvT-sdc062f3v1CHHM")'}}></div>
                      <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1 border-2 border-white"><Icon name="check" size={16} className="block" /></div>
                   </div>
                   <div className="text-center">
                      <h2 className="text-2xl font-bold">Alex Johnson</h2>
                      <p className="text-text-secondary text-sm">ID: #2023-8492 | CS Dept</p>
                   </div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-4">
                   <div className="size-12 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Icon name="verified" size={24} /></div>
                   <div><p className="text-green-800 font-bold text-lg">Verified</p><p className="text-green-600 text-sm">Fall Orientation</p></div>
                </div>
                <button className="w-full h-12 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold flex items-center justify-center gap-2">
                   <Icon name="how_to_reg" /> Mark Attendance
                </button>
             </div>
         ) : (
            <div className="p-8 bg-white border-b border-gray-100 flex flex-col items-center justify-center gap-4 min-h-[400px]">
               <div className="p-4 bg-gray-50 rounded-full text-gray-300"><Icon name="qr_code_scanner" size={48} /></div>
               <p className="text-gray-400">Waiting for scan...</p>
            </div>
         )}

         <div className="flex-1 bg-gray-50 flex flex-col min-h-0">
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 bg-white sticky top-0">
               <h3 className="text-xs font-bold uppercase text-gray-500">Recent Scans</h3>
               <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">12 today</span>
            </div>
            <div className="overflow-y-auto p-4 space-y-3">
               {[
                 { name: 'Sarah Lee', id: '9921', status: 'VERIFIED', color: 'green' },
                 { name: 'Michael Chen', id: '4102', status: 'VERIFIED', color: 'green' },
                 { name: 'Unknown ID', id: 'FAILED', status: 'INVALID', color: 'red' },
               ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 bg-white rounded-lg border ${item.color === 'red' ? 'border-red-100' : 'border-gray-100'} shadow-sm`}>
                     <div className="size-10 rounded-full bg-gray-200 bg-cover" style={{backgroundImage: `url(https://picsum.photos/40/40?random=${i})`}}></div>
                     <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className={`text-xs truncate ${item.color==='red'?'text-red-500':'text-gray-500'}`}>#{item.id}</p>
                     </div>
                     <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.color==='red'?'bg-red-50 text-red-600':'bg-green-50 text-green-600'}`}>{item.status}</div>
                  </div>
               ))}
            </div>
         </div>
      </aside>
    </div>
  );
};