/**
 * @isms/db — Getestete Persistenzschicht der Twin-Kernobjekte (PostgreSQL + Drizzle).
 *
 * Schema STRIKT aus `@isms/contracts` (Dok. 07). Tenant-Isolation serverseitig über
 * tenant-scoped Repositories erzwungen (Deny by Default); Bau/Tests gegen PGlite (kein Docker),
 * Server via docker-compose (ADR-0002).
 */

export * as schema from './schema';
export {
  objects,
  relationships,
  type ObjectRow,
  type NewObjectRow,
  type RelationshipRow,
  type NewRelationshipRow,
} from './schema';
export {
  createDb,
  runMigrations,
  defaultMigrationsFolder,
  type IsmsDb,
  type DbDriver,
  type DbHandle,
  type CreateDbOptions,
} from './client';
export { objectsRepo, relationshipsRepo } from './repositories';
export {
  objectToRow,
  rowToObject,
  relationshipToRow,
  rowToRelationship,
} from './repositories/mappers';
// Hinweis: `reset()` wird bewusst NICHT aus der Paketwurzel re-exportiert (LOW-1, Reviews).
// Es ist tenant-los und destruktiv → ausschließlich test/admin-only über `./seed-loader` bzw.
// `./testkit` erreichbar, zusätzlich mit Laufzeit-Guard gegen Produktion abgesichert.
export { loadDemoSeed, type SeedLoadResult } from './seed-loader';
