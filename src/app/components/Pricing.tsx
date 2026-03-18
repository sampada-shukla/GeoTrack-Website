import { useState, useEffect } from 'react';
import { Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../api/auth';
import emailjs from "@emailjs/browser";

type PricingPeriod = 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Yearly';

const periodToCycle: Record<PricingPeriod, 'monthly' | 'quarterly' | 'half-yearly' | 'yearly'> = {
  Monthly: 'monthly',
  Quarterly: 'quarterly',
  'Half-Yearly': 'half-yearly',
  Yearly: 'yearly',
};

const cycleToMonths: Record<string, number> = {
  monthly: 1, quarterly: 3, 'half-yearly': 6, yearly: 12,
};

interface LMSPlan {
  licenseId: string;   // lic._id  (used by CheckoutPage to match the license)
  licenseType: string; // lt._id
  name: string;
  description: string;
  price: number;       // base monthly price per user
  features: { featureSlug: string; uiLabel: string }[];
  popular: boolean;
  isFree: boolean;
  isEnterprise: boolean;
  discountConfig: {
    monthly: number;
    quarterly: number;
    'half-yearly': number;
    yearly: number;
  };
}

const PLAN_ORDER: Record<string, number> = {
  starter: 1, free: 1, professional: 2, business: 3, enterprise: 4,
};

export function Pricing() {
  const [pricingPeriod, setPricingPeriod] = useState<PricingPeriod>('Monthly');
  const [plans, setPlans] = useState<LMSPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          'https://lisence-system.onrender.com/api/license/public/licenses-by-product/69589d3ba7306459dd47fd87',
          { headers: { 'x-api-key': 'my-secret-key-123' } }
        );
        const data = await res.json();

        const mapped: LMSPlan[] = data.licenses.map((lic: any) => {
          const lt = lic.licenseType;
          const key = lt.name.toLowerCase();
          return {
            licenseId: lic._id,
            licenseType: lt._id,
            name: lt.name,
            description: lt.description ?? `Best for ${lt.name} users`,
            price: lt.price.amount,
            features: lt.features || [],
            popular: key === 'professional',
            isFree: lt.price.amount === 0,
            isEnterprise: key === 'enterprise',
            discountConfig: lt.discountConfig || {
              monthly: 0, quarterly: 5, 'half-yearly': 10, yearly: 20,
            },
          };
        });

        mapped.sort((a, b) => {
          const aKey = a.name.toLowerCase();
          const bKey = b.name.toLowerCase();
          return (PLAN_ORDER[aKey] || 999) - (PLAN_ORDER[bKey] || 999);
        });

        setPlans(mapped);
      } catch (err) {
        console.error('Failed to load plans', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const getPrice = (plan: LMSPlan): string => {
    if (plan.isFree) return 'Free';
    const cycle = periodToCycle[pricingPeriod];
    const months = cycleToMonths[cycle];
    const discount = plan.discountConfig?.[cycle] ?? 0;
    const total = plan.price * months * (1 - discount / 100);
    return '₹' + total.toLocaleString('en-IN');
  };

  const getPeriodLabel = (): string => {
    if (pricingPeriod === 'Monthly') return '/user/month';
    if (pricingPeriod === 'Quarterly') return '/user/quarter';
    if (pricingPeriod === 'Half-Yearly') return '/user/half-yearly';
    return '/user/year';
  };

  const getSavePercent = (plan: LMSPlan): string => {
    const cycle = periodToCycle[pricingPeriod];
    const pct = plan.discountConfig?.[cycle] ?? 0;
    return pct > 0 ? `Save ${pct}%` : '';
  };

  const handleBuyNow = (plan: LMSPlan) => {
    // ✅ CHANGE 1: Removed "if (plan.isFree) return" — free plan now navigates to checkout

    // Enterprise — route to contact/sales
    if (plan.isEnterprise) {
      navigate('/contact', { state: { initialType: 'sales' } });
      return;
    }

    const cycle = periodToCycle[pricingPeriod];

    if (isAuthenticated()) {
      navigate('/checkout', {
        state: {
          selectedPlan: plan.licenseType,
          billingCycle: cycle,
        },
      });
    } else {
      navigate('/', {
        state: {
          openLogin: true,
          redirectTo: `/checkout`,
          checkoutState: {
            selectedPlan: plan.licenseType,
            billingCycle: cycle,
          },
        },
      });
    }
  };

  const getCtaLabel = (plan: LMSPlan) => {
    // ✅ CHANGE 2: Show "Start Free Trial" when authenticated, "Get Started Free" otherwise
    if (plan.isFree) return isAuthenticated() ? 'Start Free Trial' : 'Get Started Free';
    if (plan.isEnterprise) return 'Contact Sales';
    return 'Buy Now';
  };

  const checkColors: Record<string, string> = {
    Starter: 'text-gray-600', Free: 'text-gray-600',
    Professional: 'text-cyan-500',
    Business: 'text-blue-500',
    Enterprise: 'text-purple-500',
  };

  const priceColors: Record<string, string> = {
    Starter: 'text-gray-900', Free: 'text-gray-900',
    Professional: 'text-cyan-500',
    Business: 'text-blue-600',
    Enterprise: 'text-purple-500',
  };

  const badgeColors: Record<string, string> = {
    Starter: 'bg-gray-800 text-white', Free: 'bg-gray-800 text-white',
    Professional: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white',
    Business: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white',
    Enterprise: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  };

  const ctaStyles: Record<string, string> = {
    Starter: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    Free: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    Professional: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-400/40 hover:scale-[1.02]',
    Business: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-400/40 hover:scale-[1.02]',
    Enterprise: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  };

  return (
    <section id="pricing" className="relative py-16 lg:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">Pricing</h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Flexible pricing plans designed to scale with your business
          </p>
        </div>

        {/* Period Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-md border border-gray-100 gap-1">
            {(['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'] as const).map((period) => {
              const savings: Record<string, string> = { Quarterly: '-5%', 'Half-Yearly': '-10%', Yearly: '-20%' };
              const isActive = pricingPeriod === period;
              return (
                <button
                  key={period}
                  onClick={() => setPricingPeriod(period)}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-400/30'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period}
                  {savings[period] && (
                    <span className={`text-xs font-bold ${isActive ? 'text-cyan-100' : 'text-green-500'}`}>
                      {savings[period]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20 text-gray-400 text-sm">Loading plans...</div>
        )}

        {/* Cards */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch px-6 lg:px-12">
            {plans.map((plan) => (
              <div
                key={plan.licenseType}
                className={`relative bg-white rounded-2xl border transition-all duration-300 flex flex-col h-full ${
                  plan.popular
                    ? 'border-cyan-400 shadow-2xl shadow-cyan-400/20 ring-2 ring-cyan-400'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">

                  {/* Plan name badge */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeColors[plan.name] || 'bg-gray-800 text-white'}`}>
                      {plan.name}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 mb-4">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-5 min-h-[64px]">
                    <div className="flex items-baseline flex-wrap gap-x-1">
                      <span className={`text-4xl font-bold ${priceColors[plan.name] || 'text-gray-900'}`}>
                        {getPrice(plan)}
                      </span>
                      {!plan.isFree && (
                        <span className="text-xs text-gray-400">{getPeriodLabel()}</span>
                      )}
                    </div>
                    {!plan.isFree && getSavePercent(plan) && (
                      <div className="mt-2">
                        <span className="inline-block px-2.5 py-0.5 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                          {getSavePercent(plan)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleBuyNow(plan)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold mb-6 transition-all duration-200 ${ctaStyles[plan.name] || 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {getCtaLabel(plan)}
                  </button>

                  {/* Features */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <p className="text-xs font-bold text-gray-700 mb-3 flex-shrink-0">Includes:</p>
                    <div
                      className="overflow-y-auto pr-1 space-y-2.5"
                      style={{ height: '220px', scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
                    >
                      {plan.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${checkColors[plan.name] || 'text-gray-600'}`} />
                          <span className="text-xs text-gray-500 leading-snug">
                            {typeof feature === 'string' ? feature : feature.uiLabel}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <style>{`
          .overflow-y-auto::-webkit-scrollbar { width: 4px; }
          .overflow-y-auto::-webkit-scrollbar-track { background: transparent; }
          .overflow-y-auto::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        `}</style>
      </div>
    </section>
  );
}