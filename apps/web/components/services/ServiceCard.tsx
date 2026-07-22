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
 */
import { relationshipTypeId, relationshipTypeLabel } from '../../lib/twin/data';
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

/** Deutsches Klartext-Label des Zieltyps eines Wirkungsbeitrags (Typ sekundär). */
function contributionTargetLabel(targetType: string): string {
  if (targetType === 'Objective') return 'Ziel (Objective)';
  if (targetType === 'KPI') return 'Kennzahl (KPI)';
  return targetType;
}

function ComponentItems({
  items,
  detailsLabel,
}: {
  items: readonly ServiceComponentItem[];
  detailsLabel: string;
}) {
  return (
    <ul className="sv-items">
      {items.map((item) => (
        <li key={item.object_id}>
          <span className="sv-item-name">{item.name}</span>
          <span className="sv-item-meta"> · Status: {item.lifecycle_status}</span>
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

function ScopeItems({ items }: { items: readonly ServiceScopeItem[] }) {
  return (
    <ul className="sv-items">
      {items.map((item) => (
        <li key={item.object_id}>
          <span className="sv-item-name">{item.name}</span>
          <span className="sv-item-meta">
            {' '}
            · {item.object_type}
            {item.edge_status ? ` · ${item.edge_status}` : ''}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceCard({ view }: { view: ManagedServiceView }) {
  const { service, slas, deliverables, reviews, delivery_team_names, covered, required, contributions } =
    view;

  return (
    <li className="sv-card">
      <h3 className="tw-card-title">{service.display_name}</h3>
      <p className="tw-card-sub">
        Managed Service · Status: {service.lifecycle_status}
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
        <ComponentItems items={slas} detailsLabel="SLA-Details anzeigen" />
      ) : (
        <p className="sv-item-meta">Kein SLA im Demo-Datenbestand hinterlegt.</p>
      )}

      <h4>Deliverables (prüfbare Ergebnisse)</h4>
      {deliverables.length > 0 ? (
        <ComponentItems items={deliverables} detailsLabel="Deliverable-Details anzeigen" />
      ) : (
        <p className="sv-item-meta">Kein Deliverable im Demo-Datenbestand hinterlegt.</p>
      )}

      {reviews.length > 0 ? (
        <>
          <h4>Outcome Review</h4>
          <ComponentItems items={reviews} detailsLabel="Review-Details anzeigen" />
        </>
      ) : null}

      {covered.length > 0 ? (
        <>
          <h4>Im Serviceumfang (abgedeckte Risiken, Controls &amp; Nachweise)</h4>
          <p className="sv-edge-note">Beziehung: {edgeNote('covered_by')}</p>
          <ScopeItems items={covered} />
        </>
      ) : null}

      {required.length > 0 ? (
        <>
          <h4>Voraussetzungen</h4>
          <p className="sv-edge-note">Beziehung: {edgeNote('requires')}</p>
          <ScopeItems items={required} />
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
                <span className="sv-item-name">{c.target_name}</span>
                <span className="sv-item-meta">
                  {' '}
                  · {contributionTargetLabel(c.target_type)} · Herkunft der Aussage: {c.assertion_kind}
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
