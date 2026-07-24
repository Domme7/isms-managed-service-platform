/**
 * Kunden-Startseite „verwalten" (`/kunden`, WP-006 Slice 1) – Acceptance Criteria 1–5.
 *
 * Geprüft wird die präsentationale `KundenStartContent` mit echtem `DEMO_SEED` (deterministisch,
 * keine DB/kein Fetch). Die Kundensphäre-Negativbeweise (AC 2/3) laufen zusätzlich mechanisch im
 * Wächter `leerzustand-mandantengrenze.test.tsx`; hier stehen die inhaltlichen Belege.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  DEMO_TENANTS,
  NORDWERK_OBJECT_ID,
  NORDWERK_SERVICE_OBJECT_ID,
  TENANT_ID,
  type DemoTenant,
} from '@isms/demo-seed';
import { KundenStartContent } from '../KundenStartContent';
import { getRole, type DemoRole } from '../../../lib/shell/roles';
import { objectDetailHref } from '../../../lib/twin/routes';

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

describe('Kunden-Startseite „verwalten" – Slice 1', () => {
  it('AC1: rendert mandantenlokal Scopes, Ziele, Services und Nachweise des aktiven Mandanten', () => {
    const { container } = render(
      <KundenStartContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    // Scopes: rohe Kennungen (Scopes sind keine Objekte, O-WP014-03).
    expect(text).toContain('scope-nordwerk-isms-core');
    expect(text).toContain('scope-nordwerk-managed-service');

    // Ziele/Kennzahlen (Objective + KPI) mit Objekt-360-Verweis im AKTIVEN Mandanten.
    expect(
      screen.getByRole('heading', { level: 2, name: 'Ziele und Kennzahlen' }),
    ).toBeInTheDocument();
    expect(text).toContain('Auditfähigkeit ISO/IEC 27001');
    expect(text).toContain('Nachweisquote priorisierter Controls');
    expect(
      screen.getByRole('link', { name: /Auditfähigkeit ISO\/IEC 27001/ }).getAttribute('href'),
    ).toBe(
      objectDetailHref(TENANT_ID.NORDWERK, NORDWERK_SERVICE_OBJECT_ID.OBJECTIVE_AUDITFAEHIGKEIT),
    );

    // Services mit SLA/Deliverables und Objekt-360-Verweis.
    expect(screen.getByRole('heading', { level: 2, name: 'Services' })).toBeInTheDocument();
    expect(text).toContain('Kontinuierliches Risiko- & Control-Monitoring');
    expect(text).toMatch(/Leistungsversprechen \(SLA\)/);
    expect(text).toMatch(/Deliverable/);

    // Nachweise (Evidence) mit Lebenszyklus-Stand.
    expect(screen.getByRole('heading', { level: 2, name: 'Nachweise' })).toBeInTheDocument();
    expect(text).toContain('Restore-Test-Protokoll Q2/2026');
    expect(
      screen.getByRole('link', { name: /Restore-Test-Protokoll Q2\/2026/ }).getAttribute('href'),
    ).toBe(objectDetailHref(TENANT_ID.NORDWERK, NORDWERK_OBJECT_ID.EVIDENCE_RESTORE_TEST));

    // Verweis auf den Ort „Entscheidungen".
    expect(screen.getByRole('link', { name: /Zu den Entscheidungen/ }).getAttribute('href')).toBe(
      '/entscheidungen',
    );
  });

  it('AC2: der gerenderte Text nennt keinen fremden Mandanten (voller Mandant)', () => {
    const { container } = render(
      <KundenStartContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== TENANT_ID.NORDWERK)) {
      expect(text).not.toContain(fremd.display_name);
      expect(text).not.toContain(fremd.tenant_id);
    }
    // Jeder Objekt-Link bleibt im aktiven Mandanten (kein Link über die Mandantengrenze).
    for (const link of screen.getAllByRole('link')) {
      const href = link.getAttribute('href') ?? '';
      if (href.includes('/objekt/')) {
        expect(href.startsWith(`/twin/${TENANT_ID.NORDWERK}/objekt/`)).toBe(true);
      }
    }
  });

  it('AC3: leerer Mandant zeigt eine mandantenlokale Einladung mit Einstieg in Katalog und Struktur-Assistent', () => {
    for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
      const { container, unmount } = render(
        <KundenStartContent role={role('R03')} tenant={tenant(tenantId)} />,
      );
      const text = container.textContent ?? '';
      const t = tenant(tenantId);

      // Einladung statt leerer Platzhalter (Dok. 03 „Anfängererlebnis"), mandantenlokal.
      expect(text).toContain(`Kundenbereich für ${t.display_name} einrichten`);
      expect(text).toContain('Struktur-Assistent');
      // Verdrahtete Einstiege (WP-006 Slice 2/3): Katalog- und Struktur-Assistent-Route.
      expect(
        screen.getByRole('link', { name: /Servicekatalog ansehen/ }).getAttribute('href'),
      ).toBe('/services/katalog');
      expect(
        screen.getByRole('link', { name: /Struktur-Assistent öffnen/ }).getAttribute('href'),
      ).toBe('/kunden/struktur');
      // Keine leeren Datensektionen – die Datensektionen entfallen im Leerzustand.
      expect(screen.queryByRole('heading', { level: 2, name: 'Scopes' })).not.toBeInTheDocument();
      unmount();
    }
  });

  it('AC4: fehlende Customer-Workspace-Inhalte werden benannt, kein erfundener Wert', () => {
    const { unmount } = render(
      <KundenStartContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const luecken = screen
      .getByRole('heading', { level: 2, name: 'Noch nicht hinterlegt' })
      .closest('section');
    if (!luecken) throw new Error('Abschnitt „Noch nicht hinterlegt" fehlt');
    const text = within(luecken as HTMLElement).getByRole('list').textContent ?? '';

    // Dok. 06, Abschnitt „Customer Workspace": Kopfinhalte ohne Datenträger – benannt.
    for (const inhalt of [
      'Strategie-DNA',
      'Zielprofil',
      'Managed-Service-Anteil',
      'Trend',
      'Unternehmenspuls',
      'Ursache-Wirkungs-Ketten',
      'Hebel mit größter Wirkung',
      'Zeitachse',
    ]) {
      expect(text, `„${inhalt}" fehlt in der Lückenbenennung`).toContain(inhalt);
    }
    // Kein Prozent, kein erfundener Trend-/Statuswert im Lückentext.
    expect(text).not.toMatch(/\d+\s?%/);
    unmount();
  });

  it('AC5: neutral rendert vollständig; mit Kundenrolle erscheint die Kundenrollen-Rahmung', () => {
    // Neutral: alle Datensektionen vorhanden, Rahmung nennt den neutralen Einstieg.
    const neutral = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
      <KundenStartContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(neutral.getByText(/Neutraler Einstieg/)).toBeInTheDocument();
    for (const name of [
      'Scopes',
      'Ziele und Kennzahlen',
      'Services',
      'Nachweise',
      'Entscheidungen',
    ]) {
      expect(neutral.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
    neutral.unmount();

    // Kundenrolle R03 (Sphäre „Kunde"): Kundensphäre-Rahmung mit Rollenname.
    const kunde = render(
      <KundenStartContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = kunde.container.textContent ?? '';
    expect(text).toContain('Kundensphäre');
    expect(text).toContain(role('R03').name); // „ISMS Manager"
    kunde.unmount();
  });

  it('preisfrei: kein Währungszeichen, kein Betrag, kein Prozent im gerenderten Text (O-KUNDE-01)', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.FINOVIA]) {
      const { container, unmount } = render(
        <KundenStartContent role={role('R03')} tenant={tenant(tenantId)} />,
      );
      const text = container.textContent ?? '';
      for (const verboten of [/€/, /\bEUR\b/, /\bUSD\b/, /\$/, /\d+\s?%/]) {
        expect(text, `/kunden/${tenantId}: „${verboten}"`).not.toMatch(verboten);
      }
      unmount();
    }
  });

  it('AC5: Betreiberrolle erhält die ehrliche Kundensphäre-Rahmung (Rolle = Perspektive, keine Grenze)', () => {
    // O-WP006-04: eine Betreiberrolle kann die Seite öffnen; sie zeigt trotzdem nur den aktiven
    // Mandanten und benennt, dass die Rolle keine Zugriffsgrenze ist.
    const { container } = render(
      <KundenStartContent role={role('R08')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    expect(text).toContain('Kundensphäre');
    expect(text).toContain('keine Zugriffsgrenze');
  });
});
