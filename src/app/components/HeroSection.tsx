import { ArrowRight, Play } from 'lucide-react';
import heroImage from '../../assets/geotrack_img1.jpg';

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col overflow-hidden">

      {/* ── Full-bleed background image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* ── Dark teal overlay matching screenshot ── */}
      <div className="absolute inset-0 bg-[#0d2233]/72" />

      {/* ── Ambient glow blobs ── */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
      />

      {/* ── Glass tagline pill — just below navbar ── */}
      <div className="relative z-10 flex justify-center pt-10">
        <div
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full whitespace-nowrap"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse flex-shrink-0" />
          <span className="text-sm font-medium text-white/90 tracking-wide">
            Empowering Businesses with Strength, Backed by Reliability, and Grounded in Stability.
          </span>
        </div>
      </div>

      {/* ── Centered main content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center pb-12 mt-8">

        {/* Headline */}
        <h1
          className="font-extrabold text-white leading-[1.08] tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)' }}
        >
          Smarter Field Sales Solutions
          <br />
          <span className="text-[#38bdf8]">for Growing Businesses</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Streamline operations, boost productivity, and scale faster with
          GeoTrack and Tally Prime Integration — trusted by SMEs and enterprises
          across industries.
        </p>
      </div>
    </section>
  );
}