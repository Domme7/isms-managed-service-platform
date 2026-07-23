'use client';

/**
 * „Heute" – Standard-Startpunkt / strategische Ebene 1 (WP-016 Slice 2, WP-020 Slice 3/4;
 * Dok. 06 §4/§7 S01, 06-D02).
 *
 * Sitzungs-/Zustandsrahmen analog `IsmsView`/`ServicesView`: Loading (vor Hydration), „nicht
 * angemeldet" mit Link zur Login-Simulation, sonst der Inhalt für die aktive Rolle und den
 * aktiven Mandanten. Der Inhalt liegt in `MissionControlContent` und ist damit ohne
 * Session-Mock testbar.
 *
 * DETAILTIEFE (WP-020 Slice 3, Dok. 06 „Detailtiefe": „Nutzer können eine bevorzugte Tiefe
 * speichern"): Diese View hält die gewählte Tiefe und persistiert sie unter dem VERSIONIERTEN
 * Schlüssel `DETAILTIEFE_STORAGE_KEY` (Muster `SESSION_STORAGE_KEY`; O-WP020-01 – Granularität
 * der Personalisierung ist konzeptseitig offen, hier: EINE Voreinstellung je Gerät).
 * Gespeichert wird AUSSCHLIESSLICH die Stufe („1" | „2" | „3") – mandanten- und rollenfrei,
 * damit beim Mandantenwechsel kein Zustand des alten Mandanten weiterlebt (Cross-Tenant-
 * Schutz; per Wächtertest in `leerzustand-mandantengrenze.test.tsx` belegt).
 *
 * INVARIANTE (Dok. 06 „Detailtiefe", letzter Satz: „sicherheitskritische Warnungen bleiben
 * jedoch immer sichtbar"): Im heutigen read-only-Produkt existiert KEINE sicherheitskritische
 * Warnung, die eine Tiefe unterdrücken könnte; Kontextleiste, Demo-Hinweis der Shell,
 * Ehrlichkeitsblock und Seitenbausteine-Hinweis rendern unabhängig von der Tiefe. Jedes
 * künftige WP, das sicherheitskritische Warnungen einführt, MUSS sie außerhalb der
 * Tiefensteuerung rendern (vollständige Invariante in `lib/heute/detailtiefe.ts`).
 *
 * Die Rollen-/Mandanten-Auswahl ist reine Demo-Perspektive – KEINE Authz, KEINE
 * Sicherheitsgrenze (`.claude/rules/frontend.md`, Dok. 19 folgt in einem späteren WP).
 *
 * BEWUSSTE DEMO-ENTSCHEIDUNG (übernommen aus WP-012 Code-Review MINOR-1, reversibel):
 * session-abhängig client-gerendert; dadurch landet der synthetische `DEMO_SEED` im
 * Client-Bundle – dieselbe dokumentierte Lage wie bei `/isms` und `/services` (O-WP014-09),
 * hier bewusst nicht verschärft. Für die Demo akzeptiert; spätere Alternative: Views
 * serverseitig ableiten (Muster `/twin`).
 */
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {
  DETAILTIEFE_STANDARD,
  DETAILTIEFE_STORAGE_KEY,
  parseDetailtiefe,
  serializeDetailtiefe,
  type Detailtiefe,
} from '../../lib/heute/detailtiefe';
import { useSession } from './SessionProvider';
import { MissionControlContent } from './MissionControlContent';

export function HeuteView() {
  const { resolved, hydrated } = useSession();

  // Standardtiefe 1: „Die erste Ebene bleibt ruhig" (Dok. 06 P06). Der gespeicherte Wert wird
  // nach dem Mount defensiv gelesen (`parseDetailtiefe`): ungültige/veraltete Werte fallen auf
  // die Standardtiefe, statt einen kaputten Zustand zu übernehmen (Muster `SessionProvider`).
  const [tiefe, setTiefe] = useState<Detailtiefe>(DETAILTIEFE_STANDARD);
  useEffect(() => {
    try {
      const gespeichert = parseDetailtiefe(window.localStorage.getItem(DETAILTIEFE_STORAGE_KEY));
      if (gespeichert !== null) setTiefe(gespeichert);
    } catch {
      // Speicher nicht verfügbar (z. B. privater Modus) – Standardtiefe bleibt.
    }
  }, []);

  const wechsleTiefe = useCallback((next: Detailtiefe) => {
    setTiefe(next);
    try {
      // Persistiert wird NUR die Stufe (mandanten-/rollenfrei, s. Kopfnotiz).
      window.localStorage.setItem(DETAILTIEFE_STORAGE_KEY, serializeDetailtiefe(next));
    } catch {
      // Speicher nicht verfügbar – die Wahl gilt dann nur für diese Sitzung.
    }
  }, []);

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Heute</p>
        <h1>Heute</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Heute</p>
        <h1>Heute</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>
            Nicht angemeldet (Simulation)
          </h2>
          {/* DR-0009-Stand (Review-Pass Code-Finding): angemeldet wird nur mit dem Mandanten,
              der Einstieg ist die neutrale Ebene 1 – keine Rollen-Voraussetzung behaupten. */}
          <p style={{ marginTop: 0 }}>
            Es ist kein Mandant gewählt. Melden Sie sich in der Simulation mit einem Mandanten an,
            um die neutrale strategische Ebene 1 zu sehen – die Rollenwahl ist danach optional in
            der Kopfleiste möglich.
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link className="tw-cta" href="/login">
              Zur Anmelde-Simulation →
            </Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <MissionControlContent
      role={resolved.role}
      tenant={resolved.tenant}
      tiefe={tiefe}
      onTiefeChange={wechsleTiefe}
    />
  );
}
