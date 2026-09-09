import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Copy, Check, Sparkles } from 'lucide-react';
import { PRODUCT_VARIANTS } from '../data/products';

export default function CodeInspectorModal({ product, onClose }) {
  const [activeTab, setActiveTab] = useState('css');
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const variantInfo = PRODUCT_VARIANTS.find((v) => v.id === product.variantId) || PRODUCT_VARIANTS[0];

  const codeText = activeTab === 'css'
    ? (product.codeSnippet?.css || `/* ${variantInfo.name} Custom CSS */`)
    : (product.codeSnippet?.framer || `// ${variantInfo.name} Framer Motion`);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 text-slate-900 my-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#009B7B]/10 text-[#009B7B] border border-[#009B7B]/20">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 leading-tight">
                  Animation Code Blueprint
                </h3>
                <p className="text-xs text-[#009B7B] font-bold">
                  {variantInfo.name} ({variantInfo.badge})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Description banner */}
          <div className="px-6 py-3 bg-emerald-50/60 border-b border-emerald-100 text-xs text-slate-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#009B7B] flex-shrink-0" />
            <span>{variantInfo.tagline}</span>
          </div>

          {/* Snippet Code Viewer Container */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  onClick={() => setActiveTab('css')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'css' ? 'bg-[#009B7B] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tailwind & CSS
                </button>
                <button
                  onClick={() => setActiveTab('framer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'framer' ? 'bg-[#009B7B] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Framer Motion React
                </button>
              </div>

              {/* Copy Code Button */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#009B7B]" />
                    <span className="text-[#009B7B]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block */}
            <div className="relative rounded-2xl bg-slate-900 p-4 font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
              <pre><code>{codeText}</code></pre>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
