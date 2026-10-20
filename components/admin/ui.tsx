import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";

/** Petites briques visuelles de l'admin (même thème que le site). */

export function StatCard({
  icon,
  label,
  value,
  tone = "sky",
}: {
  icon: IconName;
  label: string;
  value: ReactNode;
  tone?: "sky" | "success" | "accent" | "muted";
}) {
  const tones = {
    sky: "bg-sky text-primary",
    success: "bg-success/10 text-success",
    accent: "bg-accent-soft text-ink",
    muted: "bg-paper text-muted",
  };
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-card sm:flex-row sm:items-center sm:gap-4 sm:p-5">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12 ${tones[tone]}`}>
        <Icon name={icon} className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold leading-none text-ink tabular-nums">{value}</p>
        <p className="mt-1 text-sm text-slate">{label}</p>
      </div>
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${
        active ? "bg-primary text-white" : "border border-line bg-white text-slate hover:border-primary hover:text-primary"
      }`}
    >
      {children}
      {count !== undefined && (
        <span className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${active ? "bg-white/20" : "bg-paper"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

export function StatusBadge({ status }: { status: "paid" | "pending" | "canceled" }) {
  const map = {
    paid: { label: "Payée", cls: "bg-success/10 text-success", icon: "check" as const },
    pending: { label: "Paiement non finalisé", cls: "bg-accent-soft text-ink", icon: "clock" as const },
    canceled: { label: "Annulée", cls: "bg-danger/10 text-danger", icon: "close" as const },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${map.cls}`}>
      <Icon name={map.icon} className="h-3.5 w-3.5" strokeWidth={2.5} />
      {map.label}
    </span>
  );
}

export function EmptyState({ icon, title, body }: { icon: IconName; title: string; body?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-line bg-white px-6 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky text-primary">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <p className="font-bold text-ink">{title}</p>
      {body && <p className="max-w-sm text-sm text-slate">{body}</p>}
    </div>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-accent" aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" filled strokeWidth={1} className={`h-4 w-4 ${i <= rating ? "" : "text-line"}`} />
      ))}
    </span>
  );
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-CA", { day: "numeric", month: "short", year: "numeric" });
