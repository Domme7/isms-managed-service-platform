/**
 * DB-Provider-Factory (ADR-0002).
 *
 * Wählt per Env `DB_DRIVER` zwischen:
 *   - `pglite` (Default): eingebettetes PostgreSQL (WASM), in-memory, kein Docker →
 *     deterministisch für Dev/Test.
 *   - `pg`: echter PostgreSQL-Server via `DATABASE_URL` (Docker/Server).
 *
 * Beide Treiber liefern dasselbe Drizzle-Schema/dieselben Queries (Server-Fidelity).
 * Treiber-spezifische Module (`pg`, node-postgres-Migrator) werden per dynamischem Import
 * nur im pg-Pfad geladen, damit PGlite-Tests keine Server-Treiber anfassen.
 */

import { resolve } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePglite, type PgliteDatabase } from 'drizzle-orm/pglite';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export type DbDriver = 'pglite' | 'pg';

/** Gemeinsamer DB-Typ; beide Treiber teilen die Drizzle-Query-API über `typeof schema`. */
export type IsmsDb = PgliteDatabase<typeof schema> | NodePgDatabase<typeof schema>;

export interface DbHandle {
  readonly db: IsmsDb;
  readonly driver: DbDriver;
  /** Schließt Verbindung/Engine (PGlite bzw. pg-Pool). */
  close(): Promise<void>;
}

export interface CreateDbOptions {
  /** Überschreibt `process.env.DB_DRIVER`. */
  driver?: DbDriver;
  /** pg: Verbindungs-URL; Default `process.env.DATABASE_URL`. */
  connectionString?: string;
  /**
   * PGlite: Datenverzeichnis. Default (undefined) = in-memory (`memory://`) → ideal für
   * deterministische Tests. Ein Pfad macht die Instanz persistent.
   */
  pgliteDataDir?: string;
}

function resolveDriver(opts?: CreateDbOptions): DbDriver {
  const raw = opts?.driver ?? (process.env.DB_DRIVER as DbDriver | undefined) ?? 'pglite';
  if (raw !== 'pglite' && raw !== 'pg') {
    throw new Error(`Unbekannter DB_DRIVER "${raw}"; erlaubt: "pglite" | "pg".`);
  }
  return raw;
}

/**
 * Erzeugt ein `DbHandle`. Für Tests ohne Argumente aufrufen → PGlite in-memory.
 * Migrationen anschließend mit `runMigrations(handle)` anwenden.
 */
export async function createDb(opts?: CreateDbOptions): Promise<DbHandle> {
  const driver = resolveDriver(opts);

  if (driver === 'pglite') {
    const client = new PGlite(opts?.pgliteDataDir);
    const db = drizzlePglite(client, { schema });
    return {
      db,
      driver,
      close: () => client.close(),
    };
  }

  // pg-Pfad: Server-Treiber nur hier laden.
  const connectionString = opts?.connectionString ?? process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DB_DRIVER=pg erfordert DATABASE_URL (bzw. options.connectionString).');
  }
  const { Pool } = await import('pg');
  const { drizzle: drizzlePg } = await import('drizzle-orm/node-postgres');
  const pool = new Pool({ connectionString });
  const db = drizzlePg(pool, { schema });
  return {
    db,
    driver,
    close: () => pool.end(),
  };
}

/** Default-Migrationsordner (`packages/db/drizzle`), relativ zu diesem Modul (src bzw. dist). */
export function defaultMigrationsFolder(): string {
  return resolve(__dirname, '..', 'drizzle');
}

/**
 * Wendet die generierten Drizzle-Migrationen an — treiberkorrekt.
 * Für PGlite genutzt (`drizzle-orm/pglite/migrator`), identisch auf Docker-Postgres
 * (`drizzle-orm/node-postgres/migrator`).
 */
export async function runMigrations(
  handle: DbHandle,
  migrationsFolder: string = defaultMigrationsFolder(),
): Promise<void> {
  if (handle.driver === 'pglite') {
    const { migrate } = await import('drizzle-orm/pglite/migrator');
    await migrate(handle.db as PgliteDatabase<typeof schema>, { migrationsFolder });
    return;
  }
  const { migrate } = await import('drizzle-orm/node-postgres/migrator');
  await migrate(handle.db as NodePgDatabase<typeof schema>, { migrationsFolder });
}
