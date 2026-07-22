# WP-011 – Unabhängiger Review (Done Evidence)

**Gegenstand:** App-Shell + Rollen-/Mandanten-Simulation in `apps/web` (acht Orte, Login-Simulation,
eingebetteter Twin Explorer). **Builder:** Frontend-Engineer-Agent. **Reviewer (getrennt):** Code-Reviewer +
Product-User-Lead. **Datum:** 2026-07-22.

## Verdikte

- **Code-Review: FREIGABE** (keine Bedingungen). Concept-faithful, security-honest, gut getestet: defensive
  Session-Auflösung, korrekte Next-15-Muster (Client-Layout mit durchgereichten Server-Children,
  `generateStaticParams` intakt, Route-Gruppe ohne URL-Änderung), Rollen R01–R12 & acht Orte wörtlich aus
  Dok. 03/06, dreifach redundante Demo-/Sicherheits-Kennzeichnung.
- **UX/Produktregel-Review: FREIGABE MIT MINOR-FIXES.** Ehrlichkeit vorbildlich (kein Fake/Dark Pattern),
  acht Orte korrekt, aktive Route nicht nur über Farbe, ehrliche Platzhalter.

## Findings umgesetzt (vor Done)

- **M1** (beide): globales gebrandetes deutsches 404 `apps/web/app/not-found.tsx` ergänzt.
- **M2** (UX): „bald"-Status in der Navigation auch für Assistive Tech (`.shell-visually-hidden`
  „(noch nicht verfügbar)"; visuelles Badge bleibt `aria-hidden`) — Dok. 06 06-D11.
- **Code-Nit:** `SessionProvider.signIn` validiert die Auswahl jetzt defensiv via `resolveSession`.

## Bewusst offen (Nits, optional; nicht blockierend)

- Topbar-Rollenoption zeigt „R01 · …" (Code vor Name); redundante Select-Labels; mehrere `role="radiogroup"`
  über einer nativen Radiogruppe; JS-abhängiger `/`-Redirect (mit No-JS-Fallback). Für Folge-Slices notiert.
- Error/Conflict/Success-States (`frontend.md`) sind mangels Datenmutation hier nicht anwendbar → in Daten-WPs nachziehen.

## Unabhängige Verifikation (Orchestrator)

- **Visuelle Browser-QA bestanden** (gerenderter DOM): `/login` (Demo-Hinweis, R01–R12 nach Welt gruppiert,
  4 Mandanten), Shell `/heute` (Rolle+Mandant im Kontext, rollenspezifische Leitfrage, ehrlicher Platzhalter),
  Topbar mit Rollen-/Mandanten-Wechsler + Abmelden, **acht Nav-Orte**, eingebetteter Twin Explorer.
- Frisch: `@isms/web` **36/36**; typecheck grün; build grün (17 statische Routen inkl. globalem 404);
  Monorepo grün; `validate_handoff.py` OK.

## Ergebnis

**WP-011 angenommen (Done).** Globale Shell, synthetische Login-/Rollensimulation und Mandantenwechsel
funktionieren im Browser; klar als Demo gekennzeichnet, keine echte Auth/DB; Builder ≠ Reviewer eingehalten.
