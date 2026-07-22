/**
 * Karten der ISMS-Kern-Sicht (read-only, WP-013 Slice 1).
 *
 * Zeigt ausschließlich aufgelöste Seed-Inhalte: Name, Lifecycle-Status (immer als Text, nie
 * nur Farbe – Dok. 06 06-D11) und die tatsächlichen Kanten als Klartext-Kette. Deutsche
 * Beziehungslabels primär, der kanonische Kantentyp bleibt sekundär sichtbar
 * (wiederverwendet aus `lib/twin/data.ts`; Muster `components/services/ServiceCard`).
 *
 * GETRENNTE STÄNDE (08-D07/08-D20): Der Control-Status (z. B. „wirksam") steht an der
 * Control-Karte, der Implementierungsstatus (z. B. „implementiert") an der jeweiligen
 * Control Implementation – beide werden nie vermischt oder verrechnet. KEIN Scoring,
 * KEINE Ampeln, KEINE Reifegrade (Abgrenzung Dok. 09/10).
 *
 * Beschreibungen öffnen sich per <details> (progressive Offenlegung, Dok. 06 P06).
 * Heading-Ebene: h3 (Karte) > h4 (Kartenabschnitte).
 */
import { relationshipTypeId, relationshipTypeLabel } from '../../lib/twin/data';
import type {
  ControlView,
  EvidenceView,
  IsmsLink,
  MeasureView,
  RiskView,
  ScenarioView,
  WeaknessView,
} from '../../lib/isms/data';

/** „R10 · betrifft (affects)" – Klartext primär, technischer Typ sekundär. */
function edgeNote(type: string): string {
  const id = relationshipTypeId(type);
  const label = relationshipTypeLabel(type) ?? type;
  return `${id ? `${id} · ` : ''}${label} (${type})`;
}

/**
 * Sekundäre Meta-Zeile eines verknüpften Objekts – Status immer als Text.
 * Klartext vor Fachsprache (UX-Review MINOR-5): „Herkunft der Aussage" statt „Assertion-Art",
 * „Prüfstand der Beziehung" statt „Kantenstatus".
 */
function linkMeta(link: IsmsLink): string {
  const parts = [link.object_type];
  if (link.lifecycle_status) parts.push(`Status: ${link.lifecycle_status}`);
  if (link.edge_status) parts.push(`Prüfstand der Beziehung: ${link.edge_status}`);
  parts.push(`Herkunft der Aussage: ${link.assertion_kind}`);
  if (link.confidence_display) parts.push(`Vertrauensgrad: ${link.confidence_display}`);
  return ` · ${parts.join(' · ')}`;
}

/** Liste verknüpfter Objekte (eine Kantenart) mit ehrlichem Leer-Hinweis. */
function LinkItems({ links, emptyText }: { links: readonly IsmsLink[]; emptyText: string }) {
  if (links.length === 0) {
    return <p className="sv-item-meta">{emptyText}</p>;
  }
  return (
    <ul className="sv-items">
      {links.map((link) => (
        <li key={link.relationship_id}>
          <span className="sv-item-name">{link.name}</span>
          <span className="sv-item-meta">{linkMeta(link)}</span>
          {link.effectiveness_assumption ? (
            /* UX-Review MINOR-1: Annahme klar als Annahme kennzeichnen, nicht als belegte Wirkung. */
            <span className="sv-item-note">
              Wirkungsannahme (nicht nachgewiesen): {link.effectiveness_assumption}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * Objektbeschreibung hinter <details> (lange Texte nicht aufdrängen, Dok. 06 P06).
 * A11y (Reviews MINOR-8/NIT-1): der Objektname steht visuell versteckt im Summary, damit
 * Screenreader-Nutzer die sonst namensgleichen Bedienelemente unterscheiden können.
 */
function DescriptionDetails({ text, label }: { text: string; label: string }) {
  if (!text) return null;
  return (
    <details className="sv-details">
      <summary>
        Beschreibung anzeigen<span className="shell-visually-hidden">: {label}</span>
      </summary>
      <p className="sv-desc">{text}</p>
    </details>
  );
}

/**
 * Optionaler Service-Hinweis (R22 covered_by) – reine Anzeige belegter Seed-Kanten,
 * bewusst OHNE Empfehlung, Angebot oder Preis (Dok. 13 MS15; WP-013 „kein Upselling").
 */
function CoveredNote({ names }: { names: readonly string[] }) {
  if (names.length === 0) return null;
  return (
    <p className="sv-edge-note">
      Im Serviceumfang von: {names.join(', ')}{' '}
      <span className="sv-tech">({edgeNote('covered_by')} – Hinweis aus dem Demo-Datenbestand)</span>
    </p>
  );
}

/* -----------------------------------------------------------------------------
 * Risiken-Sektion: Risk, Risikoszenario (Herkunft), Schwachstelle (Ursprung)
 * --------------------------------------------------------------------------- */

export function RiskCard({ view }: { view: RiskView }) {
  return (
    <li className="sv-card">
      <h3 className="tw-card-title">{view.risk.name}</h3>
      <p className="tw-card-sub">{`Risiko (Risk) · Status: ${view.risk.lifecycle_status}`}</p>
      <DescriptionDetails text={view.risk.description} label={view.risk.name} />

      <h4>Betrifft (Wirkung)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('affects')}</p>
      <LinkItems links={view.affects} emptyText="Keine affects-Beziehung im Demo-Datenbestand." />

      <h4>Wird gemindert durch</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('mitigates')}</p>
      <LinkItems links={view.mitigated_by} emptyText="Keine mitigates-Beziehung im Demo-Datenbestand." />

      <CoveredNote names={view.covered_by_services} />
    </li>
  );
}

export function ScenarioCard({ view }: { view: ScenarioView }) {
  return (
    <li className="sv-card">
      <h3 className="tw-card-title">{view.scenario.name}</h3>
      <p className="tw-card-sub">{`Risikoszenario (Risk Scenario) · Status: ${view.scenario.lifecycle_status}`}</p>
      <DescriptionDetails text={view.scenario.description} label={view.scenario.name} />

      <h4>Herkunft: Bedrohung</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('threatens')}</p>
      {view.threatened_by.length > 0 ? (
        <ul className="sv-items">
          {view.threatened_by.map((link) => (
            <li key={link.relationship_id}>
              <span className="sv-item-name">{link.name}</span>
              <span className="sv-item-meta">{linkMeta(link)}</span>
              {link.also_threatens.length > 0 ? (
                <span className="sv-item-note">
                  bedroht außerdem: {link.also_threatens.join(', ')}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="sv-item-meta">Keine threatens-Beziehung im Demo-Datenbestand.</p>
      )}

      <h4>Wird gemindert durch</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('mitigates')}</p>
      <LinkItems links={view.mitigated_by} emptyText="Keine mitigates-Beziehung im Demo-Datenbestand." />
    </li>
  );
}

export function WeaknessCard({ view }: { view: WeaknessView }) {
  return (
    <li className="sv-card">
      <h3 className="tw-card-title">{view.weakness.name}</h3>
      <p className="tw-card-sub">{`Schwachstelle (Weakness) · Status: ${view.weakness.lifecycle_status}`}</p>
      <DescriptionDetails text={view.weakness.description} label={view.weakness.name} />

      <h4>Exponiert (betroffener Informationswert)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('exposes')}</p>
      <LinkItems links={view.exposes} emptyText="Keine exposes-Beziehung im Demo-Datenbestand." />

      <h4>Wird behoben durch</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('remediates')}</p>
      <LinkItems links={view.remediated_by} emptyText="Keine remediates-Beziehung im Demo-Datenbestand." />
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * Controls-Sektion
 * --------------------------------------------------------------------------- */

export function ControlCard({ view }: { view: ControlView }) {
  return (
    <li className="sv-card">
      <h3 className="tw-card-title">{view.control.name}</h3>
      {/* UX-Review MAJOR-1: „wirksam" ist ein Lebenszyklus-Stand (Dok. 05 §7), KEIN Prüfergebnis.
          Ohne Rahmung liest ein Nicht-Experte das als erwiesene Wirksamkeit. Daher explizit
          benannt und eingeordnet (Dok. 08 §14.3/§27, Erklärbarkeit jedes sichtbaren Status). */}
      <p className="tw-card-sub">{`Control · Lebenszyklus-Stand: ${view.control.lifecycle_status}`}</p>
      <p className="sv-edge-note">
        Lebenszyklus-Stand aus dem Demo-Datenbestand – <strong>kein Prüfergebnis</strong>. Design-
        und Betriebswirksamkeit werden in dieser Ansicht nicht bewertet; eine Wirksamkeitsprüfung
        (Control Test) ist im Demo-Datenbestand nicht modelliert.
      </p>
      <DescriptionDetails text={view.control.description} label={view.control.name} />

      <h4>Umsetzung (Control Implementation)</h4>
      <p className="sv-edge-note">
        Beziehung: {edgeNote('implements')} – Umsetzungsstand der Implementierung; „implementiert"
        ist <strong>kein</strong> Wirksamkeitsnachweis für das Control.
      </p>
      <LinkItems links={view.implementations} emptyText="Keine Umsetzung im Demo-Datenbestand verknüpft." />

      <h4>Erfüllte Anforderung (Requirement)</h4>
      <p className="sv-edge-note">
        Beziehung: {edgeNote('satisfies')}; Framework-Zuordnung: {edgeNote('part_of')}
      </p>
      {view.satisfies.length > 0 ? (
        <ul className="sv-items">
          {view.satisfies.map((link) => (
            <li key={link.relationship_id}>
              <span className="sv-item-name">{link.name}</span>
              <span className="sv-item-meta">
                {linkMeta(link)}
                {link.framework_name ? ` · Framework: ${link.framework_name}` : ''}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sv-item-meta">Keine satisfies-Kante im Demo-Seed.</p>
      )}

      <h4>Nachweis-Stand (Evidence)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('evidences')}</p>
      <LinkItems links={view.evidenced_by} emptyText="Keine evidences-Beziehung im Demo-Datenbestand." />

      <h4>Mindert (Risikobezug)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('mitigates')}</p>
      <LinkItems links={view.mitigates} emptyText="Keine mitigates-Beziehung im Demo-Datenbestand." />

      <CoveredNote names={view.covered_by_services} />
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * Maßnahmen-Sektion
 * --------------------------------------------------------------------------- */

export function MeasureCard({ view }: { view: MeasureView }) {
  return (
    <li className="sv-card">
      <h3 className="tw-card-title">{view.measure.name}</h3>
      <p className="tw-card-sub">{`Maßnahme (Measure) · Status: ${view.measure.lifecycle_status}`}</p>
      <DescriptionDetails text={view.measure.description} label={view.measure.name} />

      <h4>Behebt (Schwachstelle/Finding)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('remediates')}</p>
      <LinkItems links={view.remediates} emptyText="Keine remediates-Beziehung im Demo-Datenbestand." />

      <h4>Mindert (Szenario/Risiko)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('mitigates')}</p>
      <LinkItems links={view.mitigates} emptyText="Keine mitigates-Beziehung im Demo-Datenbestand." />
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * Nachweise-Sektion
 * --------------------------------------------------------------------------- */

export function EvidenceCard({ view }: { view: EvidenceView }) {
  return (
    <li className="sv-card">
      <h3 className="tw-card-title">{view.evidence.name}</h3>
      <p className="tw-card-sub">{`Nachweis (Evidence) · Status: ${view.evidence.lifecycle_status}`}</p>
      <DescriptionDetails text={view.evidence.description} label={view.evidence.name} />

      <h4>Belegt</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('evidences')}</p>
      <LinkItems links={view.evidences} emptyText="Keine evidences-Beziehung im Demo-Datenbestand." />

      <CoveredNote names={view.covered_by_services} />
    </li>
  );
}
