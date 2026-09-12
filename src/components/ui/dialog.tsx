"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const DialogContext = React.createContext<{
  onClose: () => void;
  titleId: string;
  descriptionId: string;
}>({
  onClose: () => {},
  titleId: "dialog-title",
  descriptionId: "dialog-description",
});

export function useDialog() {
  return React.useContext(DialogContext);
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  const onClose = React.useCallback(() => onOpenChange(false), [onOpenChange]);
  const titleId = React.useId();
  const descriptionId = React.useId();

  // Lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ onClose, titleId, descriptionId }}>
      {createPortal(
        <div className="fixed inset-0 z-[var(--z-dialog)] overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/50 backdrop-blur-[1px]"
            aria-hidden="true"
            onClick={onClose}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            {children}
          </div>
        </div>,
        document.body
      )}
    </DialogContext.Provider>
  );
};

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Prevent closing when the overlay is clicked. */
  hideOnOutsideClick?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-full",
};

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      className,
      hideOnOutsideClick = false,
      size = "md",
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const { onClose, titleId, descriptionId } = useDialog();

    React.useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
      <div
        role="presentation"
        className="relative z-10 w-full"
        onMouseDown={(e) => {
          if (hideOnOutsideClick) return;
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            "relative w-full rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-lg",
            "focus:outline-none",
            sizeStyles[size],
            className
          )}
          onKeyDown={onKeyDown}
          {...props}
        />
      </div>
    );
  }
);
DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Hide the built-in close button. */
  hideClose?: boolean;
}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, hideClose = false, children, ...props }, ref) => {
    const { onClose } = useDialog();
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between gap-4 border-b border-neutral-200 px-6 py-4",
          className
        )}
        {...props}
      >
        <div className="space-y-1">{children}</div>
        {!hideClose && (
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="shrink-0 rounded-md p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { titleId } = useDialog();
  return (
    <h2
      ref={ref}
      id={titleId}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
});
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { descriptionId } = useDialog();
  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-neutral-500", className)}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";

const DialogBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
));
DialogBody.displayName = "DialogBody";

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-2 border-t border-neutral-200 px-6 py-4",
      className
    )}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
};