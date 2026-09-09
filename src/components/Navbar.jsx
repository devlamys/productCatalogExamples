import React from 'react';
import { ShoppingBag, Heart, Layers, Sliders } from 'lucide-react';
import { BRAND } from '../data/products';

export default function Navbar({
  cartCount,
  wishlistCount,
  activeView,
  setActiveView,
  onOpenCart,
  showControls,
  setShowControls,
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/95 border-b border-[#009B7B]/15 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo Image & Tagline */}
        <div className="flex items-center gap-3">
          <img
            src={BRAND.logo}
            alt={BRAND.name}
            className="h-10 w-auto object-contain transition-transform hover:scale-105"
          />

        </div>

        {/* View Mode Selector Tabs */}
        <div className="hidden md:flex items-center p-1 rounded-xl bg-[#eaf4ef] border border-[#009B7B]/20">
          <button
            onClick={() => setActiveView('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'grid'
                ? 'bg-[#009B7B] text-white shadow-md shadow-[#009B7B]/25'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Card Playground</span>
          </button>
          <button
            onClick={() => setActiveView('comparison')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'comparison'
                ? 'bg-[#009B7B] text-white shadow-md shadow-[#009B7B]/25'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Comparison Matrix</span>
          </button>
        </div>

        {/* Right Tools & Counters */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Customizer Slider Toggle */}
          <button
            onClick={() => setShowControls(!showControls)}
            className={`p-2 rounded-xl border transition-all ${
              showControls
                ? 'bg-[#009B7B]/10 text-[#009B7B] border-[#009B7B]/40 shadow-xs'
                : 'bg-[#f4f8f6] text-slate-600 border-slate-200 hover:bg-white hover:text-[#009B7B]'
            }`}
            title="Toggle Motion Parameter Studio"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Wishlist Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 font-bold text-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{wishlistCount}</span>
          </div>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#009B7B] hover:bg-[#008468] text-white font-bold text-xs shadow-md shadow-[#009B7B]/30 transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
