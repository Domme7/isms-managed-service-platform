/**
 * `/services` – read-only Managed-Service-Sicht des Ortes „Services" (WP-012 Slice 2,
 * Dok. 06 §4/§7 S09). Rollen-/Mandanten-abhängige Rahmung via `ServicesView` (Session-Simulation).
 */
import { ServicesView } from '../../../components/services/ServicesView';

export const metadata = { title: 'Services – ISMS Managed Service Platform' };

export default function ServicesPage() {
  return <ServicesView />;
}
