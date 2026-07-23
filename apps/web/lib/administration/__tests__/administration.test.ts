/**
 * Tests der react-freien Administrations-Grundlagen (WP-032 Slice 1).
 *
 * 1. `modell.ts`: die Kardinalitäten der Konzeptlisten – AM PDF GEZÄHLT, nicht abgeschrieben
 *    (Dok. 19, Abschnitte „Identitäts-Lifecycle", „Autorisierungsmodell: RBAC, ABAC und
 *    Beziehungen", „Mandantenisolation und Kontextwechsel", „Canonical Audit Records";
 *    Dok. 17, Abschnitte „Priorisierter Connector-Katalog", „Connector Health Record";
 *    Dok. 18 rund um Observability und Betrieb). Der Test nagelt die Anzahl fest, damit eine
 *    stille Kürzung oder Ergänzung auffällt.
 * 2. `data.ts`: die Mandantengrenze der Ableitung – jede Zahl entsteht ausschließlich aus
 *    Objekten mit der `tenant_id` des übergebenen Mandanten (gegen eine unabhängige Filterung
 *    desselben Bestands geprüft, nicht gegen eine abgeschriebene Zahl).
 */
import { describe, expect, it } from 'vitest';

import { DEMO_SEED, DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { buildAdministrationModel } from '../data';
import {
  AUDIT_AUSLOESER,
  AUDIT_INTEGRITAET,
  AUDIT_MINDESTFELDER,
  AUTORISIERUNGS_EBENEN,
  BETRIEBS_FAEHIGKEITEN,
  IDENTITAETSTYPEN,
  IDENTITAETS_STATIONEN,
  ISOLATIONS_SCHICHTEN,
  METADATEN_FLAECHEN,
  SYSTEM_FAMILIEN,
  SYSTEM_FAMILIEN_HINWEIS,
  SYSTEM_ZUSTAND_MERKMALE,
} from '../modell';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

describe('Administrations-Modell – Kardinalitäten gegen die Quelle', () => {
  it('Identitäten: acht Typen, fünf Stationen des Lebenswegs (Dok. 19 „Identitäts-Lifecycle")', () => {
    expect(IDENTITAETSTYPEN).toHaveLength(8);
    expect(IDENTITAETS_STATIONEN).toHaveLength(5);
    // Jede Station benennt eine Regel, keine leere Überschrift.
    for (const station of IDENTITAETS_STATIONEN) {
      expect(station.titel.length).toBeGreaterThan(0);
      expect(station.erlaeuterung.length).toBeGreaterThan(20);
    }
  });

  it('Autorisierung: drei Ebenen mit 4 / 11 / 5 Ausprägungen (Dok. 19 „Autorisierungsmodell …")', () => {
    expect(AUTORISIERUNGS_EBENEN.map((e) => e.titel)).toEqual([
      'Rolle',
      'Kontextmerkmale',
      'Beziehung zum Objekt',
    ]);
    expect(AUTORISIERUNGS_EBENEN.map((e) => e.punkte.length)).toEqual([4, 11, 5]);
  });

  it('Mandantentrennung: zehn Schichten, elf Leckflächen (Dok. 19 „Mandantenisolation …")', () => {
    expect(ISOLATIONS_SCHICHTEN).toHaveLength(10);
    expect(METADATEN_FLAECHEN).toHaveLength(11);
    expect(new Set(ISOLATIONS_SCHICHTEN).size).toBe(ISOLATIONS_SCHICHTEN.length);
    expect(new Set(METADATEN_FLAECHEN).size).toBe(METADATEN_FLAECHEN.length);
  });

  it('Systemfamilien: vierzehn Familien in der Priorisierung 5 / 5 / 3 / 1 (Dok. 17 „Priorisierter Connector-Katalog")', () => {
    expect(SYSTEM_FAMILIEN).toHaveLength(14);
    const jePrioritaet = (p: string) => SYSTEM_FAMILIEN.filter((f) => f.prioritaet === p).length;
    expect([
      jePrioritaet('P0'),
      jePrioritaet('P1'),
      jePrioritaet('P2'),
      jePrioritaet('P3'),
    ]).toEqual([5, 5, 3, 1]);
    // Der Ehrlichkeitssatz der Quelltabelle ist übernommen (er relativiert die Priorisierung).
    expect(SYSTEM_FAMILIEN_HINWEIS).toContain('beschreibt die Produktentwicklung');
  });

  it('Systemfamilien tragen KEINEN Zustand und keine Bautiefe (DR-0008)', () => {
    // Die Quellspalte „Prototyp-Tiefe" ist bewusst nicht übernommen: „vollständig funktionsfähig"
    // wäre im Produkt eine Zustandszusage über heute. Ebenso wenig existiert ein Statusfeld.
    for (const familie of SYSTEM_FAMILIEN) {
      expect(Object.keys(familie).sort()).toEqual(['familie', 'nutzen', 'prioritaet']);
      const text = `${familie.familie} ${familie.nutzen}`;
      expect(text).not.toMatch(/funktionsfähig|Mock|Prototyp|verbunden|aktiv\b/i);
    }
    // Der Zustand einer Anbindung existiert nur als MERKMALSLISTE, ohne Wert je Merkmal.
    expect(SYSTEM_ZUSTAND_MERKMALE).toHaveLength(9);
    for (const merkmal of SYSTEM_ZUSTAND_MERKMALE) {
      expect(merkmal).not.toMatch(/\d/); // keine Zahl, kein Prozent, kein Schwellwert
    }
  });

  it('Audit: zwölf Auslöser, dreizehn Mindestfelder, Manipulationsschutz (Dok. 19 „Canonical Audit Records")', () => {
    expect(AUDIT_AUSLOESER).toHaveLength(12);
    expect(AUDIT_MINDESTFELDER).toHaveLength(13);
    expect(AUDIT_INTEGRITAET).toContain('nur angehängt');
  });

  it('Betrieb: vier benannte Fähigkeiten, keine Kennzahl (Dok. 18)', () => {
    expect(BETRIEBS_FAEHIGKEITEN).toHaveLength(4);
    for (const punkt of BETRIEBS_FAEHIGKEITEN) {
      // Beschreibung statt Messwert: keine Zahl im sichtbaren Text (DR-0008).
      expect(`${punkt.titel} ${punkt.erlaeuterung}`).not.toMatch(/\d/);
    }
  });

  it('kein internes Vokabular in den sichtbaren Modelltexten (DR-0013 Nr. 2)', () => {
    const sichtbar = [
      ...IDENTITAETSTYPEN,
      ...IDENTITAETS_STATIONEN.flatMap((s) => [s.titel, s.erlaeuterung]),
      ...AUTORISIERUNGS_EBENEN.flatMap((e) => [e.titel, e.erlaeuterung, ...e.punkte]),
      ...ISOLATIONS_SCHICHTEN,
      ...METADATEN_FLAECHEN,
      ...SYSTEM_FAMILIEN.flatMap((f) => [f.familie, f.nutzen]),
      SYSTEM_FAMILIEN_HINWEIS,
      ...SYSTEM_ZUSTAND_MERKMALE,
      ...AUDIT_AUSLOESER,
      ...AUDIT_MINDESTFELDER,
      AUDIT_INTEGRITAET,
      ...BETRIEBS_FAEHIGKEITEN.flatMap((p) => [p.titel, p.erlaeuterung]),
    ].join(' | ');

    // Keine Dokument-/Entscheidungs-/Kriterienkennung, keine Familien-/Beziehungscodes,
    // keine technischen Feldnamen.
    for (const verboten of [
      /Dok\.\s?\d/,
      /\d{2}-D\d{2}/,
      /19-AC\d/,
      /\bF0[1-9]\b/,
      /\bR\d{2}\b/,
      /[a-z]+_[a-z]+/,
      /§/,
    ]) {
      expect(sichtbar, `verbotenes Muster „${verboten}"`).not.toMatch(verboten);
    }
  });
});

describe('buildAdministrationModel – Konfigurationsstand strikt mandantenlokal', () => {
  for (const demoTenant of DEMO_TENANTS) {
    it(`${demoTenant.tenant_id}: alle Zahlen stammen ausschließlich aus diesem Mandanten`, () => {
      const model = buildAdministrationModel(demoTenant);

      // Gegenrechnung mit einer UNABHÄNGIGEN Filterung desselben Bestands (keine abgeschriebene
      // Zahl): die Ableitung darf weder mehr noch weniger zählen.
      const eigene = DEMO_SEED.objects.filter((o) => o.tenant_id === demoTenant.tenant_id);
      const eigeneKanten = DEMO_SEED.relationships.filter(
        (r) => r.tenant_id === demoTenant.tenant_id,
      );
      expect(model.objectCount).toBe(eigene.length);
      expect(model.relationshipCount).toBe(eigeneKanten.length);
      expect(model.isEmpty).toBe(eigene.length === 0);

      // Jede gezeigte Scope-Kennung ist an einem Objekt DIESES Mandanten belegt.
      const belegteScopes = new Set(eigene.flatMap((o) => o.scope_ids.map((s) => s.scope_id)));
      for (const scopeId of model.scopeIds) {
        expect(belegteScopes.has(scopeId), `${scopeId} nicht im Mandanten belegt`).toBe(true);
      }
      expect(new Set(model.scopeIds).size).toBe(model.scopeIds.length);
    });
  }

  it('ein Mandant ohne Bestand liefert einen ehrlichen Leerstand statt erfundener Werte', () => {
    for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
      const model = buildAdministrationModel(tenant(tenantId));
      expect(model.isEmpty).toBe(true);
      expect(model.scopeIds).toEqual([]);
      expect(model.objectCount).toBe(0);
      expect(model.relationshipCount).toBe(0);
      expect(model.context.recordedOn).toBeUndefined();
      expect(model.context.recordedOnDisplay).toBeUndefined();
    }
  });

  it('ein ausmodellierter Mandant liefert belegte Scopes und einen belegten Datenstand', () => {
    const model = buildAdministrationModel(tenant(TENANT_ID.NORDWERK));
    expect(model.isEmpty).toBe(false);
    expect(model.scopeIds.length).toBeGreaterThan(0);
    expect(model.context.recordedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // Keine Kennung eines fremden Mandanten in den abgeleiteten Scope-Kennungen.
    for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== TENANT_ID.NORDWERK)) {
      for (const scopeId of model.scopeIds) {
        expect(scopeId).not.toContain(fremd.tenant_id.replace('tenant-', ''));
      }
    }
  });
});
