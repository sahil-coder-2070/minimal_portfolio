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
      'Searches TMDB for movies, posters, and ratings. React + Vite, built in three days when I was learning hooks. The search input is debounced so the API request doesn’t fire on every keystroke.',
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
      'An animation-heavy landing page built around GSAP and ScrollTrigger. Sections fade, slide, and stagger as you scroll, with a 3D parallax layer and a config that respects the user’s reduced-motion setting.',
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
      'Pastes in whatever’s in your fridge, gets back a recipe. React + Framer Motion on the front, Puter.js for the AI call and client-side storage. The state management is the part I’m most proud of, since the recipe steps animate as they stream in.',
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
      'Open-source image editor with AI models for background removal, style transfer, and cleanup. Next.js on the front, Convex for state, still actively shipping. The slow part was wiring the AI outputs back into the canvas without freezing the UI.',
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
      'Paste a product link from Amazon or Flipkart, get a price history chart and an email when it drops. Firecrawl handles the scraping, Supabase stores the history, Next.js Server Actions handle the writes. Still in development, currently adding per-user watchlists.',
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
      'A CLI and npm package that writes your commit message for you. Reads the staged diff, sends it to OpenRouter, returns a conventional commit. Bring your own key or use the hosted version with a free trial.',
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
      'An interactive mechanical keyboard for the browser. Real switch sounds pre-decoded through the Audio Context API, several keycap themes (Dolch, Sand, Scarlet), haptics on mobile, and a volume slider. The latency tuning took longer than the rest of the project combined.',
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
      'A Chrome extension and web dashboard for managing bookmarks. Everything is stored locally in IndexedDB, no server, no account. Boards for grouping, a Cmd-K palette for search, keyboard shortcuts for the heavy users, and a clean export when you want out.',
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
