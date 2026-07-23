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

## Nachtrag 2026-07-23: Die PDFs selbst sagen etwas anderes

Beim Bau von WP-017 fiel auf — und wurde am PDF verifiziert — dass die Deckblatt-Metadaten der
Konzeptdokumente **dieser Entscheidung widersprechen**. Dokument 07 sagt wörtlich:

> „Quelle der Wahrheit: **Markdown-Datei 07 im Repository**; PDF/DOCX sind geprüfte Lesefassungen."

Das ist kein Detail: Der Owner hat in den Dokumenten selbst ein Governance-Modell festgelegt, in dem
das **Markdown** die Wahrheit ist. Es wird hier nicht stillschweigend übergangen.

**Warum DR-0006 trotzdem gilt — und was daran vorläufig ist:**

1. Das Modell im PDF beruht auf einer **Voraussetzung**, die nachweislich nicht erfüllt ist: dass
   PDF und Markdown denselben Inhalt tragen („geprüfte Lesefassungen"). Der Abgleich vom 2026-07-23
   widerlegt das für 23 von 24 Dokumenten. **Geprüft wurden die Fassungen nie gegeneinander.**
2. Damit ist die Frage nicht „welches Format ist autoritativ", sondern „**welche Fassung enthält,
   was der Owner geschrieben hat**". Das ist die PDF-Fassung — sie ist das Original, das Markdown
   die verlustbehaftete Ableitung.
3. Der Owner hat am 2026-07-23 ausdrücklich angewiesen, sich an die PDFs zu halten und das für
   künftige Sessions zur Pflicht zu machen. Diese Anweisung ist jünger als das Deckblatt und
   kennt den Befund.

**Der Zielzustand bleibt aber der aus den Dokumenten:** Sobald die Markdown-Fassungen tatsächlich
quellentreu sind (WP-019), übernimmt das Markdown wieder die Rolle, die ihm die Konzeptdokumente
zuweisen — es ist versionierbar, diffbar und durchsuchbar, das PDF ist es nicht. Was dann noch
fehlt, ist der **Treue-Check**, der die Voraussetzung „geprüfte Lesefassung" erstmals einlöst,
statt sie zu behaupten.

**Bis dahin gilt:** PDF = Autorität für den *Inhalt*. Markdown = Arbeitsfassung. Nach WP-019 +
Treue-Check: Markdown = Wahrheit wie im Konzept vorgesehen, PDF = Original und Rückfallebene.

Das ist damit **keine Abweichung vom Konzept**, sondern die Wiederherstellung einer Voraussetzung,
die das Konzept stillschweigend angenommen hat. Festgehalten als **O-KONZ-01** in
`docs/project/OPEN_QUESTIONS.md`.

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
