import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import '../styles/footer.css';

export const Footer = ({ onScrollToCalculator, onOpenLeadModal }) => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img
                src="/logo.png"
                alt="Republic of Kitchens"
                className="footer-logo-img"
              />
              <div className="footer-brand-title">
                Republic <span className="footer-title-accent">Of Kitchens</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Central culinary science, master bulk gravies &amp; standardized cold-chain pantry solutions for Indian takeaways, QSRs, and cloud kitchens.
            </p>
            <div className="footer-fssai-badge">
              <span>✓</span> FSSAI Central License &amp; HACCP Certified
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="footer-col-title">Quick Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  onClick={onScrollToCalculator}
                  className="footer-nav-btn"
                >
                  <span>Savings &amp; Profit Calculator</span>
                  <ArrowRight size={13} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToCalculator}
                  className="footer-nav-btn"
                >
                  <span>In-House Prep vs Bulk Sourcing</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToCalculator}
                  className="footer-nav-btn"
                >
                  <span>Master Base Gravies &amp; Cuts</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToCalculator}
                  className="footer-nav-btn"
                >
                  <span>Founder Case Studies &amp; ROI</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cities Served */}
          <div>
            <h4 className="footer-col-title">Operating Hub</h4>
            <p className="footer-cities-desc">
              Daily cold-chain delivery in:
            </p>
            <div className="footer-cities-tags">
              {['Chandigarh'].map((c) => (
                <span key={c} className="footer-city-tag">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Kitchen Support Desk & CTA */}
          <div>
            <h4 className="footer-col-title">Kitchen Support Desk</h4>
            <div className="footer-contact-list">
              <a
                href="tel:+919876543210"
                className="footer-contact-item"
              >
                <Phone className="footer-contact-icon" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="mailto:partners@republickitchen.in"
                className="footer-contact-item"
              >
                <Mail className="footer-contact-icon" />
                <span>partners@republickitchen.in</span>
              </a>
              <div className="footer-contact-item">
                <MapPin className="footer-contact-icon" />
                <span>Central Food Tech Park, India</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenLeadModal}
              className="footer-cta-btn"
            >
              <span>Request Free Tasting Kit</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {new Date().getFullYear()} Republic of Kitchens. All rights reserved.
          </div>
          <div className="footer-bottom-trust">
            <span>Confidentiality Assured</span>
            <span>&bull;</span>
            <span>FSSAI Compliant</span>
            <span>&bull;</span>
            <span>Zero Preservative Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
