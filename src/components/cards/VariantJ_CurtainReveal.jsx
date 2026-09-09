import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Columns, Code } from 'lucide-react';

export default function VariantJ_CurtainReveal({
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
      className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#009B7B]/60 transition-all duration-500 overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#009B7B] text-white shadow-md uppercase pointer-events-auto">
          <Columns className="w-3 h-3" />
          <span>{product.badge || 'Split Curtain'}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspectCode(product);
          }}
          className="p-1.5 rounded-full bg-white/90 text-slate-600 hover:text-[#009B7B] border border-slate-200 shadow-sm transition-transform hover:scale-110 pointer-events-auto"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Showcase Viewport */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Inner Lifestyle Revealed Image */}
        <img
          src={product.images.secondary || product.images.primary}
          alt={`${product.title} revealed harvest`}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />

        {/* Left Curtain Shutter */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full z-10 overflow-hidden border-r border-white/20"
          animate={{ x: isHovered ? '-100%' : '0%' }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <img
            src={product.images.primary}
            alt={product.title}
            className="w-[200%] h-full object-cover max-w-none"
          />
        </motion.div>

        {/* Right Curtain Shutter */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full z-10 overflow-hidden border-l border-white/20"
          animate={{ x: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <img
            src={product.images.primary}
            alt={product.title}
            className="w-[200%] h-full object-cover max-w-none -translate-x-1/2"
          />
        </motion.div>

        {/* Floating Actions on Inner View */}
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

      {/* Body Info */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-[#009B7B] uppercase tracking-wide">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#009B7B] transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-lg font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-semibold text-xs transition-colors shadow-md shadow-[#009B7B]/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
