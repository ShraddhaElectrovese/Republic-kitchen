import React from 'react';
import { ArrowRight, Check, Clock, ClipboardCheck, CheckCircle2, BookOpen, ShieldCheck, Coins, Users2, Store, ChefHat, TrendingUp, Flame, Sparkles } from 'lucide-react';
import '../styles/landing-page.css';
export const LandingPageOverview = ({ onStartCalculator }) => {
    const whySectionRef = React.useRef(null);
    const [whyInView, setWhyInView] = React.useState(false);
    React.useEffect(() => {
        const checkVisibility = () => {
            if (whySectionRef.current) {
                const rect = whySectionRef.current.getBoundingClientRect();
                const vh = window.innerHeight || document.documentElement.clientHeight;
                // Trigger as soon as section is within 150px of the viewport bottom
                if (rect.top <= vh + 150 && rect.bottom >= -100) {
                    setWhyInView(true);
                }
            }
        };
        // 1. Check immediately on mount in case user is already scrolled to it
        checkVisibility();
        // 2. IntersectionObserver with 0 threshold and 150px rootMargin for early detection
        let observer = null;
        if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting || entry.intersectionRatio > 0) {
                        setWhyInView(true);
                    }
                });
            }, { threshold: 0, rootMargin: '150px 0px 100px 0px' });
            if (whySectionRef.current) {
                observer.observe(whySectionRef.current);
            }
        }
        // 3. Fallback scroll and resize listeners for rock-solid reliability
        window.addEventListener('scroll', checkVisibility, { passive: true });
        window.addEventListener('resize', checkVisibility, { passive: true });
        // 4. Safety fallback: make sure cards are never permanently invisible
        const safetyTimer = setTimeout(() => {
            setWhyInView(true);
        }, 1000);
        return () => {
            if (observer)
                observer.disconnect();
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
            clearTimeout(safetyTimer);
        };
    }, []);
    return (<div className="landing-page-root">
      {/* =========================================================
            1. HERO SECTION (Dynamic Flame Scene & Interactive UI)
            ========================================================= */}
      <section className="hero-wrapper">
        {/* Ambient Animated Flame Glow Behind Cooking Scene */}
        <div className="hero-flame-glow"></div>
        <div className="hero-flame-glow-secondary"></div>

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow-pill">
              <span className="eyebrow-dot"></span>
              <span>Next-Gen Cloud Kitchen &amp; Restaurant Solutions</span>
            </div>

            <h1 className="hero-heading">
              Your Kitchen <br />
              Could Be <br />
              <span className="hero-heading-highlight">Earning More.</span>
            </h1>
            <p className="hero-subheading">
              Discover how much profit you can unlock with smarter sourcing, ready-to-cook solutions and higher margin menu items.
            </p>

            <button type="button" className="hero-cta-btn" onClick={onStartCalculator}>
              <span>Calculate My Profit Potential</span>
              <ArrowRight size={16}/>
            </button>

            {/* Badges row styled as sleek modern chips */}
            <div className="hero-badges-row">
              <div className="hero-badge-item">
                <ClipboardCheck className="hero-badge-icon"/>
                <span>Free assessment</span>
              </div>
              <div className="hero-badge-item">
                <Clock className="hero-badge-icon"/>
                <span>Results in under 2 minutes</span>
              </div>
              <div className="hero-badge-item">
                <CheckCircle2 className="hero-badge-icon"/>
                <span>Up to 20% higher margins</span>
              </div>
            </div>
          </div>

          {/* Right Floating Dynamic Glassmorphic Stat Cards */}
          <div className="hero-floating-elements">
            <div className="hero-stat-card-floating">
              <div className="hero-stat-icon-wrap">
                <Flame size={18}/>
              </div>
              <div>
                <div className="hero-stat-val">&lt; 180s</div>
                <div className="hero-stat-sub">Average Cook Time</div>
              </div>
            </div>

            <div className="hero-chip-floating">
              <Sparkles size={14} className="hero-chip-icon"/>
              <span>Zero Morning Prep &bull; 100% Consistency</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
            2. FOUR FEATURE CARDS STRIP
            ========================================================= */}
      <section className="features-strip-section">
        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-strip-card">
            <div className="feature-icon-circle icon-circle-green">
              <ClipboardCheck size={20}/>
            </div>
            <div>
              <h4 className="feature-card-title">Lower Food Costs</h4>
              <p className="feature-card-desc">with semi prepared items</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-strip-card">
            <div className="feature-icon-circle icon-circle-orange">
              <BookOpen size={20}/>
            </div>
            <div>
              <h4 className="feature-card-title">Add High-Margin Menu Items</h4>
              <p className="feature-card-desc">with ready recipes</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-strip-card">
            <div className="feature-icon-circle icon-circle-blue">
              <ChefHat size={20}/>
            </div>
            <div>
              <h4 className="feature-card-title">Consistent Quality</h4>
              <p className="feature-card-desc">across all outlets</p>
            </div>
          </div>

          {/* Card 4 (Exact 3-line format matching mockup) */}
          <div className="feature-strip-card">
            <div className="feature-icon-circle icon-circle-coral">
              <Store size={20}/>
            </div>
            <div>
              <div className="feature-card-multi-title">
                Designed for Takeaways,<br />
                QSRs, Dine-in &amp;<br />
                Cloud Kitchens
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
            3. SMALL CHANGES. A BIGGER DIFFERENCE.
            ========================================================= */}
      <section className="section-difference">
        <div className="difference-grid">
          <div>
            <h2 className="difference-title">
              Small Changes. <br />
              <span className="difference-title-highlight">A Bigger Difference.</span>
            </h2>
            <p className="difference-subtitle">
              Find out how simple changes in your menu and procurement can significantly increase your margins.
            </p>

            <div className="difference-bullets">
              <div className="difference-bullet-item">
                <div className="bullet-check-circle">
                  <Check size={14} strokeWidth={3}/>
                </div>
                <span>Add new items with ready recipes and higher margins</span>
              </div>
              <div className="difference-bullet-item">
                <div className="bullet-check-circle">
                  <Check size={14} strokeWidth={3}/>
                </div>
                <span>Get semi prepared items sourced for better margins</span>
              </div>
              <div className="difference-bullet-item">
                <div className="bullet-check-circle">
                  <Check size={14} strokeWidth={3}/>
                </div>
                <span>Save time, reduce effort and maintain consistent quality</span>
              </div>
            </div>
          </div>

          <div className="difference-image-container">
            {/* Top-left floating badge */}
            <div className="floating-accent-pill">
              <div className="accent-icon-wrap">
                <ChefHat size={14}/>
              </div>
              <span>Ready Recipes &amp; Sourcing</span>
            </div>

            <img src="/indian-cuisine-spread-blended.png" alt="Gourmet Indian Cuisine Spread" className="difference-dish-img"/>

            {/* Floating Margin Pill */}
            <div className="floating-margin-pill">
              <span className="pill-label">Up to</span>
              <div className="pill-value-row">
                <span className="pill-value">20%</span>
                <div className="pill-trend-icon-box">
                  <TrendingUp size={18} strokeWidth={2.8}/>
                </div>
              </div>
              <span className="pill-subtext">Higher Margins</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
            4. TRUSTED BY GROWING FOOD BUSINESSES
            ========================================================= */}
      <section className="trusted-strip-wrapper">
        <div className="trusted-strip">
          <div className="trusted-badge-tab">
            Trusted by Growing Food Businesses
          </div>
          <div className="trusted-icons-row">
            {/* 1. Takeaways */}
            <div className="trusted-item">
              <svg className="trusted-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Takeaways</span>
            </div>

            {/* 2. QSRs */}
            <div className="trusted-item">
              <svg className="trusted-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>QSRs</span>
            </div>

            {/* 3. Dining Restaurants */}
            <div className="trusted-item">
              <svg className="trusted-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 4 3 6 3 8h6c0-2 3-4 3-8z"></path>
                <line x1="8" y1="18" x2="16" y2="18"></line>
                <line x1="9" y1="21" x2="15" y2="21"></line>
              </svg>
              <span>Dining Restaurants</span>
            </div>

            {/* 4. Cloud Kitchens */}
            <div className="trusted-item">
              <svg className="trusted-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="3"></circle>
                <path d="M12 8v3"></path>
              </svg>
              <span>Cloud Kitchens</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
            5. DARK CTA BANNER: SEE YOUR PROFIT POTENTIAL
            ========================================================= */}
      <section className="steps-dark-banner">
        <div className="steps-banner-inner">
          <div className="steps-banner-header">
            <div>
              <h3 className="steps-banner-title">
                See Your Profit Potential <br />
                in Just a Few Steps
              </h3>
              <p className="steps-banner-desc">
                Answer a few simple questions and get your personalized insights in under 2 minutes.
              </p>
            </div>
            <button type="button" className="steps-banner-btn" onClick={onStartCalculator}>
              <span>Calculate Now</span>
              <ArrowRight size={14}/>
            </button>
          </div>

          <div className="steps-grid">
            <div className="step-item">
              <div className="step-num-badge">1</div>
              <div className="step-text">Tell us about your business</div>
            </div>
            <div className="step-item">
              <div className="step-num-badge">2</div>
              <div className="step-text">Select cuisines and menu items</div>
            </div>
            <div className="step-item">
              <div className="step-num-badge">3</div>
              <div className="step-text">Enter a few numbers</div>
            </div>
            <div className="step-item">
              <div className="step-num-badge">4</div>
              <div className="step-text">See your potential profit increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
            6. WHY CHOOSE REPUBLIC KITCHEN?
            ========================================================= */}
      <section ref={whySectionRef} className={`why-choose-section ${whyInView ? 'in-view' : ''}`}>
        <div className="why-choose-header">
          <div className="why-eyebrow">
            <Sparkles size={14} className="why-eyebrow-icon"/>
            <span>Built For Modern Cloud Kitchens</span>
          </div>
          <h3 className="why-choose-title">Why Choose Republic Kitchen?</h3>
        </div>

        <div className="why-grid">
          {/* Card 1 */}
          <div className="why-card why-card-red card-stagger-1">
            <div className="why-card-top-accent"></div>
            <div className="why-icon-box why-icon-red">
              <BookOpen size={20}/>
            </div>
            <h4 className="why-card-title">High Margin Recipes</h4>
            <p className="why-card-desc">Chef curated, ready to use</p>
          </div>

          {/* Card 2 */}
          <div className="why-card why-card-green card-stagger-2">
            <div className="why-card-top-accent"></div>
            <div className="why-icon-box why-icon-green">
              <ShieldCheck size={20}/>
            </div>
            <h4 className="why-card-title">Premium Quality</h4>
            <p className="why-card-desc">Reliable and consistent</p>
          </div>

          {/* Card 3 */}
          <div className="why-card why-card-amber card-stagger-3">
            <div className="why-card-top-accent"></div>
            <div className="why-icon-box why-icon-amber">
              <Coins size={20}/>
            </div>
            <h4 className="why-card-title">Cost Efficient</h4>
            <p className="why-card-desc">Better pricing and higher margins</p>
          </div>

          {/* Card 4 */}
          <div className="why-card why-card-blue card-stagger-4">
            <div className="why-card-top-accent"></div>
            <div className="why-icon-box why-icon-blue">
              <Users2 size={20}/>
            </div>
            <h4 className="why-card-title">Support for Your Growth</h4>
            <p className="why-card-desc">Menu expansion support</p>
          </div>
        </div>
      </section>

      {/* =========================================================
            7. BOTTOM BANNER
            ========================================================= */}
      <section className="bottom-cta-banner">
        <div className="bottom-cta-inner">
          <div>
            <h3 className="bottom-cta-title">Ready to Grow Your Business?</h3>
            <p className="bottom-cta-desc">Let&apos;s create a more profitable menu together.</p>
          </div>
          <button type="button" className="hero-cta-btn" onClick={onStartCalculator}>
            <span>Calculate My Profit Potential</span>
            <ArrowRight size={15}/>
          </button>
        </div>
      </section>
    </div>);
};
