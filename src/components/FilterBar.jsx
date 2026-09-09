import React from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, Grid2X2, LayoutList } from 'lucide-react';
import { PRODUCT_VARIANTS } from '../data/products';

export default function FilterBar({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  gridCols,
  setGridCols,
}) {
  const filterCategories = [
    { id: 'all', label: 'All Showcase Variants' },
    { id: 'Original Gawdee Cards', label: '🌿 Original Gawdee Cards' },
    ...PRODUCT_VARIANTS
      .filter(
        (v) =>
          v.id !== 'variant-ag-multiverse' &&
          v.id !== 'variant-original-showcase' &&
          v.category !== 'Antigravity Sneakers'
      )
      .map((v) => ({ id: v.shortLabel, label: v.shortLabel })),
    { id: 'Antigravity Sneakers', label: '⚡ Antigravity 3x3 Grid' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 space-y-4">
      {/* Top Bar: Category Pills & Search & Grid Layout Selector */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
        {/* Scrollable Filter Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-[#009B7B] rounded-xl shadow-md shadow-[#009B7B]/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Tools: Search input & Grid Density Selector */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Search Box */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#009B7B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Aero-Stride, Antigravity..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-[#009B7B] focus:ring-2 focus:ring-[#009B7B]/20 focus:outline-none transition-all"
            />
          </div>

          {/* Grid Columns Switcher */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                gridCols === 2 ? 'bg-[#009B7B] text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="2 Columns View"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                gridCols === 3 ? 'bg-[#009B7B] text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="3 Columns View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                gridCols === 4 ? 'bg-[#009B7B] text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="4 Compact Columns View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
