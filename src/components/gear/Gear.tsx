
import Container from "@/components/layouts/Container";
import { Separator } from "@/components/ui/separator";
import { devices, software, webExtensions } from "@/config/Gear";
import { ArrowUpRight, Monitor, Puzzle } from "lucide-react";
import Link from 'next/link';

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
};

export default function GearsPage() {
  return (
    <Container className="py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Gears
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            My gears and tools i use to get my work done.
          </p>
        </div>

        <Separator />

        {/* Devices Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Devices</h2>
          <ul className="divide-y divide-line border-y border-line mt-6">
            {devices.map((device) => (
              <li key={device.name} className="list-none">
                <div className="relative flex items-center pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-900/40 transition-colors duration-250 group">
                  {/* Icon Container */}
                  <div className="mx-4 bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736F70] dark:border-white/10 [&_svg]:size-4">
                    {device.icon}
                  </div>
                  {/* Content Container */}
                  <div className="flex-1 space-y-1 border-l border-dashed border-line p-4 pr-2">
                    <h3 className="leading-snug font-medium text-balance text-secondary">
                      {device.name}
                    </h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Web Extensions Section */}
        <div className="space-y-4 pt-10">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736F70] dark:border-white/10">
              <Puzzle className="size-4" />
            </div>
            <h2 className="text-2xl font-semibold">Web Extensions</h2>
          </div>

          <ul className="divide-y divide-line border-y border-line mt-6">
            {webExtensions.map((extension, index) => (
              <li key={extension.name} className="list-none">
                <div className="relative flex items-center pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-900/40 transition-colors duration-250 group">
                  {/* Number Container */}
                  <div className="mx-4 bg-muted flex items-center justify-center rounded-md border border-black/10 px-2 py-1 text-[#736F70] dark:border-white/10 select-none">
                    <span className="text-secondary text-sm font-semibold">{index + 1}</span>
                  </div>
                  {/* Content Container */}
                  <div className="flex-1 space-y-1 border-l border-dashed border-line p-4 pr-2">
                    <h3 className="leading-snug font-medium text-balance">
                      <Link href={extension.href} target="_blank" rel="noopener">
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        {extension.name}
                      </Link>
                    </h3>
                    <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <div>
                        <dt className="sr-only">Website</dt>
                        <dd>{getDomain(extension.href)}</dd>
                      </div>
                    </dl>
                  </div>
                  {/* Arrow Icon */}
                  <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Software Section */}
        <div className="space-y-4 pt-10">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736F70] dark:border-white/10">
              <Monitor className="size-4" />
            </div>
            <h2 className="text-2xl font-semibold">Software</h2>
          </div>

          <ul className="divide-y divide-line border-y border-line mt-6">
            {software.map((app, index) => (
              <li key={app.name} className="list-none">
                <div className="relative flex items-center pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-900/40 transition-colors duration-250 group">
                  {/* Number Container */}
                  <div className="mx-4 bg-muted flex items-center justify-center rounded-md border border-black/10 px-2 py-1 text-[#736F70] dark:border-white/10 select-none">
                    <span className="text-secondary text-sm font-semibold">{index + 1}</span>
                  </div>
                  {/* Content Container */}
                  <div className="flex-1 space-y-1 border-l border-dashed border-line p-4 pr-2">
                    <h3 className="leading-snug font-medium text-balance">
                      <Link href={app.href} target="_blank" rel="noopener">
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        {app.name}
                      </Link>
                    </h3>
                    <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <div>
                        <dt className="sr-only">Website</dt>
                        <dd>{getDomain(app.href)}</dd>
                      </div>
                    </dl>
                  </div>
                  {/* Arrow Icon */}
                  <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
