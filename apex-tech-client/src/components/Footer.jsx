import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { FacebookIcon, InstagramIcon, XIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B0E14] text-xs text-textMuted mt-20">
      <div className="bg-[#181A20] border-y border-[#22252D] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
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

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-neon-blue flex items-center justify-center">
              <span className="text-neon-blue font-black text-[10px]">▲</span>
            </div>
            <span className="text-lg font-bold tracking-wider text-white">APEX TECH</span>
          </div>
          <p className="text-[11px] text-textMuted mt-1">Peak Tech Performance</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-xs font-bold text-neon-blue uppercase tracking-widest mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">• Pulse</a></li>
              <li><a href="#" className="hover:text-white transition">• PC&apos;s</a></li>
              <li><a href="#" className="hover:text-white transition">• Laptops</a></li>
              <li><a href="#" className="hover:text-white transition">• Graphic Cards</a></li>
              <li><a href="#" className="hover:text-white transition">• Monitors</a></li>
              <li><a href="#" className="hover:text-white transition">• Chairs</a></li>
              <li><a href="#" className="hover:text-white transition">• Upgrade Kits</a></li>
              <li><a href="#" className="hover:text-white transition">• Gaming Accessories</a></li>
              <li><a href="#" className="hover:text-white transition">• Components</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-neon-purple uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">• Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">• Credit Card Security</a></li>
              <li><a href="#" className="hover:text-white transition">• Contact Us</a></li>
              <li><Link to="/orders" className="hover:text-white transition">• My Orders</Link></li>
              <li><Link to="/faqs" className="hover:text-white transition">• FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-neon-blue uppercase tracking-widest mb-4">Info</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">• About Us</a></li>
              <li><a href="#" className="hover:text-white transition">• Why Buy From Us</a></li>
              <li><a href="#" className="hover:text-white transition">• Shipping</a></li>
              <li><a href="#" className="hover:text-white transition">• Payment Option</a></li>
              <li><a href="#" className="hover:text-white transition">• Ordering Info</a></li>
              <li><a href="#" className="hover:text-white transition">• Career (Jobs)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-neon-purple uppercase tracking-widest mb-4">Build</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">• PC Builder</a></li>
              <li><a href="#" className="hover:text-white transition">• AI Laptop Finder</a></li>
              <li><a href="#" className="hover:text-white transition">• Specials</a></li>
              <li><a href="#" className="hover:text-white transition">• Laptop Deals</a></li>
              <li><a href="#" className="hover:text-white transition">• Brands</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#22252D] pt-6 flex justify-center gap-6 text-gray-400 text-xs font-semibold">
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