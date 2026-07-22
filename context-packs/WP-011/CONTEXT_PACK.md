# Context Pack – WP-011 App-Shell & Rollen-/Mandantenwechsel (Simulation)

## Ziel
Globale App-Shell in `apps/web` (acht Orte, Dok. 06) + synthetische Login-/Rollensimulation + Rollen-/
Mandantenwechsel; Twin Explorer eingebettet. KEINE echte Auth/DB.

## Verbindliche Prinzipien
- Dok. 06: Shell mit acht stabilen Orten (Heute, Kunden, ISMS, Entscheidungen, Services, Reports, Wissen,
  Administration); Seitenanatomie (5 Fragen); Zustände (Loading/Empty/Error); Entscheidung vor Navigation.
- `.claude/rules/frontend.md`: Zustände, Accessibility (main/Skip-Link/Headings/Fokus), responsiv, **keine
  fachliche/Authz-Logik nur im Client**.
- `.claude/rules/security.md` + Dok. 19: Rollen-/Mandantenwechsel ist hier reine **Simulation** und ausdrücklich
  KEINE Sicherheitsgrenze; echte serverseitige Authz kommt in einem späteren WP. Deutlich kennzeichnen.
- Nichts erfinden: Rollen aus Dok. 03 (R01–R12), Mandanten aus `@isms/demo-seed`.

## Pflichtquellen
- `docs/concept/active/06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md` (Shell/Orte/Seitenmuster/Zustände)
- `docs/concept/active/03_ZIELGRUPPEN_ROLLEN_ARBEITSSITUATIONEN_v1.0.md` (Rollenmodell R01–R12)
- `packages/demo-seed/` (`@isms/demo-seed`: Mandanten), WP-004-Explorer (`apps/web/app/twin/*`)

## Umsetzungshinweise (reversibel)
- Next.js App Router: eine Shell-Layout-Gruppe; Rollen-/Mandanten-Kontext als leichter Client-Context
  (Cookie/localStorage/State), sichtbar in der Topbar; `/login` als Auswahlseite (kein Passwort).
- Twin Explorer unter „Kunden"/„Zwilling" einhängen; übrige Orte als Platzhalterseiten mit klarer
  „kommt in Phase X"-Empty-Message (kein Fake-Inhalt).
- Render-Tests (Vitest + Testing Library): acht Nav-Orte, Rollen-/Mandantenwechsel sichtbar, Explorer erreichbar.

## Nicht im Context Pack
- Echte Auth/Session/Authz, DB-Anbindung, rollenvolle Erlebniswelten (eigene WPs je Rolle), Decision Center/Reporting.
