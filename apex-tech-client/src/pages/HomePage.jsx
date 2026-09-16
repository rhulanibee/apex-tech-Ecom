import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { getProducts } from '../api/products';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const [deals, setDeals] = useState([]);
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getProducts({ isFlashDeal: true })
      .then((res) => setDeals(res.data.slice(0, 4)))
      .catch(() => setDeals([]));
  }, []);

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingId(product.id);
    const result = await addToCart(product);
    setAddingId(null);
    setToast(result.ok ? 'Added to cart' : result.message);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <div className="relative rounded-3xl overflow-hidden bg-[#12141C] border border-[#2B2D3A] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon-purple/20 via-[#12141C] to-[#0B0E14]">
        <div className="space-y-4 max-w-md">
          <span className="text-xs text-textMuted tracking-wider">Power, Pre-Packed</span>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-snug">
            AN ECOSYSTEM ENGINEERED FOR <span className="text-neon-purple">THERMAL PERFORMANCE</span>
          </h1>
          <p className="text-xs text-textMuted">Built By Cooler Master</p>
        </div>
        <div className="flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=350&q=80" alt="Cooler Master Rig" className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-2xl border border-[#2B2D3A]" />
          <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=350&q=80" alt="White Rig" className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-2xl border border-[#2B2D3A] hidden sm:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/shop?category=monitors" className="relative group rounded-3xl overflow-hidden h-52 sm:h-60 border border-[#2B2D3A] bg-[#181A20] p-6 flex flex-col justify-between">
          <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80" alt="Monitor Deals" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white">MONITOR<br />DEALS</h2>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-neon-blue transition">
            VIEW →
          </span>
        </Link>

        <Link to="/shop?category=gpu" className="relative group rounded-3xl overflow-hidden h-52 sm:h-60 border border-[#2B2D3A] bg-[#181A20] p-6 flex flex-col justify-between">
          <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80" alt="Graphic Cards" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white">GRAPHIC<br />CARDS</h2>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-neon-blue transition">
            VIEW →
          </span>
        </Link>

        <Link to="/shop?category=laptops" className="relative group rounded-3xl overflow-hidden h-52 sm:h-60 border border-[#2B2D3A] bg-[#181A20] p-6 flex flex-col justify-between">
          <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80" alt="Laptop Deals" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white">LAPTOP<br />DEALS</h2>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-neon-blue transition">
            EXPLORE →
          </span>
        </Link>

        <Link to="/shop?category=pcs" className="relative group rounded-3xl overflow-hidden h-52 sm:h-60 border border-[#2B2D3A] bg-[#181A20] p-6 flex flex-col justify-between">
          <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80" alt="Pre-Built PCs" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white">PRE-BUILT<br />PCS</h2>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-neon-blue transition">
            BROWSE →
          </span>
        </Link>
      </div>

      <div className="pt-4 space-y-6">
        {toast && (
          <div className="text-xs font-bold text-neon-green bg-[#0F2A1C] border border-neon-green/30 rounded-xl px-4 py-2 inline-block">
            {toast}
          </div>
        )}
        <div className="bg-[#181A20] border border-[#2B2D3A] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* "FLASH DEALS" now routes to a dedicated page, and the items
              below are real flash-deal products from the backend instead
              of two hardcoded, non-clickable cards. */}
          <Link to="/flash-deals" className="shrink-0 hover:opacity-80 transition">
            <h3 className="text-xl font-black text-white">FLASH</h3>
            <h3 className="text-xl font-black text-[#FFB800]">DEALS →</h3>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full max-w-xl">
            {deals.length === 0 ? (
              <p className="text-xs text-textMuted sm:col-span-2">No active flash deals right now.</p>
            ) : (
              deals.slice(0, 2).map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="bg-[#22252D] p-3 rounded-2xl flex items-center gap-3 border border-[#2B2D3A] hover:border-neon-blue/60 transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-contain bg-[#181A20] shrink-0 p-1"
                  />
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{product.name}</p>
                    <p className="text-xs text-neon-blue font-bold">R{Number(product.price).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={addingId === product.id}
                    className="bg-[#2B2D3A] hover:bg-neon-blue hover:text-midnight p-2 rounded-xl text-white transition shrink-0 disabled:opacity-40"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}