# FINDING-0007 – Die Markdown-Ableitung der Konzeptdokumente ist nicht verlustfrei

- **Severity:** **Hoch** — betrifft die Grundlage, aus der Datenverträge, Seed, Oberflächen und
  Acceptance Criteria abgeleitet wurden
- **Status:** **Teilweise behoben (2026-07-23):** Die fünf schwerwiegend abweichenden Dok. 03–07
  sind per WP-019 vollständig aus den PDFs neu abgeleitet und je Dokument unabhängig gegen den
  PDF-Text freigegeben (Nachtrag: `docs/concept/abgleich/NACHTRAG_WP-019_2026-07-23.md`).
  **Offen:** die 14 material abweichenden Dokumente (Folge-WP) und der automatische Treue-Check
  (O-WP019-01).
  **Korrektur am eigenen Beispiel:** „Kritikalität" steht doch im PDF von Dok. 07 — in der
  **Abbildung** der Objekt-360-Folie (visuell verifiziert), nicht im Textlayer. O-WP014-01 bleibt
  damit eine echte Konzeptlücke. Lehre: Text-Extraktion ist nicht das ganze PDF.
- **Gefunden:** 2026-07-23, auf Anweisung des Owners, sich an die PDFs zu halten
- **Betroffen:** `docs/concept/active/*.md`, alle Work Packages seit WP-003, `@isms/contracts`,
  `@isms/demo-seed`, `apps/web`, `docs/project/OPEN_QUESTIONS.md`
- **Entscheidungsgrundlage:** **DR-0006** (PDFs sind die Produktwahrheit)

## Befund

Die Markdown-Dateien unter `docs/concept/active/` galten bisher als verbindliche Produktwahrheit.
Sie sind jedoch **keine verlustfreie Wiedergabe** der PDF-Originale, sondern eine Interpretation —
mit Auslassungen **und** Hinzufügungen. Nachgewiesen an Dok. 07, Abschnitt „Objekt-360 und
Navigationsvertrag":

**Verloren gegangen:**

> „Rollen erhalten unterschiedliche Verdichtung, aber dieselben Objekt-IDs und dieselbe Historie."

Dieser Satz fehlt im Markdown vollständig. Er ist eine **verbindliche Anforderung** an die
Objektseite. WP-014 hat sie nicht umgesetzt — nicht als Entscheidung, sondern weil sie in der
Arbeitsgrundlage nicht vorkam.

**Hinzugefügt:**

| PDF (Pflichtinhalte Objekt-360) | Markdown |
|---|---|
| Identität und Kontext; Bedeutung und Zielbezug; Beziehungen und Abhängigkeiten; Ursache/Wirkung; Datenvertrauen; Historie und Versionen; Evidence/Dokumente; nächste sinnvolle Aktionen | Identität, Scope, Owner, **Kritikalität**, Beziehungen, Ursache/Wirkung, Datenvertrauen, Historie, Evidence und Aktionen |

„Kritikalität" steht **nicht** im PDF. Aus dieser hinzugefügten Anforderung entstand die offene
Frage **O-WP014-01** („Dok. 07 §10 fordert Kritikalität als Pflichtinhalt, der Objektvertrag kennt
kein Feld") — eine Lücke, die es im Original gar nicht gibt. Ebenso stammen die „fünf Fragen" an
dieser Stelle nicht aus Dok. 07, sondern aus Dok. 06 §6; das Markdown hat sie hierher übertragen.

**Nummerierung:** Im PDF nummerieren die Folientitel „9. Objekt-360", die Navigationsleiste
desselben PDFs „10 Objekt-360". Das Markdown folgt der Navigationsleiste. Alle Paragraphen-Zitate
in Code, Work Packages und Findings beziehen sich auf die Markdown-Zählung — beim Gegenlesen im PDF
ist deshalb der **Abschnittstitel** maßgeblich, nicht die Nummer.

## Warum das schwer wiegt

Das Projekt hat eine sehr strenge Regel — „aus dem Konzept ableiten, nie erfinden" — konsequent
befolgt und dabei über dreißig Konzeptlücken sauber dokumentiert statt geraten. Diese Disziplin
hilft nichts, wenn die **Quelle selbst** bereits eine ungeprüfte Interpretation war. Die Prüfkette
war lückenhaft an genau der Stelle, an der sie niemand geprüft hat.

`docs/concept/MANIFEST.json` sichert Markdown-Hashes und erkennt unbemerkte Änderungen — es sagt
aber **nichts** über die Treue zum PDF aus.

## Laufende Maßnahme

Systematischer Abgleich aller 24 Dokumente (PDF-Text gegen Markdown), je Dokument ein unabhängiger
Prüfer, mit strukturiertem Ergebnis: was fehlt, was wurde hinzugefügt, wie ist die Nummerierung,
und welche gebauten Artefakte hängen daran.

## Danach zu tun

1. Markdown-Fassungen an den gefundenen Stellen **korrigieren** (kein Human Gate nötig — es wird
   keine Produktentscheidung geändert, sondern eine Übertragung repariert, DR-0006).
2. **Offene Fragen neu bewerten:** solche, die aus einer *hinzugefügten* Markdown-Aussage entstanden
   sind, entfallen (Kandidat: O-WP014-01).
3. **Verlorene Anforderungen als Work Packages nachholen** — nicht stillschweigend nachbauen
   (Kandidat: rollenabhängige Verdichtung der Objektseite).
4. Prüfen, ob ein automatisierter Treue-Check sinnvoll ist (z. B. Abschnittstitel-Abgleich in
   `validate_handoff.py`), damit dieser Fehler nicht erneut unbemerkt entsteht.
