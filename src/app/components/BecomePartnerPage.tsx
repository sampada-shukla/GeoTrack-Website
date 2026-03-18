import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { submitPartnerApplication } from "../../api/partnerProgram";
import bgImage from '../../assets/geotrack_img3.jpg';

const BENEFITS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    title: "Revenue Growth",
    desc: "Expand your service offerings and increase revenue with our high-demand solutions",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "Certification Program",
    desc: "Comprehensive training and certification to ensure expertise and credibility",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Lead Generation",
    desc: "Access qualified leads and opportunities through our partner portal",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    title: "Marketing Support",
    desc: "Co-marketing opportunities and access to marketing materials and resources",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Dedicated Support",
    desc: "Priority technical support and dedicated partner success manager",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
        <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
      </svg>
    ),
    title: "Innovation Access",
    desc: "Early access to new features and products before public release",
  },
];

const TIERS = [
  {
    key: "silver",
    name: "Silver Partner",
    sub: "Entry-level partnership",
    headerColor: "#6B7280",
    accentColor: "#6B7280",
    requirements: ["Basic certification training", "5+ implementations", "Annual revenue target"],
    benefits: ["Partner portal access", "Marketing materials", "Standard support"],
  },
  {
    key: "gold",
    name: "Gold Partner",
    sub: "Advanced partnership",
    headerColor: "#D97706",
    accentColor: "#D97706",
    requirements: ["Advanced certification", "15+ implementations", "Higher revenue target"],
    benefits: ["All Silver benefits", "Priority lead routing", "Co-marketing opportunities", "Priority support"],
  },
  {
    key: "platinum",
    name: "Platinum Partner",
    sub: "Elite partnership",
    headerColor: "#1A56DB",
    accentColor: "#1A56DB",
    requirements: ["Master certification", "30+ implementations", "Premium revenue target"],
    benefits: ["All Gold benefits", "Exclusive territory rights", "Partner success manager", "Early access to features"],
  },
];

const CheckIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

export function BecomePartnerPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "", contactName: "", email: "", phone: "",
    country: "", city: "", website: "", companySize: "",
    partnerType: "", experience: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroRef    = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const programRef  = useRef<HTMLDivElement>(null);
  const formRef     = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("bp-visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );
    [heroRef, benefitsRef, programRef, formRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mapPartnerType  = (type: string) => type === "distributor" ? "distributor" : "channel_partner";
  const mapExperience   = (exp: string)  => exp || "0-1";
  const mapBusinessType = (type: string) => ({ technology: "Technology", reseller: "Reseller", implementation: "Consulting", referral: "Other" }[type] || "Other");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { companyName, contactName, email, phone, country, city, companySize, partnerType, experience } = formData;
    if (!companyName || !contactName || !email || !phone || !country || !city || !companySize || !partnerType || !experience) {
      toast.error("Please fill in all required fields"); return;
    }
    setIsSubmitting(true);
    try {
      await submitPartnerApplication({
        contactInformation: { fullName: contactName, email, phone },
        companyInformation: { companyName, website: formData.website || "", country, city },
        businessDetails: { businessType: mapBusinessType(partnerType), yearsInBusiness: mapExperience(experience), numberOfEmployees: companySize, existingClients: 0 },
        partnershipDetails: { joinAs: mapPartnerType(partnerType), motivation: formData.message || "No additional information provided" },
        source: "geotrack",
      });
      toast.success("Thank you for your interest! We'll review your application and get back to you within 48 hours.");
      setFormData({ companyName: "", contactName: "", email: "", phone: "", country: "", city: "", website: "", companySize: "", partnerType: "", experience: "", message: "" });
    } catch (error: any) {
      toast.error(`Submission failed: ${error.response?.data?.message || error.message || "Something went wrong."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Bricolage+Grotesque:wght@600;700&display=swap');

        .bp-root { min-height: 100vh; background: #F8FAFC; font-family: 'DM Sans', sans-serif; color: #111827; }

        /* HERO */
        .bp-hero {
          background: linear-gradient(135deg, #1A56DB 0%, #1e40af 100%);
          padding: 72px 0 64px; position: relative; overflow: hidden;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .bp-hero.bp-visible { opacity: 1; transform: translateY(0); }
        .bp-hero::after {
          content: ''; position: absolute; right: -100px; top: -100px;
          width: 420px; height: 420px; border-radius: 50%;
          background: rgba(255,255,255,0.05); pointer-events: none;
        }
        .bp-container { max-width: 1200px; margin: 0 auto; padding: 0 32px; position: relative; }
        .bp-hero-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(1.9rem, 4vw, 3rem); font-weight: 700; color: white;
          letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 14px; max-width: 640px;
        }
        .bp-hero-sub { font-size: 1.05rem; color: rgba(255,255,255,0.85); max-width: 560px; line-height: 1.7; }

        /* STATS */
        .bp-stats { background: white; border-bottom: 1px solid #E5E7EB; padding: 40px 0; }
        .bp-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; text-align: center; }
        .bp-stat { padding: 8px 0; border-right: 1px solid #E5E7EB; }
        .bp-stat:last-child { border-right: none; }
        .bp-stat-num { font-family: 'Bricolage Grotesque', sans-serif; font-size: 2.2rem; font-weight: 700; color: #1A56DB; letter-spacing: -0.04em; line-height: 1; margin-bottom: 6px; }
        .bp-stat-label { font-size: 0.825rem; color: #6B7280; font-weight: 500; }

        /* BENEFITS SECTION */
        .bp-section {
          padding: 60px 0; opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          background-size: cover; background-position: center;
          background-attachment: fixed; position: relative;
        }
        .bp-section.bp-visible { opacity: 1; transform: translateY(0); }
        .bp-section::before { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.55); pointer-events: none; }
        .bp-section .bp-container { position: relative; z-index: 1; }
        .bp-section-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(1.5rem,3vw,2.2rem); font-weight: 700; color: white; letter-spacing: -0.03em; text-align: center; margin-bottom: 10px; }
        .bp-section-sub { font-size: 0.95rem; color: white; text-align: center; max-width: 620px; margin: 0 auto 44px; line-height: 1.7; }
        .bp-benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .bp-benefit-card { background: white; border: 1px solid #E5E7EB; border-radius: 14px; padding: 24px; transition: all 0.2s ease; }
        .bp-benefit-card:hover { border-color: rgba(26,86,219,0.2); box-shadow: 0 4px 20px rgba(26,86,219,0.07); transform: translateY(-2px); }
        .bp-benefit-icon { width: 44px; height: 44px; background: #EEF3FF; border-radius: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; border: 1px solid rgba(26,86,219,0.12); }
        .bp-benefit-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 8px; letter-spacing: -0.01em; }
        .bp-benefit-desc { font-size: 0.83rem; color: #6B7280; line-height: 1.6; }

        /* TIERS */
        .bp-tiers-section { padding: 60px 0; background: #EFF6FF; opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .bp-tiers-section.bp-visible { opacity: 1; transform: translateY(0); }
        .bp-tiers-label-wrap { text-align: center; margin-bottom: 14px; }
        .bp-tiers-label { display: inline-flex; align-items: center; gap: 6px; border: 1.5px solid #1A56DB; border-radius: 100px; padding: 5px 14px; font-size: 0.78rem; font-weight: 700; color: #1A56DB; letter-spacing: 0.02em; }
        .bp-tiers-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(1.6rem,3vw,2.4rem); font-weight: 700; color: #111827; letter-spacing: -0.03em; text-align: center; margin-bottom: 8px; }
        .bp-tiers-sub { font-size: 0.9rem; color: #6B7280; text-align: center; margin-bottom: 40px; }
        .bp-tiers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1060px; margin: 0 auto; }

        .bp-tier-card-new { background: white; border-radius: 14px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transition: all 0.25s ease; }
        .bp-tier-card-new:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.1); }
        .bp-tier-header { padding: 18px 24px; text-align: center; }
        .bp-tier-header-name { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.15rem; font-weight: 700; color: white; letter-spacing: -0.01em; }
        .bp-tier-body { padding: 24px; }
        .bp-tier-section-label { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.01em; margin-bottom: 12px; }
        .bp-tier-list { list-style: none; padding: 0; margin: 0 0 20px; }
        .bp-tier-list-item { display: flex; align-items: flex-start; gap: 8px; font-size: 0.845rem; color: #374151; padding: 5px 0; }

        /* FORM */
        .bp-form-section {
            padding: 48px 0 60px;
            background: linear-gradient(135deg, #BFDBFE 0%, #C7D2FE 50%, #DDD6FE 100%);
            opacity: 0; transform: translateY(24px);
            transition: opacity 0.7s ease, transform 0.7s ease;
          }
        .bp-form-section.bp-visible { opacity: 1; transform: translateY(0); }
        .bp-form-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(1.5rem,3vw,2.2rem); font-weight: 700; color: #111827; letter-spacing: -0.03em; text-align: center; margin-bottom: 10px; }
        .bp-form-subtitle { font-size: 0.95rem; color: #6B7280; text-align: center; max-width: 620px; margin: 0 auto 44px; line-height: 1.7; }
        .bp-form-card { background: white; border-radius: 16px; border: 1px solid #E5E7EB; padding: 28px 36px; max-width: 1100px; margin: 0 auto; box-shadow: 0 4px 24px rgba(0,0,0,0.04); }
        .bp-form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 14px; }
        .bp-form-group { display: flex; flex-direction: column; gap: 7px; }
        .bp-form-label {
          font-size: 0.76rem;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.01em;
        }
        .bp-form-req { color: #EF4444; margin-left: 2px; }
        .bp-form-input, .bp-form-select, .bp-form-textarea {
          padding: 9px 14px;
          border: 1.5px solid #E5E7EB;
          border-radius: 10px;
          font-size: 0.845rem;
          font-family: 'Inter', sans-serif;
          color: #111827;
          background: rgba(255,255,255,0.7);
          transition: all 0.2s ease;
          box-sizing: border-box;
          width: 100%;
        }
        .bp-form-input::placeholder, .bp-form-textarea::placeholder { color: #9CA3AF; }
        .bp-form-input:focus, .bp-form-select:focus, .bp-form-textarea:focus { outline: none; border-color: #1A56DB; }
        .bp-form-textarea { resize: none; }
        .bp-submit-btn { width: auto; min-width: 200px; padding: 12px 32px; background: linear-gradient(145deg, #1A56DB, #0E3FA8); color: white; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; box-shadow: 0 4px 14px rgba(26,86,219,0.28); transition: all 0.2s ease; letter-spacing: -0.01em; margin-top: 8px; display: block; margin-left: auto; margin-top: 20px;}
        .bp-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(26,86,219,0.38); }
        .bp-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .bp-form-note { font-size: 0.78rem; color: #9CA3AF; text-align: center; margin-top: 12px; }

        /* CTA */
        .bp-cta { background: white; padding: 64px 0; position: relative; overflow: hidden; border-top: 1px solid #E5E7EB; }
        .bp-cta::after { content: ''; position: absolute; left: -80px; bottom: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.05); pointer-events: none; }
        .bp-cta-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 700; color: #111827; text-align: center; letter-spacing: -0.03em; margin-bottom: 12px; }
        .bp-cta-sub { font-size: 1rem; color: #6B7280; text-align: center; max-width: 480px; margin: 0 auto 36px; line-height: 1.7; }
        .bp-cta-btns { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .bp-cta-btn-white { padding: 12px 26px; background: white; color: #1A56DB; border: none; border-radius: 10px; font-size: 0.9rem; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; box-shadow: 0 4px 14px rgba(0,0,0,0.15); transition: all 0.2s ease; }
        .bp-cta-btn-white:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }
        .bp-cta-btn-outline { padding: 12px 26px; background: transparent; color: #374151; border: 1.5px solid #D1D5DB; border-radius: 10px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s ease; }
        .bp-cta-btn-outline:hover { background: #F9FAFB; border-color: #9CA3AF; color: #111827; }

        @media (max-width: 1024px) {
          .bp-benefits-grid { grid-template-columns: repeat(2, 1fr); }
          .bp-tiers-grid { grid-template-columns: 1fr; max-width: 480px; }
          .bp-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .bp-container { padding: 0 20px; }
          .bp-benefits-grid { grid-template-columns: 1fr; }
          .bp-form-grid { grid-template-columns: 1fr; }
          .bp-hero { padding: 48px 0 40px; }
          .bp-cta-btns { flex-direction: column; }
          .bp-cta-btn-white, .bp-cta-btn-outline { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="bp-root">

        {/* HERO */}
        <div ref={heroRef} className="bp-hero">
          <div className="bp-container">
            <h1 className="bp-hero-title">Become a GeoTrack Pro Partner</h1>
            <p className="bp-hero-sub">Join our growing network of certified partners and help businesses transform their field sales operations</p>
          </div>
        </div>

        {/* STATS */}
        <div className="bp-stats">
          <div className="bp-container">
            <div className="bp-stats-grid">
              {[
                { num: "150+", label: "Active Partners" },
                { num: "50+",  label: "Countries" },
                { num: "5000+", label: "Joint Clients" },
                { num: "95%",  label: "Satisfaction Rate" },
              ].map(s => (
                <div key={s.label} className="bp-stat">
                  <div className="bp-stat-num">{s.num}</div>
                  <div className="bp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BENEFITS */}
        <div ref={benefitsRef} className="bp-section" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="bp-container">
            <h2 className="bp-section-title">Why Partner with GeoTrack Pro?</h2>
            <p className="bp-section-sub">Build your business with industry-leading field sales tracking software</p>
            <div className="bp-benefits-grid">
              {BENEFITS.map(b => (
                <div key={b.title} className="bp-benefit-card">
                  <div className="bp-benefit-icon">{b.icon}</div>
                  <div className="bp-benefit-title">{b.title}</div>
                  <div className="bp-benefit-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PARTNER TIERS */}
        <div ref={programRef} className="bp-tiers-section">
          <div className="bp-container">
            <div className="bp-tiers-label-wrap">
              <div className="bp-tiers-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
                Partnership Levels
              </div>
            </div>
            <h2 className="bp-tiers-title">Partner Program Tiers</h2>
            <p className="bp-tiers-sub">Choose the partnership level that matches your business goals</p>

            <div className="bp-tiers-grid">
              {TIERS.map(tier => (
                <div key={tier.key} className="bp-tier-card-new" style={{ border: `2.5px solid ${tier.headerColor}` }}>
                  {/* Colored header bar */}
                  <div className="bp-tier-header" style={{ background: tier.headerColor }}>
                    <div className="bp-tier-header-name">{tier.name}</div>
                  </div>
                  <div className="bp-tier-body">
                    {/* Requirements */}
                    <div className="bp-tier-section-label" style={{ color: tier.accentColor }}>Requirements:</div>
                    <ul className="bp-tier-list">
                      {tier.requirements.map(r => (
                        <li key={r} className="bp-tier-list-item">
                          <CheckIcon color={tier.accentColor} />
                          {r}
                        </li>
                      ))}
                    </ul>
                    {/* Benefits */}
                    <div className="bp-tier-section-label" style={{ color: tier.accentColor }}>Benefits:</div>
                    <ul className="bp-tier-list" style={{ marginBottom: 0 }}>
                      {tier.benefits.map(b => (
                        <li key={b} className="bp-tier-list-item">
                          <CheckIcon color={tier.accentColor} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* APPLICATION FORM */}
        <div ref={formRef} className="bp-form-section">
          <div className="bp-container">
            <h2 className="bp-form-title">Partner Application Form</h2>
            <p className="bp-form-subtitle">Fill out the form below to start your journey as a GeoTrack Pro partner</p>
            <div className="bp-form-card">
              <form onSubmit={handleSubmit}>
                <div className="bp-form-grid">
                  <div className="bp-form-group">
                    <label className="bp-form-label">Company Name<span className="bp-form-req">*</span></label>
                    <input className="bp-form-input" type="text" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Your company name" />
                  </div>
                  <div className="bp-form-group">
                    <label className="bp-form-label">Contact Name<span className="bp-form-req">*</span></label>
                    <input className="bp-form-input" type="text" name="contactName" value={formData.contactName} onChange={handleChange} required placeholder="Your full name" />
                  </div>
                  <div className="bp-form-group">
                    <label className="bp-form-label">Email Address<span className="bp-form-req">*</span></label>
                    <input className="bp-form-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                  </div>
                  <div className="bp-form-group">
                    <label className="bp-form-label">Phone Number<span className="bp-form-req">*</span></label>
                    <input className="bp-form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="bp-form-group">
                    <label className="bp-form-label">Country<span className="bp-form-req">*</span></label>
                    <input className="bp-form-input" type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="Your country" />
                  </div>
                  <div className="bp-form-group">
                    <label className="bp-form-label">City<span className="bp-form-req">*</span></label>
                    <input className="bp-form-input" type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Your city" />
                  </div>
                  <div className="bp-form-group">
                    <label className="bp-form-label">Company Website</label>
                    <input className="bp-form-input" type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://yourcompany.com" />
                  </div>
                  <div className="bp-form-group">
                    <label className="bp-form-label">Company Size<span className="bp-form-req">*</span></label>
                    <select className="bp-form-select" name="companySize" value={formData.companySize} onChange={handleChange} required>
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                  <div className="bp-form-group">
                    <label className="bp-form-label">Join As<span className="bp-form-req">*</span></label>
                    <select className="bp-form-select" name="partnerType" value={formData.partnerType} onChange={handleChange} required>
                      <option value="">Select type</option>
                      <option value="reseller">Channel Partner</option>
                      <option value="distributor">Distributor</option>
                    </select>
                  </div>
                  <div className="bp-form-group">
                    <label className="bp-form-label">Years of Experience<span className="bp-form-req">*</span></label>
                    <select className="bp-form-select" name="experience" value={formData.experience} onChange={handleChange} required>
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>
                <div className="bp-form-group">
                  <label className="bp-form-label">Additional Information</label>
                  <textarea className="bp-form-textarea" name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us why you want to become a partner and what makes your company unique..." />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <button type="submit" className="bp-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                  <div className="bp-form-note">By submitting this form, you agree to our terms and conditions</div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* CONTACT CTA */}
        <div className="bp-cta">
          <div className="bp-container">
            <div className="bp-cta-title">Have Questions?</div>
            <div className="bp-cta-sub">Our partner team is here to help you understand the program and benefits</div>
            <div className="bp-cta-btns">
              <button className="bp-cta-btn-white" onClick={() => navigate("/partners")}>View Partner Directory</button>
              <button className="bp-cta-btn-outline" onClick={() => navigate("/contact")}>
                Contact Partner Team
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}