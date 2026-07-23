/**
 * Ort „Wissen" (`/wissen`, WP-032 Slice 3) – Acceptance Criteria 10–12.
 *
 * Geprüft wird die präsentationale `WissenContent`. Die mechanischen Querschnitts-Beweise
 * laufen zusätzlich in den vier Wächtern unter `components/__tests__/`; hier stehen die
 * inhaltlichen Belege.
 *
 * DIE TEURE FEHLERKLASSE DIESES ORTES ist nicht die Mandantengrenze (der Glossar ist
 * mandantenunabhängig), sondern die ERFINDUNG: ein ausgedachtes „bewährtes Vorgehen", eine
 * erfundene Übersetzung oder ein halb funktionierendes Suchfeld. Genau dagegen richten sich die
 * Negativbeweise unten.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { OBJECT_FAMILIES, OBJECT_FAMILY_ID } from '@isms/contracts';
import { WissenContent } from '../WissenContent';
import { getRole, type DemoRole } from '../../../lib/shell/roles';
import { buildGlossar } from '../../../lib/wissen/glossar';

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

/**
 * Sichtbarer Text OHNE die querschnittliche Kontextleiste – gleiche Begründung wie auf den
 * Orten „Administration" und „Reports": `PageContextBar` rendert die Produktrolle als
 * „R03 · …", und genau dieses Format verlangt der Kontextleisten-Wächter. Die
 * Rollencode-Freiheit des UI gehört zum app-weiten Sprachdurchgang, nicht zu dieser Seite.
 */
function textOhneKontextleiste(container: HTMLElement): string {
  const klon = container.cloneNode(true) as HTMLElement;
  for (const leiste of Array.from(
    klon.querySelectorAll('section[aria-label="Kontext dieser Seite"]'),
  )) {
    leiste.remove();
  }
  return klon.textContent ?? '';
}

describe('Wissen – AC 10: Glossar vollständig und in Domänensprache', () => {
  it('zeigt alle neun Objektfamilien mit deutschem Namen und Leitfrage', () => {
    const { container } = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    expect(OBJECT_FAMILY_ID).toHaveLength(9);
    for (const fid of OBJECT_FAMILY_ID) {
      const familie = OBJECT_FAMILIES[fid];
      expect(screen.getByRole('heading', { level: 3, name: familie.name })).toBeInTheDocument();
      expect(text, `Leitfrage von „${familie.name}" fehlt`).toContain(familie.leitfrage);
    }
  });

  it('zeigt je Familie alle Objektarten des Katalogs', () => {
    const { container } = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    for (const fid of OBJECT_FAMILY_ID) {
      for (const typ of OBJECT_FAMILIES[fid].types) {
        expect(text, `Objektart „${typ}" fehlt`).toContain(typ);
      }
    }
    // Die deutschen Bezeichnungen der belegten Arten sind sichtbar (Klartext vor Fachsprache).
    for (const klartext of [
      'Risiko',
      'Maßnahme',
      'Nachweis',
      'Ziel',
      'Kennzahl',
      'Schwachstelle',
    ]) {
      expect(text, `Klartext „${klartext}" fehlt`).toContain(klartext);
    }
  });

  it('zeigt die Beziehungsarten in Klartext mit ihrer Bedeutung', () => {
    const { container } = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const beziehungen = screen
      .getByRole('heading', { level: 2, name: 'Wie die Dinge zusammenhängen' })
      .closest('section');
    if (!beziehungen) throw new Error('Abschnitt „Wie die Dinge zusammenhängen" fehlt');
    const text = (beziehungen as HTMLElement).textContent ?? '';

    const glossar = buildGlossar();
    expect(glossar.beziehungen.length).toBeGreaterThan(0);
    for (const beziehung of glossar.beziehungen) {
      expect(text, `Beziehungsart „${beziehung.klartext}" fehlt`).toContain(beziehung.klartext);
      expect(text, `Bedeutung von „${beziehung.klartext}" fehlt`).toContain(beziehung.bedeutung);
    }
    // Die nicht gezeigten Arten sind gezählt und begründet – nicht verschwiegen.
    expect(text).toContain(`Der Katalog kennt ${glossar.beziehungenGesamt} Beziehungsarten`);
    expect(container.textContent ?? '').toContain('würde nichts erklären');
  });

  it('NEGATIVBEWEIS: keine Familien-/Beziehungskennung und kein technischer Beziehungsname', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.FINOVIA]) {
      const { container, unmount } = render(
        <WissenContent role={role('R03')} tenant={tenant(tenantId)} />,
      );
      const text = textOhneKontextleiste(container);
      expect(text.length).toBeGreaterThan(500); // Blindheitsschutz

      for (const verboten of [
        /\bF0[1-9]\b/, // F01…F09
        /\bR\d{2}\b/, // R01…R25
        /[a-z]+_[a-z]+/, // snake_case (mitigates, delivered_by, scope_ids …)
        /Dok\.\s?\d/,
        /§/,
        /Work Package/i,
        /Screen S\d/,
        /\bSimulation\b/i,
        /Demo-Seed/i,
        /Demo-Datenbestand/i,
      ]) {
        expect(text, `${tenantId}: verbotenes Muster „${verboten}"`).not.toMatch(verboten);
      }
      unmount();
    }
  });

  it('benennt die Sprachabdeckung ehrlich, statt Übersetzungen zu erfinden', () => {
    const { container } = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    const glossar = buildGlossar();
    expect(text).toContain(
      `Für ${glossar.objektartenMitKlartext} der ${glossar.objektartenGesamt} Objektarten`,
    );
    expect(text).toContain('Eine Übersetzung wird hier nicht erfunden');
    // Die dokumentierte Doppelzuordnung des Katalogs wird benannt, nicht still bereinigt.
    expect(text).toContain('Eine Objektart kann in zwei Familien stehen');
  });
});

describe('Wissen – AC 11: Lücken benannt statt erfunden', () => {
  it('benennt Suche, Vorlagen, bewährte Vorgehen und Kontextbezug – ohne Erfindung', () => {
    const { container } = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const luecken = screen
      .getByRole('heading', { level: 2, name: 'Was hier noch nicht steht' })
      .closest('section');
    if (!luecken) throw new Error('Abschnitt „Was hier noch nicht steht" fehlt');
    const text = (luecken as HTMLElement).textContent ?? '';

    for (const luecke of [
      'Suche über alle Inhalte',
      'Vorlagen',
      'Bewährte Vorgehen und Lernhinweise',
      'Bezug zum aktuellen Kontext',
    ]) {
      expect(text, `Lücke „${luecke}" fehlt`).toContain(luecke);
    }
    // Die Suche wird mit ihrem echten Grund benannt (Schutz vor Preisgabe in Vorschautexten).
    expect(text).toContain('Vorschautexte dürfen nichts preisgeben');
    // Kein Zeitversprechen.
    expect(text).not.toMatch(/kommt bald|in Kürze|geplant für|folgt in/i);
    expect(container.textContent ?? '').toContain('keinen Zeitplan');
  });

  it('NEGATIVBEWEIS: kein Suchfeld, keine Vorlage, keine ausgedachte Empfehlung', () => {
    const { container } = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    // Kein Eingabefeld irgendeiner Art (ein halb funktionierendes Suchfeld wäre schlechter
    // als keines) und überhaupt kein Bedienelement mit Schreibsemantik.
    expect(container.querySelectorAll('form, input, select, textarea, button')).toHaveLength(0);
    expect(container.querySelector('[role="search"]')).toBeNull();

    const text = container.textContent ?? '';
    // Keine ausgedachte Empfehlung: das Produkt spricht hier keine Handlungsempfehlung aus.
    for (const verboten of [/wir empfehlen/i, /Best Practice:/i, /Tipp:/i, /sollten Sie/i]) {
      expect(text, `ausgedachte Empfehlung „${verboten}"`).not.toMatch(verboten);
    }
    // Keine Vorlage wird angeboten (kein Download, kein Vorlagen-Link).
    for (const link of Array.from(container.querySelectorAll('a'))) {
      expect(link.hasAttribute('download')).toBe(false);
    }
  });
});

describe('Wissen – AC 12: read-only und mandantenunabhängig', () => {
  it('schreibt keinen localStorage-Schlüssel', () => {
    window.localStorage.clear();
    const { unmount } = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(window.localStorage.length).toBe(0);
    unmount();
  });

  it('zeigt für jeden Mandanten denselben Glossarinhalt', () => {
    const referenz = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const glossarText = (
      referenz.container.querySelector('section[aria-labelledby="wis-familien"]') as HTMLElement
    ).textContent;
    referenz.unmount();

    for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.CONSULTING_OPERATOR]) {
      const { container, unmount } = render(
        <WissenContent role={role('R03')} tenant={tenant(tenantId)} />,
      );
      const text = (
        container.querySelector('section[aria-labelledby="wis-familien"]') as HTMLElement
      ).textContent;
      expect(text, `${tenantId}: Glossar weicht ab`).toBe(glossarText);
      unmount();
    }
  });

  it('nennt keinen fremden Mandanten und sagt die Mandantenunabhängigkeit ausdrücklich', () => {
    for (const demoTenant of DEMO_TENANTS) {
      const { container, unmount } = render(
        <WissenContent role={role('R03')} tenant={demoTenant} />,
      );
      const text = container.textContent ?? '';
      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== demoTenant.tenant_id)) {
        expect(text, `Anzeigename von ${fremd.tenant_id}`).not.toContain(fremd.display_name);
        expect(text, `Kennung von ${fremd.tenant_id}`).not.toContain(fremd.tenant_id);
      }
      expect(text).toContain('unabhängig vom aktiven Mandanten');
      unmount();
    }
  });

  it('die Kontextleiste beschriftet den Datenstand als den des Mandantenbestands', () => {
    // Damit der Glossar nie so aussieht, als hätte er selbst einen Datenstand: Der Wert stammt
    // aus dem Mandantenbestand und ist genau so beschriftet; der Objektkontext sagt die
    // Unabhängigkeit des Inhalts.
    render(<WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const kontext = screen.getByRole('region', { name: 'Kontext dieser Seite' });
    const labels = Array.from(kontext.querySelectorAll('dt')).map((dt) => dt.textContent ?? '');
    expect(labels).toContain('Objektkontext des Glossars');
    expect(labels).toContain('Datenstand des Mandantenbestands (zuletzt im System erfasst)');
    expect(within(kontext).getByText(/unabhängig vom aktiven Mandanten/)).toBeInTheDocument();
  });
});

describe('Wissen – Antwort-Modus (DR-0013)', () => {
  it('die sichtbare Leitfrage ist die, die die Seite heute beantwortet', () => {
    const { container } = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const frage = container.querySelector('.tw-question')?.textContent ?? '';
    expect(frage).toBe('Was bedeuten die Begriffe, mit denen diese Plattform arbeitet?');
    // Die aspirative Screenkatalog-Frage wird NICHT gerendert – von ihren drei Teilen kann die
    // Seite heute nur einen beantworten.
    expect(container.textContent ?? '').not.toContain(
      'Wo finde ich Erklärung, Vorlage und bewährtes Vorgehen zum aktuellen Kontext?',
    );
  });

  it('Antwort zuerst: Glossar vor Lücke', () => {
    const { container } = render(
      <WissenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const ueberschriften = Array.from(container.querySelectorAll('h2')).map(
      (h) => h.textContent ?? '',
    );
    expect(ueberschriften[0]).toBe('Woraus das Modell besteht');
    expect(ueberschriften[ueberschriften.length - 1]).toBe('Was hier noch nicht steht');
  });

  it('rendert ohne gewählte Rolle vollständig (neutraler Einstieg)', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
      <WissenContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect((container.textContent ?? '').length).toBeGreaterThan(500);
    for (const name of [
      'Woraus das Modell besteht',
      'Wie die Dinge zusammenhängen',
      'Was hier noch nicht steht',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
  });
});
