/**
 * Präsentationaler Inhalt des Ortes „ISMS" (WP-013 Slice 1, read-only, Dok. 06 §7 S06).
 *
 * Vier Sektionen auf dem Seed des aktiven Mandanten: Risiken (inkl. Szenario-Herkunft und
 * Schwachstellen-Ursprung), Controls (Umsetzung, Anforderung, Nachweis-Stand), Maßnahmen und
 * Nachweise. Vollständig aus `DEMO_SEED` abgeleitet – nichts hartkodiert oder erfunden; nur
 * belegte Lifecycle-Stände, KEIN Scoring/Reifegrad (Abgrenzung Dok. 09/10; 08-D07/08-D20).
 * Empty-State für Mandanten ohne ISMS-Kernobjekte (Dok. 06 §17). Kein Rollen-Gating: die
 * Ansicht zeigt nur den aktiven Mandanten (WP-013 Nicht-Ziele).
 *
 * ANTWORT-MODUS (WP-028 Slice 3, DR-0013 Nr. 1 „Antwort zuerst, Lücke zuletzt"): Über der Falz
 * stehen Zahlen und Stände. Der Aufmacher nennt in EINEM aus dem Modell abgeleiteten Satz, was
 * erfasst ist; die drei früheren Rahmungsabsätze (Read-only-Charakter, Abgrenzung gegen
 * Scoring/Reifegrade, der seitenweite Lebenszyklus-Satz) standen zusammen rund 130 Wörter VOR
 * der ersten Zahl. Sie sind vollständig erhalten und stehen jetzt verdichtet im
 * Abschluss-Abschnitt „Was diese Seite nicht behauptet" am Seitenende.
 *
 * WIDERSPRUCH „wirksam" (DR-0013 Nr. 8): Die Lebenszyklus-Verteilung führt einen erfassten Stand
 * „wirksam", während der Seitentext „keine bewertete Wirksamkeit" sagt. Aufgelöst wird das AM
 * WORT – die Verteilungs-Kachel kennzeichnet solche Stände als erfasste Stände ohne Urteil
 * (`STAND_HINWEIS` in `lib/heute/dashboard.ts`). Der Stand selbst wird NICHT umbenannt: er kommt
 * aus Vertrag und Seed, eine Umbenennung wäre eine Owner-Entscheidung (E-02).
 *
 * Heading-Hierarchie: h1 (Ort) > h2 (Sektion) > h3 (Karte) > h4 (Karteninhalt).
 */
import type { ReactNode } from 'react';
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import { anzahl } from '../../lib/heute/data';
import { buildIsmsVerdichtung } from '../../lib/heute/dashboard';
import { buildIsmsCoreView, hasManagedServices } from '../../lib/isms/data';
import type { DemoRole } from '../../lib/shell/roles';
import { CoverageKachel, LifecycleVerteilungKachel } from '../shell/DashboardKacheln';
import { PageContextBar } from '../shell/PageContextBar';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';
import {
  ControlCard,
  EvidenceCard,
  MeasureCard,
  RiskCard,
  ScenarioCard,
  WeaknessCard,
} from './IsmsCards';

/**
 * `role` ergänzt in WP-020 Slice 1: die Kontextleiste (Dok. 06 „Sichtbarer Kontext") zeigt die
 * aktive Produktrolle auf jeder Live-Hauptseite. Reine Anzeige – KEIN Rollen-Gating, die Sicht
 * bleibt für alle Rollen identisch (Dok. 06 06-D05). `null` = neutraler Zustand (DR-0009):
 * dieselbe Seite, dieselben Daten, die Leiste nennt „neutral".
 */
export function IsmsContent({ role, tenant }: { role: DemoRole | null; tenant: DemoTenant }) {
  const view = buildIsmsCoreView(tenant.tenant_id);
  // Verdichteter Überblick (WP-020 Slice 4, DR-0008): Lebenszyklus-Verteilung + Abdeckungen
  // aus DENSELBEN Ableitungen wie die Karten darunter; `undefined` bei leerer Kernsicht
  // (dann zeigt die Seite ihren eigenen ehrlichen Leerzustand, keine „0 von 0"-Wand).
  const verdichtung = buildIsmsVerdichtung(tenant.tenant_id);
  // Mandant für alle Objekt-Links dieser Ansicht (WP-014 Slice 2): ausschließlich der AKTIVE
  // Mandant der Session-Simulation – derselbe, aus dem die Karten abgeleitet sind. Niemals
  // hartkodiert und niemals ein fremder Mandant (Dok. 07 §17/P09).
  const tenantId = tenant.tenant_id;

  return (
    <>
      <p className="tw-eyebrow">ISMS · Risk &amp; Control</p>
      <h1>ISMS</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation", S06). */}
      <p className="tw-question">Wie ist die Risiko- und Control-Lage von {tenant.display_name}?</p>

      {/* ANTWORT ZUERST (DR-0013 Nr. 1): der belegte Bestand in einem Satz, aus dem Modell
          gezählt – nicht geschrieben. Die Abgrenzungssätze („nur belegte Seed-Stände", „ohne
          Scoring und Reifegrade") stehen unverändert im Abschluss-Abschnitt am Seitenende. */}
      <IsmsAufmacher view={view} tenant={tenant} />

      {/* Kontextleiste (WP-020 Slice 1, Dok. 06 „Sichtbarer Kontext"): Scope und Datenstand
          beziehen sich ausdrücklich auf die HIER GEZEIGTEN ISMS-Kernobjekte – die Leiste
          widerspricht damit nie dem Seiteninhalt (Muster `/entscheidungen`). */}
      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Scope-Kennungen der ISMS-Kernobjekte"
        scopeValue={
          view.context.scopeIds.length > 0
            ? view.context.scopeIds.join(' · ')
            : 'keine Scope-Zuordnung erfasst'
        }
        datenstandLabel="Datenstand der ISMS-Kernobjekte (zuletzt im System erfasst)"
        datenstandValue={
          view.context.recordedOn && view.context.recordedOnDisplay ? (
            <time dateTime={view.context.recordedOn}>{view.context.recordedOnDisplay}</time>
          ) : (
            'kein ISMS-Kernobjekt erfasst'
          )
        }
      />

      {view.isEmpty ? (
        <section aria-labelledby="isms-empty">
          <h2 id="isms-empty">Risiko- und Control-Lage</h2>
          <EmptyIsms tenant={tenant} />
        </section>
      ) : (
        <>
          {verdichtung ? (
            <section aria-labelledby="isms-ueberblick">
              <h2 id="isms-ueberblick">Überblick aus belegten Daten</h2>
              {/* Der frühere Erklärabsatz („Verdichtung der Karten dieser Seite – es wird nichts
                  berechnet …") ist entfallen: jede Kachel nennt Frage, Zahl, Grenze und ihre
                  Ermittlungsregel bereits selbst (`KachelErklaerung`), der Absatz wiederholte
                  das nur vor der ersten Zahl (DR-0013 Nr. 3, Kachel-Boilerplate). */}
              <ul className="db-grid" aria-label="Verdichteter Überblick aus belegten Daten">
                <li>
                  <LifecycleVerteilungKachel tile={verdichtung.lifecycle} />
                </li>
                {verdichtung.coverage.map((tile) => (
                  <li key={tile.id}>
                    <CoverageKachel tile={tile} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="isms-risiken">
            <h2 id="isms-risiken">Risiken</h2>
            {/* Die BENANNTE DATENLÜCKE bleibt hier stehen, wo sie gilt (DR-0013-Grenze:
                benannte Lücken sind Substanz). Verdichtet ist nur die Rahmung davor – „ohne
                Score und ohne bewertete Einstufung" gehört zur seitenweiten Abgrenzung am
                Seitenende, nicht zusätzlich über jede Sektion. */}
            <p className="tw-muted">
              <strong>Datenlücke:</strong> Szenario, Schwachstelle und Risiko sind im aktuellen
              Datenmodell nicht direkt miteinander verknüpft – ein Zusammenhang wird hier bewusst
              nicht behauptet.
            </p>
            <SectionList
              isEmpty={view.risks.length + view.scenarios.length + view.weaknesses.length === 0}
              emptyText="Für diesen Mandanten sind im Datenbestand keine Risiken, Szenarien oder Schwachstellen modelliert."
            >
              {view.risks.map((risk) => (
                <RiskCard key={risk.risk.object_id} view={risk} tenantId={tenantId} />
              ))}
              {view.scenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.scenario.object_id}
                  view={scenario}
                  tenantId={tenantId}
                />
              ))}
              {view.weaknesses.map((weakness) => (
                <WeaknessCard
                  key={weakness.weakness.object_id}
                  view={weakness}
                  tenantId={tenantId}
                />
              ))}
            </SectionList>
          </section>

          <section aria-labelledby="isms-controls">
            <h2 id="isms-controls">Controls</h2>
            <p className="tw-muted">
              Control-Stand, Umsetzung, erfüllte Anforderung und Nachweis-Stand – der Status des
              Controls (z. B. „wirksam") und der Status seiner Implementierung (z. B.
              „implementiert") werden getrennt ausgewiesen und nie verrechnet.
            </p>
            <SectionList
              isEmpty={view.controls.length === 0}
              emptyText="Für diesen Mandanten sind im Datenbestand keine Controls modelliert."
            >
              {view.controls.map((control) => (
                <ControlCard key={control.control.object_id} view={control} tenantId={tenantId} />
              ))}
            </SectionList>
          </section>

          <section aria-labelledby="isms-massnahmen">
            <h2 id="isms-massnahmen">Maßnahmen</h2>
            <p className="tw-muted">
              Was getan wird und worauf es wirkt: Eine Maßnahme behebt eine Schwachstelle oder
              mindert ein Szenario bzw. Risiko.
            </p>
            <SectionList
              isEmpty={view.measures.length === 0}
              emptyText="Für diesen Mandanten sind im Datenbestand keine Maßnahmen modelliert."
            >
              {view.measures.map((measure) => (
                <MeasureCard key={measure.measure.object_id} view={measure} tenantId={tenantId} />
              ))}
            </SectionList>
          </section>

          <section aria-labelledby="isms-nachweise">
            <h2 id="isms-nachweise">Nachweise</h2>
            <p className="tw-muted">
              Nachweise mit Status und belegtem Objekt – Evidenz statt Behauptung. Gezeigt werden
              hier Objekte vom Typ „Nachweis (Evidence)"; weitere Nachweisquellen – etwa ein
              Service-Deliverable – erscheinen an der jeweiligen Control-Karte.
            </p>
            <SectionList
              isEmpty={view.evidence.length === 0}
              emptyText="Für diesen Mandanten sind im Datenbestand keine Nachweise vom Typ Evidence modelliert."
            >
              {view.evidence.map((ev) => (
                <EvidenceCard key={ev.evidence.object_id} view={ev} tenantId={tenantId} />
              ))}
            </SectionList>
          </section>
        </>
      )}

      <AbgrenzungSection />

      {/* Seitenbausteine-Konvention (WP-020 Slice 3, Dok. 06 „Verbindliche Seitenbausteine"):
          ehrliche Benennung der Bausteine ohne Träger – auch im Leerzustand sichtbar, denn die
          Aussage betrifft die Seite, nicht den einzelnen Mandanten. */}
      <SeitenbausteineHinweis ort="isms" />
    </>
  );
}

/* -----------------------------------------------------------------------------
 * Aufmacher – die Antwort in einem Satz (WP-028 Slice 3, DR-0013 Nr. 1)
 * --------------------------------------------------------------------------- */

/**
 * Der belegte Bestand über der Falz. Alle Zahlen kommen aus `buildIsmsCoreView` – derselben
 * Ableitung wie die Karten darunter und wie der verdichtete Überblick (keine zweite Zählregel).
 */
function IsmsAufmacher({
  view,
  tenant,
}: {
  view: ReturnType<typeof buildIsmsCoreView>;
  tenant: DemoTenant;
}) {
  const gesamt =
    view.risks.length +
    view.scenarios.length +
    view.weaknesses.length +
    view.controls.length +
    view.measures.length +
    view.evidence.length;

  if (view.isEmpty) {
    return (
      <p className="tw-lead">
        Für <strong>{tenant.display_name}</strong> ist im Datenbestand kein ISMS-Kernobjekt erfasst
        – weder Risiken noch Controls, Maßnahmen oder Nachweise.
      </p>
    );
  }

  return (
    <p className="tw-lead">
      Für <strong>{tenant.display_name}</strong> {gesamt === 1 ? 'ist' : 'sind'}{' '}
      <strong>
        {gesamt} {gesamt === 1 ? 'ISMS-Kernobjekt' : 'ISMS-Kernobjekte'}
      </strong>{' '}
      erfasst: {anzahl(view.risks.length, 'Risiko', 'Risiken')},{' '}
      {anzahl(view.scenarios.length, 'Szenario', 'Szenarien')},{' '}
      {anzahl(view.weaknesses.length, 'Schwachstelle', 'Schwachstellen')},{' '}
      {anzahl(view.controls.length, 'Control', 'Controls')},{' '}
      {anzahl(view.measures.length, 'Maßnahme', 'Maßnahmen')} und{' '}
      {anzahl(view.evidence.length, 'Nachweis', 'Nachweise')}
      {view.context.recordedOn && view.context.recordedOnDisplay ? (
        <>
          , zuletzt im System erfasst am{' '}
          <time dateTime={view.context.recordedOn}>{view.context.recordedOnDisplay}</time>
        </>
      ) : null}
      .
    </p>
  );
}

/* -----------------------------------------------------------------------------
 * Ruhiger Abschluss: was diese Seite NICHT behauptet (DR-0013 „Lücke zuletzt")
 * --------------------------------------------------------------------------- */

/**
 * Die seitenweite Abgrenzung – verdichtet und nachgeordnet, aber inhaltlich vollständig.
 *
 * Hier stehen die drei Aussagen, die bis WP-028 als Absatzwand ÜBER der ersten Zahl standen:
 *  1. read-only Demo-Sicht aus dem synthetischen Datenbestand (keine operative Quelle),
 *  2. nur erfasste Stände – kein Scoring, keine Reifegrade, keine bewertete Einstufung
 *     (Abgrenzung Dok. 09/10; Formulierung seit dem WP-020-Review-Pass: „ohne Ampeln" wäre
 *     falsch, weil der Überblick regelbasierte Badges auf ERFASSTEN Lagen trägt),
 *  3. der seitenweite Lebenszyklus-Satz, WORTGLEICH mit `EntscheidungenContent` und
 *     `ObjectDetailView` (Dok. 08 08-D07, per Test erzwungen). Quellenbeleg zum Kantenstatus:
 *     Dok. 07, Abschnitt „Kanonische Beziehungstypen" (Nachweisbezug mit Zeitraum und
 *     Prüfstatus) – bleibt Kommentar, keine Kennung im Produkttext (DR-0013 Nr. 2).
 *
 * Die Rahmung geht durch die Verlagerung nicht verloren: jede Karte trägt ihren Stand weiterhin
 * AM WERT gerahmt (ControlCard: „Lebenszyklus-Stand aus dem Datenbestand – kein
 * Prüfergebnis"), und die Verteilungs-Kachel kennzeichnet urteilsklingende Stände am Wort.
 */
function AbgrenzungSection() {
  return (
    <section aria-labelledby="isms-abgrenzung">
      <h2 id="isms-abgrenzung">Was diese Seite nicht behauptet</h2>
      <p className="sv-edge-note">
        Gezeigt wird ausschließlich, was im Datenbestand erfasst ist: Stände, Beziehungen und
        Nachweise – aus demselben Datenmodell wie der digitale Zwilling. Es gibt hier keinen Score,
        keinen Reifegrad und keine bewertete Einstufung; Implementierungs- und Wirksamkeitsaussagen
        bleiben strikt getrennt. Lesen und Schreiben in operativen Quellsystemen findet nicht statt.
      </p>
      {/* `tw-muted` bleibt als Klasse erhalten: der Wortgleichheits-Wächter der drei Seiten
          sucht exakt `p.tw-muted` mit „Zum Verständnis:". */}
      <p className="tw-muted tw-seitenfuss">
        <strong>Zum Verständnis:</strong> Alle hier gezeigten Status-Angaben der Objekte sind
        Lebenszyklus-Stände aus dem Datenbestand – <strong>keine Prüfergebnisse</strong> und keine
        bewertete Wirksamkeit. Der „Status der Beziehung" ist dagegen ein Feld der Beziehung selbst
        und kann je nach Beziehungstyp auch einen Prüfstatus tragen: Ein Nachweisbezug kann etwa
        einen Zeitraum und einen Prüfstatus tragen.
      </p>
    </section>
  );
}

/**
 * Sektionsinhalt mit ehrlichem Leer-Hinweis (Code-Review MINOR-2, `.claude/rules/frontend.md`).
 * Greift, wenn ein Mandant zwar ISMS-Objekte hat, aber eine einzelne Klasse leer ist.
 */
function SectionList({
  isEmpty,
  emptyText,
  children,
}: {
  isEmpty: boolean;
  emptyText: string;
  children: ReactNode;
}) {
  if (isEmpty) {
    return (
      <p className="tw-empty" role="note">
        {emptyText}
      </p>
    );
  }
  return <ul className="sv-list">{children}</ul>;
}

/**
 * Ehrlicher Empty-State für Mandanten ohne ISMS-Kernobjekte (Finovia, MediCore,
 * Consulting Operator – Dok. 06 §17: Nutzen + nächster Schritt). Alle Aussagen sind aus dem
 * Seed abgeleitet (nicht hartkodiert), inkl. des Hinweises für Mandanten, die zwar Managed
 * Services, aber keine eigenen Risiken/Controls tragen (Consulting Operator).
 */
function EmptyIsms({ tenant }: { tenant: DemoTenant }) {
  const tenantHasServices = hasManagedServices(tenant.tenant_id);

  return (
    <div className="tw-empty" role="note">
      <h3>Keine ISMS-Kernobjekte für {tenant.display_name}</h3>
      {/* MANDANTENLOKAL. Hier stand bis 2026-07-23: „Die Risiko- und Control-Sicht ist derzeit für
          einen anderen Demo-Mandanten ausmodelliert." Das war eine Existenzaussage über einen
          FREMDEN Mandanten und damit eine Mandantengrenzverletzung (Dok. 07, Abschnitt
          „Mandantenfähigkeit, Rechte und Datenschutz" / P09): ein Nutzer ohne eigene Objekte erfuhr,
          dass ein anderer welche trägt. Gefunden in der Gegenprüfung zu WP-017, wo derselbe Defekt
          auf /entscheidungen behoben wurde — dieser hier bestand seit WP-013 unbemerkt.
          Der Leerzustand sagt jetzt ausschließlich etwas über DIESEN Mandanten. */}
      <p style={{ marginTop: 0 }}>
        Für <strong>{tenant.display_name}</strong> sind im aktuellen Datenbestand keine Risiken,
        Controls, Maßnahmen oder Nachweise modelliert. Der Ort bleibt erreichbar und zeigt hier
        ausschließlich, was für diesen Mandanten belegt ist.
      </p>
      {tenantHasServices ? (
        <p className="tw-muted">
          Hinweis: In diesem Mandanten sind Managed-Service-Objekte modelliert (siehe Ort{' '}
          <Link href="/services">Services</Link>). Eigene Risiken, Controls, Maßnahmen und Nachweise
          führt er hier nicht.
        </p>
      ) : null}
      <p className="tw-muted">
        Bewusst kein Platzhalter-Inhalt: hier erscheinen ausschließlich aus dem Datenbestand
        abgeleitete Objekte – keine erfundenen Risiken, Controls oder Bewertungen.
      </p>
      {/* Nächster Schritt im Empty-State (Dok. 06 §17). */}
      <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
        <Link className="tw-cta" href="/login">
          Mandant wechseln →
        </Link>
      </p>
    </div>
  );
}
