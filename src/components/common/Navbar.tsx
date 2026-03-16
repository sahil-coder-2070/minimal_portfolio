import React, { useState } from "react";
import ThemeToggel from "./ThemeToggel";
import { Link } from "react-router-dom";
import Container from "../layouts/Container";
import { motion } from "motion/react";
import { CommandMany } from "./CommandMany";
import { Menu, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navList = [
  { name: "Work", href: "/work" },
  { name: "Blogs", href: "/blogs" },
  { name: "Projects", href: "/projects" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    });
  }

  return (
    <>
      <Container className="sticky top-0 z-100 pt-2">
        <motion.div
          className={`m-auto flex w-full items-center justify-between gap-2 border-b px-3 py-3 backdrop-blur-md md:px-6 md:py-4 ${
            scrolled ? "rounded-xl border-x md:py-3" : ""
          }`}
        >
          <div>
            <div className="box-border h-12 w-12 overflow-hidden rounded-md border-2 border-neutral-300 bg-blue-300 p-1 duration-200 hover:scale-90 dark:border-neutral-200 dark:bg-yellow-300">
              <Link to="/">
                <img
                  src="./Avatar.png"
                  alt="Avatar"
                  className="box-border h-12 scale-105 cursor-pointer object-cover"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-3 md:flex">
              {navList.map((items) => {
                return (
                  <Link
                    key={items.name}
                    to={items.href}
                    className="text-md text-pretty underline-offset-5 duration-500 hover:underline"
                  >
                    {" "}
                    {items.name}{" "}
                  </Link>
                );
              })}
              <CommandMany />
            </div>
            <ThemeToggel />
          </div>
        </motion.div>
      </Container>

      <div className="bg-background/95 fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border px-4 py-2 shadow-lg backdrop-blur-md md:hidden">
        <Button
          onClick={() => setCommandOpen(true)}
          size="sm"
          variant="outline"
          className="w-fit gap-2 rounded-full"
        >
          <Search size={16} />
          <span>Search</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg">
              <Menu size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="top"
            sideOffset={16}
            className="w-48"
          >
            <DropdownMenuItem>
              <Link to="/" className="w-full">
                Home
              </Link>
            </DropdownMenuItem>
            {navList.map((items) => (
              <DropdownMenuItem key={items.name}>
                <Link to={items.href} className="w-full">
                  {items.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CommandMany
        open={commandOpen}
        onOpenChange={setCommandOpen}
        hideButton
      />
    </>
  );
};

export default Navbar;
