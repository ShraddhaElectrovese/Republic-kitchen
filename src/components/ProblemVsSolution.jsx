import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { COMPARISONS } from '../data/campaignData';
export const ProblemVsSolution = ({ onScrollToCalculator }) => {
    return (<section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
          <AlertTriangle className="w-4 h-4"/>
          The Harsh Reality of Indian QSRs
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Why Traditional In-House Prep Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300">Quietly Killing Your Margins</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Most takeaway founders focus only on getting more orders, while losing 20-30% of revenue in kitchen inefficiency, prep salaries, and daily food spoilage.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPARISONS.map((item, idx) => (<div key={idx} className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-3">
                {item.metric}
              </span>

              {/* In-house Problem */}
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/30 mb-3.5">
                <div className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5"/>
                  <div>
                    <span className="text-xs font-bold text-rose-300 uppercase tracking-wide block">
                      In-House Prep Chaos
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                      {item.inHouse}
                    </p>
                  </div>
                </div>
              </div>

              {/* Republic Kitchen Solution */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"/>
                  <div>
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide block">
                      With Republic Kitchen
                    </span>
                    <p className="text-xs sm:text-sm text-white font-medium mt-1 leading-snug">
                      {item.republicKitchen}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Rupee Impact */}
            <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Profit Impact:</span>
              <span className="text-emerald-400 font-bold text-right">{item.impact}</span>
            </div>
          </div>))}
      </div>

      {/* Mid CTA Box */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to stop the kitchen leakage and recover ₹1,00,000+ every month?
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            See exactly how much your takeaway brand saves with our interactive calculator.
          </p>
        </div>
        <button type="button" onClick={onScrollToCalculator} className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer">
          <span>Calculate Now</span>
          <ArrowRight className="w-4 h-4"/>
        </button>
      </div>
    </section>);
};
