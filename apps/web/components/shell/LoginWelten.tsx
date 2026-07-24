'use client';

/**
 * Getrennte Anmeldewelten „Berater" und „Kunde" – noch simuliert (DR-0015 Nr. 7, DR-0012 A).
 *
 * KONZEPTGRUND (Regel Null, DR-0012): Kundenbenutzer und Berater/Managed-Service-Personal sind
 * getrennte Identitätstypen (Dok. 19 §7.1), in getrennten Sphären (Dok. 03, Abschnitt
 * „Kanonisches Rollenmodell", Spalte „Sphäre": R01–R06 = Kunde, R08–R11 = Betreiber), aber auf
 * EINEM gemeinsamen Datenmodell (Dok. 03 „ein gemeinsames Datenmodell"; Dok. 06 §5.2 „niemals
 * vier getrennte Anwendungen"). Deshalb: getrennter Einstieg, gemeinsame Wahrheit.
 *
 * VERHÄLTNIS ZU DR-0009 (neutraler Einstieg): DR-0009 hat den Einstieg auf „nur Mandant, Rolle
 * in der App" gestellt. DR-0015 Nr. 7 (jünger, derselbe Owner) ergänzt die getrennten Welten,
 * deren Auswahl eine Rolle/Sphäre setzt – das ist eine ABSICHTSVOLLE Wahl des Nutzers (er klickt
 * „Berater" bzw. „Kunde"), kein still übernommener Modus. Der neutrale Einstieg aus DR-0009
 * bleibt als ausdrückliche dritte Option auf der Anmeldeseite erhalten (`LoginForm`).
 *
 * NOCH SIMULIERT (O-KUNDE-02): keine echten Konten, kein Passwort, keine serverseitige
 * Zugriffskontrolle. Als „beschriftete Vorschau" gekennzeichnet – NICHT als „Demo/Simulation"
 * (DR-0011). Die echte, getrennte Authentisierung ist ein eigenes Vorhaben (WP-030, Dok. 19).
 *
 * NUTZT `roles.ts`/`sphaere.ts`: die Rollen je Welt werden aus der Sphäre gefiltert (keine
 * handgepflegte ID-Liste, die still veraltet); die Reichweite der Sicht beschreibt `kundenSicht`.
 *
 * Rein präsentational + lokaler Auswahlzustand je Welt: Mandanten und `onEnter` kommen als Props
 * (deterministisch testbar ohne Router).
 */
import { useState } from 'react';
import type { DemoTenant } from '@isms/demo-seed';
import { DEMO_ROLES, type DemoRole, type RoleSphere } from '../../lib/shell/roles';
import { kundenSicht } from '../../lib/shell/sphaere';

interface WeltDefinition {
  readonly id: 'kunde' | 'berater';
  /** Sichtbarer Titel der Welt. */
  readonly titel: string;
  /** Eyebrow/Untertitel der Welt. */
  readonly eyebrow: string;
  /** Sphäre, aus der die wählbaren Rollen dieser Welt stammen (Dok. 03). */
  readonly sphere: RoleSphere;
  /** Beschriftung des Rollen-Selects (eindeutig, für Assistive Tech). */
  readonly rollenLabel: string;
  /** Beschriftung des Mandanten-Selects (eindeutig – NICHT „Mandant wählen", das gehört
   *  dem neutralen `LoginForm`). */
  readonly mandantLabel: string;
  /** Text des Eintritt-Buttons (bewusst NICHT auf „…anmelden" endend – der neutrale
   *  Einstieg trägt diesen Wortlaut). */
  readonly cta: (rolle: DemoRole) => string;
}

const WELTEN: readonly WeltDefinition[] = [
  {
    id: 'kunde',
    titel: 'Kunde',
    eyebrow: 'Ihr eigenes Unternehmen',
    sphere: 'Kunde',
    rollenLabel: 'Rolle für die Kundensicht',
    mandantLabel: 'Mandant für die Kundensicht',
    cta: (rolle) => `Kundensicht als ${rolle.name} öffnen`,
  },
  {
    id: 'berater',
    titel: 'Berater',
    eyebrow: 'Das Mandanten-Portfolio',
    sphere: 'Betreiber',
    rollenLabel: 'Rolle für die Beratersicht',
    mandantLabel: 'Mandant für die Beratersicht',
    cta: (rolle) => `Beratersicht als ${rolle.name} öffnen`,
  },
];

/** Beschreibt in EINEM Satz, was die gewählte Rolle als Sicht öffnet – aus `kundenSicht`. */
function sichtSatz(rolle: DemoRole): string {
  return kundenSicht(rolle) === 'portfolio'
    ? 'Öffnet die mandantenübergreifende Portfolio-Übersicht mit Mandantenwechsel.'
    : 'Öffnet dieses eine Unternehmen – ohne Portfolio-Übersicht und ohne Mandantenwechsel.';
}

function Welt({
  welt,
  tenants,
  defaultTenantId,
  onEnter,
}: {
  welt: WeltDefinition;
  tenants: readonly DemoTenant[];
  defaultTenantId: string;
  onEnter: (roleId: string, tenantId: string) => void;
}) {
  // Rollen dieser Welt aus der Sphäre (Dok. 03) – nicht hartkodiert, keine stille Veraltung.
  const rollen = DEMO_ROLES.filter((r) => r.sphere === welt.sphere);
  const [roleId, setRoleId] = useState(rollen[0]?.id ?? '');
  const [tenantId, setTenantId] = useState(defaultTenantId);
  const selectedRole = rollen.find((r) => r.id === roleId) ?? rollen[0];

  return (
    <section className={`login-welt login-welt--${welt.id}`} aria-labelledby={`welt-${welt.id}`}>
      <p className="login-welt-eyebrow">{welt.eyebrow}</p>
      <h2 id={`welt-${welt.id}`} className="login-welt-titel">
        {welt.titel}
      </h2>
      {selectedRole ? <p className="login-welt-sicht">{sichtSatz(selectedRole)}</p> : null}

      <form
        className="login-welt-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedRole) onEnter(selectedRole.id, tenantId);
        }}
      >
        <label className="login-field">
          <span className="login-field-label">{welt.rollenLabel}</span>
          <select
            className="shell-select login-welt-select"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            aria-label={welt.rollenLabel}
          >
            {rollen.map((rolle) => (
              // Kein Rollencode im sichtbaren Text (DR-0013 Nr. 12) – die ID bleibt der `value`.
              <option key={rolle.id} value={rolle.id}>
                {rolle.name}
              </option>
            ))}
          </select>
        </label>

        <label className="login-field">
          <span className="login-field-label">{welt.mandantLabel}</span>
          <select
            className="shell-select login-welt-select"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            aria-label={welt.mandantLabel}
          >
            {tenants.map((tenant) => (
              <option key={tenant.tenant_id} value={tenant.tenant_id}>
                {tenant.display_name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="login-submit login-welt-submit" disabled={!selectedRole}>
          {selectedRole ? welt.cta(selectedRole) : 'Sicht öffnen'}
        </button>
      </form>
    </section>
  );
}

export function LoginWelten({
  tenants,
  defaultTenantId,
  onEnter,
}: {
  tenants: readonly DemoTenant[];
  defaultTenantId: string;
  /** Eintritt in eine Welt: setzt Rolle UND Mandant (bewusste Nutzerwahl, kein stiller Modus). */
  onEnter: (roleId: string, tenantId: string) => void;
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: `role="group"` + `aria-label` benennt die zwei getrennten Anmeldewelten als eine Einheit; `fieldset` verlangt eine `legend` und würde die je Welt bereits enthaltenen Formulare in ein weiteres Formular-Set schachteln. Dokumentiertes Bestandsmuster (`Topbar`, `AppShell`).
    <div className="login-welten" role="group" aria-label="Getrennte Einstiege: Berater und Kunde">
      {/* U-02 (Usability-Audit): „Mandant" ist Enterprise-Jargon und trifft den Nutzer als
          erstes Feld – eine Klartextzeile erklärt ihn EINMAL für beide Welten. Bewusst ohne
          „Demo/Simulation" (DR-0011); „Beispielunternehmen" wäre zulässig. */}
      <p className="login-mandant-erklaerung">
        <strong>Mandant</strong> = das Unternehmen, dessen Daten Sie ansehen.
      </p>
      <div className="login-welten-grid">
        {WELTEN.map((welt) => (
          <Welt
            key={welt.id}
            welt={welt}
            tenants={tenants}
            defaultTenantId={defaultTenantId}
            onEnter={onEnter}
          />
        ))}
      </div>
    </div>
  );
}
