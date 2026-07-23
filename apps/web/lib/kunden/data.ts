/**
 * View-Daten der Kunden-Startseite „verwalten" (WP-006 Slice 1, read-only).
 *
 * Stufe-1-Näherung an den Customer Workspace (Dok. 06, Abschnitt „Customer Workspace" und
 * Screenkatalog S02 „Customer Workspace"): die eigenen **Scopes, Ziele, Services und Nachweise**
 * des AKTIVEN Mandanten an einem Ort, aus Kundenrollen-Perspektive (Dok. 03, Abschnitt
 * „Kanonisches Rollenmodell", Sphäre „Kunde").
 *
 * Reine Ableitung aus `@isms/demo-seed` (statischer Import, kein Fetch/keine DB). Es werden
 * AUSSCHLIESSLICH belegte Seed-Werte verdichtet – nichts wird hartkodiert oder erfunden
 * (`.claude/rules/demo-data.md`). React-/Next-frei, damit deterministisch testbar (Muster
 * `lib/services/data.ts` / `lib/isms/data.ts`).
 *
 * MANDANTENGRENZE = SICHERHEITSGRENZE (Dok. 03, Abschnitt „Zugriff, Datenschutz und
 * Vertrauensgrenzen"; Dok. 07, Abschnitt „Mandantenfähigkeit, Rechte und Datenschutz", P09):
 * jede Auflösung arbeitet strikt innerhalb EINES Mandanten (`tenant_id`). Es entsteht KEINE
 * mandantenübergreifende Aggregation und KEIN Betreiber-Portfolio (kein Mandantenvergleich,
 * keine Auslastung/Profitabilität – das sind Betreiber-Inhalte, Dok. 03 Steckbrief „Managed
 * Service Lead").
 *
 * WAS HIER BEWUSST NICHT MATERIALISIERT WIRD (benannt statt erfunden, DR-0010 Nr. 2 / DR-0008):
 *  - Der Objektvertrag (Dok. 07) kennt die Typen `Strategie-DNA` (F01) und `Target Profile`
 *    (F09); der heutige Seed materialisiert sie NICHT. Der Customer-Workspace-Kopf aus Dok. 06
 *    (Strategie-DNA, Zielprofil, Managed-Service-Anteil, Trend, Puls, Ursache-Wirkungs-Ketten,
 *    Hebel, Zeitachse) hat damit heute keinen Datenträger – die Startseite BENENNT das (siehe
 *    `KundenStartContent`), sie simuliert es nicht (kein Zielstatus, kein Trend, kein Puls).
 *  - Scopes sind im Modell KEINE eigenständigen Objekte (offene Frage O-WP014-03) – gezeigt
 *    werden die belegten `scope_id`-Kennungen der Objekte, nicht ein erfundener Scope-Steckbrief.
 */

import type { ObjectEnvelope } from '@isms/contracts';
import { DEMO_SEED, type DemoTenant } from '@isms/demo-seed';
import { derivePageContextFacts, type PageContextFacts } from '../shell/page-context';
import { getManagedServicesForTenant, type ManagedServiceView } from '../services/data';
import { objectTypeDisplay } from '../twin/data';

/* -----------------------------------------------------------------------------
 * View-Modelle
 * --------------------------------------------------------------------------- */

/** Ein belegtes Kernobjekt des Kundenbereichs (Ziel/Kennzahl/Nachweis), read-only. */
export interface WorkspaceObjectRef {
  readonly object_id: string;
  readonly name: string;
  /** Kanonischer Objekttyp (bleibt immer sichtbar, Nachvollziehbarkeit zum Modell). */
  readonly object_type: string;
  /** Klartext-Glosse + kanonischer Typ (z. B. „Ziel (Objective)") aus `objectTypeDisplay`. */
  readonly object_type_display: string;
  /** Lebenszyklus-Stand wörtlich aus dem Seed – KEIN Prüfergebnis (08-D07-Glosse). */
  readonly lifecycle_status: string;
  readonly description: string;
}

/** Vollständige, read-only Sicht auf den Kundenbereich EINES Mandanten. */
export interface CustomerWorkspaceModel {
  readonly tenant: DemoTenant;
  /** Belegte Scope-Kennungen des Mandanten (rohe `scope_id`, O-WP014-03 – keine Objekte). */
  readonly scopeIds: readonly string[];
  /** Ziele und Kennzahlen des Mandanten (`Objective`/`KPI`). */
  readonly objectives: readonly WorkspaceObjectRef[];
  /** Nachweise des Mandanten (`Evidence`). */
  readonly evidence: readonly WorkspaceObjectRef[];
  /** Managed Services des Mandanten samt SLA/Deliverables (aus `lib/services/data.ts`). */
  readonly services: readonly ManagedServiceView[];
  /** Anzahl erfasster Entscheidungen (`Decision Record`) DIESES Mandanten (Verweis-Ziel). */
  readonly decisionCount: number;
  /** Gesamtzahl der Objekte dieses Mandanten (mandantenlokal, für den Klartext-Stand). */
  readonly objectCount: number;
  /**
   * `true`, wenn der Mandant im Seed keinerlei Objekte trägt (Finovia/MediCore) – dann rendert
   * die Startseite die mandantenlokale Einladung (Dok. 03, Abschnitt „Anfängererlebnis").
   */
  readonly isEmpty: boolean;
  /** Kontextfakten der Kontextleiste (Scope-Kennungen + Datenstand, Dok. 06 „Sichtbarer Kontext"). */
  readonly context: PageContextFacts;
}

/* -----------------------------------------------------------------------------
 * Auflösung je Mandant (harte Mandantengrenze über tenant_id)
 * --------------------------------------------------------------------------- */

function toWorkspaceRef(obj: ObjectEnvelope): WorkspaceObjectRef {
  return {
    object_id: obj.object_id,
    name: obj.display_name,
    object_type: obj.object_type,
    object_type_display: objectTypeDisplay(obj.object_type),
    lifecycle_status: obj.lifecycle_status,
    // `description` ist im Envelope optional; leere Beschreibung wird als leer gerendert.
    description: obj.description ?? '',
  };
}

/**
 * Baut die komplette Kundenbereich-Sicht eines Mandanten aus dem Seed (deterministisch).
 * Alle Listen entstehen ausschließlich aus Objekten mit der übergebenen `tenant_id`.
 */
export function buildCustomerWorkspace(tenant: DemoTenant): CustomerWorkspaceModel {
  const objects = DEMO_SEED.objects.filter((o) => o.tenant_id === tenant.tenant_id);
  const relationships = DEMO_SEED.relationships.filter((r) => r.tenant_id === tenant.tenant_id);

  const ofType = (type: string): ObjectEnvelope[] => objects.filter((o) => o.object_type === type);

  // Ziele/Kennzahlen und Nachweise als eigenständige Kernobjekte (keine erfundene Zuordnung).
  const objectives = [...ofType('Objective'), ...ofType('KPI')].map(toWorkspaceRef);
  const evidence = ofType('Evidence').map(toWorkspaceRef);

  // Belegte Scope-Kennungen in Reihenfolge des ersten Auftretens (rohe IDs, O-WP014-03).
  const scopeIds: string[] = [];
  for (const object of objects) {
    for (const scope of object.scope_ids) {
      if (!scopeIds.includes(scope.scope_id)) scopeIds.push(scope.scope_id);
    }
  }

  return {
    tenant,
    scopeIds,
    objectives,
    evidence,
    services: getManagedServicesForTenant(tenant.tenant_id),
    decisionCount: ofType('Decision Record').length,
    objectCount: objects.length,
    isEmpty: objects.length === 0,
    // Datenstand + Scope-Kennungen über Objekte UND Kanten dieses Mandanten (Systemachse
    // `record_time.recorded_at`, Dok. 07 §11) – dieselbe Ableitung wie die anderen Live-Orte.
    context: derivePageContextFacts(objects, relationships),
  };
}
