"use client";

import React from 'react';
import Container from '../layouts/Container';
import SectionHeading from '../common/SectionHeading';
import RepeatSeparator from '../ui/repeat-separator';
import { GitHubActivity } from '../ui/github-activity';

const Featured = () => {
  return (
    <>
      <RepeatSeparator />
      <SectionHeading heading={'GitHub Activity'} />
      <Container className="py-4">
        <div className="flex justify-center px-4 py-1">
          <GitHubActivity
            username="sahilcodexx"
            showMonths={true}
            defaultOpen={false}
          />
        </div>
      </Container>
    </>
  );
};

export default Featured;
