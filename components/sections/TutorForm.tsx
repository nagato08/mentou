"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import {
  TUTOR_SLOT_GROUPS,
  TUTOR_LEVELS,
  TUTOR_SUBJECTS,
  type TutorOption,
} from "@/lib/tutor";

type Props = { dict: Dictionary };

const INPUT_CLS =
  "w-full px-4 py-3 bg-ink border border-bone/15 text-bone placeholder:text-bone/30 focus:outline-none focus:border-gold/60 transition-colors";
const LABEL_CLS =
  "block text-[0.65rem] uppercase tracking-[0.2em] text-bone/50 mb-2";

function Chip({
  option,
  checked,
  onToggle,
}: {
  option: TutorOption;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={`flex items-center gap-2.5 px-3.5 py-2.5 border cursor-pointer select-none transition-colors text-sm ${
        checked
          ? "border-gold bg-gold/10 text-bone"
          : "border-bone/15 text-bone/60 hover:border-bone/35"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`grid h-4 w-4 shrink-0 place-items-center border ${
          checked ? "border-gold bg-gold text-ink" : "border-bone/30"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 6" /></svg>
        )}
      </span>
      {option.label}
    </label>
  );
}

export default function TutorForm({ dict }: Props) {
  const t = dict.tutor;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [slots, setSlots] = useState<Set<string>>(new Set());
  const [levels, setLevels] = useState<Set<string>>(new Set());
  const [subjects, setSubjects] = useState<Set<string>>(new Set());
  const [otherSubjects, setOtherSubjects] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<Set<string>>>) =>
    (id: string) =>
      setter((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });

  const toggleSlot = toggle(setSlots);
  const toggleLevel = toggle(setLevels);
  const toggleSubject = toggle(setSubjects);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setError("");
    if (slots.size === 0 || levels.size === 0 || subjects.size === 0) {
      setError(t.errorEmpty);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          slots: [...slots],
          levels: [...levels],
          subjects: [...subjects],
          otherSubjects,
          message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
        return;
      }
      setError(data.error ?? t.error);
    } catch {
      setError(t.error);
    }
    setLoading(false);
  };

  if (done) {
    return (
      <section id="devenir-tuteur" className="section-y-home bg-ink border-t hairline">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-10 text-center">
          <span className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 6" /></svg>
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-bone">
            {t.successTitle}
          </h2>
          <p className="mt-4 text-bone/60">{t.success}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="devenir-tuteur" className="section-y-home bg-ink border-t hairline">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-10" data-gsap="fade-up">
          <div className="flex items-center gap-3 mb-5">
            <span className="block h-px w-8 bg-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
              {t.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-bone">
            {t.title}{" "}
            <em className="not-italic font-italic-display text-gold/90">
              {t.titleAccent}
            </em>
          </h2>
          <p className="mt-5 text-bone/60 leading-relaxed">{t.intro}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Identité */}
          <fieldset className="flex flex-col gap-5">
            <legend className="font-display text-xl text-bone mb-2">
              {t.identityTitle}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="tf-name" className={LABEL_CLS}>{t.name}</label>
                <input id="tf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePh} className={INPUT_CLS} required autoComplete="name" />
              </div>
              <div>
                <label htmlFor="tf-email" className={LABEL_CLS}>{t.email}</label>
                <input id="tf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} className={INPUT_CLS} required autoComplete="email" />
              </div>
              <div>
                <label htmlFor="tf-phone" className={LABEL_CLS}>{t.phone}</label>
                <input id="tf-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phonePh} className={INPUT_CLS} required autoComplete="tel" />
              </div>
            </div>
          </fieldset>

          {/* Disponibilités */}
          <fieldset className="flex flex-col gap-4">
            <legend className="font-display text-xl text-bone">
              {t.slotsTitle} <span className="text-gold">*</span>
            </legend>
            <p className="text-sm text-bone/45 -mt-1">{t.slotsHint}</p>
            <div className="flex flex-col gap-5">
              {TUTOR_SLOT_GROUPS.map((group) => (
                <div key={group.day}>
                  <span className="block text-[0.6rem] uppercase tracking-[0.25em] text-bone/40 mb-2">
                    {group.day}
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {group.slots.map((s) => (
                      <Chip key={s.id} option={s} checked={slots.has(s.id)} onToggle={() => toggleSlot(s.id)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Niveaux */}
          <fieldset className="flex flex-col gap-4">
            <legend className="font-display text-xl text-bone">
              {t.levelsTitle} <span className="text-gold">*</span>
            </legend>
            <p className="text-sm text-bone/45 -mt-1">{t.levelsHint}</p>
            <div className="flex flex-wrap gap-2.5">
              {TUTOR_LEVELS.map((l) => (
                <Chip key={l.id} option={l} checked={levels.has(l.id)} onToggle={() => toggleLevel(l.id)} />
              ))}
            </div>
          </fieldset>

          {/* Matières */}
          <fieldset className="flex flex-col gap-4">
            <legend className="font-display text-xl text-bone">
              {t.subjectsTitle} <span className="text-gold">*</span>
            </legend>
            <p className="text-sm text-bone/45 -mt-1">{t.subjectsHint}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TUTOR_SUBJECTS.map((s) => (
                <Chip key={s.id} option={s} checked={subjects.has(s.id)} onToggle={() => toggleSubject(s.id)} />
              ))}
            </div>
            <div className="mt-2">
              <label htmlFor="tf-other" className={LABEL_CLS}>{t.otherLabel}</label>
              <input id="tf-other" value={otherSubjects} onChange={(e) => setOtherSubjects(e.target.value)} placeholder={t.otherPh} className={INPUT_CLS} />
            </div>
          </fieldset>

          {/* Message */}
          <div>
            <label htmlFor="tf-message" className={LABEL_CLS}>{t.messageLabel}</label>
            <textarea id="tf-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.messagePh} rows={3} className={`${INPUT_CLS} resize-none`} />
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3 text-sm text-bone/60 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-gold" required />
            <span>{t.consent}</span>
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-400 border-l-2 border-red-400/50 pl-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !consent}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-ink font-semibold text-sm uppercase tracking-[0.2em] hover:bg-gold-soft disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t.submitting : t.submit}
            {!loading && <span aria-hidden>→</span>}
          </button>
        </form>
      </div>
    </section>
  );
}
