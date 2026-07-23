# FINDING-0005 – Kein Linter im Stack, aber Lint steht in den Acceptance Criteria

- **Severity:** Low (Prozess-/Konsistenzfehler, kein Produktfehler)
- **Status:** **Geschlossen 2026-07-23** — WP-018 hat Biome 2.5.5 eingeführt (ADR-0003); `pnpm lint` läuft über alle fünf Pakete und in CI vor Test/Build. Option 1 wurde gewählt.
- **Gefunden:** 2026-07-23, im Code-Review zu WP-016
- **Betroffen:** `package.json` (Root), `apps/web/package.json`, Acceptance Criteria mehrerer Work Packages

## Befund

Die Acceptance Criteria von WP-016 (AC 15) — und sinngemäß frühere WPs — verlangen
„Monorepo grün (**Lint**, Typecheck, Test, Build)". Ein `lint`-Skript existiert im Repository
jedoch **nicht**: weder das Root-`package.json` (`build`, `test`, `typecheck`, `dev`) noch
`apps/web/package.json` (`build`, `dev`, `start`, `typecheck`, `test`) kennen eines. Es ist auch
kein ESLint, Biome oder vergleichbares Werkzeug installiert.

Damit ist dieser Teil der Acceptance Criteria **nicht erfüllbar**. Bisher wurde er stillschweigend
übersprungen — genau das verbietet `.claude/rules/docs.md` („keine stille Widerspruchsauflösung").

## Warum das zählt

Typecheck fängt Typfehler, nicht Stilbrüche, ungenutzte Variablen, fehlende Hook-Abhängigkeiten,
`no-floating-promises` oder A11y-Regeln (`jsx-a11y`). Ein Teil der in WP-014 und WP-016 gefundenen
Punkte — tote Exporte, ungenutzte Felder, ein `aria-label` auf einem Element ohne Rolle — hätte ein
Linter mechanisch gemeldet, statt drei Reviewer-Runden zu kosten.

## Optionen (Entscheidung offen, Owner)

1. **Linter einführen** (eigenes kleines WP): ESLint mit `next/core-web-vitals` +
   `@typescript-eslint` + `jsx-a11y`, oder Biome (schneller, weniger Konfiguration). Kosten: einmalig
   Konfiguration plus vermutlich eine Runde Bestandsbereinigung.
2. **Lint bewusst aus den Acceptance Criteria streichen**, solange kein Linter existiert, und diesen
   Finding als Begründung verlinken.

Nicht akzeptabel ist der heutige Zustand: eine Anforderung, die in jedem WP steht und in keinem
geprüft wird.

## Umgang bis zur Entscheidung

Verifikation läuft weiter über `pnpm test` (frisch, ohne Turbo-Cache), `pnpm typecheck`, `pnpm build`
und `python scripts/validate_handoff.py`. In WP-016 wurde die Lint-Zeile **nicht** als erfüllt
abgehakt, sondern über diesen Finding ausgewiesen.
