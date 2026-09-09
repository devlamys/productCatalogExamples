import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Play, Volume2, VolumeX, Code, Film } from 'lucide-react';

export default function VariantS_3DVideoAutoplay({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);

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

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const videoSrc = product.videoUrl || '/videos/video-erasio.mp4';

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative bg-slate-950 text-white rounded-3xl border-2 border-emerald-500/50 shadow-2xl overflow-hidden flex flex-col h-full group"
      >
        {/* Top Badges */}
        <div
          className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-emerald-500 text-slate-950 shadow-lg uppercase pointer-events-auto">
            <Film className="w-3.5 h-3.5" />
            <span>{product.badge || '3D Autoplay Video'}</span>
          </span>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-slate-900/80 text-emerald-400 hover:text-white border border-emerald-500/30 transition-transform hover:scale-110"
              title={isMuted ? 'Unmute Video' : 'Mute Video'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspectCode(product);
              }}
              className="p-1.5 rounded-full bg-slate-900/80 text-emerald-400 hover:text-white border border-emerald-500/30 transition-transform hover:scale-110"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D Video Viewport Stage */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden bg-black cursor-pointer border-b border-emerald-900/60"
          style={{ transform: 'translateZ(25px)' }}
          onClick={() => onQuickView(product)}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-500 group-hover:scale-110"
          />

          {/* Video Overlay Glow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none opacity-60" />

          {/* Live Playing Status Tag */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AUTOPLAY LOOP</span>
          </div>

          {/* Quick Actions Floating Bar */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
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
              className="p-2.5 rounded-full bg-slate-900/80 text-white shadow-lg backdrop-blur-md hover:text-emerald-400"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div
          className="p-5 flex flex-col justify-between flex-grow"
          style={{ transform: 'translateZ(20px)' }}
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

          <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
            <span className="text-xl font-bold text-emerald-400">${product.price.toFixed(2)}</span>

            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
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
