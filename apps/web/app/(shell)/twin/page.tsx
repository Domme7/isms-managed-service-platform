/**
 * Route `/twin` – Einstieg des Ortes „Kunden" (WP-004; sphärengerecht seit WP-028 Slice 4).
 *
 * Die Seite entscheidet nicht selbst: `KundenOrtView` liest die aktive Perspektive und zeigt
 * entweder das Mandanten-Portfolio (Betreiber-/Beraterrollen, Administrator, neutral) oder den
 * eigenen Mandanten (Kundenrollen, Auditor) – Belege in `lib/shell/sphaere.ts`, Quelle
 * Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile „Kunden".
 *
 * Daten kommen als statischer Import aus `@isms/demo-seed` (kein Client-Fetch). Weil die
 * Perspektive Client-Zustand ist, ist der Einstieg client-gerendert (Muster O-WP014-09).
 */
import { KundenOrtView } from '../../../components/twin/KundenOrtView';
import { getTenants } from '../../../lib/twin/data';

export const metadata = {
  title: 'Kunden – ISMS Managed Service Platform',
  description: 'Einstieg in die Mandanten und ihre digitalen Zwillinge (read-only).',
};

export default function KundenOrtPage() {
  return <KundenOrtView tenants={getTenants()} />;
}
