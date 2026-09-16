import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../api/orders';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    getMyOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-sm text-textMuted">Log in to view your orders.</p>
        <Link to="/login" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">Log In</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto px-6 py-16 text-sm text-textMuted">Loading your orders…</div>;
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-6 py-16 text-sm text-red-400">Couldn&apos;t load your orders: {error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-sm text-textMuted">You haven&apos;t placed any orders yet.</p>
        <Link to="/shop" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-xl font-black text-white">My Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="bg-[#4D5056] rounded-3xl p-6 border border-[#5E626B] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-white">Order #{order.id}</span>
            <span className="capitalize px-3 py-1 rounded-full bg-[#22252D] text-neon-blue font-semibold">
              {order.status}
            </span>
          </div>
          <div className="text-[11px] text-gray-300">
            Placed {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <div className="space-y-1 text-xs text-gray-200 border-t border-[#5E626B] pt-3">
            {order.OrderItems?.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.productName} × {item.quantity}</span>
                <span>R{Number(item.priceAtPurchase * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-black text-white text-sm border-t border-[#5E626B] pt-3">
            <span>Total</span>
            <span>R{Number(order.total).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
