/**
 * `/kunden` – Kunden-Startseite „verwalten" (WP-006 Slice 1, read-only).
 *
 * Neue Seite UNTER dem bestehenden Ort „Kunden" (Dok. 06, Abschnitt „Acht stabile Hauptorte":
 * „Kunden — Portfolio und Customer Workspaces — Für Kundenrollen ggf. direkt der eigene
 * Workspace"). KEIN neuer Navigations-Ort (06-D01): `NAV_PLACES` trägt den Ort „kunden" bereits,
 * dessen `match`-Präfix `/kunden` diese Route dem Ort zuordnet (`lib/shell/places.ts`).
 * Rollen-/Mandanten-abhängige Rahmung via `KundenStartView` (Session).
 */
import { KundenStartView } from '../../../components/kunden/KundenStartView';

export const metadata = { title: 'Kundenbereich – ISMS Managed Service Platform' };

export default function KundenStartPage() {
  return <KundenStartView />;
}
