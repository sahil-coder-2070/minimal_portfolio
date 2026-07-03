import Link from 'next/link';
import { CursorDrivenParticleTypography } from '@/components/ui/cursor-driven-particle-typography';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="w-full max-w-2xl">
        <CursorDrivenParticleTypography
          text="404"
          fontSize={160}
          particleDensity={4}
          dispersionStrength={20}
          returnSpeed={0.06}
          className="min-h-[300px]"
        />
      </div>
      <p className="text-muted-foreground max-w-md">
        This page doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground rounded-full px-6 py-2 text-sm font-medium transition-opacity hover:opacity-90"
      >
        Go home
      </Link>
    </div>
  );
}
