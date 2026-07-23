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
 * Status steht immer als Text, nie nur als Farbe (Dok. 06 06-D11): der OBJEKT-Status ist gerahmt
 * als Lebenszyklus-Stand (kein Prüfergebnis), der Status einer BEZIEHUNG ist ein Feld der Kante
 * und kann laut Dok. 07 §9 R15 auch ein Prüfstatus sein (Rahmungssatz wortgleich mit
 * `IsmsContent`).
 *
 * Jede Frage gibt eine eigene Antwort: Frage 2 zeigt die Bezüge verdichtet (Label, Nachbar,
 * Richtung) und verweist für Herkunft, Vertrauensgrad und Gültigkeit auf Frage 3; dort steht
 * jede Kante genau einmal vollständig. Die Leserichtung folgt immer der Seed-Kante
 * (Quelle —Typ→ Ziel), auch bei eingehenden Kanten.
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
import { formatIsoDateDe, objectDetailHref, tenantDetailHref } from '../../lib/twin/routes';
import { objectTypeDisplay, relationshipTypeId, relationshipTypeLabel } from '../../lib/twin/data';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

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

/** Nachbarobjekt als Link – nicht auflösbarer Endpunkt bleibt bewusst reiner Text (Fail-loud). */
function NeighborNode({ edge, tenantId }: { edge: ObjectEdge; tenantId: string }) {
  if (!edge.neighbor_resolved) {
    return <span className="tw-rel-node">{edge.neighbor_name}</span>;
  }
  return (
    <Link className="tw-rel-node" href={objectDetailHref(tenantId, edge.neighbor_id)}>
      {edge.neighbor_name}
    </Link>
  );
}

/**
 * Die Kante als lesbare Kette in der RICHTUNG DER SEED-AUSSAGE (Muster `RelationshipList`:
 * Quelle —Typ→ Ziel). Bei einer EINGEHENDEN Kante steht deshalb der Nachbar vorne und dieses
 * Objekt hinten – sonst würde die Zeile die Aussage umkehren („R09 · bedroht → Ransomware"
 * läse sich auf der Asset-Seite als „Asset bedroht den Angriff", also das Gegenteil der Kante).
 */
function EdgeLine({ edge, tenantId }: { edge: ObjectEdge; tenantId: string }) {
  const label = edge.relationship_type_label ?? edge.relationship_type;
  const primary = edge.relationship_type_id ? `${edge.relationship_type_id} · ${label}` : label;

  return (
    <div className="tw-rel-line">
      {edge.orientation === 'eingehend' ? (
        <>
          <NeighborNode edge={edge} tenantId={tenantId} />
          <span className="tw-rel-arrow" aria-hidden="true">
            —
          </span>
          <span className="tw-rel-type">{primary}</span>
          <span className="tw-rel-arrow" aria-hidden="true">
            →
          </span>
          <span className="tw-rel-node">dieses Objekt</span>
        </>
      ) : (
        <>
          <span className="tw-rel-type">{primary}</span>
          <span className="tw-rel-arrow" aria-hidden="true">
            →
          </span>
          <NeighborNode edge={edge} tenantId={tenantId} />
        </>
      )}
      <span className="tw-rel-tech">({edge.relationship_type})</span>
    </div>
  );
}

/**
 * Eine Kante mit allen von Dok. 07 §21 geforderten Angaben und einem Link auf die Detailseite
 * des Nachbarobjekts. Ist der Endpunkt im Mandanten nicht auflösbar, wird bewusst KEIN Link
 * gerendert, sondern die rohe ID mit Hinweis – ein Link würde eine Existenz behaupten, die
 * nicht belegt ist (Fail-loud statt stiller Lücke).
 *
 * „Lebenszyklus-Stand" statt „Status" und „Status der Beziehung" statt „Prüfstand der
 * Beziehung": beides sind wertoffene Seed-Stände, keine Prüfergebnisse (Review-Fix, Muster
 * `IsmsCards`/Dok. 08 §14.3). Ein fehlender Vertrauensgrad wird ausgeschrieben statt still
 * weggelassen (Dok. 07 §21 „Datenlücken werden nicht still verborgen").
 */
function EdgeItem({ edge, tenantId }: { edge: ObjectEdge; tenantId: string }) {
  const meta = [
    `Richtung: ${edge.orientation} (${edge.direction})`,
    `Objekttyp: ${objectTypeDisplay(edge.neighbor_type)}`,
  ];
  if (edge.neighbor_lifecycle_status) {
    meta.push(`Lebenszyklus-Stand: ${edge.neighbor_lifecycle_status}`);
  }
  meta.push(`Herkunft der Aussage: ${edge.assertion_kind}`);
  meta.push(`Vertrauensgrad: ${edge.confidence_display ?? 'nicht erfasst'}`);
  if (edge.edge_status) meta.push(`Status der Beziehung: ${edge.edge_status}`);

  return (
    <li className="tw-rel-item">
      <EdgeLine edge={edge} tenantId={tenantId} />
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

/**
 * Nächster Schritt im Leerzustand (Dok. 06 §17: Empty-Text nennt Nutzen UND einen Weg,
 * Muster `TenantDetailView`/`IsmsContent`). Bewusst ein bereits bestehender Weg – die
 * Mandantenseite zeigt alle modellierten Objekte und Beziehungen desselben Mandanten.
 */
function EmptyNext({ tenantId }: { tenantId: string }) {
  return (
    <>
      {' Weiter zu '}
      <Link href={tenantDetailHref(tenantId)}>
        allen modellierten Objekten und Beziehungen dieses Mandanten
      </Link>
      .
    </>
  );
}

/**
 * Kantenliste in zwei Ausprägungen (Review-Fix: vorher zwei zeichengleiche Komponenten):
 *  - `voll` (Frage 3): jede Kante mit Metazeile, Gültigkeit und Hinweisen,
 *  - `kompakt` (Frage 2): nur deutsches Label, Nachbarname als Link und Richtung. Frage 2 soll
 *    eine eigene Antwort geben und nicht denselben Block wie Frage 3 ein zweites Mal in
 *    identischer Tiefe zeigen; vollständig steht jede Kante genau einmal unter „Womit hängt es
 *    zusammen?".
 *
 * Der React-Key trägt zusätzlich den Listenindex: eine Kollision ist mit `relationship_id` +
 * `orientation` zwar nicht konstruierbar (eine Selbstbezugskante erzeugt zwei Einträge mit
 * UNTERSCHIEDLICHER orientation), der Index härtet den Schlüssel aber ohne Umbau der Sortier-/
 * Filterlogik ab (Review-Fix).
 *
 * Der Empty-Text erklärt die Lücke, wiederholt aber NICHT den Link auf die Mandantenseite – der
 * steht bereits als Kopfzeile der Seite und stünde auf einer dünnen Seite sonst mehrfach
 * identisch im Text (Review-Fix). Im Abschnitt „Was als Nächstes?" bleibt er.
 */
function EdgeList({
  edges,
  tenantId,
  emptyText,
  variant = 'voll',
}: {
  edges: readonly ObjectEdge[];
  tenantId: string;
  emptyText: string;
  variant?: 'voll' | 'kompakt';
}) {
  if (edges.length === 0) {
    return <p className="sv-item-meta">{emptyText}</p>;
  }
  return (
    <ul className="tw-rel-list">
      {edges.map((edge, index) => {
        const key = `${edge.relationship_id}-${edge.orientation}-${index}`;
        return variant === 'kompakt' ? (
          <li className="tw-rel-item" key={key}>
            <EdgeLine edge={edge} tenantId={tenantId} />
          </li>
        ) : (
          <EdgeItem key={key} edge={edge} tenantId={tenantId} />
        );
      })}
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
      {/* Kein „Zurück": die Seite wird auch aus /isms und /services heraus betreten, dorthin
          führt dieser Link nicht. Er benennt daher sein Ziel (Muster „← Alle Mandanten" in
          `TenantDetailView`); das Ziel selbst bleibt unverändert. */}
      <Link className="tw-back" href={tenantDetailHref(tenantId)}>
        ← Alle Objekte von {tenant.display_name}
      </Link>

      <p className="tw-eyebrow">Objekt-360 · Digitaler Zwilling</p>
      <h1>{object.display_name}</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation") */}
      <p className="tw-question">
        Was ist dieses Objekt, warum ist es wichtig, womit hängt es zusammen, wie entwickelt es sich
        – und was ist dazu im Demo-Datenbestand belegt?
      </p>

      {/* Seitenweite Rahmung (UX-Review MAJOR-1 aus WP-013): auch hier erscheinen Status-Werte
          wie „wirksam" – an dieser Stelle sogar ungerahmt in jeder Kanten- und
          Beobachtungszeile. Die Rahmung gilt ausdrücklich nur für den OBJEKT-Status; der Status
          einer BEZIEHUNG ist ein eigenes Feld der Kante und kann laut Dok. 07 §9 R15
          („Nachweisbezug mit Zeitraum und Prüfstatus") sehr wohl einen Prüfstatus tragen –
          diese Unterscheidung würde ein pauschales „keine Prüfergebnisse" verschweigen
          (Review-Fix). */}
      <p className="tw-muted">
        <strong>Zum Verständnis:</strong> Alle hier gezeigten Status-Angaben der Objekte sind
        Lebenszyklus-Stände aus dem Demo-Datenbestand – <strong>keine Prüfergebnisse</strong> und
        keine bewertete Wirksamkeit. Der „Status der Beziehung" ist dagegen ein Feld der Beziehung
        selbst und kann je nach Beziehungstyp auch einen Prüfstatus tragen (Dok. 07 §9 R15 nennt für
        einen Nachweisbezug ausdrücklich Zeitraum und Prüfstatus).
      </p>

      <ContextBar model={model} />

      <IdentitySection identity={identity} />
      <ImportanceSection importance={importance} tenantId={tenantId} />
      <ConnectionsSection connections={connections} tenantId={tenantId} />
      <EvolutionSection evolution={evolution} tenantId={tenantId} />
      <NextSection observations={next_observations} tenantId={tenantId} />

      {/* Seitenbausteine-Konvention (WP-020, Dok. 06 „Verbindliche Seitenbausteine"):
          ehrliche Benennung der Bausteine, die der Datenbestand hier (noch) nicht trägt. */}
      <SeitenbausteineHinweis ort="objekt360" />
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
    /* `role="group"` (Review-Fix A11y): `dl` hat keine verlässliche implizite Rolle, ein
       `aria-label` darauf wird von manchen Screenreadern ignoriert. */
    // biome-ignore lint/a11y/noInteractiveElementToNoninteractiveRole: bewusstes, dokumentiertes Muster (s. Kommentar) – die ARIA-Semantik zu ändern wäre eine Produktänderung außerhalb dieses Tooling-WP.
    // biome-ignore lint/a11y/useSemanticElements: `role="group"` + `aria-label` auf `dl` ist gültiges ARIA; ein Ersatz durch `fieldset`/`section` würde gerendertes Markup ändern (nicht verhaltensneutral).
    <dl className="od-context" role="group" aria-label="Kontext dieser Objektseite">
      <div>
        <dt>Mandant</dt>
        <dd>{tenant.display_name}</dd>
      </div>
      <div>
        <dt>Objekttyp</dt>
        <dd>{objectTypeDisplay(identity.object_type)}</dd>
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
        {/* Deutsche Glosse + kanonischer Typ (eine Quelle: `lib/twin/data.ts`), damit derselbe
            Objekttyp hier genauso lesbar ist wie in der ISMS-Ansicht. */}
        <dd>{objectTypeDisplay(identity.object_type)}</dd>

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

      {/* Review-Fix: Frage 2 wiederholte bislang die Klassifikation aus Frage 1 als eigenen
          Block und dieselben Kanten wie Frage 3 in identischer Detailtiefe. Die Klassifikation
          steht jetzt in EINEM Satz mit Verweis auf „Was ist das?", die Bezüge verdichtet. */}
      {/* Ohne belegte Klassifikation wäre die verdichtete Zeile eine Aneinanderreihung von
          „nicht erfasst" – dann steht stattdessen ein klarer Satz (Review-Fix). */}
      <p className="sv-edge-note">
        {importance.has_classification ? (
          <>
            Erfasste Klassifikation (Details unter „Was ist das?"): Schutzbedarf{' '}
            {importance.protection_need ?? 'nicht erfasst'}, Vertraulichkeit{' '}
            {importance.confidentiality ?? 'nicht erfasst'} –{' '}
          </>
        ) : (
          <>Im Demo-Datenbestand ist für dieses Objekt keine Klassifikation erfasst – </>
        )}
        ohne Gewichtung, ohne Score und ohne Reifegrad. Eine darüber hinausgehende Kritikalität ist
        im kanonischen Objektvertrag nicht erfasst und wird hier nicht abgeleitet.
      </p>

      {/* Die Überschrift nennt genau die Typmenge, die tatsächlich gefiltert wird: `requires`
          (R19) verbindet ein Objekt nicht mit einem Risiko oder Ziel, sondern mit einer
          verbindlichen Voraussetzung – z. B. mit einem Managed Service. Ohne diese Nennung
          stünde ein Service unter „Risiken und Ziele" (Review-Fix). */}
      <h3>Belegte Bezüge zu Risiken, Zielen und Voraussetzungen</h3>
      <p className="sv-edge-note">
        Berücksichtigte Kantentypen: {edgeNote('affects')}, {edgeNote('threatens')},{' '}
        {edgeNote('exposes')}, {edgeNote('mitigates')}, {edgeNote('contributes_to')},{' '}
        {edgeNote('requires')}. {edgeNote('requires')} ist dabei kein Risiko-/Zielbezug, sondern
        eine verbindliche Abhängigkeit im jeweiligen Scope (Dok. 07 §9 R19).
      </p>
      <p className="sv-edge-note">
        Verdichtete Darstellung. Alle Beziehungen mit Herkunft, Vertrauensgrad und Gültigkeit stehen
        unter „Womit hängt es zusammen?".
      </p>
      <EdgeList
        variant="kompakt"
        edges={importance.edges}
        tenantId={tenantId}
        emptyText="Keine Kante dieses Typs im Demo-Seed: Dieses Objekt ist im Demo-Datenbestand mit keinem Risiko, keinem Ziel und keiner Voraussetzung verbunden."
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
        emptyText="Keine ausgehende Kante dieses Objekts im Demo-Seed: Von diesem Objekt geht im Demo-Datenbestand keine Aussage über ein anderes Objekt aus."
      />

      <h3>Eingehende Beziehungen (dieses Objekt ist Ziel)</h3>
      <EdgeList
        edges={connections.incoming}
        tenantId={tenantId}
        emptyText="Keine eingehende Kante auf dieses Objekt im Demo-Seed: Kein anderes Objekt dieses Mandanten verweist im Demo-Datenbestand auf dieses Objekt."
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
          {/* Aussage über GENAU DIESES Objekt: seit WP-017 trägt der Datenbestand sehr wohl eine
              Ablösekette – ein „im Demo-Seed gibt es keine" wäre hier falsch. Erreichbar bleibt
              der Leerfall nur, wenn eine Historie allein über Version/Ersetzungszeitpunkt belegt
              ist (im heutigen Seed nicht der Fall). */}
          <EdgeList
            edges={[...history.supersedes, ...history.superseded_by]}
            tenantId={tenantId}
            emptyText="Für dieses Objekt ist keine Ablösungskante erfasst."
          />
        </>
      ) : (
        /* Partial data (Dok. 06 §17): die Lücke wird benannt und aus den Daten begründet –
           keine erfundene Timeline, kein konstanter Platzhaltertext. */
        <div className="tw-empty" role="note">
          {/* Überschrift bewusst OBJEKTBEZOGEN (WP-017): „im Demo-Seed" wäre seit der
              Entscheidungsschicht eine falsche Aussage über den ganzen Datenbestand – dort ist
              eine Ablösung belegt. Die Lücke gilt für dieses Objekt, und genau das steht hier. */}
          <h4>Keine Versionshistorie für dieses Objekt</h4>
          <p style={{ marginBottom: 0 }}>
            Abgeleitet aus dem Objekt selbst: Version {history.version}, kein Ersetzungszeitpunkt
            (record_time.replaced_at) und keine Ablösungskante ({edgeNote('supersedes')}). Frühere
            Stände dieses Objekts sind damit im Demo-Datenbestand nicht rekonstruierbar; es wird
            bewusst kein Verlauf konstruiert.
          </p>
        </div>
      )}

      <h3>Datenqualität</h3>
      <div className="tw-quality">
        {evolution.quality_dimensions.length > 0 ? (
          <ul className="tw-quality-list">
            {evolution.quality_dimensions.map((dim, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Index nur als Eindeutigkeits-Suffix hinter dem fachlichen Schlüssel; Liste kommt statisch aus dem Seed (read-only, keine Umsortierung).
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
            // biome-ignore lint/suspicious/noArrayIndexKey: Index nur als Eindeutigkeits-Suffix hinter dem fachlichen Schlüssel; Liste kommt statisch aus dem Seed (read-only, keine Umsortierung).
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
        /* Erreichbar für Objekttypen ohne Maßnahmen-, Service- und Nachweisbezug (z. B. eine
           Organisation): dort erscheint auch „kein Nachweis" nicht, weil die Beobachtung auf die
           laut Dok. 07 §9 R15 nachweisfähigen Objekttypen begrenzt ist (`EVIDENCE_TARGET_TYPES`).
           Der NUTZERTEXT sagt das evidenzgebunden – die Ableitung aus der Beispielspalte ist eine
           Anzeigeentscheidung (O-WP014-10), keine Modellaussage (Review-Fix). */
        <p className="sv-item-meta">
          Kein belegter Verweis im Demo-Seed: Für dieses Objekt ist im Demo-Datenbestand weder eine
          Maßnahme noch ein Servicebezug erfasst; auch ein Nachweisbezug ist für diesen Objekttyp im
          Demo-Datenbestand nicht modelliert.
          <EmptyNext tenantId={tenantId} />
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

  // Exhaustiv über `NextObservationKind`: eine künftige sechste Art fällt NICHT still auf
  // „Verknüpfter Nachweis" zurück, sondern bricht den Typecheck (`never`-Zweig). Die Union ist im
  // Review-Zyklus bereits einmal gewachsen (`deckung`) – ein falsch beschrifteter Beleg wäre genau
  // die Art stiller Fehlaussage, die dieses WP vermeiden soll.
  let lead: string;
  switch (observation.kind) {
    case 'massnahme':
      lead = 'Verknüpfte Maßnahme';
      break;
    case 'service':
      lead = 'Im Umfang des Managed Service';
      break;
    case 'deckung':
      /* Gegenrichtung derselben R22-Kante: Beobachtung aus dem Seed, kein Angebot. */
      lead = 'Deckt im Serviceumfang ab';
      break;
    case 'nachweis':
      lead = 'Verknüpfter Nachweis';
      break;
    default: {
      const unbekannt: never = observation.kind;
      throw new Error(`Unbehandelte Beobachtungsart: ${String(unbekannt)}`);
    }
  }

  // Fehlanzeige und Typname bleiben unterscheidbar: kein menschenlesbarer Sentinel durch die
  // Typ-Lookup-Funktion (Review-Fix).
  const meta = [
    `Objekttyp: ${observation.object_type ? objectTypeDisplay(observation.object_type) : 'nicht erfasst'}`,
  ];
  if (observation.lifecycle_status) {
    meta.push(`Lebenszyklus-Stand: ${observation.lifecycle_status}`);
  }
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
