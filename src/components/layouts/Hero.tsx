import React, { useState, useEffect } from 'react';
import Container from './Container';
import BioText from '../landing/BioText';
import ResumeButton from '../landing/ResumeButton';
import SocialLinks from '../landing/SocialLinks';
import { motion as Motion } from 'motion/react';
import { fetchRepoStars } from '@/api/github';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Star, Eye } from 'lucide-react';
import { Github } from '@/lib/techIcons';
import { useVisitorCount } from '@/hooks/useVisitorCount';
import { GitHubLogo } from '../icons/tech/GithubLogo';
import { Separator } from '../ui/separator';

const Hero = () => {
  const [stars, setStars] = useState(0);
  const visitorCount = useVisitorCount();

  useEffect(() => {
    const loadStars = async () => {
      const count = await fetchRepoStars();
      setStars(count);
    };
    loadStars();
  }, []);

  return (
    <Container className={`flex flex-col items-start justify-center py-18`}>
      <div className="w-full items-center gap-3 md:flex">
        <div className="w-fit rounded-[9px] border p-[3.8px] dark:border-neutral-700">
          <Motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="box-border h-28 w-28 overflow-hidden rounded-[8px] border bg-neutral-200 object-cover p-1 duration-200 select-none dark:bg-white"
          >
            <Motion.img
              src="./myavart.png"
              alt="Avatar"
              className="box-border h-28 scale-105 object-cover"
            />
          </Motion.div>
        </div>
      </div>
      <div className="mt-8 flex w-full items-start justify-between">
        <div className="w-full flex-1">
          <h2 className="flex w-full flex-col text-4xl font-semibold text-neutral-700 dark:text-neutral-50">
            Sahil Singh
            <span className="flex items-center gap-2 text-lg font-medium text-neutral-500/70 dark:text-neutral-400">
              Desgin Engineer.
              <h2 className="text-xs font-medium text-neutral-500/70 dark:text-neutral-400">
                | 20, Gujarat IND
              </h2>
            </span>
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="custom" size="custom" asChild>
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
          <span className="flex items-center gap-1 text-[11px] text-neutral-400 select-none dark:text-neutral-500">
            <Eye className="h-3 w-3" />
            {visitorCount !== null ? `${visitorCount.toLocaleString()} visitors` : '—'}
          </span>
        </div>
      </div>
      <Separator />
      <BioText />
      <ResumeButton />
      <SocialLinks />
    </Container>
  );
};

export default Hero;
