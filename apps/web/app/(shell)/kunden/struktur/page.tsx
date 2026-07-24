/**
 * `/kunden/struktur` – Struktur-Assistent (WP-006 Slice 3, geführte Read-Ansicht, keine Erfassung).
 *
 * Neue Unterroute UNTER dem bestehenden Ort „Kunden" (Dok. 06, Abschnitt „Acht stabile
 * Hauptorte"). KEIN neuer Navigations-Ort (06-D01): das `match`-Präfix `/kunden` in
 * `lib/shell/places.ts` ordnet diese Route dem Ort „Kunden" zu. Erreichbar aus dem Kundenbereich
 * (insbesondere aus dessen Leerzustand). Rollen-/Mandanten-abhängige Rahmung via
 * `StrukturAssistentView` (nur Kontextleiste – der Assistent erfasst nichts).
 */
import { StrukturAssistentView } from '../../../../components/kunden/StrukturAssistentView';

export const metadata = { title: 'Struktur-Assistent – ISMS Managed Service Platform' };

export default function StrukturAssistentPage() {
  return <StrukturAssistentView />;
}
