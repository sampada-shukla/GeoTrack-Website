import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, Headphones, Building2, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { createCustomerSupport } from '../../api/customerSupport';
import { toast } from 'sonner';

const EMAILJS_SERVICE_ID  = 'geotrack_service';
const EMAILJS_PUBLIC_KEY  = '8xnhNwiIb3F1ArXDd';
const TEMPLATE_TO_USER    = 'template_u3g49pr';
const TEMPLATE_TO_COMPANY = 'template_s69sf5m';
emailjs.init('8xnhNwiIb3F1ArXDd');

export function ContactSupport() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', company: '',
    inquiryType: '', subject: '', message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mapInquiryType = (type: string) => {
    switch (type) {
      case 'technical':  return 'TECHNICAL_SUPPORT';
      case 'sales':      return 'SALES_INQUIRY';
      case 'billing':    return 'BILLING_QUESTION';
      case 'demo':       return 'DEMO_REQUEST';
      case 'feature':    return 'FEATURE_REQUEST';
      case 'bug':        return 'BUG_REPORT';
      case 'enterprise': return 'ENTERPRISE_CUSTOM_PLAN';
      default:           return 'OTHER';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const templateParamsUser = {
      user_name:  formData.fullName,
      user_email: formData.email,
      message:    formData.message,
    };

    const templateParamsCompany = {
      name:    formData.fullName,
      email:   formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_TO_USER, templateParamsUser, EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_TO_COMPANY, templateParamsCompany, EMAILJS_PUBLIC_KEY);

      await createCustomerSupport({
        fullName:    formData.fullName,
        email:       formData.email,
        phoneNumber: formData.phone,
        companyName: formData.company,
        inquiryType: mapInquiryType(formData.inquiryType),
        subject:     formData.subject,
        message:     formData.message,
        source:      'GEOTRACK',
      });

      // ✅ REPLACED: alert("Message sent!...")
      toast.success("Message sent!", {
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ fullName: '', email: '', phone: '', company: '', inquiryType: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to submit support request:', error);
      // ✅ REPLACED: alert('Failed to submit. Please try again.')
      toast.error("Failed to submit.", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const channels = [
    {
      icon: Headphones,
      title: 'Customer Support',
      color: 'text-[#0ea5e9]',
      iconBg: 'bg-blue-50 border-blue-100',
      border: 'border-blue-100 hover:border-blue-300',
      details: [
        { icon: Mail,  text: 'info@averlonworld.com' },
        { icon: Phone, text: '+91 9892440788' },
        { icon: Clock, text: '24/7 Support Available' },
      ],
    },
    {
      icon: Building2,
      title: 'Sales Inquiries',
      color: 'text-violet-500',
      iconBg: 'bg-violet-50 border-violet-100',
      border: 'border-violet-100 hover:border-violet-300',
      details: [
        { icon: Mail,  text: 'info@averlonworld.com' },
        { icon: Phone, text: '+91 9892440788' },
        { icon: Clock, text: 'Mon–Fri: 9AM – 6PM IST' },
      ],
    },
    {
      icon: MapPin,
      title: 'Office Location',
      color: 'text-emerald-500',
      iconBg: 'bg-emerald-50 border-emerald-100',
      border: 'border-emerald-100 hover:border-emerald-300',
      details: [
        { icon: MapPin, text: '5th Floor, Lodha Supremus II, Unit No. A-533/A-507, Wagle Industrial Estate, Thane West, Maharashtra 400604' },
      ],
    },
  ];

  const inputCls = "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#0ea5e9] focus:bg-white transition-all";
  const labelCls = "block text-[11px] font-semibold text-gray-500 mb-1.5";

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8faff 50%, #f0fdf4 100%)' }}>

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#0369a1] pt-16 pb-24 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            We're here to help — 24/7 Support Available
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Get In Touch with<br />
            <span className="text-cyan-200">WorkTrack Support</span>
          </h1>
          <p className="text-sm text-blue-100 max-w-md mx-auto leading-relaxed">
            Our support team is ready to help you with any questions, technical issues, or sales inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8">

        {/* ── Contact Channels ── */}
        <div className="relative z-10 -mt-12 mb-14">
          <div className="grid md:grid-cols-3 gap-4">
            {channels.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <div key={i} className={`bg-white rounded-2xl border ${ch.border} p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`w-10 h-10 rounded-xl border ${ch.iconBg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-4 h-4 ${ch.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">{ch.title}</h3>
                  <div className="space-y-2">
                    {ch.details.map((d, j) => {
                      const DIcon = d.icon;
                      return (
                        <div key={j} className="flex items-start gap-2 text-xs text-gray-500">
                          <DIcon className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{d.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Section Divider ── */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-[11px] font-semibold text-gray-400 whitespace-nowrap">
            <Send className="w-3 h-3 text-[#0ea5e9]" />
            Send a Message
          </div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">Contact Support Form</h2>
          <p className="text-[11px] text-gray-400">Fill out the form below and our support team will get back to you within 24 hours</p>
        </div>

        {/* ── Form ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 mb-14">
          <form onSubmit={handleSubmit} className="space-y-3">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Full Name <span className="text-[#0ea5e9]">*</span></label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email Address <span className="text-[#0ea5e9]">*</span></label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Phone Number</label>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 99021 62788" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Company Name</label>
                <input name="company" value={formData.company} onChange={handleChange} placeholder="Acme Corporation" className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Inquiry Type <span className="text-[#0ea5e9]">*</span></label>
                <div className="relative">
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 focus:outline-none focus:border-[#0ea5e9] focus:bg-white transition-all appearance-none pr-8">
                    <option value="">Select type</option>
                    <option value="technical">Technical Support</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="billing">Billing Question</option>
                    <option value="demo">Demo Request</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="enterprise">Enterprise Custom Plan</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className={labelCls}>Subject <span className="text-[#0ea5e9]">*</span></label>
                <input name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help you?" className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Message <span className="text-[#0ea5e9]">*</span></label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={3}
                placeholder="Please describe your inquiry in detail..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#0ea5e9] focus:bg-white transition-all resize-none" />
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button type="button"
                onClick={() => setFormData({ fullName: '', email: '', phone: '', company: '', inquiryType: '', subject: '', message: '' })}
                className="px-6 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-7 py-2 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-bold transition-all hover:scale-105 shadow-md shadow-cyan-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                <Send className="w-3.5 h-3.5" />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* ── FAQ CTA ── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] p-10 text-center mb-16 shadow-xl shadow-cyan-500/20">
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-300/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Looking for Quick Answers?</h3>
            <p className="text-xs text-blue-100 mb-6 max-w-xs mx-auto leading-relaxed">
              Check out our FAQ section for instant answers to common questions about WorkTrack.
            </p>
            <button
              onClick={() => navigate('/faqs')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#0ea5e9] rounded-xl font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200">
              Visit FAQ Section
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}