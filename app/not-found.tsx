import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
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
