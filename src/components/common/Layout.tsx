import Navbar from './Navbar';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute top-0 bottom-0 -left-2 z-0 w-2 border-r border-neutral-200 md:-left-6 md:w-6 dark:border-neutral-800 dark:opacity-60"></div>

      <div className="pointer-events-none absolute top-0 -right-2 bottom-0 z-0 w-2 border-l border-neutral-200 md:-right-6 md:w-6 dark:border-neutral-800 dark:opacity-60"></div>
      <Navbar />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Layout;
