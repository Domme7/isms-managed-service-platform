/**
 * `/meine-ablage` – Meine Ablage der Kunde-Welt (DR-0018 Stufe 3): Verwaltungsordner über die
 * echten Objekte des Kunden (Objektfamilien F01..F09). Inhalt = `KundeAblageContent`.
 */
import { KundeAblageView } from '../../../components/kunde/KundeSeiten';

export const metadata = { title: 'Meine Ablage – ISMS Managed Service Platform' };

export default function MeineAblagePage() {
  return <KundeAblageView />;
}
