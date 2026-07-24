/**
 * Wächtertest: **die Reichweite der Rollenwahl wird überall gleich und richtig gesagt** –
 * und Design-Theorie-Wörter erscheinen nicht im Produkttext (WP-028-Fixpass; DR-0013 Nr. 5
 * und Nr. 11 / DR-0012).
 *
 * WARUM ES DIESEN WÄCHTER GIBT (zwei belegte Befunde der Gate-Runde, nicht Geschmack):
 *
 *  1. **Die Aussage war seit der Sphärenkopplung unrichtig UND unvollständig.** App-weit stand
 *     „die Rolle ändert nur Betonung und Reihenfolge, nie die Daten". Seit DR-0012/DR-0013 Nr. 11
 *     entscheidet die Rolle über DREI sichtbare Wirkungen: den Einstieg des Ortes „Kunden"
 *     (`kundenSicht`), ob eine mandantenübergreifende Portfolio-Übersicht erscheint (`/services`,
 *     `/twin`) und ob die Kopfleiste einen Mandantenwechsel anbietet (`mandantenwechselSichtbar`) –
 *     die letzten beiden sind sicherheitsmaterial. Der frühere Satz nannte nur EINE davon. Er ist
 *     jetzt eine FUNKTION `rollenReichweiteSatz(role)` über DIESELBE Quelle `kundenSicht(role)`,
 *     die die Wirkungen steuert – dieser Wächter prüft die WIRKUNG je Sphäre, nicht bloß den
 *     Wortlaut. Ohne ihn driften die Fundstellen wieder auseinander.
 *
 *  2. **„Betonung" und „ohne Träger" rendern noch.** DR-0013 Nr. 5 nennt beide Wörter
 *     namentlich als Design-Theorie, die aus der Oberfläche verschwindet. Der Wächter prüft das
 *     mechanisch statt es in einer Kopfnotiz zu behaupten.
 *
 *  3. **Ansicht ≠ Berechtigung ohne Quelle (Nachfix nach Gate-Runde 2).** Der Satz „Diese Sicht
 *     bestimmt die Ansicht, nicht die Berechtigung" existierte in zwei Wortlauten (Kopfleiste +
 *     Ein-Unternehmens-Einstieg) und ohne Wächter – dieselbe Klasse. Jetzt EINE Quelle
 *     `ANSICHT_NICHT_BERECHTIGUNG_SATZ`, an beiden Stellen geprüft.
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
import { Topbar } from '../shell/Topbar';
import { EigenerMandantEinstieg } from '../twin/EigenerMandantEinstieg';
import { NAV_PLACES } from '../../lib/shell/places';
import { DEMO_ROLES, getRole, type DemoRole } from '../../lib/shell/roles';
import { resolveSession, type ResolvedSession } from '../../lib/shell/session';
import {
  ANSICHT_NICHT_BERECHTIGUNG_SATZ,
  kundenSicht,
  rollenReichweiteSatz,
} from '../../lib/shell/sphaere';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

function role(roleId: string): DemoRole {
  const found = getRole(roleId);
  if (!found) throw new Error(`Testfixture fehlt: ${roleId}`);
  return found;
}

/** Die dreizehn Perspektiven: zwölf Produktrollen + der neutrale Einstieg (DR-0009). */
const PERSPEKTIVEN: readonly (DemoRole | null)[] = [...DEMO_ROLES, null];

/* -----------------------------------------------------------------------------
 * 1. Reichweitensatz je Sphäre – EINE Quelle, richtige WIRKUNG
 * --------------------------------------------------------------------------- */

describe('Reichweitensatz der Rollenwahl – EINE Quelle, richtige Wirkung je Sphäre', () => {
  it('Portfolio-Sphäre: der Satz bietet Portfolio-Übersicht UND Mandantenwechsel an (+ zwei Zusagen)', () => {
    // Der neutrale Einstieg und Betreiberrollen sind Portfolio-Sphäre (kundenSicht === 'portfolio').
    for (const perspektive of [role('R08'), role('R12'), null]) {
      const satz = rollenReichweiteSatz(perspektive);
      expect(kundenSicht(perspektive), perspektive?.id ?? 'neutral').toBe('portfolio');
      // Alle DREI Wirkungen benannt – Einstieg, Portfolio-Übersicht, Mandantenwechsel.
      expect(satz).toMatch(/Ort „Kunden"/);
      expect(satz).toMatch(/mandantenübergreifende Portfolio-Übersicht/);
      expect(satz).toMatch(/Mandantenwechsel/);
      // Wirkung: angeboten, nicht „ohne".
      expect(satz).not.toMatch(/ohne mandantenübergreifende Portfolio-Übersicht/);
      // Die zwei Zusagen der Ehrlichkeits-Substanz + kein Design-Theorie-Wort.
      expect(satz).toMatch(/nicht den Datenbestand des aktiven Mandanten/);
      expect(satz).toMatch(/keine Berechtigung/);
      expect(satz).not.toMatch(/Betonung/);
    }
  });

  it('Ein-Unternehmens-Sphäre: der Satz benennt AUSDRÜCKLICH „ohne" Portfolio + „ohne" Wechsel', () => {
    // Kundenrollen (R01–R06) und Auditor (R07) sind Ein-Unternehmens-Sphäre.
    for (const perspektive of [role('R01'), role('R06'), role('R07')]) {
      const satz = rollenReichweiteSatz(perspektive);
      expect(kundenSicht(perspektive), perspektive.id).toBe('ein_unternehmen');
      expect(satz).toMatch(/eigene Unternehmen/);
      // Beide sicherheitsmaterialen Wirkungen sind benannt statt verschwiegen.
      expect(satz).toMatch(/ohne mandantenübergreifende Portfolio-Übersicht/);
      expect(satz).toMatch(/ohne Mandantenwechsel/);
      expect(satz).toMatch(/nicht den Datenbestand des aktiven Mandanten/);
      expect(satz).toMatch(/keine Berechtigung/);
      expect(satz).not.toMatch(/Betonung/);
    }
  });

  it('bildet den Satz je Perspektive genau aus deren Sphäre (kundenSicht als einzige Quelle)', () => {
    const portfolioFassung = rollenReichweiteSatz(null);
    const einUnternehmenFassung = rollenReichweiteSatz(role('R01'));
    expect(portfolioFassung).not.toBe(einUnternehmenFassung); // zwei echte Fassungen
    for (const perspektive of PERSPEKTIVEN) {
      const erwartet =
        kundenSicht(perspektive) === 'portfolio' ? portfolioFassung : einUnternehmenFassung;
      expect(rollenReichweiteSatz(perspektive), perspektive?.id ?? 'neutral').toBe(erwartet);
    }
  });

  it('„Heute" zeigt den SPHÄRENGERECHTEN Satz in ALLEN dreizehn Perspektiven', () => {
    for (const perspektive of PERSPEKTIVEN) {
      const { container, unmount } = render(
        <MissionControlContent role={perspektive} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      expect(container.textContent ?? '', perspektive?.id ?? 'neutral').toContain(
        rollenReichweiteSatz(perspektive),
      );
      unmount();
    }
  });

  it('der Kundenbereich zeigt den (neutralen) Satz im neutralen Einstieg', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
      <KundenStartContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(container.textContent ?? '').toContain(rollenReichweiteSatz(null));
  });

  it('die Anmeldung sagt den neutralen Satz einmal beim Einstieg', () => {
    const { container } = render(
      <LoginForm tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onSubmit={vi.fn()} />,
    );
    expect(container.textContent ?? '').toContain(rollenReichweiteSatz(null));
  });

  it('die Wechsel-Rückmeldung der Kopfleiste sagt den Satz der NEUEN Rolle', () => {
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
    expect(container.textContent ?? '').not.toContain(rollenReichweiteSatz(role('R03')));

    fireEvent.change(getByLabelText('Ansicht: Rolle'), { target: { value: 'R03' } });

    // R03 (ISMS Manager, Kunde → Ein-Unternehmens-Fassung): die Rückmeldung nennt genau deren
    // Reichweite – der Satz der NEUEN Rolle, nicht der alte (WP-028) Einheits-Satz.
    expect(container.textContent ?? '').toContain(rollenReichweiteSatz(role('R03')));
  });
});

/* -----------------------------------------------------------------------------
 * 1b. Ansicht ≠ Berechtigung – EINE Quelle (Nachfix nach Gate-Runde 2)
 * --------------------------------------------------------------------------- */

describe('Ansicht ≠ Berechtigung – EIN Satz aus EINER Quelle', () => {
  it('der Satz benennt Ansicht statt Berechtigung', () => {
    expect(ANSICHT_NICHT_BERECHTIGUNG_SATZ).toMatch(/Ansicht/);
    expect(ANSICHT_NICHT_BERECHTIGUNG_SATZ).toMatch(/nicht die Berechtigung/);
  });

  it('die Kopfleiste zeigt ihn am festen Mandanten der Ein-Unternehmens-Sicht', () => {
    // R01 = Kundensphäre ⇒ Mandant ist Kontext, kein Auswahlfeld ⇒ die ruhige Zeile steht.
    const session = resolveSession({
      roleId: 'R01',
      tenantId: TENANT_ID.NORDWERK,
    }) as ResolvedSession;
    const { container, unmount } = render(
      <Topbar
        session={session}
        hydrated
        roles={DEMO_ROLES}
        tenants={DEMO_TENANTS}
        onSwitchRole={vi.fn()}
        onRequestTenantSwitch={vi.fn()}
        onSignOut={vi.fn()}
      />,
    );
    expect(container.textContent ?? '').toContain(ANSICHT_NICHT_BERECHTIGUNG_SATZ);
    unmount();
  });

  it('der Ein-Unternehmens-Einstieg zeigt ihn', () => {
    const { container, unmount } = render(
      <EigenerMandantEinstieg
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        objectCount={34}
        relationshipCount={51}
        scopeIds={['scope-nordwerk-isms-core']}
        recordedOn="2026-03-16"
        recordedOnDisplay="16.03.2026"
      />,
    );
    expect(container.textContent ?? '').toContain(ANSICHT_NICHT_BERECHTIGUNG_SATZ);
    unmount();
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
