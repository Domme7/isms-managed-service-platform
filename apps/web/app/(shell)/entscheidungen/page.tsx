/** `/entscheidungen` – Platzhalter des Ortes „Entscheidungen" (Dok. 06 §4). */
import { PlaceholderPage } from '../../../components/shell/PlaceholderPage';
import { getPlace } from '../../../lib/shell/places';

export const metadata = { title: 'Entscheidungen – ISMS Managed Service Platform' };

export default function EntscheidungenPage() {
  return <PlaceholderPage place={getPlace('entscheidungen')} />;
}
