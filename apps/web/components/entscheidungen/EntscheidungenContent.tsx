/**
 * Präsentationaler Inhalt des Ortes „Entscheidungen" – Entscheidungsregister, read-only
 * (WP-017 Slice 2, Dok. 06 §4/§7 S03).
 *
 * Rendert AUSSCHLIESSLICH das in `lib/entscheidungen/data.ts` abgeleitete Modell des AKTIVEN
 * Mandanten. Nichts ist hartkodiert, nichts erfunden, nichts berechnet: jeder sichtbare Wert
 * stammt aus dem Demo-Datenbestand oder aus dem kanonischen Vertrag.
 *
 * WAS DIESE SEITE NICHT IST: keine „Decision Card" nach Dok. 10 §9.1 (die Mehrheit ihrer 14
 * Pflichtfelder hat im Objektvertrag keinen Träger – siehe Abschnitt „Was eine Entscheidung hier
 * noch nicht zeigt"), keine Freigabe, keine Priorisierung, keine Empfehlung, kein Serviceangebot,
 * kein Score, keine Ampel, kein Reifegrad, kein Trend, kein Prozent-/Schwellenwert, kein
 * Prioritätsrang, keine Frist, keine Geldangabe. Die Reihenfolge ist die Reihenfolge des
 * Datenbestands; die Regel steht sichtbar an der Liste.
 *
 * DIE LEITFRAGE DES ORTES WIRD NICHT BEHAUPTET: „Welche Geschäftsentscheidung ist jetzt
 * erforderlich?" ist eine Dringlichkeitsfrage. Sie steht wörtlich aus `lib/shell/places.ts` oben
 * auf der Seite – und DIREKT DARUNTER steht, dass diese Datenlage sie nicht beantwortet und
 * welche engere Frage die Seite tatsächlich belegt (Dok. 06 §17, Dok. 10 §24.4).
 *
 * Heading-Hierarchie: h1 (Ort) > h2 (Abschnitt) > h3 (Entscheidung) > h4 (Block).
 * Status steht immer als Text, nie nur als Farbe (Dok. 06 06-D11). Bestehendes CSS-Vokabular,
 * kein neues Designsystem (DR-0003).
 *
 * Bundle-Grenze (O-WP014-09): Routen und Datumsanzeige kommen fertig aus dem Modell bzw. aus dem
 * seed-freien `lib/twin/routes.ts`; `lib/twin/object-detail.ts` wird hier nicht importiert.
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';

import {
  DECISION_CARD_FIELDS,
  DECISION_OBJECT_TYPE,
  DECISION_RECORD_CONTENTS,
  buildDecisionRegister,
  countDecisionCardFields,
  type DecisionCardField,
  type DecisionEdge,
  type DecisionEntry,
  type DecisionOwner,
  type DecisionRegisterModel,
} from '../../lib/entscheidungen/data';
import { getPlace } from '../../lib/shell/places';
import type { DemoRole } from '../../lib/shell/roles';
import { formatIsoDateDe } from '../../lib/twin/routes';

/* -----------------------------------------------------------------------------
 * Kleine Formathelfer (Klartext vor Fachsprache, Dok. 06 P03/P04/D08)
 * --------------------------------------------------------------------------- */

/** Datum als `<time>` mit exaktem Zeitstempel im `dateTime`-Attribut (Muster Objekt-360). */
function DateValue({ iso }: { iso: string }) {
  return <time dateTime={iso}>{formatIsoDateDe(iso)}</time>;
}

/** Fachliche Gültigkeit „ab … bis …" bzw. „ab … (offen)" – nie mit der Systemachse vermischt. */
function ValidRange({ from, to }: { from: string; to?: string | null }) {
  return (
    <>
      {'ab '}
      <DateValue iso={from} />
      {to ? (
        <>
          {' bis '}
          <DateValue iso={to} />
        </>
      ) : (
        ' (offen – kein Enddatum erfasst)'
      )}
    </>
  );
}

/* -----------------------------------------------------------------------------
 * Seite
 * --------------------------------------------------------------------------- */

export function EntscheidungenContent({ role, tenant }: { role: DemoRole; tenant: DemoTenant }) {
  const model = buildDecisionRegister(tenant.tenant_id);
  const place = getPlace('entscheidungen');

  return (
    <>
      <p className="tw-eyebrow">Entscheidungen · Entscheidungsregister</p>
      <h1>Entscheidungen</h1>

      {/* Leitfrage des Ortes, wörtlich aus `lib/shell/places.ts` (Dok. 06 §7 S03). */}
      <p className="tw-question">{place.question}</p>

      {/* Die Grenze steht DIREKT unter der Leitfrage, nicht erst am Seitenende: eine
          Dringlichkeitsfrage darf nicht erst nach dem ganzen Inhalt relativiert werden
          (Korrektur aus dem WP-016-Review). Die id macht den Absatz im Test adressierbar. */}
      <p className="tw-muted" id="entscheidungen-rahmung">
        <strong>Diese Frage beantwortet die Seite nicht.</strong> „Jetzt erforderlich" ist eine
        Aussage über Dringlichkeit; sie setzt eine Frist, einen Aufwand, eine verfügbare Kapazität
        und eine Priorität voraus. Der kanonische Objektvertrag (Dok. 07, Abschnitt „Objektvertrag,
        Identität und Metadaten") kennt keines dieser Felder, und der Datenbestand trägt sie nicht –
        jede Reihung nach Dringlichkeit wäre erfunden. Beantwortet wird deshalb die engere,
        belegbare Frage:{' '}
        <strong>
          Welche Entscheidungen sind im Datenbestand dieses Mandanten erfasst, worauf beziehen sie
          sich, wie sind sie belegt und was hat sie abgelöst?
        </strong>
      </p>

      <p className="tw-lead">
        Read-only Register der Entscheidungen des aktiven Mandanten, abgeleitet aus dem
        synthetischen Demo-Datenbestand: Entscheidungsfrage, Kontext, Lebenszyklus-Stand,
        Verantwortung, die fachliche Gültigkeit und die Systemerfassung getrennt, die verknüpften
        Bezugsobjekte und Nachweise sowie die erfasste Ablösung zwischen zwei Ständen. Gezeigt wird
        nur, was der Datenbestand belegt.
      </p>

      {/* Seitenweiter Rahmungssatz, WORTGLEICH aus `components/isms/IsmsContent.tsx`
          (Dok. 08 08-D07): ein Lebenszyklus-Stand ist kein Prüf- oder Freigabeergebnis – das gilt
          hier besonders, weil ein Stand „genehmigt" oder „zur Freigabe" heißen kann.

          BEWUSST NICHT ANGEFASST: Der Satz enthält als einzige Stelle dieser Seite noch eine
          blanke §-Nummer von Dok. 07 („§9 R15"), deren Zählung gegenüber der PDF-Fassung um eins
          verschoben ist. Er ist per Acceptance-Kriterium und per Test WORTGLEICH an `/isms`
          gebunden; eine einseitige Korrektur bräche die Wortgleichheit, eine beidseitige
          änderte eine Seite außerhalb dieses Work Packages. Als Befund weitergegeben. */}
      <p className="tw-muted">
        <strong>Zum Verständnis:</strong> Alle hier gezeigten Status-Angaben der Objekte sind
        Lebenszyklus-Stände aus dem Demo-Datenbestand – <strong>keine Prüfergebnisse</strong> und
        keine bewertete Wirksamkeit. Der „Status der Beziehung" ist dagegen ein Feld der Beziehung
        selbst und kann je nach Beziehungstyp auch einen Prüfstatus tragen (Dok. 07 §9 R15 nennt für
        einen Nachweisbezug ausdrücklich Zeitraum und Prüfstatus).
      </p>

      {model ? (
        <>
          <ContextBar model={model} role={role} />
          <RegisterSection model={model} />
          <HonestySection />
        </>
      ) : (
        /* NICHT ERREICHBAR, bewusst fail-loud: die Prop ist ein `DemoTenant` aus dem Seed, und
           `resolveSession` liefert ausschließlich bekannte Mandanten. Bricht diese Zusicherung
           künftig, zeigt die Seite den Bruch sichtbar an, statt still leer zu bleiben. */
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>
            Mandant im Datenbestand nicht auflösbar
          </h2>
          <p style={{ marginTop: 0 }}>
            Zur aktiven Auswahl existiert im Demo-Datenbestand kein Mandant. Es wird bewusst kein
            Ersatzinhalt gezeigt.
          </p>
          <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
            <Link className="tw-cta" href="/login">
              Zur Anmelde-Simulation →
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

/* -----------------------------------------------------------------------------
 * Querschnittlicher Kontext (Dok. 06 §6 / 06-D04)
 * --------------------------------------------------------------------------- */

/**
 * Rolle, Mandant, Scope-Kennungen und Datenstand querschnittlich sichtbar. „Datenstand" ist
 * ausdrücklich die SYSTEMACHSE (`record_time.recorded_at`, Dok. 07 §11) und wird nicht mit der
 * fachlichen Gültigkeit vermischt. Die Rolle ist reine Perspektive (WP-011) – sie ändert keine
 * Daten dieser Seite.
 *
 * `role="group"` wie in `ObjectDetailView`/`MissionControlContent`: `dl` hat keine verlässliche
 * implizite Rolle.
 */
function ContextBar({ model, role }: { model: DecisionRegisterModel; role: DemoRole }) {
  return (
    // biome-ignore lint/a11y/noInteractiveElementToNoninteractiveRole: bewusstes, dokumentiertes Muster (s. Kommentar oben) – die ARIA-Semantik zu ändern wäre eine Produktänderung außerhalb dieses Tooling-WP.
    // biome-ignore lint/a11y/useSemanticElements: `role="group"` + `aria-label` auf `dl` ist gültiges ARIA; ein Ersatz durch `fieldset`/`section` würde gerendertes Markup ändern (nicht verhaltensneutral).
    <dl className="od-context" role="group" aria-label="Kontext dieser Seite">
      <div>
        <dt>Aktive Rolle</dt>
        <dd>{`${role.id} · ${role.name}`}</dd>
      </div>
      <div>
        <dt>Aktiver Mandant</dt>
        <dd>{model.tenant.display_name}</dd>
      </div>
      <div>
        <dt>Erfasste Entscheidungen</dt>
        <dd>{model.decisions.length}</dd>
      </div>
      <div>
        <dt>Scope-Kennungen der Entscheidungen</dt>
        <dd>
          {model.scopeIds.length > 0 ? model.scopeIds.join(' · ') : 'keine Scope-Zuordnung erfasst'}
        </dd>
      </div>
      <div>
        {/* Der Wert wird AUSSCHLIESSLICH aus den Entscheidungen gebildet. Vorher hieß die Zeile
            „Datenstand" und der Ersatzwert „keine Erfassung im Datenbestand" – bei einem
            Mandanten mit Graph, aber ohne Entscheidungen widersprach das auf demselben Bildschirm
            der Aussage darunter, dass ein Datenbestand modelliert ist (Review-Fix). */}
        <dt>Datenstand der Entscheidungen (zuletzt im System erfasst)</dt>
        <dd>
          {model.recordedOn && model.recordedOnDisplay ? (
            <time dateTime={model.recordedOn}>{model.recordedOnDisplay}</time>
          ) : (
            'keine Entscheidung erfasst'
          )}
        </dd>
      </div>
    </dl>
  );
}

/* -----------------------------------------------------------------------------
 * Register
 * --------------------------------------------------------------------------- */

function RegisterSection({ model }: { model: DecisionRegisterModel }) {
  return (
    <section aria-labelledby="entscheidungen-register">
      <h2 id="entscheidungen-register">Erfasste Entscheidungen</h2>

      {model.isEmpty ? (
        <EmptyRegister model={model} />
      ) : (
        <>
          <p className="sv-edge-note">{model.orderRule}</p>
          <RegisterReadingNotes />
          <ul className="sv-list">
            {model.decisions.map((decision) => (
              <DecisionCard key={decision.object_id} decision={decision} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

/**
 * Die Leseregeln, die für JEDE Entscheidung gleich gelten – EINMALIG auf Abschnittsebene.
 *
 * Vorher trug jede Karte dieselben sechs Erklärabsätze; bei drei Entscheidungen waren das 18
 * wortgleiche Absätze, in denen die eigentlichen Daten untergingen (Review-Fix). In der Karte
 * bleibt nur, was sich je Entscheidung unterscheidet.
 */
function RegisterReadingNotes() {
  return (
    <>
      <p className="sv-edge-note">
        <strong>Ablösung:</strong> Ein abgelöster Stand bleibt vollständig sichtbar und verlinkt –
        eine Ablösung ersetzt den früheren Stand fachlich, sie überschreibt und verbirgt ihn nicht
        (Beziehung „supersedes", R24; Dok. 07, Entscheidung 07-D06). Beide Richtungen stehen
        getrennt: Quelle der Kante ist immer der Nachfolgestand. Zu jedem genannten Stand steht
        seine eigene fachliche Gültigkeit dabei.
      </p>
      <p className="sv-edge-note">
        <strong>Zwei Zeitachsen:</strong> Fachliche Gültigkeit (valid_time) und Systemerfassung
        (record_time) werden getrennt geführt und nicht zu einem einzigen „Datum" verschmolzen. Ein
        Erfassungszeitpunkt ist keine fachliche Änderung.
      </p>
      <p className="sv-edge-note">
        <strong>Verantwortung ist keine Freigabe:</strong> „owns" (R03) und „owner_ids" benennen,
        wer zuständig ist – wer freigabeberechtigt wäre, ist im Modell nicht erfasst.
      </p>
      <p className="sv-edge-note">
        <strong>Bezug:</strong> belegt über die Beziehung „decided_in" (R23: „Risk/Change/Service →
        Decision Record"). Sie wird bewusst neutral als Bezug gezeigt: ob sie den Zielbezug oder den
        Auslöser der Entscheidung abbildet, sagt das Konzept nicht – und es wird hier nicht
        entschieden.
      </p>
      <p className="sv-edge-note">
        <strong>Nachweise:</strong> belegt über die Beziehung „evidences" (R15:{' '}
        {'„Evidence → Control/Measure/Decision"'}). Der „Status der Beziehung" ist ein Feld der
        Kante und kann hier einen Prüfstatus tragen.
      </p>
      <p className="sv-edge-note">
        <strong>Herkunft und Datenqualität:</strong> Quellen und Qualitätsdimensionen werden
        unverändert gezeigt und ausdrücklich nicht zu einem Gesamtwert verrechnet (Dok. 07,
        Entscheidung 07-D10).
      </p>
    </>
  );
}

/**
 * Zwei fachlich VERSCHIEDENE Leerfälle, unterschiedlich benannt (Dok. 06 §17, O-WP017-08):
 *   (a) der Mandant trägt einen Datenbestand, aber kein Objekt vom Typ „Decision Record",
 *   (b) der Mandant trägt überhaupt nichts.
 *
 * Beide nennen Nutzen und einen nächsten Schritt – und sprechen AUSSCHLIESSLICH über den aktiven
 * Mandanten. Vorher stand hier zusätzlich, für wie viele Mandanten die Entscheidungsschicht im
 * Datenbestand ausmodelliert ist; diese Zahl war über alle Mandanten gezählt und verriet einem
 * leeren Mandanten die Datenlage eines fremden. Die Mandantengrenze ist eine Sicherheitsgrenze
 * (Dok. 07, „Mandantenfähigkeit, Rechte und Datenschutz") – sie gilt auch für Zahlen, nicht nur
 * für Namen und Kennungen (Review-Fix).
 */
function EmptyRegister({ model }: { model: DecisionRegisterModel }) {
  const tenantName = model.tenant.display_name;

  return (
    <div className="tw-empty" role="note">
      <h3>Keine Entscheidungen für {tenantName}</h3>
      {model.hasObjectGraph ? (
        <p style={{ marginTop: 0 }}>
          Für <strong>{tenantName}</strong> ist ein Datenbestand modelliert – {model.objectCount}{' '}
          Objekte und {model.relationshipCount} Beziehungen –, darin aber kein einziges Objekt vom
          Typ „{DECISION_OBJECT_TYPE}". Dieser Mandant ist also nicht leer: es ist die
          Entscheidungsschicht, die für ihn nicht erfasst ist.
        </p>
      ) : (
        <p style={{ marginTop: 0 }}>
          Für <strong>{tenantName}</strong> ist im Demo-Datenbestand überhaupt nichts modelliert:
          weder Objekte noch Beziehungen – und damit auch keine Entscheidungen. Das ist ein anderer
          Fall als ein Mandant, der einen Datenbestand trägt, in dem nur die Entscheidungsschicht
          fehlt.
        </p>
      )}
      <p className="tw-muted">
        Für diesen Mandanten ist im synthetischen Datenbestand keine Entscheidung erfasst. Nutzen
        dieser Seite: Sie zeigt für den aktiven Mandanten, welche Entscheidungen erfasst sind,
        worauf sie sich beziehen, wie sie belegt sind und was sie abgelöst hat. Ohne erfasste
        Entscheidungen bleibt sie sichtbar leer – bewusst kein Platzhalter-Inhalt und keine
        erfundene Entscheidung.
      </p>
      <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
        <Link className="tw-cta" href="/login">
          Mandant wechseln (Anmelde-Simulation) →
        </Link>
      </p>
    </div>
  );
}

/** Eine Entscheidung mit allem, was der Datenbestand über sie belegt. */
function DecisionCard({ decision }: { decision: DecisionEntry }) {
  return (
    <li className="sv-card">
      <h3 className="tw-card-title">
        <Link href={decision.href}>{decision.question}</Link>
      </h3>

      <dl className="tw-meta">
        {/* Die Rahmung steht am WERT, nicht nur seitenweit oben: „genehmigt" ist der einzige
            Stand, der wie eine erteilte Freigabe klingt, und die Karten stehen mehrere
            Bildschirmhöhen unter dem seitenweiten Satz (Review-Fix, Muster aus WP-016). */}
        <dt>Lebenszyklus-Stand (kein Prüf- oder Freigabeergebnis)</dt>
        <dd>{decision.lifecycle_status}</dd>
        <dt>Objekttyp</dt>
        <dd>{decision.object_type_display}</dd>
        <dt>Objektfamilie</dt>
        <dd>
          {decision.family_id
            ? `${decision.family_id} · ${decision.family_name}`
            : 'nicht im kanonischen Katalog zugeordnet'}
        </dd>
        <dt>Scope-Kennungen</dt>
        <dd>
          {decision.scope_ids.length > 0
            ? decision.scope_ids.join(' · ')
            : 'keine Scope-Zuordnung erfasst'}
        </dd>
        <dt>Objekt-ID</dt>
        <dd className="tw-rel-tech">{decision.object_id}</dd>
      </dl>

      <h4>Kontext</h4>
      {decision.context ? (
        <p className="sv-desc">{decision.context}</p>
      ) : (
        <p className="sv-item-meta">Keine Beschreibung im Datenbestand erfasst.</p>
      )}

      {/* Zwei Zeitachsen, ausdrücklich getrennt (Dok. 07 §11/D07). Die allgemeine Leseregel steht
          einmalig am Abschnitt (`RegisterReadingNotes`). */}
      <h4>Fachliche Gültigkeit und Systemerfassung</h4>
      <dl className="tw-meta">
        <dt>fachlich gültig</dt>
        <dd>
          <ValidRange from={decision.valid_from} to={decision.valid_to} />
        </dd>
        <dt>im System erfasst am</dt>
        <dd>
          <DateValue iso={decision.recorded_at} />
        </dd>
        <dt>im System ersetzt am</dt>
        <dd>
          {decision.replaced_at ? (
            <DateValue iso={decision.replaced_at} />
          ) : (
            'nicht erfasst – dieser Datensatz wurde nicht ersetzt'
          )}
        </dd>
        <dt>Version des Datensatzes</dt>
        <dd>{decision.version}</dd>
      </dl>
      {/* Nur beim geschlossenen Intervall, und nur als BEOBACHTUNG am Datenbestand: das Ende
          gehört zum Stand selbst, seine Kanten stehen im Register sichtbar ohne Enddatum – ohne
          diesen Satz liest sich das wie ein Datenfehler (Review-Fix). */}
      {decision.valid_to ? (
        <p className="sv-item-note">
          Das Enddatum gilt für diesen Stand selbst. Für seine Beziehungen weiter unten ist im
          Datenbestand kein Enddatum erfasst; sie erscheinen deshalb offen.
        </p>
      ) : null}

      <h4>Verantwortung (Owner)</h4>
      {decision.owners.length > 0 ? (
        <ul className="sv-items">
          {decision.owners.map((owner) => (
            <OwnerItem key={`${owner.owner_id}-${owner.owner_kind}`} owner={owner} />
          ))}
        </ul>
      ) : (
        <p className="sv-item-meta">Keine Owner-Zuordnung im Datenbestand erfasst.</p>
      )}
      <EdgeList
        edges={decision.owned_by}
        emptyText="Keine eingehende Verantwortungs-Beziehung im Datenbestand erfasst."
      />

      <h4>Bezug</h4>
      <EdgeList
        edges={decision.references}
        emptyText={
          'Auf diese Entscheidung zeigt im Datenbestand keine Bezugs-Beziehung („decided_in", R23).'
        }
      />

      <h4>Nachweise</h4>
      <EdgeList
        edges={decision.evidence}
        emptyText={
          'Auf diese Entscheidung zeigt im Datenbestand keine Nachweis-Beziehung („evidences", ' +
          'R15). Ob ein Nachweis fachlich erforderlich wäre, sagt der Datenbestand nicht – hier ' +
          'steht nur, dass keiner erfasst ist.'
        }
      />

      {/* Zwei Kantenlisten unter EINER Überschrift: ohne eigenen Namen sind sie für
          Screenreader nicht auseinanderzuhalten. Der jeweils vorangehende Absatz benennt die
          Liste über `aria-labelledby` (Review-Fix, kein neues CSS). */}
      <h4>Ablösekette</h4>
      <p className="sv-item-note" id={`${decision.object_id}-supersedes`}>
        Löst ab (früherer Stand):
      </p>
      <EdgeList
        edges={decision.supersedes}
        showNeighborValidity
        labelledBy={`${decision.object_id}-supersedes`}
        emptyText="Dieser Stand löst im Datenbestand keinen früheren Stand ab."
      />
      <p className="sv-item-note" id={`${decision.object_id}-superseded-by`}>
        Wurde abgelöst durch (späterer Stand):
      </p>
      <EdgeList
        edges={decision.superseded_by}
        showNeighborValidity
        labelledBy={`${decision.object_id}-superseded-by`}
        emptyText="Dieser Stand wurde im Datenbestand nicht abgelöst."
      />

      <h4>Herkunft und Datenqualität</h4>
      {decision.source_refs.length > 0 ? (
        <ul className="sv-items">
          {decision.source_refs.map((ref, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Index nur als Eindeutigkeits-Suffix hinter dem fachlichen Schlüssel; Liste kommt statisch aus dem Seed (read-only, keine Umsortierung).
            <li key={`${ref.source_kind}-${ref.reference}-${index}`}>
              <span className="sv-item-name">{ref.reference}</span>
              <span className="sv-item-meta">
                {` · Quellenart: ${ref.source_kind}`}
                {/* Feld „priority" des Quellenverweises (Dok. 07 §7: „Mehrere Quellen mit
                    Priorität möglich") – Wortlaut identisch zur Objekt-360-Seite. Das ist eine
                    Rangfolge unter QUELLEN, ausdrücklich keine Priorität der Entscheidung. */}
                {typeof ref.priority === 'number' ? ` · Priorität: ${ref.priority}` : ''}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sv-item-meta">Keine Quellreferenz im Datenbestand erfasst.</p>
      )}
      <div className="tw-quality">
        {decision.quality_dimensions.length > 0 ? (
          <ul className="tw-quality-list">
            {decision.quality_dimensions.map((dim, index) => (
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
    </li>
  );
}

function OwnerItem({ owner }: { owner: DecisionOwner }) {
  const meta = [`Art: ${owner.owner_kind}`];
  if (owner.role) meta.push(`Rolle: ${owner.role}`);

  return (
    <li>
      {/* Fail-loud: eine nicht auflösbare Owner-Kennung wird als rohe Kennung gezeigt und NICHT
          verlinkt – ein Link würde eine Existenz behaupten, die nicht belegt ist. */}
      {owner.href ? (
        <Link className="sv-item-name" href={owner.href}>
          {owner.name}
        </Link>
      ) : (
        <span className="sv-item-name">{owner.name}</span>
      )}
      <span className="sv-item-meta">{` · ${meta.join(' · ')}`}</span>
      {owner.valid_from ? (
        <span className="sv-item-note">
          {'Zuordnung fachlich gültig '}
          <ValidRange from={owner.valid_from} to={owner.valid_to} />
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

/* -----------------------------------------------------------------------------
 * Kantenliste – richtungstreu (Leserichtung folgt immer der Kante)
 * --------------------------------------------------------------------------- */

/** Nachbarobjekt als Link – ein nicht auflösbarer Endpunkt bleibt reiner Text (Fail-loud). */
function NeighborNode({ edge }: { edge: DecisionEdge }) {
  if (!edge.href) return <span className="tw-rel-node">{edge.name}</span>;
  return (
    <Link className="tw-rel-node" href={edge.href}>
      {edge.name}
    </Link>
  );
}

/**
 * Die Kante als lesbare Kette IN RICHTUNG DER AUSSAGE (Quelle —Typ→ Ziel, Muster
 * `ObjectDetailView`). Bei einer EINGEHENDEN Kante steht deshalb der Nachbar vorne und diese
 * Entscheidung hinten – sonst kehrte die Zeile die Aussage um („Entscheidung belegt den
 * Nachweis" statt „Nachweis belegt die Entscheidung").
 */
function EdgeLine({ edge }: { edge: DecisionEdge }) {
  const label = edge.relationship_type_label ?? edge.relationship_type;
  const primary = edge.relationship_type_id ? `${edge.relationship_type_id} · ${label}` : label;

  return (
    <div className="tw-rel-line">
      {edge.orientation === 'eingehend' ? (
        <>
          <NeighborNode edge={edge} />
          <span className="tw-rel-arrow" aria-hidden="true">
            —
          </span>
          <span className="tw-rel-type">{primary}</span>
          <span className="tw-rel-arrow" aria-hidden="true">
            →
          </span>
          <span className="tw-rel-node">diese Entscheidung</span>
        </>
      ) : (
        <>
          <span className="tw-rel-node">diese Entscheidung</span>
          <span className="tw-rel-arrow" aria-hidden="true">
            —
          </span>
          <span className="tw-rel-type">{primary}</span>
          <span className="tw-rel-arrow" aria-hidden="true">
            →
          </span>
          <NeighborNode edge={edge} />
        </>
      )}
      <span className="tw-rel-tech">({edge.relationship_type})</span>
    </div>
  );
}

function EdgeItem({
  edge,
  showNeighborValidity,
}: {
  edge: DecisionEdge;
  showNeighborValidity?: boolean;
}) {
  const meta = [`Objekttyp: ${edge.object_type_display}`];
  if (edge.lifecycle_status) meta.push(`Lebenszyklus-Stand: ${edge.lifecycle_status}`);
  meta.push(`Herkunft der Aussage: ${edge.assertion_kind}`);
  // Eine fehlende Angabe wird ausgeschrieben statt still weggelassen (Dok. 07 §21).
  meta.push(`Vertrauensgrad: ${edge.confidence_display ?? 'nicht erfasst'}`);
  if (edge.edge_status) meta.push(`Status der Beziehung: ${edge.edge_status}`);

  return (
    <li className="tw-rel-item">
      <EdgeLine edge={edge} />
      <div className="tw-rel-meta">
        {meta.join(' · ')}
        <br />
        {'Beziehung fachlich gültig '}
        <ValidRange from={edge.valid_from} to={edge.valid_to} />
        {showNeighborValidity && edge.neighbor_valid_from ? (
          <>
            <br />
            {'Genannter Stand fachlich gültig '}
            <ValidRange from={edge.neighbor_valid_from} to={edge.neighbor_valid_to} />
          </>
        ) : null}
      </div>
      {!edge.resolved ? (
        <p className="sv-item-note">
          Nachbarobjekt im Mandanten nicht auflösbar – angezeigt wird die rohe Kennung aus der
          Beziehung.
        </p>
      ) : null}
    </li>
  );
}

function EdgeList({
  edges,
  emptyText,
  showNeighborValidity,
  labelledBy,
}: {
  edges: readonly DecisionEdge[];
  emptyText: string;
  showNeighborValidity?: boolean;
  /**
   * `id` des Absatzes, der diese Liste benennt. Nötig, wo mehrere Listen unter derselben
   * Überschrift stehen – sonst haben sie keinen zugänglichen Namen (WCAG 1.3.1).
   */
  labelledBy?: string;
}) {
  if (edges.length === 0) {
    return <p className="sv-item-meta">{emptyText}</p>;
  }
  return (
    <ul className="tw-rel-list" aria-labelledby={labelledBy}>
      {edges.map((edge, index) => (
        <EdgeItem
          // biome-ignore lint/suspicious/noArrayIndexKey: Index nur als Eindeutigkeits-Suffix hinter dem fachlichen Schlüssel; Liste kommt statisch aus dem Seed (read-only, keine Umsortierung).
          key={`${edge.relationship_id}-${edge.orientation}-${index}`}
          edge={edge}
          showNeighborValidity={showNeighborValidity}
        />
      ))}
    </ul>
  );
}

/* -----------------------------------------------------------------------------
 * Ehrlichkeitsblock – benannte Datenlücke (Dok. 06 §17 „Partial data", Dok. 10 §24.4)
 * --------------------------------------------------------------------------- */

/**
 * Was eine Entscheidung hier NICHT zeigt und warum – feldweise gegen Dok. 10 §9.1.
 *
 * Bewusst ohne Termin-, Roadmap- und Funktionsversprechen: es steht ausschließlich da, was der
 * heutige Datenbestand und der heutige Vertrag tragen. Die Anzahlen werden aus
 * `DECISION_CARD_FIELDS` GEZÄHLT, nicht geschrieben – so kann der Text nicht still von der Liste
 * abweichen; ein Test nagelt zusätzlich gegen `packages/contracts` fest, dass die als „kein
 * Träger" benannten Felder wirklich keinen haben.
 */
function HonestySection() {
  const ohneTraeger = countDecisionCardFields('kein Träger');
  const teilweise = countDecisionCardFields('teilweise');

  return (
    <section aria-labelledby="entscheidungen-luecke">
      <h2 id="entscheidungen-luecke">Was eine Entscheidung hier noch nicht zeigt</h2>
      <p className="sv-edge-note">
        Diese Seite zeigt <strong>keine Decision Card</strong> im Sinne von Dok. 10, Abschnitt
        „Decision Cards" (§9). Die Decision Card ist dort als freigabefähiges Entscheidungsobjekt
        mit {DECISION_CARD_FIELDS.length} Pflichtfeldern beschrieben. Im kanonischen Objektvertrag
        (Dok. 07, Abschnitt „Objektvertrag, Identität und Metadaten") haben davon{' '}
        <strong>{ohneTraeger} keinen Träger</strong> und <strong>{teilweise} nur teilweise</strong>{' '}
        einen. Gezeigt wird deshalb, was das heutige Datenmodell belegt – und darunter steht
        feldweise, was es nicht belegt.
      </p>
      <ul className="sv-items" id="entscheidungen-luecke-pflichtfelder">
        {DECISION_CARD_FIELDS.map((field) => (
          <FieldItem key={field.field} field={field} />
        ))}
      </ul>

      {/* Dok. 10 beschreibt den Decision Record im selben Abschnitt EIGENSTÄNDIG – mit einer
          zweiten, kürzeren Inhaltsliste. Sie wird getrennt geführt und getrennt gezählt: eine
          Summe über beide Listen gäbe es im Konzept nicht. */}
      <h3>Was Dok. 10 zusätzlich für den Decision Record selbst verlangt</h3>
      <p className="sv-edge-note">
        Dok. 10 beschreibt im Abschnitt „Decision Cards" den <strong>Decision Record</strong>{' '}
        eigenständig: „Nach Freigabe wird die Karte zum unveränderbaren Decision Record. Korrekturen
        erfolgen als neue Version oder Nachtrag. Festgehalten werden Option, Begründung, Freigabe,
        Bedingungen, erwartete Wirkung, Reviewtermin und spätere Ist-Wirkung." Diese{' '}
        {DECISION_RECORD_CONTENTS.length} Inhalte kommen zu den Pflichtfeldern oben hinzu; im
        heutigen Objektvertrag hat <strong>keiner von ihnen einen Träger</strong>.
      </p>
      <ul className="sv-items" id="entscheidungen-luecke-record">
        {DECISION_RECORD_CONTENTS.map((field) => (
          <FieldItem key={field.field} field={field} />
        ))}
      </ul>
      <p className="sv-edge-note">
        Was der Datenbestand dagegen <strong>belegt</strong>, ist der erste Teil dieser Aussage:
        Korrekturen entstehen als neuer Stand, nicht als Überschreibung. Genau das zeigt die
        Ablösekette oben – der abgelöste Stand bleibt unverändert, vollständig sichtbar und
        verlinkt, und der Nachfolgestand steht als eigenes Objekt daneben.
      </p>

      <p className="tw-muted">
        Auch die Leitfrage dieses Ortes bleibt damit offen: „{getPlace('entscheidungen').question}"
        verlangt eine Aussage über Dringlichkeit. Ohne Frist, Aufwand, Kapazität und Priorität ist
        sie aus diesem Datenbestand nicht zu beantworten – und wird hier deshalb weder behauptet
        noch durch eine Sortierung angedeutet.
      </p>
      <p className="tw-muted">
        Diese Aufzählung ist eine Aussage über den heutigen Datenbestand und den heutigen
        Objektvertrag – kein Zeitplan und keine Zusage darüber, ob und wann die genannten Angaben
        entstehen.
      </p>
    </section>
  );
}

function FieldItem({ field }: { field: DecisionCardField }) {
  return (
    <li>
      <span className="sv-item-name">{field.field}</span>
      {/* Der Deckungsgrad steht als Text, nie nur als Farbe (Dok. 06 06-D11). */}
      <span className="sv-item-meta">{` · im heutigen Datenmodell: ${field.coverage}`}</span>
      <span className="sv-item-note">{field.carrier}</span>
    </li>
  );
}
