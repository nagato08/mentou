import "server-only";
import { Resend } from "resend";
import { OFFER_LABELS, isEventOffer, type Registration } from "./registration";
import {
  slotLabels,
  levelLabels,
  subjectLabels,
  type TutorApplication,
} from "./tutor";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Expéditeur vérifié dans Resend (domaine mentou.ca).
const FROM = process.env.RESEND_FROM ?? "Groupe Mentou <noreply@mentou.ca>";
const ADMIN_EMAIL = process.env.CONTACT_EMAIL ?? "admission@mentou.ca";

function adminHtml(r: Registration): string {
  const isEvent = isEventOffer(r.offer);
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#888;">${label}</td><td style="padding:6px 12px;color:#111;font-weight:600;">${value || "—"}</td></tr>`;
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
      <h2 style="color:#111;">${isEvent ? "Nouvelle inscription événement payée" : "Nouvelle inscription programme payée"}</h2>
      <p style="color:#555;">Offre : <strong>${OFFER_LABELS[r.offer]}</strong></p>
      <table style="border-collapse:collapse;width:100%;background:#fafafa;border:1px solid #eee;">
        ${row(isEvent ? "Nom" : "Contact", r.parentName)}
        ${row("Courriel", r.parentEmail)}
        ${row("Téléphone", r.parentPhone)}
        ${
          isEvent
            ? row("Nation / équipe", r.expectations)
            : `
        ${row("Participant", r.childName)}
        ${row("Âge", r.childAge)}
        ${row("École / établissement", r.childSchool)}
        ${row("Adresse", `${r.address}, ${r.city} ${r.postalCode}, ${r.province}`)}
        ${row("Disponibilités", r.availability)}
        ${row("Attentes", r.expectations)}
        ${row("Suggestions", r.suggestions)}`
        }
      </table>
      <p style="color:#999;font-size:12px;">Réf. ${r.id}</p>
    </div>`;
}

function parentHtml(r: Registration): string {
  const isEvent = isEventOffer(r.offer);
  if (isEvent) {
    return `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
        <h2 style="color:#111;">Inscription confirmée</h2>
        <p style="color:#333;">Bonjour ${r.parentName},</p>
        <p style="color:#333;">Nous confirmons votre inscription pour <strong>${OFFER_LABELS[r.offer]}</strong>.</p>
        <p style="color:#333;">Votre paiement a bien été reçu. Notre équipe vous contactera au besoin avec les détails pratiques de l'événement.</p>
        <p style="color:#555;">— L'équipe Groupe Mentou Inc.</p>
      </div>`;
  }

  const participant = r.childName || r.parentName;
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
      <h2 style="color:#111;">Bienvenue au Groupe Mentou</h2>
      <p style="color:#333;">Bonjour ${r.parentName},</p>
      <p style="color:#333;">Nous confirmons l'inscription de <strong>${participant}</strong> au programme
      (<strong>${OFFER_LABELS[r.offer]}</strong>). Votre paiement récurrent est actif.</p>
      <p style="color:#333;">Notre équipe vous contactera sous peu pour les prochaines étapes.</p>
      <p style="color:#555;">— L'équipe Groupe Mentou Inc.</p>
    </div>`;
}

export async function sendRegistrationEmails(r: Registration): Promise<void> {
  if (!resend) {
    console.warn("RESEND_API_KEY manquant — emails non envoyés.");
    return;
  }
  const isEvent = isEventOffer(r.offer);
  const subjectName = isEvent ? r.parentName : r.childName || r.parentName;
  await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `Nouvelle inscription — ${subjectName} (${OFFER_LABELS[r.offer]})`,
      html: adminHtml(r),
    }),
    resend.emails.send({
      from: FROM,
      to: r.parentEmail,
      subject: "Confirmation d'inscription — Groupe Mentou",
      html: parentHtml(r),
    }),
  ]);
}

function tutorAdminHtml(a: TutorApplication): string {
  const list = (items: string[]) =>
    items.length
      ? `<ul style="margin:4px 0 0;padding-left:18px;color:#111;">${items
          .map((i) => `<li style="margin:2px 0;">${i}</li>`)
          .join("")}</ul>`
      : "<span style=\"color:#999;\">—</span>";
  const block = (label: string, html: string) =>
    `<tr><td style="padding:8px 12px;color:#888;vertical-align:top;">${label}</td><td style="padding:8px 12px;">${html}</td></tr>`;
  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:auto;">
      <h2 style="color:#111;">Nouvelle candidature tuteur</h2>
      <table style="border-collapse:collapse;width:100%;background:#fafafa;border:1px solid #eee;">
        ${block("Nom", `<strong>${a.name}</strong>`)}
        ${block("Courriel", a.email)}
        ${block("Téléphone", a.phone)}
        ${block("Disponibilités", list(slotLabels(a.slots)))}
        ${block("Niveaux", list(levelLabels(a.levels)))}
        ${block("Matières", list(subjectLabels(a.subjects)))}
        ${a.otherSubjects ? block("Autres matières", a.otherSubjects) : ""}
        ${a.message ? block("Message", a.message) : ""}
      </table>
      <p style="color:#999;font-size:12px;">Réf. ${a.id}</p>
    </div>`;
}

export async function sendTutorApplicationEmails(
  a: TutorApplication
): Promise<void> {
  if (!resend) {
    console.warn("RESEND_API_KEY manquant — email candidature non envoyé.");
    return;
  }
  await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `Nouvelle candidature tuteur — ${a.name}`,
      html: tutorAdminHtml(a),
    }),
    resend.emails.send({
      from: FROM,
      to: a.email,
      subject: "Candidature reçue — Groupe Mentou",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
          <h2 style="color:#111;">Merci pour votre candidature</h2>
          <p style="color:#333;">Bonjour ${a.name},</p>
          <p style="color:#333;">Nous avons bien reçu votre candidature pour rejoindre l'équipe de tuteurs du Groupe Mentou. Notre équipe l'examinera et vous recontactera prochainement.</p>
          <p style="color:#555;">— L'équipe Groupe Mentou Inc.</p>
        </div>`,
    }),
  ]);
}
