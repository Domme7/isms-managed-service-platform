# Active Work Package

> ## AUTONOMIE-AUFTRAG (Owner, 2026-07-23/24)
> „Bau das Produkt fertig, so weit es geht, ohne mich noch etwas zu fragen. Wenn doch etwas
> kommt, das eine Antwort bräuchte, mach einfach mit etwas anderem weiter." **Verbindlich:**
> autonom weiterbauen ohne Rückfragen; jede buildbare Arbeit umsetzen, verifizieren, committen,
> reviewen; der Stand ist **jederzeit** übernahmefähig (nach jedem Slice committen + pushen,
> Statusdateien mitziehen). **Nur diese harten Gates bleiben stehen** (nicht autonom
> überschreitbar, CLAUDE.md/Sicherheitsregeln): FINDING-0004 (DB-RLS vor DB→UI **und** vor echter
> Auth), **echte Authentisierung / getrennte Logins WP-030** (security-sensibel, Dok. 19),
> **CCP-001..004** (Konzept-/Contract-Freigaben), Contract-/Seed-**Struktur**-Erweiterungen (E-02),
> Docker, kostenpflichtige/Cloud/Prod-Ressourcen, reale Daten/Secrets, **Owner-Entscheidung Demo-
> Firmenliste (WP-021)**. Cockpit-Varianten werden **gebaut und vorgelegt** (Stilwahl bleibt Owner).

## Gerade in Arbeit

**WP-028 (Antwort-Modus, DR-0013) + WP-032 (Reports/Wissen/Administration) — in der Abnahme.**
- Beide **gebaut und committet**; alle acht Shell-Orte sind live.
- **Gate-Runde 1** (6 Fachgates): 5× Freigabe mit Auflagen, QA Nacharbeit. **Fix-Pass** (14
  Auflagen) fertig, axe komplett sauber, FINDING-0008 geschlossen.
- **Gate-Runde 2** fand fix-induzierte Regressionen (Seitenbausteine-Zeile verlor den Nenner,
  `STAND_HINWEIS` klassen-falsch bei `Wirksamkeitsprüfung`/`abgelehnt`, blinder Kontextleisten-
  Selektor, Reichweitensatz nennt nur 1 von 3 Wirkungen, zweite Security-Aussage ohne Wächter,
  „Portfolio-Arbeitswelt" erfundener Begriff). **Nachfix läuft** (frontend-engineer).
- **Danach:** Statusdateien final nachziehen, dann diese beiden WP als abgenommen markieren.

## Reihenfolge danach (buildbare Kette, autonom)

1. **Nachfix WP-028/032** verifizieren + committen → beide WP abgenommen.
2. **Kundenwelt Slice 2 (Servicekatalog) + Slice 3 (Struktur-Assistent)** — read-only aus PDF
   Dok. 14/16, preisfrei, keine Buchung; dann Gate-Runde. (`work-packages/WP-006_KUNDENWELT_STUFE_1.md`)
3. **2–3 Cockpit-Varianten** (WP-025-Kern) per `qa:visual` → **STOPP für visuelle Owner-Freigabe**.
4. **WP-033 Seed-Textpass** (nutzersichtbare Seed-Texte: Codes + „Demo/synthetisch" → Domänensprache;
   Scopes mit `display_name` — O-WP014-03; nur Text, keine Struktur/Contract).
5. **WP-029 kuratierte Personalisierung** · **WP-027 globale Suche** (Snippet-Leak-Schutz).

## Offene Owner-Gates (nicht autonom, blockieren nur ihren eigenen Zweig)

FINDING-0004 (RLS) → dann DB→UI · WP-030 echte Auth/getrennte Logins · CCP-001..004 + E-02 ·
WP-021 Demo-Firmenliste (Dok. 03 vier vs. Dok. 16 fünf Unternehmen — O-WP006-01) ·
O-WP028-02 (Kontextleisten-Disclosure) · O-WP028-08/10 (Familienname „Tenant", neutral-Portfolio).

## Nachweis / Übernahme

- Statuswahrheit: diese Datei + `CURRENT_STATE.md` + `WORK_QUEUE.md` + `handovers/LATEST.md`.
- Offene Fragen: `docs/project/OPEN_QUESTIONS.md` (O-WP020/028/032-Reihen).
- Review-Notizen: `docs/project/reviews/`. Screenshots + axe: `docs/project/visual/WP-028/`.
- Verifikation: `pnpm test --force`, `pnpm lint`, `pnpm typecheck`, `python scripts/validate_handoff.py`,
  `python scripts/treue_check.py` (Konzepttreue), `pnpm qa:visual <WP>` (Screenshots + axe).
