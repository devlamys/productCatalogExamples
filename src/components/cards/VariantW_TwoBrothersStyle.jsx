import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, ChevronDown, CheckCircle2, ShieldCheck, Code, Award } from 'lucide-react';

export default function VariantW_TwoBrothersStyle({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : '500ml'
  );

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col h-full font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Right Burgundy Pill Tag: "Limited Stock | ♡" */}
      <div className="absolute top-0 right-0 z-30 flex items-center">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-bl-2xl bg-[#9e1b42] text-white text-xs font-bold shadow-md">
          <span>{product.badge || 'Limited Stock'}</span>
          <span className="opacity-60">|</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="hover:scale-125 transition-transform"
            title="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-white' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* Top Left Gawdee Logo & Code Inspector Trigger */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 border border-[#009B7B]/30 text-[10px] font-black text-[#009B7B] shadow-sm backdrop-blur-md">
          <img src="/images/logo.png" alt="Gawdee Logo" className="h-3 w-auto object-contain" />
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspectCode(product);
          }}
          className="p-1.5 rounded-full bg-white/90 text-slate-600 hover:text-[#009B7B] border border-slate-200 shadow-sm transition-transform hover:scale-110"
          title="Inspect Animation Code"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Showcase Viewport */}
      <div
        className="relative aspect-[1/1] w-full overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* UN-HOVERED STATE: Golden Textured Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${product.images.secondary || product.images.primary})`,
            filter: 'brightness(95%) contrast(105%)',
          }}
        />

        {/* HOVERED STATE: Clean White Background with Floating Certification Badges */}
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Center Product Jar */}
        <motion.img
          src={product.images.primary}
          alt={product.title}
          className="relative z-10 w-3/4 h-3/4 object-contain mx-auto my-auto drop-shadow-xl"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* FLOATING ORGANIC SEALS & ORBIT LINES ON HOVER */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 pointer-events-none p-3"
          >
            {/* SVG Dashed Dotted Orbit Lines */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-400/60" fill="none">
              <path
                d="M 60 70 Q 110 50 140 100"
                strokeDasharray="3 3"
                strokeWidth="1.5"
              />
              <path
                d="M 230 70 Q 200 120 180 140"
                strokeDasharray="3 3"
                strokeWidth="1.5"
              />
              <path
                d="M 240 160 Q 210 180 180 200"
                strokeDasharray="3 3"
                strokeWidth="1.5"
              />
            </svg>

            {/* Seal 1 (Top Left): Lactose Free Badge */}
            <div className="absolute top-4 left-4 bg-rose-500 text-white rounded-full p-2.5 shadow-lg flex flex-col items-center justify-center text-[9px] font-black text-center w-14 h-14 border-2 border-white uppercase tracking-tighter">
              <ShieldCheck className="w-4 h-4 mb-0.5" />
              <span>Lactose Free</span>
            </div>

            {/* Seal 2 (Top Right): Glyphosate Residue Free Badge */}
            <div className="absolute top-4 right-4 bg-emerald-600 text-white rounded-full p-2.5 shadow-lg flex flex-col items-center justify-center text-[9px] font-black text-center w-14 h-14 border-2 border-white uppercase tracking-tighter">
              <CheckCircle2 className="w-4 h-4 mb-0.5" />
              <span>Residue Free</span>
            </div>

            {/* Seal 3 (Mid Right): GMO Free & Lab Tested Badge */}
            <div className="absolute bottom-12 right-4 bg-emerald-50 text-emerald-800 rounded-lg px-2.5 py-1.5 shadow-md border border-emerald-600 flex items-center gap-1.5 text-[10px] font-extrabold">
              <Award className="w-4 h-4 text-emerald-600" />
              <div className="flex flex-col leading-none">
                <span>GMO FREE</span>
                <span className="text-[8px] text-slate-500 font-bold">LAB TESTED</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-white">
        <div>
          {/* Title & Price Line */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">
              {product.title}
            </h3>
            <span className="text-lg font-black text-slate-900 flex-shrink-0">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-xs text-slate-400 font-medium mt-1">
            Once a month | 12 times a year
          </p>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-slate-800">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>{product.rating}</span>
            <span className="text-slate-400">| {product.reviewCount} Reviews</span>
          </div>

          {/* Size Selector Box */}
          <div className="mt-3 relative">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full appearance-none py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white shadow-xs focus:outline-none focus:border-[#009B7B] cursor-pointer"
            >
              {product.sizes ? (
                product.sizes.map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))
              ) : (
                <>
                  <option value="500ml">500ml</option>
                  <option value="1L">1L Pack</option>
                  <option value="250ml">250ml Jar</option>
                </>
              )}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Full-width Solid Green ADD TO CART Button */}
        <div className="mt-4">
          <button
            onClick={() => onAddToCart({ ...product, size: selectedSize })}
            className="w-full py-3 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-extrabold text-xs tracking-wider uppercase shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
