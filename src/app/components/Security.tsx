import { X, Shield, Lock, Database, Eye, CheckCircle, AlertTriangle } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
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
                <h2 className="text-2xl font-bold text-white">Security</h2>
                <p className="text-blue-300 text-sm mt-1">
                  At GeoTrack, we take security seriously. Learn about our security measures and best practices.
                </p>
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
          <div className="bg-gray-50 overflow-y-auto flex-1 px-8 py-6 space-y-8">

            {/* Security Features */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Security Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <Shield className="w-6 h-6 text-blue-600" />,
                    title: 'JWT Authentication',
                    desc: 'Secure token-based authentication system with automatic expiration and refresh mechanisms',
                  },
                  {
                    icon: <Lock className="w-6 h-6 text-green-600" />,
                    title: 'End-to-End Encryption',
                    desc: 'All data transmissions use HTTPS/TLS encryption to protect information in transit',
                  },
                  {
                    icon: <Database className="w-6 h-6 text-purple-600" />,
                    title: 'Encrypted Storage',
                    desc: 'Sensitive data is encrypted at rest using industry-standard encryption algorithms',
                  },
                  {
                    icon: <Eye className="w-6 h-6 text-orange-500" />,
                    title: 'Access Controls',
                    desc: 'Role-based access control ensures users only access authorized data and features',
                  },
                ].map((feature, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="mb-3">{feature.icon}</div>
                    <p className="text-sm font-bold text-gray-900 mb-2">{feature.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data Protection</h3>
              <p className="text-sm text-gray-500 mb-4">
                We implement multiple layers of security to protect your data:
              </p>
              <ul className="space-y-3">
                {[
                  { label: 'Database Security', desc: 'Regular backups, automated monitoring, and intrusion detection systems' },
                  { label: 'Password Protection', desc: 'Passwords are hashed using bcrypt with salt for maximum security' },
                  { label: 'Session Management', desc: 'Automatic logout after inactivity and secure session handling' },
                  { label: 'API Security', desc: 'Rate limiting, request validation, and API key management' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-bold text-gray-800">{item.label}:</span> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Data Security */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Location Data Security</h3>
              <p className="text-sm text-gray-500 mb-4">
                GPS location data requires special protection measures:
              </p>
              <ul className="space-y-2">
                {[
                  'Location data is transmitted over secure HTTPS connections',
                  'Coordinates are stored with encryption and access logging',
                  'Location history can be automatically purged based on retention policies',
                  'Access to location data is restricted to authorized administrators',
                  'Mobile apps use secure local storage for temporary location caching',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Compliance */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Compliance & Certifications</h3>
              <p className="text-sm text-gray-500 mb-4">
                GeoTrack complies with industry standards and regulations:
              </p>
              <ul className="space-y-2">
                {[
                  'GDPR compliance for European users',
                  'SOC 2 Type II certified infrastructure',
                  'Regular security audits and penetration testing',
                  'ISO 27001 information security management practices',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Best Practices */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Security Best Practices</h3>
              <p className="text-sm text-gray-500 mb-4">
                We recommend following these security practices:
              </p>
              <ul className="space-y-2">
                {[
                  'Use strong, unique passwords for your GeoTrack account',
                  'Enable two-factor authentication when available',
                  'Regularly review user access permissions',
                  'Log out from shared or public devices',
                  'Keep mobile apps updated to the latest version',
                  'Report suspicious activity immediately',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Incident Response */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Incident Response</h3>
              <p className="text-sm text-gray-500 mb-4">
                In the event of a security incident, we have established procedures to:
              </p>
              <ul className="space-y-2">
                {[
                  'Quickly identify and contain the incident',
                  'Assess the impact and affected data',
                  'Notify affected users within 72 hours as required by law',
                  'Implement corrective measures to prevent recurrence',
                  'Conduct post-incident analysis and reporting',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Report Security Issues — orange warning box */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Report Security Issues</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    If you discover a security vulnerability or have concerns about our security practices, please report it immediately to our security team at{' '}
                    <a href="mailto:info@averlonworld.com" className="font-bold text-gray-800 hover:underline">
                      info@averlonworld.com
                    </a>
                    . We take all reports seriously and will respond promptly.
                  </p>
                </div>
              </div>
            </div>

            {/* Regular Updates */}
            <div>
              <hr className="border-gray-200 mb-4" />
              <p className="text-sm text-gray-500 leading-relaxed">
                <span className="font-semibold text-gray-700">Regular Updates: </span>
                We continuously update our security measures to address emerging threats and maintain the highest standards of data protection. Our security documentation is reviewed quarterly and updated as needed.
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