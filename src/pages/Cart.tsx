import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi';
}

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [placing, setPlacing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [form, setForm] = useState<CheckoutForm>({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', paymentMethod: 'cod',
  });

  const shipping = total >= 500 ? 0 : 50;
  const grandTotal = total + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    const num = `TAT-${Date.now().toString().slice(-8)}`;
    const { error } = await supabase.from('orders').insert({
      order_number: num,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      address: { address: form.address, city: form.city, state: form.state, pincode: form.pincode },
      items: items.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
      subtotal: total,
      shipping,
      total: grandTotal,
      payment_method: form.paymentMethod,
    });
    setPlacing(false);
    if (!error) {
      setOrderNumber(num);
      clearCart();
      setStep('success');
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-4">Thank you for your order. We'll confirm shortly.</p>
          <p className="text-sm font-medium text-gray-700 bg-gray-50 rounded-xl px-4 py-3 mb-8">
            Order ID: <span className="text-green-600 font-bold">{orderNumber}</span>
          </p>
          <Link to="/shop" className="block w-full py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Discover our premium wellness products</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors">
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className={step === 'cart' ? 'text-green-600 font-medium' : ''}>Cart</span>
            {step === 'checkout' && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-green-600 font-medium">Checkout</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {step === 'cart' ? `Shopping Cart (${itemCount})` : 'Checkout'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'cart' ? (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-5 flex items-start gap-5 shadow-sm border border-gray-100">
                    <Link to={`/product/${item.product.slug}`} className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.slug}`} className="font-semibold text-gray-900 hover:text-green-700 transition-colors block mb-1 truncate">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mb-3 capitalize">{item.product.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-3 py-1.5 hover:bg-gray-50 text-gray-600"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-sm font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-3 py-1.5 hover:bg-gray-50 text-gray-600"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-gray-900">₹{(item.product.price * item.quantity).toFixed(0)}</span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  {[
                    { key: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text', required: true, colSpan: false },
                    { key: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email', required: true, colSpan: false },
                    { key: 'phone', label: 'Phone', placeholder: '+91 98765 43210', type: 'tel', required: true, colSpan: false },
                    { key: 'address', label: 'Address', placeholder: 'Street address', type: 'text', required: true, colSpan: true },
                    { key: 'city', label: 'City', placeholder: 'City', type: 'text', required: true, colSpan: false },
                    { key: 'state', label: 'State', placeholder: 'State', type: 'text', required: true, colSpan: false },
                    { key: 'pincode', label: 'Pincode', placeholder: '400001', type: 'text', required: true, colSpan: false },
                  ].map(field => (
                    <div key={field.key} className={field.colSpan ? 'sm:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={form[field.key as keyof CheckoutForm]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                <div className="flex gap-4">
                  {[
                    { value: 'cod', label: 'Cash on Delivery' },
                    { value: 'upi', label: 'UPI / Cards' },
                  ].map(opt => (
                    <label key={opt.value} className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      form.paymentMethod === opt.value ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={form.paymentMethod === opt.value}
                        onChange={() => setForm(prev => ({ ...prev, paymentMethod: opt.value as 'cod' | 'upi' }))}
                        className="accent-green-600"
                      />
                      <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {total < 500 && (
                  <p className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
                    Add ₹{500 - total} more for free shipping
                  </p>
                )}
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-lg mb-6">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={placing}
                  className="w-full py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>
              )}

              {step === 'checkout' && (
                <button
                  onClick={() => setStep('cart')}
                  className="w-full mt-3 py-3 text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  Back to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
