import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

type Category = 'all' | 'shots' | 'powders';
type SortBy = 'default' | 'price-asc' | 'price-desc';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>((searchParams.get('category') as Category) || 'all');
  const [sortBy, setSortBy] = useState<SortBy>('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    supabase.from('products').select('*').order('sort_order').then(({ data }) => {
      if (data) setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category') as Category;
    if (cat) setCategory(cat);
  }, [searchParams]);

  const handleCategory = (cat: Category) => {
    setCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = products
    .filter(p => {
      const matchCat = category === 'all' || p.category === category;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.short_description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.sort_order - b.sort_order;
    });

  const categoryLabels: Record<Category, string> = {
    all: 'All Products',
    shots: 'Spirulina Shots',
    powders: 'Organic Powders',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Collection</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Shop Wellness</h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Premium organic spirulina shots and superfood powders for your daily health ritual.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Tabs + Search + Filter */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-gray-200 shadow-sm">
            {(['all', 'shots', 'powders'] as Category[]).map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                showFilters ? 'bg-green-50 border-green-300 text-green-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Sort
            </button>
          </div>
        </div>

        {/* Sort Dropdown */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm max-w-xs">
            <p className="text-sm font-semibold text-gray-700 mb-3">Sort By</p>
            <div className="space-y-2">
              {[
                { value: 'default', label: 'Featured' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
              ].map(opt => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={opt.value}
                    checked={sortBy === opt.value}
                    onChange={() => setSortBy(opt.value as SortBy)}
                    className="accent-green-600"
                  />
                  <span className="text-sm text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {category !== 'all' ? ` in ${categoryLabels[category]}` : ''}
          {search ? ` for "${search}"` : ''}
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-80 border border-gray-100" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            {/* Section: Shots */}
            {(category === 'all' || category === 'shots') && filtered.filter(p => p.category === 'shots').length > 0 && (
              <div className="mb-12">
                {category === 'all' && (
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Spirulina Health Shots</h2>
                    <span className="px-3 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                      {filtered.filter(p => p.category === 'shots').length} products
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.filter(p => p.category === 'shots').map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Section: Powders */}
            {(category === 'all' || category === 'powders') && filtered.filter(p => p.category === 'powders').length > 0 && (
              <div>
                {category === 'all' && (
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Organic Superfood Powders</h2>
                    <span className="px-3 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                      {filtered.filter(p => p.category === 'powders').length} products
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.filter(p => p.category === 'powders').map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); setSearchParams({}); }}
              className="px-6 py-3 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
