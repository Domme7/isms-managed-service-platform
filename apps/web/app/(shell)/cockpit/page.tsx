/**
 * `/cockpit` – modernes Cockpit und Startseite nach der Anmeldung (WP-025, DR-0010 Nr. 3).
 *
 * KEIN neuer Hauptnav-Ort (06-D01, acht Orte fix): Die Seite hängt unter „Heute" (Navigations-
 * Match in `lib/shell/places.ts`). Der Owner hat die moderne Dashboard-Sprache (Ampeln,
 * Deckungsringe, Warnungen, Lebenszyklus-Leiste) und das Cockpit als Einstieg freigegeben; die
 * A/B/C-Ansichten bleiben als dauerhafte Personalisierung (DR-0012 Stufe A). „Heute" ist die
 * ausführliche Tagesansicht dahinter und über den Cockpit-Link erreichbar.
 */
import { CockpitView } from '../../../components/cockpit/CockpitView';

export const metadata = {
  title: 'Cockpit – ISMS Managed Service Platform',
};

export default function CockpitPage() {
  return <CockpitView />;
}
