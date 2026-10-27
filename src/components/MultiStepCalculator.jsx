import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Store, Utensils, ChefHat, Users, IndianRupee, Percent, Lock } from 'lucide-react';
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
    const totalSteps = 7;
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
    const renderOutletIcon = (iconName) => {
        switch (iconName) {
            case 'ShoppingBag': return <ShoppingBag size={20}/>;
            case 'Store': return <Store size={20}/>;
            case 'Utensils': return <Utensils size={20}/>;
            case 'ChefHat': return <ChefHat size={20}/>;
            default: return <Store size={20}/>;
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
            <h2 className="question-title">What type of outlet do you operate?</h2>
            <p className="question-subtitle">Select the option that best describes your business.</p>

            <div className="outlets-grid">
              {OUTLET_TYPES.map((ot) => {
                const isSelected = outletType === ot.id;
                return (<div key={ot.id} className={`outlet-selection-card ${isSelected ? 'selected' : ''}`} onClick={() => setOutletType(ot.id)}>
                    <div className="outlet-card-top">
                      <div className="outlet-card-icon">
                        {renderOutletIcon(ot.iconName)}
                      </div>
                      <span className="outlet-card-name">{ot.name}</span>
                      {isSelected && (<div className="outlet-card-check">
                          <Check size={14}/>
                        </div>)}
                    </div>
                    <img src={ot.image} alt={ot.name} className="outlet-card-img"/>
                  </div>);
            })}
            </div>
          </div>)}

        {/* STEP 2: Cuisines */}
        {currentStep === 2 && (<div>
            <h2 className="question-title">Which cuisines do you serve?</h2>
            <p className="question-subtitle">Select all that apply.</p>

            <div className="cuisines-grid">
              {CUISINES.map((c) => {
                const isSelected = selectedCuisines.includes(c.id);
                return (<div key={c.id} className={`cuisine-selection-card ${isSelected ? 'selected' : ''}`} onClick={() => handleToggleCuisine(c.id)}>
                    {isSelected && (<div className="cuisine-card-badge">
                        <Check size={12}/>
                      </div>)}
                    <img src={c.image} alt={c.name} className="cuisine-card-img"/>
                    <span className="cuisine-card-name">{c.name}</span>
                  </div>);
            })}
            </div>
          </div>)}

        {/* STEP 3: Menu Items */}
        {currentStep === 3 && (<div>
            <h2 className="question-title">Select the items you sell</h2>
            <p className="question-subtitle">Choose all items that apply from your selected cuisines.</p>

            {/* Horizontal Tabs */}
            <div className="menu-items-tabs-row">
              {selectedCuisines.map((cId) => {
                const cuisineObj = CUISINES.find((c) => c.id === cId);
                const isActive = activeCuisineTab === cId;
                return (<button key={cId} type="button" className={`menu-tab-btn ${isActive ? 'active' : ''}`} onClick={() => setActiveCuisineTab(cId)}>
                    {cuisineObj ? cuisineObj.name : cId}
                  </button>);
            })}
            </div>

            {/* Layout with Checklist on left, Food preview on right */}
            <div className="menu-items-layout">
              <div className="menu-checklist">
                {(MENU_ITEMS[activeCuisineTab] || MENU_ITEMS['north-indian']).map((item) => {
                const isChecked = selectedMenuItems.includes(item);
                return (<div key={item} className={`menu-checkbox-item ${isChecked ? 'checked' : ''}`} onClick={() => handleToggleMenuItem(item)}>
                      <div className="custom-checkbox-box">
                        {isChecked && <Check size={13}/>}
                      </div>
                      <span className="menu-item-name">{item}</span>
                    </div>);
            })}
              </div>

              <div className="menu-side-preview">
                <img src={CUISINE_PREVIEWS[activeCuisineTab]?.image || CUISINES.find((c) => c.id === activeCuisineTab)?.image || '/cuisine-north-indian.jpg'} alt={CUISINE_PREVIEWS[activeCuisineTab]?.alt || 'Cuisine Preview'} className="menu-preview-img" key={activeCuisineTab}/>
                <p className="menu-preview-caption">
                  {CUISINE_PREVIEWS[activeCuisineTab]?.caption || 'Standardized base gravies & preps reduce kitchen cook time to under 180 seconds.'}
                </p>
              </div>
            </div>
          </div>)}

        {/* STEP 4: Footfall */}
        {currentStep === 4 && (<div>
            <h2 className="question-title">What is your average daily customer footfall?</h2>
            <p className="question-subtitle">How many customers do you serve per day on average?</p>

            <div className="numeric-input-card">
              <div className="input-display-box">
                <div className="input-display-left">
                  <div className="input-icon-box">
                    <Users size={22}/>
                  </div>
                  <input type="number" min="10" max="3000" value={footfall} onChange={(e) => setFootfall(Math.max(1, Number(e.target.value)))} className="numeric-value-input"/>
                </div>
                <span className="input-unit-label">customers per day</span>
              </div>

              <div className="slider-track-container">
                <input type="range" min="10" max="1000" step="10" value={footfall} onChange={(e) => setFootfall(Number(e.target.value))} className="custom-range-slider"/>
                <div className="slider-scale-labels">
                  <span>0</span>
                  <span>100</span>
                  <span>250</span>
                  <span>500</span>
                  <span>1000+</span>
                </div>
              </div>
            </div>
          </div>)}

        {/* STEP 5: Average Order Value */}
        {currentStep === 5 && (<div>
            <h2 className="question-title">What is your average order value?</h2>
            <p className="question-subtitle">Enter the average amount a customer spends per order.</p>

            <div className="numeric-input-card">
              <div className="input-display-box">
                <div className="input-display-left">
                  <div className="input-icon-box">
                    <IndianRupee size={22}/>
                  </div>
                  <input type="number" min="50" max="5000" value={aov} onChange={(e) => setAov(Math.max(1, Number(e.target.value)))} className="numeric-value-input"/>
                </div>
                <span className="input-unit-label">INR per order</span>
              </div>

              <div className="slider-track-container">
                <input type="range" min="50" max="2000" step="25" value={aov} onChange={(e) => setAov(Number(e.target.value))} className="custom-range-slider"/>
                <div className="slider-scale-labels">
                  <span>0</span>
                  <span>200</span>
                  <span>500</span>
                  <span>1000</span>
                  <span>2000+</span>
                </div>
              </div>
            </div>
          </div>)}

        {/* STEP 6: Average Margin */}
        {currentStep === 6 && (<div>
            <h2 className="question-title">What is your average margin per item?</h2>
            <p className="question-subtitle">Enter your current average margin percentage.</p>

            <div className="numeric-input-card">
              <div className="input-display-box">
                <div className="input-display-left">
                  <div className="input-icon-box">
                    <Percent size={20}/>
                  </div>
                  <input type="number" min="1" max="60" value={currentMargin} onChange={(e) => setCurrentMargin(Math.max(1, Number(e.target.value)))} className="numeric-value-input"/>
                </div>
                <span className="input-unit-label">% margin</span>
              </div>

              <div className="slider-track-container">
                <input type="range" min="0" max="50" step="1" value={currentMargin} onChange={(e) => setCurrentMargin(Number(e.target.value))} className="custom-range-slider"/>
                <div className="slider-scale-labels">
                  <span>0</span>
                  <span>10</span>
                  <span>20</span>
                  <span>30</span>
                  <span>50</span>
                </div>
              </div>
            </div>
          </div>)}

        {/* STEP 7: Enter Details to Calculate (Pre-Calculation Lead Gate) */}
        {currentStep === 7 && (<div className="step-lead-container">
            <div className="step-lead-header">
              <span className="step-lead-badge">Final Step • Almost Ready</span>
              <h2 className="question-title">Enter Details to Calculate Your Profits</h2>
              <p className="question-subtitle">
                Please enter your restaurant and contact details below. We will calculate your exact savings, margin improvements, and tailored sourcing plan.
              </p>
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
        <div className="calculator-actions-row">
          <button type="button" className="btn-calculator-back" onClick={handlePrev}>
            <ArrowLeft size={16}/>
            <span>Back</span>
          </button>

          <button type="button" className="btn-calculator-next" onClick={handleNext}>
            <span>
              {currentStep === totalSteps
            ? 'Calculate My Results'
            : currentStep === 6
                ? 'Proceed to Calculate'
                : 'Next'}
            </span>
            <ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </div>
  </div>);
};
