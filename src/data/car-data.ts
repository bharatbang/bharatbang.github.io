
export interface CarSpec {
  id: string; // unique id for each variant: e.g. punch_pure_p
  name: string; // Full name: e.g. Tata Punch Pure (P)
  brand: string; // Tata
  modelName: string; // Punch
  variantName: string; // Pure (P)
  price: number; // lakhs
  priceDisplay: string; // ₹6.00 Lakh
  imageUrl: string; // placeholder
  bodyType: string; // SUV, Hatchback
  fuelType: string; // Petrol, Diesel, CNG, Electric

  transmission: string; // Manual, Automatic
  engineDisplay?: string; // e.g. "1199cc / 3 cyl"
  safetyRating?: number; // stars (from Overall Rating)
  mileageDisplay?: string; // e.g. "14.5 kmpl" or "6.8 km/kWh" (from Overall Economy)

  maxPowerHp?: number;
  bootVolumeLitres?: number;
  hasTractionControl?: boolean;
  hasAllPowerWindows?: boolean;
  airbagCount?: number; // e.g., 2 for "multiple"
  hasMusicSystem?: boolean;
  hasAlloyWheels?: boolean;
  
  dataAiHint?: string;

  // Deprecated from old structure, kept for temporary compatibility if needed by other parts, but prefer new fields
  mileage?: string; // Use mileageDisplay
  engine?: string; // Use engineDisplay
}

export const BODY_TYPES = ["SUV", "Hatchback", "Sedan", "MUV", "Luxury", "Minivan", "Pickup Truck", "Coupe", "Convertible"] as const;
export type BodyType = typeof BODY_TYPES[number];

export const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"] as const;
export type FuelType = typeof FUEL_TYPES[number];

export const TRANSMISSIONS = ["Manual", "Automatic"] as const;
export type TransmissionType = typeof TRANSMISSIONS[number];

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

export const POWER_RANGES = [
  { label: "Under 100 hp", min: 0, max: 99 },
  { label: "100 - 150 hp", min: 100, max: 150 },
  { label: "150 - 200 hp", min: 150, max: 200 },
  { label: "Over 200 hp", min: 200, max: Infinity },
] as const;
export type PowerRange = typeof POWER_RANGES[number];

export const BOOT_VOLUME_RANGES = [
  { label: "Under 300 L", min: 0, max: 299 },
  { label: "300 - 400 L", min: 300, max: 399 },
  { label: "400 - 500 L", min: 400, max: 499 },
  { label: "Over 500 L", min: 500, max: Infinity },
] as const;
export type BootVolumeRange = typeof BOOT_VOLUME_RANGES[number];


export const CARS_DATA: CarSpec[] = [
  // Tata Punch Variants
  {
    id: 'tata_punch_pure_p',
    name: 'Tata Punch Pure (P)',
    brand: 'Tata',
    modelName: 'Punch',
    variantName: 'Pure (P)',
    price: 6.00,
    priceDisplay: '₹6.00 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Manual', // 5 Gears
    engineDisplay: '1199cc / 3cyl',
    maxPowerHp: 88,
    bootVolumeLitres: 366,
    hasTractionControl: true,
    hasAllPowerWindows: false, // '-'
    airbagCount: 2, // '✓✓'
    hasMusicSystem: false, // '-'
    hasAlloyWheels: false, // '-'
    safetyRating: 2, // Approx from image
    dataAiHint: 'tata punch white',
    mileageDisplay: 'N/A',
  },
  {
    id: 'tata_punch_creative_ira_amt_dt',
    name: 'Tata Punch Creative (P) IRA AMT DT',
    brand: 'Tata',
    modelName: 'Punch',
    variantName: 'Creative (P) IRA AMT DT',
    price: 9.47,
    priceDisplay: '₹9.47 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic', // 5A Gears
    engineDisplay: '1199cc / 3cyl',
    maxPowerHp: 88,
    bootVolumeLitres: 366,
    hasTractionControl: true,
    hasAllPowerWindows: true, // '✓'
    airbagCount: 2, // '✓✓'
    hasMusicSystem: true, // '✓'
    hasAlloyWheels: true, // '✓'
    safetyRating: 4, // ★★★★☆ (assuming 4.5 rounds to 4 for filtering)
    dataAiHint: 'tata punch red dualtone',
    mileageDisplay: '14.5 kmpl',
  },
  {
    id: 'tata_punch_ev_empowered_s_7_2kw',
    name: 'Tata Punch EV Empowered+ S 7.2KW',
    brand: 'Tata',
    modelName: 'Punch',
    variantName: 'EV Empowered+ S 7.2KW',
    price: 15.49,
    priceDisplay: '₹15.49 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Electric',
    transmission: 'Automatic', // 1A Gears
    engineDisplay: 'E 35kWh',
    maxPowerHp: 122,
    bootVolumeLitres: 366,
    hasTractionControl: true,
    hasAllPowerWindows: true, // '✓'
    airbagCount: 2, // '✓✓'
    hasMusicSystem: true, // '✓'
    hasAlloyWheels: true, // '✓'
    safetyRating: 4, // ★★★★☆
    dataAiHint: 'tata punch green electric',
    mileageDisplay: '6.8 km/kWh',
  },

  // Tata Nexon Variants
  {
    id: 'tata_nexon_p_smart',
    name: 'Tata Nexon 1.2 (P) Smart',
    brand: 'Tata',
    modelName: 'Nexon',
    variantName: '1.2 (P) Smart',
    price: 8.00,
    priceDisplay: '₹8.00 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Manual', // 5 Gears
    engineDisplay: '1198cc / 3cyl',
    maxPowerHp: 120,
    bootVolumeLitres: 382,
    hasTractionControl: true,
    hasAllPowerWindows: false, // 'F'
    airbagCount: 2, // '✓✓'
    hasMusicSystem: false, // '-'
    hasAlloyWheels: false, // '-'
    dataAiHint: 'tata nexon blue',
    mileageDisplay: 'N/A',
  },
  {
    id: 'tata_nexon_p_fearless_s_dca',
    name: 'Tata Nexon 1.2 (P) Fearless+S DCA',
    brand: 'Tata',
    modelName: 'Nexon',
    variantName: '1.2 (P) Fearless+S DCA',
    price: 14.80,
    priceDisplay: '₹14.80 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic', // 7A Gears
    engineDisplay: '1198cc / 3cyl',
    maxPowerHp: 120,
    bootVolumeLitres: 382,
    hasTractionControl: true,
    hasAllPowerWindows: true, // '✓'
    airbagCount: 2, // '✓✓' (assuming standard, image has ✓✓ for airbags)
    hasMusicSystem: true, // '✓'
    hasAlloyWheels: true, // '✓✓'
    dataAiHint: 'tata nexon orange dualtone',
    mileageDisplay: 'N/A',
  },
  {
    id: 'tata_nexon_ev_empowered_45_dark',
    name: 'Tata Nexon EV Empowered+ 45 #Dark',
    brand: 'Tata',
    modelName: 'Nexon',
    variantName: 'EV Empowered+ 45 #Dark',
    price: 17.19,
    priceDisplay: '₹17.19 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Electric',
    transmission: 'Automatic', // 1A Gears
    engineDisplay: 'E 45kWh',
    maxPowerHp: 145,
    bootVolumeLitres: 350,
    hasTractionControl: true,
    hasAllPowerWindows: true, // '✓'
    airbagCount: 2, // '✓✓'
    hasMusicSystem: true, // '✓'
    hasAlloyWheels: true, // '✓✓'
    safetyRating: 5, // ★★★★★
    dataAiHint: 'tata nexon dark electric',
    mileageDisplay: '6.3 km/kWh',
  },

  // Tata Curvv Variants (Data is mostly NA, using placeholders)
  {
    id: 'tata_curvv_revotron_p_smart',
    name: 'Tata Curvv Revotron (P) Smart',
    brand: 'Tata',
    modelName: 'Curvv',
    variantName: 'Revotron (P) Smart',
    price: 9.99,
    priceDisplay: '₹9.99 Lakh (est.)',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV', // SUV-coupé
    fuelType: 'Petrol',
    transmission: 'Manual', // 6 Gears
    engineDisplay: '1198cc / 3cyl',
    maxPowerHp: 120,
    bootVolumeLitres: 500,
    hasTractionControl: true,
    hasAllPowerWindows: true, // '✓✓'
    airbagCount: 2, // Assuming '✓✓' means 2
    hasMusicSystem: false, // '-'
    hasAlloyWheels: false, // '-'
    dataAiHint: 'tata curvv blue concept',
    mileageDisplay: 'N/A',
  },
  {
    id: 'tata_curvv_ev_55_empowered_a',
    name: 'Tata Curvv EV 55 Empowered+A',
    brand: 'Tata',
    modelName: 'Curvv',
    variantName: 'EV 55 Empowered+A',
    price: 21.99,
    priceDisplay: '₹21.99 Lakh (est.)',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV', // SUV-coupé
    fuelType: 'Electric',
    transmission: 'Automatic', // 1A Gears
    engineDisplay: 'E 55kWh',
    maxPowerHp: 167,
    bootVolumeLitres: 500,
    hasTractionControl: true,
    hasAllPowerWindows: true, // '✓✓'
    airbagCount: 2, // '✓✓'
    hasMusicSystem: true, // '✓'
    hasAlloyWheels: true, // '✓✓'
    dataAiHint: 'tata curvv silver electric',
    mileageDisplay: 'N/A',
  },

  // Tata Harrier Variants
  {
    id: 'tata_harrier_smart',
    name: 'Tata Harrier Smart',
    brand: 'Tata',
    modelName: 'Harrier',
    variantName: 'Smart',
    price: 15.49,
    priceDisplay: '₹15.49 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Diesel',
    transmission: 'Manual', // 6 Gears
    engineDisplay: '1956cc / 4cyl',
    maxPowerHp: 170,
    bootVolumeLitres: 445,
    hasTractionControl: true,
    hasAllPowerWindows: true, // '✓✓'
    airbagCount: 2, // '✓✓'
    hasMusicSystem: true, // '✓'
    hasAlloyWheels: false, // '-'
    dataAiHint: 'tata harrier yellow',
    mileageDisplay: 'N/A',
  },
  {
    id: 'tata_harrier_fearless_dark_a',
    name: 'Tata Harrier Fearless+ Dark A',
    brand: 'Tata',
    modelName: 'Harrier',
    variantName: 'Fearless+ Dark A',
    price: 27.09,
    priceDisplay: '₹27.09 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Diesel',
    transmission: 'Automatic', // 6A Gears
    engineDisplay: '1956cc / 4cyl',
    maxPowerHp: 170,
    bootVolumeLitres: 445,
    hasTractionControl: true,
    hasAllPowerWindows: true, // '✓✓'
    airbagCount: 2, // '✓✓' (assuming for Fearless+)
    hasMusicSystem: true, // '✓✓'
    hasAlloyWheels: true, // '✓✓'
    dataAiHint: 'tata harrier black dark_edition',
    mileageDisplay: 'N/A',
  },
  // Add some older data for variety in filters
  {
    id: 'maruti_swift_old',
    name: 'Maruti Swift LXI',
    brand: 'Maruti Suzuki',
    modelName: 'Swift',
    variantName: 'LXI',
    price: 6.49, 
    priceDisplay: '₹6.49 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'Hatchback',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileageDisplay: '22.38 kmpl',
    engineDisplay: '1197 cc',
    maxPowerHp: 89,
    bootVolumeLitres: 268,
    hasTractionControl: false,
    hasAllPowerWindows: false,
    airbagCount: 2,
    hasMusicSystem: false,
    hasAlloyWheels: false,
    safetyRating: 2,
    dataAiHint: 'maruti swift red hatchback',
  },
  {
    id: 'hyundai_creta_old',
    name: 'Hyundai Creta SX',
    brand: 'Hyundai',
    modelName: 'Creta',
    variantName: 'SX',
    price: 14.00,
    priceDisplay: '₹14.00 Lakh',
    imageUrl: 'https://placehold.co/300x200.png',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileageDisplay: '17.4 kmpl',
    engineDisplay: '1497 cc',
    maxPowerHp: 113,
    bootVolumeLitres: 433,
    hasTractionControl: true,
    hasAllPowerWindows: true,
    airbagCount: 2, // Base models might have 2, top models 6.
    hasMusicSystem: true,
    hasAlloyWheels: true,
    safetyRating: 3, // Example
    dataAiHint: 'hyundai creta white suv',
  },
];

    