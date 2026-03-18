import { useState } from 'react';
import { PrivacyPolicyModal } from '../components/PrivacyPolicy';
import { TermsOfServiceModal } from '../components/TermsofService';
import { SecurityModal } from '../components/Security';
import { CookiePolicyModal } from '../components/CookiePolicy';

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  return (
    <>
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <SecurityModal isOpen={securityOpen} onClose={() => setSecurityOpen(false)} />
      <CookiePolicyModal isOpen={cookieOpen} onClose={() => setCookieOpen(false)} />

    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <div className="flex flex-col items-center justify-center space-y-4 text-center">

    <p className="text-blue-200 text-sm">
      © 2025 GeoTrack. All rights reserved.
    </p>

    <p className="text-blue-200 text-sm font-semibold">
      Powered by Averlon
    </p>

    <div className="flex items-center space-x-6 flex-wrap justify-center gap-y-2">
      <div className="flex items-center space-x-6 flex-wrap justify-center gap-y-2">
      <button
          onClick={() => setPrivacyOpen(true)}
          className="text-blue-200 hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none p-0"
      >
          Privacy Policy
      </button>

      <button
        onClick={() => setTermsOpen(true)}
        className="text-blue-200 hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none p-0"
        >
        Terms of Service
      </button>

      <button
        onClick={() => setCookieOpen(true)}
        className="text-blue-200 hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none p-0"
        >
        Cookie Policy
      </button>

      <button
        onClick={() => setSecurityOpen(true)}
        className="text-blue-200 hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none p-0"
        >
        Security
      </button>
    </div>
    </div>
  </div>
</div>
</footer>
</>
  );
}