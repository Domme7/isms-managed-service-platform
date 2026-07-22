import { defineConfig } from 'drizzle-kit';

/**
 * drizzle-kit-Konfiguration für die Migrationserzeugung (`pnpm --filter @isms/db db:generate`).
 *
 * `generate` arbeitet rein offline (Schema-Diff gegen den letzten Snapshot in `drizzle/meta`)
 * und benötigt KEINE Datenbankverbindung — passend zum Docker-freien Bau/Test (ADR-0002).
 * Dialekt PostgreSQL; identisches Schema für PGlite (Dev/Test) und Docker-Postgres (Server).
 */
export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
});
