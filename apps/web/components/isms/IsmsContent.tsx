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
        gezeigt; Implementierungs- und Wirksamkeitsaussagen bleiben getrennt (08-D07), ohne
        Scoring, Ampeln oder Reifegrade.
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
              Risiko, Szenario-Herkunft und Schwachstellen-Ursprung als Klartext-Kette aus dem
              Demo-Seed – ohne Score oder Ampel (Bewertungslogik folgt später, Dok. 09).
            </p>
            <ul className="sv-list">
              {view.risks.map((risk) => (
                <RiskCard key={risk.risk.object_id} view={risk} />
              ))}
              {view.scenarios.map((scenario) => (
                <ScenarioCard key={scenario.scenario.object_id} view={scenario} />
              ))}
              {view.weaknesses.map((weakness) => (
                <WeaknessCard key={weakness.weakness.object_id} view={weakness} />
              ))}
            </ul>
          </section>

          <section aria-labelledby="isms-controls">
            <h2 id="isms-controls">Controls</h2>
            <p className="tw-muted">
              Control-Stand, Umsetzung, erfüllte Anforderung und Nachweis-Stand – der Status des
              Controls (z. B. „wirksam") und der Status seiner Implementierung (z. B.
              „implementiert") werden getrennt ausgewiesen und nie verrechnet (08-D07).
            </p>
            <ul className="sv-list">
              {view.controls.map((control) => (
                <ControlCard key={control.control.object_id} view={control} />
              ))}
            </ul>
          </section>

          <section aria-labelledby="isms-massnahmen">
            <h2 id="isms-massnahmen">Maßnahmen</h2>
            <p className="tw-muted">
              Was getan wird und worauf es wirkt: eine Maßnahme behebt eine Schwachstelle
              (remediates) oder mindert ein Szenario/Risiko (mitigates).
            </p>
            <ul className="sv-list">
              {view.measures.map((measure) => (
                <MeasureCard key={measure.measure.object_id} view={measure} />
              ))}
            </ul>
          </section>

          <section aria-labelledby="isms-nachweise">
            <h2 id="isms-nachweise">Nachweise</h2>
            <p className="tw-muted">
              Nachweise mit Status und belegtem Objekt – Evidenz statt Behauptung (Dok. 08 P08):
              gezeigt wird nur, was eine evidences-Kante im Seed trägt.
            </p>
            <ul className="sv-list">
              {view.evidence.map((ev) => (
                <EvidenceCard key={ev.evidence.object_id} view={ev} />
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}

/** Verbindet Namen deutsch: „A", „A und B", „A, B und C". */
function joinDe(names: readonly string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')} und ${names[names.length - 1]}`;
}

/**
 * Ehrlicher Empty-State für Mandanten ohne ISMS-Kernobjekte (Finovia, MediCore,
 * Consulting Operator – Dok. 06 §17: Nutzen + nächster Schritt). Alle Aussagen sind aus dem
 * Seed abgeleitet (nicht hartkodiert), inkl. des Hinweises für Mandanten, die zwar Managed
 * Services, aber keine eigenen Risiken/Controls tragen (Consulting Operator).
 */
function EmptyIsms({ tenant }: { tenant: DemoTenant }) {
  const modeled = getIsmsCoreTenants();
  const names = joinDe(modeled.map((t) => t.display_name));
  const tenantHasServices = hasManagedServices(tenant.tenant_id);

  return (
    <div className="tw-empty" role="note">
      <h3>Keine ISMS-Kernobjekte für {tenant.display_name}</h3>
      <p style={{ marginTop: 0 }}>
        Für <strong>{tenant.display_name}</strong> sind im aktuellen Demo-Seed keine Risiken,
        Controls, Maßnahmen oder Nachweise modelliert.{' '}
        {modeled.length > 0
          ? `Die Risiko- und Control-Sicht ist derzeit für ${names} ausmodelliert; weitere Mandanten folgen in späteren Ausbaustufen.`
          : 'Im aktuellen Demo-Seed ist noch kein Mandant mit ISMS-Kernobjekten modelliert.'}
      </p>
      {tenantHasServices ? (
        <p className="tw-muted">
          Hinweis: Für diesen Mandanten laufen Managed Services (siehe Ort{' '}
          <Link href="/services">Services</Link>) – der eigene ISMS-Kerngraph ist hier bewusst
          noch nicht modelliert.
        </p>
      ) : null}
      <p className="tw-muted">
        Bewusst kein Platzhalter-Inhalt: hier erscheinen ausschließlich aus dem Demo-Seed
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
