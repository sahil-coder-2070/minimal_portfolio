import type { Metadata } from 'next';
import AiImageCardDocPage from '@/components/components/AiImageCardDocPage';

export const metadata: Metadata = {
  title: 'Image Generation Card — Animated UI Component | Sahil',
  description:
    'Animated UI component that recreates the image generation state used in ChatGPT, DALL·E, and Midjourney — blinking grid build-up, blur-to-focus reveal, shine sweep, and a live generation timer. Built with Motion.',
  openGraph: {
    title: 'Image Generation Card — Sahil',
    description:
      'Animated UI component that recreates the image generation state used in ChatGPT, DALL·E, and Midjourney — blinking grid build-up, blur-to-focus reveal, shine sweep, and a live generation timer.',
  },
};

export default function Page() {
  return <AiImageCardDocPage />;
}
