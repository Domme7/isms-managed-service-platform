/** `/services` – Platzhalter des Ortes „Services" (Dok. 06 §4). */
import { PlaceholderPage } from '../../../components/shell/PlaceholderPage';
import { getPlace } from '../../../lib/shell/places';

export const metadata = { title: 'Services – ISMS Managed Service Platform' };

export default function ServicesPage() {
  return <PlaceholderPage place={getPlace('services')} />;
}
