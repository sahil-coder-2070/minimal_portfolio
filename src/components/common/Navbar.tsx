import { useState } from 'react';
import ThemeToggel from './ThemeToggel';
import { Link } from 'react-router-dom';
import Container from '../layouts/Container';
import { motion } from 'motion/react';
import { CommandMany } from './CommandMany';
import { Menu, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const navList = [
  { name: 'Work', href: '/work' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Projects', href: '/projects' },
];

export const Navbar = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <div className="bg-background sticky top-0 isolate z-50 pt-1">
        <Container>
          <div>
            <motion.div
            className={`before:bg-border after:bg-border relative m-auto mt-1 flex w-full max-w-screen items-center justify-between gap-2 overflow-visible py-1.5 transition-shadow duration-300 before:absolute before:top-0 before:left-1/2 before:z-[1] before:h-px before:w-screen before:-translate-x-1/2 before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:z-[1] after:h-px after:w-screen after:-translate-x-1/2 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black] px-4`}
          >
            <div>
              <h2>SS</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-3 md:flex">
                {navList.map((items) => {
                  return (
                    <Link
                      key={items.name}
                      to={items.href}
                      className="text-md font-light text-pretty underline-offset-5 duration-500 hover:underline"
                    >
                      {' '}
                      {items.name}{' '}
                    </Link>
                  );
                })}
                <CommandMany />
              </div>
              <span className="bg-border h-4 w-px"></span>
              <ThemeToggel />
            </div>
            </motion.div>
          </div>
        </Container>
      </div>

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
          <DropdownMenuContent align="end" side="top" sideOffset={16} className="w-48">
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

      <CommandMany open={commandOpen} onOpenChange={setCommandOpen} hideButton />
    </>
  );
};

export default Navbar;
