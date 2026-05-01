import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-100 flex flex-col">
      <Link to={`/product/${product.slug}`} className="block overflow-hidden aspect-[4/3] bg-gray-50 relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.compare_price && (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}% OFF
          </span>
        )}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
          product.category === 'shots'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-amber-100 text-amber-700'
        }`}>
          {product.category === 'shots' ? 'Health Shot' : 'Powder'}
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-1.5 hover:text-green-700 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.short_description}
        </p>

        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(s => (
            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.9)</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
            {product.compare_price && (
              <span className="text-sm text-gray-400 line-through">₹{product.compare_price}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
