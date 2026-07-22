/** `/administration` – Platzhalter des Ortes „Administration" (Dok. 06 §4). */
import { PlaceholderPage } from '../../../components/shell/PlaceholderPage';
import { getPlace } from '../../../lib/shell/places';

export const metadata = { title: 'Administration – ISMS Managed Service Platform' };

export default function AdministrationPage() {
  return <PlaceholderPage place={getPlace('administration')} />;
}
