import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Sparkles, Code } from 'lucide-react';

export default function VariantH_Holographic({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative rounded-3xl p-[2px] transition-all duration-500 flex flex-col h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Iridescent Holographic Border Background */}
      <div
        className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
          isHovered
            ? 'opacity-100 bg-gradient-to-r from-emerald-400 via-[#009B7B] to-teal-500 animate-gradient-x'
            : 'opacity-40 bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400'
        }`}
      />

      {/* Outer Ambient Glow Aura */}
      <div
        className={`absolute inset-0 rounded-3xl blur-2xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-60 bg-gradient-to-r from-teal-400 via-[#009B7B] to-emerald-500' : 'opacity-0'
        }`}
      />

      {/* Inner White Card Container */}
      <div className="relative z-10 w-full h-full bg-white rounded-[22px] flex flex-col overflow-hidden shadow-sm">
        {/* Editorial Background Watermark Typography */}
        <div className="absolute top-2 left-4 z-0 text-7xl font-black text-slate-100 select-none pointer-events-none uppercase tracking-tighter">
          GAWDEE
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-gradient-to-r from-[#009B7B] to-emerald-700 text-white shadow-lg uppercase pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{product.badge || 'Editorial Holo'}</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspectCode(product);
            }}
            className="p-1.5 rounded-full bg-white/90 text-slate-700 hover:text-[#009B7B] border border-slate-200 shadow-sm transition-transform hover:scale-110 pointer-events-auto"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Image Showcase */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer z-10"
          onClick={() => onQuickView(product)}
        >
          <motion.img
            src={product.images.primary}
            alt={product.title}
            className="w-full h-full object-cover object-center"
            animate={{
              scale: isHovered ? 1.08 : 1,
              filter: isHovered ? 'contrast(108%) brightness(105%)' : 'contrast(100%)',
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Shimmer Light Reflection Sweep */}
          <div
            className={`absolute inset-0 pointer-events-none transition-transform duration-1000 ${
              isHovered ? 'translate-x-full' : '-translate-x-full'
            }`}
            style={{
              background: 'linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)',
            }}
          />

          {/* Floating Actions */}
          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className={`p-2.5 rounded-full shadow-lg backdrop-blur-md transition-colors ${
                isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-700 hover:bg-rose-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2.5 rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur-md hover:text-[#009B7B]"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col justify-between flex-grow z-10 bg-white">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-[#009B7B] to-emerald-700 tracking-wide uppercase">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            </div>

            <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-[#009B7B] transition-colors line-clamp-1">
              {product.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xl font-black text-slate-900">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>

            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#009B7B] to-emerald-700 hover:from-[#008468] hover:to-emerald-800 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
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
