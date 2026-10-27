import React from 'react';
import { TrendingUp, ArrowRight, Flame, Clock, IndianRupee, Sparkles, CheckCircle2, Users } from 'lucide-react';
import { CAMPAIGN_STATS } from '../data/campaignData';
export const Hero = ({ onScrollToCalculator, onOpenLeadModal }) => {
    return (<section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background visual graphics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl"/>
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl"/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-amber-500/5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Special Campaign for Takeaways & Indian QSRs</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">Cut 25%+ Food & Prep Costs</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Stop Burning <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400">30% of Your Profit</span> In Morning Kitchen Prep
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Republic Kitchen powers Takeaway and Indian QSR kitchens with ready-to-use master base gravies, marinated cuts & standardized pantry supplies. 
            <strong className="text-amber-400 font-semibold"> Eliminate chef tantrums, slash wastage to zero, and cook orders in 3 minutes flat.</strong>
          </p>

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button type="button" onClick={onScrollToCalculator} className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-base tracking-wide shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer group">
              <TrendingUp className="w-5 h-5 text-slate-950"/>
              <span>Calculate Your Increased Profit</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform"/>
            </button>

            <button type="button" onClick={onOpenLeadModal} className="w-full sm:w-auto py-4 px-7 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm tracking-wide border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg">
              <Flame className="w-4 h-4 text-amber-400"/>
              <span>Request Free Chef Tasting Kit</span>
            </button>
          </div>

          {/* Quick trust checklist */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-400 mb-16">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
              No expensive equipment needed
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
              100% Signature Taste Preserved
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
              Fast 48-Hour Kitchen Onboarding
            </span>
          </div>

          {/* Campaign Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl text-left">
            <div className="p-3">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Users className="w-3.5 h-3.5 text-amber-400"/>
                Active QSRs Served
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {CAMPAIGN_STATS.activeOutletsServed}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Cloud kitchens & takeaways</div>
            </div>

            <div className="p-3 border-l-0 sm:border-l border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400"/>
                Avg. Food Cost Cut
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {CAMPAIGN_STATS.avgFoodCostSavings}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Straight to your bottomline</div>
            </div>

            <div className="p-3 border-l-0 md:border-l border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-400"/>
                Ticket Dispatch Time
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                3 to 5 Mins
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Down from 18-25 mins earlier</div>
            </div>

            <div className="p-3 border-l-0 sm:border-l border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400"/>
                Taste Consistency
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {CAMPAIGN_STATS.tasteConsistencyRate}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Lab calibrated recipe specs</div>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
