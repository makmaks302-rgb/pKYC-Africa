import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* -------------------------------------------------------------------------- */
/*  ProgressBar                                                                */
/* -------------------------------------------------------------------------- */

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress 0–100. */
  value?: number;
  /** Optional label above the bar. */
  label?: string;
  /** Show the numeric percentage inside the bar. */
  showValue?: boolean;
  /** Bar color variant. */
  variant?: "default" | "success" | "warning" | "error";
  /** Bar size. */
  size?: "sm" | "md" | "lg";
}

const barColors = {
  default: "bg-blue-secondary",
  success: "bg-success-base",
  warning: "bg-warning-base",
  error: "bg-error-base",
};

const barSizes = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value = 0,
      label,
      showValue = false,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    const clamped = Math.max(0, Math.min(100, value));
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(label || showValue) && (
          <div className="mb-1 flex items-center justify-between text-sm">
            {label && <span className="text-neutral-700">{label}</span>}
            {showValue && (
              <span className="font-medium text-neutral-500">{clamped}%</span>
            )}
          </div>
        )}
        <div
          className={cn(
            "w-full overflow-hidden rounded-full bg-neutral-200",
            barSizes[size]
          )}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-500 ease-out",
              barColors[variant]
            )}
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

/* -------------------------------------------------------------------------- */
/*  StepProgress                                                               */
/* -------------------------------------------------------------------------- */

export interface Step {
  label: string;
  status?: "completed" | "current" | "upcoming" | "error";
}

export interface StepProgressProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  currentStep?: number;
}

const stepStyles = {
  completed:
    "bg-success-base text-white border-success-base",
  current:
    "bg-blue-secondary text-white border-blue-secondary ring-4 ring-blue-secondary/20",
  upcoming:
    "bg-white text-neutral-500 border-neutral-300",
  error:
    "bg-error-base text-white border-error-base",
};

const StepProgress = React.forwardRef<HTMLOListElement, StepProgressProps>(
  ({ className, steps, currentStep, ...props }, ref) => {
    const active = currentStep ?? steps.findIndex((s) => s.status === "current");
    return (
      <ol
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {steps.map((step, i) => {
          const resolvedStatus: Step["status"] =
            step.status ??
            (i < active ? "completed" : i === active ? "current" : "upcoming");
          return (
            <li key={i} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                    stepStyles[resolvedStatus]
                  )}
                >
                  {resolvedStatus === "completed" ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : resolvedStatus === "error" ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="text-xs text-neutral-500">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1",
                    i < active ? "bg-success-base" : "bg-neutral-200"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    );
  }
);
StepProgress.displayName = "StepProgress";

export { ProgressBar, StepProgress };
