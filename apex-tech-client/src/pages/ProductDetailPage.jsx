import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { getProductById } from '../api/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((res) => {
        if (!cancelled) setProduct(res.data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToCart = async () => {
    const result = await addToCart(product, quantity);
    setToast(result.ok ? 'Added to cart' : result.message);
    setTimeout(() => setToast(null), 2500);
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-6 py-16 text-sm text-textMuted">Loading product…</div>;
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-sm text-red-400">
        Couldn&apos;t load this product{error ? `: ${error}` : ''}.{' '}
        <Link to="/shop" className="underline text-white">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      <div className="text-xs text-textMuted flex items-center gap-1.5">
        <span>Home</span> <span>&gt;</span>
        <Link to="/shop" className="hover:text-white">Shop</Link> <span>&gt;</span>
        <span className="text-white">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 flex gap-4">
          <div className="flex-1 bg-[#12141A] border border-[#2B2D3A] rounded-3xl p-6 relative flex items-center justify-center min-h-[340px]">
            {product.badgeText && (
              <div className="absolute top-4 left-4 bg-[#3B1547] text-[#D870FF] px-2.5 py-2 rounded-xl font-mono text-xs">
                {product.badgeText}
              </div>
            )}
            <img src={product.image} alt={product.name} className="h-64 object-contain" />
          </div>
        </div>

        <div className="bg-[#4D5056] border border-[#5E626B] rounded-3xl p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">R{Number(product.price).toLocaleString()}</h2>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] text-gray-300">Change Quantity</label>
            <div className="flex items-center justify-between bg-[#2B2D3A] rounded-xl px-3 py-2 text-xs">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white hover:text-neon-blue font-bold px-2">-</button>
              <span className="font-bold text-white">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-white hover:text-neon-blue font-bold px-2">+</button>
            </div>
          </div>

          <div
            className={`py-2 rounded-xl text-center text-xs font-bold border ${
              product.stock > 0
                ? 'bg-[#00FF66]/20 text-[#00FF66] border-[#00FF66]/30'
                : 'bg-red-500/10 text-red-400 border-red-500/30'
            }`}
          >
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </div>

          {toast && <p className="text-[11px] font-bold text-neon-green">{toast}</p>}

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-[#3B3E45] hover:bg-neon-blue hover:text-midnight text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-xs transition disabled:opacity-40"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="px-4 rounded-2xl bg-[#2B2D3A] hover:bg-neon-purple/20 transition"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-neon-purple text-neon-purple' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-[#22252D]">
        <h1 className="text-sm md:text-base font-bold text-white max-w-4xl">{product.name}</h1>
        {product.description && (
          <p className="text-xs text-textMuted leading-relaxed max-w-3xl">{product.description}</p>
        )}
        <span className="inline-block bg-[#22252D] px-4 py-1.5 rounded-full text-textMuted text-xs capitalize">
          {product.category}
        </span>
      </div>

      {/* Specification matrix - only renders when the product has specs
          (seed data includes them for some products; older rows without
          specs just skip this section rather than show an empty table). */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <div className="pt-6 border-t border-[#22252D] space-y-4">
          <h2 className="text-sm font-bold text-white">Specifications</h2>
          <div className="bg-[#181A20] border border-[#2B2D3A] rounded-2xl overflow-hidden">
            <table className="w-full text-xs">
              <tbody>
                {Object.entries(product.specs).map(([key, value], i) => (
                  <tr key={key} className={i % 2 === 0 ? 'bg-[#181A20]' : 'bg-[#1D1F27]'}>
                    <td className="px-5 py-3 font-semibold text-gray-300 w-1/3">{key}</td>
                    <td className="px-5 py-3 text-white">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
