import { createClient, type Client } from "@libsql/client";
import path from "path";
import type { Comment } from "./useComments";
import type { Registration, RegistrationStatus } from "./registration";

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: "default-1",
    name: "Marie L.",
    message:
      "En quelques mois, mon fils a complètement changé. Il ose s'exprimer, il s'intéresse à de nouvelles choses, il a trouvé sa place.",
    rating: 5,
    approved: true,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: "default-2",
    name: "Karim D.",
    message:
      "L'approche est rigoureuse mais profondément humaine. Mes deux ados y vont avec plaisir et reviennent grandis chaque semaine.",
    rating: 5,
    approved: true,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: "default-3",
    name: "Sophia",
    message:
      "Avant Groupe Mentou, je n'osais pas prendre la parole en classe. Maintenant, je dirige un projet étudiant. Les exercices de sketch m'ont vraiment débloqué.",
    rating: 4,
    approved: true,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
];

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

  const { rows } = await _client.execute("SELECT COUNT(*) as n FROM comments");
  if ((rows[0].n as number) === 0) {
    for (const c of DEFAULT_COMMENTS) {
      await _client.execute({
        sql: "INSERT INTO comments (id, name, message, rating, approved, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        args: [c.id, c.name, c.message, c.rating, c.approved ? 1 : 0, c.createdAt],
      });
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
    availability: (row.availability as string) ?? "",
    expectations: (row.expectations as string) ?? "",
    suggestions: (row.suggestions as string) ?? "",
    status: row.status as RegistrationStatus,
    stripeSessionId: (row.stripe_session_id as string) ?? null,
    stripeSubscriptionId: (row.stripe_subscription_id as string) ?? null,
    createdAt: row.created_at as string,
  };
}
