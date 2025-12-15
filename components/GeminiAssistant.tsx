import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Image as ImageIcon, Video, Search, BrainCircuit, Loader2 } from 'lucide-react';

interface GeminiAssistantProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{data: string, mimeType: string} | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'image') {
          const base64 = result.split(',')[1];
          setSelectedImage(base64);
          setSelectedVideo(null);
        } else {
          const base64 = result.split(',')[1];
          setSelectedVideo({ data: base64, mimeType: file.type });
          setSelectedImage(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage && !selectedVideo) || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      images: selectedImage ? [selectedImage] : undefined,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const apiHistory = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }] 
    }));

    const response = await sendMessage(
      apiHistory,
      userMsg.text,
      selectedImage ? [selectedImage] : [],
      selectedVideo,
      { useThinking, useSearch }
    );

    setMessages(prev => [...prev, {
      role: 'model',
      text: response.text,
      groundingUrls: response.groundingChunks?.map((c: any) => c.web ? c.web : null).filter(Boolean)
    }]);

    setLoading(false);
    setSelectedImage(null);
    setSelectedVideo(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/50 overflow-hidden relative">
      
      {/* Toolbar */}
      <div className="bg-white/5 backdrop-blur-sm p-3 flex items-center justify-between border-b border-white/10 shrink-0">
        <h3 className="text-xs font-medium text-slate-300">Gemini 3 Pro</h3>
        <div className="flex gap-2">
           <label className={`flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full cursor-pointer transition-colors border border-transparent ${useSearch ? 'bg-blue-600/80 text-white border-blue-400/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
            <input type="checkbox" className="hidden" checked={useSearch} onChange={(e) => {
              setUseSearch(e.target.checked);
              if(e.target.checked) setUseThinking(false);
            }} />
            <Search className="w-3 h-3" /> Search
          </label>
          
          <label className={`flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full cursor-pointer transition-colors border border-transparent ${useThinking ? 'bg-purple-600/80 text-white border-purple-400/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
            <input type="checkbox" className="hidden" checked={useThinking} onChange={(e) => {
              setUseThinking(e.target.checked);
              if(e.target.checked) setUseSearch(false);
            }} />
            <BrainCircuit className="w-3 h-3" /> Think
          </label>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 backdrop-blur-md shadow-lg text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600/60 text-white border border-blue-400/20' 
                : 'bg-white/10 text-slate-200 border border-white/5'
            }`}>
              {msg.images && (
                <img src={`data:image/jpeg;base64,${msg.images[0]}`} className="w-full h-auto rounded-lg mb-2 border border-white/20" alt="uploaded" />
              )}
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
              
              {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/10 text-[10px]">
                  <p className="font-semibold mb-1 text-slate-400">Sources:</p>
                  <ul className="space-y-1">
                    {msg.groundingUrls.map((url, idx) => (
                      <li key={idx}>
                        <a href={url.uri} target="_blank" rel="noreferrer" className="text-blue-300 hover:underline truncate block hover:text-blue-200">
                          {url.title || url.uri}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-2 text-slate-400 backdrop-blur-sm border border-white/5 text-xs">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span className="">{useThinking ? 'Thinking...' : 'Typing...'}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-black/20 backdrop-blur-md border-t border-white/10 shrink-0">
        {(selectedImage || selectedVideo) && (
           <div className="mb-2 flex items-center gap-2 bg-white/10 p-1.5 rounded-lg w-fit backdrop-blur-sm">
              <span className="text-[10px] text-slate-300">Media attached</span>
              <button onClick={() => {setSelectedImage(null); setSelectedVideo(null)}} className="text-slate-400 hover:text-white"><span className="text-xs font-bold">×</span></button>
           </div>
        )}
        <div className="flex items-center gap-2">
          <label className="p-2 text-slate-400 hover:text-blue-400 cursor-pointer bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
            <ImageIcon className="w-4 h-4" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelect(e, 'image')} />
          </label>
          <label className="p-2 text-slate-400 hover:text-purple-400 cursor-pointer bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
            <Video className="w-4 h-4" />
            <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileSelect(e, 'video')} />
          </label>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
          />
          
          <button
            onClick={handleSend}
            disabled={loading || (!input && !selectedImage && !selectedVideo)}
            className="p-2 bg-blue-600/80 hover:bg-blue-500/80 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-lg shadow-blue-900/20 backdrop-blur-sm border border-blue-400/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};