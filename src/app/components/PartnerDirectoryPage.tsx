import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../../assets/geotrack_img4.jpg';

const BENEFITS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Certified Expertise",
    desc: "All partners are certified and trained in GeoTrack Pro implementation",
    color: "#3B82F6",
    bg: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    title: "Proven Success",
    desc: "Track record of successful implementations across industries",
    color: "#059669",
    bg: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "Local Presence",
    desc: "Partners located across major cities for on-site support",
    color: "#D97706",
    bg: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Full Support",
    desc: "End-to-end support from consultation to training and beyond",
    color: "#7C3AED",
    bg: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
  },
];

export function PartnerDirectoryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Bricolage+Grotesque:wght@600;700&display=swap');

        .pd-root {
          font-family: 'DM Sans', sans-serif;
          color: #111827;
          position: relative;
          background-size: cover;
          background-position: center;
          background-attachment: scroll;
        }
        .pd-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.82);
          pointer-events: none;
          z-index: 0;
        }
        .pd-root > * {
          position: relative;
          z-index: 1;
        }

        /* ── MAIN CONTENT ── */
        .pd-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 32px 80px;
        }

        /* ── HEADING ── */
        .pd-main-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.6rem);
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.03em;
          text-align: center;
          margin-bottom: 20px;
          line-height: 1.15;
        }
        .pd-main-sub {
          font-size: 0.975rem;
          color: #6B7280;
          text-align: center;
          max-width: 680px;
          margin: 0 auto 52px;
          line-height: 1.75;
          font-weight: 400;
        }

        /* ── BENEFITS GRID ── */
        .pd-benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .pd-benefit-card {
          border-radius: 16px;
          padding: 28px 24px 32px;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .pd-benefit-card::after {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          pointer-events: none;
        }
        .pd-benefit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.18);
        }
        .pd-benefit-icon {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1.5px solid rgba(255,255,255,0.8);
        }
        .pd-benefit-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .pd-benefit-desc {
          font-size: 0.845rem;
          color: #374151;
          line-height: 1.65;
        }

        /* ── CTA BOTTOM ── */
        .pd-cta {
          background: white;
          padding: 64px 32px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-top: 1px solid #E5E7EB;
        }
        .pd-cta-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
          position: relative;
        }
        .pd-cta-sub {
          font-size: 1rem;
          color: #6B7280;
          max-width: 480px;
          margin: 0 auto 32px;
          line-height: 1.7;
          position: relative;
        }
        .pd-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: #1A56DB;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(26,86,219,0.25);
          transition: all 0.2s ease;
          letter-spacing: -0.01em;
          position: relative;
        }
        .pd-cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(26,86,219,0.35);
        }

        @media (max-width: 1024px) {
          .pd-benefits-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pd-content { padding: 40px 20px 60px; }
          .pd-benefits-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div
        className="pd-root"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      >
        {/* MAIN CONTENT */}
        <div className="pd-content">
          <h1 className="pd-main-title">
            GeoTrack Pro Partners can help you create and manage your field sales!
          </h1>
          <p className="pd-main-sub">
            Our partners are there to make your GeoTrack Pro experience more pleasant and productive – from choosing a subscription plan to implementation, customization, and employee training. Browse our Partner Directory to find a GeoTrack Pro partner in your area and contact them directly or use the form below to get a price estimate for your implementation project.
          </p>

          {/* Benefits Grid */}
          <div className="pd-benefits-grid">
            {BENEFITS.map(b => (
              <div
                key={b.title}
                className="pd-benefit-card"
                style={{ background: b.bg, boxShadow: `0 8px 24px ${b.color}30` }}
              >
                <div className="pd-benefit-icon">{b.icon}</div>
                <div className="pd-benefit-title">{b.title}</div>
                <div className="pd-benefit-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BOTTOM */}
        <div className="pd-cta">
          <div className="pd-cta-title">Ready to become a partner?</div>
          <div className="pd-cta-sub">
            Join our network of certified partners and help businesses transform their field sales operations
          </div>
          <button className="pd-cta-btn" onClick={() => navigate("/become-partner")}>
            Become a Partner
          </button>
        </div>

      </div>
    </>
  );
}