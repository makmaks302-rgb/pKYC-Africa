"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  close: () => void;
}

const DropdownContext = React.createContext<DropdownContextValue>({
  open: false,
  setOpen: () => {},
  close: () => {},
});

export interface DropdownProps {
  /** Controlling component keeps `open`/`onOpenChange` in sync. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Dropdown = ({
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  children,
  className,
}: DropdownProps) => {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const open = openProp ?? uncontrolled;
  const setOpen = React.useCallback(
    (next: boolean) => {
      setUncontrolled(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, close }}>
      <div ref={rootRef} className={cn("relative inline-block text-left", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export type DropdownTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, onClick, ...props }, ref) => {
    const { open, setOpen } = React.useContext(DropdownContext);
    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          onClick?.(e);
          setOpen(!open);
        }}
        className={cn("inline-flex items-center", className)}
        {...props}
      />
    );
  }
);
DropdownTrigger.displayName = "DropdownTrigger";

export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end";
}

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, align = "end", ...props }, ref) => {
    const { open } = React.useContext(DropdownContext);
    if (!open) return null;
    return (
      <div
        ref={ref}
        role="menu"
        aria-orientation="vertical"
        className={cn(
          "absolute z-[var(--z-dropdown)] mt-1 min-w-[12rem] rounded-lg border border-neutral-200 bg-white p-1 shadow-lg",
          align === "end" ? "right-0" : "left-0",
          "origin-top-right",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownContent.displayName = "DropdownContent";

export interface DropdownItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  selected?: boolean;
  /**
   * Renders the menu item as a destructive action (red text, hover).
   */
  destructive?: boolean;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, children, selected, destructive, onSelect, onClick, ...props }, ref) => {
    const { close } = React.useContext(DropdownContext);
    return (
      <button
        ref={ref}
        type="button"
        role="menuitemradio"
        aria-checked={selected}
        onClick={(e) => {
          onClick?.(e);
          onSelect?.(e);
          close();
        }}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-neutral-700",
          "hover:bg-neutral-100 hover:text-neutral-900",
          "focus-visible:outline-none focus-visible:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-brand-primary/40",
          "transition-colors cursor-pointer",
          destructive && "text-error-base hover:bg-error-light/50 hover:text-error-base",
          className
        )}
        {...props}
      >
        <span className="flex-1 truncate">{children}</span>
        {selected && (
          <Check className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
        )}
      </button>
    );
  }
);
DropdownItem.displayName = "DropdownItem";

const DropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("-mx-1 my-1 h-px bg-neutral-200", className)}
    {...props}
  />
));
DropdownSeparator.displayName = "DropdownSeparator";

const DropdownLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-semibold text-neutral-400", className)}
    {...props}
  />
));
DropdownLabel.displayName = "DropdownLabel";

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
};