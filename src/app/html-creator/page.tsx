import type { Metadata } from 'next';
import HtmlCreatorClient from '@/components/html-creator/html-creator-client';

export const metadata: Metadata = {
  title: 'HTML Creator - Bharat Bang',
  description: 'Visually create and customize HTML forms and structures.',
};

export default function HtmlCreatorPage() {
  return <HtmlCreatorClient />;
}
