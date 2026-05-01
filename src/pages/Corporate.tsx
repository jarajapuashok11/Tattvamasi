import { useState } from 'react';
import { Building2, Users, TrendingUp, Gift, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Corporate() {
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    employee_count: '',
    products_interested: [] as string[],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleProduct = (product: string) => {
    setForm(prev => ({
      ...prev,
      products_interested: prev.products_interested.includes(product)
        ? prev.products_interested.filter(p => p !== product)
        : [...prev.products_interested, product],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from('corporate_inquiries').insert([form]);
    setLoading(false);
    setForm({
      company_name: '',
      contact_name: '',
      email: '',
      phone: '',
      employee_count: '',
      products_interested: [],
      message: '',
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <Building2 className="w-14 h-14 mx-auto mb-6 text-green-300" />
          <h1 className="text-5xl font-bold mb-6">Corporate Wellness Programs</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Invest in your employees' health. Tatvamasi's premium organic wellness solutions reduce sick days, boost morale, and drive productivity.
          </p>
        </div>
      </section>

      {/* Why Corporate Wellness with Image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
                alt="Corporate Wellness"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Transform Your Workplace</span>
              <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                Why Corporate <span className="text-green-600">Wellness Matters</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Investing in employee health is investing in your company's future. When your team feels energized, focused, and supported, productivity soars and culture thrives.
              </p>

              <ul className="space-y-5">
                {[
                  { stat: '23%', desc: 'Average productivity increase with nutrition programs' },
                  { stat: '35%', desc: 'Reduction in sick days and absenteeism' },
                  { stat: '5-8x', desc: 'ROI return on every rupee invested in wellness' },
                  { stat: '89%', desc: 'Employee satisfaction when wellness is prioritized' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 group-hover:bg-green-500 transition-colors">
                        <span className="text-green-600 group-hover:text-white font-bold text-lg transition-colors">{item.stat}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors text-base">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900">Proven Benefits for Your Team</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: 'Increased Productivity', desc: '23% productivity boost with improved nutrition and sustained energy' },
              { icon: Users, title: 'Better Retention', desc: 'Show employees you genuinely care about their wellbeing and growth' },
              { icon: Gift, title: 'Reduced Absenteeism', desc: '35% fewer sick days with stronger immunity and better health' },
              { icon: CheckCircle, title: 'Morale & Culture', desc: 'Build a positive, wellness-first company culture that attracts talent' },
              { icon: TrendingUp, title: 'Strong ROI', desc: 'Every rupee invested returns 5-8x in health savings and productivity gains' },
              { icon: Building2, title: 'Brand Reputation', desc: 'Become known as an employer that truly values employee wellness' },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-100 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Corporate Solutions - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Tailored Solutions</span>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mt-3 mb-4">
              Our Corporate Solutions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Flexible, scalable wellness programs designed to fit your organization's unique needs and culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Bulk Wellness Packages',
                desc: 'Ready-to-deploy premium wellness programs with custom branding and dedicated support for your office.',
                features: ['Custom quantities', 'Dedicated account manager', 'Bulk pricing', 'Monthly delivery'],
                icon: Gift,
                color: 'from-blue-500 to-blue-600',
              },
              {
                title: 'Employee Wellness Subscriptions',
                desc: 'Monthly curated wellness deliveries to your office or directly to employees\' homes.',
                features: ['Monthly boxes', 'Flexible quantities', 'Nutrition guidance', 'Wellness tracking'],
                icon: Users,
                color: 'from-green-500 to-emerald-600',
              },
              {
                title: 'Wellness Events & Workshops',
                desc: 'Engaging on-site health seminars, expert talks, and product sampling experiences for your team.',
                features: ['Expert sessions', 'Live demos', 'Q&A panels', 'Product tastings'],
                icon: Building2,
                color: 'from-purple-500 to-pink-600',
              },
              {
                title: 'Custom Wellness Solutions',
                desc: 'Fully tailored programs designed specifically for your organization\'s unique wellness goals.',
                features: ['Needs assessment', 'Custom formulation', 'Ongoing support', 'Annual reviews'],
                icon: CheckCircle,
                color: 'from-orange-500 to-red-600',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-white rounded-3xl p-10 border-2 border-gray-100 hover:border-green-400 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-full blur-3xl`} />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors">{item.desc}</p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {item.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${item.color} p-px`}>
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color}`} />
                          </div>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow on hover */}
                  <div className="mt-6 flex items-center text-green-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Quote Today</h2>
            <p className="text-gray-500 text-lg">Fill out the form below and our team will contact you with a customized proposal.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {[
                { key: 'company_name', label: 'Company Name', required: true },
                { key: 'contact_name', label: 'Your Name', required: true },
                { key: 'email', label: 'Email', type: 'email', required: true },
                { key: 'phone', label: 'Phone', type: 'tel' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    required={field.required}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Number of Employees</label>
              <select
                value={form.employee_count}
                onChange={e => setForm(prev => ({ ...prev, employee_count: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select...</option>
                <option value="50-100">50-100</option>
                <option value="100-250">100-250</option>
                <option value="250-500">250-500</option>
                <option value="500-1000">500-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Products Interested In</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Spirulina Shots', 'Organic Powders', 'Both', 'Custom Mix'].map(product => (
                  <label key={product} className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-green-300">
                    <input
                      type="checkbox"
                      checked={form.products_interested.includes(product)}
                      onChange={() => toggleProduct(product)}
                      className="accent-green-600"
                    />
                    <span className="text-sm font-medium text-gray-700">{product}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your wellness goals..."
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Request Sent!
                </>
              ) : loading ? (
                'Sending...'
              ) : (
                <>
                  Send Inquiry <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Workplace?</h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8">
          Let's build a healthier, happier, more productive organization together.
        </p>
      </section>
    </div>
  );
}
