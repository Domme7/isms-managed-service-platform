/**
 * Modulare N-Ebenen-Baumstruktur des Cockpits (WP-034 Slice 3, DR-0016 Nachtrag 3).
 *
 * Der Owner will EIN kompaktes Dashboard auf einem Screen, in das man sich modular immer tiefer
 * klickt (Kachel → Bereich → Detail), statt eine lange Scroll-Seite. Diese Datei baut den dafür
 * nötigen BAUM aus dem AKTIVEN Mandanten: jeder Knoten ist entweder ein Kachel-Bereich (weitere
 * Kacheln zum Eintauchen) oder ein Blatt (Detail). Warnungen, Lebenszyklus und die benannten
 * Lücken werden zu KACHELN/Knoten statt zu gestapelten Blöcken.
 *
 * „NICHTS NUR SHOW" (DR-0008/DR-0014): Es wird AUSSCHLIESSLICH das in `buildHeuteDashboard`,
 * `buildCockpitRadar`, `buildCockpitWarnungen` und `buildCockpitLebenszyklus` abgeleitete Modell
 * verwendet – keine zweite Zählung, kein Score, keine erfundene Bewertung. Farbe (Status) folgt der
 * offengelegten Ampel-Regel (`coverageTileStatus`/`coverageStatus`). Ein „Briefing" erfindet KEINEN
 * Posteingang: es verdichtet nur die belegte Tageslage (Bestand, offene Lücken).
 *
 * React-frei und deterministisch testbar (Muster `lib/cockpit/radar.ts`).
 */

import { coverageTileStatus, type CockpitStatus } from './ampel';
import { buildCockpitLebenszyklus } from './lebenszyklus';
import { buildCockpitRadar, RADAR_LABEL, type CockpitRadarModel } from './radar';
import { buildCockpitWarnungen, type CockpitWarnung } from './warnungen';
import {
  buildHeuteDashboard,
  type CoverageTile,
  type EmptyTenantTile,
  type HeuteDashboardModel,
  type StockTile,
} from '../heute/dashboard';

/** Darstellungsart einer Kachel (die Präsentation wählt das Chart; Daten stehen hier). */
export type ModulKind = 'briefing' | 'radar' | 'ring' | 'meter' | 'zahl';
/** Größe im Bento-Raster – die bewusste Größenhierarchie des Owners. */
export type ModulGroesse = 'hero' | 'breit' | 'hoch' | 'normal';

export interface ModulBriefingPunkt {
  readonly status: CockpitStatus;
  readonly text: string;
}

export interface ModulKachel {
  readonly id: string;
  /** Knoten-Id, in die diese Kachel eintaucht (immer real vorhanden). */
  readonly ziel: string;
  readonly label: string;
  /** Tabler-Icon-Name (Präsentationshinweis, z. B. `ti-shield-check`). */
  readonly icon: string;
  readonly status: CockpitStatus;
  readonly kind: ModulKind;
  readonly groesse: ModulGroesse;
  /** Anzeigewert der Zahl-Kachel (immer „x von y" oder reine Zahl – nie Prozent-Score). */
  readonly wert?: string;
  readonly sub?: string;
  readonly covered?: number;
  readonly total?: number;
  readonly briefing?: { readonly headline: string; readonly punkte: readonly ModulBriefingPunkt[] };
  readonly radar?: CockpitRadarModel;
}

export interface ModulDetail {
  readonly frage?: string;
  readonly felder: readonly { readonly k: string; readonly v: string }[];
  /** Weiterführende Objekt-Links (je mit echtem Weg – kein toter Link). */
  readonly links?: readonly { readonly label: string; readonly href: string }[];
  /** Primärer Drill-down zur Quelle (real existierend). */
  readonly drilldown?: { readonly label: string; readonly href: string };
  readonly hinweis?: string;
}

export interface ModulKnoten {
  readonly id: string;
  /** Brotkrumen-Beschriftung dieses Knotens. */
  readonly titel: string;
  readonly intro?: string;
  /** Kachel-Bereich (weiter eintauchen) ODER … */
  readonly kacheln?: readonly ModulKachel[];
  /** … Blatt (Detail). Genau eines von beiden ist gesetzt. */
  readonly detail?: ModulDetail;
}

export interface CockpitModulBaum {
  readonly wurzel: string;
  readonly knoten: Readonly<Record<string, ModulKnoten>>;
  readonly isEmpty: boolean;
  readonly emptyTile?: EmptyTenantTile;
}

/** Schwerster Status einer Menge (für Verdichtungs-Kacheln): alert > warn > ok > info. */
function schwersterStatus(statusse: readonly CockpitStatus[]): CockpitStatus {
  if (statusse.includes('alert')) return 'alert';
  if (statusse.includes('warn')) return 'warn';
  if (statusse.includes('ok')) return 'ok';
  return 'info';
}

const ICON: Readonly<Record<string, string>> = {
  heute: 'ti-news',
  abdeck: 'ti-chart-dots',
  controls_nachweis: 'ti-shield-check',
  risiken_minderung: 'ti-alert-triangle',
  objekte_owner: 'ti-user-check',
  kanten_vertrauensgrad: 'ti-link',
  bestand: 'ti-box',
  isms_kern: 'ti-shield',
  entscheidungen: 'ti-gavel',
  services: 'ti-server',
  luecken: 'ti-alert-circle',
  lebenszyklus: 'ti-history',
};

/** Blatt-Detail einer Abdeckungskachel (aus der echten CoverageTile, keine zweite Zählung). */
function coverageDetail(tile: CoverageTile): ModulDetail {
  if (tile.isEmpty) {
    return {
      frage: tile.frage,
      felder: [{ k: 'Lage', v: tile.emptyText ?? 'keine Grundgesamtheit erfasst' }],
      drilldown: tile.drilldown,
    };
  }
  const felder = [
    { k: 'Erfasst', v: `${tile.covered} von ${tile.total}` },
    { k: 'Scope', v: tile.scope },
    {
      k: 'Datenstand',
      v: tile.datenstandDisplay ?? 'keine Erfassung im Datenbestand',
    },
    { k: 'So wird gezählt', v: tile.regel },
  ];
  return {
    frage: tile.frage,
    felder,
    drilldown: tile.drilldown,
    hinweis: tile.kleinheitText ?? tile.badge?.grenze,
  };
}

/** Blatt-Detail einer Statuskachel (aus der echten StockTile). */
function stockDetail(tile: StockTile): ModulDetail {
  return {
    frage: tile.frage,
    felder: [
      ...tile.values.map((w) => ({ k: w.label, v: String(w.count) })),
      {
        k: 'Datenstand',
        v: tile.datenstandDisplay ?? 'keine Erfassung im Datenbestand',
      },
      { k: 'So wird gezählt', v: tile.regel },
    ],
    drilldown: tile.drilldown,
  };
}

/** Blatt-Detail einer Warnung (aus der echten CockpitWarnung, inkl. Objekt-Links). */
function warnDetail(w: CockpitWarnung): ModulDetail {
  return {
    frage: w.titel,
    felder: [{ k: 'Lage', v: w.begruendung }],
    links: w.objekte.map((o) => ({ label: o.name, href: o.href })),
    drilldown: w.ziel,
    hinweis: 'Farbe = erfasste Datenlage nach offengelegter Regel – kein Prüfergebnis.',
  };
}

/**
 * Baut den modularen Cockpit-Baum des aktiven Mandanten. `undefined` bei unbekanntem Mandanten
 * (keine Existenzaussage). Ein leerer Mandant liefert `isEmpty` + die ehrliche Datenlücken-Kachel
 * (kein Bento, keine erfundene Lage).
 */
export function buildCockpitModul(tenantId: string): CockpitModulBaum | undefined {
  const dashboard: HeuteDashboardModel | undefined = buildHeuteDashboard(tenantId);
  if (!dashboard) return undefined;

  if (dashboard.isEmpty) {
    return {
      wurzel: 'root',
      isEmpty: true,
      emptyTile: dashboard.emptyTile,
      knoten: {
        root: { id: 'root', titel: 'Cockpit', kacheln: [] },
      },
    };
  }

  const radar = buildCockpitRadar(dashboard.coverage);
  const warnungen = buildCockpitWarnungen(tenantId);
  const lebenszyklus = buildCockpitLebenszyklus(tenantId);

  const knoten: Record<string, ModulKnoten> = {};
  const covById = (id: CoverageTile['id']) => dashboard.coverage.find((t) => t.id === id);
  const stockById = (id: StockTile['id']) => dashboard.stockTiles.find((t) => t.id === id);

  // --- Blätter: Abdeckungen & Bestände ------------------------------------------------
  for (const tile of dashboard.coverage) {
    knoten[`cov_${tile.id}`] = {
      id: `cov_${tile.id}`,
      titel: RADAR_LABEL[tile.id],
      detail: coverageDetail(tile),
    };
  }
  for (const tile of dashboard.stockTiles) {
    knoten[`stock_${tile.id}`] = {
      id: `stock_${tile.id}`,
      titel: tile.values[0]?.label ?? 'Bestand',
      detail: stockDetail(tile),
    };
  }

  // --- Bereich „Abdeckungsprofil" (Radar taucht in die vier Abdeckungen) ---------------
  if (radar) {
    knoten.abdeck = {
      id: 'abdeck',
      titel: 'Abdeckungsprofil',
      intro: radar.regel,
      kacheln: dashboard.coverage.map((tile) => ({
        id: `k_cov_${tile.id}`,
        ziel: `cov_${tile.id}`,
        label: RADAR_LABEL[tile.id],
        icon: ICON[tile.id] ?? 'ti-chart-dots',
        status: coverageTileStatus(tile),
        kind: 'ring' as const,
        groesse: 'normal' as const,
        covered: tile.covered,
        total: tile.total,
      })),
    };
  }

  // --- Bereich „Offene Datenlücken" (jede Warnung wird eine Kachel → Warn-Detail) ------
  const warnStatus = schwersterStatus(warnungen.map((w) => w.status));
  for (const w of warnungen) {
    knoten[`warn_${w.id}`] = { id: `warn_${w.id}`, titel: w.titel, detail: warnDetail(w) };
  }
  knoten.luecken = {
    id: 'luecken',
    titel: 'Offene Datenlücken',
    intro:
      warnungen.length > 0
        ? 'Jede Lücke ist aus einer gezählten Lage abgeleitet – kein Sicherheits- oder Wirksamkeitsurteil.'
        : 'Für den aktiven Mandanten ist keine Datenlücke erfasst.',
    kacheln: warnungen.map((w) => ({
      id: `k_warn_${w.id}`,
      ziel: `warn_${w.id}`,
      label: w.titel,
      icon: 'ti-alert-circle',
      status: w.status,
      kind: 'zahl' as const,
      groesse: 'normal' as const,
      wert: String(w.objekte.length > 0 ? w.objekte.length : '•'),
      sub: w.ziel.label,
    })),
  };

  // --- Bereich „Lebenszyklus-Stände" (Zählung → Blatt mit Glosse) ---------------------
  if (dashboard.lifecycleSummary && lebenszyklus) {
    const ls = dashboard.lifecycleSummary;
    knoten.lz = {
      id: 'lz',
      titel: 'Lebenszyklus-Stände',
      detail: {
        frage: ls.frage,
        felder: [
          { k: 'Verschiedene Stände', v: String(ls.distinctCount) },
          { k: 'Objekte', v: String(ls.total) },
          { k: 'Regel', v: ls.glosse },
          { k: 'So wird gezählt', v: ls.regel },
        ],
        drilldown: ls.drilldown,
      },
    };
  }

  // --- Bereich „Heute · Briefing" (ehrliche Tageslage, kein erfundener Posteingang) ----
  const bestand = stockById('bestand');
  const services = stockById('services');
  const briefingPunkte: ModulBriefingPunkt[] = [];
  if (warnungen.length > 0) {
    briefingPunkte.push({
      status: warnStatus,
      text: `${warnungen.length} ${warnungen.length === 1 ? 'Bereich' : 'Bereiche'} mit erfasster Datenlücke`,
    });
  }
  if (bestand) {
    briefingPunkte.push({
      status: 'info',
      text: bestand.values.map((w) => `${w.count} ${w.label}`).join(' · '),
    });
  }
  if (services && (services.values[0]?.count ?? 0) > 0) {
    briefingPunkte.push({ status: 'ok', text: `${services.values[0]?.count} Managed Services` });
  }
  knoten.heute = {
    id: 'heute',
    titel: 'Heute · Briefing',
    intro:
      'Tages-Briefing – ehrlich aus dem Datenbestand abgeleitet. Ein echter Posteingang hätte heute ' +
      'keinen Datenträger (keine Aufgaben-/Nachrichtenobjekte im Modell).',
    kacheln: [
      ...(bestand
        ? [
            {
              id: 'k_heute_bestand',
              ziel: 'stock_bestand',
              label: 'Was ist erfasst',
              icon: 'ti-database',
              status: 'info' as const,
              kind: 'zahl' as const,
              groesse: 'breit' as const,
              wert: String(bestand.values[0]?.count ?? 0),
              sub: bestand.values.map((w) => `${w.count} ${w.label}`).join(' · '),
            },
          ]
        : []),
      {
        id: 'k_heute_luecken',
        ziel: 'luecken',
        label: 'Wo sind Lücken',
        icon: 'ti-alert-circle',
        status: warnStatus,
        kind: 'zahl' as const,
        groesse: 'normal' as const,
        wert: String(warnungen.length),
      },
    ],
  };

  // --- Wurzel-Dashboard (ein Screen; verschiedene Grafiken/Größen) ---------------------
  const rootKacheln: ModulKachel[] = [];

  rootKacheln.push({
    id: 'k_heute',
    ziel: 'heute',
    label: 'Heute · Briefing',
    icon: ICON.heute,
    status: 'info',
    kind: 'briefing',
    groesse: 'hero',
    briefing: {
      headline: 'Was ist heute wichtig?',
      punkte:
        briefingPunkte.length > 0
          ? briefingPunkte
          : [{ status: 'info', text: 'Der Datenbestand ist erfasst; keine offene Lücke.' }],
    },
  });

  if (radar) {
    rootKacheln.push({
      id: 'k_abdeck',
      ziel: 'abdeck',
      label: 'Abdeckungsprofil',
      icon: ICON.abdeck,
      status: schwersterStatus(dashboard.coverage.map((t) => coverageTileStatus(t))),
      kind: 'radar',
      groesse: 'hoch',
      sub: 'vier Dimensionen',
      radar,
    });
  }

  const controls = covById('controls_nachweis');
  const risiken = covById('risiken_minderung');
  const owner = covById('objekte_owner');
  for (const [tile, kind, groesse] of [
    [controls, 'ring', 'normal'],
    [risiken, 'ring', 'normal'],
    [owner, 'meter', 'breit'],
  ] as const) {
    if (!tile) continue;
    rootKacheln.push({
      id: `k_${tile.id}`,
      ziel: `cov_${tile.id}`,
      label: RADAR_LABEL[tile.id],
      icon: ICON[tile.id] ?? 'ti-chart-dots',
      status: coverageTileStatus(tile),
      kind,
      groesse,
      covered: tile.covered,
      total: tile.total,
    });
  }

  for (const id of ['bestand', 'isms_kern', 'entscheidungen', 'services'] as const) {
    const tile = stockById(id);
    if (!tile) continue;
    rootKacheln.push({
      id: `k_${id}`,
      ziel: `stock_${id}`,
      label: tile.values[0]?.label ?? 'Bestand',
      icon: ICON[id] ?? 'ti-box',
      status: 'info',
      kind: 'zahl',
      groesse: 'normal',
      wert: String(tile.values[0]?.count ?? 0),
    });
  }

  rootKacheln.push({
    id: 'k_luecken',
    ziel: 'luecken',
    label: 'Offene Datenlücken',
    icon: ICON.luecken,
    status: warnStatus,
    kind: 'zahl',
    groesse: 'breit',
    wert: String(warnungen.length),
    sub: 'jede aus einer gezählten Lage',
  });

  if (dashboard.lifecycleSummary) {
    rootKacheln.push({
      id: 'k_lz',
      ziel: 'lz',
      label: 'Lebenszyklus-Stände',
      icon: ICON.lebenszyklus,
      status: 'info',
      kind: 'zahl',
      groesse: 'normal',
      wert: String(dashboard.lifecycleSummary.distinctCount),
      sub: 'verschiedene erfasste Stände',
    });
  }

  knoten.root = {
    id: 'root',
    titel: 'Cockpit',
    kacheln: rootKacheln,
  };

  return { wurzel: 'root', knoten, isEmpty: false };
}
