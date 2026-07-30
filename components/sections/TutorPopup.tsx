"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = { dict: Dictionary; lang: Locale };

const STORAGE_KEY = "mentou_tutor_popup_dismissed";

export default function TutorPopup({ dict, lang }: Props) {
  const t = dict.tutor.popup;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    // Petit délai pour ne pas gêner l'arrivée sur le site.
    const id = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t.dismiss}
        onClick={close}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutor-popup-title"
        className="relative w-full max-w-md border border-gold/25 bg-night/95 p-8 md:p-10 shadow-2xl animate-[fadeIn_.3s_ease]"
      >
        <button
          type="button"
          onClick={close}
          aria-label={t.dismiss}
          className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-bone/20 text-bone/60 hover:border-gold hover:text-bone transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <span className="block h-px w-8 bg-gold" />
          <span className="text-[0.6rem] uppercase tracking-[0.35em] text-gold">
            {t.eyebrow}
          </span>
        </div>

        <h2 id="tutor-popup-title" className="font-display text-3xl text-bone leading-tight">
          {t.title}
        </h2>
        <p className="mt-4 text-sm text-bone/65 leading-relaxed">{t.body}</p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/${lang}/admission#devenir-tuteur`}
            onClick={close}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-ink font-semibold text-sm uppercase tracking-[0.2em] hover:bg-gold-soft transition-colors"
          >
            {t.cta}
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={close}
            className="px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-bone/50 hover:text-bone transition-colors"
          >
            {t.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
