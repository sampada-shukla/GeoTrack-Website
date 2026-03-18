import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
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
                <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
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
              <h3 className="text-base font-bold text-blue-900 mb-3">1. Information We Collect</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                GeoTrack collects information necessary to provide field sales tracking services. This includes:
              </p>
              <ul className="space-y-2">
                {[
                  'Account information (name, email, phone number)',
                  'GPS location data from field sales representatives',
                  'Client information and visit logs',
                  'Device information and usage data',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">2. How We Use Your Information</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                We use the collected information to:
              </p>
              <ul className="space-y-2">
                {[
                  'Provide real-time GPS tracking and location services',
                  'Manage client databases and visit history',
                  'Synchronize data with Tally ERP systems',
                  'Generate reports and analytics',
                  'Improve our services and user experience',
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
              <h3 className="text-base font-bold text-blue-900 mb-3">3. Data Security</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                We implement industry-standard security measures including JWT authentication, encrypted data storage, and secure API communications. Location data is transmitted over secure HTTPS connections and stored in compliance with data protection regulations.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">4. Data Sharing</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                We do not sell or share your personal information with third parties except as necessary to provide our services (e.g., Tally ERP integration) or as required by law. All third-party integrations comply with our strict data protection standards.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">5. Your Rights</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                You have the right to access, modify, or delete your personal information at any time. You can also request a copy of your data or opt-out of certain data collection practices. Contact us at{' '}
                <a href="mailto:privacy@geotrack.com" className="text-blue-600 hover:underline">
                  info@averlonworld.com
                </a>{' '}
                for data-related requests.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">6. Location Data</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                GPS location tracking is a core feature of GeoTrack. Location data is collected every 5 minutes when the mobile app is active. Users can disable location tracking through the app settings, but this will limit functionality. Location history is retained for reporting purposes and can be deleted upon request.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">7. Contact Us</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@geotrack.com" className="text-blue-600 hover:underline">
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