import { ArrowRight } from "lucide-react";

interface RiskDistributionProps {
  total: string;
  subLabel: string;
  segments: { color: string; percent: number; label: string }[];
}

export function RiskDistribution({
  total,
  subLabel,
  segments,
}: RiskDistributionProps) {
  const legendColors = [
    "bg-emerald-600",
    "bg-amber-500",
    "bg-orange-600",
    "bg-red-600",
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4">
        Répartition des risques
      </span>
      <div className="flex items-center gap-3 flex-1">
        {/* Donut */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <div
            className="w-28 h-28 rounded-full"
            style={{
              background: `conic-gradient(${segments
                .map((s, i) => {
                  const start = segments.slice(0, i).reduce((a, b) => a + b.percent, 0);
                  return `${s.color} ${start}% ${start + s.percent}%`;
                })
                .join(", ")})`,
            }}
          >
            <div className="absolute inset-0 m-auto w-[55%] h-[55%] rounded-full bg-white shadow-inner flex flex-col items-center justify-center">
              <span className="text-xs font-black text-slate-900 leading-none">
                {total}
              </span>
              <span className="text-[7px] text-slate-400 font-medium scale-90">
                {subLabel}
              </span>
            </div>
          </div>
        </div>
        {/* Legend */}
        <div className="space-y-1 text-[10px] w-full font-medium">
          {segments.map((s, i) => (
            <div key={s.label} className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${legendColors[i]}`} />{" "}
                {s.label}
              </span>
              <span className="font-mono text-slate-500">{s.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
