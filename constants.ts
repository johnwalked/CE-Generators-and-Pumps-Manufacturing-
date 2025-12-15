import { Product } from './types';

export const PRODUCTS: Product[] = [
  // --- Generators ---
  {
    id: 'gen-1',
    name: 'Cummins Silent DG12000S-3',
    brand: 'Cummins',
    type: 'Generator',
    powerKW: 11,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '12 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Air Cooled',
      fuelConsumption: '3.5 L/hr',
      noiseLevel: 'Silent (72dB)',
      dimensions: '1100 x 650 x 850 mm',
      weight: '280 kg'
    },
    description: 'A compact and reliable silent diesel generator. Features a sound-attenuated orange enclosure perfect for small commercial and residential backup power.'
  },
  {
    id: 'gen-7',
    name: 'Yunnei Mini-G 2000',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 2,
    imageUrl: 'https://images.unsplash.com/photo-1590422699849-c9676757b447?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '2.2 kW',
      powerFactor: '1.0',
      phase: 'Single Phase',
      cooling: 'Air Cooled',
      fuelConsumption: '0.9 L/hr',
      noiseLevel: '65dB',
      dimensions: '450 x 380 x 400 mm',
      weight: '38 kg'
    },
    description: 'Ultra-portable 2kW gasoline generator. Lightweight and easy to start, perfect for camping, street stalls, and small home electronics.'
  },
  {
    id: 'gen-3',
    name: 'Yunnei Silent Power YN30',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 30,
    imageUrl: 'https://images.unsplash.com/photo-1590059390238-726433e146c3?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '33 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '7 L/hr',
      noiseLevel: 'Silent (68dB)',
      dimensions: '2100 x 950 x 1200 mm',
      weight: '950 kg'
    },
    description: 'Quiet and efficient 30kW diesel generator powered by Yunnei. Ideal for small offices, clinics, and residential complexes requiring low noise operation.'
  },
  {
    id: 'gen-4',
    name: 'Yuchai YC150 Heavy Duty',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 150,
    imageUrl: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '165 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '35 L/hr',
      noiseLevel: 'Open Type (105dB)',
      dimensions: '2400 x 900 x 1400 mm',
      weight: '1600 kg'
    },
    description: 'Robust open-frame Yuchai generator designed for construction sites and mining operations where durability and ease of maintenance are paramount.'
  },
  {
    id: 'gen-2',
    name: 'Perkins Industrial Power 1100',
    brand: 'Perkins',
    type: 'Generator',
    powerKW: 250,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '275 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Liquid Cooled',
      fuelConsumption: '42 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '2800 x 1100 x 1600 mm',
      weight: '2,200 kg'
    },
    description: 'Heavy-duty open-type generator set driven by a Perkins engine. Engineered for continuous industrial power supply in harsh environments.'
  },
  {
    id: 'gen-5',
    name: 'Cummins PowerBox 800',
    brand: 'Cummins',
    type: 'Generator',
    powerKW: 800,
    imageUrl: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e4201?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '880 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Liquid Cooled',
      fuelConsumption: '190 L/hr',
      noiseLevel: 'Super Silent (75dB)',
      dimensions: '6058 x 2438 x 2591 mm (20ft)',
      weight: '11,000 kg'
    },
    description: 'Containerized high-power generation solution. 800kW prime power with weather-proof, sound-attenuated ISO container housing for large-scale industrial backup.'
  },
  {
    id: 'gen-6',
    name: 'Perkins 4000 Series Mega',
    brand: 'Perkins',
    type: 'Generator',
    powerKW: 2000,
    imageUrl: 'https://images.unsplash.com/photo-1535076249856-9cb3ce8431c4?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '2200 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Radiator Cooled',
      fuelConsumption: '480 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '5800 x 2100 x 2600 mm',
      weight: '16,500 kg'
    },
    description: 'The ultimate power solution. 2000kW standby power driven by the legendary Perkins 4000 series engine. Designed for data centers, hospitals, and grid support.'
  },
  
  // --- Pumps ---
  {
    id: 'pump-3',
    name: 'Yunnei GP50 Portable',
    brand: 'Yunnei',
    type: 'Pump',
    powerKW: 5,
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '5.5 kW',
      powerFactor: '1.0',
      phase: 'Single Phase',
      cooling: 'Air Cooled',
      fuelConsumption: '1.2 L/hr',
      noiseLevel: '70dB',
      dimensions: '500 x 400 x 450 mm',
      weight: '45 kg'
    },
    description: 'Compact and portable gasoline water pump with protective roll cage. Perfect for small scale irrigation and emergency drainage.'
  },
  {
    id: 'pump-2',
    name: 'Yuchai Centrifugal YC-Flow',
    brand: 'Yuchai',
    type: 'Pump',
    powerKW: 30,
    imageUrl: 'https://images.unsplash.com/photo-1531297461136-82lw9z2l3b2a?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '35 kW',
      powerFactor: '0.9',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: 'N/A',
      noiseLevel: 'Standard',
      dimensions: '900 x 500 x 600 mm',
      weight: '180 kg'
    },
    description: 'Robust centrifugal pump head with high efficiency volute design. Ideal for agricultural irrigation and flood control.'
  },
  {
    id: 'pump-1',
    name: 'Weichai Multistage H-Pump',
    brand: 'Weichai',
    type: 'Pump',
    powerKW: 45,
    imageUrl: 'https://images.unsplash.com/photo-1615818451558-860882e3428f?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '50 kW',
      powerFactor: '0.85',
      phase: '3 Phase',
      cooling: 'Fan Cooled',
      fuelConsumption: 'N/A (Electric)',
      noiseLevel: 'Low Noise',
      dimensions: '1800 x 600 x 800 mm',
      weight: '450 kg'
    },
    description: 'High-pressure horizontal multistage pump suitable for long-distance water transport, irrigation, and industrial boosting applications.'
  },
  {
    id: 'pump-4',
    name: 'Weichai XF-150 Fire Pump',
    brand: 'Weichai',
    type: 'Pump',
    powerKW: 110,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b95d646285?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '120 kW',
      powerFactor: 'N/A (Diesel)',
      phase: 'N/A',
      cooling: 'Heat Exchanger',
      fuelConsumption: '25 L/hr',
      noiseLevel: 'Standard',
      dimensions: '2000 x 800 x 1000 mm',
      weight: '850 kg'
    },
    description: 'Specialized diesel engine fire fighting pump set. Compliant with safety regulations, offering immediate high-pressure water response for building safety.'
  },
  {
    id: 'pump-5',
    name: 'Yuchai Agri-Master Pump',
    brand: 'Yuchai',
    type: 'Pump',
    powerKW: 200,
    imageUrl: 'https://images.unsplash.com/photo-1562259920-47afc305f369?q=80&w=800&auto=format&fit=crop',
    specs: {
      maxPower: '220 kW',
      powerFactor: '0.85',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: 'N/A (Electric)',
      noiseLevel: 'Standard',
      dimensions: '2500 x 1200 x 1500 mm',
      weight: '2100 kg'
    },
    description: 'Massive capacity split-case irrigation pump driven by a Yuchai motor. Capable of moving large volumes of water for plantation irrigation and flood management.'
  }
];

export const SYSTEM_INSTRUCTION = `
You are an expert sales engineer for "CE Generator and Pump".
We sell generators (Yuchai, Weichai, Yunnei, Cummins, Perkins) and pumps ranging from 2kW to 2000kW.
Your goal is to assist customers in choosing the right equipment.
You speak English, Amharic, Chinese (Mandarin), Tigrinya (Tigregna), and Afaan Oromoo (Oromifa) fluently.
When asked about specific products, provide detailed technical use cases.
Be professional, technical, yet accessible.
If asked about prices or recent market trends, use your search tools.
`;