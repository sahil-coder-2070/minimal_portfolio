import { cn } from "@/lib/utils";
import {
  Quotecard as QuoteCard,
  QuotecardHeader as QuoteCardHeader,
  QuotecardTitle as QuoteCardTitle,
  QuotecardContent as QuoteCardContent,
} from "@/components/ui/QuoteCard";

const Placeholder = {
  title: <div className="bg-secondary h-8 w-full max-w-40 rounded-md" />,
  content: <div className="bg-secondary h-20 w-full rounded-md" />,
};

const Line = ({ className = "" }) => (
  <div
    className={cn(
      "absolute z-0 h-px w-full from-zinc-200 from-1% via-zinc-400 to-zinc-600 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500",
      className,
    )}
  />
);
const Lines = () => (
  <>
    <Line className="top-2 left-0 bg-linear-to-l sm:top-4 md:top-6" />
    <Line className="bottom-2 left-0 bg-linear-to-r sm:bottom-4 md:bottom-6" />

    <Line className="inset-y-0 right-2 h-full w-px bg-linear-to-t sm:right-4 md:right-6" />
    <Line className="inset-y-0 left-2 h-full w-px bg-linear-to-t sm:left-4 md:left-6" />
  </>
);

export const LayoutCard = ({
  quote = "",
  author = "",
}: {
  quote?: string;
  author?: string;
}) => {
  const isPlaceholder = !quote && !author;

  return (
    <div className="relative">
      <Lines />
      <QuoteCard className="w-full border-none px-10 py-20 shadow-none">
        <QuoteCardHeader>
          {isPlaceholder ? (
            <QuoteCardTitle>{Placeholder.title}</QuoteCardTitle>
          ) : (
            <QuoteCardTitle>
              <p className="dark:text-dark-white-300 relative z-10 font-mono font-medium text-pretty text-zinc-500 italic">
                "{quote}"
              </p>
            </QuoteCardTitle>
          )}
        </QuoteCardHeader>
        <QuoteCardContent>
          {isPlaceholder ? (
            <>{Placeholder.content}</>
          ) : (
            <p className="text-highlight text-right font-mono text-pretty italic">
              — {author}
            </p>
          )}
        </QuoteCardContent>
      </QuoteCard>
    </div>
  );
};
