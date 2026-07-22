/**
 * Test-Hilfen (nicht Teil des ausgelieferten Pakets — aus dem Build ausgeschlossen).
 * Erstellt eine frische, migrierte PGlite-In-Memory-DB pro Test → deterministisch, ohne Docker.
 */

import { createDb, runMigrations, type DbHandle } from './client';

/** Frische PGlite-In-Memory-DB inkl. angewandter Migrationen. Aufrufer ruft `handle.close()`. */
export async function freshMemoryDb(): Promise<DbHandle> {
  const handle = await createDb({ driver: 'pglite' });
  await runMigrations(handle);
  return handle;
}
