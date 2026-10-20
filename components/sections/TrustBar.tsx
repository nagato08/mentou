"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import Icon from "@/components/ui/Icon";
import { GOOGLE_PROFILE } from "@/lib/contact";

type Labels = {
  reviews: string;
  noReviews: string;
  google: string;
  googleReviews: string;
  students: string;
  open7: string;
  hoursShort: string;
};

/**
 * Bandeau de confiance sous l'en-tête : vraie note des avis du site, ouverture 7 j/7,
 * et chiffres Google seulement s'ils sont renseignés dans GOOGLE_PROFILE.
 */
export default function TrustBar({ labels, lang }: { labels: Labels; lang: "fr" | "en" }) {
  const [stats, setStats] = useState<{ avg: number; count: number } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/comments", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((list: { rating: number }[]) => {
        if (!alive || !list.length) return;
        setStats({ avg: list.reduce((s, c) => s + c.rating, 0) / list.length, count: list.length });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const fmt = (n: number) => n.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const g = GOOGLE_PROFILE;

  const items: { icon: "star" | "users" | "clock"; strong: string; text: string; href?: string }[] = [];
  if (g.rating !== null) {
    const text = g.reviewCount !== null ? `${g.reviewCount} ${labels.googleReviews}` : labels.google;
    items.push({ icon: "star", strong: `${fmt(g.rating)}/5`, text, href: g.url ?? undefined });
  }
  if (stats) {
    items.push({ icon: "star", strong: `${fmt(stats.avg)}/5`, text: `${stats.count} ${labels.reviews}`, href: "#avis" });
  }
  if (g.studentsCount !== null) {
    items.push({ icon: "users", strong: `${g.studentsCount}+`, text: labels.students });
  }
  items.push({ icon: "clock", strong: labels.open7, text: labels.hoursShort });

  return (
    <div className="border-y border-line bg-white">
      <Container size="wide">
        <ul className="grid grid-cols-2 gap-y-4 py-4 lg:flex lg:justify-center lg:divide-x lg:divide-line" aria-label={labels.noReviews}>
          {items.map((it) => {
            const body = (
              <>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${it.icon === "star" ? "bg-accent-soft text-accent" : "bg-sky text-primary"}`}>
                  <Icon name={it.icon} filled={it.icon === "star"} strokeWidth={it.icon === "star" ? 1 : 2} className="h-5 w-5" />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block font-extrabold text-ink">{it.strong}</span>
                  <span className="block text-xs text-slate sm:text-sm">{it.text}</span>
                </span>
              </>
            );
            return (
              <li key={`${it.strong}-${it.text}`} className="flex px-2 sm:px-6 lg:justify-center lg:py-2">
                {it.href ? (
                  <a href={it.href} className="flex items-center gap-3 hover:opacity-80" {...(it.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {body}
                  </a>
                ) : (
                  <span className="flex items-center gap-3">{body}</span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
