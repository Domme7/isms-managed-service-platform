/**
 * `/services/katalog` – Servicekatalog ansehen (WP-006 Slice 2, read-only, preisfrei).
 *
 * Neue Unterroute UNTER dem bestehenden Ort „Services" (Dok. 06, Abschnitt „Acht stabile
 * Hauptorte": Services trägt „Katalog, aktive Services, …" in der Inhaltsbeschreibung). KEIN
 * neuer Navigations-Ort (06-D01): das `match`-Präfix `/services` in `lib/shell/places.ts` ordnet
 * diese Route dem Ort „Services" zu. Rollen-/Mandanten-abhängige Rahmung via `ServicekatalogView`.
 */
import { ServicekatalogView } from '../../../../components/services/ServicekatalogView';

export const metadata = { title: 'Servicekatalog – ISMS Managed Service Platform' };

export default function ServicekatalogPage() {
  return <ServicekatalogView />;
}
