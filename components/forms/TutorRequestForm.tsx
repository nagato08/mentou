"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import {
  ALL_OFFERS,
  HOURLY_RATES,
  MAX_HOURS,
  MIN_HOURS,
  MONTHLY_PRICE,
  isHourlyOffer,
  requiresAddress,
  type Offer,
} from "@/lib/registration";
import { TUTOR_LEVELS, subjectsForLevel, type TutorOption } from "@/lib/tutor";
import { formatPrice } from "@/lib/format";
import Icon from "@/components/ui/Icon";

type Props = {
  lang: Locale;
  t: Dictionary["request"];
  plans: Dictionary["home"]["pricing"]["plans"];
  pricing: Pick<Dictionary["home"]["pricing"], "perHour" | "perMonth">;
  initialOffer: Offer;
  canceled?: boolean;
};

const fieldsInit = {
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
  otherSubject: "",
};

type FieldKey = keyof typeof fieldsInit;

const INPUT =
  "w-full min-h-12 rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
      <legend className="float-left mb-1 w-full text-lg font-extrabold text-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

export default function TutorRequestForm({
  lang,
  t,
  plans,
  pricing,
  initialOffer,
  canceled,
}: Props) {
  const [offer, setOffer] = useState<Offer>(initialOffer);
  const [hours, setHours] = useState(4);
  const [form, setForm] = useState(fieldsInit);
  const [level, setLevel] = useState("");
  const [subjects, setSubjects] = useState<Set<string>>(new Set());
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hourly = isHourlyOffer(offer);
  const needsAddress = requiresAddress(offer);
  const unit = hourly ? HOURLY_RATES[offer] : MONTHLY_PRICE;
  const subtotal = hourly ? unit * hours : MONTHLY_PRICE;

  const set = (k: FieldKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleSubject = (id: string) =>
    setSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const optLabel = (o: TutorOption) => (lang === "en" ? o.labelEn : o.label);
  const subjectOptions = subjectsForLevel(level);

  // Change de niveau : on retire les matières qui ne s'appliquent plus.
  const chooseLevel = (next: string) => {
    setLevel(next);
    const allowed = new Set(subjectsForLevel(next).map((o) => o.id));
    setSubjects((prev) => new Set([...prev].filter((id) => allowed.has(id))));
  };

  const clampHours = (n: number) => Math.min(MAX_HOURS, Math.max(MIN_HOURS, n));

  const field = (
    key: FieldKey,
    opts: { type?: string; required?: boolean; full?: boolean; autoComplete?: string; hint?: string } = {}
  ) => {
    const required = opts.required ?? true;
    const label = t.fields[key as keyof typeof t.fields];
    const placeholder = t.placeholders[key as keyof typeof t.placeholders];
    return (
      <div className={opts.full ? "sm:col-span-2" : ""}>
        <label htmlFor={key} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-semibold text-ink">
          <span>
            {label}
            {required && <span className="text-danger"> *</span>}
          </span>
          {!required && <span className="text-xs font-normal text-muted">{t.optional}</span>}
        </label>
        <input
          id={key}
          name={key}
          type={opts.type ?? "text"}
          value={form[key]}
          onChange={set(key)}
          placeholder={placeholder}
          required={required}
          autoComplete={opts.autoComplete ?? "off"}
          className={INPUT}
        />
        {opts.hint && <p className="mt-1.5 text-xs text-muted">{opts.hint}</p>}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          lang,
          offer,
          hours: hourly ? hours : undefined,
          studentLevel: level,
          subjects: [...subjects],
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(res.status === 400 ? t.missing : t.error);
    } catch {
      setError(t.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="flex flex-col gap-6">
        {canceled && (
          <p role="status" className="rounded-2xl border border-accent/40 bg-accent-soft px-5 py-4 text-sm text-ink">
            {t.canceled}
          </p>
        )}

        <Section title={t.steps.plan}>
          <div role="radiogroup" aria-label={t.steps.plan} className="grid gap-3 md:grid-cols-3">
            {ALL_OFFERS.map((o) => {
              const active = o === offer;
              const price = isHourlyOffer(o) ? HOURLY_RATES[o] : MONTHLY_PRICE;
              return (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setOffer(o)}
                  className={`flex flex-col items-start gap-1 rounded-2xl border-2 p-4 text-left transition-colors ${
                    active ? "border-primary bg-sky" : "border-line hover:border-sky-strong"
                  }`}
                >
                  <span className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wide text-primary">
                    {plans[o].mode}
                    <span
                      aria-hidden
                      className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                        active ? "border-primary bg-primary text-white" : "border-line"
                      }`}
                    >
                      {active && <Icon name="check" className="h-3 w-3" strokeWidth={3.5} />}
                    </span>
                  </span>
                  <span className="font-bold text-ink">{plans[o].name}</span>
                  <span className="text-sm text-slate">
                    <strong className="text-lg text-ink">{formatPrice(price, lang)}</strong>{" "}
                    {isHourlyOffer(o) ? pricing.perHour : pricing.perMonth}
                  </span>
                </button>
              );
            })}
          </div>

          {hourly ? (
            <div className="flex flex-col gap-2 rounded-2xl bg-paper p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <label htmlFor="hours" className="font-semibold text-ink">
                  {t.hours.label}
                </label>
                <p className="text-xs text-muted">{t.hours.hint}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHours((h) => clampHours(h - 1))}
                  disabled={hours <= MIN_HOURS}
                  aria-label={t.hours.decrease}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-primary disabled:opacity-40"
                >
                  <Icon name="minus" className="h-5 w-5" />
                </button>
                <input
                  id="hours"
                  type="number"
                  inputMode="numeric"
                  min={MIN_HOURS}
                  max={MAX_HOURS}
                  value={hours}
                  onChange={(e) => setHours(clampHours(Number(e.target.value) || MIN_HOURS))}
                  className="h-11 w-20 rounded-xl border border-line bg-white text-center text-lg font-bold text-ink tabular-nums focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                />
                <button
                  type="button"
                  onClick={() => setHours((h) => clampHours(h + 1))}
                  disabled={hours >= MAX_HOURS}
                  aria-label={t.hours.increase}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-primary disabled:opacity-40"
                >
                  <Icon name="plus" className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <ul className="grid gap-2 rounded-2xl bg-paper p-4 sm:grid-cols-2">
              {plans.monthly.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-ink">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-success" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title={t.steps.parent}>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("parentName", { full: true, autoComplete: "name" })}
            {field("parentEmail", { type: "email", autoComplete: "email" })}
            {field("parentPhone", { type: "tel", autoComplete: "tel" })}
          </div>
        </Section>

        <Section title={t.steps.student}>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("childName", { full: true })}
            {field("childAge", { required: false })}
            {field("childSchool", { required: false })}
          </div>

          <div>
            <span id="level-label" className="mb-2 block text-sm font-semibold text-ink">
              {t.fields.level}
            </span>
            <div role="radiogroup" aria-labelledby="level-label" className="flex flex-wrap gap-2">
              {TUTOR_LEVELS.map((l) => {
                const active = level === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => chooseLevel(active ? "" : l.id)}
                    className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-line text-slate hover:border-primary hover:text-primary"
                    }`}
                  >
                    {optLabel(l)}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="block text-sm font-semibold text-ink">{t.fields.subjects}</span>
            <p className="mb-2 text-xs text-muted">{level ? t.fields.subjectsMulti : ""}</p>
            {!level && (
              <p className="rounded-xl bg-paper px-4 py-3 text-sm text-slate">{t.fields.subjectsHint}</p>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              {(level ? subjectOptions : []).map((s) => {
                const active = subjects.has(s.id);
                return (
                  <label
                    key={s.id}
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-colors ${
                      active ? "border-primary bg-sky text-ink" : "border-line text-slate hover:border-sky-strong"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleSubject(s.id)}
                      className="h-4 w-4 shrink-0 accent-[var(--ma-primary)]"
                    />
                    {optLabel(s)}
                  </label>
                );
              })}
            </div>
          </div>

          {field("otherSubject", { required: false, full: true })}
        </Section>

        <Section title={t.steps.address}>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("address", {
              full: true,
              required: needsAddress,
              autoComplete: "street-address",
              hint: needsAddress ? undefined : t.addressOnlineHint,
            })}
            {field("city", { required: needsAddress, autoComplete: "address-level2" })}
            {field("postalCode", { required: needsAddress, autoComplete: "postal-code" })}
            {field("province", { required: needsAddress, autoComplete: "address-level1" })}
          </div>
        </Section>

        <Section title={t.steps.extra}>
          {field("availability", { required: false })}
          <div>
            <label htmlFor="expectations" className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-ink">
              {t.fields.expectations}
              <span className="text-xs font-normal text-muted">{t.optional}</span>
            </label>
            <textarea
              id="expectations"
              value={form.expectations}
              onChange={set("expectations")}
              placeholder={t.placeholders.expectations}
              rows={4}
              className={`${INPUT} resize-y`}
            />
          </div>
        </Section>
      </div>

      {/* Récapitulatif + paiement */}
      <aside className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-6 shadow-lift lg:sticky lg:top-32">
        <h2 className="text-lg font-extrabold text-ink">{t.summary.title}</h2>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate">{t.summary.plan}</dt>
            <dd className="text-right font-semibold text-ink">{plans[offer].name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate">{t.summary.rate}</dt>
            <dd className="font-semibold text-ink tabular-nums">
              {formatPrice(unit, lang)} {hourly ? pricing.perHour : pricing.perMonth}
            </dd>
          </div>
          {hourly && (
            <div className="flex justify-between gap-4">
              <dt className="text-slate">{t.summary.hours}</dt>
              <dd className="font-semibold text-ink tabular-nums">{hours} h</dd>
            </div>
          )}
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
            <dt className="font-bold text-ink">{t.summary.subtotal}</dt>
            <dd className="text-2xl font-extrabold text-ink tabular-nums">{formatPrice(subtotal, lang)}</dd>
          </div>
          {!hourly && <p className="text-right text-xs text-muted">{t.summary.recurring}</p>}
        </dl>
        <p className="text-xs text-muted">{t.summary.taxes}</p>

        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--ma-primary)]"
          />
          {t.consent}
        </label>

        {error && (
          <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !consent}
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-white shadow-lift transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? t.submitting : t.submit}
          {!loading && <Icon name="arrow" className="h-5 w-5" />}
        </button>

        <ul className="flex flex-col gap-2 border-t border-line pt-4">
          {t.trust.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs font-medium text-slate">
              <Icon name="shield" className="h-4 w-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </form>
  );
}
