import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Layers, Code } from 'lucide-react';

export default function VariantA_Crossfade({
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
      className="group relative bg-[#f4f9f6] text-slate-900 rounded-[2.5rem] p-5 border-2 border-[#009B7B]/30 shadow-md hover:shadow-2xl hover:border-[#009B7B] transition-all duration-500 flex flex-col h-full justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Capsule Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3.5 py-1 rounded-full text-xs font-black tracking-wider bg-[#009B7B] text-white shadow-md uppercase flex items-center gap-1.5">
          <img src="/images/logo.png" alt="Gawdee Logo" className="h-3.5 w-auto object-contain brightness-200" />
          <span>{product.badge || 'Capsule Hero'}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspectCode(product);
          }}
          className="p-1.5 rounded-full bg-white text-slate-600 hover:text-[#009B7B] border border-[#009B7B]/20 shadow-xs transition-transform hover:scale-110"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Circular Image Capsule Viewport */}
      <div
        className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl bg-white cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Primary Image */}
        <img
          src={product.images.primary}
          alt={product.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image Crossfade */}
        <img
          src={product.images.secondary || product.images.primary}
          alt={product.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-[#009B7B]/20 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-3 rounded-full shadow-lg transition-transform hover:scale-110 ${
              isWishlisted ? 'bg-rose-500 text-white' : 'bg-white text-slate-800 hover:bg-rose-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 rounded-full bg-white text-slate-800 shadow-lg transition-transform hover:scale-110 hover:text-[#009B7B]"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body Info */}
      <div className="mt-4 text-center">
        <span className="text-xs font-bold text-[#009B7B] uppercase tracking-wider block mb-1">
          {product.category}
        </span>
        <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-[#009B7B] transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-4 pt-3 border-t border-[#009B7B]/15 flex items-center justify-between">
        <div className="flex flex-col text-left">
          <span className="text-xs text-slate-400 font-bold uppercase">Price</span>
          <span className="text-xl font-black text-slate-900">${product.price.toFixed(2)}</span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#009B7B] hover:bg-[#008468] text-white font-bold text-xs shadow-lg shadow-[#009B7B]/25 transition-all hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
