
export interface PhoneSpec {
  id: string;
  name: string;
  imageUrls: {
    rear: string;
    front: string;
    side: string;
  };
  dimensions: { // in mm
    height: number;
    width: number;
    thickness: number;
  };
  dataAiHint: string;
}

// Approximate scaling factors for placeholder images
// Ref height: 160mm maps to ~400px image height. Scale = 2.5
// Ref thickness: 8mm maps to ~40px image width for side view. Scale = 5

export const PHONE_DATA: PhoneSpec[] = [
  // Samsung Phones
  {
    id: 'samsung_galaxy_s24_ultra',
    name: 'Samsung Galaxy S24 Ultra',
    imageUrls: {
      rear: 'https://placehold.co/200x406.png',
      front: 'https://placehold.co/200x406.png',
      side: 'https://placehold.co/43x406.png',
    },
    dimensions: { height: 162.3, width: 79, thickness: 8.6 },
    dataAiHint: 'samsung phone titanium',
  },
  {
    id: 'samsung_galaxy_s24_plus',
    name: 'Samsung Galaxy S24+',
    imageUrls: {
      rear: 'https://placehold.co/200x396.png',
      front: 'https://placehold.co/200x396.png',
      side: 'https://placehold.co/39x396.png',
    },
    dimensions: { height: 158.5, width: 75.9, thickness: 7.7 },
    dataAiHint: 'samsung phone violet',
  },
  {
    id: 'samsung_galaxy_s24',
    name: 'Samsung Galaxy S24',
    imageUrls: {
      rear: 'https://placehold.co/200x368.png',
      front: 'https://placehold.co/200x368.png',
      side: 'https://placehold.co/38x368.png',
    },
    dimensions: { height: 147, width: 70.6, thickness: 7.6 },
    dataAiHint: 'samsung phone yellow',
  },
  {
    id: 'samsung_galaxy_z_fold_5',
    name: 'Samsung Galaxy Z Fold 5',
    imageUrls: {
      rear: 'https://placehold.co/200x387.png', // Folded rear
      front: 'https://placehold.co/200x387.png', // Folded front (cover screen)
      side: 'https://placehold.co/67x387.png', // Folded thickness
    },
    dimensions: { height: 154.9, width: 67.1, thickness: 13.4 }, // Using folded width and thickness
    dataAiHint: 'samsung fold phone',
  },
  {
    id: 'samsung_galaxy_z_flip_5',
    name: 'Samsung Galaxy Z Flip 5',
    imageUrls: {
      rear: 'https://placehold.co/200x413.png', // Unfolded rear
      front: 'https://placehold.co/200x413.png', // Unfolded front
      side: 'https://placehold.co/76x413.png', // Folded thickness for side view
    },
    dimensions: { height: 165.1, width: 71.9, thickness: 15.1 }, // H, W are unfolded. T is folded for side view.
    dataAiHint: 'samsung flip phone',
  },
  {
    id: 'samsung_galaxy_s23_ultra',
    name: 'Samsung Galaxy S23 Ultra',
    imageUrls: {
      rear: 'https://placehold.co/200x409.png',
      front: 'https://placehold.co/200x409.png',
      side: 'https://placehold.co/45x409.png',
    },
    dimensions: { height: 163.4, width: 78.1, thickness: 8.9 },
    dataAiHint: 'samsung phone silver',
  },
  {
    id: 'samsung_galaxy_s23_fe',
    name: 'Samsung Galaxy S23 FE',
    imageUrls: {
      rear: 'https://placehold.co/200x395.png',
      front: 'https://placehold.co/200x395.png',
      side: 'https://placehold.co/41x395.png',
    },
    dimensions: { height: 158, width: 76.5, thickness: 8.2 },
    dataAiHint: 'samsung phone mint',
  },
  {
    id: 'samsung_galaxy_a55',
    name: 'Samsung Galaxy A55',
    imageUrls: {
      rear: 'https://placehold.co/200x403.png',
      front: 'https://placehold.co/200x403.png',
      side: 'https://placehold.co/41x403.png',
    },
    dimensions: { height: 161.1, width: 77.4, thickness: 8.2 },
    dataAiHint: 'samsung phone blue',
  },
  {
    id: 'samsung_galaxy_a35',
    name: 'Samsung Galaxy A35',
    imageUrls: {
      rear: 'https://placehold.co/200x404.png',
      front: 'https://placehold.co/200x404.png',
      side: 'https://placehold.co/41x404.png',
    },
    dimensions: { height: 161.7, width: 78, thickness: 8.2 },
    dataAiHint: 'samsung phone lilac',
  },
  {
    id: 'samsung_galaxy_s23_plus',
    name: 'Samsung Galaxy S23+',
    imageUrls: {
      rear: 'https://placehold.co/200x395.png',
      front: 'https://placehold.co/200x395.png',
      side: 'https://placehold.co/38x395.png',
    },
    dimensions: { height: 157.8, width: 76.2, thickness: 7.6 },
    dataAiHint: 'samsung phone cream',
  },
  {
    id: 'samsung_galaxy_s23',
    name: 'Samsung Galaxy S23',
    imageUrls: {
      rear: 'https://placehold.co/200x366.png',
      front: 'https://placehold.co/200x366.png',
      side: 'https://placehold.co/38x366.png',
    },
    dimensions: { height: 146.3, width: 70.9, thickness: 7.6 },
    dataAiHint: 'samsung phone green',
  },

  // Apple Phones
  {
    id: 'iphone_15_pro_max',
    name: 'iPhone 15 Pro Max',
    imageUrls: {
      rear: 'https://placehold.co/200x400.png',
      front: 'https://placehold.co/200x400.png',
      side: 'https://placehold.co/41x400.png',
    },
    dimensions: { height: 159.9, width: 76.7, thickness: 8.25 },
    dataAiHint: 'iphone mobile gray',
  },
  {
    id: 'iphone_15_pro',
    name: 'iPhone 15 Pro',
    imageUrls: {
      rear: 'https://placehold.co/200x367.png',
      front: 'https://placehold.co/200x367.png',
      side: 'https://placehold.co/41x367.png',
    },
    dimensions: { height: 146.6, width: 70.6, thickness: 8.25 },
    dataAiHint: 'iphone mobile blue',
  },
  {
    id: 'iphone_15_plus',
    name: 'iPhone 15 Plus',
    imageUrls: {
      rear: 'https://placehold.co/200x402.png',
      front: 'https://placehold.co/200x402.png',
      side: 'https://placehold.co/39x402.png',
    },
    dimensions: { height: 160.9, width: 77.8, thickness: 7.8 },
    dataAiHint: 'iphone mobile pink',
  },
  {
    id: 'iphone_15',
    name: 'iPhone 15',
    imageUrls: {
      rear: 'https://placehold.co/200x369.png',
      front: 'https://placehold.co/200x369.png',
      side: 'https://placehold.co/39x369.png',
    },
    dimensions: { height: 147.6, width: 71.6, thickness: 7.8 },
    dataAiHint: 'iphone mobile black',
  },
  {
    id: 'iphone_14_pro_max',
    name: 'iPhone 14 Pro Max',
    imageUrls: {
      rear: 'https://placehold.co/200x402.png',
      front: 'https://placehold.co/200x402.png',
      side: 'https://placehold.co/39x402.png',
    },
    dimensions: { height: 160.7, width: 77.6, thickness: 7.85 },
    dataAiHint: 'iphone mobile purple',
  },
  {
    id: 'iphone_14_pro',
    name: 'iPhone 14 Pro',
    imageUrls: {
      rear: 'https://placehold.co/200x369.png',
      front: 'https://placehold.co/200x369.png',
      side: 'https://placehold.co/39x369.png',
    },
    dimensions: { height: 147.5, width: 71.5, thickness: 7.85 },
    dataAiHint: 'iphone mobile gold',
  },
  {
    id: 'iphone_14_plus',
    name: 'iPhone 14 Plus',
    imageUrls: {
      rear: 'https://placehold.co/200x402.png',
      front: 'https://placehold.co/200x402.png',
      side: 'https://placehold.co/39x402.png',
    },
    dimensions: { height: 160.8, width: 78.1, thickness: 7.8 },
    dataAiHint: 'iphone mobile starlight',
  },
  {
    id: 'iphone_14',
    name: 'iPhone 14',
    imageUrls: {
      rear: 'https://placehold.co/200x367.png',
      front: 'https://placehold.co/200x367.png',
      side: 'https://placehold.co/39x367.png',
    },
    dimensions: { height: 146.7, width: 71.5, thickness: 7.8 },
    dataAiHint: 'iphone mobile red',
  },
  {
    id: 'iphone_se_3rd_gen',
    name: 'iPhone SE (3rd gen)',
    imageUrls: {
      rear: 'https://placehold.co/200x346.png',
      front: 'https://placehold.co/200x346.png',
      side: 'https://placehold.co/37x346.png',
    },
    dimensions: { height: 138.4, width: 67.3, thickness: 7.3 },
    dataAiHint: 'iphone mobile midnight',
  },
  {
    id: 'iphone_13_pro',
    name: 'iPhone 13 Pro',
    imageUrls: {
      rear: 'https://placehold.co/200x367.png',
      front: 'https://placehold.co/200x367.png',
      side: 'https://placehold.co/38x367.png',
    },
    dimensions: { height: 146.7, width: 71.5, thickness: 7.65 },
    dataAiHint: 'iphone mobile sierra_blue',
  },
  {
    id: 'iphone_13',
    name: 'iPhone 13',
    imageUrls: {
      rear: 'https://placehold.co/200x367.png',
      front: 'https://placehold.co/200x367.png',
      side: 'https://placehold.co/38x367.png',
    },
    dimensions: { height: 146.7, width: 71.5, thickness: 7.65 },
    dataAiHint: 'iphone mobile green_alpine',
  },

  // Google Phones
  {
    id: 'google_pixel_8_pro',
    name: 'Google Pixel 8 Pro',
    imageUrls: {
      rear: 'https://placehold.co/200x407.png',
      front: 'https://placehold.co/200x407.png',
      side: 'https://placehold.co/44x407.png',
    },
    dimensions: { height: 162.6, width: 76.5, thickness: 8.8 },
    dataAiHint: 'google pixel dark',
  },
];

export const VIEWS = ['rear', 'front', 'side'] as const;
export type PhoneView = typeof VIEWS[number];

export const SORT_OPTIONS = ['Name', 'Height', 'Width'] as const;
export type SortOption = typeof SORT_OPTIONS[number];
