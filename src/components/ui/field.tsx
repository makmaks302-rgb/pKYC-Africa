import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Label } from "./input";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Control id, wired to the label for accessibility. */
  id?: string;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: string | React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}

/**
 * Form field wrapper that combines a label, the control, and optional
 * hint / error messaging into one consistent unit.
 */
const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, id, label, hint, error, required, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required ? (
              <span className="ml-0.5 text-error-base" aria-hidden="true">
                *
              </span>
            ) : null}
          </Label>
        )}
        {children}
        {error ? (
          <p role="alert" className="text-xs font-medium text-error-base">
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-neutral-500">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Field.displayName = "Field";

export { Field };
