"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface SidebarNavItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
  badge?: number | string;
  active?: boolean;
  disabled?: boolean;
  children?: SidebarNavItem[];
}

export interface SidebarGroup {
  label?: string;
  items: SidebarNavItem[];
}

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

interface SidebarContextValue {
  collapsed: boolean;
  toggle: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
  toggle: () => {},
});

export function useSidebar() {
  return React.useContext(SidebarContext);
}

/* -------------------------------------------------------------------------- */
/*  SidebarItem                                                                */
/* -------------------------------------------------------------------------- */

export interface SidebarItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item?: SidebarNavItem;
  href?: string;
  icon?: React.ElementType;
  badge?: number | string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
  (
    {
      className,
      item,
      href,
      icon: Icon,
      badge,
      active = false,
      collapsed = false,
      children,
      ...props
    },
    ref
  ) => {
    const label = item?.label ?? children;
    const ItemIcon = item?.icon ?? Icon;
    const itemBadge = item?.badge ?? badge;
    const isActive = item?.active ?? active;

    return (
      <a
        ref={ref}
        href={href ?? item?.href}
        className={cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-white/15 text-white"
            : "text-white/60 hover:bg-white/10 hover:text-white",
          item?.disabled &&
            "pointer-events-none cursor-not-allowed opacity-40",
          className
        )}
        aria-current={isActive ? "page" : undefined}
        {...props}
      >
        {ItemIcon && (
          <ItemIcon
            className={cn(
              "h-5 w-5 shrink-0",
              isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
            )}
            aria-hidden="true"
          />
        )}
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{label}</span>
            {itemBadge !== undefined && (
              <span
                className={cn(
                  "ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[11px] font-bold",
                  isActive
                    ? "bg-white text-blue-primary"
                    : "bg-white/20 text-white/80"
                )}
              >
                {itemBadge}
              </span>
            )}
          </>
        )}
      </a>
    );
  }
);
SidebarItem.displayName = "SidebarItem";

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo / brand slot rendered at the top. */
  logo?: React.ReactNode;
  /** Navigation groups. */
  groups?: SidebarGroup[];
  /** Footer slot rendered at the bottom. */
  footer?: React.ReactNode;
  /** Initial collapsed state. */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Called when the collapse state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      logo,
      groups = [],
      footer,
      defaultCollapsed = false,
      collapsed: collapsedProp,
      onCollapsedChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultCollapsed);
    const collapsed = collapsedProp ?? uncontrolled;
    const toggle = React.useCallback(() => {
      const next = !collapsed;
      setUncontrolled(next);
      onCollapsedChange?.(next);
    }, [collapsed, onCollapsedChange]);

    return (
      <SidebarContext.Provider value={{ collapsed, toggle }}>
        <nav
          ref={ref}
          className={cn(
            "fixed inset-y-0 left-0 z-[var(--z-sticky)] flex w-[var(--spacing-app-sidebar)] flex-col bg-blue-primary text-white transition-all",
            collapsed && "w-[72px]",
            className
          )}
          aria-label="Main navigation"
          {...props}
        >
          {/* Logo */}
          <div className="flex h-[var(--spacing-app-header)] shrink-0 items-center gap-3 border-b border-white/10 px-4">
            {logo ?? (
              <>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-xs font-bold">
                  pK
                </div>
                {!collapsed && (
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold leading-tight">
                      pKYC Africa
                    </div>
                    <div className="truncate text-[11px] text-white/50">
                      Conformite LBC/FT/FP
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Nav content */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            {children
              ? children
              : groups.map((group, gi) => (
                  <div key={gi} className="mb-4">
                    {group.label && !collapsed && (
                      <div className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                        {group.label}
                      </div>
                    )}
                    <div className="space-y-0.5">
                      {group.items.map((item, ii) => (
                        <SidebarItem key={ii} item={item} collapsed={collapsed} />
                      ))}
                    </div>
                  </div>
                ))}
          </div>

          {/* Footer */}
          {footer && (
            <div className="shrink-0 border-t border-white/10 px-3 py-3">
              {footer}
            </div>
          )}
        </nav>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = "Sidebar";

export { Sidebar, SidebarItem };
