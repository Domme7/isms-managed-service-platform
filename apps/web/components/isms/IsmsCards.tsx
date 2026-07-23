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
 *
 * WP-014 Slice 2: Kartenkopf und jedes verknüpfte Objekt verlinken auf die Objekt-360-Seite
 * (`/twin/<tenantId>/objekt/<objectId>`). Der `tenantId` ist der AKTIVE Mandant der
 * Session-Simulation (WP-011) – derselbe Mandant, aus dem die Karten abgeleitet sind; er wird
 * von `IsmsContent` durchgereicht und niemals hartkodiert (Dok. 07 §17/P09).
 */
import Link from 'next/link';
import { objectTypeDisplay, relationshipTypeLabel } from '../../lib/twin/data';
// `lib/twin/routes.ts` ist seed-frei und wird hier präventiv genutzt: diese Datei landet über
// `IsmsView` im Client-Bundle. Ein Schutz ist das heute NICHT – der DEMO_SEED liegt über
// `lib/twin/data.ts` bzw. `lib/isms/data.ts` ohnehin im Client-Graphen (offene Frage
// O-WP014-09); die Auslagerung vermeidet lediglich eine weitere Seed-Kante.
import { objectDetailHref } from '../../lib/twin/routes';
import type {
  ControlView,
  EvidenceView,
  IsmsLink,
  MeasureView,
  RiskView,
  ScenarioView,
  WeaknessView,
} from '../../lib/isms/data';

/**
 * Beziehungsbezeichnung in Domänensprache (WP-028: kein internes Vokabular im UI, DR-0013).
 * Nur das deutsche Klartext-Label; die kanonische R-Kennung und der snake_case-Typ bleiben im
 * Datenmodell/Contract, erscheinen aber nicht mehr im gerenderten Text. Fallback auf den
 * technischen Namen nur, falls (im Seed nicht vorkommend) kein Label hinterlegt ist.
 */
function edgeNote(type: string): string {
  return relationshipTypeLabel(type) ?? type;
}

/**
 * Sekundäre Meta-Zeile eines verknüpften Objekts – Status immer als Text.
 * Klartext vor Fachsprache (UX-Review MINOR-5): „Herkunft der Aussage" statt „Assertion-Art".
 *
 * Wortlaut identisch zur Objekt-360-Seite (`ObjectDetailView`, Review-Fix): „Lebenszyklus-Stand"
 * für den Objektstand und „Status der Beziehung" für den wertoffenen Kantenstatus. Der Kartenkopf
 * verlinkt direkt dorthin – dieselbe Datenlage darf einen Klick entfernt nicht anders heißen.
 */
function linkMeta(link: IsmsLink): string {
  const parts = [link.object_type];
  if (link.lifecycle_status) parts.push(`Lebenszyklus-Stand: ${link.lifecycle_status}`);
  if (link.edge_status) parts.push(`Status der Beziehung: ${link.edge_status}`);
  parts.push(`Herkunft der Aussage: ${link.assertion_kind}`);
  if (link.confidence_display) parts.push(`Vertrauensgrad: ${link.confidence_display}`);
  return ` · ${parts.join(' · ')}`;
}

/** Kartenkopf: Objektname als Link auf die Objekt-360-Detailseite (WP-014 Slice 2). */
function CardTitle({
  tenantId,
  objectId,
  name,
}: {
  tenantId: string;
  objectId: string;
  name: string;
}) {
  return (
    <h3 className="tw-card-title">
      <Link href={objectDetailHref(tenantId, objectId)}>{name}</Link>
    </h3>
  );
}

/**
 * Name eines verknüpften Objekts als Link auf seine Detailseite. Ein im Mandanten nicht
 * auflösbarer Verweis bleibt bewusst reiner Text (rohe ID) – ein Link würde eine Existenz
 * behaupten, die nicht belegt ist (Fail-loud, Muster `ObjectDetailView`).
 */
function LinkName({ link, tenantId }: { link: IsmsLink; tenantId: string }) {
  if (!link.resolved) {
    return <span className="sv-item-name">{link.name}</span>;
  }
  return (
    <Link className="sv-item-name" href={objectDetailHref(tenantId, link.object_id)}>
      {link.name}
    </Link>
  );
}

/** Liste verknüpfter Objekte (eine Kantenart) mit ehrlichem Leer-Hinweis. */
function LinkItems({
  links,
  emptyText,
  tenantId,
}: {
  links: readonly IsmsLink[];
  emptyText: string;
  tenantId: string;
}) {
  if (links.length === 0) {
    return <p className="sv-item-meta">{emptyText}</p>;
  }
  return (
    <ul className="sv-items">
      {links.map((link) => (
        <li key={link.relationship_id}>
          <LinkName link={link} tenantId={tenantId} />
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
      <span className="sv-tech">(Hinweis aus dem Datenbestand)</span>
    </p>
  );
}

/* -----------------------------------------------------------------------------
 * Risiken-Sektion: Risk, Risikoszenario (Herkunft), Schwachstelle (Ursprung)
 * --------------------------------------------------------------------------- */

export function RiskCard({ view, tenantId }: { view: RiskView; tenantId: string }) {
  return (
    <li className="sv-card">
      <CardTitle tenantId={tenantId} objectId={view.risk.object_id} name={view.risk.name} />
      <p className="tw-card-sub">{`${objectTypeDisplay('Risk')} · Lebenszyklus-Stand: ${view.risk.lifecycle_status}`}</p>
      <DescriptionDetails text={view.risk.description} label={view.risk.name} />

      <h4>Betrifft (Wirkung)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('affects')}</p>
      <LinkItems
        links={view.affects}
        tenantId={tenantId}
        emptyText="Keine solche Beziehung im Datenbestand erfasst."
      />

      <h4>Wird gemindert durch</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('mitigates')}</p>
      <LinkItems
        links={view.mitigated_by}
        tenantId={tenantId}
        emptyText="Keine mindernde Beziehung im Datenbestand erfasst."
      />

      <CoveredNote names={view.covered_by_services} />
    </li>
  );
}

export function ScenarioCard({ view, tenantId }: { view: ScenarioView; tenantId: string }) {
  return (
    <li className="sv-card">
      <CardTitle tenantId={tenantId} objectId={view.scenario.object_id} name={view.scenario.name} />
      <p className="tw-card-sub">{`${objectTypeDisplay('Risk Scenario')} · Lebenszyklus-Stand: ${view.scenario.lifecycle_status}`}</p>
      <DescriptionDetails text={view.scenario.description} label={view.scenario.name} />

      <h4>Herkunft: Bedrohung</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('threatens')}</p>
      {view.threatened_by.length > 0 ? (
        <ul className="sv-items">
          {view.threatened_by.map((link) => (
            <li key={link.relationship_id}>
              <LinkName link={link} tenantId={tenantId} />
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
        <p className="sv-item-meta">Keine Bedrohungs-Beziehung im Datenbestand erfasst.</p>
      )}

      <h4>Wird gemindert durch</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('mitigates')}</p>
      <LinkItems
        links={view.mitigated_by}
        tenantId={tenantId}
        emptyText="Keine mindernde Beziehung im Datenbestand erfasst."
      />
    </li>
  );
}

export function WeaknessCard({ view, tenantId }: { view: WeaknessView; tenantId: string }) {
  return (
    <li className="sv-card">
      <CardTitle tenantId={tenantId} objectId={view.weakness.object_id} name={view.weakness.name} />
      <p className="tw-card-sub">{`${objectTypeDisplay('Weakness')} · Lebenszyklus-Stand: ${view.weakness.lifecycle_status}`}</p>
      <DescriptionDetails text={view.weakness.description} label={view.weakness.name} />

      <h4>Exponiert (betroffener Informationswert)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('exposes')}</p>
      <LinkItems
        links={view.exposes}
        tenantId={tenantId}
        emptyText="Keine Expositions-Beziehung im Datenbestand erfasst."
      />

      <h4>Wird behoben durch</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('remediates')}</p>
      <LinkItems
        links={view.remediated_by}
        tenantId={tenantId}
        emptyText="Keine behebende Beziehung im Datenbestand erfasst."
      />
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * Controls-Sektion
 * --------------------------------------------------------------------------- */

export function ControlCard({ view, tenantId }: { view: ControlView; tenantId: string }) {
  return (
    <li className="sv-card">
      <CardTitle tenantId={tenantId} objectId={view.control.object_id} name={view.control.name} />
      {/* UX-Review MAJOR-1: „wirksam" ist ein Lebenszyklus-Stand (Dok. 05 §7), KEIN Prüfergebnis.
          Ohne Rahmung liest ein Nicht-Experte das als erwiesene Wirksamkeit. Daher explizit
          benannt und eingeordnet (Dok. 08 §14.3/§27, Erklärbarkeit jedes sichtbaren Status). */}
      <p className="tw-card-sub">{`${objectTypeDisplay('Control')} · Lebenszyklus-Stand: ${view.control.lifecycle_status}`}</p>
      <p className="sv-edge-note">
        Lebenszyklus-Stand aus dem Datenbestand – <strong>kein Prüfergebnis</strong>. Design- und
        Betriebswirksamkeit werden in dieser Ansicht nicht bewertet; eine Wirksamkeitsprüfung
        (Control Test) ist im Datenbestand nicht modelliert.
      </p>
      <DescriptionDetails text={view.control.description} label={view.control.name} />

      <h4>Umsetzung (Control Implementation)</h4>
      <p className="sv-edge-note">
        Beziehung: {edgeNote('implements')} – Umsetzungsstand der Implementierung; „implementiert"
        ist <strong>kein</strong> Wirksamkeitsnachweis für das Control.
      </p>
      <LinkItems
        links={view.implementations}
        tenantId={tenantId}
        emptyText="Keine Umsetzung im Datenbestand verknüpft."
      />

      <h4>Erfüllte Anforderung (Requirement)</h4>
      <p className="sv-edge-note">
        Beziehung: {edgeNote('satisfies')}; Framework-Zuordnung: {edgeNote('part_of')}
      </p>
      {view.satisfies.length > 0 ? (
        <ul className="sv-items">
          {view.satisfies.map((link) => (
            <li key={link.relationship_id}>
              <LinkName link={link} tenantId={tenantId} />
              <span className="sv-item-meta">
                {linkMeta(link)}
                {link.framework_name ? ` · Framework: ${link.framework_name}` : ''}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sv-item-meta">Keine erfüllte Anforderung im Datenbestand verknüpft.</p>
      )}

      <h4>Nachweis-Stand (Evidence)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('evidences')}</p>
      <LinkItems
        links={view.evidenced_by}
        tenantId={tenantId}
        emptyText="Keine Nachweis-Beziehung im Datenbestand erfasst."
      />

      <h4>Mindert (Risikobezug)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('mitigates')}</p>
      <LinkItems
        links={view.mitigates}
        tenantId={tenantId}
        emptyText="Keine mindernde Beziehung im Datenbestand erfasst."
      />

      <CoveredNote names={view.covered_by_services} />
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * Maßnahmen-Sektion
 * --------------------------------------------------------------------------- */

export function MeasureCard({ view, tenantId }: { view: MeasureView; tenantId: string }) {
  return (
    <li className="sv-card">
      <CardTitle tenantId={tenantId} objectId={view.measure.object_id} name={view.measure.name} />
      <p className="tw-card-sub">{`${objectTypeDisplay('Measure')} · Lebenszyklus-Stand: ${view.measure.lifecycle_status}`}</p>
      <DescriptionDetails text={view.measure.description} label={view.measure.name} />

      <h4>Behebt (Schwachstelle/Finding)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('remediates')}</p>
      <LinkItems
        links={view.remediates}
        tenantId={tenantId}
        emptyText="Keine behebende Beziehung im Datenbestand erfasst."
      />

      <h4>Mindert (Szenario/Risiko)</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('mitigates')}</p>
      <LinkItems
        links={view.mitigates}
        tenantId={tenantId}
        emptyText="Keine mindernde Beziehung im Datenbestand erfasst."
      />
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * Nachweise-Sektion
 * --------------------------------------------------------------------------- */

export function EvidenceCard({ view, tenantId }: { view: EvidenceView; tenantId: string }) {
  return (
    <li className="sv-card">
      <CardTitle tenantId={tenantId} objectId={view.evidence.object_id} name={view.evidence.name} />
      <p className="tw-card-sub">{`${objectTypeDisplay('Evidence')} · Lebenszyklus-Stand: ${view.evidence.lifecycle_status}`}</p>
      <DescriptionDetails text={view.evidence.description} label={view.evidence.name} />

      <h4>Belegt</h4>
      <p className="sv-edge-note">Beziehung: {edgeNote('evidences')}</p>
      <LinkItems
        links={view.evidences}
        tenantId={tenantId}
        emptyText="Keine Nachweis-Beziehung im Datenbestand erfasst."
      />

      <CoveredNote names={view.covered_by_services} />
    </li>
  );
}
