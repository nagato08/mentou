import { createClient, type Client } from "@libsql/client";
import path from "path";
import type { Comment } from "./useComments";
import type { Registration, RegistrationStatus } from "./registration";

let _client: Client | null = null;
let _initialized = false;

export async function getDb(): Promise<Client> {
  if (_client && _initialized) return _client;

  const dbPath =
    process.env.DB_PATH ?? path.join(process.cwd(), "data", "comments.db");

  const { mkdirSync } = await import("fs");
  mkdirSync(path.dirname(dbPath), { recursive: true });

  _client = createClient({ url: `file:${dbPath}` });

  await _client.execute(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      approved INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `);

  await _client.execute(`
    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      parent_name TEXT NOT NULL,
      parent_email TEXT NOT NULL,
      parent_phone TEXT NOT NULL,
      child_name TEXT NOT NULL,
      child_age TEXT NOT NULL,
      child_school TEXT,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      province TEXT NOT NULL,
      offer TEXT NOT NULL,
      availability TEXT,
      expectations TEXT,
      suggestions TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      stripe_session_id TEXT,
      stripe_subscription_id TEXT,
      created_at TEXT NOT NULL
    )
  `);

  // Migrations additives (colonnes ajoutées après coup) — erreur ignorée si déjà présentes.
  for (const col of [
    "student_level TEXT",
    "subjects TEXT",
    "other_subject TEXT",
    "hours INTEGER",
  ]) {
    try {
      await _client.execute(`ALTER TABLE registrations ADD COLUMN ${col}`);
    } catch {
      /* colonne déjà existante */
    }
  }

  _initialized = true;
  return _client;
}

export function rowToComment(row: Record<string, unknown>): Comment {
  return {
    id: row.id as string,
    name: row.name as string,
    message: row.message as string,
    rating: Number(row.rating),
    approved: Boolean(row.approved),
    createdAt: row.created_at as string,
  };
}

export function rowToRegistration(row: Record<string, unknown>): Registration {
  return {
    id: row.id as string,
    parentName: row.parent_name as string,
    parentEmail: row.parent_email as string,
    parentPhone: row.parent_phone as string,
    childName: row.child_name as string,
    childAge: row.child_age as string,
    childSchool: (row.child_school as string) ?? "",
    address: row.address as string,
    city: row.city as string,
    postalCode: row.postal_code as string,
    province: row.province as string,
    offer: row.offer as Registration["offer"],
    hours: row.hours == null ? null : Number(row.hours),
    availability: (row.availability as string) ?? "",
    expectations: (row.expectations as string) ?? "",
    suggestions: (row.suggestions as string) ?? "",
    studentLevel: (row.student_level as string) ?? "",
    subjects: parseIds(row.subjects),
    otherSubject: (row.other_subject as string) ?? "",
    status: row.status as RegistrationStatus,
    stripeSessionId: (row.stripe_session_id as string) ?? null,
    stripeSubscriptionId: (row.stripe_subscription_id as string) ?? null,
    createdAt: row.created_at as string,
  };
}

function parseIds(value: unknown): string[] {
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
