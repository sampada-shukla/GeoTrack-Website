import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, ArrowRight, Settings, CreditCard, Headphones, Lightbulb, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const faqData: Record<string, { q: string; a: string }[]> = {
  General: [
    { q: 'What is WorkTrack Pro?', a: 'WorkTrack Pro is a comprehensive field sales tracking application that provides real-time GPS location tracking, pincode-based client filtering, and seamless Tally ERP integration. It helps businesses manage their field sales teams efficiently with automatic location logging, client management, and interactive map views.' },
    { q: 'What platforms are supported?', a: 'WorkTrack Pro includes a web-based admin panel accessible from any browser and a native Android mobile app for field executives. The Android app is built with Kotlin and supports offline mode with automatic data synchronization when internet connection is restored.' },
    { q: 'Is there a free trial available?', a: 'Yes! We offer a 14-day free trial for all paid plans with no credit card required. You can test all features including GPS tracking, client management, Tally integration, and analytics. The Starter plan is also completely free for teams with up to 5 field executives.' },
  ],
  Technical: [
    { q: 'How does the GPS tracking work?', a: 'Our Android mobile app uses foreground service to automatically log GPS coordinates every 5 minutes (or 3 minutes for Professional plans). The location data includes accuracy metrics, activity type detection (walking, driving), and complete history with timestamps.' },
    { q: 'What is pincode-based filtering?', a: "This unique feature automatically filters and displays only clients located in the sales representative's current pincode area using reverse geocoding technology. When a field executive's location changes, the system automatically updates the client list." },
    { q: 'Can I integrate with Tally ERP?', a: 'Yes! WorkTrack Pro offers seamless bidirectional synchronization with Tally ERP. You can bulk import clients from Tally, maintain GUID mapping for accurate data sync, automatically detect and remove duplicates, and track complete sync history.' },
  ],
  'Security & Privacy': [
    { q: 'How secure is my data?', a: 'All data is protected with JWT token-based authentication, bcrypt password hashing, and encrypted storage. API endpoints are protected and user sessions expire after 7 days. We also maintain regular backups and use industry-standard security practices.' },
    { q: 'Do you comply with data protection regulations?', a: 'Yes, we comply with all major data protection regulations including GDPR and local privacy laws. Your data is stored securely, and we provide tools for data export and deletion upon request. We never share your data with third parties without your explicit consent.' },
  ],
  'Plans & Pricing': [
    { q: 'How many field executives can I track?', a: 'It depends on your plan: Starter (Free) supports up to 5 executives, Professional supports up to 25, Business supports up to 100, and Enterprise offers unlimited field executives. All plans include the same core features.' },
    { q: 'Can I upgrade or downgrade my plan?', a: "Yes! You can upgrade or downgrade your plan at any time from the admin dashboard. When upgrading, you'll be charged a prorated amount for the remainder of your billing cycle. When downgrading, the change takes effect at the end of your current billing period." },
    { q: 'Can I customize the platform for my business?', a: 'Yes! Professional and Business plans include custom fields for client data, while Enterprise plan offers complete customization including white-label options, API access for custom integrations, and dedicated account manager.' },
  ],
  'Features & Functionality': [
    { q: 'What kind of reports can I generate?', a: 'The platform provides comprehensive analytics including visit patterns, client distribution by pincode, team performance metrics, location accuracy reports, and activity logs. You can filter reports by date range and export data to CSV/Excel.' },
    { q: 'Does the app work offline?', a: 'Yes! The Android mobile app has offline capabilities. Location data and client information are cached locally on the device and automatically synchronized with the server when an internet connection is restored.' },
  ],
};

const categories = [
  { label: 'General', icon: Lightbulb },
  { label: 'Technical', icon: Settings },
  { label: 'Security & Privacy', icon: Shield },
  { label: 'Plans & Pricing', icon: CreditCard },
  { label: 'Features & Functionality', icon: Zap },
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  const questions = faqData[activeCategory] ?? [];

  return (
    <section id="faqs" className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8faff 50%, #f0fdf4 100%)' }}
    >
      <div className="absolute top-20 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xs text-gray-500">Find answers to common questions about WorkTrack Pro</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(({ label, icon: Icon }) => {
            const active = activeCategory === label;
            return (
              <button
                key={label}
                onClick={() => { setActiveCategory(label); setOpenIndex(0); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200
                  ${active
                    ? 'bg-[#0ea5e9] text-white border-[#0ea5e9] shadow-md shadow-cyan-300/30'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#0ea5e9] hover:text-[#0ea5e9]'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Questions */}
        <div className="space-y-3 mb-6">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden
                  ${isOpen ? 'border-[#0ea5e9]/40 shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 flex items-center gap-4 text-left"
                >
                  {/* Number badge */}
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                    ${isOpen ? 'bg-[#0ea5e9] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 flex-1">{item.q}</span>
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 text-[#0ea5e9] flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  }
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pl-16">
                    <p className="text-xs text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions — horizontal bar like screenshot */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] px-6 py-5 flex items-center justify-between gap-4 shadow-lg shadow-cyan-500/20">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Still have questions?</p>
              <p className="text-xs text-blue-100">Our team is here to help. We'll get back to you within 24 hours.</p>
            </div>
          </div>
          <a href="/contact" className="relative z-10 flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white text-[#0ea5e9] rounded-xl font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap">
            Contact Support
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}