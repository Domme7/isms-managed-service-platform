'use client';

/**
 * Cockpit „Bento-Mosaik" (WP-034 Slice 2, DR-0016 – vom Owner gewählte Variante A).
 *
 * Kompaktes Grafik-Dashboard mit Kacheln UNTERSCHIEDLICHER Größe (Radar-Hero groß, Zahl-/Ring-
 * kacheln klein) statt Langscroll; ein Klick TAUCHT in die vollständige, selbsterklärende Kachel
 * (Frage, „x von y", Badge, Ermittlungsregel, Datenstand) samt echtem Drill-down-Link zur Quelle
 * (/isms, digitaler Zwilling …). Übergang mit „Eintauch"-Animation (prefers-reduced-motion-fest).
 *
 * „NICHTS NUR SHOW" (DR-0008/DR-0014): Es wird AUSSCHLIESSLICH das in `lib/heute/dashboard.ts`
 * (`buildHeuteDashboard`) und `lib/heute/data.ts` (`buildMissionControl`) abgeleitete Modell des
 * AKTIVEN Mandanten gerendert, plus der Radar aus `buildCockpitRadar` (die vier Abdeckungen).
 * Nichts hartkodiert, kein Score, keine erfundene Bewertung; jede Farbe folgt der Ampel-Regel
 * (`lib/cockpit/ampel.ts`), jede Kachel führt in ihre Begründung.
 *
 * SPHÄRENGRENZE (DR-0012 / DR-0013 Nr. 11): nur der aktive Mandant, keine Portfolio-Aggregation,
 * kein Wort über fremde Mandanten – auch im Leerzustand. NEUTRAL-FÄHIG (DR-0009): rendert ohne
 * Rollenwahl vollständig. Die ausführliche A/B/C-Tagesansicht bleibt unter „Heute" erreichbar.
 */
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import type { DemoTenant } from '@isms/demo-seed';

import { buildCockpitLebenszyklus } from '../../lib/cockpit/lebenszyklus';
import { buildCockpitWarnungen } from '../../lib/cockpit/warnungen';
import { AMPEL_LEGENDE, coverageTileStatus, type CockpitStatus } from '../../lib/cockpit/ampel';
import { buildCockpitRadar, RADAR_LABEL } from '../../lib/cockpit/radar';
import {
  buildMissionControl,
  type MissionControlModel,
  type RecordingWave,
} from '../../lib/heute/data';
import {
  buildHeuteDashboard,
  type CoverageTile,
  type HeuteDashboardModel,
  type StockTile,
} from '../../lib/heute/dashboard';
import { worldForRole, type DemoRole, type ExperienceWorld } from '../../lib/shell/roles';
import {
  kundenSicht,
  mandantenwechselSichtbar,
  rollenReichweiteSatz,
} from '../../lib/shell/sphaere';
import { CockpitLebenszyklusLeiste } from './CockpitLebenszyklusLeiste';
import { CockpitLegende } from './CockpitLegende';
import { CockpitRadar } from './CockpitRadar';
import { CockpitWarnungen } from './CockpitWarnungen';
import { CoverageRing } from './CoverageRing';
import {
  CoverageKachel,
  EmptyTenantKachel,
  LifecycleSummaryKachel,
  StockKachel,
} from '../shell/DashboardKacheln';
import { PageContextBar } from '../shell/PageContextBar';
import { ScopeKontextWert } from '../shell/ScopeKontext';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

/** Hell/Dunkel des Cockpits – reine Anzeige, mandanten-/rollenfrei persistiert (Cross-Tenant). */
type CockpitTheme = 'hell' | 'dunkel';
const COCKPIT_THEME_KEY = 'isms-cockpit-theme-v1';

/** Adressierbare Bento-Kachel (Eintauch-Ziel). */
type BentoKey = 'radar' | CoverageTile['id'] | StockTile['id'] | 'lebenszyklus_zaehlung';

/** Sichtbarer Status-Text (nie nur Farbe) – aus der Legende, eine Quelle. */
function statusLabel(status: CockpitStatus): string {
  return AMPEL_LEGENDE.find((e) => e.status === status)?.label ?? 'neutraler Stand';
}

export function CockpitBentoContent({
  role,
  tenant,
}: {
  /** Aktive Produktrolle oder `null` = NEUTRALER Zustand (DR-0009). */
  role: DemoRole | null;
  tenant: DemoTenant;
}) {
  const [theme, setTheme] = useState<CockpitTheme>('hell');
  useEffect(() => {
    try {
      const gespeichert = window.localStorage.getItem(COCKPIT_THEME_KEY);
      if (gespeichert === 'hell' || gespeichert === 'dunkel') setTheme(gespeichert);
    } catch {
      // Speicher nicht verfügbar (z. B. privater Modus) – Hell bleibt.
    }
  }, []);
  const wechsleTheme = () => {
    setTheme((prev) => {
      const next: CockpitTheme = prev === 'dunkel' ? 'hell' : 'dunkel';
      try {
        window.localStorage.setItem(COCKPIT_THEME_KEY, next);
      } catch {
        // Speicher nicht verfügbar – die Wahl gilt dann nur für diese Sitzung.
      }
      return next;
    });
  };

  const model = buildMissionControl(tenant.tenant_id);
  const dashboard = buildHeuteDashboard(tenant.tenant_id);
  const world = role ? worldForRole(role) : null;
  const warnungen = buildCockpitWarnungen(tenant.tenant_id);
  const lebenszyklus = buildCockpitLebenszyklus(tenant.tenant_id);
  const radar = dashboard ? buildCockpitRadar(dashboard.coverage) : undefined;

  return (
    <div className="ck-cockpit" data-ck-theme={theme}>
      <div className="ck-kopf">
        <div>
          <p className="tw-eyebrow">Cockpit</p>
          <h1>Cockpit</h1>
        </div>
        <ThemeSchalter theme={theme} onToggle={wechsleTheme} />
      </div>

      <p className="tw-question">
        Wie steht {tenant.display_name} heute da – was ist erfasst und wo sind die Lücken?
      </p>

      <p className="tw-lead">
        Ihr Cockpit auf den Datenbestand des aktiven Mandanten – farbcodiert nach erfasster
        Datenlage. Jede Zahl, jeder Ring und jede Warnung ist abgeleitet und führt zu ihrer Quelle;
        wählen Sie eine Kachel, um in ihre Begründung einzutauchen.
      </p>

      {model && dashboard ? (
        <>
          <CockpitContextBar model={model} role={role} tenant={tenant} world={world} />

          {dashboard.isEmpty ? null : <CockpitLegende />}

          {dashboard.isEmpty && dashboard.emptyTile ? (
            <EmptyTenantKachel tile={dashboard.emptyTile} />
          ) : (
            <CockpitBentoBuehne dashboard={dashboard} radar={radar} role={role} />
          )}

          <CockpitWarnungen warnungen={warnungen} />
          {lebenszyklus ? <CockpitLebenszyklusLeiste bar={lebenszyklus} /> : null}

          <p className="ck-heute-link">
            <Link className="tw-cta" href="/heute">
              Zur ausführlichen Tagesansicht „Heute" →
            </Link>
          </p>

          <CockpitLuecken />

          <SeitenbausteineHinweis ort="cockpit" />
        </>
      ) : (
        /* NICHT ERREICHBAR, bewusst fail-loud (Muster `CockpitVariantenContent`): die Prop ist ein
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
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Eintauch-Bühne: kompakte Übersicht ⇄ Detail-Kachel mit „Eintauch"-Animation
 * --------------------------------------------------------------------------- */

function CockpitBentoBuehne({
  dashboard,
  radar,
  role,
}: {
  dashboard: HeuteDashboardModel;
  radar: ReturnType<typeof buildCockpitRadar>;
  role: DemoRole | null;
}) {
  const [offen, setOffen] = useState<BentoKey | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const letzterKey = useRef<BentoKey | null>(null);

  // Fokus wandert mit dem Eintauchen: beim Öffnen auf das Detail, beim Zurück auf die zuletzt
  // getauchte Kachel – Tastaturbedienung bleibt vollständig, auch ohne Animation.
  useEffect(() => {
    if (offen) {
      detailRef.current?.focus();
    } else if (letzterKey.current) {
      const ziel = stageRef.current?.querySelector<HTMLElement>(
        `[data-tilekey="${letzterKey.current}"]`,
      );
      ziel?.focus();
    }
  }, [offen]);

  const oeffne = (key: BentoKey) => {
    letzterKey.current = key;
    setOffen(key);
  };

  return (
    <div className="ck-bento-buehne" ref={stageRef}>
      <SphaerenNotiz role={role} kompakt />
      {offen ? (
        <BentoDetail
          keyId={offen}
          dashboard={dashboard}
          radar={radar}
          onBack={() => setOffen(null)}
          detailRef={detailRef}
        />
      ) : (
        <BentoUebersicht dashboard={dashboard} radar={radar} onOeffne={oeffne} />
      )}
    </div>
  );
}

function coverageById(
  dashboard: HeuteDashboardModel,
  id: CoverageTile['id'],
): CoverageTile | undefined {
  return dashboard.coverage.find((t) => t.id === id);
}
function stockById(dashboard: HeuteDashboardModel, id: StockTile['id']): StockTile | undefined {
  return dashboard.stockTiles.find((t) => t.id === id);
}

function BentoUebersicht({
  dashboard,
  radar,
  onOeffne,
}: {
  dashboard: HeuteDashboardModel;
  radar: ReturnType<typeof buildCockpitRadar>;
  onOeffne: (key: BentoKey) => void;
}) {
  const bestand = stockById(dashboard, 'bestand');
  const isms = stockById(dashboard, 'isms_kern');
  const entscheidungen = stockById(dashboard, 'entscheidungen');
  const services = stockById(dashboard, 'services');

  return (
    <ul className="ck-bento" aria-label="Kacheln aus belegten Daten – zum Eintauchen wählbar">
      {radar ? (
        <li className="ck-bento-zelle ck-bento-zelle--hero">
          <button
            type="button"
            className="ck-bento-kachel ck-bento-kachel--radar"
            data-tilekey="radar"
            onClick={() => onOeffne('radar')}
          >
            <span className="ck-bento-label">Abdeckungsprofil über vier Dimensionen</span>
            <CockpitRadar radar={radar} />
            <span className="ck-bento-mehr" aria-hidden="true">
              eintauchen →
            </span>
          </button>
        </li>
      ) : null}

      {bestand ? <ZahlZelle tile={bestand} breit onOeffne={onOeffne} /> : null}

      {dashboard.coverage.map((tile) => (
        <RingZelle key={tile.id} tile={tile} onOeffne={onOeffne} />
      ))}

      {dashboard.lifecycleSummary ? (
        <li className="ck-bento-zelle">
          <button
            type="button"
            className="ck-bento-kachel ck-bento-kachel--zahl"
            data-tilekey="lebenszyklus_zaehlung"
            onClick={() => onOeffne('lebenszyklus_zaehlung')}
          >
            <span className="ck-bento-label">Verschiedene Lebenszyklus-Stände</span>
            <span className="ck-bento-num">{dashboard.lifecycleSummary.distinctCount}</span>
            <span className="ck-bento-sub">verschiedene erfasste Stände</span>
            <span className="ck-bento-mehr" aria-hidden="true">
              eintauchen →
            </span>
          </button>
        </li>
      ) : null}

      {isms ? <ZahlZelle tile={isms} onOeffne={onOeffne} /> : null}
      {entscheidungen ? <ZahlZelle tile={entscheidungen} onOeffne={onOeffne} /> : null}
      {services ? <ZahlZelle tile={services} onOeffne={onOeffne} /> : null}
    </ul>
  );
}

function ZahlZelle({
  tile,
  breit = false,
  onOeffne,
}: {
  tile: StockTile;
  breit?: boolean;
  onOeffne: (key: BentoKey) => void;
}) {
  const haupt = tile.values[0];
  return (
    <li className={breit ? 'ck-bento-zelle ck-bento-zelle--breit' : 'ck-bento-zelle'}>
      <button
        type="button"
        className="ck-bento-kachel ck-bento-kachel--zahl"
        data-tilekey={tile.id}
        onClick={() => onOeffne(tile.id)}
      >
        <span className="ck-bento-label">{haupt?.label ?? 'Bestand'}</span>
        <span className="ck-bento-num">{haupt?.count ?? 0}</span>
        <span className="ck-bento-sub">
          {tile.values.map((wert) => `${wert.count} ${wert.label}`).join(' · ')}
        </span>
        <span className="ck-bento-mehr" aria-hidden="true">
          eintauchen →
        </span>
      </button>
    </li>
  );
}

function RingZelle({ tile, onOeffne }: { tile: CoverageTile; onOeffne: (key: BentoKey) => void }) {
  const status = coverageTileStatus(tile);
  return (
    <li className="ck-bento-zelle ck-bento-zelle--hoch">
      <button
        type="button"
        className={`ck-bento-kachel ck-bento-kachel--ring ck-status--${status}`}
        data-tilekey={tile.id}
        onClick={() => onOeffne(tile.id)}
      >
        <span className="ck-bento-label">{RADAR_LABEL[tile.id]}</span>
        {tile.isEmpty ? (
          <>
            <span className="ck-bento-num ck-bento-num--leer">0 von 0</span>
            <span className="ck-bento-status">{statusLabel(status)}</span>
          </>
        ) : (
          <>
            {/* Bei n≤2 KEINE gefüllte Ring-Geometrie (Parität zu `CockpitKpiBand`/DR-0013 Nr. 7):
                ein voller Ring über „1 von 1" läse sich wie eine vollständige Landschaft. */}
            {tile.kleineGrundgesamtheit ? null : (
              <CoverageRing covered={tile.covered} total={tile.total} status={status} />
            )}
            <span className="ck-bento-wert">
              {tile.covered} von {tile.total}
            </span>
            <span className="ck-bento-status">{statusLabel(status)}</span>
            {tile.kleineGrundgesamtheit ? (
              <span className="ck-bento-klein">zu wenige Fälle für eine Aussage</span>
            ) : null}
          </>
        )}
        <span className="ck-bento-mehr" aria-hidden="true">
          eintauchen →
        </span>
      </button>
    </li>
  );
}

/** Eintauch-Detail: die vollständige, selbsterklärende Kachel (mit echtem Quell-Link). */
function BentoDetail({
  keyId,
  dashboard,
  radar,
  onBack,
  detailRef,
}: {
  keyId: BentoKey;
  dashboard: HeuteDashboardModel;
  radar: ReturnType<typeof buildCockpitRadar>;
  onBack: () => void;
  detailRef: RefObject<HTMLElement | null>;
}) {
  const { titel, inhalt } = detailInhalt(keyId, dashboard, radar);
  return (
    <section
      className="ck-bento-detail"
      ref={detailRef}
      tabIndex={-1}
      aria-label={`Detail: ${titel}`}
    >
      <div className="ck-bento-crumb">
        <button type="button" className="ck-bento-back" onClick={onBack}>
          <span aria-hidden="true">←</span> zurück zur Übersicht
        </button>
        <p className="ck-bento-pfad">
          <span>Cockpit</span> <span aria-hidden="true">›</span> <strong>{titel}</strong>
        </p>
      </div>
      <div className="ck-bento-detail-inhalt">{inhalt}</div>
    </section>
  );
}

/** Bildet das Detail einer Bento-Kachel aus dem echten Modell (keine neue Zählung). */
function detailInhalt(
  keyId: BentoKey,
  dashboard: HeuteDashboardModel,
  radar: ReturnType<typeof buildCockpitRadar>,
): { titel: string; inhalt: ReactNode } {
  if (keyId === 'radar') {
    return {
      titel: 'Abdeckungsprofil im Detail',
      inhalt: (
        <>
          <p className="ck-bento-detail-lead">{radar?.regel}</p>
          <ul className="ck-bento-detail-grid" aria-label="Die vier Abdeckungen im Detail">
            {dashboard.coverage.map((tile) => (
              <li key={tile.id}>
                <CoverageKachel tile={tile} />
              </li>
            ))}
          </ul>
        </>
      ),
    };
  }
  if (keyId === 'lebenszyklus_zaehlung' && dashboard.lifecycleSummary) {
    return {
      titel: 'Verschiedene Lebenszyklus-Stände',
      inhalt: <LifecycleSummaryKachel tile={dashboard.lifecycleSummary} />,
    };
  }
  const coverage = coverageById(dashboard, keyId as CoverageTile['id']);
  if (coverage) {
    return { titel: RADAR_LABEL[coverage.id], inhalt: <CoverageKachel tile={coverage} /> };
  }
  const stock = stockById(dashboard, keyId as StockTile['id']);
  if (stock) {
    return {
      titel: stock.values[0]?.label ?? 'Bestand',
      inhalt: <StockKachel tile={stock} />,
    };
  }
  // Fail-soft: unbekannter Schlüssel (im Vertrag unmöglich) – kein toter Zustand.
  return {
    titel: 'Kachel nicht auflösbar',
    inhalt: <p className="tw-muted">Zu dieser Kachel liegt im Datenbestand kein Detail vor.</p>,
  };
}

/* -----------------------------------------------------------------------------
 * Wiederkehrende Bausteine (wortgleich zu `CockpitVariantenContent`, damit dieselben
 * Ehrlichkeits- und Sphärentexte gelten – ein späteres DRY-Zusammenführen ist O-WP034-04)
 * --------------------------------------------------------------------------- */

function ThemeSchalter({ theme, onToggle }: { theme: CockpitTheme; onToggle: () => void }) {
  const dunkel = theme === 'dunkel';
  return (
    <button type="button" className="ck-theme-toggle" aria-pressed={dunkel} onClick={onToggle}>
      <span aria-hidden="true" className="ck-theme-icon">
        {dunkel ? '☾' : '☀'}
      </span>
      {dunkel ? 'Helles Design' : 'Dunkles Design'}
    </button>
  );
}

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
  const letzte: RecordingWave | undefined = waves.length > 0 ? waves[waves.length - 1] : undefined;
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

function SphaerenNotiz({ role, kompakt = false }: { role: DemoRole | null; kompakt?: boolean }) {
  const portfolio = kundenSicht(role) === 'portfolio';
  const wechsel = mandantenwechselSichtbar(role);
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
