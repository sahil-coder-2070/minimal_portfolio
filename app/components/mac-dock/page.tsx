import type { Metadata } from 'next';
import MacDockDocPage from '@/components/components/MacDockDocPage';

export const metadata: Metadata = {
  title: 'Mac Dock — Interactive macOS Dock UI Component | Sahil',
  description:
    'Interactive macOS style Dock component with spring icon scaling and hardware-accelerated live window preview popups on hover.',
  openGraph: {
    title: 'Mac Dock Component — Sahil',
    description:
      'Interactive macOS style Dock component with spring icon scaling and hardware-accelerated live window preview popups on hover.',
  },
};

export default function Page() {
  return <MacDockDocPage />;
}
