import { sql } from 'drizzle-orm';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { objects, relationships } from './schema';
import { freshMemoryDb } from './testkit';
import type { DbHandle } from './client';

/**
 * Test 1 (WP-007): Migration wendet gegen eine frische PGlite-Instanz an; die kanonischen
 * Tabellen existieren und sind abfragbar — ohne Docker.
 */
describe('Migration – PGlite (kein Docker)', () => {
  let handle: DbHandle;

  beforeEach(async () => {
    handle = await freshMemoryDb();
  });

  afterEach(async () => {
    await handle.close();
  });

  it('legt die Tabelle "objects" leer und abfragbar an', async () => {
    const rows = await handle.db.select().from(objects);
    expect(rows).toEqual([]);
  });

  it('legt die Tabelle "relationships" leer und abfragbar an', async () => {
    const rows = await handle.db.select().from(relationships);
    expect(rows).toEqual([]);
  });

  it('erstellt die tenant-führenden Indizes', async () => {
    const res = (await handle.db.execute(
      sql`SELECT indexname FROM pg_indexes WHERE tablename IN ('objects','relationships')`,
    )) as unknown as { rows: Array<{ indexname: string }> };
    const names = res.rows.map((r) => r.indexname);
    expect(names).toContain('objects_tenant_type_idx');
    expect(names).toContain('relationships_tenant_source_idx');
    expect(names).toContain('relationships_tenant_target_idx');
  });
});
