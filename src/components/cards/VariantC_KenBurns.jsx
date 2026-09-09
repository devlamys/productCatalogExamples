import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Ticket, Code } from 'lucide-react';

export default function VariantC_KenBurns({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
  zoomScale = 1.15,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-[#fdfbf7] text-slate-800 rounded-3xl border-2 border-dashed border-[#009B7B] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full font-serif"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Side Ticket Notches */}
      <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#f4f8f6] border-2 border-dashed border-[#009B7B] z-30" />
      <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#f4f8f6] border-2 border-dashed border-[#009B7B] z-30" />

      {/* Top Header */}
      <div className="p-4 bg-[#eaf5f0] border-b-2 border-dashed border-[#009B7B]/40 flex items-center justify-between font-sans">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider bg-[#009B7B] text-white uppercase">
          <Ticket className="w-3.5 h-3.5" />
          <span>{product.badge || 'Organic Coupon Stub'}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspectCode(product);
          }}
          className="p-1.5 rounded-full bg-white text-[#009B7B] border border-[#009B7B]/30 shadow-xs hover:bg-[#009B7B] hover:text-white transition-all"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Showcase */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-amber-50 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <motion.img
          src={product.images.primary}
          alt={product.title}
          className="w-full h-full object-cover object-center"
          animate={{
            scale: isHovered ? zoomScale : 1,
            x: isHovered ? -6 : 0,
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        />

        {/* Dynamic Emerald Vignette Edge */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 155, 123, 0.5) 100%)',
          }}
        />

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2 font-sans">
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

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-1.5 font-sans">
            <span className="text-xs font-bold text-[#009B7B] uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#009B7B] transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs font-sans text-slate-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t-2 border-dashed border-[#009B7B]/30 flex items-center justify-between font-sans">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-bold uppercase">Special Offer</span>
            <span className="text-xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-mono font-bold text-xs shadow-md transition-all hover:scale-105"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>CLAIM STUB</span>
          </button>
        </div>
      </div>
    </div>
  );
}
