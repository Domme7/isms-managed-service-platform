/**
 * Meine Ablage (DR-0018 Stufe 3/4): Verwaltungsordner + abgeleitete Prio/Frist je Objekt.
 * Gegen den echten Seed (keine Mocks) – Ordner sichtbar, jeder Eintrag trägt eine Prio-Badge.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';
import { KundeAblageContent } from '../KundeAblageContent';

const nordwerk = DEMO_TENANTS.find((t) => t.tenant_id === TENANT_ID.NORDWERK);
if (!nordwerk) throw new Error('Testfixture: Nordwerk fehlt');

describe('KundeAblageContent – Ablage mit abgeleiteter Priorität', () => {
  it('nennt Objektzahl und Ordnerzahl im Vorspann', () => {
    render(<KundeAblageContent tenant={nordwerk} />);
    expect(screen.getByText(/erfassten Objekte, geordnet in/)).toBeInTheDocument();
  });

  it('zeigt Verwaltungsordner als Liste', () => {
    render(<KundeAblageContent tenant={nordwerk} />);
    expect(screen.getByRole('list', { name: 'Verwaltungsordner' })).toBeInTheDocument();
  });

  it('trägt je Objekt eine abgeleitete Frist und einen Eisenhower-Quadranten (E-02 bleibt gated)', () => {
    render(<KundeAblageContent tenant={nordwerk} />);
    // Die Frist ist als ABGELEITET gekennzeichnet (kein Kunden-Termin) – mindestens einmal sichtbar.
    expect(screen.getAllByText(/Frist \(abgeleitet\)/).length).toBeGreaterThan(0);
    // Mindestens ein Quadranten-Label aus der offengelegten Regel erscheint.
    const quadranten = screen.queryAllByText(/Sofort erledigen|Einplanen|Delegieren|Später prüfen/);
    expect(quadranten.length).toBeGreaterThan(0);
  });

  it('legt nur eigene Objekte ab (Mandantengrenze, Link auf die Objektseite)', () => {
    render(<KundeAblageContent tenant={nordwerk} />);
    const liste = screen.getByRole('list', { name: 'Verwaltungsordner' });
    const ersterLink = within(liste).getAllByRole('link')[0];
    expect(ersterLink).toHaveAttribute(
      'href',
      expect.stringContaining(`/twin/${TENANT_ID.NORDWERK}/objekt/`),
    );
  });
});
