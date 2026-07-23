/**
 * Präsentationaler Inhalt des Ortes „Heute" – Mission Control, read-only (WP-016 Slice 2).
 *
 * Rendert AUSSCHLIESSLICH das in `lib/heute/data.ts` abgeleitete Modell des AKTIVEN Mandanten
 * und die Rollen-/Weltangaben aus `lib/shell/roles.ts`. Es wird nichts hartkodiert, nichts
 * gerechnet und nichts erfunden: Zahlen entstehen im Helfer, Texte benennen ihre Ermittlungsregel.
 *
 * Vier Abschnitte (Dok. 06 §7 S01), Reihenfolge je Erlebniswelt aus `lib/heute/framing.ts`
 * (reversible Anzeigeentscheidung, dort mit Quelle und OFFENE FRAGE O-WP016-01 belegt):
 *   „Wo stehe ich?", „Was ist erfasst worden?", „Was weiß ich über die Datenlage?",
 *   „Wo steige ich ein?" – gefolgt vom Ehrlichkeitsblock „Was hier bewusst nicht steht".
 * Die Daten sind für alle zwölf Rollen IDENTISCH (Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02);
 * die Rolle ändert die REIHENFOLGE der Abschnitte und die Leitfrage der Erlebniswelt – sonst
 * weicht kein Wort ab (per Rollen-Gleichheitstest belegt). Kein Rollen-Gating.
 *
 * NICHT enthalten (WP-016 Nicht-Ziele): Morning Mission, Veränderungsfeed, Wiederaufnahme,
 * Score, Ampel, Reifegrad, Trend, Prozentwert, Schwellenwert, Prioritätsrang, Frist, Empfehlung,
 * Serviceangebot, Sortierung nach Schwere. Gezählt wird – bewertet wird nicht.
 *
 * Es werden auf dieser Seite bewusst KEINE Lebenszyklus-Stände angezeigt (die Einstiege nennen
 * Familie, Objekttyp und Anzahl, keinen Stand). Der seitenweite Rahmungssatz aus `IsmsContent` /
 * `ObjectDetailView` entfällt deshalb hier (WP-016 Acceptance 14) – ein „Prüfergebnis" wird an
 * keiner Stelle behauptet.
 *
 * Heading-Hierarchie: h1 (Ort) > h2 (Abschnitt) > h3 (Block) > h4 (Leerzustand im Block).
 * Bestehendes CSS-Vokabular, kein neues Designsystem (DR-0003).
 *
 * Bundle-Grenze (O-WP014-09): Routen und Datumsanzeige kommen fertig aus dem Modell; diese
 * Datei importiert weder `lib/twin/object-detail.ts` noch bildet sie selbst eine Route.
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';

import {
  anzahl,
  buildMissionControl,
  type DataObservation,
  type MissionControlModel,
  type ObjectEntryPoint,
  type PlaceEntryPoint,
  type RecordingWave,
} from '../../lib/heute/data';
import {
  MISSION_SECTIONS,
  MISSION_SECTION_IDS,
  framingForRole,
  type MissionSectionId,
} from '../../lib/heute/framing';
import { getPlace } from '../../lib/shell/places';
import { worldForRole, type DemoRole, type ExperienceWorld } from '../../lib/shell/roles';

/** Stabile DOM-ID je Abschnitt (für `aria-labelledby`). */
function sectionHeadingId(id: MissionSectionId): string {
  return `heute-${id}`;
}

export function MissionControlContent({ role, tenant }: { role: DemoRole; tenant: DemoTenant }) {
  const model = buildMissionControl(tenant.tenant_id);
  const world = worldForRole(role);
  const place = getPlace('heute');
  // NICHT ERREICHBAR, bewusst fail-soft belassen: `parseSession` verwirft unbekannte Rollen-IDs,
  // die Prop trägt immer eine der zwölf kanonischen Rollen. Fiele die Rahmung dennoch aus (z. B.
  // verändertes localStorage bei künftig gelockerter Session-Prüfung), zeigt die Seite dieselben
  // Daten in kanonischer Reihenfolge, statt leer zu bleiben – Muster `getRole`.
  const sectionOrder = framingForRole(role.id)?.sectionOrder ?? MISSION_SECTION_IDS;

  return (
    <>
      <p className="tw-eyebrow">Heute · Mission Control</p>
      <h1>Heute</h1>

      {/* Leitfrage des Ortes, wörtlich aus `lib/shell/places.ts` (Dok. 06 §7 S01). */}
      <p className="tw-question">{place.question}</p>

      <p className="tw-lead">
        Read-only Startpunkt auf dem synthetischen Demo-Datenbestand des aktiven Mandanten: wo Sie
        stehen, was im Datenbestand erfasst wurde, was über dessen Lage bekannt ist und wo Sie
        einsteigen können. Die Leitfrage wird nur so weit beantwortet, wie der Datenbestand sie
        belegt: Der Teil „seit meinem letzten Besuch" ist nicht belegt – und auch „was verdient
        Aufmerksamkeit" wird hier nicht beantwortet. Diese Seite zählt und benennt, sie
        priorisiert nicht. Beides steht am Seitenende als benannte Lücke.
      </p>

      {model ? (
        <>
          <ContextBar model={model} role={role} tenant={tenant} world={world} />

          {sectionOrder.map((id) => (
            <MissionSection
              key={id}
              id={id}
              model={model}
              role={role}
              tenant={tenant}
              world={world}
            />
          ))}

          <HonestySection model={model} />
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
 * Rolle, Erlebniswelt, Mandant, Scope und Datenstand querschnittlich sichtbar (Dok. 06 §6,
 * 06-D04). „Datenstand" ist ausdrücklich die SYSTEMACHSE (`record_time.recorded_at`, Dok. 07 §11)
 * und wird nicht mit der fachlichen Gültigkeit vermischt. Als Scope erscheinen die belegten
 * Kennungen aus dem Datenbestand – ein Klartextname existiert dazu nicht (O-WP014-03).
 *
 * // OFFENE FRAGE O-WP016-08: Dok. 06 §6 nennt für den Querschnitt außerdem „Vertrauensgrad"
 * // und „Version". Beide sind im Objektvertrag Felder EINES Objekts bzw. EINER Kante; für eine
 * // ganze Seite über einen Mandanten existiert kein belegter Wert. Ein zusammengefasster
 * // Vertrauensgrad wäre eine Verdichtung und damit eine Bewertung (verboten in diesem WP;
 * // vgl. Dok. 07 D10 und O-WP014-02), eine „Version des Mandanten" kennt der Contract nicht.
 * // Beide Felder bleiben hier deshalb LEER statt geraten; die belegten Einzelwerte stehen
 * // weiterhin an der Objekt-360-Seite. Produkt-/Konzeptklärung ausstehend.
 *
 * `role="group"` wie in `ObjectDetailView`: `dl` hat keine verlässliche implizite Rolle.
 */
function ContextBar({
  model,
  role,
  tenant,
  world,
}: {
  model: MissionControlModel;
  role: DemoRole;
  tenant: DemoTenant;
  world: ExperienceWorld;
}) {
  const waves = model.recordingWaves;
  const letzte = waves.length > 0 ? waves[waves.length - 1] : undefined;
  const scopeIds: string[] = [];
  for (const wave of waves) {
    for (const scopeId of wave.scopeIds) if (!scopeIds.includes(scopeId)) scopeIds.push(scopeId);
  }

  return (
    <dl className="od-context" role="group" aria-label="Kontext dieser Seite">
      <div>
        <dt>Aktive Rolle</dt>
        <dd>{`${role.id} · ${role.name}`}</dd>
      </div>
      <div>
        <dt>Erlebniswelt</dt>
        <dd>{world.name}</dd>
      </div>
      <div>
        <dt>Aktiver Mandant</dt>
        <dd>{tenant.display_name}</dd>
      </div>
      <div>
        <dt>Scope-Kennungen</dt>
        <dd>{scopeIds.length > 0 ? scopeIds.join(' · ') : 'keine Scope-Zuordnung erfasst'}</dd>
      </div>
      <div>
        <dt>Datenstand (zuletzt im System erfasst)</dt>
        <dd>
          {/* Kalendertag statt vollständigem Zeitstempel: die Anzeige nennt einen Tag, und eine
              Uhrzeit ist für die Tagesgruppe nicht belegt (`RecordingWave.recordedOn`). */}
          {letzte ? (
            <time dateTime={letzte.recordedOn}>{letzte.dateDisplay}</time>
          ) : (
            'keine Erfassung im Datenbestand'
          )}
        </dd>
      </div>
    </dl>
  );
}

/* -----------------------------------------------------------------------------
 * Abschnittsverteiler
 * --------------------------------------------------------------------------- */

function MissionSection({
  id,
  model,
  role,
  tenant,
  world,
}: {
  id: MissionSectionId;
  model: MissionControlModel;
  role: DemoRole;
  tenant: DemoTenant;
  world: ExperienceWorld;
}) {
  switch (id) {
    case 'standort':
      return <StandortSection model={model} role={role} tenant={tenant} world={world} />;
    case 'erfassung':
      return <ErfassungSection model={model} />;
    case 'datenlage':
      return <DatenlageSection model={model} />;
    case 'einstieg':
      return <EinstiegSection model={model} tenant={tenant} />;
    default: {
      // Exhaustiv: ein fünfter Abschnitt bricht den Typecheck, statt still zu verschwinden.
      const unbekannt: never = id;
      throw new Error(`Unbehandelter Abschnitt: ${String(unbekannt)}`);
    }
  }
}

/* -----------------------------------------------------------------------------
 * (1) Wo stehe ich?
 * --------------------------------------------------------------------------- */

function StandortSection({
  model,
  role,
  tenant,
  world,
}: {
  model: MissionControlModel;
  role: DemoRole;
  tenant: DemoTenant;
  world: ExperienceWorld;
}) {
  const headingId = sectionHeadingId('standort');
  const standing = model.tenantStanding;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{MISSION_SECTIONS.standort.title}</h2>

      <h3>Aktive Rolle</h3>
      {/* Rollenangaben vollständig aus `lib/shell/roles.ts` (Dok. 03 §3) – nichts übersetzt.
          Der NAME der Erlebniswelt steht bereits querschnittlich in der Kontextzeile und wird
          hier nicht wiederholt; neu ist an dieser Stelle ihre Leitfrage. */}
      <dl className="tw-meta">
        <dt>Rollen-ID</dt>
        <dd>{role.id}</dd>
        <dt>Produktrolle</dt>
        <dd>{role.name}</dd>
        <dt>Sphäre</dt>
        <dd>{role.sphere}</dd>
        <dt>Kernverantwortung</dt>
        <dd>{role.responsibility}</dd>
        <dt>Leitfrage dieser Erlebniswelt</dt>
        {/* Die Weltleitfrage darf nicht ungerahmt stehen bleiben: sie fragt je nach Welt nach
            Entscheidungen, Kurs oder Portfolio – alles Dinge, die genau diese Seite bewusst NICHT
            beantwortet. Ohne den Zusatz erzeugt sie dieselbe unerfüllte Erwartung, die der Lead
            für die Ortsleitfrage bereits ausräumt (Review-Fix). */}
        <dd>
          {world.leitfrage}
          <span className="sv-item-note">
            Diese Leitfrage rahmt die Erlebniswelt, nicht diese Seite: hier wird gezählt und
            benannt.
          </span>
        </dd>
      </dl>
      <p className="tw-muted">
        Die Rolle ist in dieser Demo reine Perspektive: Sie ordnet die Abschnitte dieser Seite,
        und diese Reihenfolge ist keine Rangfolge. Sie entscheidet nicht über Zugriff – alle zwölf
        Rollen sehen hier dieselben Daten desselben Mandanten (Dok. 06 06-D05). Rechte und
        Zugriffskontrolle sind in dieser Demo nicht abgebildet.
      </p>

      <h3>Aktiver Mandant</h3>
      <dl className="tw-meta">
        <dt>Mandant</dt>
        <dd>{tenant.display_name}</dd>
        <dt>Branche (synthetisch)</dt>
        <dd>{tenant.industry}</dd>
      </dl>

      {standing.isEmpty ? (
        <EmptyTenant tenant={tenant} />
      ) : (
        <>
          <div className="tw-summary">
            <div className="tw-stat">
              <span className="tw-stat-num">{standing.objectCount}</span>
              <span className="tw-stat-label">Objekte dieses Mandanten</span>
            </div>
            <div className="tw-stat">
              <span className="tw-stat-num">{standing.relationshipCount}</span>
              <span className="tw-stat-label">Beziehungen dieses Mandanten</span>
            </div>
          </div>
          <p className="sv-item-meta">
            Gezählt wird ausschließlich der aktive Mandant. Objekte und Beziehungen anderer
            Mandanten sind hier weder enthalten noch verlinkt.
          </p>
        </>
      )}
    </section>
  );
}

/**
 * Ehrlicher Leerzustand für Mandanten ohne eigenen Graphen (Dok. 06 §17: Nutzen + nächster
 * Schritt). Nennt bewusst KEINEN anderen Mandanten – weder Name noch Anzahl (Dok. 07 §17/P09).
 */
function EmptyTenant({ tenant }: { tenant: DemoTenant }) {
  return (
    <div className="tw-empty" role="note">
      <h4>Kein Datenbestand für {tenant.display_name}</h4>
      <p style={{ marginTop: 0 }}>
        Für <strong>{tenant.display_name}</strong> sind im Demo-Datenbestand keine Objekte und keine
        Beziehungen modelliert. Deshalb stehen hier keine Zahlen – und es werden auch keine
        erfunden.
      </p>
      <p className="tw-muted">
        Nutzen dieser Seite: Sie zeigt für den aktiven Mandanten Bestand, Erfassung, Datenlage und
        Einstiege. Ohne modellierten Bestand bleibt sie sichtbar leer, statt einen Eindruck zu
        erzeugen, den die Daten nicht tragen. Die Abschnitte darunter bleiben erhalten und weisen
        ihre Zählungen mit 0 aus.
      </p>
      <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
        <Link className="tw-cta" href="/login">
          Mandant wechseln (Anmelde-Simulation) →
        </Link>
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * (2) Was ist erfasst worden?
 * --------------------------------------------------------------------------- */

function ErfassungSection({ model }: { model: MissionControlModel }) {
  const headingId = sectionHeadingId('erfassung');
  const waves = model.recordingWaves;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{MISSION_SECTIONS.erfassung.title}</h2>
      <p className="sv-edge-note">
        Gezeigt wird die Systemachse: der Zeitpunkt, zu dem ein Datensatz im System erfasst wurde
        (record_time). Die fachliche Gültigkeit (valid_time) ist eine eigene Zeitachse und wird
        hier nicht damit vermischt (Dok. 07 §11).
      </p>

      <h3>Erfassungswellen im Datenbestand</h3>
      {waves.length > 0 ? (
        <>
          <p className="sv-edge-note">
            Die Wellen entstehen durch Gruppierung nach dem Kalendertag der Systemerfassung, in
            zeitlicher Reihenfolge. Eine fachliche Bezeichnung der Welle gibt es im Objektvertrag
            nicht; ausgewiesen werden deshalb die belegten Scope-Kennungen der erfassten Objekte.
          </p>
          <ul className="sv-items">
            {waves.map((wave) => (
              <WaveItem key={wave.recordedOn} wave={wave} />
            ))}
          </ul>
        </>
      ) : (
        <p className="tw-empty" role="note">
          Für diesen Mandanten ist im Datenbestand nichts erfasst: es gibt weder Objekte noch
          Beziehungen und damit auch keinen Erfassungszeitpunkt. Weiter geht es über den Wechsel
          des Mandanten in der Anmelde-Simulation.
        </p>
      )}

      <h3>Ein Erfassungszeitpunkt ist keine Veränderung</h3>
      <p>
        Wann etwas ins System kam, sagt nichts darüber, ob sich fachlich etwas geändert hat. Diese
        Seite macht daraus deshalb kein „neu", kein „geändert" und keinen Verlauf. Ein
        Veränderungsfeed bräuchte Ereignisobjekte – die trägt der Datenbestand nicht. Wo eine
        fachliche Ablösung erfasst ist, verbindet sie zwei eigenständige Objekte und ist damit
        ebenfalls kein Änderungsfeed.
      </p>
      {/* Aus den Daten abgeleitete Aussage (höchste Version, Ersetzungszeitpunkt,
          supersedes-Kanten) – kein konstanter Text, siehe `deriveHistoryState`. */}
      <p className="sv-item-meta">{model.historyState.statement}</p>
    </section>
  );
}

function WaveItem({ wave }: { wave: RecordingWave }) {
  return (
    <li>
      <span className="sv-item-name">
        <time dateTime={wave.recordedOn}>{wave.dateDisplay}</time>
      </span>
      <span className="sv-item-meta">
        {` · ${anzahl(wave.objectCount, 'Objekt', 'Objekte')} · ${anzahl(
          wave.relationshipCount,
          'Beziehung',
          'Beziehungen',
        )} an diesem Tag im System erfasst`}
      </span>
      <span className="sv-item-note">
        {wave.scopeIds.length > 0
          ? `Belegte Scope-Kennungen dieser Welle: ${wave.scopeIds.join(', ')}`
          : 'Keine Scope-Zuordnung an den Objekten dieser Welle erfasst.'}
      </span>
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * (3) Was weiß ich über die Datenlage?
 * --------------------------------------------------------------------------- */

function DatenlageSection({ model }: { model: MissionControlModel }) {
  const headingId = sectionHeadingId('datenlage');

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{MISSION_SECTIONS.datenlage.title}</h2>

      <h3>Gezählte Beobachtungen</h3>
      <p className="sv-edge-note">
        Jede Beobachtung nennt ihre Zählung, ihre Grundgesamtheit und die Regel, nach der gezählt
        wurde. Die Reihenfolge ist eine feste Katalogreihenfolge und sagt nichts über Bedeutung
        aus. Eine Zählung von 0 bleibt sichtbar, weil auch sie eine Aussage über den Datenbestand
        ist.
      </p>
      <ul className="sv-items">
        {model.observations.map((observation) => (
          <ObservationItem key={observation.id} observation={observation} />
        ))}
      </ul>

      <h3>Was diese Zählungen nicht sind</h3>
      <p className="tw-muted">
        Hier wird gezählt und benannt, nicht bewertet: Es gibt keine Gewichtung, keine Sortierung
        nach Bedeutung und keine abgeleitete Handlung. Ob eine fehlende Angabe fachlich zulässig
        ist, sagt der Datenbestand nicht – diese Seite behauptet es deshalb auch nicht.
      </p>
    </section>
  );
}

function ObservationItem({ observation }: { observation: DataObservation }) {
  return (
    <li>
      <span className="sv-item-name">{observation.label}</span>
      <span className="sv-item-meta">
        {` · ${observation.count} von ${observation.total} ${observation.totalLabel}`}
      </span>
      <span className="sv-item-note">{`Ermittlungsregel: ${observation.method}`}</span>
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * (4) Wo steige ich ein?
 * --------------------------------------------------------------------------- */

function EinstiegSection({ model, tenant }: { model: MissionControlModel; tenant: DemoTenant }) {
  const headingId = sectionHeadingId('einstieg');

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{MISSION_SECTIONS.einstieg.title}</h2>

      <h3>Orte mit Bestand dieses Mandanten</h3>
      <p className="sv-edge-note">
        Die Orte der Navigation bleiben stabil (Dok. 06 06-D01): ein Ort ohne Bestand wird benannt,
        nicht ausgeblendet. Die Bestandsangabe zählt ausschließlich den aktiven Mandanten.
      </p>
      <ul className="sv-items">
        {model.placeEntryPoints.map((entry) => (
          <PlaceEntryItem key={entry.placeId} entry={entry} />
        ))}
      </ul>

      <h3>Ein Objekt-Einstieg je Objektfamilie</h3>
      <p className="sv-edge-note">{model.objectEntryRule}</p>
      {model.objectEntryPoints.length > 0 ? (
        <ul className="sv-items">
          {model.objectEntryPoints.map((entry) => (
            <ObjectEntryItem key={entry.objectId} entry={entry} />
          ))}
        </ul>
      ) : (
        <p className="tw-empty" role="note">
          Für {tenant.display_name} sind im Demo-Datenbestand keine Objekte modelliert, in die
          eingestiegen werden könnte. Der Zwilling dieses Mandanten bleibt erreichbar und zeigt
          denselben – leeren – Stand; ein Mandantenwechsel ist über die Anmelde-Simulation möglich.
        </p>
      )}
    </section>
  );
}

/**
 * `.sv-item-meta` ist eine INLINE-Auszeichnung (globals.css: nur Farbe und Schriftgröße),
 * `.sv-item-note` dagegen `display: block`. Je Listeneintrag steht deshalb höchstens EINE
 * Metazeile; jede weitere Zeile ist eine Note. Zwei aufeinanderfolgende Metazeilen liefen im
 * Browser sonst zu einem Fließtext zusammen, weil JSX den reinen Zeilenumbruch zwischen zwei
 * Elementen entfernt (Review-Fix, Muster aus `components/isms/IsmsCards.tsx`).
 */
function PlaceEntryItem({ entry }: { entry: PlaceEntryPoint }) {
  return (
    <li>
      <Link className="sv-item-name" href={entry.href}>
        {entry.label}
      </Link>
      <span className="sv-item-meta">
        {` · ${entry.stock.map((item) => `${item.count} ${item.label}`).join(' · ')}`}
      </span>
      {/* Leitfrage des Ortes – entfällt, wo der Einstieg sie nicht beantwortet (siehe
          `derivePlaceEntryPoints`). */}
      {entry.question ? <span className="sv-item-note">{entry.question}</span> : null}
      {entry.isEmpty ? (
        /* Leerer Ort wird benannt, nicht versteckt (Dok. 06 06-D01 / §17). */
        <span className="sv-item-note">
          Für diesen Mandanten ist an diesem Ort im Datenbestand nichts modelliert. Der Ort bleibt
          erreichbar und zeigt dort denselben Leerzustand.
        </span>
      ) : null}
    </li>
  );
}

function ObjectEntryItem({ entry }: { entry: ObjectEntryPoint }) {
  return (
    <li>
      <span className="sv-item-name">{`${entry.familyId} · ${entry.familyName}: `}</span>
      {/* Route ausschließlich aus dem Modell (`objectDetailHref` mit dem aktiven Mandanten). */}
      <Link href={entry.href}>{entry.name}</Link>
      <span className="sv-item-meta">
        {` · ${entry.objectTypeDisplay} · ${anzahl(
          entry.familyObjectCount,
          'Objekt',
          'Objekte',
        )} dieser Familie in diesem Mandanten`}
      </span>
      {/* Leitfrage der Familie als eigene Zeile (`sv-item-note`, block-level) – siehe
          `PlaceEntryItem`: zwei Metazeilen liefen im Browser zusammen. */}
      <span className="sv-item-note">{entry.familyLeitfrage}</span>
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * Ehrlichkeitsblock – benannte Datenlücke (Dok. 06 §17 „Partial data")
 * --------------------------------------------------------------------------- */

/**
 * Was auf dieser Seite fehlt und WARUM – als Datenlücke, nicht als Roadmap.
 *
 * Bewusst ohne Termin- und ohne Funktionsversprechen („kommt bald" wäre eine Zusage, die dieses
 * Work Package nicht geben darf). Die Historienaussage ist aus den Daten abgeleitet; die Aussagen
 * über fehlende Aufgabenobjekte (`Task`) und über die fehlenden Vertragsfelder sind Aussagen über
 * Datenbestand und Objektvertrag und werden im Render-Test gegen den Datenbestand festgenagelt,
 * damit sie nicht still veralten.
 */
function HonestySection({ model }: { model: MissionControlModel }) {
  return (
    <section aria-labelledby="heute-luecke">
      <h2 id="heute-luecke">Was hier bewusst nicht steht</h2>
      <p className="sv-edge-note">
        Drei im Konzept beschriebene Bausteine dieses Ortes fehlen. Die Ursache ist je Baustein
        eine andere und steht darunter jeweils dabei – Datenbestand, Objektvertrag oder
        Anmelde-Simulation. Sie werden hier benannt statt verborgen (Dok. 06 §17): ein leerer
        Platzhalter oder ein erfundener Inhalt wäre die schlechtere Antwort.
      </p>
      <ul className="sv-items">
        <li>
          <span className="sv-item-name">Morning Mission (Tagesmission mit Reihenfolge)</span>
          {/* Kanonischer Typname: für „Task" führt die einzige Quelle deutscher
              Objekttyp-Glossen (`OBJECT_TYPE_LABEL_DE` in `lib/twin/data.ts`) bewusst KEINE
              Übersetzung – hier wird keine erfunden (Review-Fix).

              WP-017: Der Satz nannte vorher auch „Decision Record" als nicht vorhanden. Seit der
              Entscheidungsschicht im Demo-Datenbestand wäre das falsch; er ist deshalb auf „Task"
              verengt. Die Begründung trägt weiterhin: es fehlen die Aufgabenobjekte UND die
              Vertragsfelder für Fälligkeit, Aufwand, Kapazität und Priorität. */}
          <span className="sv-item-note">
            Ursache in der Datenlage: Der Demo-Datenbestand enthält keine Objekte des Typs „Task" –
            der Typ steht im kanonischen Katalog (Dok. 07 §6), ist aber in keinem Mandanten
            angelegt. Der Objektvertrag (Dok. 07 §7) kennt außerdem kein Feld für Fälligkeit,
            Aufwand, Kapazität oder Priorität. Ohne Aufgaben und ohne diese Angaben wäre jede
            Tagesmission und jede Reihenfolge erfunden.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Veränderungsfeed („neu seit …")</span>
          {/* WP-017: Ablösung ≠ Änderungsfeed. Die Historienaussage darunter kann seit der
              Entscheidungsschicht „belegt" lauten – daraus darf kein Ereignisstrom werden. */}
          <span className="sv-item-note">
            Ursache im Datenmodell: Es gibt kein Ereignis- und kein Änderungsobjekt; die einzige
            Zeitangabe, die die Systemachse überhaupt kennt, ist der Erfassungszeitpunkt – und der
            ist keine Änderung. Eine erfasste fachliche Ablösung (Dok. 07 §9 R24) verbindet zwei
            eigenständige Objekte und sagt, welcher Stand welchen ersetzt hat; sie ist damit kein
            Ereignis- und kein Änderungsfeed und ergibt kein „neu seit …". Aus den Daten
            abgeleitete Historienlage:{' '}
            {model.historyState.statement}
          </span>
        </li>
        <li>
          <span className="sv-item-name">Wiederaufnahme („seit meinem letzten Besuch")</span>
          <span className="sv-item-note">
            Ursache in der Datenlage: Die Anmelde-Simulation speichert ausschließlich die gewählte
            Rolle und den gewählten Mandanten – keinen Besuchszeitpunkt, keinen bestätigten Zustand
            und keinen Entwurf. Ein Vergleich mit einem früheren Besuch wäre damit nicht belegt,
            sondern behauptet.
          </span>
        </li>
      </ul>
      <p className="tw-muted">
        Diese Aufzählung ist eine Aussage über den heutigen Datenbestand, kein Zeitplan: ob und wann
        die genannten Bausteine entstehen, sagt diese Seite bewusst nicht.
      </p>
    </section>
  );
}
