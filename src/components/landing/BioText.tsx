import SectionHeading from '../common/SectionHeading';

const BioText = () => {
  return (
    <>
      <SectionHeading heading="About" />
      <div className="space-y-5 p-8">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-base font-normal whitespace-pre-wrap text-neutral-800 md:text-base dark:text-neutral-300">
          <ul className="list-disc space-y-2">
            <li>
              I'm a{' '}
              <b className="font-medium text-neutral-950 underline underline-offset-2 dark:text-neutral-100">
                Design Engineer
              </b>{' '}
              obsessed with creating immersive digital experiences.
            </li>

            <li>
              I design and develop modern interfaces with{' '}
              <b className="font-medium text-neutral-950 underline underline-offset-2 dark:text-neutral-100">
                React,TypeScript, Motion, and GSAP
              </b>
              , focusing on interaction, storytelling, and fluid user experiences.
            </li>

            <li>
              I also work across the backend with{' '}
              <b className="font-medium text-neutral-950 underline underline-offset-2 dark:text-neutral-100">
                Node.js, Bun, PostgreSQL, and MongoDB
              </b>{' '}
              to build fast, scalable, full-stack applications.
            </li>

            <li>
              I enjoy turning complex ideas into clean, engaging products that balance aesthetics
              with performance.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BioText;
