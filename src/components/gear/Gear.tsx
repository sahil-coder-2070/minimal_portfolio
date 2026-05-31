import Container from "@/components/layouts/Container";
import { devices, software, webExtensions } from "@/config/Gear";
import { ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import SectionHeading from "@/components/common/SectionHeading";
import RepeatSeparator from "@/components/ui/repeat-separator";

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
};

export default function GearsPage() {
  return (
    <>
      {/* Page Header */}
      <Container className="mt-6">
        <div>
          <SectionHeading
            classname="text-neutral-400 dark:text-neutral-500 font-medium"
            heading="Gears"
          />
          <h2 className="screen-line-bottom px-4 text-3xl font-semibold tracking-tight text-balance">
            My gears and tools i use to get my work done.
          </h2>
        </div>
      </Container>

      {/* Devices Section */}
      <RepeatSeparator />
      <Container>
        <div className="space-y-4">
          <SectionHeading heading="Devices" />
          <ul className="divide-y divide-line border-y border-line">
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
      </Container>

      {/* Web Extensions Section */}
      <RepeatSeparator />
      <Container>
        <div className="space-y-4">
          <SectionHeading heading="Web Extensions" />
          <ul className="divide-y divide-line border-y border-line">
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
      </Container>

      {/* Software Section */}
      <RepeatSeparator />
      <Container>
        <div className="space-y-4">
          <SectionHeading heading="Software" />
          <ul className="divide-y divide-line border-y border-line">
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
      </Container>
    </>
  );
}
