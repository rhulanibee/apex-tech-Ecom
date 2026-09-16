import { useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

// Category pill links. `param` maps to the query string ShopPage reads, and
// must match the backend's Product.category enum values exactly - this is
// what was broken before ("Laptops" went to a plain /shop with no filter,
// so the category dropdown never actually queried anything meaningful).
const NAV_CATEGORIES = [
  { label: 'Menu', param: null },
  { label: 'Components', param: 'accessories' },
  { label: 'Laptops', param: 'laptops' },
  { label: 'Pre-Built PCs', param: 'pcs' },
  { label: 'Monitors', param: 'monitors' },
  { label: 'Flash Deals', flash: true },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const activeCategory = searchParams.get('category');
  const onShopPage = location.pathname === '/shop';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (searchTerm.trim()) {
      params.set('q', searchTerm.trim());
    } else {
      params.delete('q');
    }
    navigate(`/shop?${params.toString()}`);
  };

  const isCategoryActive = (cat) => {
    if (cat.flash) return location.pathname === '/flash-deals';
    if (!onShopPage) return false;
    if (cat.param === null) return !activeCategory;
    return activeCategory === cat.param;
  };

  const categoryHref = (cat) => {
    if (cat.flash) return '/flash-deals';
    if (cat.param === null) return '/shop';
    return `/shop?category=${cat.param}`;
  };

  return (
    <header className="w-full bg-[#0B0E14] border-b border-[#22252D] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-neon-blue flex items-center justify-center">
            <span className="text-neon-blue font-black text-xs">▲</span>
          </div>
          <span className="text-xl font-bold tracking-wider text-white">Apex Tech</span>
        </Link>

        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[160px] order-3 sm:order-2 max-w-xl relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[#181A20] text-sm text-white placeholder-textMuted pl-10 pr-4 py-2 rounded-full border border-[#2B2D3A] focus:outline-none focus:border-neon-blue transition"
          />
          <button type="submit" aria-label="Search" className="absolute left-3.5 top-2.5">
            <Search className="w-4 h-4 text-textMuted" />
          </button>
        </form>

        <div className="flex items-center gap-6 text-gray-300 order-2 sm:order-3">
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
          <Link to="/wishlist" className="hover:text-neon-blue transition relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neon-purple text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="bg-[#12141A] border-t border-[#22252D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-6 text-xs text-gray-300 font-medium flex-wrap">
          <div className="flex items-center gap-4">
            <Link to="/shop" className="hover:text-neon-blue transition font-bold uppercase tracking-wide">Shop</Link>
            <Link to="/faqs" className="hover:text-neon-blue transition font-bold uppercase tracking-wide">Support</Link>
            <Link to="/orders" className="hover:text-neon-blue transition font-bold uppercase tracking-wide">My Orders</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3 text-xs text-gray-300 font-medium border-t border-[#1B1E26] flex-wrap">
          {/* Every category link gets the SAME pill treatment when active -
             previously only "Menu" got a background, everything else just
             changed text color, which read as inconsistent. */}
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              to={categoryHref(cat)}
              className={`px-3 py-1 rounded-full transition font-semibold ${
                isCategoryActive(cat)
                  ? 'bg-neon-blue text-midnight'
                  : 'bg-[#22252D] text-gray-300 hover:bg-[#2B2D3A] hover:text-white'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
