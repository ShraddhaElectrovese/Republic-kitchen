import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
export const StickyBottomBar = ({ onScrollToCalculator, onOpenLeadModal, }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setVisible(true);
            }
            else {
                setVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    if (!visible)
        return null;
    return (<div className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none animate-fadeIn">
      <div className="max-w-3xl mx-auto pointer-events-auto bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-3 sm:px-6 sm:py-3.5 shadow-2xl shadow-black/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 hidden sm:flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <span>See How Much Your QSR Can Earn More</span>
              <span className="text-emerald-400 text-xs font-semibold hidden md:inline">
                (Avg +24% Profit)
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              Free Kitchen Tasting Box + Detailed Cost Reduction Audit
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={onScrollToCalculator} className="py-2 px-3.5 sm:px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold border border-slate-700 cursor-pointer transition-colors">
            Calculate Savings
          </button>
          <button type="button" onClick={onOpenLeadModal} className="py-2 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all flex items-center gap-1">
            <span>Free Sample Box</span>
            <ArrowRight className="w-3.5 h-3.5"/>
          </button>
        </div>
      </div>
    </div>);
};
