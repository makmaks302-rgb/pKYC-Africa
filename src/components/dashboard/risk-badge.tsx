import { cn } from "@/lib/utils/cn";

export type RiskLevel = "Faible" | "Moyen" | "Élevé" | "Critique";

const riskConfig: Record<
  RiskLevel,
  { cls: string; svg: React.ReactNode }
> = {
  Faible: {
    cls: "bg-emerald-50 text-emerald-600 border-emerald-300",
    svg: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.5 2.5 2.5 5-5" />
      </>
    ),
  },
  Moyen: {
    cls: "bg-amber-50 text-amber-500 border-amber-300",
    svg: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </>
    ),
  },
  Élevé: {
    cls: "bg-orange-50 text-orange-600 border-orange-200",
    svg: (
      <>
        <circle cx="12" cy="12" r="9" />
        <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
      </>
    ),
  },
  Critique: {
    cls: "bg-red-50 text-red-600 border-red-200",
    svg: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </>
    ),
  },
};

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const config = riskConfig[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
        config.cls,
        className
      )}
    >
      <svg
        className="w-3.5 h-3.5 shrink-0 stroke-[2.5]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        {config.svg}
      </svg>
      {level}
    </span>
  );
}
