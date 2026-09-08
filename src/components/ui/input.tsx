import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, startIcon: StartIcon, endIcon: EndIcon, ...props }, ref) => (
    <div className="relative w-full">
      {StartIcon && (
        <StartIcon
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
        />
      )}
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-xs transition-all",
          "placeholder:text-neutral-500",
          "focus:border-blue-secondary focus:outline-none focus:ring-2 focus:ring-blue-secondary/20",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
          StartIcon && "pl-9",
          EndIcon && "pr-9",
          error &&
            "border-error-base text-error-base focus:border-error-base focus:ring-error-base/20",
          className
        )}
        {...props}
      />
      {EndIcon && (
        <EndIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
        />
      )}
    </div>
  )
);
Input.displayName = "Input";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-semibold leading-none text-neutral-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

export { Input, Label };
