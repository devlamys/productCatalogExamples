import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Eye, Code, Feather, Check } from 'lucide-react';

export default function VariantAG_EtherealReveal({
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
    { name: 'Pure White', hex: '#FFFFFF', border: '#cbd5e1' },
    { name: 'Apex Blue', hex: '#0066FF', border: '#0066FF' },
    { name: 'Neon Crimson', hex: '#FF3B30', border: '#FF3B30' },
    { name: 'Emerald Cyber', hex: '#10B981', border: '#10B981' },
  ];

  return (
    <div
      className="relative group rounded-3xl bg-white text-slate-900 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-0 flex flex-col justify-between h-full transition-all duration-500 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Zero Border Pure White Negative Space Container */}

      {/* Top Header Floating Minimal Badges */}
      <div className="flex items-center justify-between z-20">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#009B7B] text-[10px] font-bold tracking-wider uppercase border border-[#009B7B]/30">
          <img src="/images/logo.png" alt="Gawdee Logo" className="h-3.5 w-auto object-contain" />
          Style 05 • Ethereal Float
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onInspectCode?.(product)}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all"
            title="Inspect Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleWishlist?.(product.id)}
            className={`p-2 rounded-full transition-all ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Pure Floating Sneaker - Sneaker is the ONLY element with a soft shadow */}
      <div className="relative my-8 py-6 flex items-center justify-center min-h-[220px] z-10">
        {/* Soft, Diffuse Pure Bloom Shadow Disc */}
        <motion.div
          animate={{
            scale: isHovered ? [0.85, 1, 0.85] : [0.9, 0.95, 0.9],
            opacity: isHovered ? 0.6 : 0.35,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-2 w-48 h-10 rounded-[100%] bg-slate-950/80 blur-2xl pointer-events-none"
        />

        {/* Free Floating Sneaker */}
        <motion.img
          src={product?.images?.primary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.55 PM.jpeg'}
          alt={product?.title || 'Aero-Stride Pro X'}
          animate={{
            y: isHovered ? [-16, 6, -16] : [-8, 8, -8],
            rotateZ: isHovered ? [-2, 2, -2] : [0, 0, 0],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 w-full max-w-[240px] h-auto object-contain cursor-pointer"
          style={{
            filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.15))',
          }}
          onClick={() => onQuickView?.(product)}
        />
      </div>

      {/* Disconnected Minimalist Edge Metadata & Controls */}
      <div className="space-y-4 z-20 pt-4 border-t border-slate-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-[#009B7B] uppercase">
              {product?.brand || 'Apex Velocity'}
            </p>
            <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
              {product?.title || 'Aero-Stride Pro X'}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-slate-900">{product?.price ? `$${product.price}` : '$189.99'}</span>
            <div className="flex items-center justify-end gap-1 mt-0.5 text-amber-500 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.8</span>
              <span className="text-slate-400 text-[10px] font-normal">(210)</span>
            </div>
          </div>
        </div>

        {/* Swatches & Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setActiveColor(idx)}
                className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                  activeColor === idx ? 'scale-110 ring-2 ring-[#009B7B] ring-offset-2' : 'opacity-70 hover:opacity-100'
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
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-xs font-semibold flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View</span>
            </button>
            <button
              onClick={() => onAddToCart?.(product)}
              className="px-5 py-2.5 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-extrabold text-xs tracking-wide transition-all shadow-xl shadow-[#009B7B]/30 flex items-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
