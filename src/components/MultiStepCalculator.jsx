import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Store, Utensils, ChefHat, Users, IndianRupee, Percent, Lock, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OUTLET_TYPES, CUISINES, MENU_ITEMS } from '../data/kitchenData';
import '../styles/calculator.css';
const CUISINE_PREVIEWS = {
    'north-indian': {
        image: '/cuisine-north-indian.jpg',
        alt: 'North Indian Cuisine',
        caption: 'Standardized base gravies & preps reduce kitchen cook time to under 180 seconds.',
    },
    'chinese': {
        image: '/cuisine-chinese.jpg',
        alt: 'Chinese / Indo-Chinese Cuisine',
        caption: 'Ready stir-fry sauces, bases & marinades keep flavor authentic and margins high.',
    },
};
export const MultiStepCalculator = ({ step = 1, onStepChange, onBackToHome, onCalculateResults, }) => {
    const [currentStep, setCurrentStep] = useState(step);
    React.useEffect(() => {
        if (step) {
            setCurrentStep(step);
        }
    }, [step]);
    const changeStep = (newStep) => {
        setCurrentStep(newStep);
        if (onStepChange) {
            onStepChange(newStep);
        }
    };
    // Calculator Form State
    const [outletType, setOutletType] = useState('takeaway');
    const [selectedCuisines, setSelectedCuisines] = useState([
        'north-indian',
        'chinese',
    ]);
    const [activeCuisineTab, setActiveCuisineTab] = useState('north-indian');
    const [selectedMenuItems, setSelectedMenuItems] = useState([
        'Paneer Butter Masala',
        'Dal Makhani',
        'Kadai Paneer',
    ]);
    const [footfall, setFootfall] = useState(100);
    const [aov, setAov] = useState(350);
    const [currentMargin, setCurrentMargin] = useState(15);
    // Lead details collected before calculating (Step 7)
    const [brandName, setBrandName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const totalSteps = 5;
    // Toggle Cuisine
    const handleToggleCuisine = (cuisineId) => {
        if (selectedCuisines.includes(cuisineId)) {
            if (selectedCuisines.length > 1) {
                setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisineId));
                if (activeCuisineTab === cuisineId) {
                    const remaining = selectedCuisines.filter((c) => c !== cuisineId);
                    setActiveCuisineTab(remaining[0]);
                }
            }
        }
        else {
            setSelectedCuisines([...selectedCuisines, cuisineId]);
        }
    };
    // Toggle Menu Item
    const handleToggleMenuItem = (item) => {
        if (selectedMenuItems.includes(item)) {
            setSelectedMenuItems(selectedMenuItems.filter((i) => i !== item));
        }
        else {
            setSelectedMenuItems([...selectedMenuItems, item]);
        }
    };

    const currentTabItems = MENU_ITEMS[activeCuisineTab] || MENU_ITEMS['north-indian'] || [];
    const selectedInCurrentTabCount = currentTabItems.filter((item) => selectedMenuItems.includes(item)).length;
    const allCurrentTabSelected = currentTabItems.length > 0 && selectedInCurrentTabCount === currentTabItems.length;

    const handleToggleSelectAllCurrentTab = () => {
        if (allCurrentTabSelected) {
            setSelectedMenuItems((prev) => prev.filter((item) => !currentTabItems.includes(item)));
        } else {
            setSelectedMenuItems((prev) => Array.from(new Set([...prev, ...currentTabItems])));
        }
    };

    const allAvailableItems = selectedCuisines.flatMap((cId) => MENU_ITEMS[cId] || []);
    const allCuisinesSelected = allAvailableItems.length > 0 && allAvailableItems.every((item) => selectedMenuItems.includes(item));

    const handleToggleSelectAllCuisines = () => {
        if (allCuisinesSelected) {
            setSelectedMenuItems((prev) => prev.filter((item) => !allAvailableItems.includes(item)));
        } else {
            setSelectedMenuItems((prev) => Array.from(new Set([...prev, ...allAvailableItems])));
        }
    };

    const [expandedCuisines, setExpandedCuisines] = useState({ 'north-indian': true });

    React.useEffect(() => {
        if (selectedCuisines && selectedCuisines.length > 0) {
            setExpandedCuisines((prev) => {
                if (Object.keys(prev).length === 0) {
                    return { [selectedCuisines[0]]: true };
                }
                return prev;
            });
        }
    }, [selectedCuisines]);

    const toggleExpandCuisine = (cId) => {
        setExpandedCuisines((prev) => ({
            ...prev,
            [cId]: !prev[cId],
        }));
    };

    const handleToggleSelectAllForCuisine = (cId) => {
        const items = MENU_ITEMS[cId] || [];
        const allSelected = items.length > 0 && items.every((i) => selectedMenuItems.includes(i));
        if (allSelected) {
            setSelectedMenuItems((prev) => prev.filter((i) => !items.includes(i)));
        } else {
            setSelectedMenuItems((prev) => Array.from(new Set([...prev, ...items])));
        }
    };
    const handleNext = () => {
        if (currentStep < totalSteps) {
            changeStep(currentStep + 1);
            window.scrollTo({ top: 80, behavior: 'smooth' });
        }
        else {
            // Step 7: Validate lead details before calculating
            const errors = {};
            if (!brandName.trim()) {
                errors.brandName = 'Please enter your restaurant or brand name';
            }
            if (!contactPerson.trim()) {
                errors.contactPerson = 'Please enter your name';
            }
            if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, '').length < 10) {
                errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
            }
            if (!city.trim()) {
                errors.city = 'Please enter your operating city';
            }
            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                return;
            }
            setFormErrors({});
            try {
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff4e27', '#10b981', '#f59e0b', '#3b82f6'],
                });
            }
            catch {
                // ignore
            }
            // Calculate and reveal results
            onCalculateResults({
                outletType,
                selectedCuisines,
                selectedMenuItems,
                footfall,
                aov,
                currentMargin,
                brandName: brandName.trim(),
                contactPerson: contactPerson.trim(),
                mobileNumber: mobileNumber.trim(),
                city: city.trim(),
                email: email.trim(),
            });
        }
    };
    const handlePrev = () => {
        if (currentStep > 1) {
            changeStep(currentStep - 1);
            window.scrollTo({ top: 80, behavior: 'smooth' });
        }
        else {
            onBackToHome();
        }
    };
    const renderOutletIcon = (iconName, size = 30) => {
        switch (iconName) {
            case 'ShoppingBag':
                return <ShoppingBag size={size} strokeWidth={1.6} />;
            case 'Store':
                return <Store size={size} strokeWidth={1.6} />;
            case 'Utensils':
                return (
                  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 10h12" />
                    <path d="M8 10v9" />
                    <path d="M16 10v9" />
                    <path d="M4 6v13" />
                    <path d="M4 11h2" />
                    <path d="M20 6v13" />
                    <path d="M18 11h2" />
                  </svg>
                );
            case 'ChefHat':
                return <ChefHat size={size} strokeWidth={1.6} />;
            default:
                return <Store size={size} strokeWidth={1.6} />;
        }
    };
    return (<div className="calculator-page-bg">
      <div className="calculator-page-wrapper">
        <div className="calculator-card-container">
        {/* Step Indicator Header */}
        <div className="calculator-header-nav">
          <div className="step-indicator-row">
            <span className="step-count-text">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="step-dots-wrapper">
              {Array.from({ length: totalSteps }).map((_, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            return (<div key={idx} className={`step-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}/>);
        })}
            </div>
          </div>
        </div>

        {/* STEP 1: Outlet Type */}
        {currentStep === 1 && (<div>
            <h2 className="question-title">What kind of outlet do you operate?</h2>

            <div className="outlets-grid">
              {OUTLET_TYPES.map((ot) => {
                const isSelected = outletType === ot.id;
                return (
                  <div
                    key={ot.id}
                    className={`outlet-selection-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setOutletType(ot.id)}
                  >
                    <div className="outlet-card-icon-col">
                      {renderOutletIcon(ot.iconName)}
                    </div>
                    <div className="outlet-card-text-col">
                      <span className="outlet-card-title">{ot.name}</span>
                      <span className="outlet-card-desc">{ot.description}</span>
                    </div>
                    <div className={`outlet-card-radio ${isSelected ? 'selected' : ''}`}>
                      {isSelected && <div className="outlet-card-radio-inner" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>)}

        {/* STEP 2: Cuisines */}
        {currentStep === 2 && (<div>
            <h2 className="question-title">What cuisines do you serve?</h2>

            <div className="cuisines-grid-unified">
              {CUISINES.map((c) => {
                const isSelected = selectedCuisines.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className={`cuisine-unified-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleCuisine(c.id)}
                  >
                    <div className="cuisine-unified-left">
                      <div className={`cuisine-unified-checkbox ${isSelected ? 'checked' : ''}`}>
                        {isSelected && <Check size={14} color="#ffffff" strokeWidth={3} />}
                      </div>
                      <span className="cuisine-unified-name">{c.mobileName || c.name}</span>
                    </div>
                    <ChevronRight size={18} className={`cuisine-unified-chevron ${isSelected ? 'selected' : ''}`} />
                  </div>
                );
              })}
            </div>
          </div>)}

        {/* STEP 3: Menu Items */}
        {currentStep === 3 && (<div>
            <h2 className="question-title">Select the items you currently sell</h2>

            <div className="menu-accordions-unified">
              {selectedCuisines.map((cId) => {
                const cuisineObj = CUISINES.find((c) => c.id === cId) || { id: cId, name: cId, mobileName: cId };
                const isExpanded = !!expandedCuisines[cId];
                const items = MENU_ITEMS[cId] || [];
                const selectedCount = items.filter((i) => selectedMenuItems.includes(i)).length;
                const allSelected = items.length > 0 && selectedCount === items.length;

                return (
                  <div key={cId} className={`unified-accordion-card ${isExpanded ? 'expanded' : ''}`}>
                    <div
                      className="unified-accordion-header"
                      onClick={() => toggleExpandCuisine(cId)}
                    >
                      <div className="unified-accordion-header-left">
                        <span className="unified-accordion-title">
                          {cuisineObj.mobileName || cuisineObj.name}
                        </span>
                        <span className="unified-accordion-badge">
                          {selectedCount} of {items.length} selected
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={20} className="unified-accordion-icon" />
                      ) : (
                        <ChevronDown size={20} className="unified-accordion-icon" />
                      )}
                    </div>

                    {isExpanded && (
                      <div className="unified-accordion-content">
                        {/* Select All Row */}
                        <div
                          className="unified-item-row select-all-row"
                          onClick={() => handleToggleSelectAllForCuisine(cId)}
                        >
                          <div className={`unified-item-checkbox ${allSelected ? 'checked' : ''}`}>
                            {allSelected && <Check size={13} color="#ffffff" strokeWidth={3} />}
                          </div>
                          <span className="unified-item-label select-all-label">
                            {allSelected ? 'Deselect All' : 'Select All Items'}
                          </span>
                        </div>

                        {/* Items Checklist Grid */}
                        <div className="unified-items-grid">
                          {items.map((item) => {
                            const isChecked = selectedMenuItems.includes(item);
                            return (
                              <div
                                key={item}
                                className={`unified-item-row ${isChecked ? 'selected' : ''}`}
                                onClick={() => handleToggleMenuItem(item)}
                              >
                                <div className={`unified-item-checkbox ${isChecked ? 'checked' : ''}`}>
                                  {isChecked && <Check size={13} color="#ffffff" strokeWidth={3} />}
                                </div>
                                <span className="unified-item-label">{item}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>)}

        {/* STEP 4: Combined Business Economics (Footfall, AOV, Margin) */}
        {currentStep === 4 && (
          <div className="step-economics-container">
            <h2 className="question-title">Tell us about your kitchen&apos;s business numbers</h2>

            <div className="combined-metrics-grid">
              {/* Metric 1: Footfall */}
              <div className="combined-metric-card">
                <div className="combined-metric-header">
                  <div className="combined-metric-title-group">
                    <div className="combined-metric-icon icon-blue">
                      <Users size={18} />
                    </div>
                    <div>
                      <h3 className="combined-metric-title">Average Daily Customer Footfall</h3>
                      <p className="combined-metric-desc">How many customers do you serve per day on average?</p>
                    </div>
                  </div>
                  <div className="combined-metric-input-badge">
                    <input
                      type="number"
                      min="10"
                      max="3000"
                      value={footfall}
                      onChange={(e) => setFootfall(Math.max(1, Number(e.target.value)))}
                      className="combined-metric-number"
                    />
                    <span className="combined-metric-unit">customers / day</span>
                  </div>
                </div>

                <div className="slider-track-container">
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={footfall}
                    onChange={(e) => setFootfall(Number(e.target.value))}
                    className="custom-range-slider"
                  />
                  <div className="slider-scale-labels">
                    <span>10</span>
                    <span>100</span>
                    <span>250</span>
                    <span>500</span>
                    <span>1000+</span>
                  </div>
                </div>
              </div>

              {/* Metric 2: Average Order Value */}
              <div className="combined-metric-card">
                <div className="combined-metric-header">
                  <div className="combined-metric-title-group">
                    <div className="combined-metric-icon icon-orange">
                      <IndianRupee size={18} />
                    </div>
                    <div>
                      <h3 className="combined-metric-title">Average Order Value (AOV)</h3>
                      <p className="combined-metric-desc">Average amount spent per order by a customer</p>
                    </div>
                  </div>
                  <div className="combined-metric-input-badge">
                    <span className="rupee-prefix">₹</span>
                    <input
                      type="number"
                      min="50"
                      max="5000"
                      value={aov}
                      onChange={(e) => setAov(Math.max(1, Number(e.target.value)))}
                      className="combined-metric-number"
                    />
                    <span className="combined-metric-unit">INR / order</span>
                  </div>
                </div>

                <div className="slider-track-container">
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="25"
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="custom-range-slider"
                  />
                  <div className="slider-scale-labels">
                    <span>₹50</span>
                    <span>₹200</span>
                    <span>₹500</span>
                    <span>₹1000</span>
                    <span>₹2000+</span>
                  </div>
                </div>
              </div>

              {/* Metric 3: Current Average Margin */}
              <div className="combined-metric-card">
                <div className="combined-metric-header">
                  <div className="combined-metric-title-group">
                    <div className="combined-metric-icon icon-green">
                      <Percent size={18} />
                    </div>
                    <div>
                      <h3 className="combined-metric-title">Current Average Margin</h3>
                      <p className="combined-metric-desc">Your current net operating margin percentage</p>
                    </div>
                  </div>
                  <div className="combined-metric-input-badge">
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={currentMargin}
                      onChange={(e) => setCurrentMargin(Math.max(1, Number(e.target.value)))}
                      className="combined-metric-number"
                    />
                    <span className="combined-metric-unit">% margin</span>
                  </div>
                </div>

                <div className="slider-track-container">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={currentMargin}
                    onChange={(e) => setCurrentMargin(Number(e.target.value))}
                    className="custom-range-slider"
                  />
                  <div className="slider-scale-labels">
                    <span>0%</span>
                    <span>10%</span>
                    <span>20%</span>
                    <span>30%</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Monthly Revenue Estimator Bar */}
            <div className="live-revenue-preview-bar">
              <div className="live-revenue-label">
                <span>Estimated Monthly Revenue</span>
                <span className="live-revenue-calc-formula">
                  ({footfall} orders/day × 30 days × ₹{aov})
                </span>
              </div>
              <div className="live-revenue-value">
                ₹{(footfall * 30 * aov).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Enter Details to Calculate (Pre-Calculation Lead Gate) */}
        {currentStep === 5 && (<div className="step-lead-container">
            <div className="step-lead-header">
              <span className="step-lead-badge">Final Step • Almost Ready</span>
              <h2 className="question-title">Enter Details to Calculate Your Profits</h2>
            </div>

            <div className="step-lead-form">
              <div className="form-group mb-4">
                <label className="form-label">Restaurant / Brand Name *</label>
                <input type="text" placeholder="e.g. Spice Route Kitchen / Royal Biryani" value={brandName} onChange={(e) => {
                setBrandName(e.target.value);
                if (formErrors.brandName) {
                    setFormErrors((prev) => ({ ...prev, brandName: '' }));
                }
            }} className={`form-input ${formErrors.brandName ? 'input-error' : ''}`}/>
                {formErrors.brandName && (<span className="error-message">{formErrors.brandName}</span>)}
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Contact Person *</label>
                <input type="text" placeholder="Your full name" value={contactPerson} onChange={(e) => {
                setContactPerson(e.target.value);
                if (formErrors.contactPerson) {
                    setFormErrors((prev) => ({ ...prev, contactPerson: '' }));
                }
            }} className={`form-input ${formErrors.contactPerson ? 'input-error' : ''}`}/>
                {formErrors.contactPerson && (<span className="error-message">{formErrors.contactPerson}</span>)}
              </div>

              <div className="form-row-two-col mb-4">
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input type="tel" placeholder="10-digit mobile number" value={mobileNumber} onChange={(e) => {
                setMobileNumber(e.target.value);
                if (formErrors.mobileNumber) {
                    setFormErrors((prev) => ({ ...prev, mobileNumber: '' }));
                }
            }} className={`form-input ${formErrors.mobileNumber ? 'input-error' : ''}`}/>
                  {formErrors.mobileNumber && (<span className="error-message">{formErrors.mobileNumber}</span>)}
                </div>

                <div className="form-group">
                  <label className="form-label">Operating City *</label>
                  <input type="text" placeholder="e.g. Delhi NCR, Mumbai, Bengaluru" value={city} onChange={(e) => {
                setCity(e.target.value);
                if (formErrors.city) {
                    setFormErrors((prev) => ({ ...prev, city: '' }));
                }
            }} className={`form-input ${formErrors.city ? 'input-error' : ''}`}/>
                  {formErrors.city && (<span className="error-message">{formErrors.city}</span>)}
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Email (Optional)</label>
                <input type="email" placeholder="owner@yourrestaurant.com" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input"/>
              </div>

              <div className="lead-privacy-note mt-2">
                <Lock className="privacy-lock-icon" size={14}/>
                <span>
                  Your information is 100% confidential. By submitting, you unlock your instant profit analysis and agree to receive your tailored margin roadmap.
                </span>
              </div>
            </div>
          </div>)}

        {/* Bottom Actions Row */}
        <div className={`calculator-actions-row ${currentStep === 1 ? 'step-1-actions' : ''}`}>
          <button
            type="button"
            className={`btn-calculator-back ${currentStep === 1 ? 'btn-back-desktop-only' : ''}`}
            onClick={handlePrev}
          >
            <ArrowLeft size={16}/>
            <span>{currentStep === 1 ? 'Exit' : 'Back'}</span>
          </button>

          <button type="button" className="btn-calculator-next" onClick={handleNext}>
            <span>
              {currentStep === totalSteps
                ? 'Calculate My Results'
                : currentStep === totalSteps - 1
                    ? 'Proceed to Calculate'
                    : 'Continue'}
            </span>
            <ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </div>
  </div>);
};
