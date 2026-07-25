'use client';

// Berater-Portfolio: Umschalter „Datenlage ↔ Priorisierung" + Eisenhower-Board (Owner 2026-07-25).
/**
 * Berater-Portfolio-Dashboard — der Einstieg über ALLE Kunden (DR-0017 Stage 1 + Eisenhower).
 *
 * EIN UMSCHALTER, ZWEI SICHTEN (Owner 2026-07-25):
 *  1. **Datenlage** — Kunden-Rangliste nach erfasster Lücken-Last + Heatmap Kunde × Abdeckung
 *     (`buildPortfolioDashboard`); jede Zelle „x von y" nach der EINEN Ampel-Regel.
 *  2. **Priorisierung** — Eisenhower-Board über alle Kunden (`buildEisenhower`), abgeleitet aus dem
 *     Datenzustand (Schutzbedarf · offener Stand · fehlender Owner · Aktualität).
 *
 * EHRLICHKEIT (DR-0008/DR-0005): Beide Sichten kodieren die ERFASSTE Datenlage nach OFFENGELEGTER
 * Regel — kein Prüfergebnis, kein erfundener Score. Die Eisenhower-Frist ist ein aus dem
 * Erfassungsstand ABGELEITETER Vorschlag, kein vom Kunden gelieferter Termin; es wird NICHTS in
 * `tags_custom_fields` gespeichert (der E-02-Riegel bleibt gewahrt, CCP-008-Score-Ampeln gesperrt).
 * Reine Präsentation: Eintauchen über den `onDive`-Callback (Session-/Routing-Mechanik in `PortfolioView`).
 */
import { useState } from 'react';

import type { DemoRole } from '../../lib/shell/roles';

import { AMPEL_LEGENDE, type CockpitStatus } from '../../lib/cockpit/ampel';
import {
  type PortfolioCell,
  type PortfolioCustomerRow,
  buildPortfolioDashboard,
  getCustomerTenants,
} from '../../lib/portfolio/data';
import { QUADRANT_LABEL, type Quadrant, buildEisenhower } from '../../lib/portfolio/prioritaet';

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

/* -----------------------------------------------------------------------------
 * Priorisierung: Eisenhower-Board über alle Kunden (abgeleitet, kein erfundener Wert)
 * --------------------------------------------------------------------------- */

const QUADRANT_ORDER: readonly Quadrant[] = ['sofort', 'einplanen', 'delegieren', 'spaeter'];
const QUADRANT_SUB: Readonly<Record<Quadrant, string>> = {
  sofort: 'wichtig + dringend',
  einplanen: 'wichtig, nicht dringend',
  delegieren: 'dringend, nicht wichtig',
  spaeter: 'weder',
};
const MAX_PRO_QUADRANT = 5;

/** ISO-Datum (YYYY-MM-DD) → deutsche Anzeige TT.MM.JJJJ. */
function datumDe(iso: string): string {
  const [j, m, t] = iso.split('-');
  return `${t}.${m}.${j}`;
}

function EisenhowerBoard({
  role,
  onDive,
}: {
  role: DemoRole | null;
  onDive?: (tenantId: string) => void;
}) {
  const anker = getCustomerTenants()[0]?.tenant_id ?? '';
  const board = buildEisenhower(role, anker);

  return (
    <section className="pf-eh" aria-label="Priorisierung nach Eisenhower">
      <p className="pf-eh-hinweis">
        Abgeleitet aus dem Datenzustand — Schutzbedarf, offener Stand, fehlender Owner, Aktualität.
        Die Frist ist ein aus dem Erfassungsstand abgeleiteter Vorschlag, kein vom Kunden
        gelieferter Termin; echte Kunden-Aufgaben mit Frist folgen mit einer erweiterten Erfassung.
      </p>
      <div className="pf-eh-grid">
        {QUADRANT_ORDER.map((q) => {
          const items = board.quadranten[q];
          return (
            <div key={q} className={`pf-eh-quadrant pf-eh-quadrant--${q}`}>
              <h3 className="pf-eh-titel">
                {QUADRANT_LABEL[q]} <span className="pf-eh-sub">{QUADRANT_SUB[q]}</span>
              </h3>
              {items.length === 0 ? (
                <p className="pf-eh-leer">keine offenen Aufgaben</p>
              ) : (
                <ul className="pf-eh-items">
                  {items.slice(0, MAX_PRO_QUADRANT).map((it) => (
                    <li key={`${it.tenantId}-${it.objectId}`}>
                      <button
                        type="button"
                        className="pf-eh-item"
                        onClick={() => onDive?.(it.tenantId)}
                        aria-label={`${it.tenantName}: ${it.name} — Cockpit öffnen`}
                      >
                        <span className="pf-eh-item-name">{it.name}</span>
                        <span className="pf-eh-item-meta">
                          {it.tenantName} · {it.typLabel}
                        </span>
                        <span className="pf-eh-item-frist">
                          Frist (Vorschlag): {datumDe(it.prioritaet.fristIso)}
                          {it.prioritaet.gruende[0] ? ` · ${it.prioritaet.gruende[0]}` : ''}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {items.length > MAX_PRO_QUADRANT ? (
                <p className="pf-eh-mehr">+ {items.length - MAX_PRO_QUADRANT} weitere</p>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="pf-eh-regel">
        Regel: Wichtigkeit = hoher Schutzbedarf oder Vertraulichkeit. Dringlichkeit = offener
        Lebenszyklus, fehlender Owner, ungeprüfter oder überholter Stand. Quadrant = Wichtigkeit ×
        Dringlichkeit. Nichts erfunden.
      </p>
    </section>
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
  const aufgabenGesamt = buildEisenhower(role, getCustomerTenants()[0]?.tenant_id ?? '').gesamt;
  const [ansicht, setAnsicht] = useState<'datenlage' | 'prioritaet'>('datenlage');

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
          Zwei Sichten über den Umschalter: „Datenlage" zeigt die erfasste „x von y"-Lage je Kunde,
          „Priorisierung" ordnet die offenen Aufgaben nach Dringlichkeit (Eisenhower). Jede Farbe
          kodiert die erfasste Datenlage nach offengelegter Regel – kein Prüfergebnis, kein Score.
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
            <strong>{aufgabenGesamt}</strong>
            <span>offene Aufgaben (priorisiert)</span>
          </div>
          <div className="pf-kennzahl">
            <strong>{model.leereKunden}</strong>
            <span>ohne Datenbestand</span>
          </div>
        </div>

        <div className="pf-umschalter">
          <button
            type="button"
            aria-pressed={ansicht === 'datenlage'}
            className={`pf-tab${ansicht === 'datenlage' ? ' pf-tab--aktiv' : ''}`}
            onClick={() => setAnsicht('datenlage')}
          >
            Datenlage
          </button>
          <button
            type="button"
            aria-pressed={ansicht === 'prioritaet'}
            className={`pf-tab${ansicht === 'prioritaet' ? ' pf-tab--aktiv' : ''}`}
            onClick={() => setAnsicht('prioritaet')}
          >
            Priorisierung
          </button>
        </div>

        {ansicht === 'prioritaet' ? (
          <EisenhowerBoard role={role} onDive={onDive} />
        ) : (
          <>
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
              Jede Zelle ist die erfasste „x von y"-Datenlage des Kunden in dieser Abdeckung. Klick
              auf eine Zelle taucht in das Cockpit des Kunden ein.
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
          </>
        )}
      </section>
    </main>
  );
}
