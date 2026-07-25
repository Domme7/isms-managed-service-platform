/**
 * Layout der Kunde-Welt-Route-Gruppe `(kunde)` (DR-0018 Stufe 3).
 *
 * Eigene, schlanke Welt OHNE Berater-Shell-Chrome: die Kopf-Navigation und die Sphärengrenze
 * bringt `KundeWeltShell` mit. Die enthaltenen Seiten (`/mein-dashboard`, `/meine-ablage`,
 * `/services-buchen`) behalten ihre Pfade – die Route-Gruppe ändert keine URL.
 */
import type { ReactNode } from 'react';
import { KundeWeltShell } from '../../components/kunde/KundeWeltShell';

export default function KundeLayout({ children }: { children: ReactNode }) {
  return <KundeWeltShell>{children}</KundeWeltShell>;
}
