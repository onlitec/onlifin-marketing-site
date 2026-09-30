import { lazy, Suspense, useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About, Closing, Contexts, Features, Manifesto, Metodo, Pricing, Steps } from './components/Sections';
import { Footer } from './components/Footer';
import { SignupModal } from './components/SignupModal';
import type { BillingCycle, PlanCode } from './lib/plans';

const MetodoPage = lazy(() => import('./pages/Metodo'));

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
        <Metodo />
        <Contexts />
        <Pricing onSelectPlan={openSignup} />
        <About />
        <Closing onStart={openPlanSelector} />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/metodo') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-desk" />}>
        <MetodoPage />
      </Suspense>
    );
  }
  return <LandingPage />;
};

export default App;
