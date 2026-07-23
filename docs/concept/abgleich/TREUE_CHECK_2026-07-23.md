# Treue-Check PDF ↔ Markdown — erster Voll-Lauf über alle 24 Konzeptdokumente

**Werkzeug:** `scripts/treue_check.py` (WP-024) · **Lauf:** 2026-07-24 (Dateiname folgt der
Abgleich-Serie vom 2026-07-23) · **Bezug:** FINDING-0007, DR-0006, O-WP019-01,
`NACHTRAG_WP-019_2026-07-23.md`, `NACHTRAG_WP-023_2026-07-23.md`

**Ergebnis in einem Satz:** Über alle 24 Dokumente **kein einziger harter Befund** — im
**Textlayer** wurde kein fehlender Abschnitt, keine fehlende Kennung und keine falsche
Quell-PDF-Angabe gefunden. Das ist *nicht* dasselbe wie „treu": Abbildungsinhalte sind
maschinell nicht prüfbar, und genau dort saß der ursprüngliche FINDING-0007-Fehler.

---

## 1. Was das Werkzeug prüft

| # | Prüfung | Richtung | Schwere |
|---|---|---|---|
| 1 | **Kopfnotiz-Konvention:** Blockquote hinter der H1 mit Stichwort „Re-Ableitung", Datum (JJJJ-MM-TT) und einem Quell-PDF, das existiert und mit dem aufgelösten PDF übereinstimmt | MD | fehlende Kopfnotiz = Hinweis · falsches/nicht existentes Quell-PDF = **hart** |
| 2 | **Abschnittsinventar:** jede PDF-Zeile im Folientitel-Format hat eine Wortfolgen-Entsprechung im Markdown | PDF → MD | **hart** |
| 2b | Markdown-Überschriften ohne PDF-Beleg | MD → PDF | Hinweis |
| 3 | **Kennungs-Vollständigkeit:** jede stabile Kennung des PDF (`06-D01`, `09-AC15`, `20A-Q02`, `D20C-014`, `P01`, `R12`, `MS03`, `CP07`, …) erscheint im Markdown | PDF → MD | **hart** |
| 3b | Kennungen im Markdown ohne PDF-Beleg (Kopfnotiz und Projekt-IDs wie `WP-019` ausgenommen) | MD → PDF | Verdacht |
| 4 | **Normativitäts-Bilanz:** Trefferzahl je normativem Muster (`muss/müssen`, `darf/dürfen … nicht`, `unzulässig`, `verbindlich*`, `zwingend*`, `Pflicht*`, `niemals/keinesfalls`, `verboten`) im PDF gegen Markdown | Zählung | Verdacht |
| 5 | **Textabdeckung:** zusammenhängende PDF-Wortfolgen (≥ 10 Wörter), die in keinem 6-Gramm des Markdown vorkommen; normative Passagen extra markiert | PDF → MD | Verdacht (mit `--streng`: **hart**) |
| 6 | **Erfindungsprobe:** zusammenhängende Markdown-Wortfolgen (≥ 10 Wörter) ohne 6-Gramm-Beleg im PDF, getrennt nach Kopfnotiz / deklarierter Abbildungstranskription / **unerklärt** | MD → PDF | Verdacht |

Verglichen wird ein **normalisierter Wortstrom** (Kleinschreibung, ohne Satzzeichen, ohne
Markdown-Syntax, ohne Zeilenstruktur). Damit sind PDF-Zeilenumbrüche, Fettschrift und
Tabellenstriche kein Unterschied mehr. Vor dem Vergleich entfernt das Werkzeug zwei
Extraktionsartefakte: laufende Kopf-/Fußzeilen (auf ≥ 60 % der Seiten, Seitenzahl ausmaskiert)
und Trennstriche am Zeilenende (`21-\nQ02` → `21-Q02`).

**Exit-Code:** `0` ohne harte Befunde · `1` bei hartem Befund · `2` bei Aufrufproblemen.
Verdachtslisten steuern den Exit-Code **nicht**.

## 2. Was das Werkzeug ausdrücklich NICHT prüft

1. **Abbildungen.** Geprüft wird der Textlayer. Der Textlayer dieser PDFs trägt fast nirgends
   Abbildungsinhalte — und Abbildungen tragen hier nachweislich **normative** Inhalte
   („Kritikalität" steht in der Abbildung der Folie „Objekt-360 und Navigationsvertrag" von
   Dok. 07, nicht im Text; WP-019-Nachtrag, Abschnitt „Korrektur am eigenen Befund"). Was nur im
   Bild steht, kann dieses Werkzeug weder finden noch vermissen. **O-WP019-04 (Owner-Sichtprüfung)
   bleibt davon unberührt.**
2. **Bedeutung.** Geprüft wird Wortfolgen-Deckung, nicht Sinn. Eine Umformulierung, die dieselben
   Wörter in anderer Reihenfolge verwendet, fällt nicht auf (siehe Artefaktklasse
   „Wortumstellung"). Eine inhaltliche Fehlinterpretation bei identischem Wortlaut ebenfalls nicht.
3. **Tabellenstruktur.** Ob eine Tabelle die richtige Spaltenzahl und die richtige
   Zellzuordnung hat, prüft das Werkzeug nicht — die Extraktion verschmilzt Zellgrenzen, ein
   Strukturvergleich wäre nicht belastbar.
4. **Nummerierung.** Foliennummern weichen dokumentintern ab (O-WP019-02). Verglichen wird der
   **Titeltext**, nicht die Nummer. Die Zahl „PDF-Überschriftenzeilen" im Bericht ist deshalb
   bewusst eine Kandidatenzahl (die Heuristik sammelt auch nummerierte Listenpunkte ein) und
   **keine** Abschnittszahl des Dokuments.
5. **Vollständigkeit der Kopfnotiz-Aussagen.** Ob das, was eine Kopfnotiz über benannte Lücken
   behauptet, stimmt, prüft nur ein Mensch.

Ein Lauf ohne Befund heißt darum: **„im Textlayer keine Abweichung gefunden"** — nie „treu".
Diese Formulierung steht auch in jedem Bericht des Werkzeugs.

## 3. Gesamtergebnis über die 24 Dokumente

```
Dok    hart  Verdachtsposten  Abdeckung PDF  MD unerklaert  Kopfnotiz
00        0                0        100.0%              0  ok
01        0                2        100.0%            161  fehlt
02        0                1        100.0%             14  fehlt
03        0                0        100.0%              0  ok
04        0                0        100.0%              0  ok
05        0                0        100.0%              0  ok
06        0                0        100.0%              0  ok
07        0                0        100.0%              0  ok
08        0                0         99.3%              0  ok
09        0                0         99.3%              0  ok
10        0                0         99.5%              0  ok
11        0                1         99.7%              0  ok
12        0                0        100.0%              0  ok
13        0                0        100.0%              0  ok
14        0                0        100.0%              0  ok
15        0                0        100.0%              0  ok
16        0                0        100.0%              0  ok
17        0                0        100.0%              0  ok
18        0                0         99.8%              0  ok
19        0                7         97.1%              0  fehlt
20A       0                8         96.2%              0  fehlt
20B       0                1        100.0%              0  ok
20C       0                1        100.0%              0  ok
21        0                8         96.2%             35  fehlt
```

- **24 Dokumente geprüft, 0 harte Befunde.**
- **16 Dokumente vollständig unauffällig** (kein Verdachtsposten): 00, 03–10, 12–18.
- **8 Dokumente mit Verdachtsposten**, zusammen 29 Posten: 01 (2), 02 (1), 11 (1), 19 (7),
  20A (8), 20B (1), 20C (1), 21 (8).
- **Alle 19 Kopfnotizen** der in WP-019/WP-023 neu abgeleiteten Dokumente sind vollständig und
  nennen ein existierendes, korrekt aufgelöstes Quell-PDF. Die 5 ohne Kopfnotiz sind genau die
  bewusst nicht neu abgeleiteten Dokumente 01, 02, 19, 20A, 21.
- Mit `--streng` (fehlende **normative** PDF-Passagen zählen als hart) fallen genau
  **drei** Dokumente durch: **19, 20A, 21** — also genau die Fassungen, die WP-023 bewusst
  unkorrigiert gelassen hat. Dok. 01 und 02 bestehen auch streng.

Das ist die belastbarste Einzelaussage des Laufs: **die 19 neu abgeleiteten Fassungen sind im
Textlayer messbar sauberer als die 5 nicht neu abgeleiteten** — und die Trennlinie verläuft
exakt entlang der WP-019/WP-023-Grenze. Das Werkzeug hat diese Grenze nicht gekannt.

## 4. Die aussagekräftigsten echten Befunde

### 4.1 Dok. 19, 20A, 21 — Auslassungen (nicht korrigierte Fassungen)

Textabdeckung 97,1 % / 96,2 % / 96,2 %. Fehlend sind jeweils dieselben Blöcke:

- **Deckblatt-Untertitel** (die programmatische Kurzfassung des Dokuments),
- der Block **„Dokumentauftrag & Verbindlichkeit"** inkl. Steuerungsfeld-Tabelle,
- die **Inhalt-/Navigationsleiste**,
- **alle Abbildungs-Bildunterschriften** (Dok. 19: Abb. 1, 2, 4; Dok. 20A: Abb. 1–4;
  Dok. 21: Abb. 1–4) — hier ist der Textlayer ausnahmsweise ergiebig, und das Markdown gibt ihn
  nicht wieder.

Zwei davon sind ausdrücklich normativ:

> Dok. 19, „Dokumentauftrag & Verbindlichkeit": „… Dokument 20A bis 20C konkretisieren KI,
> Agenten und Umsetzung, **dürfen diese Schutzgrenzen aber nicht still umgehen**."

> Dok. 20A, „Dokumentauftrag & Verbindlichkeit": „Dokument 20A ist die **verbindliche**
> Produkt-, Architektur-, Sicherheits- und Qualitätsquelle für KI-Funktionen …"

Die Normativitäts-Bilanz bestätigt das unabhängig: Dok. 19 `darf/dürfen nicht 9→8`,
`verbindlich 6→4`; Dok. 20A `verbindlich 8→6`; Dok. 21 `verbindlich 17→15`.

**Nicht korrigiert** — das wäre ein eigenes Konzept-WP (Vollableitung nach WP-019-Muster).
Der Befund ist hier gemeldet, nicht behoben.

### 4.2 Dok. 01 — 161 Wörter im Markdown ohne PDF-Grundlage

- ein **Mermaid-Flowchart** (`flowchart LR A[Verknüpfte Kundendaten] → …`, 33 Wörter),
- ein Abschnitt **„Kanonische Quellenlinks"** mit 128 Wörtern URLs (`S1 https://www.iso.org/…`,
  `S2 https://www.bsi.bund.de/…`).

Beides steht im PDF-Textlayer nicht. Die Quellenkürzel `S1`, `S2`, … selbst sind PDF-gedeckt —
die aufgelösten URLs sind eine Hinzufügung der Arbeitsfassung. Sachlich vermutlich nützlich,
aber **nicht als PDF-Inhalt markiert** und damit genau die Kategorie, die FINDING-0007
beschreibt. Empfehlung: kennzeichnen (wie die Kopfnotiz-Konvention es für Nicht-PDF-Inhalt
vorsieht), nicht löschen.

### 4.3 Dok. 21 — 35 Wörter Kopfmetadaten ohne PDF-Beleg

„Dokumentklasse: Produktgovernance, Research Operating Model, Innovationssystem und
Konzeptpflege / Verbindlichkeit: Dieses Dokument definiert den dauerhaften Prozess …" — eine
frei formulierte Kopfzeile der Arbeitsfassung. Dieselbe Klasse, die WP-023 in Dok. 11 und 13
als „frei formuliert, vom PDF nicht getragen, ersatzlos entfallen" behandelt hat.

### 4.4 Restlicher Verdacht in den korrigierten Fassungen: keiner

Die 19 neu abgeleiteten Fassungen haben **null unerklärte Markdown-Passagen**. Alles, was die
Erfindungsprobe dort findet, liegt in der deklarierten Kopfnotiz (bis 605 Wörter) oder in einer
als solche markierten Abbildungstranskription (bis 454 Wörter) — beides ist per Konvention
Nicht-PDF-Inhalt und per Textlayer prinzipiell nicht belegbar.

## 5. Falsch-Positive: Quote und Ursachen

Von **29 Verdachtsposten** sind **4 nachweislich Falsch-Positive** (≈ 14 %). Alle vier gehen
auf dieselbe Wurzel zurück: die Textextraktion bildet Tabellen nicht zuverlässig ab.

| Fall | Posten | Ursache |
|---|---|---|
| Dok. 11 `verbindlich 8→7` | 1 | Der Tabellenkopf „Zustand \| Verbindliche Bedeutung" läuft über einen Seitenumbruch und steht im Extrakt **zweimal**. Das Markdown hat ihn einmal. |
| Dok. 20B `muss/müssen 17→16` | 1 | dito (Zeile „Kernverantwortung muss dauerhaft vorhanden sein") |
| Dok. 20C `pflicht 3→2` | 1 | dito (Tabellenkopf „Feld \| Pflichtinhalt") |
| Dok. 02, 14 Wörter „unerklärt" | 1 | Spalten-Interleaving: der Extrakt liest die Tabellenzeile als „ISMS.online, Hyperproof / Framework und Audit Readiness / Risiko, Zielprofile und modulare Services", das Markdown setzt die Zeile korrekt zusammen. Einseitig — die PDF-Richtung ist zu 100 % gedeckt. |

Zwei weitere Artefaktklassen erkennt das Werkzeug **selbst** und nimmt sie aus der
Verdachtsliste heraus (die Wörter bleiben in den Zählungen sichtbar):

- **Listenzähler** (5 Paare: Dok. 08 ×2, 09, 10, 11): Die Extraktion setzt eine über den
  Seitenumbruch laufende Nummerierung fort („…25., 26., 27."), das Markdown beginnt wieder bei 1.
  Nach Abzug der reinen Zahlen ist die Passage identisch → `listenzaehler`.
- **Wortumstellung** (1 Paar: Dok. 18 §11.2 „Isolationsstufen", Zeile „C – Dedicated"):
  Wortbestand in beiden Richtungen gleich, Reihenfolge verschieden (verschmolzene Zellgrenzen)
  → `wortumstellung`. Diese Klasse kann im Einzelfall auch eine echte Umstellung sein; die Zahl
  steht deshalb im Bericht.

Zusammen unterdrücken die beiden Automatiken **12 Posten** (6 PDF-seitig, 6 Markdown-seitig).
Ohne sie lägen 41 statt 29 Verdachtsposten vor — die Falsch-Positiv-Quote wäre von ≈ 14 %
auf ≈ 39 % gestiegen, und die 16 heute vollständig unauffälligen Dokumente wären auf 11
geschrumpft.

**Falsch-Negative sind nicht messbar.** Die Abbildungslücke ist die bekannte, große. Eine
zweite: eine Passage, die im Markdown mit denselben Wörtern in anderer Reihenfolge steht,
bleibt unentdeckt.

## 6. Kann O-WP019-01 damit geschlossen werden?

**Ja für den Werkzeug-Teil, nein für die Autoritätsrückgabe ans Markdown.**

**Erfüllt:**

- Ein reproduzierbares, versioniertes Werkzeug prüft alle 24 Dokumente maschinell gegen die
  PDF-Originale (`python scripts/treue_check.py`, Laufzeit ≈ 15 s, keine neue Abhängigkeit —
  nur Python-Standardbibliothek und das vorhandene `pypdf`).
- Der Regressionsschutz besteht: würde jemand künftig eine Kennung, einen Abschnitt oder eine
  normative Passage still verlieren, meldet das Werkzeug es. Genau das war 2026-07-23 nicht der
  Fall — `MANIFEST.json` sichert nur Markdown-Hashes.
- Der Selbsttest (`tests/repository/test_treue_check.py`, 11 Fälle) beweist an einem
  synthetischen Paar, dass fehlende Kennung und fehlender Abschnitt **hart** melden, ein
  erfundener Satz und ein abgeschwächtes Verbot als **Verdacht**, und ein treues Paar
  unauffällig bleibt.

**Nicht erfüllt — was für die Autoritätsrückgabe noch fehlt:**

1. **Abbildungen (O-WP019-04).** Solange die normativen Abbildungsinhalte nicht visuell
   verifiziert und transkribiert sind, kann kein Werkzeug bestätigen, dass das Markdown den
   Dokumentinhalt trägt. Das ist die materielle Restlücke, und sie ist nur durch
   **Owner-Sichtprüfung am gerenderten PDF** zu schließen.
2. **Dok. 01, 02, 19, 20A, 21** sind nicht neu abgeleitet; 19, 20A und 21 fallen unter
   `--streng` durch. Vor einer Autoritätsrückgabe müssten diese fünf denselben Weg gehen wie
   die 19 anderen (eigenes Konzept-WP).
3. **O-KONZ-02** bleibt offen: Dok. 20C `D20C-002` („Markdown vor PDF") widerspricht DR-0006.
   Die Autoritätsfrage ist eine **Owner-Entscheidung**, keine Werkzeugfrage — dieser Bericht
   liefert nur die Messgrundlage dafür.

**Empfehlung:** O-WP019-01 auf **„Werkzeug erledigt"** setzen und die verbleibende Bedingung
für die Autoritätsrückgabe ausdrücklich auf O-WP019-04 (Abbildungen) + Nachziehen der fünf
Fassungen + Owner-Entscheidung zu O-KONZ-02 umhängen. **Regel Null bleibt bis dahin in Kraft.**

Kandidat für die Aufnahme in `validate_handoff.py` bzw. eine CI-Stufe: `treue_check.py`
(Default-Modus, Exit 1 nur bei harten Befunden) läuft heute grün über alle 24 Dokumente und
wäre damit als Wächter sofort einsetzbar. Das ist eine Tooling-Entscheidung und wurde in
WP-024 **nicht** eigenmächtig vollzogen.

## 7. Bedienung

```bash
python scripts/treue_check.py            # alle 24, Bericht + Zusammenfassung
python scripts/treue_check.py 06         # ein Dokument
python scripts/treue_check.py 19 --details   # Verdachtslisten vollständig
python scripts/treue_check.py --json     # Maschinenausgabe
python scripts/treue_check.py --streng   # normative PDF-Lücken zählen als hart
python -m unittest discover -s tests/repository -p "test_*.py"
```

Windows/PowerShell-tauglich; das Skript erzwingt UTF-8 auf stdout/stderr, `PYTHONUTF8=1` ist
nicht nötig. `scripts/pdf_text.py` wurde um `seiten_von()` ergänzt (Seitengrenzen für die
Kopfzeilenerkennung); `text_von()` verhält sich unverändert.
