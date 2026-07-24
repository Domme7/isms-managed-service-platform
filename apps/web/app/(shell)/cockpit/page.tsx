/**
 * `/cockpit` – Vergleich der drei Cockpit-Start-Varianten (WP-025, DR-0010 Nr. 3).
 *
 * KEIN neuer Hauptnav-Ort (06-D01, acht Orte fix): Die Seite hängt unter „Heute" (Navigations-
 * Match in `lib/shell/places.ts`) und ist von dort verlinkt. Sie dient dem visuellen Owner-
 * Vergleich; danach hält der Sprint an (Owner wählt Variante/Hybrid, O-WP025-05).
 */
import { CockpitView } from '../../../components/cockpit/CockpitView';

export const metadata = {
  title: 'Cockpit – ISMS Managed Service Platform',
};

export default function CockpitPage() {
  return <CockpitView />;
}
