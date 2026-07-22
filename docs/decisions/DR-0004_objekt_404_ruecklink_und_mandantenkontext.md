# DR-0004 – Objekt-404-Rücklink und Mandantenkontext der Objekt-360-Seite

- Typ: Product / UX / Security
- Status: **Accepted (reversibel)**
- Datum: 2026-07-22
- Decision Owner: Orchestrator (technisch reversibel, keine Produktwahrheit); Security-Argument aus
  unabhängigem Review (`product-security-privacy`)
- Betroffen: `apps/web/app/(shell)/twin/[tenantId]/objekt/not-found.tsx`, WP-014

## Kontext

WP-014 (`work-packages/WP-014_OBJEKT_360_DETAILSEITE.md`, Slice 1) fordert für den bereichseigenen 404
einen „Rücklink auf die Mandantenseite". Geliefert wurde ein Rücklink auf `/twin` (Mandantenübersicht).

Technischer Grund: In Next 15 erhält `not-found.tsx` **keine** Route-Parameter. Eine Rekonstruktion der
`tenantId` erfordert `usePathname()` und damit eine Client-Komponente mit Router-Hook — die bestehenden
Twin-Komponenten sind bewusst hook-frei und ohne Router-Mocks testbar.

Der unabhängige Security-Review kam unabhängig davon zum Ergebnis, dass die gelieferte Variante die
**sicherere** ist: Ein Rücklink, der die `tenantId` aus dem Pfad rekonstruiert, gäbe auf der 404-Seite
einen Hinweis auf den angefragten Mandanten — die 404-Antwort soll aber für unbekannte und
mandantenfremde IDs vollständig identisch und ohne Existenzaussage sein (Dok. 07 §17).

## Entscheidung

1. Der 404-Rücklink der Objektseite zeigt auf `/twin`. Die Abweichung vom WP-Text ist **bewusst** und
   hier dokumentiert — keine stille Auflösung (`.claude/rules/docs.md`).
2. Die Objekt-360-Seite bleibt **parameter-gebunden** (`/twin/[tenantId]/…`) und erzwingt **nicht**,
   dass der Routen-Mandant dem aktiven Session-Mandanten entspricht. Grund: die Session-Simulation aus
   WP-011 ist ausdrücklich **keine** Autorisierung; `/twin` listet ohnehin alle Demo-Mandanten.
3. `PortfolioOverview` verlinkt weiterhin auf den Mandanten des jeweiligen Objekts
   (`entry.tenant.tenant_id`, Acceptance 10) und **nicht** auf den aktiven Mandanten.

## Folgen und Grenzen

- Aus Punkt 2 und 3 folgt eine sichtbare Divergenz: Nach einem Portfolio-Klick zeigt die Shell-Topbar
  weiter den aktiven Session-Mandanten, die Kontextzeile der Objektseite dagegen den Mandanten des
  Objekts. Das ist **keine** Sicherheitsgrenzverletzung (Demo-Perspektive, kein Authz), aber eine
  offene Produktfrage → **O-WP014-04** in `docs/project/OPEN_QUESTIONS.md`.
- Vor echter Authentisierung/Autorisierung (Dok. 19) muss entschieden werden, ob ein
  mandantenübergreifender Deep-Link erlaubt ist, unter welcher Berechtigung und mit welchem Audit
  Record. Bis dahin gilt diese Entscheidung nur für den synthetischen Demo-Scope.
- Beide Punkte sind reversibel und ohne Datenmigration änderbar.
