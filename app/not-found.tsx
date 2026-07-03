import Link from 'next/link';
import { CursorDrivenParticleTypography } from '@/components/ui/cursor-driven-particle-typography';

export default function NotFound() {
  return (
    <div className="not-found-page flex min-h-[calc(100vh-13.5rem)] flex-col items-center justify-center px-4 text-center">
      <style>
        {`
          .not-found-page ~ [data-site-quote],
          .not-found-page ~ [data-footer-bottom-banner] {
            display: none;
          }
        `}
      </style>
      <div className="w-full max-w-2xl">
        <CursorDrivenParticleTypography
          text="404"
          fontSize={160}
          particleDensity={4}
          dispersionStrength={20}
          returnSpeed={0.06}
          className="h-48 min-h-48 sm:h-56 sm:min-h-56"
        />
      </div>
      <div className="-mt-4 flex flex-col items-center gap-3 sm:-mt-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Page not found</h1>
        <p className="text-muted-foreground max-w-md text-sm">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground mt-3 rounded-full px-6 py-2 text-sm font-medium transition-opacity hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
