// Niveaux + matières souhaités par le parent pour l'élève.
// Partagé client + serveur — aucune dépendance serveur.

export type TutorOption = { id: string; label: string };

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

// Matières (11). « Autre » est géré par un champ texte.
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

const LEVEL_MAP = new Map(TUTOR_LEVELS.map((o) => [o.id, o.label]));
const SUBJECT_MAP = new Map(TUTOR_SUBJECTS.map((o) => [o.id, o.label]));

export const levelLabel = (id: string): string => LEVEL_MAP.get(id) ?? id ?? "";
export const subjectLabels = (ids: string[]): string[] =>
  ids.map((id) => SUBJECT_MAP.get(id) ?? id);

const LEVEL_IDS = new Set(TUTOR_LEVELS.map((o) => o.id));
const SUBJECT_IDS = new Set(TUTOR_SUBJECTS.map((o) => o.id));

export const isLevel = (v: unknown): v is string =>
  typeof v === "string" && LEVEL_IDS.has(v);

// Ne garde que les ids de matières valides (anti-injection).
export function sanitizeSubjects(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return values.filter(
    (v): v is string => typeof v === "string" && SUBJECT_IDS.has(v)
  );
}
