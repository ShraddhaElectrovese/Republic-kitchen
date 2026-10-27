import React, { useState } from 'react';
import { ChefHat, Clock, IndianRupee, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/campaignData';
export const ProductCatalog = ({ onOpenLeadModal }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Gravies', 'Marinades', 'Snacks', 'Custom Solutions'];
    const filteredProducts = selectedCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === selectedCategory);
    return (<section id="products" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
          <ChefHat className="w-4 h-4"/>
          The Republic Kitchen Pantry
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Standardized Bases That Turn Any Cook Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">A Star Chef</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Crafted in certified central kitchens using zero fillers or synthetic preservatives. Ready to heat, season with your house touch, and dispatch in under 180 seconds.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (<button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'}`}>
              {cat}
            </button>))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => (<div key={prod.id} className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all hover:shadow-2xl group">
            <div>
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"/>
                
                {prod.badge && (<span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    {prod.badge}
                  </span>)}
                <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[11px] px-2.5 py-1 rounded-full font-medium border border-slate-700">
                  {prod.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {prod.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Popular dishes bullet */}
                <div className="mt-4 p-2.5 rounded-xl bg-slate-800/50 border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-amber-300">Popular dishes: </span>
                  {prod.popularFor}
                </div>

                {/* Metric pills */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-900/30 text-emerald-300 flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5"/>
                    <span>{prod.costReduction}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-950/30 border border-blue-900/30 text-blue-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5"/>
                    <span>{prod.prepTimeSaved}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="p-6 pt-0">
              <button type="button" onClick={() => onOpenLeadModal(prod.title)} className="w-full py-3 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs uppercase tracking-wider transition-all border border-slate-700 hover:border-amber-500 flex items-center justify-center gap-2 cursor-pointer">
                <span>Request Sample Batch</span>
                <ArrowRight className="w-3.5 h-3.5"/>
              </button>
            </div>
          </div>))}
      </div>

      {/* Custom Recipe Callout */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-400"/>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Do you have a protected proprietary recipe?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Our central kitchen produces custom proprietary batches with 100% legal Non-Disclosure Agreements (NDAs).
            </p>
          </div>
        </div>
        <button type="button" onClick={() => onOpenLeadModal('Custom Proprietary Recipe')} className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer border border-slate-700">
          Talk to R&D Chef
        </button>
      </div>
    </section>);
};
