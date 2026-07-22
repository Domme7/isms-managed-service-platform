/** `/reports` – Platzhalter des Ortes „Reports" (Dok. 06 §4). */
import { PlaceholderPage } from '../../../components/shell/PlaceholderPage';
import { getPlace } from '../../../lib/shell/places';

export const metadata = { title: 'Reports – ISMS Managed Service Platform' };

export default function ReportsPage() {
  return <PlaceholderPage place={getPlace('reports')} />;
}
