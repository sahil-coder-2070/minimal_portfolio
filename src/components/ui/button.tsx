import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border inset-shadow  bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        toggle:
          "border inset-shadow bg-muted text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        custom:
          "border inset-shadow  bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/10 dark:border-input dark:hover:bg-input/30 cursor-pointer rounded-full opacity-90 ",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        custom: "h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 ",
        "icon-sm": "size-8 ",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(function Button(
  {
    className,
    variant = "default",
    size = "default",
    asChild = false,
    children,
    ...props
  }: {
    className?: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "toggle"
      | "ghost"
      | "link"
      | "custom";
    size?: "default" | "sm" | "custom" | "lg" | "icon" | "icon-sm" | "icon-lg";
    asChild?: boolean;
    children?: React.ReactNode;
  } & React.ComponentPropsWithoutRef<"button">,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
