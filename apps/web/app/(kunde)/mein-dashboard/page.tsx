/**
 * `/mein-dashboard` – Mein Dashboard der Kunde-Welt (DR-0018 Stufe 3): das ISMS-Cockpit des
 * Kunden auf einen Blick, eingebettet in den Kundenbereich. Inhalt = `CockpitModulContent`
 * (wiederverwendet, „nichts nur Show"), Rahmen aus dem `(kunde)`-Layout.
 */
import { KundeDashboardView } from '../../../components/kunde/KundeSeiten';

export const metadata = { title: 'Mein Dashboard – ISMS Managed Service Platform' };

export default function MeinDashboardPage() {
  return <KundeDashboardView />;
}
