import { Bell, ChevronDown } from "lucide-react";
import {
  Sidebar,
  AppHeader,
  AppContainer,
  PageTitle,
  PageDescription,
} from "@/components/ui";
import { PkycLogo } from "@/components/ui/pkyc-logo";
import { StatsCard } from "@/components/dashboard/stats-card";
import { PriorityAlerts } from "@/components/dashboard/priority-alerts";
import { RiskDistribution } from "@/components/dashboard/risk-distribution";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SystemStatus } from "@/components/dashboard/system-status";
import {
  statsCards,
  priorityAlerts,
  riskDistribution,
  recentActivity,
  systemStatus,
  sidebarNav,
} from "@/lib/data/dashboard-data";

/* ---- Offline Banner ---- */
function OfflineBanner() {
  return (
    <div className="border-t border-white/10 px-4 py-3">
      <div className="flex items-center gap-2 text-xs">
        <span className="h-2 w-2 rounded-full bg-success-base" />
        <span className="font-medium text-white/80">Mode hors ligne</span>
      </div>
      <p className="mt-0.5 pl-4 text-[11px] text-white/40">
        Toutes les fonctionnalités sont disponibles
      </p>
    </div>
  );
}

/* ---- Header End Slot ---- */
function HeaderEnd() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-neutral-600">
        <span className="h-2 w-2 rounded-full bg-success-base" />
        <div className="leading-tight">
          <span className="font-medium text-neutral-900 block">Synchronisé</span>
          <span className="text-[11px] text-neutral-500">Il y a 2 min</span>
        </div>
      </div>
      <button
        type="button"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-error-base text-[10px] font-bold text-white">
          3
        </span>
      </button>
      <div className="flex items-center gap-2 pl-3 border-l border-neutral-200">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-sm font-bold text-neutral-700">
          AC
        </div>
        <span className="text-sm font-medium text-neutral-900">Agent Conformité</span>
        <ChevronDown className="h-4 w-4 text-neutral-400" />
      </div>
    </div>
  );
}

/* ================================================================ */
/*  DASHBOARD PAGE                                                   */
/* ================================================================ */

export default function DashboardPage() {
  const allGroups = sidebarNav.groups;

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Sidebar */}
      <Sidebar
        logo={
          <div className="flex items-center gap-2 text-white font-bold">
            <PkycLogo size={24} />
            <span className="text-xs">pKYC Africa</span>
          </div>
        }
        groups={allGroups}
        footer={<OfflineBanner />}
      />

      {/* Main area */}
      <div className="pl-[var(--spacing-app-sidebar)]">
        <AppHeader
          className="border-b border-neutral-200 bg-white"
          end={<HeaderEnd />}
        />

        <main className="p-8">
          <AppContainer>
            {/* Greeting */}
            <div className="mb-2">
              <PageTitle>Bonjour, Agent Conformité</PageTitle>
              <PageDescription>
                Voici un aperçu de l&apos;activité de conformité de pKYC Africa.
              </PageDescription>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statsCards.map((card) => (
                <StatsCard key={card.label} {...card} />
              ))}
            </div>

            {/* Main Grid: Alerts + Risk | Activity + System */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column: Alerts table + Activity */}
              <div className="lg:col-span-2 space-y-6">
                <PriorityAlerts alerts={priorityAlerts} count={8} />
                <RecentActivity items={recentActivity} />
              </div>

              {/* Right column: Risk chart + System status */}
              <div className="space-y-6">
                <RiskDistribution {...riskDistribution} />
                <SystemStatus items={systemStatus} />
              </div>
            </div>
          </AppContainer>
        </main>
      </div>
    </div>
  );
}
