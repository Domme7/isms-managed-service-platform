/**
 * Beziehungsliste als lesbare Kette (read-only, WP-004).
 *
 * Rendert je Beziehung: `Quell-display_name —Klartext-Typ→ Ziel-display_name`. Primär steht das
 * deutsche UI-Label mit kanonischer R-ID (z. B. „R07 · verarbeitet"); der technische snake_case-Typ
 * (`processes`) bleibt sekundär sichtbar (Dok. 06 „Klartext vor Fachsprache" – reine UI-Schicht).
 * Assertion-Art (Dok. 07 §9) und – falls vorhanden – der Vertrauensgrad qualitativ (nicht als
 * nackte Zahl). Quell-/Ziel-IDs sind bereits auf `display_name` aufgelöst (siehe lib/twin/data.ts).
 */
import { confidenceQualitative, type ResolvedRelationship } from '../../lib/twin/data';

export function RelationshipList({ relationships }: { relationships: readonly ResolvedRelationship[] }) {
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
              <span className="tw-rel-node">{rel.source_name}</span>
              <span className="tw-rel-arrow" aria-hidden="true">
                —
              </span>
              <span className="tw-rel-type">{primary}</span>
              <span className="tw-rel-arrow" aria-hidden="true">
                →
              </span>
              <span className="tw-rel-node">{rel.target_name}</span>
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
