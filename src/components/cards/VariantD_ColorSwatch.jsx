import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Palette, Code, Check } from 'lucide-react';

export default function VariantD_ColorSwatch({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [selectedSwatch, setSelectedSwatch] = useState(
    product.swatches ? product.swatches[0] : null
  );

  const displayImage = selectedSwatch ? selectedSwatch.img : product.images.primary;

  return (
    <div className="group relative bg-white rounded-3xl border-2 border-[#009B7B]/30 shadow-sm hover:shadow-2xl hover:border-[#009B7B] transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-[#009B7B] text-white shadow-md uppercase pointer-events-auto">
          <Palette className="w-3.5 h-3.5" />
          <span>{product.badge || 'Flavor Accordion'}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspectCode(product);
          }}
          className="p-1.5 rounded-full bg-white text-slate-600 hover:text-[#009B7B] shadow-md border border-slate-200 transition-transform hover:scale-110 pointer-events-auto"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Viewport */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-50 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={displayImage}
            src={displayImage}
            alt={product.title}
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2.5 rounded-full shadow-md transition-colors ${
              isWishlisted ? 'bg-rose-500 text-white' : 'bg-white text-slate-700 hover:bg-rose-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 rounded-full bg-white text-slate-700 shadow-md hover:text-[#009B7B]"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Flavor Swatch Bar */}
      {product.swatches && (
        <div className="px-5 pt-3 pb-2 flex items-center gap-2 bg-[#eaf4ef] border-y border-[#009B7B]/20">
          <span className="text-[10px] font-extrabold text-[#009B7B] uppercase tracking-wider mr-1">
            Swatches:
          </span>
          {product.swatches.map((swatch, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSwatch(swatch)}
              style={{ backgroundColor: swatch.colorHex }}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                selectedSwatch?.name === swatch.name
                  ? 'border-slate-900 scale-125 shadow-md ring-2 ring-[#009B7B]'
                  : 'border-white hover:scale-110 opacity-80'
              }`}
              title={swatch.name}
            />
          ))}
          {selectedSwatch && (
            <span className="text-[10px] font-bold text-slate-700 ml-auto line-clamp-1">
              {selectedSwatch.name}
            </span>
          )}
        </div>
      )}

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
          <span className="text-xl font-black text-slate-900">${product.price.toFixed(2)}</span>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-bold text-xs shadow-md transition-all hover:scale-105"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
