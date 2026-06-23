"use client";

import { useState, useEffect, useCallback } from "react";
import type { Comment } from "@/lib/useComments";

type Tab = "pending" | "approved";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [tab, setTab] = useState<Tab>("pending");
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    const res = await fetch("/api/admin/comments");
    if (res.status === 401) {
      setLoggedIn(false);
      return;
    }
    if (res.ok) setComments(await res.json());
  }, []);

  useEffect(() => {
    if (loggedIn) fetchComments();
  }, [loggedIn, fetchComments]);

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
      setLoggedIn(true);
      setPassword("");
      setAuthError("");
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
    await fetch(`/api/admin/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !approved }),
    });
    await fetchComments();
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Supprimer ce commentaire ?")) return;
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    await fetchComments();
  };

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-ink flex items-center justify-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm flex flex-col gap-5 border border-bone/10 p-8"
        >
          <h1 className="font-display text-2xl text-bone">Admin · Commentaires</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="pwd" className="text-xs uppercase tracking-widest text-bone/50">
              Mot de passe
            </label>
            <input
              id="pwd"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 bg-night border border-bone/10 text-bone focus:outline-none focus:border-gold/50"
              required
            />
          </div>
          {authError && <p className="text-sm text-red-400">{authError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gold text-ink font-semibold text-sm uppercase tracking-widest hover:bg-gold/90 disabled:opacity-50"
          >
            {loading ? "…" : "Se connecter"}
          </button>
        </form>
      </main>
    );
  }

  const pending = comments.filter((c) => !c.approved);
  const approved = comments.filter((c) => c.approved);
  const displayed = tab === "pending" ? pending : approved;

  return (
    <main className="min-h-screen bg-ink text-bone">
      {/* Header */}
      <header className="border-b border-bone/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="block h-px w-6 bg-gold" />
          <h1 className="font-display text-xl">Admin · Commentaires</h1>
        </div>
        <button
          onClick={logout}
          className="text-xs uppercase tracking-widest text-bone/40 hover:text-bone transition-colors"
        >
          Déconnexion
        </button>
      </header>

      {/* Tabs */}
      <div className="border-b border-bone/10 px-6 flex gap-8">
        {(["pending", "approved"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-4 text-sm uppercase tracking-widest border-b-2 transition-colors ${
              tab === t
                ? "border-gold text-gold"
                : "border-transparent text-bone/40 hover:text-bone"
            }`}
          >
            {t === "pending" ? `En attente (${pending.length})` : `Approuvés (${approved.length})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-4">
        {displayed.length === 0 && (
          <p className="text-bone/40 text-sm">Aucun commentaire ici.</p>
        )}
        {displayed.map((c) => (
          <div
            key={c.id}
            className="border border-bone/10 p-6 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-bone">{c.name}</p>
                <p className="text-xs text-bone/40 mt-0.5">
                  {new Date(c.createdAt).toLocaleDateString("fr-FR")} ·{" "}
                  {[...Array(c.rating)].map((_, i) => (
                    <span key={i} className="text-gold text-xs">★</span>
                  ))}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleApprove(c.id, c.approved)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                    c.approved
                      ? "bg-bone/10 text-bone/60 hover:bg-bone/20"
                      : "bg-gold text-ink hover:bg-gold/90"
                  }`}
                >
                  {c.approved ? "Masquer" : "Approuver"}
                </button>
                <button
                  onClick={() => deleteComment(c.id)}
                  className="px-3 py-1.5 text-xs uppercase tracking-widest text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
            <p className="text-bone/70 text-sm leading-relaxed">{c.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
