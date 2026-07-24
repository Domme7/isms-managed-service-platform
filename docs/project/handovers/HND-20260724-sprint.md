# Handover HND-20260724 — Produktkorrektur-Sprint (autonom)

## Auftrag (verbindlich)

**Autonomer Weiterbau ohne Rückfragen** (Owner). Jede buildbare Arbeit umsetzen, verifizieren,
committen, reviewen; Stand jederzeit übernahmefähig halten. Harte Owner-Gates (nicht autonom):
FINDING-0004/RLS → DB→UI, echte Auth WP-030, CCP-001..004 + E-02 (Contract-Struktur), Docker,
Kosten/Cloud/Prod, reale Daten, Demo-Firmenliste WP-021. Cockpit-Varianten bauen und vorlegen
(Stilwahl bleibt Owner). Details: `docs/project/ACTIVE_WORK_PACKAGE.md`.

## Wo das Projekt steht

- **Alle acht Shell-Orte sind live** (Heute · Kunden · ISMS · Entscheidungen · Services · Reports ·
  Wissen · Administration) + Objekt-360. Read-only, synthetisch.
- **Antwort-Modus (WP-028, DR-0013)** app-weit: Zahl/Stand zuerst, Lücke als ruhige Zeile; kein
  internes Vokabular, keine „synthetisch/Demo/Simulation"-Etiketten im UI (mechanisch bewacht);
  Sphäre an Rolle gekoppelt.
- **725 Tests grün** (web 686 · contracts 55 · demo-seed 54 · db 19 · api 2), lint + typecheck
  grün, **axe 0 Verstöße** über alle 15 qa:visual-Motive. **FINDING-0008 geschlossen.**
- **WP-024 Treue-Check** liefert `scripts/treue_check.py` (Konzepttreue maschinell prüfbar).

## Genauer nächster Schritt

**Der Nachfix nach Gate-Runde 2 von WP-028/WP-032 lief zuletzt** (frontend-engineer,
fix-induzierte Regressionen: Seitenbausteine-Nenner, `STAND_HINWEIS`-Klassenfehler, blinder
Kontextleisten-Selektor, Reichweitensatz, zweite Security-Aussage, „Portfolio-Arbeitswelt").
Wenn er fertig ist: `pnpm --filter @isms/web exec vitest run` + `pnpm lint` + `pnpm typecheck`,
committen, **WP-028 + WP-032 als abgenommen markieren**.

Danach die buildbare Kette (Reihenfolge in `ACTIVE_WORK_PACKAGE.md`):
1. **Kundenwelt Slice 2 (Servicekatalog) + Slice 3 (Struktur-Assistent)** — read-only Dok. 14/16,
   preisfrei, keine Buchung; `work-packages/WP-006_KUNDENWELT_STUFE_1.md`.
2. **2–3 Cockpit-Varianten** → **STOPP für visuelle Owner-Freigabe** (DR-0010).
3. **WP-033 Seed-Textpass**, **WP-029 Personalisierung**, **WP-027 Suche**.

## Repository / Verifikation

- Branch `main`; Remote `Domme7/isms-managed-service-platform` (privat). Alles gepusht.
- `pnpm test --force` · `pnpm lint` · `pnpm typecheck` · `python scripts/validate_handoff.py` ·
  `python scripts/treue_check.py` · `pnpm qa:visual <WP>` · Dev-Server `pnpm --filter @isms/web dev`.

## Do Not Repeat

Nicht das Produkt neu planen, nicht alle Konzeptdokumente laden. Regel Null gilt (alles am PDF
gegenlesen, `python scripts/pdf_text.py <nr>` mit `PYTHONUTF8=1`). Wächter über ihre **Pipeline**
beweisen, nicht nur über ihr Muster (zweimal war ein Wächter blind für genau seine Kernklasse).

## Human Gates / offene Fragen

`docs/project/OPEN_QUESTIONS.md` — Reihen O-WP020/028/032; CCP-001..004; O-WP006-01 (Demo-
Firmenliste Dok. 03 vs. 16); O-WP028-02/08/10/11/12.
