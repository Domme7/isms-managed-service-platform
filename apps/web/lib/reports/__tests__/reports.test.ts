/**
 * Tests der react-freien Reports-Grundlagen (WP-032 Slice 2).
 *
 * 1. `katalog.ts`: die Kardinalitäten der Konzeptlisten – AM PDF GEZÄHLT, nicht abgeschrieben
 *    (Dok. 12, Abschnitte „Report- und Artefakttypen", „Kanonischer Case-Katalog",
 *    „Content-Block-Architektur", „Kanonisches Report Package", „Claims, Quellen und
 *    Nachvollziehbarkeit", „Daten-Snapshots und Reproduzierbarkeit", „Geschützte manuelle
 *    Inhalte", „Reporting-Verfassung"). Der Test nagelt Anzahl UND Reihenfolge fest, damit eine
 *    stille Kürzung auffällt.
 * 2. `data.ts`: die gezählte Grundlage entsteht ausschließlich aus den bestehenden,
 *    mandantengebundenen Ableitungen – geprüft gegen genau diese Quellen, nicht gegen
 *    abgeschriebene Zahlen. Damit kann die Seite den Fachorten nie widersprechen.
 */
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { buildDecisionRegister } from '../../entscheidungen/data';
import { buildIsmsCoreView } from '../../isms/data';
import { getManagedServicesForTenant } from '../../services/data';
import { buildReportGrundlage } from '../data';
import {
  CASE_KATALOG_HINWEIS,
  CLAIM_BESTANDTEILE,
  CONTENT_BLOCK_TYPEN,
  ENGINE_VERHINDERT,
  MANUELLE_INHALTE,
  PRESENTATION_CASES,
  REPORT_FASSUNGEN,
  REPORT_GRUPPEN,
  REPORT_LEBENSZYKLUS,
  REPORT_PACKAGE_FELDER,
  REPORT_ZUSATZSTATUS,
  SNAPSHOT_BESTANDTEILE,
  reportTypenAnzahl,
} from '../katalog';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

describe('Reports-Katalog – Kardinalitäten gegen die Quelle', () => {
  it('Berichts- und Artefakttypen: fünf Gruppen mit 5 / 10 / 10 / 11 / 7 Typen (43 gesamt)', () => {
    expect(REPORT_GRUPPEN.map((g) => g.titel)).toEqual([
      'Management und Executive',
      'CISO und ISMS-Betrieb',
      'Audit und Assurance',
      'Managed Services und Beratung',
      'Operative und zielgruppenspezifische Auszüge',
    ]);
    expect(REPORT_GRUPPEN.map((g) => g.typen.length)).toEqual([5, 10, 10, 11, 7]);
    expect(reportTypenAnzahl()).toBe(43);

    // Nur die erste Gruppe führt in der Quelle eine Tabelle mit „Ziel" UND „Typische Inhalte" –
    // das wird nicht künstlich angeglichen (es würde Inhalt erfinden).
    for (const typ of REPORT_GRUPPEN[0].typen) {
      expect(typ.ziel, `${typ.name}: Ziel fehlt`).toBeTruthy();
      expect(typ.inhalte, `${typ.name}: typische Inhalte fehlen`).toBeTruthy();
    }
    for (const gruppe of REPORT_GRUPPEN.slice(1)) {
      for (const typ of gruppe.typen) {
        expect(typ.inhalte, `${typ.name}: erfundene Inhaltsspalte`).toBeUndefined();
      }
    }
    // Keine Dublette über alle Gruppen hinweg.
    const alle = REPORT_GRUPPEN.flatMap((g) => g.typen.map((t) => t.name));
    expect(new Set(alle).size).toBe(alle.length);
  });

  it('Case-Katalog: zwölf Presentation Cases, ausdrücklich nicht abschließend', () => {
    expect(PRESENTATION_CASES).toHaveLength(12);
    expect(PRESENTATION_CASES[0].name).toBe('Executive Board Update');
    expect(PRESENTATION_CASES[11].name).toBe('Handover & Transition Pack');
    for (const fall of PRESENTATION_CASES) {
      expect(fall.inhalt.length, `${fall.name}: Beschreibung fehlt`).toBeGreaterThan(10);
    }
    // Die Quelle sagt „enthält mindestens folgende" – die Zahl ist kein Deckel, das steht sichtbar.
    expect(CASE_KATALOG_HINWEIS).toContain('nicht abschließend');
  });

  it('Report Package: fünfzehn Pflichtfelder, elf Lebenszyklus-Stationen, vier Zusatzstände', () => {
    expect(REPORT_PACKAGE_FELDER).toHaveLength(15);
    expect(REPORT_PACKAGE_FELDER[0].feld).toBe('Identität');
    expect(REPORT_PACKAGE_FELDER[14].feld).toBe('Outcome');
    expect(REPORT_LEBENSZYKLUS).toHaveLength(11);
    expect(REPORT_LEBENSZYKLUS[0]).toBe('geplant');
    expect(REPORT_LEBENSZYKLUS[10]).toBe('archiviert');
    expect(REPORT_ZUSATZSTATUS).toHaveLength(4);
  });

  it('Content-Block-Architektur: fünfzehn Blocktypen, jeder mit Mindestanforderung', () => {
    expect(CONTENT_BLOCK_TYPEN).toHaveLength(15);
    expect(CONTENT_BLOCK_TYPEN[0].name).toBe('Key Message');
    expect(CONTENT_BLOCK_TYPEN[14].name).toBe('Evidence Appendix');
    for (const block of CONTENT_BLOCK_TYPEN) {
      expect(block.funktion.length, `${block.name}: Funktion fehlt`).toBeGreaterThan(5);
      expect(
        block.mindestanforderung.length,
        `${block.name}: Mindestanforderung fehlt`,
      ).toBeGreaterThan(5);
    }
  });

  it('Nachvollziehbarkeit: neun Claim-Bestandteile, acht Snapshot-Bestandteile, vier Fassungen, drei Schutzklassen', () => {
    expect(CLAIM_BESTANDTEILE).toHaveLength(9);
    expect(SNAPSHOT_BESTANDTEILE).toHaveLength(8);
    expect(REPORT_FASSUNGEN).toHaveLength(4);
    expect(MANUELLE_INHALTE.map((m) => m.feld)).toEqual([
      'locked',
      'review-on-change',
      'replaceable',
    ]);
  });

  it('Reporting-Verfassung: zehn ausgeschlossene Muster, inklusive der Ehrlichkeitsgrenze', () => {
    expect(ENGINE_VERHINDERT).toHaveLength(10);
    // Der Punkt, an dem die Ehrlichkeitsgrenze dieser Anwendung im Konzept verankert ist.
    expect(ENGINE_VERHINDERT.some((p) => p.includes('trotz fehlender Evidence'))).toBe(true);
  });

  it('preisfrei: kein Betrag, kein Währungszeichen, kein Prozent im gesamten Katalog', () => {
    const katalogText = [
      ...REPORT_GRUPPEN.flatMap((g) => [
        g.titel,
        ...g.typen.flatMap((t) => [t.name, t.ziel ?? '', t.inhalte ?? '']),
      ]),
      ...PRESENTATION_CASES.flatMap((c) => [c.name, c.inhalt]),
      CASE_KATALOG_HINWEIS,
      ...REPORT_PACKAGE_FELDER.flatMap((f) => [f.feld, f.bedeutung]),
      ...REPORT_LEBENSZYKLUS,
      ...REPORT_ZUSATZSTATUS.flatMap((s) => [s.feld, s.bedeutung]),
      ...CONTENT_BLOCK_TYPEN.flatMap((b) => [b.name, b.funktion, b.mindestanforderung]),
      ...CLAIM_BESTANDTEILE,
      ...SNAPSHOT_BESTANDTEILE,
      ...REPORT_FASSUNGEN.flatMap((f) => [f.feld, f.bedeutung]),
      ...MANUELLE_INHALTE.flatMap((m) => [m.feld, m.bedeutung]),
      ...ENGINE_VERHINDERT,
    ].join(' | ');

    for (const verboten of [/€/, /\bEUR\b/, /\bUSD\b/, /\$/, /\d+\s?%/, /\d[\d.,]*\s?(Euro|Mio)/]) {
      expect(katalogText, `Preisangabe „${verboten}"`).not.toMatch(verboten);
    }

    // Die STRUKTURWÖRTER der Quelle bleiben dagegen erhalten – sie zu streichen wäre eine
    // stille Konzeptänderung (Regel Null). Nur Beträge sind verboten, nicht die Begriffe.
    expect(katalogText).toContain('Kostenband');
    expect(katalogText).toContain('Preisannahmen');
  });

  it('kein internes Vokabular im Katalog (DR-0013 Nr. 2)', () => {
    const katalogText = [
      ...REPORT_GRUPPEN.flatMap((g) => g.typen.map((t) => `${t.name} ${t.ziel ?? ''}`)),
      ...PRESENTATION_CASES.map((c) => `${c.name} ${c.inhalt}`),
      ...REPORT_PACKAGE_FELDER.map((f) => `${f.feld} ${f.bedeutung}`),
      ...CONTENT_BLOCK_TYPEN.map((b) => `${b.name} ${b.funktion} ${b.mindestanforderung}`),
      ...ENGINE_VERHINDERT,
    ].join(' | ');

    for (const verboten of [/Dok\.\s?\d/, /§/, /\d{2}-D\d{2}/, /\bF0[1-9]\b/, /Screen S\d/]) {
      expect(katalogText, `verbotenes Muster „${verboten}"`).not.toMatch(verboten);
    }
  });
});

describe('buildReportGrundlage – zählt nur, was die Fachorte ohnehin zeigen', () => {
  for (const demoTenant of DEMO_TENANTS) {
    it(`${demoTenant.tenant_id}: jede Zahl stimmt mit ihrer Quellableitung überein`, () => {
      const model = buildReportGrundlage(demoTenant);
      const isms = buildIsmsCoreView(demoTenant.tenant_id);
      const services = getManagedServicesForTenant(demoTenant.tenant_id);
      const register = buildDecisionRegister(demoTenant.tenant_id);

      const anzahlVon = (bezeichnung: string): number => {
        for (const gruppe of model.gruppen) {
          const treffer = gruppe.posten.find((p) => p.bezeichnung === bezeichnung);
          if (treffer) return treffer.anzahl;
        }
        throw new Error(`Posten fehlt: ${bezeichnung}`);
      };

      expect(anzahlVon('Risiken')).toBe(isms.risks.length);
      expect(anzahlVon('Controls')).toBe(isms.controls.length);
      expect(anzahlVon('Maßnahmen')).toBe(isms.measures.length);
      expect(anzahlVon('Nachweise')).toBe(isms.evidence.length);
      expect(anzahlVon('Services')).toBe(services.length);
      expect(anzahlVon('Leistungsversprechen (SLA)')).toBe(
        services.reduce((s, v) => s + v.slas.length, 0),
      );
      expect(anzahlVon('Ergebnisse (Deliverables)')).toBe(
        services.reduce((s, v) => s + v.deliverables.length, 0),
      );
      expect(anzahlVon('Serviceberichte und Reviews')).toBe(
        services.reduce((s, v) => s + v.reviews.length, 0),
      );
      expect(anzahlVon('Entscheidungen')).toBe(register?.decisions.length ?? 0);

      // `isEmpty` ist genau dann wahr, wenn kein einziger Posten belegt ist.
      const summe = model.gruppen.reduce(
        (s, g) => s + g.posten.reduce((t, p) => t + p.anzahl, 0),
        0,
      );
      expect(model.isEmpty).toBe(summe === 0);
      // Keine negative oder gebrochene Zählung.
      for (const gruppe of model.gruppen) {
        for (const posten of gruppe.posten) {
          expect(Number.isInteger(posten.anzahl)).toBe(true);
          expect(posten.anzahl).toBeGreaterThanOrEqual(0);
        }
      }
    });
  }

  it('ein Mandant ohne Bestand liefert eine leere Grundlage ohne erfundene Werte', () => {
    for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
      const model = buildReportGrundlage(tenant(tenantId));
      expect(model.isEmpty).toBe(true);
      expect(model.context.recordedOn).toBeUndefined();
      expect(model.context.scopeIds).toEqual([]);
      for (const gruppe of model.gruppen) {
        for (const posten of gruppe.posten) expect(posten.anzahl).toBe(0);
      }
    }
  });

  it('die Drill-down-Ziele sind mandantenfreie Routen (kein Mandant in der Adresse)', () => {
    const model = buildReportGrundlage(tenant(TENANT_ID.NORDWERK));
    expect(model.gruppen.map((g) => g.ort)).toEqual(['/isms', '/services', '/entscheidungen']);
    for (const gruppe of model.gruppen) {
      for (const fremd of DEMO_TENANTS) {
        expect(gruppe.ort).not.toContain(fremd.tenant_id);
      }
    }
  });
});
