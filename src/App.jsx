import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ControlPanel from './components/ControlPanel';
import ProductGrid from './components/ProductGrid';
import ComparisonView from './components/ComparisonView';
import QuickViewModal from './components/QuickViewModal';
import CodeInspectorModal from './components/CodeInspectorModal';
import Toast from './components/Toast';
import { PRODUCTS, PRODUCT_VARIANTS } from './data/products';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('grid');
  const [gridCols, setGridCols] = useState(3);
  const [showControls, setShowControls] = useState(false);

  // Live motion tuning sliders state
  const [speed, setSpeed] = useState(0.4);
  const [tiltIntensity, setTiltIntensity] = useState(15);
  const [zoomScale, setZoomScale] = useState(1.15);

  // User interactions state
  const [wishlist, setWishlist] = useState(['prod-1', 'prod-3']);
  const [cartItems, setCartItems] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [codeInspectorProduct, setCodeInspectorProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // Wishlist toggle handler
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const isExist = prev.includes(productId);
      const updated = isExist ? prev.filter((id) => id !== productId) : [...prev, productId];
      
      const prod = PRODUCTS.find((p) => p.id === productId);
      showToast({
        type: 'wishlist',
        title: isExist ? 'Removed from Wishlist' : 'Saved to Wishlist',
        message: `${prod?.title || 'Product'} has been ${isExist ? 'removed from' : 'added to'} your wishlist.`,
      });

      return updated;
    });
  };

  // Add to cart handler with celebration confetti
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {
      // fallback
    }

    showToast({
      type: 'cart',
      title: 'Added to Cart!',
      message: `${product.title} was added to your shopping cart.`,
    });
  };

  const showToast = ({ type, title, message }) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 3500);
  };

  const handleResetControls = () => {
    setSpeed(0.4);
    setTiltIntensity(15);
    setZoomScale(1.15);
  };

  // Filter products by active category & search query
  // Filter products by active category / variant style label & search query
  const filteredProducts = PRODUCTS.filter((product) => {
    const variant = PRODUCT_VARIANTS.find((v) => v.id === product.variantId);
    
    const matchesCategory =
      activeFilter === 'all' ||
      product.category.toLowerCase() === activeFilter.toLowerCase() ||
      product.badge.toLowerCase() === activeFilter.toLowerCase() ||
      (variant && (
        variant.category.toLowerCase() === activeFilter.toLowerCase() ||
        variant.shortLabel.toLowerCase() === activeFilter.toLowerCase() ||
        variant.name.toLowerCase() === activeFilter.toLowerCase() ||
        variant.id.toLowerCase() === activeFilter.toLowerCase()
      ));

    const matchesSearch =
      searchQuery.trim() === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (variant && variant.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (activeFilter === 'all') {
      const isAG_a = a.category === 'Antigravity Sneakers';
      const isAG_b = b.category === 'Antigravity Sneakers';
      if (isAG_a && !isAG_b) return 1;
      if (!isAG_a && isAG_b) return -1;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#f4f8f6] text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartItems.length}
        wishlistCount={wishlist.length}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCart={() => {
          if (cartItems.length > 0) {
            showToast({
              type: 'cart',
              title: 'Cart Contents',
              message: `You currently have ${cartItems.length} item(s) in your cart.`,
            });
          } else {
            showToast({
              type: 'cart',
              title: 'Cart Empty',
              message: 'Click "Add" on any product card variant to test cart additions!',
            });
          }
        }}
        showControls={showControls}
        setShowControls={setShowControls}
      />

      {/* Hero Intro Header */}
      <Hero
        activeCategory={activeFilter}
        setActiveCategory={setActiveFilter}
        totalVariants={PRODUCT_VARIANTS.length}
      />

      {/* Live Tuning Parameters Panel */}
      {showControls && (
        <ControlPanel
          speed={speed}
          setSpeed={setSpeed}
          tiltIntensity={tiltIntensity}
          setTiltIntensity={setTiltIntensity}
          zoomScale={zoomScale}
          setZoomScale={setZoomScale}
          onReset={handleResetControls}
        />
      )}

      {/* Category Filter Tabs & Tools */}
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        gridCols={gridCols}
        setGridCols={setGridCols}
      />

      {/* Main View: Grid vs Matrix Comparison */}
      {activeView === 'grid' ? (
        <ProductGrid
          products={filteredProducts}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          onInspectCode={(p) => setCodeInspectorProduct(p)}
          speed={speed}
          tiltIntensity={tiltIntensity}
          zoomScale={zoomScale}
          gridCols={gridCols}
        />
      ) : (
        <ComparisonView
          onInspectCode={(p) => setCodeInspectorProduct(p)}
          onQuickView={(p) => setQuickViewProduct(p)}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-[#009B7B]/15 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-800">
            Gawdee • The Mother of Organic Nutrition Showcase
          </p>
          <p className="mt-1">
            Built with React, Tailwind CSS v4, Framer Motion & Lucide Icons. Pure organic white theme.
          </p>
        </div>
      </footer>

      {/* Modals & Toasts */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
      />

      <CodeInspectorModal
        product={codeInspectorProduct}
        onClose={() => setCodeInspectorProduct(null)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
