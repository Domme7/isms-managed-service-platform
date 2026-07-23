/**
 * Tests der Rollenvarianten (WP-020 Slice 5; Dok. 06, Abschnitt „Mission Control & Morning
 * Mission", Tabelle „Rollenvarianten" – normativ nur vier Zeilen; O-WP020-03 für die übrigen).
 *
 * Geprüft wird die react-freie Quelle:
 *  1. Vier Varianten mit den PDF-Zeilennamen und den wörtlichen Spalten-Zitaten (Quellbeleg).
 *  2. KEIN ENTZUG: jede `tileOrder` enthält JEDE Kachel-Kennung genau einmal (eine Wahrheit,
 *     Dok. 06 P02 – „Ausblendung" ist nie Wegnahme, nur Reihenfolge).
 *  3. Zuordnung: R01/R03/R10/R08 direkt normiert; übrige Rollen über die Welt-Ableitung
 *     (Assurance-Rollen und neutral: KEINE Variante – kanonische Reihenfolge).
 *  4. Sichtbare Texte benennen Lücken statt Versprechen und tragen keine Bewertung.
 */
import { describe, expect, it } from 'vitest';

import {
  KANONISCHE_KACHELORDNUNG,
  KEINE_VARIANTE_BEGRUENDUNG,
  NORMIERTE_ROLLEN,
  ROLLENVARIANTEN,
  WELT_VARIANTE,
  fokusLueckenTextFuer,
  kachelOrdnungForRole,
  varianteForRole,
} from '../rollenvarianten';
import { DEMO_ROLES } from '../../shell/roles';

const VARIANT_IDS = ['executive', 'isms_manager', 'consultant', 'service_lead'] as const;

describe('ROLLENVARIANTEN – die vier normierten Zeilen aus Dok. 06', () => {
  it('umfasst genau die vier Zeilen mit den PDF-Namen und wörtlichen Spalten-Zitaten', () => {
    expect(Object.keys(ROLLENVARIANTEN).sort()).toEqual([...VARIANT_IDS].sort());
    expect(VARIANT_IDS.map((id) => ROLLENVARIANTEN[id].name)).toEqual([
      'Executive',
      'ISMS Manager',
      'Consultant',
      'Service Lead',
    ]);
    // Spalten wörtlich (Quellbeleg, bewusst nicht gerendert – Muster framing.ts).
    expect(ROLLENVARIANTEN.executive.missionsfokusQuote).toBe(
      'Freigaben, Top-Risiken, Zielabweichung, Investition',
    );
    expect(ROLLENVARIANTEN.isms_manager.missionsfokusQuote).toBe(
      'Risiken, Maßnahmen, Evidence, Reviews, Datenlücken',
    );
    expect(ROLLENVARIANTEN.consultant.missionsfokusQuote).toBe(
      'Mandantenpriorität, Audits, Deliverables, Kapazität, Reise',
    );
    expect(ROLLENVARIANTEN.service_lead.missionsfokusQuote).toBe(
      'SLA, Eskalationen, Qualität, Auslastung, Profitabilität',
    );
    expect(ROLLENVARIANTEN.executive.ausblendungQuote).toBe('Operative Taskdetails');
    expect(ROLLENVARIANTEN.isms_manager.ausblendungQuote).toBe('Portfolio-/Umsatzsicht');
    expect(ROLLENVARIANTEN.consultant.ausblendungQuote).toBe('Unbegründete Vertriebsimpulse');
    expect(ROLLENVARIANTEN.service_lead.ausblendungQuote).toBe(
      'Objektdetails ohne Eskalationsbezug',
    );
  });

  it('KEIN ENTZUG: jede tileOrder ist eine Permutation ALLER Kachel-Kennungen', () => {
    const alleKacheln = [...KANONISCHE_KACHELORDNUNG].sort();
    expect(new Set(KANONISCHE_KACHELORDNUNG).size).toBe(KANONISCHE_KACHELORDNUNG.length);
    for (const id of VARIANT_IDS) {
      const order = ROLLENVARIANTEN[id].tileOrder;
      expect([...order].sort(), id).toEqual(alleKacheln);
      expect(new Set(order).size, id).toBe(order.length);
    }
  });

  /**
   * WP-028 Slice 3 (DR-0013 Nr. 5 „Rollenfokus ohne Beipackzettel"): NEUE Regel für den EINEN
   * sichtbaren Satz je Variante – er nennt den Nutzen („Für die … zuerst: …") und KEINE
   * Design-/Konzept-Theorie. Der Wächter ist damit schärfer geworden, nicht weicher: er
   * verbietet ausdrücklich das Vokabular, das der Usability-Audit beanstandet hat.
   */
  it('der eine sichtbare Nutzen-Satz nennt Nutzen, keine Konzept-Normativität', () => {
    for (const id of VARIANT_IDS) {
      const satz = ROLLENVARIANTEN[id].nutzenSatz;
      expect(satz, id).toMatch(/^Für die .+-Sicht zuerst: /);
      // Ein Satz, nicht drei Absätze.
      expect(satz.split('. ').length, id).toBeLessThanOrEqual(2);
      for (const jargon of [
        /normiert/i,
        /gegenstandslos/i,
        /Betonung/i,
        /Anzeigeentscheidung/i,
        /Konzept/i,
        /Missionsfokus/i,
        /Ausblendung/i,
      ]) {
        expect(jargon.test(satz), `${id}: „${jargon}" gehört in die Code-Doku, nicht ins UI`).toBe(
          false,
        );
      }
    }
  });

  it('jede Variante benennt belegte Betonung, Lücken und die Erreichbarkeits-Zusage', () => {
    for (const id of VARIANT_IDS) {
      const variante = ROLLENVARIANTEN[id];
      expect(variante.fokusBelegtText).toMatch(/Nach vorn gezogen/);
      // Jede Variante benennt ihre Fokus-Lücke – als fehlenden Beleg im Datenbestand bzw. als
      // fehlende eigene Kachel. Regel-erhaltend statt Wortlaut: „ISMS Manager" benennt „Reviews"
      // seit dem Domain-Fix als „ohne eigene Kachel" (der Datenbestand trägt einen
      // Service-Outcome-Review) – eine falsche Absenz-Behauptung („kein Review erfasst") wäre
      // dieselbe Fehlerklasse wie eine Erfindung.
      //
      // WORTLAUT IM WP-028-FIXPASS GEÄNDERT (QA-Auflage, DR-0013 Nr. 5): „ohne Träger" ist dort
      // NAMENTLICH als Design-Theorie gelistet und rendert im Rollenfokus. Ersetzt durch
      // „im Datenbestand nicht belegt". Die geprüfte REGEL ist unverändert – jede Variante
      // MUSS ihre Lücke aussprechen; nur das Vokabular ist jetzt Produktsprache. Die
      // Gegenprobe darunter (kein Design-Theorie-Wort im sichtbaren Text) ist neu und macht
      // die Prüfung strenger.
      expect(variante.fokusLueckenText).toMatch(
        /(im Datenbestand nicht belegt|ohne eigene Kachel)/,
      );
      expect(variante.fokusLueckenText, id).not.toMatch(/ohne Träger/);
      // Die Erreichbarkeits-Zusage (eine Wahrheit, Dok. 06 P02) bleibt Pflicht – unverändert.
      expect(variante.ausblendungText).toMatch(/nichts entzogen/);
      expect(variante.ausblendungText).toMatch(/erreichbar/);
      // NEU (DR-0013 Nr. 5): die Zusage spricht über den DATENBESTAND, nicht über die
      // Normativität des Konzepts – „gegenstandslos"/„normierte Ausblendung" sind raus.
      expect(variante.ausblendungText, id).not.toMatch(/gegenstandslos/i);
      expect(variante.ausblendungText, id).not.toMatch(/normiert/i);
      expect(variante.orderRationale.length).toBeGreaterThan(40);
      // Keine Versprechen, keine Bewertung in den sichtbaren Texten.
      const sichtbar = `${variante.nutzenSatz} ${variante.fokusBelegtText} ${variante.fokusLueckenText} ${variante.ausblendungText}`;
      // NEU (WP-028-Fixpass, QA-Auflage): KEIN Design-Theorie-Wort im gesamten sichtbaren Text
      // der Variante – bisher galt das nur für `nutzenSatz` und `ausblendungText`, und genau
      // deshalb überlebten „Missionsfokus"/„ohne Träger" in `fokusBelegtText`/`fokusLueckenText`
      // zwei Reviewrunden.
      for (const theorie of [/Betonung/i, /ohne Träger/, /Missionsfokus/i, /gegenstandslos/i]) {
        expect(theorie.test(sichtbar), `${id}: „${theorie}" gehört in die Code-Doku`).toBe(false);
      }
      expect(sichtbar, id).not.toMatch(/kommt bald|in Kürze|geplant für|Roadmap/i);
      expect(sichtbar, id).not.toMatch(/\bScore\b|Ampel|Reifegrad|\bTrend|empfohlen|Empfehlung/i);
    }
  });

  it('fokusLueckenTextFuer: Review-Existenz nur bei Mandanten MIT Review (Domain-Fix 2. Runde)', () => {
    const ismsManager = ROLLENVARIANTEN.isms_manager;
    // Der mandant-invariante Kern behauptet keine Review-Existenz.
    expect(ismsManager.fokusLueckenText).not.toMatch(/trägt einen/);
    expect(ismsManager.fokusLueckenText).toMatch(/keine\s+Kachel Reviews/);
    // Mandant MIT Review: die Existenzaussage wird ergänzt, Basistext bleibt Präfix.
    const mitReview = fokusLueckenTextFuer(ismsManager, true);
    expect(mitReview.startsWith(ismsManager.fokusLueckenText)).toBe(true);
    expect(mitReview).toMatch(/trägt einen Service-Outcome-Review/);
    // Mandant OHNE Review: KEINE Existenzaussage (der Consulting-Operator-Fehler von vorher).
    expect(fokusLueckenTextFuer(ismsManager, false)).toBe(ismsManager.fokusLueckenText);
    // Andere Varianten sind mandanteninvariant (kein Review-Zusatz, egal ob hatReview).
    for (const id of ['executive', 'consultant', 'service_lead'] as const) {
      expect(fokusLueckenTextFuer(ROLLENVARIANTEN[id], true)).toBe(
        ROLLENVARIANTEN[id].fokusLueckenText,
      );
    }
  });
});

describe('varianteForRole – Normierung, Welt-Ableitung und ehrliche Nicht-Zuordnung', () => {
  it('normiert R01/R03/R10/R08 direkt (Zuordnungsbegründung im Modul-Kopf)', () => {
    expect(NORMIERTE_ROLLEN).toEqual({
      R01: 'executive',
      R03: 'isms_manager',
      R10: 'consultant',
      R08: 'service_lead',
    });
    for (const [roleId, variantId] of Object.entries(NORMIERTE_ROLLEN)) {
      const zuordnung = varianteForRole(roleId);
      expect(zuordnung.herkunft, roleId).toBe('normiert');
      expect(zuordnung.variante?.id, roleId).toBe(variantId);
    }
  });

  it('leitet die übrigen Rollen über ihre Welt ab; Assurance erhält BEWUSST keine Variante', () => {
    // Welt-Ableitung (O-WP020-03, reversible Anzeigeentscheidung).
    expect(WELT_VARIANTE).toEqual({
      executive: 'executive',
      operations: 'isms_manager',
      consulting: 'consultant',
      assurance: null,
    });
    expect(varianteForRole('R02')).toMatchObject({ herkunft: 'welt' });
    expect(varianteForRole('R02').variante?.id).toBe('executive');
    for (const roleId of ['R04', 'R05', 'R06']) {
      expect(varianteForRole(roleId).variante?.id, roleId).toBe('isms_manager');
      expect(varianteForRole(roleId).herkunft, roleId).toBe('welt');
    }
    for (const roleId of ['R09', 'R11']) {
      expect(varianteForRole(roleId).variante?.id, roleId).toBe('consultant');
      expect(varianteForRole(roleId).herkunft, roleId).toBe('welt');
    }
    // Assurance & Administration World: keine Tabellenzeile – nichts wird erfunden.
    for (const roleId of ['R07', 'R12']) {
      expect(varianteForRole(roleId)).toEqual({ variante: null, herkunft: 'keine' });
      expect(kachelOrdnungForRole(roleId)).toEqual(KANONISCHE_KACHELORDNUNG);
    }
    /* REGEL-ERHALTEND UMGESTELLT (WP-028 Slice 3, DR-0013 Nr. 5): Bis WP-020 nagelte diese
       Zeile den SICHTBAREN Kastentext „keine Betonung erfunden" fest. Der Kasten war eine
       Aussage über die Konzept-Tabelle, nicht über die Daten des Mandanten, und ist aus der
       Oberfläche verschwunden. Die REGEL – Rollen ohne Tabellenzeile erhalten die kanonische
       Reihenfolge, es wird keine erfunden – ist unverändert und steht eine Zeile darüber als
       harte Prüfung (`kachelOrdnungForRole`). Die Begründung lebt als Code-Doku weiter und wird
       hier festgenagelt, damit sie nicht still verschwindet. */
    expect(KEINE_VARIANTE_BEGRUENDUNG).toMatch(/kanonische Reihenfolge/);
    expect(KEINE_VARIANTE_BEGRUENDUNG).toMatch(/kein sichtbarer Rollenfokus/);
  });

  it('neutral und Unbekanntes erhalten keine Variante (kanonische Reihenfolge)', () => {
    expect(varianteForRole(null)).toEqual({ variante: null, herkunft: 'keine' });
    expect(kachelOrdnungForRole(null)).toEqual(KANONISCHE_KACHELORDNUNG);
    expect(varianteForRole('R99')).toEqual({ variante: null, herkunft: 'keine' });
  });

  it('deckt alle zwölf Rollen ab: jede hat entweder eine Variante oder die benannte Nicht-Zuordnung', () => {
    for (const role of DEMO_ROLES) {
      const zuordnung = varianteForRole(role.id);
      if (zuordnung.variante) {
        expect(['normiert', 'welt']).toContain(zuordnung.herkunft);
      } else {
        expect(zuordnung.herkunft).toBe('keine');
        expect(role.worldId).toBe('assurance');
      }
    }
  });
});
