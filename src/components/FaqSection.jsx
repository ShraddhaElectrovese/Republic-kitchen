import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/campaignData';
export const FaqSection = ({ onOpenLeadModal }) => {
    const [openIdx, setOpenIdx] = useState(0);
    const toggle = (idx) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };
    return (<section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
          <HelpCircle className="w-4 h-4"/>
          Frequently Answered Questions
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Everything QSR & Takeaway Owners Ask Us
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-300">
          Have more questions? Our kitchen operational leads are available for a direct phone or WhatsApp consultation.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (<div key={idx} className={`rounded-2xl border transition-all ${isOpen
                    ? 'bg-slate-900 border-amber-500/40 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}>
              <button type="button" onClick={() => toggle(idx)} className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer">
                <span className="font-bold text-sm sm:text-base text-white">
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
              </button>
              {isOpen && (<div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 mt-1 pt-4">
                  {faq.a}
                </div>)}
            </div>);
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="mt-12 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5"/>
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Have a specific kitchen question?</h4>
            <p className="text-xs text-slate-400">Speak directly with an executive chef regarding your recipes.</p>
          </div>
        </div>
        <button type="button" onClick={onOpenLeadModal} className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs shrink-0 cursor-pointer border border-slate-700">
          Request Callback
        </button>
      </div>
    </section>);
};
