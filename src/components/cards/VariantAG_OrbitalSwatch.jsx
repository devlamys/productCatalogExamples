import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Eye, Code, Orbit, Check } from 'lucide-react';

export default function VariantAG_OrbitalSwatch({
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
    { name: 'Pure White', hex: '#FFFFFF', border: '#e2e8f0', pos: { left: '10%', top: '20%', zIndex: 30, scale: 1.1 } },
    { name: 'Apex Blue', hex: '#0066FF', border: '#0066FF', pos: { right: '12%', top: '15%', zIndex: 10, scale: 0.9 } },
    { name: 'Neon Crimson', hex: '#FF3B30', border: '#FF3B30', pos: { left: '14%', bottom: '25%', zIndex: 35, scale: 1.05 } },
    { name: 'Emerald Cyber', hex: '#10B981', border: '#10B981', pos: { right: '10%', bottom: '30%', zIndex: 15, scale: 0.95 } },
  ];

  return (
    <div
      className="relative group rounded-3xl bg-[#0b0f19] border border-slate-800/80 p-6 text-white overflow-hidden shadow-2xl flex flex-col justify-between h-full transition-all duration-500 hover:border-[#009B7B]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Orbit Ring Effects */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="w-72 h-72 rounded-full border border-[#009B7B]/20 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="w-80 h-44 rounded-full border border-emerald-500/15 border-dashed transform rotate-12"
        />
      </div>

      {/* Header Badge & Tools */}
      <div className="flex items-center justify-between z-40">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#009B7B]/40 text-[10px] font-bold tracking-wider uppercase text-emerald-300 backdrop-blur-md">
          <img src="/images/logo.png" alt="Gawdee Logo" className="h-3 w-auto object-contain" />
          Style 03 • Orbital Swatch
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onInspectCode?.(product)}
            className="p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-all backdrop-blur-md"
            title="Inspect Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleWishlist?.(product.id)}
            className={`p-2 rounded-full transition-all backdrop-blur-md ${
              isWishlisted
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Floating Sneaker + Orbiting Swatches Stage */}
      <div className="relative my-6 py-8 flex items-center justify-center min-h-[240px]">
        {/* Orbiting Swatch Bullets Suspended in Mid-Air at different Z-Indices */}
        {colors.map((c, idx) => {
          const isSelected = activeColor === idx;
          return (
            <motion.button
              key={c.name}
              onClick={() => setActiveColor(idx)}
              animate={{
                y: isHovered ? [0, -10, 0] : [0, 6, 0],
                x: isHovered ? [0, 5, 0] : [0, -4, 0],
              }}
              transition={{ duration: 3 + idx, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute rounded-full p-2 backdrop-blur-lg border transition-all flex items-center gap-2 shadow-xl cursor-pointer ${
                isSelected
                  ? 'ring-2 ring-[#009B7B] scale-125 z-40 bg-slate-900/90 border-[#009B7B]'
                  : 'bg-slate-900/60 border-slate-700/60 hover:scale-110 opacity-90'
              }`}
              style={{
                ...c.pos,
              }}
              title={c.name}
            >
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: c.hex, border: `1px solid ${c.border}` }}
              >
                {isSelected && <Check className={`w-2.5 h-2.5 ${c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />}
              </div>
              {isSelected && <span className="text-[10px] font-bold text-emerald-300 pr-1">{c.name}</span>}
            </motion.button>
          );
        })}

        {/* Sneaker Shadow Disc */}
        <div className="absolute bottom-2 w-48 h-8 rounded-full bg-black/90 blur-xl pointer-events-none" />

        {/* Center Floating Sneaker (z-index 20) */}
        <motion.img
          src={product?.images?.primary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.55 PM.jpeg'}
          alt={product?.title || 'Aero-Stride Pro X'}
          animate={{
            y: isHovered ? [-16, 6, -16] : [-8, 8, -8],
            rotateZ: isHovered ? [-3, 3, -3] : [0, 0, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 w-full max-w-[230px] h-auto object-contain filter drop-shadow-2xl cursor-pointer"
          onClick={() => onQuickView?.(product)}
        />
      </div>

      {/* Floating Metadata Glass Capsule */}
      <div className="space-y-4 z-40 bg-slate-900/70 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
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
              <span className="text-slate-500 text-[10px] font-normal">(210)</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-[11px] font-medium text-slate-400">
            Selected: <span className="text-emerald-300 font-bold">{colors[activeColor].name}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickView?.(product)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-xs font-semibold flex items-center gap-1"
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
      </div>
    </div>
  );
}
