import {
  DollarSign, Package, ShoppingCart, Users2,
  MapPin, RefreshCw, Shield, BarChart3
} from "lucide-react";

const productModules = [
  {
    icon: DollarSign,
    title: "Expense Logging",
    description: "Track expenses and maintain accurate financial records.",
    gradient: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-100 hover:border-blue-300",
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: MapPin,
    title: "Real-Time GPS Tracking",
    description: "Live tracking of field staff locations for better visibility.",
    gradient: "from-cyan-500/10 to-cyan-600/5",
    border: "border-cyan-100 hover:border-cyan-300",
    iconBg: "bg-cyan-50 border-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: Users2,
    title: "Client & Lead Management",
    description: "Manage client details, leads, and activity status efficiently.",
    gradient: "from-purple-500/10 to-purple-600/5",
    border: "border-purple-100 hover:border-purple-300",
    iconBg: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Visual dashboards and reports for data-driven decisions.",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-100 hover:border-emerald-300",
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Package,
    title: "Data Records Management",
    description: "Organize, store, and manage system records securely.",
    gradient: "from-green-500/10 to-green-600/5",
    border: "border-green-100 hover:border-green-300",
    iconBg: "bg-green-50 border-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: ShoppingCart,
    title: "Bulk Data Operations",
    description: "Perform bulk actions like import, update, and export of data.",
    gradient: "from-orange-500/10 to-orange-600/5",
    border: "border-orange-100 hover:border-orange-300",
    iconBg: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-500",
  },
  {
    icon: RefreshCw,
    title: "Data Sync & Updates",
    description: "Ensure data consistency with real-time updates and syncing.",
    gradient: "from-pink-500/10 to-pink-600/5",
    border: "border-pink-100 hover:border-pink-300",
    iconBg: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-500",
  },
  {
    icon: Shield,
    title: "Role-Based Access Control",
    description: "Secure user access with permission-based controls.",
    gradient: "from-indigo-500/10 to-indigo-600/5",
    border: "border-indigo-100 hover:border-indigo-300",
    iconBg: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-600",
  },
];

export function ProductSection() {
  return (
    <section
      id="product"
      className="relative py-20 lg:py-28 overflow-hidden px-6 sm:px-10 lg:px-16"
      style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #f8faff 40%, #f0fdf4 70%, #fdf4ff 100%)' }}
    >
      {/* background blobs */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-semibold text-gray-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
            Product Modules
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            The globally trusted{' '}
            <span className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] bg-clip-text text-transparent">
              field sales software
            </span>
            <br />for growing enterprises
          </h2>
          <p className="text-xs text-gray-400 max-w-xl mx-auto">
            Everything your field sales team needs — in one powerful, integrated platform.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productModules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={i}
                className={`group relative bg-gradient-to-br ${mod.gradient} bg-white rounded-3xl border ${mod.border} px-6 py-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center`}
              >
                {/* icon */}
                <div className={`w-12 h-12 rounded-2xl border ${mod.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${mod.iconColor}`} />
                </div>

                {/* title */}
                <h3 className="text-sm font-bold text-gray-800 mb-2 leading-snug">
                  {mod.title}
                </h3>

                {/* description */}
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}