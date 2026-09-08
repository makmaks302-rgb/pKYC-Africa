import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          "select-no-chevron flex h-10 w-full cursor-pointer appearance-none rounded-md border border-neutral-300 bg-white py-2 pl-3 pr-9 text-sm text-neutral-900 shadow-xs transition-all",
          "focus:border-blue-secondary focus:outline-none focus:ring-2 focus:ring-blue-secondary/20",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
          !props.value && !props.defaultValue && "text-neutral-500",
          error &&
            "border-error-base text-error-base focus:border-error-base focus:ring-error-base/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
      />
    </div>
  )
);
Select.displayName = "Select";

export { Select };
