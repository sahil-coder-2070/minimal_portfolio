import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import Container from '../layouts/Container';
import { ArrowUpRight, Code } from 'lucide-react';
import Gear from '@/components/icons/social/GearIcon';
import RepeatSeparator from '../ui/repeat-separator';

const setupItems = [
  {
    name: 'Gears Used',
    description: 'Productivity Tools, Gears i use to get my work done.',
    icon: <Gear className="size-4" />,
    href: '/gear',
  },
  // {
  //   name: "VS Code / Cursor Setup",
  //   description: "VS Code / Cursor Setup i use daily.",
  //   icon: <Code className="size-4" />,
  //   href: "/setup",
  // },
];

export default function Setup() {
  return (
    <>
      <RepeatSeparator />
      <Container>
        <SectionHeading heading="Setup" />
        <div className=" flex flex-col">
          {setupItems.map((item) => (
            <div key={item.name} className="border-y border-line">
              <div className="relative flex items-center pr-2 hover:bg-accent-muted group transition-colors duration-250">
                {/* Icon Container */}
                <div className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg select-none border border-muted-foreground/15 ring-1 ring-line ring-offset-1 ring-offset-background bg-muted text-muted-foreground [&_svg]:size-4">
                  {item.icon}
                </div>

                {/* Content Container */}
                <div className="flex-1 space-y-1 border-l border-dashed border-line p-4 pr-2">
                  <h3 className="leading-snug font-medium text-balance">
                    <Link to={item.href}>
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      {item.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>

                {/* Arrow Icon */}
                <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
