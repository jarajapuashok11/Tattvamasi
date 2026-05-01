import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Droplets, Leaf, Star, ChevronRight, Building2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Testimonial } from '../types';
import ProductCard from '../components/ProductCard';
import ReviewModal from '../components/ReviewModal';

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
  const [showReviewModal, setShowReviewModal] = useState(false);

  const fetchTestimonials = () => {
    supabase.from('testimonials').select('*').order('created_at', { ascending: false }).limit(3).then(({ data }) => {
      if (data) setTestimonials(data);
    });
  };

  useEffect(() => {
    supabase.from('products').select('*').eq('featured', true).order('sort_order').then(({ data }) => {
      if (data) setFeatured(data);
    });
    fetchTestimonials();

    // Real-time subscription for testimonials
    const subscription = supabase
      .channel('testimonials-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'testimonials' }, () => {
        fetchTestimonials();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
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

      {/* Why Choose Us Section with Image and Hover Products */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mt-3 mb-4">
              Built for Your Daily Wellness
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Every product is meticulously crafted with premium organic ingredients, optimal formulation, and scientifically-proven benefits you can genuinely feel.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg"
                alt="Why Choose Us"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="space-y-6">
              {benefits.map((b, i) => (
                <div key={b.title} className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${b.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <b.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{b.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">{b.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Hover Cards */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Our Best Sellers</h3>
            <p className="text-gray-600 mt-2">Hover over any product for details or click to explore</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.length > 0 ? featured.slice(0, 4).map(product => (
              <div key={product.id} className="group relative">
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg border-4 border-green-100 hover:border-green-500 transition-all duration-300">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Circle with + icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <ChevronRight className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Description Popup */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-bold text-lg mb-2">{product.name}</h4>
                    <p className="text-green-100 text-sm leading-relaxed mb-4 line-clamp-3">{product.short_description}</p>
                    <Link
                      to={`/product/${product.slug}`}
                      className="inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-full transition-colors"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            )) : null}
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

      {/* Why Spirulina Section - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3551711/pexels-photo-3551711.jpeg"
            alt=""
            className="w-full h-full object-cover brightness-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/50 text-green-300 text-sm font-semibold uppercase tracking-widest mb-6">
                The Science of Wellness
              </span>
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Why <span className="text-green-400">Spirulina</span>?
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed mb-10">
                Spirulina stands as the most nutrient-dense superfood on Earth. NASA has designated it the "food of the future" - the same source trusted by astronauts for complete space-based nutrition.
              </p>
              <ul className="space-y-5 mb-10">
                {[
                  { stat: '70%', desc: 'Complete protein - more than meat, by weight' },
                  { stat: '10x', desc: 'More antioxidants than premium green tea' },
                  { stat: '26mg', desc: 'Iron content per 100g vs 2.7mg in spinach' },
                  { stat: '100%', desc: 'Only plant source of Gamma-Linolenic Acid (GLA)' },
                  { stat: '8', desc: 'Essential amino acids - all present' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group cursor-pointer">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500/20 border border-green-400/50 group-hover:bg-green-500/40 transition-colors">
                        <span className="text-green-300 font-bold text-sm">{item.stat}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-100 font-medium group-hover:text-green-300 transition-colors">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                to="/blog/10-benefits-spirulina"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30"
              >
                Explore Full Science <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right: 4 Product Images Popup */}
            <div className="relative z-10 grid grid-cols-2 gap-6">
              {featured.length > 0 && featured.slice(0, 4).map((product, idx) => (
                <div key={product.id} className="group relative">
                  <Link
                    to={`/product/${product.slug}`}
                    className="relative h-56 rounded-2xl overflow-hidden block shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Info on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-base mb-1">{product.name}</h3>
                      <p className="text-green-200 text-xs line-clamp-2 mb-3">{product.short_description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-300 font-bold">₹{product.price}</span>
                        <span className="inline-flex items-center gap-1 text-green-300 text-xs font-semibold">
                          View <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
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

      {/* Testimonials - Real-Time Reviews */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Real Results</span>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mt-3 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Real testimonials from real people experiencing real transformations with Tatvamasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map(t => (
                <div
                  key={t.id}
                  className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-400 overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                      ))}
                      <span className="ml-3 text-xs font-semibold text-gray-500 group-hover:text-green-600 transition-colors">
                        {t.rating}.0 / 5.0
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-gray-800 leading-relaxed mb-7 italic text-base group-hover:text-gray-900 transition-colors font-medium">
                      "{t.content}"
                    </p>

                    {/* Divider */}
                    <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6" />

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={t.image_url}
                        alt={t.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-green-200 group-hover:ring-green-400 transition-all"
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-base group-hover:text-green-700 transition-colors">
                          {t.name}
                        </div>
                        <div className="text-gray-500 text-xs font-medium">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">Join thousands of satisfied customers. Share your Tatvamasi story.</p>
              <a
                href="https://wa.me/919999999999?text=I%20would%20like%20to%20share%20my%20Tatvamasi%20experience"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors"
              >
                Share Your Review <ArrowRight className="w-4 h-4" />
              </a>
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
