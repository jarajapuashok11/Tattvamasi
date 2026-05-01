import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Droplets, Leaf, Star, ChevronRight, Building2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Testimonial } from '../types';
import ProductCard from '../components/ProductCard';

const heroSlides = [
  {
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    label: 'Orange',
    accent: '#f97316',
  },
  {
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    label: 'Strawberry',
    accent: '#ef4444',
  },
  {
    image: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg',
    label: 'Guava',
    accent: '#10b981',
  },
];

const benefits = [
  {
    icon: Shield,
    title: 'Immunity Boost',
    desc: 'Packed with antioxidants, Vitamin C, and phytonutrients to strengthen your natural defenses.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Droplets,
    title: 'Deep Detox',
    desc: 'Chlorophyll-rich spirulina binds to toxins and flushes them out, cleansing your system daily.',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: Zap,
    title: 'Natural Energy',
    desc: 'No caffeine, no crash. Pure plant energy from complete protein and B-vitamins.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Leaf,
    title: '100% Organic',
    desc: 'Certified organic ingredients, cold-processed to preserve every nutrient in its natural form.',
    color: 'bg-green-50 text-green-600',
  },
];

const stats = [
  { value: '5000+', label: 'Happy Customers' },
  { value: '100%', label: 'Organic Certified' },
  { value: '8', label: 'Premium Products' },
  { value: '50+', label: 'Corporate Clients' },
];

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    supabase.from('products').select('*').eq('featured', true).order('sort_order').then(({ data }) => {
      if (data) setFeatured(data);
    });
    supabase.from('testimonials').select('*').eq('featured', true).then(({ data }) => {
      if (data) setTestimonials(data);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 text-sm font-medium mb-6">
              Premium Organic Wellness
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Nature's Power.
              <span className="block text-green-400">In Every Sip.</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-10 max-w-xl">
              60ml spirulina wellness shots and premium organic superfood powders — scientifically formulated for immunity, detox, and daily energy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full text-lg hover:bg-white/20 transition-all duration-200"
              >
                Our Story
              </Link>
            </div>

            {/* Flavour Indicators */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">Available flavours:</span>
              {heroSlides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`text-sm font-medium transition-all duration-200 ${
                    i === activeSlide
                      ? 'text-white border-b-2 border-green-400 pb-0.5'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {slide.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-white/30" />
          <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-green-600 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-green-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Built for Your Daily Wellness</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Every product is crafted with intention — clean ingredients, optimal dosing, and results you can feel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(b => (
              <div key={b.title} className="group p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${b.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <b.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flavours Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Spirulina Shots</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">3 Flavours. 1 Daily Ritual.</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Each 60ml shot is a concentrated wellness boost — crafted to taste as good as it works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Orange',
                slug: 'spirulina-orange-shot',
                desc: 'Citrus power meets spirulina superfood for the ultimate immunity and energy boost.',
                image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                color: 'from-orange-400 to-amber-300',
                badge: 'Most Popular',
              },
              {
                name: 'Strawberry',
                slug: 'spirulina-strawberry-shot',
                desc: 'Sweet, tangy antioxidant burst with ripe strawberries and nutrient-dense spirulina.',
                image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
                color: 'from-red-400 to-rose-300',
                badge: 'Fan Favourite',
              },
              {
                name: 'Guava Mixed Fruit',
                slug: 'spirulina-guava-shot',
                desc: 'Tropical immunity powerhouse packed with guava, mixed fruits, and spirulina.',
                image: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg',
                color: 'from-green-400 to-emerald-300',
                badge: 'Highest Vitamin C',
              },
            ].map(flavour => (
              <Link
                key={flavour.name}
                to={`/product/${flavour.slug}`}
                className="group relative overflow-hidden rounded-3xl h-96 block hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={flavour.image}
                  alt={flavour.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent`} />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${flavour.color}`}>
                    {flavour.badge}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{flavour.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{flavour.desc}</p>
                  <span className="inline-flex items-center gap-1 text-green-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Shop ₹120 <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Spirulina Section */}
      <section className="py-24 bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.pexels.com/photos/3551711/pexels-photo-3551711.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">The Science</span>
              <h2 className="text-4xl font-bold text-white mt-3 mb-6">Why Spirulina?</h2>
              <p className="text-green-100 text-lg leading-relaxed mb-8">
                Spirulina is gram-for-gram one of the most nutrient-dense foods on Earth. NASA has declared it the "food of the future" — used by astronauts for complete nutrition in space.
              </p>
              <ul className="space-y-4">
                {[
                  'Contains 70% complete protein — more than meat, by weight',
                  '10x more antioxidants than green tea',
                  'Rich in iron — 26mg per 100g vs 2.7mg in spinach',
                  'Only plant source of Gamma-Linolenic Acid (GLA)',
                  'Contains all 8 essential amino acids',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-green-100">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/blog/10-benefits-spirulina"
                className="inline-flex items-center gap-2 mt-8 text-green-400 font-semibold hover:text-green-300 transition-colors"
              >
                Read the science <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg"
                alt="Organic superfood"
                className="rounded-3xl w-full h-96 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Certified Organic</div>
                    <div className="text-gray-500 text-xs">Cold-pressed & preserved</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">Zero additives, zero preservatives</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Products</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-3">Featured Products</h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-80" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Corporate Banner */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-12 h-12 text-green-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Corporate Wellness Programs</h2>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Invest in your employees' health. Our bulk wellness programs for MNCs and corporate offices reduce sick days and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/corporate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-full text-lg transition-all"
            >
              Enquire Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {['Bulk Pricing', 'Custom Packages', 'Monthly Subscriptions', 'On-site Delivery', 'Nutritionist Support'].map(item => (
              <div key={item} className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Real Results</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">What Our Customers Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map(t => (
                <div key={t.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-green-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image_url}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter / CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Leaf className="w-10 h-10 text-green-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Your Wellness Journey</h2>
          <p className="text-gray-500 text-lg mb-10">
            Join thousands of health-conscious individuals who make Tatvamasi part of their daily ritual.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-10 py-5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full text-lg transition-all hover:shadow-lg hover:shadow-green-200"
          >
            Explore All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
