/**
 * KPI-Band des Cockpits (WP-025, moderne Dashboard-Sprache – „nichts nur Show").
 *
 * Rendert AUSSCHLIESSLICH die in `lib/heute/dashboard.ts` (`buildHeuteDashboard`) abgeleiteten
 * Kacheln des aktiven Mandanten:
 *   - zwei Zahl-KPIs (Objektbestand, Managed Services) aus den Statuskacheln,
 *   - vier Deckungs-KPIs (Controls-Nachweis, Risiko-Minderung, Owner, Vertrauensgrad) als
 *     SVG-Deckungsring mit sichtbarer „x von y"-Zahl, eingefärbt nach der Ampel-Regel.
 * Jede KPI-Kachel ist ein funktionaler Link zu ihrer Quelle (kein toter Klick). Nichts ist
 * hartkodiert; jeder Wert entsteht im Helfer, jede Farbe folgt `lib/cockpit/ampel.ts`.
 */
import Link from 'next/link';
import { AMPEL_LEGENDE, coverageTileStatus, type CockpitStatus } from '../../lib/cockpit/ampel';
import type { CoverageTile, HeuteDashboardModel, StockTile } from '../../lib/heute/dashboard';
import { CoverageRing } from './CoverageRing';

/** Sichtbarer Status-Text (nie nur Farbe) – aus der Legende, eine Quelle. */
function statusLabel(status: CockpitStatus): string {
  return AMPEL_LEGENDE.find((e) => e.status === status)?.label ?? 'neutraler Stand';
}

/** Kurzlabel der Deckungs-KPIs (Domänensprache, kein Feldname). */
const KPI_LABEL: Readonly<Record<CoverageTile['id'], string>> = {
  controls_nachweis: 'Controls mit Nachweis',
  risiken_minderung: 'Risiken mit Minderung',
  objekte_owner: 'Objekte mit Owner',
  kanten_vertrauensgrad: 'Beziehungen mit Vertrauensangabe',
};

function stockTile(dashboard: HeuteDashboardModel, id: StockTile['id']): StockTile | undefined {
  return dashboard.stockTiles.find((tile) => tile.id === id);
}

function ZahlKachel({ tile }: { tile: StockTile }) {
  const haupt = tile.values[0];
  return (
    <li>
      <Link className="ck-kpi ck-kpi--zahl" href={tile.drilldown.href}>
        <span className="ck-kpi-label">{haupt?.label ?? 'Bestand'}</span>
        <span className="ck-kpi-num">{haupt?.count ?? 0}</span>
        <span className="ck-kpi-sub">
          {tile.values.map((wert) => `${wert.count} ${wert.label}`).join(' · ')}
        </span>
        <span className="ck-kpi-mehr">{tile.drilldown.label} →</span>
      </Link>
    </li>
  );
}

function RingKachel({ tile }: { tile: CoverageTile }) {
  const status = coverageTileStatus(tile);
  return (
    <li>
      <Link className={`ck-kpi ck-kpi--ring ck-status--${status}`} href={tile.drilldown.href}>
        <span className="ck-kpi-label">{KPI_LABEL[tile.id]}</span>
        {tile.isEmpty ? (
          <>
            <span className="ck-kpi-num ck-kpi-num--leer">0 von 0</span>
            <span className="ck-kpi-status">{statusLabel(status)}</span>
          </>
        ) : (
          <>
            {/* Bei kleiner Grundgesamtheit (n≤2) KEINE gefüllte Ring-Geometrie: ein voller Ring
                über „1 von 1" läse sich wie eine vollständige Landschaft, obwohl genau ein Fall
                erfasst ist (DR-0013 Nr. 7 / Parität zum Heute-Dashboard: `badgeFuerAbdeckung`
                unterdrückt hier Balken+Badge). Es bleiben nur die nackte Zahl „x von y" und der
                Kleinheits-Hinweis – die Zahl behauptet nichts über Vollständigkeit. */}
            {tile.kleineGrundgesamtheit ? null : (
              <CoverageRing covered={tile.covered} total={tile.total} status={status} />
            )}
            {/* Barrierefreie Aussage als Text (der Ring selbst ist aria-hidden). */}
            <span className="ck-kpi-wert">
              {tile.covered} von {tile.total}
            </span>
            <span className="ck-kpi-status">{statusLabel(status)}</span>
            {tile.kleineGrundgesamtheit ? (
              <span className="ck-kpi-klein">zu wenige Fälle für eine Aussage</span>
            ) : null}
          </>
        )}
        <span className="ck-kpi-mehr">{tile.drilldown.label} →</span>
      </Link>
    </li>
  );
}

export function CockpitKpiBand({ dashboard }: { dashboard: HeuteDashboardModel }) {
  const bestand = stockTile(dashboard, 'bestand');
  const services = stockTile(dashboard, 'services');

  return (
    <section className="ck-kpi-band" aria-labelledby="ck-kpi-titel">
      <h2 id="ck-kpi-titel">Überblick</h2>
      <ul className="ck-kpi-grid">
        {bestand ? <ZahlKachel tile={bestand} /> : null}
        {dashboard.coverage.map((tile) => (
          <RingKachel key={tile.id} tile={tile} />
        ))}
        {services ? <ZahlKachel tile={services} /> : null}
      </ul>
    </section>
  );
}
