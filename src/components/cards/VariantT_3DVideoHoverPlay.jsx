import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Play, Pause, Code, Sparkles } from 'lucide-react';

export default function VariantT_3DVideoHoverPlay({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const videoSrc = product.videoUrl || '/videos/An_animated_changing_video_gen.mp4';

  return (
    <div
      className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#009B7B]/60 transition-all duration-500 overflow-hidden flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-[#009B7B] text-white shadow-md uppercase pointer-events-auto">
          <Play className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse text-amber-300' : ''}`} />
          <span>{product.badge || 'Hover Video Reveal'}</span>
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

      {/* Image / Video Viewport */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Base Static Poster Photo */}
        <img
          src={product.images.primary}
          alt={product.title}
          className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video Element Layer */}
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isPlaying ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />



        {/* Floating Actions */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
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

        {/* Hover Status Tag */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/85 text-emerald-300 backdrop-blur-md border border-[#009B7B]/30">
            {isPlaying ? 'Playing Live Harvest Video' : 'Hover to Play Video'}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex flex-col justify-between flex-grow">
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

          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#009B7B] transition-colors line-clamp-1">
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
