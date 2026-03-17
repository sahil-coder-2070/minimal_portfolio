import * as React from "react"

import { cn } from "@/lib/utils"

function Quotecard({
  className,
  ...props
}) {
  return (
    <div
      data-slot="Quotecard"
      className={cn(
        "flex flex-col gap-6 rounded-xl border bg-Quotecard py-6 text-Quotecard-foreground shadow-sm",
        className
      )}
      {...props} />
  );
}

function QuotecardHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="Quotecard-header"
      className={cn(
        "@container/Quotecard-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=Quotecard-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props} />
  );
}

function QuotecardTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="Quotecard-title"
      className={cn("leading-none font-semibold", className)}
      {...props} />
  );
}

function QuotecardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="Quotecard-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props} />
  );
}

function QuotecardAction({
  className,
  ...props
}) {
  return (
    <div
      data-slot="Quotecard-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props} />
  );
}

function QuotecardContent({
  className,
  ...props
}) {
  return (<div data-slot="Quotecard-content" className={cn("px-6", className)} {...props} />);
}

function QuotecardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="Quotecard-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props} />
  );
}

export {
  Quotecard,
  QuotecardHeader,
  QuotecardFooter,
  QuotecardTitle,
  QuotecardAction,
  QuotecardDescription,
  QuotecardContent,
}
