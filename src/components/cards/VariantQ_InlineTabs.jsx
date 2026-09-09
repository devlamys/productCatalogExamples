import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, SlidersHorizontal, Code, Check } from 'lucide-react';

export default function VariantQ_InlineTabs({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#009B7B]/60 transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#009B7B] text-white shadow-md uppercase pointer-events-auto">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{product.badge || 'Inline Tabs'}</span>
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

      {/* Image Showcase */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.images.primary}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating Actions */}
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

      {/* Interactive Tabs Header */}
      <div className="px-5 pt-3 flex items-center justify-between border-b border-slate-100 bg-slate-50/60">
        {['overview', 'specs', 'origin'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`py-2 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === t
                ? 'border-[#009B7B] text-[#009B7B]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Body Content */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="min-h-[70px]"
          >
            {activeTab === 'overview' && (
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#009B7B] transition-colors line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#009B7B] uppercase block">Certified Lab Specs:</span>
                {product.specs ? (
                  product.specs.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Check className="w-3 h-3 text-[#009B7B]" />
                      <span className="line-clamp-1">{s}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">100% Pure Organic Certification</p>
                )}
              </div>
            )}

            {activeTab === 'origin' && (
              <div>
                <span className="text-[10px] font-bold text-[#009B7B] uppercase block">Sourcing Origin:</span>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Harvested sustainably from Gawdee certified organic farms. Free of pesticides & synthetic additives.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-lg font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
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
