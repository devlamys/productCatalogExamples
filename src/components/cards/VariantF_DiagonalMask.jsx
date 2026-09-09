import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Scissors, Code } from 'lucide-react';

export default function VariantF_DiagonalMask({
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
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#009B7B] text-white shadow-md shadow-[#009B7B]/30 uppercase pointer-events-auto">
          <Scissors className="w-3 h-3" />
          <span>{product.badge || 'Diagonal Mask'}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspectCode(product);
          }}
          className="p-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:text-[#009B7B] border border-slate-200 shadow-sm transition-transform hover:scale-110 pointer-events-auto"
          title="Inspect Animation Code"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Showcase Viewport */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Underneath Base Image */}
        <img
          src={product.images.primary}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Top Overlay Image with CSS Clip-Path Mask Reveal */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden z-10"
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{
            clipPath: isHovered
              ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={product.images.secondary || product.images.primary}
            alt={`${product.title} macro detail`}
            className="w-full h-full object-cover object-center scale-105"
          />
        </motion.div>

        {/* Gawdee Emerald Diagonal Slash Line Overlay indicator on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-15 border-r-2 border-[#009B7B] shadow-[0_0_15px_rgba(0,155,123,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating Quick Action Buttons */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2.5 rounded-full shadow-lg backdrop-blur-md transition-colors ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-slate-700 hover:bg-rose-50 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur-md hover:bg-[#009B7B]/10 hover:text-[#009B7B] transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Split Mask Label Badge */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-slate-900/85 text-emerald-300 backdrop-blur-md border border-[#009B7B]/30">
            {isHovered ? 'Harvest Texture View' : 'Standard View'}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-[#009B7B] tracking-wide uppercase">
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
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs font-medium text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.discount && (
              <span className="text-[10px] font-bold text-[#009B7B]">
                {product.discount}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-semibold text-xs shadow-md shadow-[#009B7B]/20 transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
