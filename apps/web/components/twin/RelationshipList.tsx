/**
 * Beziehungsliste als lesbare Kette (read-only, WP-004).
 *
 * Rendert je Beziehung: `Quell-display_name —Klartext-Typ→ Ziel-display_name`. Sichtbar ist
 * ausschließlich das deutsche Klartext-Label (z. B. „verarbeitet"); die kanonische R-Kennung und
 * der technische snake_case-Typ bleiben im Datenmodell, erscheinen aber seit WP-028 (DR-0013:
 * kein internes Vokabular im UI) nicht mehr im gerenderten Text. Dazu die Herkunft der Aussage
 * und – falls vorhanden – der Vertrauensgrad qualitativ (nicht als nackte Zahl). Quell-/Ziel-IDs
 * sind bereits auf `display_name` aufgelöst (siehe lib/twin/data.ts).
 *
 * WP-014 Slice 2: BEIDE Endpunkte sind Links auf ihre Objekt-360-Detailseite (navigierbarer
 * Graph, Dok. 07 §10). `tenantId` stammt aus dem Routenparameter der Mandantenseite – dieselbe
 * Mandantengrenze, aus der die Beziehungen stammen. Ein nicht auflösbarer Endpunkt wird bewusst
 * NICHT verlinkt, sondern bleibt rohe ID (Fail-loud, keine behauptete Existenz).
 */
import Link from 'next/link';
import { confidenceQualitative, type ResolvedRelationship } from '../../lib/twin/data';
import { objectDetailHref } from '../../lib/twin/routes';

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
        // Nur das deutsche Klartext-Label (WP-028, DR-0013): weder die R-Kennung noch der
        // snake_case-Typ erscheinen im gerenderten Text; beide bleiben im Datenmodell erhalten.
        const label = rel.relationship_type_label ?? rel.relationship_type;
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
              <span className="tw-rel-type">{label}</span>
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
              Herkunft der Aussage: {rel.assertion_kind}
              {confidence ? ` · Vertrauensgrad: ${confidence.display}` : ''}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
