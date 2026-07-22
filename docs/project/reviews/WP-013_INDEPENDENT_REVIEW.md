# WP-013 – Unabhängiger Review (Done Evidence)

**Gegenstand:** ISMS-Kern-Welt (read-only) — Ort „ISMS" mit Risiken (Threat-/Weakness-Herkunft),
Controls (Implementation, Requirement+Framework, Nachweis-Stand), Maßnahmen und Evidence.
**Builder:** Frontend-Engineer. **Reviewer (getrennt):** Code-Reviewer + Product-User-Lead.
**Datum:** 2026-07-22.

## Verdikte

- **Code-Review: FREIGABE MIT MINOR-FIXES** (keine Blocker/Major). Jede Kante einzeln gegen den Seed
  und die Contract-Registry verifiziert — Richtungstreue durchgehend korrekt (`outgoing`/`incoming`);
  Tenant-Isolation belastbar (Cross-Tenant-Auflösung konstruktiv unmöglich); kein Scoring; O-WP013-01
  sachlich korrekt dokumentiert statt konstruiert.
- **UX-Review: FREIGABE MIT MINOR-FIXES + MAJOR-Auflage.**

## MAJOR-1 (Auflage) — behoben

„Control · **Status: wirksam**" stand als stärkste Aussage der Seite ungerahmt: ein Lebenszyklus-Stand
(Dok. 05 §7) wurde wie ein Prüfergebnis präsentiert. Wir hatten nur die Gegenrichtung abgesichert
(„implementiert ist kein Wirksamkeitsnachweis"). **Fix:** Kartenkopf lautet jetzt
„Control · **Lebenszyklus-Stand**: wirksam" + Einordnung („kein Prüfergebnis; Design-/Betriebswirksamkeit
wird hier nicht bewertet; eine Wirksamkeitsprüfung ist nicht modelliert") **plus seitenweite Rahmung**,
die auch Status in Verweis-Zeilen abdeckt.

## Weitere Findings umgesetzt

- **Wirkungsannahme** wird als solche gekennzeichnet („Wirkungsannahme (nicht nachgewiesen): …").
- **Nachweise-Sektion:** Text an tatsächliches Verhalten angeglichen (typgefiltert; weitere
  Nachweisquellen erscheinen an der Control-Karte).
- **Datenlücke sichtbar gemacht:** Szenario/Schwachstelle/Risiko sind im Modell nicht direkt verknüpft —
  wird im Produkt benannt, „Kette" nicht mehr behauptet (O-WP013-01).
- **Sektions-Empty-States** ergänzt (bisher nur global).
- **Sprache (auch in der Services-Welt angeglichen, Konventionsentscheidung):** interne Entscheidungs-IDs
  aus dem Nutzertext entfernt; „Kante:"→„Beziehung:", „Assertion-Art"→„Herkunft der Aussage",
  „Kantenstatus"→„Prüfstand der Beziehung", „Demo-Seed"→„Demo-Datenbestand".
- **A11y:** `<details>`-Summaries tragen den Objektnamen visuell versteckt (vorher 6 namensgleiche Elemente).
- Empty-State nennt keine fremden Mandantennamen mehr; Betreiber-Rolle korrekt als Erbringer beschrieben.

## Bewusst offen (Backlog, nicht blockierend)

- Duplizierte Präsentationshelfer (`edgeNote`/`joinDe`/Session-Rahmen in 3 Orten) → Kandidat für
  gemeinsames `SessionGate`/`lib/ui`-Modul.
- Testlücken: Loading-Zustand, `CoveredNote`-Render, zweite `evidences`-Quelle, Fail-loud-Pfad.
- Kein Datenstand/Aktualität auf der Seite (Dok. 06 §6) — Shell-/Folge-Thema.
- Tenant-Filter ist client-seitig (zulässig für read-only/synthetisch; serverseitige Erzwingung ab
  DB→UI, siehe FINDING-0004).

## Unabhängige Verifikation (Orchestrator)

- `@isms/web` **77/77** grün; typecheck/build grün; Monorepo grün; `validate_handoff.py` OK.
- **Browser-QA bestanden:** Nordwerk zeigt die vollständige Ursache-Wirkungs-Darstellung in Klartext;
  Statustrennung und seitenweite Rahmung live verifiziert; Jargon/interne IDs nicht mehr im UI;
  Operator-Empty-State erklärt den Sonderfall korrekt.

## Ergebnis

**WP-013 angenommen (Done).** Drei Orte der Shell sind jetzt echt (Kunden/Zwilling, Services, ISMS);
die Ehrlichkeitsregeln aus Dok. 08 sind nicht nur eingehalten, sondern im Produkt erklärt.
