import React from 'react';
import { Star, TrendingUp, Building2, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/campaignData';
export const Testimonials = () => {
    return (<section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
          <TrendingUp className="w-4 h-4"/>
          Real Numbers. Real QSR Founders.
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          How These Takeaway Brands <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Doubled Their Net Profits</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Listen to operators who transformed their kitchen operations from chaotic 5-hour daily prep into streamlined, highly profitable food engines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (<div key={t.id} className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:shadow-2xl relative">
            <div>
              {/* Star ratings */}
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400"/>))}
              </div>

              {/* Metric Card */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 mb-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase text-emerald-400 tracking-wider">
                    Monthly Savings
                  </span>
                  <div className="text-xl font-black text-white">{t.monthlySavings}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-300 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30">
                    {t.profitIncrease}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3.5">
              <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/40"/>
              <div>
                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                <div className="text-xs text-amber-400 font-medium">{t.brand}</div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500"/>
                    {t.city}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-500"/>
                    {t.outlets} Outlets
                  </span>
                </div>
              </div>
            </div>
          </div>))}
      </div>
    </section>);
};
