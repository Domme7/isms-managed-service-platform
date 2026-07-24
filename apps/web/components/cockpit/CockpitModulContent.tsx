'use client';

/**
 * Modulares Cockpit „ein Screen, alles per Eintauchen" (WP-034 Slice 3, DR-0016 Nachtrag 3).
 *
 * Der Owner will EIN kompaktes Grafik-Dashboard, in das man sich modular immer tiefer klickt
 * (Kachel → Bereich → Detail), statt einer langen Scroll-Seite mit gestapelten Blöcken. Diese
 * Komponente rendert den in `buildCockpitModul` abgeleiteten Baum: eine Wurzel voller
 * verschieden großer Grafik-Kacheln (Briefing-Hero, Radar, Ampel-Ringe/Meter, Zahlkacheln,
 * „offene Lücken", Lebenszyklus) und einen Pfad-Stack, der beliebig tief eintaucht — mit
 * wachsender Brotkrume, „zurück" pro Ebene und einer Eintauch-Animation (`prefers-reduced-motion`-fest).
 *
 * „NICHTS NUR SHOW" (DR-0008/DR-0014): Der Baum kommt ausschließlich aus echten Ableitungen
 * (`buildHeuteDashboard`/`buildCockpitRadar`/`buildCockpitWarnungen`/`buildCockpitLebenszyklus`);
 * kein Score, keine erfundene Bewertung; Farbe folgt der Ampel-Regel; jedes Blatt führt zur Quelle.
 * SPHÄRENGRENZE (DR-0012): nur der aktive Mandant. NEUTRAL-FÄHIG (DR-0009).
 */
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { DemoTenant } from '@isms/demo-seed';

import { buildCockpitModul, type ModulKachel, type ModulKnoten } from '../../lib/cockpit/module';
import {
  buildMissionControl,
  type MissionControlModel,
  type RecordingWave,
} from '../../lib/heute/data';
import { worldForRole, type DemoRole, type ExperienceWorld } from '../../lib/shell/roles';
import {
  kundenSicht,
  mandantenwechselSichtbar,
  rollenReichweiteSatz,
} from '../../lib/shell/sphaere';
import { CockpitLegende } from './CockpitLegende';
import { CockpitRadar } from './CockpitRadar';
import { CoverageRing } from './CoverageRing';
import { EmptyTenantKachel } from '../shell/DashboardKacheln';
import { PageContextBar } from '../shell/PageContextBar';
import { ScopeKontextWert } from '../shell/ScopeKontext';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

type CockpitTheme = 'hell' | 'dunkel';
const COCKPIT_THEME_KEY = 'isms-cockpit-theme-v1';

export function CockpitModulContent({
  role,
  tenant,
}: {
  role: DemoRole | null;
  tenant: DemoTenant;
}) {
  const [theme, setTheme] = useState<CockpitTheme>('hell');
  useEffect(() => {
    try {
      const gespeichert = window.localStorage.getItem(COCKPIT_THEME_KEY);
      if (gespeichert === 'hell' || gespeichert === 'dunkel') setTheme(gespeichert);
    } catch {
      // Speicher nicht verfügbar – Hell bleibt.
    }
  }, []);
  const wechsleTheme = () =>
    setTheme((prev) => {
      const next: CockpitTheme = prev === 'dunkel' ? 'hell' : 'dunkel';
      try {
        window.localStorage.setItem(COCKPIT_THEME_KEY, next);
      } catch {
        // Speicher nicht verfügbar – gilt nur für diese Sitzung.
      }
      return next;
    });

  const model = buildMissionControl(tenant.tenant_id);
  const baum = buildCockpitModul(tenant.tenant_id);
  const world = role ? worldForRole(role) : null;

  return (
    <div className="ck-cockpit" data-ck-theme={theme}>
      <div className="ck-kopf">
        <div>
          <p className="tw-eyebrow">Cockpit</p>
          <h1>Cockpit</h1>
        </div>
        <ThemeSchalter theme={theme} onToggle={wechsleTheme} />
      </div>

      <p className="tw-question">
        Wie steht {tenant.display_name} heute da – was ist erfasst und wo sind die Lücken?
      </p>

      {model && baum ? (
        <>
          <CockpitContextBar model={model} role={role} tenant={tenant} world={world} />
          <SphaerenNotiz role={role} />

          {baum.isEmpty && baum.emptyTile ? (
            <EmptyTenantKachel tile={baum.emptyTile} />
          ) : (
            <>
              <details className="ck-legende-fold">
                <summary>Was die Farben bedeuten</summary>
                <CockpitLegende />
              </details>
              <CockpitModulBuehne baum={baum} />
            </>
          )}

          <p className="ck-heute-link">
            <Link className="tw-cta" href="/heute">
              Zur ausführlichen Tagesansicht „Heute" →
            </Link>
          </p>
          <SeitenbausteineHinweis ort="cockpit" />
        </>
      ) : (
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>
            Mandant im Datenbestand nicht auflösbar
          </h2>
          <p style={{ marginTop: 0 }}>
            Zur aktiven Auswahl existiert im Datenbestand kein Mandant. Es wird bewusst kein
            Ersatzinhalt gezeigt.
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link className="tw-cta" href="/login">
              Zur Anmeldung →
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Eintauch-Bühne: Pfad-Stack (N Ebenen), Brotkrume, „zurück", Eintauch-Animation
 * --------------------------------------------------------------------------- */

function CockpitModulBuehne({ baum }: { baum: NonNullable<ReturnType<typeof buildCockpitModul>> }) {
  const [pfad, setPfad] = useState<string[]>([baum.wurzel]);
  const stageRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const letzterKachelId = useRef<string | null>(null);

  const aktuellId = pfad[pfad.length - 1] ?? baum.wurzel;
  const knoten: ModulKnoten = baum.knoten[aktuellId] ?? baum.knoten[baum.wurzel];
  const istWurzel = pfad.length <= 1;

  // Fokus wandert mit dem Eintauchen: rein → aufs Detail/den Bereich, zurück → auf die Kachel.
  useEffect(() => {
    if (!istWurzel) {
      detailRef.current?.focus();
    } else if (letzterKachelId.current) {
      stageRef.current
        ?.querySelector<HTMLElement>(`[data-kachel="${letzterKachelId.current}"]`)
        ?.focus();
    }
  }, [istWurzel]);

  const tauche = (kachel: ModulKachel) => {
    letzterKachelId.current = kachel.id;
    setPfad((p) => [...p, kachel.ziel]);
  };
  const zurueck = () => setPfad((p) => (p.length > 1 ? p.slice(0, -1) : p));
  const zuEbene = (i: number) => setPfad((p) => p.slice(0, i + 1));

  return (
    <div className="ck-modul" ref={stageRef}>
      <div className="ck-modul-bar">
        {istWurzel ? null : (
          <button type="button" className="ck-modul-back" onClick={zurueck}>
            <span aria-hidden="true">←</span> zurück
          </button>
        )}
        <nav className="ck-modul-crumb" aria-label="Pfad im Cockpit">
          {pfad.map((id, i) => {
            const titel = baum.knoten[id]?.titel ?? 'Detail';
            const last = i === pfad.length - 1;
            return (
              <span key={id}>
                {i > 0 ? (
                  <span className="ck-modul-sep" aria-hidden="true">
                    ›
                  </span>
                ) : null}
                {last ? (
                  <b>{titel}</b>
                ) : (
                  <button type="button" className="ck-modul-crumb-link" onClick={() => zuEbene(i)}>
                    {titel}
                  </button>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {knoten.intro ? <p className="ck-modul-intro">{knoten.intro}</p> : null}

      {knoten.detail ? (
        <section
          className="ck-modul-detail ck-modul-anim"
          ref={detailRef}
          tabIndex={-1}
          aria-label={`Detail: ${knoten.titel}`}
        >
          {knoten.detail.frage ? (
            <h2 className="ck-modul-detail-h">{knoten.detail.frage}</h2>
          ) : null}
          <dl className="ck-modul-kv">
            {knoten.detail.felder.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          {knoten.detail.links && knoten.detail.links.length > 0 ? (
            <ul className="ck-modul-links">
              {knoten.detail.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label} →</Link>
                </li>
              ))}
            </ul>
          ) : null}
          {knoten.detail.drilldown ? (
            <p className="ck-modul-quelle">
              <Link href={knoten.detail.drilldown.href}>{knoten.detail.drilldown.label} →</Link>
            </p>
          ) : null}
          {knoten.detail.hinweis ? (
            <p className="ck-modul-hinweis">{knoten.detail.hinweis}</p>
          ) : null}
        </section>
      ) : (
        <ul
          className={
            istWurzel
              ? 'ck-bento-grid ck-modul-anim'
              : 'ck-bento-grid ck-bento-grid--sub ck-modul-anim'
          }
          aria-label="Kacheln – zum Eintauchen wählbar"
        >
          {(knoten.kacheln ?? []).map((kachel) => (
            <li key={kachel.id} className={`ck-bz ck-bz--${kachel.groesse}`}>
              <button
                type="button"
                className={`ck-kachel ck-kachel--${kachel.kind} ck-status--${kachel.status}`}
                data-kachel={kachel.id}
                onClick={() => tauche(kachel)}
              >
                <KachelInhalt kachel={kachel} />
                <span className="ck-kachel-mehr" aria-hidden="true">
                  eintauchen →
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function KachelInhalt({ kachel }: { kachel: ModulKachel }) {
  const kopf = (
    <span className="ck-kachel-hd">
      <span className="ck-kachel-ic">
        <IconGlyph name={kachel.icon} />
      </span>
      <span className="ck-kachel-lab">{kachel.label}</span>
    </span>
  );

  if (kachel.kind === 'briefing' && kachel.briefing) {
    return (
      <>
        {kopf}
        <span className="ck-kachel-h">{kachel.briefing.headline}</span>
        <span className="ck-kachel-hero-p">
          Ehrliche Tageslage – jede Zahl aus dem erfassten Datenbestand.
        </span>
        <span className="ck-kachel-chips">
          {kachel.briefing.punkte.map((p) => (
            <span key={p.text} className={`ck-chip ck-status--${p.status}`}>
              <span className="ck-chip-dot" aria-hidden="true" />
              {p.text}
            </span>
          ))}
        </span>
      </>
    );
  }
  if (kachel.kind === 'radar' && kachel.radar) {
    return (
      <>
        {kopf}
        {kachel.sub ? <span className="ck-kachel-sub">{kachel.sub}</span> : null}
        <CockpitRadar radar={kachel.radar} />
      </>
    );
  }
  if (kachel.kind === 'ring' && kachel.total !== undefined) {
    return (
      <>
        {kopf}
        <span className="ck-kachel-ringrow">
          <CoverageRing covered={kachel.covered ?? 0} total={kachel.total} status={kachel.status} />
          <span className="ck-kachel-ringtext">
            {kachel.covered} von {kachel.total}
          </span>
        </span>
      </>
    );
  }
  if (kachel.kind === 'meter' && kachel.total !== undefined) {
    const anteil = kachel.total > 0 ? Math.round(((kachel.covered ?? 0) / kachel.total) * 100) : 0;
    return (
      <>
        {kopf}
        <span className="ck-kachel-foot">
          <span className="ck-kachel-num">
            {kachel.covered}
            <small> / {kachel.total}</small>
          </span>
          <span className="ck-kachel-meter" aria-hidden="true">
            <span style={{ width: `${anteil}%` }} />
          </span>
        </span>
      </>
    );
  }
  return (
    <>
      {kopf}
      <span className="ck-kachel-foot">
        <span className="ck-kachel-num">{kachel.wert}</span>
        {kachel.sub ? <span className="ck-kachel-sub">{kachel.sub}</span> : null}
      </span>
    </>
  );
}

/** Inline-SVG-Icons (dekorativ, aria-hidden) – selbst-enthalten, keine Font-Dependency. */
function IconGlyph({ name }: { name: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths(name)}
    </svg>
  );
}

function iconPaths(name: string) {
  switch (name) {
    case 'ti-news':
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </>
      );
    case 'ti-chart-dots':
      return (
        <>
          <path d="M4 5v15h16" />
          <circle cx="9" cy="14" r="1.4" />
          <circle cx="13" cy="10" r="1.4" />
          <circle cx="17" cy="13" r="1.4" />
        </>
      );
    case 'ti-shield-check':
      return (
        <>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6z" />
          <path d="M9 12l2 2 4-4" />
        </>
      );
    case 'ti-shield':
      return <path d="M12 3l7 3v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6z" />;
    case 'ti-alert-triangle':
      return (
        <>
          <path d="M12 4l9 15H3z" />
          <path d="M12 10v4M12 16.5h.01" />
        </>
      );
    case 'ti-alert-circle':
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4M12 15.5h.01" />
        </>
      );
    case 'ti-user-check':
      return (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M4 20c0-3 2.2-5 5-5 1.1 0 2.1.3 3 .9" />
          <path d="M15 13l2 2 3-3" />
        </>
      );
    case 'ti-link':
      return (
        <>
          <path d="M9 15l6-6" />
          <path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1" />
          <path d="M13 18l-1 1a4 4 0 0 1-6-6l1-1" />
        </>
      );
    case 'ti-box':
      return (
        <>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
          <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
        </>
      );
    case 'ti-server':
      return (
        <>
          <rect x="4" y="4" width="16" height="6" rx="1.5" />
          <rect x="4" y="14" width="16" height="6" rx="1.5" />
          <path d="M8 7h.01M8 17h.01" />
        </>
      );
    case 'ti-history':
      return (
        <>
          <path d="M4 12a8 8 0 1 0 2.3-5.6" />
          <path d="M4 4v3h3" />
          <path d="M12 8v4l3 2" />
        </>
      );
    case 'ti-database':
      return (
        <>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.6 3.1 3 7 3s7-1.4 7-3V6" />
          <path d="M5 12c0 1.6 3.1 3 7 3s7-1.4 7-3" />
        </>
      );
    case 'ti-file-check':
      return (
        <>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M9 15l2 2 4-4" />
        </>
      );
    case 'ti-target':
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" />
        </>
      );
    default:
      return <circle cx="12" cy="12" r="7" />;
  }
}

/* -----------------------------------------------------------------------------
 * Wiederkehrende Bausteine (wortgleich zur bisherigen Cockpit-Ansicht; DRY-Zusammenführung
 * mit den Alt-Komponenten ist O-WP034-04, sobald diese gelöscht sind)
 * --------------------------------------------------------------------------- */

function ThemeSchalter({ theme, onToggle }: { theme: CockpitTheme; onToggle: () => void }) {
  const dunkel = theme === 'dunkel';
  return (
    <button type="button" className="ck-theme-toggle" aria-pressed={dunkel} onClick={onToggle}>
      <span aria-hidden="true" className="ck-theme-icon">
        {dunkel ? '☾' : '☀'}
      </span>
      {dunkel ? 'Helles Design' : 'Dunkles Design'}
    </button>
  );
}

function CockpitContextBar({
  model,
  role,
  tenant,
  world,
}: {
  model: MissionControlModel;
  role: DemoRole | null;
  tenant: DemoTenant;
  world: ExperienceWorld | null;
}) {
  const waves = model.recordingWaves;
  const letzte: RecordingWave | undefined = waves.length > 0 ? waves[waves.length - 1] : undefined;
  const scopeIds: string[] = [];
  for (const wave of waves) {
    for (const scopeId of wave.scopeIds) if (!scopeIds.includes(scopeId)) scopeIds.push(scopeId);
  }
  return (
    <PageContextBar
      role={role}
      tenant={tenant}
      scopeLabel="Scopes dieses Mandanten"
      scopeValue={<ScopeKontextWert scopeIds={scopeIds} />}
      datenstandLabel="Datenstand (zuletzt im System erfasst)"
      datenstandValue={
        letzte ? (
          <time dateTime={letzte.recordedOn}>{letzte.dateDisplay}</time>
        ) : (
          'keine Erfassung im Datenbestand'
        )
      }
    >
      {world ? (
        <div>
          <dt>Erlebniswelt</dt>
          <dd>{world.name}</dd>
        </div>
      ) : null}
    </PageContextBar>
  );
}

function SphaerenNotiz({ role }: { role: DemoRole | null }) {
  const portfolio = kundenSicht(role) === 'portfolio';
  const wechsel = mandantenwechselSichtbar(role);
  const titel =
    role === null
      ? 'Grundform: Portfolio-Übersicht.'
      : portfolio
        ? 'Betreibersicht: Portfolio.'
        : 'Kundensicht: dieses eine Unternehmen.';
  return (
    <div className="ht-neutral" role="note">
      <p className="ht-neutral-text">
        <strong>{titel}</strong>{' '}
        {portfolio
          ? `Dieser Einstieg gehört zur Portfolio-Sphäre; ${
              wechsel
                ? 'ein Mandantenwechsel steht in der Kopfleiste bereit'
                : 'ein Mandantenwechsel ist hier nicht vorgesehen'
            }. Gezeigt wird ausschließlich der aktive Mandant.`
          : 'Dieser Einstieg zeigt ausschließlich den aktiven Mandanten – ohne mandantenübergreifende Portfolio-Übersicht und ohne Mandantenwechsel in der Kopfleiste.'}{' '}
        {rollenReichweiteSatz(role)}
      </p>
    </div>
  );
}
