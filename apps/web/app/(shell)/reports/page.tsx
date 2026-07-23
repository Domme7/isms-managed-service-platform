/**
 * `/reports` – Ort „Reports" (WP-032 Slice 2, read-only).
 *
 * Der Ort ist einer der acht stabilen Hauptorte (Dok. 06, Abschnitt „Acht stabile Hauptorte")
 * und zeigt seit diesem Ausbauschritt echten Inhalt statt eines Platzhalters: die gezählte
 * Datengrundlage des aktiven Mandanten sowie die Berichts- und Präsentationsstruktur des
 * Produkts. Keine Berichtserzeugung, kein Export, keine Preise.
 */
import { ReportsView } from '../../../components/reports/ReportsView';

export const metadata = { title: 'Reports – ISMS Managed Service Platform' };

export default function ReportsPage() {
  return <ReportsView />;
}
