/**
 * Trust-Layer-Abgleich (WP-020 Slice 5; AC: Zuordnung der belegten Vertrauensanzeigen zu den
 * acht Trust-Layer-Angaben, unbelegte sichtbar benannt – nichts wird berechnet oder erfunden).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Sonder-, Fehler- und
 * Vertrauenszustände", Absatz „Trust Layer" (wörtlich): „Bei Risiko, Reifegrad, Empfehlung,
 * Simulation und Report kann der Nutzer eine Vertrauensebene öffnen. Sie zeigt Herkunft,
 * letzten Datenzeitpunkt, Vollständigkeit, widersprüchliche Quellen, Modell-/Regelversion,
 * Annahmen, menschliche Reviews und die Auswirkung von Datenlücken."
 *
 * WAS DIESES MODUL IST: die dokumentierte ZUORDNUNG der acht Angaben zu den HEUTE belegten
 * Vertrauensanzeigen (Objekt-360 „Datenqualität"/„Herkunft", Kontextzeile „Datenstand",
 * Kanten-Vertrauensgrad, Wirkungsannahme an Beziehungen) – gerendert auf der Objekt-360-Seite.
 * WAS ES NICHT IST: keine Vertrauensebene, kein berechneter Wert, keine Verdichtung
 * (Dok. 07 D10: Dimensionen bleiben einzeln sichtbar; O-WP014-02: kein verdichteter Indikator).
 *
 * // OFFENE FRAGE O-WP020-06 (registriert): Für Modell-/Regelversion und die Auswirkung von
 * // Datenlücken als berechnete Aussage existiert KEIN Träger; Annahmen und menschliche
 * // Reviews sind nur TEILWEISE belegt (Wirkungsannahme je Beziehung bzw. Bestätigungsstufe
 * // ohne Person/Zeitpunkt/Ergebnis). Die Lücken stehen sichtbar im Produkt; gefüllt wird
 * // nichts (DR-0005). HINWEIS an den Orchestrator: Der WP-Zuschnitt führte „Annahmen" und
 * // „menschliche Reviews" als unbelegt – tatsächlich tragen Vertrag und Seed die
 * // Wirkungsannahme („effectiveness_assumption", je Beziehung; Gegenstand von CCP-004) und
 * // die Bestätigungsstufe (Skala „Ungeprüft … reviewed, freigegeben", Dok. 07, Abschnitt
 * // „Herkunft, Datenqualität und Vertrauen"). Beides ist hier als Teil-Träger ausgewiesen
 * // statt verschwiegen; die Präzisierung ist im Abschlussbericht benannt.
 *
 * React-frei und deterministisch testbar; die Deckungsgrade sind gegen die belegten
 * Vokabulare (`DATA_QUALITY_DIMENSION`, `CONFIRMATION_LEVEL`) per Test verankert.
 */

export type TrustAbdeckung = 'belegt' | 'teilweise' | 'kein Träger';

export interface TrustLayerAngabe {
  /** Angabe wörtlich aus dem PDF-Absatz „Trust Layer" (nominalisiert, Reihenfolge der Quelle). */
  readonly angabe: string;
  readonly abdeckung: TrustAbdeckung;
  /** SICHTBAR: wo die Angabe heute belegt ist bzw. warum sie keinen Träger hat. */
  readonly traeger: string;
}

/**
 * Quellanker des Abgleichs (Abschnittstitel, nicht nur Nummer – Regel Null). Seit WP-028
 * (DR-0013: kein internes Vokabular im UI) wird diese Kennung NICHT mehr im Produkttext
 * gerendert – sie bleibt als Code-/Test-Beleg der Herkunft erhalten.
 */
export const TRUST_LAYER_QUELLE =
  'Dok. 06, Abschnitt „Sonder-, Fehler- und Vertrauenszustände", Absatz „Trust Layer"';

export const TRUST_LAYER_ANGABEN: readonly TrustLayerAngabe[] = [
  {
    angabe: 'Herkunft',
    abdeckung: 'belegt',
    traeger:
      'Quellreferenzen je Objekt – oben unter „Herkunft" –, die Herkunft der Aussage an jeder ' +
      'Beziehung und die Qualitätsdimension „Herkunft".',
  },
  {
    angabe: 'Letzter Datenzeitpunkt',
    abdeckung: 'belegt',
    traeger:
      'Die Systemerfassung – sichtbar als „Datenstand (im System erfasst)" in der Kontextzeile; ' +
      'die fachliche Gültigkeit ist eine eigene, getrennt gezeigte Zeitachse.',
  },
  {
    angabe: 'Vollständigkeit',
    abdeckung: 'teilweise',
    traeger:
      'Erfassbar als Qualitätsdimension „Vollständigkeit" am einzelnen Objekt (oben unter ' +
      '„Datenqualität", sofern erfasst). Eine Vollständigkeitsaussage über den Bestand ' +
      'insgesamt wird nicht berechnet.',
  },
  {
    angabe: 'Widersprüchliche Quellen',
    abdeckung: 'teilweise',
    traeger:
      'Mehrere Quellreferenzen mit Priorität sind erfassbar, und die Qualitätsdimension ' +
      '„Konsistenz" existiert. Ein erfasster Widerspruch zwischen zwei konkreten Quellen hat ' +
      'keinen Träger.',
  },
  {
    angabe: 'Modell-/Regelversion',
    abdeckung: 'kein Träger',
    traeger:
      'Die erfasste Version ist die Datensatz-Version des Objekts – sie wird nicht zu einer ' +
      'Modell- oder Regelversion umgedeutet; ein Modell existiert in dieser Ausbaustufe nicht.',
  },
  {
    angabe: 'Annahmen',
    abdeckung: 'teilweise',
    traeger:
      'Einzelne Beziehungen tragen eine Wirkungsannahme – sichtbar als „Wirkungsannahme ' +
      '(nicht nachgewiesen)" an der jeweiligen Kante. Eine Annahmen-Liste je Aussage gibt es ' +
      'nicht.',
  },
  {
    angabe: 'Menschliche Reviews',
    abdeckung: 'teilweise',
    traeger:
      'Die Bestätigungsstufe der Datenqualität (Skala von „Ungeprüft" bis „reviewed"/' +
      '„freigegeben") ist ein erfasster Stand. Wer wann mit welchem Ergebnis geprüft hat, hat ' +
      'keinen Träger.',
  },
  {
    angabe: 'Auswirkung von Datenlücken',
    abdeckung: 'kein Träger',
    traeger:
      'Datenlücken werden benannt und gezählt (etwa fehlende Owner oder Vertrauensgrade); ' +
      'welche Aussage eine Lücke wie schwächt, wird nicht berechnet und nicht behauptet.',
  },
] as const;

/** Anzahl je Deckungsgrad – gezählt, nie geschrieben. */
export function countTrustAngaben(abdeckung: TrustAbdeckung): number {
  return TRUST_LAYER_ANGABEN.filter((a) => a.abdeckung === abdeckung).length;
}
