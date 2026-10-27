import React from 'react';
import { Download, Coins, TrendingUp, DollarSign, ChefHat, Package, ArrowRight, CheckCircle2, UtensilsCrossed } from 'lucide-react';
import '../styles/results.css';
// Recommended target margins and sourcing solutions per item type
const getItemEconomics = (itemName, currentMargin) => {
    const lower = itemName.toLowerCase();
    if (lower.includes('paneer') || lower.includes('makhani')) {
        return {
            recommendedMargin: Math.max(34, currentMargin + 18),
            inHouseCost: '₹145',
            rkCost: '₹105',
            savingPerPortion: '₹40 / plate',
            sourcing: 'Semi-prepared Makhani / Onion-Tomato Base',
        };
    }
    else if (lower.includes('biryani')) {
        return {
            recommendedMargin: Math.max(32, currentMargin + 16),
            inHouseCost: '₹120',
            rkCost: '₹86',
            savingPerPortion: '₹34 / portion',
            sourcing: 'Central Dum Marinade & Spiced Rice Base',
        };
    }
    else if (lower.includes('dal')) {
        return {
            recommendedMargin: Math.max(38, currentMargin + 20),
            inHouseCost: '₹95',
            rkCost: '₹62',
            savingPerPortion: '₹33 / portion',
            sourcing: 'Slow-simmered 14-Hr Dal Makhani Base',
        };
    }
    else if (lower.includes('noodle') || lower.includes('manchurian') || lower.includes('chinese')) {
        return {
            recommendedMargin: Math.max(36, currentMargin + 18),
            inHouseCost: '₹85',
            rkCost: '₹56',
            savingPerPortion: '₹29 / plate',
            sourcing: 'Wok-ready Master Schezwan / Manchurian Paste',
        };
    }
    else if (lower.includes('dosa') || lower.includes('idli')) {
        return {
            recommendedMargin: Math.max(36, currentMargin + 17),
            inHouseCost: '₹65',
            rkCost: '₹44',
            savingPerPortion: '₹21 / plate',
            sourcing: 'Fermented Premium Batter & Instant Sambhar Base',
        };
    }
    else {
        return {
            recommendedMargin: Math.max(33, currentMargin + 16),
            inHouseCost: '₹110',
            rkCost: '₹78',
            savingPerPortion: '₹32 / portion',
            sourcing: 'Semi-prepared central kitchen supply',
        };
    }
};
export const ResultsPage = ({ data, onOpenLeadForm, onRecalculate, }) => {
    // Calculations based on footfall, AOV, and margin
    const monthlyCustomers = data.footfall * 30;
    const estimatedMonthlyRevenue = monthlyCustomers * data.aov;
    const currentMarginAmount = Math.round(estimatedMonthlyRevenue * (data.currentMargin / 100));
    // Potential margin with Republic Kitchen increases overall margin by ~3% to 4% margin points
    const potentialMarginPct = Math.min(45, data.currentMargin + 3);
    const potentialMarginAmount = Math.round(estimatedMonthlyRevenue * (potentialMarginPct / 100));
    const additionalMonthlyProfit = potentialMarginAmount - currentMarginAmount;
    const relativeIncreasePct = Math.round(((potentialMarginAmount - currentMarginAmount) / currentMarginAmount) * 100) || 20;
    // Selected items or fallback defaults
    const displayItems = data.selectedMenuItems && data.selectedMenuItems.length > 0
        ? data.selectedMenuItems
        : ['Paneer Butter Masala', 'Dal Makhani', 'Kadai Paneer'];
    const formatINR = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };
    const handleDownload = () => {
        window.print();
    };
    return (<div className="results-page-wrapper">
      <div className="results-container">
        {/* Header Row */}
        <div className="results-header-row">
          <div className="results-title-group">
            <span className="party-popper-icon">🎉</span>
            <div>
              <h2 className="results-title">
                {data.brandName ? `Profit Potential for ${data.brandName}` : "Your Restaurant's Profit Potential"}
              </h2>
              <p className="results-subtitle">
                {data.contactPerson
            ? `Prepared for ${data.contactPerson}${data.city ? ` (${data.city})` : ''} • Here is your customized margin roadmap and savings with Republic Kitchen.`
            : "Based on the information you provided, here's how you can improve your profits with Republic Kitchen."}
              </p>
            </div>
          </div>

          <button type="button" className="btn-download-summary" onClick={handleDownload}>
            <Download size={15}/>
            <span>Download Summary</span>
          </button>
        </div>

        {/* 3 Metrics Cards */}
        <div className="metrics-three-grid">
          <div className="metric-stat-card">
            <div className="metric-stat-header">
              <div className="metric-stat-icon stat-icon-yellow">
                <Coins size={16}/>
              </div>
              <span className="metric-stat-label">Current Estimated Monthly Revenue</span>
            </div>
            <div className="metric-stat-value">
              {formatINR(estimatedMonthlyRevenue)}
            </div>
          </div>

          <div className="metric-stat-card">
            <div className="metric-stat-header">
              <div className="metric-stat-icon stat-icon-orange">
                <TrendingUp size={16}/>
              </div>
              <span className="metric-stat-label">Current Margin</span>
            </div>
            <div className="metric-stat-value">
              {data.currentMargin}%
            </div>
            <div className="metric-stat-sub">
              ({formatINR(currentMarginAmount)})
            </div>
          </div>

          <div className="metric-stat-card">
            <div className="metric-stat-header">
              <div className="metric-stat-icon stat-icon-green">
                <TrendingUp size={16}/>
              </div>
              <span className="metric-stat-label">Potential Margin</span>
            </div>
            <div className="metric-stat-value">
              {potentialMarginPct}%
            </div>
            <div className="metric-stat-sub">
              ({formatINR(potentialMarginAmount)})
            </div>
          </div>
        </div>

        {/* Big Green Highlight Banner: Increase Margin by Up to 20% */}
        <div className="additional-profit-highlight">
          <div className="highlight-left-block">
            <div className="highlight-profit-icon">
              <DollarSign size={24}/>
            </div>
            <div>
              <span className="highlight-profit-label">Additional Monthly Profit</span>
              <div className="highlight-profit-amount">
                {formatINR(additionalMonthlyProfit)}
              </div>
            </div>
          </div>

          <div className="highlight-right-block">
            <div>
              <span className="highlight-boost-label">Increase Your Margin by Upto</span>
              <div className="highlight-boost-value">
                {relativeIncreasePct}% with Republic Kitchen
              </div>
            </div>
          </div>
        </div>

        <p className="results-disclaimer-note">
          Note: These are estimated figures based on the information provided. Actual results may vary.
        </p>

        {/* =========================================================
            ITEM-WISE MARGIN ANALYSIS SECTION
            "The result shows them the margin that they should have per item."
            ========================================================= */}
        <div className="items-margin-section">
          <div className="items-margin-header">
            <h3 className="items-margin-title">
              <UtensilsCrossed size={18} className="text-[#f25c27]"/>
              Recommended Margin Per Item You Sell
            </h3>
            <span className="items-margin-badge">
              Item-By-Item Margin Optimization
            </span>
          </div>

          <div className="items-table-wrapper">
            <table className="items-margin-table">
              <thead>
                <tr>
                  <th>Menu Item</th>
                  <th>Current Margin</th>
                  <th>Recommended Target Margin</th>
                  <th>Direct Savings</th>
                  <th>Republic Kitchen Sourcing Solution</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map((item) => {
            const eco = getItemEconomics(item, data.currentMargin);
            return (<tr key={item}>
                      <td className="item-name-cell">
                        <span>{item}</span>
                      </td>
                      <td>
                        <span className="margin-chip-current">
                          {data.currentMargin}%
                        </span>
                      </td>
                      <td>
                        <span className="margin-chip-target">
                          {eco.recommendedMargin}% Target Margin
                        </span>
                      </td>
                      <td>
                        <span className="cost-saving-badge">
                          Save {eco.savingPerPortion}
                        </span>
                      </td>
                      <td>
                        <span className="solution-sourcing-tag">
                          {eco.sourcing}
                        </span>
                      </td>
                    </tr>);
        })}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================
            HOW TO INCREASE YOUR MARGIN SECTION
            "It also tells increase your margin by upto 20% by:
             - Adding new items with ready recipes and hire margins
             - Get semi prepared items sourced for better margins"
            ========================================================= */}
        <h3 className="how-increase-title">
          How to Increase Your Margin by Upto 20%
        </h3>
        <div className="how-increase-grid">
          {/* Card 1: Ready Recipes & Higher Margins */}
          <div className="how-card">
            <div className="how-card-left">
              <div className="how-card-header">
                <div className="how-card-icon how-icon-orange">
                  <ChefHat size={18}/>
                </div>
                <h4 className="how-card-title">Add New Items with Ready Recipes</h4>
              </div>

              <div className="how-points-list">
                <div className="how-point-item">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0"/>
                  <span>Chef curated, high margin items</span>
                </div>
                <div className="how-point-item">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0"/>
                  <span>Diverse cuisines to attract more customers</span>
                </div>
                <div className="how-point-item">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0"/>
                  <span>Easy to prepare with consistent quality</span>
                </div>
              </div>
            </div>

            <img src="/cuisine-north-indian.jpg" alt="Ready Recipes" className="how-dish-thumbnail"/>
          </div>

          {/* Card 2: Semi-Prepared Items Sourced */}
          <div className="how-card">
            <div className="how-card-left">
              <div className="how-card-header">
                <div className="how-card-icon how-icon-green">
                  <Package size={18}/>
                </div>
                <h4 className="how-card-title">Get Semi Prepared Items Sourced</h4>
              </div>

              <div className="how-points-list">
                <div className="how-point-item">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0"/>
                  <span>Better pricing and higher margins</span>
                </div>
                <div className="how-point-item">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0"/>
                  <span>Save time and reduce kitchen effort</span>
                </div>
                <div className="how-point-item">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0"/>
                  <span>Consistent taste and quality</span>
                </div>
              </div>
            </div>

            <img src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80" alt="Semi Prepared Sourcing" className="how-dish-thumbnail"/>
          </div>
        </div>

        {/* Bottom CTA to claim tasting kit / contact specialist */}
        <div className="results-bottom-cta-box">
          <div className="results-cta-text">
            <h4>Ready to Lock In These Profit Gains{data.brandName ? ` for ${data.brandName}` : ''}?</h4>
            <p>
              {data.mobileNumber
            ? `Our culinary specialist will reach out to ${data.contactPerson || 'you'} at ${data.mobileNumber} to arrange your complimentary master base tasting kit.`
            : 'Get a personalized profit plan and complimentary tasting kit delivered to your kitchen.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer" onClick={onRecalculate}>
              Recalculate
            </button>
            <button type="button" className="btn-get-plan" onClick={onOpenLeadForm}>
              <span>Request Free Tasting Kit</span>
              <ArrowRight size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>);
};
