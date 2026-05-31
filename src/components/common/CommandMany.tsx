"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
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
  HouseIcon,
  UserIcon,
  LayersIcon,
  BookOpenIcon,
  CornerDownLeftIcon,
  Search,
  RocketIcon,
  Bookmark,
} from "lucide-react";
import { useTheme } from "@/components/landing/theme-provider";
import { ProjectCardData } from "@/config/projects/ProjectCardData";
import { BlogCardData } from "@/config/blog/BlogCardData";

export function CommandMany({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  hideButton = false,
}: {
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  hideButton?: boolean;
} = {}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen =
    externalOnOpenChange !== undefined ? externalOnOpenChange : setInternalOpen;
  const { setTheme } = useTheme();
  const router = useRouter();

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
          router.push("/");
          break;
        case "w":
          setOpen(false);
          router.push("/work");
          break;
        case "p":
          setOpen(false);
          router.push("/projects");
          break;
        case "b":
          setOpen(false);
          router.push("/blogs");
          break;
        case "m":
          setOpen(false);
          router.push("/bookmarks");
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
  }, [open, setTheme, router]);

  return (
    <div className="flex flex-col gap-4">
      {!hideButton && (
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          variant="outline"
          className="w-fit rounded-2xl"
        >
          <Search size={14} />
          <p className="bg-secondary/30 rounded-sm p-0.5 px-1 text-xs inset-shadow-sm">
            Ctrl
          </p>
          <p className="bg-secondary/30 rounded-sm p-0.5 px-1.5 text-xs inset-shadow-sm">
            K
          </p>
        </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
              <CommandItem
                onSelect={() => {
                  router.push("/");
                  setOpen(false);
                }}
              >
                <HouseIcon />
                <span>Home</span>
                <CommandShortcut className="hidden sm:inline-flex">H</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/work");
                  setOpen(false);
                }}
              >
                <UserIcon />
                <span>Work</span>
                <CommandShortcut className="hidden sm:inline-flex">W</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/projects");
                  setOpen(false);
                }}
              >
                <LayersIcon />
                <span>Projects</span>
                <CommandShortcut className="hidden sm:inline-flex">P</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/blogs");
                  setOpen(false);
                }}
              >
                <BookOpenIcon />
                <span>Blog</span>
                <CommandShortcut className="hidden sm:inline-flex">B</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/bookmarks");
                  setOpen(false);
                }}
              >
                <Bookmark />
                <span>Bookmarks</span>
                <CommandShortcut className="hidden sm:inline-flex">M</CommandShortcut>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Projects">
              {ProjectCardData.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => {
                    router.push(project.links.details);
                    setOpen(false);
                  }}
                >
                  <RocketIcon />
                  <span>{project.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Blog">
              {BlogCardData.map((blog) => (
                <CommandItem
                  key={blog.slug}
                  onSelect={() => {
                    router.push(`/blogs/${blog.slug}`);
                    setOpen(false);
                  }}
                >
                  <BookOpenIcon />
                  <span>{blog.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem
                onSelect={() => {
                  setTheme("light");
                  setOpen(false);
                }}
              >
                <SunIcon />
                <span>Light</span>
                <CommandShortcut className="hidden sm:inline-flex">L</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setTheme("dark");
                  setOpen(false);
                }}
              >
                <MoonIcon />
                <span>Dark</span>
                <CommandShortcut className="hidden sm:inline-flex">D</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setTheme("system");
                  setOpen(false);
                }}
              >
                <MonitorIcon />
                <span>Auto</span>
                <CommandShortcut className="hidden sm:inline-flex">A</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandDialogFooter>
            <h2 className="text-secondary">Sahilcodex</h2>
            <div className="hidden sm:flex items-center gap-2">
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
      </CommandDialog>
    </div>
  );
}
