/**
 * Präsentationale Kachel-Bausteine der Dashboard-Schicht (WP-020, DR-0008).
 *
 * Rendert AUSSCHLIESSLICH die in `lib/heute/dashboard.ts` abgeleiteten Modelle – keine eigene
 * Zählung, keine Bewertung, nichts hartkodiert. Gemeinsam genutzt von „Heute" (Ebene 1) und
 * „ISMS" (verdichteter Überblick), damit dieselbe Kachel überall dieselbe Anatomie hat.
 *
 * SELBSTERKLÄRUNG JEDER KACHEL (Dok. 06, Abschnitt „Datenvisualisierung, Accessibility &
 * Responsive Design": „Jedes Diagramm beantwortet eine benannte Frage und nennt Scope sowie
 * Datenstand"): Frage als Überschrift, Zahl/Balken groß, Badge, Drill-down als sichtbarer Link
 * (DR-0008: keine Ampel ohne Weg in die Begründung; Dok. 06 „Bewusst vermiedene Muster": keine
 * Dashboard-Wand ohne erkennbare nächste Entscheidung).
 *
 * KACHEL-DEDUP (DR-0013 „Kachel-Boilerplate raus"): Der seitenweite Scope und Datenstand stehen
 * EINMAL in der Kontextleiste der Seite (`PageContextBar`), nicht wiederholt auf jeder Kachel.
 * Die kachelSPEZIFISCHE Grundgesamtheit und ihr Datenstand bleiben Pflichtangabe (DR-0008: jede
 * Kachel nennt Scope + Datenstand), stehen aber – zusammen mit der Ermittlungsregel – hinter dem
 * dezenten `<details>`-Element „Ermittlungsregel" (progressive Offenlegung, Dok. 06 P06 – immer
 * einen Klick entfernt, nie versteckt), statt die Kachelfläche zu füllen. „Zahl groß, Kontext
 * klein" (DR-0013): die Kachelfläche trägt Frage + Zahl/Balken + Badge + Drill-down.
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
 *
 * GRENZSATZ SICHTBAR (WP-028 Slice 3, DR-0013 Nr. 7): Der Grenzsatz („Ob die belegte Lage
 * fachlich ausreicht, sagt der Datenbestand nicht.") steht jetzt als eigene Zeile UNTER dem
 * Badge und nicht mehr nur im `title`. Ein `title` ist mit Tastatur und auf Touch praktisch
 * unerreichbar – die Einschränkung war damit faktisch unsichtbar, und das Badge las sich wie
 * ein fachliches Urteil (Review-Finding Product F8, jetzt vom Usability-Audit bestätigt).
 * `title` bleibt zusätzlich als Kurzbeleg der Ermittlungsbasis; die vollständige
 * Ermittlungsregel steht weiterhin im Aufklappteil der Kachel.
 */
export function BadgeAnzeige({ badge }: { badge: DashboardBadge }) {
  return (
    <>
      <p className={`db-badge db-badge--${badge.rule}`} title={BADGE_RULES[badge.rule].basis}>
        <span aria-hidden="true">{badge.symbol}</span> {badge.text}
      </p>
      <p className="db-badge-grenze">{badge.grenze}</p>
    </>
  );
}

/**
 * Gemeinsamer Erklärteil jeder Kachel: der dezente Aufklappteil (kachelspezifischer Scope +
 * Datenstand + Ermittlungsregel) und der sichtbare Drill-down. Struktur-, nicht Wortlaut-Vertrag
 * (Lektion 11) – per Test über die Klassen `db-meta`, `db-regel`, `db-drill` geprüft.
 *
 * KACHEL-DEDUP (DR-0013, s. Kopfnotiz): Scope und Datenstand füllen NICHT mehr die Kachelfläche,
 * sondern stehen mit der Ermittlungsregel hinter dem `<details>` – der seitenweite Scope +
 * Datenstand steht einmal in der Kontextleiste. DR-0008-Pflicht (Kachel nennt Scope +
 * Datenstand) bleibt erfüllt: beides ist einen Klick entfernt, nie versteckt.
 */
export function KachelErklaerung({ tile }: { tile: TileExplanation }) {
  return (
    <>
      <details className="db-regel">
        <summary>So wird gezählt</summary>
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
            {/* Der Stand-NAME bleibt allein in seinem Element: er kommt wörtlich aus Vertrag
                und Seed und wird an mehreren Stellen exakt gegengeprüft. */}
            <span className="db-verteilung-stand">{slice.status}</span>
            <span className="db-verteilung-zahl">
              {slice.count} von {tile.total}
            </span>
            <Balken covered={slice.count} total={tile.total} />
            {/* KENNZEICHNUNG AM WORT (DR-0013 Nr. 8): Stände wie „wirksam", „Geprüft" oder
                „bewertet" lesen sich ohne Hinweis als Urteil dieser Anwendung und widersprächen
                dem Seitensatz „keine Prüfergebnisse und keine bewertete Wirksamkeit". Der Stand
                selbst bleibt unverändert (Vertrag/Seed) – ergänzt wird nur seine Lesart
                (`STAND_HINWEIS` in `lib/heute/dashboard.ts`). Eigene Zeile im Raster
                (`grid-column: 1 / -1`), damit die dreispaltige Zeile erhalten bleibt. */}
            {slice.hinweis ? <span className="db-verteilung-hinweis">{slice.hinweis}</span> : null}
          </li>
        ))}
      </ul>
      {/* 08-D07-Glosse: Pflichttext, immer sichtbar (kein Prüfergebnis). */}
      <p className="db-glosse">{tile.glosse}</p>
      <KachelErklaerung tile={tile} />
    </div>
  );
}

/**
 * Abdeckungskachel: „x von y" als Text, Balken als zusätzliche Form, Badge aus Positivliste.
 *
 * KLEINE GRUNDGESAMTHEIT (WP-028 Slice 3, DR-0013 Nr. 7): Bei n≤2 entfallen Balken UND
 * Erfolgs-Badge; an ihre Stelle tritt der Kleinheits-Hinweis aus dem Modell („nur 1 Control
 * erfasst"). „1 von 1" mit Vollbalken und grünem Häkchen las sich wie eine vollständige
 * Control-Landschaft – die Zahl bleibt unverändert sichtbar, nur die Erfolgssymbolik geht.
 */
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
          {tile.kleineGrundgesamtheit ? null : <Balken covered={tile.covered} total={tile.total} />}
        </>
      )}
      {tile.kleinheitText ? <p className="db-kleinheit">{tile.kleinheitText}</p> : null}
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
