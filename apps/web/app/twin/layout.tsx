/**
 * Layout des Digital Twin Explorers (WP-004).
 *
 * Stellt den `main`-Landmark (`#inhalt`) und einen Skip-Link „Zum Inhalt springen" bereit
 * (Accessibility, frontend.md). Alle Twin-Seiten (Übersicht, Detail, 404) rendern innerhalb
 * dieses `main` – keine blanken `div`-Container mehr als oberste Ebene der Seiten.
 */
import type { ReactNode } from 'react';

export default function TwinLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="tw-skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <main id="inhalt" className="tw-container">
        {children}
      </main>
    </>
  );
}
