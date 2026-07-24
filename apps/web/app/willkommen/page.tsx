/**
 * `/willkommen` – Produkt-Landing vor der Anmeldung (DR-0015 Nr. 7 / DR-0014).
 *
 * Eigene, schlichte Seitenstruktur außerhalb der Shell-Gruppe (wie `/login`): eigenes `main`
 * plus Skip-Link. Der Inhalt ist rein präsentational (`WillkommenContent`), die Route selbst
 * hält nur die Landmark-Struktur. Der Einstieg `/` führt Nicht-Angemeldete hierher; von hier
 * führt der CTA zur Anmeldung.
 */
import { WillkommenContent } from '../../components/willkommen/WillkommenContent';

export const metadata = {
  title: 'Willkommen – ISMS Managed Service Platform',
};

export default function WillkommenPage() {
  return (
    <>
      <a className="tw-skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <main id="inhalt" className="wk-main">
        <WillkommenContent />
      </main>
    </>
  );
}
