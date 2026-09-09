import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Volume2, VolumeX, Sparkles, Code } from 'lucide-react';

export default function VariantU_3DVideoMorphPortal({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const videoSrc = product.videoUrl || '/videos/video-erasio_iSSRdfb7.mp4';

  return (
    <div
      className="group relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl border border-teal-500/40 shadow-2xl overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wider bg-teal-400 text-slate-950 shadow-lg uppercase pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{product.badge || 'Video Portal'}</span>
        </span>
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full bg-slate-900/80 text-teal-300 border border-teal-500/30 transition-transform hover:scale-110"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspectCode(product);
            }}
            className="p-1.5 rounded-full bg-slate-900/80 text-teal-300 border border-teal-500/30 transition-transform hover:scale-110"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Curved Glass Viewport Portal */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-black cursor-pointer border-b border-teal-900/60"
        onClick={() => onQuickView(product)}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className={`w-full h-full object-cover object-center transition-transform duration-700 ${
            isHovered ? 'scale-110 contrast-105' : 'scale-100'
          }`}
        />

        {/* Emerald Glass Portal Aura Edge */}
        <div className="absolute inset-0 border-4 border-teal-400/20 rounded-t-3xl pointer-events-none" />

        {/* Floating Quick Actions */}
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
            className="p-2.5 rounded-full bg-slate-900/80 text-white shadow-lg backdrop-blur-md hover:text-teal-400"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-teal-300 transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-teal-900/60 flex items-center justify-between">
          <span className="text-xl font-bold text-teal-300">${product.price.toFixed(2)}</span>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-teal-400/20 transition-all hover:scale-105"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
