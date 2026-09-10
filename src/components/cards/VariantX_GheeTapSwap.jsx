import React, { useState } from "react";
import { Star, Heart, ShoppingBag, Eye, Code, Zap } from "lucide-react";
import { BRAND } from "../../data/products";

/* Variant X: Ghee Simple Tap-First Swap
   .original-card { border: 1px solid rgba(0, 155, 123, 0.4); border-radius: 1.5rem; }
   .original-card-2 { background: #ffffff; border-radius: 1.5rem; }
*/
export default function VariantX_GheeTapSwap({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  // Tap-first: tap/click toggles image (works on mobile).
  // Hover also swaps image on desktop. Tap wins because click flips state directly.
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState("500g");

  const firstImage = product?.images?.primary || "/images/Ghee/GheeFirst.jpeg";
  const secondImage =
    product?.images?.secondary || "/images/Ghee/GheeSecond.jpeg";
  const images = [firstImage, secondImage];
  const showSecond = activeIdx === 1;

  const weights = ["250g", "500g", "1kg"];

  const handleEnter = () => {
    setIsHovered(true);
    setActiveIdx(1);
  };

  const handleLeave = () => {
    setIsHovered(false);
    setActiveIdx(0);
  };

  const handleTapSwap = () => {
    // Tap priority: explicit toggle, works with mouse click + mobile tap
    setActiveIdx((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div
      className="group relative flex h-full flex-col gap-3 rounded-3xl bg-white p-4 shadow-md transition-all duration-300 hover:shadow-xl"
      style={{
        border: "1px solid rgba(0, 155, 123, 0.4)",
        borderRadius: "1.5rem",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Top row: badge + icon actions (stacked grid, no space-between flex) */}
      <div className=" grid grid-cols-[1fr_auto] items-center gap-2">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#009B7B]/30 bg-[#009B7B]/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#009B7B]">
          <video
            src={BRAND.logoVideo || BRAND.logo}
            autoPlay
            loop
            muted
            playsInline
            className="h-4 w-auto object-contain pointer-events-none"
          />
          Ghee Tap Swap
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => onInspectCode?.(product)}
            title="Inspect Code"
            className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:border-[#009B7B]/40 hover:text-[#009B7B]"
          >
            <Code className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onToggleWishlist?.(product.id)}
            title="Wishlist"
            className={`rounded-full border p-2 transition-colors ${
              isWishlisted
                ? "border-rose-200 bg-rose-50 text-rose-600"
                : "border-slate-200 bg-slate-50 text-slate-500 hover:text-rose-600"
            }`}
          >
            <Heart
              className={`h-3.5 w-3.5 ${isWishlisted ? "fill-rose-500" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Image stage: tap to swap first priority, hover swaps on desktop */}
      <button
        type="button"
        onClick={handleTapSwap}
        className="relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-slate-50"
        aria-label="Tap to swap Ghee image"
      >
        <img
          src={images[0]}
          alt={product?.title || "Ghee first"}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${
            showSecond ? "scale-105 opacity-0" : "scale-100 opacity-100"
          } ${isHovered ? "scale-[1.04]" : ""}`}
          draggable={false}
        />
        <img
          src={images[1]}
          alt={product?.title || "Ghee second"}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${
            showSecond ? "scale-100 opacity-100" : "scale-105 opacity-0"
          } ${isHovered ? "scale-[1.06]" : ""}`}
          draggable={false}
        />

        {/* Product Status Badges (3% OFF & New Launch reference style) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col items-center justify-center rounded-b-2xl rounded-t-xl bg-[#004D40] px-2.5 py-1.5 text-white shadow-md border border-white/20">
          <span className="text-xs font-black leading-none">3%</span>
          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-200 mt-0.5 leading-none">
            OFF
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 z-10 rounded-xl bg-[#D97706] px-3 py-1 text-[11px] font-extrabold text-white shadow-md border border-white/20">
          New Launch
        </div>

        {/* Bottom-Left "Selling Fast" Pill Badge (Reference Style) */}
        <div className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#CBEFFE] border border-[#9EE2F8] text-xs font-black text-[#004D5A] shadow-md">
          <Zap className="w-3.5 h-3.5 fill-[#004D5A] text-[#004D5A]" />
          <span>Selling Fast</span>
        </div>
      </button>

      {/* Title block */}
      <div className="space-y-1">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#009B7B]">
          {product?.brand || "Gawdee Organic Nutrition"}
        </p>
        <h3
          onClick={() => onQuickView?.(product)}
          className="cursor-pointer text-base font-extrabold leading-snug text-slate-900 transition-colors line-clamp-1 hover:text-[#009B7B]"
        >
          {product?.title || "Gawdee Pure A2 Desi Ghee"}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2">
          {product?.description ||
            "Simple farm-fresh Ghee card. Tap the photo to swap views."}
        </p>
      </div>

      {/* Weight selector — stacked simple layout */}
      <div className="mt-1 space-y-1.5 border-t border-slate-100 pt-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Weight:
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {weights.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setSelectedWeight(w)}
              className={`rounded-lg px-2 py-1.5 text-[11px] font-extrabold transition-all active:scale-95 ${
                selectedWeight === w
                  ? "bg-[#009B7B] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Price + CTA row (grid, not space-between flex) */}
      <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-2 pt-1">
        <div>
          <div className="mb-0.5 flex items-center gap-1 text-xs font-bold text-amber-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{product?.rating || 4.9}</span>
            <span className="text-[10px] font-normal text-slate-400">
              ({product?.reviewCount || 469})
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-900">
              $
              {typeof product?.price === "number"
                ? product.price.toFixed(2)
                : product?.price || "34.99"}
            </span>
            {product?.originalPrice && (
              <span className="text-xs font-semibold text-slate-400 line-through">
                $
                {typeof product.originalPrice === "number"
                  ? product.originalPrice.toFixed(2)
                  : product.originalPrice}
              </span>
            )}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => onQuickView?.(product)}
            title="Quick view"
            className="rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-slate-600 transition-colors hover:bg-[#009B7B]/10 hover:text-[#009B7B]"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onAddToCart?.({ ...product, size: selectedWeight })}
            className="flex items-center gap-1.5 rounded-xl bg-[#009B7B] px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-[#009B7B]/25 transition-all hover:scale-105 hover:bg-[#008468] active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
