"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type ToastVariant = "info" | "success" | "error" | "loading";

export interface ToastData {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
}

type ToastInput = Omit<ToastData, "id"> & { id?: string };

interface ToastContextValue {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue>({
  toast: () => "",
  dismiss: () => {},
});

export function useToast() {
  return React.useContext(ToastContext);
}

const iconByVariant: Record<ToastVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  error: AlertCircle,
  loading: Loader2,
};

const iconColor: Record<ToastVariant, string> = {
  info: "text-info-base",
  success: "text-success-base",
  error: "text-error-base",
  loading: "text-brand-primary",
};

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Auto-dismiss delay in ms. Pass 0 to disable. Default 4000. */
  duration?: number;
  /** Position of the toast stack. */
  position?: "top-right" | "top-center" | "bottom-right" | "bottom-center";
}

let idCounter = 0;

const ToastProvider = ({
  children,
  duration = 4000,
  position = "bottom-right",
}: ToastProviderProps) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (input: ToastInput) => {
      const id = input.id ?? `toast-${++idCounter}`;
      const variant = input.variant ?? "info";
      setToasts((prev) =>
        prev.some((t) => t.id === id)
          ? prev.map((t) => (t.id === id ? { ...input, id } : t))
          : [...prev, { ...input, id, variant }]
      );

      if (variant !== "loading" && duration > 0) {
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
      return id;
    },
    [duration]
  );

  const context = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  const positionClass = {
    "top-right": "top-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  }[position];

  return (
    <ToastContext.Provider value={context}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            role="region"
            aria-live="polite"
            className={cn(
              "fixed z-[var(--z-toast)] flex w-full max-w-sm flex-col gap-2",
              positionClass
            )}
          >
            {toasts.map((t) => {
              const Icon = iconByVariant[t.variant ?? "info"];
              return (
                <div
                  key={t.id}
                  className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg"
                >
                  <Icon
                    className={cn(
                      "mt-0.5 h-5 w-5 shrink-0",
                      t.variant === "loading" && "animate-spin",
                      iconColor[t.variant ?? "info"]
                    )}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    {t.title && (
                      <p className="text-sm font-semibold text-neutral-900">
                        {t.title}
                      </p>
                    )}
                    {t.description && (
                      <p className="text-sm text-neutral-500">{t.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss notification"
                    onClick={() => dismiss(t.id)}
                    className="shrink-0 rounded-md p-0.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

export { ToastProvider, type ToastInput };