
export interface CarSpec {
  id: string;
  name: string;
  brand: string;
  price: number; // lakhs
  priceDisplay: string; // e.g., "₹7.46 - 13.04 Lakh"
  imageUrl: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  mileage?: string;
  engine?: string;
  safetyRating?: number; // stars
  dataAiHint?: string;
  // Add other relevant specs as needed
}

export const BODY_TYPES = ["SUV", "Hatchback", "Sedan", "MUV", "Luxury", "Minivan", "Pickup Truck", "Coupe", "Convertible"] as const;
export type BodyType = typeof BODY_TYPES[number];

export const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"] as const;
export type FuelType = typeof FUEL_TYPES[number];

export const TRANSMISSIONS = ["Manual", "Automatic"] as const; // Simplified
export type Transmission = typeof TRANSMISSIONS[number];

// Using broad ranges for budget filter as per Cardekho
export const BUDGET_RANGES = [
  { label: "Under 5 Lakh", min: 0, max: 5 },
  { label: "5 - 10 Lakh", min: 5, max: 10 },
  { label: "10 - 15 Lakh", min: 10, max: 15 },
  { label: "15 - 20 Lakh", min: 15, max: 20 },
  { label: "20 - 35 Lakh", min: 20, max: 35 },
  { label: "35 - 50 Lakh", min: 35, max: 50 },
  { label: "50 Lakh - 1 Crore", min: 50, max: 100 },
  { label: "Over 1 Crore", min: 100, max: Infinity },
] as const;
export type BudgetRange = typeof BUDGET_RANGES[number];


export const CARS_DATA: CarSpec[] = [
  {
    id: 'maruti_swift',
    name: 'Maruti Swift',
    brand: 'Maruti Suzuki',
    price: 6.49, // Base price in Lakhs for filtering
    priceDisplay: '₹6.49 - 9.64 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'Hatchback',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '22.38 kmpl',
    engine: '1197 cc',
    dataAiHint: 'maruti swift hatchback',
  },
  {
    id: 'tata_punch',
    name: 'Tata Punch',
    brand: 'Tata',
    price: 6.13,
    priceDisplay: '₹6.13 - 10.20 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '20.09 kmpl',
    engine: '1199 cc',
    safetyRating: 5,
    dataAiHint: 'tata punch suv',
  },
  {
    id: 'hyundai_creta',
    name: 'Hyundai Creta',
    brand: 'Hyundai',
    price: 11.00,
    priceDisplay: '₹11.00 - 20.15 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '17.4 kmpl',
    engine: '1497 cc',
    dataAiHint: 'hyundai creta suv',
  },
  {
    id: 'mahindra_scorpio_n',
    name: 'Mahindra Scorpio N',
    brand: 'Mahindra',
    price: 13.60,
    priceDisplay: '₹13.60 - 24.54 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Diesel',
    transmission: 'Manual',
    mileage: '16.23 kmpl',
    engine: '2198 cc',
    safetyRating: 5,
    dataAiHint: 'mahindra scorpio suv',
  },
  {
    id: 'maruti_fronx',
    name: 'Maruti Fronx',
    brand: 'Maruti Suzuki',
    price: 7.51,
    priceDisplay: '₹7.51 - 13.04 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '21.79 kmpl',
    engine: '1197 cc',
    dataAiHint: 'maruti fronx suv',
  },
  {
    id: 'kia_seltos',
    name: 'Kia Seltos',
    brand: 'Kia',
    price: 10.90,
    priceDisplay: '₹10.90 - 20.35 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: '18.0 kmpl',
    engine: '1493 cc',
    dataAiHint: 'kia seltos suv',
  },
  {
    id: 'tata_nexon',
    name: 'Tata Nexon',
    brand: 'Tata',
    price: 8.15,
    priceDisplay: '₹8.15 - 15.80 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '17.44 kmpl',
    engine: '1199 cc',
    safetyRating: 5,
    dataAiHint: 'tata nexon compact_suv',
  },
  {
    id: 'maruti_ertiga',
    name: 'Maruti Ertiga',
    brand: 'Maruti Suzuki',
    price: 8.69,
    priceDisplay: '₹8.69 - 13.03 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'MUV',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '20.51 kmpl',
    engine: '1462 cc',
    dataAiHint: 'maruti ertiga muv',
  },
  {
    id: 'hyundai_i20',
    name: 'Hyundai i20',
    brand: 'Hyundai',
    price: 7.04,
    priceDisplay: '₹7.04 - 11.21 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'Hatchback',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '20.0 kmpl',
    engine: '1197 cc',
    dataAiHint: 'hyundai i20 hatchback',
  },
  {
    id: 'toyota_innova_crysta',
    name: 'Toyota Innova Crysta',
    brand: 'Toyota',
    price: 19.99,
    priceDisplay: '₹19.99 - 26.30 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'MUV',
    fuelType: 'Diesel',
    transmission: 'Manual',
    mileage: '15.3 kmpl',
    engine: '2393 cc',
    dataAiHint: 'toyota innova muv',
  },
  {
    id: 'maruti_dzire',
    name: 'Maruti Dzire',
    brand: 'Maruti Suzuki',
    price: 6.56,
    priceDisplay: '₹6.56 - 9.39 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '22.41 kmpl',
    engine: '1197 cc',
    dataAiHint: 'maruti dzire sedan',
  },
  {
    id: 'tata_tiago_ev',
    name: 'Tata Tiago EV',
    brand: 'Tata',
    price: 7.99,
    priceDisplay: '₹7.99 - 11.89 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'Hatchback',
    fuelType: 'Electric',
    transmission: 'Automatic',
    mileage: '315 km/charge', // Range
    dataAiHint: 'tata tiago electric hatchback',
  },
   {
    id: 'bmw_x1',
    name: 'BMW X1',
    brand: 'BMW',
    price: 49.50,
    priceDisplay: '₹49.50 - 52.50 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'Luxury', // Could also be SUV
    fuelType: 'Petrol', // Also available in Diesel
    transmission: 'Automatic',
    mileage: '20.37 kmpl',
    engine: '1995 cc',
    dataAiHint: 'bmw x1 luxury suv',
  },
  {
    id: 'mercedes_benz_gla',
    name: 'Mercedes-Benz GLA',
    brand: 'Mercedes-Benz',
    price: 50.50,
    priceDisplay: '₹50.50 - 56.90 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'Luxury', // Could also be SUV
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '17.4 kmpl',
    engine: '1332 cc',
    dataAiHint: 'mercedes gla luxury suv',
  }
];
