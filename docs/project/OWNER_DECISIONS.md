# Offene Owner-Entscheidungen

**Zweck:** Die wenigen Fragen, bei denen die Antwort des Owners das Ergebnis wirklich verändert.
Höchstens fünf gleichzeitig. Alles andere wartet in `OPEN_QUESTIONS.md` und braucht ihn nicht.

**Regel:** Jede Karte nennt **Empfehlung** und **Default**. Der Default sagt, was ohne Antwort
passiert — es gibt also nie einen Stillstand, nur eine Richtung, die später teurer zu ändern ist.
Wer eine Karte schließt, trägt das Ergebnis als Decision Record ein und streicht sie hier.

---

## Aktuell offen: keine

Alle drei Karten wurden am **2026-07-23** entschieden — festgehalten in **DR-0007**:

| Karte | Entscheidung | Umsetzung |
|---|---|---|
| **E-01** Demo-Welt konzeptkonform aufbauen | **Ja**, aber **erst nach** dem Nachziehen der Konzeptfassungen | WP-021 (nach WP-019) |
| **E-02** Objektvertrag um Frist/Aufwand/Kapazität erweitern | **Ja**, aber **erst nach** Gegenlesen von Dok. 10 im PDF | Change Proposal → Human Gate → Contract-WP |
| **E-03** Sichtbare Abnahme (Screenshots + A11y automatisch) | **Ja**, wird gebaut | WP-018, zusammen mit dem Linter |

**Erstes Ergebnis des Gegenlesens (E-02):** Dok. 10 §9.2 definiert den Decision Record im PDF
eigenständig und präziser als die Markdown-Fassung — *Option, Begründung, Freigabe, Bedingungen,
erwartete Wirkung, Reviewtermin, spätere Ist-Wirkung*. Das fließt sofort in das laufende WP-017 ein.

Reihenfolge, die daraus folgt: **WP-017** (läuft) → **WP-018 Werkzeuge** → **WP-019 Konzeptfassungen
nachziehen** → **WP-020 verlorene Anforderungen** → **WP-021 Demo-Welt**.

---

## Wie diese Datei benutzt wird

Höchstens fünf Karten gleichzeitig. Jede nennt **Empfehlung** und **Default** — der Default sagt,
was ohne Antwort passiert. Es gibt also nie Stillstand, nur eine Richtung, die später teurer zu
ändern ist. Wer eine Karte schließt, trägt das Ergebnis als Decision Record ein und streicht sie hier.

Entschiedene Karten stehen im Decision Record, nicht mehr hier: **DR-0007** (E-01, E-02, E-03).

## Was ich ohne den Owner entscheide

- **Konzeptfassungen aus den PDFs nachziehen** (FINDING-0007) — Reparatur einer Übertragung, keine
  Produktentscheidung (DR-0006).
- **Verlorene Anforderungen als Work Packages nachholen**, priorisiert nach Sicherheits- und
  Ehrlichkeitswirkung.
- **Offene Fragen neu bewerten**, die Artefakte der Ableitung sind.
- **Prozessautomatisierung** in kleinen Schritten.
- **Aufräumen**: Micro-Checkpoints, `archive/PROJECT_UNDERSTANDING.md` als historisch markieren,
  Regel-Redundanz auf eine Quelle reduzieren.

## Was nie ohne den Owner passiert

Kostenpflichtige oder produktive Ressourcen · Cloud/Hosting · echte Daten oder Secrets ·
**Contract-Änderungen** · CCP-001/002/003 · FINDING-0004 (DB-RLS vor DB→UI) · alles mit Außenwirkung.
