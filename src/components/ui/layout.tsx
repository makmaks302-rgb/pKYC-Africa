import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Sidebar } from "./sidebar";

export { Sidebar, SidebarItem } from "./sidebar";
export type { SidebarNavItem, SidebarGroup } from "./sidebar";

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The sidebar rail. Defaults to the full default Sidebar. */
  sidebar?: React.ReactNode;
  /** The top header. Defaults to an AppHeader with a generic title. */
  header?: React.ReactNode;
  /** Classes applied to the content <main> region. */
  mainClassName?: string;
}

/**
 * Primary application shell: fixed sidebar on the left, sticky header on top,
 * and a scrollable main region offset to the right of the sidebar.
 */
export function AppShell({
  className,
  sidebar = <Sidebar />,
  header = <AppHeader title="Compliance Workspace" />,
  mainClassName,
  children,
  ...props
}: AppShellProps) {
  return (
    <div className={cn("min-h-screen bg-neutral-50", className)} {...props}>
      {sidebar}
      <div className="pl-[var(--spacing-app-sidebar)]">
        {header}
        <main className={cn("p-8", mainClassName)}>{children}</main>
      </div>
    </div>
  );
}

export interface AppHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  /** Right-aligned slot (avatar, notifications, etc.). */
  end?: React.ReactNode;
}

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  ({ className, title, subtitle, actions, end, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-40 flex h-[var(--spacing-app-header)] items-center gap-4 border-b border-neutral-200 bg-white px-8",
          className
        )}
        {...props}
      >
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="min-w-0">
            {title && (
              <h1 className="truncate text-lg font-semibold text-neutral-900">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="truncate text-sm text-neutral-500">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        {children}
        {end && <div className="ml-auto flex items-center gap-3">{end}</div>}
      </header>
    );
  }
);
AppHeader.displayName = "AppHeader";

const AppMain = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <main ref={ref} className={cn("p-8", className)} {...props} />
  )
);
AppMain.displayName = "AppMain";

const AppContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto w-full max-w-7xl space-y-6", className)}
    {...props}
  />
));
AppContainer.displayName = "AppContainer";

const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-wrap items-start justify-between gap-4", className)}
    {...props}
  />
));
PageHeader.displayName = "PageHeader";

const PageTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("text-2xl font-semibold tracking-tight text-neutral-900", className)}
    {...props}
  />
));
PageTitle.displayName = "PageTitle";

const PageDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-1 text-sm text-neutral-500", className)}
    {...props}
  />
));
PageDescription.displayName = "PageDescription";

/** Backwards compatible Shell used by early slices. */
export function Shell({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

export {
  AppHeader,
  AppMain,
  AppContainer,
  PageHeader,
  PageTitle,
  PageDescription,
};