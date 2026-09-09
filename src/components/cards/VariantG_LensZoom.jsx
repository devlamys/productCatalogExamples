import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, ZoomIn, Code } from 'lucide-react';

export default function VariantG_LensZoom({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
  zoomLevel = 4.5,
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [lensState, setLensState] = useState({ x: 0, y: 0, posX: 50, posY: 50 });

  const highResImg = product.images.primary;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const posX = (x / rect.width) * 100;
    const posY = (y / rect.height) * 100;

    setLensState({ x, y, posX, posY });
  };

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#009B7B]/60 transition-all duration-500 overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#009B7B] text-white shadow-md shadow-[#009B7B]/30 uppercase pointer-events-auto">
          <ZoomIn className="w-3 h-3" />
          <span>{product.badge || 'Magnifying Lens'}</span>
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

      {/* Interactive Magnifying Image Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-crosshair"
        onClick={() => onQuickView(product)}
      >
        {/* Base Normal Image with dramatic hover scale zoom effect */}
        <img
          src={product.images.primary}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-125"
        />

        {/* Gawdee Circular Magnifying Glass Lens Overlay */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="lens-gawdee absolute z-20 pointer-events-none rounded-full border-3 border-[#009B7B] shadow-[0_15px_40px_rgba(0,155,123,0.65)] ring-4 ring-white/50"
            style={{
              width: 180,
              height: 180,
              left: lensState.x - 90,
              top: lensState.y - 90,
              backgroundImage: `url(${highResImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundPosition: `${lensState.posX}% ${lensState.posY}%`,
            }}
          >
            {/* Crosshair target center dot */}
            <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-[#009B7B] border-2 border-white shadow-md" />
          </motion.div>
        )}

        {/* Quick Action Floating Bar */}
        <div className="absolute bottom-3 right-3 z-25 flex items-center gap-2 pointer-events-auto">
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

        {/* Helper Hint Badge */}
        <div className="absolute bottom-3 left-3 z-15 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/85 text-emerald-300 backdrop-blur-md border border-[#009B7B]/30">
            {isHovered ? '4.5x Ultra Magnification Zoom' : 'Hover to Magnify'}
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
