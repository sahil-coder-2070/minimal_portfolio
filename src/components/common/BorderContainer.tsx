import Container from "../layouts/Container";

const BorderContainer = ({ children, className }) => {
  return (
    <Container>
      <div className="relative">
        <div className="absolute -top-1.5 -left-1.5 h-3 w-3 bg-neutral-200/80 dark:bg-neutral-700/70"></div>
        <div className="absolute -top-1.5 -right-1.5 h-3 w-3 bg-neutral-200/80 dark:bg-neutral-700/70"></div>
        <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-neutral-200/80 dark:bg-neutral-700/70"></div>
        <div className="absolute -right-1.5 -bottom-1.5 h-3 w-3 bg-neutral-200/80 dark:bg-neutral-700/70"></div>
        <div
          className={`inset-shadow relative flex items-center justify-center border-2 border-dashed border-neutral-300/70 bg-neutral-50/80 dark:border-neutral-800/80 dark:bg-neutral-900/25 ${className} overflow-hidden border-dashed`}
        >
          <div className="absolute top-0 left-0 h-5 w-30 rounded-b-full bg-orange-800 blur-3xl dark:bg-neutral-200"></div>
          <div className="absolute top-0 right-0 h-5 w-30 rounded-b-full bg-orange-800 blur-3xl dark:bg-neutral-200"></div>

          {children}
        </div>
      </div>
    </Container>
  );
};

export default BorderContainer;
