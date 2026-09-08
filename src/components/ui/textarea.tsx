import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-24 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-xs transition-all",
        "placeholder:text-neutral-500",
        "focus:border-blue-secondary focus:outline-none focus:ring-2 focus:ring-blue-secondary/20",
        "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
        error &&
          "border-error-base text-error-base focus:border-error-base focus:ring-error-base/20",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
