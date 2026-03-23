import React from "react";
import { Link } from "react-router-dom";

interface SkillProps {
  name?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Skill({ name, href, children, className }: SkillProps) {
  return (
    <Link
      to={href ?? ""}
      target="_blank"
      className={`inline-flex items-center self-end rounded-md border border-black/10 bg-black/2 px-2 py-1 text-sm text-black dark:border-white/15 dark:bg-white/5 dark:text-white ${className}`}
    >
      <div className="size-4 shrink-0">{children}</div>
      <p className="ml-1 text-sm font-bold">{name}</p>
    </Link>
  );
}
