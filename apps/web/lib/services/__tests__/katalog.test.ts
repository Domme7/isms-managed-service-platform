/**
 * Servicekatalog-Konstanten (WP-006 Slice 2) – Vollzähligkeit und Preisfreiheit der Quelle.
 *
 * Die Kardinalitäten sind am PDF verifiziert (Dok. 14, Abschnitte „Servicefamilien und
 * vollständiger Katalog", „Service-Tiefen statt starrer Goldpakete", „Paketarchitektur"):
 * 12 Servicefamilien (SF01–SF12), 15 Service Offers (SO01–SO15), 4 Service-Tiefen (L1–L4),
 * 6 Paketfamilien, 10 Angebotskarte-Fragen, 8 Paketbestandteile. Der Test prüft die Konstante;
 * das Konzepttreue-Gate liest die Konstante gegen das PDF gegen.
 */
import { describe, expect, it } from 'vitest';

import {
  ANGEBOTSKARTE_FRAGEN,
  LEITPLANKEN,
  PAKETFAMILIEN,
  PAKET_BESTANDTEILE,
  SERVICEFAMILIEN,
  SERVICE_OFFERS,
  SERVICE_TIEFEN,
} from '../katalog';

describe('Servicekatalog-Konstanten – Vollzähligkeit (am PDF verifiziert)', () => {
  it('12 Servicefamilien mit lückenlosen Kennungen SF01–SF12', () => {
    expect(SERVICEFAMILIEN).toHaveLength(12);
    expect(SERVICEFAMILIEN.map((f) => f.id)).toEqual(
      Array.from({ length: 12 }, (_, i) => `SF${String(i + 1).padStart(2, '0')}`),
    );
    // Je Familie ein belegter Outcome und typischer Käufer (keine leere Zelle).
    for (const familie of SERVICEFAMILIEN) {
      expect(familie.name.length, familie.id).toBeGreaterThan(0);
      expect(familie.outcome.length, familie.id).toBeGreaterThan(0);
      expect(familie.kaeufer.length, familie.id).toBeGreaterThan(0);
    }
  });

  it('15 Service Offers mit lückenlosen Kennungen SO01–SO15', () => {
    expect(SERVICE_OFFERS).toHaveLength(15);
    expect(SERVICE_OFFERS.map((o) => o.id)).toEqual(
      Array.from({ length: 15 }, (_, i) => `SO${String(i + 1).padStart(2, '0')}`),
    );
    for (const offer of SERVICE_OFFERS) {
      expect(offer.ergebnis.length, offer.id).toBeGreaterThan(0);
      expect(offer.rhythmus.length, offer.id).toBeGreaterThan(0);
    }
  });

  it('4 Service-Tiefen L1–L4 (Guide, Co-Manage, Operate, Embedded Office)', () => {
    expect(SERVICE_TIEFEN).toHaveLength(4);
    expect(SERVICE_TIEFEN.map((t) => t.id)).toEqual(['L1', 'L2', 'L3', 'L4']);
    expect(SERVICE_TIEFEN.map((t) => t.kurzname)).toEqual([
      'Guide',
      'Co-Manage',
      'Operate',
      'Embedded Office',
    ]);
    for (const tiefe of SERVICE_TIEFEN) {
      expect(tiefe.kunde.length, tiefe.id).toBeGreaterThan(0);
      expect(tiefe.provider.length, tiefe.id).toBeGreaterThan(0);
      expect(tiefe.geeignetFuer.length, tiefe.id).toBeGreaterThan(0);
    }
  });

  it('6 Paketfamilien (Navigate … Regulatory Route)', () => {
    expect(PAKETFAMILIEN).toHaveLength(6);
    expect(PAKETFAMILIEN.map((p) => p.name)).toEqual([
      'Navigate',
      'Co-Managed ISMS',
      'Managed ISMS Office',
      'Embedded Security Office',
      'Audit Route',
      'Regulatory Route',
    ]);
    for (const paket of PAKETFAMILIEN) {
      expect(paket.kernOffers.length, paket.name).toBeGreaterThan(0);
      expect(paket.typischeTiefe.length, paket.name).toBeGreaterThan(0);
    }
  });

  it('10 Angebotskarte-Fragen; genau Frage 8 ist die Preis-Lücke', () => {
    expect(ANGEBOTSKARTE_FRAGEN).toHaveLength(10);
    expect(ANGEBOTSKARTE_FRAGEN.map((f) => f.nummer)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const preisfragen = ANGEBOTSKARTE_FRAGEN.filter((f) => f.istPreisluecke);
    expect(preisfragen).toHaveLength(1);
    expect(preisfragen[0]?.nummer).toBe(8);
  });

  it('8 Paketbestandteile; genau einer ist die Preis-Lücke', () => {
    expect(PAKET_BESTANDTEILE).toHaveLength(8);
    expect(PAKET_BESTANDTEILE.filter((t) => t.istPreisluecke)).toHaveLength(1);
  });

  it('drei sichtbare Leitplanken (CP11, Verbot der automatischen Buchung, keine Goldpakete)', () => {
    expect(LEITPLANKEN.length).toBeGreaterThanOrEqual(3);
    const titel = LEITPLANKEN.map((l) => l.titel).join(' | ');
    expect(titel).toContain('Interne Alternative bleibt sichtbar');
    expect(titel).toContain('Verbot der automatischen Buchung');
  });
});

/**
 * Geldartiges Zahlenband OHNE Währungstoken (Security-Auflage): ein Band wie „3.500-6.500 pro
 * Monat" bliebe von der reinen Währungstoken-Liste unentdeckt – ausgerechnet an der strengsten
 * Guardrail (O-KUNDE-01). Dieses Muster erfasst zwei Zahlen im Band, gefolgt von einem
 * Geld-Rhythmuswort.
 */
const GELDBAND =
  /\d[\d.,]*\s?[-–]\s?\d[\d.,]*\s?(pro\s?Monat|monatlich|einmalig|\/\s?Monat|Monatsbereich)/i;

describe('Servicekatalog-Konstanten – Preisfreiheit der Quelle (O-KUNDE-01)', () => {
  it('keine Konstante trägt ein Währungszeichen, EUR/USD, einen Prozentwert oder ein Geldband', () => {
    const alleTexte = [
      ...SERVICEFAMILIEN.flatMap((f) => [f.name, f.outcome, f.kaeufer]),
      ...SERVICE_OFFERS.flatMap((o) => [o.name, o.ergebnis, o.rhythmus]),
      ...SERVICE_TIEFEN.flatMap((t) => [t.beschreibung, t.kunde, t.provider, t.geeignetFuer]),
      ...PAKETFAMILIEN.flatMap((p) => [p.name, p.zielbild, p.kernOffers, p.typischeTiefe]),
      ...PAKET_BESTANDTEILE.map((t) => t.text),
      ...ANGEBOTSKARTE_FRAGEN.map((f) => f.frage),
      ...LEITPLANKEN.flatMap((l) => [l.titel, l.beschreibung]),
    ].join(' \n ');

    for (const verboten of [
      /€/,
      /\bEUR\b/,
      /\bUSD\b/,
      /\$/,
      /\d+\s?%/,
      /\d[\d.,]*\s?(Euro|Mio)/,
      GELDBAND,
    ]) {
      expect(alleTexte, `Preisangabe „${verboten}"`).not.toMatch(verboten);
    }

    // Negativbeweis: ein WÄHRUNGSLOSES Geldband würde die Guardrail jetzt auslösen (ohne das neue
    // Muster wäre es durchgerutscht) – die Konstanten tragen keines.
    expect('3.500-6.500 pro Monat', 'währungsloses Geldband muss auffallen').toMatch(GELDBAND);
    expect('1200 – 1800 monatlich', 'Geldband mit Gedankenstrich muss auffallen').toMatch(GELDBAND);
  });
});
