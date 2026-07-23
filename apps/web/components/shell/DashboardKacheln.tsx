/**
 * Präsentationale Kachel-Bausteine der Dashboard-Schicht (WP-020, DR-0008).
 *
 * Rendert AUSSCHLIESSLICH die in `lib/heute/dashboard.ts` abgeleiteten Modelle – keine eigene
 * Zählung, keine Bewertung, nichts hartkodiert. Gemeinsam genutzt von „Heute" (Ebene 1) und
 * „ISMS" (verdichteter Überblick), damit dieselbe Kachel überall dieselbe Anatomie hat.
 *
 * SELBSTERKLÄRUNG JEDER KACHEL (Dok. 06, Abschnitt „Datenvisualisierung, Accessibility &
 * Responsive Design": „Jedes Diagramm beantwortet eine benannte Frage und nennt Scope sowie
 * Datenstand"): Frage als Überschrift, Scope und Datenstand sichtbar, Ermittlungsregel als
 * aufklappbare `<details>` (progressive Offenlegung, Dok. 06 P06 – die Regel ist immer einen
 * Klick entfernt, nie versteckt), Drill-down als sichtbarer Link (DR-0008: keine Ampel ohne
 * Weg in die Begründung; Dok. 06 „Bewusst vermiedene Muster": keine Dashboard-Wand ohne
 * erkennbare nächste Entscheidung).
 *
 * NIE NUR FARBE (Dok. 06 06-D11 / „Visuelles Designsystem"): Badges tragen Symbol (Form,
 * `aria-hidden`) + Text; der Abdeckungsbalken ist eine zusätzliche Form zur sichtbaren
 * „x von y"-Zahl und selbst `aria-hidden` (die Aussage steht als Text daneben).
 * Keine Animationen – nichts, was `prefers-reduced-motion` unterdrücken müsste.
 *
 * FINDING-0008-Lehre: bewusst KEIN `<dl role="group">` – die neuen Strukturen nutzen einfache
 * Absätze, Listen und Überschriften mit nativer Semantik.
 */
import Link from 'next/link';
import {
  BADGE_RULES,
  type CoverageTile,
  type DashboardBadge,
  type EmptyTenantTile,
  type LifecycleSummaryTile,
  type LifecycleTile,
  type StockTile,
  type TileExplanation,
} from '../../lib/heute/dashboard';

/** Überschriften-Ebene der Kachel-Frage – je nach umgebender Struktur h3 oder h4. */
export type KachelHeadingLevel = 'h3' | 'h4';

function KachelFrage({ level, children }: { level: KachelHeadingLevel; children: string }) {
  const Tag = level;
  return <Tag className="db-frage">{children}</Tag>;
}

/**
 * Badge: Symbol (Form, dekorativ) + Text – Farbe kommt ausschließlich im CSS dazu.
 * `title` trägt die Regel-Basis samt Grenzsatz (Review-Finding Product F8: „vollständig
 * belegt" darf nicht als fachliches Urteil lesbar sein – die Basis sagt ausdrücklich, dass
 * der Datenbestand über fachliche Zulänglichkeit nichts aussagt); die vollständige
 * Ermittlungsregel bleibt zusätzlich in der aufklappbaren Regel der Kachel.
 */
export function BadgeAnzeige({ badge }: { badge: DashboardBadge }) {
  return (
    <p className={`db-badge db-badge--${badge.rule}`} title={BADGE_RULES[badge.rule].basis}>
      <span aria-hidden="true">{badge.symbol}</span> {badge.text}
    </p>
  );
}

/**
 * Gemeinsamer Erklärteil jeder Kachel: Scope, Datenstand (Systemachse, ehrlicher Leerwert),
 * Ermittlungsregel, Drill-down. Struktur-, nicht Wortlaut-Vertrag (Lektion 11) – per Test
 * über die Klassen `db-meta`, `db-regel`, `db-drill` geprüft.
 */
export function KachelErklaerung({ tile }: { tile: TileExplanation }) {
  return (
    <>
      <p className="db-meta">
        {'Scope: '}
        {tile.scope}
        {' · Datenstand (zuletzt im System erfasst): '}
        {tile.datenstand && tile.datenstandDisplay ? (
          <time dateTime={tile.datenstand}>{tile.datenstandDisplay}</time>
        ) : (
          'keine Erfassung im Datenbestand'
        )}
      </p>
      <details className="db-regel">
        <summary>Ermittlungsregel</summary>
        <p>{tile.regel}</p>
      </details>
      <p className="db-drill">
        <Link href={tile.drilldown.href}>{tile.drilldown.label} →</Link>
      </p>
    </>
  );
}

/** Statuskachel: belegte Zählwerte, keine Bewertung. */
export function StockKachel({
  tile,
  headingLevel = 'h3',
}: {
  tile: StockTile;
  headingLevel?: KachelHeadingLevel;
}) {
  return (
    <div className="db-tile" data-tile-id={tile.id}>
      <KachelFrage level={headingLevel}>{tile.frage}</KachelFrage>
      <p className="db-wert">
        {tile.values.map((value) => (
          <span className="db-wert-paar" key={value.label}>
            <span className="db-wert-zahl">{value.count}</span>
            <span className="db-wert-label">{value.label}</span>
          </span>
        ))}
      </p>
      <KachelErklaerung tile={tile} />
    </div>
  );
}

/** Kompakte Lebenszyklus-Kachel (Ebene 1): Zählung der verschiedenen Stände + 08-D07-Glosse. */
export function LifecycleSummaryKachel({
  tile,
  headingLevel = 'h3',
}: {
  tile: LifecycleSummaryTile;
  headingLevel?: KachelHeadingLevel;
}) {
  return (
    <div className="db-tile" data-tile-id="lebenszyklus_zaehlung">
      <KachelFrage level={headingLevel}>{tile.frage}</KachelFrage>
      <p className="db-wert">
        <span className="db-wert-paar">
          <span className="db-wert-zahl">{tile.distinctCount}</span>
          <span className="db-wert-label">verschiedene erfasste Stände</span>
        </span>
      </p>
      {/* 08-D07-Glosse: Pflichttext, immer sichtbar (kein Prüfergebnis). */}
      <p className="db-glosse">{tile.glosse}</p>
      <KachelErklaerung tile={tile} />
    </div>
  );
}

/** Volle Lebenszyklus-Verteilung (Ort „ISMS"): Stand + Anzahl + Balken, 08-D07-Glosse. */
export function LifecycleVerteilungKachel({
  tile,
  headingLevel = 'h3',
}: {
  tile: LifecycleTile;
  headingLevel?: KachelHeadingLevel;
}) {
  return (
    <div className="db-tile db-tile--breit" data-tile-id="lebenszyklus_verteilung">
      <KachelFrage level={headingLevel}>{tile.frage}</KachelFrage>
      <ul className="db-verteilung">
        {tile.slices.map((slice) => (
          <li key={slice.status}>
            <span className="db-verteilung-stand">{slice.status}</span>
            <span className="db-verteilung-zahl">
              {slice.count} von {tile.total}
            </span>
            <Balken covered={slice.count} total={tile.total} />
          </li>
        ))}
      </ul>
      {/* 08-D07-Glosse: Pflichttext, immer sichtbar (kein Prüfergebnis). */}
      <p className="db-glosse">{tile.glosse}</p>
      <KachelErklaerung tile={tile} />
    </div>
  );
}

/** Abdeckungskachel: „x von y" als Text, Balken als zusätzliche Form, Badge aus Positivliste. */
export function CoverageKachel({
  tile,
  headingLevel = 'h3',
}: {
  tile: CoverageTile;
  headingLevel?: KachelHeadingLevel;
}) {
  return (
    <div className="db-tile" data-tile-id={tile.id}>
      <KachelFrage level={headingLevel}>{tile.frage}</KachelFrage>
      {tile.isEmpty ? (
        <p className="db-leer">{tile.emptyText}</p>
      ) : (
        <>
          <p className="db-wert">
            <span className="db-wert-paar">
              <span className="db-wert-zahl">
                {tile.covered} von {tile.total}
              </span>
            </span>
          </p>
          <Balken covered={tile.covered} total={tile.total} />
        </>
      )}
      {tile.badge ? <BadgeAnzeige badge={tile.badge} /> : null}
      <KachelErklaerung tile={tile} />
    </div>
  );
}

/** Ehrliche Datenlücken-Kachel eines leeren Mandanten (Finovia/MediCore). */
export function EmptyTenantKachel({
  tile,
  headingLevel = 'h3',
}: {
  tile: EmptyTenantTile;
  headingLevel?: KachelHeadingLevel;
}) {
  return (
    <div className="db-tile db-tile--leer" data-tile-id="datenluecke">
      <KachelFrage level={headingLevel}>{tile.frage}</KachelFrage>
      <p className="db-leer">{tile.text}</p>
      <BadgeAnzeige badge={tile.badge} />
      <KachelErklaerung tile={tile} />
    </div>
  );
}

/**
 * Abdeckungsbalken als reine FORM-Ergänzung zur sichtbaren „x von y"-Angabe: dekorativ
 * (`aria-hidden`), die Aussage steht als Text daneben – Screenreader verlieren nichts.
 * Die Breite ist ein Anteil an der SICHTBAREN Grundgesamtheit, kein Prozent-Score im Text.
 */
function Balken({ covered, total }: { covered: number; total: number }) {
  const anteil = total > 0 ? Math.max(0, Math.min(1, covered / total)) : 0;
  return (
    <div className="db-balken" aria-hidden="true">
      <div className="db-balken-fuellung" style={{ width: `${anteil * 100}%` }} />
    </div>
  );
}
