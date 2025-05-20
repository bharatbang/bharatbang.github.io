
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

export const PHONE_DATA: PhoneSpec[] = [
  {
    id: 'samsung_galaxy_s23_ultra',
    name: 'Samsung Galaxy S23 Ultra',
    imageUrls: {
      rear: 'https://placehold.co/200x418/707070/FFFFFF.png?text=S23U+Rear',
      front: 'https://placehold.co/200x418/333333/FFFFFF.png?text=S23U+Front',
      side: 'https://placehold.co/45x418/A0A0A0/FFFFFF.png?text=S23U+Side', // thickness approx 8.9mm, height 163.4mm. width of image proportional to thickness
    },
    dimensions: { height: 163.4, width: 78.1, thickness: 8.9 },
    dataAiHint: 'samsung phone silver',
  },
  {
    id: 'iphone_15_pro_max',
    name: 'iPhone 15 Pro Max',
    imageUrls: {
      rear: 'https://placehold.co/200x408/808080/FFFFFF.png?text=i15PM+Rear',
      front: 'https://placehold.co/200x408/333333/FFFFFF.png?text=i15PM+Front',
      side: 'https://placehold.co/42x408/A0A0A0/FFFFFF.png?text=i15PM+Side',
    },
    dimensions: { height: 159.9, width: 76.7, thickness: 8.25 },
    dataAiHint: 'iphone mobile gray',
  },
  {
    id: 'google_pixel_8_pro',
    name: 'Google Pixel 8 Pro',
    imageUrls: {
      rear: 'https://placehold.co/200x416/757575/FFFFFF.png?text=P8P+Rear',
      front: 'https://placehold.co/200x416/333333/FFFFFF.png?text=P8P+Front',
      side: 'https://placehold.co/44x416/A0A0A0/FFFFFF.png?text=P8P+Side',
    },
    dimensions: { height: 162.6, width: 76.5, thickness: 8.8 },
    dataAiHint: 'google pixel dark',
  },
];

export const VIEWS = ['rear', 'front', 'side'] as const;
export type PhoneView = typeof VIEWS[number];

export const SORT_OPTIONS = ['Name', 'Height', 'Width'] as const;
export type SortOption = typeof SORT_OPTIONS[number];
