/**
 * Ort „Kunden": sphärengerechter Einstieg (WP-028 Slice 4, DR-0013 Nr. 11 / DR-0012).
 *
 * DER BEHOBENE FEHLER (Usability-Audit): Eine KUNDENrolle (Executive Sponsor, Sphäre „Kunde")
 * landete im mandantenübergreifenden Portfolio. Geprüft wird deshalb am echten Sitzungspfad —
 * mit `SessionProvider` und `localStorage`, nicht an einer Prop-Attrappe:
 *
 *  1. Kundenrollen (R01–R06) und der Auditor (R07) sehen den EIGENEN Mandanten,
 *  2. Betreiber-/Beraterrollen, der Administrator und der neutrale Zustand sehen das Portfolio,
 *  3. die Ein-Unternehmens-Sicht macht KEINE Existenzaussage über andere Mandanten – weder
 *     Name noch Kennung noch Anzahl (Mandantengrenze, Dok. 07 „Mandantenfähigkeit", P09;
 *     dieselbe Fehlerklasse wie FINDING-0009),
 *  4. beide Sichten tragen denselben Seitentitel (Nav-Label = Seitentitel, DR-0013 Nr. 9).
 *
 * WICHTIG (und bewusst nicht behauptet): Das ist eine PERSPEKTIVE, keine durchgesetzte
 * Zugriffsgrenze. Der Test prüft, was die Oberfläche ZEIGT – nicht, dass eine Route
 * unerreichbar wäre. Serverseitige Autorisierung entsteht erst mit der Anmeldung nach Dok. 19.
 */
import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';
import { KundenOrtView } from '../KundenOrtView';
import { SessionProvider } from '../../shell/SessionProvider';
import { DEMO_ROLES } from '../../../lib/shell/roles';
import { SESSION_STORAGE_KEY, serializeSession } from '../../../lib/shell/session';

function renderOrt(roleId: string | null, tenantId: string = TENANT_ID.NORDWERK) {
  window.localStorage.setItem(
    SESSION_STORAGE_KEY,
    serializeSession(roleId ? { roleId, tenantId } : { tenantId }),
  );
  return render(
    <SessionProvider>
      <KundenOrtView tenants={DEMO_TENANTS} />
    </SessionProvider>,
  );
}

const KUNDENSPHAERE = DEMO_ROLES.filter(
  (r) => r.sphere === 'Kunde' || r.sphere === 'Unabhängig',
).map((r) => r.id);
const BETREIBERSPHAERE = DEMO_ROLES.filter(
  (r) => r.sphere === 'Betreiber' || r.sphere === 'Beide',
).map((r) => r.id);

describe('Ort „Kunden" – Einstieg folgt der Sphäre (DR-0013 Nr. 11)', () => {
  beforeEach(() => window.localStorage.clear());

  it('Kundenrollen und der Auditor sehen den eigenen Mandanten, kein Portfolio', () => {
    expect(KUNDENSPHAERE).toHaveLength(7); // R01–R06 + R07 (Meta: keine stille Verschiebung)
    for (const roleId of KUNDENSPHAERE) {
      const { container, unmount } = renderOrt(roleId);

      // Der eigene Mandant ist der Gegenstand der Seite …
      expect(container.textContent, roleId).toContain('Nordwerk Manufacturing SE');
      // Der zugängliche Name der Karte ist ihr Titel (die Pfeil-Zeile ist `aria-hidden`).
      expect(screen.getByRole('link', { name: /^Kundenbereich/ }), roleId).toHaveAttribute(
        'href',
        '/kunden',
      );
      expect(screen.getByRole('link', { name: /^Digitaler Zwilling/ }), roleId).toHaveAttribute(
        'href',
        `/twin/${TENANT_ID.NORDWERK}`,
      );

      // … und es gibt keine Mandantenliste.
      expect(screen.queryByRole('heading', { name: 'Mandanten' }), roleId).toBeNull();
      unmount();
    }
  });

  it('KEINE Existenzaussage über andere Mandanten (Mandantengrenze)', () => {
    for (const roleId of KUNDENSPHAERE) {
      const { container, unmount } = renderOrt(roleId);
      const text = container.textContent ?? '';
      const html = container.innerHTML;
      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== TENANT_ID.NORDWERK)) {
        expect(text, `${roleId}: fremder Mandantenname`).not.toContain(fremd.display_name);
        expect(html, `${roleId}: fremde Mandanten-Kennung`).not.toContain(fremd.tenant_id);
      }
      // Auch keine Zählung („3 weitere Mandanten") und kein Vorbehalt, der ihre Existenz verrät.
      expect(text, roleId).not.toMatch(/\d+\s+(?:weitere\s+)?Mandanten/i);
      expect(text, roleId).not.toMatch(/anderen? Mandanten/i);
      unmount();
    }
  });

  it('Betreiber-/Beraterrollen und der Administrator sehen das Portfolio', () => {
    expect(BETREIBERSPHAERE).toEqual(['R08', 'R09', 'R10', 'R11', 'R12']);
    for (const roleId of BETREIBERSPHAERE) {
      const { unmount } = renderOrt(roleId);
      const liste = screen.getByRole('heading', { name: 'Mandanten' });
      expect(liste, roleId).toBeInTheDocument();
      const nav = screen.getByRole('navigation', { name: 'Mandanten' });
      expect(within(nav).getAllByRole('link'), roleId).toHaveLength(DEMO_TENANTS.length);
      unmount();
    }
  });

  it('neutral (keine Rolle) sieht den Ort in seiner Grundform: das Portfolio', () => {
    renderOrt(null);
    expect(screen.getByRole('heading', { name: 'Mandanten' })).toBeInTheDocument();
  });

  it('beide Sichten tragen denselben Seitentitel „Kunden" (Nav-Label = Seitentitel)', () => {
    const kunde = renderOrt('R01');
    expect(screen.getByRole('heading', { level: 1, name: 'Kunden' })).toBeInTheDocument();
    kunde.unmount();

    renderOrt('R08');
    expect(screen.getByRole('heading', { level: 1, name: 'Kunden' })).toBeInTheDocument();
  });

  it('leerer Mandant: die Ein-Unternehmens-Sicht sagt es, ohne etwas zu erfinden', () => {
    const { container } = renderOrt('R03', TENANT_ID.FINOVIA);
    expect(container.textContent).toMatch(/noch nichts erfasst/);
    // Kein erfundenes Datum, keine erfundene Zahl.
    expect(container.querySelectorAll('time')).toHaveLength(0);
    expect(container.textContent).toContain('Finovia Digital Bank AG');
  });
});
