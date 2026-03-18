import { Target, Lightbulb } from 'lucide-react';
import bgImage from '../../assets/geotrack_img2.jpg';

export function WhyChoose() {
  const whyChooseFeatures = [
    {
      title: 'Pincode-Based Intelligence',
      description: 'Unique smart filtering that automatically shows only clients in your current pincode area using reverse geocoding technology.',
      gradient: 'from-blue-500 to-cyan-500',
      cardBg: 'from-blue-50/95 to-cyan-50/90',
      border: 'border-blue-100',
      pattern: '🎯'
    },
    {
      title: 'Seamless Tally Integration',
      description: 'Bidirectional sync with Tally Prime, bulk import clients, automatic duplicate detection and removal for clean data.',
      gradient: 'from-violet-500 to-purple-600',
      cardBg: 'from-violet-50/95 to-purple-50/90',
      border: 'border-violet-100',
      pattern: '🔄'
    },
    {
      title: 'Real-Time GPS Tracking',
      description: 'Track field sales team location every 5 minutes with 99.9% accuracy, complete history, and activity type detection.',
      gradient: 'from-green-500 to-emerald-500',
      cardBg: 'from-green-50/95 to-emerald-50/90',
      border: 'border-green-100',
      pattern: '📍'
    },
    {
      title: 'Android Mobile App',
      description: 'Native Kotlin app with background location service, offline support, and real-time data synchronization.',
      gradient: 'from-orange-400 to-amber-500',
      cardBg: 'from-orange-50/95 to-amber-50/90',
      border: 'border-orange-100',
      pattern: '📱'
    },
    {
      title: 'Scalable Architecture',
      description: 'Handle 10,000+ clients efficiently with database indexing, pagination, and optimized queries for fast performance.',
      gradient: 'from-pink-500 to-rose-500',
      cardBg: 'from-pink-50/95 to-rose-50/90',
      border: 'border-pink-100',
      pattern: '⚡'
    },
    {
      title: 'Complete Client Management',
      description: 'Full CRUD operations, search, filter, GPS coordinates, notes, status tracking, and comprehensive client profiles.',
      gradient: 'from-indigo-500 to-blue-500',
      cardBg: 'from-indigo-50/95 to-blue-50/90',
      border: 'border-indigo-100',
      pattern: '👥'
    }
  ];

  return (
    <section id="why-us" className="relative py-20 lg:py-28 overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Light overlay so cards stay readable */}
      <div className="absolute inset-0 bg-white/82" />

      {/* Soft blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 z-10">

        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-100 rounded-full">
            <Lightbulb className="w-4 h-4 text-cyan-700" />
            <span className="text-sm font-semibold text-cyan-700">Why Choose Us</span>
          </div>
        </div>

        <div className="text-center mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-gray-900">Why Choose</span>{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
              GeoTrack?
            </span>
          </h2>

          <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide the most comprehensive, accurate, and intelligent field sales tracking solution with unique pincode-based filtering and seamless Tally Prime integration.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {whyChooseFeatures.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${feature.cardBg} bg-opacity-60 rounded-3xl px-7 py-7 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border ${feature.border} hover:border-blue-400 overflow-hidden backdrop-blur-sm`}
            >

              {/* Title with animated gradient underline */}
              <h3 className="text-sm font-bold text-gray-900 mb-2 relative inline-block">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-xs leading-relaxed">
                {feature.description}
              </p>

              {/* Corner blob */}
              <div className={`absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-xl`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}