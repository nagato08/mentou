"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Comment } from "@/lib/useComments";
import type { Registration } from "@/lib/registration";
import Logo from "@/components/layout/Logo";
import Icon from "@/components/ui/Icon";
import RegistrationsPanel from "@/components/admin/RegistrationsPanel";
import CommentsPanel from "@/components/admin/CommentsPanel";

type View = "registrations" | "comments";

const INPUT =
  "min-h-12 w-full rounded-xl border border-line bg-white px-4 text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [view, setView] = useState<View>("registrations");
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    const [c, r] = await Promise.all([fetch("/api/admin/comments"), fetch("/api/admin/registrations")]);
    if (c.status === 401 || r.status === 401) {
      setLoggedIn(false);
      return;
    }
    if (c.ok) setComments(await c.json());
    if (r.ok) setRegistrations(await r.json());
    setLoggedIn(true);
  }, []);

  // Session encore valide (cookie) : on recharge directement le tableau de bord.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchAll().finally(() => setChecking(false));
  }, [fetchAll]);

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
      await fetchAll();
    } else if (res.status === 500) {
      setAuthError("Configuration du serveur incomplète (ADMIN_SECRET manquant).");
    } else {
      setAuthError("Mot de passe incorrect.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setLoggedIn(false);
    setComments([]);
    setRegistrations([]);
  };

  const toggleComment = async (c: Comment) => {
    setBusyId(c.id);
    await fetch(`/api/admin/comments/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !c.approved }),
    });
    await fetchAll();
    setBusyId(null);
  };

  const deleteComment = async (c: Comment) => {
    if (!confirm(`Supprimer définitivement l'avis de ${c.name} ?`)) return;
    setBusyId(c.id);
    await fetch(`/api/admin/comments/${c.id}`, { method: "DELETE" });
    await fetchAll();
    setBusyId(null);
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm("Supprimer cette inscription non payée ?")) return;
    await fetch(`/api/admin/registrations/${id}`, { method: "DELETE" });
    await fetchAll();
  };

  if (checking) {
    return (
      <main className="grid min-h-dvh place-items-center">
        <span className="h-8 w-8 animate-spin rounded-full border-3 border-sky-strong border-t-primary" aria-label="Chargement" />
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="grid min-h-dvh place-items-center bg-linear-to-b from-sky to-paper px-4 py-10">
        <form onSubmit={login} className="flex w-full max-w-sm flex-col gap-6 rounded-3xl border border-line bg-white p-8 shadow-lift">
          <Logo name="Mentou Academy" size="lg" />
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Espace administration</h1>
            <p className="mt-1 text-sm text-slate">Inscriptions et avis des familles.</p>
          </div>
          <div>
            <label htmlFor="pwd" className="mb-1.5 block text-sm font-semibold text-ink">
              Mot de passe
            </label>
            <input
              id="pwd"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              autoComplete="current-password"
              required
              className={INPUT}
            />
          </div>
          {authError && (
            <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
              {authError}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          <Link href="/fr" className="text-center text-sm text-slate hover:text-primary">
            Retour au site
          </Link>
        </form>
      </main>
    );
  }

  const tabs: { key: View; label: string; icon: "users" | "chat"; count: number }[] = [
    { key: "registrations", label: "Inscriptions", icon: "users", count: registrations.length },
    { key: "comments", label: "Avis", icon: "chat", count: comments.length },
  ];

  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <Logo name="Mentou Academy" />
            <span className="hidden rounded-full bg-sky px-3 py-1 text-xs font-bold text-primary sm:inline">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/fr"
              target="_blank"
              className="hidden min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-slate hover:bg-sky hover:text-primary sm:inline-flex"
            >
              Voir le site <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
            >
              Déconnexion
            </button>
          </div>
        </div>
        <nav aria-label="Sections" className="mx-auto flex max-w-6xl gap-1 px-4 md:px-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setView(t.key)}
              aria-current={view === t.key ? "page" : undefined}
              className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                view === t.key ? "border-primary text-primary" : "border-transparent text-slate hover:text-ink"
              }`}
            >
              <Icon name={t.icon} className="h-4 w-4" />
              {t.label}
              <span className="rounded-full bg-paper px-2 py-0.5 text-xs tabular-nums">{t.count}</span>
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h1 className="mb-6 text-2xl font-extrabold text-ink md:text-3xl">
          {view === "registrations" ? "Inscriptions" : "Avis des familles"}
        </h1>
        {view === "registrations" ? (
          <RegistrationsPanel registrations={registrations} onDelete={deleteRegistration} />
        ) : (
          <CommentsPanel comments={comments} busyId={busyId} onToggle={toggleComment} onDelete={deleteComment} />
        )}
      </div>
    </main>
  );
}
