'use client';

/**
 * Geteilter Dashboard-Rahmen der Bereiche (DR-0017 Stage 3).
 *
 * DR-0017 (Owner-akzeptiert), Pkt. 4 „eine durchgehende Sprache über das ganze Produkt": Wer aus
 * dem Cockpit in einen Bereich eintaucht, soll nicht in eine andere Formsprache fallen. Dieser
 * Rahmen trägt dieselbe Fläche/Farbwelt wie das Cockpit (`.ck-cockpit`) und übernimmt die dort
 * gewählte Hell/Dunkel-Stufe über den GETEILTEN Schlüssel (`lib/cockpit/theme.ts`) — er LIEST die
 * Wahl, der Umschalter selbst lebt im Cockpit.
 *
 * BEWUSST INHALTS-NEUTRAL (DR-0017 Pkt. 3 „bestehende Inhaltskomponenten wiederverwenden";
 * O-DR17-02 Default „Dive-Detail im selben Rahmen"): Der Rahmen legt NUR die Fläche. Kopf,
 * Leitfrage, Kontextleiste und die feinjustierte Antwort-Modus-/Ehrlichkeits-Rahmung (DR-0013)
 * bleiben in der jeweiligen Bereichs-Inhaltskomponente unverändert — so gewinnt ein Bereich die
 * Dashboard-Optik, ohne dass eine generische Hülle die per-Bereich-Nuancen einebnet.
 *
 * Rein präsentational: kein Session-Zugriff, keine Datenlogik. Die Themenwahl wird erst nach dem
 * Mount gelesen (SSR-sicherer Start in „hell"); ungültige/veraltete Werte fallen defensiv auf hell.
 */
import { useEffect, useState, type ReactNode } from 'react';

import { COCKPIT_THEME_KEY, type CockpitTheme, parseCockpitTheme } from '../../lib/cockpit/theme';

export function BereichRahmen({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<CockpitTheme>('hell');
  useEffect(() => {
    try {
      setTheme(parseCockpitTheme(window.localStorage.getItem(COCKPIT_THEME_KEY)));
    } catch {
      // Speicher nicht verfügbar (z. B. privater Modus) – Hell bleibt.
    }
  }, []);

  return (
    <div className="ck-cockpit ck-cockpit--bereich" data-ck-theme={theme}>
      {children}
    </div>
  );
}
