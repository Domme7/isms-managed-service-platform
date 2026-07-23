/**
 * Glossar des gemeinsamen Vokabulars für den Ort „Wissen" (WP-032 Slice 3, read-only).
 *
 * QUELLE (Regel Null, am PDF gegengelesen – zitiert wird der Abschnittstitel):
 *  - Dok. 07 „Digitaler Unternehmenszwilling & Informationsgraph", Abschnitt „Kanonische
 *    Objektfamilien" (Teil 1 und 2): neun Familien mit Namen, Kernobjekten und Leitfrage.
 *  - Dok. 07, Abschnitt „Kanonischer Beziehungskatalog" (Teil 1 und 2): die Beziehungstypen mit
 *    Beispiel und semantischer Regel.
 *  - Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile „Wissen" („Suche, Glossar, Vorlagen,
 *    Best Practices, Lernhinweise").
 *
 * Das Vokabular selbst wird NICHT hier dupliziert: Familien, Objektarten und Beziehungsregeln
 * kommen aus `@isms/contracts` (`OBJECT_FAMILIES`, `RELATIONSHIP_TYPES`), die deutschen
 * Klartext-Bezeichnungen aus der bestehenden UI-Sprachschicht (`lib/twin/data.ts`). Es wird
 * nichts übersetzt, nichts ergänzt und nichts umbenannt – der Vertrag wird ausschließlich
 * GELESEN.
 *
 * KEINE CODES – STRUKTURELL, NICHT NUR TEXTLICH (DR-0013 Nr. 2, O-WP032-05): Die Modelltypen
 * unten tragen BEWUSST kein Feld für Familien-Kennungen (F01…F09), Beziehungs-Kennungen
 * (R01…R25) oder technische Beziehungsnamen (snake_case). Ein Code kann deshalb gar nicht in
 * die Oberfläche gelangen – auch nicht versehentlich durch eine spätere Änderung. Der
 * Negativbeweis im Test sichert das zusätzlich am gerenderten Text ab.
 *
 * EHRLICHE GRENZE (DR-0005): Die Sprachschicht deckt das Vokabular nur teilweise ab. Für die
 * meisten Objektarten gibt es keine freigegebene deutsche Bezeichnung – dann steht der
 * Katalogname selbst (Fachbegriff, app-weit üblich). Für einen Teil der Beziehungsarten gibt es
 * keine freigegebene Klartext-Bezeichnung – diese werden NICHT aufgeführt, weil die einzige
 * Alternative ihr technischer Name wäre. Beide Lücken werden gezählt und benannt, nicht
 * gefüllt: eine hier erfundene Übersetzung wäre eine stille Vokabularerweiterung (offene
 * Glossar-Fragen O-WP014-11 / O-WP017-09).
 *
 * MANDANTENUNABHÄNGIG: Das Vokabular gilt für die Plattform, nicht für ein Unternehmen. Diese
 * Datei liest deshalb KEINEN Mandantenbestand und trifft keine Aussage über einen Mandanten.
 *
 * React-frei und deterministisch testbar (Muster `lib/reports/katalog.ts`).
 */

import {
  OBJECT_FAMILIES,
  OBJECT_FAMILY_ID,
  OBJECT_TYPE,
  RELATIONSHIP_TYPES,
  RELATIONSHIP_TYPE_ID,
} from '@isms/contracts';
import { objectTypeDisplay, objectTypeLabel, relationshipTypeLabel } from '../twin/data';

/** Eine Objektart im Glossar – ohne Familien- oder Typcode. */
export interface GlossarObjektart {
  /** Anzeigename: deutsche Bezeichnung mit Katalognamen, sonst der Katalogname allein. */
  readonly anzeige: string;
  /** `true`, wenn für diese Art eine freigegebene deutsche Bezeichnung existiert. */
  readonly hatKlartext: boolean;
}

/** Eine Objektfamilie im Glossar – ohne Kennung. */
export interface GlossarFamilie {
  readonly name: string;
  readonly leitfrage: string;
  readonly arten: readonly GlossarObjektart[];
}

/** Eine Beziehungsart im Glossar – ausschließlich Klartext, kein technischer Name. */
export interface GlossarBeziehung {
  /** Deutsche Klartext-Bezeichnung, z. B. „belegt". */
  readonly klartext: string;
  /** Semantische Regel aus dem Vertrag (wörtlich) – was die Beziehung bedeutet. */
  readonly bedeutung: string;
}

export interface GlossarModel {
  readonly familien: readonly GlossarFamilie[];
  /** Verschiedene Objektarten im Katalog (eine Art kann in zwei Familien stehen). */
  readonly objektartenGesamt: number;
  /** Davon mit freigegebener deutscher Bezeichnung. */
  readonly objektartenMitKlartext: number;
  /** Beziehungsarten MIT Klartext-Bezeichnung (nur diese werden gezeigt). */
  readonly beziehungen: readonly GlossarBeziehung[];
  /** Alle Beziehungsarten des Katalogs (Grundgesamtheit für die benannte Lücke). */
  readonly beziehungenGesamt: number;
  /**
   * `true`, wenn eine Objektart in mehr als einer Familie steht. Der Katalog führt „Finding"
   * bewusst doppelt (Dok. 07); die Seite benennt das, statt still zu entdoppeln.
   */
  readonly hatMehrfachZuordnung: boolean;
}

/**
 * Baut das Glossar aus dem kanonischen Vokabular. Reine Leseoperation über den Vertrag –
 * deterministisch, ohne Zustand, ohne Mandantenbezug.
 */
export function buildGlossar(): GlossarModel {
  const familien: GlossarFamilie[] = OBJECT_FAMILY_ID.map((fid) => {
    const familie = OBJECT_FAMILIES[fid];
    return {
      name: familie.name,
      leitfrage: familie.leitfrage,
      arten: familie.types.map((typ) => ({
        anzeige: objectTypeDisplay(typ),
        hatKlartext: objectTypeLabel(typ) !== undefined,
      })),
    };
  });

  const verschiedeneArten = new Set<string>(OBJECT_TYPE);
  const mitKlartext = [...verschiedeneArten].filter(
    (typ) => objectTypeLabel(typ) !== undefined,
  ).length;

  // Nur Beziehungsarten MIT freigegebener Klartext-Bezeichnung. Die übrigen ließen sich hier
  // ausschließlich unter ihrem technischen Namen zeigen – das verbietet die Produktsprache,
  // und eine erfundene Übersetzung verbietet die Konzepttreue. Also: zählen und benennen.
  const beziehungen: GlossarBeziehung[] = [];
  for (const rid of RELATIONSHIP_TYPE_ID) {
    const eintrag = RELATIONSHIP_TYPES[rid];
    const klartext = relationshipTypeLabel(eintrag.type);
    if (!klartext) continue;
    beziehungen.push({ klartext, bedeutung: eintrag.rule });
  }

  return {
    familien,
    objektartenGesamt: verschiedeneArten.size,
    objektartenMitKlartext: mitKlartext,
    beziehungen,
    beziehungenGesamt: RELATIONSHIP_TYPE_ID.length,
    hatMehrfachZuordnung: OBJECT_TYPE.length > verschiedeneArten.size,
  };
}
