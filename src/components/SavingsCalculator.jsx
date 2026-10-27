import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, Sparkles, ArrowRight, HelpCircle, ShieldCheck, Layers, UtensilsCrossed } from 'lucide-react';
import confetti from 'canvas-confetti';
export const SavingsCalculator = ({ onOpenLeadModal }) => {
    // Calculator States
    const [outlets, setOutlets] = useState(1);
    const [dailyOrders, setDailyOrders] = useState(120);
    const [aov, setAov] = useState(340);
    const [currentFoodCostPct, setCurrentFoodCostPct] = useState(36);
    const [cuisine, setCuisine] = useState('North Indian & Curries');
    const [showItemBreakdown, setShowItemBreakdown] = useState(false);
    // Computations
    const calculations = useMemo(() => {
        // Monthly orders per outlet * outlets * 30 days
        const monthlyOrdersTotal = dailyOrders * 30 * outlets;
        const monthlyRevenue = monthlyOrdersTotal * aov;
        // Baseline current food & kitchen spend
        const currentFoodCostTotal = monthlyRevenue * (currentFoodCostPct / 100);
        // Prep labor cost estimate: typically 1 head master cook + 1 helper per outlet for prep (avg ₹35,000/mo per outlet)
        const prepLaborCostTotal = outlets * 38000;
        // Food wastage loss estimate: typically 9% of food cost is spoiled/thrown away
        const estimatedWastageTotal = currentFoodCostTotal * 0.09;
        // Savings with Republic Kitchen:
        // 1. Bulk raw material & central gravies: saves 22% on food cost
        const rawMaterialSavings = currentFoodCostTotal * 0.22;
        // 2. Prep labor cut: can replace 1 dedicated morning prep cook per outlet, saving 65% of prep payroll
        const prepLaborSavings = prepLaborCostTotal * 0.65;
        // 3. Wastage elimination: reduced to <1% (saves 85% of previous wastage)
        const wastageSavings = estimatedWastageTotal * 0.85;
        const totalMonthlySavings = Math.round(rawMaterialSavings + prepLaborSavings + wastageSavings);
        const totalAnnualProfit = totalMonthlySavings * 12;
        // Margin boost calculation
        const currentNetMargin = 12; // average 12% for takeaway
        const marginBoost = Math.min(16, Number(((totalMonthlySavings / monthlyRevenue) * 100).toFixed(1)));
        const newNetMargin = currentNetMargin + marginBoost;
        // Weekly prep hours saved
        const weeklyHoursSaved = outlets * 28;
        return {
            monthlyRevenue,
            monthlyOrdersTotal,
            currentFoodCostTotal,
            rawMaterialSavings: Math.round(rawMaterialSavings),
            prepLaborSavings: Math.round(prepLaborSavings),
            wastageSavings: Math.round(wastageSavings),
            totalMonthlySavings,
            totalAnnualProfit,
            marginBoost,
            newNetMargin,
            weeklyHoursSaved,
        };
    }, [outlets, dailyOrders, aov, currentFoodCostPct]);
    const handleCelebrate = () => {
        try {
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
            });
        }
        catch {
            // ignore in environments without canvas
        }
        onOpenLeadModal({
            outlets,
            dailyOrders,
            aov,
            monthlyRevenue: calculations.monthlyRevenue,
            monthlySavings: calculations.totalMonthlySavings,
            annualProfit: calculations.totalAnnualProfit,
            cuisine,
        });
    };
    const formatINR = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };
    return (<section id="calculator" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient decorative glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"/>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
          <Calculator className="w-4 h-4 text-amber-400"/>
          Interactive Profit & ROI Calculator
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          How Much More Can Your Takeaway <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">Earn Every Month?</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Adjust the sliders below to your actual kitchen volume. See the exact rupee savings across raw ingredients, prep labor, and eliminated food wastage.
        </p>
      </div>

      {/* Calculator Grid Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-amber-400"/>
                Kitchen Operational Inputs
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Customize to reflect your takeaway or QSR setup</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-amber-300 border border-slate-700">
              Live Dynamic Model
            </span>
          </div>

          <div className="space-y-6">
            {/* Input 1: Cuisine Type */}
            <div>
              <label className="text-sm font-semibold text-slate-200 block mb-2">
                Primary Cuisine / Concept
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
            'North Indian & Curries',
            'Biryani & Kebabs',
            'Indo-Chinese & Rolls',
            'Multi-Cuisine QSR'
        ].map((item) => (<button key={item} type="button" onClick={() => setCuisine(item)} className={`py-2 px-3 rounded-xl text-xs font-medium transition-all text-center border ${cuisine === item
                ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-semibold shadow-sm shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-300 border-slate-700/70 hover:border-slate-600 hover:text-white'}`}>
                    {item}
                  </button>))}
              </div>
            </div>

            {/* Input 2: Number of Outlets */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                  Number of Outlets / Cloud Kitchens
                  <span className="text-xs text-slate-500" title="Includes takeaways, cloud kitchens, or QSR counters">(Takeaways)</span>
                </label>
                <span className="text-base font-bold text-amber-400 bg-amber-500/10 px-3 py-0.5 rounded-lg border border-amber-500/20">
                  {outlets} {outlets === 1 ? 'Outlet' : 'Outlets'}
                </span>
              </div>
              <input type="range" min="1" max="15" step="1" value={outlets} onChange={(e) => setOutlets(Number(e.target.value))} className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"/>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1 Single Takeaway</span>
                <span>5 Outlets</span>
                <span>10 Outlets</span>
                <span>15+ Chain</span>
              </div>
            </div>

            {/* Input 3: Daily Orders per Outlet */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Average Daily Orders <span className="text-xs text-slate-400">(per outlet)</span>
                </label>
                <span className="text-base font-bold text-amber-400 bg-amber-500/10 px-3 py-0.5 rounded-lg border border-amber-500/20">
                  {dailyOrders} orders / day
                </span>
              </div>
              <input type="range" min="30" max="600" step="10" value={dailyOrders} onChange={(e) => setDailyOrders(Number(e.target.value))} className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"/>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>30 (Growing)</span>
                <span>150 (Busy Takeaway)</span>
                <span>350 (High Vol.)</span>
                <span>600+ (Express QSR)</span>
              </div>
            </div>

            {/* Input 4: Average Order Value (AOV) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Average Order Value (AOV)
                </label>
                <span className="text-base font-bold text-amber-400 bg-amber-500/10 px-3 py-0.5 rounded-lg border border-amber-500/20">
                  ₹{aov}
                </span>
              </div>
              <input type="range" min="150" max="900" step="20" value={aov} onChange={(e) => setAov(Number(e.target.value))} className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"/>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>₹150 (Snack/Rolls)</span>
                <span>₹350 (Standard Meal)</span>
                <span>₹600 (Family Pack)</span>
                <span>₹900+ (Large Bucket)</span>
              </div>
            </div>

            {/* Input 5: Current Food Cost % */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                  Current Food Cost % of Revenue
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500"/>
                </label>
                <span className="text-base font-bold text-rose-400 bg-rose-500/10 px-3 py-0.5 rounded-lg border border-rose-500/20">
                  {currentFoodCostPct}%
                </span>
              </div>
              <input type="range" min="26" max="46" step="1" value={currentFoodCostPct} onChange={(e) => setCurrentFoodCostPct(Number(e.target.value))} className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"/>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>28% (Tight)</span>
                <span>35% (Industry Avg.)</span>
                <span>40% (Danger Zone)</span>
                <span>46% (Severe Leakage)</span>
              </div>
            </div>

            {/* Monthly Revenue Preview Card */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Estimated Monthly Business Revenue
                </span>
                <p className="text-xl font-bold text-slate-200">
                  {formatINR(calculations.monthlyRevenue)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Monthly Orders
                </span>
                <p className="text-lg font-bold text-amber-400">
                  {calculations.monthlyOrdersTotal.toLocaleString('en-IN')} orders
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Results Card (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-hidden glow-amber">
          {/* Top badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-4">
            <TrendingUp className="w-3.5 h-3.5"/>
            Projected Profit Increase
          </div>

          <div className="mb-6">
            <span className="text-sm font-semibold text-slate-300 block">
              Estimated Monthly Cost Savings
            </span>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 tracking-tight mt-1">
              {formatINR(calculations.totalMonthlySavings)}
              <span className="text-base sm:text-lg font-medium text-slate-400"> / month</span>
            </div>
          </div>

          {/* Big Annual Impact highlight */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                Extra Net Profit Per Year
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                {formatINR(calculations.totalAnnualProfit)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
                +{calculations.marginBoost}% Net Margin
              </span>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Bulk Food & Base Gravy Savings</div>
                  <div className="text-[11px] text-slate-400">22% lower cost than in-house scratch prep</div>
                </div>
              </div>
              <span className="text-sm font-bold text-amber-300">
                +{formatINR(calculations.rawMaterialSavings)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Morning Chef Prep Payroll Cut</div>
                  <div className="text-[11px] text-slate-400">No master prep chef dependency</div>
                </div>
              </div>
              <span className="text-sm font-bold text-blue-300">
                +{formatINR(calculations.prepLaborSavings)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Eliminated Scrap & Perishability</div>
                  <div className="text-[11px] text-slate-400">Portion-controlled sealed packs (&lt;1% waste)</div>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-300">
                +{formatINR(calculations.wastageSavings)}
              </span>
            </div>
          </div>

          {/* Operational Metrics grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 pt-2 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-800/40 text-center">
              <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1"/>
              <div className="text-lg font-bold text-white">{calculations.weeklyHoursSaved} hrs</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Weekly Prep Time Saved</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 text-center">
              <Sparkles className="w-4 h-4 text-emerald-400 mx-auto mb-1"/>
              <div className="text-lg font-bold text-emerald-400">3 - 5 Mins</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Kitchen Ticket Speed</div>
            </div>
          </div>

          {/* Main High Converting Call To Action */}
          <button type="button" onClick={handleCelebrate} className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer">
            <span>Lock In These Savings & Get Free Tasting Kit</span>
            <ArrowRight className="w-5 h-5 text-slate-950"/>
          </button>

          <p className="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline"/>
            No obligation. We ship complimentary samples directly to your kitchen.
          </p>

          {/* Toggle Item Breakdown Accordion */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
            <button type="button" onClick={() => setShowItemBreakdown(!showItemBreakdown)} className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 cursor-pointer">
              <Layers className="w-3.5 h-3.5"/>
              {showItemBreakdown ? 'Hide Item-Level Comparison' : 'See Item-Level Cost Comparison (₹/Kg)'}
            </button>
          </div>
        </div>
      </div>

      {/* Item-Level Comparison Table (Shows when toggled) */}
      {showItemBreakdown && (<div className="mt-8 bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-400"/>
                Raw Ingredient & Prep Cost Comparison (Per Kg)
              </h4>
              <p className="text-xs text-slate-400">Based on prevailing commercial wholesale commodity and chef labor costs</p>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 self-start sm:self-auto font-medium">
              Average 27% Direct Ingredient Savings
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider">
                  <th className="pb-3 font-semibold">Kitchen Item / Prep</th>
                  <th className="pb-3 font-semibold">In-House Scratch Prep (Labor + Gas + Raw)</th>
                  <th className="pb-3 font-semibold text-amber-400">Republic Kitchen Ready Cost</th>
                  <th className="pb-3 font-semibold text-emerald-400">Direct Cost Cut</th>
                  <th className="pb-3 font-semibold">Prep Time Needed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                <tr>
                  <td className="py-3.5 font-semibold text-white">Signature Makhani Gravy Base</td>
                  <td className="py-3.5 text-rose-400 line-through">₹245 / kg</td>
                  <td className="py-3.5 font-bold text-amber-300">₹175 / kg</td>
                  <td className="py-3.5 font-bold text-emerald-400">- 28.5%</td>
                  <td className="py-3.5 text-slate-400">180 Secs (vs 3.5 hrs)</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-semibold text-white">Golden Onion-Tomato Chop Paste</td>
                  <td className="py-3.5 text-rose-400 line-through">₹185 / kg</td>
                  <td className="py-3.5 font-bold text-amber-300">₹130 / kg</td>
                  <td className="py-3.5 font-bold text-emerald-400">- 29.7%</td>
                  <td className="py-3.5 text-slate-400">Ready instantly (vs 2.5 hrs)</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-semibold text-white">Tandoori Tikka Marinated Cuts (Chicken/Paneer)</td>
                  <td className="py-3.5 text-rose-400 line-through">₹320 / kg (with trimming losses)</td>
                  <td className="py-3.5 font-bold text-amber-300">₹248 / kg (100% usable yield)</td>
                  <td className="py-3.5 font-bold text-emerald-400">- 22.5%</td>
                  <td className="py-3.5 text-slate-400">Zero prep time</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-semibold text-white">Indo-Chinese Master Schezwan & Manchurian Base</td>
                  <td className="py-3.5 text-rose-400 line-through">₹165 / kg</td>
                  <td className="py-3.5 font-bold text-amber-300">₹118 / kg</td>
                  <td className="py-3.5 font-bold text-emerald-400">- 28.4%</td>
                  <td className="py-3.5 text-slate-400">Wok-ready 60 secs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>)}
    </section>);
};
