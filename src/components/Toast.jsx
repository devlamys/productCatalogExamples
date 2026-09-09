import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag, Heart, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isCart = toast.type === 'cart';

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-2xl backdrop-blur-xl"
        >
          <div className={`p-2 rounded-xl text-white ${isCart ? 'bg-emerald-500' : 'bg-rose-500'}`}>
            {isCart ? <ShoppingBag className="w-4 h-4" /> : <Heart className="w-4 h-4 fill-current" />}
          </div>

          <div>
            <h4 className="font-bold text-xs text-white">{toast.title}</h4>
            <p className="text-[11px] text-slate-300">{toast.message}</p>
          </div>

          <button
            onClick={onClose}
            className="ml-2 p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
