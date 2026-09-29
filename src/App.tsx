import { useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About, Closing, Contexts, Features, Manifesto, Pricing, Steps } from './components/Sections';
import { Footer } from './components/Footer';
import { SignupModal } from './components/SignupModal';
import type { BillingCycle, PlanCode } from './lib/plans';

const LandingPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanCode | null>(null);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<BillingCycle>('yearly');

  const openSignup = (plan: PlanCode) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const openPlanSelector = () => {
    setSelectedPlan(null);
    setModalOpen(true);
  };

  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <div className="min-h-screen bg-desk font-text">
      <SignupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedPlan={selectedPlan}
        selectedBillingCycle={selectedBillingCycle}
        onSelectPlan={setSelectedPlan}
        onSelectBillingCycle={setSelectedBillingCycle}
      />
      <Header onStart={openPlanSelector} />
      <main>
        <Hero onStart={openPlanSelector} />
        <Manifesto />
        <Steps />
        <Features />
        <Contexts />
        <Pricing onSelectPlan={openSignup} />
        <About />
        <Closing onStart={openPlanSelector} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
