import { useState } from "react";
import { quotes } from "@/config/Quote";
import Container from "../layouts/Container";
import { LayoutCard } from "./LayoutCard";

export const Quote = () => {
  const [currentQuote] = useState(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  });

  if (!currentQuote) return null;

  const { quote, author } = currentQuote;

  return (
    <Container className="py-16">
      {/* <div className="inset-shadow dark:border-dark-white-50 relative rounded-xl border px-4 py-10">
        <p className="dark:text-dark-white-300 relative z-10 font-mono font-medium text-pretty text-zinc-500 italic">
          “{quote}”
        </p>
        <p className="text-highlight text-right font-mono text-pretty italic">
          — {author}
        </p>

      </div> */}
      <LayoutCard quote={quote} author={author} />
    </Container>
  );
};
