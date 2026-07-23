/**
 * Präsentationaler Inhalt des Ortes „Entscheidungen" – Entscheidungsregister, read-only
 * (WP-017 Slice 2, Dok. 06 §4/§7 S03).
 *
 * Rendert AUSSCHLIESSLICH das in `lib/entscheidungen/data.ts` abgeleitete Modell des AKTIVEN
 * Mandanten. Nichts ist hartkodiert, nichts erfunden, nichts berechnet: jeder sichtbare Wert
 * stammt aus dem Datenbestand oder aus dem kanonischen Vertrag.
 *
 * WAS DIESE SEITE NICHT IST: keine „Decision Card" nach Dok. 10 §9.1 (die Mehrheit ihrer 14
 * Pflichtfelder hat im Objektvertrag keinen Träger – siehe Abschnitt „Was eine Entscheidung hier
 * noch nicht zeigt"), keine Freigabe, keine Priorisierung, keine Empfehlung, kein Serviceangebot,
 * kein Score, keine Ampel, kein Reifegrad, kein Trend, kein Prozent-/Schwellenwert, kein
 * Prioritätsrang, keine Frist, keine Geldangabe. Die Reihenfolge ist die Reihenfolge des
 * Datenbestands; die Regel steht sichtbar an der Liste.
 *
 * ANTWORT-MODUS (WP-028 Slice 3, DR-0013 Nr. 1 „Antwort zuerst, Lücke zuletzt"): Die Seite
 * führt mit dem, was sie liefert – dem Entscheidungsregister. Sichtbare Leitfrage ist die Frage,
 * die sie HEUTE beantwortet: „Welche Entscheidungen sind erfasst, worauf beziehen sie sich, wie
 * sind sie belegt und was hat sie abgelöst?"
 *
 * DIE ASPIRATIVE LEITFRAGE WIRD NICHT MEHR GERENDERT (Muster WP-032): „Welche
 * Geschäftsentscheidung ist jetzt erforderlich?" ist eine DRINGLICHKEITSFRAGE. Sie stand bis
 * WP-028 als Überschrift oben – und wurde im nächsten Satz zurückgenommen („Diese Frage
 * beantwortet die Seite heute nicht"), gefolgt von rund 250 Wörtern Begründung, bevor die erste
 * Entscheidung sichtbar wurde. Die Frage bleibt als KONZEPTANKER in `lib/shell/places.ts`
 * stehen (mit Begründung); die Seite negiert sie nicht mehr und rechtfertigt sich nicht mehr.
 * WAS BLEIBT: die benannte Lücke selbst – ohne Frist, Aufwand, Kapazität und Priorität ist
 * keine Dringlichkeitsaussage belegbar. Sie steht ruhig im Abschluss-Abschnitt am Seitenende
 * (`OffeneFrageSection`), nicht mehr über der Falz.
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
  DECISION_CARD_FIELDS_DOK06,
  DECISION_OBJECT_TYPE,
  DECISION_RECORD_CONTENTS,
  buildDecisionRegister,
  countDecisionCardFields,
  countFields,
  type DecisionCardField,
  type DecisionEdge,
  type DecisionEntry,
  type DecisionOwner,
  type DecisionRegisterModel,
} from '../../lib/entscheidungen/data';
import type { DemoRole } from '../../lib/shell/roles';
import { PageContextBar } from '../shell/PageContextBar';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';
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

export function EntscheidungenContent({
  role,
  tenant,
}: {
  /** `null` = neutraler Zustand (DR-0009) – reine Anzeige in der Kontextleiste, kein Gating. */
  role: DemoRole | null;
  tenant: DemoTenant;
}) {
  const model = buildDecisionRegister(tenant.tenant_id);

  return (
    <>
      <p className="tw-eyebrow">Entscheidungen · Entscheidungsregister</p>
      <h1>Entscheidungen</h1>

      {/* SICHTBARE LEITFRAGE = die Frage, die diese Seite heute beantwortet (DR-0013 Nr. 1).
          Die aspirative Frage des Screenkatalogs bleibt Konzeptanker in `lib/shell/places.ts`
          und wird hier bewusst weder gerendert noch negiert (Begründung in der Kopfnotiz). */}
      <p className="tw-question">
        Welche Entscheidungen sind erfasst, worauf beziehen sie sich, wie sind sie belegt und was
        hat sie abgelöst?
      </p>

      {/* ANTWORT ZUERST: der belegte Stand in einem Satz – auch (und gerade) im Leerzustand.
          Zahlen kommen aus dem Modell, nichts ist geschrieben. */}
      {model ? <Aufmacher model={model} /> : null}

      {model ? (
        <>
          <ContextBar model={model} role={role} />
          <RegisterSection model={model} />
          <HonestySection />
          <OffeneFrageSection />
          {/* Seitenbausteine-Konvention (WP-020, Dok. 06 „Verbindliche Seitenbausteine"):
              ehrliche Benennung der Bausteine, die der Datenbestand hier (noch) nicht trägt. */}
          <SeitenbausteineHinweis ort="entscheidungen" />
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
            Zur aktiven Auswahl existiert im Datenbestand kein Mandant. Es wird bewusst kein
            Ersatzinhalt gezeigt.
          </p>
          <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
            <Link className="tw-cta" href="/login">
              Zur Anmeldung →
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

/* -----------------------------------------------------------------------------
 * Aufmacher – die Antwort in einem Satz (WP-028 Slice 3, DR-0013 Nr. 1)
 * --------------------------------------------------------------------------- */

/**
 * Der belegte Stand über der Falz: wie viele Entscheidungen erfasst sind und wann zuletzt.
 * Beide Werte kommen aus dem Modell (`decisions.length`, `recordedOnDisplay`) – nichts ist
 * geschrieben. Der frühere Aufmacher war ein Fünf-Zeilen-Absatz über den Aufbau der Seite;
 * er beschrieb, was gleich darunter ohnehin steht.
 */
function Aufmacher({ model }: { model: DecisionRegisterModel }) {
  // Bewusst NICHT `anzahl` genannt: so heißt der gemeinsame Singular/Plural-Helfer der
  // Ebene-1-Texte (`lib/heute/data.ts`) – hier ist es schlicht die Zahl aus dem Modell.
  const erfasst = model.decisions.length;
  return (
    <p className="tw-lead">
      {erfasst === 0 ? (
        <>
          Für <strong>{model.tenant.display_name}</strong> ist im Datenbestand keine Entscheidung
          erfasst.
        </>
      ) : (
        <>
          Für <strong>{model.tenant.display_name}</strong> {erfasst === 1 ? 'ist' : 'sind'}{' '}
          <strong>
            {erfasst} {erfasst === 1 ? 'Entscheidung' : 'Entscheidungen'}
          </strong>{' '}
          erfasst
          {model.recordedOn && model.recordedOnDisplay ? (
            <>
              , zuletzt im System erfasst am{' '}
              <time dateTime={model.recordedOn}>{model.recordedOnDisplay}</time>
            </>
          ) : null}
          . Je Entscheidung stehen unten Kontext, Verantwortung, die beiden Zeitachsen getrennt, die
          Bezüge, die Nachweise und die erfasste Ablösung.
        </>
      )}
    </p>
  );
}

/* -----------------------------------------------------------------------------
 * Querschnittlicher Kontext (Dok. 06 §6 / 06-D04)
 * --------------------------------------------------------------------------- */

/**
 * Kontextleiste über die gemeinsame `PageContextBar` (WP-020 Slice 1, Dok. 06 „Sichtbarer
 * Kontext"): Mandant, Produktrolle, die drei benannten Datenlücken (Vertretung,
 * Vertraulichkeit/Exportrestriktion, Vertrauensgrad – Muster O-WP016-08) sowie seitenspezifisch
 * Scope und Datenstand DER ENTSCHEIDUNGEN. „Datenstand" ist ausdrücklich die SYSTEMACHSE
 * (`record_time.recorded_at`, Dok. 07 §11) und wird nicht mit der fachlichen Gültigkeit
 * vermischt. Die Rolle ist reine Perspektive (WP-011) – sie ändert keine Daten dieser Seite.
 */
function ContextBar({ model, role }: { model: DecisionRegisterModel; role: DemoRole | null }) {
  return (
    <PageContextBar
      role={role}
      tenant={model.tenant}
      scopeLabel="Scope-Kennungen der Entscheidungen"
      scopeValue={
        model.scopeIds.length > 0 ? model.scopeIds.join(' · ') : 'keine Scope-Zuordnung erfasst'
      }
      /* Der Wert wird AUSSCHLIESSLICH aus den Entscheidungen gebildet. Vorher hieß die Zeile
         „Datenstand" und der Ersatzwert „keine Erfassung im Datenbestand" – bei einem
         Mandanten mit Graph, aber ohne Entscheidungen widersprach das auf demselben Bildschirm
         der Aussage darunter, dass ein Datenbestand modelliert ist (Review-Fix). */
      datenstandLabel="Datenstand der Entscheidungen (zuletzt im System erfasst)"
      datenstandValue={
        model.recordedOn && model.recordedOnDisplay ? (
          <time dateTime={model.recordedOn}>{model.recordedOnDisplay}</time>
        ) : (
          'keine Entscheidung erfasst'
        )
      }
    >
      <div>
        <dt>Erfasste Entscheidungen</dt>
        <dd>{model.decisions.length}</dd>
      </div>
    </PageContextBar>
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
          {/* ANTWORT ZUERST (DR-0013 Nr. 1): die Liste steht unmittelbar unter der Überschrift.
              Reihenfolgeregel und die sechs invarianten Leseregeln – zusammen rund 250 Wörter –
              standen bis WP-028 VOR der ersten Entscheidung; sie sind vollständig erhalten,
              aber ruhig aufklappbar (P06, progressive Offenlegung). Keine Aussage entfällt. */}
          <ul className="sv-list">
            {model.decisions.map((decision) => (
              <DecisionCard key={decision.object_id} decision={decision} />
            ))}
          </ul>
          <RegisterReadingNotes orderRule={model.orderRule} />
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
 *
 * WP-028 Slice 3 (DR-0013 Nr. 1): Der Block steht jetzt NACH der Liste und aufklappbar. Er ist
 * unverändert vollständig – inklusive der sichtbaren Reihenfolgeregel („feste Reihenfolge, keine
 * Rangfolge"), die vorher als erster Absatz des Abschnitts stand. Verschoben, nicht gekürzt.
 */
function RegisterReadingNotes({ orderRule }: { orderRule: string }) {
  return (
    <details className="sv-details" style={{ marginTop: '1rem' }}>
      <summary>Wie diese Liste zu lesen ist</summary>
      <p className="sv-edge-note" style={{ marginTop: '0.5rem' }}>
        {orderRule}
      </p>
      <p className="sv-edge-note">
        <strong>Ablösung:</strong> Ein abgelöster Stand bleibt vollständig sichtbar und verlinkt –
        eine Ablösung ersetzt den früheren Stand fachlich, sie überschreibt und verbirgt ihn nicht
        (Beziehung „löst ab"). Beide Richtungen stehen getrennt: Quelle der Beziehung ist immer der
        Nachfolgestand. Zu jedem genannten Stand steht seine eigene fachliche Gültigkeit dabei.
      </p>
      <p className="sv-edge-note">
        <strong>Zwei Zeitachsen:</strong> Fachliche Gültigkeit und Systemerfassung werden getrennt
        geführt und nicht zu einem einzigen „Datum" verschmolzen. Ein Erfassungszeitpunkt ist keine
        fachliche Änderung.
      </p>
      <p className="sv-edge-note">
        <strong>Verantwortung ist keine Freigabe:</strong> Die Beziehung „verantwortet" und die
        Owner-Angabe benennen, wer zuständig ist – wer freigabeberechtigt wäre, ist im Modell nicht
        erfasst.
      </p>
      <p className="sv-edge-note">
        <strong>Bezug:</strong> belegt über die Beziehung „entschieden in" (ein Risiko, ein
        Änderungssignal oder ein Service verweist auf die Entscheidung). Sie wird bewusst neutral
        als Bezug gezeigt: ob sie den Zielbezug oder den Auslöser der Entscheidung abbildet, sagt
        das Konzept nicht – und es wird hier nicht entschieden.
      </p>
      <p className="sv-edge-note">
        <strong>Nachweise:</strong> belegt über die Beziehung „ist belegt durch" (ein Nachweis
        verweist auf die Entscheidung). Der „Status der Beziehung" ist ein Feld der Beziehung und
        kann hier einen Prüfstatus tragen.
      </p>
      <p className="sv-edge-note">
        <strong>Herkunft und Datenqualität:</strong> Quellen und Qualitätsdimensionen werden
        unverändert gezeigt und ausdrücklich nicht zu einem Gesamtwert verrechnet.
      </p>
    </details>
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
          Für <strong>{tenantName}</strong> ist im Datenbestand überhaupt nichts modelliert: weder
          Objekte noch Beziehungen – und damit auch keine Entscheidungen. Das ist ein anderer Fall
          als ein Mandant, der einen Datenbestand trägt, in dem nur die Entscheidungsschicht fehlt.
        </p>
      )}
      <p className="tw-muted">
        Für diesen Mandanten ist keine Entscheidung erfasst. Nutzen dieser Seite: Sie zeigt für den
        aktiven Mandanten, welche Entscheidungen erfasst sind, worauf sie sich beziehen, wie sie
        belegt sind und was sie abgelöst hat. Ohne erfasste Entscheidungen bleibt sie sichtbar leer
        – bewusst kein Platzhalter-Inhalt und keine erfundene Entscheidung.
      </p>
      <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
        <Link className="tw-cta" href="/login">
          Mandant wechseln →
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
          {decision.family_name ? decision.family_name : 'nicht im kanonischen Katalog zugeordnet'}
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
          'Auf diese Entscheidung zeigt im Datenbestand keine Bezugs-Beziehung („entschieden in").'
        }
      />

      <h4>Nachweise</h4>
      <EdgeList
        edges={decision.evidence}
        emptyText={
          'Auf diese Entscheidung zeigt im Datenbestand keine Nachweis-Beziehung. Ob ein Nachweis ' +
          'fachlich erforderlich wäre, sagt der Datenbestand nicht – hier steht nur, dass keiner ' +
          'erfasst ist.'
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
  // Nur das deutsche Klartext-Label (WP-028, DR-0013): weder die R-Kennung noch der
  // snake_case-Typ erscheinen im gerenderten Text; beide bleiben im Datenmodell erhalten.
  const label = edge.relationship_type_label ?? edge.relationship_type;

  return (
    <div className="tw-rel-line">
      {edge.orientation === 'eingehend' ? (
        <>
          <NeighborNode edge={edge} />
          <span className="tw-rel-arrow" aria-hidden="true">
            —
          </span>
          <span className="tw-rel-type">{label}</span>
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
          <span className="tw-rel-type">{label}</span>
          <span className="tw-rel-arrow" aria-hidden="true">
            →
          </span>
          <NeighborNode edge={edge} />
        </>
      )}
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
        Diese Seite zeigt <strong>keine Decision Card</strong> im Sinne der fachlichen Zielvorgabe
        des Konzepts. Die Decision Card ist dort als freigabefähiges Entscheidungsobjekt mit{' '}
        {DECISION_CARD_FIELDS.length} Pflichtfeldern beschrieben. Im zugrunde liegenden Datenmodell
        haben davon <strong>{ohneTraeger} keinen Träger</strong> und{' '}
        <strong>{teilweise} nur teilweise</strong> einen. Gezeigt wird deshalb, was das heutige
        Datenmodell belegt – und darunter steht feldweise, was es nicht belegt.
      </p>
      <ul className="sv-items" id="entscheidungen-luecke-pflichtfelder">
        {DECISION_CARD_FIELDS.map((field) => (
          <FieldItem key={field.field} field={field} />
        ))}
      </ul>

      {/* Das Konzept beschreibt den Decision Record im selben Abschnitt EIGENSTÄNDIG – mit einer
          zweiten, kürzeren Inhaltsliste. Sie wird getrennt geführt und getrennt gezählt: eine
          Summe über beide Listen gäbe es im Konzept nicht. (Quellenbeleg Dok. 10 „Decision Cards"
          bleibt im Kommentar; WP-028/DR-0013: keine Dokumentkennung im Produkttext.) */}
      <h3>Was das Konzept zusätzlich für den Decision Record selbst verlangt</h3>
      <p className="sv-edge-note">
        Das Konzept beschreibt den <strong>Decision Record</strong> eigenständig: „Nach Freigabe
        wird die Karte zum unveränderbaren Decision Record. Korrekturen erfolgen als neue Version
        oder Nachtrag. Festgehalten werden Option, Begründung, Freigabe, Bedingungen, erwartete
        Wirkung, Reviewtermin und spätere Ist-Wirkung." Diese {DECISION_RECORD_CONTENTS.length}{' '}
        Inhalte kommen zu den Pflichtfeldern oben hinzu; im heutigen Datenmodell hat{' '}
        <strong>keiner von ihnen einen Träger</strong>.
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

      {/* WP-020 Slice 5: die ZWEITE Pflichtfeldliste (Dok. 06) samt benanntem Widerspruch
          beider Listen. O-WP017-11 bleibt offen: keine Liste wird zur kanonischen erklärt,
          es wird weiterhin KEINE Decision Card gebaut – nur der Abgleich gezeigt. */}
      <h3>Die zweite Pflichtfeldliste – und der Widerspruch der beiden Listen</h3>
      <p className="sv-edge-note">
        Das Konzept führt an anderer Stelle eine <strong>eigene</strong> Liste „Decision Card –
        Pflichtfelder" mit {DECISION_CARD_FIELDS_DOK06.length} Feldern. Sie{' '}
        <strong>widerspricht der ersten Liste oben</strong> ({DECISION_CARD_FIELDS.length} Felder):
        Zählung und Zuschnitt decken sich nicht – die zweite Liste bündelt etwa „Entscheidungsfrage
        und Frist" in einem Feld und verlangt ein Gegenargument und ein Erfolgskriterium, die die
        erste nicht nennt; die erste verlangt umgekehrt Auslöser, Baseline und Abhängigkeiten, die
        die zweite nicht führt. Welche Liste kanonisch ist, ist im Konzept nicht entschieden und
        wird hier nicht entschieden – gezeigt wird der Abgleich gegen beide. Im heutigen Datenmodell
        haben von den {DECISION_CARD_FIELDS_DOK06.length} Feldern dieser zweiten Liste{' '}
        <strong>{countFields(DECISION_CARD_FIELDS_DOK06, 'kein Träger')} keinen Träger</strong> und{' '}
        <strong>{countFields(DECISION_CARD_FIELDS_DOK06, 'teilweise')} nur teilweise</strong> einen.
      </p>
      <ul className="sv-items" id="entscheidungen-luecke-dok06">
        {DECISION_CARD_FIELDS_DOK06.map((field) => (
          <FieldItem key={field.field} field={field} />
        ))}
      </ul>

      <p className="tw-muted">
        Diese Aufzählung ist eine Aussage über den heutigen Datenbestand und den heutigen
        Objektvertrag – kein Zeitplan und keine Zusage darüber, ob und wann die genannten Angaben
        entstehen.
      </p>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Ruhiger Abschluss: was diese Seite NICHT beantwortet (DR-0013 „Lücke zuletzt")
 * --------------------------------------------------------------------------- */

/**
 * Die Dringlichkeitsfrage – benannt, aber nicht mehr als Überschrift gestellt und im nächsten
 * Satz zurückgenommen (WP-028 Slice 3, DR-0013 Nr. 1; Muster `AdministrationContent`,
 * Abschnitt „Was ein Sicherheitsurteil zusätzlich braucht").
 *
 * SUBSTANZ UNVERÄNDERT: Ohne Frist, Aufwand, Kapazität und Priorität ist keine Aussage über
 * Dringlichkeit belegbar – das steht weiterhin vollständig da, samt der Zusage, dass auch keine
 * Sortierung sie andeutet. Was entfällt, ist ausschließlich das WÖRTLICHE ZITAT der aspirativen
 * Leitfrage: sie wird nicht mehr gestellt, also muss sie nicht mehr verneint werden. Der
 * Konzeptanker steht unverändert in `lib/shell/places.ts`.
 *
 * Hier steht zusätzlich der seitenweite Rahmungssatz zu Lebenszyklus-Ständen, WORTGLEICH aus
 * `components/isms/IsmsContent.tsx` und `components/twin/ObjectDetailView.tsx` (Dok. 08 08-D07,
 * per Test erzwungen). Er stand bis WP-028 über der Falz; jede Karte trägt die Rahmung
 * zusätzlich AM WERT („Lebenszyklus-Stand (kein Prüf- oder Freigabeergebnis)"), die Aussage
 * geht durch die Verlagerung also nicht verloren – sie wird nur einmal ruhig gesagt.
 */
function OffeneFrageSection() {
  return (
    <section aria-labelledby="entscheidungen-offen">
      <h2 id="entscheidungen-offen">Was diese Seite nicht beantwortet</h2>
      <p className="sv-edge-note">
        Ob eine dieser Entscheidungen <strong>jetzt</strong> ansteht, sagt diese Seite nicht. Eine
        Aussage über Dringlichkeit setzt eine Frist, einen Aufwand, eine verfügbare Kapazität und
        eine Priorität voraus. Das zugrunde liegende Datenmodell kennt keines dieser Felder, und der
        Datenbestand trägt sie nicht – jede Reihung nach Dringlichkeit wäre erfunden. Sie wird
        deshalb weder behauptet noch durch die Reihenfolge angedeutet.
      </p>
      {/* `tw-muted` bleibt als Klasse erhalten: der Wortgleichheits-Wächter der drei Seiten
          sucht exakt `p.tw-muted` mit „Zum Verständnis:" – die Verlagerung ans Seitenende darf
          den Wächter nicht aushebeln. */}
      <p className="tw-muted tw-seitenfuss">
        <strong>Zum Verständnis:</strong> Alle hier gezeigten Status-Angaben der Objekte sind
        Lebenszyklus-Stände aus dem Datenbestand – <strong>keine Prüfergebnisse</strong> und keine
        bewertete Wirksamkeit. Der „Status der Beziehung" ist dagegen ein Feld der Beziehung selbst
        und kann je nach Beziehungstyp auch einen Prüfstatus tragen: Ein Nachweisbezug kann etwa
        einen Zeitraum und einen Prüfstatus tragen.
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
