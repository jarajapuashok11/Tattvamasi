import { Link } from 'react-router-dom';
import { Leaf, Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg leading-none block">Tatvamasi</span>
                <span className="text-xs text-green-400 tracking-widest uppercase leading-none block">Organics</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Premium organic wellness for modern living. Spirulina health shots and plant-based superfood powders crafted with nature's finest ingredients.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/shop', label: 'Shop All Products' },
                { to: '/shop?category=shots', label: 'Spirulina Shots' },
                { to: '/shop?category=powders', label: 'Organic Powders' },
                { to: '/about', label: 'About Us' },
                { to: '/corporate', label: 'Corporate Wellness' },
                { to: '/blog', label: 'Health Blog' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-green-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Help & Info</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/contact', label: 'Contact Us' },
                { to: '/contact#faq', label: 'FAQ' },
                { to: '/contact#returns', label: 'Returns & Refunds' },
                { to: '/contact#shipping', label: 'Shipping Policy' },
                { to: '/contact#privacy', label: 'Privacy Policy' },
                { to: '/contact#terms', label: 'Terms of Service' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-green-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>hello@tatvamasiorganics.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Tatvamasi Organics. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with care for your wellness journey
          </p>
        </div>
      </div>
    </footer>
  );
}
