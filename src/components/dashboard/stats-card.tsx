import {
  Users,
  AlertTriangle,
  Search,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { StatsCardTone } from "@/lib/data/dashboard-data";

const iconMap = {
  Users,
  AlertTriangle,
  Search,
  ShieldCheck,
} as const;

const toneStyles: Record<
  StatsCardTone,
  {
    card: string;
    iconBg: string;
    iconColor: string;
    labelColor: string;
    valueColor: string;
  }
> = {
  default: {
    card: "bg-white border border-slate-200 rounded-xl",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    labelColor: "text-slate-500",
    valueColor: "text-slate-900",
  },
  danger: {
    card: "bg-red-50/40 border border-red-200 rounded-xl",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    labelColor: "text-red-600",
    valueColor: "text-red-600",
  },
  info: {
    card: "bg-blue-50/30 border border-blue-200 rounded-xl",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    labelColor: "text-slate-600",
    valueColor: "text-slate-900",
  },
};

interface StatsCardProps {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  trendLabel: string;
  icon: keyof typeof iconMap;
  tone: StatsCardTone;
  trendPositive: boolean;
}

export function StatsCard({
  label,
  value,
  trend,
  trendDirection,
  trendLabel,
  icon,
  tone,
  trendPositive,
}: StatsCardProps) {
  const Icon = iconMap[icon];
  const TrendIcon = trendDirection === "up" ? TrendingUp : TrendingDown;
  const styles = toneStyles[tone];

  const trendColor = trendPositive ? "text-emerald-600" : "text-red-600";

  return (
    <div className={cn(styles.card, "p-4 flex flex-col justify-between")}>
      <span className={cn("text-xs font-semibold", styles.labelColor)}>
        {label}
      </span>
      <div className="my-4">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
            styles.iconBg,
            styles.iconColor
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn("text-2xl font-extrabold", styles.valueColor)}>
          {value}
        </div>
        <span className="text-xs text-slate-500">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "flex items-center gap-1 text-xs font-semibold",
            trendColor
          )}
        >
          <TrendIcon className="h-3 w-3" />
          {trend}
        </span>
        <span className="text-[10px] text-slate-400">{trendLabel}</span>
      </div>
    </div>
  );
}
