import React, { memo } from 'react';
import { Tab } from '../types';
import { Zap, Palette, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

// Optimization: Memoize Layout to prevent re-renders when internal child state changes
export const Layout: React.FC<LayoutProps> = memo(({ children, activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: Tab.PRODUCTS, label: 'Products', icon: Zap },
    { id: Tab.STUDIO, label: 'Design Studio', icon: Palette },
  ];

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-blue-500/30">
      {/* 
        Optimization: 
        1. transform: translate3d(0,0,0) promotes this layer to the GPU.
        2. will-change hints browsers to optimize for transform changes.
      */}
      <div 
        className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none"
        style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
      >
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse will-change-transform"></div>
        <div className="absolute top-[40%] right-[-20%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[80px] will-change-transform"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] will-change-transform"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-900/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-500/80 to-cyan-400/80 p-2 rounded-lg backdrop-blur-sm shadow-lg shadow-blue-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-wide drop-shadow-sm">
              CE <span className="font-light">Generator & Pump</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10 backdrop-blur-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900/90 backdrop-blur-2xl border-b border-white/5 p-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
             {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-600/30 text-blue-100 border border-blue-500/30'
                    : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
});