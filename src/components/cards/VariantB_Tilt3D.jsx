import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Zap, Code } from 'lucide-react';

export default function VariantB_Tilt3D({
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
      className="group relative bg-white text-slate-950 rounded-none border-3 border-slate-900 shadow-[8px_8px_0px_#009B7B] hover:shadow-[12px_12px_0px_#009B7B] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full font-mono justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header */}
      <div className="p-3 bg-[#009B7B] border-b-3 border-slate-900 flex items-center justify-between">
        <span className="px-2 py-0.5 bg-white text-slate-950 font-black text-xs uppercase border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
          NEO-BRUTALIST
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspectCode(product);
          }}
          className="p-1 bg-white text-slate-950 hover:bg-amber-300 border-2 border-slate-900 shadow-[2px_2px_0px_#000]"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Showcase */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-50 cursor-pointer border-b-3 border-slate-900"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.images.primary}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 z-20 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2 border-2 border-slate-900 shadow-[3px_3px_0px_#000] transition-transform active:translate-x-0.5 active:translate-y-0.5 ${
              isWishlisted ? 'bg-rose-500 text-white' : 'bg-white text-slate-950 hover:bg-rose-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 bg-white text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_#000] hover:bg-amber-300"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-white">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-black text-[#009B7B] uppercase">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-slate-900" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-black text-slate-900 text-base leading-tight uppercase line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs font-sans text-slate-700 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t-2 border-slate-900 flex items-center justify-between">
          <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#009B7B] hover:bg-emerald-400 text-white hover:text-slate-950 font-black text-xs border-2 border-slate-900 shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>BUY NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
}
