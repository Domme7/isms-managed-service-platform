/**
 * `/wissen` – Ort „Wissen" (WP-032 Slice 3, read-only).
 *
 * Der letzte der acht stabilen Hauptorte (Dok. 06, Abschnitt „Acht stabile Hauptorte"), der
 * echten Inhalt bekommt: den Glossar des gemeinsamen Vokabulars. Kein Suchfeld, keine Vorlagen,
 * keine ausgedachten Empfehlungen – die drei Lücken werden auf der Seite benannt.
 */
import { WissenView } from '../../../components/wissen/WissenView';

export const metadata = { title: 'Wissen – ISMS Managed Service Platform' };

export default function WissenPage() {
  return <WissenView />;
}
