import * as React from 'react';

export interface GitHubActivityProps extends React.HTMLAttributes<HTMLDivElement> {
  username?: string;
  contributions?: Array<{ date: string; count: number; level: number }>;
  repos?: Array<{ name: string; count: number; href?: string; logo?: React.ReactNode }>;
  year?: number;
  accent?: string | string[];
  cellSize?: number;
  months?: number;
  showMonths?: boolean;
  label?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export declare const GitHubActivity: React.ComponentType<GitHubActivityProps>;
export default GitHubActivity;
