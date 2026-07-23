/**
 * `/administration` – Ort „Administration" (WP-032 Slice 1, read-only).
 *
 * Der Ort ist einer der acht stabilen Hauptorte (Dok. 06, Abschnitt „Acht stabile Hauptorte")
 * und zeigt seit diesem Ausbauschritt echten, aus dem Bestand abgeleiteten Inhalt statt eines
 * Platzhalters: den Konfigurationsstand des aktiven Mandanten sowie das Rollen-, Rechte-,
 * Integrations- und Betriebsmodell als Struktur. Keine Schreibaktionen, keine durchgesetzten
 * Rechte, kein Sicherheitsurteil (`.claude/rules/security.md`).
 */
import { AdministrationView } from '../../../components/administration/AdministrationView';

export const metadata = { title: 'Administration – ISMS Managed Service Platform' };

export default function AdministrationPage() {
  return <AdministrationView />;
}
