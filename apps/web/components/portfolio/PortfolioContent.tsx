/**
 * Berater-Portfolio-Dashboard — der Einstieg über ALLE Kunden (DR-0017 Stage 1).
 *
 * Zwei ehrliche Sichten auf dieselbe Aggregation (`buildPortfolioDashboard`, `lib/portfolio/data.ts`):
 *  1. **Kunden-Rangliste** — je Firma eine Karte, sortiert nach erfasster Lücken-Last (wo ist am
 *     meisten offen). Klick → Eintauchen in das Cockpit dieses Kunden.
 *  2. **Heatmap Kunde × Abdeckung** — dieselben vier Cockpit-Abdeckungen als Matrix; jede Zelle ist
 *     die erfasste „x von y"-Datenlage nach der EINEN Ampel-Regel (`coverageTileStatus`). Klick →
 *     Eintauchen in das Cockpit dieses Kunden.
 *
 * EHRLICHKEIT (DR-0008): Jede Farbe kodiert die erfasste Datenlage nach offengelegter Regel — kein
 * Prüfergebnis, kein Score. Nie nur Farbe: jede Zelle trägt „x von y" + ein Symbol. Fristen und
 * Dringlichkeit (Eisenhower/E-02) trägt der Datenbestand heute nicht — das wird benannt, nicht
 * erfunden. Reine Präsentationskomponente: Daten aus `buildPortfolioDashboard`, Eintauchen über den
 * `onDive`-Callback (die Session-/Routing-Mechanik liegt in `PortfolioView`).
 */
import type { DemoRole } from '../../lib/shell/roles';

import { AMPEL_LEGENDE, type CockpitStatus } from '../../lib/cockpit/ampel';
import {
  type PortfolioCell,
  type PortfolioCustomerRow,
  buildPortfolioDashboard,
} from '../../lib/portfolio/data';

/** Symbol je Ampel-Status (Form, nie alleinige Bedeutung) – aus der einen Legende gelesen. */
const STATUS_SYMBOL: Readonly<Record<CockpitStatus, string>> = Object.fromEntries(
  AMPEL_LEGENDE.map((e) => [e.status, e.symbol]),
) as Record<CockpitStatus, string>;

/** Kurztext einer Zelle: „x von y" oder der ehrliche Leerwert. */
function zellWert(cell: PortfolioCell): string {
  if (cell.isEmpty || cell.total === 0) return 'keine erfasst';
  return `${cell.covered} von ${cell.total}`;
}

function KundeKarte({
  row,
  rang,
  dimensionen,
  onDive,
}: {
  row: PortfolioCustomerRow;
  rang: number | null;
  dimensionen: readonly { id: string; kurz: string }[];
  onDive?: (tenantId: string) => void;
}) {
  return (
    <li className="pf-kunde">
      <button
        type="button"
        className="pf-kunde-karte"
        onClick={() => onDive?.(row.tenant.tenant_id)}
        aria-label={`Cockpit von ${row.tenant.display_name} öffnen`}
      >
        <span className="pf-kunde-rang" aria-hidden="true">
          {rang !== null ? rang : '–'}
        </span>
        <span className="pf-kunde-haupt">
          <span className="pf-kunde-name">{row.tenant.display_name}</span>
          <span className="pf-kunde-branche">{row.tenant.industry}</span>
        </span>
        <span className="pf-kunde-last">
          {row.isEmpty ? (
            <span className="pf-kunde-leer">Noch kein Datenbestand erfasst</span>
          ) : (
            <>
              <strong className="pf-kunde-last-zahl">{row.lueckenLast}</strong>
              <span className="pf-kunde-last-label">
                {row.lueckenLast === 1 ? 'offener Punkt' : 'offene Punkte'}
              </span>
            </>
          )}
        </span>
        <span className="pf-kunde-ampeln">
          {dimensionen.map((dim) => {
            const cell = row.cells.find((c) => c.dimension === dim.id);
            if (!cell) return null;
            return (
              <span key={dim.id} className={`pf-ampel ck-status--${cell.status}`}>
                <span className="pf-ampel-symbol" aria-hidden="true">
                  {STATUS_SYMBOL[cell.status]}
                </span>
                <span className="pf-ampel-kurz">{dim.kurz}</span>
                <span className="pf-ampel-wert">{zellWert(cell)}</span>
              </span>
            );
          })}
        </span>
        <span className="pf-kunde-fuss">
          <span className="pf-kunde-datenstand">
            {row.datenstand ? `Datenstand ${row.datenstand}` : 'kein Datenstand erfasst'}
          </span>
          <span className="pf-kunde-cta" aria-hidden="true">
            Eintauchen →
          </span>
        </span>
      </button>
    </li>
  );
}

function HeatmapZelle({
  cell,
  tenant,
  onDive,
}: {
  cell: PortfolioCell;
  tenant: PortfolioCustomerRow['tenant'];
  onDive?: (tenantId: string) => void;
}) {
  return (
    <button
      type="button"
      className={`pf-zelle ck-status--${cell.status}`}
      onClick={() => onDive?.(tenant.tenant_id)}
      aria-label={`${tenant.display_name}, ${zellWert(cell)} – Cockpit öffnen`}
    >
      <span className="pf-zelle-symbol" aria-hidden="true">
        {STATUS_SYMBOL[cell.status]}
      </span>
      <span className="pf-zelle-wert">
        {cell.isEmpty || cell.total === 0 ? '–' : `${cell.covered}/${cell.total}`}
      </span>
    </button>
  );
}

export function PortfolioContent({
  role,
  onDive,
}: {
  role: DemoRole | null;
  onDive?: (tenantId: string) => void;
}) {
  const model = buildPortfolioDashboard();
  const offenGesamt = model.customers.reduce((sum, c) => sum + c.lueckenLast, 0);

  // Rangnummer nur für gefüllte Kunden (leere tragen keine Lücken-Last, also keinen Rang).
  let laufenderRang = 0;

  return (
    <main className="pf-standalone">
      <section className="pf-portfolio" aria-label="Berater-Portfolio: alle Kunden">
        <header className="pf-kopf">
          <div className="pf-kopf-text">
            <p className="pf-eyebrow">Berater-Portfolio</p>
            <h1 className="pf-titel">Alle Kunden auf einen Blick</h1>
            <p className="pf-reichweite">
              {model.gefuellteKunden === 1
                ? '1 Kundenfirma mit erfasstem Datenbestand'
                : `${model.gefuellteKunden} Kundenfirmen mit erfasstem Datenbestand`}
              {model.leereKunden > 0
                ? `, ${model.leereKunden === 1 ? 'eine weitere' : `${model.leereKunden} weitere`} noch ohne Bestand`
                : ''}
              . Sortiert nach erfasster Lücken-Last — wo ist am meisten offen.
            </p>
          </div>
          {role ? (
            <div className="pf-kopf-rechts">
              <span className="pf-rolle">Ansicht als {role.name}</span>
            </div>
          ) : null}
        </header>

        <p className="pf-datenstand">
          Farbe zeigt die erfasste Datenlage nach offengelegter Regel – kein Prüfergebnis. Die
          Lücken-Last zählt offene ISMS-Punkte (Controls ohne Nachweis, Risiken ohne Minderung,
          Objekte ohne Owner). Termine und Dringlichkeit trägt der Datenbestand heute nicht; sie
          werden hier nicht erfunden.
        </p>

        <div className="pf-kennzahlen">
          <div className="pf-kennzahl">
            <strong>{model.gefuellteKunden}</strong>
            <span>Firmen mit Bestand</span>
          </div>
          <div className="pf-kennzahl">
            <strong>{offenGesamt}</strong>
            <span>offene Punkte im Portfolio</span>
          </div>
          <div className="pf-kennzahl">
            <strong>{model.leereKunden}</strong>
            <span>ohne Datenbestand</span>
          </div>
        </div>

        <h2 className="pf-abschnitt">Kunden nach Lücken-Last</h2>
        <ul className="pf-rangliste">
          {model.customers.map((row) => {
            const rang = row.isEmpty ? null : ++laufenderRang;
            return (
              <KundeKarte
                key={row.tenant.tenant_id}
                row={row}
                rang={rang}
                dimensionen={model.dimensions}
                onDive={onDive}
              />
            );
          })}
        </ul>

        <h2 className="pf-abschnitt">Heatmap: Kunde × Abdeckung</h2>
        <p className="pf-heatmap-hinweis">
          Jede Zelle ist die erfasste „x von y"-Datenlage des Kunden in dieser Abdeckung. Klick auf
          eine Zelle taucht in das Cockpit des Kunden ein.
        </p>
        <div className="pf-heatmap-huelle">
          <table className="pf-heatmap">
            <thead>
              <tr>
                <th scope="col" className="pf-heatmap-eckkopf">
                  Kunde
                </th>
                {model.dimensions.map((dim) => (
                  <th key={dim.id} scope="col" className="pf-heatmap-spalte">
                    {dim.kurz}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {model.customers.map((row) => (
                <tr key={row.tenant.tenant_id}>
                  <th scope="row" className="pf-heatmap-zeilenkopf">
                    {row.tenant.display_name}
                  </th>
                  {row.cells.map((cell) => (
                    <td key={cell.dimension} className="pf-heatmap-td">
                      <HeatmapZelle cell={cell} tenant={row.tenant} onDive={onDive} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="pf-legende">
          {AMPEL_LEGENDE.map((eintrag) => (
            <li key={eintrag.status} className={`ck-status--${eintrag.status}`}>
              <span className="pf-legende-symbol" aria-hidden="true">
                {eintrag.symbol}
              </span>
              <span className="pf-legende-label">{eintrag.label}</span>
            </li>
          ))}
        </ul>

        <p className="pf-benannte-luecke">
          Nicht gezeigt: Termine, Fristen und Dringlichkeit über die Kunden hinweg. Dafür gibt es im
          Datenbestand keinen Träger — er entsteht erst mit einer erweiterten Erfassung und wird bis
          dahin bewusst nicht behauptet.
        </p>
      </section>
    </main>
  );
}
