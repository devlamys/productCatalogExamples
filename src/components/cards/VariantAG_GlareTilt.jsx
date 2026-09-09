import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, Heart, ShoppingBag, Eye, Code, ShieldCheck, Check } from 'lucide-react';

export default function VariantAG_GlareTilt({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [activeColor, setActiveColor] = useState(0);
  const cardRef = useRef(null);

  // Mouse position state for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { damping: 20, stiffness: 200 });
  const glareX = useTransform(mouseX, [0, 1], ['-100%', '200%']);
  const glareY = useTransform(mouseY, [0, 1], ['-100%', '200%']);

  const colors = [
    { name: 'Pure White', hex: '#FFFFFF', border: '#e2e8f0' },
    { name: 'Apex Blue', hex: '#0066FF', border: '#0066FF' },
    { name: 'Neon Crimson', hex: '#FF3B30', border: '#FF3B30' },
    { name: 'Emerald Cyber', hex: '#10B981', border: '#10B981' },
  ];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div className="perspective-1000 w-full h-full flex items-center justify-center p-1">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative group w-full rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/20 p-6 text-white overflow-hidden shadow-2xl flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-[#009B7B]/10"
      >
        {/* Dynamic Lens Flare / Diagonal Glare Sheen Barrier */}
        <motion.div
          style={{
            x: glareX,
            y: glareY,
          }}
          className="absolute inset-0 w-[200%] h-[200%] pointer-events-none z-20 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -rotate-45"
        />

        {/* Top Header */}
        <div className="flex items-center justify-between z-30" style={{ transform: 'translateZ(30px)' }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-[#009B7B]/40 text-[10px] font-bold tracking-wider uppercase text-emerald-300 backdrop-blur-md">
            <img src="/images/logo.png" alt="Gawdee Logo" className="h-3 w-auto object-contain" />
            Style 02 • Glare Tilt 3D
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onInspectCode?.(product)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all backdrop-blur-md"
              title="Inspect Code"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleWishlist?.(product.id)}
              className={`p-2 rounded-full transition-all backdrop-blur-md ${
                isWishlisted
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Floating Encased Sneaker - Suspended at translateZ 60px */}
        <div className="relative my-6 py-4 flex items-center justify-center min-h-[220px]" style={{ transform: 'translateZ(60px)' }}>
          {/* Glass float barrier halo */}
          <div className="absolute w-52 h-52 rounded-full bg-gradient-to-tr from-[#009B7B]/30 via-emerald-500/20 to-teal-500/20 blur-2xl pointer-events-none" />

          {/* Dynamic Floating Shadow at translateZ(20px) */}
          <div
            className="absolute bottom-2 w-44 h-8 rounded-full bg-black/80 blur-lg pointer-events-none"
            style={{ transform: 'translateZ(-20px)' }}
          />

          <motion.img
            src={product?.images?.primary || '/images/orginalimage/WhatsApp Image 2026-09-04 at 12.03.55 PM.jpeg'}
            alt={product?.title || 'Aero-Stride Pro X'}
            animate={{
              y: [-8, 8, -8],
              rotateZ: [-1, 1, -1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-20 w-full max-w-[240px] h-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] cursor-pointer"
            onClick={() => onQuickView?.(product)}
          />
        </div>

        {/* Floating Glass Metadata Container */}
        <div
          className="space-y-4 z-30 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-[#009B7B] uppercase">
                {product?.brand || 'Apex Velocity'}
              </p>
              <h3 className="text-lg font-extrabold text-white tracking-tight mt-0.5">
                {product?.title || 'Aero-Stride Pro X'}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-white">{product?.price ? `$${product.price}` : '$189.99'}</span>
              <div className="flex items-center justify-end gap-1 mt-0.5 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.8</span>
                <span className="text-slate-400 text-[10px] font-normal">(210)</span>
              </div>
            </div>
          </div>

          {/* Swatches & Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              {colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setActiveColor(idx)}
                  className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                    activeColor === idx ? 'scale-110 ring-2 ring-[#009B7B] ring-offset-2 ring-offset-slate-900' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex, border: `1px solid ${c.border}` }}
                >
                  {activeColor === idx && <Check className={`w-3 h-3 ${c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuickView?.(product)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-all text-xs font-semibold flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View</span>
              </button>
              <button
                onClick={() => onAddToCart?.(product)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#009B7B] to-emerald-600 hover:from-[#008468] hover:to-emerald-500 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-[#009B7B]/30 flex items-center gap-1.5 active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
