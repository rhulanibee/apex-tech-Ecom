import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function WishlistPage() {
  const { items, loading, error, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-sm text-textMuted">Log in to view your wishlist.</p>
        <Link to="/login" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">Log In</Link>
      </div>
    );
  }

  if (loading && items.length === 0) {
    return <div className="max-w-7xl mx-auto px-6 py-16 text-sm text-textMuted">Loading your wishlist…</div>;
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-6 py-16 text-sm text-red-400">Couldn&apos;t load your wishlist: {error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-sm text-textMuted">Your wishlist is empty.</p>
        <Link to="/shop" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-xl font-black text-white mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-[#4D5056] rounded-3xl p-5 border border-[#5E626B] flex gap-4">
            <img
              src={item.Product?.image}
              alt={item.Product?.name}
              className="w-20 h-20 object-contain rounded-xl bg-[#22252D] p-2"
            />
            <div className="flex-1 space-y-2">
              <Link to={`/products/${item.productId}`} className="text-xs font-bold text-white hover:text-neon-blue transition block">
                {item.Product?.name}
              </Link>
              <div className="text-sm font-black text-white">
                R{Number(item.Product?.price || 0).toLocaleString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item.Product, 1)}
                  className="p-2 rounded-xl bg-[#2B2D3A] text-white hover:bg-neon-blue hover:text-midnight transition"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(item.Product)}
                  className="p-2 rounded-xl bg-[#2B2D3A] text-textMuted hover:text-red-400 transition"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
