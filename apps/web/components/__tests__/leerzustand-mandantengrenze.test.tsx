/**
 * Wächtertest: **kein Leerzustand darf über einen fremden Mandanten sprechen.**
 *
 * Hintergrund — diese Fehlerklasse ist im Projekt ZWEIMAL unabhängig entstanden:
 *
 *  1. `/isms` (seit WP-013): „Die Risiko- und Control-Sicht ist derzeit für einen anderen
 *     Demo-Mandanten ausmodelliert; weitere folgen in späteren Ausbaustufen."
 *  2. `/entscheidungen` (WP-017): „Die Entscheidungsschicht ist im Demo-Datenbestand derzeit für
 *     einen Mandanten ausmodelliert."
 *
 * Beide entstanden aus derselben gut gemeinten Absicht: dem Nutzer erklären, dass die Leere kein
 * Fehler ist. Beide sind Existenzaussagen über FREMDE Mandanten und damit Verstöße gegen
 * Dok. 07, Abschnitt „Mandantenfähigkeit, Rechte und Datenschutz" (P09) — dort ausdrücklich:
 * verdeckte Objekte dürfen nicht über Trefferzahlen oder Meldungen erkennbar werden.
 *
 * Der zweite Fall wurde erst in der Gegenprüfung gefunden, der erste bestand vier Work Packages
 * lang unbemerkt. Deshalb dieser Test: Der Leerzustand ist die Stelle, an der die Versuchung
 * entsteht, „nicht hier, aber woanders" zu sagen — mechanisch geprüft statt durch Aufmerksamkeit.
 *
 * Geprüft wird der **gerenderte Text** der leeren Orte, nicht der Quelltext: eine künftige
 * Umformulierung mit demselben Effekt fällt dadurch ebenfalls auf.
 */
import { render, type RenderResult } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { IsmsContent } from '../isms/IsmsContent';
import { EntscheidungenContent } from '../entscheidungen/EntscheidungenContent';
import { MissionControlContent } from '../shell/MissionControlContent';
import { getRole, type DemoRole } from '../../lib/shell/roles';

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
 * Formulierungen, mit denen eine Seite über andere Mandanten spricht. Bewusst über die konkreten
 * historischen Sätze hinaus: eine Umformulierung soll den Test ebenfalls auslösen.
 */
const FREMDER_MANDANT = [
  /anderen? (Demo-)?Mandanten/i,
  /andere (Demo-)?Mandanten/i,
  /f(ü|ue)r \d+ Mandanten/i,
  /\d+ von \d+ Mandanten/i,
  /Mandanten? ausmodelliert/i,
  /bei (einem|anderen) Mandanten/i,
  /weitere folgen/i,
];

/** Mandanten ohne eigenen Objektgraphen — hier greifen die Leerzustände. */
const LEERE_MANDANTEN = [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE];

describe('Leerzustände sprechen nie über fremde Mandanten (Dok. 07 „Mandantenfähigkeit", P09)', () => {
  const orte: { name: string; render: (t: DemoTenant) => RenderResult }[] = [
    { name: '/isms', render: (t) => render(<IsmsContent tenant={t} />) },
    {
      name: '/entscheidungen',
      render: (t) => render(<EntscheidungenContent role={role('R03')} tenant={t} />),
    },
    {
      name: '/heute',
      render: (t) => render(<MissionControlContent role={role('R03')} tenant={t} />),
    },
  ];

  for (const ort of orte) {
    for (const tenantId of LEERE_MANDANTEN) {
      it(`${ort.name} nennt für ${tenantId} keinen fremden Mandanten`, () => {
        const { container } = ort.render(tenant(tenantId));
        const text = container.textContent ?? '';
        // Blindheitsschutz: der Leerzustand muss überhaupt etwas gerendert haben, sonst wäre
        // jede Negativassertion trivial erfüllt.
        expect(text.length).toBeGreaterThan(80);

        for (const muster of FREMDER_MANDANT) {
          expect(text).not.toMatch(muster);
        }

        // Und konkret: kein Anzeigename und keine ID eines anderen Mandanten im DOM.
        for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== tenantId)) {
          expect(text).not.toContain(fremd.display_name);
          expect(text).not.toContain(fremd.tenant_id);
        }
      });
    }
  }

  it('der Consulting Operator erfährt nichts über Nordwerks Entscheidungen', () => {
    // Dieser Mandant trägt Objekte, aber KEINE Entscheidungen - genau die Konstellation, in der
    // WP-017 ursprünglich „für einen Mandanten ausmodelliert" ausgab.
    const { container } = render(
      <EntscheidungenContent role={role('R08')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />,
    );
    const text = container.textContent ?? '';
    expect(text.length).toBeGreaterThan(80);

    for (const muster of FREMDER_MANDANT) {
      expect(text).not.toMatch(muster);
    }
    expect(text).not.toContain('Nordwerk Manufacturing SE');
    expect(text).not.toContain(TENANT_ID.NORDWERK);
  });
});
