import * as React from "react";
import {
  CheckCircle2,
  WifiOff,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ConnectionStatus = "synced" | "offline" | "syncing";

export interface ConnectionStatusItem {
  status: ConnectionStatus;
  label: string;
  detail?: string;
  pendingOperations?: number;
}

/* -------------------------------------------------------------------------- */
/*  ConnectionStatusBar                                                        */
/* -------------------------------------------------------------------------- */

export interface ConnectionStatusBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items?: ConnectionStatusItem[];
}

const statusConfig: Record<
  ConnectionStatus,
  { icon: React.ElementType; color: string; bg: string }
> = {
  synced: {
    icon: CheckCircle2,
    color: "text-success-base",
    bg: "bg-success-light",
  },
  offline: {
    icon: WifiOff,
    color: "text-warning-base",
    bg: "bg-warning-light",
  },
  syncing: {
    icon: RefreshCw,
    color: "text-warning-base",
    bg: "bg-warning-light",
  },
};

const ConnectionStatusBar = React.forwardRef<
  HTMLDivElement,
  ConnectionStatusBarProps
>(({ className, items = [], ...props }, ref) => {
  if (items.length === 0) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-4 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-xs",
        className
      )}
      {...props}
    >
      {items.map((item, i) => {
        const cfg = statusConfig[item.status];
        const Icon = cfg.icon;
        return (
          <div key={i} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full",
                cfg.bg
              )}
            >
              <Icon
                className={cn(
                  "h-3.5 w-3.5",
                  cfg.color,
                  item.status === "syncing" && "animate-spin"
                )}
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0">
              <span className="font-medium text-neutral-900">{item.label}</span>
              {item.detail && (
                <span className="ml-1.5 text-neutral-500">{item.detail}</span>
              )}
              {item.pendingOperations !== undefined &&
                item.pendingOperations > 0 && (
                  <span className="ml-1.5 text-neutral-400">
                    {item.pendingOperations} operation(s) en attente
                  </span>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
});
ConnectionStatusBar.displayName = "ConnectionStatusBar";

export { ConnectionStatusBar };
