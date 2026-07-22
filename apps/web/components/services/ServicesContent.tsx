/**
 * Präsentationaler Inhalt des Ortes „Services" (WP-012 Slice 2, read-only).
 *
 * Mandanten-Sicht: Managed Services des aktiven Mandanten, vollständig aus `DEMO_SEED`
 * abgeleitet (nichts hartkodiert/erfunden; keine Preise – der Seed enthält bewusst keine).
 * Portfolio-Sicht: nur für Rollen der Consulting & Service World (Dok. 06 §5, R08–R11) –
 * das ist reine Anzeige-Verdichtung je Rolle (Demo), KEINE Autorisierung und KEINE
 * Sicherheitsgrenze. Empty-State für Mandanten ohne Services (Dok. 06 §17).
 *
 * Heading-Hierarchie: h1 (Ort) > h2 (Sektion) > h3 (Service-/Mandantenkarte) > h4 (Karteninhalt).
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import { worldForRole, type DemoRole } from '../../lib/shell/roles';
import {
  buildPortfolioOverview,
  getManagedServicesForTenant,
  getServiceTenants,
} from '../../lib/services/data';
import { PortfolioOverview } from './PortfolioOverview';
import { ServiceCard } from './ServiceCard';

export function ServicesContent({ role, tenant }: { role: DemoRole; tenant: DemoTenant }) {
  const services = getManagedServicesForTenant(tenant.tenant_id);
  // Rollen-Gating der Portfolio-Sicht über das bestehende Welt-Mapping (Dok. 06 §5):
  // R08–R11 gehören zur Consulting & Service World. Reine UI-Verdichtung, keine Authz.
  const isConsultingWorld = role.worldId === 'consulting';

  return (
    <>
      <p className="tw-eyebrow">Services · Managed-Service-Schicht</p>
      <h1>Services</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation", S09). */}
      <p className="tw-question">
        Welche Services laufen für {tenant.display_name} und was liefern sie?
      </p>

      <p className="tw-lead">
        Read-only Demo-Sicht auf synthetische Managed-Service-Daten des aktiven Mandanten:
        Leistungsversprechen, SLA, Deliverables und Wirkungsbeitrag – aus demselben Datenmodell
        wie der digitale Zwilling. Ohne Preise, ohne Buchung, ohne Verkaufslogik (Dok. 13 MS15).
      </p>

      <section aria-labelledby="mandanten-services">
        {/* Zustandstreue (UX-Review MINOR-1): auch „Review"/„konfiguriert" werden gelistet –
            daher neutral „Managed Services", der Status steht je Karte daneben. */}
        <h2 id="mandanten-services">Managed Services für {tenant.display_name}</h2>
        {services.length > 0 ? (
          <ul className="sv-list">
            {services.map((view) => (
              // Objekt-Links dieser Karte (WP-014 Slice 2) tragen ausschließlich den AKTIVEN
              // Mandanten der Session-Simulation – denselben, aus dem die Services stammen.
              <ServiceCard
                key={view.service.object_id}
                view={view}
                tenantId={tenant.tenant_id}
              />
            ))}
          </ul>
        ) : (
          <EmptyServices tenant={tenant} />
        )}
      </section>

      {isConsultingWorld ? (
        <PortfolioOverview entries={buildPortfolioOverview()} />
      ) : (
        <section aria-labelledby="portfolio-hinweis">
          <h2 id="portfolio-hinweis">Portfolio über alle Mandanten</h2>
          <div className="tw-empty" role="note">
            <p style={{ margin: 0 }}>
              Die mandantenübergreifende Portfolio-Sicht ist der Service-Organisation vorbehalten
              (Consulting &amp; Service World, Rollen R08–R11, Dok. 06 §5). Ihre aktive Rolle{' '}
              <strong>{role.name}</strong> gehört zur {worldForRole(role).name}. Demo-Hinweis: Das
              ist eine reine Anzeige-Verdichtung je Rolle – keine Sicherheitsgrenze.
            </p>
          </div>
        </section>
      )}
    </>
  );
}

/** Verbindet Namen deutsch: „A", „A und B", „A, B und C". */
function joinDe(names: readonly string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')} und ${names[names.length - 1]}`;
}

/** Ehrlicher Empty-State für Mandanten ohne Services (Finovia/MediCore, Dok. 06 §17). */
function EmptyServices({ tenant }: { tenant: DemoTenant }) {
  // Aus dem Seed abgeleitet (nicht hartkodiert), damit die Meldung korrekt bleibt.
  const serviceTenants = getServiceTenants();
  const names = joinDe(serviceTenants.map((t) => t.display_name));

  return (
    <div className="tw-empty" role="note">
      <h3>Keine Managed Services für {tenant.display_name}</h3>
      <p style={{ marginTop: 0 }}>
        Für <strong>{tenant.display_name}</strong> sind im aktuellen Demo-Seed keine Managed
        Services modelliert.{' '}
        {serviceTenants.length > 0
          ? `Services laufen derzeit für ${names}; weitere Mandanten folgen in späteren Ausbaustufen.`
          : 'Im aktuellen Demo-Seed ist noch kein Mandant mit Services modelliert.'}
      </p>
      <p className="tw-muted">
        Bewusst kein Platzhalter-Inhalt: hier erscheinen ausschließlich aus dem Demo-Seed
        abgeleitete Services – keine erfundenen Angebote und keine Preise.
      </p>
      {/* Nächster Schritt im Empty-State (Dok. 06 §17, UX-Review MINOR-3). */}
      <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
        <Link className="tw-cta" href="/login">
          Mandant wechseln (Anmelde-Simulation) →
        </Link>
      </p>
    </div>
  );
}
