import type { Metadata } from 'next';
import AiImageCardDocPage from '@/components/components/AiImageCardDocPage';

export const metadata: Metadata = {
  title: 'AI Image Card — Animated Image Generation UI Component | Sahil',
  description:
    'AI-style image generation card with a blinking grid build-up, blur-to-focus reveal, shine sweep, and live generation timer. Built with Motion.',
  openGraph: {
    title: 'AI Image Card Component — Sahil',
    description:
      'AI-style image generation card with a blinking grid build-up, blur-to-focus reveal, shine sweep, and live generation timer.',
  },
};

export default function Page() {
  return <AiImageCardDocPage />;
}
