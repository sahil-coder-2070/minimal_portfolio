import Navbar from "./Navbar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 -left-11 hidden w-6 border-r border-[#e2d9ce94] md:block dark:border-[rgb(42,38,35,0.72)] dark:bg-[repeating-linear-gradient(315deg,rgb(42,38,35,0.72)_0px,rgb(42,38,35,0.72)_1px,transparent_0px,transparent_50%)]"></div>

      <div className="absolute top-0 -right-11 bottom-0 hidden w-6 border-l border-[#e2d9ce94] md:block dark:border-[rgba(42,38,35,0.72)] dark:bg-[repeating-linear-gradient(315deg,rgb(42,38,35,0.72)_0px,rgb(42,38,35,0.72)_1px,transparent_0px,transparent_50%)]"></div>

      <Navbar />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Layout;
