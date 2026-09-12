// pKYC Africa design system — reusable UI foundation.
// Every component here is surface-level and intentionally free of
// compliance business logic so later KYC / KYB / screening / risk / alert
// and case-management screens can compose from a single source of truth.

// Layout primitives
export {
  AppShell,
  AppHeader,
  AppMain,
  AppContainer,
  PageHeader,
  PageTitle,
  PageDescription,
  Shell,
} from "./layout";

// Navigation
export { Sidebar, SidebarItem } from "./sidebar";
export type { SidebarNavItem, SidebarGroup } from "./sidebar";

// Actions
export { Button } from "./button";
export type { ButtonProps } from "./button";

// Data display
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
export { DonutChart } from "./donut-chart";
export type { DonutChartProps, DonutSegment } from "./donut-chart";
export { Badge, StatusIndicator, toneFromStatus, dotColor } from "./badge";
export type { BadgeVariant, BadgeProps, StatusIndicatorProps } from "./badge";
export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./table";

// Form controls
export { Input, Label } from "./input";
export type { InputProps } from "./input";
export { Textarea } from "./textarea";
export type { TextareaProps } from "./textarea";
export { Select } from "./select";
export type { SelectProps } from "./select";
export { Checkbox } from "./checkbox";
export type { CheckboxProps } from "./checkbox";
export { Switch } from "./switch";
export type { SwitchProps } from "./switch";
export { Field } from "./field";
export type { FieldProps } from "./field";

// Overlays
export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  useDialog,
} from "./dialog";
export type { DialogProps, DialogContentProps } from "./dialog";

// Menus
export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from "./dropdown";
export type {
  DropdownProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
} from "./dropdown";

// Progress
export { ProgressBar, StepProgress } from "./progress";
export type { ProgressBarProps, StepProgressProps, Step } from "./progress";

// Connection status
export { ConnectionStatusBar } from "./connection-status";
export type {
  ConnectionStatus,
  ConnectionStatusItem,
  ConnectionStatusBarProps,
} from "./connection-status";

// Feedback
export { Alert } from "./alert";
export type { AlertVariant, AlertProps } from "./alert";
export { ToastProvider, useToast } from "./toast";
export type { ToastData, ToastVariant, ToastProviderProps } from "./toast";

// Utilities
export { cn } from "@/lib/utils/cn";