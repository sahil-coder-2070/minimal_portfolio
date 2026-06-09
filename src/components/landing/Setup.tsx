import Link from 'next/link';
import SectionHeading from '../common/SectionHeading';
import Container from '../layouts/Container';
import { ArrowUpRight, Bookmark } from 'lucide-react';
import Gear from '@/components/icons/social/GearIcon';
import RepeatSeparator from '../ui/repeat-separator';

const setupItems = [
  {
    name: 'Gears Used',
    description: 'Productivity Tools, Gears i use to get my work done.',
    icon: <Gear className="size-4" />,
    href: '/gear',
  },
  {
    name: 'Bookmarks',
    description: 'Curated list of interesting websites, tools, and portfolios.',
    icon: <Bookmark className="size-4" />,
    href: '/bookmarks',
  },
];

export default function Setup() {
  return (
    <>
      <RepeatSeparator />
      <Container>
        <SectionHeading heading="Setup" />
        <div className="flex flex-col">
          {setupItems.map((item) => (
            <div key={item.name} className="border-border border-y border-t-0 first:border-t">
              <div className=" hover:bg-neutral-100 dark:hover:bg-neutral-900/40 group relative flex items-center pr-2 transition-colors duration-250">
                {/* Icon Container */}
                <div className="border-muted-foreground/15 ring-line ring-offset-background bg-muted text-muted-foreground mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border ring-1 ring-offset-1 select-none [&_svg]:size-4">
                  {item.icon}
                </div>

                {/* Content Container */}
                <div className="border-border flex-1 space-y-1 border-l border-dashed p-4 pr-2">
                  <h3 className="leading-snug font-medium text-balance">
                    <Link href={item.href}>
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      {item.name}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>

                {/* Arrow Icon */}
                <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
