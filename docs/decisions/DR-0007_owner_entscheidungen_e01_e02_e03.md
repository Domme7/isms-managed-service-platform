# DR-0007 – Owner-Entscheidungen E-01, E-02, E-03

- Typ: Product / Prozess / Daten
- Status: **Accepted**
- Datum: 2026-07-23
- Decision Owner: **Human Product Owner** (Antwort in Session)
- Betroffen: `packages/demo-seed`, `packages/contracts`, CI/Tooling, Reihenfolge der Work Packages

## Kontext

Nach dem PDF-Abgleich (FINDING-0007) und der unabhängigen Prozessprüfung (FINDING-0006) lagen dem
Owner drei Karten in `docs/project/OWNER_DECISIONS.md` vor. Alle drei sind entschieden — jeweils
mit der Einschränkung, die auch empfohlen war.

## E-01 — Demo-Welt konzeptkonform neu aufbauen: **JA, aber erst nach dem Nachziehen der Konzeptfassungen**

> „Ja, aber erst nach dem Nachziehen der Konzeptfassungen"

**Was gilt.** Der Demo-Datenbestand wird auf die im Konzept festgelegte Welt umgestellt: fünf
namentliche Demo-Unternehmen (Dok. 05 §12), neun verbindliche Demo-Accounts (Dok. 03 §13.1) und
die Mindestgrößen je Mandant (Dok. 07 §19: 10 Geschäftsprozesse, 25–50 Assets, 8–15 Lieferanten,
mindestens ein Datenkonflikt, eine veraltete Quelle, ein erklärbarer Trust-State).

**Reihenfolge ist Teil der Entscheidung:** erst die Konzeptfassungen aus den PDFs korrigieren, dann
den Seed bauen. Sonst wird der Seed zweimal gebaut — einmal aus der verkürzten und einmal aus der
korrigierten Fassung.

**Bis dahin:** WP-017 wird auf dem heutigen Seed fertiggestellt. Das ist bewusst so, nicht aus
Nachlässigkeit: WP-017 baut Entscheidungen als Objekte, und diese Struktur bleibt beim Seed-Umbau
gültig, auch wenn die Mandanten andere Namen bekommen.

## E-02 — Objektvertrag um Frist, Aufwand, Kapazität und Priorität erweitern: **JA, aber erst nach Gegenlesen von Dok. 10 im PDF**

> „Ja, aber erst Dok. 10 im PDF gegenlesen — gut möglich, dass dort mehr steht"

**Das Gegenlesen hat sofort etwas ergeben.** Dok. 10 §9.1 nennt **14 Pflichtfelder** der Decision
Card, §9.2 definiert den Decision Record eigenständig:

> „Nach Freigabe wird die Karte zum unveränderbaren Decision Record. Korrekturen erfolgen als neue
> Version oder Nachtrag. Festgehalten werden **Option, Begründung, Freigabe, Bedingungen, erwartete
> Wirkung, Reviewtermin und spätere Ist-Wirkung**."

Das ist **präziser** als die Markdown-Fassung, aus der WP-017 gebaut wurde, und es betrifft das
laufende Work Package direkt: der Ehrlichkeitsblock muss den Feldabgleich gegen **diese** Liste
führen, nicht gegen die verkürzte.

**Was gilt.** Ein Change Proposal mit konkretem Feldvorschlag wird geschrieben — auf Basis der
PDF-Fassung von Dok. 10 **und** Dok. 11 (Aufgaben/Zusammenarbeit). Der Contract wird **nicht**
angefasst, bevor der Owner den Vorschlag freigegeben hat. Das bleibt ein Human Gate.

## E-03 — Sichtbare Abnahme (Screenshots + Barrierefreiheit) automatisch: **JA, wird gebaut**

> „Ich baue es. Reversibel, kostet nur Rechenzeit"

**Was gilt.** Playwright + axe werden eingeführt; Screenshots je Work Package werden ins Repository
gelegt, Kontrast und Fokus werden **gemessen** statt behauptet. Neue Abhängigkeit → eigener ADR.
Zusammen damit wird der fehlende Linter (FINDING-0005) geschlossen.

**Warum das zählt:** In WP-014 und WP-016 stand jeweils „Nicht erbracht: Screenshots". Der Owner hat
das Produkt bisher nie im Rahmen einer Abnahme gesehen — seine stärkste Fähigkeit (Produkturteil auf
einem sichtbaren Bildschirm) war die einzige, die der Prozess nicht bedient hat. Zusätzlich fängt es
Fehlerklassen, die alle bisherigen Tests strukturell nicht sehen können (WP-016-Renderfehler).

## Daraus folgende Reihenfolge

1. **WP-017 fertigstellen** (läuft) — inklusive des soeben aus dem PDF gewonnenen Feldabgleichs.
2. **WP-018 Werkzeuge** (E-03): Linter/Formatter, Playwright + axe, Screenshots je WP, ADR.
   Vorgezogen, weil alle folgenden Work Packages davon profitieren.
3. **WP-019 Konzeptfassungen nachziehen** (FINDING-0007) — beginnend mit Dok. 03, 04, 05, 06, 07.
4. **WP-020 Verlorene Anforderungen nachholen**, priorisiert nach Sicherheits- und
   Ehrlichkeitswirkung (Cross-Tenant-Schutz zuerst).
5. **WP-021 Demo-Welt konzeptkonform** (E-01) — erst jetzt, gemäß Owner-Vorgabe.
6. **Change Proposal Objektvertrag** (E-02) → Human Gate → danach ggf. Contract-WP.

## Folgen

- Der Seed bleibt bis WP-021 abweichend von Dok. 05 §12. Das ist eine **bewusste, terminierte**
  Abweichung, keine stille — sie steht hier und in `CURRENT_STATE.md`.
- WP-021 wird ein großes Work Package mit erheblichem Ripple (Counts in `demo-seed`, `db`, `web`,
  Screenshots, Storyline). Die Werkzeuge aus WP-018 senken genau diese Kosten — ein weiterer Grund
  für die Reihenfolge.
