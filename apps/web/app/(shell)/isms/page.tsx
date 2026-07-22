/** `/isms` – Platzhalter des Ortes „ISMS" (Dok. 06 §4). */
import { PlaceholderPage } from '../../../components/shell/PlaceholderPage';
import { getPlace } from '../../../lib/shell/places';

export const metadata = { title: 'ISMS – ISMS Managed Service Platform' };

export default function IsmsPage() {
  return <PlaceholderPage place={getPlace('isms')} />;
}
