import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, RefreshCw, Code, Shield } from 'lucide-react';

export default function VariantI_CardFlip({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!product) return null;

  const formattedPrice = typeof product.price === 'number'
    ? `$${product.price.toFixed(2)}`
    : (product.price ? (product.price.toString().startsWith('$') ? product.price : `$${product.price}`) : '$0.00');

  const primaryImage = product.images?.primary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.55 PM.jpeg';

  return (
    <div
      className="relative h-[420px] w-full cursor-pointer group"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Badge & Code button */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#009B7B] text-white shadow-md uppercase pointer-events-auto">
              <RefreshCw className="w-3 h-3" />
              <span>{product.badge || '3D Flip'}</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspectCode?.(product);
              }}
              className="p-1.5 rounded-full bg-white/90 text-slate-600 hover:text-[#009B7B] border border-slate-200 shadow-sm transition-transform hover:scale-110 pointer-events-auto"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100" onClick={() => onQuickView?.(product)}>
            <img
              src={primaryImage}
              alt={product.title || 'Product'}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-emerald-300 backdrop-blur-md">
              Hover to Flip Card ↺
            </div>
          </div>

          <div className="p-5 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#009B7B] uppercase tracking-wide">
                  {product.category || 'Organic'}
                </span>
                <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating || '4.8'}</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base line-clamp-1">{product.title || 'Product Title'}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description || ''}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-lg font-extrabold text-slate-900">{formattedPrice}</span>
              <span className="text-xs font-bold text-[#009B7B]">Flip for Nutrition Specs →</span>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full bg-[#009B7B] text-white rounded-2xl p-6 shadow-2xl flex flex-col justify-between border border-[#008468]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                Gawdee Nutritional Blueprint
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist?.(product.id);
                }}
                className={`p-2 rounded-full border ${isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'}`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h3 className="font-black text-lg text-white leading-tight mb-2">{product.title || 'Product Title'}</h3>
            <p className="text-xs text-emerald-100 leading-relaxed mb-4">{product.description || ''}</p>

            {product.specs && Array.isArray(product.specs) && (
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">
                  Key Organic Highlights:
                </span>
                <div className="space-y-1.5">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-white bg-white/10 px-2.5 py-1 rounded-lg">
                      <Shield className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-white/20 flex items-center justify-between gap-3">
            <div>
              <span className="text-2xl font-black text-white">{formattedPrice}</span>
              <span className="text-[10px] block font-bold text-emerald-200">100% Guaranteed</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className="flex-1 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-[#009B7B] font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
