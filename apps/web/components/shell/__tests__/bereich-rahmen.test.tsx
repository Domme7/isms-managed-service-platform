/**
 * `BereichRahmen` (DR-0017 Stage 3): der geteilte Dashboard-Rahmen der Bereiche.
 *  1. trägt die Cockpit-Fläche (`.ck-cockpit`) + die Bereichs-Variante und rendert Kinder unverändert;
 *  2. startet SSR-sicher in „hell";
 *  3. übernimmt eine im Cockpit gespeicherte Dunkel-Wahl (GETEILTER Schlüssel, gelesen – nie geschrieben);
 *  4. fällt bei beschädigtem Wert defensiv auf „hell".
 */
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BereichRahmen } from '../BereichRahmen';
import { COCKPIT_THEME_KEY } from '../../../lib/cockpit/theme';

afterEach(() => {
  window.localStorage.clear();
});

function themeOf(container: HTMLElement): string | null {
  return container.querySelector('.ck-cockpit')?.getAttribute('data-ck-theme') ?? null;
}

describe('BereichRahmen – geteilter Dashboard-Rahmen der Bereiche (DR-0017 Stage 3)', () => {
  it('trägt die Cockpit-Fläche und rendert die Kinder unverändert', () => {
    const { container } = render(
      <BereichRahmen>
        <p>Inhalt des Bereichs</p>
      </BereichRahmen>,
    );
    expect(container.querySelector('.ck-cockpit.ck-cockpit--bereich')).not.toBeNull();
    expect(screen.getByText('Inhalt des Bereichs')).toBeInTheDocument();
  });

  it('startet in „hell" ohne gespeicherte Wahl', () => {
    const { container } = render(
      <BereichRahmen>
        <p>x</p>
      </BereichRahmen>,
    );
    expect(themeOf(container)).toBe('hell');
  });

  it('übernimmt eine im Cockpit gespeicherte Dunkel-Wahl (geteilter Schlüssel)', () => {
    window.localStorage.setItem(COCKPIT_THEME_KEY, 'dunkel');
    const { container } = render(
      <BereichRahmen>
        <p>x</p>
      </BereichRahmen>,
    );
    expect(themeOf(container)).toBe('dunkel');
  });

  it('fällt bei beschädigtem Wert defensiv auf „hell"', () => {
    window.localStorage.setItem(COCKPIT_THEME_KEY, 'kaputt');
    const { container } = render(
      <BereichRahmen>
        <p>x</p>
      </BereichRahmen>,
    );
    expect(themeOf(container)).toBe('hell');
  });
});
