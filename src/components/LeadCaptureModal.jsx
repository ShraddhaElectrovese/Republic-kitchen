import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
export const LeadCaptureModal = ({ isOpen, onClose, calculatedData, selectedProduct, }) => {
    const [name, setName] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [outletsCount, setOutletsCount] = useState(calculatedData ? `${calculatedData.outlets}` : '1');
    const [selectedSamples, setSelectedSamples] = useState([
        'Signature Makhani Gravy',
        'Golden Onion-Tomato Base',
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(() => {
        if (calculatedData) {
            setOutletsCount(`${calculatedData.outlets}`);
        }
    }, [calculatedData]);
    if (!isOpen)
        return null;
    const toggleSample = (sample) => {
        if (selectedSamples.includes(sample)) {
            setSelectedSamples(selectedSamples.filter((s) => s !== sample));
        }
        else {
            setSelectedSamples([...selectedSamples, sample]);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            try {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.5 },
                });
            }
            catch {
                // canvas check
            }
        }, 900);
    };
    const handleReset = () => {
        setIsSubmitted(false);
        onClose();
    };
    const formatINR = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };
    return (<div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button type="button" onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10 cursor-pointer">
          <X className="w-5 h-5"/>
        </button>

        {!isSubmitted ? (<div>
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-900 border-b border-slate-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5"/>
                Special Campaign Offer
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Claim Free Chef Tasting Kit & Custom Profit Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                We will dispatch sample packs of our base gravies and cuts directly to your kitchen.
              </p>

              {/* Dynamic Savings Tag if from Calculator */}
              {calculatedData && (<div className="mt-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide block">
                      Your Projected Monthly Savings
                    </span>
                    <span className="text-xl font-black text-white">
                      {formatINR(calculatedData.monthlySavings)} / mo
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">
                      +{formatINR(calculatedData.annualProfit)} / yr
                    </span>
                  </div>
                </div>)}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Your Name *
                  </label>
                  <input type="text" required placeholder="e.g. Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"/>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Restaurant / QSR Brand Name *
                  </label>
                  <input type="text" required placeholder="e.g. Curry Express" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    WhatsApp / Contact Number *
                  </label>
                  <input type="tel" required placeholder="10-digit mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"/>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    City / Kitchen Location *
                  </label>
                  <input type="text" required placeholder="e.g. Delhi NCR, Bengaluru, Mumbai" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"/>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Number of Outlets / Cloud Kitchens
                </label>
                <select value={outletsCount} onChange={(e) => setOutletsCount(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors">
                  <option value="1">1 Single Takeaway / Cloud Kitchen</option>
                  <option value="2-3">2 to 3 Outlets</option>
                  <option value="4-7">4 to 7 Outlets</option>
                  <option value="8+">8+ Outlets (Chain)</option>
                  <option value="Planning Launch">Planning to launch new QSR soon</option>
                </select>
              </div>

              {/* Sample Pack Preferences */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Select Free Samples For Your Trial Kit:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                'Signature Makhani Gravy',
                'Golden Onion-Tomato Base',
                'Marinated Tikka Cuts (Chicken/Paneer)',
                'Indo-Chinese Master Sauces',
            ].map((sample) => (<label key={sample} onClick={() => toggleSample(sample)} className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${selectedSamples.includes(sample)
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 font-medium'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400'}`}>
                      <input type="checkbox" checked={selectedSamples.includes(sample)} onChange={() => { }} className="accent-amber-500 rounded"/>
                      <span>{sample}</span>
                    </label>))}
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                  {isSubmitting ? (<span>Scheduling Kitchen Dispatch...</span>) : (<>
                      <span>Dispatch Free Sample Kit &amp; Savings Report</span>
                      <ArrowRight className="w-4 h-4"/>
                    </>)}
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400"/>
                100% Free. No credit card or commitment required.
              </div>
            </form>
          </div>) : (
        /* Success Confirmation State */
        <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
              <PackageCheck className="w-8 h-8"/>
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                Tasting Kit Confirmed!
              </span>
              <h3 className="text-2xl font-black text-white">
                We&apos;re Preparing Your Free Sample Box
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Thank you <strong className="text-amber-400">{name}</strong> ({restaurantName})! Our lead executive chef is reviewing your kitchen profile for <strong className="text-white">{city}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="text-amber-400 font-bold uppercase tracking-wide">
                Next Steps (Within 2 Business Hours):
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"/>
                <span>Our culinary operations rep will WhatsApp/call on <strong>{phone}</strong> to confirm your exact delivery slot.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"/>
                <span>Your custom QSR profit & food cost sheet will be emailed to your team.</span>
              </div>
            </div>

            <button type="button" onClick={handleReset} className="py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg">
              Back to Republic Kitchen
            </button>
          </div>)}
      </div>
    </div>);
};
