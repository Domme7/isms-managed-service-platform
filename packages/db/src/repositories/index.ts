/**
 * Tenant-scoped Repository-Layer. Namespaces `objectsRepo`/`relationshipsRepo`, damit die
 * gleichnamigen Funktionen (`listByTenant`, `getById`, `upsert`) klar zugeordnet bleiben.
 */

import * as objectsRepo from './objects';
import * as relationshipsRepo from './relationships';

export { objectsRepo, relationshipsRepo };
export * from './mappers';
