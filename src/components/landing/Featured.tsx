"use client";

import React from 'react';
import Container from '../layouts/Container';
import SectionHeading from '../common/SectionHeading';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from './theme-provider';
import RepeatSeparator from '../ui/repeat-separator';

const Featured = ({ contributions = 0 }: { contributions?: number }) => {
  const { theme } = useTheme();
  const currentTheme = theme;

  return (
    <>
      <RepeatSeparator />
      <SectionHeading heading={'GitHub Activity'} />
      <Container className="py-4">
        <div className="space-y-6 px-4 py-1">
          <div className="flex w-full justify-between">
            <p className="text-primary mt-1 text-sm font-medium">
              Total: <span className="font-bold">{contributions} </span> contributions
            </p>
          </div>
          <div className="inset-shadow bg-background/50 github-card-shadow relative flex items-center justify-center rounded-lg border border-black/10 p-2 px-5 py-2 backdrop-blur-sm sm:p-4 md:p-6 dark:border-white/10">
            <GitHubCalendar
              username="sahilcodexx"
              blockSize={7}
              blockMargin={5}
              colorScheme={currentTheme === 'dark' ? 'dark' : 'light'}
              theme={{
                light: ['#ebedf0', '#c6cbd1', '#8b949e', '#57606a', '#24292f'],
                dark: ['#161b22', '#2d333b', '#636e7b', '#8b949e', '#c9d1d9'],
              }}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Featured;
