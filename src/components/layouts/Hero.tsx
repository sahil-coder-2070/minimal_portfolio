import Container from './Container';
import BioText from '../landing/BioText';
import ResumeButton from '../landing/ResumeButton';
import Spotify from '../landing/Spotify';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { GitHubLogo } from '../icons/tech/GithubLogo';
import RepeatSeparator from '../ui/repeat-separator';
import VisitorCounter from '../landing/VisitorCounter';

const Hero = ({ stars = 0 }: { stars?: number }) => {

  return (
    <Container className={`flex flex-col items-start justify-center`}>
      <div className="flex h-full w-full">
        <div className="p-5">
          <div className="w-fit rounded-[9px] border p-[3.8px] dark:border-neutral-700">
            <div className="box-border h-30 w-30 overflow-hidden rounded-[8px] border bg-neutral-200 object-cover p-1 duration-200 select-none dark:bg-white">
              <img
                src="/avatar.avif"
                alt="Avatar"
                className="box-border h-full w-full scale-120 object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1">
          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="custom" asChild>
                  <a
                    href="https://github.com/sahilcodexx/minimal_portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>
                        <GitHubLogo />
                      </span>
                      {stars}
                    </div>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{stars} Stars on GitHub</p>
              </TooltipContent>
            </Tooltip>
            <VisitorCounter />
          </div>

          <h1 className="flex w-full flex-col pb-0.5 text-3xl font-medium text-neutral-700 dark:text-neutral-50">
            Sahil Singh
          </h1>
          <span className="flex items-center gap-2 text-base font-medium text-neutral-500/70 dark:text-neutral-400">
            Design Engineer.
          </span>
          <h2 className="text-xs font-medium text-neutral-500/70 dark:text-neutral-400">
            20, Gujarat IND
          </h2>
        </div>
      </div>
      <RepeatSeparator />
      <BioText />
      <Spotify />
      <RepeatSeparator />
      <ResumeButton />
    </Container>
  );
};

export default Hero;
