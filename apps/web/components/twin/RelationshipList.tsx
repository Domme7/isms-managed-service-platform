/**
 * Beziehungsliste als lesbare Kette (read-only, WP-004).
 *
 * Rendert je Beziehung: `Quell-display_name —Klartext-Typ→ Ziel-display_name`. Primär steht das
 * deutsche UI-Label mit kanonischer R-ID (z. B. „R07 · verarbeitet"); der technische snake_case-Typ
 * (`processes`) bleibt sekundär sichtbar (Dok. 06 „Klartext vor Fachsprache" – reine UI-Schicht).
 * Assertion-Art (Dok. 07 §9) und – falls vorhanden – der Vertrauensgrad qualitativ (nicht als
 * nackte Zahl). Quell-/Ziel-IDs sind bereits auf `display_name` aufgelöst (siehe lib/twin/data.ts).
 *
 * WP-014 Slice 2: BEIDE Endpunkte sind Links auf ihre Objekt-360-Detailseite (navigierbarer
 * Graph, Dok. 07 §10). `tenantId` stammt aus dem Routenparameter der Mandantenseite – dieselbe
 * Mandantengrenze, aus der die Beziehungen stammen. Ein nicht auflösbarer Endpunkt wird bewusst
 * NICHT verlinkt, sondern bleibt rohe ID (Fail-loud, keine behauptete Existenz).
 */
import Link from 'next/link';
import { confidenceQualitative, type ResolvedRelationship } from '../../lib/twin/data';
import { objectDetailHref } from '../../lib/twin/object-detail';

/** Ein Endpunkt der Kette: Link auf die Detailseite, sofern das Objekt aufgelöst werden konnte. */
function EndpointNode({
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
    return <span className="tw-rel-node">{name}</span>;
  }
  return (
    <Link className="tw-rel-node" href={objectDetailHref(tenantId, objectId)}>
      {name}
    </Link>
  );
}

export function RelationshipList({
  relationships,
  tenantId,
}: {
  relationships: readonly ResolvedRelationship[];
  tenantId: string;
}) {
  return (
    <ul className="tw-rel-list">
      {relationships.map((rel) => {
        const label = rel.relationship_type_label ?? rel.relationship_type;
        const primary = rel.relationship_type_id ? `${rel.relationship_type_id} · ${label}` : label;
        const confidence =
          typeof rel.confidence === 'number' ? confidenceQualitative(rel.confidence) : null;

        return (
          <li
            key={rel.relationship_id}
            className="tw-rel-item"
            aria-label={`${rel.source_name} ${label} ${rel.target_name}`}
          >
            <div className="tw-rel-line">
              <EndpointNode
                tenantId={tenantId}
                objectId={rel.source_id}
                name={rel.source_name}
                resolved={rel.source_resolved}
              />
              <span className="tw-rel-arrow" aria-hidden="true">
                —
              </span>
              <span className="tw-rel-type">{primary}</span>
              <span className="tw-rel-arrow" aria-hidden="true">
                →
              </span>
              <EndpointNode
                tenantId={tenantId}
                objectId={rel.target_id}
                name={rel.target_name}
                resolved={rel.target_resolved}
              />
            </div>
            <div className="tw-rel-meta">
              <span className="tw-rel-tech">Typ: {rel.relationship_type}</span> · Assertion-Art:{' '}
              {rel.assertion_kind}
              {confidence ? ` · Vertrauensgrad: ${confidence.display}` : ''}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
