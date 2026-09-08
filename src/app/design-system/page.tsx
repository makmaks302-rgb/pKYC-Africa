"use client";

import * as React from "react";
import {
  Accessibility,
  AlertTriangle,
  BarChart3,
  Bell,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  Download,
  FileText,
  Globe,
  Home,
  Info,
  Mail,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Star,
  Upload,
  User,
  Users,
  Wifi,
  X,
} from "lucide-react";

/* ================================================================== */
/*  pKYC Africa — Design System Reference Page                         */
/*  Pixel-perfect replica of design/design-system.png                  */
/*  Semantic HTML · WCAG 2.1 AA · Tailwind tokens                      */
/* ================================================================== */

/* ---- Shared tiny helpers ----------------------------------------- */

function SectionCard({
  number,
  title,
  children,
  className = "",
  colSpan = "",
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
}) {
  return (
    <section
      className={`bg-white border border-slate-200 rounded-xl p-6 ${colSpan} ${className}`}
      aria-labelledby={`ds-${number}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-[11px] font-bold tracking-wide text-blue-600">{number}</span>
        <h2
          id={`ds-${number}`}
          className="text-xs font-bold uppercase tracking-wider text-slate-800"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold text-neutral-500">{children}</p>
  );
}

/* ---- Logo SVG (shared) ------------------------------------------ */

function PkycLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      className="shrink-0"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lg-hex" x1="24" y1="3" x2="24" y2="47" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ADE80" />
          <stop offset="0.5" stopColor="#22C55E" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id="lg-chk" x1="18" y1="19" x2="30" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
      </defs>
      <path
        d="M24 3L7 12.5V24c0 10.5 7.2 20.3 17 22.5C33.8 44.3 41 34.5 41 24V12.5L24 3z"
        fill="url(#lg-hex)"
        stroke="#15803D"
        strokeWidth="1"
      />
      <path
        d="M24 9L12 15v10c0 7.5 5.1 14.5 12 16.1C30.9 39.5 36 32.5 36 25V15L24 9z"
        fill="white"
      />
      <path
        d="M18 24.5L22 28.5L30 19"
        stroke="url(#lg-chk)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-8 lg:p-10 flex justify-center">
      <main className="w-full max-w-[1340px] bg-white border border-slate-200 shadow-xl rounded-xl p-6 md:p-10 space-y-8">

        {/* =========================================================== */}
        {/*  HEADER + 01 COULEURS (12-col: 4 + 8)                       */}
        {/* =========================================================== */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-slate-200 pb-8 items-start">
          {/* Left: Branding */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <PkycLogo size={40} />
                <div>
                  <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">pKYC Africa</span>
                  <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">Conformité LBC/FT/FP</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">Design System</h1>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-sm">
                Un langage visuel professionnel pour la plateforme de conformité LBC/FT/FP du réseau CIF. Conçu pour la clarté, la précision et la confiance.
              </p>
            </div>
            <div className="pt-4">
              <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">VERSION 1.0 &middot; MAI 2026</span>
            </div>
          </div>

          {/* Right: Section 01 Couleurs */}
          <section className="lg:col-span-8 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="font-mono text-[11px] font-bold tracking-wide text-blue-600">01</span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">COULEURS</h2>
            </div>
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-500 mb-3">Palette primaire</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {([
                  { bg: "#0F172A", name: "Bleu primaire", hex: "#0F172A", border: false },
                  { bg: "#2563EB", name: "Bleu secondaire", hex: "#2563EB", border: false },
                  { bg: "#16A34A", name: "Succès", hex: "#16A34A", border: false },
                  { bg: "#F59E0B", name: "Avertissement", hex: "#F59E0B", border: false },
                  { bg: "#DC2626", name: "Critique", hex: "#DC2626", border: false },
                  { bg: "#F8FAFC", name: "Neutre 100", hex: "#F8FAFC", border: true },
                ] as const).map((c) => (
                  <div key={c.hex} className="space-y-1.5">
                    <div className={`h-16 rounded-md shadow-sm ${c.border ? "border border-slate-200" : ""}`} style={{ backgroundColor: c.bg }} />
                    <p className="text-xs font-medium text-slate-800 truncate">{c.name}</p>
                    <p className="text-[10px] font-mono text-slate-500">{c.hex}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-500 mb-3">Neutres</h3>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                {([
                  { bg: "#0F172A", name: "Neutre 900", border: false },
                  { bg: "#1E293B", name: "Neutre 800", border: false },
                  { bg: "#334155", name: "Neutre 700", border: false },
                  { bg: "#475569", name: "Neutre 600", border: false },
                  { bg: "#64748B", name: "Neutre 500", border: false },
                  { bg: "#CBD5E1", name: "Neutre 300", border: false },
                  { bg: "#E2E8F0", name: "Neutre 200", border: false },
                  { bg: "#FFFFFF", name: "Blanc", border: true },
                ] as const).map((c) => (
                  <div key={c.name} className="space-y-1">
                    <div className={`h-12 rounded ${c.border ? "border border-slate-200" : ""}`} style={{ backgroundColor: c.bg }} />
                    <p className="text-[11px] font-medium text-slate-700 truncate">{c.name}</p>
                    <p className="text-[9px] font-mono text-slate-500">{c.bg}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </header>

        {/* =========================================================== */}
        {/*  02 + 03 TYPOGRAPHIE (12-col: 5 + 7)                        */}
        {/* =========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-slate-200 pb-8">
          <SectionCard number="02" title="Typographie" colSpan="lg:col-span-5">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl font-bold font-sans text-slate-900 leading-none">Aa</span>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">Police principale</p>
                  <p className="text-xl font-bold text-slate-900">Inter</p>
                  <p className="text-xs text-slate-600 font-sans">
                    <span className="font-light">Light</span> &middot; <span className="font-normal">Regular</span> &middot; <span className="font-medium">Medium</span> &middot; <span className="font-semibold">Semibold</span> &middot; <span className="font-bold">Bold</span>
                  </p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-5" />
              <div className="flex items-start gap-4">
                <span className="text-5xl font-bold font-mono text-slate-900 leading-none">Aa</span>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">Police monoespace (données)</p>
                  <p className="text-xl font-bold font-mono text-slate-900">JetBrains Mono</p>
                  <p className="text-xs text-slate-600 font-mono">
                    <span className="font-normal">Regular</span> &middot; <span className="font-medium">Medium</span>
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard number="03" title="Échelle typographique" colSpan="lg:col-span-7">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 font-semibold text-slate-500 text-[11px]">
                    <th className="py-2.5 pr-3">Style</th>
                    <th className="py-2.5 px-3">Police</th>
                    <th className="py-2.5 px-3">Taille / Hauteur</th>
                    <th className="py-2.5 px-3">Graisse</th>
                    <th className="py-2.5 pl-3">Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {([
                    { style: "Affichage 1", font: "Inter", size: "40 / 48 px", weight: "Bold", usage: "Titres de page", bold: true, semibold: false, sm: true, mono: false },
                    { style: "Affichage 2", font: "Inter", size: "32 / 40 px", weight: "Bold", usage: "Titres de section", bold: true, semibold: false, sm: false, mono: false },
                    { style: "Heading 1", font: "Inter", size: "24 / 32 px", weight: "Semibold", usage: "Titres de bloc", bold: false, semibold: true, sm: false, mono: false },
                    { style: "Heading 2", font: "Inter", size: "20 / 28 px", weight: "Semibold", usage: "Sous-titres", bold: false, semibold: true, sm: false, mono: false },
                    { style: "Corps large", font: "Inter", size: "16 / 24 px", weight: "Regular", usage: "Texte courant important", bold: false, semibold: false, sm: false, mono: false },
                    { style: "Corps", font: "Inter", size: "14 / 20 px", weight: "Regular", usage: "Texte courant", bold: false, semibold: false, sm: false, mono: false },
                    { style: "Petit texte", font: "Inter", size: "12 / 16 px", weight: "Regular", usage: "Aide, métadonnées", bold: false, semibold: false, sm: false, mono: false },
                    { style: "Données", font: "JetBrains Mono", size: "12 / 16 px", weight: "Regular", usage: "Données, tableaux", bold: false, semibold: false, sm: false, mono: true },
                  ] as const).map((r) => (
                    <tr key={r.style}>
                      <td className={`py-2 pr-3 text-slate-900 ${r.sm ? "text-sm" : ""} ${r.bold ? "font-bold" : r.semibold ? "font-semibold" : ""} ${r.mono ? "font-mono" : ""}`}>{r.style}</td>
                      <td className={`py-2 px-3 ${r.mono ? "font-mono" : ""}`}>{r.font}</td>
                      <td className="py-2 px-3 text-slate-500">{r.size}</td>
                      <td className="py-2 px-3 font-medium">{r.weight}</td>
                      <td className="py-2 pl-3 text-slate-600">{r.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* =========================================================== */}
        {/*  04 + 05 ESPACEMENT / RAYONS (12-col: 6 + 6)                */}
        {/* =========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-slate-200 pb-8">
          <SectionCard number="04" title="Échelle d'espacement" colSpan="lg:col-span-6">
            <div className="flex items-center justify-between mb-4">
              <div />
              <span className="text-xs font-medium text-slate-500">Base : 4px</span>
            </div>
            <div className="flex items-end justify-between h-36 pt-6 px-2 border-b border-slate-100">
              {([
                { px: 4, h: 4, bg: "bg-emerald-100" },
                { px: 8, h: 8, bg: "bg-emerald-200" },
                { px: 12, h: 12, bg: "bg-emerald-200" },
                { px: 16, h: 18, bg: "bg-emerald-300" },
                { px: 24, h: 26, bg: "bg-emerald-300" },
                { px: 32, h: 36, bg: "bg-emerald-300" },
                { px: 40, h: 48, bg: "bg-emerald-300" },
                { px: 64, h: 64, bg: "bg-emerald-300" },
                { px: 80, h: 80, bg: "bg-emerald-300" },
                { px: 96, h: 96, bg: "bg-emerald-300" },
              ] as const).map((s) => (
                <div key={s.px} className="flex flex-col items-center gap-1.5">
                  <div className={`w-3 md:w-5 ${s.bg} rounded-t`} style={{ height: s.h }} />
                  <span className="text-[10px] font-mono text-slate-400">{s.px}</span>
                  <span className="text-[10px] font-mono text-slate-600 font-medium">{s.px}px</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard number="05" title="Rayons & ombres" colSpan="lg:col-span-6">
            <div className="mb-5">
              <span className="text-[11px] font-semibold text-slate-500 block mb-2.5">Rayons</span>
              <div className="flex items-center justify-between gap-1">
                {([
                  { r: "rounded-none", l: "0px", n: "Aucun" },
                  { r: "rounded-[2px]", l: "2px", n: "XS" },
                  { r: "rounded-[4px]", l: "4px", n: "S" },
                  { r: "rounded-[6px]", l: "6px", n: "M" },
                  { r: "rounded-[8px]", l: "8px", n: "L" },
                  { r: "rounded-[12px]", l: "12px", n: "XL" },
                  { r: "rounded-[16px]", l: "16px", n: "2XL" },
                  { r: "rounded-full", l: "24px", n: "Rond" },
                ] as const).map((item) => (
                  <div key={item.l} className="text-center">
                    <div className={`w-8 h-8 border border-slate-300 mx-auto bg-slate-50 mb-1 ${item.r}`} />
                    <span className="text-[10px] text-slate-500 block">{item.l}</span>
                    <span className="text-[10px] font-medium text-slate-700">{item.n}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-2">Ombres</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[
                  { cls: "shadow-sm", l: "XS", d: "0 1px 2px 0 rgba(...)" },
                  { cls: "shadow", l: "S", d: "0 2px 4px 0 rgba(...)" },
                  { cls: "shadow-md", l: "M", d: "0 4px 8px -2px rgba(...)" },
                  { cls: "shadow-lg", l: "L", d: "0 8px 16px -4px rgba(...)" },
                  { cls: "shadow-xl", l: "XL", d: "0 12px 24px -4px rgba(...)" },
                ].map((item) => (
                  <div key={item.l} className={`p-2 border border-slate-100 rounded bg-white text-center ${item.cls}`}>
                    <span className="font-semibold block text-slate-800">{item.l}</span>
                    <span className="text-[9px] text-slate-400 font-mono">{item.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* =========================================================== */}
        {/*  06 + 07 + 08 ICONES / BOUTONS / CHAMPS (12-col: 3+6+3)    */}
        {/* =========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-slate-200 pb-8">
          <SectionCard number="06" title="Icônes" colSpan="lg:col-span-3" className="p-5">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-2">Outline (24px)</span>
                <div className="flex flex-wrap gap-2.5 text-slate-700">
                  {[Users, Search, BarChart3, Shield, Globe, Bell, Settings, ChevronRight].map((Icon, i) => (
                    <Icon key={i} className="w-5 h-5" />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-2">Filled (24px)</span>
                <div className="flex flex-wrap gap-2.5 text-slate-900">
                  {[Home, Search, Check, BarChart3, Shield, Globe, Bell, Settings, User, ChevronRight].map((Icon, i) => (
                    <Icon key={i} className="w-5 h-5 fill-slate-900" />
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-[#0F172A] mb-3">États</h4>
                <div className="flex items-center gap-4 text-xs flex-wrap">
                  {[
                    { label: "Par défaut", type: "filled" },
                    { label: "Actif / Sélectionné", type: "filled" },
                    { label: "Survol", type: "empty" },
                    { label: "Désactivé", type: "disabled" },
                  ].map((s) => (
                    <div key={s.label} className={`flex items-center gap-1.5 font-medium ${s.type === "disabled" ? "text-slate-400" : "text-slate-700"}`}>
                      <div className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center ${
                        s.type === "filled"
                          ? "border-[1.5px] border-blue-600"
                          : s.type === "empty"
                          ? "border-2 border-slate-400 bg-white"
                          : "border-2 border-slate-200 bg-slate-50"
                      }`}>
                        {s.type === "filled" && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </div>
                      <span className="whitespace-nowrap">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard number="07" title="Boutons" colSpan="lg:col-span-6" className="p-6 flex flex-col justify-between">
            <div>
              <div className="overflow-x-auto">
                <div className="min-w-[500px] space-y-4">
                  <div className="grid grid-cols-12 text-xs font-semibold text-slate-500 items-center pb-1 text-center gap-4">
                    <div className="col-span-2 text-left" />
                    {["Primaire", "Secondaire", "Tertiaire", "Désactivé"].map((h) => (
                      <div key={h} className={h === "Primaire" || h === "Secondaire" ? "col-span-3 text-center" : "col-span-2 text-center"}>{h}</div>
                    ))}
                  </div>
                  {([
                    { size: "Grand", h: "h-10", fs: "text-xs", px: "px-3" },
                    { size: "Moyen", h: "h-9", fs: "text-xs", px: "px-3" },
                    { size: "Petit", h: "h-8", fs: "text-[11px]", px: "px-2.5" },
                  ] as const).map((row) => (
                    <div key={row.size} className="grid grid-cols-12 gap-4 items-center">
                      <span className="col-span-2 text-xs font-bold text-slate-800">{row.size}</span>
                      <div className="col-span-3 flex justify-center">
                        <button className={`${row.h} bg-blue-600 hover:bg-blue-700 text-white font-semibold ${row.fs} ${row.px} rounded-md shadow-sm flex items-center justify-center whitespace-nowrap`} type="button">Bouton principal</button>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <button className={`${row.h} border border-blue-600 text-blue-600 bg-white font-semibold ${row.fs} ${row.px} rounded-md flex items-center justify-center whitespace-nowrap`} type="button">Bouton secondaire</button>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <button className={`text-blue-600 hover:underline font-semibold ${row.fs} px-2 py-2 flex items-center justify-center whitespace-nowrap`} type="button">Texte bouton</button>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <button className={`${row.h} bg-slate-100 text-slate-400 font-medium ${row.fs} ${row.px} rounded-md cursor-not-allowed flex items-center justify-center whitespace-nowrap`} disabled type="button">Bouton</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 block mb-3">États</span>
              <div className="grid grid-cols-4 gap-3">
                <button className="h-9 bg-blue-600 text-white rounded-md text-xs font-semibold flex items-center justify-center shadow-sm whitespace-nowrap" type="button">Par défaut</button>
                <button className="h-9 bg-slate-900 text-white rounded-md text-xs font-semibold flex items-center justify-center shadow-sm whitespace-nowrap" type="button">Survol</button>
                <button className="h-9 bg-slate-950 text-white rounded-md text-xs font-semibold flex items-center justify-center shadow-sm border border-slate-800 whitespace-nowrap" type="button">Actif</button>
                <button className="h-9 bg-slate-100 text-slate-400 rounded-md text-xs font-medium flex items-center justify-center cursor-not-allowed whitespace-nowrap" disabled type="button">Désactivé</button>
              </div>
            </div>
          </SectionCard>

          <SectionCard number="08" title="Champs de formulaire" colSpan="lg:col-span-3" className="p-5">
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Libellé</label>
                <div className="relative">
                  <input className="w-full text-xs py-1.5 px-3 border border-slate-300 rounded-md bg-white text-slate-800 focus:outline-none" readOnly type="text" defaultValue="Texte saisi" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Sélection</label>
                <div className="relative">
                  <select className="w-full text-xs py-1.5 px-3 border border-slate-300 rounded-md bg-white text-slate-600 appearance-none focus:outline-none">
                    <option>Sélectionner une option</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Date</label>
                <div className="relative">
                  <input className="w-full text-xs py-1.5 px-3 border border-slate-300 rounded-md bg-white text-slate-400 focus:outline-none" readOnly type="text" defaultValue="JJ / MM / AAAA" />
                  <Clock className="w-4 h-4 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-semibold text-slate-500 block mb-1.5">États</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <span className="text-[9px] text-blue-600 font-semibold block">Actif</span>
                    <input className="w-full text-[10px] py-1 px-2 border border-blue-500 rounded bg-blue-50/20 text-blue-900" readOnly type="text" defaultValue="Actif" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] text-red-600 font-semibold block">Erreur</span>
                    <input className="w-full text-[10px] py-1 px-2 border border-red-500 rounded bg-red-50/20 text-red-900" readOnly type="text" defaultValue="Erreur" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] text-slate-400 font-semibold block">Désactivé</span>
                    <input className="w-full text-[10px] py-1 px-2 border border-slate-200 rounded bg-slate-100 text-slate-400" disabled type="text" defaultValue="Désactivé" />
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* =========================================================== */}
        {/*  09 + 10 + 11 BADGES / STATUTS / PROGRESSION (12-col: 4+4+4) */}
        {/* =========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-slate-200 pb-8">
          <SectionCard number="09" title="Badges / Tags" colSpan="lg:col-span-4" className="p-5">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-2">Niveau de risque</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { l: "Faible", cls: "bg-emerald-50 text-emerald-600 border-emerald-300", svg: <><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.5 2.5 2.5 5-5" /></> },
                    { l: "Moyen", cls: "bg-amber-50 text-amber-500 border-amber-300", svg: <><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" /></> },
                    { l: "Élevé", cls: "bg-orange-50 text-orange-600 border-orange-200", svg: <><circle cx="12" cy="12" r="9" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" /></> },
                    { l: "Critique", cls: "bg-red-50 text-red-600 border-red-200", svg: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" fill="currentColor" /></> },
                  ].map((b) => (
                    <span key={b.l} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${b.cls}`}>
                      <svg className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">{b.svg}</svg>
                      {b.l}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-2">Statuts</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { l: "Actif", cls: "bg-emerald-50 text-emerald-600 border-emerald-300", svg: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" fill="currentColor" /></> },
                    { l: "Inactif", cls: "bg-slate-50 text-slate-700 border-slate-200", svg: <><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" /></> },
                    { l: "En attente", cls: "bg-blue-50 text-blue-600 border-blue-200", svg: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" strokeDasharray="3 3" /></> },
                    { l: "Fermé", cls: "bg-slate-50 text-slate-700 border-slate-200", svg: <><circle cx="12" cy="12" r="9" /><polygon points="12 8 15 15 9 15" fill="currentColor" /></> },
                  ].map((b) => (
                    <span key={b.l} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${b.cls}`}>
                      <svg className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">{b.svg}</svg>
                      {b.l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 10 STATUTS / INDICATEURS */}
          <SectionCard number="10" title="Statuts / Indicateurs" colSpan="lg:col-span-4" className="p-5">
            <span className="text-[11px] font-semibold text-slate-500 block mb-4">Étapes de workflow</span>
            <div className="relative flex items-center justify-between pt-5 pb-1 px-1">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200" aria-hidden="true" />
              {/* En cours */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="absolute -top-3.5 flex flex-col items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <div className="w-0.5 h-2 bg-blue-600" />
                </div>
                <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
                <span className="text-[10px] font-medium text-slate-700 mt-2">En cours</span>
              </div>
              {/* Complété */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-[#16A34A] -mt-0.5" />
                  <div className="w-1 h-1 rounded-full bg-[#16A34A] mt-0.5" />
                </div>
                <span className="text-[10px] font-medium text-slate-700 mt-1">Complété</span>
              </div>
              {/* Alerte */}
              <div className="relative z-10 flex flex-col items-center">
                <svg width="28" height="34" viewBox="0 0 28 34" fill="none" className="overflow-visible">
                  <path d="M14 0.5C14.8 1.8 15.6 2.8 16.5 3.5C15.6 4.2 14.8 5.2 14 6.5C13.2 5.2 12.4 4.2 11.5 3.5C12.4 2.8 13.2 1.8 14 0.5Z" fill="#F59E0B" />
                  <path d="M14 5.5V7.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 7.2C15.8 7.2 17.5 8.6 18.5 10.2L24.2 19.8C25.3 21.6 24.8 24 23.2 25.2C21.6 26.2 17.8 26.8 14 26.8C10.2 26.8 6.4 26.2 4.8 25.2C3.2 24 2.7 21.6 3.8 19.8L9.5 10.2C10.5 8.6 12.2 7.2 14 7.2Z" fill="#F59E0B" />
                  <path d="M14 26.2V28" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 33.5C14.8 32.2 15.6 31.2 16.5 30.5C15.6 29.8 14.8 28.8 14 27.5C13.2 28.8 12.4 29.8 11.5 30.5C12.4 31.2 13.2 32.2 14 33.5Z" fill="#F59E0B" />
                  <line x1="14" y1="12.5" x2="14" y2="18" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="14" cy="21.8" r="1.3" fill="white" />
                </svg>
                <span className="text-[10px] font-medium text-slate-700 mt-1">Alerte</span>
              </div>
              {/* Bloqué */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-sm">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-[#DC2626] -mt-0.5" />
                  <div className="w-1 h-1 rounded-full bg-[#DC2626] mt-0.5" />
                </div>
                <span className="text-[10px] font-medium text-slate-700 mt-1">Bloqué</span>
              </div>
              {/* En attente */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-300" />
                <span className="text-[10px] font-medium text-slate-400 mt-2">En attente</span>
              </div>
            </div>
          </SectionCard>

          {/* 11 BARRE DE PROGRESSION */}
          <SectionCard number="11" title="Barre de progression" colSpan="lg:col-span-4" className="p-5">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[11px] font-medium text-slate-600">Progression générale</span>
                  <span className="font-bold text-slate-900 font-mono text-[11px]">72%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "72%" }} />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-600 block mb-2.5">Progression par étape</span>
                <div className="relative flex items-center justify-between py-2">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-0.5 bg-blue-200" aria-hidden="true" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-0.5 bg-slate-200" aria-hidden="true" />
                  <div className="relative z-10 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">1</div>
                  <div className="relative z-10 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">2</div>
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full border-2 border-blue-400 flex items-center justify-center bg-white">
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">3</div>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-slate-400 absolute -top-1.5" />
                    <div className="w-5 h-5 rounded-full bg-white border border-slate-300 text-slate-700 flex items-center justify-center text-[10px] font-medium">4</div>
                    <span className="w-1 h-1 rounded-full bg-slate-400 absolute -bottom-1.5" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-slate-400 absolute -top-1.5" />
                    <div className="w-5 h-5 rounded-full bg-white border border-slate-300 text-slate-700 flex items-center justify-center text-[10px] font-medium">5</div>
                    <span className="w-1 h-1 rounded-full bg-slate-400 absolute -bottom-1.5" />
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* =========================================================== */}
        {/*  12 CARTES                                                   */}
        {/* =========================================================== */}
        <section className="border-b border-slate-200 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] font-bold tracking-wide text-blue-600">12</span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">CARTES</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
            {/* Carte statistique */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500">Carte statistique</span>
              <div className="my-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900">1 248</div>
                <span className="text-xs text-slate-500">Clients surveillés</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600">+ 56 ce mois</span>
            </div>
            {/* Alerte critique */}
            <div className="bg-red-50/40 border border-red-200 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-semibold text-red-600">Alerte critique</span>
              <div className="my-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-red-600">3</div>
                <span className="text-xs font-medium text-slate-600">Alertes critiques</span>
              </div>
              <span className="text-xs font-bold text-red-600">Nécessitent action</span>
            </div>
            {/* Correspondances */}
            <div className="bg-blue-50/30 border border-blue-200 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-600">Correspondances</span>
              <div className="my-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <Search className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black text-slate-900">12</div>
                <span className="text-xs text-slate-500">Correspondances à vérifier</span>
              </div>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">Voir le détail →</a>
            </div>
            {/* Activité récente */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-700 mb-2">Activité récente</span>
              <div className="space-y-3">
                {[
                  { icon: Check, color: "text-emerald-600", t: "Screening terminé", d: "10 correspondances vérifiées", time: "Il y a 2 min" },
                  { icon: AlertTriangle, color: "text-amber-500", t: "Nouvelle alerte critique", d: "Transaction inhabituelle détectée", time: "Il y a 15 min" },
                  { icon: User, color: "text-blue-600", t: "Client ajouté", d: "Nom: Tchindjoua - ID: CL-1245", time: "Il y a 1h" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between text-[11px] gap-2">
                    <div className="flex items-start gap-1.5">
                      <item.icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${item.color}`} />
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">{item.t}</p>
                        <p className="text-[10px] text-slate-500">{item.d}</p>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Profil de risque */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-700 mb-2">Profil de risque</span>
              <div className="flex items-center gap-3">
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full" style={{ background: "conic-gradient(#16A34A 0% 25%, #F59E0B 25% 60%, #EA580C 60% 80%, #DC2626 80% 100%)" }}>
                    <div className="absolute inset-0 m-auto w-[55%] h-[55%] rounded-full bg-white shadow-inner flex flex-col items-center justify-center">
                      <span className="text-xs font-black text-slate-900 leading-none">70</span>
                      <span className="text-[7px] text-slate-400 font-medium scale-90">Score</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-[10px] w-full font-medium">
                  {[
                    { color: "bg-emerald-600", l: "Faible", p: "25%" },
                    { color: "bg-amber-500", l: "Moyen", p: "35%" },
                    { color: "bg-orange-600", l: "Élevé", p: "20%" },
                    { color: "bg-red-600", l: "Critique", p: "20%" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${r.color}`} /> {r.l}</span>
                      <span className="font-mono text-slate-500">{r.p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/*  13 + 14 + 15 + 16 BOTTOM GRID (12-col: 3+3+3+3)            */}
        {/* =========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* 13 NAVIGATION */}
          <section className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[11px] font-bold tracking-wide text-blue-600">13</span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">NAVIGATION</h2>
            </div>
            <div className="bg-[#0F172A] text-slate-300 rounded-lg p-3 text-xs flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800 text-white font-bold">
                  <PkycLogo size={16} />
                  <span className="text-xs">pKYC Africa</span>
                </div>
                {[
                  { l: "Vue d'ensemble", icon: Home, active: true },
                  { l: "Clients", icon: Users },
                  { l: "Screening", icon: Search },
                  { l: "Transactions", icon: BarChart3 },
                  { l: "Alertes", icon: Bell, badge: 3 },
                  { l: "Rapports", icon: FileText },
                  { l: "Journal d'audit", icon: Clock },
                ].map((item) => (
                  <a key={item.l} href="#" className={`flex items-center gap-2 px-2 py-1.5 rounded ${item.active ? "bg-blue-600 text-white font-medium" : "hover:bg-slate-800/80 text-slate-400"}`}>
                    <item.icon className="w-3.5 h-3.5" />
                    {item.l === "Alertes" ? (
                      <><span className="flex-1">{item.l}</span><span className="px-1 py-0.2 bg-red-600 text-white text-[9px] font-bold rounded-full">{item.badge}</span></>
                    ) : item.l}
                  </a>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-800 mt-2">
                <a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-800/80 text-slate-400">
                  <Globe className="w-3.5 h-3.5" /> Paramètres
                </a>
              </div>
            </div>
          </section>

          {/* 14 BARRE D'ÉTAT HORS CONNEXION */}
          <section className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[11px] font-bold tracking-wide text-blue-600">14</span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 truncate">BARRE D'ÉTAT HORS CONNEXION</h2>
            </div>
            <div className="space-y-3">
              {[
                { icon: Check, color: "text-emerald-600", bg: "border-emerald-200 bg-emerald-50/50", t: "Synchronisé", d: "Dernière sync : il y a 2 min" },
                { icon: Wifi, color: "text-amber-600", bg: "border-amber-200 bg-amber-50/50", t: "Mode hors connexion", d: "Dernière sync : il y a 26 min • 3 opérations en attente" },
                { icon: RefreshCw, color: "text-blue-600", bg: "border-blue-200 bg-blue-50/50", t: "Synchronisation en cours", d: "12 éléments synchronisés", spin: true },
              ].map((item, i) => (
                <div key={i} className={`p-2.5 rounded-lg border flex items-start gap-2.5 ${item.bg}`}>
                  <item.icon className={`w-4 h-4 shrink-0 mt-0.5 ${item.color} ${item.spin ? "animate-spin" : ""}`} />
                  <div>
                    <p className={`text-xs font-bold ${item.color.replace("text-", "text-").replace("-600", "-900")}`}>{item.t}</p>
                    <p className={`text-[10px] ${item.color.replace("-600", "-700")}`}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 15 NOTIFICATIONS */}
          <section className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[11px] font-bold tracking-wide text-blue-600">15</span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">NOTIFICATIONS</h2>
              </div>
              <div className="space-y-3">
                {[
                  { icon: AlertTriangle, color: "text-red-600", t: "Alerte critique", d: "Transaction inhabituelle détectée pour Koffi Mensa.", time: "Il y a 4 min", border: true },
                  { icon: AlertTriangle, color: "text-amber-500", t: "Correspondance PPE", d: "Correspondance potentielle: Exxon P-8705.", time: "Il y a 12 min", border: true },
                  { icon: RefreshCw, color: "text-blue-600", t: "Synchronisation réussie", d: "25 éléments synchronisés avec le serveur.", time: "Il y a 25 min" },
                ].map((n, i) => (
                  <div key={i} className={`flex items-start justify-between gap-1.5 text-xs ${n.border ? "pb-2 border-b border-slate-100" : ""}`}>
                    <div className="flex items-start gap-2">
                      <n.icon className={`w-4 h-4 shrink-0 mt-0.5 ${n.color}`} />
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">{n.t}</p>
                        <p className="text-[10px] text-slate-500">{n.d}</p>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 shrink-0">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3">
              <a href="#" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                Voir toutes les notifications →
              </a>
            </div>
          </section>

          {/* 16 PRINCIPES CLÉS */}
          <section className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[11px] font-bold tracking-wide text-blue-600">16</span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">PRINCIPES CLÉS</h2>
            </div>
            <div className="space-y-3">
              {[
                { icon: EyeIcon, t: "Clarté avant tout", d: "L'information importante doit être visible immédiatement." },
                { icon: Compass, t: "Orientation risque", d: "Les risques guident la mise en avant et les actions." },
                { icon: Shield, t: "Confiance & précision", d: "Données exactes, état clair, traçabilité." },
                { icon: CheckSquare, t: "Fonctionnel & efficace", d: "Chaque élément a un objectif opérationnel." },
                { icon: Accessibility, t: "Accessible & inclusif", d: "Conçu pour fonctionner sur tous appareils." },
              ].map((p) => (
                <div key={p.t} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <p.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{p.t}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}

/* ---- Custom icons ------------------------------------------------ */

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}
