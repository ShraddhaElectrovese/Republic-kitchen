import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPageOverview } from './components/LandingPageOverview';
import { MultiStepCalculator } from './components/MultiStepCalculator';
import { ResultsPage } from './components/ResultsPage';
import { LeadGenForm } from './components/LeadGenForm';
import { Footer } from './components/Footer';
export const App = () => {
    const [activePage, setActivePage] = useState('1-overview');
    const [calculatorResults, setCalculatorResults] = useState({
        outletType: 'takeaway',
        selectedCuisines: ['north-indian', 'chinese'],
        selectedMenuItems: ['Paneer Butter Masala', 'Dal Makhani', 'Kadai Paneer'],
        footfall: 100,
        aov: 350,
        currentMargin: 15,
    });
    const getStepNumberFromPage = (page) => {
        switch (page) {
            case '2-step-outlet': return 1;
            case '3-step-cuisines': return 2;
            case '4-step-menu': return 3;
            case '5-step-footfall': return 4;
            case '6-step-aov': return 5;
            case '7-step-margin': return 6;
            case '8-step-details': return 7;
            default: return 1;
        }
    };
    const getPageFromStepNumber = (step) => {
        switch (step) {
            case 1: return '2-step-outlet';
            case 2: return '3-step-cuisines';
            case 3: return '4-step-menu';
            case 4: return '5-step-footfall';
            case 5: return '6-step-aov';
            case 6: return '7-step-margin';
            case 7: return '8-step-details';
            default: return '2-step-outlet';
        }
    };
    const handleStartCalculator = () => {
        setActivePage('2-step-outlet');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleGoHome = () => {
        setActivePage('1-overview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleStepChange = (newStep) => {
        setActivePage(getPageFromStepNumber(newStep));
    };
    const handleCalculateResults = (state) => {
        setCalculatorResults(state);
        setActivePage('9-results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleOpenLeadForm = () => {
        setActivePage('10-lead-form');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const isCalculatorPage = [
        '2-step-outlet',
        '3-step-cuisines',
        '4-step-menu',
        '5-step-footfall',
        '6-step-aov',
        '7-step-margin',
        '8-step-details',
    ].includes(activePage);
    return (<div className="min-h-screen flex flex-col bg-[#faf8f5] text-slate-800 antialiased">
      {/* Top Navbar */}
      <Navbar onStartCalculator={handleStartCalculator} onGoHome={handleGoHome}/>

      {/* Main View Container */}
      <main className="flex-1">
        {/* Page 1: Landing Page Overview */}
        {activePage === '1-overview' && (<LandingPageOverview onStartCalculator={handleStartCalculator}/>)}

        {/* Pages 2 to 7: Multi-Step Calculator */}
        {isCalculatorPage && (<MultiStepCalculator step={getStepNumberFromPage(activePage)} onStepChange={handleStepChange} onBackToHome={handleGoHome} onCalculateResults={handleCalculateResults}/>)}

        {/* Page 9: Results Page (Calculated only after details are provided) */}
        {activePage === '9-results' && (<ResultsPage data={calculatorResults} onOpenLeadForm={handleOpenLeadForm} onRecalculate={handleStartCalculator}/>)}

        {/* Page 10: Lead Generation Form (Direct/Fallback) */}
        {activePage === '10-lead-form' && (<LeadGenForm onBackToHome={handleGoHome}/>)}
      </main>

      {/* Full Rich Footer */}
      <Footer
        onScrollToCalculator={handleStartCalculator}
        onOpenLeadModal={handleOpenLeadForm}
      />
    </div>);
};
export default App;
