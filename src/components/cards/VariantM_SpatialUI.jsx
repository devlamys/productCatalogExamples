import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Layers, Code, Sparkles } from 'lucide-react';

export default function VariantM_SpatialUI({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-18, 18]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{ scale: isHovered ? 1.04 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#009B7B]/30 shadow-xl hover:shadow-2xl overflow-hidden flex flex-col h-full group"
      >
        {/* Layer 1: Background Spatial Glow (depth -20px) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#009B7B]/10 via-transparent to-[#009B7B]/5 pointer-events-none rounded-3xl"
          style={{ transform: 'translateZ(-20px)' }}
        />

        {/* Layer 2: Top Floating Spatial Badge (depth 50px) */}
        <div
          className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none transition-transform duration-300"
          style={{ transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)' }}
        >
          <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wider bg-[#009B7B] text-white shadow-lg shadow-[#009B7B]/40 uppercase pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{product.badge || 'Spatial Glass'}</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspectCode(product);
            }}
            className="p-1.5 rounded-full bg-white/90 text-slate-700 hover:text-[#009B7B] border border-slate-200 shadow-md transition-transform hover:scale-110 pointer-events-auto"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Layer 3: Floating Product Image (depth 35px) */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer rounded-t-3xl"
          style={{ transform: isHovered ? 'translateZ(35px)' : 'translateZ(0px)' }}
          onClick={() => onQuickView(product)}
        >
          <motion.img
            src={product.images.primary}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
          />

          {/* Quick Actions Floating Pill (depth 45px) */}
          <div
            className="absolute bottom-3 right-3 z-30 flex items-center gap-2 pointer-events-auto"
            style={{ transform: isHovered ? 'translateZ(45px)' : 'translateZ(0px)' }}
          >
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

        {/* Layer 4: Content Body (depth 25px) */}
        <div
          className="p-5 flex flex-col justify-between flex-grow"
          style={{ transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#009B7B] uppercase tracking-wide">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            </div>

            <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-[#009B7B] transition-colors line-clamp-1">
              {product.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-lg font-extrabold text-slate-900">${product.price.toFixed(2)}</span>

            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-bold text-xs shadow-lg shadow-[#009B7B]/30 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
