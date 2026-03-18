import { X } from 'lucide-react';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookiePolicyModal({ isOpen, onClose }: CookiePolicyModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none" style={{ alignItems: 'flex-start', paddingTop: '75px' }}>
        <div
          className="relative w-full max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 px-8 py-6 flex-shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Cookie Policy</h2>
                <p className="text-blue-300 text-sm mt-1">Last updated: December 6, 2025</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all flex-shrink-0 ml-4"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="bg-white overflow-y-auto flex-1 px-8 py-6 space-y-8">

            {/* Section 1 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">1. What Are Cookies</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website or use our application. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">2. How We Use Cookies</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                GeoTrack uses cookies for the following purposes:
              </p>
              <ul className="space-y-2">
                {[
                  'Authentication: To keep you logged in and maintain your session',
                  'Preferences: To remember your settings and preferences',
                  'Security: To protect against fraudulent activity and enhance security',
                  'Analytics: To understand how users interact with our service',
                  'Performance: To optimize application performance and load times',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">3. Types of Cookies We Use</h3>
              <hr className="border-gray-200 mb-4" />
              <div className="space-y-4">
                {[
                  {
                    title: 'Essential Cookies',
                    desc: 'Required for the service to function properly. These include authentication tokens, session identifiers, and security cookies. These cookies cannot be disabled.',
                  },
                  {
                    title: 'Functional Cookies',
                    desc: 'Enable enhanced functionality such as remembering your map view preferences, dashboard layout, and language settings.',
                  },
                  {
                    title: 'Analytics Cookies',
                    desc: 'Help us understand how users interact with GeoTrack by collecting information about pages visited, features used, and time spent on the platform. This data is aggregated and anonymous.',
                  },
                  {
                    title: 'Performance Cookies',
                    desc: "Allow us to optimize the application's performance by measuring load times, caching preferences, and identifying technical issues.",
                  },
                ].map((type, i) => (
                  <div key={i}>
                    <p className="text-sm font-semibold text-gray-800 mb-1">{type.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">4. Third-Party Cookies</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                We may use third-party services that set cookies, including:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  'Google Analytics for usage analytics',
                  'Map service providers for location visualization',
                  'Cloud infrastructure providers for service delivery',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed">
                These third parties have their own privacy and cookie policies, which we encourage you to review.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">5. Managing Cookies</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                You can control and manage cookies in several ways:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  'Browser settings: Most browsers allow you to refuse or delete cookies',
                  'Opt-out tools: You can opt-out of analytics cookies through your account settings',
                  'Do Not Track: We respect Do Not Track browser settings where applicable',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed">
                Note that disabling certain cookies may affect the functionality of GeoTrack and limit your ability to use some features.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">6. Cookie Duration</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Cookies set by GeoTrack have varying lifespans:
              </p>
              <ul className="space-y-2">
                {[
                  'Session cookies: Deleted when you close your browser',
                  'Persistent cookies: Remain for a set period (typically 30–365 days) or until manually deleted',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">7. Updates to This Policy</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify users of significant changes through our service.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">8. Contact Us</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                If you have questions about our use of cookies, please contact us at{' '}
                <a href="mailto:info@averlonworld.com" className="text-blue-600 hover:underline">
                  info@averlonworld.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .overflow-y-auto::-webkit-scrollbar { width: 6px; }
        .overflow-y-auto::-webkit-scrollbar-track { background: #f1f5f9; }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 99px; }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #64748b; }
      `}</style>
    </>
  );
}