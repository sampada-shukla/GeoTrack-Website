import { MapPin, Map, Users, RefreshCw, Check, Shield, Zap } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Real-Time GPS Tracking',
      description: "Track your field sales team's location in real-time with automatic GPS logging every 5 minutes.",
      iconGradient: 'from-blue-500 to-cyan-500',
      cardBg: 'from-blue-50/80 to-cyan-50/60',
      border: 'border-blue-100',
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: 'Pincode-Based Filtering',
      description: "Automatically filter and show only clients in the sales rep's current pincode area.",
      iconGradient: 'from-pink-500 to-rose-500',
      cardBg: 'from-pink-50/80 to-rose-50/60',
      border: 'border-pink-100',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Client Management',
      description: 'Complete CRUD operations for client data including contact details and GPS coordinates.',
      iconGradient: 'from-orange-400 to-amber-500',
      cardBg: 'from-orange-50/80 to-amber-50/60',
      border: 'border-orange-100',
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: 'Tally ERP Integration',
      description: 'Seamless bidirectional sync with Tally ERP and automatic duplicate detection.',
      iconGradient: 'from-violet-500 to-purple-600',
      cardBg: 'from-violet-50/80 to-purple-50/60',
      border: 'border-violet-100',
    },
  ];

  const capabilities = [
    { name: 'Secure Authentication', icon: Shield },
    { name: 'Duplicate Prevention', icon: Check },
    { name: 'Location History', icon: MapPin },
    { name: 'Sales & Customer Management', icon: Users },
    { name: 'Field Team Tracking', icon: Map },
    { name: 'Enterprise-Grade Security', icon: Zap },
  ];

  return (
    <section
      id="features"
      className="relative py-20 lg:py-28"
      style={{
        background: 'linear-gradient(135deg, #f0f7ff 0%, #f8faff 40%, #f0fdf4 70%, #fdf4ff 100%)',
      }}
    >
      {/* Soft background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Extra outer padding via px-6 sm:px-10 lg:px-16 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Powerful Features</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="text-gray-900">End-to-End Features</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
              to Run Your Business Smoothly
            </span>
          </h2>

          <p className="text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From field tracking to operations, our solutions are built to streamline every core function of your business. Whether you're using{' '}
            <span className="font-semibold text-gray-900">WorkTrack Pro</span> or our flexible platform, we've got you covered with everything you need — and more.
          </p>
        </div>

        {/* Feature Cards — always-on colored backgrounds matching screenshot */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${feature.cardBg} rounded-3xl px-7 py-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border ${feature.border} overflow-hidden`}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.iconGradient} text-white mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative corner blob */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.iconGradient} opacity-10 rounded-full blur-xl`} />
            </div>
          ))}
        </div>

        {/* Key Capabilities — narrow centered, colorful checks */}
        <div className="flex justify-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-md border border-gray-100 w-full max-w-2xl">
            <h3 className="text-base font-bold text-[#0ea5e9] mb-4">Key Capabilities:</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {capabilities.map((capability, index) => {
                const colors = ['bg-blue-500','bg-pink-500','bg-orange-400','bg-violet-500','bg-emerald-500','bg-cyan-500'];
                return (
                  <div key={index} className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full ${colors[index]} flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-700">{capability.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}