import React from 'react';
import { Search, User, Heart, ShoppingBag, ArrowRight, Layers, Sliders } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full bg-slate-50/85 backdrop-blur-md pb-3">
      {/* Top Green Announcement Marquee Bar */}
      <div className="bg-[#009B7B] text-white py-2 px-4 text-xs font-semibold shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap text-white/95">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="text-sm">🍃</span> Pure. Natural. Trusted.
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="text-sm">🐄</span> 100% A2 Ghee
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="text-sm">🍃</span> No Preservatives
            </span>
            <span className="text-white/40 hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1.5 font-bold">
              <span className="text-sm">🥣</span> Handcrafted on Indian Farms
            </span>
            <span className="text-white/40 hidden lg:inline">|</span>
            <span className="hidden lg:flex items-center gap-1.5 font-bold">
              <span className="text-sm">♻️</span> Plastic Neutral
            </span>
            <span className="text-white/40 hidden xl:inline">|</span>
            <span className="hidden xl:flex items-center gap-1.5 font-bold">
              <span className="text-sm">🚚</span> Free Shipping on Orders ₹999+
            </span>
          </div>

          <div className="hidden sm:block whitespace-nowrap text-right font-serif italic text-white/95 text-xs sm:text-sm tracking-wide">
            Good Food, Brighter Lives.
          </div>
        </div>
      </div>

      {/* Main Floating Pill Nav Bar - High Visibility Large Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3">
        <div className="bg-white/95 backdrop-blur-2xl rounded-full border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
          
          {/* Left: Enlarged High-Visibility Brand Logo Video */}
          <div className="flex items-center gap-3 shrink-0">
            <video
              src={BRAND.logoVideo || BRAND.logo}
              autoPlay
              loop
              muted
              playsInline
              className="h-12 sm:h-16 lg:h-18 max-h-20 w-auto object-contain pointer-events-none transition-transform hover:scale-105"
            />
          </div>


          {/* Playground / Mode Switches */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-slate-100 border border-slate-200/60">
            <button
              type="button"
              onClick={() => setActiveView('grid')}
              title="Card Playground Grid"
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                activeView === 'grid'
                  ? 'bg-[#009B7B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('comparison')}
              title="Comparison Matrix"
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                activeView === 'comparison'
                  ? 'bg-[#009B7B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Compare</span>
            </button>
          </div>

          {/* Right: Actions (Studio, Search, Account, Wishlist, Cart, Shop Now) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Studio controls toggle button */}
            <button
              type="button"
              onClick={() => setShowControls(!showControls)}
              title="Toggle Motion Studio"
              className={`p-2.5 sm:p-3 rounded-full border transition-all ${
                showControls
                  ? 'bg-[#009B7B]/10 text-[#009B7B] border-[#009B7B]/40'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Search Icon */}
            <button
              type="button"
              title="Search"
              className="p-2.5 sm:p-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account Icon */}
            <button
              type="button"
              title="Account"
              className="hidden sm:flex p-2.5 sm:p-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Wishlist Button with Badge */}
            <button
              type="button"
              title="Wishlist"
              className="relative p-2.5 sm:p-3 rounded-full bg-slate-50 hover:bg-rose-50 border border-slate-200 text-slate-700 hover:text-rose-600 transition-colors"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#009B7B] text-[10px] font-black text-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              title="Cart"
              className="relative p-2.5 sm:p-3 rounded-full bg-slate-50 hover:bg-[#009B7B]/10 border border-slate-200 text-slate-700 hover:text-[#009B7B] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#009B7B] text-[10px] font-black text-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* SHOP NOW Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2 rounded-full bg-[#009B7B] hover:bg-[#008468] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-black tracking-wider uppercase text-white shadow-lg shadow-[#009B7B]/30 transition-all hover:scale-105 active:scale-95 ml-1"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
