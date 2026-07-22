/**
 * `/isms` – read-only Risk & Control-Sicht des Ortes „ISMS" (WP-013 Slice 1,
 * Dok. 06 §4/§7 S06). Mandanten-abhängige Rahmung via `IsmsView` (Session-Simulation).
 */
import { IsmsView } from '../../../components/isms/IsmsView';

export const metadata = { title: 'ISMS – ISMS Managed Service Platform' };

export default function IsmsPage() {
  return <IsmsView />;
}
