import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Eye, Code, Layers, Check } from 'lucide-react';

export default function VariantAG_FrostedDrawer({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [activeColor, setActiveColor] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    { name: 'Pure White', hex: '#FFFFFF', border: '#e2e8f0' },
    { name: 'Apex Blue', hex: '#0066FF', border: '#0066FF' },
    { name: 'Neon Crimson', hex: '#FF3B30', border: '#FF3B30' },
    { name: 'Emerald Cyber', hex: '#10B981', border: '#10B981' },
  ];

  return (
    <div
      className="relative group rounded-3xl bg-slate-950 border border-slate-800 p-6 text-white overflow-hidden shadow-2xl flex flex-col justify-between h-full transition-all duration-500 hover:border-[#009B7B]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#009B7B]/40 text-[10px] font-bold tracking-wider uppercase text-emerald-300 backdrop-blur-md">
          <img src="/images/logo.png" alt="Gawdee Logo" className="h-3 w-auto object-contain" />
          Style 06 • Frosted Drawer
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onInspectCode?.(product)}
            className="p-2 rounded-full bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-white transition-all backdrop-blur-md"
            title="Inspect Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleWishlist?.(product.id)}
            className={`p-2 rounded-full transition-all backdrop-blur-md ${
              isWishlisted
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Prominent Large Floating Shoe Stage */}
      <div className="relative my-4 py-4 flex items-center justify-center min-h-[220px]">
        {/* Soft shadow underneath */}
        <div className="absolute bottom-6 w-48 h-8 rounded-full bg-black/90 blur-xl pointer-events-none" />

        <motion.img
          src={product?.images?.primary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.55 PM.jpeg'}
          alt={product?.title || 'Aero-Stride Pro X'}
          animate={{
            y: isHovered ? [-14, 4, -14] : [-6, 6, -6],
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-full max-w-[250px] h-auto object-contain filter drop-shadow-2xl cursor-pointer"
          onClick={() => onQuickView?.(product)}
        />
      </div>

      {/* Detached Floating Frosted Glass Control Panel (Floats over bottom edge of shoe) */}
      <motion.div
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative z-20 space-y-3 bg-white/10 dark:bg-slate-900/80 p-4 rounded-2xl border border-white/20 dark:border-slate-700/60 backdrop-blur-xl shadow-[0_-10px_25px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-[#009B7B] uppercase">
              {product?.brand || 'Apex Velocity'}
            </p>
            <h3 className="text-lg font-extrabold text-white tracking-tight mt-0.5">
              {product?.title || 'Aero-Stride Pro X'}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-white">{product?.price ? `$${product.price}` : '$189.99'}</span>
            <div className="flex items-center justify-end gap-1 mt-0.5 text-amber-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.8</span>
              <span className="text-slate-400 text-[10px] font-normal">(210)</span>
            </div>
          </div>
        </div>

        {/* Detached Swatch Bullets & Action Buttons inside Frosted Capsule */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            {colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setActiveColor(idx)}
                className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                  activeColor === idx ? 'scale-110 ring-2 ring-[#009B7B] ring-offset-2 ring-offset-slate-950' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex, border: `1px solid ${c.border}` }}
              >
                {activeColor === idx && <Check className={`w-3 h-3 ${c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickView?.(product)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-all text-xs font-semibold flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View</span>
            </button>
            <button
              onClick={() => onAddToCart?.(product)}
              className="px-4 py-2 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-[#009B7B]/30 flex items-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
