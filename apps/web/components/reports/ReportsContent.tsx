/**
 * Präsentationaler Inhalt des Ortes „Reports" (WP-032 Slice 2, read-only).
 *
 * QUELLEN (Regel Null, am PDF gegengelesen – Abschnittstitel, nicht Nummer):
 *  - Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile „Reports" („Briefings, PDF/PPTX,
 *    Management Review, Exporte") und Abschnitt „Seiten- und Screenkatalog" (Reporting Studio).
 *  - Dok. 12, Abschnitte „Kanonisches Report Package", „Report- und Artefakttypen",
 *    „Content-Block-Architektur", „Kanonischer Case-Katalog", „Geschützte manuelle Inhalte",
 *    „Daten-Snapshots und Reproduzierbarkeit", „Claims, Quellen und Nachvollziehbarkeit",
 *    „Reporting-Verfassung" – als react-freie Konstanten in `lib/reports/katalog.ts`, je mit
 *    Quellkommentar.
 *
 * ANTWORT-MODUS (DR-0013): Über der Falz steht, was die Seite HEUTE beantwortet – welche
 * Berichte das Produkt vorsieht und welches Material des aktiven Mandanten dafür erfasst ist.
 * Die sichtbare Leitfrage ist deshalb NICHT die aspirative Frage des Screenkatalogs („Welche
 * Geschichte soll aus demselben Datenstand entstehen?"): sie setzt einen Generator voraus, den
 * es nicht gibt, und müsste im nächsten Satz zurückgenommen werden. Der Konzeptanker bleibt in
 * `lib/shell/places.ts` erhalten und ist dort begründet (offene Frage O-WP032-02). Dass heute
 * kein Bericht entsteht, steht als ruhige Schlusszeile am Seitenende – nicht als Eingangswand.
 *
 * GRENZEN (Zuschnitt, `.claude/rules/reporting.md`, DR-0008):
 *  - KEINE ERZEUGUNG: kein Entwurf, keine Vorschau, kein Export, kein Bedienelement mit
 *    Erzeugungs- oder Schreibsemantik. Die Ausgabe als Präsentation oder PDF ist ein eigener
 *    Ausbauschritt.
 *  - KEINE ZUORDNUNG „Berichtstyp ↔ Objekt": Die gezählte Grundlage sagt, WAS erfasst ist –
 *    nicht, welcher Bericht es verwenden würde. Diese Zuordnung entsteht erst mit einer
 *    Berichtsdefinition; sie hier zu erfinden wäre eine Wertung ohne Datenträger.
 *  - KEINE BEWERTUNG: kein Reifegrad, kein Score, keine Ampel, kein Trend, kein Prozent.
 *  - PREISFREI: Wo die Quellstruktur Kosten- oder Preisannahmen vorsieht, bleibt das
 *    Strukturwort stehen, aber es erscheint nirgends ein Betrag, ein Währungszeichen oder ein
 *    Preisband; die Lücke wird ausdrücklich benannt.
 *  - MANDANTENGRENZE: mandantenbezogene Zahlen entstehen ausschließlich aus dem aktiven
 *    Mandanten; die Konzeptstruktur ist mandantenneutral und wird nie als sein Bestand
 *    ausgegeben.
 *
 * Heading-Hierarchie: h1 (Ort) > h2 (Abschnitt) > h3 (Block) > h4 (Unterblock).
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import {
  buildReportGrundlage,
  type GrundlageGruppe,
  type ReportGrundlageModel,
} from '../../lib/reports/data';
import {
  CASE_KATALOG_HINWEIS,
  CLAIM_BESTANDTEILE,
  CONTENT_BLOCK_TYPEN,
  ENGINE_VERHINDERT,
  MANUELLE_INHALTE,
  PRESENTATION_CASES,
  REPORT_FASSUNGEN,
  REPORT_GRUPPEN,
  REPORT_LEBENSZYKLUS,
  REPORT_PACKAGE_FELDER,
  REPORT_ZUSATZSTATUS,
  reportTypenAnzahl,
  SNAPSHOT_BESTANDTEILE,
} from '../../lib/reports/katalog';
import type { DemoRole } from '../../lib/shell/roles';
import { PageContextBar } from '../shell/PageContextBar';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

/**
 * `role` ist reine Anzeige (Kontextleiste) und ändert weder Daten noch Sichtbarkeit.
 * `null` = neutraler Zustand (DR-0009): dieselbe Seite, derselbe Inhalt.
 */
export function ReportsContent({ role, tenant }: { role: DemoRole | null; tenant: DemoTenant }) {
  const model = buildReportGrundlage(tenant);
  const typenAnzahl = reportTypenAnzahl();

  return (
    <>
      <p className="tw-eyebrow">Reports · Berichtsstruktur und Datengrundlage</p>
      <h1>Reports</h1>

      {/* Sichtbare Leitfrage = die Frage, die diese Seite heute beantwortet (DR-0013 Nr. 1). */}
      <p className="tw-question">
        Welche Berichte sieht die Plattform vor – und welches Material von {tenant.display_name}{' '}
        wäre heute dafür erfasst?
      </p>

      {/* ANTWORT ZUERST: die belegte Struktur in Zahlen, direkt gefolgt von der gezählten
          Grundlage des aktiven Mandanten (erster Abschnitt, über der Falz). */}
      <p className="tw-lead">
        Die Plattform sieht {typenAnzahl} Berichts- und Artefakttypen in {REPORT_GRUPPEN.length}{' '}
        Gruppen sowie {PRESENTATION_CASES.length} wiederverwendbare Präsentationsfälle vor.{' '}
        {model.isEmpty ? (
          <>
            Für {tenant.display_name} ist bisher kein Material erfasst, das ein Bericht aufgreifen
            könnte.
          </>
        ) : (
          <>
            Welches Material von {tenant.display_name} dafür heute erfasst ist, steht direkt
            darunter – gezählt, nicht bewertet.
          </>
        )}
      </p>

      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Scope-Kennungen der Datengrundlage"
        scopeValue={
          model.context.scopeIds.length > 0
            ? model.context.scopeIds.join(' · ')
            : 'keine Scope-Zuordnung erfasst'
        }
        datenstandLabel="Datenstand der Datengrundlage (zuletzt im System erfasst)"
        datenstandValue={
          model.context.recordedOn && model.context.recordedOnDisplay ? (
            <time dateTime={model.context.recordedOn}>{model.context.recordedOnDisplay}</time>
          ) : (
            'keine Erfassung hinterlegt'
          )
        }
      />

      <DatengrundlageSection model={model} tenant={tenant} />
      <BerichtstypenSection />
      <PraesentationsfaelleSection />
      <AufbauSection />
      <NichtEntstehtSection tenant={tenant} />

      <SeitenbausteineHinweis ort="reports" />
    </>
  );
}

/* -----------------------------------------------------------------------------
 * 1. Belegbare Datengrundlage des aktiven Mandanten (nur Zählung, keine Wertung)
 * --------------------------------------------------------------------------- */

function DatengrundlageSection({
  model,
  tenant,
}: {
  model: ReportGrundlageModel;
  tenant: DemoTenant;
}) {
  return (
    <section aria-labelledby="rep-grundlage">
      <h2 id="rep-grundlage">Datengrundlage von {tenant.display_name}</h2>
      <p className="sv-edge-note">
        Was für diesen Mandanten erfasst ist – gezählt aus denselben Ableitungen wie die Fachorte,
        damit die Zahlen dort und hier übereinstimmen. Angezeigt wird ausschließlich der aktive
        Mandant.
      </p>
      <p className="sv-edge-note">
        Welcher Bericht welches Material verwendet, legt erst eine Berichtsdefinition fest. Hier
        steht nur, <strong>was erfasst ist</strong> – keine Zuordnung, keine Bewertung, keine
        Aussage über Vollständigkeit.
      </p>

      {model.isEmpty ? (
        <div className="tw-empty" role="note">
          <h3 style={{ marginTop: 0, border: 'none', padding: 0 }}>Noch kein Material erfasst</h3>
          <p style={{ marginTop: 0 }}>
            Für <strong>{tenant.display_name}</strong> sind bisher keine Risiken, Controls,
            Maßnahmen, Nachweise, Services oder Entscheidungen hinterlegt. Damit gibt es nichts, was
            ein Bericht aufgreifen könnte.
          </p>
          <p className="tw-muted" style={{ marginBottom: 0 }}>
            Die Berichtsstruktur unten gilt unabhängig vom Datenbestand – sie beschreibt, was die
            Plattform vorsieht.
          </p>
        </div>
      ) : (
        model.gruppen.map((gruppe) => <GrundlageGruppeBlock key={gruppe.titel} gruppe={gruppe} />)
      )}
    </section>
  );
}

function GrundlageGruppeBlock({ gruppe }: { gruppe: GrundlageGruppe }) {
  const summe = gruppe.posten.reduce((s, p) => s + p.anzahl, 0);

  return (
    <div>
      <h3>{gruppe.titel}</h3>
      {summe === 0 ? (
        <p className="sv-edge-note">Aus diesem Bereich ist für diesen Mandanten nichts erfasst.</p>
      ) : (
        <>
          <ul className="sv-items">
            {gruppe.posten.map((p) => (
              <li key={p.bezeichnung}>
                <span className="sv-item-name">
                  {p.anzahl} {p.anzahl === 1 ? p.bezeichnungEinzahl : p.bezeichnung}
                </span>
                <span className="sv-item-note">{p.ermittlung}</span>
              </li>
            ))}
          </ul>
          <p className="sv-edge-note">
            <Link className="tw-cta" href={gruppe.ort}>
              {gruppe.ortLabel} →
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * 2. Berichts- und Artefakttypen (Konzeptstruktur, mandantenneutral)
 * --------------------------------------------------------------------------- */

function BerichtstypenSection() {
  return (
    <section aria-labelledby="rep-typen">
      <h2 id="rep-typen">Welche Berichte die Plattform vorsieht</h2>
      <p className="sv-edge-note">
        Diese Aufstellung beschreibt das Produkt, nicht den Zustand eines Unternehmens: Sie sagt,
        welche Berichte und Artefakte entstehen sollen – nicht, wie es um den aktiven Mandanten
        steht.
      </p>
      {REPORT_GRUPPEN.map((gruppe) => (
        <details className="sv-details" key={gruppe.titel}>
          <summary>
            {gruppe.titel} ({gruppe.typen.length})
          </summary>
          <ul className="sv-items">
            {gruppe.typen.map((typ) => (
              <li key={typ.name}>
                <span className="sv-item-name">{typ.name}</span>
                {typ.ziel ? <span className="sv-item-note">{typ.ziel}</span> : null}
                {typ.inhalte ? (
                  <span className="sv-item-note">Typische Inhalte: {typ.inhalte}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * 3. Kanonischer Case-Katalog
 * --------------------------------------------------------------------------- */

function PraesentationsfaelleSection() {
  return (
    <section aria-labelledby="rep-faelle">
      <h2 id="rep-faelle">Wiederverwendbare Präsentationsfälle</h2>
      <p className="sv-edge-note">
        Wiederkehrende Termine sollen kein neues Deck erzwingen: Die Plattform sieht eine Bibliothek
        von Fällen vor, die kontrolliert aktualisiert statt neu erstellt werden.
      </p>
      <details className="sv-details">
        <summary>Die vorgesehenen Fälle ({PRESENTATION_CASES.length})</summary>
        <ul className="sv-items">
          {PRESENTATION_CASES.map((fall) => (
            <li key={fall.name}>
              <span className="sv-item-name">{fall.name}</span>
              <span className="sv-item-note">{fall.inhalt}</span>
            </li>
          ))}
        </ul>
        <p className="sv-desc">{CASE_KATALOG_HINWEIS}</p>
      </details>
      {/* Sphärenklarstellung: Zwei Fälle des Katalogs sind ausdrücklich Betreiber-Sichten.
          Auf DIESER Seite entsteht daraus nichts, was über den aktiven Mandanten hinausgeht –
          die Formulierung vermeidet bewusst jede Existenzaussage über weitere Mandanten. */}
      <p className="sv-edge-note">
        Einzelne Fälle richten sich an Betreiberrollen und blicken über ein einzelnes Unternehmen
        hinaus. Auf dieser Seite entsteht daraus keine Ansicht, die über den aktiven Mandanten
        hinausgeht.
      </p>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * 4. Woraus ein Bericht besteht (Report Package, Lebenszyklus, Content Blocks)
 * --------------------------------------------------------------------------- */

function AufbauSection() {
  return (
    <section aria-labelledby="rep-aufbau">
      <h2 id="rep-aufbau">Woraus ein Bericht besteht</h2>
      <p className="sv-edge-note">
        Ein Bericht ist in der Plattform mehr als eine Datei: Er ist ein eigenes Objekt mit
        Pflichtfeldern, Lebenszyklus und wiederverwendbaren Bausteinen. Im heutigen Datenbestand
        gibt es dieses Objekt noch nicht – die folgende Struktur beschreibt, was es tragen wird.
      </p>

      <h3>Pflichtfelder eines Berichts</h3>
      <details className="sv-details">
        <summary>Die {REPORT_PACKAGE_FELDER.length} Pflichtfelder</summary>
        <ul className="sv-items">
          {REPORT_PACKAGE_FELDER.map((feld) => (
            <li key={feld.feld}>
              <span className="sv-item-name">{feld.feld}</span>
              <span className="sv-item-note">{feld.bedeutung}</span>
            </li>
          ))}
        </ul>
      </details>

      <h3>Vom Entwurf bis zum Archiv</h3>
      <p className="sv-edge-note">
        Erzeugen, fachlich prüfen, freigeben, veröffentlichen und verteilen sind ausdrücklich
        verschiedene Zustände – ein Entwurf ist keine Freigabe.
      </p>
      <details className="sv-details">
        <summary>
          Die {REPORT_LEBENSZYKLUS.length} Stationen und {REPORT_ZUSATZSTATUS.length} Zusatzstände
        </summary>
        <ul className="sv-items">
          {REPORT_LEBENSZYKLUS.map((station, index) => (
            <li key={station}>
              <span className="sv-item-name">
                {index + 1}. {station}
              </span>
            </li>
          ))}
        </ul>
        <h4>Zusatzstände</h4>
        <ul className="sv-items">
          {REPORT_ZUSATZSTATUS.map((status) => (
            <li key={status.feld}>
              <span className="sv-item-name">{status.feld}</span>
              <span className="sv-item-note">{status.bedeutung}</span>
            </li>
          ))}
        </ul>
      </details>

      <h3>Bausteine, aus denen ein Bericht zusammengesetzt wird</h3>
      <p className="sv-edge-note">
        Jeder Baustein hat eine Mindestanforderung. Sie ist die Bedingung dafür, dass der Baustein
        überhaupt gezeigt werden darf – fehlt sie, entsteht kein Inhalt.
      </p>
      <details className="sv-details">
        <summary>
          Die {CONTENT_BLOCK_TYPEN.length} Bausteintypen mit ihrer Mindestanforderung
        </summary>
        <ul className="sv-items">
          {CONTENT_BLOCK_TYPEN.map((block) => (
            <li key={block.name}>
              <span className="sv-item-name">{block.name}</span>
              <span className="sv-item-note">{block.funktion}</span>
              <span className="sv-item-note">Mindestanforderung: {block.mindestanforderung}</span>
            </li>
          ))}
        </ul>
      </details>

      <h3>Was ein Bericht ausdrücklich nicht tun soll</h3>
      <details className="sv-details">
        <summary>Die {ENGINE_VERHINDERT.length} ausgeschlossenen Muster</summary>
        <ul className="sv-items">
          {ENGINE_VERHINDERT.map((punkt) => (
            <li key={punkt}>
              <span className="sv-item-name">{punkt}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * 5. Die ruhige Schlusszeile: was hier heute nicht entsteht (Antwort-Modus)
 * --------------------------------------------------------------------------- */

/**
 * Die benannten Lücken – als SACH-LÜCKE formuliert („ist hier nicht angebunden"), nicht als
 * Entschuldigung und nicht als Demo-Hinweis (DR-0011). Sie stehen bewusst am Seitenende, nachdem
 * die Struktur und die gezählte Grundlage berichtet wurden (DR-0013 „Antwort zuerst").
 */
function NichtEntstehtSection({ tenant }: { tenant: DemoTenant }) {
  return (
    <section aria-labelledby="rep-luecken">
      <h2 id="rep-luecken">Was hier heute nicht entsteht</h2>
      <p className="sv-edge-note">
        Auf dieser Seite entsteht kein Bericht: kein Entwurf, keine Vorschau, keine Datei und keine
        Freigabe. Im Datenbestand von {tenant.display_name} ist auch kein Bericht erfasst, dessen
        Verlauf hier stehen könnte. Was dafür nötig wäre, steht darunter als Struktur.
      </p>

      <h3>Erzeugung und Ausgabe</h3>
      <p className="sv-edge-note">
        Die Ausgabe als Präsentation, PDF oder Datenexport ist ein eigener Ausbauschritt und hier
        nicht angebunden. Deshalb gibt es auf dieser Seite bewusst keine Schaltfläche, die einen
        Bericht erzeugen, vorschauen oder versenden würde.
      </p>

      <h3>Belegte Aussagen</h3>
      <p className="sv-edge-note">
        Eine materiale Aussage in einem Bericht ist kein freier Satz, sondern ein belegtes Objekt.
        Im Bestand ist keine solche Aussage erfasst – deshalb steht hier keine Aussage mit Quelle,
        Vertrauensgrad und Freigabe.
      </p>
      <details className="sv-details">
        <summary>Woraus eine belegte Aussage bestehen müsste</summary>
        <ul className="sv-items">
          {CLAIM_BESTANDTEILE.map((teil) => (
            <li key={teil}>
              <span className="sv-item-name">{teil}</span>
            </li>
          ))}
        </ul>
      </details>

      <h3>Eingefrorener Datenstand</h3>
      <p className="sv-edge-note">
        Ein veröffentlichter Bericht friert seinen Datenstand ein, damit er später reproduzierbar
        bleibt. Es gibt hier keinen eingefrorenen Datenstand und keine freigegebene Fassung –
        angezeigt wird immer der aktuelle Bestand.
      </p>
      <details className="sv-details">
        <summary>Woraus ein eingefrorener Datenstand bestehen müsste</summary>
        <ul className="sv-items">
          {SNAPSHOT_BESTANDTEILE.map((teil) => (
            <li key={teil}>
              <span className="sv-item-name">{teil}</span>
            </li>
          ))}
        </ul>
        <h4>Und welche Fassungen es geben soll</h4>
        <ul className="sv-items">
          {REPORT_FASSUNGEN.map((fassung) => (
            <li key={fassung.feld}>
              <span className="sv-item-name">{fassung.feld}</span>
              <span className="sv-item-note">{fassung.bedeutung}</span>
            </li>
          ))}
        </ul>
      </details>

      <h3>Von Hand geschriebene Berichtstexte</h3>
      <p className="sv-edge-note">
        Ein automatisches Update darf einen von Hand geschriebenen Text nicht still überschreiben.
        Es gibt hier keinen solchen Text, der zu schützen wäre.
      </p>
      <details className="sv-details">
        <summary>Die vorgesehenen Schutzklassen</summary>
        <ul className="sv-items">
          {MANUELLE_INHALTE.map((klasse) => (
            <li key={klasse.feld}>
              <span className="sv-item-name">{klasse.feld}</span>
              <span className="sv-item-note">{klasse.bedeutung}</span>
            </li>
          ))}
        </ul>
      </details>

      <h3>Preise und Kostenannahmen</h3>
      {/* PREIS-GUARDRAIL (O-KUNDE-01): Mehrere Berichtstypen und Präsentationsfälle sehen Kosten-
          und Preisannahmen ausdrücklich vor. Der Datenbestand trägt keine Preise. Es wird deshalb
          weder ein Betrag noch ein Band noch eine Schätzung gezeigt – die Lücke wird benannt. */}
      <p className="sv-edge-note">
        Mehrere Berichtstypen sehen Kosten- und Preisannahmen vor. Im Datenbestand sind keine Preise
        hinterlegt. Deshalb steht auf dieser Seite kein Betrag, keine Spanne und keine Schätzung –
        auch nicht als Beispiel.
      </p>
    </section>
  );
}
