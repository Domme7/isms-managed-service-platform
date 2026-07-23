# DR-0006 – Die PDF-Originale sind die Produktwahrheit, das Markdown ist Arbeitskopie

- Typ: Product / Governance / Konzeptquellen
- Status: **Accepted**
- Datum: 2026-07-23
- Decision Owner: **Human Product Owner** („halte dich an die PDFs, lies sie durch, und mach das
  auch für zukünftige Chats zur Pflichtlektüre")
- Betroffen: `CLAUDE.md`, `docs/project/CONTINUATION_BRIEFING.md`, `docs/concept/`,
  alle künftigen Work Packages und Context Packs

## Kontext

Das Projekt behandelte bisher `docs/concept/active/*.md` als **verbindliche Produktwahrheit**
(`CLAUDE.md`, „Aktive Konzeptquellen"). Die 24 PDF-Originale unter `docs/concept/pdf/` galten als
Archiv. Aus dem Markdown wurden Datenverträge, Seed, Oberflächen und Acceptance Criteria abgeleitet.

Bei der ersten Stichprobe (Dok. 07, Abschnitt „Objekt-360 und Navigationsvertrag") zeigte sich, dass
die Markdown-Fassung **keine verlustfreie Wiedergabe** ist, sondern eine Interpretation:

| | Original-PDF | Markdown-Fassung |
|---|---|---|
| Rollenverdichtung | „Rollen erhalten unterschiedliche Verdichtung, aber dieselben Objekt-IDs und dieselbe Historie." | **fehlt vollständig** |
| Pflichtinhalte | „Identität und Kontext; Bedeutung und Zielbezug; Beziehungen und Abhängigkeiten; Ursache/Wirkung; Datenvertrauen; Historie und Versionen; Evidence/Dokumente; nächste sinnvolle Aktionen." | „Identität, Scope, Owner, **Kritikalität**, Beziehungen, Ursache/Wirkung, Datenvertrauen, Historie, Evidence und Aktionen." |
| Fünf Fragen | steht dort **nicht** | „Jede Objektseite beantwortet: Was ist das? …" |

Zwei Befunde daraus, beide mit gebauter Wirkung:

1. **Eine Anforderung ging verloren:** rollenabhängige Verdichtung auf der Objektseite. WP-014 hat
   sie nicht gebaut — nicht aus Entscheidung, sondern weil sie in der Arbeitsgrundlage fehlte.
2. **Eine Anforderung wurde hinzugefügt:** „Kritikalität" steht im Markdown, aber **nicht** im PDF.
   Daraus entstand die offene Frage **O-WP014-01** („Dok. 07 §10 fordert Kritikalität, der
   Objektvertrag kennt kein Feld") — eine Lücke, die es im Original gar nicht gibt.

Zusätzlich weicht die **Abschnittsnummerierung** ab: die PDF-Folientitel nummerieren „9. Objekt-360",
die Navigationsleiste desselben PDFs „10 Objekt-360". Das Markdown folgt der Navigationsleiste.
Alle Paragraphen-Zitate im Code und in den Work Packages beziehen sich auf die **Markdown**-Zählung.

## Entscheidung

1. **Die PDF-Originale unter `docs/concept/pdf/` sind die Produktwahrheit.** Bei jeder Abweichung
   zwischen PDF und Markdown gilt das PDF.
2. **Das Markdown bleibt die Arbeitsfassung** — durchsuchbar, zitierbar, versionierbar. Es wird
   **korrigiert**, wo der Abgleich Abweichungen zeigt, statt abgeschafft.
3. **Die PDFs sind Pflichtlektüre**, nicht Archiv. Wer eine Anforderung umsetzt, liest die
   betreffende Stelle **im PDF** gegen — mindestens für alles, was in ein Datenmodell, eine
   Acceptance Criterion oder eine Produktaussage einfließt.
4. **Zitierregel:** Verweise nennen die **Markdown-Zählung** (so ist der Bestand geschrieben) und bei
   Zweifel zusätzlich den Abschnittstitel — Titel sind eindeutig, Nummern nicht.
5. **Systematischer Abgleich aller 24 Dokumente** wird durchgeführt; jede gefundene Abweichung wird
   als Befund dokumentiert und das Markdown nachgezogen. Ergebnis: **FINDING-0007**.
6. **Bereits gebaute Artefakte werden gegen die Befunde geprüft**, nicht blind nachgezogen: jede
   Abweichung mit Bauwirkung wird einzeln bewertet und, wo nötig, als eigenes Work Package
   nachgeholt.

## Verhältnis zu DR-0005

DR-0005 regelt, was gilt, wenn der **Owner** im Konzept einen Fehler gemacht hat: benennen,
begründen, Besseres vorschlagen, Freigabe abwarten.

DR-0006 regelt einen anderen Fall: das Konzept ist richtig, aber die **Ableitung** hat es verfälscht.
Hier gibt es nichts vorzuschlagen — das Original gilt, die Ableitung wird korrigiert. Kein Human Gate
nötig, weil keine Produktentscheidung geändert wird, sondern eine Übertragung repariert.

## Folgen

- `docs/concept/MANIFEST.json` sichert bisher die Markdown-Hashes. Das bleibt sinnvoll (es erkennt
  unbemerkte Änderungen), sagt aber **nichts** über Treue zum PDF aus — diese Lücke ist mit diesem
  Dokument benannt.
- Die Beweislast dreht sich: eine Aussage, die **nur** im Markdown steht, ist ab sofort
  begründungspflichtig, nicht selbstverständlich.
- Für Text-Extraktion aus den PDFs ist `pypdf` verfügbar (Python); die extrahierten Textfassungen
  sind reproduzierbar und müssen nicht ins Repository.
