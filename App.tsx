import React, { useState, useMemo } from 'react';
import { Tab, ChatMessage } from './types';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { ImageStudio } from './components/ImageStudio';
import { AIAssistantOrb } from './components/AIAssistantOrb';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PRODUCTS);
  
  // Optimization: Lift chat state so it persists between tab switches/orb toggles
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your AI assistant for CE Generators and Pumps. Ask me anything about our products in English, Amharic, Chinese, Tigrinya, or Oromifa.' }
  ]);

  // Optimization: Memoize the tab content to prevent unnecessary re-renders of inactive components
  const content = useMemo(() => {
    switch (activeTab) {
      case Tab.PRODUCTS:
        return <ProductList />;
      case Tab.STUDIO:
        return <ImageStudio />;
      default:
        return <ProductList />;
    }
  }, [activeTab]);

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <main className="w-full h-full flex flex-col relative">
        {content}
      </main>
      
      {/* Floating Assistant Orb (Persistent Overlay) */}
      <AIAssistantOrb chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </Layout>
  );
}