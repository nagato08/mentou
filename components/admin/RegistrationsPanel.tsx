"use client";

import { useState } from "react";
import type { Registration } from "@/lib/registration";
import {
  HOURLY_RATES,
  MONTHLY_PRICE,
  isHourlyOffer,
  isLegacyOffer,
  registrationLabel,
} from "@/lib/registration";
import { levelLabel, subjectLabels } from "@/lib/tutor";
import { formatPrice } from "@/lib/format";
import Icon from "@/components/ui/Icon";
import { Chip, EmptyState, StatCard, StatusBadge, formatDate } from "./ui";

type OfferFilter = "all" | "monthly" | "inperson-hourly" | "online-hourly" | "legacy";
type StatusFilter = "all" | "paid" | "pending";

/** Montant hors taxes du paiement initial (anciennes offres exclues). */
function amountOf(r: Registration): number {
  if (r.offer === "monthly") return MONTHLY_PRICE;
  if (isHourlyOffer(r.offer)) return HOURLY_RATES[r.offer] * (r.hours ?? 0);
  return 0;
}

function Detail({ label, value, full }: { label: string; value: string; full?: boolean }) {
  if (!value) return null;
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <dt className="text-xs font-semibold text-muted">{label}</dt>
      <dd className="wrap-anywhere text-ink">{value}</dd>
    </div>
  );
}

export default function RegistrationsPanel({
  registrations,
  onDelete,
}: {
  registrations: Registration[];
  onDelete: (id: string) => Promise<void>;
}) {
  const [offer, setOffer] = useState<OfferFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const hasLegacy = registrations.some((r) => isLegacyOffer(r.offer));
  const paid = registrations.filter((r) => r.status === "paid");
  const revenue = paid.reduce((sum, r) => sum + amountOf(r), 0);

  const countOffer = (f: OfferFilter) =>
    registrations.filter((r) =>
      f === "all" ? true : f === "legacy" ? isLegacyOffer(r.offer) : r.offer === f
    ).length;

  const q = query.trim().toLowerCase();
  const filtered = registrations.filter((r) => {
      if (offer === "legacy" ? !isLegacyOffer(r.offer) : offer !== "all" && r.offer !== offer) return false;
      if (status === "paid" && r.status !== "paid") return false;
      if (status === "pending" && r.status === "paid") return false;
      if (!q) return true;
      return [r.parentName, r.parentEmail, r.parentPhone, r.childName, r.city]
        .join(" ")
        .toLowerCase()
        .includes(q);
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        <StatCard icon="users" label="Inscriptions" value={registrations.length} />
        <StatCard icon="check" tone="success" label="Payées" value={paid.length} />
        <StatCard
          icon="clock"
          tone="accent"
          label="Paiement non finalisé"
          value={registrations.filter((r) => r.status === "pending").length}
        />
        <StatCard icon="lock" tone="muted" label="Ventes en ligne (hors taxes)" value={formatPrice(revenue, "fr")} />
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-5 shadow-card">
        <div className="relative">
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un parent, un élève, un courriel, une ville..."
            aria-label="Rechercher une inscription"
            className="min-h-12 w-full rounded-xl border border-line bg-paper pl-12 pr-4 text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={offer === "all"} onClick={() => setOffer("all")} count={countOffer("all")}>Toutes</Chip>
          <Chip active={offer === "monthly"} onClick={() => setOffer("monthly")} count={countOffer("monthly")}>Forfait mensuel</Chip>
          <Chip active={offer === "inperson-hourly"} onClick={() => setOffer("inperson-hourly")} count={countOffer("inperson-hourly")}>Présentiel à l&apos;heure</Chip>
          <Chip active={offer === "online-hourly"} onClick={() => setOffer("online-hourly")} count={countOffer("online-hourly")}>En ligne à l&apos;heure</Chip>
          {hasLegacy && (
            <Chip active={offer === "legacy"} onClick={() => setOffer("legacy")} count={countOffer("legacy")}>Ancien site</Chip>
          )}
        </div>
        <div className="flex flex-wrap gap-2 border-t border-line pt-4">
          <Chip active={status === "all"} onClick={() => setStatus("all")}>Tous les statuts</Chip>
          <Chip active={status === "paid"} onClick={() => setStatus("paid")}>Payées</Chip>
          <Chip active={status === "pending"} onClick={() => setStatus("pending")}>Non finalisées</Chip>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="users" title="Aucune inscription" body="Aucune inscription ne correspond à ces filtres pour le moment." />
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((r) => {
            const expanded = open === r.id;
            const amount = amountOf(r);
            return (
              <li key={r.id} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : r.id)}
                  aria-expanded={expanded}
                  className="flex w-full flex-col gap-3 p-5 text-left transition-colors hover:bg-paper sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky font-bold text-primary">
                      {(r.childName || r.parentName).trim().charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-ink">
                        {r.childName || r.parentName}
                        {r.childAge && <span className="font-normal text-slate"> · {r.childAge} ans</span>}
                      </p>
                      <p className="truncate text-sm text-slate">
                        {registrationLabel(r)} · {formatDate(r.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:shrink-0">
                    {amount > 0 && <span className="font-bold text-ink tabular-nums">{formatPrice(amount, "fr")}</span>}
                    <StatusBadge status={r.status} />
                    <Icon name="chevronDown" className={`h-5 w-5 text-muted transition-transform ${expanded ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {expanded && (
                  <div className="border-t border-line bg-paper/60 p-5">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <a href={`mailto:${r.parentEmail}`} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-dark">
                        <Icon name="mail" className="h-4 w-4" /> Écrire
                      </a>
                      <a href={`tel:${r.parentPhone.replace(/[^\d+]/g, "")}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-primary">
                        <Icon name="phone" className="h-4 w-4" /> Appeler
                      </a>
                      {r.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => onDelete(r.id)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-danger/30 px-4 text-sm font-semibold text-danger hover:bg-danger/10"
                        >
                          <Icon name="close" className="h-4 w-4" /> Supprimer
                        </button>
                      )}
                    </div>
                    <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                      <Detail label="Parent" value={r.parentName} />
                      <Detail label="Courriel" value={r.parentEmail} />
                      <Detail label="Téléphone" value={r.parentPhone} />
                      <Detail label="École" value={r.childSchool} />
                      <Detail label="Niveau" value={levelLabel(r.studentLevel)} />
                      <Detail label="Matières" value={[...subjectLabels(r.subjects), r.otherSubject].filter(Boolean).join(", ")} full />
                      <Detail label="Adresse" value={[r.address, r.city, r.postalCode, r.province].filter(Boolean).join(", ")} full />
                      <Detail label="Disponibilités" value={r.availability} />
                      <Detail label="Détails" value={r.expectations} full />
                      <Detail label="Réf. Stripe" value={r.stripeSubscriptionId ?? r.stripeSessionId ?? ""} full />
                    </dl>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
