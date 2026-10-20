// Coordonnées publiques de Mentou Academy (client + serveur).

export const PHONE_DISPLAY = "+1 (438) 342-7730";
export const PHONE_TEL = "tel:+14383427730";
export const EMAIL_INFO = "info@mentou.ca";
export const EMAIL_CONTACT = "contact@mentou.ca";

/** Heures d'ouverture du centre (format 24 h). */
export const OPENING_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "21:00" },
  { days: ["Saturday", "Sunday"], opens: "08:00", closes: "18:00" },
] as const;

/**
 * Note et chiffres de la fiche Google Business.
 * À remplir uniquement avec les vrais chiffres de la fiche : tant qu'une valeur est null,
 * elle n'est pas affichée sur le site.
 */
export const GOOGLE_PROFILE: {
  rating: number | null;
  reviewCount: number | null;
  studentsCount: number | null;
  url: string | null;
} = {
  // Note vérifiée sur la fiche « Groupe Mentou » (Google Maps, 20 oct. 2026).
  rating: 5,
  reviewCount: null,
  studentsCount: null,
  url: "https://www.google.com/maps/search/?api=1&query=Groupe+Mentou+1765+Boulevard+Taschereau+Longueuil",
};
