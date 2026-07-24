/**
 * Globale Suche (WP-027). Prüft gegen den echten `DEMO_SEED` (deterministisch, kein Mock) die drei
 * Pflichten aus Dok. 06 „Suche, Benachrichtigungen & Wiederaufnahme":
 *  1. SNIPPET-LEAK-SCHUTZ: vertrauliche Treffer erscheinen OHNE Vorschautext (`snippet === null`).
 *  2. KEIN QUERY-LEAK: die Suche matcht nicht über die `description` – ein beschreibungs-exklusives
 *     Wort findet den vertraulichen Treffer nicht.
 *  3. SPHÄRENGRENZE (DR-0012): Kundensicht findet nur den eigenen Mandanten, Portfolio alle Kunden.
 *  Plus: kurze Query ohne Treffer, Gruppierung nach Mandant, Determinismus.
 */
import { describe, expect, it } from 'vitest';

import { DEMO_SEED, TENANT_ID } from '@isms/demo-seed';
import { getRole, type DemoRole } from '../../shell/roles';
import { sucheObjekte } from '../index';

function role(roleId: string): DemoRole {
  const found = getRole(roleId);
  if (!found) throw new Error(`Testfixture fehlt: ${roleId}`);
  return found;
}

function alleTreffer(query: string, r: DemoRole | null, tenantId: string) {
  return sucheObjekte(query, r, tenantId).gruppen.flatMap((g) => g.treffer);
}

const geheimNordwerk = DEMO_SEED.objects.find(
  (o) =>
    o.tenant_id === TENANT_ID.NORDWERK &&
    o.classification.confidentiality === 'vertraulich' &&
    Boolean(o.description),
);
const offenNordwerk = DEMO_SEED.objects.find(
  (o) =>
    o.tenant_id === TENANT_ID.NORDWERK &&
    o.classification.confidentiality === 'intern' &&
    Boolean(o.description),
);

describe('Globale Suche – Snippet-Leak-Schutz (Dok. 06)', () => {
  it('vertraulicher Treffer erscheint mit Name/Typ, aber OHNE Snippet', () => {
    expect(geheimNordwerk, 'Fixture: vertrauliches Nordwerk-Objekt mit Beschreibung').toBeDefined();
    if (!geheimNordwerk) return;
    const treffer = alleTreffer(geheimNordwerk.display_name, role('R03'), TENANT_ID.NORDWERK);
    const hit = treffer.find((t) => t.objectId === geheimNordwerk.object_id);
    expect(hit, 'vertraulicher Treffer muss gefunden werden').toBeDefined();
    expect(hit?.vertraulich).toBe(true);
    expect(hit?.snippet, 'vertraulicher Treffer darf keinen Vorschautext tragen').toBeNull();
    expect(hit?.name).toBe(geheimNordwerk.display_name);
  });

  it('nicht-vertraulicher Treffer mit Beschreibung trägt einen Vorschautext', () => {
    expect(offenNordwerk, 'Fixture: internes Nordwerk-Objekt mit Beschreibung').toBeDefined();
    if (!offenNordwerk) return;
    const treffer = alleTreffer(offenNordwerk.display_name, role('R03'), TENANT_ID.NORDWERK);
    const hit = treffer.find((t) => t.objectId === offenNordwerk.object_id);
    expect(hit?.vertraulich).toBe(false);
    expect(typeof hit?.snippet).toBe('string');
    expect((hit?.snippet ?? '').length).toBeGreaterThan(0);
  });

  it('matcht NICHT über die description (kein Query-Leak über vertrauliche Beschreibungen)', () => {
    expect(geheimNordwerk).toBeDefined();
    if (!geheimNordwerk?.description) return;
    const nameLc = geheimNordwerk.display_name.toLowerCase();
    const typLc = geheimNordwerk.object_type.toLowerCase();
    const wort = geheimNordwerk.description
      .toLowerCase()
      .split(/[^a-zäöüß0-9]+/)
      .find((w) => w.length >= 5 && !nameLc.includes(w) && !typLc.includes(w));
    expect(wort, 'kein beschreibungs-exklusives Wort gefunden').toBeDefined();
    if (!wort) return;
    const ids = alleTreffer(wort, role('R03'), TENANT_ID.NORDWERK).map((t) => t.objectId);
    expect(ids).not.toContain(geheimNordwerk.object_id);
  });
});

describe('Globale Suche – Sphärengrenze (DR-0012)', () => {
  const fremd = DEMO_SEED.objects.find((o) => o.tenant_id === TENANT_ID.ALPENCLOUD);

  it('Kundensicht findet KEIN Objekt eines fremden Mandanten', () => {
    expect(fremd, 'Fixture: AlpenCloud-Objekt').toBeDefined();
    if (!fremd) return;
    const ids = alleTreffer(fremd.display_name, role('R03'), TENANT_ID.NORDWERK).map(
      (t) => t.objectId,
    );
    expect(ids).not.toContain(fremd.object_id);
  });

  it('Portfolio-/Betreibersicht findet über Kundenmandanten hinweg', () => {
    expect(fremd).toBeDefined();
    if (!fremd) return;
    const ids = alleTreffer(fremd.display_name, role('R08'), TENANT_ID.NORDWERK).map(
      (t) => t.objectId,
    );
    expect(ids).toContain(fremd.object_id);
  });
});

describe('Globale Suche – Query-Länge, Gruppierung, Determinismus', () => {
  it('kurze oder leere Query liefert keinen Treffer (zuKurz)', () => {
    for (const q of ['', ' ', 'a']) {
      const res = sucheObjekte(q, role('R08'), TENANT_ID.NORDWERK);
      expect(res.zuKurz).toBe(true);
      expect(res.trefferGesamt).toBe(0);
      expect(res.gruppen).toHaveLength(0);
    }
  });

  it('gruppiert nach Mandant und ist deterministisch (gleiche Query → gleiches Ergebnis)', () => {
    const a = sucheObjekte('a', role('R08'), TENANT_ID.NORDWERK); // zu kurz
    expect(a.zuKurz).toBe(true);
    const q = 'Risiko';
    const r1 = sucheObjekte(q, role('R08'), TENANT_ID.NORDWERK);
    const r2 = sucheObjekte(q, role('R08'), TENANT_ID.NORDWERK);
    expect(r1).toEqual(r2);
    // Jede Gruppe trägt genau die Treffer ihres Mandanten.
    for (const g of r1.gruppen) {
      for (const t of g.treffer) expect(t.tenantId).toBe(g.tenantId);
    }
  });
});
