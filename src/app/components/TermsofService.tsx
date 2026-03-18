import { X } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
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
                <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
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
              <h3 className="text-base font-bold text-blue-900 mb-3">1. Acceptance of Terms</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                By accessing and using GeoTrack, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">2. Service Description</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                GeoTrack provides field sales tracking software with features including:
              </p>
              <ul className="space-y-2">
                {[
                  'Real-time GPS location tracking',
                  'Client management with CRUD operations',
                  'Pincode-based client filtering',
                  'Tally ERP integration and synchronization',
                  'Administrative dashboard and reporting',
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
              <h3 className="text-base font-bold text-blue-900 mb-3">3. User Responsibilities</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Users agree to:
              </p>
              <ul className="space-y-2">
                {[
                  'Provide accurate and complete information',
                  'Maintain the security of their account credentials',
                  'Use the service in compliance with applicable laws',
                  'Not attempt to breach security or access unauthorized data',
                  'Obtain necessary consent from employees for location tracking',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">4. Location Tracking Consent</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                By using GeoTrack's location tracking features, organizations agree to obtain proper consent from field representatives whose locations are being tracked. Organizations are responsible for compliance with local employment and privacy laws regarding employee monitoring.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">5. Data Usage and Ownership</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                All client data, location logs, and business information entered into GeoTrack remain your property. We claim no ownership rights over your data. You grant us permission to use your data solely to provide and improve our services.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">6. Service Availability</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                We strive to maintain 99.9% uptime but cannot guarantee uninterrupted access. The service may be temporarily unavailable for maintenance, updates, or due to circumstances beyond our control. We are not liable for any losses resulting from service interruptions.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">7. Subscription and Payment</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                GeoTrack operates on a subscription basis. Payment terms, pricing, and refund policies are outlined in your subscription agreement. We reserve the right to modify pricing with 30 days notice to existing subscribers.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">8. Termination</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or illegal activities. Upon termination, you may request an export of your data within 30 days.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">9. Limitation of Liability</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                GeoTrack is provided "as is" without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from use of the service. Our total liability shall not exceed the amount paid for the service in the past 12 months.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">10. Changes to Terms</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                We may modify these terms at any time. Users will be notified of significant changes via email. Continued use of the service after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-3">11. Contact Information</h3>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                For questions regarding these terms, contact us at{' '}
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