import "server-only";
import { Resend } from "resend";
import {
  isHourlyOffer,
  isLegacyOffer,
  registrationLabel,
  MONTHLY_HOURS_PER_WEEK,
  type Registration,
} from "./registration";
import { levelLabel, subjectLabels } from "./tutor";
import { BILLING_PORTAL_URL } from "./contact";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Expéditeur vérifié dans Resend (domaine mentou.ca).
const FROM = process.env.RESEND_FROM ?? "Mentou Academy <noreply@mentou.ca>";
const ADMIN_EMAIL = process.env.CONTACT_EMAIL ?? "info@mentou.ca";
const BRAND = "Mentou Academy";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 12px;color:#64748b;">${label}</td><td style="padding:6px 12px;color:#0f1d33;font-weight:600;">${esc(value) || "—"}</td></tr>`;

function adminHtml(r: Registration): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
      <h2 style="color:#0f1d33;">Nouvelle inscription payée</h2>
      <p style="color:#475569;">Formule : <strong>${esc(registrationLabel(r))}</strong></p>
      <table style="border-collapse:collapse;width:100%;background:#f8fafc;border:1px solid #e3e9f2;">
        ${row("Parent", r.parentName)}
        ${row("Courriel", r.parentEmail)}
        ${row("Téléphone", r.parentPhone)}
        ${row("Élève", r.childName)}
        ${row("Âge", r.childAge)}
        ${row("École", r.childSchool)}
        ${row("Niveau", levelLabel(r.studentLevel))}
        ${row("Matières", [...subjectLabels(r.subjects), r.otherSubject].filter(Boolean).join(", "))}
        ${row("Adresse", [r.address, r.city, r.postalCode, r.province].filter(Boolean).join(", "))}
        ${row("Disponibilités", r.availability)}
        ${row("Détails", r.expectations)}
      </table>
      <p style="color:#94a3b8;font-size:12px;">Réf. ${esc(r.id)}</p>
    </div>`;
}

function parentHtml(r: Registration): string {
  const student = r.childName || r.parentName;
  const detail = isHourlyOffer(r.offer)
    ? `Votre paiement de <strong>${r.hours ?? ""} heure(s)</strong> a bien été reçu.`
    : `L'abonnement mensuel (${MONTHLY_HOURS_PER_WEEK} heures par semaine en présentiel) est actif et sera facturé automatiquement chaque mois.`;
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;color:#0f1d33;">
      <h2 style="color:#2554d6;">Bienvenue chez ${BRAND}</h2>
      <p>Bonjour ${esc(r.parentName)},</p>
      <p>Nous confirmons l'inscription de <strong>${esc(student)}</strong> à la formule
      <strong>${esc(registrationLabel(r))}</strong>.</p>
      <p>${detail}</p>
      <p>Un membre de notre équipe vous contactera très bientôt pour planifier les séances et jumeler votre enfant avec le bon tuteur.</p>
      ${isHourlyOffer(r.offer) ? "" : `<p>Pour consulter vos factures, changer de carte ou résilier votre abonnement : <a href="${BILLING_PORTAL_URL}">gérer mon abonnement</a> (connexion avec votre courriel).</p>`}
      <p>Pour toute question : <a href="mailto:info@mentou.ca">info@mentou.ca</a> ou +1 (438) 342-7730.</p>
      <p style="color:#475569;">L'équipe ${BRAND}</p>
    </div>`;
}

export async function sendRegistrationEmails(r: Registration): Promise<void> {
  if (!resend) {
    console.warn("RESEND_API_KEY manquant — emails non envoyés.");
    return;
  }
  // Les anciennes offres (tournoi, etc.) ne sont plus vendues.
  if (isLegacyOffer(r.offer)) return;

  const label = registrationLabel(r);
  await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      replyTo: r.parentEmail,
      subject: `Nouvelle inscription : ${r.childName || r.parentName} (${label})`,
      html: adminHtml(r),
    }),
    resend.emails.send({
      from: FROM,
      to: r.parentEmail,
      subject: `Confirmation d'inscription, ${BRAND}`,
      html: parentHtml(r),
    }),
  ]);
}

/** Prévient l'équipe qu'un renouvellement d'abonnement a échoué. */
export async function sendPaymentFailedEmail(r: Registration, amountDueCents: number): Promise<void> {
  if (!resend) return;
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: r.parentEmail,
    subject: `Paiement refusé : ${r.childName || r.parentName} (abonnement mensuel)`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
        <h2 style="color:#b42318;">Renouvellement refusé</h2>
        <p style="color:#475569;">Stripe n'a pas pu prélever ${(amountDueCents / 100).toFixed(2)} $ pour l'abonnement mensuel. Stripe relancera automatiquement selon vos paramètres ; vous pouvez aussi contacter la famille.</p>
        <table style="border-collapse:collapse;width:100%;background:#f8fafc;border:1px solid #e3e9f2;">
          ${row("Parent", r.parentName)}
          ${row("Courriel", r.parentEmail)}
          ${row("Téléphone", r.parentPhone)}
          ${row("Élève", r.childName)}
        </table>
      </div>`,
  });
}

export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

/** Envoie un message du formulaire de contact. Retourne false si l'envoi est impossible. */
export async function sendContactEmail(m: ContactMessage): Promise<boolean> {
  if (!resend) {
    console.warn("RESEND_API_KEY manquant — message de contact non envoyé.");
    return false;
  }
  const { error } = await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: m.email,
    subject: `Nouveau message de ${m.name}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
        <h2 style="color:#0f1d33;">Nouveau message du site</h2>
        <table style="border-collapse:collapse;width:100%;background:#f8fafc;border:1px solid #e3e9f2;">
          ${row("Nom", m.name)}
          ${row("Courriel", m.email)}
          ${row("Téléphone", m.phone)}
        </table>
        <p style="white-space:pre-wrap;color:#0f1d33;">${esc(m.message)}</p>
      </div>`,
  });
  if (error) {
    console.error("sendContactEmail", error);
    return false;
  }
  return true;
}
