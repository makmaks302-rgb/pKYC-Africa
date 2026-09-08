import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:
    "border-blue-secondary bg-blue-secondary text-white shadow-xs hover:bg-blue-secondary/90 active:bg-blue-secondary",
  secondary:
    "border-blue-secondary bg-white text-blue-secondary shadow-xs hover:bg-info-light active:bg-info-light",
  tertiary:
    "border-transparent bg-transparent text-blue-secondary hover:bg-info-light",
  outline:
    "border-neutral-300 bg-white text-neutral-700 shadow-xs hover:bg-neutral-100",
  ghost:
    "border-transparent bg-transparent text-neutral-700 hover:bg-neutral-200",
  danger:
    "border-error-base bg-error-base text-white shadow-xs hover:bg-error-base/90",
};

const sizes = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-9 gap-2 px-4 text-sm",
  lg: "h-10 gap-2 px-5 text-sm",
  icon: "h-9 w-9 gap-0 p-0",
};

const iconSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-4 w-4",
  icon: "h-4 w-4",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      startIcon: StartIcon,
      endIcon: EndIcon,
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border font-semibold transition-[color,background-color,border-color,box-shadow]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary/30 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2
          className={cn(iconSizes[size], "animate-spin")}
          aria-hidden="true"
        />
      ) : (
        StartIcon && <StartIcon className={iconSizes[size]} aria-hidden="true" />
      )}
      {children}
      {!isLoading && EndIcon && (
        <EndIcon className={iconSizes[size]} aria-hidden="true" />
      )}
    </button>
  )
);
Button.displayName = "Button";

export { Button };
