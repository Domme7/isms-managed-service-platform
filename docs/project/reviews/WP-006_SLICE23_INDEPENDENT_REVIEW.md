# WP-006 Slice 2+3 — Unabhängige Review-Notiz (Servicekatalog + Struktur-Assistent)

- **WP:** `work-packages/WP-006_KUNDENWELT_STUFE_1.md` (Slice 2 = Servicekatalog `/services/katalog`,
  Slice 3 = Struktur-Assistent `/kunden/struktur`), read-only aus Dok. 14/16, **vollständig preisfrei**.
- **Build-Commit:** `4f3d24b` · **Fix-Pass:** `fc37022` · **Runde-2-Verifikation:** siehe unten.
- **Builder ≠ Reviewer:** Bau durch `frontend-engineer`, Gates durch sechs unabhängige Reviewer-Rollen
  (Dok. 20B §36 / FINDING-0006). Orchestrator hat verifiziert und committet.
- **Testlage (unabhängig, frisch):** vitest `@isms/web` **756/756 grün** (44 Dateien), typecheck 7/7,
  lint clean, build ok; Diff ausschließlich `apps/web` (`packages/*` unverändert).

## Gate-Runde 1 (Commit 4f3d24b)

Sechs Gates parallel + adversariale Verifikation jedes materiellen Befunds.

| Gate | Reviewer | Votum | Kern |
|---|---|---|---|
| Code Quality | `code-reviewer` | **FREIGABE** | typsicher, Server/Client-Grenze korrekt, kein neuer Nav-Ort (06-D01); 1 minor (Leerzustand-Link), 1 nit |
| Product/User | `product-user-lead` | **FREIGABE** | „ansehen statt buchen" klar, sehr diszipliniert ehrlich; 2 minor, 2 nit |
| ISMS-Domäne | `isms-domain-lead` | **FREIGABE** | alle Kardinalitäten worttreu am PDF (SF01–12/SO01–15/L1–4/6 Pakete; 11/10/10/8/9/6/12/9/7); 1 nit (OL07-Delta) |
| QA | `qa-test-engineer` | **FREIGABE_MIT_AUFLAGEN** | 2 major (produktsprache-Coverage, OPEN_QUESTIONS-Materialisierung), beide adversarial als real/hoch verifiziert |
| Security & Privacy | `product-security-privacy` | **FREIGABE** | **Mandanten- UND Sphärengrenze eingehalten**, Preisfreiheit dicht, Negativbeweise nicht blind; 1 minor (Preisband-Robustheit), 1 nit |
| Konzepttreue | `concept-consistency-reviewer` | **FREIGABE_MIT_AUFLAGEN** | worttreu, nichts erfunden; 1 minor (OL07/16-D07-Delta benennen), 1 nit |

**Regelevolution O-WP006-08 (Wächter-Ausnahme „Exit Acceptance"): von allen sechs Gates BESTÄTIGT** —
enge, quellenbelegte Ausnahme (maskiert nur die exakte Zwei-Wort-Wendung, Negativbeweis, Meta-Test an
`LIFECYCLE_PHASEN[10].exitGate`), regel-erhaltend, dokumentiert (Muster O-WP020-12). **Kein Blocker.**

### Explizites Security-Urteil (Pflicht, Kundensphäre = Sicherheitsthema)
- **Mandantengrenze eingehalten:** jede Ableitung filtert hart auf `tenant_id`; neue Seiten rendern/verlinken
  ausschließlich den aktiven Mandanten; Leerzustände (Finovia/MediCore) machen **keine** Existenzaussage über
  fremde Mandanten (FINDING-0009-Klasse mechanisch geprüft).
- **Sphärengrenze eingehalten:** keine Portfolio-Aggregation, keine Betreiber-Inhalte (Auslastung/
  Profitabilität/Mandantenvergleich) — der Katalog zeigt auch für Betreiberrollen nur die aktiven Services
  des aktiven Mandanten.
- **Preisfreiheit:** kein Währungszeichen/Betrag/Band im gerenderten Text; Preisstellen nur als benannte Lücke.

## Fix-Pass (Commit fc37022) — die sechs Auflagen

| # | Auflage (Gate) | Umsetzung |
|---|---|---|
| A | **major (QA):** beide Seiten nicht unter `produktsprache`-Wächter; Assistent rendert DR-0011-Begriffe | Beide Seiten ins Register; MECHANISCHE Ausnahme `LIFECYCLE_KONZEPT_MASKEN = LIFECYCLE_PHASEN.map(p⇒p.ergebnisse).filter(…)` (nur worttreue Dok.-16-Zellen Phase 0/5); Negativbeweis (blanke Wörter bleiben verboten) + Meta-Test (Bindung an Konstante). Kein stilles Umschreiben → **O-WP006-09** (Owner-Frage DR-0011 vs. Regel Null, Muster O-WP032-11) |
| B | **major (QA):** O-WP006-08/09 nur als Code-Kommentar (AC18) | **O-WP006-01…10** in `docs/project/OPEN_QUESTIONS.md` materialisiert |
| — | minor (Code/Product): Leerzustand-Link Label ≠ Ziel | `href` → `/services/katalog` |
| — | minor (Product): Einladungstext „aufbauen" ≠ read-only | read-only-ehrlich umformuliert (DR-0008): „…verstehen, wie … aufgebaut wird … ohne etwas zu erfassen" |
| — | nit (Product): h2 „Kanonische Service Offers" = Modell-Jargon | UI-Überschrift → „Service Offers" (Offer-Namen/IDs + Quellkommentar worttreu) |
| — | minor (Security): Preis-Negativbeweis fängt währungslose Bänder nicht | `GELDBAND`-Muster in beiden Testdateien; „6-16 Wochen"/„einmalig" lösen es korrekt NICHT aus |
| — | nit (Security): Betreiber-Portfolio-Beweis nicht auf Assistent | R08-Variante ergänzt (alle drei neuen Seiten tragen den Beweis) |
| — | nit (Domain/Concept): OL07-vs-16-D07-Delta still aufgelöst | „kommerzielle Baseline" bewusst nicht übernommen (16-D07 bindend, preisfrei) — im Code benannt → **O-WP006-10** |
| — | nit (QA): Test-Name-Kardinalität unvollständig | Label auf 11/10/10/8/9/6/12/9/7/5 korrigiert |

## Gate-Runde 2 (Commit fc37022) — Regressionsjagd

Fünf Gates (Code/Product/QA/Security/Konzepttreue) auf dem Fix-Pass-Diff, Fokus auf die
`produktsprache`-Ausnahme (historischer Regressions-Hotspot). **Ergebnis: alle fünf FREIGABE,
`regressionGefunden: false`, `auflageKorrektGeloest: true`.** Die Ausnahme `LIFECYCLE_KONZEPT_MASKEN`
ist eng (maskiert nur die zwei exakten Dok.-16-Zell-Strings Phase 0/5), quellengebunden (Meta-Test an
`LIFECYCLE_PHASEN.ergebnisse`) und blindheitssicher (Negativbeweis über `ohneAusnahmen`, nicht nur an der
Regex); `GELDBAND` fängt währungslose Bänder ohne Fehlalarm auf reale Rhythmen; der Betreiber-Portfolio-
Beweis am Assistenten ist wirksam. Kein Wächter abgeschwächt. Nur **drei Nits** (nicht abnahmeblockierend):
- QA: die zwei neuen Portfolio-Beweise ohne eigenen `length>80`-Blindheitsschutz (defensive Konsistenz).
- Konzepttreue: Platzhalter `O-WP006-xx` in `struktur.ts` → `O-WP006-10` konkretisieren.
- Security: `GELDBAND` deckt nur Bindestrich/Halbgeviertstrich + ausgewählte Monats-Kadenzen (Robustheit).

**Die drei Nits werden mit dem nächsten `apps/web`-Touch (Cockpit-Merge) gefoldet** — sie berühren
dieselben Wächter-Dateien; ein separater Commit jetzt würde nur unnötige Merge-Divergenz erzeugen.

## Sichtbare Abnahme (qa:visual)

`pnpm qa:visual WP-006` (Kunden-Startseite voll/leer, Katalog, Assistent) + axe-Report unter
`docs/project/visual/WP-006/` — **gebündelt mit dem Cockpit-`qa:visual`-Lauf** (WP-025 baut das
Start-Erlebnis gerade um; ein gemeinsamer Lauf vermeidet doppeltes Bauen und liefert die Owner-Screenshots
konsolidiert für die visuelle Freigabe DR-0010 Nr. 3).

## Abnahme-Status

**WP-006 Slice 2+3 ist inhaltlich abgenommen** (Gate-Runde 1 + Fix-Pass + Gate-Runde 2 ohne Regression,
756 Tests grün, Diff nur `apps/web`). Offen für die formale „Done"-Markierung bleibt nur der gebündelte
`qa:visual`-Lauf (axe-Nachweis) — kein inhaltlicher Vorbehalt.

## Offene Fragen (registriert in `docs/project/OPEN_QUESTIONS.md`)

O-WP006-01 (Demo-Firmenlisten Dok.03 vs Dok.16), -02 (Katalog-Objekttypen fehlen), -03 (Kundenstart ohne
Redirect), -04 (Kundensphäre = Perspektive), -05 (Paket-Preisbandbreite), -06 (Sichten/Lenses), -07
(S02-Leitfrage), **-08 (Regelevolution Exit Acceptance — von allen Gates bestätigt)**, **-09 (produktsprache
DR-0011 vs. Regel Null — Owner)**, **-10 (OL07/16-D07 „kommerzielle Baseline" — Concept/Owner)**.

## Kommandoprotokoll

- `pnpm --filter @isms/web exec vitest run` → 756/756 (frisch)
- `pnpm typecheck` → 7/7 · `pnpm lint` → clean · `pnpm build` → ok
- `git diff --stat` je Commit: keine `packages/`-Pfade
- `python scripts/validate_handoff.py` → grün
