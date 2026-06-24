import "server-only";
import { Resend } from "resend";
import { OFFER_LABELS, type Registration } from "./registration";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Expéditeur vérifié dans Resend (domaine mentou.ca).
const FROM = process.env.RESEND_FROM ?? "Groupe Mentou <noreply@mentou.ca>";
const ADMIN_EMAIL = process.env.CONTACT_EMAIL ?? "admission@mentou.ca";

function adminHtml(r: Registration): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#888;">${label}</td><td style="padding:6px 12px;color:#111;font-weight:600;">${value || "—"}</td></tr>`;
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
      <h2 style="color:#111;">Nouvelle inscription payée</h2>
      <p style="color:#555;">Offre : <strong>${OFFER_LABELS[r.offer]}</strong></p>
      <table style="border-collapse:collapse;width:100%;background:#fafafa;border:1px solid #eee;">
        ${row("Parent", r.parentName)}
        ${row("Courriel", r.parentEmail)}
        ${row("Téléphone", r.parentPhone)}
        ${row("Enfant", r.childName)}
        ${row("Âge", r.childAge)}
        ${row("École", r.childSchool)}
        ${row("Adresse", `${r.address}, ${r.city} ${r.postalCode}, ${r.province}`)}
        ${row("Disponibilités", r.availability)}
        ${row("Attentes", r.expectations)}
        ${row("Suggestions", r.suggestions)}
      </table>
      <p style="color:#999;font-size:12px;">Réf. ${r.id}</p>
    </div>`;
}

function parentHtml(r: Registration): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;">
      <h2 style="color:#111;">Bienvenue au Groupe Mentou</h2>
      <p style="color:#333;">Bonjour ${r.parentName},</p>
      <p style="color:#333;">Nous confirmons l'inscription de <strong>${r.childName}</strong> au programme
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
  await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `Nouvelle inscription — ${r.childName} (${OFFER_LABELS[r.offer]})`,
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
