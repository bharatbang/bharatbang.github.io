
import type { Metadata } from 'next';
import HtmlCreatorClientV2 from '@/components/html-creator-v2/html-creator-client-v2';

export const metadata: Metadata = {
  title: 'HTML Creator V2 - Bharat Bang',
  description: 'Visually create and customize HTML forms and structures (Version 2).',
};

export default function HtmlCreatorV2Page() {
  return <HtmlCreatorClientV2 />;
}
