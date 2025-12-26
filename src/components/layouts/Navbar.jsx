import React from "react";
import Container from "./Container";
import ThemeToggel from "./ThemeToggel";
import { Link } from "react-router-dom";

const navList = [
  { name: "Work", href: "/work" },
  { name: "Blogs", href: "/blogs" },
  { name: "Projects", href: "/projects" },
];

export const Navbar = () => {
  return (
    <Container className={`flex items-center justify-between gap-2 px-7 py-4`}>
      <div>
        <div className="box-border h-12 w-12 overflow-hidden rounded-md border-2 border-neutral-300 bg-blue-300 p-1 duration-200 hover:scale-90 dark:border-neutral-200 dark:bg-yellow-300">
          <Link to={"/ "}>
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
                to={items.href}
                className="text-md text-pretty underline-offset-5 duration-500 hover:underline"
              >
                {" "}
                {items.name}{" "}
              </Link>
            );
          })}
          <Link />
        </div>
        <button>
          <ThemeToggel />
        </button>
      </div>
    </Container>
  );
};
