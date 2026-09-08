import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Renders an indeterminate dash state (also sets aria-checked="mixed"). */
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate = false, checked, ...props }, ref) => {
    return (
      <span className="relative inline-flex h-4 w-4 shrink-0">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          className={cn(
            "peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-neutral-300 bg-white",
            "checked:border-blue-secondary checked:bg-blue-secondary",
            "indeterminate:border-blue-secondary indeterminate:bg-blue-secondary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary/30 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors",
            className
          )}
          {...props}
        />
        <Check
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-0 top-0 h-4 w-4 p-0.5 text-white transition-opacity",
            checked && !indeterminate ? "opacity-100" : "opacity-0"
          )}
        />
        <Minus
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-0 top-0 h-4 w-4 p-0.5 text-white transition-opacity",
            indeterminate && !checked ? "opacity-100" : "opacity-0"
          )}
        />
      </span>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
