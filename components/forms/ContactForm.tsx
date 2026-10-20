"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";
import Icon from "@/components/ui/Icon";

type Status = "idle" | "submitting" | "success" | "error";

const INPUT =
  "w-full min-h-12 rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

export default function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-2xl bg-success/10 px-6 py-12 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-success">
          <Icon name="check" className="h-7 w-7" strokeWidth={3} />
        </span>
        <p className="max-w-sm font-semibold text-ink">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-semibold text-ink">
            {t.name} <span className="text-danger">*</span>
          </label>
          <input id="c-name" name="name" required autoComplete="name" placeholder={t.namePh} className={INPUT} />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-semibold text-ink">
            {t.email} <span className="text-danger">*</span>
          </label>
          <input id="c-email" name="email" type="email" required autoComplete="email" placeholder={t.emailPh} className={INPUT} />
        </div>
        <div>
          <label htmlFor="c-phone" className="mb-1.5 block text-sm font-semibold text-ink">
            {t.phone}
          </label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder={t.phonePh} className={INPUT} />
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-semibold text-ink">
          {t.message} <span className="text-danger">*</span>
        </label>
        <textarea id="c-message" name="message" required rows={5} placeholder={t.messagePh} className={`${INPUT} resize-y`} />
      </div>

      {/* Champ piège anti-robot, invisible pour les humains. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <label className="flex cursor-pointer items-start gap-3 text-sm text-slate">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--ma-primary)]" />
        {t.consent}
      </label>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
          {t.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-13 items-center justify-center gap-2 self-start rounded-full bg-primary px-7 font-semibold text-white shadow-lift transition-colors hover:bg-primary-dark disabled:opacity-50"
      >
        {status === "submitting" ? t.submitting : t.submit}
        {status !== "submitting" && <Icon name="arrow" className="h-5 w-5" />}
      </button>
    </form>
  );
}
