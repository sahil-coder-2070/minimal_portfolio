import { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section className={`container mx-auto md:max-w-[715px] px-2 font-sans md:px-0 ${className} `}>
      {children}
    </section>
  );
};

export default Container;
