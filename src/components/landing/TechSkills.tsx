import Container from '../layouts/Container';
import SectionHeading from '../common/SectionHeading';
import {
  ReactIcon,
  Bun,
  NodeJs,
  JavaScript,
  MongoDB,
  ExpressJs,
  Figma,
  Gsap,
  NextJS,
  PostgreSQL,
  Prisma,
  TailwindCss,
  TypeScript,
  Vite,
  Shadcn,
  LLM,
  Php,
  Baseui,
  Photoshop,
  Git,
  Docker,
  Bootstrap,
  Python,
} from '@/lib/techIcons';
import RepeatSeparator from '../ui/repeat-separator';

const TechSkills = () => {
  return (
    <>
      <RepeatSeparator />
      <SectionHeading heading={'Stack'} />
      <Container className='py-3'>
        <div className="mt-3 flex flex-wrap gap-2 gap-y-2 px-4">
          {SkillsList.map((items) => {
            return (
              <a
                key={items.title}
                href={items.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-muted-foreground hover:text-foreground/65 relative flex min-w-fit flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-neutral-300/70 bg-transparent px-3 py-1.5 shadow-xs select-none hover:border-neutral-300 hover:bg-neutral-200/50 dark:border-neutral-700/60 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
              >
                <span className="group-hover:text-foreground flex size-4 shrink-0 items-center justify-center">
                  {items.icon}
                </span>
                <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium whitespace-nowrap">
                  {items.title}
                </span>
              </a>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default TechSkills;

const SkillsList = [
  {
    title: 'TypeScript',
    icon: <TypeScript />,
    href: 'https://www.typescriptlang.org/',
  },

  {
    title: 'JavaScript',
    icon: <JavaScript />,
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    title: 'React',
    icon: <ReactIcon />,
    href: 'https://reactjs.org/',
  },
  {
    title: 'NextJS',
    icon: <NextJS />,
    href: 'https://nextjs.org/',
  },
  {
    title: 'Bun',
    icon: <Bun />,
    href: 'https://bun.sh/',
  },
  {
    title: 'Node Js',
    icon: <NodeJs />,
    href: 'https://nodejs.org/',
  },
  {
    title: 'Express Js',
    icon: <ExpressJs />,
    href: 'https://expressjs.com/',
  },
  {
    title: 'MongoDB',
    icon: <MongoDB />,
    href: 'https://www.mongodb.com/',
  },

  {
    title: 'Figma',
    icon: <Figma />,
    href: 'https://www.figma.com/',
  },
  {
    title: 'GSAP',
    icon: <Gsap />,
    href: 'https://greensock.com/gsap/',
  },

  {
    title: 'PostgreSQL',
    icon: <PostgreSQL />,
    href: 'https://www.postgresql.org/',
  },
  {
    title: 'Prisma',
    icon: <Prisma />,
    href: 'https://www.prisma.io/',
  },
  {
    title: 'Tailwind CSS',
    icon: <TailwindCss />,
    href: 'https://tailwindcss.com/',
  },

  {
    title: 'Vite',
    icon: <Vite />,
    href: 'https://vitejs.dev/',
  },
  {
    title: 'Shadcn',
    icon: <Shadcn />,
    href: 'https://ui.shadcn.com/',
  },
  {
    title: 'LLM',
    icon: <LLM />,
    href: 'https://en.wikipedia.org/wiki/Large_language_model',
  },
  {
    title: 'PHP',
    icon: <Php />,
    href: 'https://www.php.net/',
  },
  {
    title: 'BaseUI',
    icon: <Baseui />,
    href: 'https://baseweb.design/',
  },
  {
    title: 'Photoshop',
    icon: <Photoshop />,
    href: 'https://www.adobe.com/products/photoshop.html',
  },
  {
    title: 'Git',
    icon: <Git />,
    href: 'https://git-scm.com/',
  },
  {
    title: 'Docker',
    icon: <Docker />,
    href: 'https://www.docker.com/',
  },
  {
    title: 'Bootstrap',
    icon: <Bootstrap />,
    href: 'https://getbootstrap.com/',
  },
  {
    title: 'Python',
    icon: <Python />,
    href: 'https://www.python.org/',
  },
];
