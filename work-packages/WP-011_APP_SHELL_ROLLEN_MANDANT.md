# WP-011 – App-Shell, Navigation & Rollen-/Mandantenwechsel (Simulation)

## Identität
- **Phase:** 1 (Product Shell)
- **Priorität:** P1
- **Status:** Active
- **Risk Class:** Low (synthetische Simulation, keine echte Auth)
- **Builder:** Frontend-Engineer-Agent
- **Reviewer:** Code-Reviewer + Product-User-Lead (UX/Frontend-Regeln), read-only
- **Human Gates:** keiner (keine echte Auth/DB/Kosten; nur synthetische Demo-Navigation)

## Ziel
Eine globale App-Shell in `apps/web` gemäß Dok. 06: stabile Navigation über die **acht Orte**
(Heute, Kunden, ISMS, Entscheidungen, Services, Reports, Wissen, Administration), eine **lokale,
synthetische Login-/Rollensimulation** (feste Demo-Nutzer, KEINE echten Credentials) sowie
**Rollen- und Mandantenwechsel** (die vier Demo-Mandanten). Der bestehende Digital Twin Explorer
wird in die Shell integriert.

## Nicht-Ziele
- keine echte Authentisierung/Autorisierung, keine Passwörter/Tokens, keine DB-Anbindung,
- keine serverseitige Session/Sicherheitsentscheidung (reine Demo-Navigation; echte Authz später, Dok. 19),
- keine erfundenen Rollen/Orte — nur die in Dok. 03/06 benannten.

## Scope
1. **Shell-Layout** (`app/(shell)/layout.tsx` o. ä.): Topbar (Produktname, aktive Rolle + Mandant, Wechsler)
   + Seitennavigation der acht Orte; responsive; `main`-Landmark, Skip-Link, aktive-Route-Markierung.
2. **Rollen-/Mandanten-Kontext:** feste synthetische Nutzer/Rollen (Dok. 03 R01–R12, z. B. Executive,
   ISMS Manager, Berater/Managed Service Lead, Auditor, Admin) + die vier Demo-Mandanten aus `@isms/demo-seed`.
   Auswahl über einfachen Client-Context (z. B. Cookie/State) — **markiert als Simulation**, keine Authz.
3. **Login-Simulation** (`/login`): Auswahl „als Rolle X bei Mandant Y anmelden" aus fester Liste; kein Passwort.
4. **Integration:** Twin Explorer (WP-004) als Seite unter „Kunden"/„Zwilling" in die Shell einhängen.
5. **Zustände (Dok. 06/frontend.md):** sinnvoller Default, Empty/Not-Found, aktive-Rolle sichtbar, „ausgeloggt".
6. **Rollenabhängige Sicht (leicht):** Navigation/Startseite passt Betonung je Rolle an (gleiche Daten, andere Verdichtung) — nur andeutungsweise; die volle Erlebniswelt folgt je Rolle in eigenen WPs.

## Abhängigkeiten
- Dok. 06 (Shell/acht Orte/Seitenanatomie/Zustände), Dok. 03 (Rollenmodell R01–R12), `@isms/demo-seed` (Mandanten)
- WP-004 (Explorer), `.claude/rules/frontend.md`, `.claude/rules/security.md` (keine Client-Authz)
- `context-packs/WP-011/CONTEXT_PACK.md`

## Acceptance Criteria
1. Shell mit den acht Orten als Navigation; aktive Route markiert; responsiv + barrierearm (main/Skip-Link/Headings).
2. Login-Simulation: Rolle + Mandant wählbar (feste synthetische Liste, kein Passwort); Auswahl sichtbar in der Topbar; Wechsel jederzeit.
3. Twin Explorer ist innerhalb der Shell erreichbar.
4. **Deutlich als Simulation gekennzeichnet**; keine echte Auth/Authz-Logik, keine DB-Anbindung, nichts erfunden über Dok. 03/06 hinaus.
5. `pnpm --filter @isms/web build`/`typecheck` grün; Render-/Smoke-Tests grün; Monorepo grün; visuelle QA bestanden.
6. Unabhängiger Code- + UX-Review dokumentiert (Builder ≠ Reviewer).

## Stop Conditions
- Bedarf an echter Auth/Secrets/DB, irreversible/kostenpflichtige Aktion, Scope über „Shell + Rollen-/Mandanten-Simulation" hinaus.

## Done Evidence
- grüne Tests + CI, Screenshot/DOM-QA, Commit/Push, Checkpoint, Review-Notiz, Statusdateien.
