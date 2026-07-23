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
  buildServicesPageContext,
  getManagedServicesForTenant,
} from '../../lib/services/data';
import { PageContextBar } from '../shell/PageContextBar';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';
import { PortfolioOverview } from './PortfolioOverview';
import { ServiceCard } from './ServiceCard';

export function ServicesContent({
  role,
  tenant,
}: {
  /** `null` = neutraler Zustand (DR-0009): Mandanten-Sicht identisch, Portfolio bleibt zu. */
  role: DemoRole | null;
  tenant: DemoTenant;
}) {
  const services = getManagedServicesForTenant(tenant.tenant_id);
  const context = buildServicesPageContext(tenant.tenant_id);
  // Rollen-Gating der Portfolio-Sicht über das bestehende Welt-Mapping (Dok. 06 §5):
  // R08–R11 gehören zur Consulting & Service World. Reine UI-Verdichtung, keine Authz.
  // Im NEUTRALEN Zustand bleibt die Portfolio-Sicht zu: sie ist eine bewusst
  // mandantenübergreifende Verdichtung der Service-Organisation (O-WP012-03) – ohne gewählte
  // Rolle wird sie nicht angezeigt, der Hinweis darunter benennt den Weg.
  const isConsultingWorld = role?.worldId === 'consulting';

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
        Leistungsversprechen, SLA, Deliverables und Wirkungsbeitrag – aus demselben Datenmodell wie
        der digitale Zwilling. Ohne Preise, ohne Buchung, ohne Verkaufslogik (Dok. 13 MS15).
      </p>

      {/* Kontextleiste (WP-020 Slice 1, Dok. 06 „Sichtbarer Kontext"): Scope und Datenstand
          beziehen sich ausdrücklich auf die HIER GEZEIGTEN Managed Services des aktiven
          Mandanten – die Leiste widerspricht damit nie dem Seiteninhalt. */}
      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Scope-Kennungen der Managed Services"
        scopeValue={
          context.scopeIds.length > 0
            ? context.scopeIds.join(' · ')
            : 'keine Scope-Zuordnung erfasst'
        }
        datenstandLabel="Datenstand der Managed Services (zuletzt im System erfasst)"
        datenstandValue={
          context.recordedOn && context.recordedOnDisplay ? (
            <time dateTime={context.recordedOn}>{context.recordedOnDisplay}</time>
          ) : (
            'kein Managed Service erfasst'
          )
        }
      />

      <section aria-labelledby="mandanten-services">
        {/* Zustandstreue (UX-Review MINOR-1): auch „Review"/„konfiguriert" werden gelistet –
            daher neutral „Managed Services", der Status steht je Karte daneben. */}
        <h2 id="mandanten-services">Managed Services für {tenant.display_name}</h2>
        {services.length > 0 ? (
          <ul className="sv-list">
            {services.map((view) => (
              // Objekt-Links dieser Karte (WP-014 Slice 2) tragen ausschließlich den AKTIVEN
              // Mandanten der Session-Simulation – denselben, aus dem die Services stammen.
              <ServiceCard key={view.service.object_id} view={view} tenantId={tenant.tenant_id} />
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
              (Consulting &amp; Service World, Rollen R08–R11, Dok. 06 §5).{' '}
              {role ? (
                <>
                  Ihre aktive Rolle <strong>{role.name}</strong> gehört zur{' '}
                  {worldForRole(role).name}.
                </>
              ) : (
                <>
                  Es ist derzeit <strong>keine Rolle gewählt</strong> (neutraler Einstieg); über die
                  Rollenwahl oben in der Leiste lässt sich eine dieser Rollen aktivieren.
                </>
              )}{' '}
              Demo-Hinweis: Das ist eine reine Anzeige-Verdichtung je Rolle – keine
              Sicherheitsgrenze.
            </p>
          </div>
        </section>
      )}

      {/* Seitenbausteine-Konvention (WP-020, Dok. 06 „Verbindliche Seitenbausteine"):
          ehrliche Benennung der Bausteine, die der Datenbestand hier (noch) nicht trägt. */}
      <SeitenbausteineHinweis ort="services" />
    </>
  );
}

/**
 * Ehrlicher Empty-State für Mandanten ohne Services (Finovia/MediCore, Dok. 06 §17).
 *
 * MANDANTENLOKAL (WP-020 Slice 1). Hier stand bis 2026-07-23: „Services laufen derzeit für
 * <Namen fremder Mandanten>; weitere Mandanten folgen in späteren Ausbaustufen." Das war eine
 * Existenzaussage über FREMDE Mandanten und damit eine Mandantengrenzverletzung (Dok. 07,
 * Abschnitt „Mandantenfähigkeit, Rechte und Datenschutz" / P09) – dieselbe Fehlerklasse, die
 * auf `/isms` (WP-013) und `/entscheidungen` (WP-017) bereits behoben wurde; dieses dritte
 * Vorkommen bestand seit WP-012 unbemerkt und wurde im Cross-Tenant-Umbau gefunden. Der
 * Leerzustand sagt jetzt ausschließlich etwas über DIESEN Mandanten; der Wächter
 * `components/__tests__/leerzustand-mandantengrenze.test.tsx` prüft das mechanisch.
 * (Die Portfolio-Übersicht der Consulting & Service World bleibt davon getrennt: eine
 * dokumentierte mandantenübergreifende Verdichtung, kein Leerzustand – O-WP012-03.)
 */
function EmptyServices({ tenant }: { tenant: DemoTenant }) {
  return (
    <div className="tw-empty" role="note">
      <h3>Keine Managed Services für {tenant.display_name}</h3>
      <p style={{ marginTop: 0 }}>
        Für <strong>{tenant.display_name}</strong> sind im aktuellen Demo-Datenbestand keine Managed
        Services modelliert. Der Ort bleibt erreichbar und zeigt hier ausschließlich, was für diesen
        Mandanten belegt ist.
      </p>
      <p className="tw-muted">
        Bewusst kein Platzhalter-Inhalt: hier erscheinen ausschließlich aus dem Demo-Datenbestand
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
