"use client";

import { useState, useEffect, useCallback } from "react";
import type { Comment } from "@/lib/useComments";
import type { Registration } from "@/lib/registration";
import { OFFER_LABELS } from "@/lib/registration";

type Tab = "pending" | "approved";
type View = "comments" | "registrations";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= rating ? "text-gold" : "text-bone/20"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-bone/10 bg-night/40 px-5 py-4 flex flex-col gap-1">
      <span className="font-display text-3xl text-bone leading-none tabular-nums">
        {value}
      </span>
      <span className="text-[0.6rem] uppercase tracking-[0.25em] text-bone/40">
        {label}
      </span>
    </div>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [view, setView] = useState<View>("comments");
  const [tab, setTab] = useState<Tab>("pending");
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    const res = await fetch("/api/admin/registrations");
    if (res.ok) setRegistrations(await res.json());
  }, []);

  const fetchComments = useCallback(async () => {
    const res = await fetch("/api/admin/comments");
    if (res.ok) {
      setComments(await res.json());
      setLoggedIn(true);
      void fetchRegistrations();
    } else if (res.status === 401) {
      setLoggedIn(false);
    }
  }, [fetchRegistrations]);

  // Restore session on mount (cookie may still be valid).
  // setState runs after the awaited fetch — async, not a synchronous cascade.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchComments().finally(() => setChecking(false));
  }, [fetchComments]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      setPassword("");
      setAuthError("");
      await fetchComments();
    } else if (res.status === 500) {
      setAuthError(
        "Configuration serveur manquante (ADMIN_SECRET). Contactez l'administrateur."
      );
    } else {
      setAuthError("Mot de passe incorrect.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setLoggedIn(false);
    setComments([]);
  };

  const toggleApprove = async (id: string, approved: boolean) => {
    setBusyId(id);
    await fetch(`/api/admin/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !approved }),
    });
    await fetchComments();
    setBusyId(null);
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Supprimer définitivement ce commentaire ?")) return;
    setBusyId(id);
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    await fetchComments();
    setBusyId(null);
  };

  // ── Loading session check ──
  if (checking) {
    return (
      <main className="min-h-dvh bg-ink flex items-center justify-center">
        <span className="h-6 w-6 rounded-full border-2 border-bone/20 border-t-gold animate-spin" />
      </main>
    );
  }

  // ── Login screen ──
  if (!loggedIn) {
    return (
      <main className="relative min-h-dvh bg-ink flex items-center justify-center px-4 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <form
          onSubmit={login}
          className="relative w-full max-w-sm flex flex-col gap-6 border border-bone/10 bg-night/30 p-8 md:p-10"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-gold" />
              <span className="text-[0.6rem] uppercase tracking-[0.35em] text-gold">
                Espace privé
              </span>
            </div>
            <h1 className="font-display text-3xl text-bone leading-tight">
              Modération
            </h1>
            <p className="text-sm text-bone/50">
              Gérez les commentaires publiés sur le site.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="pwd"
              className="text-[0.65rem] uppercase tracking-[0.25em] text-bone/50"
            >
              Mot de passe
            </label>
            <input
              id="pwd"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="px-4 py-3 bg-ink border border-bone/15 text-bone placeholder:text-bone/30 focus:outline-none focus:border-gold/60 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {authError && (
            <p
              role="alert"
              className="text-sm text-red-400 border-l-2 border-red-400/50 pl-3"
            >
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-ink font-semibold text-sm uppercase tracking-[0.2em] hover:bg-gold-soft disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <span className="h-4 w-4 rounded-full border-2 border-ink/30 border-t-ink animate-spin" />
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </main>
    );
  }

  // ── Dashboard ──
  const pending = comments.filter((c) => !c.approved);
  const approved = comments.filter((c) => c.approved);
  const displayed = tab === "pending" ? pending : approved;
  const avgRating =
    comments.length > 0
      ? (comments.reduce((s, c) => s + c.rating, 0) / comments.length).toFixed(1)
      : "—";

  return (
    <main className="min-h-dvh bg-ink text-bone">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-ink/90 backdrop-blur border-b border-bone/10 px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="block h-px w-8 bg-gold" />
          <div className="flex flex-col">
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Groupe Mentou
            </span>
            <h1 className="font-display text-lg leading-none">Modération</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* View switcher */}
          <div className="flex border border-bone/10">
            {(["comments", "registrations"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 text-[0.6rem] uppercase tracking-[0.2em] transition-colors ${
                  view === v
                    ? "bg-gold text-ink font-semibold"
                    : "text-bone/40 hover:text-bone"
                }`}
              >
                {v === "comments"
                  ? "Avis"
                  : `Inscriptions${registrations.length ? ` (${registrations.length})` : ""}`}
              </button>
            ))}
          </div>
          <button
            onClick={logout}
            className="text-[0.65rem] uppercase tracking-[0.25em] text-bone/40 hover:text-bone border border-bone/10 hover:border-bone/30 px-4 py-2 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {view === "registrations" ? (
        <RegistrationsView registrations={registrations} />
      ) : (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-8 flex flex-col gap-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-bone/10 border border-bone/10">
          <StatCard label="Total" value={comments.length} />
          <StatCard label="En attente" value={pending.length} />
          <StatCard label="Approuvés" value={approved.length} />
          <StatCard label="Note moy." value={avgRating} />
        </div>

        {/* Tabs */}
        <div className="border-b border-bone/10 flex gap-8">
          {(["pending", "approved"] as Tab[]).map((t) => {
            const count = t === "pending" ? pending.length : approved.length;
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`group flex items-center gap-2 py-4 text-sm uppercase tracking-[0.2em] border-b-2 transition-colors ${
                  active
                    ? "border-gold text-gold"
                    : "border-transparent text-bone/40 hover:text-bone"
                }`}
              >
                {t === "pending" ? "En attente" : "Approuvés"}
                <span
                  className={`text-[0.65rem] tabular-nums px-2 py-0.5 rounded-full ${
                    active ? "bg-gold/15 text-gold" : "bg-bone/10 text-bone/50"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {displayed.length === 0 && (
            <div className="border border-dashed border-bone/15 py-16 flex flex-col items-center gap-3 text-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-bone/25"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h8M8 14h5m-9 7 3.5-3H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v15z"
                />
              </svg>
              <p className="text-bone/40 text-sm">
                {tab === "pending"
                  ? "Aucun commentaire en attente."
                  : "Aucun commentaire approuvé."}
              </p>
            </div>
          )}

          {displayed.map((c) => (
            <article
              key={c.id}
              className={`group border border-bone/10 bg-night/20 hover:bg-night/40 transition-colors p-5 md:p-6 flex flex-col gap-4 ${
                busyId === c.id ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar initial */}
                  <span className="shrink-0 h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center font-display text-lg text-gold">
                    {c.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-bone truncate">{c.name}</p>
                    <p className="text-xs text-bone/40 flex items-center gap-2">
                      <Stars rating={c.rating} />
                      <span>·</span>
                      <span>
                        {new Date(c.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Status pill */}
                <span
                  className={`shrink-0 text-[0.55rem] uppercase tracking-[0.2em] px-2.5 py-1 ${
                    c.approved
                      ? "bg-gold/10 text-gold"
                      : "bg-bone/10 text-bone/50"
                  }`}
                >
                  {c.approved ? "Public" : "En attente"}
                </span>
              </div>

              <p className="text-bone/75 text-sm leading-relaxed border-l-2 border-bone/10 pl-4">
                {c.message}
              </p>

              <div className="flex gap-2 justify-end pt-1">
                <button
                  onClick={() => toggleApprove(c.id, c.approved)}
                  className={`px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition-colors ${
                    c.approved
                      ? "bg-bone/10 text-bone/60 hover:bg-bone/20"
                      : "bg-gold text-ink hover:bg-gold-soft font-semibold"
                  }`}
                >
                  {c.approved ? "Masquer" : "Approuver"}
                </button>
                <button
                  onClick={() => deleteComment(c.id)}
                  className="px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      )}
    </main>
  );
}

function RegistrationsView({
  registrations,
}: {
  registrations: Registration[];
}) {
  const paid = registrations.filter((r) => r.status === "paid");
  const pending = registrations.filter((r) => r.status === "pending");
  const canceled = registrations.filter((r) => r.status === "canceled");

  const statusStyle: Record<Registration["status"], string> = {
    paid: "bg-gold/10 text-gold",
    pending: "bg-bone/10 text-bone/50",
    canceled: "bg-red-400/10 text-red-400",
  };
  const statusLabel: Record<Registration["status"], string> = {
    paid: "Payé",
    pending: "En attente",
    canceled: "Annulé",
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8 flex flex-col gap-8">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-bone/10 border border-bone/10">
        <StatCard label="Total" value={registrations.length} />
        <StatCard label="Payées" value={paid.length} />
        <StatCard label="En attente" value={pending.length} />
        <StatCard label="Annulées" value={canceled.length} />
      </div>

      <div className="flex flex-col gap-4">
        {registrations.length === 0 && (
          <div className="border border-dashed border-bone/15 py-16 text-center">
            <p className="text-bone/40 text-sm">Aucune inscription pour le moment.</p>
          </div>
        )}

        {registrations.map((r) => (
          <article
            key={r.id}
            className="border border-bone/10 bg-night/20 p-5 md:p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-bone">
                  {r.childName}{" "}
                  <span className="text-bone/40 font-normal">· {r.childAge} ans</span>
                </p>
                <p className="text-xs text-bone/40 mt-0.5">
                  Parent : {r.parentName} ·{" "}
                  {new Date(r.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className={`text-[0.55rem] uppercase tracking-[0.2em] px-2.5 py-1 ${statusStyle[r.status]}`}
                >
                  {statusLabel[r.status]}
                </span>
                <span className="text-[0.6rem] text-bone/40">
                  {OFFER_LABELS[r.offer]}
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm border-t border-bone/10 pt-4">
              <Detail label="Courriel" value={r.parentEmail} />
              <Detail label="Téléphone" value={r.parentPhone} />
              <Detail label="École" value={r.childSchool} />
              <Detail
                label="Adresse"
                value={`${r.address}, ${r.city} ${r.postalCode}, ${r.province}`}
              />
              <Detail label="Disponibilités" value={r.availability} />
              <Detail label="Attentes" value={r.expectations} full />
              <Detail label="Suggestions" value={r.suggestions} full />
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  if (!value) return null;
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-bone/40">
        {label}
      </dt>
      <dd className="text-bone/75">{value}</dd>
    </div>
  );
}
