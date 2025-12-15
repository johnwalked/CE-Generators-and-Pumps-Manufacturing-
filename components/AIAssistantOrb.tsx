import React, { useState } from 'react';
import { MessageSquare, Mic, X, Cog } from 'lucide-react';
import { GeminiAssistant } from './GeminiAssistant';
import { LiveSession } from './LiveSession';
import { ChatMessage } from '../types';

interface AIAssistantOrbProps {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const AIAssistantOrb: React.FC<AIAssistantOrbProps> = ({ chatMessages, setChatMessages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'chat' | 'live'>('live');

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveMode('live'); // Default to live when opening
    }
  };

  return (
    <>
      {/* Full Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-3xl flex flex-col animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header */}
          <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-20 pointer-events-none">
            {/* Logo Area */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/30">
                <Cog className="w-6 h-6 text-blue-400 animate-spin-slow" />
              </div>
              <div className="hidden md:block">
                <h2 className="text-white font-bold tracking-wider">CE ASSISTANT</h2>
                <p className="text-xs text-blue-400 font-mono">AI-POWERED • MULTILINGUAL</p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="pointer-events-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-full p-1 flex gap-1 shadow-2xl">
              <button
                onClick={() => setActiveMode('chat')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeMode === 'chat' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> 
                <span className="hidden sm:inline">Text Chat</span>
              </button>
              <button
                onClick={() => setActiveMode('live')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeMode === 'live' 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Mic className="w-4 h-4" /> 
                <span className="hidden sm:inline">Live Voice</span>
              </button>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full h-full relative">
            {activeMode === 'chat' ? (
              <div className="max-w-4xl mx-auto h-full pt-24 pb-6 px-4">
                 <div className="h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <GeminiAssistant messages={chatMessages} setMessages={setChatMessages} />
                 </div>
              </div>
            ) : (
              <LiveSession />
            )}
          </div>
        </div>
      )}

      {/* Floating Orb Trigger (Only visible when closed) */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="fixed bottom-8 right-8 z-50 group flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-600 to-purple-600 shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:shadow-[0_0_80px_rgba(59,130,246,0.8)] border-2 border-white/30 transition-all duration-500 hover:scale-110 animate-float cursor-pointer"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
            
            {/* Engine Cog */}
            <Cog className="w-10 h-10 text-white drop-shadow-lg group-hover:rotate-90 transition-transform duration-700" strokeWidth={2} />
            
            {/* Call Center Mic Overlay */}
            <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-2 border-4 border-slate-900 shadow-md">
                <Mic className="w-4 h-4 text-white" />
            </div>
          </div>
        </button>
      )}
    </>
  );
};