/**
 * `/services-buchen` – Services buchen der Kunde-Welt (DR-0018 Stufe 3): der Servicekatalog im
 * Kundenrahmen. Inhalt = `ServicekatalogContent` (wiederverwendet), Rahmen aus dem `(kunde)`-Layout.
 */
import { KundeServicesView } from '../../../components/kunde/KundeSeiten';

export const metadata = { title: 'Services buchen – ISMS Managed Service Platform' };

export default function ServicesBuchenPage() {
  return <KundeServicesView />;
}
