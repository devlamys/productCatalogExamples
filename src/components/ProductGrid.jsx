import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VariantA_Crossfade from './cards/VariantA_Crossfade';
import VariantB_Tilt3D from './cards/VariantB_Tilt3D';
import VariantC_KenBurns from './cards/VariantC_KenBurns';
import VariantD_ColorSwatch from './cards/VariantD_ColorSwatch';
import VariantE_BottomDrawer from './cards/VariantE_BottomDrawer';
import VariantF_DiagonalMask from './cards/VariantF_DiagonalMask';
import VariantG_LensZoom from './cards/VariantG_LensZoom';
import VariantH_Holographic from './cards/VariantH_Holographic';
import VariantI_CardFlip from './cards/VariantI_CardFlip';
import VariantJ_CurtainReveal from './cards/VariantJ_CurtainReveal';
import VariantK_LandscapeBanner from './cards/VariantK_LandscapeBanner';
import VariantL_GlassMorphPulse from './cards/VariantL_GlassMorphPulse';
import VariantM_SpatialUI from './cards/VariantM_SpatialUI';
import VariantN_Turntable3D from './cards/VariantN_Turntable3D';
import VariantO_CastingShadow from './cards/VariantO_CastingShadow';
import VariantP_LaserScanner from './cards/VariantP_LaserScanner';
import VariantQ_InlineTabs from './cards/VariantQ_InlineTabs';
import VariantR_LiquidRipple from './cards/VariantR_LiquidRipple';
import VariantS_3DVideoAutoplay from './cards/VariantS_3DVideoAutoplay';
import VariantT_3DVideoHoverPlay from './cards/VariantT_3DVideoHoverPlay';
import VariantU_3DVideoMorphPortal from './cards/VariantU_3DVideoMorphPortal';
import VariantV_3DVideoParallaxStage from './cards/VariantV_3DVideoParallaxStage';
import VariantW_TwoBrothersStyle from './cards/VariantW_TwoBrothersStyle';
import VariantX_GheeTapSwap from './cards/VariantX_GheeTapSwap';
import VariantY_VideoHoverShowcase from './cards/VariantY_VideoHoverShowcase';
import VariantAG_MonolithDrop from './cards/VariantAG_MonolithDrop';
import VariantAG_GlareTilt from './cards/VariantAG_GlareTilt';
import VariantAG_OrbitalSwatch from './cards/VariantAG_OrbitalSwatch';
import VariantAG_AtmosphericSplit from './cards/VariantAG_AtmosphericSplit';
import VariantAG_EtherealReveal from './cards/VariantAG_EtherealReveal';
import VariantAG_FrostedDrawer from './cards/VariantAG_FrostedDrawer';
import VariantAG_GravityPulse from './cards/VariantAG_GravityPulse';
import VariantAG_HoloPrism from './cards/VariantAG_HoloPrism';
import VariantAG_QuantumLevitator from './cards/VariantAG_QuantumLevitator';
import Variant_OriginalShowcase from './cards/Variant_OriginalShowcase';
import Variant_OriginalShowcase2 from './cards/Variant_OriginalShowcase2';
import { HelpCircle } from 'lucide-react';

export default function ProductGrid({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onInspectCode,
  speed,
  tiltIntensity,
  zoomScale,
  gridCols = 3,
}) {
  const getCardComponent = (variantId) => {
    switch (variantId) {
      case 'variant-original-showcase':
        return Variant_OriginalShowcase;
      case 'variant-original-showcase-2':
        return Variant_OriginalShowcase2;
      case 'variant-ag-1':
        return VariantAG_MonolithDrop;
      case 'variant-ag-2':
        return VariantAG_GlareTilt;
      case 'variant-ag-3':
        return VariantAG_OrbitalSwatch;
      case 'variant-ag-4':
        return VariantAG_AtmosphericSplit;
      case 'variant-ag-5':
        return VariantAG_EtherealReveal;
      case 'variant-ag-6':
        return VariantAG_FrostedDrawer;
      case 'variant-ag-7':
        return VariantAG_GravityPulse;
      case 'variant-ag-8':
        return VariantAG_HoloPrism;
      case 'variant-ag-9':
        return VariantAG_QuantumLevitator;
      case 'variant-a':
        return VariantA_Crossfade;
      case 'variant-b':
        return VariantB_Tilt3D;
      case 'variant-c':
        return VariantC_KenBurns;
      case 'variant-d':
        return VariantD_ColorSwatch;
      case 'variant-e':
        return VariantE_BottomDrawer;
      case 'variant-f':
        return VariantF_DiagonalMask;
      case 'variant-g':
        return VariantG_LensZoom;
      case 'variant-h':
        return VariantH_Holographic;
      case 'variant-i':
        return VariantI_CardFlip;
      case 'variant-j':
        return VariantJ_CurtainReveal;
      case 'variant-k':
        return VariantK_LandscapeBanner;
      case 'variant-l':
        return VariantL_GlassMorphPulse;
      case 'variant-m':
        return VariantM_SpatialUI;
      case 'variant-n':
        return VariantN_Turntable3D;
      case 'variant-o':
        return VariantO_CastingShadow;
      case 'variant-p':
        return VariantP_LaserScanner;
      case 'variant-q':
        return VariantQ_InlineTabs;
      case 'variant-r':
        return VariantR_LiquidRipple;
      case 'variant-s':
        return VariantS_3DVideoAutoplay;
      case 'variant-t':
        return VariantT_3DVideoHoverPlay;
      case 'variant-u':
        return VariantU_3DVideoMorphPortal;
      case 'variant-v':
        return VariantV_3DVideoParallaxStage;
      case 'variant-w':
        return VariantW_TwoBrothersStyle;
      case 'variant-x':
        return VariantX_GheeTapSwap;
      case 'variant-y':
        return VariantY_VideoHoverShowcase;
      default:
        return VariantAG_MonolithDrop;
    }
  };

  const getGridClass = () => {
    switch (gridCols) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 3:
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex p-4 rounded-full bg-[#009B7B]/10 text-[#009B7B] mb-3">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No products found</h3>
        <p className="text-xs text-slate-500 mt-1">
          Try clearing your search terms or selecting another animation tab.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <motion.div layout className={`grid ${getGridClass()} gap-6 auto-rows-fr`}>
        <AnimatePresence>
          {products.map((product) => {
            const CardComp = getCardComponent(product.variantId);
            const isWishlisted = wishlist.includes(product.id);

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={product.variantId === 'variant-k' ? 'col-span-1 md:col-span-2' : 'h-full'}
              >
                <CardComp
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={isWishlisted}
                  onInspectCode={onInspectCode}
                  speed={speed}
                  intensity={tiltIntensity}
                  zoomScale={zoomScale}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
