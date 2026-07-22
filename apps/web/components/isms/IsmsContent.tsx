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
 * Heading-Hierarchie: h1 (Ort) > h2 (Sektion) > h3 (Karte) > h4 (Karteninhalt).
 */
import type { ReactNode } from 'react';
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import { buildIsmsCoreView, getIsmsCoreTenants, hasManagedServices } from '../../lib/isms/data';
import {
  ControlCard,
  EvidenceCard,
  MeasureCard,
  RiskCard,
  ScenarioCard,
  WeaknessCard,
} from './IsmsCards';

export function IsmsContent({ tenant }: { tenant: DemoTenant }) {
  const view = buildIsmsCoreView(tenant.tenant_id);
  // Mandant für alle Objekt-Links dieser Ansicht (WP-014 Slice 2): ausschließlich der AKTIVE
  // Mandant der Session-Simulation – derselbe, aus dem die Karten abgeleitet sind. Niemals
  // hartkodiert und niemals ein fremder Mandant (Dok. 07 §17/P09).
  const tenantId = tenant.tenant_id;

  return (
    <>
      <p className="tw-eyebrow">ISMS · Risk &amp; Control</p>
      <h1>ISMS</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation", S06). */}
      <p className="tw-question">
        Wie ist die Risiko- und Control-Lage von {tenant.display_name}?
      </p>

      <p className="tw-lead">
        Read-only Demo-Sicht auf den synthetischen ISMS-Kerngraphen des aktiven Mandanten:
        Risiken mit Herkunft, Controls mit Umsetzung und Nachweisen, Maßnahmen und Evidence –
        aus demselben Datenmodell wie der digitale Zwilling. Es werden nur belegte Seed-Stände
        gezeigt; Implementierungs- und Wirksamkeitsaussagen bleiben strikt getrennt, ohne
        Scoring, Ampeln oder Reifegrade.
      </p>
      {/* UX-Review MAJOR-1 (seitenweite Rahmung): jede sichtbare Status-Angabe ist ein
          Lebenszyklus-Stand des Objekts, kein Prüf-/Auditergebnis – gilt auch für Status in
          Verweis-Zeilen, nicht nur an den Kartenköpfen. */}
      <p className="tw-muted">
        <strong>Zum Verständnis:</strong> Alle hier gezeigten Status-Angaben sind
        Lebenszyklus-Stände der Objekte aus dem Demo-Datenbestand – <strong>keine
        Prüfergebnisse</strong> und keine bewertete Wirksamkeit.
      </p>

      {view.isEmpty ? (
        <section aria-labelledby="isms-empty">
          <h2 id="isms-empty">Risiko- und Control-Lage</h2>
          <EmptyIsms tenant={tenant} />
        </section>
      ) : (
        <>
          <section aria-labelledby="isms-risiken">
            <h2 id="isms-risiken">Risiken</h2>
            <p className="tw-muted">
              Risiko, Szenario-Herkunft und Schwachstellen-Ursprung als Klartext – ohne Score oder
              Ampel (eine Bewertungslogik entsteht in einer späteren Phase). <strong>Datenlücke:</strong>{' '}
              Szenario, Schwachstelle und Risiko sind im aktuellen Datenmodell nicht direkt
              miteinander verknüpft – ein Zusammenhang wird hier bewusst nicht behauptet.
            </p>
            <SectionList
              isEmpty={view.risks.length + view.scenarios.length + view.weaknesses.length === 0}
              emptyText="Für diesen Mandanten sind im Demo-Datenbestand keine Risiken, Szenarien oder Schwachstellen modelliert."
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
              emptyText="Für diesen Mandanten sind im Demo-Datenbestand keine Controls modelliert."
            >
              {view.controls.map((control) => (
                <ControlCard key={control.control.object_id} view={control} tenantId={tenantId} />
              ))}
            </SectionList>
          </section>

          <section aria-labelledby="isms-massnahmen">
            <h2 id="isms-massnahmen">Maßnahmen</h2>
            <p className="tw-muted">
              Was getan wird und worauf es wirkt: eine Maßnahme behebt eine Schwachstelle
              (remediates) oder mindert ein Szenario/Risiko (mitigates).
            </p>
            <SectionList
              isEmpty={view.measures.length === 0}
              emptyText="Für diesen Mandanten sind im Demo-Datenbestand keine Maßnahmen modelliert."
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
              emptyText="Für diesen Mandanten sind im Demo-Datenbestand keine Nachweise vom Typ Evidence modelliert."
            >
              {view.evidence.map((ev) => (
                <EvidenceCard key={ev.evidence.object_id} view={ev} tenantId={tenantId} />
              ))}
            </SectionList>
          </section>
        </>
      )}
    </>
  );
}

/**
 * Sektionsinhalt mit ehrlichem Leer-Hinweis (Code-Review MINOR-2, `.claude/rules/frontend.md`).
 * Greift, wenn ein Mandant zwar ISMS-Objekte hat, aber eine einzelne Klasse leer ist.
 */
function SectionList({ isEmpty, emptyText, children }: { isEmpty: boolean; emptyText: string; children: ReactNode }) {
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
  const modeled = getIsmsCoreTenants();
  const tenantHasServices = hasManagedServices(tenant.tenant_id);

  return (
    <div className="tw-empty" role="note">
      <h3>Keine ISMS-Kernobjekte für {tenant.display_name}</h3>
      <p style={{ marginTop: 0 }}>
        Für <strong>{tenant.display_name}</strong> sind im aktuellen Demo-Datenbestand keine Risiken,
        Controls, Maßnahmen oder Nachweise modelliert.{' '}
        {modeled.length > 0
          ? `Die Risiko- und Control-Sicht ist derzeit für ${modeled.length === 1 ? 'einen anderen Demo-Mandanten' : `${modeled.length} andere Demo-Mandanten`} ausmodelliert; weitere folgen in späteren Ausbaustufen.`
          : 'Im aktuellen Demo-Datenbestand ist noch kein Mandant mit ISMS-Kernobjekten modelliert.'}
      </p>
      {tenantHasServices ? (
        <p className="tw-muted">
          Hinweis: In diesem Mandanten sind Managed-Service-Objekte modelliert (siehe Ort{' '}
          <Link href="/services">Services</Link>). Eigene Risiken, Controls, Maßnahmen und
          Nachweise führt er hier nicht.
        </p>
      ) : null}
      <p className="tw-muted">
        Bewusst kein Platzhalter-Inhalt: hier erscheinen ausschließlich aus dem Demo-Datenbestand
        abgeleitete Objekte – keine erfundenen Risiken, Controls oder Bewertungen.
      </p>
      {/* Nächster Schritt im Empty-State (Dok. 06 §17). */}
      <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
        <Link className="tw-cta" href="/login">
          Mandant wechseln (Anmelde-Simulation) →
        </Link>
      </p>
    </div>
  );
}
