"use client";

import { useState } from "react";
import type { Comment } from "@/lib/useComments";
import Icon from "@/components/ui/Icon";
import { Chip, EmptyState, StatCard, Stars, formatDate } from "./ui";

type Tab = "published" | "hidden";

export default function CommentsPanel({
  comments,
  busyId,
  onToggle,
  onDelete,
}: {
  comments: Comment[];
  busyId: string | null;
  onToggle: (c: Comment) => void;
  onDelete: (c: Comment) => void;
}) {
  const [tab, setTab] = useState<Tab>("published");
  const published = comments.filter((c) => c.approved);
  const hidden = comments.filter((c) => !c.approved);
  const shown = tab === "published" ? published : hidden;
  const avg = comments.length
    ? (comments.reduce((s, c) => s + c.rating, 0) / comments.length).toFixed(1).replace(".", ",")
    : "-";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        <StatCard icon="chat" label="Avis au total" value={comments.length} />
        <StatCard icon="check" tone="success" label="Publiés sur le site" value={published.length} />
        <StatCard icon="star" tone="accent" label="Note moyenne" value={avg} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip active={tab === "published"} onClick={() => setTab("published")} count={published.length}>Publiés</Chip>
        <Chip active={tab === "hidden"} onClick={() => setTab("hidden")} count={hidden.length}>Masqués</Chip>
      </div>

      {shown.length === 0 ? (
        <EmptyState
          icon="chat"
          title={tab === "published" ? "Aucun avis publié" : "Aucun avis masqué"}
          body="Les avis laissés par les familles sur la page d'accueil apparaissent ici."
        />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {shown.map((c) => (
            <li
              key={c.id}
              className={`flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-opacity ${
                busyId === c.id ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky font-bold text-primary">
                    {c.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-ink">{c.name}</p>
                    <p className="text-xs text-muted">{formatDate(c.createdAt)}</p>
                  </div>
                </div>
                <Stars rating={c.rating} />
              </div>
              <p className="flex-1 leading-relaxed text-ink">« {c.message} »</p>
              <div className="flex gap-2 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => onToggle(c)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon name={c.approved ? "close" : "check"} className="h-4 w-4" />
                  {c.approved ? "Masquer" : "Publier"}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(c)}
                  className="ml-auto inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-danger transition-colors hover:bg-danger/10"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
