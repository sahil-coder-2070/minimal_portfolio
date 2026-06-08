import Motion from '@/components/icons/social/FramerMotion';
import ReactJs from '@/components/icons/tech/ReactIcon';
import { Convex } from '@/components/icons/tech/Convex';
import { Firecrawl } from '@/components/icons/tech/FireCrawl';
import Gsap from '@/components/icons/tech/Gsap';
import JavaScript from '@/components/icons/tech/JavaScript';
import NextJs from '@/components/icons/tech/NextJS';
import { Supabase } from '@/components/icons/tech/Supabase';
import TailwindCss from '@/components/icons/tech/TailwindCss';
import TypeScript from '@/components/icons/tech/TypeScript';
import Vite from '@/components/icons/tech/Vite';
import { NodeJs, Npm } from '@/lib/techIcons';

export const ProjectCardData = [
  {
    id: 1,
    title: 'Movie Finder',
    subheading: 'React Movie App',
    img: {
      src: '/projects/project2.avif',
      alt: 'Movie Finder project image',
      width: 1920,
      height: 1080,
    },
    description:
      'Movie Finder is a React web app that allows users to search, browse, and discover movies instantly. It fetches real-time movie data from the TMDB API and presents it in a clean, responsive UI for seamless exploration.',
    links: {
      website: 'https://find-moviename.vercel.app/',
      github: 'https://github.com/sahilcodexx/movie-app',
      details: '/projects/findmovie',
    },
    technologies: [
      {
        name: 'JavaScript',
        icon: <JavaScript />,
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'React',
        icon: <ReactJs />,
        href: 'https://reactjs.org/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Vite',
        icon: <Vite />,
        href: 'https://vitejs.dev/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/findmovie',
  },
  {
    id: 2,
    title: 'Nova Gaming',
    subheading: 'Interactive Web Experience',
    img: {
      src: '/projects/project3.avif',
      alt: 'Nova Gaming GSAP animated project image',
      width: 1920,
      height: 1080,
    },
    description:
      'Nova Gaming is an interactive, animation-driven web experience built using GSAP. It focuses on smooth scroll-based animations, cinematic transitions, and modern UI motion to deliver an immersive frontend experience with high performance and responsiveness.',
    links: {
      website: 'https://nova-gsap.vercel.app/',
      github: 'https://github.com/sahilcodexx/nova-gsap',
      details: '/projects/findmovie',
    },
    technologies: [
      {
        name: 'JavaScript',
        icon: <JavaScript />,
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'GSAP',
        icon: <Gsap />,
        href: 'https://greensock.com/gsap/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Vite',
        icon: <Vite />,
        href: 'https://vitejs.dev/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/nova',
  },
  {
    id: 3,
    title: 'ChefyAI',
    subheading: 'AI-Powered Recipe Generator',
    img: {
      src: '/projects/project1.avif',
      alt: 'ChefyAI project image',
      width: 1920,
      height: 1080,
    },
    description:
      'ChefyAI is an AI-powered recipe generator that lets users instantly create personalized recipes based on their input. It combines a modern frontend with seamless AI integration for a smooth and engaging user experience.',
    links: {
      website: 'https://chefyai.vercel.app/',
      github: 'https://github.com/sahilcodexx/ai-recipe',
      details: '/projects/chefyai',
    },
    technologies: [
      {
        name: 'JavaScript',
        icon: <JavaScript />,
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'React',
        icon: <ReactJs />,
        href: 'https://reactjs.org/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Framer Motion',
        icon: <Motion />,
        href: 'https://www.framer.com/motion/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/chefyai',
  },
  {
    id: 4,
    title: 'Image Editor AI',
    subheading: 'AI-Powered Image Editor',
    img: {
      src: '/projects/repimly.avif',
      alt: 'Image Editor AI project image',
      width: 1920,
      height: 1080,
    },
    description:
      'Image Editor AI is an open-source AI-powered image editing tool built with Next.js. It provides an interface to apply intelligent edits using modern AI models and image processing features, allowing users to manipulate and transform images efficiently.',
    links: {
      website: 'https://repimly.vercel.app/',
      github: 'https://github.com/sahilcodexx/Image-Editor-AI',
      details: '/projects/imageeditorai',
    },
    technologies: [
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'Next.js',
        icon: <NextJs />,
        href: 'https://nextjs.org/',
      },
      {
        name: 'Convex',
        icon: <Convex />,
        href: 'https://www.convex.dev/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/imageeditorai',
  },
  {
    id: 5,
    title: 'Price Tracker',
    subheading: 'Automated Price Monitor',
    img: {
      src: '/projects/trackhatke.avif',
      alt: 'Price Tracker project image',
      width: 1920,
      height: 1080,
    },
    description:
      'Price Tracker is an open-source web application that allows users to monitor product prices from e-commerce platforms. It enables users to track price changes over time, receive updates, and make smarter purchasing decisions through automated tracking and data visualization features.',
    links: {
      website: 'https://trackhatke.vercel.app/',
      github: 'https://github.com/sahilcodexx/price-tracker',
      details: '/projects/pricetracker',
    },
    technologies: [
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'Firecrawl',
        icon: <Firecrawl />,
        href: 'https://firecrawl.dev/',
      },
      {
        name: 'Next.js',
        icon: <NextJs />,
        href: 'https://nextjs.org/',
      },
      {
        name: 'SupaBase',
        icon: <Supabase />,
        href: 'https://supabase.com/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/pricetracker',
  },
  {
    id: 6,
    title: 'tcxcommit',
    subheading: 'AI Git Commit Generator',
    img: {
      src: '/projects/tccommit.avif',
      alt: 'tcxcommit project image',
      width: 1920,
      height: 1080,
    },
    description:
      'AI-powered git commit message generator that writes your commit messages for you! Uses OpenRouter AI to generate meaningful and conventional commit messages. Supports free trials and your own API key.',
    links: {
      website: 'https://tcxcommit.vercel.app/',
      github: 'https://github.com/sahilcodexx/tcxcommit',
      npm: 'https://www.npmjs.com/package/tcxcommit',
      details: '/projects/tcxcommit',
    },
    technologies: [
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'Node.js',
        icon: <NodeJs />,
        href: 'https://nodejs.org/',
      },
      {
        name: 'NPM-Cli Tool',
        icon: <Npm />,
        href: 'https://www.npmjs.com/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/tcxcommit',
  },
  {
    id: 7,
    title: 'Mechanical Keyboard',
    subheading: 'Interactive Keyboard Simulator',
    img: {
      src: '/projects/keyui.avif',
      alt: 'Mechanical Keyboard project image',
      width: 1920,
      height: 1080,
    },
    description:
      'An interactive 2D/3D mechanical keyboard simulator package and landing page for React. Experience high-fidelity clicky switch sounds, multi-casing themes (Dolch, Sand, Scarlet, etc.), mobile/web haptics, and custom volume levels.',
    links: {
      website: 'https://keyui.vercel.app/',
      github: 'https://github.com/sahilcodexx/MechanicalKeyboard',
      details: '/projects/mechanicalkeyboard',
    },
    technologies: [
      {
        name: 'React',
        icon: <ReactJs />,
        href: 'https://reactjs.org/',
      },
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Vite',
        icon: <Vite />,
        href: 'https://vitejs.dev/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/mechanicalkeyboard',
  },
  {
    id: 8,
    title: 'Bookmrk',
    subheading: 'Privacy-First Bookmark Manager',
    img: {
      src: '/projects/bookmrkit.avif',
      alt: 'Bookmrk project image',
      width: 1920,
      height: 1080,
    },
    description:
      'A modern, privacy-first local bookmark and tab manager Chrome extension and web dashboard. Keep your links organized in boards, utilize search command palettes, assign custom keyboard shortcuts, and export bookmarks cleanly.',
    links: {
      website: 'https://bookmrkit.vercel.app/',
      github: 'https://github.com/sahilcodexx/Bookmrk',
      details: '/projects/bookmrk',
    },
    technologies: [
      {
        name: 'Next.js',
        icon: <NextJs />,
        href: 'https://nextjs.org/',
      },
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/bookmrk',
  },
];
