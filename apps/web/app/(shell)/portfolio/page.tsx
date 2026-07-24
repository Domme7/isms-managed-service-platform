/**
 * `/portfolio` – Berater-Portfolio-Dashboard: der Einstieg über ALLE Kunden (DR-0017 Stage 1).
 *
 * KEIN NAV_PLACES-Ort (Drill-only-IA, keine Sidebar-Reiter): die Seite ist eigenständig und ohne
 * Shell-Chrome (Bypass in `(shell)/layout.tsx`, Muster `/cockpit`). Von hier taucht der Berater in
 * das Cockpit eines Kunden ein. Datenlogik: `buildPortfolioDashboard` (`lib/portfolio/data.ts`),
 * „nichts nur Show" (DR-0008): jede Zelle ist erfasste Datenlage, kein Prüfergebnis.
 */
import { PortfolioView } from '../../../components/portfolio/PortfolioView';

export const metadata = {
  title: 'Portfolio – ISMS Managed Service Platform',
};

export default function PortfolioPage() {
  return <PortfolioView />;
}
