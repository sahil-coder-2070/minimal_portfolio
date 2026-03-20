"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandDialogFooter,
} from "@/components/ui/command";
import {
  MoonIcon,
  SunIcon,
  MonitorIcon,
  HomeIcon,
  BriefcaseIcon,
  FolderIcon,
  FileTextIcon,
  CornerDownLeftIcon,
  Search,
} from "lucide-react";
import { useTheme } from "@/components/landing/theme-provider";
import { Link } from "react-router-dom";
import { ProjectCardData } from "@/config/projects/ProjectCardData";
import { BlogCardData } from "@/config/blog/BlogCardData";

export function CommandMany() {
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case "h":
          setOpen(false);
          window.location.href = "/";
          break;
        case "w":
          setOpen(false);
          window.location.href = "/#work";
          break;
        case "p":
          setOpen(false);
          window.location.href = "/projects";
          break;
        case "b":
          setOpen(false);
          window.location.href = "/blogs";
          break;
        case "d":
          setTheme("dark");
          break;
        case "l":
          setTheme("light");
          break;
        case "a":
          setTheme("system");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [open, setTheme]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setOpen(true)}
        size="sm"
        variant="outline"
        className="w-fit rounded-2xl"
      >
        <Search size={8} />
        <p className="bg-secondary/30 rounded-sm p-0.5 px-1 text-xs inset-shadow-sm">
          Ctrl
        </p>
        <p className="bg-secondary/30 rounded-sm p-0.5 px-1.5 text-xs inset-shadow-sm">
          K
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Navigation">
              <CommandItem>
                <Link
                  to="/"
                  className="flex w-full items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <HomeIcon />
                  <span>Home</span>
                </Link>
                <CommandShortcut>H</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Link
                  to="/#work"
                  className="flex w-full items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <BriefcaseIcon />
                  <span>Work</span>
                </Link>
                <CommandShortcut>W</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Link
                  to="/projects"
                  className="flex w-full items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <FolderIcon />
                  <span>Projects</span>
                </Link>
                <CommandShortcut>P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Link
                  to="/blogs"
                  className="flex w-full items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <FileTextIcon />
                  <span>Blog</span>
                </Link>
                <CommandShortcut>B</CommandShortcut>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Projects">
              {ProjectCardData.map((project) => (
                <CommandItem key={project.id}>
                  <Link
                    to={project.links.details}
                    className="flex w-full items-center gap-2"
                    onClick={() => setOpen(false)}
                  >
                    <FolderIcon />
                    <span>{project.title}</span>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Blog">
              {BlogCardData.map((blog) => (
                <CommandItem key={blog.slug}>
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="flex w-full items-center gap-2"
                    onClick={() => setOpen(false)}
                  >
                    <FileTextIcon />
                    <span>{blog.title}</span>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem onSelect={() => setTheme("light")}>
                <SunIcon />
                <span>Light</span>
                <CommandShortcut>L</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setTheme("dark")}>
                <MoonIcon />
                <span>Dark</span>
                <CommandShortcut>D</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setTheme("system")}>
                <MonitorIcon />
                <span>Auto</span>
                <CommandShortcut>A</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandDialogFooter>
            <h2 className="text-secondary">Sahilcodex</h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs">
                Go to page
                <span className="bg-secondary/20 text-secondary rounded-[3px] px-1.5 py-1 text-xs inset-shadow-sm">
                  <CornerDownLeftIcon size={10} />
                </span>
              </span>{" "}
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                Exit
                <span className="bg-secondary/20 text-secondary py- rounded-[3px] px-1 text-xs inset-shadow-sm">
                  Esc
                </span>
              </span>
            </div>
          </CommandDialogFooter>
        </Command>
      </CommandDialog>
    </div>
  );
}
