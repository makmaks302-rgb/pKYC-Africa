import * as React from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  /** Renders a close button and calls this when dismissed. */
  onDismiss?: () => void;
}

const iconFor: Record<AlertVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

const styles: Record<AlertVariant, { wrap: string; icon: string; title: string }> = {
  info: {
    wrap: "border-blue-secondary/30 bg-info-light text-blue-secondary",
    icon: "text-blue-secondary",
    title: "text-neutral-900",
  },
  success: {
    wrap: "border-success-base/30 bg-success-light text-success-base",
    icon: "text-success-base",
    title: "text-neutral-900",
  },
  warning: {
    wrap: "border-warning-base/30 bg-warning-light text-warning-base",
    icon: "text-warning-base",
    title: "text-neutral-900",
  },
  error: {
    wrap: "border-error-base/30 bg-error-light text-error-base",
    icon: "text-error-base",
    title: "text-neutral-900",
  },
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, children, onDismiss, ...props }, ref) => {
    const Icon = iconFor[variant];
    const s = styles[variant];
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-xs",
          s.wrap,
          className
        )}
        {...props}
      >
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", s.icon)} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          {title && <p className={cn("mb-0.5 font-semibold", s.title)}>{title}</p>}
          <div className="text-neutral-600">{children}</div>
        </div>
        {onDismiss && (
          <button
            type="button"
            aria-label="Close alert"
            onClick={onDismiss}
            className="shrink-0 rounded p-0.5 text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary/30"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert };
