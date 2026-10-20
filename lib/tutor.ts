// Niveaux + matières souhaités par le parent pour l'élève.
// Partagé client + serveur — aucune dépendance serveur.

export type TutorOption = { id: string; label: string; labelEn: string };

// Niveaux scolaires proposés : secondaire 1 à 5 et cégep.
export const TUTOR_LEVELS: TutorOption[] = [
  { id: "sec1", label: "Secondaire 1", labelEn: "Secondary 1" },
  { id: "sec2", label: "Secondaire 2", labelEn: "Secondary 2" },
  { id: "sec3", label: "Secondaire 3", labelEn: "Secondary 3" },
  { id: "sec4", label: "Secondaire 4", labelEn: "Secondary 4" },
  { id: "sec5", label: "Secondaire 5", labelEn: "Secondary 5" },
  { id: "cegep", label: "Cégep", labelEn: "CEGEP" },
];

// Matières du secondaire (1 à 5).
export const SECONDARY_SUBJECTS: TutorOption[] = [
  { id: "math-reg", label: "Mathématiques (régulier)", labelEn: "Math (regular)" },
  { id: "math-enr", label: "Mathématiques (enrichi)", labelEn: "Math (enriched)" },
  { id: "sci-reg", label: "Sciences (régulier)", labelEn: "Science (regular)" },
  { id: "sci-enr", label: "Sciences (enrichi)", labelEn: "Science (enriched)" },
  { id: "phys-sec", label: "Physique", labelEn: "Physics" },
  { id: "prog-sec", label: "Programmation", labelEn: "Programming" },
  { id: "fr-sec", label: "Français", labelEn: "French" },
  { id: "exam-reg", label: "Examens du ministère, sec. 4 et 5 (régulier)", labelEn: "Ministry exams, Sec. 4 and 5 (regular)" },
  { id: "exam-enr", label: "Examens du ministère, sec. 4 et 5 (enrichi)", labelEn: "Ministry exams, Sec. 4 and 5 (enriched)" },
];

// Cours du cégep.
export const CEGEP_SUBJECTS: TutorOption[] = [
  { id: "calc-diff", label: "Calcul différentiel", labelEn: "Differential calculus" },
  { id: "calc-int", label: "Calcul intégral", labelEn: "Integral calculus" },
  { id: "alg-lin", label: "Algèbre linéaire", labelEn: "Linear algebra" },
  { id: "proba", label: "Probabilités et statistiques", labelEn: "Probability and statistics" },
  { id: "meca", label: "Mécanique", labelEn: "Mechanics" },
  { id: "elec", label: "Électricité et magnétisme", labelEn: "Electricity and magnetism" },
  { id: "ondes", label: "Ondes et physique moderne", labelEn: "Waves and modern physics" },
  { id: "chim-gen", label: "Chimie générale", labelEn: "General chemistry" },
  { id: "chim-sol", label: "Chimie des solutions", labelEn: "Solution chemistry" },
  { id: "bio-cell", label: "Biologie cellulaire", labelEn: "Cell biology" },
  { id: "prog-sci", label: "Programmation en sciences", labelEn: "Programming in science" },
  { id: "fr101", label: "Français 101", labelEn: "French 101" },
  { id: "fr102", label: "Français 102", labelEn: "French 102" },
  { id: "fr103", label: "Français 103", labelEn: "French 103" },
  { id: "euf", label: "Préparation à l'EUF", labelEn: "Uniform French exam (EUF) prep" },
];

export const TUTOR_SUBJECTS: TutorOption[] = [...SECONDARY_SUBJECTS, ...CEGEP_SUBJECTS];

// Anciennes valeurs, gardées pour afficher les inscriptions existantes.
const LEGACY_LEVELS: TutorOption[] = [{ id: "primaire", label: "Primaire", labelEn: "Elementary" }];
const LEGACY_SUBJECTS: TutorOption[] = [
  { id: "st4", label: "Science ST/STE secondaire 4", labelEn: "" },
  { id: "sn4", label: "Math SN secondaire 4", labelEn: "" },
  { id: "cst4", label: "Math CST secondaire 4", labelEn: "" },
  { id: "sn5", label: "Math SN secondaire 5", labelEn: "" },
  { id: "cst5", label: "Math CST secondaire 5", labelEn: "" },
  { id: "phys5", label: "Physique secondaire 5", labelEn: "" },
  { id: "chim5", label: "Chimie secondaire 5", labelEn: "" },
  { id: "fr", label: "Français (secondaire)", labelEn: "" },
  { id: "sci", label: "Science (secondaire)", labelEn: "" },
  { id: "hist", label: "Histoire (secondaire)", labelEn: "" },
  { id: "ang", label: "Anglais (secondaire)", labelEn: "" },
];

const LEVEL_MAP = new Map([...TUTOR_LEVELS, ...LEGACY_LEVELS].map((o) => [o.id, o.label]));
const SUBJECT_MAP = new Map([...TUTOR_SUBJECTS, ...LEGACY_SUBJECTS].map((o) => [o.id, o.label]));

export const levelLabel = (id: string): string => LEVEL_MAP.get(id) ?? id ?? "";
export const subjectLabels = (ids: string[]): string[] =>
  ids.map((id) => SUBJECT_MAP.get(id) ?? id);

/** Matières proposées selon le niveau choisi (aucun niveau : toutes). */
export function subjectsForLevel(level: string): TutorOption[] {
  if (level === "cegep") return CEGEP_SUBJECTS;
  if (level.startsWith("sec")) return SECONDARY_SUBJECTS;
  return TUTOR_SUBJECTS;
}

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
