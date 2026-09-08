import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      <div className="relative rounded-3xl overflow-hidden bg-[#12141C] border border-[#2B2D3A] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon-purple/20 via-[#12141C] to-[#0B0E14]">
        <div className="space-y-4 max-w-md">
          <span className="text-xs text-textMuted tracking-wider">Power, Pre-Packed</span>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-snug">
            AN ECOSYSTEM ENGINEERED FOR <span className="text-neon-purple">THERMAL PERFORMANCE</span>
          </h1>
          <p className="text-xs text-textMuted">Built By Cooler Master</p>
        </div>
        <div className="flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=350&q=80" alt="Cooler Master Rig" className="w-48 h-48 object-cover rounded-2xl border border-[#2B2D3A]" />
          <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=350&q=80" alt="White Rig" className="w-48 h-48 object-cover rounded-2xl border border-[#2B2D3A] hidden sm:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/shop" className="relative group rounded-3xl overflow-hidden h-60 border border-[#2B2D3A] bg-[#181A20] p-6 flex flex-col justify-between">
          <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80" alt="Monitor Deals" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white">MONITOR<br />DEALS</h2>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-neon-blue transition">
            VIEW →
          </span>
        </Link>

        <Link to="/shop" className="relative group rounded-3xl overflow-hidden h-60 border border-[#2B2D3A] bg-[#181A20] p-6 flex flex-col justify-between">
          <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80" alt="Graphic Cards" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white">GRAPHIC<br />CARDS</h2>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-neon-blue transition">
            VIEW →
          </span>
        </Link>

        <Link to="/shop" className="relative group rounded-3xl overflow-hidden h-60 border border-[#2B2D3A] bg-[#181A20] p-6 flex flex-col justify-between">
          <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80" alt="Laptop Deals" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white">LAPTOP<br />DEALS</h2>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-neon-blue transition">
            EXPLORE →
          </span>
        </Link>

        <Link to="/shop" className="relative group rounded-3xl overflow-hidden h-60 border border-[#2B2D3A] bg-[#181A20] p-6 flex flex-col justify-between">
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
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-textMuted font-bold">BEST DEALS</span>
        </div>
        <div className="bg-[#181A20] border border-[#2B2D3A] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-white">FLASH</h3>
            <h3 className="text-xl font-black text-[#FFB800]">DEALS</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 max-w-xl">
            {/* Deal Item 1 */}
            <div className="bg-[#22252D] p-3 rounded-2xl flex items-center gap-3 border border-[#2B2D3A]">
              <img 
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&q=80" 
                alt="MSI Monitor" 
                className="w-12 h-12 rounded-lg object-cover bg-[#181A20] shrink-0" 
              />
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{'MSI PRO MP275 E2 27" 120Hz...'}</p>
                <p className="text-xs text-neon-blue font-bold">R2,399</p>
              </div>
              <button className="bg-[#2B2D3A] hover:bg-neon-blue hover:text-midnight p-2 rounded-xl text-white transition shrink-0">
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>

            {/* Deal Item 2 */}
            <div className="bg-[#22252D] p-3 rounded-2xl flex items-center gap-3 border border-[#2B2D3A]">
              <img 
                src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=150&q=80" 
                alt="Logitech Mouse" 
                className="w-12 h-12 rounded-lg object-cover bg-[#181A20] shrink-0" 
              />
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">Logitech G502 Hero RGB...</p>
                <p className="text-xs text-neon-blue font-bold">R699</p>
              </div>
              <button className="bg-[#2B2D3A] hover:bg-neon-blue hover:text-midnight p-2 rounded-xl text-white transition shrink-0">
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}