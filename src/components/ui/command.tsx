"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CommandProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  className?: string;
}

function Command({ className, ...props }: CommandProps) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-lg p-0.5 pb-0",
        className,
      )}
      {...props}
    />
  );
}

interface CommandDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("w-[600px] max-w-[90vw] overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="**:[[cmdk-group-heading]]:text-muted-foreground [&_**:[[cmdk-item]]:px-2 **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group]:not([hidden])_+[cmdk-group]]:pb-0 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group]]:px-2 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:py-1.5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  className?: string;
}

function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div data-slot="command-input-wrapper " className="p-1 pb-0">
      <div
        data-slot="command-input-wrapper"
        className="group/input-group has-disabled:bg-input/50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 border-input/30 bg-input/30 relative flex h-8! w-full min-w-0 items-center justify-center gap-2 rounded-lg border px-1.5 shadow-none! transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto *:data-[slot=input-group-addon]:pl-2! has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5"
      >
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "placeholder:text-muted-foreground flex h-8 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}

interface CommandListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
  className?: string;
}

function CommandList({ className, ...props }: CommandListProps) {
  return (
    <div className="relative">
      <CommandPrimitive.List
        data-slot="command-list"
        className={cn(
          "max-h-[295px] scroll-py-1 overflow-x-hidden overflow-y-auto",
          className,
        )}
        {...props}
      />
      <div className="from-popover pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t to-transparent" />
    </div>
  );
}

function CommandEmpty(props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

interface CommandGroupProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  className?: string;
}

function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 pt-2 pb-2 [&_[cmdk-group-heading]]:mt-0 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

interface CommandSeparatorProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {
  className?: string;
}

function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-2 my-2 h-px", className)}
      {...props}
    />
  );
}

interface CommandItemProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  className?: string;
}

function CommandItem({ className, ...props }: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "dark:data-[selected=true]:bg-accent/40 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-lg px-2 py-1 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function CommandDialogFooter({ className, ...props }) {
  return (
    <div
      data-slot="command-dialog-footer"
      className={cn(
        "border-border/30 bg-popover/50 mt-[4px] flex items-center justify-between border-t px-3 py-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandDialogFooter,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
