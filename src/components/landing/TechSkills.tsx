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
  Css,
  FramerMotion,
  Html,
  Npm,
} from '@/lib/techIcons';
import RepeatSeparator from '../ui/repeat-separator';

const TechSkills = () => {
  return (
    <>
      <RepeatSeparator />
      <SectionHeading heading={'Stack'} />
      <Container className="py-">
        <div className="mx-auto w-full max-w-5xl border-y border-neutral-200 dark:border-neutral-800">
          {StackCategories.map((category, index) => {
            return (
              <div
                key={category.id}
                className={`flex flex-col sm:flex-row ${
                  index !== StackCategories.length - 1
                    ? 'border-b border-neutral-200/80 dark:border-neutral-800'
                    : ''
                }`}
              >
                {/* Category Column with Dotted Right Border */}
                <div className="flex w-full shrink-0 items-center gap-3.5 border-b border-neutral-200/60 px-5 py-4 sm:w-64 sm:border-r sm:border-b-0 sm:border-dashed sm:border-neutral-300 sm:py-6 dark:sm:border-neutral-800">
                  <span className="font-mono text-sm font-medium text-neutral-400 dark:text-neutral-500">
                    {category.id}
                  </span>
                  <span className="text-sm font-medium text-neutral-600 md:text-base dark:text-neutral-300">
                    {category.category}
                  </span>
                </div>

                {/* Badges Column */}
                <div className="flex grow flex-wrap items-center gap-2 px-5 py-4 sm:gap-2.5 sm:px-6 sm:py-5">
                  {category.skills.map((skill) => (
                    <a
                      key={skill.title}
                      href={skill.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200/90 bg-neutral-50/90 px-3 py-1.5 font-mono text-xs text-neutral-700 shadow-2xs  select-none hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80"
                    >
                      {/* Monochrome icon with color on hover */}
                      <span className="flex size-4 shrink-0 items-center justify-center opacity-70 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0 [&_svg]:size-3.5">
                        {skill.icon}
                      </span>
                      <span className="font-medium tracking-tight whitespace-nowrap">
                        {skill.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default TechSkills;

const StackCategories = [
  {
    id: '01',
    category: 'Language',
    skills: [
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
        title: 'Python',
        icon: <Python />,
        href: 'https://www.python.org/',
      },
      {
        title: 'HTML',
        icon: <Html />,
        href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      },
      {
        title: 'CSS',
        icon: <Css />,
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      },
      {
        title: 'PHP',
        icon: <Php />,
        href: 'https://www.php.net/',
      },
    ],
  },
  {
    id: '02',
    category: 'Frontend',
    skills: [
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
        title: 'Tailwind CSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        title: 'Shadcn',
        icon: <Shadcn />,
        href: 'https://ui.shadcn.com/',
      },

      {
        title: 'Framer Motion',
        icon: <FramerMotion />,
        href: 'https://motion.dev/',
      },
      {
        title: 'GSAP',
        icon: <Gsap />,
        href: 'https://greensock.com/gsap/',
      },
      {
        title: 'Vite',
        icon: <Vite />,
        href: 'https://vitejs.dev/',
      },
      {
        title: 'Bootstrap',
        icon: <Bootstrap />,
        href: 'https://getbootstrap.com/',
      },
    ],
  },
  {
    id: '03',
    category: 'Backend & Database',
    skills: [
      {
        title: 'Node.js',
        icon: <NodeJs />,
        href: 'https://nodejs.org/',
      },
      {
        title: 'Express Js',
        icon: <ExpressJs />,
        href: 'https://expressjs.com/',
      },
      {
        title: 'Bun',
        icon: <Bun />,
        href: 'https://bun.sh/',
      },
      {
        title: 'PostgreSQL',
        icon: <PostgreSQL />,
        href: 'https://www.postgresql.org/',
      },
      {
        title: 'MongoDB',
        icon: <MongoDB />,
        href: 'https://www.mongodb.com/',
      },
      {
        title: 'Prisma',
        icon: <Prisma />,
        href: 'https://www.prisma.io/',
      },
    ],
  },
  {
    id: '04',
    category: 'Workflow & Tools',
    skills: [
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
        title: 'NPM',
        icon: <Npm />,
        href: 'https://www.npmjs.com/',
      },
      {
        title: 'LLM',
        icon: <LLM />,
        href: 'https://en.wikipedia.org/wiki/Large_language_model',
      },
    ],
  },
  {
    id: '05',
    category: 'Design',
    skills: [
      {
        title: 'Figma',
        icon: <Figma />,
        href: 'https://www.figma.com/',
      },
      {
        title: 'Photoshop',
        icon: <Photoshop />,
        href: 'https://www.adobe.com/products/photoshop.html',
      },
    ],
  },
];
