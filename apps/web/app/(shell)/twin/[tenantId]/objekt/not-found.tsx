/**
 * Eigener 404 für Objekt-Detailseiten (WP-014), analog `twin/not-found.tsx`.
 * Rendert innerhalb des Shell-`main#inhalt`, daher hier nur der Inhalt.
 *
 * WICHTIG (Tenant-Isolation, Dok. 07 §17/P09): Dieser Text ist für eine unbekannte Objekt-ID
 * und für eine gültige Objekt-ID unter einem fremden Mandanten IDENTISCH. Es wird weder eine
 * Existenz bestätigt oder verneint noch ein Name, eine Anzahl oder ein Mandantenhinweis
 * ausgegeben.
 *
 * DESIGN-ENTSCHEIDUNG (reversibel): Der Rücklink zeigt auf die Mandantenübersicht `/twin` statt
 * direkt auf die Mandantenseite. Grund: `not-found.tsx` erhält in Next 15 keine Route-Params,
 * und die `tenantId` aus dem Pfad zu rekonstruieren würde einen Client-Hook (`usePathname`)
 * erfordern – die bestehenden Twin-Komponenten sind bewusst router-hook-frei und damit ohne
 * Router-Mocks testbar. Von der Übersicht ist der Mandant einen Klick entfernt.
 */
import Link from 'next/link';

export default function ObjectNotFound() {
  return (
    <>
      <p className="tw-eyebrow">Fehler 404</p>
      <h1>Objekt nicht gefunden</h1>
      <p className="tw-lead">
        Zu dieser Adresse gibt es in der synthetischen Demo-Welt kein Objekt. Möglicherweise ist der
        Link veraltet, falsch eingegeben oder er gehört zu einem anderen Mandanten.
      </p>
      <Link className="tw-back" href="/twin">
        ← Zur Mandantenübersicht
      </Link>
    </>
  );
}
