/**
 * Objekt-360-Detailseite (read-only, WP-014 Slice 1).
 *
 * Fünf klar benannte Abschnitte in der Reihenfolge der fünf Fragen der universellen
 * Seitenanatomie (Dok. 06 §6 / Dok. 07 §10). Gerendert wird ausschließlich, was das View-Modell
 * aus dem Demo-Seed ableitet – nichts ist hartkodiert, nichts erfunden (WP-014 Acceptance 2).
 *
 * Zustände (Dok. 06 §17): leere Kantenlisten erhalten einen erklärenden Empty-Text
 * („keine Kante dieses Typs im Demo-Seed"); Datenlücken werden als Partial data mit Quelle
 * benannt (fehlende Versionshistorie, nicht auflösbare Scope-Referenz, fehlender Nachweis).
 *
 * Heading-Hierarchie: h1 (Objektname) > h2 (je Frage) > h3 (Block innerhalb einer Frage).
 * Status steht immer als Text, nie nur als Farbe (Dok. 06 06-D11).
 *
 * NICHT enthalten (WP-014 Nicht-Ziele): Score, Reifegrad, verdichteter Vertrauensindikator,
 * Empfehlung, Handlungsvorschlag, Angebot, Graphvisualisierung, Schreibfunktion.
 */
import Link from 'next/link';
import type {
  NextObservation,
  ObjectDetailModel,
  ObjectEdge,
  ResolvedOwner,
  ResolvedScope,
} from '../../lib/twin/object-detail';
import { formatIsoDateDe, objectDetailHref } from '../../lib/twin/object-detail';
import { relationshipTypeId, relationshipTypeLabel } from '../../lib/twin/data';

/* -----------------------------------------------------------------------------
 * Kleine Formathelfer (Klartext vor Fachsprache, Dok. 06 P03/P04)
 * --------------------------------------------------------------------------- */

/** „R10 · betrifft (affects)" – Klartext primär, kanonischer Typ sekundär (Muster IsmsCards). */
function edgeNote(type: string): string {
  const id = relationshipTypeId(type);
  const label = relationshipTypeLabel(type) ?? type;
  return `${id ? `${id} · ` : ''}${label} (${type})`;
}

/** Datum als `<time>` mit exaktem Zeitstempel im `dateTime`-Attribut. */
function DateValue({ iso }: { iso: string }) {
  return <time dateTime={iso}>{formatIsoDateDe(iso)}</time>;
}

/* -----------------------------------------------------------------------------
 * Kantenliste (Frage 2 und Frage 3)
 * --------------------------------------------------------------------------- */

/**
 * Eine Kante mit allen von Dok. 07 §21 geforderten Angaben und einem Link auf die Detailseite
 * des Nachbarobjekts. Ist der Endpunkt im Mandanten nicht auflösbar, wird bewusst KEIN Link
 * gerendert, sondern die rohe ID mit Hinweis – ein Link würde eine Existenz behaupten, die
 * nicht belegt ist (Fail-loud statt stiller Lücke).
 */
function EdgeItem({ edge, tenantId }: { edge: ObjectEdge; tenantId: string }) {
  const label = edge.relationship_type_label ?? edge.relationship_type;
  const primary = edge.relationship_type_id ? `${edge.relationship_type_id} · ${label}` : label;

  const meta = [
    `Richtung: ${edge.orientation} (${edge.direction})`,
    `Objekttyp: ${edge.neighbor_type}`,
  ];
  if (edge.neighbor_lifecycle_status) meta.push(`Status: ${edge.neighbor_lifecycle_status}`);
  meta.push(`Herkunft der Aussage: ${edge.assertion_kind}`);
  if (edge.confidence_display) meta.push(`Vertrauensgrad: ${edge.confidence_display}`);
  if (edge.edge_status) meta.push(`Prüfstand der Beziehung: ${edge.edge_status}`);

  return (
    <li className="tw-rel-item">
      <div className="tw-rel-line">
        <span className="tw-rel-type">{primary}</span>
        <span className="tw-rel-arrow" aria-hidden="true">
          →
        </span>
        {edge.neighbor_resolved ? (
          <Link className="tw-rel-node" href={objectDetailHref(tenantId, edge.neighbor_id)}>
            {edge.neighbor_name}
          </Link>
        ) : (
          <span className="tw-rel-node">{edge.neighbor_name}</span>
        )}
        <span className="tw-rel-tech">({edge.relationship_type})</span>
      </div>
      <div className="tw-rel-meta">
        {meta.join(' · ')}
        <br />
        Fachlich gültig ab <DateValue iso={edge.valid_from} />
        {edge.valid_to ? (
          <>
            {' '}
            bis <DateValue iso={edge.valid_to} />
          </>
        ) : (
          ' (kein Enddatum erfasst)'
        )}
      </div>
      {!edge.neighbor_resolved ? (
        <p className="sv-item-note">
          Nachbarobjekt im Mandanten nicht auflösbar – angezeigt wird die rohe Kennung aus der
          Kante.
        </p>
      ) : null}
      {edge.effectiveness_assumption ? (
        /* Annahme klar als Annahme kennzeichnen, nicht als belegte Wirkung (Muster WP-013). */
        <p className="sv-item-note">
          Wirkungsannahme (nicht nachgewiesen): {edge.effectiveness_assumption}
        </p>
      ) : null}
    </li>
  );
}

function EdgeList({
  edges,
  tenantId,
  emptyText,
}: {
  edges: readonly ObjectEdge[];
  tenantId: string;
  emptyText: string;
}) {
  if (edges.length === 0) {
    return <p className="sv-item-meta">{emptyText}</p>;
  }
  return (
    <ul className="tw-rel-list">
      {edges.map((edge) => (
        <EdgeItem key={`${edge.relationship_id}-${edge.orientation}`} edge={edge} tenantId={tenantId} />
      ))}
    </ul>
  );
}

/* -----------------------------------------------------------------------------
 * Seite
 * --------------------------------------------------------------------------- */

export function ObjectDetailView({ model }: { model: ObjectDetailModel }) {
  const { tenant, object, identity, importance, connections, evolution, next_observations } = model;
  const tenantId = tenant.tenant_id;

  return (
    <>
      <Link className="tw-back" href={`/twin/${tenantId}`}>
        ← Zurück zu {tenant.display_name}
      </Link>

      <p className="tw-eyebrow">Objekt-360 · Digitaler Zwilling</p>
      <h1>{object.display_name}</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation") */}
      <p className="tw-question">
        Was ist dieses Objekt, warum ist es wichtig, womit hängt es zusammen, wie entwickelt es
        sich – und was ist dazu im Demo-Datenbestand belegt?
      </p>

      <ContextBar model={model} />

      <IdentitySection identity={identity} />
      <ImportanceSection importance={importance} tenantId={tenantId} />
      <ConnectionsSection connections={connections} tenantId={tenantId} />
      <EvolutionSection evolution={evolution} tenantId={tenantId} />
      <NextSection observations={next_observations} tenantId={tenantId} />
    </>
  );
}

/**
 * Querschnittliche Kontextzeile (Dok. 06 §6): Mandant, Objekttyp, Objektfamilie, Datenstand,
 * Version und Bestätigungsstufe. Die aktive Rolle steht in der Shell-Topbar (WP-011) und wird
 * hier nicht wiederholt; der Scope steht vollständig in „Was ist das?".
 *
 * „Datenstand" ist ausdrücklich die Systemerfassung (`record_time.recorded_at`) und wird nicht
 * mit der fachlichen Gültigkeit vermischt (Dok. 07 §11/D07). Als „Vertrauensgrad" erscheint
 * ausschließlich die belegte Dimension „Bestätigung" – es wird KEIN verdichteter Indikator
 * berechnet (Dok. 07 D10; siehe OFFENE FRAGE O-WP014-02).
 */
function ContextBar({ model }: { model: ObjectDetailModel }) {
  const { tenant, identity, evolution } = model;

  return (
    <dl className="od-context" aria-label="Kontext dieser Objektseite">
      <div>
        <dt>Mandant</dt>
        <dd>{tenant.display_name}</dd>
      </div>
      <div>
        <dt>Objekttyp</dt>
        <dd>{identity.object_type}</dd>
      </div>
      <div>
        <dt>Objektfamilie</dt>
        <dd>
          {identity.family_id
            ? `${identity.family_id} · ${identity.family_name}`
            : 'nicht im kanonischen Katalog zugeordnet'}
        </dd>
      </div>
      <div>
        <dt>Datenstand (im System erfasst)</dt>
        <dd>
          <DateValue iso={evolution.recorded_at} />
        </dd>
      </div>
      <div>
        <dt>Version</dt>
        <dd>{evolution.version}</dd>
      </div>
      <div>
        <dt>Bestätigung (Datenqualität)</dt>
        <dd>{evolution.confirmation_level ?? 'nicht erfasst'}</dd>
      </div>
    </dl>
  );
}

/* --- (1) Was ist das? ------------------------------------------------------ */

function IdentitySection({ identity }: { identity: ObjectDetailModel['identity'] }) {
  return (
    <section aria-labelledby="frage-was-ist-das">
      <h2 id="frage-was-ist-das">Was ist das?</h2>

      <dl className="tw-meta">
        <dt>Objekttyp</dt>
        <dd>{identity.object_type}</dd>

        <dt>Objektfamilie</dt>
        <dd>
          {identity.family_id
            ? `${identity.family_id} · ${identity.family_name}`
            : 'nicht im kanonischen Katalog zugeordnet'}
        </dd>

        <dt>Lebenszyklus-Stand</dt>
        <dd>{identity.lifecycle_status}</dd>

        <dt>Klassifikation</dt>
        <dd>
          {identity.has_classification
            ? [
                identity.confidentiality ? `Vertraulichkeit: ${identity.confidentiality}` : null,
                identity.protection_need ? `Schutzbedarf: ${identity.protection_need}` : null,
              ]
                .filter(Boolean)
                .join(' · ')
            : 'keine Klassifikation im Demo-Seed erfasst'}
        </dd>

        <dt>Objekt-ID</dt>
        <dd className="tw-rel-tech">{identity.object_id}</dd>
      </dl>

      {identity.description ? (
        <p className="tw-lead">{identity.description}</p>
      ) : (
        <p className="sv-item-meta">Keine Beschreibung im Demo-Seed erfasst.</p>
      )}

      <h3>Scope</h3>
      {identity.scopes.length > 0 ? (
        <ul className="sv-items">
          {identity.scopes.map((scope) => (
            <ScopeItem key={scope.scope_id} scope={scope} />
          ))}
        </ul>
      ) : (
        <p className="sv-item-meta">Keine Scope-Zuordnung im Demo-Seed erfasst.</p>
      )}

      <h3>Verantwortung (Owner)</h3>
      {identity.owners.length > 0 ? (
        <ul className="sv-items">
          {identity.owners.map((owner) => (
            <OwnerItem key={`${owner.owner_id}-${owner.owner_kind}`} owner={owner} />
          ))}
        </ul>
      ) : (
        <p className="sv-item-meta">Keine Owner-Zuordnung im Demo-Seed erfasst.</p>
      )}
    </section>
  );
}

/**
 * Scope-Zuordnung. Der Demo-Seed materialisiert Scopes nicht als eigene Objekte
 * (OFFENE FRAGE O-WP014-03), daher bleibt die Kennung sichtbar roh – als benannte Datenlücke
 * (Partial data, Dok. 06 §17), nicht als erfundener Klartextname.
 */
function ScopeItem({ scope }: { scope: ResolvedScope }) {
  return (
    <li>
      <span className="sv-item-name">{scope.name}</span>
      {scope.valid_from ? (
        <span className="sv-item-meta">
          {' · fachlich gültig ab '}
          <DateValue iso={scope.valid_from} />
          {scope.valid_to ? (
            <>
              {' bis '}
              <DateValue iso={scope.valid_to} />
            </>
          ) : (
            ' (kein Enddatum erfasst)'
          )}
        </span>
      ) : null}
      {!scope.resolved ? (
        <span className="sv-item-note">
          Datenlücke: Zu dieser Scope-Kennung existiert im Demo-Seed kein eigenes Objekt; angezeigt
          wird die rohe Kennung aus dem Objekt-Envelope.
        </span>
      ) : null}
    </li>
  );
}

function OwnerItem({ owner }: { owner: ResolvedOwner }) {
  const meta = [`Art: ${owner.owner_kind}`];
  if (owner.role) meta.push(`Rolle: ${owner.role}`);

  return (
    <li>
      <span className="sv-item-name">{owner.name}</span>
      <span className="sv-item-meta">{` · ${meta.join(' · ')}`}</span>
      {owner.valid_from ? (
        <span className="sv-item-meta">
          {' · gültig ab '}
          <DateValue iso={owner.valid_from} />
        </span>
      ) : null}
      {!owner.resolved ? (
        <span className="sv-item-note">
          Datenlücke: Diese Owner-Referenz löst im Mandanten auf kein Objekt auf; angezeigt wird die
          rohe Kennung.
        </span>
      ) : null}
    </li>
  );
}

/* --- (2) Warum ist es wichtig? --------------------------------------------- */

function ImportanceSection({
  importance,
  tenantId,
}: {
  importance: ObjectDetailModel['importance'];
  tenantId: string;
}) {
  return (
    <section aria-labelledby="frage-warum-wichtig">
      <h2 id="frage-warum-wichtig">Warum ist es wichtig?</h2>
      <p className="sv-edge-note">
        Gezeigt werden die erfasste Klassifikation und die belegten Bezüge zu Risiken und Zielen –
        ohne Gewichtung, ohne Score und ohne Reifegrad. Eine darüber hinausgehende Kritikalität ist
        im kanonischen Objektvertrag nicht erfasst und wird hier nicht abgeleitet.
      </p>

      <dl className="tw-meta">
        <dt>Schutzbedarf</dt>
        <dd>{importance.protection_need ?? 'nicht erfasst'}</dd>

        <dt>Vertraulichkeit</dt>
        <dd>{importance.confidentiality ?? 'nicht erfasst'}</dd>
      </dl>

      <h3>Belegte Bezüge zu Risiken und Zielen</h3>
      <p className="sv-edge-note">
        Berücksichtigte Kantentypen: {edgeNote('affects')}, {edgeNote('threatens')},{' '}
        {edgeNote('exposes')}, {edgeNote('mitigates')}, {edgeNote('contributes_to')},{' '}
        {edgeNote('requires')}.
      </p>
      <EdgeList
        edges={importance.edges}
        tenantId={tenantId}
        emptyText="Keine Kante dieses Typs im Demo-Seed: Dieses Objekt ist im Demo-Datenbestand mit keinem Risiko und keinem Ziel verbunden."
      />
    </section>
  );
}

/* --- (3) Womit hängt es zusammen? ------------------------------------------ */

function ConnectionsSection({
  connections,
  tenantId,
}: {
  connections: ObjectDetailModel['connections'];
  tenantId: string;
}) {
  return (
    <section aria-labelledby="frage-zusammenhang">
      <h2 id="frage-zusammenhang">Womit hängt es zusammen?</h2>
      <p className="sv-edge-note">
        Ein- und ausgehende Kanten getrennt, jeweils mit Typ, Richtung, Herkunft der Aussage und
        fachlicher Gültigkeit (Dok. 07 §21). Jeder auflösbare Nachbar ist ein Link auf seine
        Detailseite – der Mandant bleibt dabei konstant.
      </p>

      <h3>Ausgehende Beziehungen (dieses Objekt ist Quelle)</h3>
      <EdgeList
        edges={connections.outgoing}
        tenantId={tenantId}
        emptyText="Keine ausgehende Kante dieses Objekts im Demo-Seed."
      />

      <h3>Eingehende Beziehungen (dieses Objekt ist Ziel)</h3>
      <EdgeList
        edges={connections.incoming}
        tenantId={tenantId}
        emptyText="Keine eingehende Kante auf dieses Objekt im Demo-Seed."
      />
    </section>
  );
}

/* --- (4) Wie entwickelt es sich? ------------------------------------------- */

function EvolutionSection({
  evolution,
  tenantId,
}: {
  evolution: ObjectDetailModel['evolution'];
  tenantId: string;
}) {
  const { history } = evolution;

  return (
    <section aria-labelledby="frage-entwicklung">
      <h2 id="frage-entwicklung">Wie entwickelt es sich?</h2>
      <p className="sv-edge-note">
        Fachliche Gültigkeit und Systemerfassung sind getrennte Zeitachsen (Dok. 07 §11) – sie
        werden hier nicht zu einem einzigen „Datum" verschmolzen.
      </p>

      <h3>Fachliche Gültigkeit (valid_time)</h3>
      <dl className="tw-meta">
        <dt>fachlich gültig ab</dt>
        <dd>
          <DateValue iso={evolution.valid_from} />
        </dd>
        <dt>fachlich gültig bis</dt>
        <dd>
          {evolution.valid_to ? (
            <DateValue iso={evolution.valid_to} />
          ) : (
            'offen – kein Enddatum erfasst'
          )}
        </dd>
      </dl>

      <h3>Systemerfassung (record_time)</h3>
      <dl className="tw-meta">
        <dt>im System erfasst am</dt>
        <dd>
          <DateValue iso={evolution.recorded_at} />
        </dd>
        <dt>im System ersetzt am</dt>
        <dd>
          {evolution.replaced_at ? (
            <DateValue iso={evolution.replaced_at} />
          ) : (
            'nicht erfasst – dieser Stand wurde nicht ersetzt'
          )}
        </dd>
      </dl>

      <h3>Version und Historie</h3>
      <dl className="tw-meta">
        <dt>Version</dt>
        <dd>{evolution.version}</dd>
      </dl>
      {history.has_history ? (
        <>
          {history.has_previous_version ? (
            <p className="sv-item-meta">
              Es existieren frühere Versionen dieses Objekts (aktuelle Version {history.version}).
            </p>
          ) : null}
          <EdgeList
            edges={[...history.supersedes, ...history.superseded_by]}
            tenantId={tenantId}
            emptyText="Keine supersedes-Kante im Demo-Seed."
          />
        </>
      ) : (
        /* Partial data (Dok. 06 §17): die Lücke wird benannt und aus den Daten begründet –
           keine erfundene Timeline, kein konstanter Platzhaltertext. */
        <div className="tw-empty" role="note">
          <h4>Keine Versionshistorie im Demo-Seed</h4>
          <p style={{ marginBottom: 0 }}>
            Abgeleitet aus dem Objekt selbst: Version {history.version}, kein Ersetzungszeitpunkt
            (record_time.replaced_at) und keine Ablösungskante ({edgeNote('supersedes')}). Frühere
            Stände sind damit im Demo-Datenbestand nicht rekonstruierbar; es wird bewusst kein
            Verlauf konstruiert.
          </p>
        </div>
      )}

      <h3>Datenqualität</h3>
      <div className="tw-quality">
        {evolution.quality_dimensions.length > 0 ? (
          <ul className="tw-quality-list">
            {evolution.quality_dimensions.map((dim, index) => (
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

      <h3>Herkunft (source_refs)</h3>
      {evolution.source_refs.length > 0 ? (
        <ul className="sv-items">
          {evolution.source_refs.map((ref, index) => (
            <li key={`${ref.source_kind}-${ref.reference}-${index}`}>
              <span className="sv-item-name">{ref.reference}</span>
              <span className="sv-item-meta">
                {` · Quellenart: ${ref.source_kind}`}
                {typeof ref.priority === 'number' ? ` · Priorität: ${ref.priority}` : ''}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sv-item-meta">Keine Quellreferenz im Demo-Seed erfasst.</p>
      )}
    </section>
  );
}

/* --- (5) Was als Nächstes? ------------------------------------------------- */

function NextSection({
  observations,
  tenantId,
}: {
  observations: readonly NextObservation[];
  tenantId: string;
}) {
  return (
    <section aria-labelledby="frage-naechstes">
      {/*
        Dok. 06 §6 formuliert die fünfte Frage als „Was soll als Nächstes passieren?". Diese
        Seite ist read-only und trifft ausdrücklich KEINE Handlungsaussage (WP-014 Nicht-Ziele),
        daher die neutrale Formulierung „Was als Nächstes?" mit reinen Beobachtungen.
      */}
      <h2 id="frage-naechstes">Was als Nächstes?</h2>
      <p className="sv-edge-note">
        Nur belegte Verweise aus dem Demo-Datenbestand, jeweils mit Quelle – als Beobachtung, nicht
        als Empfehlung. Es gibt hier keinen Vorschlag, keine Priorisierung und kein Serviceangebot.
      </p>

      {observations.length > 0 ? (
        <ul className="sv-items">
          {observations.map((observation, index) => (
            <li key={`${observation.kind}-${observation.relationship_id ?? index}`}>
              <ObservationItem observation={observation} tenantId={tenantId} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="sv-item-meta">
          Kein belegter Verweis im Demo-Seed: Dieses Objekt trägt weder eine verknüpfte Maßnahme
          noch einen Servicebezug oder Nachweis.
        </p>
      )}
    </section>
  );
}

function ObservationItem({
  observation,
  tenantId,
}: {
  observation: NextObservation;
  tenantId: string;
}) {
  if (observation.kind === 'ohne_nachweis') {
    return (
      <>
        <span className="sv-item-name">Kein Nachweis verweist auf dieses Objekt.</span>
        <span className="sv-item-meta">
          {` · Beobachtung: keine eingehende Nachweiskante (${edgeNote('evidences')}) im Demo-Seed.`}
        </span>
      </>
    );
  }

  const lead =
    observation.kind === 'massnahme'
      ? 'Verknüpfte Maßnahme'
      : observation.kind === 'service'
        ? 'Im Umfang des Managed Service'
        : 'Verknüpfter Nachweis';

  const meta = [`Objekttyp: ${observation.object_type}`];
  if (observation.lifecycle_status) meta.push(`Status: ${observation.lifecycle_status}`);
  if (observation.relationship_type) meta.push(`Beleg: ${edgeNote(observation.relationship_type)}`);

  return (
    <>
      <span className="sv-item-name">{`${lead}: `}</span>
      {observation.object_id ? (
        <Link href={objectDetailHref(tenantId, observation.object_id)}>{observation.name}</Link>
      ) : (
        <span>{observation.name}</span>
      )}
      <span className="sv-item-meta">{` · ${meta.join(' · ')}`}</span>
    </>
  );
}
