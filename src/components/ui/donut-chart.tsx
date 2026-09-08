import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface DonutSegment {
  /** Color (Tailwind class or CSS value). */
  color: string;
  /** Percentage of the ring (0-100). */
  percent: number;
  /** Legend label. */
  label: string;
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Center value (e.g. "70"). */
  value: string;
  /** Small text below the value. */
  subLabel?: string;
  /** Ring segments. Percents should sum to 100. */
  segments: DonutSegment[];
  /** Chart diameter in px. */
  size?: number;
  /** Ring thickness as % of diameter (default 25). */
  thickness?: number;
}

function buildConicGradient(segments: DonutSegment[]): string {
  let acc = 0;
  const parts = segments.map((s) => {
    const start = acc;
    acc += s.percent;
    return `${s.color} ${start}% ${acc}%`;
  });
  return `conic-gradient(${parts.join(", ")})`;
}

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      className,
      value,
      subLabel = "Score",
      segments,
      size = 96,
      thickness = 25,
      ...props
    },
    ref
  ) => {
    const innerPercent = 100 - thickness * 2;
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3", className)}
        {...props}
      >
        <div
          className="relative shrink-0 rounded-full"
          style={{
            width: size,
            height: size,
            background: buildConicGradient(segments),
          }}
        >
          <div
            className="absolute inset-0 m-auto flex flex-col items-center justify-center rounded-full bg-white shadow-inner"
            style={{
              width: `${innerPercent}%`,
              height: `${innerPercent}%`,
            }}
          >
            <span className="text-xs font-black leading-none text-slate-900">
              {value}
            </span>
            <span className="scale-90 text-[7px] font-medium text-slate-400">
              {subLabel}
            </span>
          </div>
        </div>
        <div className="space-y-1 text-[10px] font-medium">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </span>
              <span className="font-mono text-slate-500">{s.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
DonutChart.displayName = "DonutChart";

export { DonutChart };
