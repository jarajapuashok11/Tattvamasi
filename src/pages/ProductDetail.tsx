import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, ChevronRight, Star, CheckCircle, ArrowLeft, Leaf } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'usage' | 'nutrition'>('description');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!slug) return;
    supabase.from('products').select('*').eq('slug', slug).maybeSingle().then(({ data }) => {
      if (data) {
        setProduct(data);
        setActiveImage(0);
        supabase.from('products').select('*').eq('category', data.category).neq('slug', slug).limit(3).then(({ data: rel }) => {
          if (rel) setRelated(rel);
        });
      }
      setLoading(false);
    });
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/shop" className="text-green-600 hover:text-green-700">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const allImages = product.images?.length > 0 ? product.images : [product.image_url];

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-green-600 transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
            <div className="relative rounded-3xl overflow-hidden bg-gray-50 aspect-square mb-4 group">
              <img
                src={allImages[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.compare_price && (
                <span className="absolute top-4 left-4 bg-green-600 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  {Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}% OFF
                </span>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeImage ? 'border-green-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
              product.category === 'shots' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {product.category === 'shots' ? 'Health Shot' : 'Organic Powder'}
            </span>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(4.9) · 128 reviews</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.short_description}</p>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Key Benefits</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.benefits.map(b => (
                  <div key={b} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              {product.compare_price && (
                <span className="text-xl text-gray-400 line-through">₹{product.compare_price}</span>
              )}
              {product.compare_price && (
                <span className="text-green-600 font-semibold text-sm">
                  You save ₹{product.compare_price - product.price}
                </span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-semibold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-base transition-all duration-200 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:shadow-green-100'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>

            <button
              onClick={() => { addToCart(product, quantity); navigate('/cart'); }}
              className="w-full py-4 rounded-full font-semibold text-base border-2 border-green-600 text-green-600 hover:bg-green-50 transition-colors mb-8"
            >
              Buy Now
            </button>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
              {[
                { icon: Leaf, text: '100% Organic' },
                { icon: CheckCircle, text: 'No Preservatives' },
                { icon: CheckCircle, text: 'Lab Tested' },
                { icon: CheckCircle, text: 'Free Shipping ₹500+' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-gray-600">
                  <item.icon className="w-4 h-4 text-green-500" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 lg:mt-24">
          <div className="flex items-center gap-1 border-b border-gray-200 mb-8 overflow-x-auto">
            {(['description', 'ingredients', 'usage', 'nutrition'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap capitalize border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'usage' ? 'How to Use' : tab === 'nutrition' ? 'Nutrition Info' : tab}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="prose text-gray-700 leading-relaxed text-base">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div>
                <p className="text-gray-700 leading-relaxed">{product.ingredients}</p>
              </div>
            )}
            {activeTab === 'usage' && (
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <p className="text-gray-700 leading-relaxed">{product.usage_instructions}</p>
              </div>
            )}
            {activeTab === 'nutrition' && (
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-3 px-5 text-sm font-semibold text-gray-700">Nutrient</th>
                      <th className="text-right py-3 px-5 text-sm font-semibold text-gray-700">
                        Per {product.nutrition.serving as string}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(product.nutrition)
                      .filter(([key]) => key !== 'serving')
                      .map(([key, value], i) => (
                        <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-3 px-5 text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                          <td className="py-3 px-5 text-sm text-gray-900 font-medium text-right">{String(value)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
              <Link to="/shop" className="text-green-600 text-sm font-medium hover:text-green-700 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4 rotate-180" /> View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
