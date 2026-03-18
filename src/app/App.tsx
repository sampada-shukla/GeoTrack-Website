import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Features } from './components/Features';
import { WhyChoose } from './components/WhyChoose';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ContactSupport } from './components/ContactSupport';
import { ProductSection } from './components/ProductSection';
import { PartnerDirectoryPage } from './components/PartnerDirectoryPage';
import { BecomePartnerPage } from './components/BecomePartnerPage';
import { LoginModal } from './components/LoginModal';
import { CheckoutPage } from './components/CheckoutPage'; 
import { Toaster } from 'sonner';
import Tutorial_Page from './components/Tutorial_Page';
import TutorialVideo from './components/TutorialVideo';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// ── Home page content ──
function Home({ onOpenLogin }: { onOpenLogin: () => void }) {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.openLogin) {
      onOpenLogin();
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
    <>
      <HeroSection />
      <Features />
      <WhyChoose />
      <ProductSection />
      <Pricing />
      <FAQ />
    </>
  );
}

// ── Checkout: reads plan from router state, renders standalone (no Header/Footer) ──
function CheckoutPageWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedPlan = location.state?.selectedPlan;
  const initialBillingCycle = location.state?.billingCycle ?? 'monthly';

  useEffect(() => {
    if (!selectedPlan) {
      navigate('/');
    }
  }, [selectedPlan, navigate]);

  if (!selectedPlan) return null;

  return (
    <CheckoutPage
      selectedPlan={selectedPlan}
      initialBillingCycle={initialBillingCycle}
      onBack={() => navigate('/')}
      onProceedToPayment={() => {}}
    />
  );
}

// ── Layout wrapper used by all routes EXCEPT /checkout and /tutorials ──
function WithHeaderFooter({ children, loginOpen, setLoginOpen }: {
  children: React.ReactNode;
  loginOpen: boolean;
  setLoginOpen: (v: boolean) => void;
}) {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onAdminLogin={(type, name) => console.log(type, name)}
        onLoginSuccess={() => setLoginOpen(false)}
        onNavigateToPricing={() => {
          const el = document.getElementById('pricing');
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 64;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }}
      />
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <ScrollToTop />
      <Routes>

        {/* Standalone routes — no Header/Footer */}
        <Route path="/checkout" element={<CheckoutPageWrapper />} />

        {/* Tutorials — no Header, but keeps Footer */}
        <Route
          path="/tutorials"
          element={
            <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Tutorial_Page />
              <Footer />
            </div>
          }
        />

        {/* All other routes — wrapped with Header + Footer */}
        <Route
          path="/"
          element={
            <WithHeaderFooter loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
              <Home onOpenLogin={() => setLoginOpen(true)} />
            </WithHeaderFooter>
          }
        />
        <Route
          path="/contact"
          element={
            <WithHeaderFooter loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
              <ContactSupport />
            </WithHeaderFooter>
          }
        />
        <Route
          path="/faqs"
          element={
            <WithHeaderFooter loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
              <FAQ />
            </WithHeaderFooter>
          }
        />
        <Route
          path="/partners"
          element={
            <WithHeaderFooter loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
              <PartnerDirectoryPage />
            </WithHeaderFooter>
          }
        />
        <Route
          path="/become-partner"
          element={
            <WithHeaderFooter loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
              <BecomePartnerPage />
            </WithHeaderFooter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}