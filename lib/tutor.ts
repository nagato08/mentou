// Type partagé (client + serveur) pour les candidatures tuteurs — aucune dépendance serveur.

export type TutorOption = { id: string; label: string };

// Plages horaires (18). Regroupées par jour pour l'affichage.
export const TUTOR_SLOTS: TutorOption[] = [
  { id: "lun-15", label: "Lundi 15h-18h" },
  { id: "lun-18", label: "Lundi 18h-21h" },
  { id: "mar-15", label: "Mardi 15h-18h" },
  { id: "mar-18", label: "Mardi 18h-21h" },
  { id: "mer-15", label: "Mercredi 15h-18h" },
  { id: "mer-18", label: "Mercredi 18h-21h" },
  { id: "jeu-15", label: "Jeudi 15h-18h" },
  { id: "jeu-18", label: "Jeudi 18h-21h" },
  { id: "ven-15", label: "Vendredi 15h-18h" },
  { id: "ven-18", label: "Vendredi 18h-21h" },
  { id: "sam-9", label: "Samedi 9h-12h" },
  { id: "sam-12", label: "Samedi 12h-15h" },
  { id: "sam-15", label: "Samedi 15h-18h" },
  { id: "sam-18", label: "Samedi 18h-21h" },
  { id: "dim-9", label: "Dimanche 9h-12h" },
  { id: "dim-12", label: "Dimanche 12h-15h" },
  { id: "dim-15", label: "Dimanche 15h-18h" },
  { id: "dim-18", label: "Dimanche 18h-21h" },
];

// Regroupement par jour (pour l'UI).
export const TUTOR_SLOT_GROUPS: { day: string; slots: TutorOption[] }[] = [
  { day: "Lundi", slots: TUTOR_SLOTS.filter((s) => s.id.startsWith("lun")) },
  { day: "Mardi", slots: TUTOR_SLOTS.filter((s) => s.id.startsWith("mar")) },
  { day: "Mercredi", slots: TUTOR_SLOTS.filter((s) => s.id.startsWith("mer")) },
  { day: "Jeudi", slots: TUTOR_SLOTS.filter((s) => s.id.startsWith("jeu")) },
  { day: "Vendredi", slots: TUTOR_SLOTS.filter((s) => s.id.startsWith("ven")) },
  { day: "Samedi", slots: TUTOR_SLOTS.filter((s) => s.id.startsWith("sam")) },
  { day: "Dimanche", slots: TUTOR_SLOTS.filter((s) => s.id.startsWith("dim")) },
];

// Niveaux scolaires (7).
export const TUTOR_LEVELS: TutorOption[] = [
  { id: "primaire", label: "Primaire" },
  { id: "sec1", label: "Secondaire 1" },
  { id: "sec2", label: "Secondaire 2" },
  { id: "sec3", label: "Secondaire 3" },
  { id: "sec4", label: "Secondaire 4" },
  { id: "sec5", label: "Secondaire 5" },
  { id: "cegep", label: "Cégep" },
];

// Matières (11). « Autre » est géré par le champ texte otherSubjects.
export const TUTOR_SUBJECTS: TutorOption[] = [
  { id: "st4", label: "Science ST/STE secondaire 4" },
  { id: "sn4", label: "Math SN secondaire 4" },
  { id: "cst4", label: "Math CST secondaire 4" },
  { id: "sn5", label: "Math SN secondaire 5" },
  { id: "cst5", label: "Math CST secondaire 5" },
  { id: "phys5", label: "Physique secondaire 5" },
  { id: "chim5", label: "Chimie secondaire 5" },
  { id: "fr", label: "Français (secondaire)" },
  { id: "hist", label: "Histoire (secondaire)" },
  { id: "ang", label: "Anglais (secondaire)" },
  { id: "sci", label: "Science (secondaire)" },
];

export type TutorApplicationInput = {
  name: string;
  email: string;
  phone: string;
  slots: string[]; // ids
  levels: string[]; // ids
  subjects: string[]; // ids
  otherSubjects: string;
  message: string;
};

export type TutorApplication = TutorApplicationInput & {
  id: string;
  createdAt: string;
};

const SLOT_MAP = new Map(TUTOR_SLOTS.map((o) => [o.id, o.label]));
const LEVEL_MAP = new Map(TUTOR_LEVELS.map((o) => [o.id, o.label]));
const SUBJECT_MAP = new Map(TUTOR_SUBJECTS.map((o) => [o.id, o.label]));

export const slotLabels = (ids: string[]): string[] =>
  ids.map((id) => SLOT_MAP.get(id) ?? id);
export const levelLabels = (ids: string[]): string[] =>
  ids.map((id) => LEVEL_MAP.get(id) ?? id);
export const subjectLabels = (ids: string[]): string[] =>
  ids.map((id) => SUBJECT_MAP.get(id) ?? id);

const SLOT_IDS = new Set(TUTOR_SLOTS.map((o) => o.id));
const LEVEL_IDS = new Set(TUTOR_LEVELS.map((o) => o.id));
const SUBJECT_IDS = new Set(TUTOR_SUBJECTS.map((o) => o.id));

// Ne garde que les ids valides (anti-injection).
export function sanitizeIds(
  values: unknown,
  kind: "slots" | "levels" | "subjects"
): string[] {
  const set =
    kind === "slots" ? SLOT_IDS : kind === "levels" ? LEVEL_IDS : SUBJECT_IDS;
  if (!Array.isArray(values)) return [];
  return values.filter((v): v is string => typeof v === "string" && set.has(v));
}
