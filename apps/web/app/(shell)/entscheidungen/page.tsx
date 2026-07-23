/**
 * `/entscheidungen` – read-only Entscheidungsregister des Ortes „Entscheidungen"
 * (WP-017 Slice 2, Dok. 06 §4/§7 S03). Mandanten-/rollenabhängige Rahmung via
 * `EntscheidungenView` (Session-Simulation).
 */
import { EntscheidungenView } from '../../../components/entscheidungen/EntscheidungenView';

export const metadata = { title: 'Entscheidungen – ISMS Managed Service Platform' };

export default function EntscheidungenPage() {
  return <EntscheidungenView />;
}
