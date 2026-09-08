import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../api/orders';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const TAX_RATE = 0.15;
const SHIPPING_FEE = 0;

export default function CheckoutPage() {
  const { items, subtotal, refreshCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const navigate = useNavigate();

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_FEE;

  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-sm text-textMuted">Log in to check out.</p>
        <Link to="/login" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">Log In</Link>
      </div>
    );
  }

  if (items.length === 0 && !placedOrderId) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-sm text-textMuted">Your cart is empty.</p>
        <Link to="/shop" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">Continue Shopping</Link>
      </div>
    );
  }

  if (placedOrderId) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <h1 className="text-xl font-black text-white">Order placed! 🎉</h1>
        <p className="text-sm text-textMuted">Order #{placedOrderId} has been created.</p>
        <Link to="/shop" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">Continue Shopping</Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError(null);
    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.Product?.name || 'Product',
          quantity: item.quantity,
          priceAtPurchase: item.priceAtAdd,
        })),
        subtotal,
        tax,
        shippingFee: SHIPPING_FEE,
        total,
      };
      const res = await createOrder(payload);
      setPlacedOrderId(res.data.id);
      await refreshCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div className="relative rounded-3xl overflow-hidden bg-[#181A20] h-36 border border-[#2B2D3A] flex flex-col items-center justify-center">
        <h1 className="relative z-10 text-2xl font-black text-white">Checkout</h1>
        <p className="relative z-10 text-xs text-textMuted mt-1">home &gt; checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-[#4D5056] rounded-3xl p-8 border border-[#5E626B] space-y-4 shadow-xl text-xs">
          <h2 className="text-base font-bold text-white mb-2">Billing details</h2>
          <p className="text-[11px] text-gray-300">
            (Shipping address form coming soon — this demo submits the order using your account details.)
          </p>
        </div>

        <div className="bg-[#4D5056] rounded-3xl p-8 border border-[#5E626B] space-y-6 shadow-xl text-xs">
          <div className="flex justify-between font-bold text-white pb-3 border-b border-[#5E626B]">
            <span>Product</span>
            <span>Subtotal</span>
          </div>

          <div className="space-y-2 text-gray-200">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="truncate max-w-[160px]">{item.Product?.name} × {item.quantity}</span>
                <span className="font-semibold text-white">R{(item.priceAtAdd * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#5E626B] pt-3 space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>R{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tax (15%)</span>
              <span>R{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-black text-white text-sm">
              <span>Total</span>
              <span>R{total.toFixed(2)}</span>
            </div>
          </div>

          {error && <p className="text-red-400 text-[11px]">{error}</p>}

          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="w-full bg-[#3B3E45] hover:bg-neon-blue hover:text-midnight border border-[#5E626B] text-white font-bold py-3 rounded-2xl transition disabled:opacity-50"
          >
            {placing ? 'Placing order…' : 'Place order'}
          </button>
        </div>
      </div>
    </div>
  );
}
