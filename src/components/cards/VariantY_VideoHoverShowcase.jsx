import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Eye,
  Code,
  Zap,
  Leaf,
  Award,
  Flame,
  AlertCircle,
} from "lucide-react";
import { BRAND } from "../../data/products";

export default function VariantY_VideoHoverShowcase({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onInspectCode,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState("500g");
  const [isSoldOut, setIsSoldOut] = useState(false);

  const primaryImage =
    product?.images?.primary || "/images/newCard/IMG_1210.PNG";
  const hoverVideo = product?.videoUrl || "/images/newCard/Sequence 01_1.mp4";
  const weights = ["250g", "500g", "1kg"];

  return (
    <div
      className="group relative flex h-full flex-col justify-between gap-3 rounded-3xl bg-white p-4.5 shadow-md transition-all duration-500 hover:shadow-2xl border border-emerald-500/30 hover:border-[#009B7B]"
      style={{ borderRadius: "1.5rem" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header Row: Brand Logo + Status Toggle + Actions */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#009B7B]/30 bg-[#009B7B]/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#009B7B]">
            <video
              src={BRAND.logoVideo || BRAND.logo}
              autoPlay
              loop
              muted
              playsInline
              className="h-3.5 w-auto object-contain pointer-events-none"
            />
            {product?.brand || "Gawdee Organic"}
          </span>

          {/* Interactive Stock State Tester Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsSoldOut(!isSoldOut);
            }}
            title="Click to toggle In-Stock / Sold-Out demo mode"
            className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide transition-all border ${
              isSoldOut
                ? "bg-rose-100 text-rose-700 border-rose-300 animate-pulse"
                : "bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200"
            }`}
          >
            {isSoldOut ? "● Sold Out" : "● In Stock"}
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onInspectCode?.(product)}
            title="Inspect Code"
            className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:border-[#009B7B]/40 hover:text-[#009B7B]"
          >
            <Code className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
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

      {/* Main Image Stage with Hover Autoplay Video & Distinctive Badges */}
      <div
        className="relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white"
        onClick={() => onQuickView?.(product)}
      >
        {/* Base Primary Image (Zoomed out further with p-6 & scale-75) */}
        <img
          src={primaryImage}
          alt={product?.title || "Organic Product"}
          className={`absolute inset-0 h-full w-full object-contain p-6 transition-all duration-500 ease-out ${
            isHovered ? "scale-90 opacity-0" : "scale-75 opacity-100"
          }`}
          draggable={false}
        />

        {/* Video Layer (Plays ONLY on Mouse Hover) */}
        <video
          src={hoverVideo}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${
            isHovered ? "scale-100 opacity-100 pointer-events-auto" : "scale-105 opacity-0 pointer-events-none"
          }`}
        />

        {/* Top-Left Discount Badge: 18% OFF (Deep Dark Emerald) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col items-center justify-center rounded-b-2xl rounded-t-xl bg-[#004D40] px-2.5 py-1.5 text-white shadow-md border border-white/20">
          <span className="text-xs font-black leading-none">
            {product?.discount || "18% OFF"}
          </span>
        </div>

        {/* Top-Right Bestseller Ribbon Badge (Amber Gold) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 rounded-xl bg-[#D97706] px-2.5 py-1 text-[11px] font-black text-white shadow-md border border-white/20">
          <Award className="h-3.5 w-3.5 fill-amber-200 text-amber-200" />
          <span>Bestseller</span>
        </div>

        {/* Bottom Floating Status Badges: Fast Selling & 100% Healthy */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between gap-1.5 pointer-events-none">
          {/* Animated Fast Selling Cyan Pill Badge */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-1 rounded-xl bg-[#CBEFFE] border border-[#9EE2F8] px-2.5 py-1 text-[11px] font-black text-[#004D5A] shadow-md backdrop-blur-xs"
          >
            <motion.div
              animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="h-3.5 w-3.5 fill-[#004D5A] text-[#004D5A]" />
            </motion.div>
            <span>Fast Selling</span>
            <span className="relative flex h-1.5 w-1.5 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004D5A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#004D5A]"></span>
            </span>
          </motion.div>

          {/* 100% Healthy Mint Green Badge */}
          <div className="inline-flex items-center gap-1 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] px-2.5 py-1 text-[11px] font-black text-[#15803D] shadow-md backdrop-blur-xs">
            <Leaf className="h-3.5 w-3.5 text-[#15803D]" />
            <span>Healthy</span>
          </div>
        </div>



        {/* SOLD OUT / OUT OF STOCK Full-Image Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/65 backdrop-blur-xs p-4 text-center">
            <div className="rounded-2xl bg-rose-600/90 border border-white/30 px-4 py-2 text-white shadow-2xl animate-pulse">
              <span className="block text-xs font-black uppercase tracking-widest">
                OUT OF STOCK
              </span>
              <span className="block text-[10px] font-bold text-rose-100 mt-0.5">
                Restocking Soon
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Product Details & Rating */}
      <div className="space-y-1 pt-0.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#009B7B]">
            {product?.category || "Superfoods & Honey"}
          </p>

          {/* 5.0 Star Rating Display */}
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-black text-amber-700 border border-amber-200">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{product?.rating || "5.0"}</span>
            <span className="text-[10px] font-normal text-amber-600">
              ({product?.reviewCount || 420})
            </span>
          </div>
        </div>

        <h3
          onClick={() => onQuickView?.(product)}
          className="cursor-pointer text-base font-extrabold leading-snug text-slate-900 transition-colors line-clamp-1 hover:text-[#009B7B]"
        >
          {product?.title || "Gawdee Raw Organic Nutrition Blend"}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product?.description ||
            "Authentic organic harvest with hover autoplay video preview, 18% OFF discount & bestseller certification."}
        </p>
      </div>

      {/* Weight / Size Selector */}
      <div className="space-y-1.5 border-t border-slate-100 pt-2.5">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span>Pack Size:</span>
          <span className="text-[#009B7B] font-extrabold">
            {selectedWeight}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {weights.map((w) => (
            <button
              key={w}
              type="button"
              disabled={isSoldOut}
              onClick={() => setSelectedWeight(w)}
              className={`rounded-xl px-2 py-1.5 text-[11px] font-black transition-all ${
                selectedWeight === w
                  ? "bg-[#009B7B] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              } ${isSoldOut ? "opacity-50 cursor-not-allowed" : "active:scale-95"}`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Price & Add to Cart Action Row */}
      <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-2 pt-1 border-t border-slate-100">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Special Price
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-900">
              $
              {typeof product?.price === "number"
                ? product.price.toFixed(2)
                : product?.price || "32.00"}
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

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            title="Quick View"
            className="rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-slate-600 transition-colors hover:bg-[#009B7B]/10 hover:text-[#009B7B]"
          >
            <Eye className="h-4 w-4" />
          </button>

          {isSoldOut ? (
            <button
              type="button"
              disabled
              className="flex items-center gap-1.5 rounded-xl bg-slate-200 px-4 py-2.5 text-xs font-extrabold text-slate-400 cursor-not-allowed shadow-none"
            >
              <AlertCircle className="h-4 w-4" />
              <span>OUT OF STOCK</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                onAddToCart?.({ ...product, size: selectedWeight })
              }
              className="flex items-center gap-1.5 rounded-xl bg-[#009B7B] px-4.5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-[#009B7B]/25 transition-all hover:scale-105 hover:bg-[#008468] active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
