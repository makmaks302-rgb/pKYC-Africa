import { ArrowRight } from "lucide-react";
import { RiskBadge, type RiskLevel } from "./risk-badge";
import { cn } from "@/lib/utils/cn";
import type { PriorityAlert } from "@/lib/data/dashboard-data";

const levelBarColor: Record<RiskLevel, string> = {
  Critique: "bg-red-600",
  Élevé: "bg-orange-600",
  Moyen: "bg-amber-500",
  Faible: "bg-emerald-600",
};

interface PriorityAlertsProps {
  alerts: PriorityAlert[];
  count: number;
}

export function PriorityAlerts({ alerts, count }: PriorityAlertsProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-5 pb-0">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Alertes prioritaires
          </h2>
          <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
            {count}
          </span>
        </div>
        <a
          href="/alertes"
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
        >
          Voir toutes <ArrowRight className="h-3 w-3" />
        </a>
      </div>

      {/* Table */}
      <div className="p-5 pt-3">
        <div className="w-full overflow-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-500">
                <th className="py-2.5 pr-3">ID</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Motif</th>
                <th className="py-2.5 px-3">Niveau</th>
                <th className="py-2.5 pl-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-8 w-1 shrink-0 rounded-full",
                          levelBarColor[alert.level as RiskLevel]
                        )}
                      />
                      <span className="font-mono text-xs font-medium text-slate-900">
                        {alert.id}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-900">{alert.client}</td>
                  <td className="py-3 px-3 text-slate-600">{alert.motif}</td>
                  <td className="py-3 px-3">
                    <RiskBadge level={alert.level as RiskLevel} />
                  </td>
                  <td className="py-3 pl-3 text-slate-400">{alert.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
