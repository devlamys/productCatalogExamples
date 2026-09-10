import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingBag, Eye, Code, Leaf, ShieldCheck, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { BRAND } from '../../data/products';

export default function Variant_OriginalShowcase2({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFormulation, setSelectedFormulation] = useState('Elixir Pure');

  const primaryImage = product?.images?.primary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.55 PM.jpeg';
  const secondaryImage = product?.images?.secondary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.54 PM.jpeg';

  const formulations = ['Elixir Pure', 'Vitality Drops', 'Reserve'];

  return (
    <div
      className="group relative rounded-3xl bg-gradient-to-b from-white via-emerald-50/20 to-white border-2 border-emerald-500/20 hover:border-[#009B7B] p-5 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Expanding Liquid Ripple Pulse Aura */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.35, 1] : 1,
          opacity: isHovered ? [0.25, 0.45, 0.25] : 0,
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-radial from-[#009B7B]/30 via-emerald-300/10 to-transparent blur-2xl pointer-events-none"
      />

      {/* Top Banner Header: Premium Metallic Emerald Ribbon */}
      <div className="relative z-20 flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#009B7B] via-[#008468] to-[#006650] text-white text-[10px] font-black tracking-wider uppercase shadow-md shadow-[#009B7B]/25">
          <video
            src={BRAND.logoVideo || BRAND.logo}
            autoPlay
            loop
            muted
            playsInline
            className="h-4 w-auto object-contain pointer-events-none"
          />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
          Original Card 2 • Botanical Elixir
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onInspectCode?.(product)}
            className="p-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-600 hover:text-[#009B7B] border border-slate-200 hover:border-emerald-300 transition-all shadow-xs"
            title="Inspect Code"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onToggleWishlist?.(product.id)}
            className={`p-2 rounded-xl transition-all border shadow-xs ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Image Stage: Split Shutter Curtain & Diagonal Light Beam Reveal */}
      <div
        className="relative my-2 aspect-[4/3] w-full rounded-2xl bg-slate-900 overflow-hidden cursor-pointer flex items-center justify-center group/img border border-emerald-100 shadow-inner"
        onClick={() => onQuickView?.(product)}
      >
        {/* Base Primary Image */}
        <motion.img
          src={primaryImage}
          alt={product?.title || 'Botanical Elixir'}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Hover Curtain Reveal Image */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: isHovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={secondaryImage}
            alt="Botanical Harvest Detail"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Diagonal Shimmer Beam Sweeping across on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '200%' : '-100%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {/* Floating Interactive Badge Indicator */}
        <div className="absolute top-2 left-2 z-20">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
            <RefreshCw className={`w-3 h-3 text-emerald-400 ${isHovered ? 'animate-spin' : ''}`} />
            Hover to Reveal Harvest
          </span>
        </div>

        {/* Quick View Button */}
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#009B7B] font-extrabold text-xs shadow-2xl transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4" />
            Botanical Preview
          </span>
        </div>
      </div>

      {/* Organic Certifications Pill Chips */}
      <div className="flex items-center gap-1.5 my-2 overflow-x-auto no-scrollbar">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100/80 text-[#006650] text-[10px] font-extrabold border border-emerald-300/60 whitespace-nowrap">
          <Leaf className="w-3 h-3 text-[#009B7B]" />
          100% Raw Extract
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#009B7B]/10 text-[#009B7B] text-[10px] font-extrabold border border-[#009B7B]/30 whitespace-nowrap">
          <ShieldCheck className="w-3 h-3" />
          Farm Direct
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[10px] font-extrabold border border-amber-200 whitespace-nowrap">
          <Zap className="w-3 h-3 text-amber-600" />
          Zero Additives
        </span>
      </div>

      {/* Product Title & Brand Info */}
      <div className="relative z-10 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-black tracking-widest text-[#009B7B] uppercase">
            {product?.brand || 'Gawdee Organic Nutrition'}
          </p>
          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-[#006650]">
            {product?.badge || 'ORIGINAL IMAGE'}
          </span>
        </div>
        <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-[#009B7B] transition-colors line-clamp-1">
          {product?.title || 'Gawdee Pure Botanical Organic Elixir'}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2">
          {product?.description || 'Original Gawdee botanical extract and pure organic nutrition formula with instant dual-photo preview.'}
        </p>
      </div>

      {/* Interactive Formulation Switcher & Action Bar */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-200/80 space-y-3">
        {/* Formulation Selector */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Formulation:</span>
          <div className="flex items-center gap-1">
            {formulations.map((form) => (
              <button
                key={form}
                onClick={() => setSelectedFormulation(form)}
                className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all ${
                  selectedFormulation === form
                    ? 'bg-[#009B7B] text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {form}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0</span>
              <span className="text-slate-400 text-[10px] font-normal">(420 reviews)</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#006650]">
                ${typeof product?.price === 'number' ? product.price.toFixed(2) : product?.price || '29.99'}
              </span>
              {product?.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-semibold">
                  ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickView?.(product)}
              className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#009B7B] font-bold text-xs transition-all border border-emerald-200"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart?.(product)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#009B7B] to-[#007A61] hover:from-[#008468] hover:to-[#006650] text-white font-extrabold text-xs shadow-md shadow-[#009B7B]/30 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
