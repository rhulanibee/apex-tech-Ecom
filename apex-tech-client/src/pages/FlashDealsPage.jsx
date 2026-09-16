import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { getProducts } from '../api/products';
import { useCart } from '../context/CartContext';

// Computes the "-20%" style badge from price vs compareAtPrice.
const discountPercent = (product) => {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return null;
  const pct = ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100;
  return Math.round(pct);
};

export default function FlashDealsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getProducts({ isFlashDeal: true })
      .then((res) => {
        if (!cancelled) setProducts(res.data);
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
  }, []);

  const handleAddToCart = async (e, product) => {
    e.preventDefault(); // don't navigate when clicking the cart icon inside a clickable card
    e.stopPropagation();
    setAddingId(product.id);
    const result = await addToCart(product);
    setAddingId(null);
    setToast(result.ok ? 'Added to cart' : result.message);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-2xl md:text-3xl font-black text-[#FFB800]">FLASH DEALS</h1>
        <p className="text-xs text-textMuted">Limited-time discounts across the catalog. Grab them before stock runs out.</p>
      </div>

      {toast && (
        <div className="mb-6 text-xs font-bold text-neon-green bg-[#0F2A1C] border border-neon-green/30 rounded-xl px-4 py-2 inline-block">
          {toast}
        </div>
      )}

      {error && (
        <div className="text-sm text-red-400 bg-[#2A1414] border border-red-500/30 rounded-xl p-4 mb-8">
          Couldn&apos;t load deals: {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#4D5056] rounded-3xl p-6 border border-[#5E626B] h-72 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-sm text-textMuted text-center">No active flash deals right now - check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const pct = discountPercent(product);
            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-[#4D5056] rounded-3xl p-5 border border-[#5E626B] flex flex-col justify-between hover:border-neon-blue/60 transition shadow-xl"
              >
                <div className="relative rounded-2xl bg-[#22252D] h-40 mb-4 flex items-center justify-center overflow-hidden">
                  {pct && (
                    <div className="absolute top-2 left-2 bg-[#FFB800] text-midnight text-xs font-black px-2 py-1 rounded-lg">
                      -{pct}%
                    </div>
                  )}
                  <img src={product.image} alt={product.name} className="h-28 object-contain" />
                </div>
                <h3 className="text-xs font-bold text-white line-clamp-2 min-h-[2.2rem]">{product.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <div className="text-sm font-black text-white">R{Number(product.price).toLocaleString()}</div>
                    {product.compareAtPrice && (
                      <div className="text-[11px] text-textMuted line-through">
                        R{Number(product.compareAtPrice).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={addingId === product.id}
                    className="p-2 rounded-xl bg-[#2B2D3A] text-white hover:bg-neon-blue hover:text-midnight transition disabled:opacity-40"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
