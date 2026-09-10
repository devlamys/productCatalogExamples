import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Star, Heart, ShoppingBag, Eye, Code, ShieldCheck, Leaf, Sparkles, Award, Zap } from 'lucide-react';
import { BRAND } from '../../data/products';

export default function Variant_OriginalShowcase({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('500g');

  // Mouse tracking for 3D Perspective Tilt on Card 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 20 });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const primaryImage = product?.images?.primary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.55 PM.jpeg';
  const secondaryImage = product?.images?.secondary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.54 PM.jpeg';

  const imagesList = [primaryImage, secondaryImage];
  const sizes = ['250g', '500g', '1kg'];

  const currentDisplayImage = imagesList[activeImageIndex] || primaryImage;

  return (
    <motion.div
      style={{
        rotateX: isHovered ? rotateXSpring : 0,
        rotateY: isHovered ? rotateYSpring : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl bg-white border-2 border-[#009B7B]/30 hover:border-[#009B7B] p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
    >
      {/* Soft Floating Halo Spotlight behind card */}
      <div
        className={`absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#009B7B]/20 blur-3xl transition-opacity duration-700 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-20'
        }`}
      />

      {/* Top Header Badge & Actions */}
      <div className="relative z-20 flex items-center justify-between gap-2 mb-3" style={{ transform: 'translateZ(15px)' }}>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf4ef] border border-[#009B7B]/40 text-[10px] font-black tracking-wider uppercase text-[#009B7B] shadow-xs">
          <video
            src={BRAND.logoVideo || BRAND.logo}
            autoPlay
            loop
            muted
            playsInline
            className="h-4 w-auto object-contain pointer-events-none"
          />
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009B7B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#009B7B]"></span>
          </span>
          Original Card 1 • 3D Harvest Showcase
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onInspectCode?.(product)}
            className="p-2 rounded-full bg-slate-100 hover:bg-[#eaf4ef] text-slate-600 hover:text-[#009B7B] border border-slate-200 transition-all shadow-xs"
            title="Inspect Code"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onToggleWishlist?.(product.id)}
            className={`p-2 rounded-full transition-all border shadow-xs ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Interactive 3D Image Stage */}
      <div
        className="relative my-2 aspect-[4/3] w-full rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden cursor-pointer flex items-center justify-center group/img"
        onClick={() => onQuickView?.(product)}
        style={{ transform: 'translateZ(25px)' }}
      >
        <motion.img
          key={currentDisplayImage}
          src={currentDisplayImage}
          alt={product?.title || 'Original Gawdee Product'}
          initial={{ opacity: 0.9, scale: 0.98 }}
          animate={{ opacity: 1, scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-full object-cover object-center rounded-xl"
        />

        {/* Top-Left Discount Badge (22% OFF reference style) */}
        <div className="absolute top-2.5 left-2.5 z-30 flex flex-col items-center justify-center rounded-b-2xl rounded-t-xl bg-[#004D40] px-2.5 py-1.5 text-white shadow-md border border-white/20">
          <span className="text-xs font-black leading-none">{product?.discount || "22% OFF"}</span>
        </div>

        {/* Top-Right Burgundy Ribbon Tag: "LIMITED STOCK | ♡" (Two Brothers reference design) */}
        <div className="absolute top-0 right-0 z-30 flex items-center">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-bl-2xl bg-[#9e1b42] text-white text-xs font-black shadow-md">
            <span>LIMITED STOCK</span>
            <span className="opacity-60">|</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist?.(product.id);
              }}
              className="hover:scale-125 transition-transform"
              title="Add to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-white' : 'text-white'}`} />
            </button>
          </div>
        </div>

        {/* Bottom-Left "Selling Fast" Pill Badge (Reference Style) */}
        <div className="absolute bottom-2.5 left-2.5 z-30 inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#CBEFFE] border border-[#9EE2F8] text-xs font-black text-[#004D5A] shadow-md">
          <Zap className="w-3.5 h-3.5 fill-[#004D5A] text-[#004D5A]" />
          <span>Selling Fast</span>
        </div>

        {/* Floating Dual-Thumbnail Selector */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/30 shadow-lg">
          {imagesList.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(idx);
              }}
              className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${
                activeImageIndex === idx ? 'border-[#009B7B] scale-110 ring-2 ring-[#009B7B]/40' : 'border-white/60 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Quick View Hover Eye Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#009B7B] font-extrabold text-xs shadow-xl">
            <Eye className="w-3.5 h-3.5" />
            3D Quick View
          </span>
        </div>
      </div>

      {/* Organic Highlights Badges */}
      <div className="flex items-center gap-2 my-2 overflow-x-auto no-scrollbar" style={{ transform: 'translateZ(10px)' }}>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-[#009B7B] text-[10px] font-extrabold border border-emerald-200/80 whitespace-nowrap">
          <Leaf className="w-3 h-3" />
          100% Organic
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-extrabold border border-amber-200/80 whitespace-nowrap">
          <ShieldCheck className="w-3 h-3 text-amber-600" />
          Farm Fresh
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 text-[10px] font-extrabold border border-teal-200/80 whitespace-nowrap">
          <Award className="w-3 h-3 text-teal-600" />
          Certified Pure
        </span>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 space-y-1" style={{ transform: 'translateZ(12px)' }}>
        <p className="text-[11px] font-extrabold tracking-widest text-[#009B7B] uppercase">
          {product?.brand || 'Gawdee Organic Nutrition'}
        </p>
        <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-[#009B7B] transition-colors line-clamp-1">
          {product?.title || 'Gawdee Original Organic Harvest Pack'}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2">
          {product?.description || 'Authentic original Gawdee organic product harvest with interactive 3D perspective and farm-fresh purity.'}
        </p>
      </div>

      {/* Size Selector & Price Action Row */}
      <div className="relative z-10 mt-4 pt-3 border-t border-slate-100 space-y-3" style={{ transform: 'translateZ(15px)' }}>
        {/* Weight Selector */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Weight:</span>
          <div className="flex items-center gap-1.5">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-black transition-all ${
                  selectedSize === size
                    ? 'bg-[#009B7B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product?.rating || 4.9}</span>
              <span className="text-slate-400 text-[10px] font-normal">({product?.reviewCount || 380})</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">
                ${typeof product?.price === 'number' ? product.price.toFixed(2) : product?.price || '34.99'}
              </span>
              {product?.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-semibold">
                  ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickView?.(product)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#eaf4ef] text-slate-700 hover:text-[#009B7B] font-bold text-xs transition-all border border-slate-200"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart?.(product)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-extrabold text-xs shadow-md shadow-[#009B7B]/25 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
