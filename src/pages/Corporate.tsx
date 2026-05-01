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

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Corporate Wellness?</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Proven benefits for your organization and team</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: 'Increased Productivity', desc: '↑23% productivity boost with improved nutrition' },
              { icon: Users, title: 'Better Retention', desc: 'Show employees you care about their wellbeing' },
              { icon: Gift, title: 'Reduced Absenteeism', desc: '↓35% sick days with stronger immunity' },
              { icon: CheckCircle, title: 'Morale & Culture', desc: 'Build a wellness-first company culture' },
              { icon: TrendingUp, title: 'ROI on Health', desc: 'Every ₹1 invested returns ₹5-8 in savings' },
              { icon: Building2, title: 'Brand Reputation', desc: 'Attract talent with a wellness-focused brand' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center border border-green-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Offerings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Our Corporate Solutions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Bulk Wellness Packages',
                desc: 'Ready-to-deploy wellness programs with custom branding for your office.',
                features: ['Custom quantities', 'Dedicated account manager', 'Bulk pricing', 'Monthly delivery'],
              },
              {
                title: 'Employee Wellness Subscriptions',
                desc: 'Monthly wellness deliveries to your office or employees\' homes.',
                features: ['Monthly boxes', 'Flexible quantities', 'Nutrition guidance', 'Wellness tracking'],
              },
              {
                title: 'Wellness Events & Workshops',
                desc: 'On-site health seminars and product sampling for employee engagement.',
                features: ['Expert sessions', 'Live demos', 'Q&A panels', 'Product tastings'],
              },
              {
                title: 'Custom Wellness Solutions',
                desc: 'Tailored programs designed specifically for your organization\'s needs.',
                features: ['Needs assessment', 'Custom formulation', 'Ongoing support', 'Annual reviews'],
              },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 border border-green-200 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.desc}</p>
                <ul className="space-y-3">
                  {item.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
