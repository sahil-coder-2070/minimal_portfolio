import type { Metadata } from 'next';
import LoaderDocPage from '@/components/components/LoaderDocPage';

export const metadata: Metadata = {
  title: 'Page Loader Animation - UI Components | Sahil',
  description:
    'Smooth multilingual greeting text loader built with Motion. Features smooth text transitions.',
  openGraph: {
    title: 'Page Loader Animation - UI Components | Sahil',
    description:
      'Smooth multilingual greeting text loader built with Motion. Features smooth text transitions.',
  },
};

export default function Page() {
  return <LoaderDocPage />;
}
