import * as React from "react";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "critical"
  | "info"
  | "low"
  | "medium"
  | "high"
  | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  withDot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  default: "border-neutral-300 bg-white text-neutral-700",
  success: "border-success-base/30 bg-success-light text-success-base",
  low: "border-success-base/30 bg-success-light text-success-base",
  warning: "border-warning-base/30 bg-warning-light text-warning-base",
  medium: "border-warning-base/30 bg-warning-light text-warning-base",
  high: "border-warning-base/40 bg-warning-light text-warning-base",
  error: "border-error-base/30 bg-error-light text-error-base",
  critical: "border-error-base/30 bg-error-light text-error-base",
  info: "border-blue-secondary/30 bg-info-light text-blue-secondary",
  outline: "border-neutral-300 bg-neutral-100 text-neutral-600",
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", withDot = false, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold leading-4 transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {withDot && <Circle className="h-2 w-2 fill-current" aria-hidden="true" />}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

export interface StatusIndicatorProps {
  tone?: BadgeVariant;
  status?: string;
  label: string;
  className?: string;
}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ tone, status, label, className }, ref) => {
    const derived = tone ?? toneFromStatus(status ?? "");
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center gap-2 text-sm text-neutral-600", className)}
      >
        <span className={cn("h-2 w-2 rounded-full", dotColor(derived))} />
        <span>{label}</span>
      </span>
    );
  }
);
StatusIndicator.displayName = "StatusIndicator";

export function dotColor(tone: BadgeVariant): string {
  switch (tone) {
    case "success":
    case "low":
      return "bg-success-base";
    case "warning":
    case "medium":
    case "high":
      return "bg-warning-base";
    case "error":
    case "critical":
      return "bg-error-base";
    case "info":
      return "bg-blue-secondary";
    case "outline":
      return "bg-neutral-300";
    default:
      return "bg-neutral-500";
  }
}

export function toneFromStatus(status: string): BadgeVariant {
  switch (status.toLowerCase()) {
    case "active":
    case "approved":
    case "completed":
    case "complete":
    case "resolved":
    case "low":
      return "success";
    case "pending":
    case "submitted":
    case "in_review":
    case "needs_more_info":
    case "medium":
      return "warning";
    case "in_progress":
    case "en_attente":
      return "info";
    case "rejected":
    case "blocked":
    case "failed":
    case "escalated":
    case "critical":
      return "critical";
    default:
      return "default";
  }
}

export { Badge, StatusIndicator };
