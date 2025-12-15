import React, { useState, memo } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { ProductModal } from './ProductModal';
import { Info, Battery, Activity, ImageOff } from 'lucide-react';

// Optimization: Memoize the list component as it re-renders often during parent updates but its data is static
export const ProductList: React.FC = memo(() => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<'All' | 'Generator' | 'Pump'>('All');

  const filteredProducts = PRODUCTS.filter(
    p => filter === 'All' || p.type === filter
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-white drop-shadow-lg">Our Inventory</h2>
        <div className="flex bg-slate-900/30 backdrop-blur-md rounded-lg p-1 border border-white/5">
          {['All', 'Generator', 'Pump'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-md text-sm transition-all duration-200 ${
                filter === f 
                  ? 'bg-blue-500/60 text-white shadow-lg backdrop-blur-sm border border-white/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group relative bg-slate-900/20 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-blue-400/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transform hover:-translate-y-1"
          >
            <div className="aspect-video w-full overflow-hidden bg-black/20 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy" // Optimization: Lazy load images
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="hidden flex flex-col items-center text-slate-500">
                <ImageOff className="w-8 h-8 mb-2" />
                <span className="text-xs">Image Unavailable</span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors shadow-black drop-shadow-md">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-400">{product.brand}</p>
                </div>
                <span className="bg-white/5 backdrop-blur-sm text-xs px-2 py-1 rounded border border-white/5 text-slate-300">
                  {product.powerKW} kW
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mt-2">
                <div className="flex items-center gap-1.5">
                  <Battery className="w-3 h-3 text-blue-400/70" />
                  {product.specs.phase}
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-blue-400/70" />
                  {product.specs.cooling}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-sm text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                View Details <Info className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
});