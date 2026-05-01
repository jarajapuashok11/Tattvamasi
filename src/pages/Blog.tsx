import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setPosts(data);
      setLoading(false);
    });
  }, []);

  const categories = ['spirulina', 'detox', 'immunity', 'nutrition', 'fitness', 'corporate'];
  const filtered = selectedCategory ? posts.filter(p => p.category === selectedCategory) : posts;

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-50 to-white border-b border-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Wellness Insights</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">Health & Nutrition Blog</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Science-backed insights on spirulina, immunity, detox, and living your healthiest life.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-gray-200">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === ''
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Articles
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-96" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            {/* Featured Post */}
            {filtered[0] && (
              <div className="mb-16 overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="aspect-video lg:aspect-auto overflow-hidden">
                    <img src={filtered[0].image_url} alt={filtered[0].title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
                        Featured
                      </span>
                      <span className="text-sm text-gray-500 capitalize">{filtered[0].category}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {filtered[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{filtered[0].excerpt}</p>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(filtered[0].created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {filtered[0].read_time} min read
                      </div>
                    </div>
                    <Link
                      to={`/blog/${filtered[0].slug}`}
                      className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors w-fit"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Other Posts */}
            {filtered.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.slice(1).map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-2xl border border-gray-200 hover:border-green-200 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold text-green-600 uppercase tracking-wider capitalize">{post.category}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{post.read_time} min</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">Check back soon for more wellness insights</p>
          </div>
        )}
      </div>
    </div>
  );
}
