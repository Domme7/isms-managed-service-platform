/**
 * Profil-Login (DR-0017 / 5-Profile-Modell): der PRIMÄRE Einstieg als kleine Menge von Profilen
 * statt einer Rolle×Mandant-Matrix.
 *
 * OWNER-RICHTUNG (2026-07-24): „Firmen als Kunden-Profile + 1 Berater/Admin-Profil; die feine
 * 12-Rollen-Wahl aus dem Login-Einstieg raus." Umsetzung:
 *  - **Je Kundenfirma ein Kunden-Profil**: „als [Firma] eintreten" → deren Kundensicht auf den
 *    eigenen Mandanten (Sphäre Kunde → Ein-Unternehmens-Cockpit). Der Login wählt KEINE feine
 *    Rolle mehr; er setzt die operative Standard-Kundenrolle (ISMS Manager, R03), die in der App
 *    weiter wechselbar bleibt.
 *  - **Ein Berater/Admin-Profil**: „Portfolio über alle Kunden" → Betreiber-Sphäre → Berater-
 *    Portfolio (Managed Service Lead, R08).
 *
 * VERHÄLTNIS ZU DR-0015 (getrennte Welten) — benannt, nicht still (DR-0005): DR-0015 Nr. 7 legte
 * die zwei Welten „Kunde"/„Berater" mit feiner Rollenwahl fest. Die Owner-Richtung von 2026-07-24
 * VERFEINERT das zum Profil-Modell: die getrennten Sphären BLEIBEN (Kunde vs. Betreiber, DR-0012),
 * nur die feine Rollenwahl ist nicht mehr der Einstieg. Die volle Rollenwahl + der neutrale
 * Einstieg (DR-0009) bleiben als eingeklappte „Weitere Ansichten" erreichbar (Rollen-Logik bleibt).
 *
 * KEINE Autorisierung (Dok. 19): Profil-Wahl ist Perspektive, keine Zugriffsgrenze. Noch simuliert
 * (kein Konto, kein Passwort) — als beschriftete Vorschau, nicht „Demo/Simulation" (DR-0011).
 *
 * Rein präsentational: Firmen + `onEnter` kommen als Props (deterministisch testbar ohne Router).
 */
'use client';

import type { DemoTenant } from '@isms/demo-seed';

/** Operative Standard-Kundenrolle je Firmen-Profil (in der App weiter wechselbar). */
export const KUNDE_PROFIL_ROLE = 'R03'; // ISMS Manager (Dok. 03 §3)
/** Standard-Betreiberrolle des Berater/Admin-Profils. */
export const BERATER_PROFIL_ROLE = 'R08'; // Managed Service Lead (Dok. 03 §3)

export function LoginProfile({
  customers,
  beraterTenantId,
  onEnter,
}: {
  /** Die Kundenfirmen (ohne Provider) – je Firma ein Kunden-Profil. */
  customers: readonly DemoTenant[];
  /** Aktiver Mandant, den das Berater-Profil setzt (das Portfolio zeigt ohnehin alle Kunden). */
  beraterTenantId: string;
  /** Eintritt in ein Profil: setzt Rolle UND Mandant (bewusste Nutzerwahl). */
  onEnter: (roleId: string, tenantId: string) => void;
}) {
  return (
    <div className="login-profile">
      <section className="login-profil-gruppe" aria-labelledby="profil-kunde">
        <p className="login-profil-eyebrow">Kundensicht</p>
        <h2 id="profil-kunde" className="login-profil-titel">
          Als Kunde eines Unternehmens
        </h2>
        <p className="login-profil-sicht">
          Sie sehen ausschließlich dieses eine Unternehmen – ohne Portfolio-Übersicht und ohne
          Mandantenwechsel. Die operative Rolle (ISMS Manager) lässt sich in der Anwendung wechseln.
        </p>
        <ul className="login-profil-liste">
          {customers.map((firma) => (
            <li key={firma.tenant_id}>
              <button
                type="button"
                className="login-profil-karte"
                onClick={() => onEnter(KUNDE_PROFIL_ROLE, firma.tenant_id)}
                aria-label={`Als Kunde ${firma.display_name} eintreten`}
              >
                <span className="login-profil-name">{firma.display_name}</span>
                <span className="login-profil-branche">{firma.industry}</span>
                <span className="login-profil-cta" aria-hidden="true">
                  Kundensicht öffnen →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="login-profil-gruppe login-profil-gruppe--berater"
        aria-labelledby="profil-berater"
      >
        <p className="login-profil-eyebrow">Beratersicht</p>
        <h2 id="profil-berater" className="login-profil-titel">
          Als Berater und Admin
        </h2>
        <p className="login-profil-sicht">
          Das Portfolio über alle Kunden auf einen Blick, mit Mandantenwechsel – der Einstieg für
          das Managed-Service-Team.
        </p>
        <button
          type="button"
          className="login-profil-karte login-profil-karte--berater"
          onClick={() => onEnter(BERATER_PROFIL_ROLE, beraterTenantId)}
          aria-label="Als Berater und Admin eintreten"
        >
          <span className="login-profil-name">Berater / Admin</span>
          <span className="login-profil-branche">Portfolio über alle Kunden</span>
          <span className="login-profil-cta" aria-hidden="true">
            Portfolio öffnen →
          </span>
        </button>
      </section>
    </div>
  );
}
