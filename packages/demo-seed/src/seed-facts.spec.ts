/**
 * Beweis-Tests der kanonischen Seed-Fakten (WP-018 Wächter 3c).
 *
 * Bindet DREI Dinge aneinander, damit Seed-Zahlen zitierfähig sind statt abgeschrieben
 * (Briefing §7 Lektion 6):
 *  1. `computeSeedFacts()` (die Faktenquelle von `scripts/seed_facts.py`) stimmt mit dem
 *     tatsächlichen `DEMO_SEED` überein. Ehrlich benannt: die Nachzählung von totals/by_tenant
 *     hier rechnet mit demselben Algorithmus (Länge bzw. tenant_id-Filterung) und ist darum
 *     KEIN unabhängiger Beweis. Die Unabhängigkeit des Abgleichs liefern die
 *     Partitionsinvariante (Schichtsummen = Gesamt, keine leere Schicht) und Punkt 2.
 *  2. Sie stimmt mit `seed-manifest.json` überein (Muster der bestehenden
 *     Manifest-Konsistenztests in `seed.spec.ts`) – das Manifest ist die vom Algorithmus
 *     unabhängige, committete Vergleichsgröße.
 *  3. `scripts/seed_facts.py` nutzt nachweislich GENAU diese Faktenquelle über die gebauten
 *     Exporte – und liest das Manifest NICHT (sonst wäre der Abgleich zirkulär).
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { DEMO_SEED } from './seed';
import { computeSeedFacts } from './seed-facts';

const facts = computeSeedFacts();

describe('Seed-Fakten – Übereinstimmung mit DEMO_SEED (nachgezählt; Unabhängigkeit siehe Header)', () => {
  it('Gesamtzahlen und Version entsprechen exakt dem Seed', () => {
    expect(facts.seed_version).toBe(DEMO_SEED.version);
    expect(facts.totals.objects).toBe(DEMO_SEED.objects.length);
    expect(facts.totals.relationships).toBe(DEMO_SEED.relationships.length);
  });

  it('die Zahlen je Mandant sind exakt die Filterung des Seeds (alle Mandanten, auch leere)', () => {
    const erwartet = Object.fromEntries(
      DEMO_SEED.tenants.map((t) => [
        t.tenant_id,
        {
          objects: DEMO_SEED.objects.filter((o) => o.tenant_id === t.tenant_id).length,
          relationships: DEMO_SEED.relationships.filter((r) => r.tenant_id === t.tenant_id).length,
        },
      ]),
    );
    expect(facts.by_tenant).toEqual(erwartet);
    // Vollständigkeit: kein Mandant fehlt, keiner ist erfunden.
    expect(Object.keys(facts.by_tenant).sort()).toEqual(
      DEMO_SEED.tenants.map((t) => t.tenant_id).sort(),
    );
  });

  it('die Schichten partitionieren den Seed exakt (Summe je Schicht = Gesamt)', () => {
    const summe = (feld: 'objects' | 'relationships') =>
      Object.values(facts.by_layer).reduce((acc, zeile) => acc + zeile[feld], 0);
    expect(summe('objects')).toBe(DEMO_SEED.objects.length);
    expect(summe('relationships')).toBe(DEMO_SEED.relationships.length);
    // Und jede Schicht trägt echten Bestand (eine leere Schicht wäre ein Definitionsfehler).
    for (const [schicht, zeile] of Object.entries(facts.by_layer)) {
      expect(zeile.objects, schicht).toBeGreaterThan(0);
      expect(zeile.relationships, schicht).toBeGreaterThan(0);
    }
  });
});

describe('Seed-Fakten – Übereinstimmung mit seed-manifest.json', () => {
  // Pfad robust aus dem Testdatei-Verzeichnis (src/ -> Paketwurzel), unabhängig vom cwd.
  const manifestPath = resolve(__dirname, '..', 'seed-manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as {
    seed_version: string;
    counts: {
      objects: number;
      relationships: number;
      objects_by_tenant: Record<string, number>;
      relationships_by_tenant: Record<string, number>;
      layers: Record<string, { objects: number; relationships: number }>;
    };
  };

  it('Gesamtzahlen und Version stimmen mit dem Manifest überein', () => {
    expect(facts.seed_version).toBe(manifest.seed_version);
    expect(facts.totals.objects).toBe(manifest.counts.objects);
    expect(facts.totals.relationships).toBe(manifest.counts.relationships);
  });

  it('die Zahlen je Mandant stimmen mit dem Manifest überein', () => {
    const objectsByTenant = Object.fromEntries(
      Object.entries(facts.by_tenant).map(([id, zeile]) => [id, zeile.objects]),
    );
    const relationshipsByTenant = Object.fromEntries(
      Object.entries(facts.by_tenant).map(([id, zeile]) => [id, zeile.relationships]),
    );
    expect(objectsByTenant).toEqual(manifest.counts.objects_by_tenant);
    expect(relationshipsByTenant).toEqual(manifest.counts.relationships_by_tenant);
  });

  it('die Zahlen je Schicht stimmen schlüsselgenau mit den Manifest-`layers` überein', () => {
    expect(facts.by_layer).toEqual(manifest.counts.layers);
  });
});

describe('Seed-Fakten – Bindung an die Skriptquelle scripts/seed_facts.py', () => {
  const skriptPath = resolve(__dirname, '..', '..', '..', 'scripts', 'seed_facts.py');
  const skript = readFileSync(skriptPath, 'utf-8');

  it('das Skript ruft computeSeedFacts über die gebauten demo-seed-Exporte auf', () => {
    expect(skript).toContain('computeSeedFacts');
    expect(skript).toContain("'demo-seed'");
    expect(skript).toContain("'dist'");
    // Klare Meldung statt Traceback, wenn der Build fehlt (Acceptance des Work Package).
    expect(skript).toContain('pnpm --filter @isms/demo-seed build');
  });

  it('das Skript liest das Manifest NICHT (kein zirkulärer Abgleich)', () => {
    // Erlaubt ist die ERWÄHNUNG im Docstring (sie erklärt genau diese Regel); verboten ist
    // jeder Dateizugriff auf das Manifest. Geprüft wird deshalb der Dateiname als Pfad-/
    // Open-Argument – er darf außerhalb der Kommentar-/Docstring-Erklärung nicht vorkommen.
    const codeOhneDocstring = skript.replace(/"""[\s\S]*?"""/g, '');
    expect(codeOhneDocstring).not.toContain('seed-manifest');
  });

  it('das Skript kodiert keine Seed-Zahlen hart (Zahlen werden gezählt, nicht behauptet)', () => {
    const codeOhneDocstring = skript.replace(/"""[\s\S]*?"""/g, '');
    // Kein numerisches Literal des aktuellen Bestands (z. B. 43/62/34/51) im Code – die
    // einzige legitime Zahlenquelle ist die JSON-Ausgabe von computeSeedFacts().
    const zahlen = [
      facts.totals.objects,
      facts.totals.relationships,
      ...Object.values(facts.by_tenant).flatMap((z) => [z.objects, z.relationships]),
      ...Object.values(facts.by_layer).flatMap((z) => [z.objects, z.relationships]),
    ].filter((n) => n > 0);
    for (const zahl of new Set(zahlen)) {
      // Wortgrenzen inkl. Bindestrich, damit z. B. „utf-8" nicht als Seed-Zahl 8 zählt.
      expect(
        new RegExp(`(?<![\\w.-])${zahl}(?![\\w.-])`).test(codeOhneDocstring),
        `Seed-Zahl ${zahl} ist im Skript hartkodiert`,
      ).toBe(false);
    }
  });
});
