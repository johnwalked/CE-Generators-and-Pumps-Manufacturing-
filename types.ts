export interface Product {
  id: string;
  name: string;
  brand: 'Yuchai' | 'Weichai' | 'Yunnei' | 'Cummins' | 'Perkins' | 'Other';
  type: 'Generator' | 'Pump';
  powerKW: number;
  imageUrl: string;
  specs: {
    maxPower: string;
    powerFactor: string;
    phase: string;
    cooling: string;
    fuelConsumption: string;
    noiseLevel: string; // Open vs Silent
    dimensions: string;
    weight: string;
  };
  description: string;
}

export enum Tab {
  PRODUCTS = 'products',
  STUDIO = 'studio', // Image Gen & Edit
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  images?: string[]; // base64
  isThinking?: boolean;
  groundingUrls?: Array<{title: string, uri: string}>;
}

export interface ImageGenerationConfig {
  resolution: '1K' | '2K' | '4K';
  aspectRatio: '1:1' | '16:9' | '4:3';
}