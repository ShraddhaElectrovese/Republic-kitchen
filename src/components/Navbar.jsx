import React from 'react';
import { ArrowRight, Menu } from 'lucide-react';
import '../styles/navbar.css';
export const Navbar = ({ onStartCalculator, onGoHome, }) => {
    return (<header className="navbar-container">
      {/* Main Top Header */}
      <div className="navbar-inner">
        {/* Brand Lockup: Prominent Logo + Clear High-Contrast Title */}
        <div className="navbar-brand" onClick={onGoHome} role="button" tabIndex={0} aria-label="Republic of Kitchens">
          <div className="brand-logo-wrapper">
            <img src="/logo.png" alt="Republic of Kitchens" className="brand-logo-img"/>
          </div>
          <div className="brand-text-container">
            <div className="brand-title-main">
              Republic <span className="brand-title-accent">Of Kitchens</span>
            </div>
            <div className="brand-tagline">
              Commercial Kitchen Solutions
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <button type="button" className="nav-link" onClick={onGoHome}>
            How It Works
          </button>
          <button type="button" className="nav-link" onClick={onGoHome}>
            Our Products
          </button>
          <button type="button" className="nav-link" onClick={onGoHome}>
            Benefits
          </button>
          <button type="button" className="nav-link" onClick={onGoHome}>
            FAQs
          </button>
        </nav>

        {/* Right CTA Button */}
        <button type="button" className="navbar-cta-btn" onClick={onStartCalculator}>
          <span>Calculate Your Savings</span>
          <ArrowRight size={14}/>
        </button>

        {/* Mobile menu icon */}
        <button type="button" className="mobile-menu-btn" onClick={onStartCalculator}>
          <Menu size={22}/>
        </button>
      </div>
    </header>);
};
