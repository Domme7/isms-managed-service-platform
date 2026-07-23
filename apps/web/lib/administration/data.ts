/**
 * Konfigurationsstand des AKTIVEN Mandanten für den Ort „Administration" (WP-032 Slice 1,
 * read-only).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile
 * „Administration" („Nutzer, Rechte, Integrationen, Konfiguration, Audit Logs, Betrieb — Nur bei
 * entsprechender Berechtigung") und Abschnitt „Seiten- und Screenkatalog", Screen
 * „Administration & Integration Health". Von dieser Aufzählung trägt der heutige Bestand
 * ausschließlich den KONFIGURATIONS-Teil: erfasste Scopes und Datenstand des aktiven Mandanten.
 * Nutzer, Rechte, Integrationen, Audit-Einträge und Betriebsdaten existieren nicht – sie werden
 * auf der Seite als Struktur und als benannte Sach-Lücke gezeigt, niemals gefüllt (DR-0005).
 *
 * MANDANTENGRENZE = SICHERHEITSGRENZE (Dok. 19, Abschnitt „Mandantenisolation und
 * Kontextwechsel"; Dok. 07, Abschnitt „Mandantenfähigkeit, Rechte und Datenschutz", P09):
 * Diese Ableitung arbeitet ausschließlich innerhalb EINES Mandanten (`tenant_id`). Es entsteht
 * KEINE mandantenübergreifende Zählung und KEINE Aussage über die Existenz anderer Mandanten –
 * auch nicht im Leerzustand (FINDING-0009-Klasse).
 *
 * Reine Ableitung aus `@isms/demo-seed` (statischer Import, kein Fetch/keine DB), react-frei und
 * deterministisch testbar (Muster `lib/kunden/data.ts`).
 */

import { DEMO_SEED, type DemoTenant } from '@isms/demo-seed';
import { derivePageContextFacts, type PageContextFacts } from '../shell/page-context';

/** Read-only Konfigurationsstand EINES Mandanten. */
export interface AdministrationModel {
  readonly tenant: DemoTenant;
  /**
   * Erfasste Scope-Kennungen des Mandanten in Reihenfolge des ersten Auftretens.
   * Rohe Kennungen: Scopes sind im Objektvertrag KEINE eigenständigen Objekte (O-WP014-03) –
   * es wird kein Scope-Steckbrief erfunden.
   */
  readonly scopeIds: readonly string[];
  /** Anzahl erfasster Objekte DIESES Mandanten (Grundgesamtheit des Konfigurationsstands). */
  readonly objectCount: number;
  /** Anzahl erfasster Beziehungen DIESES Mandanten. */
  readonly relationshipCount: number;
  /** `true`, wenn für diesen Mandanten nichts erfasst ist – dann rendert die Seite ihren
   *  mandantenlokalen Leerzustand statt einer „0 von 0"-Wand. */
  readonly isEmpty: boolean;
  /** Scope-Kennungen + Datenstand für die Kontextleiste (Dok. 06 „Sichtbarer Kontext"). */
  readonly context: PageContextFacts;
}

/**
 * Baut den Konfigurationsstand eines Mandanten aus dem Bestand (deterministisch).
 * Alle Zahlen entstehen ausschließlich aus Objekten und Beziehungen mit der übergebenen
 * `tenant_id`; es wird nichts hartkodiert, nichts geschätzt und nichts verdichtet, was eine
 * Bewertung wäre (DR-0008).
 */
export function buildAdministrationModel(tenant: DemoTenant): AdministrationModel {
  const objects = DEMO_SEED.objects.filter((o) => o.tenant_id === tenant.tenant_id);
  const relationships = DEMO_SEED.relationships.filter((r) => r.tenant_id === tenant.tenant_id);

  const scopeIds: string[] = [];
  for (const object of objects) {
    for (const scope of object.scope_ids) {
      if (!scopeIds.includes(scope.scope_id)) scopeIds.push(scope.scope_id);
    }
  }

  return {
    tenant,
    scopeIds,
    objectCount: objects.length,
    relationshipCount: relationships.length,
    isEmpty: objects.length === 0,
    context: derivePageContextFacts(objects, relationships),
  };
}
