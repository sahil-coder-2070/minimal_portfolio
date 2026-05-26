import Navbar from './Navbar';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute top-0 bottom-0 -left-6 z-0 hidden w-6 border-r border-neutral-100 md:block dark:border-neutral-800"></div>

      <div className="pointer-events-none absolute top-0 -right-6 bottom-0 z-0 hidden w-6 border-l border-neutral-100 md:block dark:border-neutral-800"></div>
      <Navbar />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Layout;
