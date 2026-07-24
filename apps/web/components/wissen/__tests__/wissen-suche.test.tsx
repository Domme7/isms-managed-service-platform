/**
 * `WissenSuche` (WP-027 Slice 2): das Suchfeld + die Trefferliste im Ort „Wissen".
 * Prüft gegen den echten `DEMO_SEED` (kein Mock), dass die Sicherheitszusagen der Suchmaschine
 * in der Oberfläche ANKOMMEN:
 *  1. Leerzustand + Kurz-Query + Kein-Treffer,
 *  2. Snippet-Leak-Schutz SICHTBAR: vertraulicher Treffer zeigt „Vorschau ausgeblendet
 *     (vertraulich)" und NICHT seinen Beschreibungstext,
 *  3. Sphärengrenze: Kundensicht findet kein fremdes Objekt, Portfolio schon.
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_SEED, TENANT_ID } from '@isms/demo-seed';
import { getRole, type DemoRole } from '../../../lib/shell/roles';
import { WissenSuche } from '../WissenSuche';

function role(roleId: string): DemoRole {
  const found = getRole(roleId);
  if (!found) throw new Error(`Testfixture fehlt: ${roleId}`);
  return found;
}

function tippe(query: string) {
  fireEvent.change(screen.getByLabelText('Suchbegriff'), { target: { value: query } });
}

const geheimNordwerk = DEMO_SEED.objects.find(
  (o) =>
    o.tenant_id === TENANT_ID.NORDWERK &&
    o.classification.confidentiality === 'vertraulich' &&
    Boolean(o.description),
);

describe('WissenSuche – Leerzustände', () => {
  it('zeigt ohne Query den Tipp-Hinweis, keine Treffer', () => {
    render(<WissenSuche role={role('R03')} tenantId={TENANT_ID.NORDWERK} />);
    expect(screen.getByText(/Tippen Sie einen Begriff/)).toBeInTheDocument();
  });

  it('verlangt bei einem Zeichen mindestens zwei', () => {
    render(<WissenSuche role={role('R03')} tenantId={TENANT_ID.NORDWERK} />);
    tippe('a');
    expect(screen.getByText(/mindestens 2 Zeichen/)).toBeInTheDocument();
  });

  it('meldet ehrlich, wenn es keine Treffer gibt', () => {
    render(<WissenSuche role={role('R03')} tenantId={TENANT_ID.NORDWERK} />);
    tippe('xyzqk-kein-treffer');
    expect(screen.getByText(/Keine Treffer/)).toBeInTheDocument();
  });
});

describe('WissenSuche – Snippet-Leak-Schutz sichtbar', () => {
  it('vertraulicher Treffer zeigt „Vorschau ausgeblendet", nicht seinen Beschreibungstext', () => {
    expect(geheimNordwerk, 'Fixture: vertrauliches Nordwerk-Objekt mit Beschreibung').toBeDefined();
    if (!geheimNordwerk?.description) return;
    render(<WissenSuche role={role('R03')} tenantId={TENANT_ID.NORDWERK} />);
    tippe(geheimNordwerk.display_name);

    // Der Treffer ist als Link da …
    expect(screen.getByRole('link', { name: geheimNordwerk.display_name })).toBeInTheDocument();
    // … der Leak-Schutz ist sichtbar …
    expect(screen.getAllByText(/Vorschau ausgeblendet \(vertraulich\)/).length).toBeGreaterThan(0);
    // … und der Beschreibungstext taucht NICHT auf.
    const beschreibungsAnfang = geheimNordwerk.description.slice(0, 24);
    expect(
      screen.queryByText(new RegExp(beschreibungsAnfang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))),
    ).toBeNull();
  });
});

describe('WissenSuche – Sphärengrenze (DR-0012)', () => {
  const fremd = DEMO_SEED.objects.find((o) => o.tenant_id === TENANT_ID.ALPENCLOUD);

  it('Kundensicht findet kein Objekt eines fremden Mandanten', () => {
    expect(fremd, 'Fixture: AlpenCloud-Objekt').toBeDefined();
    if (!fremd) return;
    render(<WissenSuche role={role('R03')} tenantId={TENANT_ID.NORDWERK} />);
    tippe(fremd.display_name);
    expect(screen.queryByRole('link', { name: fremd.display_name })).toBeNull();
  });

  it('Portfolio-/Betreibersicht findet über Kundenmandanten hinweg', () => {
    expect(fremd).toBeDefined();
    if (!fremd) return;
    render(<WissenSuche role={role('R08')} tenantId={TENANT_ID.NORDWERK} />);
    tippe(fremd.display_name);
    expect(screen.getByRole('link', { name: fremd.display_name })).toBeInTheDocument();
  });
});
