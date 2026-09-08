import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MoreVertical } from 'lucide-react';
import { getProducts } from '../api/products';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['all', 'monitors', 'laptops', 'gpu', 'pcs', 'accessories'];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getProducts(category === 'all' ? {} : { category })
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
  }, [category]);

  const handleAddToCart = async (product) => {
    setAddingId(product.id);
    const result = await addToCart(product);
    setAddingId(null);
    setToast(result.ok ? 'Added to cart' : result.message);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-xs text-textMuted flex items-center gap-1.5 mb-6">
        <span>Home</span> <span>&gt;</span>
        <span className="text-white">Shop</span>
      </div>

      <div className="bg-[#181A20] p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-[#2B2D3A] mb-8 text-xs text-gray-300">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3.5 py-1.5 rounded-xl font-bold capitalize transition ${
                category === c ? 'bg-neon-blue text-midnight' : 'bg-[#22252D] text-white hover:border-neon-blue border border-transparent'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="text-textMuted">
          {loading ? 'Loading…' : `${products.length} result${products.length === 1 ? '' : 's'}`}
        </span>
      </div>

      {toast && (
        <div className="mb-6 text-xs font-bold text-neon-green bg-[#0F2A1C] border border-neon-green/30 rounded-xl px-4 py-2 inline-block">
          {toast}
        </div>
      )}

      {error && (
        <div className="text-sm text-red-400 bg-[#2A1414] border border-red-500/30 rounded-xl p-4 mb-8">
          Couldn&apos;t load products: {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#4D5056] rounded-3xl p-6 border border-[#5E626B] h-72 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 && !error ? (
        <p className="text-sm text-textMuted">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-[#4D5056] rounded-3xl p-6 border border-[#5E626B] flex flex-col justify-between hover:border-neon-blue/60 transition shadow-xl">
              <div className="relative rounded-2xl bg-[#22252D] h-52 mb-6 flex items-center justify-center overflow-hidden">
                {product.badgeText && (
                  <div className="absolute top-3 left-3 px-2 py-1.5 rounded-lg text-[10px] font-mono bg-[#183944] text-[#00E5FF]">
                    {product.badgeText}
                  </div>
                )}
                <img src={product.image} alt={product.name} className="h-40 object-contain" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Link to={`/products/${product.id}`} className="text-sm font-bold text-white hover:text-neon-blue transition">
                    {product.name}
                  </Link>
                  <MoreVertical className="w-4 h-4 text-gray-300 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm font-black text-white">R {Number(product.price).toLocaleString()}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-neon-green flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-green"></span>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingId === product.id || product.stock === 0}
                      className="p-2 rounded-xl bg-[#2B2D3A] text-white hover:bg-neon-blue hover:text-midnight transition disabled:opacity-40"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
