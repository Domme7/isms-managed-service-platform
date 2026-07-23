/**
 * Unit-Tests der Seitenkontext-Ableitung (WP-020 Slice 1, Dok. 06 „Sichtbarer Kontext").
 *
 * Geprüft gegen den ECHTEN Datenbestand (keine Fixtures für die Kernaussagen – Lektion:
 * Zahlen nachrechnen, nie abschreiben) plus dem leeren Grenzfall:
 *  1. Nordwerk: Scope-Kennungen in Reihenfolge des ersten Auftretens; jüngster Erfassungstag
 *     ist der Kalendertag der letzten Erfassungswelle (identisch zur Ableitung auf „Heute").
 *  2. Leerer Input: keine Scopes, kein Datenstand – nichts wird erfunden.
 *  3. Kanten zählen für den Datenstand mit (eine Kante kann jünger sein als jedes Objekt).
 */
import { describe, expect, it } from 'vitest';

import { TENANT_ID } from '@isms/demo-seed';
import { deriveRecordingWaves } from '../../heute/data';
import { derivePageContextFacts } from '../page-context';
import { getObjectsForTenant, getRelationshipsForTenant } from '../../twin/data';

describe('derivePageContextFacts', () => {
  it('leitet für Nordwerk Scopes und jüngsten Erfassungstag aus dem echten Seed ab', () => {
    const objects = getObjectsForTenant(TENANT_ID.NORDWERK);
    const relationships = getRelationshipsForTenant(TENANT_ID.NORDWERK);
    const facts = derivePageContextFacts(objects, relationships);

    // Scope-Kennungen: dieselbe Menge wie über die Erfassungswellen von „Heute" – EINE
    // Ableitungsregel, keine zweite Wahrheit.
    const waves = deriveRecordingWaves(objects, relationships);
    const wellenScopes: string[] = [];
    for (const wave of waves) {
      for (const scope of wave.scopeIds) {
        if (!wellenScopes.includes(scope)) wellenScopes.push(scope);
      }
    }
    expect([...facts.scopeIds].sort()).toEqual([...wellenScopes].sort());
    expect(facts.scopeIds.length).toBeGreaterThan(0);

    // Datenstand = Kalendertag der LETZTEN Welle (Systemachse, Dok. 07 §11).
    const letzte = waves[waves.length - 1];
    expect(facts.recordedOn).toBe(letzte?.recordedOn);
    expect(facts.recordedOnDisplay).toBe(letzte?.dateDisplay);
  });

  it('erfindet bei leerem Input weder Scope noch Datenstand', () => {
    const facts = derivePageContextFacts([], []);
    expect(facts.scopeIds).toEqual([]);
    expect(facts.recordedOn).toBeUndefined();
    expect(facts.recordedOnDisplay).toBeUndefined();
  });

  it('bezieht Kanten in den Datenstand ein (nur Objekte wäre zu früh)', () => {
    const objects = getObjectsForTenant(TENANT_ID.NORDWERK);
    const relationships = getRelationshipsForTenant(TENANT_ID.NORDWERK);

    const nurObjekte = derivePageContextFacts(objects, []);
    const mitKanten = derivePageContextFacts(objects, relationships);

    // Mit Kanten ist der Datenstand nie ÄLTER als ohne – und beide sind belegt.
    expect(nurObjekte.recordedOn).toBeDefined();
    expect(mitKanten.recordedOn).toBeDefined();
    expect((mitKanten.recordedOn as string) >= (nurObjekte.recordedOn as string)).toBe(true);
  });

  it('leerer Mandant im echten Seed: Finovia liefert keine Fakten', () => {
    const facts = derivePageContextFacts(
      getObjectsForTenant(TENANT_ID.FINOVIA),
      getRelationshipsForTenant(TENANT_ID.FINOVIA),
    );
    expect(facts.scopeIds).toEqual([]);
    expect(facts.recordedOn).toBeUndefined();
  });
});
