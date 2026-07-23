# Context Pack – WP-019 Konzeptfassungen aus den PDFs (Dok. 03–07)

## Ziel

Die fünf SCHWERWIEGEND abweichenden Markdown-Arbeitsfassungen (Dok. 03, 04, 05, 06, 07) werden
aus ihren PDF-Originalen **inhaltlich verlustfrei re-abgeleitet** – Vollableitung, kein
Befund-Patchen (der Abgleich vom 2026-07-23 war eine Stichprobe, kein Vollinventar). Dazu:

- **Slice 0 (vorgezogen):** `scripts/update_manifest.py` – regeneriert
  `docs/concept/MANIFEST.json` aus `docs/concept/active/`; ohne das Werkzeug macht die erste
  Markdown-Änderung `validate_handoff.py` rot (Hash-Prüfung), und kein Zwischenstand wäre grün
  committbar.
- **Slice 1:** Dok. 06 + Dok. 07 (größte Bauwirkung: UX-Bauvorschriften, Zwilling/Objektvertrag).
- **Slice 2:** Dok. 03 + Dok. 04 + Dok. 05.
- **Slice 3:** Abgleichbericht-Nachtrag (Verbleib aller 145 Befunde), Neubewertung der offenen
  Fragen, die Artefakte der Ableitung sind (Pflicht-Kandidat O-WP014-01 „Kritikalität"),
  Befundliste „Korrektur widerlegt gebaute Produktaussage" (Übergabe an WP-020), Statusdateien.

**Ausdrücklich NICHT Teil dieses WP:** die übrigen 19 Dokumente (14 material, 4 klein, 1 treu),
jeder Produktcode/Seed/Contract/Test, der Nachbau verlorener Anforderungen (WP-020), der
automatisierte Treue-Check, jede Autoritätsumkehr (O-KONZ-01 bleibt offen – Regel Null gilt
weiter), Umschreiben bestehender Zitate, inhaltliche Änderungen am Rohbefund.

## Verbindliche Prinzipien

- **Das PDF ist das Werkstück, nicht die Referenz nebenbei.** Jede Zeile der neuen Fassung kommt
  aus dem PDF-Text (`python scripts/pdf_text.py <nr>`, Einstieg mit `--abschnitte`, gezielt mit
  `--suche "..." [--umfeld 1200]`). Das alte Markdown ist nur Vergleichsobjekt und
  Konkordanz-Quelle – nie Textquelle. Eine Aussage, die nur im alten Markdown steht, entfällt
  oder wird als begründete, gekennzeichnete Ausnahme in der Kopfnotiz geführt.
- **Abbildungen visuell prüfen:** was die Textextraktion nicht hergibt (Grafiken, Tabellenbilder),
  wird mit dem Read-Werkzeug direkt am PDF angesehen (`pages`-Parameter). Nicht sicher lesbar →
  O-WP019-*, nie Erfindung.
- **Struktur folgt den PDF-Folientiteln** (Titel und Nummern). PDF-interne Doppelnummerierungen
  (Folientitel vs. Navigationsleiste/Inhalt-Zeile) werden in der Kopfnotiz **benannt, nicht
  aufgelöst**. Zitierregel bleibt: **Abschnittstitel**, nicht nur Nummer.
- **Kopfnotiz einheitlich und maschinenfreundlich:** ein Block direkt nach der Hauptüberschrift,
  über alle fünf Dateien identisch aufgebaut, klar als **Nicht-PDF-Inhalt** markiert (stabiler
  Marker, z. B. `> **Re-Ableitung:**`): Datum, Quell-PDF-Dateiname, Konkordanz alt→neu je
  verschobenem Abschnitt, benannte PDF-interne Nummerierungskonflikte, ggf. gekennzeichnete
  Ausnahmen (Abbildungstranskriptionen). Die saubere Trennung ist die Voraussetzung des späteren
  Treue-Checks (O-WP019-01).
- **Stabile Kennungen sind unantastbar:** 03-D/A/Q-, 04-D/O-, 05-D/A/O-, 06-D/A/O-,
  07-D/A/O-IDs, J01–J13, M01–M33, U1–U3, S01–S11, P01–P12, F01–F09, R01–R25, Rollen-IDs der
  Dok.-03-Rollentabelle. Im alten MD **fehlende** PDF-Kennungen (mindestens 03-A01…A07,
  03-Q01…Q10, 04-O01…O10 samt Klärungszielen) werden wiederhergestellt – das ist Treue, keine
  Umbenennung. Müsste eine ID geändert werden: Stop Condition.
- **Erst archivieren, dann schreiben** (`.claude/rules/docs.md`): alte Fassung nach
  `docs/concept/archive/` mit Suffix `_abgeloest_<YYYY-MM-DD>`; der aktive Dateiname bleibt
  unverändert (inkl. `v1.0` – die Dokumentversion ist die des PDF; Manifest und Pfadverweise
  bleiben stabil).
- **Nichts erfinden, nichts glätten, nichts still auflösen:** Änderungsprotokoll-Abschnitte im
  Dokument sind PDF-Inhalt (keine eigenen Einträge); PDF-Lücken/Widersprüche → O-WP019-* bzw.
  DR-0005-Weg; widerlegt die Korrektur eine gebaute Produktaussage → Befundliste, kein Fix
  (Nacharbeit = WP-020 ff.); kippt sie eine aktive Produktentscheidung → DR-0005 + Owner-Gate.
- **Der Validator ist der Wächter, nicht der Gegner:** nach jedem Dokument
  `python scripts/update_manifest.py && python scripts/validate_handoff.py` grün, dann Commit
  (Orchestrator, explizit gestaged) + Checkpoint. `validate_handoff.py` wird niemals
  abgeschwächt. `pnpm test --force` bleibt grün (448 Tests; Konzeptdateien sind nicht
  testgebunden).
- **Der Korrektor committet nie selbst** (Briefing §2) und schließt kein Review-Finding selbst
  (Dok. 20B §31.3). Je Dokument: `concept-consistency-reviewer` gegen den PDF-Text, Fixes,
  **zweite Runde** derselben Rolle.
- **Schreib-Scope strikt:** `docs/concept/active/` (nur die fünf Zieldateien),
  `docs/concept/archive/` (nur Archivkopien), `docs/concept/abgleich/` (nur der neue Nachtrag +
  eine Verweiszeile im Rohbefund-Kopf), `docs/project/OPEN_QUESTIONS.md` (nur Slice 3),
  `scripts/update_manifest.py` (nur Slice 0). Alles andere – insbesondere `apps/`, `packages/`,
  bestehende Skripte, CLAUDE.md, Briefing – ist tabu.

## Arbeitsstand je Dokument (aus dem Rohbefund)

| Dok | Aktive Datei (`docs/concept/active/`) | PDF (`docs/concept/pdf/`) | Befunde (hoch) | Nummerierungslage |
|---|---|---|---|---|
| 03 | `03_ZIELGRUPPEN_ROLLEN_ARBEITSSITUATIONEN_v1.0.md` | `Dokument_03_Zielgruppen_Rollen_Arbeitssituationen_v1.0.pdf` | 29 (13) | Hauptebene 1–17 ok; gesamte zweite Ebene (1.1…16.1) fehlt; drei Kapiteltitel weichen ab; 03-A/03-Q-IDs fehlen |
| 04 | `04_NUTZERREISEN_SERVICE_LEBENSZYKLUS_v1.0.md` | `Dokument_04_Nutzerreisen_Service_Lebenszyklus_v1.0.pdf` | 33 (17) | Abschnitte 1–16, J01–J13, 04-D01–D14 deckungsgleich; 04-O01…O10 samt Klärungszielen fehlen |
| 05 | `05_PRODUKTLANDKARTE_FUNKTIONSUMFANG_v1.0.md` | `Dokument_05_Produktlandkarte_Funktionsumfang_v1.0.pdf` | 29 (17) | MD hat **eigene** Nummerierung (15 statt 20 Abschnitte); PDF §10/12/14/19 ohne Entsprechung; Modul-Folien 6.1–6.7 fehlen |
| 06 | `06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md` | `Dokument_06_UX_UI_Navigation_Erlebniswelten_v1.0.pdf` | 30 (14) | Folientitel-Zählung richtig gewählt, aber §1–3 verschoben; Unterabschnitte 4.1–17.1 fehlen |
| 07 | `07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md` | `Dokument_07_Digitaler_Unternehmenszwilling_Informationsgraph_v1.0.pdf` | 24 (12) | MD folgt der Inhalt-Leiste, **+1 gegen die Folientitel** – die Neuableitung verschiebt fast jede Nummer; Konkordanz hier am kritischsten |

Gesamt: **145 Befunde, davon 73 hoch.** Die Zahlen stammen aus der Gesamtergebnis-Tabelle des
Rohbefunds; die Befundtexte selbst sind Pflichtlektüre je Dokument (unten).

## Pflichtquellen

### Die Werkstücke (je Dokument vollständig lesen)

- die fünf PDFs (Tabelle oben) über `python scripts/pdf_text.py 03|04|05|06|07`
  (`--abschnitte` zuerst; Abbildungen visuell per Read-Werkzeug),
- `docs/concept/abgleich/PDF_MARKDOWN_ABGLEICH_2026-07-23.md` – **Rohbefund**: die
  Gesamtergebnis-Tabelle und je Dokument der Abschnitt `## Dokument 0X — SCHWERWIEGEND`
  (per Grep auf die Überschrift ansteuern; die Datei ist groß). Jeder Befund dort ist beim
  Schreiben der neuen Fassung am PDF gegenzulesen – der Rohbefund ist Befundquelle, nicht
  Textquelle,
- die fünf alten Arbeitsfassungen (Tabelle oben) – **nur** als Vergleichsobjekt für Konkordanz,
  Kennungs-Abgleich und die Prüfung „Nur-im-MD-Zusätze".

### Entscheidungen, Findings, Regeln (der Auftrag und seine Grenzen)

- `docs/decisions/DR-0006_pdf_originale_sind_die_produktwahrheit.md` – **inklusive Nachtrag**:
  Zielzustand (Markdown übernimmt erst nach Treue der Fassungen **und** Treue-Check wieder die
  im Konzept vorgesehene Rolle), O-KONZ-01; außerdem „Verhältnis zu DR-0005",
- `docs/project/risks/FINDING-0007_markdown_ableitung_nicht_verlustfrei.md` – Befund,
  Beispielfall O-WP014-01/„Kritikalität", Maßnahmenliste („Danach zu tun" 1–4; dieses WP setzt
  1 und 2 für Dok. 03–07 um, 3 ist WP-020, 4 bleibt offen),
- `docs/decisions/DR-0005_konzepttreue_und_konzeptfehler.md` – der Weg, falls das PDF selbst
  fehlerhaft/widersprüchlich ist oder die Korrektur eine aktive Entscheidung kippen würde,
- `docs/concept/README_QUELLENHIERARCHIE.md` – Quellenrollen (wird in Slice 3 um den
  Korrekturstand ergänzt, ohne die Autoritätsregel zu ändern),
- `.claude/rules/docs.md` – archivieren statt löschen, keine stille Widerspruchsauflösung,
  Entscheidung/Annahme/offene Frage trennen,
- `.claude/rules/research.md` – der Korrektor erfindet keine Entscheidung,
- `docs/project/CONTINUATION_BRIEFING.md` – §2 (Arbeitszyklus, zweite Reviewrunde), §3
  (Parallelität/Schreibbereiche), §7 Lektionen 2, 6, 9 (früh committen; Zahlen nachrechnen;
  explizit stagen), §8 (Stand immer übernahmefähig).

### Slice 3 – Fragen-Neubewertung

- `docs/project/OPEN_QUESTIONS.md` – Pflicht-Kandidat **O-WP014-01** („Kritikalität": das Wort
  steht nicht im PDF-Abschnitt „Objekt-360 und Navigationsvertrag"; die Frage nennt aber auch
  die Objektfamilie F03 – am PDF trennen, was Ableitungsartefakt ist und was real getragen
  wird). Systematisch durchsehen: alle Fragen, deren Begründung ein Markdown-Zitat aus
  Dok. 03–07 ist (mindestens O-D07-01…11, O-WP012-*, O-WP013-01, O-WP014-01…11, O-WP016-01…08,
  O-WP017-*). Je Frage dokumentierter Verbleib; nichts still löschen. **O-KONZ-01 bleibt offen**
  – dieses WP liefert nur die Voraussetzung, nicht die Auflösung.

### Skripte und Prüfmechanik (Slice 0, vor dem Bau lesen)

- `scripts/validate_handoff.py` – die Manifest-Prüfung (24 Dokumente, `sha256` je Datei) und die
  ehrliche `[OK]`-Ausgabe („sagt NICHTS über Treue zu den PDF-Originalen") – dieses Verhalten
  bleibt unangetastet,
- `docs/concept/MANIFEST.json` – das Zielformat: `library`, `manifest_version`,
  `active_master_index`, `active_document_count`, `documents[]` mit `file`/`sha256`/`bytes`/
  `status`; Sortierung nach Dateiname, 2-Spaces-Indent,
- `scripts/pdf_text.py` – Stilmuster für `update_manifest.py` (Python 3, argparse, klare
  deutsche Meldungen, kein Netz) und zugleich das Lesewerkzeug,
- `scripts/checkpoint.py`, `scripts/handover.py` – Checkpoint-/Handover-Mechanik je Dokument.

### Statuswahrheit (Slice 3 aktualisiert sie)

- `docs/project/CURRENT_STATE.md`, `docs/project/WORK_QUEUE.md` (WP-019-Zeile: „keiner –
  Reparatur der Übertragung"; WP-020/021 hängen an diesem WP),
  `docs/project/handovers/LATEST.md`, `docs/project/ACTIVE_WORK_PACKAGE.md`.

## Nicht im Context Pack

- **Die übrigen 19 Konzeptdokumente** (PDF wie Markdown) – wer sie korrigieren will, ist im
  falschen WP (Folge-WP über die Queue). Einzige Ausnahme: gezieltes Nachschlagen, wenn ein
  Dok.-03–07-Abschnitt ausdrücklich auf sie verweist und die Konkordanz das braucht.
- **Produktcode und Tests** (`apps/`, `packages/`) – kein Andockpunkt in diesem WP; die
  Befundliste „Korrektur widerlegt gebaute Produktaussage" verweist auf Code, ändert ihn nie.
- **WP-020-Inhalte** (verlorene Anforderungen nachbauen) und **WP-021-Inhalte** (Demo-Welt,
  DR-0007 E-01 – die verbindlichen Demo-Accounts aus Dok. 03 Kap. „Verbindliche Demo-Accounts"
  werden hier nur treu **übertragen**, nicht im Seed materialisiert).
- **Treue-Check-Implementierung** (O-WP019-01) – eigenes WP; hier nur die Kopfnotiz-Konvention
  als Vorarbeit.
- **CCP-001/002/003 und andere Change Proposals** – Konzeptänderungen laufen getrennt; dieses
  WP ändert kein Konzept, es repariert die Übertragung.
- **DB/Auth/RLS (FINDING-0004), Morning Mission/Decision Center (Dok. 10), Reporting (Dok. 12)**
  – andere Baustellen, andere WPs.
