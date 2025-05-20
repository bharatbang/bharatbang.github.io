
import type { Metadata } from 'next';
import PhoneSizeCompareClient from '@/components/phone-size-compare/phone-size-compare-client';

export const metadata: Metadata = {
  title: 'Phone Size Compare - Bharat Bang',
  description: 'Visually compare the sizes of different smartphones.',
};

export default function PhoneSizeComparePage() {
  return <PhoneSizeCompareClient />;
}
