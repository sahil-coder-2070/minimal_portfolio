import React, { useState } from "react";
import ThemeToggel from "./ThemeToggel";
import { Link } from "react-router-dom";
import Container from "../layouts/Container";
import { motion } from "motion/react";

const navList = [
  { name: "Work", href: "/work" },
  { name: "Blogs", href: "/blogs" },
  { name: "Projects", href: "/projects" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    });
  }

  return (
    <Container className="sticky top-0 z-100 pt-2">
      <motion.div
        animate={{
          width: scrolled ? "95%" : "100%",
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`m-auto flex w-full items-center justify-between gap-2 border-b px-3 py-3 backdrop-blur-md md:px-6 md:py-4 ${
          scrolled ? "rounded-2xl border md:py-3" : ""
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
          <div className="flex items-center gap-3">
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
          </div>
          <ThemeToggel />
        </div>
      </motion.div>
    </Container>
  );
};

export default Navbar;
