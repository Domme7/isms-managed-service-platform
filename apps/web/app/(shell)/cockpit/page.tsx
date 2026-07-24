/**
 * `/cockpit` – Bento-Mosaik-Cockpit und Startseite nach der Anmeldung (WP-034 Slice 2, DR-0016).
 *
 * KEIN neuer Hauptnav-Ort (06-D01, acht Orte fix): Die Seite hängt unter „Heute" (Navigations-
 * Match in `lib/shell/places.ts`). Der Owner hat aus zwei Design-Varianten „Variante A – Bento-
 * Mosaik" gewählt (DR-0016): kompaktes Grafik-Dashboard (Radar aus den vier Abdeckungen, Ampel-
 * Ringe, Zahlkacheln) mit „Eintauch"-Drilldown in die vollständige, selbsterklärende Kachel. Die
 * ausführliche A/B/C-Tagesansicht bleibt unter „Heute" erreichbar. Datenlogik wiederverwendet
 * (`buildHeuteDashboard`/`buildMissionControl`), „nichts nur Show" (DR-0008/DR-0014).
 */
import { CockpitBentoView } from '../../../components/cockpit/CockpitBentoView';

export const metadata = {
  title: 'Cockpit – ISMS Managed Service Platform',
};

export default function CockpitPage() {
  return <CockpitBentoView />;
}
