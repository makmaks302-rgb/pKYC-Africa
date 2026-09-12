import { CheckCircle, Shield, AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SystemStatusItem } from "@/lib/data/dashboard-data";

const statusConfig: Record<
  SystemStatusItem["status"],
  { icon: React.ElementType; color: string; bg: string }
> = {
  synced: {
    icon: CheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  "up-to-date": {
    icon: Shield,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  pending: {
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
};

interface SystemStatusProps {
  items: SystemStatusItem[];
}

export function SystemStatus({ items }: SystemStatusProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl flex flex-col">
      {/* Header */}
      <div className="p-5 pb-0">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
          État du système
        </span>
      </div>

      {/* Items */}
      <div className="p-5 pt-3">
        <div className="space-y-0 divide-y divide-slate-100">
          {items.map((item, i) => {
            const cfg = statusConfig[item.status];
            const Icon = cfg.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 cursor-pointer group"
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    cfg.bg
                  )}
                >
                  <Icon className={cn("h-4 w-4", cfg.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-900 leading-tight">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-500">{item.detail}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
