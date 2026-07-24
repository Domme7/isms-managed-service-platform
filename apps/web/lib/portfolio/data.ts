/**
 * Berater-Portfolio-Aggregation (DR-0017 Stage 1) — die Kunden-Rangliste + Heatmap-Datenbasis.
 *
 * ZWECK: Der Berater-/Betreiber-Einstieg zeigt ALLE Kundenfirmen auf einen Blick — sortiert nach
 * erfasster **Lücken-Last** (wo ist am meisten offen) — und eine **Heatmap Kunde × Abdeckung**.
 * Klick auf einen Kunden → dessen Cockpit (Drill-down in die Sphäre).
 *
 * EHRLICHKEIT (Regel Null, DR-0008 „nichts nur Show"): Diese Schicht führt KEINE zweite Zählregel
 * ein. Sie liest je Mandant die bereits belegten, ehrlichen „x von y"-Abdeckungen aus
 * `buildHeuteDashboard(tenantId)` und die eine Ampel-Regel aus `coverageTileStatus` — dieselbe
 * Ableitung wie im Kunde-Cockpit, nur je Mandant projiziert. Es entsteht KEIN Score, KEINE
 * erfundene Schwere, KEINE Prozentzahl. Die „Lücken-Last" ist eine reine ZÄHLUNG offener Punkte
 * (Controls ohne Nachweis + Risiken ohne Minderung + Objekte ohne Owner), keine Gewichtung.
 *
 * MANDANTENTRENNUNG (P09): Aggregiert wird „nebeneinander" wie `buildPortfolioOverview()` — je
 * Mandant nur seine eigenen aggregierten ZAHLEN/Status + seine Anzeigemetadaten. Es wird KEIN
 * Objektbestand eines Mandanten in die Zeile eines anderen gemischt und KEINE Cross-Tenant-Kante
 * gebildet. Das ist die dokumentierte Portfolio-Ausnahme (Muster O-WP012-03), NICHT eine
 * Grenzverletzung: der Berater sieht bewusst mehrere Mandanten, jeder Kunde nur sich (Sphären,
 * DR-0012). Heute Demo-simuliert; echte serverseitige Scope-Grenze folgt mit WP-030 + FINDING-0004.
 *
 * PROVIDER AUSGENOMMEN: Der Consulting Operator ist der Betreiber selbst (kein Kundenmandant) und
 * erscheint NICHT als Zeile der Kunden-Rangliste (`getCustomerTenants`).
 *
 * NICHT ENTHALTEN (benannte Lücke, nicht gefüllt): Fristen/Dringlichkeit/Aufgaben (Eisenhower) —
 * das ist E-02 (Contract-/Seed-Trägerschema, Owner-Gate). Bis dahin trägt der Datenbestand keine
 * Frist; die Rangordnung stützt sich ausschließlich auf die erfasste Lücken-Last.
 *
 * React-frei und deterministisch testbar (Muster `lib/services/data.ts`).
 */

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';

import { type CockpitStatus, coverageTileStatus } from '../cockpit/ampel';
import { type CoverageTile, buildHeuteDashboard } from '../heute/dashboard';

/** Der Provider (Betreiber, kein Kundenmandant) — aus der Kunden-Rangliste ausgenommen. */
const PROVIDER_TENANT_ID: string = TENANT_ID.CONSULTING_OPERATOR;

/** Eine Spalte der Heatmap = eine der vier ehrlichen Abdeckungen des Cockpits. */
export interface PortfolioDimension {
  readonly id: CoverageTile['id'];
  /** Vollständiges Spalten-Label. */
  readonly label: string;
  /** Kurzlabel für den Heatmap-Kopf. */
  readonly kurz: string;
  /**
   * Zählt diese Spalte in die Lücken-Last (Rangordnung) ein? Die drei ISMS-Abdeckungen
   * (Controls/Risiken/Owner) sind das „wo brennt es"-Signal; der Vertrauensgrad ist eine
   * Datenqualitäts-Angabe, die in der Heatmap sichtbar bleibt, aber die Rangordnung nicht treibt.
   */
  readonly zaehltInLueckenLast: boolean;
}

/**
 * Die vier Abdeckungen als Heatmap-Spalten (Reihenfolge wie im Cockpit-Radar). Die Kennungen sind
 * exakt die `CoverageTile['id']`-Werte aus `buildHeuteDashboard` — es wird keine neue Achse erfunden.
 */
export const PORTFOLIO_DIMENSIONS: readonly PortfolioDimension[] = [
  {
    id: 'controls_nachweis',
    label: 'Controls mit Nachweis',
    kurz: 'Controls',
    zaehltInLueckenLast: true,
  },
  {
    id: 'risiken_minderung',
    label: 'Risiken mit Minderung',
    kurz: 'Risiken',
    zaehltInLueckenLast: true,
  },
  { id: 'objekte_owner', label: 'Objekte mit Owner', kurz: 'Owner', zaehltInLueckenLast: true },
  {
    id: 'kanten_vertrauensgrad',
    label: 'Beziehungen mit Vertrauensangabe',
    kurz: 'Vertrauen',
    zaehltInLueckenLast: false,
  },
] as const;

/** Eine Heatmap-Zelle: der Abdeckungsstand eines Kunden in einer Dimension (rein aus „x von y"). */
export interface PortfolioCell {
  readonly dimension: CoverageTile['id'];
  readonly covered: number;
  readonly total: number;
  /** Die eine Ampel-Regel (`coverageTileStatus`): ok/warn/alert/info. */
  readonly status: CockpitStatus;
  /** `true`, wenn die Grundgesamtheit dieser Dimension leer ist (keine Aussage möglich). */
  readonly isEmpty: boolean;
  readonly kleineGrundgesamtheit: boolean;
  /** Offene Punkte dieser Zelle = max(0, total − covered) — eine reine Zählung, kein Score. */
  readonly offen: number;
}

/** Eine Zeile der Portfolio-Rangliste: ein Kundenmandant mit seinen aggregierten Zahlen. */
export interface PortfolioCustomerRow {
  readonly tenant: DemoTenant;
  /** `true`, wenn der Mandant keinen Objektgraphen trägt (ehrlicher Empty-State). */
  readonly isEmpty: boolean;
  /** Eine Zelle je `PORTFOLIO_DIMENSIONS`, in derselben Reihenfolge. */
  readonly cells: readonly PortfolioCell[];
  /**
   * Lücken-Last = Summe der offenen Punkte über die drei ISMS-Abdeckungen (Controls ohne Nachweis
   * + Risiken ohne Minderung + Objekte ohne Owner). Reine Zählung; der Rangordnungsschlüssel.
   */
  readonly lueckenLast: number;
  /** Datenstand (zuletzt im System erfasst, Anzeigeform) oder `null` bei leerem Mandanten. */
  readonly datenstand: string | null;
}

export interface PortfolioDashboardModel {
  readonly dimensions: readonly PortfolioDimension[];
  /** Kundenfirmen, sortiert: gefüllte nach Lücken-Last absteigend, leere ans Ende. */
  readonly customers: readonly PortfolioCustomerRow[];
  readonly gefuellteKunden: number;
  readonly leereKunden: number;
}

/** Die Kundenfirmen des Portfolios — alle Demo-Mandanten AUSSER dem Provider (Consulting Operator). */
export function getCustomerTenants(): readonly DemoTenant[] {
  return DEMO_TENANTS.filter((t) => t.tenant_id !== PROVIDER_TENANT_ID);
}

/** Baut eine Portfolio-Zeile aus den bereits belegten Abdeckungen des Mandanten (keine 2. Zählregel). */
function buildCustomerRow(tenant: DemoTenant): PortfolioCustomerRow {
  const dashboard = buildHeuteDashboard(tenant.tenant_id);
  const isEmpty = !dashboard || dashboard.isEmpty;
  const byId = new Map((dashboard?.coverage ?? []).map((tile) => [tile.id, tile] as const));

  const cells: PortfolioCell[] = PORTFOLIO_DIMENSIONS.map((dim) => {
    const tile = byId.get(dim.id);
    if (!tile) {
      // Leerer/ohne diese Abdeckung erfasster Mandant: neutrale, leere Zelle (kein erfundener Wert).
      return {
        dimension: dim.id,
        covered: 0,
        total: 0,
        status: 'info',
        isEmpty: true,
        kleineGrundgesamtheit: false,
        offen: 0,
      };
    }
    return {
      dimension: dim.id,
      covered: tile.covered,
      total: tile.total,
      status: coverageTileStatus(tile),
      isEmpty: tile.isEmpty,
      kleineGrundgesamtheit: tile.kleineGrundgesamtheit,
      offen: Math.max(0, tile.total - tile.covered),
    };
  });

  const rankingIds = new Set(
    PORTFOLIO_DIMENSIONS.filter((d) => d.zaehltInLueckenLast).map((d) => d.id),
  );
  const lueckenLast = cells
    .filter((c) => rankingIds.has(c.dimension))
    .reduce((sum, c) => sum + c.offen, 0);

  const datenstand =
    dashboard?.stockTiles.find((t) => t.id === 'bestand')?.datenstandDisplay ?? null;

  return { tenant, isEmpty, cells, lueckenLast, datenstand };
}

/**
 * Baut das Berater-Portfolio-Dashboard: je Kundenfirma eine Zeile mit Heatmap-Zellen + Lücken-Last,
 * sortiert nach Lücken-Last (gefüllte zuerst, absteigend; leere Mandanten ans Ende, dann alphabetisch).
 */
export function buildPortfolioDashboard(): PortfolioDashboardModel {
  const customers = getCustomerTenants()
    .map(buildCustomerRow)
    .sort((a, b) => {
      if (a.isEmpty !== b.isEmpty) return a.isEmpty ? 1 : -1;
      if (b.lueckenLast !== a.lueckenLast) return b.lueckenLast - a.lueckenLast;
      return a.tenant.display_name.localeCompare(b.tenant.display_name, 'de');
    });

  return {
    dimensions: PORTFOLIO_DIMENSIONS,
    customers,
    gefuellteKunden: customers.filter((c) => !c.isEmpty).length,
    leereKunden: customers.filter((c) => c.isEmpty).length,
  };
}
