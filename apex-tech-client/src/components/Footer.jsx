import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { FacebookIcon, InstagramIcon, XIcon } from './SocialIcons';

// Only routes that actually resolve to something in the app are listed here.
// The previous version had ~20 footer links pointing at "#" (Careers, Why
// Buy From Us, AI Laptop Finder, PC Builder, Brands, etc.) with no matching
// page - every one of those was a dead end during a live demo. Trimmed down
// to what's real, and "About Us" now routes to an actual page.
export default function Footer() {
  return (
    <footer className="w-full bg-[#0B0E14] text-xs text-textMuted mt-20">
      <div className="bg-[#181A20] border-y border-[#22252D] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <Award className="w-7 h-7 text-neon-blue shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">High Quality</h4>
              <p className="text-[11px] text-textMuted">authentic hardware</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <ShieldCheck className="w-7 h-7 text-neon-blue shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Warranty Protection</h4>
              <p className="text-[11px] text-textMuted">manufacturer warranty</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <Truck className="w-7 h-7 text-neon-blue shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Free Shipping</h4>
              <p className="text-[11px] text-textMuted">fast courier delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <Headphones className="w-7 h-7 text-neon-blue shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">24 / 7 Support</h4>
              <p className="text-[11px] text-textMuted">tech support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-neon-blue flex items-center justify-center">
              <span className="text-neon-blue font-black text-[10px]">▲</span>
            </div>
            <span className="text-lg font-bold tracking-wider text-white">APEX TECH</span>
          </div>
          <p className="text-[11px] text-textMuted mt-1">Peak Tech Performance</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-xs font-bold text-neon-blue uppercase tracking-widest mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop?category=pcs" className="hover:text-white transition">• Pre-Built PCs</Link></li>
              <li><Link to="/shop?category=laptops" className="hover:text-white transition">• Laptops</Link></li>
              <li><Link to="/shop?category=gpu" className="hover:text-white transition">• Graphic Cards</Link></li>
              <li><Link to="/shop?category=monitors" className="hover:text-white transition">• Monitors</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-white transition">• Accessories</Link></li>
              <li><Link to="/flash-deals" className="hover:text-white transition">• Flash Deals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-neon-purple uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faqs" className="hover:text-white transition">• FAQs</Link></li>
              <li><Link to="/orders" className="hover:text-white transition">• My Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition">• Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-neon-blue uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition">• About Us</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">• All Products</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#22252D] pt-6 flex flex-wrap justify-center gap-6 text-gray-400 text-xs font-semibold">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-1.5 hover:text-neon-blue transition"
          >
            <InstagramIcon /> Instagram
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="flex items-center gap-1.5 hover:text-neon-blue transition"
          >
            <XIcon /> Twitter / X
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex items-center gap-1.5 hover:text-neon-blue transition"
          >
            <FacebookIcon /> Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
