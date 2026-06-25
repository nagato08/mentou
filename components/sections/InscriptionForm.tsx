"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { type Offer, isEventOffer } from "@/lib/registration";

type Props = {
  dict: Dictionary;
  offer: Offer;
  canceled?: boolean;
};

const initial = {
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  childName: "",
  childAge: "",
  childSchool: "",
  address: "",
  city: "",
  postalCode: "",
  province: "Québec",
  availability: "",
  expectations: "",
  suggestions: "",
};

const INPUT_CLS =
  "w-full px-4 py-3 bg-ink border border-bone/15 text-bone placeholder:text-bone/30 focus:outline-none focus:border-gold/60 transition-colors";
const LABEL_CLS =
  "block text-[0.65rem] uppercase tracking-[0.2em] text-bone/50 mb-2";

function TextField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  full = false,
  required = true,
  autoComplete = "off",
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  full?: boolean;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className={LABEL_CLS}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={INPUT_CLS}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default function InscriptionForm({ dict, offer, canceled }: Props) {
  const t = dict.registration;
  const isEvent = isEventOffer(offer);
  const isPlayer = offer === "event-player";

  // État programme (formulaire complet)
  const [form, setForm] = useState(initial);
  // État event (formulaire minimal)
  const [ev, setEv] = useState({ name: "", email: "", phone: "", nation: "" });

  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof initial) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const setE = (k: keyof typeof ev) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setEv((s) => ({ ...s, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setLoading(true);
    setError("");

    // Construire le payload selon le type d'offre.
    const payload = isEvent
      ? {
          offer,
          parentName: ev.name,
          parentEmail: ev.email,
          parentPhone: ev.phone,
          childName: "",
          childAge: "",
          childSchool: "",
          address: "",
          city: "",
          postalCode: "",
          province: "",
          availability: "",
          expectations: isPlayer ? ev.nation : "",
          suggestions: "",
        }
      : { ...form, offer };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? t.error);
    } catch {
      setError(t.error);
    }
    setLoading(false);
  };

  const inputCls = INPUT_CLS;
  const labelCls = LABEL_CLS;

  const field = (
    name: keyof typeof initial,
    opts: { type?: string; full?: boolean; required?: boolean } = {}
  ) => (
    <TextField
      id={name}
      label={t.fields[name]}
      placeholder={t.placeholders[name]}
      value={form[name]}
      onChange={set(name)}
      type={opts.type}
      full={opts.full}
      required={opts.required ?? true}
      autoComplete={
        name === "parentEmail"
          ? "email"
          : name === "parentPhone"
            ? "tel"
            : name === "postalCode"
              ? "postal-code"
              : "off"
      }
    />
  );

  const offerLabel = isEvent ? t.event.offerLabels[offer] : t.offers[offer];

  return (
    <section className="section-y-home bg-ink">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-10">
        {/* Offre choisie */}
        <div className="mb-10 flex items-center justify-between border border-gold/30 bg-gold/5 px-5 py-4">
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-bone/50">
            {t.offerLabel}
          </span>
          <span className="font-display text-xl text-gold">{offerLabel}</span>
        </div>

        {canceled && (
          <p className="mb-8 border-l-2 border-gold/50 pl-4 text-sm text-bone/60">
            {t.canceled}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {isEvent ? (
            /* ── Formulaire EVENT (minimal) ── */
            <fieldset className="flex flex-col gap-5">
              <legend className="font-display text-xl text-bone mb-2">
                {isPlayer ? t.event.sectionPlayer : t.event.sectionSpectator}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <TextField
                  id="ev-name"
                  label={t.event.fields.name}
                  placeholder={t.event.placeholders.name}
                  value={ev.name}
                  onChange={setE("name")}
                  full
                />
                <TextField
                  id="ev-email"
                  label={t.event.fields.email}
                  placeholder={t.event.placeholders.email}
                  value={ev.email}
                  onChange={setE("email")}
                  type="email"
                  autoComplete="email"
                />
                <TextField
                  id="ev-phone"
                  label={t.event.fields.phone}
                  placeholder={t.event.placeholders.phone}
                  value={ev.phone}
                  onChange={setE("phone")}
                  type="tel"
                  autoComplete="tel"
                />
                {isPlayer && (
                  <TextField
                    id="ev-nation"
                    label={t.event.fields.nation}
                    placeholder={t.event.placeholders.nation}
                    value={ev.nation}
                    onChange={setE("nation")}
                    full
                  />
                )}
              </div>
            </fieldset>
          ) : (
            /* ── Formulaire PROGRAMME (complet) ── */
            <>
              <fieldset className="flex flex-col gap-5">
                <legend className="font-display text-xl text-bone mb-2">
                  {t.sections.parent}
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {field("parentName", { full: true })}
                  {field("parentEmail", { type: "email" })}
                  {field("parentPhone", { type: "tel" })}
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-5">
                <legend className="font-display text-xl text-bone mb-2">
                  {t.sections.child}
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {field("childName", { full: true, required: false })}
                  {field("childAge", { required: false })}
                  {field("childSchool", { required: false })}
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-5">
                <legend className="font-display text-xl text-bone mb-2">
                  {t.sections.address}
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {field("address", { full: true })}
                  {field("city")}
                  {field("postalCode")}
                  {field("province")}
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-5">
                <legend className="font-display text-xl text-bone mb-2">
                  {t.sections.extra}
                </legend>
                <div>
                  <label htmlFor="availability" className={labelCls}>
                    {t.fields.availability}
                  </label>
                  <input
                    id="availability"
                    value={form.availability}
                    onChange={set("availability")}
                    placeholder={t.placeholders.availability}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="expectations" className={labelCls}>
                    {t.fields.expectations}
                  </label>
                  <textarea
                    id="expectations"
                    value={form.expectations}
                    onChange={set("expectations")}
                    placeholder={t.placeholders.expectations}
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div>
                  <label htmlFor="suggestions" className={labelCls}>
                    {t.fields.suggestions}
                  </label>
                  <textarea
                    id="suggestions"
                    value={form.suggestions}
                    onChange={set("suggestions")}
                    placeholder={t.placeholders.suggestions}
                    rows={2}
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </fieldset>
            </>
          )}

          {/* Consent */}
          <label className="flex items-start gap-3 text-sm text-bone/60 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 accent-gold"
              required
            />
            <span>{isEvent ? t.event.consent : t.consent}</span>
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
            {loading ? t.submitting : isEvent ? t.event.submit : t.submit}
            {!loading && <span aria-hidden>→</span>}
          </button>
        </form>
      </div>
    </section>
  );
}
