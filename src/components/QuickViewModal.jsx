import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, Check } from 'lucide-react';

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) {
  if (!product) return null;

  const [activeImg, setActiveImg] = useState(product.images.primary);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '500g Pouch');
  const [quantity, setQuantity] = useState(1);

  const galleryImages = [
    product.images.primary,
    product.images.secondary,
    product.images.angle3,
    product.images.highResZoom,
  ].filter(Boolean);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 my-auto text-slate-900"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Gallery View */}
            <div className="p-6 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-4 shadow-sm border border-slate-200">
                <img
                  src={activeImg}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImg === img
                          ? 'border-[#009B7B] scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Actions */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="Gawdee Logo" className="h-4 w-auto object-contain" />
                    <span className="text-xs font-bold text-[#009B7B] uppercase tracking-wider">
                      {product.brand || 'Gawdee Organic Nutrition'} • {product.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-slate-400">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  {product.title}
                </h2>

                {/* Price Header */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-black text-slate-900">
                    {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : (product.price ? (product.price.toString().startsWith('$') ? product.price : `$${product.price}`) : '$0.00')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-medium text-slate-400 line-through">
                      {typeof product.originalPrice === 'number' ? `$${product.originalPrice.toFixed(2)}` : product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-[#009B7B] border border-emerald-200">
                      {product.discount}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Specs List */}
                {product.specs && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase">Key Specifications:</span>
                    <div className="flex flex-wrap gap-2">
                      {product.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200"
                        >
                          <Check className="w-3 h-3 text-[#009B7B]" />
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && (
                  <div className="mt-5">
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Select Pack Size:</span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedSize === sz
                              ? 'bg-[#009B7B] text-white border-[#009B7B] shadow-md'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#009B7B]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => onAddToCart({ ...product, quantity, size: selectedSize })}
                  className="flex-1 py-3.5 rounded-2xl bg-[#009B7B] hover:bg-[#008468] text-white font-bold text-sm shadow-xl shadow-[#009B7B]/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Cart - ${((typeof product.price === 'number' ? product.price : parseFloat(product.price?.toString().replace(/[^0-9.]/g, '') || '0')) * quantity).toFixed(2)}
                  </span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    isWishlisted
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-rose-50 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
