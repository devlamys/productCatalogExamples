import React from 'react';
import { PRODUCTS } from '../data/products';
import { Sparkles, Code } from 'lucide-react';

export default function ComparisonView({ onInspectCode, onQuickView }) {
  const comparisonData = [
    {
      variantId: 'variant-w',
      name: 'Variant W: Certification Orbit Reveal',
      bestFor: 'Full Moon Cultured Ghee & Premium Dairy',
      hoverTrigger: 'Textured golden ghee background morphs on hover to clean white with floating organic seals & orbit lines',
      performance: 'Framer Motion Orbit Seals',
      complexity: 'High E-Commerce Value',
    },
    {
      variantId: 'variant-a',
      name: 'Variant A: Asymmetric Hero Capsule',
      bestFor: 'Organic Ghee & Dairy Products',
      hoverTrigger: 'Smooth opacity swap inside round capsule viewport',
      performance: '60 FPS CSS Hardware',
      complexity: 'Low / Standard',
    },
    {
      variantId: 'variant-b',
      name: 'Variant B: Neo-Brutalist Organic Card',
      bestFor: 'Raw Wild Honey & Superfood Jars',
      hoverTrigger: 'Hard offset black & Gawdee teal block shadow transform',
      performance: 'Neo-Brutalist Shadow',
      complexity: 'Medium',
    },
    {
      variantId: 'variant-c',
      name: 'Variant C: Vintage Ticket Coupon Stub',
      bestFor: 'Organic Moringa & Herbal Leaf Powders',
      hoverTrigger: 'Ken Burns pan/scale + ticket stub coupon tear CTA',
      performance: 'Dashed Ticket Border',
      complexity: 'Low',
    },
    {
      variantId: 'variant-d',
      name: 'Variant D: Multi-Flavor Swatches',
      bestFor: 'Herbal Elixir Drink Mixes (Elaichi, Choco, Turmeric)',
      hoverTrigger: 'Instant image swap on hovering flavor swatches',
      performance: 'AnimatePresence Morph',
      complexity: 'Low / High Conversion',
    },
    {
      variantId: 'variant-e',
      name: 'Variant E: Bottom Glass Drawer',
      bestFor: 'Organic Burra Sugar & Pack Sizes (250g, 500g, 1kg)',
      hoverTrigger: 'Frosted glassmorphism drawer slide-up with weight CTAs',
      performance: 'Spring Damping Drawer',
      complexity: 'Medium',
    },
    {
      variantId: 'variant-f',
      name: 'Variant F: Split Diagonal Mask',
      bestFor: 'Khandsari Sugar & Crystal Texture Close-ups',
      hoverTrigger: 'CSS Clip-Path diagonal reveal sweep',
      performance: 'GPU Clip-Path Masking',
      complexity: 'Advanced CSS',
    },
    {
      variantId: 'variant-g',
      name: 'Variant G: Interactive Lens Zoom',
      bestFor: 'Taral Drops & Concentrated Botanical Extracts',
      hoverTrigger: '2.5x Magnifying lens tracking cursor position',
      performance: 'Real-time Canvas / Background-Pos',
      complexity: 'Advanced',
    },
    {
      variantId: 'variant-h',
      name: 'Variant H: Holographic Organic Glow',
      bestFor: 'Kashmiri Royal Saffron & Premium Vitality',
      hoverTrigger: 'Gawdee emerald gradient border animation + ambient glow',
      performance: 'CSS Keyframe Gradient',
      complexity: 'High Aesthetic Impact',
    },
    {
      variantId: 'variant-i',
      name: 'Variant I: 3D Double-Sided Card Flip',
      bestFor: 'Vedic A2 Ghee & Ceramic Crock Reserve',
      hoverTrigger: '3D 180° Y-axis card flip revealing full nutritional facts',
      performance: '3D CSS Backface Visibility',
      complexity: 'High Interactivity',
    },
    {
      variantId: 'variant-j',
      name: 'Variant J: Split Venetian Curtain Reveal',
      bestFor: 'Wild Multi-Flora Honey & Forest Blossom Origin',
      hoverTrigger: 'Twin image shutters slide open from center',
      performance: 'Dual-Shutter Motion Shift',
      complexity: 'Medium',
    },
    {
      variantId: 'variant-k',
      name: 'Variant K: Wide Landscape Banner',
      bestFor: 'Organic Grand Harvest Gift Hamper Sets',
      hoverTrigger: 'Dual-column landscape card with parallax image zoom',
      performance: 'Responsive Dual Column',
      complexity: 'High Layout Value',
    },
    {
      variantId: 'variant-l',
      name: 'Variant L: Floating Glass Morph & Pulse',
      bestFor: 'Immunity Booster Drops & Cold Pressed Kits',
      hoverTrigger: 'Expanding emerald ripple pulse aura rings',
      performance: 'Framer Keyframe Pulse',
      complexity: 'Modern Glass UI',
    },
    {
      variantId: 'variant-m',
      name: 'Variant M: Spatial UI Vision Float',
      bestFor: 'Luxury Spatial Organic Reserve Jars',
      hoverTrigger: 'Multi-layer spatial depth float at Z-depth 20px-50px',
      performance: 'Spatial 3D Transform',
      complexity: 'Cutting-edge Spatial',
    },
    {
      variantId: 'variant-n',
      name: 'Variant N: 3D Turntable Spinner',
      bestFor: '360° Rotational Jar Showcase',
      hoverTrigger: 'Continuous 360° product rotation on metallic turntable stage',
      performance: 'Continuous 3D Loop',
      complexity: 'High Visual Appeal',
    },
    {
      variantId: 'variant-o',
      name: 'Variant O: Directional Light & Shadow',
      bestFor: 'Organic Leaf Powders & Superfood Bags',
      hoverTrigger: 'Dynamic box-shadow offset tracking real-time cursor light',
      performance: 'Real-time Shadow Offset',
      complexity: 'Medium',
    },
    {
      variantId: 'variant-p',
      name: 'Variant P: Laser Beam Scanner',
      bestFor: 'Khandsari Crystal Sugar Quality Audits',
      hoverTrigger: 'Glowing emerald laser scan line sweeps vertically',
      performance: 'CSS Scanline Keyframes',
      complexity: 'Futuristic',
    },
    {
      variantId: 'variant-q',
      name: 'Variant Q: Inline Multi-Tab Switcher',
      bestFor: 'Adaptogenic Drink Mixes with Detailed Specs',
      hoverTrigger: 'Interactive tabs (Overview, Specs, Origin) inside card',
      performance: 'Tab AnimatePresence',
      complexity: 'Rich Product Info',
    },
    {
      variantId: 'variant-r',
      name: 'Variant R: Liquid Ripple Wave Glass',
      bestFor: 'Botanical Liquid Drops & Concentrates',
      hoverTrigger: 'Expanding fluid liquid ripple rings radiating from hover',
      performance: 'Fluid Scale Ring Pulse',
      complexity: 'Organic Fluid UI',
    },
    {
      variantId: 'variant-s',
      name: 'Variant S: 3D Continuous Autoplay Video',
      bestFor: 'Bilona Ghee Live Churning Stream',
      hoverTrigger: 'Continuous looping HD video stream with 3D tilt & audio mute toggle',
      performance: 'HTML5 Video Hardware Acceleration',
      complexity: '3D Video Stage',
    },
    {
      variantId: 'variant-t',
      name: 'Variant T: Hover Autoplay Video Reveal',
      bestFor: 'Wild Forest Honey Harvest Motion',
      hoverTrigger: 'Static poster image by default; plays HD video clip on cursor hover',
      performance: 'Dynamic Video Play/Pause',
      complexity: 'High Conversion',
    },
    {
      variantId: 'variant-u',
      name: 'Variant U: Cinematic 3D Glass Video Portal',
      bestFor: 'Organic Leaf Micro-Nutrient Farm Stories',
      hoverTrigger: 'Curved 3D glass viewport portal with audio controls & video loop',
      performance: 'Curved Glass Portal Stream',
      complexity: 'Cinematic Spatial',
    },
    {
      variantId: 'variant-v',
      name: 'Variant V: Spatial 3D Parallax Video',
      bestFor: 'Herbal Elixir Blend Parallax Showcase',
      hoverTrigger: 'Background video loop with floating 3D product elements at Z-depth 40px',
      performance: 'Multi-layer Parallax Video',
      complexity: 'Spatial Video',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#009B7B]" />
              <span>Gawdee Animation Matrix (23 Custom Variants)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Architectural summary comparing UX characteristics, performance overhead, and recommended organic product categories.
            </p>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 rounded-l-xl">Variant & Product</th>
                <th className="py-3.5 px-4">Recommended Category</th>
                <th className="py-3.5 px-4">Hover Transition Trigger</th>
                <th className="py-3.5 px-4">Implementation Specs</th>
                <th className="py-3.5 px-4 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {comparisonData.map((item, idx) => {
                const sampleProd = PRODUCTS.find((p) => p.variantId === item.variantId) || PRODUCTS[0];
                return (
                  <tr key={idx} className="hover:bg-[#009B7B]/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={sampleProd.images.primary}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shadow-sm"
                        />
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#009B7B] font-semibold">
                            {sampleProd.title}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {item.bestFor}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-[#009B7B] font-semibold max-w-xs">
                      {item.hoverTrigger}
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-[#009B7B] font-bold text-[10px]">
                          {item.performance}
                        </span>
                        <div className="text-[10px] text-slate-400">Complexity: {item.complexity}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onInspectCode(sampleProd)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#009B7B]/10 text-[#009B7B] hover:bg-[#009B7B] hover:text-white font-bold transition-all"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
