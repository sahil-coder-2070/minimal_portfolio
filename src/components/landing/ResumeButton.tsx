import SendIcon from '@/components/icons/social/SendIcon';
import Cv from '@/components/icons/social/Cv';

import { Link } from 'react-router-dom';
import { motion as Motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const ResumeButton = () => {
  const topItems = [
    {
      name: 'Resume / CV',
      href: '/resume',
      isExternal: false,
      icon: <Cv />,
    },
    {
      name: 'Contact',
      href: '/contact',
      isExternal: false,
      icon: <SendIcon />,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/sahilcodexx',
      isExternal: true,
      icon: '/images/github.png',
    },
  ];

  const bottomItems = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sahil-singh-tech/',
      isExternal: true,
      icon: '/images/linkedin.png',
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/sahilcodex',
      isExternal: true,
      icon: '/images/x.png',
    },
    {
      name: 'Email',
      href: 'mailto:sahil207003@gmail.com',
      isExternal: true,
      icon: '/images/gmail.png',
    },
  ];

 const borderClass =
  "before:bg-neutral-200/50 after:bg-neutral-200/50 dark:before:bg-neutral-800 dark:after:bg-neutral-800 relative m-auto flex w-full max-w-screen items-center justify-between gap-2 overflow-visible py-1.5 transition-shadow duration-300 before:absolute before:top-0 before:left-1/2 before:z-[1] before:h-px before:w-screen before:-translate-x-1/2 before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:z-[1] after:h-px after:w-screen after:-translate-x-1/2 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black] select-none";

  const renderIcon = (item: (typeof topItems)[0]) => {
    if (typeof item.icon === 'string') {
      return (
        <img
          src={item.icon}
          alt={item.name}
          className="size-8 rounded-lg object-cover select-none"
          loading="lazy"
          width="32"
          height="32"
        />
      );
    }
    return (
      <div className="flex size-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors duration-200 group-hover:scale-105 group-hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-100">
        <span className="flex size-4.5 items-center justify-center [&>svg]:size-full">
          {item.icon}
        </span>
      </div>
    );
  };

  return (
    <div className="mt-8 w-full">
      <Motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative w-full"
      >
        {/* Absolute Vertical Dividers Overlay - spans the entire height of both rows combined! */}
        {/* These vertical lines run continuously across the 2px/8px gap, touching and connecting borders perfectly! */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] grid w-full grid-cols-3 gap-[6px]">
          <div className="border-line border-r"></div>
          <div className="border-line border-l md:border-x"></div>
          <div className="border-line border-l"></div>
        </div>

        {/* Row 1 (Top 3 items) */}
        <div className={`${borderClass} mt-1`}>
          <div className="relative z-[1] grid w-full grid-cols-3 gap-[4px]">
            {topItems.map((item) => {
              const content = (
                <>
                  <div className="relative size-8 shrink-0">
                    {renderIcon(item)}
                    <div className="pointer-events-none absolute inset-0 rounded-lg inset-ring-1 inset-ring-black/10 dark:inset-ring-white/15"></div>
                  </div>
                  <h3 className="ml-3 flex-1 truncate text-sm font-medium text-neutral-700 transition-colors duration-200 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100">
                    {item.name}
                  </h3>
                  <ArrowUpRight
                    className="lucide lucide-arrow-up-right text-muted-foreground size-4 shrink-0 transform transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </>
              );

              const className =
                'flex cursor-pointer items-center gap-4 p-4 pr-2 hover:bg-neutral-50 hover:dark:bg-neutral-900/30 group bg-background';

              return item.isExternal ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link key={item.name} to={item.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Row 2 (Bottom 3 items) - separated by mt-2 */}
        <div className={`${borderClass} mt-2`}>
          <div className="relative z-[1] grid w-full grid-cols-3 gap-[4px]">
            {bottomItems.map((item) => {
              const content = (
                <>
                  <div className="relative size-8 shrink-0">
                    {renderIcon(item)}
                    <div className="pointer-events-none absolute inset-0 rounded-lg inset-ring-1 inset-ring-black/10 dark:inset-ring-white/15"></div>
                  </div>
                  <h3 className="ml-3 flex-1 truncate text-sm font-medium text-neutral-700 transition-colors duration-200 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100">
                    {item.name}
                  </h3>
                  <ArrowUpRight
                    className="lucide lucide-arrow-up-right text-muted-foreground size-4 shrink-0 transform transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </>
              );

              const className =
                'flex cursor-pointer items-center gap-4 p-4 pr-2  hover:bg-neutral-50  hover:dark:bg-neutral-900/30 group bg-background';

              return item.isExternal ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link key={item.name} to={item.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </Motion.div>
    </div>
  );
};

export default ResumeButton;
