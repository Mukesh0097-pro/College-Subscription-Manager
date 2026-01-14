import React, { useState } from 'react';
import { Icon } from '../../components/Icon';

export const Scanner: React.FC = () => {
  const [result, setResult] = useState<'pending' | 'success' | 'error'>('pending');

  const simulateAnalysis = () => {
     setResult('success');
     setTimeout(() => setResult('pending'), 3000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full relative overflow-hidden">
      {/* Analytics View */}
      <section className="flex-1 bg-background-dark flex flex-col items-center justify-center p-6 relative">
         <div className="w-full max-w-3xl flex flex-col items-center">
            <h1 className="text-white text-3xl font-bold mb-2">Spending Analytics</h1>
            <p className="text-gray-400 text-sm mb-8">Analyze your subscription spending patterns.</p>
            
            <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 group cursor-pointer" onClick={simulateAnalysis}>
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20"></div>
               <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs border border-white/10">
                  <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span>
                  Live Tracking
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                     <Icon name="insights" size={64} className="text-primary mx-auto mb-4" />
                     <p className="text-white text-2xl font-bold">$342.45</p>
                     <p className="text-gray-400 text-sm">Total Monthly Spend</p>
                  </div>
               </div>
               <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                  <button className="bg-white/20 p-3 rounded-full text-white"><Icon name="pie_chart" /></button>
                  <button className="bg-white/20 p-3 rounded-full text-white"><Icon name="bar_chart" /></button>
               </div>
               
               {/* Click Hint Overlay */}
               <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg">Click to Analyze</span>
               </div>
            </div>
         </div>
      </section>

      {/* Result Panel */}
      <aside className="w-full lg:w-[400px] bg-background-light border-l border-gray-200 flex flex-col h-full shadow-xl z-10">
         {result === 'success' ? (
             <div className="p-8 bg-white border-b border-gray-100 flex flex-col gap-6 animate-fade-in-up">
                <div className="flex justify-between items-center">
                   <h3 className="font-bold text-lg">Analysis Result</h3>
                   <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold uppercase">Updated</span>
                </div>
                <div className="flex flex-col items-center gap-4 py-2">
                   <div className="relative">
                      <div className="size-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white">
                         <Icon name="savings" size={40} />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1 border-2 border-white"><Icon name="check" size={16} className="block" /></div>
                   </div>
                   <div className="text-center">
                      <h2 className="text-2xl font-bold">$47.50 Saved</h2>
                      <p className="text-text-secondary text-sm">This month vs last month</p>
                   </div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-4">
                   <div className="size-12 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Icon name="trending_down" size={24} /></div>
                   <div><p className="text-green-800 font-bold text-lg">12% Reduction</p><p className="text-green-600 text-sm">In spending this month</p></div>
                </div>
                <button className="w-full h-12 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold flex items-center justify-center gap-2">
                   <Icon name="download" /> Export Report
                </button>
             </div>
         ) : (
            <div className="p-8 bg-white border-b border-gray-100 flex flex-col items-center justify-center gap-4 min-h-[400px]">
               <div className="p-4 bg-gray-50 rounded-full text-gray-300"><Icon name="insights" size={48} /></div>
               <p className="text-gray-400">Click to run analysis...</p>
            </div>
         )}

         <div className="flex-1 bg-gray-50 flex flex-col min-h-0">
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 bg-white sticky top-0">
               <h3 className="text-xs font-bold uppercase text-gray-500">Top Spending Categories</h3>
               <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">This Month</span>
            </div>
            <div className="overflow-y-auto p-4 space-y-3">
               {[
                 { name: 'Entertainment', amount: '$148.97', status: '+5%', color: 'red' },
                 { name: 'Productivity', amount: '$109.98', status: '-12%', color: 'green' },
                 { name: 'Fitness', amount: '$49.99', status: '0%', color: 'gray' },
               ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm`}>
                     <div className={`size-10 rounded-full bg-${item.color === 'red' ? 'red' : item.color === 'green' ? 'green' : 'gray'}-50 flex items-center justify-center text-${item.color === 'red' ? 'red' : item.color === 'green' ? 'green' : 'gray'}-600`}>
                        <Icon name={i === 0 ? 'movie' : i === 1 ? 'work' : 'fitness_center'} size={20} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.amount}</p>
                     </div>
                     <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.color==='red'?'bg-red-50 text-red-600':item.color==='green'?'bg-green-50 text-green-600':'bg-gray-100 text-gray-600'}`}>{item.status}</div>
                  </div>
               ))}
            </div>
         </div>
      </aside>
    </div>
  );
};