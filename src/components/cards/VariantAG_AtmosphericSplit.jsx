import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Eye, Code, Cloud, Check } from 'lucide-react';

export default function VariantAG_AtmosphericSplit({
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
      className="relative group rounded-3xl overflow-hidden p-6 text-white shadow-2xl flex flex-col justify-between h-full border border-slate-700/50 transition-all duration-500 hover:border-[#009B7B]/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Full-Bleed Editorial Background with Soft Blur using Product Image */}
      <motion.img
        src={
          product?.images?.primary ||
          product?.images?.lifestyle ||
          '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.55 PM.jpeg'
        }
        alt={product?.title || 'Atmospheric Background'}
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-125 saturate-125 opacity-80 blur-[3px]"
      />

      {/* Dark Vignette Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-slate-950/70 pointer-events-none" />

      {/* Apex Emerald Diffuse Aura Cloud Sphere */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.2, 1] : [0.9, 1.1, 0.9],
          opacity: isHovered ? 0.85 : 0.7,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="aura-cloud absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#009B7B]/60 blur-3xl pointer-events-none z-10"
      />

      {/* Top Header Controls */}
      <div className="flex items-center justify-between z-20">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#009B7B]/40 text-[10px] font-bold tracking-wider uppercase text-emerald-200 backdrop-blur-xl">
          <img src="/images/logo.png" alt="Gawdee Logo" className="h-3 w-auto object-contain" />
          Style 04 • Atmospheric Split
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onInspectCode?.(product)}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white transition-all backdrop-blur-md border border-white/10"
            title="Inspect Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleWishlist?.(product.id)}
            className={`p-2 rounded-full transition-all backdrop-blur-md border ${
              isWishlisted
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Floating Sneaker on Cloud Aura Stage */}
      <div className="relative my-4 py-4 flex items-center justify-center min-h-[220px] z-20">
        {/* Soft shadow underneath */}
        <div className="absolute bottom-2 w-48 h-8 rounded-full bg-black/90 blur-xl pointer-events-none" />

        <motion.img
          src={product?.images?.primary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.55 PM.jpeg'}
          alt={product?.title || 'Aero-Stride Pro X'}
          animate={{
            y: isHovered ? [-14, 6, -14] : [-6, 6, -6],
            rotateZ: isHovered ? [-2, 2, -2] : [0, 0, 0],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 w-full max-w-[240px] h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] cursor-pointer"
          onClick={() => onQuickView?.(product)}
        />
      </div>

      {/* Floating Atmosphere Metadata Cloud Panel */}
      <div className="space-y-4 z-20 bg-slate-900/80 p-4 rounded-2xl border border-white/15 backdrop-blur-xl shadow-2xl">
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

        {/* Swatch Pickers & Actions */}
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
      </div>
    </div>
  );
}
