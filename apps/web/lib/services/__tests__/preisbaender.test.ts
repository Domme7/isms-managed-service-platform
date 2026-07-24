/**
 * Illustrative Plattform-Preisbänder (DR-0015 Punkt 8 / O-KUNDE-01-Umstellung).
 * Prüft gegen die Quelle (Dok. 14 „Illustrative Plattformbänder“):
 *  1. vollständige Tabelle (4 Niveaus), worttreue Werte;
 *  2. Provider/Practice hat KEIN erfundenes Band, sondern die benannte „individuelle Vereinbarung“;
 *  3. Formatierung als Spanne mit deutscher Tausendertrennung und „+“ für „nach oben offen“;
 *  4. Ehrlichkeit DR-0011: der Anzeigehinweis nennt „Produktannahmen“, trägt aber KEIN
 *     „Demo“-/„Simulation“-Etikett.
 */
import { describe, expect, it } from 'vitest';

import { PLATTFORM_BAENDER, PLATTFORM_BAND_HINWEIS, formatPreisband } from '../preisbaender';

describe('Illustrative Plattform-Preisbänder (Dok. 14, DR-0015 Punkt 8)', () => {
  it('trägt die vollständige Tabelle mit vier Niveaus in Konzeptreihenfolge', () => {
    expect(PLATTFORM_BAENDER.map((b) => b.niveau)).toEqual([
      'Core',
      'Professional',
      'Enterprise',
      'Provider / Practice',
    ]);
  });

  it('übernimmt die numerischen Bänder worttreu (Core/Professional/Enterprise)', () => {
    const byNiveau = Object.fromEntries(PLATTFORM_BAENDER.map((b) => [b.niveau, b]));
    expect(byNiveau.Core?.band).toEqual({ minEur: 500, maxEur: 1500 });
    expect(byNiveau.Professional?.band).toEqual({ minEur: 1500, maxEur: 4000 });
    expect(byNiveau.Enterprise?.band).toEqual({ minEur: 4000, maxEur: 12000, offenNachOben: true });
  });

  it('erfindet für Provider/Practice keine Zahl, sondern nennt die individuelle Vereinbarung', () => {
    const provider = PLATTFORM_BAENDER.find((b) => b.niveau === 'Provider / Practice');
    expect(provider?.band).toBeNull();
    expect(provider?.bandHinweis).toBe('individuelle Plattform- und Portfoliovereinbarung');
  });

  it('formatiert Bänder als Spanne mit deutscher Tausendertrennung und „+“', () => {
    expect(formatPreisband({ minEur: 500, maxEur: 1500 })).toBe('EUR 500–1.500');
    expect(formatPreisband({ minEur: 1500, maxEur: 4000 })).toBe('EUR 1.500–4.000');
    expect(formatPreisband({ minEur: 4000, maxEur: 12000, offenNachOben: true })).toBe(
      'EUR 4.000–12.000+',
    );
  });

  it('ist ehrlich als Produktannahme gekennzeichnet – ohne „Demo“-Etikett (DR-0011)', () => {
    expect(PLATTFORM_BAND_HINWEIS).toMatch(/Produktannahmen/);
    expect(PLATTFORM_BAND_HINWEIS).not.toMatch(/Demo/i);
    expect(PLATTFORM_BAND_HINWEIS).not.toMatch(/Simulation/i);
  });
});
