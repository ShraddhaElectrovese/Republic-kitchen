import React, { useState } from 'react';
import { ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import '../styles/lead-form.css';
export const LeadGenForm = ({ onBackToHome }) => {
    const [brandName, setBrandName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            try {
                confetti({
                    particleCount: 90,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#F25C27', '#10B981', '#3B82F6', '#F59E0B'],
                });
            }
            catch {
                // canvas check
            }
        }, 700);
    };
    return (<div className="lead-form-page-wrapper">
      <div className="lead-form-card">
        {!isSubmitted ? (<div>
            <div className="lead-form-header">
              <h2 className="lead-form-title">Ready to Increase Your Kitchen&apos;s Profit?</h2>
              <p className="lead-form-subtitle">
                Get a personalized profit plan and product recommendations from our team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="lead-form-body">
              <div className="form-group">
                <label className="form-label">Restaurant / Brand Name *</label>
                <input type="text" required placeholder="e.g. Spice Box" value={brandName} onChange={(e) => setBrandName(e.target.value)} className="form-input"/>
              </div>

              <div className="form-group">
                <label className="form-label">Contact Person *</label>
                <input type="text" required placeholder="Your name" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="form-input"/>
              </div>

              <div className="form-row-two-col">
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="form-input"/>
                </div>

                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input type="text" required placeholder="e.g. Delhi" value={city} onChange={(e) => setCity(e.target.value)} className="form-input"/>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email (Optional)</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input"/>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-submit-lead">
                <span>{isSubmitting ? 'Sending Request...' : 'Get My Personalized Profit Plan'}</span>
                <ArrowRight size={16}/>
              </button>

              <div className="lead-privacy-note">
                <Lock className="privacy-lock-icon"/>
                <span>
                  By submitting this form, you agree to be contacted by the Republic Kitchen team regarding our products and services.
                </span>
              </div>
            </form>
          </div>) : (<div className="lead-success-card">
            <div className="success-check-bubble">
              <CheckCircle2 size={36}/>
            </div>
            <h3 className="success-title">Profit Plan On The Way!</h3>
            <p className="success-desc">
              Thank you, <strong>{contactPerson}</strong>! Our culinary specialist will connect on <strong>{mobileNumber}</strong> within 2 business hours to share your tailored margin roadmap.
            </p>
            <button type="button" className="btn-back-home" onClick={onBackToHome}>
              Back to Home
            </button>
          </div>)}
      </div>
    </div>);
};
