import Link from 'next/link';
import Image from 'next/image';
import RepeatSeparator from '../ui/repeat-separator';
import SectionHeading from '../common/SectionHeading';

const CTA = () => {
  return (
    <>
      <RepeatSeparator />
      <SectionHeading heading="Scrolled To Far" classname="mb-3" />
      <div className="my-12 w-full flex-col px-6 py-10 sm:flex sm:items-center sm:justify-between sm:px-12">
        <p className="mb-4 text-center text-base opacity-70 sm:mb-3 md:text-xl">
          If you've read this far, you might be interested in what I do.
        </p>
        <div className="mt-4 flex w-full justify-center sm:mt-0 sm:w-auto sm:justify-end">
          <div className="inset-shadow group inline-flex cursor-pointer items-center self-end rounded-md border border-black/10 bg-black/3 px-2 py-1 text-sm text-black shadow-md transition-all dark:border-white/15 dark:bg-white/15 dark:text-white dark:shadow-[0_0_5px_rgba(255,255,255,0.1)]">
            <Link href={'/contact'}>
              <div className="relative z-20 flex items-center gap-2 transition-all duration-300 group-hover:gap-8">
                <div className="h-5 w-5 shrink-0 overflow-hidden rounded-full">
                  <Image
                    alt="Sahil's avatar"
                    width={20}
                    height={20}
                    className="h-full w-full object-cover"
                    src="/avatar.avif"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <div className="absolute left-6 flex -translate-x-full transform items-center gap-0 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  <div className="mr-2 ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/10 text-[8px] dark:bg-white/10">
                    You
                  </div>
                </div>
                <span className="relative ml-0 block text-sm font-bold whitespace-nowrap transition-all duration-300 group-hover:ml-4">
                  Book A Free Call
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CTA;
