/**
 * Präsentationaler Inhalt des Ortes „Wissen" (WP-032 Slice 3, read-only).
 *
 * QUELLEN (Regel Null, am PDF gegengelesen – Abschnittstitel, nicht Nummer):
 *  - Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile „Wissen" („Suche, Glossar, Vorlagen,
 *    Best Practices, Lernhinweise — Kontextsensitiv und rollenbezogen"), Abschnitt „Suche,
 *    Benachrichtigungen & Wiederaufnahme" (globale Suche; vertrauliche Treffer dürfen nicht
 *    über Vorschautexte sichtbar werden).
 *  - Dok. 07, Abschnitte „Kanonische Objektfamilien" und „Kanonischer Beziehungskatalog" –
 *    gelesen über `lib/wissen/glossar.ts`, das den Vertrag ausschließlich liest.
 *
 * ANTWORT-MODUS (DR-0013): Über der Falz steht, was die Seite HEUTE beantwortet – die
 * Begriffserklärung. Die sichtbare Leitfrage ist deshalb NICHT die aspirative Frage des
 * Screenkatalogs („Wo finde ich Erklärung, Vorlage und bewährtes Vorgehen zum aktuellen
 * Kontext?"): von ihren drei Teilen kann die Seite heute nur den ersten beantworten, und
 * kontextsensitiv ist sie gar nicht. Der Konzeptanker bleibt in `lib/shell/places.ts` erhalten
 * und ist dort begründet (offene Frage O-WP032-02).
 *
 * EHRLICHKEIT ÜBER DIE DÜNNE STELLE – ABER IN PRODUKTSPRACHE: Dieser Ort ist im Konzept am
 * schwächsten ausgeführt (eine Navigationszeile plus zwei Querschnitte; ein eigenes
 * Wissenskonzept gibt es nicht – offene Frage O-WP032-04). Das ist eine PROJEKT-Aussage und
 * gehört deshalb NICHT in die Oberfläche (DR-0013 Nr. 2: kein internes Vokabular). Sichtbar
 * wird stattdessen die produktseitige Wahrheit: Der Glossar ist da, Suche, Vorlagen und
 * bewährte Vorgehen sind es nicht – benannt als Sach-Lücke, ohne Termin und ohne Erfindung.
 *
 * GRENZEN (Zuschnitt):
 *  - KEIN SUCHFELD. Die globale Suche ist ein eigenes Vorhaben; sie braucht als Pflichtteil
 *    einen Schutz davor, dass Vorschautexte vertrauliche Treffer verraten. Ein halb
 *    funktionierendes Suchfeld wäre hier schlechter als keines.
 *  - KEINE VORLAGEN, KEINE „bewährten Vorgehen": Für beides gibt es keinen Datenträger und
 *    keine Konzeptaussage, die man ohne Erfindung wiedergeben könnte.
 *  - KEINE CODES: weder Familien- noch Beziehungs-Kennungen noch technische Beziehungsnamen.
 *    Das Modell in `lib/wissen/glossar.ts` trägt diese Felder gar nicht erst.
 *  - MANDANTENUNABHÄNGIG: Der Glossar beschreibt das Modell der Plattform, nicht den Bestand
 *    eines Unternehmens. Er enthält deshalb keine mandantenbezogene Aussage.
 *
 * Heading-Hierarchie: h1 (Ort) > h2 (Abschnitt) > h3 (Block).
 */
import type { DemoTenant } from '@isms/demo-seed';
import { derivePageContextFacts } from '../../lib/shell/page-context';
import type { DemoRole } from '../../lib/shell/roles';
import { getObjectsForTenant, getRelationshipsForTenant } from '../../lib/twin/data';
import { buildGlossar, type GlossarFamilie } from '../../lib/wissen/glossar';
import { PageContextBar } from '../shell/PageContextBar';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

/**
 * `tenant`/`role` dienen ausschließlich der KONTEXTLEISTE: Auch auf einer mandantenunabhängigen
 * Seite muss sichtbar bleiben, in welchem Kontext man sich gerade befindet (Dok. 06 „Sichtbarer
 * Kontext": „Verhindert Fehlkontext") – sonst wäre der Glossar die einzige Seite, auf der man
 * den aktiven Mandanten aus dem Blick verliert. Der INHALT der Seite hängt von beidem nicht ab;
 * die Leiste sagt das im Objektkontext-Feld ausdrücklich, und der Datenstand ist deshalb
 * ausdrücklich als Stand des MANDANTENBESTANDS beschriftet, nicht als Stand des Glossars.
 */
export function WissenContent({ role, tenant }: { role: DemoRole | null; tenant: DemoTenant }) {
  const glossar = buildGlossar();
  // Nur für die Kontextleiste: derselbe Datenstand, den die übrigen Orte dieses Mandanten
  // zeigen. Der Glossar selbst hat keinen Datenstand – ein erfundenes Datum gäbe es hier nicht.
  const kontext = derivePageContextFacts(
    getObjectsForTenant(tenant.tenant_id),
    getRelationshipsForTenant(tenant.tenant_id),
  );

  return (
    <>
      <p className="tw-eyebrow">Wissen · Glossar</p>
      <h1>Wissen</h1>

      {/* Sichtbare Leitfrage = die Frage, die diese Seite heute beantwortet (DR-0013 Nr. 1). */}
      <p className="tw-question">Was bedeuten die Begriffe, mit denen diese Plattform arbeitet?</p>

      {/* ANTWORT ZUERST: der Umfang des Glossars in Zahlen, unmittelbar gefolgt vom Glossar. */}
      <p className="tw-lead">
        Der Glossar erklärt das gemeinsame Vokabular: {glossar.familien.length} Objektfamilien mit
        ihrer Leitfrage, {glossar.objektartenGesamt} Objektarten und {glossar.beziehungen.length}{' '}
        Beziehungsarten in Klartext. Er beschreibt das Modell der Plattform – nicht den Bestand
        eines Unternehmens.
      </p>

      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Objektkontext des Glossars"
        scopeValue="gemeinsames Vokabular – unabhängig vom aktiven Mandanten"
        datenstandLabel="Datenstand des Mandantenbestands (zuletzt im System erfasst)"
        datenstandValue={
          kontext.recordedOn && kontext.recordedOnDisplay ? (
            <time dateTime={kontext.recordedOn}>{kontext.recordedOnDisplay}</time>
          ) : (
            'keine Erfassung hinterlegt'
          )
        }
      />

      <FamilienSection glossar={glossar} />
      <BeziehungenSection glossar={glossar} />
      <NochNichtDaSection />

      <SeitenbausteineHinweis ort="wissen" />
    </>
  );
}

/* -----------------------------------------------------------------------------
 * 1. Objektfamilien und Objektarten
 * --------------------------------------------------------------------------- */

function FamilienSection({ glossar }: { glossar: ReturnType<typeof buildGlossar> }) {
  return (
    <section aria-labelledby="wis-familien">
      <h2 id="wis-familien">Woraus das Modell besteht</h2>
      <p className="sv-edge-note">
        Alles, was die Plattform kennt, gehört zu einer von {glossar.familien.length} Familien. Jede
        Familie beantwortet eine eigene Frage – zusammen ergeben sie das Bild eines Unternehmens.
      </p>
      {glossar.familien.map((familie) => (
        <FamilieBlock key={familie.name} familie={familie} />
      ))}

      <p className="sv-edge-note">
        Für {glossar.objektartenMitKlartext} der {glossar.objektartenGesamt} Objektarten gibt es
        eine deutsche Bezeichnung; die übrigen tragen ihren Katalognamen. Eine Übersetzung wird hier
        nicht erfunden – ein ausgedachtes Wort wäre schlechter als der Fachbegriff.
      </p>
      {glossar.hatMehrfachZuordnung ? (
        <p className="sv-edge-note">
          Eine Objektart kann in zwei Familien stehen. Das ist so gewollt und kein Fehler des
          Katalogs.
        </p>
      ) : null}
    </section>
  );
}

function FamilieBlock({ familie }: { familie: GlossarFamilie }) {
  return (
    <div>
      <h3>{familie.name}</h3>
      <p className="sv-edge-note">{familie.leitfrage}</p>
      <ul className="sv-items">
        {familie.arten.map((art) => (
          <li key={art.anzeige}>
            <span className="sv-item-name">{art.anzeige}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * 2. Beziehungsarten in Klartext
 * --------------------------------------------------------------------------- */

function BeziehungenSection({ glossar }: { glossar: ReturnType<typeof buildGlossar> }) {
  const ohneKlartext = glossar.beziehungenGesamt - glossar.beziehungen.length;

  return (
    <section aria-labelledby="wis-beziehungen">
      <h2 id="wis-beziehungen">Wie die Dinge zusammenhängen</h2>
      <p className="sv-edge-note">
        Der Wert des Modells entsteht nicht aus einzelnen Einträgen, sondern aus ihren Verbindungen:
        Ein Nachweis <em>belegt</em> ein Control, eine Maßnahme <em>mindert</em> ein Risiko. Jede
        Verbindung hat eine Leserichtung und eine feste Bedeutung.
      </p>
      <ul className="sv-items">
        {glossar.beziehungen.map((beziehung) => (
          <li key={beziehung.klartext}>
            <span className="sv-item-name">{beziehung.klartext}</span>
            <span className="sv-item-note">{beziehung.bedeutung}</span>
          </li>
        ))}
      </ul>
      {ohneKlartext > 0 ? (
        <p className="sv-edge-note">
          Der Katalog kennt {glossar.beziehungenGesamt} Beziehungsarten. {ohneKlartext} davon haben
          noch keine deutsche Bezeichnung und stehen deshalb nicht in dieser Liste – sie hier nur
          unter ihrem technischen Namen zu führen, würde nichts erklären.
        </p>
      ) : null}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * 3. Die ruhige Schlusszeile: was dieser Ort noch nicht kann
 * --------------------------------------------------------------------------- */

/**
 * Benannte Lücken als SACH-LÜCKE, ohne Termin, ohne Erfindung und ohne Projektsprache.
 * Die Reihenfolge folgt der Navigationszeile aus Dok. 06 (Suche, Vorlagen, Best Practices,
 * Lernhinweise, Kontextsensitivität) – so bleibt sichtbar, dass hier nichts unterschlagen wird.
 */
function NochNichtDaSection() {
  return (
    <section aria-labelledby="wis-luecken">
      <h2 id="wis-luecken">Was hier noch nicht steht</h2>
      <p className="sv-edge-note">
        Dieser Ort soll mehr können als Begriffe erklären. Vier Bausteine sind noch nicht angebunden
        – sie werden hier benannt statt angedeutet.
      </p>
      <ul className="sv-items">
        <li>
          <span className="sv-item-name">Suche über alle Inhalte</span>
          <span className="sv-item-note">
            Eine Suche ist der wichtigste Weg in ein großes Modell. Sie ist ein eigenes Vorhaben,
            weil sie mehr braucht als ein Eingabefeld: Vorschautexte dürfen nichts preisgeben, was
            man ohne Berechtigung nicht sehen darf. Deshalb steht hier bewusst kein halb
            funktionierendes Suchfeld.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Vorlagen</span>
          <span className="sv-item-note">
            Es sind keine Vorlagen hinterlegt. „Vorlage" ist heute auch keine eigene Objektart im
            Modell – wo Vorlagen künftig leben, ist offen.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Bewährte Vorgehen und Lernhinweise</span>
          <span className="sv-item-note">
            Hier steht nichts, weil es dafür keine belegte Grundlage gibt. Ausgedachte Empfehlungen
            wären in einem Sicherheitsprodukt die schlechteste aller Antworten.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Bezug zum aktuellen Kontext</span>
          <span className="sv-item-note">
            Der Glossar zeigt für alle dasselbe. Erklärungen, die sich auf die gerade geöffnete
            Seite oder die gewählte Rolle beziehen, setzen Suche und Kontextbezug voraus und sind
            noch nicht angebunden.
          </span>
        </li>
      </ul>
      <p className="tw-muted">Diese Benennung beschreibt den heutigen Stand, keinen Zeitplan.</p>
    </section>
  );
}
