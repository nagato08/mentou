"use client";

import { useState, type FormEvent } from "react";

type FormDict = {
  eyebrow: string;
  title: string;
  intro: string;
  reassurance: string[];
  nextSteps: {
    title: string;
    items: string[];
  };
  fields: {
    parentName: { label: string; placeholder: string };
    childName: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    preferredContact: { label: string; options: string[] };
    division: { label: string; options: string[] };
    message: { label: string; placeholder: string };
  };
  consent: string;
  submit: string;
  submitting: string;
  success: string;
  required: string;
};

type Status = "idle" | "submitting" | "success";

export default function ContactForm({ dict }: { dict: FormDict }) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.fields;
  const WHATSAPP_NUMBER = "14383427730";
  const EMAIL = "admission@mentou.ca";

  const formatMessage = (formData: FormData): string => {
    const parentName = formData.get("parentName") || "";
    const childName = formData.get("childName") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const division = formData.get("division") || "";
    const message = formData.get("message") || "";

    return `Parent: ${parentName}\nJeune: ${childName}\nEmail: ${email}\nTéléphone: ${phone}\nDivision: ${division}\nMessage: ${message}`;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const preferredContact = formData.get("preferredContact") as string;
    const messageText = formatMessage(formData);

    await new Promise((r) => setTimeout(r, 600));

    if (preferredContact === "Téléphone" || preferredContact === "Phone") {
      const smsText = encodeURIComponent(messageText);
      window.location.href = `sms:+1 (438) 342-7730?body=${smsText}`;
    } else if (preferredContact === "WhatsApp") {
      const waText = encodeURIComponent(messageText);
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
    } else {
      const subject = encodeURIComponent("Demande d'admission Mentou");
      const body = encodeURIComponent(messageText);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }

    setStatus("success");
  };

  return (
    <div className="flex flex-col gap-8" data-gsap="fade-right">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="block h-px w-8 bg-gold" />
          <span className="eyebrow">{dict.eyebrow}</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-bone">
          {dict.title}
        </h2>
        <p className="text-bone/60 leading-relaxed max-w-md">{dict.intro}</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {dict.reassurance.map((item) => (
            <li
              key={item}
              className="border border-bone/10 px-4 py-3 text-sm leading-relaxed text-bone/65"
            >
              <span className="mb-2 block h-px w-8 bg-gold/70" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {status === "success" ? (
        <div className="border border-gold bg-gold/5 p-6 md:p-8 flex flex-col gap-2">
          <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">✓ ok</span>
          <p className="font-display text-xl md:text-2xl text-bone">{dict.success}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label={f.parentName.label} name="parentName" placeholder={f.parentName.placeholder} required />
            <Field label={f.childName.label} name="childName" placeholder={f.childName.placeholder} required />
            <Field label={f.email.label} name="email" type="email" placeholder={f.email.placeholder} required />
            <Field label={f.phone.label} name="phone" type="tel" placeholder={f.phone.placeholder} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldSelect
              label={f.preferredContact.label}
              name="preferredContact"
              options={f.preferredContact.options}
            />
            <FieldSelect label={f.division.label} name="division" options={f.division.options} />
          </div>

          <FieldTextarea label={f.message.label} name="message" placeholder={f.message.placeholder} required />

          <div className="border border-bone/10 bg-night/30 p-5">
            <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
              {dict.nextSteps.title}
            </h3>
            <ol className="mt-4 grid gap-3 md:grid-cols-3">
              {dict.nextSteps.items.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm text-bone/60">
                  <span className="font-mono text-xs text-gold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          <label className="flex items-start gap-3 text-sm text-bone/60 cursor-pointer">
            <input
              type="checkbox"
              required
              className="mt-1 size-4 accent-gold border border-bone/30 bg-transparent shrink-0"
            />
            {dict.consent}
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex items-center justify-between gap-4 border border-gold bg-gold text-ink px-8 py-5 text-xs uppercase tracking-[0.3em] font-medium hover:bg-gold-soft transition-all duration-500 disabled:opacity-60"
          >
            {status === "submitting" ? dict.submitting : dict.submit}
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone/50">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="bg-transparent border-b border-bone/20 py-3 text-bone placeholder:text-bone/30 focus:border-gold focus:outline-none transition-colors"
      />
    </label>
  );
}

function FieldSelect({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone/50">{label}</span>
      <select
        name={name}
        className="bg-ink border-b border-bone/20 py-3 text-bone focus:border-gold focus:outline-none transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-ink text-bone">
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone/50">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="bg-transparent border border-bone/20 p-4 text-bone placeholder:text-bone/30 focus:border-gold focus:outline-none transition-colors resize-none"
      />
    </label>
  );
}
