import { Link } from 'react-router-dom';
import { Leaf, Heart, Zap, Users, Award, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.pexels.com/photos/3551711/pexels-photo-3551711.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">Nature's Wisdom,<br />Modern Science</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Born from a passion for preventive health, Tatvamasi brings ancient Ayurvedic wisdom together with cutting-edge nutritional science.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-10 border border-green-100 shadow-sm">
              <Heart className="w-10 h-10 text-green-600 mb-5" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To empower individuals with premium organic superfoods that support natural immunity, detoxification, and sustainable energy — making preventive wellness accessible to everyone.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-green-100 shadow-sm">
              <Leaf className="w-10 h-10 text-green-600 mb-5" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To build the world's most trusted organic wellness brand — one where quality is non-negotiable, transparency is standard, and health transformation is the norm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Core Values</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: '100% Organic', desc: 'Certified organic ingredients, zero synthetic pesticides, zero compromises.' },
              { icon: Award, title: 'Purity First', desc: 'Cold-processed, lab-tested, no additives, no fillers — just pure nutrition.' },
              { icon: Zap, title: 'Results Driven', desc: 'Every product formulated for measurable impact on your health and energy.' },
              { icon: Users, title: 'Community', desc: 'Supporting farmers, empowering customers, building a wellness movement.' },
            ].map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose Tatvamasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: 'Premium Sourcing', desc: 'We partner with certified organic farms, ensuring every ingredient meets our exacting quality standards.' },
              { title: 'Scientific Formulation', desc: 'Backed by nutritional science and validated by third-party labs for potency and purity.' },
              { title: 'Cold Preservation', desc: 'Our cold-processing methods preserve heat-sensitive nutrients that standard processing destroys.' },
              { title: 'Transparent Practices', desc: 'Complete traceability from farm to bottle. You know exactly what you\'re consuming.' },
              { title: 'Customer First', desc: 'Lifetime support with personalized guidance on nutrition, usage, and wellness integration.' },
              { title: 'Sustainable Impact', desc: 'We invest in farmer communities, sustainable agriculture, and eco-conscious packaging.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-900 rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-green-100 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience the Difference</h2>
          <p className="text-gray-600 text-lg mb-10">
            Join thousands who've transformed their health with Tatvamasi's premium organic superfoods.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-10 py-5 bg-green-600 text-white font-bold rounded-full text-lg hover:bg-green-700 transition-colors"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
