import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Layout, Code, Check } from 'lucide-react';

export default function VariantK_LandscapeBanner({
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
      className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#009B7B]/60 transition-all duration-500 overflow-hidden col-span-1 md:col-span-2 flex flex-col md:flex-row h-full min-h-[300px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Image Showcase Column */}
      <div
        className="relative w-full md:w-1/2 overflow-hidden bg-slate-100 cursor-pointer min-h-[220px]"
        onClick={() => onQuickView(product)}
      >
        <motion.img
          src={product.images.primary}
          alt={product.title}
          className="w-full h-full object-cover object-center"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="absolute top-3 left-3 z-20">
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#009B7B] text-white shadow-md uppercase">
            <Layout className="w-3 h-3" />
            <span>{product.badge || 'Landscape Banner'}</span>
          </span>
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
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

      {/* Right Product Detail Column */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#009B7B] uppercase tracking-wide">
              {product.category}
            </span>
            <button
              onClick={() => onInspectCode(product)}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#009B7B]"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-[#009B7B] transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specs */}
          {product.specs && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.specs.map((spec, idx) => (
                <span key={idx} className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  <Check className="w-3 h-3 text-[#009B7B]" />
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Add CTA */}
        <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs font-medium text-slate-400 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-bold text-xs shadow-md shadow-[#009B7B]/20 transition-all hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
