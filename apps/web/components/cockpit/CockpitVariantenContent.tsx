'use client';

/**
 * Cockpit-Start-Varianten – drei erlebbar unterschiedliche Startseiten auf EINEM belegten
 * Datenmodell (WP-025; Design-Vorlage `docs/project/design/WP-025_COCKPIT_VARIANTEN_KONZEPT.md`).
 *
 * Rendert AUSSCHLIESSLICH die in `lib/heute/dashboard.ts` (`buildHeuteDashboard`) und
 * `lib/heute/data.ts` (`buildMissionControl`) abgeleiteten Modelle des AKTIVEN Mandanten sowie
 * die Rollen-/Weltangaben aus `lib/shell/roles.ts`. Nichts wird hartkodiert, gerechnet oder
 * erfunden – jede Zahl entsteht im Helfer, jede Ampel folgt der Positivliste `BADGE_RULES`.
 *
 * DREI VARIANTEN (erlebbar unterschiedlich, nicht kosmetisch – Design-Vorlage §2):
 *  - A „Verdichtung": dichtes Kachelraster, Zahl groß + Status-Kennzeichen + Weg in die
 *    Begründung, Kennzeichen voll ausgereizt nach `BADGE_RULES`.
 *  - B „Fragen & Antworten": kurze Kette beantworteter Fragen (`MissionControlModel`),
 *    textgeführt, über die Detailtiefe gestaffelt, Kennzeichen sparsam („x von y").
 *  - C „Erlebniswelt": Weltband (Weltname + Weltleitfrage) + rollengewichtete Kacheln
 *    (`tileOrder`) + Management-Modus-Umschalter; Sphärentrennung Kunde/Betreiber am stärksten.
 *
 * EHRLICHKEITSGRENZE (DR-0008 / Antwort-Modus DR-0013): Kein Trend, Puls, Reifegrad, Zielstatus,
 * Managed-Service-Anteil-als-Wert, Score, Prozent, Frist, Priorität, Delta, Veränderungsfeed,
 * Empfehlung. Was keinen Datenträger hat, steht als BENANNTE Lücke (`CockpitLuecken`), nie als
 * erfundene Zahl. Ampeln ausschließlich nach der offengelegten Regel (`BADGE_RULES`).
 *
 * SPHÄRENGRENZE (DR-0012 / DR-0013 Nr. 11): Kundenrollen sehen nur den eigenen Mandanten (keine
 * Portfolio-Aggregation), Betreiber die Portfolio-Rahmung (`kundenSicht`/`mandantenwechselSichtbar`).
 * Keine Existenzaussage über fremde Mandanten, auch im Leerzustand (FINDING-0009-Klasse).
 *
 * NEUTRAL-FÄHIG (DR-0009): rendert ohne Rollenwahl vollständig (Variante C ohne Weltband).
 *
 * TIEFEN-/VARIANTEN-ZUSTAND: `variante`/`onVarianteChange` kommen von `CockpitView` (dort mit
 * versioniertem, mandantenfreiem localStorage-Schlüssel persistiert, `COCKPIT_STORAGE_KEY`).
 * Ohne `onVarianteChange` (Wächter/Alt-Tests) verwaltet die Komponente die Variante selbst; die
 * Detailtiefe der Variante B startet dann in VOLLER Tiefe (`initialTiefe`, Standard 3), damit die
 * Wächter den GESAMTEN gerenderten Text prüfen – die echte Seite startet in Standardtiefe 1.
 */
import Link from 'next/link';
import { useId, useState } from 'react';
import type { ReactNode } from 'react';
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
import { buildHeuteDashboard, type HeuteDashboardModel } from '../../lib/heute/dashboard';
import {
  DETAILTIEFEN,
  DETAILTIEFE_STANDARD,
  SECTION_EBENE,
  type Detailtiefe,
} from '../../lib/heute/detailtiefe';
import {
  MISSION_SECTIONS,
  MISSION_SECTION_IDS,
  framingForRole,
  type MissionSectionId,
} from '../../lib/heute/framing';
import {
  KANONISCHE_KACHELORDNUNG,
  varianteForRole,
  type Rollenvariante,
  type TileId,
} from '../../lib/heute/rollenvarianten';
import { worldForRole, type DemoRole, type ExperienceWorld } from '../../lib/shell/roles';
import {
  kundenSicht,
  mandantenwechselSichtbar,
  rollenReichweiteSatz,
} from '../../lib/shell/sphaere';
import {
  COCKPIT_STANDARD,
  COCKPIT_VARIANTEN,
  type CockpitVarianteId,
} from '../../lib/cockpit/varianten';
import {
  CoverageKachel,
  EmptyTenantKachel,
  LifecycleSummaryKachel,
  StockKachel,
} from '../shell/DashboardKacheln';
import { PageContextBar } from '../shell/PageContextBar';
import { ScopeKontextWert } from '../shell/ScopeKontext';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

export function CockpitVariantenContent({
  role,
  tenant,
  variante,
  onVarianteChange,
  initialTiefe = DETAILTIEFE_STANDARD,
}: {
  /** Aktive Produktrolle oder `null` = NEUTRALER Zustand (DR-0009). */
  role: DemoRole | null;
  tenant: DemoTenant;
  /** Gewählte Variante – von `CockpitView` gehalten und persistiert (COCKPIT_STORAGE_KEY). */
  variante?: CockpitVarianteId;
  /** Variantenwechsel-Handler; ohne ihn verwaltet die Komponente die Variante selbst. */
  onVarianteChange?: (variante: CockpitVarianteId) => void;
  /** Startwert der Detailtiefe (nur Variante B). Wächter rendern mit 3 (voller Textumfang). */
  initialTiefe?: Detailtiefe;
}) {
  // Unkontrollierter Fallback NUR für Wächter/Alt-Tests (Muster `MissionControlContent`).
  const [fallbackVariante, setFallbackVariante] = useState<CockpitVarianteId>(
    variante ?? COCKPIT_STANDARD,
  );
  const aktiveVariante: CockpitVarianteId = onVarianteChange
    ? (variante ?? COCKPIT_STANDARD)
    : fallbackVariante;
  const wechsleVariante = onVarianteChange ?? setFallbackVariante;

  // Detailtiefe der Variante B ist reiner Anzeigezustand dieser Komponente (Vergleichs-Spike);
  // die echte Persistenz einer bevorzugten Tiefe gehört zu WP-029 (O-WP025-01).
  const [tiefe, setTiefe] = useState<Detailtiefe>(initialTiefe);

  const model = buildMissionControl(tenant.tenant_id);
  const dashboard = buildHeuteDashboard(tenant.tenant_id);
  const world = role ? worldForRole(role) : null;

  return (
    <>
      <p className="tw-eyebrow">Cockpit · Varianten im Vergleich</p>
      <h1>Cockpit</h1>

      {/* SICHTBARE LEITFRAGE = die Frage, die jede Variante beantwortet (DR-0013 Nr. 1). Die
          aspirative Mission-Control-Frage des Screenkatalogs („seit meinem letzten Besuch …")
          wird bewusst NICHT geführt – sie hat keinen Träger und stünde nur, um im nächsten Satz
          zurückgenommen zu werden (siehe „Was hier bewusst nicht steht"). */}
      <p className="tw-question">
        Wie steht {tenant.display_name} heute da – was ist erfasst und wo sind die Lücken?
      </p>

      <p className="tw-lead">
        Drei Entwürfe für denselben Startpunkt auf demselben Datenbestand – zum Vergleich
        umschaltbar. Alle drei zeigen denselben belegten Stand des aktiven Mandanten; sie
        unterscheiden sich im Aufbau und im Erstkontakt, nicht in den Daten.
      </p>

      {model && dashboard ? (
        <>
          <CockpitContextBar model={model} role={role} tenant={tenant} world={world} />

          <VariantenSchalter variante={aktiveVariante} onChange={wechsleVariante} />

          {/* Der `data-cockpit-variante`-Anker macht die aktive Variante für die visuelle
              Abnahme (`qa:visual`) und die Wächter eindeutig adressierbar. */}
          <div className="ck-buehne" data-cockpit-variante={aktiveVariante}>
            {aktiveVariante === 'a' ? (
              <VarianteA dashboard={dashboard} role={role} />
            ) : aktiveVariante === 'b' ? (
              <VarianteB
                model={model}
                role={role}
                tenant={tenant}
                tiefe={tiefe}
                onTiefe={setTiefe}
              />
            ) : (
              <VarianteC dashboard={dashboard} role={role} world={world} />
            )}
          </div>

          <CockpitLuecken />

          <SeitenbausteineHinweis ort="cockpit" />
        </>
      ) : (
        /* NICHT ERREICHBAR, bewusst fail-loud (Muster `MissionControlContent`): die Prop ist ein
           `DemoTenant` aus dem Seed; `resolveSession` liefert ausschließlich bekannte Mandanten. */
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
 * Umschalter der drei Varianten (Text + Radio-Form, nie nur Farbe – 06-D11)
 * --------------------------------------------------------------------------- */

function VariantenSchalter({
  variante,
  onChange,
}: {
  variante: CockpitVarianteId;
  onChange: (variante: CockpitVarianteId) => void;
}) {
  const gruppe = useId();
  return (
    <fieldset className="ck-schalter">
      <legend>Cockpit-Variante zum Vergleich</legend>
      <div className="ck-schalter-optionen">
        {COCKPIT_VARIANTEN.map((meta) => (
          <label
            key={meta.id}
            className={
              meta.id === variante
                ? 'ck-schalter-option ck-schalter-option--aktiv'
                : 'ck-schalter-option'
            }
          >
            <input
              type="radio"
              name={gruppe}
              value={meta.id}
              checked={meta.id === variante}
              onChange={() => onChange(meta.id)}
            />
            <span className="ck-schalter-titel">{`Variante ${meta.kennung} · ${meta.name}`}</span>
            <span className="ck-schalter-nutzer">{meta.zielnutzer}</span>
            <span className="ck-schalter-leitidee">{meta.leitidee}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* -----------------------------------------------------------------------------
 * Querschnittliche Kontextleiste (identische Anatomie wie „Heute")
 * --------------------------------------------------------------------------- */

function CockpitContextBar({
  model,
  role,
  tenant,
  world,
}: {
  model: MissionControlModel;
  role: DemoRole | null;
  tenant: DemoTenant;
  world: ExperienceWorld | null;
}) {
  const waves = model.recordingWaves;
  const letzte = waves.length > 0 ? waves[waves.length - 1] : undefined;
  const scopeIds: string[] = [];
  for (const wave of waves) {
    for (const scopeId of wave.scopeIds) if (!scopeIds.includes(scopeId)) scopeIds.push(scopeId);
  }

  return (
    <PageContextBar
      role={role}
      tenant={tenant}
      scopeLabel="Scopes dieses Mandanten"
      scopeValue={<ScopeKontextWert scopeIds={scopeIds} />}
      datenstandLabel="Datenstand (zuletzt im System erfasst)"
      datenstandValue={
        letzte ? (
          <time dateTime={letzte.recordedOn}>{letzte.dateDisplay}</time>
        ) : (
          'keine Erfassung im Datenbestand'
        )
      }
    >
      {world ? (
        <div>
          <dt>Erlebniswelt</dt>
          <dd>{world.name}</dd>
        </div>
      ) : null}
    </PageContextBar>
  );
}

/* -----------------------------------------------------------------------------
 * Variante A — „Verdichtung" (Kachelraster, Kennzeichen voll ausgereizt)
 * --------------------------------------------------------------------------- */

/** Kanonische Render-Reihenfolge der Kacheln zu React-Elementen (Muster `DashboardSection`). */
function kachelElemente(dashboard: HeuteDashboardModel): Map<TileId, ReactNode> {
  const kacheln = new Map<TileId, ReactNode>();
  for (const tile of dashboard.stockTiles) kacheln.set(tile.id, <StockKachel tile={tile} />);
  if (dashboard.lifecycleSummary) {
    kacheln.set(
      'lebenszyklus_zaehlung',
      <LifecycleSummaryKachel tile={dashboard.lifecycleSummary} />,
    );
  }
  for (const tile of dashboard.coverage) kacheln.set(tile.id, <CoverageKachel tile={tile} />);
  return kacheln;
}

/** Ordnet die Kachel-Kennungen; unbekannte fallen fail-soft ans Ende (kein Datenverlust). */
function sichtbareOrdnung(
  kacheln: ReadonlyMap<TileId, ReactNode>,
  ordnung: readonly TileId[],
): TileId[] {
  return [
    ...ordnung.filter((id) => kacheln.has(id)),
    ...[...kacheln.keys()].filter((id) => !ordnung.includes(id)),
  ];
}

function VarianteA({ dashboard, role }: { dashboard: HeuteDashboardModel; role: DemoRole | null }) {
  const kacheln = kachelElemente(dashboard);
  const sichtbar = sichtbareOrdnung(kacheln, KANONISCHE_KACHELORDNUNG);

  return (
    <section aria-labelledby="cockpit-a-stand">
      <h2 id="cockpit-a-stand">Zustand auf einen Blick</h2>

      {/* Klartext-Zustand: jeder Satz aus abgeleiteten Zahlen, inkl. der ehrlichen Grenze
          (kein Delta, keine Entwicklung, keine wichtigste Ursache – kein Träger). */}
      <ul className="db-klartext">
        {dashboard.klartext.map((satz) => (
          <li key={satz}>{satz}</li>
        ))}
      </ul>

      <SphaerenNotiz role={role} kompakt />

      {dashboard.isEmpty && dashboard.emptyTile ? (
        <EmptyTenantKachel tile={dashboard.emptyTile} />
      ) : (
        <ul className="db-grid" aria-label="Kacheln aus belegten Daten">
          {sichtbar.map((id) => (
            <li key={id}>{kacheln.get(id)}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Variante B — „Fragen & Antworten" (Fragenkette, über Detailtiefe gestaffelt)
 * --------------------------------------------------------------------------- */

function VarianteB({
  model,
  role,
  tenant,
  tiefe,
  onTiefe,
}: {
  model: MissionControlModel;
  role: DemoRole | null;
  tenant: DemoTenant;
  tiefe: Detailtiefe;
  onTiefe: (tiefe: Detailtiefe) => void;
}) {
  // Reihenfolge der vier Fragen je Welt (`WORLD_FRAMINGS`); neutral = kanonische Reihenfolge.
  const sectionOrder = role
    ? (framingForRole(role.id)?.sectionOrder ?? MISSION_SECTION_IDS)
    : MISSION_SECTION_IDS;

  return (
    <section aria-labelledby="cockpit-b-fragen">
      <h2 id="cockpit-b-fragen">Vier Fragen, vier belegte Antworten</h2>
      <p className="sv-edge-note">
        Jede Überschrift ist eine Nutzerfrage; direkt darunter steht die belegte Antwort. Über die
        Detailtiefe öffnet sich die Kette schrittweise – die erste Ebene bleibt ruhig.
      </p>

      <TiefenSchalter tiefe={tiefe} onChange={onTiefe} />

      <SphaerenNotiz role={role} kompakt />

      {sectionOrder
        .filter((id) => cockpitEbene(id) <= tiefe)
        .map((id) => (
          <FrageBlock key={id} id={id} model={model} tenant={tenant} />
        ))}
    </section>
  );
}

/**
 * Ebene je Frage – „Wo stehe ich?" ist die ruhige erste Ebene (Ebene 1), damit Variante B in
 * der Standardtiefe wirklich mit EINER Frage beginnt (Design-Vorlage §2 Variante B). Die drei
 * tieferen Fragen folgen ab Ebene 2/3 (gleiche Staffelungs-Systematik wie `SECTION_EBENE`, nur
 * öffnet der „Standort" hier bereits auf Ebene 1 statt 2).
 */
function cockpitEbene(id: MissionSectionId): Detailtiefe {
  return id === 'standort' ? 1 : SECTION_EBENE[id];
}

function FrageBlock({
  id,
  model,
  tenant,
}: {
  id: MissionSectionId;
  model: MissionControlModel;
  tenant: DemoTenant;
}) {
  const headingId = `cockpit-b-${id}`;
  return (
    <section aria-labelledby={headingId} className="ck-frage">
      <h3 id={headingId}>{MISSION_SECTIONS[id].title}</h3>
      {id === 'standort' ? (
        <StandortAntwort model={model} tenant={tenant} />
      ) : id === 'erfassung' ? (
        <ErfassungAntwort waves={model.recordingWaves} tenant={tenant} />
      ) : id === 'datenlage' ? (
        <DatenlageAntwort observations={model.observations} />
      ) : (
        <EinstiegAntwort model={model} tenant={tenant} />
      )}
    </section>
  );
}

function StandortAntwort({ model, tenant }: { model: MissionControlModel; tenant: DemoTenant }) {
  const s = model.tenantStanding;
  if (s.isEmpty) {
    return (
      <p className="tw-empty" role="note">
        Für {tenant.display_name} sind im Datenbestand keine Objekte und keine Beziehungen
        modelliert. Es wird bewusst kein Ersatzinhalt gezeigt – die Datenlücke ist die Antwort.
      </p>
    );
  }
  return (
    <>
      <div className="tw-summary">
        <div className="tw-stat">
          <span className="tw-stat-num">{s.objectCount}</span>
          <span className="tw-stat-label">Objekte dieses Mandanten</span>
        </div>
        <div className="tw-stat">
          <span className="tw-stat-num">{s.relationshipCount}</span>
          <span className="tw-stat-label">Beziehungen dieses Mandanten</span>
        </div>
      </div>
      <p className="sv-item-meta">
        Gezählt wird ausschließlich der aktive Mandant. Objekte und Beziehungen anderer Mandanten
        sind hier weder enthalten noch verlinkt.
      </p>
    </>
  );
}

function ErfassungAntwort({
  waves,
  tenant,
}: {
  waves: readonly RecordingWave[];
  tenant: DemoTenant;
}) {
  if (waves.length === 0) {
    return (
      <p className="tw-empty" role="note">
        Für {tenant.display_name} ist im Datenbestand nichts erfasst – es gibt keine
        Erfassungswelle. Ein Erfassungszeitpunkt ist ohnehin keine Veränderung.
      </p>
    );
  }
  return (
    <>
      <p className="sv-edge-note">
        {anzahl(waves.length, 'Erfassungswelle', 'Erfassungswellen')} nach dem Kalendertag der
        Systemerfassung – kein Änderungsfeed: der Zeitpunkt der Erfassung ist keine fachliche
        Veränderung.
      </p>
      <ul className="sv-items">
        {waves.map((wave) => (
          <li key={wave.recordedOn}>
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
          </li>
        ))}
      </ul>
    </>
  );
}

function DatenlageAntwort({ observations }: { observations: readonly DataObservation[] }) {
  return (
    <>
      <p className="sv-edge-note">
        Vier gezählte Beobachtungen, jede mit ihrer Grundgesamtheit als „x von y" – hier bleibt es
        sparsam: gezählt und benannt, nicht gewichtet.
      </p>
      <ul className="sv-items">
        {observations.map((obs) => (
          <li key={obs.id}>
            <span className="sv-item-name">{obs.label}</span>
            <span className="sv-item-meta">
              {` · ${obs.count} von ${obs.total} ${obs.totalLabel}`}
            </span>
            <span className="sv-item-note">{`So wird gezählt: ${obs.method}`}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function EinstiegAntwort({ model, tenant }: { model: MissionControlModel; tenant: DemoTenant }) {
  return (
    <>
      <p className="sv-edge-note">
        Orte mit Bestand dieses Mandanten und je Objektfamilie ein Einstieg – ein Ort ohne Bestand
        wird benannt, nicht ausgeblendet.
      </p>
      <ul className="sv-items">
        {model.placeEntryPoints.map((entry) => (
          <PlaceZeile key={entry.placeId} entry={entry} />
        ))}
      </ul>
      {model.objectEntryPoints.length > 0 ? (
        <ul className="sv-items">
          {model.objectEntryPoints.map((entry) => (
            <ObjektZeile key={entry.objectId} entry={entry} />
          ))}
        </ul>
      ) : (
        <p className="tw-empty" role="note">
          Für {tenant.display_name} sind im Datenbestand keine Objekte modelliert, in die
          eingestiegen werden könnte.
        </p>
      )}
    </>
  );
}

function PlaceZeile({ entry }: { entry: PlaceEntryPoint }) {
  return (
    <li>
      <Link className="sv-item-name" href={entry.href}>
        {entry.label}
      </Link>
      <span className="sv-item-meta">
        {` · ${entry.stock.map((item) => `${item.count} ${item.label}`).join(' · ')}`}
      </span>
      {entry.isEmpty ? (
        <span className="sv-item-note">
          Für diesen Mandanten ist an diesem Ort im Datenbestand nichts modelliert. Der Ort bleibt
          erreichbar und zeigt dort denselben Leerzustand.
        </span>
      ) : null}
    </li>
  );
}

function ObjektZeile({ entry }: { entry: ObjectEntryPoint }) {
  return (
    <li>
      <span className="sv-item-name">{`${entry.familyName}: `}</span>
      <Link href={entry.href}>{entry.name}</Link>
      <span className="sv-item-meta">
        {` · ${entry.objectTypeDisplay} · ${anzahl(
          entry.familyObjectCount,
          'Objekt',
          'Objekte',
        )} dieser Familie in diesem Mandanten`}
      </span>
      <span className="sv-item-note">{entry.familyLeitfrage}</span>
    </li>
  );
}

/** Kompakter Detailtiefe-Umschalter der Variante B (Muster `MissionControlContent`). */
function TiefenSchalter({
  tiefe,
  onChange,
}: {
  tiefe: Detailtiefe;
  onChange: (tiefe: Detailtiefe) => void;
}) {
  const gruppe = useId();
  return (
    <fieldset className="ht-tiefe ht-tiefe--kompakt">
      <legend>Detailtiefe dieser Ansicht</legend>
      <div className="ht-tiefe-optionen">
        {DETAILTIEFEN.map((stufe) => (
          <label
            key={stufe.stufe}
            className={
              stufe.stufe === tiefe ? 'ht-tiefe-option ht-tiefe-option--aktiv' : 'ht-tiefe-option'
            }
          >
            <input
              type="radio"
              name={gruppe}
              value={stufe.stufe}
              checked={stufe.stufe === tiefe}
              onChange={() => onChange(stufe.stufe)}
            />
            <span className="ht-tiefe-titel">{`Ebene ${stufe.stufe} · ${stufe.titel}`}</span>
            <span className="ht-tiefe-beschreibung">{stufe.beschreibung}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* -----------------------------------------------------------------------------
 * Variante C — „Erlebniswelt" (Weltband + rollengewichtete Kacheln + Management-Modus)
 * --------------------------------------------------------------------------- */

function VarianteC({
  dashboard,
  role,
  world,
}: {
  dashboard: HeuteDashboardModel;
  role: DemoRole | null;
  world: ExperienceWorld | null;
}) {
  const [managementModus, setManagementModus] = useState(false);
  const { variante } = varianteForRole(role?.id ?? null);

  const kacheln = kachelElemente(dashboard);
  const ordnung = variante?.tileOrder ?? KANONISCHE_KACHELORDNUNG;
  const vollOrdnung = sichtbareOrdnung(kacheln, ordnung);
  // Management-Modus reduziert auf die Fokus-Kacheln der Rolle (nur wenn eine Variante existiert);
  // ohne Rollenfokus bleibt es bei der vollen, rollengewichteten Reihenfolge.
  const reduziert =
    managementModus && variante ? variante.fokusKacheln.filter((id) => kacheln.has(id)) : null;
  const sichtbar = reduziert ?? vollOrdnung;

  // Der Management-Modus-Umschalter hat nur dann einen Reduktionsgegenstand, wenn ein
  // Rollenfokus existiert UND der Mandant Kacheln trägt.
  const zeigeManagementModus = !dashboard.isEmpty && Boolean(variante);

  return (
    <section aria-labelledby="cockpit-c-welt">
      {world ? (
        <div className="ck-weltband" role="note">
          <p className="ck-weltband-name">{world.name}</p>
          <p className="ck-weltband-frage">{world.leitfrage}</p>
          <p className="ck-weltband-note">
            Diese Leitfrage rahmt die Erlebniswelt der aktiven Rolle, nicht diese Seite: hier wird
            gezählt und benannt.
          </p>
        </div>
      ) : (
        <p className="tw-muted">
          Neutraler Einstieg ohne Rolle: kein Weltband. Wählen Sie oben eine Produktrolle, um die
          Erlebniswelt der Rolle zu sehen; sie ist jederzeit wieder abwählbar.
        </p>
      )}

      <h2 id="cockpit-c-welt">Rollen- und Sphärensicht</h2>

      <SphaerenNotiz role={role} />

      {variante ? <p className="rv-fokus-text">{variante.nutzenSatz}</p> : null}

      {zeigeManagementModus && variante ? (
        <ManagementModusSchalter
          an={managementModus}
          onChange={setManagementModus}
          variante={variante}
        />
      ) : null}

      {dashboard.isEmpty && dashboard.emptyTile ? (
        <EmptyTenantKachel tile={dashboard.emptyTile} />
      ) : (
        <ul className="db-grid" aria-label="Rollengewichtete Kacheln aus belegten Daten">
          {sichtbar.map((id) => (
            <li key={id}>{kacheln.get(id)}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * Management-Modus „Wenn ich Geschäftsführer wäre" (Dok. 10, Abschnitt „Management-Modus").
 *
 * REDUZIEREN/UMSORTIEREN + LÜCKE BENENNEN, KEINE FABRIKATION (O-WP025-04): Das Konzept sieht
 * „drei geschäftliche Risiken", „maximal fünf Entscheidungen", Investitions-/Nichtstun-Option,
 * erwartete Wirkung, Freigabebedarf sowie Quellen vor. Davon hat HEUTE nur der Bestand einen
 * Träger – es gibt keine erfasste Reihung „die drei wichtigsten", keine Investitions-/
 * Wirkungsdaten. Der Umschalter darf deshalb NUR die Kachelmenge auf den Rollenfokus reduzieren
 * und die fehlenden Träger BENENNEN; er erfindet keine „drei wichtigsten Risiken". Der volle
 * Modus entsteht mit den Trägern aus WP-008 (Aufgaben & Entscheidungen).
 */
function ManagementModusSchalter({
  an,
  onChange,
  variante,
}: {
  an: boolean;
  onChange: (an: boolean) => void;
  variante: Rollenvariante;
}) {
  return (
    // Styling-Container ohne eigene Rolle: die Checkbox trägt ihren eigenen zugänglichen Namen
    // (das Label), ein zusätzliches `role="group"` auf einem `<div>` wäre redundant (Biome-a11y).
    <div className="ck-mgmt">
      <label className="ck-mgmt-toggle">
        <input type="checkbox" checked={an} onChange={(e) => onChange(e.target.checked)} />
        <span>Wenn ich Geschäftsführer wäre – auf das Wesentliche reduzieren</span>
      </label>
      {an ? (
        <p className="ck-mgmt-grenze">
          Reduziert auf die Kacheln des Rollenfokus ({variante.name}). Eine geschäftsführungsreife
          Sicht sähe zusätzlich eine Reihung der drei wichtigsten Geschäftsrisiken oder
          Zielabweichungen, höchstens fünf Entscheidungen mit Investitions- und Nichtstun-Option,
          erwarteter Wirkung, Freigabebedarf und Quellenangabe vor. Dafür gibt es im Datenbestand
          keinen Träger: es ist weder eine Reihung nach Bedeutung noch sind Wirkungs- oder
          Investitionsangaben erfasst. Deshalb wird hier nur reduziert und die Lücke benannt – die
          drei „wichtigsten" Risiken werden nicht erfunden.
        </p>
      ) : null}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Sphärentrennung Kunde vs. Betreiber (in Variante C am stärksten sichtbar)
 * --------------------------------------------------------------------------- */

/**
 * Benennt die Sphäre der aktiven Perspektive (DR-0012 / DR-0013 Nr. 11). Kundenrollen (und der
 * Auditor) sehen das EINE eigene Unternehmen (kein Portfolio); Betreiber die Portfolio-Rahmung
 * mit Mandantenwechsel in der Kopfleiste. Kein Wort über die Existenz oder Anzahl fremder
 * Mandanten – die Aussage betrifft ausschließlich die aktive Sicht (`rollenReichweiteSatz`).
 */
function SphaerenNotiz({ role, kompakt = false }: { role: DemoRole | null; kompakt?: boolean }) {
  const portfolio = kundenSicht(role) === 'portfolio';
  const wechsel = mandantenwechselSichtbar(role);
  // Neutral (keine Rolle, DR-0009) nimmt KEINE Sphäre an: der Ort erscheint in seiner Grundform
  // (Portfolio-Übersicht) – bewusst NICHT als „Betreibersicht" etikettiert.
  const titel =
    role === null
      ? 'Grundform: Portfolio-Übersicht.'
      : portfolio
        ? 'Betreibersicht: Portfolio.'
        : 'Kundensicht: dieses eine Unternehmen.';
  return (
    <div className="ht-neutral" role="note">
      <p className="ht-neutral-text">
        <strong>{titel}</strong>{' '}
        {portfolio
          ? `Dieser Einstieg gehört zur Portfolio-Sphäre; ${
              wechsel
                ? 'ein Mandantenwechsel steht in der Kopfleiste bereit'
                : 'ein Mandantenwechsel ist hier nicht vorgesehen'
            }. Gezeigt wird ausschließlich der aktive Mandant.`
          : 'Dieser Einstieg zeigt ausschließlich den aktiven Mandanten – ohne mandantenübergreifende Portfolio-Übersicht und ohne Mandantenwechsel in der Kopfleiste.'}
        {kompakt ? null : <> {rollenReichweiteSatz(role)}</>}
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Gemeinsame benannte Lücken (DR-0008 / DR-0013 Nr. 2) – für alle drei Varianten
 * --------------------------------------------------------------------------- */

/**
 * Was das Cockpit laut Konzept zusätzlich vorsieht und HEUTE keinen Datenträger hat – benannt
 * statt simuliert. Der Customer-Workspace-Kopf (Dok. 06, Abschnitt „Customer Workspace") und die
 * aspirativen Mission-Control-Bausteine (Dok. 06, Abschnitt „Mission Control & Morning Mission" /
 * Screenkatalog S01) haben bis WP-021/WP-008 keinen Träger. Bewusst OHNE Termin- oder
 * Funktionsversprechen (kein Zeitplan).
 */
function CockpitLuecken() {
  return (
    <section aria-labelledby="cockpit-luecke">
      <h2 id="cockpit-luecke">Was hier bewusst nicht steht</h2>
      <p className="sv-edge-note">
        Mehrere im Konzept beschriebene Bausteine des Cockpits haben heute keinen hinterlegten Wert.
        Sie werden benannt statt erfunden – ein erfundener Wert wäre die schlechtere Antwort.
      </p>
      <ul className="sv-items">
        <li>
          <span className="sv-item-name">Morning Mission und Veränderungsfeed</span>
          <span className="sv-item-note">
            Der Datenbestand kennt keine Aufgabenobjekte und kein Ereignis- oder Änderungsobjekt;
            die einzige Zeitangabe ist der Erfassungszeitpunkt – und der ist keine Veränderung. Eine
            Tagesmission mit Reihenfolge und ein „neu seit …" wären damit erfunden.
          </span>
        </li>
        <li>
          <span className="sv-item-name">
            „Seit meinem letzten Besuch" und eine Reihung nach Bedeutung
          </span>
          <span className="sv-item-note">
            Die Anmeldung speichert nur den gewählten Mandanten und optional eine Rolle – keinen
            Besuchszeitpunkt. Eine Reihung „was zuerst" bräuchte Angaben, die der Objektvertrag
            nicht kennt; sie wird deshalb nicht behauptet.
          </span>
        </li>
        <li>
          <span className="sv-item-name">
            Customer-Workspace-Kopf: Strategie-DNA, Zielprofil, Managed-Service-Anteil, Trend,
            Unternehmenspuls, Ursache-Wirkungs-Ketten, Hebel und Zeitachse
          </span>
          <span className="sv-item-note">
            Diese verdichteten Aussagen brauchen einen erfassten Verlauf und Beziehungen mit
            hinterlegter Wirkung, die für den aktiven Mandanten nicht erfasst sind. Sie entstehen
            erst mit weiterer Ausmodellierung des Datenbestands und der Aufgaben-/
            Entscheidungsschicht und werden hier nicht errechnet.
          </span>
        </li>
      </ul>
      <p className="tw-muted">
        Diese Benennung ist eine Aussage über den heutigen Datenbestand, kein Zeitplan.
      </p>
    </section>
  );
}
