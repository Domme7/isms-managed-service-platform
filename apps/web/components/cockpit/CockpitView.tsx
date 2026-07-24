'use client';

/**
 * „Cockpit" – Vergleichsseite der drei Start-Varianten (WP-025, DR-0010 Nr. 3 / DR-0012 Stufe A).
 *
 * Sitzungs-/Zustandsrahmen analog `HeuteView`: Loading (vor Hydration), „nicht angemeldet" mit
 * Link zur Anmeldung, sonst der Varianten-Vergleich für die aktive Rolle und den aktiven
 * Mandanten. Der Inhalt liegt in `CockpitVariantenContent` und ist damit ohne Session-Mock
 * testbar.
 *
 * VARIANTEN-WAHL (DR-0012 Stufe A – kuratierte Personalisierung, EIN Andockpunkt): Diese View
 * hält die gewählte Variante und persistiert sie unter dem VERSIONIERTEN, MANDANTENFREIEN
 * Schlüssel `COCKPIT_STORAGE_KEY` (Muster `DETAILTIEFE_STORAGE_KEY`). Gespeichert wird
 * AUSSCHLIESSLICH die Kennung („a"|„b"|„c") – kein Mandanten-, Rollen- oder Objektbezug, damit
 * beim Mandantenwechsel kein Zustand des alten Mandanten weiterlebt (Cross-Tenant-Schutz). Der
 * volle Personalisierungs-Baukasten ist WP-029 (O-WP025-01), NICHT dieses Work Package.
 *
 * KEIN NEUER HAUPTNAV-ORT (06-D01): Die Route `/cockpit` hängt unter „Heute" (Navigations-Match
 * in `lib/shell/places.ts`); die Rollen-/Mandanten-Auswahl ist reine Demo-Perspektive, KEINE
 * Authz (`.claude/rules/frontend.md`, Dok. 19 folgt später).
 */
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {
  COCKPIT_STANDARD,
  COCKPIT_STORAGE_KEY,
  parseCockpitVariante,
  serializeCockpitVariante,
  type CockpitVarianteId,
} from '../../lib/cockpit/varianten';
import { useSession } from '../shell/SessionProvider';
import { CockpitVariantenContent } from './CockpitVariantenContent';

export function CockpitView() {
  const { resolved, hydrated } = useSession();

  // Standard-Variante A beim Erstkontakt; der gespeicherte Wert wird nach dem Mount defensiv
  // gelesen (`parseCockpitVariante`): ungültige/veraltete Werte fallen auf die Standard-Variante.
  const [variante, setVariante] = useState<CockpitVarianteId>(COCKPIT_STANDARD);
  useEffect(() => {
    try {
      const gespeichert = parseCockpitVariante(window.localStorage.getItem(COCKPIT_STORAGE_KEY));
      if (gespeichert !== null) setVariante(gespeichert);
    } catch {
      // Speicher nicht verfügbar (z. B. privater Modus) – Standard-Variante bleibt.
    }
  }, []);

  const wechsleVariante = useCallback((next: CockpitVarianteId) => {
    setVariante(next);
    try {
      // Persistiert wird NUR die Kennung (mandanten-/rollenfrei, s. Kopfnotiz).
      window.localStorage.setItem(COCKPIT_STORAGE_KEY, serializeCockpitVariante(next));
    } catch {
      // Speicher nicht verfügbar – die Wahl gilt dann nur für diese Sitzung.
    }
  }, []);

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Cockpit</p>
        <h1>Cockpit</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Cockpit</p>
        <h1>Cockpit</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Kein Mandant gewählt</h2>
          <p style={{ marginTop: 0 }}>
            Es ist kein Mandant gewählt. Wählen Sie einen Mandanten, um die Cockpit-Varianten zu
            vergleichen – die Rollenwahl ist danach optional in der Kopfleiste möglich.
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link className="tw-cta" href="/login">
              Zur Anmeldung →
            </Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <CockpitVariantenContent
      role={resolved.role}
      tenant={resolved.tenant}
      variante={variante}
      onVarianteChange={wechsleVariante}
    />
  );
}
