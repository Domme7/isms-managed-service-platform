/**
 * Karte eines Managed Service (read-only, WP-012 Slice 2).
 *
 * Zeigt ausschließlich aufgelöste Seed-Inhalte: Name, Lifecycle-Status (immer als Text, nie
 * nur Farbe – Dok. 06 06-D11), Outcome-/Leistungsversprechen (description, Dok. 13 MS01),
 * SLA(s), Deliverables mit Status, Objekte im Serviceumfang, Voraussetzungen und
 * Wirkungsbeiträge mit qualitativem Vertrauensgrad (Dok. 06 P04).
 *
 * Klartext vor Fachsprache (Dok. 06 P03): deutsche Labels primär, der kanonische
 * Kantentyp bleibt sekundär sichtbar (wiederverwendet aus `lib/twin/data.ts`).
 * Lange SLA-/Deliverable-Texte öffnen sich per <details> (progressive Offenlegung, P06).
 *
 * Heading-Ebene: h3 (Service) > h4 (Kartenabschnitte).
 *
 * WP-014 Slice 2: Servicename und jedes verknüpfte Objekt (SLA, Deliverable, Review, Objekte im
 * Serviceumfang, Voraussetzungen, Ziel-/Kennzahlbezug) verlinken auf die Objekt-360-Seite
 * (`/twin/<tenantId>/objekt/<objectId>`). `tenantId` ist der AKTIVE Mandant der
 * Session-Simulation (WP-011), durchgereicht von `ServicesContent` – niemals hartkodiert und
 * niemals ein fremder Mandant (Dok. 07 §17/P09). Nicht auflösbare Endpunkte bleiben ohne Link.
 */
import Link from 'next/link';
import { objectTypeDisplay, relationshipTypeId, relationshipTypeLabel } from '../../lib/twin/data';
// `lib/twin/routes.ts` ist seed-frei und wird hier präventiv genutzt: diese Datei landet über
// `ServicesView` im Client-Bundle. Ein Schutz ist das heute NICHT – der DEMO_SEED liegt über
// `lib/twin/data.ts` bzw. `lib/services/data.ts` ohnehin im Client-Graphen (offene Frage
// O-WP014-09); die Auslagerung vermeidet lediglich eine weitere Seed-Kante.
import { objectDetailHref } from '../../lib/twin/routes';
import type {
  ManagedServiceView,
  ServiceComponentItem,
  ServiceScopeItem,
} from '../../lib/services/data';

/** „R22 · abgedeckt durch (covered_by)" – Klartext primär, technischer Typ sekundär. */
function edgeNote(type: string): string {
  const id = relationshipTypeId(type);
  const label = relationshipTypeLabel(type) ?? type;
  return `${id ? `${id} · ` : ''}${label} (${type})`;
}

/**
 * Deutsches Klartext-Label des Zieltyps eines Wirkungsbeitrags (Typ sekundär).
 * Die Glossen („Ziel (Objective)", „Kennzahl (KPI)") stehen seit dem Review-Fix in
 * `lib/twin/data.ts` – EINE Quelle für alle Ansichten; die Ausgabe bleibt unverändert.
 */
function contributionTargetLabel(targetType: string): string {
  return objectTypeDisplay(targetType);
}

/**
 * Objektname als Link auf seine Detailseite; ein nicht auflösbarer Endpunkt bleibt reiner Text
 * (rohe ID), damit kein Link eine unbelegte Existenz behauptet (Fail-loud).
 */
function ItemName({
  tenantId,
  objectId,
  name,
  resolved,
}: {
  tenantId: string;
  objectId: string;
  name: string;
  resolved: boolean;
}) {
  if (!resolved) {
    return <span className="sv-item-name">{name}</span>;
  }
  return (
    <Link className="sv-item-name" href={objectDetailHref(tenantId, objectId)}>
      {name}
    </Link>
  );
}

function ComponentItems({
  items,
  detailsLabel,
  tenantId,
}: {
  items: readonly ServiceComponentItem[];
  detailsLabel: string;
  tenantId: string;
}) {
  return (
    <ul className="sv-items">
      {items.map((item) => (
        <li key={item.object_id}>
          <ItemName
            tenantId={tenantId}
            objectId={item.object_id}
            name={item.name}
            resolved={item.resolved}
          />
          {/* „Lebenszyklus-Stand" statt „Status": derselbe Wortlaut wie auf der Objekt-360-Seite
              und in der ISMS-Ansicht – ein Lebenszyklus-Stand ist kein Prüfergebnis (Dok. 08 08-D07). */}
          <span className="sv-item-meta"> · Lebenszyklus-Stand: {item.lifecycle_status}</span>
          {item.description ? (
            <details className="sv-details">
              <summary>{detailsLabel}</summary>
              <p className="sv-desc">{item.description}</p>
            </details>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function ScopeItems({ items, tenantId }: { items: readonly ServiceScopeItem[]; tenantId: string }) {
  return (
    <ul className="sv-items">
      {items.map((item) => (
        <li key={item.object_id}>
          <ItemName
            tenantId={tenantId}
            objectId={item.object_id}
            name={item.name}
            resolved={item.resolved}
          />
          {/* Der Kantenstatus wird beschriftet: unbeschriftet las sich „· Voraussetzung erfüllt"
              wie ein Prüfergebnis, obwohl es ein Feld der Beziehung ist (Review-Fix WP-014). */}
          <span className="sv-item-meta">
            {' '}
            · {item.object_type}
            {item.edge_status ? ` · Status der Beziehung: ${item.edge_status}` : ''}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceCard({ view, tenantId }: { view: ManagedServiceView; tenantId: string }) {
  const {
    service,
    slas,
    deliverables,
    reviews,
    delivery_team_names,
    covered,
    required,
    contributions,
  } = view;

  return (
    <li className="sv-card">
      <h3 className="tw-card-title">
        <Link href={objectDetailHref(tenantId, service.object_id)}>{service.display_name}</Link>
      </h3>
      <p className="tw-card-sub">
        Managed Service · Lebenszyklus-Stand: {service.lifecycle_status}
        {delivery_team_names.length > 0 ? (
          <>
            {' '}
            · Delivery: {delivery_team_names.join(', ')}{' '}
            <span className="sv-tech">({edgeNote('delivered_by')})</span>
          </>
        ) : null}
      </p>

      <h4>Leistungsversprechen (Outcome)</h4>
      <p className="sv-desc">{service.description}</p>

      <h4>SLA – Leistungszusagen</h4>
      {slas.length > 0 ? (
        <ComponentItems items={slas} detailsLabel="SLA-Details anzeigen" tenantId={tenantId} />
      ) : (
        <p className="sv-item-meta">Kein SLA im Demo-Datenbestand hinterlegt.</p>
      )}

      <h4>Deliverables (prüfbare Ergebnisse)</h4>
      {deliverables.length > 0 ? (
        <ComponentItems
          items={deliverables}
          detailsLabel="Deliverable-Details anzeigen"
          tenantId={tenantId}
        />
      ) : (
        <p className="sv-item-meta">Kein Deliverable im Demo-Datenbestand hinterlegt.</p>
      )}

      {reviews.length > 0 ? (
        <>
          <h4>Outcome Review</h4>
          <ComponentItems
            items={reviews}
            detailsLabel="Review-Details anzeigen"
            tenantId={tenantId}
          />
        </>
      ) : null}

      {covered.length > 0 ? (
        <>
          <h4>Im Serviceumfang (abgedeckte Risiken, Controls &amp; Nachweise)</h4>
          <p className="sv-edge-note">Beziehung: {edgeNote('covered_by')}</p>
          <ScopeItems items={covered} tenantId={tenantId} />
        </>
      ) : null}

      {required.length > 0 ? (
        <>
          <h4>Voraussetzungen</h4>
          <p className="sv-edge-note">Beziehung: {edgeNote('requires')}</p>
          <ScopeItems items={required} tenantId={tenantId} />
        </>
      ) : null}

      {contributions.length > 0 ? (
        <>
          <h4>Wirkungsbeitrag (Ziele &amp; Kennzahlen)</h4>
          <p className="sv-edge-note">
            Beziehung: {edgeNote('contributes_to')} – begründeter Beitrag ohne Garantie
          </p>
          <ul className="sv-items">
            {contributions.map((c) => (
              <li key={c.relationship_id}>
                <ItemName
                  tenantId={tenantId}
                  objectId={c.target_id}
                  name={c.target_name}
                  resolved={c.target_resolved}
                />
                <span className="sv-item-meta">
                  {' '}
                  · {contributionTargetLabel(c.target_type)} · Herkunft der Aussage:{' '}
                  {c.assertion_kind}
                  {c.confidence_display ? ` · Vertrauensgrad: ${c.confidence_display}` : ''}
                </span>
                {c.effectiveness_assumption ? (
                  <span className="sv-item-note">{c.effectiveness_assumption}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </li>
  );
}
