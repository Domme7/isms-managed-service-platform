/**
 * Illustrative Plattform-Preisbänder (DR-0015 Punkt 8 / O-KUNDE-01-Umstellung).
 *
 * FREIGABE-KONTEXT: Der Servicekatalog (`katalog.ts`) war bis DR-0015 bewusst STRIKT PREISFREI
 * (O-KUNDE-01/DR-0008; Preisstellen nur als benannte Lücke). **DR-0015 (Owner, 2026-07-24),
 * Punkt 8** stellt diese Regel um: „gekennzeichnete, synthetische Beispielpreise im
 * Servicekatalog/den Paketen erlaubt (mit Security); keine realen Preise, DR-0011-konform ohne
 * ‚Demo'-Etikett". Dieser Datenträger setzt genau das um — die Anzeige + die Guardrail-Umstellung
 * folgen als eigener, getesteter Schritt.
 *
 * QUELLE (Regel Null, am PDF gegengelesen – Abschnittstitel, nicht Nummer):
 *   docs/concept/pdf/Dokument_14_Servicekatalog_Pakete_SLAs_Preislogik_v1.0.pdf
 *   - Abschnitt „Illustrative Plattformbänder" (Tabelle Plattformniveau / Geeigneter Scope /
 *     Illustratives Preisband pro Monat, exkl. USt. / Enthaltene Kernfunktionen): Core,
 *     Professional, Enterprise, Provider/Practice — worttreu.
 *   - Ehrlichkeits-Anker: „Diese Bänder sind Produktannahmen." und der Preisstatus im
 *     Dokumentkopf: „Alle Preisbänder sind synthetische Designannahmen und keine realen Preise."
 *
 * SYNTHETISCH & OHNE SCHEINGENAUIGKEIT (`.claude/rules/demo-data.md`, DR-0011): Es sind Bänder
 * (Spannen), kein Punktpreis; kein realer PwC-Preis; die Ehrlichkeit trägt das konzept-eigene
 * Wort „illustrativ"/„Produktannahme" — NICHT das Wort „Demo"/„Simulation" (DR-0011).
 *
 * React-frei und deterministisch testbar (Muster `katalog.ts`).
 */

/** Ein Preisband ist eine Spanne, kein Punktpreis (bewusst gegen Scheingenauigkeit). */
export interface Preisband {
  readonly minEur: number;
  readonly maxEur: number;
  /** „…+“: nach oben offen (Dok. 14 „EUR 4.000-12.000+“). */
  readonly offenNachOben?: boolean;
}

export interface Plattformband {
  readonly niveau: 'Core' | 'Professional' | 'Enterprise' | 'Provider / Practice';
  readonly scope: string;
  /**
   * Numerisches Band pro Monat (exkl. USt.) ODER `null`, wenn das Konzept KEIN Band nennt
   * (Provider/Practice = „individuelle Plattform- und Portfoliovereinbarung“) — dann bleibt es
   * ehrlich eine benannte Nicht-Angabe statt einer erfundenen Zahl.
   */
  readonly band: Preisband | null;
  /** Ersatztext, wenn `band === null` (individuelle Vereinbarung). */
  readonly bandHinweis?: string;
  readonly kernfunktionen: string;
}

/**
 * Abschnitt „Illustrative Plattformbänder“ — vollständige Tabelle (4 Niveaus), worttreu.
 * Einheit: pro Monat, exkl. USt.
 */
export const PLATTFORM_BAENDER: readonly Plattformband[] = [
  {
    niveau: 'Core',
    scope: 'eine Einheit, begrenzter Scope',
    band: { minEur: 500, maxEur: 1500 },
    kernfunktionen: 'ISMS-Kern, Digital Twin Light, Tasks, Policies, Standardreports',
  },
  {
    niveau: 'Professional',
    scope: 'mittlerer Scope, mehrere Frameworks',
    band: { minEur: 1500, maxEur: 4000 },
    kernfunktionen: 'voller Digital Twin, Decision Center, Reporting Engine, Automationen',
  },
  {
    niveau: 'Enterprise',
    scope: 'Multi-Entity, komplexe Rechte und Integrationen',
    band: { minEur: 4000, maxEur: 12000, offenNachOben: true },
    kernfunktionen: 'Multi-Tenancy, erweiterte APIs, Portfolios, Branding, Enterprise Governance',
  },
  {
    niveau: 'Provider / Practice',
    scope: 'Beratungs- oder MSP-Betrieb über viele Mandanten',
    band: null,
    bandHinweis: 'individuelle Plattform- und Portfoliovereinbarung',
    kernfunktionen:
      'Provider Mission Control, Template Library, Service Factory, Portfolio Analytics',
  },
];

/**
 * Ehrlichkeitszeile für die Anzeige (worttreu aus Dok. 14 „Illustrative Plattformbänder“).
 * Sie sagt sichtbar, dass die Bänder Produktannahmen sind — ohne „Demo“-Etikett (DR-0011).
 */
export const PLATTFORM_BAND_HINWEIS =
  'Illustrative Bänder pro Monat, exkl. USt. — Produktannahmen, kein Angebot. ' +
  'Öffentliche Marktangebote reichen von niedrigpreisigen GRC-Tools bis zu Enterprise-Angeboten ' +
  'mit individueller Preisbildung.';

/** Deutsche Tausendertrennung ohne Intl-Abhängigkeit (deterministisch). */
function gruppiere(n: number): string {
  const s = String(n);
  let out = '';
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += '.';
    out += s[i];
  }
  return out;
}

/** Formatiert ein Band als „EUR 500–1.500“ bzw. „EUR 4.000–12.000+“. */
export function formatPreisband(band: Preisband): string {
  return `EUR ${gruppiere(band.minEur)}–${gruppiere(band.maxEur)}${band.offenNachOben ? '+' : ''}`;
}
