import React, { useState } from 'react';
import { generateImage, editImage } from '../services/geminiService';
import { Wand2, ImagePlus, Download, RefreshCw, Eraser } from 'lucide-react';

export const ImageStudio: React.FC = () => {
  const [mode, setMode] = useState<'generate' | 'edit'>('generate');
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Generation Options
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  
  // Editing Options
  const [sourceImageForEdit, setSourceImageForEdit] = useState<string | null>(null);

  const handleAction = async () => {
    if (!prompt) return;
    setLoading(true);
    setResultImage(null);
    setError(null);

    try {
      let result = '';
      if (mode === 'generate') {
        result = await generateImage(prompt, size);
      } else if (mode === 'edit' && sourceImageForEdit) {
        result = await editImage(sourceImageForEdit, prompt);
      }
      setResultImage(result);
    } catch (e: any) {
      console.error(e);
      // Display meaningful error message to user
      let errorMessage = "Failed to process image.";
      if (typeof e === 'string') {
        errorMessage = e;
      } else if (e.message) {
         // Handle Permission Denied gracefully in UI text
        if (e.message.includes('403') || e.message.includes('PERMISSION_DENIED')) {
          errorMessage = "Permission Denied: Please ensure you have selected a valid API Key with billing enabled for High Quality generation.";
        } else {
          errorMessage = e.message;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => setSourceImageForEdit(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Controls */}
      <div className="lg:col-span-1 bg-slate-900/30 border border-white/10 rounded-xl p-6 backdrop-blur-xl shadow-lg">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Wand2 className="text-purple-400" /> Design Studio
        </h2>

        <div className="flex bg-black/20 rounded-lg p-1 mb-6 border border-white/5">
          <button 
            onClick={() => { setMode('generate'); setError(null); }} 
            className={`flex-1 py-2 text-sm rounded transition-all ${mode === 'generate' ? 'bg-purple-600/80 text-white shadow-lg backdrop-blur-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Generate
          </button>
          <button 
             onClick={() => { setMode('edit'); setError(null); }} 
             className={`flex-1 py-2 text-sm rounded transition-all ${mode === 'edit' ? 'bg-purple-600/80 text-white shadow-lg backdrop-blur-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Edit
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={mode === 'generate' ? "A futuristic silent generator..." : "Remove the background..."}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/10 h-32 resize-none transition-all"
            />
          </div>

          {mode === 'generate' && (
             <div>
               <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Size (Pro)</label>
               <select value={size} onChange={(e: any) => setSize(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-purple-500/50">
                 <option value="1K" className="bg-slate-900">1K (Standard)</option>
                 <option value="2K" className="bg-slate-900">2K (High Res)</option>
                 <option value="4K" className="bg-slate-900">4K (Ultra)</option>
               </select>
               {size !== '1K' && <p className="text-[10px] text-purple-300 mt-1">* Requires billed API key</p>}
             </div>
          )}

          {mode === 'edit' && (
            <div>
               <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Source Image</label>
               <label className="block w-full border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-lg p-4 text-center cursor-pointer transition-colors bg-white/5 hover:bg-white/10">
                 <input type="file" className="hidden" accept="image/*" onChange={handleEditUpload} />
                 {sourceImageForEdit ? (
                    <img src={sourceImageForEdit} className="h-20 mx-auto object-contain rounded-md" alt="source" />
                 ) : (
                   <div className="text-slate-400 text-sm">
                     <ImagePlus className="w-6 h-6 mx-auto mb-2 opacity-60" />
                     Click to Upload
                   </div>
                 )}
               </label>
            </div>
          )}

          <button
            onClick={handleAction}
            disabled={loading || !prompt || (mode === 'edit' && !sourceImageForEdit)}
            className="w-full bg-purple-600/80 hover:bg-purple-500/80 backdrop-blur-sm border border-purple-400/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            {mode === 'generate' ? 'Generate Image' : 'Apply Edits'}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:col-span-2 bg-slate-900/30 border border-white/10 rounded-xl flex items-center justify-center p-8 relative overflow-hidden backdrop-blur-xl shadow-lg">
         {loading && (
           <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
             <div className="text-center">
               <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
               <p className="text-purple-300 animate-pulse font-light tracking-widest uppercase text-sm">Designing...</p>
             </div>
           </div>
         )}
         
         {error ? (
           <div className="text-center max-w-md p-6 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-md">
             <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
               <Wand2 className="w-8 h-8 text-red-400" />
             </div>
             <h3 className="text-red-200 font-bold mb-2">Generation Failed</h3>
             <p className="text-red-300/80 text-sm leading-relaxed">{error}</p>
           </div>
         ) : resultImage ? (
           <div className="relative group max-h-full">
             <img src={resultImage} alt="Result" className="max-w-full max-h-[70vh] rounded-lg shadow-2xl border border-white/10" />
             <a 
               href={resultImage} 
               download="generated-design.png"
               className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-white/10"
             >
               <Download className="w-5 h-5" />
             </a>
           </div>
         ) : (
           <div className="text-center text-slate-500">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-inner">
                {mode === 'generate' ? <ImagePlus className="w-10 h-10 opacity-40" /> : <Eraser className="w-10 h-10 opacity-40" />}
             </div>
             <p className="text-lg font-light text-slate-400">Result will appear here</p>
           </div>
         )}
      </div>
    </div>
  );
};