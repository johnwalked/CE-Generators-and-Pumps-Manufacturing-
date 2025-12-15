import React from 'react';
import { Product } from '../types';
import { X, CheckCircle, Zap, Box, Wind, Droplets, Volume2, Maximize2, ImageOff } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content - Transparent Glass */}
      <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row ring-1 ring-white/5">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-white/10 backdrop-blur-md rounded-full transition-colors border border-white/5"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black/20 flex items-center justify-center overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
            className="w-full h-full object-cover"
          />
           <div className="hidden flex flex-col items-center text-slate-500">
              <ImageOff className="w-12 h-12 mb-2" />
              <span className="text-sm">Image Unavailable</span>
           </div>
           
           {/* Gradients to blend image into glass */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent md:bg-gradient-to-r pointer-events-none"></div>
          
          <div className="absolute bottom-4 left-4 pointer-events-none drop-shadow-md">
            <h2 className="text-3xl font-bold text-white mb-1">{product.name}</h2>
            <div className="inline-block bg-blue-600/80 backdrop-blur-md text-white text-sm font-bold px-3 py-1 rounded-full border border-blue-400/20">
              {product.brand}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2 border-b border-white/10 pb-2">Description</h3>
            <p className="text-slate-200 leading-relaxed text-sm font-light">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-3 border-b border-white/10 pb-2">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <SpecItem icon={Zap} label="Max Power" value={product.specs.maxPower} />
              <SpecItem icon={CheckCircle} label="Power Factor" value={product.specs.powerFactor} />
              <SpecItem icon={Wind} label="Cooling" value={product.specs.cooling} />
              <SpecItem icon={Droplets} label="Fuel Cons." value={product.specs.fuelConsumption} />
              <SpecItem icon={Volume2} label="Noise" value={product.specs.noiseLevel} />
              <SpecItem icon={Box} label="Phase" value={product.specs.phase} />
              <SpecItem icon={Maximize2} label="Dimensions" value={product.specs.dimensions} />
              <SpecItem icon={Box} label="Weight" value={product.specs.weight} />
            </div>
          </div>
          
          <div className="pt-4">
             <button className="w-full bg-blue-600/80 hover:bg-blue-500/80 backdrop-blur-sm border border-blue-400/20 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/20">
               Request Quote
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex flex-col gap-1 p-2 rounded bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
    <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider">
      <Icon className="w-3 h-3 text-blue-400/70" />
      {label}
    </div>
    <div className="text-sm font-medium text-slate-200">
      {value}
    </div>
  </div>
);