import Database from "better-sqlite3";
import path from "path";
import type { Comment } from "./useComments";

const DB_PATH =
  process.env.DB_PATH ?? path.join(process.cwd(), "data", "comments.db");

let _db: Database.Database | null = null;

const DEFAULT_COMMENTS: Omit<Comment, never>[] = [
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

export function getDb(): Database.Database {
  if (_db) return _db;

  const { mkdirSync } = require("fs");
  mkdirSync(path.dirname(DB_PATH), { recursive: true });

  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      approved INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `);

  const { n } = _db
    .prepare("SELECT COUNT(*) as n FROM comments")
    .get() as { n: number };

  if (n === 0) {
    const insert = _db.prepare(
      "INSERT INTO comments (id, name, message, rating, approved, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    );
    for (const c of DEFAULT_COMMENTS) {
      insert.run(c.id, c.name, c.message, c.rating, c.approved ? 1 : 0, c.createdAt);
    }
  }

  return _db;
}

export function dbRowToComment(row: Record<string, unknown>): Comment {
  return {
    id: row.id as string,
    name: row.name as string,
    message: row.message as string,
    rating: row.rating as number,
    approved: Boolean(row.approved),
    createdAt: row.created_at as string,
  };
}
