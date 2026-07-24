/**
 * Render-Tests der Cockpit-Start-Varianten (WP-025).
 *
 * Geprüft wird gegen den echten `DEMO_SEED` (keine Mocks), abgeleitet aus dem Verhalten der
 * Design-Vorlage (`docs/project/design/WP-025_COCKPIT_VARIANTEN_KONZEPT.md`):
 *  1. Kopf + Umschalter: Leitfrage, drei Varianten, aktive Variante am `data-cockpit-variante`.
 *  2. Jede Variante rendert DAS belegte Modell (Kacheln A / Fragenkette B / Weltband+Kacheln C).
 *  3. Ampeln NUR nach der Positivliste `BADGE_RULES` (belegt/Lücke/leer) – keine vierte Regel.
 *  4. Ehrlichkeitsgrenze (DR-0008): keine erfundene Bewertung als Zahl; benannte Lücken vorhanden.
 *  5. Sphärentrennung Kunde/Betreiber (DR-0012); neutral-fähig (DR-0009).
 *  6. Negativbeweise: kein fremder Mandant im DOM; Trend/Puls u. ä. nur als benannte Lücke.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_SEED, DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { CockpitVariantenContent } from '../CockpitVariantenContent';
import { BADGE_RULES } from '../../../lib/heute/dashboard';
import { MISSION_SECTIONS } from '../../../lib/heute/framing';
import { varianteForRole } from '../../../lib/heute/rollenvarianten';
import { worldForRole, getRole, type DemoRole } from '../../../lib/shell/roles';

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

const BADGE_REGELN = Object.keys(BADGE_RULES);

/** Die aktive Varianten-Bühne (`data-cockpit-variante`). */
function buehne(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('.ck-buehne');
  if (!el) throw new Error('Cockpit-Bühne fehlt');
  return el;
}

/* -----------------------------------------------------------------------------
 * 1. Kopf und Umschalter
 * --------------------------------------------------------------------------- */

describe('CockpitVariantenContent – Kopf und Varianten-Umschalter', () => {
  it('führt mit der belegten Leitfrage und bietet drei Varianten an', () => {
    const { container } = render(
      <CockpitVariantenContent
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="a"
      />,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Cockpit' })).toBeInTheDocument();
    expect(container.querySelector('p.tw-question')?.textContent).toBe(
      'Wie steht Nordwerk Manufacturing SE heute da – was ist erfasst und wo sind die Lücken?',
    );
    // Die aspirative Screenkatalog-Frage wird NICHT geführt (DR-0013 Nr. 1).
    expect(container.textContent ?? '').not.toContain('seit meinem letzten Besuch verändert');

    const schalter = screen
      .getByRole('group', { name: 'Cockpit-Variante zum Vergleich' })
      .querySelectorAll('input[type="radio"]');
    expect(schalter).toHaveLength(3);
  });

  it('schaltet die Variante um (unkontrolliert): der Bühnen-Anker folgt der Auswahl', () => {
    const { container } = render(
      <CockpitVariantenContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    // Standard ist A.
    expect(buehne(container).getAttribute('data-cockpit-variante')).toBe('a');
    // Umschalten auf B und C.
    fireEvent.click(screen.getByRole('radio', { name: /Variante B/ }));
    expect(buehne(container).getAttribute('data-cockpit-variante')).toBe('b');
    fireEvent.click(screen.getByRole('radio', { name: /Variante C/ }));
    expect(buehne(container).getAttribute('data-cockpit-variante')).toBe('c');
  });

  it('rendert die Kontextleiste mit belegtem Mandant, Rolle und Datenstand', () => {
    render(
      <CockpitVariantenContent
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="a"
      />,
    );
    const kontext = screen.getByRole('region', { name: 'Kontext dieser Seite' });
    expect(within(kontext).getByText('Nordwerk Manufacturing SE')).toBeInTheDocument();
    expect(within(kontext).getByText('Executive Sponsor')).toBeInTheDocument();
    expect(within(kontext).getByText('16.03.2026')).toBeInTheDocument();
    // Kein Rollencode im sichtbaren Kontext (DR-0013 Nr. 12).
    expect(kontext.textContent ?? '').not.toMatch(/R\d{2}/);
  });
});

/* -----------------------------------------------------------------------------
 * 2. Variante A — Verdichtung (Kachelraster)
 * --------------------------------------------------------------------------- */

describe('CockpitVariantenContent – Variante A „Verdichtung"', () => {
  it('zeigt den Klartext-Zustand und das Kachelraster des belegten Modells', () => {
    const { container } = render(
      <CockpitVariantenContent
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="a"
      />,
    );
    const b = buehne(container);
    // Klartext aus abgeleiteten Zahlen (Nordwerk 34/51).
    expect(b.querySelector('.db-klartext')?.textContent ?? '').toContain('34');
    expect(b.querySelector('.db-klartext')?.textContent ?? '').toContain('51');
    // Neun Kacheln (vier Statuskacheln + Lebenszyklus-Zählung + vier Abdeckungen).
    expect(b.querySelectorAll('.db-grid > li > .db-tile')).toHaveLength(9);
  });

  it('reizt die Status-Kennzeichen aus – ausschließlich nach der Positivliste BADGE_RULES', () => {
    const { container } = render(
      <CockpitVariantenContent
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="a"
      />,
    );
    const badges = Array.from(buehne(container).querySelectorAll('.db-badge'));
    expect(badges.length).toBeGreaterThan(0);
    for (const badge of badges) {
      const regel = BADGE_REGELN.find((r) => badge.classList.contains(`db-badge--${r}`));
      expect(regel, `Badge außerhalb der Positivliste: ${badge.className}`).toBeDefined();
    }
  });
});

/* -----------------------------------------------------------------------------
 * 3. Variante B — Fragen & Antworten (über Detailtiefe gestaffelt)
 * --------------------------------------------------------------------------- */

describe('CockpitVariantenContent – Variante B „Fragen & Antworten"', () => {
  it('startet ruhig: Ebene 1 zeigt nur „Wo stehe ich?"', () => {
    render(
      <CockpitVariantenContent
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="b"
        initialTiefe={1}
      />,
    );
    expect(
      screen.getByRole('heading', { level: 3, name: MISSION_SECTIONS.standort.title }),
    ).toBeInTheDocument();
    for (const id of ['erfassung', 'datenlage', 'einstieg'] as const) {
      expect(
        screen.queryByRole('heading', { level: 3, name: MISSION_SECTIONS[id].title }),
      ).toBeNull();
    }
  });

  it('öffnet über die Detailtiefe alle vier Fragen; die Kennzeichen bleiben sparsam („x von y")', () => {
    const { container } = render(
      <CockpitVariantenContent
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="b"
        initialTiefe={3}
      />,
    );
    for (const section of Object.values(MISSION_SECTIONS)) {
      expect(screen.getByRole('heading', { level: 3, name: section.title })).toBeInTheDocument();
    }
    // Datenlage nennt „x von y" (die vier gezählten Beobachtungen).
    expect(container.textContent ?? '').toMatch(/\d+ von \d+ Objekten dieses Mandanten/);
    // Sparsam: Variante B rendert KEINE Kachel-Badges (bewusster Kontrast zu Variante A).
    expect(buehne(container).querySelectorAll('.db-badge')).toHaveLength(0);
  });

  it('staffelt über die echte Bedienung: Klick auf Ebene 3 öffnet die Einstiege', () => {
    render(
      <CockpitVariantenContent
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="b"
        initialTiefe={1}
      />,
    );
    expect(
      screen.queryByRole('heading', { level: 3, name: MISSION_SECTIONS.einstieg.title }),
    ).toBeNull();
    fireEvent.click(screen.getByRole('radio', { name: /Ebene 3/ }));
    expect(
      screen.getByRole('heading', { level: 3, name: MISSION_SECTIONS.einstieg.title }),
    ).toBeInTheDocument();
  });
});

/* -----------------------------------------------------------------------------
 * 4. Variante C — Erlebniswelt (Weltband + rollengewichtete Kacheln + Management-Modus)
 * --------------------------------------------------------------------------- */

/** Gerenderte Kachel-Reihenfolge der Bühne (data-tile-id in DOM-Reihenfolge). */
function kachelOrdnung(container: HTMLElement): string[] {
  return Array.from(buehne(container).querySelectorAll('.db-grid > li > .db-tile')).map(
    (el) => el.getAttribute('data-tile-id') ?? '',
  );
}

describe('CockpitVariantenContent – Variante C „Erlebniswelt"', () => {
  it('zeigt das Weltband der aktiven Rolle und ordnet die Kacheln nach ihrer Variante', () => {
    const executive = role('R01');
    const { container } = render(
      <CockpitVariantenContent role={executive} tenant={tenant(TENANT_ID.NORDWERK)} variante="c" />,
    );
    const world = worldForRole(executive);
    expect(container.querySelector('.ck-weltband-name')?.textContent).toBe(world.name);
    expect(container.querySelector('.ck-weltband-frage')?.textContent).toBe(world.leitfrage);
    // Rollengewichtete Reihenfolge = tileOrder der Executive-Variante.
    const variante = varianteForRole(executive.id).variante;
    expect(variante).not.toBeNull();
    expect(kachelOrdnung(container)).toEqual([...(variante?.tileOrder ?? [])]);
    // Ein Nutzen-Satz der Rolle.
    expect(container.querySelector('.rv-fokus-text')?.textContent).toBe(variante?.nutzenSatz);
  });

  it('neutral: kein Weltband, Grundform, kanonische Kachel-Reihenfolge', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
      <CockpitVariantenContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} variante="c" />,
    );
    expect(container.querySelector('.ck-weltband')).toBeNull();
    expect(container.textContent ?? '').toContain('Neutraler Einstieg ohne Rolle: kein Weltband');
    expect(container.querySelector('.rv-fokus-text')).toBeNull();
    // Kanonische Reihenfolge (varianteForRole(null) hat keine Variante).
    expect(kachelOrdnung(container)[0]).toBe('bestand');
  });

  it('Management-Modus reduziert auf den Rollenfokus und BENENNT die fehlenden Träger (keine Fabrikation)', () => {
    const executive = role('R01');
    const { container } = render(
      <CockpitVariantenContent role={executive} tenant={tenant(TENANT_ID.NORDWERK)} variante="c" />,
    );
    const fokus = varianteForRole(executive.id).variante?.fokusKacheln ?? [];
    expect(fokus.length).toBeGreaterThan(0);

    // Aus: volle rollengewichtete Menge.
    expect(kachelOrdnung(container).length).toBeGreaterThan(fokus.length);

    // An: reduziert auf die Fokus-Kacheln + benannte Grenze, KEINE erfundene „Top 3".
    fireEvent.click(screen.getByRole('checkbox', { name: /Wenn ich Geschäftsführer wäre/ }));
    expect(kachelOrdnung(container)).toEqual([...fokus]);
    const grenze = container.querySelector('.ck-mgmt-grenze')?.textContent ?? '';
    expect(grenze).toMatch(/keinen Träger/);
    expect(grenze).toMatch(/nicht erfunden/);
  });
});

/* -----------------------------------------------------------------------------
 * 5. Sphärentrennung Kunde vs. Betreiber (DR-0012 / DR-0013 Nr. 11)
 * --------------------------------------------------------------------------- */

describe('CockpitVariantenContent – Sphärentrennung Kunde/Betreiber', () => {
  it('Kundenrolle (R03) sieht die Ein-Unternehmens-Sphäre – kein Portfolio, kein Mandantenwechsel', () => {
    const { container } = render(
      <CockpitVariantenContent
        role={role('R03')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="c"
      />,
    );
    const text = container.textContent ?? '';
    expect(text).toContain('Kundensicht: dieses eine Unternehmen.');
    expect(text).toContain(
      'ohne mandantenübergreifende Portfolio-Übersicht und ohne Mandantenwechsel',
    );
  });

  it('Betreiberrolle (R08) sieht die Portfolio-Sphäre mit Mandantenwechsel in der Kopfleiste', () => {
    const { container } = render(
      <CockpitVariantenContent
        role={role('R08')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="c"
      />,
    );
    const text = container.textContent ?? '';
    expect(text).toContain('Betreibersicht: Portfolio.');
    expect(text).toContain('Mandantenwechsel steht in der Kopfleiste bereit');
  });
});

/* -----------------------------------------------------------------------------
 * 6. Ehrlichkeitsgrenze (DR-0008) und benannte Lücken
 * --------------------------------------------------------------------------- */

describe('CockpitVariantenContent – Ehrlichkeitsgrenze', () => {
  it('benennt den Customer-Workspace-Kopf und die Mission-Control-Bausteine als Lücke, ohne Wert', () => {
    const { container } = render(
      <CockpitVariantenContent
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="a"
      />,
    );
    const luecke = screen
      .getByRole('heading', { level: 2, name: 'Was hier bewusst nicht steht' })
      .closest('section') as HTMLElement;
    expect(within(luecke).getByText(/Morning Mission und Veränderungsfeed/)).toBeInTheDocument();
    expect(
      within(luecke).getByText(/Strategie-DNA, Zielprofil, Managed-Service-Anteil/),
    ).toBeInTheDocument();
    // Kein Zeitplan/Funktionsversprechen.
    expect(luecke.textContent ?? '').toMatch(/kein Zeitplan/);
    expect(luecke.textContent ?? '').not.toMatch(/kommt bald|in Kürze|geplant für/i);

    // NEGATIVBEWEIS: „Trend" erscheint AUSSCHLIESSLICH im benannten Lückenblock, nie als
    // Kachel-Wert – es wird nichts als Zahl erfunden.
    expect(container.textContent ?? '').toMatch(/Trend/);
    const ohneLuecke = container.cloneNode(true) as HTMLElement;
    ohneLuecke.querySelector('section[aria-labelledby="cockpit-luecke"]')?.remove();
    expect(ohneLuecke.textContent ?? '', 'Trend außerhalb des Lückenblocks').not.toMatch(/Trend/);
  });

  it('keine Kachel-Zahl ist ein Prozentwert (immer „x von y" mit sichtbarer Grundgesamtheit)', () => {
    for (const v of ['a', 'c'] as const) {
      const { container, unmount } = render(
        <CockpitVariantenContent
          role={role('R01')}
          tenant={tenant(TENANT_ID.NORDWERK)}
          variante={v}
        />,
      );
      for (const zahl of Array.from(buehne(container).querySelectorAll('.db-wert-zahl'))) {
        expect(zahl.textContent ?? '', 'Prozent-Score in einer Kachel').not.toMatch(/%|Prozent/);
      }
      unmount();
    }
  });
});

/* -----------------------------------------------------------------------------
 * 7. Neutral-fähig und Empty-States
 * --------------------------------------------------------------------------- */

describe('CockpitVariantenContent – neutral-fähig und Leerzustände', () => {
  it('rendert für neutral (keine Rolle) jede Variante vollständig', () => {
    for (const v of ['a', 'b', 'c'] as const) {
      const { container, unmount } = render(
        // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
        <CockpitVariantenContent
          role={null}
          tenant={tenant(TENANT_ID.NORDWERK)}
          variante={v}
          initialTiefe={3}
        />,
      );
      expect((container.textContent ?? '').length, `Variante ${v} neutral leer`).toBeGreaterThan(
        200,
      );
      expect(screen.getByRole('region', { name: 'Kontext dieser Seite' })).toBeInTheDocument();
      unmount();
    }
  });

  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`zeigt für den leeren Mandanten ${tenantId} einen ehrlichen Leerzustand ohne fremden Mandanten`, () => {
      for (const v of ['a', 'b', 'c'] as const) {
        const { container, unmount } = render(
          <CockpitVariantenContent
            role={role('R01')}
            tenant={tenant(tenantId)}
            variante={v}
            initialTiefe={3}
          />,
        );
        const html = container.innerHTML;
        for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== tenantId)) {
          expect(html).not.toContain(fremd.display_name);
          expect(html).not.toContain(fremd.tenant_id);
        }
        // Variante A/C zeigen die ehrliche Datenlücken-Kachel (Badge „kein Datenbestand").
        if (v !== 'b') {
          expect(
            buehne(container).querySelector('.db-badge--kein_datenbestand')?.textContent ?? '',
          ).toContain('kein Datenbestand');
        }
        unmount();
      }
    });
  }

  it('Negativbeweis Mandantentrennung: Nordwerk zeigt keinen fremden Namen und keine fremde ID', () => {
    const { container } = render(
      <CockpitVariantenContent
        role={role('R01')}
        tenant={tenant(TENANT_ID.NORDWERK)}
        variante="c"
        initialTiefe={3}
      />,
    );
    const html = container.innerHTML;
    for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== TENANT_ID.NORDWERK)) {
      expect(html).not.toContain(fremd.display_name);
      expect(html).not.toContain(fremd.tenant_id);
    }
    for (const object of DEMO_SEED.objects.filter((o) => o.tenant_id !== TENANT_ID.NORDWERK)) {
      expect(html).not.toContain(object.object_id);
    }
  });
});
