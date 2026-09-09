import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Layers, Code, Check } from 'lucide-react';

export default function VariantE_BottomDrawer({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : '500g Pouch'
  );

  return (
    <div
      className="group relative bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-[#009B7B]/30 shadow-md hover:shadow-2xl hover:border-[#009B7B] transition-all duration-500 overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-[#009B7B] text-white shadow-md uppercase pointer-events-auto">
          <Layers className="w-3.5 h-3.5" />
          <span>{product.badge || 'Glass Drawer'}</span>
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

      {/* Image Viewport */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.images.primary}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Sliding Frosted Glass Bottom Drawer */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-20 p-4 bg-white/95 backdrop-blur-2xl border-t border-[#009B7B]/20 shadow-2xl flex flex-col gap-2"
          initial={{ y: '100%' }}
          animate={{ y: isHovered ? '0%' : '100%' }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[#009B7B] uppercase tracking-wider">
              Select Pack Weight:
            </span>
            <span className="text-xs font-bold text-slate-900">${product.price.toFixed(2)}</span>
          </div>

          {product.sizes && (
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                    selectedSize === sz
                      ? 'bg-[#009B7B] text-white border-[#009B7B] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#009B7B]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({ ...product, size: selectedSize });
            }}
            className="w-full mt-1 py-2 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add {selectedSize} to Cart</span>
          </button>
        </motion.div>

        {/* Quick Action Floating Bar */}
        <div className="absolute bottom-3 right-3 z-15 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2.5 rounded-full shadow-md transition-colors ${
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
            className="p-2.5 rounded-full bg-white/90 text-slate-700 shadow-md hover:text-[#009B7B]"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-1">
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
          <span className="text-xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-bold text-xs shadow-md transition-all hover:scale-105"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Options</span>
          </button>
        </div>
      </div>
    </div>
  );
}
