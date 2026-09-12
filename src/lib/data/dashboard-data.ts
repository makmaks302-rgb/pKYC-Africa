export type StatsCardTone = "default" | "danger" | "info";

export const statsCards: {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  trendLabel: string;
  icon: "Users" | "AlertTriangle" | "Search" | "ShieldCheck";
  tone: StatsCardTone;
  trendPositive: boolean;
}[] = [
  {
    label: "Clients actifs",
    value: "12 458",
    trend: "+3,2%",
    trendDirection: "up",
    trendLabel: "vs mois précédent",
    icon: "Users",
    tone: "default",
    trendPositive: true,
  },
  {
    label: "Alertes ouvertes",
    value: "24",
    trend: "+12,0%",
    trendDirection: "up",
    trendLabel: "vs mois précédent",
    icon: "AlertTriangle",
    tone: "danger",
    trendPositive: false,
  },
  {
    label: "Investigations en cours",
    value: "7",
    trend: "-30,0%",
    trendDirection: "down",
    trendLabel: "vs mois précédent",
    icon: "Search",
    tone: "info",
    trendPositive: true,
  },
  {
    label: "Clients à risque élevé/critique",
    value: "48",
    trend: "+8,5%",
    trendDirection: "up",
    trendLabel: "vs mois précédent",
    icon: "ShieldCheck",
    tone: "danger",
    trendPositive: false,
  },
];

export type AlertLevel = "Critique" | "Élevé" | "Moyen";

export interface PriorityAlert {
  id: string;
  client: string;
  motif: string;
  level: AlertLevel;
  date: string;
}

export const priorityAlerts: PriorityAlert[] = [
  { id: "KYC-0241", client: "Koffi Mensa", motif: "Match sanctions", level: "Critique", date: "Aujourd'hui 10:24" },
  { id: "KYC-0238", client: "Aminata Traoré", motif: "PPE détectée", level: "Élevé", date: "Aujourd'hui 09:42" },
  { id: "KYC-0235", client: "Samba Diallo", motif: "Flux inhabituel", level: "Élevé", date: "Aujourd'hui 08:17" },
  { id: "KYC-0227", client: "Fatou Coulibaly", motif: "Document suspect", level: "Moyen", date: "Hier 16:03" },
  { id: "KYC-0221", client: "Idriss Mahamat", motif: "Match sanctions", level: "Élevé", date: "Hier 14:27" },
];

export const riskDistribution = {
  total: "12 458",
  subLabel: "clients",
  segments: [
    { color: "#16A34A", percent: 82.4, label: "Faible" },
    { color: "#F59E0B", percent: 12.7, label: "Moyen" },
    { color: "#EA580C", percent: 3.8, label: "Élevé" },
    { color: "#DC2626", percent: 0.8, label: "Critique" },
  ],
};

export interface ActivityItem {
  icon: "UserPlus" | "Search" | "AlertTriangle" | "CheckCircle" | "RefreshCw";
  title: string;
  detail: string;
  time: string;
}

export const recentActivity: ActivityItem[] = [
  { icon: "UserPlus", title: "Nouveau client créé", detail: "Kouassi Yao (KYC-0248)", time: "Il y a 12 min" },
  { icon: "Search", title: "Screening effectué", detail: "Amina Diarra (KYC-0247)", time: "Il y a 28 min" },
  { icon: "AlertTriangle", title: "Alerte créée", detail: "Ousmane Koné (KYC-0246) - Match sanctions", time: "Il y a 1 h" },
  { icon: "CheckCircle", title: "Investigation clôturée", detail: "Fatou Traoré (KYC-0242) - Aucun risque identifié", time: "Il y a 2 h" },
  { icon: "RefreshCw", title: "Liste de sanctions mise à jour", detail: "OFAC - 12 nouvelles entrées", time: "Il y a 4 h" },
];

export interface SystemStatusItem {
  status: "synced" | "up-to-date" | "pending";
  label: string;
  detail: string;
}

export const systemStatus: SystemStatusItem[] = [
  { status: "synced", label: "Base locale synchronisée", detail: "Il y a 2 min" },
  { status: "up-to-date", label: "Listes de sanctions à jour", detail: "Il y a 5 min" },
  { status: "pending", label: "3 modifications en attente", detail: "En attente de synchronisation" },
];

export const sidebarNav = {
  groups: [
    {
      items: [
        { label: "Dashboard", href: "/", active: true },
        { label: "Clients", href: "/clients" },
        { label: "Screening", href: "/screening" },
        { label: "Alertes", href: "/alertes", badge: 8 },
        { label: "Risques", href: "/risques" },
        { label: "Transactions", href: "/transactions" },
        { label: "Investigation", href: "/investigation" },
        { label: "Journal d'audit", href: "/audit" },
      ],
    },
    {
      items: [
        { label: "Synchronisation", href: "/sync" },
      ],
    },
    {
      items: [
        { label: "Utilisateurs", href: "/users" },
        { label: "Paramètres", href: "/settings" },
      ],
    },
  ],
};
