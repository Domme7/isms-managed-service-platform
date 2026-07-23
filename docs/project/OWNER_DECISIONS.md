# Offene Owner-Entscheidungen

**Zweck:** Die wenigen Fragen, bei denen die Antwort des Owners das Ergebnis wirklich verändert.
Höchstens fünf gleichzeitig. Alles andere wartet in `OPEN_QUESTIONS.md` und braucht ihn nicht.

**Regel:** Jede Karte nennt **Empfehlung** und **Default**. Der Default sagt, was ohne Antwort
passiert — es gibt also nie einen Stillstand, nur eine Richtung, die später teurer zu ändern ist.
Wer eine Karte schließt, trägt das Ergebnis als Decision Record ein und streicht sie hier.

---

## E-01 — Demo-Welt: erfundene Mandanten oder die im Konzept festgelegten?

**Worum es geht.** Dok. 05 §12 benennt **fünf** Demo-Unternehmen samt Ausgangslage und Produktstory:
Nordstern Bank AG, Mittelwerk Produktion GmbH, CloudMosaic Software SE, GesundPlus Klinikverbund,
EcoLogistik Gruppe. Dok. 03 §13.1 nennt **neun verbindliche Demo-Accounts** mit Namen. Dok. 07 §19
gibt Mindestgrößen je Mandant vor: 10 Geschäftsprozesse, 25–50 Assets, 8–15 Lieferanten, dazu
mindestens ein Datenkonflikt, eine veraltete Quelle und ein erklärbarer Trust-State.

Gebaut wurde etwas anderes: Nordwerk Manufacturing SE, Finovia, MediCore, Consulting Operator —
**erfunden**, mit 40 Objekten insgesamt statt 25–50 Assets *pro* Mandant. Ursache ist FINDING-0007:
diese Vorgaben standen nicht in der Markdown-Fassung, aus der gebaut wurde.

**Warum es zählt.** Der Seed ist die Grundlage von allem Gebauten. Je später umgestellt wird, desto
mehr Tests, Zähl-Erwartungen und Screenshots hängen daran. Er ist außerdem das, was du in einer
Demo tatsächlich zeigst.

| Option | Aufwand | Folge |
|---|---|---|
| **A — Konzeptkonform neu aufbauen** | groß (eigenes WP, Ripple durch demo-seed, db, web) | Demo-Story entspricht dem Konzept; die Mindestgrößen machen Konflikte und Trust-States erstmals zeigbar |
| B — Bestehende Mandanten behalten, nur vergrößern | mittel | Namen bleiben abweichend; Dok. 05 §12 bleibt dauerhaft unerfüllt |
| C — So lassen, als bewusste Abweichung dokumentieren | klein | ehrlich, aber die verbindliche Demo-Dramaturgie aus dem Konzept entfällt |

**Empfehlung: A**, aber **nicht sofort** — erst nach dem Nachziehen der Konzeptfassungen (sonst baut
man den Seed zweimal). Realistisch nach WP-017.

**Default ohne Antwort:** Ich baue WP-017 auf dem heutigen Seed fertig, ziehe dann die
Konzeptfassungen nach und lege dir A als Work Package vor, bevor ich es starte.

---

## E-02 — Objektvertrag um Frist, Aufwand, Kapazität und Priorität erweitern?

**Worum es geht.** Dok. 10 §5/§18 setzt diese Felder voraus (Morning Mission, Priorisierung,
Decision Cards). Der Objektvertrag (Dok. 07 §7) kennt **keines** davon — O-WP016-04. Ohne sie
bleiben **Morning Mission und Decision Center dauerhaft unbaubar**, also Dok. 10 als Ganzes.

**Warum es zählt.** Das ist eine **Contract-Änderung** — sie berührt Datenmodell, Migrationen und
alles Abgeleitete. Deshalb Human Gate.

| Option | Folge |
|---|---|
| **A — Contract erweitern** (Concept Author + ADR) | Dok. 10 wird baubar; einmaliger Migrationsaufwand |
| B — Felder außerhalb des Zwillings führen (eigenes Modul) | Zwilling bleibt schlank, aber zwei Wahrheiten über dieselbe Aufgabe |
| C — Vertagen | Dok. 10 bleibt blockiert; Phase 4 startet nicht |

**Empfehlung: A** — aber erst, wenn Dok. 10 im Original gegengelesen ist. Es ist gut möglich, dass
das PDF hier mehr hergibt als die Markdown-Fassung (bei Dok. 06/07 war es so).

**Default ohne Antwort:** Ich lese Dok. 10 und 11 im PDF gegen, schreibe daraus ein Change Proposal
mit konkretem Feldvorschlag — und warte damit auf dich, statt den Contract anzufassen.

---

## E-03 — Sichtbare Abnahme: Screenshots und Barrierefreiheit automatisch prüfen?

**Worum es geht.** In WP-014 **und** WP-016 steht „Nicht erbracht: Screenshots". Du hast das Produkt
bisher nie gesehen — außer wenn du selbst den Dev-Server startest. Die unabhängige Prozessprüfung
nennt das die **wichtigste Einzelmaßnahme für dich**: deine stärkste Fähigkeit ist Produkturteil auf
einem sichtbaren Bildschirm, und genau die bedient der Prozess nicht.

Vorschlag: Playwright + axe in CI; Screenshots je Work Package werden ins Repo gelegt
(`docs/project/visual/WP-0xx/`), Kontrast und Fokus werden gemessen statt behauptet.

**Warum es zählt.** Neue Abhängigkeit → ADR. Und es fängt Fehlerklassen, die alle bisherigen Tests
strukturell nicht sehen können — der WP-016-Renderfehler ist der Beleg.

**Empfehlung: ja**, zusammen mit dem Linter (FINDING-0005) in einem kleinen Werkzeug-WP.

**Default ohne Antwort:** Ich baue es. Es ist reversibel, kostet nichts außer Rechenzeit, und ohne
es bleibst du bei jeder Abnahme auf meine Prosa angewiesen.

---

## Was ich ohne dich entscheide

Damit die Liste kurz bleibt — diese Dinge führe ich selbstständig aus und dokumentiere sie:

- **Konzeptfassungen aus den PDFs nachziehen** (FINDING-0007). Keine Produktentscheidung, sondern
  eine Reparatur der Übertragung — DR-0006 deckt das ab.
- **Verlorene Anforderungen als Work Packages nachholen**, priorisiert nach Sicherheits- und
  Ehrlichkeitswirkung (Cross-Tenant-Schutz, „kritische Aktionen speichern die aktive Rolle mit",
  Trust-Layer-Pflichtfelder, verbindliche Seitenbausteine).
- **Offene Fragen neu bewerten**, die Artefakte der Ableitung sind (Kandidat: O-WP014-01).
- **Prozessautomatisierung** in kleinen Schritten: Statuskonsistenz (erledigt), Wächtertest gegen
  Prozessvokabular im Produkt, Zahlen aus dem Seed generieren, erschöpfende Label-Typen, PR-Flow.
- **Aufräumen**: Micro-Checkpoints abschaffen, `PROJECT_UNDERSTANDING.md` als historisch markieren,
  Regel-Redundanz auf eine Quelle reduzieren.

## Was weiterhin nie ohne dich passiert

Kostenpflichtige oder produktive Ressourcen · Cloud/Hosting · echte Daten oder Secrets ·
Contract-Änderungen · CCP-001/002/003 · FINDING-0004 (DB-RLS vor DB→UI) · alles, was nach außen wirkt.
