import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { items, subtotal, loading, error, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-sm text-textMuted">Log in to view your cart.</p>
        <Link to="/login" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">
          Log In
        </Link>
      </div>
    );
  }

  if (loading && items.length === 0) {
    return <div className="max-w-7xl mx-auto px-6 py-16 text-sm text-textMuted">Loading your cart…</div>;
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-6 py-16 text-sm text-red-400">Couldn&apos;t load your cart: {error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-sm text-textMuted">Your cart is empty.</p>
        <Link to="/shop" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="bg-[#4D5056] rounded-3xl p-6 border border-[#5E626B] space-y-4 shadow-xl">
              <div className="flex gap-4">
                <img
                  src={item.Product?.image}
                  alt={item.Product?.name}
                  className="w-20 h-20 object-contain rounded-xl bg-[#22252D] p-2"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="text-xs font-bold text-white">{item.Product?.name}</h3>
                  <p className="text-[11px] text-gray-300">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-black text-white whitespace-nowrap">
                  R{(Number(item.priceAtAdd) * item.quantity).toLocaleString()}
                </div>
              </div>

              <div className="border-t border-[#5E626B] pt-4 flex items-center justify-end gap-3 text-xs">
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="bg-[#3B3E45] p-2 rounded-xl text-textMuted hover:text-red-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#4D5056] rounded-3xl p-8 border border-[#5E626B] space-y-6 shadow-xl">
          <h2 className="text-xl font-black text-white text-center">Cart Total</h2>
          <div className="flex justify-between items-center text-xs text-gray-200 border-t border-[#5E626B] pt-6">
            <span>Total: {items.length} item{items.length === 1 ? '' : 's'}</span>
            <span className="text-sm font-bold text-white">R{subtotal.toLocaleString()}</span>
          </div>
          <Link
            to="/checkout"
            className="w-full bg-white hover:bg-neon-blue text-midnight font-black py-3 rounded-full flex items-center justify-center text-xs transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
