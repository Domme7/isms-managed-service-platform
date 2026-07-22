/** `/wissen` – Platzhalter des Ortes „Wissen" (Dok. 06 §4). */
import { PlaceholderPage } from '../../../components/shell/PlaceholderPage';
import { getPlace } from '../../../lib/shell/places';

export const metadata = { title: 'Wissen – ISMS Managed Service Platform' };

export default function WissenPage() {
  return <PlaceholderPage place={getPlace('wissen')} />;
}
