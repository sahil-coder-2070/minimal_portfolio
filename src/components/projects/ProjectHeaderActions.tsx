'use client';

import React from 'react';
import { Share, ArrowLeft, ArrowRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface ProjectHeaderActionsProps {
  previousSlug?: string | null;
  nextSlug?: string | null;
  projectTitle?: string;
  basePath?: string;
}

export function ProjectHeaderActions({
  previousSlug,
  nextSlug,
  projectTitle = 'Check out this project',
  basePath = 'projects',
}: ProjectHeaderActionsProps) {
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const handleShareOption = async (option: 'x' | 'whatsapp' | 'insta' | 'more') => {
    const url = getShareUrl();
    const title = projectTitle;

    if (option === 'x') {
      const xUrl = `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      window.open(xUrl, '_blank', 'noopener,noreferrer');
    } else if (option === 'whatsapp') {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20-%20${encodeURIComponent(url)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } else if (option === 'insta') {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied! Share it on Instagram');
    } else if (option === 'more') {
      try {
        if (navigator.share) {
          await navigator.share({
            title: title,
            url: url,
          });
        } else {
          await navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!');
        }
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const buttonClass =
    'size-7 rounded-[min(var(--radius-lg),10px)] border-none active:scale-none cursor-pointer p-0 flex items-center justify-center dark:bg-neutral-700/70 bg-neutral-200/70  hover:bg-neutral-300/70 dark:hover:bg-neutral-800 hover:scale-95 active:scale-90';

  return (
    <div className="flex items-center gap-2">
      <Toaster position="top-center" />

      {/* Share dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" className={` ${buttonClass}`} title="Share Project">
            <Share className="size-4 stroke-black/70 dark:stroke-white/80" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="hv z-50 w-40">
          <DropdownMenuItem
            onClick={() => handleShareOption('x')}
            className="flex cursor-pointer items-center gap-2"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="size-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>X</title>
              <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
            </svg>
            <span>X (Twitter)</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleShareOption('whatsapp')}
            className="flex cursor-pointer items-center gap-2"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="size-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>WhatsApp</title>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>WhatsApp</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleShareOption('insta')}
            className="flex cursor-pointer items-center gap-2"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="size-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Instagram</title>
              <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
            </svg>
            <span>Instagram</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleShareOption('more')}
            className="flex cursor-pointer items-center gap-2"
          >
            <MoreHorizontal className="size-4" />
            <span>More</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Previous Project/Post button using Shadcn Button */}
      {previousSlug && (
        <Button
          asChild
          variant="secondary"
          size="icon-sm"
          className={buttonClass}
          title={`Previous ${basePath === 'projects' ? 'Project' : 'Post'}`}
        >
          <Link href={`/${basePath}/${previousSlug}`}>
            <ArrowLeft className="size-4 dark:stroke-white/80" />
          </Link>
        </Button>
      )}

      {/* Next Project/Post button using Shadcn Button */}
      {nextSlug && (
        <Button
          asChild
          variant="secondary"
          size="icon-sm"
          className={buttonClass}
          title={`Next ${basePath === 'projects' ? 'Project' : 'Post'}`}
        >
          <Link href={`/${basePath}/${nextSlug}`}>
            <ArrowRight className="size-4 dark:stroke-white/80" />
          </Link>
        </Button>
      )}
    </div>
  );
}
