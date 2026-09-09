import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Layers, Code, Film } from 'lucide-react';

export default function VariantV_3DVideoParallaxStage({
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

  const springConfig = { stiffness: 250, damping: 20 };
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

  const videoSrc = product.videoUrl || '/videos/video-erasio_lnbYYtGq.mp4';

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative bg-slate-900 text-white rounded-3xl border-2 border-emerald-500/40 shadow-2xl overflow-hidden flex flex-col h-full group"
      >
        {/* Layer 1: Background Loop Video (depth 0px) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black cursor-pointer">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center scale-110 opacity-70"
          />

          {/* Layer 2: Floating Product Image Badge (depth 40px) */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none"
            style={{ transform: 'translateZ(40px)' }}
          >
            <motion.img
              src={product.images.primary}
              alt={product.title}
              className="w-3/5 h-3/5 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Top Badges */}
          <div
            className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none"
            style={{ transform: 'translateZ(50px)' }}
          >
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-[#009B7B] text-white shadow-lg uppercase pointer-events-auto">
              <Film className="w-3.5 h-3.5" />
              <span>{product.badge || 'Parallax Video'}</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspectCode(product);
              }}
              className="p-1.5 rounded-full bg-slate-950/80 text-emerald-400 border border-emerald-500/40 transition-transform hover:scale-110 pointer-events-auto"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div
            className="absolute bottom-3 right-3 z-30 flex items-center gap-2 pointer-events-auto"
            style={{ transform: 'translateZ(45px)' }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className={`p-2.5 rounded-full shadow-lg backdrop-blur-md transition-colors ${
                isWishlisted ? 'bg-rose-500 text-white' : 'bg-slate-900/80 text-white hover:bg-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2.5 rounded-full bg-slate-900/80 text-white shadow-lg backdrop-blur-md hover:text-[#009B7B]"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Info */}
        <div
          className="p-5 flex flex-col justify-between flex-grow"
          style={{ transform: 'translateZ(25px)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            </div>

            <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-emerald-300 transition-colors line-clamp-1">
              {product.title}
            </h3>

            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xl font-bold text-emerald-400">${product.price.toFixed(2)}</span>

            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-black text-xs shadow-lg shadow-[#009B7B]/30 transition-all hover:scale-105"
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
