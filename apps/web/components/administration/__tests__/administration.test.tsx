/**
 * Ort „Administration" (`/administration`, WP-032 Slice 1) – Acceptance Criteria 1–5.
 *
 * Geprüft wird die präsentationale `AdministrationContent` mit echtem Bestand (deterministisch,
 * keine DB/kein Fetch). Die mechanischen Querschnitts-Negativbeweise (Mandantengrenze,
 * Prozessvokabular, Kontextleiste, Seitenbausteine) laufen zusätzlich in den vier Wächtern unter
 * `components/__tests__/`; hier stehen die inhaltlichen Belege des Ortes.
 *
 * WARUM DIESER ORT BESONDERS SCHARF GEPRÜFT WIRD: Administration ist der sicherheitsnahe Ort
 * (Dok. 19). Drei Fehlerklassen wären hier teuer und werden deshalb einzeln negativ bewiesen:
 * eine falsche Sicherheitszusage, ein Schreib-Hebel und eine als durchgesetzt dargestellte
 * Rechtematrix.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { AdministrationContent } from '../AdministrationContent';
import { buildAdministrationModel } from '../../../lib/administration/data';
import {
  AUDIT_AUSLOESER,
  AUDIT_MINDESTFELDER,
  BETRIEBS_FAEHIGKEITEN,
  IDENTITAETSTYPEN,
  IDENTITAETS_STATIONEN,
  ISOLATIONS_SCHICHTEN,
  SYSTEM_FAMILIEN,
  SYSTEM_FAMILIEN_HINWEIS,
  SYSTEM_ZUSTAND_MERKMALE,
} from '../../../lib/administration/modell';
import { DEMO_ROLES, getRole, type DemoRole } from '../../../lib/shell/roles';

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
 * Sichtbarer Text OHNE die querschnittliche Kontextleiste.
 *
 * BEGRÜNDUNG (benannt statt still): `PageContextBar` rendert die aktive Produktrolle heute als
 * „R12 · Tenant / Platform Administrator" – dieser Wortlaut ist gemeinsame Shell-Infrastruktur
 * und steht unter dem Kontextleisten-Wächter (er prüft das Format ausdrücklich). Die
 * Rollencode-Freiheit des UI (DR-0013 Nr. 2/Nr. 12) gehört deshalb zum app-weiten
 * Sprachdurchgang, nicht zu dieser Seite. Geprüft wird hier, dass der EIGENE Inhalt dieser Seite
 * keinen internen Code führt – die Leiste wird für diese eine Assertion ausgeklammert.
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

describe('Administration – AC 1: mandantenlokaler Konfigurationsstand und Rollenmodell', () => {
  it('zeigt erfasste Scopes, Umfang und Datenstand des aktiven Mandanten', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    const model = buildAdministrationModel(tenant(TENANT_ID.NORDWERK));

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Konfigurationsstand von Nordwerk Manufacturing SE',
      }),
    ).toBeInTheDocument();

    // Erfasste Scopes als ROHE Kennungen (Scopes sind keine eigenständigen Objekte).
    expect(model.scopeIds.length).toBeGreaterThan(0);
    for (const scopeId of model.scopeIds) {
      expect(text, `Scope-Kennung „${scopeId}" fehlt`).toContain(scopeId);
    }

    // Umfang mit Grundgesamtheit und Datenstand als maschinenlesbares Datum.
    expect(text).toContain(`${model.objectCount} Objekte`);
    expect(text).toContain(`${model.relationshipCount} Beziehungen dieses Mandanten`);
    expect(container.querySelectorAll('time[datetime]').length).toBeGreaterThan(0);
  });

  it('zeigt die zwölf Produktrollen mit Sphäre und Kernverantwortung als Modell', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const rollen = screen
      .getByRole('heading', { level: 2, name: 'Zuständigkeiten: das Rollenmodell' })
      .closest('section');
    if (!rollen) throw new Error('Abschnitt „Zuständigkeiten" fehlt');
    const text = (rollen as HTMLElement).textContent ?? '';

    expect(DEMO_ROLES).toHaveLength(12);
    for (const demoRole of DEMO_ROLES) {
      expect(text, `Rolle „${demoRole.name}" fehlt`).toContain(demoRole.name);
      expect(text, `Kernverantwortung von „${demoRole.name}" fehlt`).toContain(
        demoRole.responsibility,
      );
    }

    // Alle vier Sphären erscheinen als Gruppierung – mit dem WÖRTLICHEN Spaltenwert der Quelle
    // (die Quelle definiert die vier Werte nirgends aus; eine erfundene Bezeichnung wäre eine
    // stille Interpretation).
    for (const sphaere of [...new Set(DEMO_ROLES.map((r) => r.sphere))]) {
      expect(
        within(rollen as HTMLElement).getByRole('heading', {
          level: 3,
          name: `Sphäre: ${sphaere}`,
        }),
      ).toBeInTheDocument();
    }

    // MODELL, NICHT NUTZERVERZEICHNIS: sichtbar gerahmt (AC 1/AC 2).
    expect(text).toContain('kein Verzeichnis von Personen');
    expect(text).toContain('keine geprüften Rechte');
    // Die für diesen Ort vorgesehene Rolle ist benannt, samt ehrlicher Sichtbarkeitsaussage.
    expect(text).toContain('Tenant / Platform Administrator');
    expect(text).toContain('weil Rechte in dieser Ausbaustufe nicht geprüft werden');
    expect(container.textContent ?? '').not.toContain('Nutzer dieses Mandanten');
  });
});

describe('Administration – AC 2: keine echten Rechte, keine Schreib-Hebel, keine Sicherheitszusage', () => {
  const FIXTURES = [
    { tenantId: TENANT_ID.NORDWERK, roleId: 'R12' },
    { tenantId: TENANT_ID.CONSULTING_OPERATOR, roleId: 'R08' },
    { tenantId: TENANT_ID.FINOVIA, roleId: 'R03' },
    { tenantId: TENANT_ID.MEDICORE, roleId: null },
  ];

  for (const { tenantId, roleId } of FIXTURES) {
    it(`${tenantId} (${roleId ?? 'neutral'}): kein Bedienelement mit Schreibsemantik`, () => {
      const { container, unmount } = render(
        <AdministrationContent role={roleId ? role(roleId) : null} tenant={tenant(tenantId)} />,
      );
      // Read-only heißt read-only: kein Formular, kein Eingabefeld, kein Button, keine Auswahl.
      // (Aufklappbare `details`/`summary` sind Offenlegung, keine Aktion.)
      expect(container.querySelectorAll('form, input, select, textarea, button')).toHaveLength(0);
      unmount();
    });

    it(`${tenantId} (${roleId ?? 'neutral'}): keine Sicherheitszusage im gerenderten Text`, () => {
      const { container, unmount } = render(
        <AdministrationContent role={roleId ? role(roleId) : null} tenant={tenant(tenantId)} />,
      );
      const text = container.textContent ?? '';
      expect(text.length).toBeGreaterThan(200); // Blindheitsschutz

      for (const zusage of [
        /ist sicher/i,
        /sicher konfiguriert/i,
        /abgesichert/i,
        /Zugriff (ist |wird )?kontrolliert/i,
        /Rechte (sind|werden) (durchgesetzt|erzwungen)/i,
        /alles in Ordnung/i,
      ]) {
        expect(text, `Sicherheitszusage „${zusage}"`).not.toMatch(zusage);
      }

      // Positiv: die Seite sagt ausdrücklich, dass sie kein Sicherheitsurteil trifft – ruhig,
      // ohne Alarm (weder beruhigend noch alarmierend).
      expect(text).toContain('kein Sicherheitsurteil');
      unmount();
    });
  }

  it('keine als durchgesetzt dargestellte Rechtematrix', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    // Weder eine Tabelle (die klassische Rechtematrix) …
    expect(container.querySelectorAll('table')).toHaveLength(0);
    // … noch eine Rolle-mal-Recht-Zuordnung: das Autorisierungsmodell erscheint als Ebenen-
    // Beschreibung, ausdrücklich ohne Durchsetzung.
    const text = container.textContent ?? '';
    expect(text).toContain('keine Rechtematrix');
    expect(text).toContain('geprüft wird hier heute nichts');
    for (const ebene of ['Rolle', 'Kontextmerkmale', 'Beziehung zum Objekt']) {
      expect(text).toContain(ebene);
    }
  });

  it('kein erfundener Zustand: keine Ampel, kein Prozent, keine Verfügbarkeitszahl (DR-0008)', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.FINOVIA]) {
      const { container, unmount } = render(
        <AdministrationContent role={role('R12')} tenant={tenant(tenantId)} />,
      );
      const text = container.textContent ?? '';
      for (const verboten of [
        /\d+\s?%/,
        /\bgrün\b/i,
        /\bgelb\b/i,
        /\brot\b/i,
        /\bdegraded\b/i,
        /zuletzt synchronisiert/i,
        /letzte Synchronisation/i,
        /Verfügbarkeit von \d/i,
      ]) {
        expect(text, `${tenantId}: erfundener Zustand „${verboten}"`).not.toMatch(verboten);
      }
      unmount();
    }
  });
});

describe('Administration – AC 3: Mandantengrenze im vollen und im leeren Mandanten', () => {
  for (const demoTenant of DEMO_TENANTS) {
    it(`${demoTenant.tenant_id}: nennt keinen anderen Mandanten`, () => {
      const { container } = render(
        <AdministrationContent role={role('R12')} tenant={demoTenant} />,
      );
      const text = container.textContent ?? '';
      expect(text.length).toBeGreaterThan(200);

      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== demoTenant.tenant_id)) {
        expect(text, `Anzeigename von ${fremd.tenant_id}`).not.toContain(fremd.display_name);
        expect(text, `Kennung von ${fremd.tenant_id}`).not.toContain(fremd.tenant_id);
      }

      // Auch keine Scope-Kennung eines fremden Mandanten (die Kennungen tragen Mandantennamen).
      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== demoTenant.tenant_id)) {
        for (const scopeId of buildAdministrationModel(fremd).scopeIds) {
          expect(text, `fremde Scope-Kennung „${scopeId}"`).not.toContain(scopeId);
        }
      }
    });
  }

  it('die Seite verlinkt nirgendwohin über die Mandantengrenze', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    for (const link of Array.from(container.querySelectorAll('a'))) {
      const href = link.getAttribute('href') ?? '';
      // Es gibt heute keinen Link auf dieser Seite; sollte einer entstehen, darf er niemals
      // einen fremden Mandanten adressieren.
      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== TENANT_ID.NORDWERK)) {
        expect(href).not.toContain(fremd.tenant_id);
      }
    }
  });
});

describe('Administration – AC 4: Modelle und Lücken benannt statt gefüllt', () => {
  it('Konten und Identitäten: Lücke benannt, Struktur vollständig', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    expect(text).toContain('In diesem Bestand sind keine Konten erfasst');
    for (const typ of IDENTITAETSTYPEN) {
      expect(text, `Identitätsart „${typ}" fehlt`).toContain(typ);
    }
    for (const station of IDENTITAETS_STATIONEN) {
      expect(text, `Station „${station.titel}" fehlt`).toContain(station.erlaeuterung);
    }
  });

  it('Angebundene Systeme: Katalog als Struktur, ohne erfundenen Zustand', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    expect(text).toContain('Es ist kein externes System angebunden');
    for (const familie of SYSTEM_FAMILIEN) {
      expect(text, `Systemfamilie „${familie.familie}" fehlt`).toContain(familie.familie);
    }
    expect(text).toContain(SYSTEM_FAMILIEN_HINWEIS);
    // Die Zustandsmerkmale erscheinen als Struktur – ohne Wert je Merkmal.
    for (const merkmal of SYSTEM_ZUSTAND_MERKMALE) {
      expect(text, `Zustandsmerkmal „${merkmal}" fehlt`).toContain(merkmal);
    }
    expect(text).toContain('ein angenommener Wert wäre hier schlimmer als keiner');
  });

  it('Nachvollziehbare Ereignisse: Struktur ohne erfundene Einträge', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    expect(text).toContain('keine Ereignisliste');
    for (const ausloeser of AUDIT_AUSLOESER) {
      expect(text, `Auslöser „${ausloeser}" fehlt`).toContain(ausloeser);
    }
    for (const feld of AUDIT_MINDESTFELDER) {
      expect(text, `Mindestfeld „${feld}" fehlt`).toContain(feld);
    }
  });

  it('Betrieb und Mandantentrennung: als Struktur benannt, ohne Messwert und ohne Durchsetzungs-Behauptung', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    expect(text).toContain('Es werden keine Betriebsdaten erhoben');
    for (const punkt of BETRIEBS_FAEHIGKEITEN) {
      expect(text, `Betriebspunkt „${punkt.titel}" fehlt`).toContain(punkt.titel);
    }

    // Mandantentrennung: gelebte Praxis UND vorgesehenes Modell – ohne serverseitige
    // Durchsetzung zu behaupten, die es noch nicht gibt.
    for (const schicht of ISOLATIONS_SCHICHTEN) {
      expect(text, `Isolationsschicht „${schicht}" fehlt`).toContain(schicht);
    }
    expect(text).toContain(
      'Eine serverseitige Prüfung dieser Trennung setzt eine Anmeldung mit echten Konten voraus',
    );
  });

  it('die drei Teilfragen sind einzeln und ehrlich beantwortet (konfiguriert / verbunden / sicher)', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    expect(text).toContain('Korrekt konfiguriert?');
    expect(text).toContain('Verbunden?');
    expect(text).toContain('Sicher?');
    expect(text).toContain('weder ein beruhigendes noch ein alarmierendes');
  });
});

describe('Administration – AC 5: Leerzustand als ehrliche Datenlücke', () => {
  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`${tenantId}: mandantenlokaler Leerzustand, Rollenmodell bleibt sichtbar`, () => {
      const { container, unmount } = render(
        <AdministrationContent role={role('R12')} tenant={tenant(tenantId)} />,
      );
      const text = container.textContent ?? '';
      const t = tenant(tenantId);

      // Leerzustand SOFORT über der Falz (DR-0013 Nr. 10) und in der Sektion.
      expect(text).toContain(`Für ${t.display_name} ist bisher nichts erfasst`);
      expect(
        screen.getByRole('heading', { level: 3, name: 'Noch keine Konfiguration erfasst' }),
      ).toBeInTheDocument();
      // Keine leere Zahlenwand: Umfang und Scope-Liste entfallen im Leerzustand.
      expect(
        screen.queryByRole('heading', { level: 3, name: 'Erfasste Scopes' }),
      ).not.toBeInTheDocument();
      expect(container.querySelectorAll('time[datetime]')).toHaveLength(0);

      // Das mandantenunabhängige Rollenmodell bleibt – aber nie als Konten dieses Mandanten.
      expect(
        screen.getByRole('heading', { level: 2, name: 'Zuständigkeiten: das Rollenmodell' }),
      ).toBeInTheDocument();
      expect(text).toContain('kein Verzeichnis von Personen');
      expect(text).not.toContain('Nutzer dieses Mandanten');
      unmount();
    });
  }
});

describe('Administration – Antwort-Modus und Produktsprache (DR-0013 / DR-0011)', () => {
  it('die sichtbare Leitfrage ist die, die die Seite heute beantwortet', () => {
    const { container } = render(
      <AdministrationContent role={role('R12')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const frage = container.querySelector('.tw-question')?.textContent ?? '';
    expect(frage).toContain('Wie ist Nordwerk Manufacturing SE eingerichtet');
    // Die aspirative Screenkatalog-Frage wird NICHT gerendert (sie müsste im nächsten Satz
    // zurückgenommen werden); der Konzeptanker bleibt in `lib/shell/places.ts`.
    expect(container.textContent ?? '').not.toContain(
      'Ist der Tenant sicher, korrekt konfiguriert und verbunden?',
    );
  });

  it('kein internes Vokabular im eigenen Seiteninhalt', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.FINOVIA]) {
      const { container, unmount } = render(
        <AdministrationContent role={role('R12')} tenant={tenant(tenantId)} />,
      );
      const text = textOhneKontextleiste(container);
      expect(text.length).toBeGreaterThan(200); // Blindheitsschutz

      for (const verboten of [
        /Dok\.\s?\d/, // Dokumentreferenz
        /§/,
        /\d{2}-D\d{2}/, // Entscheidungskennung
        /\bR\d{2}\b/, // Rollen-/Beziehungscode
        /\bF0[1-9]\b/, // Familiencode
        /scope_ids|record_time|tenant_id|owner_ids|lifecycle_status/, // Feldnamen
        /Work Package/i,
        /Screen S\d/,
        /\bSimulation\b/i,
        /Demo-Seed/i,
        /Demo-Datenbestand/i,
      ]) {
        expect(text, `${tenantId}: internes Vokabular „${verboten}"`).not.toMatch(verboten);
      }
      unmount();
    }
  });

  it('rendert ohne gewählte Rolle vollständig (neutraler Einstieg)', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
      <AdministrationContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect((container.textContent ?? '').length).toBeGreaterThan(200);
    for (const name of [
      'Konfigurationsstand von Nordwerk Manufacturing SE',
      'Zuständigkeiten: das Rollenmodell',
      'Mandantentrennung',
      'Was ein Sicherheitsurteil zusätzlich braucht',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
  });
});
