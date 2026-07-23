/**
 * Wächtertest: **die Reichweite der Rollenwahl wird überall gleich und richtig gesagt** –
 * und Design-Theorie-Wörter erscheinen nicht im Produkttext (WP-028-Fixpass; DR-0013 Nr. 5
 * und Nr. 11 / DR-0012).
 *
 * WARUM ES DIESEN WÄCHTER GIBT (zwei belegte Befunde der Gate-Runde, nicht Geschmack):
 *
 *  1. **Die Aussage war seit der Sphärenkopplung unrichtig.** App-weit stand „die Rolle ändert
 *     nur Betonung und Reihenfolge, nie die Daten" – an fünf Stellen, jede mit eigenem
 *     Wortlaut. Seit DR-0012/DR-0013 Nr. 11 entscheidet die Rolle aber sehr wohl über etwas
 *     Sichtbares: ob der Ort „Kunden" ein Mandanten-Portfolio oder das eigene Unternehmen
 *     eröffnet (`kundenSicht`), und dieselbe Sphäre steuert die Portfolio-Verdichtung auf
 *     `/services` und den Mandantenwechsler in der Kopfleiste. Der Satz wurde deshalb
 *     PRÄZISIERT (nicht gestrichen) und auf EINE Quelle gezogen: `ROLLEN_REICHWEITE_SATZ`.
 *     Ohne Wächter driften fünf Fundstellen wieder auseinander – genau so ist der Fehler
 *     entstanden.
 *
 *  2. **„Betonung" und „ohne Träger" rendern noch.** DR-0013 Nr. 5 nennt beide Wörter
 *     namentlich als Design-Theorie, die aus der Oberfläche verschwindet. Slice 3 hatte das
 *     für den Rollenfokus behauptet; QA fand „Betonung" anschließend für alle zwölf Rollen und
 *     den neutralen Zustand und „ohne Träger" für mehrere. Der Wächter prüft das jetzt
 *     mechanisch statt es in einer Kopfnotiz zu behaupten.
 *
 * GRENZE – dieser Test schützt NICHT vor Ehrlichkeit: „kein Träger" / „keinen Träger" bleibt
 * ausdrücklich erlaubt. Das ist die Substanz-Aussage über fehlende Datenträger (Decision-Card-
 * Pflichtfelder auf `/entscheidungen`, Vertrauensangaben auf Objekt-360) und keine
 * Design-Theorie. Verboten ist die feste Wendung „ohne Träger" aus dem Rollenfokus sowie die
 * Konzeptbegriffe der Varianten-Tabelle.
 */
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { KundenStartContent } from '../kunden/KundenStartContent';
import { AppShell } from '../shell/AppShell';
import { LoginForm } from '../shell/LoginForm';
import { MissionControlContent } from '../shell/MissionControlContent';
import { NAV_PLACES } from '../../lib/shell/places';
import { DEMO_ROLES, type DemoRole } from '../../lib/shell/roles';
import { resolveSession, type ResolvedSession } from '../../lib/shell/session';
import { ROLLEN_REICHWEITE_SATZ } from '../../lib/shell/sphaere';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

/** Die dreizehn Perspektiven: zwölf Produktrollen + der neutrale Einstieg (DR-0009). */
const PERSPEKTIVEN: readonly (DemoRole | null)[] = [...DEMO_ROLES, null];

/* -----------------------------------------------------------------------------
 * 1. Eine Quelle, überall derselbe Satz
 * --------------------------------------------------------------------------- */

describe('Reichweite der Rollenwahl – EIN Wortlaut aus EINER Quelle', () => {
  it('der Satz benennt die Sphären-Wirkung UND die zwei Zusagen, die weiterhin gelten', () => {
    // Die Sphären-Wirkung, die der alte Wortlaut verschwieg …
    expect(ROLLEN_REICHWEITE_SATZ).toMatch(/Einstieg des Ortes/);
    expect(ROLLEN_REICHWEITE_SATZ).toMatch(/Kunden/);
    // … und die beiden Zusagen, die nicht verloren gehen dürfen (Ehrlichkeits-Substanz).
    expect(ROLLEN_REICHWEITE_SATZ).toMatch(/nicht den Datenbestand des aktiven Mandanten/);
    expect(ROLLEN_REICHWEITE_SATZ).toMatch(/keine Berechtigung/);
    // Und er trägt selbst kein Design-Theorie-Wort.
    expect(ROLLEN_REICHWEITE_SATZ).not.toMatch(/Betonung/);
  });

  it('„Heute" zeigt ihn in ALLEN dreizehn Perspektiven', () => {
    for (const perspektive of PERSPEKTIVEN) {
      const { container, unmount } = render(
        <MissionControlContent role={perspektive} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      expect(container.textContent ?? '', perspektive?.id ?? 'neutral').toContain(
        ROLLEN_REICHWEITE_SATZ,
      );
      unmount();
    }
  });

  it('der Kundenbereich zeigt ihn im neutralen Einstieg', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
      <KundenStartContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(container.textContent ?? '').toContain(ROLLEN_REICHWEITE_SATZ);
  });

  it('die Anmeldung sagt ihn einmal beim Einstieg', () => {
    const { container } = render(
      <LoginForm tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onSubmit={vi.fn()} />,
    );
    expect(container.textContent ?? '').toContain(ROLLEN_REICHWEITE_SATZ);
  });

  it('die Wechsel-Rückmeldung der Kopfleiste sagt ihn beim Rollenwechsel', () => {
    const session = resolveSession({
      roleId: 'R01',
      tenantId: TENANT_ID.NORDWERK,
    }) as ResolvedSession;

    const { container, getByLabelText } = render(
      <AppShell
        places={NAV_PLACES}
        activeId="heute"
        session={session}
        hydrated
        roles={DEMO_ROLES}
        tenants={DEMO_TENANTS}
        onSwitchRole={vi.fn()}
        onSwitchTenant={vi.fn()}
        onSignOut={vi.fn()}
      >
        <p>Seiteninhalt mit genügend Text, damit der Wächter etwas zu prüfen bekommt.</p>
      </AppShell>,
    );

    // Vor dem Wechsel steht keine Rückmeldung da (sonst wäre die Assertion darunter trivial).
    expect(container.textContent ?? '').not.toContain(ROLLEN_REICHWEITE_SATZ);

    fireEvent.change(getByLabelText('Ansicht: Rolle'), { target: { value: 'R03' } });

    expect(container.textContent ?? '').toContain(ROLLEN_REICHWEITE_SATZ);
  });
});

/* -----------------------------------------------------------------------------
 * 2. Keine Design-Theorie im Produkttext (DR-0013 Nr. 5)
 * --------------------------------------------------------------------------- */

const DESIGN_THEORIE: readonly RegExp[] = [
  /Betonung/,
  /ohne Träger/,
  /gegenstandslos/,
  /im Konzept normiert/,
  /Missionsfokus/,
  /reversible Anzeigeentscheidung/,
];

describe('Keine Design-Theorie im Produkttext (DR-0013 Nr. 5)', () => {
  it('„Heute" bleibt in allen dreizehn Perspektiven frei davon – auch im Aufklappteil', () => {
    for (const perspektive of PERSPEKTIVEN) {
      for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR]) {
        const { container, unmount } = render(
          <MissionControlContent role={perspektive} tenant={tenant(tenantId)} />,
        );
        const text = container.textContent ?? '';
        expect(text.length).toBeGreaterThan(200); // Blindheitsschutz
        for (const wort of DESIGN_THEORIE) {
          expect(text, `${perspektive?.id ?? 'neutral'}/${tenantId}: „${wort}"`).not.toMatch(wort);
        }
        unmount();
      }
    }
  });

  it('der Kundenbereich bleibt in allen dreizehn Perspektiven frei davon', () => {
    for (const perspektive of PERSPEKTIVEN) {
      const { container, unmount } = render(
        <KundenStartContent role={perspektive} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      const text = container.textContent ?? '';
      expect(text.length).toBeGreaterThan(200);
      for (const wort of DESIGN_THEORIE) {
        expect(text, `${perspektive?.id ?? 'neutral'}: „${wort}"`).not.toMatch(wort);
      }
      unmount();
    }
  });

  it('Negativbeweis: die Ehrlichkeits-Substanz „kein Träger" gilt NICHT als Verstoß', () => {
    // Genau die Formulierungen, die auf /entscheidungen und Objekt-360 stehen und dort die
    // Datenlücke aussprechen – sie dürfen dieser Wächter niemals treffen.
    for (const legitim of [
      'Von den 14 Pflichtfeldern haben 6 keinen Träger.',
      '3 Vertrauensangaben haben keinen Träger im Objektvertrag.',
      'Diese Angabe hat heute keinen Träger im Datenmodell.',
    ]) {
      expect(
        DESIGN_THEORIE.some((w) => w.test(legitim)),
        legitim,
      ).toBe(false);
    }
    // Gegenprobe: die verbotenen Wendungen würden erkannt (sonst wäre der Wächter blind).
    for (const verstoss of [
      'Die Rolle ändert nur Betonung und Reihenfolge.',
      'Vom Missionsfokus dieser Variante ohne Träger im Datenbestand: Audits.',
      'Die normierte Ausblendung ist gegenstandslos.',
    ]) {
      expect(
        DESIGN_THEORIE.some((w) => w.test(verstoss)),
        verstoss,
      ).toBe(true);
    }
  });
});
