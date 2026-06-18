import SendIcon from '@/components/icons/social/SendIcon';
import Cv from '@/components/icons/social/Cv';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const SocialLinks = () => {
  const items = [
    {
      name: 'Social Links',
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

  const renderIcon = (item: (typeof items)[0]) => {
    if (typeof item.icon === 'string') {
      return (
        <Image
          src={item.icon}
          alt={item.name}
          className="size-8 rounded-lg object-cover select-none"
          width={32}
          height={32}
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
    <>
      <div className="px-5 py-0.5 text-3xl font-normal">Connect</div>
      <div className="w-full">
        <div className="relative mt-2 w-full">
          {/* Absolute Vertical Dividers Overlay */}
          <div className="pointer-events-none absolute inset-0 z-[2] grid grid-cols-2 gap-2 md:grid-cols-3">
            <div className="border-border border-r dark:opacity-60"></div>
            <div className="border-border border-l md:border-x dark:opacity-60"></div>
            <div className="border-border border-l max-md:hidden dark:opacity-60"></div>
          </div>

          <ul className="connect-grid grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => {
              return (
                <li key={item.name}>
                  <div className="group relative flex cursor-pointer items-center gap-4 p-4 pr-2 transition-colors duration-200 hover:bg-neutral-50 hover:dark:bg-neutral-900/30">
                    <div className="relative size-8 shrink-0">
                      {renderIcon(item)}
                      <div className="pointer-events-none absolute inset-0 rounded-lg inset-ring-1 inset-ring-black/10 dark:inset-ring-white/15"></div>
                    </div>
                    <h3 className="ml-0 md:ml-3 flex-1 truncate text-sm font-medium text-neutral-700 transition-colors duration-200 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100">
                      {item.isExternal ? (
                        <a href={item.href} target="_blank" rel="noopener">
                          <span className="absolute inset-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      ) : (
                        <Link href={item.href}>
                          <span className="absolute inset-0" aria-hidden="true" />
                          {item.name}
                        </Link>
                      )}
                    </h3>
                    <ArrowUpRight
                      className="lucide lucide-arrow-up-right text-muted-foreground size-4 shrink-0 transform transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SocialLinks;
