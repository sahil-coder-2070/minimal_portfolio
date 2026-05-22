const BioText = () => {
  return (
    <>
      <div className="after:bg-border after:z relative w-full max-w-screen items-center justify-between gap-2 overflow-visible py-0.5 text-3xl font-normal transition-shadow duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]">
        About
      </div>
      <div className="space-y-5 p-4">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-base whitespace-pre-wrap text-neutral-500 md:text-lg">
          <ul className="list-disc space-y-2">
            <li>
              I'm a <b className="font-medium text-neutral-300">Design Engineer</b> obsessed with
              creating immersive digital experiences.
            </li>

            <li>
              I design and develop modern interfaces with
              <b className="font-medium text-neutral-300"> React, TypeScript, Motion, and GSAP</b>,
              focusing on interaction, storytelling, and fluid user experiences.
            </li>

            <li>
              I also work across the backend with
              <b className="font-medium text-neutral-300">
                {' '}
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
