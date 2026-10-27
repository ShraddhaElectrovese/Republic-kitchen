import React from 'react';
import { Sparkles, Utensils, BarChart3, GraduationCap, Truck, ArrowRight } from 'lucide-react';
export const HowItWorks = ({ onOpenLeadModal, onScrollToCalculator }) => {
    const steps = [
        {
            step: '01',
            title: 'Free Chef Tasting Kit',
            description: 'We send a complimentary 5-sample tasting kit directly to your kitchen. Test the flavor, texture, and aroma alongside your existing dishes.',
            icon: Utensils,
            highlight: 'Zero Cost / No Commitment',
        },
        {
            step: '02',
            title: 'Custom Profit & Recipe Audit',
            description: 'Our culinary operational specialists analyze your current food cost sheet, identifying instant 20-30% margin optimizations across gravies and proteins.',
            icon: BarChart3,
            highlight: 'Personalized Rupee Blueprint',
        },
        {
            step: '03',
            title: '60-Min Kitchen SOP Training',
            description: 'Our chef demonstrates the 3-minute finish process to your line cooks. Anyone can prepare consistent 5-star dishes without relying on an expensive master ustad.',
            icon: GraduationCap,
            highlight: 'Eliminates Chef Dependency',
        },
        {
            step: '04',
            title: 'Scheduled JIT Cold-Chain Supply',
            description: 'Fresh batch sealed packs delivered 2-3 times a week directly to your refrigerator. Maintain fresh inventory with zero scrap or vegetable spoilage.',
            icon: Truck,
            highlight: 'Fresh Batches Every 48 Hours',
        },
    ];
    return (<section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
          <Sparkles className="w-4 h-4"/>
          Seamless 4-Step Onboarding
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          How Your Takeaway Transitions to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-amber-300">High-Margin Operation</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          No new equipment, no kitchen remodeling, zero downtime. Start saving money from your very next order cycle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((st, i) => {
            const Icon = st.icon;
            return (<div key={i} className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all hover:-translate-y-1 group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-6 h-6"/>
                  </div>
                  <span className="text-3xl font-black text-slate-700/60 font-heading">
                    {st.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {st.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-900/40 inline-block">
                  {st.highlight}
                </span>
              </div>
            </div>);
        })}
      </div>

      <div className="mt-12 text-center">
        <button type="button" onClick={onOpenLeadModal} className="inline-flex items-center gap-2 py-3.5 px-7 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer">
          <span>Claim Step 1: Request Free Kitchen Tasting Box</span>
          <ArrowRight className="w-4 h-4"/>
        </button>
      </div>
    </section>);
};
