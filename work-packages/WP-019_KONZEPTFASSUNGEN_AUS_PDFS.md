# WP-019 – Konzeptfassungen aus den PDFs: Dok. 03–07 inhaltlich verlustfrei re-ableiten

## Identität

- **Phase:** quer (Konzeptquellen-Reparatur; kein Produktinhalt wird entschieden, eine Übertragung
  wird repariert – **DR-0006**, FINDING-0007)
- **Priorität:** P1 (Queue: **Next**; WP-020 „Verlorene Anforderungen" und WP-021 „Demo-Welt"
  hängen ausdrücklich an diesem WP – `docs/project/WORK_QUEUE.md`)
- **Status:** Draft (Aktivierung durch Orchestrator)
- **Risk Class:** Medium – kein Produktcode, keine DB/Auth/Kosten, **aber:** hier wird die
  Arbeitskopie der Produktwahrheit neu geschrieben. Eine Fehlleistung (Erfindung, Glättung,
  verlorene Kennung) verfälscht alle Folge-WPs erneut – exakt der Fehler, den dieses WP behebt.
  Zusätzlich ist `docs/concept/MANIFEST.json` an `validate_handoff.py` gekoppelt: jede
  Markdown-Änderung ohne Manifest-Regeneration macht den Validator rot.
- **Builder („Korrektor"):** ein Korrektor je Slice; Vorschlag `concept-author` – mit für dieses
  WP **ausdrücklich erweitertem Schreib-Scope**: `docs/concept/active/` (nur die fünf Zieldateien),
  `docs/concept/archive/` (nur Archivkopien), `docs/concept/abgleich/` (nur der neue Nachtrag),
  `docs/project/OPEN_QUESTIONS.md` (nur Slice 3), `scripts/update_manifest.py` (nur Slice 0).
  Die Briefing-§3-Zeile „concept-author nur `research/change-proposals/`" beschreibt den
  Default paralleler Ströme; der zugewiesene Scope dieses WP geht vor („Schreibende Arbeit nur
  im zugewiesenen Scope"). Der Korrektor **committet nie selbst** (Briefing §2).
  Parallelität: innerhalb eines Slices ist Bearbeitung je Dokument parallel zulässig (disjunkte
  Dateien), die MANIFEST-Regeneration und jeder Commit laufen aber ausschließlich über den
  Orchestrator – Empfehlung: sequenziell je Dokument, die Reviews sind ohnehin der Engpass.
- **Reviewer/Gates (risikobasiert nach Dok. 20B §36 / FINDING-0006):**
  - **Konzepttreue-Gate (Kern dieses WP):** `concept-consistency-reviewer` **je Dokument** –
    prüft die NEUE Fassung gegen den **PDF-Text** (Vollständigkeit aller Abschnitte, verbindliche
    Sätze und Kästen, Tabellen zellenweise mindestens als Stichprobe, Kennungen); danach eine
    **zweite Runde** derselben Rolle für die Fixes (hat bisher jedes Mal eine vom Fix erzeugte
    Regression gefunden, Briefing §2). Der Korrektor schließt kein Finding selbst (Dok. 20B §31.3).
  - **Code Quality Gate:** `code-reviewer` für `scripts/update_manifest.py` (Slice 0).
  - **Bewusst unbesetzt (dokumentierte Gate-Entscheidung, nicht Vergessen – FINDING-0006):**
    Product/Domain (es wird kein Produktinhalt neu entschieden; der fachliche Prüfmaßstab ist der
    PDF-Text selbst, den das Konzepttreue-Gate hält), QA (keine neuen Produkttests; das Skript
    wird per dokumentiertem Negativbeweis geprüft), Security & Privacy (keine Secrets, kein
    Tenant-Bezug; das Skript liest und schreibt nur Repo-Dateien). Diese Begründung gehört in die
    Review-Notiz.
- **Human Gates:** keine nötig – DR-0006: „Kein Human Gate nötig, weil keine Produktentscheidung
  geändert wird, sondern eine Übertragung repariert." **Zwei benannte Ausnahmen:**
  1. Entdeckt der Korrektor eine Stelle, an der die Korrektur eine **aktive
     Produktentscheidung** (DR/ADR/Owner-Entscheidung) kippen würde → **DR-0005-Weg** (benennen,
     begründen, Change Proposal, Owner-Freigabe abwarten), nie still umsetzen.
  2. Widerlegt die korrigierte Fassung eine **gebaute Produktaussage**, wird das als Befund
     gelistet (AC 17) – Nacharbeit am Produkt ist WP-020 ff., nicht hier.
- **Abhängigkeiten:** DR-0006 (inkl. Nachtrag / O-KONZ-01), FINDING-0007, Rohbefund
  `docs/concept/abgleich/PDF_MARKDOWN_ABGLEICH_2026-07-23.md`, DR-0005,
  `.claude/rules/docs.md` („Vorgänger archivieren, nicht löschen; keine stille
  Widerspruchsauflösung"), WP-018 ✓ (Queue-Reihenfolge aus DR-0007). **Blockiert:** WP-020,
  WP-021.

## Ziel

**Die fünf SCHWERWIEGEND abweichenden Markdown-Arbeitsfassungen (Dok. 03, 04, 05, 06, 07) tragen
den PDF-Inhalt vollständig** – sie sind es, aus denen fast alles Gebaute abgeleitet wurde
(Rollen, Nutzerreisen, Produktlandkarte, UX, digitaler Zwilling). Danach ist für diese fünf
Dokumente die Arbeitsfassung wieder das, was das Konzept ihr zuweist: eine treue, durchsuchbare,
zitierbare Wiedergabe des Originals.

Der Rohbefund zählt für die fünf Dokumente **145 Befunde, davon 73 hoch**:

| Dok | fehlt im MD (hoch) | nur im MD (hoch) | Nummerierung laut Rohbefund |
|---|---|---|---|
| 03 | 20 (10) | 9 (3) | Hauptebene 1–17 ok; **gesamte zweite Ebene fehlt** (1.1 … 16.1); 03-A/03-Q-IDs fehlen |
| 04 | 23 (14) | 10 (3) | Abschnitte/J01–J13/04-D ok; **04-O01…O10 samt Klärungszielen fehlen** |
| 05 | 20 (13) | 9 (4) | MD hat **eigene Nummerierung** (15 statt 20 Abschnitte); PDF §10/12/14/19 ohne Entsprechung |
| 06 | 21 (11) | 9 (3) | Folientitel-Zählung richtig gewählt, aber **§1–3 verschoben**; Unterabschnitte 4.1–17.1 fehlen |
| 07 | 18 (10) | 6 (2) | MD folgt der Inhalt-Leiste, **+1 gegen die Folientitel** – ab §2 fast jede Referenz verschoben |

**Wichtig für die Erwartung danach:** Auch nach diesem WP bleibt **Regel Null in Kraft** – die
PDFs bleiben die Produktwahrheit für alle 24 Dokumente. 14 material und 4 klein abweichende
Dokumente sind ausdrücklich **nicht** Teil dieses WP (Folge-WP), und die Autoritätsrückgabe an
das Markdown setzt laut DR-0006-Nachtrag zusätzlich einen **Treue-Check** voraus, der ebenfalls
nicht Teil dieses WP ist (O-KONZ-01 bleibt offen).

## Nicht-Ziele

- **keine Korrektur der übrigen 19 Dokumente** (14 material, 4 klein, 1 treu) – Folge-WP über
  die Queue,
- **kein Produktcode, kein Seed, keine Contracts, keine Produkttests** – auch nicht „schnell
  nachziehen", wenn eine wiederhergestellte Anforderung das Gebaute widerlegt (→ Befundliste,
  WP-020 ff.),
- **kein Nachbau verlorener Anforderungen** (Cross-Tenant-Schutz, Rollenverdichtung,
  Seitenbausteine, …) – das ist WP-020,
- **keine Autoritätsumkehr:** kein Statusdokument erklärt das Markdown wieder für autoritativ;
  O-KONZ-01 bleibt offen, CLAUDE.md/Briefing-Regel-Null bleiben unverändert,
- **kein automatisierter PDF-↔-Markdown-Treue-Check** (FINDING-0007 „Danach zu tun" Punkt 4;
  DR-0006-Nachtrag) – eigenes WP; hier entsteht nur die manuelle Treue plus Manifest-Werkzeug,
- **keine Umschreibung bestehender Zitate** in Code-Kommentaren, Work Packages, Findings oder
  offenen Fragen, die die alte Markdown-Zählung nennen – die Konkordanz in der Kopfnotiz löst
  sie auf (Zitierregel bleibt: **Abschnittstitel**),
- **keine Änderung an den PDFs**, keine neuen Einträge in den Änderungsprotokoll-Abschnitten der
  Dokumente (das Änderungsprotokoll ist PDF-Inhalt),
- **keine inhaltliche Änderung am Rohbefund** `PDF_MARKDOWN_ABGLEICH_2026-07-23.md` – er ist ein
  historisches Prüfdokument; zulässig ist genau eine Verweiszeile im Kopf auf den Nachtrag,
- **keine Konzeptänderung:** wo das PDF selbst lückenhaft oder widersprüchlich ist, entsteht eine
  OFFENE FRAGE (O-WP019-*) bzw. der DR-0005-Weg – nie eine stille Füllung.

## Scope

### Slice 0 – Werkzeug: `scripts/update_manifest.py` (vorgezogen)

**Abweichung vom Orchestrator-Zuschnitt (dort Slice 3), mit Begründung:** Die Manifest-Hashes
wurden bisher von Hand gepflegt, und `validate_handoff.py` prüft sie – die **erste**
Markdown-Änderung in Slice 1 macht den Validator rot. Jeder Slice (und jeder Zwischenstand,
Briefing §8) muss aber grün committbar enden. Deshalb entsteht das Werkzeug **zuerst**.

Das Skript regeneriert `docs/concept/MANIFEST.json` vollständig aus `docs/concept/active/`:
je Datei `file`, `sha256`, `bytes`, `status: "active"`; dazu `active_document_count` und
`active_master_index` (die eine Datei `00_MASTER_INDEX*`) automatisch. Deterministisch
(Sortierung nach Dateiname, Format wie Bestand), idempotent, ohne Netz, Stil wie
`pdf_text.py`/`validate_handoff.py` (Python 3, klare deutsche Meldungen). Schutzverhalten:
weicht die Zahl der aktiven Dateien von 24 ab oder ist die Master-Index-Datei nicht eindeutig,
bricht das Skript ab, ohne zu schreiben – in diesem WP ist eine Anzahl-Änderung nie legitim.

### Slice 1 – Dok. 06 + Dok. 07 (die zwei mit der größten Bauwirkung)

Vollständige Neuableitung beider Dateien nach den methodischen Vorgaben unten:

- `docs/concept/active/06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md` aus
  `docs/concept/pdf/Dokument_06_UX_UI_Navigation_Erlebniswelten_v1.0.pdf`
- `docs/concept/active/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md` aus
  `docs/concept/pdf/Dokument_07_Digitaler_Unternehmenszwilling_Informationsgraph_v1.0.pdf`

Bei Dok. 07 verschiebt die Umstellung auf die Folientitel-Zählung fast jede Abschnittsnummer um
−1 gegenüber dem Bestand – die Konkordanz in der Kopfnotiz ist hier der kritischste Teil, weil
Code, Work Packages und Findings die alte Zählung zitieren (z. B. „Dok. 07 §10").

### Slice 2 – Dok. 03 + Dok. 04 + Dok. 05

- `docs/concept/active/03_ZIELGRUPPEN_ROLLEN_ARBEITSSITUATIONEN_v1.0.md` aus
  `docs/concept/pdf/Dokument_03_Zielgruppen_Rollen_Arbeitssituationen_v1.0.pdf`
- `docs/concept/active/04_NUTZERREISEN_SERVICE_LEBENSZYKLUS_v1.0.md` aus
  `docs/concept/pdf/Dokument_04_Nutzerreisen_Service_Lebenszyklus_v1.0.pdf`
- `docs/concept/active/05_PRODUKTLANDKARTE_FUNKTIONSUMFANG_v1.0.md` aus
  `docs/concept/pdf/Dokument_05_Produktlandkarte_Funktionsumfang_v1.0.pdf`

Bei Dok. 05 entsteht faktisch eine neue Gliederung (20 statt 15 Abschnitte, vier PDF-Abschnitte
haben heute gar keine Entsprechung); bei Dok. 03 sind u. a. die komplette zweite
Gliederungsebene, die A-/Q-Kennungen und die Autorisierungsgrenzen aller Rollen
wiederherzustellen; bei Dok. 04 die fünf normativen Tabellen und die 04-O-IDs samt
Klärungszielen.

### Slice 3 – Abschlussarbeiten

1. **Abgleichbericht-Nachtrag:** neue Datei
   `docs/concept/abgleich/NACHTRAG_WP-019_<YYYY-MM-DD>.md` mit je Dokument einer
   **Verbleibstabelle**: jeder der 145 Befunde → „behoben" (Beleg: Abschnittstitel der neuen
   Fassung) oder „begründete Ausnahme". Hoch-Befunde einzeln, mittel/niedrig kompakt zulässig.
   Im Rohbefund nur die eine Verweiszeile im Kopf.
2. **Neubewertung der offenen Fragen, die Artefakte der Ableitung sind.** Pflicht-Kandidat
   **O-WP014-01** („Kritikalität"): das Wort steht nicht im PDF-Abschnitt „Objekt-360 und
   Navigationsvertrag" (FINDING-0007, DR-0006). Neubewertung heißt am PDF prüfen, nicht pauschal
   streichen – die Frage nennt auch die Objektfamilie F03; was das PDF real trägt, bleibt als
   präzisierte Frage, was nur aus der Markdown-Hinzufügung stammt, entfällt mit Begründung.
   Zusätzlich systematische Durchsicht aller offenen Fragen mit Dok.-03–07-Markdown-Begründung
   (mindestens O-D07-01…11, O-WP012-*, O-WP013-01, O-WP014-01…11, O-WP016-01…08, O-WP017-*):
   je Frage dokumentierter Verbleib – bleibt / entfällt als Ableitungsartefakt / umformuliert
   mit PDF-Beleg (Abschnittstitel). Nichts wird still gelöscht.
3. **Befundliste „Korrektur widerlegt gebaute Produktaussage"** (AC 17) als Abschnitt im
   Nachtrag – der geordnete Übergabepunkt an WP-020.
4. **Statuswahrheit:** `CURRENT_STATE.md`, `WORK_QUEUE.md`, `handovers/LATEST.md`,
   FINDING-0007 (Teilfortschritt: 5 von 24 korrigiert; bleibt offen für die übrigen),
   `docs/concept/README_QUELLENHIERARCHIE.md` (Korrekturstand der fünf Dokumente vermerken,
   ohne die Autoritätsregel zu ändern).

## Methodische Vorgaben (verbindlich für jeden Korrektor und Reviewer)

1. **Arbeitsgrundlage je Dokument:** der PDF-Text (`python scripts/pdf_text.py <nr>`, zuerst
   `--abschnitte` für die Gliederung) **plus** die Befundliste des Rohbefunds. Ziel ist **nicht**
   das Patchen einzelner Befunde, sondern eine Fassung, die den PDF-Inhalt vollständig trägt –
   der Abgleich war eine Stichprobe, kein Vollinventar. Abbildungen/Grafiken, deren Text die
   Extraktion nicht hergibt, werden **visuell am PDF** geprüft (Read-Werkzeug mit `pages`);
   nicht sicher Transkribierbares wird benannte Lücke (O-WP019-*), nie Erfindung.
2. **Struktur folgt den PDF-Folientiteln** – Titel und Nummern. Jede korrigierte Datei erhält
   eine **Kopfnotiz**: ein einheitlicher, klar als **Nicht-PDF-Inhalt** gekennzeichneter Block
   direkt nach der Hauptüberschrift (stabiler Marker, z. B. beginnend mit `> **Re-Ableitung:**`,
   identisch über alle fünf Dateien – maschinenfreundlich für den späteren Treue-Check) mit:
   Re-Ableitungsdatum, Quell-PDF-Dateiname, **Nummerierungs-Konkordanz alt→neu** für jeden
   Abschnitt, dessen Nummer sich gegenüber der alten Arbeitsfassung verschiebt, und den
   **PDF-internen Nummerierungskonflikten** (Folientitel vs. Navigationsleiste/Inhalt-Zeile) –
   benannt, nicht aufgelöst. Zitierregel bleibt: **Abschnittstitel**.
3. **Stabile Kennungen bleiben stabil** – nichts umbenennen: Entscheidungs-/Annahmen-/Fragen-IDs
   (03-D/A/Q, 04-D/O, 05-D/A/O, 06-D/A/O, 07-D/A/O), Journey-IDs J01–J13, Modul-IDs M01–M33,
   Umsetzungsgrade U1–U3, Screen-IDs S01–S11, Prinzipien P01–P12, Objektfamilien F01–F09,
   Beziehungstypen R01–R25, Rollen-IDs der Rollentabelle (Dok. 03). Der Rohbefund hat sie als
   deckungsgleich befundet; sie sind der Anker für alles Gebaute. Kennungen, die im alten
   Markdown **fehlen** (mindestens 03-A01…A07, 03-Q01…Q10, 04-O01…O10 samt Klärungszielen),
   werden aus dem PDF **wiederhergestellt** – das ist Treue, keine Umbenennung.
4. **Vorgänger archivieren, nicht löschen** (`.claude/rules/docs.md`): alte Fassung **vor** dem
   Schreiben der neuen nach `docs/concept/archive/` kopieren, Suffix
   `_abgeloest_<YYYY-MM-DD>` vor der Endung (z. B.
   `03_ZIELGRUPPEN_ROLLEN_ARBEITSSITUATIONEN_v1.0_abgeloest_2026-07-24.md`). Der Dateiname der
   aktiven Datei bleibt **unverändert** (inkl. `v1.0` – die Dokumentversion ist die des PDF;
   Manifest-Dateiliste und alle Pfadverweise bleiben stabil).
5. **Nichts erfinden, nichts glätten:** mehrdeutiger oder in sich widersprüchlicher PDF-Text
   wird in der Kopfnotiz benannt, nicht still aufgelöst. Der Änderungsprotokoll-Abschnitt **im**
   Dokument ist PDF-Inhalt und erhält keine eigenen Einträge. Inhalte der alten Arbeitsfassung,
   die das PDF nicht trägt, überleben nur als klar gekennzeichnete, begründete Ausnahme in der
   Kopfnotiz (z. B. visuell verifizierte Abbildungstranskription) – sonst entfallen sie.
6. **Kein Produktcode wird angefasst.** Codekommentare mit alten Markdown-Nummern bleiben stehen
   (die Konkordanz dokumentiert die Drift). Neue Konzeptlücken oder PDF-interne Widersprüche →
   OFFENE FRAGE (O-WP019-*), nicht füllen (DR-0005). Widerlegt die Korrektur eine gebaute
   Produktaussage → Befundliste (AC 17), kein Fix.
7. **Gates:** je Dokument `concept-consistency-reviewer` gegen den PDF-Text, danach zweite Runde
   für die Fixes; der Korrektor schließt kein Finding selbst. Kein Human Gate (DR-0006), außer
   in den zwei unter „Human Gates" benannten Ausnahmefällen.
8. **Verifikation laufend:** nach jedem Dokument `python scripts/update_manifest.py` und
   `python scripts/validate_handoff.py` grün, Commit durch den Orchestrator (explizit gestaged,
   nie `git add -A`), Checkpoint. `pnpm test --force` bleibt grün (448 Tests – Konzeptdateien
   sind nicht testgebunden; der Wächter dafür ist der Validator). Kein Dokument bleibt halb.

## Acceptance Criteria

**Slice 0 – Werkzeug**

1. **`scripts/update_manifest.py` existiert und regeneriert deterministisch:**
   `python scripts/update_manifest.py` schreibt `docs/concept/MANIFEST.json` vollständig aus
   `docs/concept/active/` (`file`, `sha256`, `bytes`, `status`, `active_document_count`,
   `active_master_index`), sortiert nach Dateiname, Format wie Bestand; ein unmittelbar zweiter
   Lauf ändert die Datei nicht (Idempotenz, per `git status`/Diff belegt).
2. **Schutzverhalten:** bei ≠ 24 aktiven Markdown-Dateien oder nicht eindeutiger
   `00_MASTER_INDEX*`-Datei bricht das Skript mit klarer deutscher Meldung ab und schreibt
   nichts (im Review demonstriert, nicht committet).
3. **Negativbeweis Validator-Kopplung:** eine absichtliche Ein-Zeichen-Änderung an einer aktiven
   Datei lässt `python scripts/validate_handoff.py` fehlschlagen („hash mismatch"); nach
   `python scripts/update_manifest.py` ist er grün. Kommandoprotokoll in der Review-Notiz; die
   Probeänderung wird zurückgesetzt.
4. **Code-Review bestanden:** `code-reviewer` hat das Skript geprüft (kein Netz, keine
   Abschwächung von `validate_handoff.py`, Stil der bestehenden Skripte).

**Slice 1 + 2 – je Dokument (gilt für jede der fünf Dateien)**

5. **Vollableitung statt Patch:** jeder Abschnitt des PDF – einschließlich Deckblatt-Inhalten
   wie „Dokumentauftrag & Verbindlichkeit"/Steuerungsfeld-Tabelle – hat eine inhaltstragende
   Entsprechung; Struktur und Nummerierung folgen den PDF-Folientiteln; Tabellen sind mit allen
   Spalten und Zeilen übernommen; als verbindlich markierte Kästen (ENTSCHEIDUNG, VERBINDLICH,
   DESIGNREGEL, GRUNDSATZ, Regelboxen) sind als solche erkennbar erhalten.
6. **Kopfnotiz + Konkordanz:** jede der fünf Dateien trägt den einheitlichen
   Re-Ableitungs-Block (Datum, Quell-PDF-Dateiname, Konkordanz alt→neu für jede verschobene
   Abschnittsnummer, benannte PDF-interne Nummerierungskonflikte), klar als Nicht-PDF-Inhalt
   gekennzeichnet.
7. **Keine stabile Kennung geändert:** alle unter Vorgabe 3 gelisteten ID-Räume sind gegenüber
   PDF **und** alter Fassung deckungsgleich (per Grep über alte Fassung, neue Fassung und
   PDF-Text belegt); die im alten Markdown fehlenden PDF-Kennungen (mindestens 03-A01…A07,
   03-Q01…Q10, 04-O01…O10 samt Klärungszielen) sind wiederhergestellt.
8. **Hoch-Befunde nachweislich erledigt:** jeder der 73 hoch-Befunde des Rohbefunds zu
   Dok. 03–07 ist in der Verbleibstabelle (AC 14) als **behoben** belegt (Abschnittstitel der
   neuen Fassung) **oder** als begründete Ausnahme gelistet. Mittel-/niedrig-Befunde stehen
   ebenfalls mit Verbleib in der Tabelle (kompakte Form zulässig).
9. **Nur-im-MD-Zusätze bereinigt:** kein Inhalt der alten Fassung, den das PDF nicht trägt,
   überlebt unkommentiert; verbleibende Ausnahmen (z. B. visuell am PDF verifizierte
   Abbildungstranskriptionen) sind in der Kopfnotiz einzeln gekennzeichnet und begründet.
10. **Nichts erfunden, nichts geglättet:** Änderungsprotokoll-Abschnitte ohne eigene neue
    Einträge; PDF-interne Mehrdeutigkeiten in der Kopfnotiz benannt; für unleserliche/nicht
    extrahierbare Stellen existiert ein O-WP019-Eintrag statt eines erfundenen Texts.
11. **Archiv vollständig:** alle fünf alten Fassungen liegen unter `docs/concept/archive/` mit
    Suffix `_abgeloest_<YYYY-MM-DD>`; nichts wurde gelöscht; die Dateinamen unter
    `docs/concept/active/` sind unverändert.
12. **Konzepttreue-Reviews dokumentiert:** je Dokument ein `concept-consistency-reviewer`-
    Durchgang gegen den PDF-Text plus zweite Runde nach den Fixes, unter `docs/project/reviews/`
    dokumentiert; der Korrektor hat kein Finding selbst geschlossen.
13. **Jeder Zwischenstand grün und gesichert:** nach jedem Dokument sind
    `python scripts/update_manifest.py` und `python scripts/validate_handoff.py` grün und der
    Stand ist committet (Orchestrator, explizit gestaged) und gepusht; Checkpoint existiert.

**Slice 3 – Abschluss**

14. **Nachtrag existiert:** `docs/concept/abgleich/NACHTRAG_WP-019_<YYYY-MM-DD>.md` führt je
    Dokument die Verbleibstabelle über alle 145 Befunde (AC 8); der Rohbefund ist bis auf genau
    eine Verweiszeile im Kopf unverändert.
15. **O-WP014-01 neu bewertet:** am PDF geprüft (Abschnitt „Objekt-360 und Navigationsvertrag"
    sowie der Objektfamilien-Katalog); der Anteil, der nur aus der Markdown-Hinzufügung
    „Kritikalität" stammt, ist mit Begründung und Verweis auf FINDING-0007 entfallen; real vom
    PDF getragene Anteile bestehen als präzisierte Frage fort. Der Verbleib steht in
    `docs/project/OPEN_QUESTIONS.md` – nichts still gelöscht.
16. **Systematische Fragen-Durchsicht:** alle offenen Fragen, deren Begründung sich auf
    Markdown-Aussagen aus Dok. 03–07 stützt (mindestens die unter Slice 3 Punkt 2 gelisteten
    ID-Räume), tragen einen dokumentierten Verbleib (bleibt / entfällt als Ableitungsartefakt /
    umformuliert mit PDF-Beleg per Abschnittstitel).
17. **Befundliste Produktwiderlegung:** jede Stelle, an der die korrigierte Fassung eine
    gebaute Produktaussage widerlegt, ist im Nachtrag gelistet (Kandidaten aus dem Rohbefund –
    z. B. „Graph und Liste gleichberechtigt" gegen die PDF-DESIGNREGEL, Read-only-Charakter des
    Audit Workspace – sind explizit geprüft). **Kein** Produktfix in diesem WP.
18. **Statuswahrheit ehrlich:** `CURRENT_STATE.md`, `WORK_QUEUE.md`, `handovers/LATEST.md`,
    FINDING-0007 (5 von 24 korrigiert, bleibt offen) und `README_QUELLENHIERARCHIE.md` sind
    aktualisiert; **kein** Dokument behauptet, das Markdown sei wieder autoritativ (O-KONZ-01
    bleibt offen; Regel Null in CLAUDE.md/Briefing unverändert).
19. **Gesamtverifikation:** `python scripts/update_manifest.py` und
    `python scripts/validate_handoff.py` grün; `pnpm test --force` grün (448 Tests);
    Stichproben-Gegenlesen dokumentiert: je Dokument mindestens drei vom Reviewer frei gewählte
    PDF-Abschnitte satzweise gegen die neue Fassung gehalten, Ergebnis in der Review-Notiz.
20. **Gates und Lücken dokumentiert:** besetzte Gates (Konzepttreue je Dokument × zwei Runden,
    Code-Review Slice 0) und bewusst unbesetzte Gates mit Begründung in der Review-Notiz;
    jede beim Arbeiten gefundene neue Lücke steht als `O-WP019-*` in
    `docs/project/OPEN_QUESTIONS.md` – geraten wird nichts.

## Benannte Lücken und offene Fragen (Vorschlag für `docs/project/OPEN_QUESTIONS.md`)

| ID (Vorschlag) | Frage | Art | Umgang in WP-019 | Owner / Gate |
|---|---|---|---|---|
| O-WP019-01 | Der **automatisierte Treue-Check** (FINDING-0007 Punkt 4), an den der DR-0006-Nachtrag die Rückgabe der Autorität an das Markdown knüpft, existiert weiterhin nicht | Prozesslücke | manuelle Treue + Reviews; Werkzeug bleibt offen | program-manager (eigenes WP), Owner via O-KONZ-01 |
| O-WP019-02 | **14 material + 4 klein abweichende Dokumente** bleiben unkorrigiert; bis dahin gilt Regel Null uneingeschränkt für alle 24 | Restarbeit | ausdrücklich Nicht-Ziel; Queue-Eintrag als Folge-WP | program-manager |
| O-WP019-03 | **Bestandszitate mit alter Markdown-Zählung** (Code-Kommentare, WPs, Findings, offene Fragen) werden nicht umgeschrieben; die Konkordanz löst sie auf. Ist eine spätere Zitat-Bereinigung gewünscht? | Prozessfrage | Konkordanz je Datei; keine Massenänderung | program-manager |
| O-WP019-04 | **Abbildungen ohne sicher transkribierbaren Inhalt:** falls die visuelle Prüfung eine Grafik nicht eindeutig lesbar macht, fehlt der Inhalt in der Arbeitsfassung benannt | Quellenlücke (fallweise) | je Fall eigener Eintrag statt Erfindung | Owner (Originalgrafik) |
| O-WP019-05 | Die fünf korrigierten Dokumente sind per Review + Stichprobe geprüft, aber **kein erneuter unabhängiger Vollabgleich** wie am 2026-07-23 – „TREU" im Sinne des Rohbefunds ist damit nicht formal festgestellt | Methodengrenze | ehrlich benannt; ggf. mit O-WP019-01 zusammen lösen | program-manager |

## Stop Conditions

- **PDF-Stelle nicht extrahierbar und visuell nicht sicher lesbar** → Befund/O-WP019-* statt
  Erfindung; das Dokument wird mit benannter Lücke fertiggestellt, nicht gefüllt,
- die Korrektur würde eine **aktive Produktentscheidung** (DR, ADR, Owner-Entscheidung,
  Contract-Zusage) kippen → DR-0005-Weg (benennen, Change Proposal, Owner-Gate), nie still,
- eine **stabile Kennung** müsste geändert werden, um PDF-treu zu sein (Gegenbefund zur
  festgestellten Deckungsgleichheit) → stoppen, Befund, Orchestrator,
- **Scope-Drift** auf die übrigen 19 Dokumente, auf Produktcode/Seed/Contracts/Tests oder auf
  den Nachbau verlorener Anforderungen → stoppen (Folge-WP / WP-020 / WP-021),
- `validate_handoff.py` ließe sich nur **durch Abschwächung des Validators** grün bekommen →
  stoppen (der Validator ist der Wächter dieses WP, nicht sein Gegner),
- der Nachtrag würde erfordern, den **Rohbefund inhaltlich umzuschreiben** → stoppen
  (historisches Prüfdokument; nur die Verweiszeile ist zulässig),
- ein Slice- oder Sessionende ohne grünen Validator und ohne Commit droht → zuerst
  `update_manifest.py` + Commit + Checkpoint (Briefing §8: der Stand ist immer übernahmefähig),
- die **Kopfnotiz müsste PDF-Inhalt und Ableitungs-Metadaten vermischen**, um „lesbarer" zu
  wirken → stoppen; die Trennung ist die Voraussetzung des späteren Treue-Checks.

## Done Evidence

- fünf re-abgeleitete Dateien unter `docs/concept/active/` mit einheitlicher Kopfnotiz und
  Konkordanz; fünf Archivkopien unter `docs/concept/archive/` mit Datumssuffix,
- `scripts/update_manifest.py` + regeneriertes `docs/concept/MANIFEST.json`;
  Kommandoprotokolle der Negativbeweise (AC 2, AC 3) in der Review-Notiz,
- `docs/concept/abgleich/NACHTRAG_WP-019_<YYYY-MM-DD>.md` mit Verbleibstabellen über alle
  145 Befunde und der Befundliste „Korrektur widerlegt gebaute Produktaussage",
- aktualisierte `docs/project/OPEN_QUESTIONS.md` (O-WP014-01-Neubewertung, systematische
  Durchsicht, neue `O-WP019-*`),
- Review-Notizen unter `docs/project/reviews/` (Konzepttreue je Dokument × zwei Runden,
  Code-Review Slice 0, dokumentierte unbesetzte Gates, Stichproben-Gegenlesen),
- grüner Lauf `python scripts/update_manifest.py` + `python scripts/validate_handoff.py` und
  `pnpm test --force` (448 Tests),
- aktualisierte Statusdateien (`CURRENT_STATE.md`, `WORK_QUEUE.md`, `handovers/LATEST.md`,
  FINDING-0007, `README_QUELLENHIERARCHIE.md`) – ohne Autoritätsumkehr,
- Commits je Dokument bzw. je Slice (explizit gestaged, nie `git add -A`), Micro-/Verified
  Checkpoints, Push.
