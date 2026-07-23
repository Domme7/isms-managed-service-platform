/**
 * Belegbare Datengrundlage des AKTIVEN Mandanten für den Ort „Reports" (WP-032 Slice 2,
 * read-only).
 *
 * WAS DIESE ABLEITUNG TUT: Sie zählt, welches Material für den aktiven Mandanten überhaupt
 * erfasst ist – und NUR das. Sie zählt nichts neu und definiert keine eigene Zählregel: jede
 * Zahl ist die Länge einer Liste, die eine bereits bestehende, mandantengebundene Ableitung
 * liefert (`lib/isms/data.ts`, `lib/services/data.ts`, `lib/entscheidungen/data.ts`). Damit
 * kann diese Seite dem jeweiligen Fachort nie widersprechen.
 *
 * WAS SIE AUSDRÜCKLICH NICHT TUT (DR-0008 / Zuschnitt):
 *  - KEINE Zuordnung „Berichtstyp ↔ Objekt". Welcher Bericht welches Material verwendet, legt
 *    erst eine Berichtsdefinition fest; eine hier erfundene Zuordnung wäre eine Wertung ohne
 *    Datenträger.
 *  - KEINE Bewertung: kein Reifegrad, kein Score, keine Ampel, kein Trend, kein Prozent, keine
 *    Aussage über Vollständigkeit oder Qualität des Materials.
 *  - KEINE mandantenübergreifende Zählung. Jede Zahl entsteht innerhalb EINES Mandanten
 *    (Dok. 07, Abschnitt „Mandantenfähigkeit, Rechte und Datenschutz", P09). Es gibt hier
 *    bewusst keine Funktion, die zählt, wie viele Mandanten Material tragen – dieselbe
 *    Begründung wie in `lib/entscheidungen/data.ts`.
 *
 * React-frei und deterministisch testbar (Muster `lib/administration/data.ts`).
 */

import { DEMO_SEED, type DemoTenant } from '@isms/demo-seed';
import { buildDecisionRegister } from '../entscheidungen/data';
import { buildIsmsCoreView } from '../isms/data';
import { getManagedServicesForTenant } from '../services/data';
import { derivePageContextFacts, type PageContextFacts } from '../shell/page-context';

/** Eine gezählte Grundgesamtheit des aktiven Mandanten. */
export interface GrundlagePosten {
  /** Bezeichnung in Domänensprache (Ein-/Mehrzahl je Anzahl über `bezeichnungEinzahl`). */
  readonly bezeichnung: string;
  /** Einzahlform für die Anzeige bei genau einem Treffer. */
  readonly bezeichnungEinzahl: string;
  readonly anzahl: number;
  /** Was genau gezählt wurde – die Ermittlungsregel, sichtbar statt implizit. */
  readonly ermittlung: string;
}

/** Eine Herkunftsgruppe der Grundlage samt Drill-down auf den zuständigen Ort. */
export interface GrundlageGruppe {
  readonly titel: string;
  /** Ort, an dem dieses Material vollständig einsehbar ist (mandantenfreie Route). */
  readonly ort: string;
  readonly ortLabel: string;
  readonly posten: readonly GrundlagePosten[];
}

export interface ReportGrundlageModel {
  readonly tenant: DemoTenant;
  readonly gruppen: readonly GrundlageGruppe[];
  /** `true`, wenn für diesen Mandanten kein einziger Posten belegt ist. */
  readonly isEmpty: boolean;
  /** Scope-Kennungen + Datenstand für die Kontextleiste (Dok. 06 „Sichtbarer Kontext"). */
  readonly context: PageContextFacts;
}

/**
 * Baut die gezählte Grundlage eines Mandanten. Alle Zahlen stammen aus den bestehenden,
 * bereits mandantengebundenen Ableitungen; der Kontext (Scopes, Datenstand) entsteht wie auf
 * den übrigen Orten aus den Objekten und Kanten DIESES Mandanten.
 */
export function buildReportGrundlage(tenant: DemoTenant): ReportGrundlageModel {
  const tenantId = tenant.tenant_id;

  const isms = buildIsmsCoreView(tenantId);
  const services = getManagedServicesForTenant(tenantId);
  const register = buildDecisionRegister(tenantId);

  // Servicebestandteile: Summe über die bereits je Service aufgelösten Listen – keine eigene
  // Kantenlogik, damit die Zahl mit dem Ort „Services" übereinstimmt.
  const slaAnzahl = services.reduce((summe, view) => summe + view.slas.length, 0);
  const deliverableAnzahl = services.reduce((summe, view) => summe + view.deliverables.length, 0);
  const reviewAnzahl = services.reduce((summe, view) => summe + view.reviews.length, 0);

  const gruppen: GrundlageGruppe[] = [
    {
      titel: 'Aus dem Informationssicherheits-Management',
      ort: '/isms',
      ortLabel: 'Zur ISMS-Sicht',
      posten: [
        posten('Risiken', 'Risiko', isms.risks.length, 'erfasste Risiken dieses Mandanten'),
        posten('Controls', 'Control', isms.controls.length, 'erfasste Controls dieses Mandanten'),
        posten(
          'Maßnahmen',
          'Maßnahme',
          isms.measures.length,
          'erfasste Maßnahmen dieses Mandanten',
        ),
        posten(
          'Nachweise',
          'Nachweis',
          isms.evidence.length,
          'erfasste Nachweise dieses Mandanten',
        ),
      ],
    },
    {
      titel: 'Aus der Managed-Service-Schicht',
      ort: '/services',
      ortLabel: 'Zu den Services',
      posten: [
        posten('Services', 'Service', services.length, 'erfasste Services dieses Mandanten'),
        posten(
          'Leistungsversprechen (SLA)',
          'Leistungsversprechen (SLA)',
          slaAnzahl,
          'Leistungsversprechen über alle Services dieses Mandanten',
        ),
        posten(
          'Ergebnisse (Deliverables)',
          'Ergebnis (Deliverable)',
          deliverableAnzahl,
          'Ergebnisse über alle Services dieses Mandanten',
        ),
        posten(
          'Serviceberichte und Reviews',
          'Servicebericht oder Review',
          reviewAnzahl,
          'Berichts- und Reviewbestandteile über alle Services dieses Mandanten',
        ),
      ],
    },
    {
      titel: 'Aus dem Entscheidungsregister',
      ort: '/entscheidungen',
      ortLabel: 'Zu den Entscheidungen',
      posten: [
        posten(
          'Entscheidungen',
          'Entscheidung',
          register?.decisions.length ?? 0,
          'erfasste Entscheidungen dieses Mandanten',
        ),
      ],
    },
  ];

  const isEmpty = gruppen.every((gruppe) => gruppe.posten.every((p) => p.anzahl === 0));

  const objects = DEMO_SEED.objects.filter((o) => o.tenant_id === tenantId);
  const relationships = DEMO_SEED.relationships.filter((r) => r.tenant_id === tenantId);

  return {
    tenant,
    gruppen,
    isEmpty,
    context: derivePageContextFacts(objects, relationships),
  };
}

function posten(
  bezeichnung: string,
  bezeichnungEinzahl: string,
  anzahl: number,
  ermittlung: string,
): GrundlagePosten {
  return { bezeichnung, bezeichnungEinzahl, anzahl, ermittlung };
}
