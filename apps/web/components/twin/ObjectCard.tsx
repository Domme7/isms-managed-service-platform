/**
 * Objektkarte des Digital Twin Explorers (read-only, WP-004).
 *
 * Zeigt ausschließlich belegte Envelope-Felder: display_name, object_type, Familie(+Label),
 * lifecycle_status, classification (falls vorhanden) sowie die tatsächlich erfassten
 * Datenqualitäts-Dimensionen mit `confirmation_level`/`note` (Dok. 07 §12). Nichts wird
 * abgeleitet oder erfunden – nur was in `quality_state.dimensions` steht.
 *
 * Heading-Ebene: h4 (eine Ebene unter der Familien-Überschrift h3).
 */
import type { ObjectEnvelope } from '@isms/contracts';

export function ObjectCard({
  object,
  familyId,
  familyName,
}: {
  object: ObjectEnvelope;
  familyId: string;
  familyName: string;
}) {
  const { confidentiality, protection_need } = object.classification;
  const hasClassification = Boolean(confidentiality || protection_need);
  const dimensions = object.quality_state.dimensions;

  return (
    <li className="tw-card">
      <h4 className="tw-card-title">{object.display_name}</h4>
      <p className="tw-card-sub">{object.object_type}</p>

      <dl className="tw-meta">
        <dt>Familie</dt>
        <dd>
          {familyId} · {familyName}
        </dd>

        <dt>Lebenszyklus</dt>
        <dd>{object.lifecycle_status}</dd>

        {hasClassification ? (
          <>
            <dt>Klassifikation</dt>
            <dd>
              {[
                confidentiality ? `Vertraulichkeit: ${confidentiality}` : null,
                protection_need ? `Schutzbedarf: ${protection_need}` : null,
              ]
                .filter(Boolean)
                .join(' · ')}
            </dd>
          </>
        ) : null}
      </dl>

      <div className="tw-quality">
        <p className="tw-quality-title">Datenqualität</p>
        {dimensions.length > 0 ? (
          <ul className="tw-quality-list">
            {dimensions.map((dim, index) => (
              <li key={`${dim.dimension}-${index}`}>
                <span className="tw-quality-dim">{dim.dimension}</span>
                {dim.confirmation_level ? <>: {dim.confirmation_level}</> : null}
                {dim.note ? <span className="tw-quality-note">{dim.note}</span> : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="tw-quality-empty">keine Dimension erfasst</p>
        )}
      </div>

      {object.description ? <p className="tw-card-desc">{object.description}</p> : null}
    </li>
  );
}
