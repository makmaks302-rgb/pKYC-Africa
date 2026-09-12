import {
  UserPlus,
  Search,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ActivityItem } from "@/lib/data/dashboard-data";

const iconMap = {
  UserPlus,
  Search,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} as const;

const iconColor: Record<ActivityItem["icon"], string> = {
  UserPlus: "text-blue-600",
  Search: "text-blue-600",
  AlertTriangle: "text-amber-500",
  CheckCircle: "text-emerald-600",
  RefreshCw: "text-blue-600",
};

interface RecentActivityProps {
  items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-5 pb-0">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Activité récente
        </span>
        <a
          href="/audit"
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
        >
          Voir toutes <ArrowRight className="h-3 w-3" />
        </a>
      </div>

      {/* Items */}
      <div className="p-5 pt-3">
        <div className="space-y-0 divide-y divide-slate-100">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={i}
                className="flex items-start justify-between gap-2 py-3 first:pt-0 last:pb-0 text-[11px]"
              >
                <div className="flex items-start gap-2">
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 shrink-0 mt-0.5",
                      iconColor[item.icon]
                    )}
                  />
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-500">{item.detail}</p>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 shrink-0">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
