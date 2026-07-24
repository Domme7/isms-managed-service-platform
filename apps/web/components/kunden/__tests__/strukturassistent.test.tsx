/**
 * Struktur-Assistent (`/kunden/struktur`, WP-006 Slice 3) – Acceptance Criteria 10–12.
 *
 * Geprüft wird die präsentationale `StrukturAssistentContent` mit echtem Rollen-/Mandantenkontext
 * (deterministisch, keine DB/kein Fetch). Die Kundensphäre-Negativbeweise laufen zusätzlich im
 * Wächter `leerzustand-mandantengrenze.test.tsx`; hier stehen die inhaltlichen Belege.
 */
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { StrukturAssistentContent } from '../StrukturAssistentContent';
import {
  AUSSCHLUSS_PFLICHT,
  CHARTER_INHALTE,
  FIRMENANLAGE_MINDEST,
  FREIGABEPFLICHTIG,
  GUIDED_QUICKSTART,
  LIFECYCLE_PHASEN,
  MATERIALISIERUNGS_LUECKEN,
  QUALIFICATION_FRAGEN,
  SCOPE_DIMENSIONEN,
  STRATEGIE_DNA_DIMENSIONEN,
  ZIELPROFILTYPEN,
} from '../../../lib/kunden/struktur';
import { getRole, type DemoRole } from '../../../lib/shell/roles';

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

describe('Struktur-Assistent – Slice 3', () => {
  it('AC10: zeigt alle Strukturen vollständig (11/10/8/9/6/12/9/7) und worttreu', () => {
    const { container } = render(
      <StrukturAssistentContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    // 11 Lifecycle-Phasen (0–10), je Name + Exit Gate worttreu (inkl. „Exit Acceptance").
    for (const phase of LIFECYCLE_PHASEN) {
      expect(text, `Phase ${phase.nummer} fehlt`).toContain(`Phase ${phase.nummer}: ${phase.name}`);
      expect(text, `Exit Gate Phase ${phase.nummer} fehlt`).toContain(phase.exitGate);
    }
    // 10 Qualification-Mindestfragen.
    for (const frage of QUALIFICATION_FRAGEN) expect(text, frage).toContain(frage);
    // 10 Charter-Mindestinhalte.
    for (const inhalt of CHARTER_INHALTE) expect(text, inhalt).toContain(inhalt);
    // 8 Firmenanlage-Mindestpunkte.
    for (const punkt of FIRMENANLAGE_MINDEST) expect(text, punkt).toContain(punkt);
    // 9 Scope-Dimensionen + 6 Ausschluss-Pflichtangaben.
    for (const dim of SCOPE_DIMENSIONEN) expect(text, dim).toContain(dim);
    for (const angabe of AUSSCHLUSS_PFLICHT) expect(text, angabe).toContain(angabe);
    // 12 Strategie-DNA-Pflichtdimensionen.
    for (const d of STRATEGIE_DNA_DIMENSIONEN) expect(text, d.dimension).toContain(d.dimension);
    // 9 Zielprofiltypen.
    for (const typ of ZIELPROFILTYPEN) expect(text, typ.name).toContain(typ.name);
    // 7 Guided-Quickstart-Schritte + 5 freigabepflichtige Gegenstände (16-D07).
    for (const schritt of GUIDED_QUICKSTART) expect(text, schritt).toContain(schritt);
    for (const g of FREIGABEPFLICHTIG) expect(text, g).toContain(g);
  });

  it('AC11: read-only – kein Eingabefeld, kein neuer localStorage-Schlüssel, klare Beschriftung', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const { container } = render(
      <StrukturAssistentContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    // Kein Eingabe-/Formularelement (nur Text und Links).
    expect(container.querySelectorAll('input, textarea, select, form, button')).toHaveLength(0);
    // Kein localStorage-Schreibzugriff beim Rendern (keine Erfassung, keine Fortschrittsmessung).
    expect(setItemSpy).not.toHaveBeenCalled();
    setItemSpy.mockRestore();

    // Sichtbare Beschriftung „erklärte Struktur … keine Erfassung" (sinngemäß).
    const text = container.textContent ?? '';
    expect(text).toContain('keine Erfassung');
    expect(text).toContain('kein Eingabefeld');
  });

  it('AC12: benennt die Materialisierungs-Lücken (ISMS-Scope, Ausschluss, Strategie-DNA, Target Profile)', () => {
    const { container } = render(
      <StrukturAssistentContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    for (const typ of MATERIALISIERUNGS_LUECKEN) {
      expect(text, `Materialisierungs-Lücke „${typ}" fehlt`).toContain(typ);
    }
    expect(text).toContain('im aktuellen Datenbestand nicht hinterlegt');
    // Keine internen Codes im sichtbaren Text (kein „F01"/„F09", keine WP-Kennung).
    expect(text).not.toMatch(/(^|[^A-Za-z])F0[1-9]([^A-Za-z]|$)/);
    expect(text).not.toMatch(/WP-\d{3}/);
  });

  it('neutral: rendert vollständig ohne Rolle; mit Rolle erscheint die Rahmung', () => {
    const neutral = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009).
      <StrukturAssistentContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(neutral.container.textContent ?? '').toContain('Neutraler Einstieg');
    // Auch neutral ist der Assistent vollständig (Stichprobe: erste und letzte Phase).
    expect(neutral.container.textContent ?? '').toContain(LIFECYCLE_PHASEN[0].name);
    expect(neutral.container.textContent ?? '').toContain(
      LIFECYCLE_PHASEN[LIFECYCLE_PHASEN.length - 1].name,
    );
    neutral.unmount();

    const kunde = render(
      <StrukturAssistentContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(kunde.container.textContent ?? '').toContain(role('R03').name);
    kunde.unmount();
  });
});
