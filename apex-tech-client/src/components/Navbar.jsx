import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="w-full bg-[#0B0E14] border-b border-[#22252D] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-neon-blue flex items-center justify-center">
            <span className="text-neon-blue font-black text-xs">▲</span>
          </div>
          <span className="text-xl font-bold tracking-wider text-white">Apex Tech</span>
        </Link>

        <div className="flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#181A20] text-sm text-white placeholder-textMuted pl-10 pr-4 py-2 rounded-full border border-[#2B2D3A] focus:outline-none focus:border-neon-blue transition"
          />
          <Search className="w-4 h-4 text-textMuted absolute left-3.5 top-2.5" />
        </div>

        <div className="flex items-center gap-6 text-gray-300">
          {isAuthenticated ? (
            <button
              onClick={logout}
              title={`Log out (${user?.firstName})`}
              className="hover:text-neon-blue transition"
            >
              <User className="w-5 h-5" />
            </button>
          ) : (
            <Link to="/login" className="hover:text-neon-blue transition">
              <User className="w-5 h-5" />
            </Link>
          )}
          <Link to="/cart" className="hover:text-neon-blue transition relative">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neon-blue text-midnight text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="hover:text-neon-blue transition"><Heart className="w-5 h-5" /></button>
        </div>
      </div>

      <nav className="bg-[#12141A] border-t border-[#22252D]">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center gap-6 text-xs text-gray-300 font-medium">
          <span className="bg-[#22252D] px-3 py-1 rounded-full text-white cursor-pointer hover:bg-neon-blue hover:text-midnight transition">Menu</span>
          <Link to="/shop" className="hover:text-neon-blue transition">Components</Link>
          <Link to="/shop" className="hover:text-neon-blue transition">Laptops</Link>
          <Link to="/shop" className="hover:text-neon-blue transition">Pre-Built PCs</Link>
          <Link to="/shop" className="text-neon-blue font-semibold">Monitors</Link>
          <Link to="/shop" className="text-neon-purple hover:text-white transition">Flash Deals</Link>
        </div>
      </nav>
    </header>
  );
}