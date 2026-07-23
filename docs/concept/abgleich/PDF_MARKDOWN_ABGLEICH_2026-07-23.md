# Abgleich PDF-Originale gegen Markdown-Arbeitsfassungen

**Datum:** 2026-07-23 · **Auslöser:** DR-0006 · **Befund:** FINDING-0007
**Methode:** je Dokument ein unabhängiger Prüfer; PDF-Text via pypdf extrahiert, gegen
`docs/concept/active/*.md` gehalten. Bewertet wurde Inhalt, nicht Formatierung.

> Diese Datei ist der **vollständige Rohbefund**. Die Priorisierung und die daraus abgeleiteten
> Work Packages stehen in FINDING-0007 und in der Work Queue.

## Gesamtergebnis

| Urteil | Dokumente |
|---|---|
| **SCHWERWIEGEND** | 5 |
| **MATERIALE_ABWEICHUNGEN** | 14 |
| **KLEINE_ABWEICHUNGEN** | 4 |
| **TREU** | 1 |

| Dok | Urteil | fehlt im MD | nur im MD | Nummerierung |
|---|---|---:|---:|---|
| 00 | MATERIALE_ABWEICHUNGEN | 3 (davon 0 hoch) | 2 (davon 0 hoch) | ok |
| 01 | KLEINE_ABWEICHUNGEN | 0 (davon 0 hoch) | 2 (davon 0 hoch) | ok |
| 02 | TREU | 0 (davon 0 hoch) | 1 (davon 0 hoch) | ok |
| 03 | SCHWERWIEGEND | 20 (davon 10 hoch) | 9 (davon 3 hoch) | **abweichend** |
| 04 | SCHWERWIEGEND | 23 (davon 14 hoch) | 10 (davon 3 hoch) | ok |
| 05 | SCHWERWIEGEND | 20 (davon 13 hoch) | 9 (davon 4 hoch) | **abweichend** |
| 06 | SCHWERWIEGEND | 21 (davon 11 hoch) | 9 (davon 3 hoch) | **abweichend** |
| 07 | SCHWERWIEGEND | 18 (davon 10 hoch) | 6 (davon 2 hoch) | **abweichend** |
| 08 | MATERIALE_ABWEICHUNGEN | 5 (davon 3 hoch) | 2 (davon 0 hoch) | ok |
| 09 | MATERIALE_ABWEICHUNGEN | 3 (davon 2 hoch) | 2 (davon 0 hoch) | ok |
| 10 | MATERIALE_ABWEICHUNGEN | 4 (davon 2 hoch) | 2 (davon 0 hoch) | ok |
| 11 | MATERIALE_ABWEICHUNGEN | 5 (davon 2 hoch) | 2 (davon 0 hoch) | ok |
| 12 | MATERIALE_ABWEICHUNGEN | 3 (davon 0 hoch) | 2 (davon 0 hoch) | ok |
| 13 | MATERIALE_ABWEICHUNGEN | 4 (davon 2 hoch) | 3 (davon 1 hoch) | ok |
| 14 | MATERIALE_ABWEICHUNGEN | 5 (davon 2 hoch) | 3 (davon 0 hoch) | ok |
| 15 | MATERIALE_ABWEICHUNGEN | 5 (davon 2 hoch) | 0 (davon 0 hoch) | ok |
| 16 | MATERIALE_ABWEICHUNGEN | 5 (davon 0 hoch) | 1 (davon 0 hoch) | ok |
| 17 | MATERIALE_ABWEICHUNGEN | 5 (davon 1 hoch) | 1 (davon 0 hoch) | ok |
| 18 | MATERIALE_ABWEICHUNGEN | 4 (davon 1 hoch) | 1 (davon 0 hoch) | ok |
| 19 | KLEINE_ABWEICHUNGEN | 6 (davon 0 hoch) | 1 (davon 0 hoch) | ok |
| 20A | KLEINE_ABWEICHUNGEN | 6 (davon 0 hoch) | 1 (davon 0 hoch) | ok |
| 20B | MATERIALE_ABWEICHUNGEN | 8 (davon 2 hoch) | 1 (davon 0 hoch) | ok |
| 20C | MATERIALE_ABWEICHUNGEN | 6 (davon 1 hoch) | 2 (davon 0 hoch) | ok |
| 21 | KLEINE_ABWEICHUNGEN | 6 (davon 0 hoch) | 2 (davon 0 hoch) | ok |

---

## Dokument 00 — MATERIALE_ABWEICHUNGEN

Der Fließtext der Abschnitte 1 bis 13 ist praktisch wortgleich aus dem PDF übernommen: Produktdefinition, alle 9 Produktprinzipien, alle 5 Nicht-Ziele, die 24-Zeilen-Dokumententabelle, Bibliotheksstatus, Statusdefinitionen, Lesereihenfolge, die 6 Context-Pack-Beispiele, alle Abhängigkeits- und Vorrangregeln, alle 23 Begriffe, D-001 bis D-023, A-001 bis A-012, O-001 bis O-018, die 15 Ideenparkplatz-Einträge, Governance 11.1 bis 11.3, Änderungsprotokoll und die 5 nächsten Schritte stimmen inhaltlich vollständig überein. Die Abweichungen liegen ausschließlich im Vorspann: Die Steuerungsfeld-Tabelle von PDF-Seite 2 ("Steuerungsfeld | Festlegung") wurde nicht übernommen, wodurch insbesondere die Owner-Festlegung für Dokument 00 im Repository fehlt und die Definition von "Zentrale Wahrheit" bzw. "Nicht autoritativ" gegenüber dem PDF verengt ist. Umgekehrt enthält der Markdown-Kopf zwei Aussagen, die das PDF so nicht trägt: einen als verbindlich formulierten Einstiegspfad samt Festlegung auf GitHub sowie einen erweiterten Statustext. Kein Abschnitt widerspricht dem PDF, und keine Anforderung wurde inhaltlich umgedeutet.

**Nummerierung:** Die Nummerierung ist konsistent und ungefaehrlich. Das PDF fuehrt zwei Beschriftungen fuer dieselben Abschnitte: die Folientitel (\"1. Zweck und Geltungsbereich\", \"2. Zentrale Produktdefinition\", \"3. Übersicht der Konzeptdokumente\", ... \"13. Nächster verbindlicher Schritt\") und die Kurzform in der Inhaltszeile auf Seite 2 (\"1 Zweck und Geltungsbereich · 2 Produktdefinition · 3 Dokumentenstatus · 4 Lesereihenfolge und Context Packs · 5 Abhängigkeiten und Vorrang · 6 Begriffe · 7 Entscheidungen · 8 Annahmen · 9 offene Fragen · 10 Ideenparkplatz · 11 Governance und Archivierung · 12 Änderungsprotokoll · 13 nächster Schritt\"). Beide verwenden dieselben Nummern; nur die Titel sind gekuerzt (z. B. 3 \"Dokumentenstatus\" statt \"Übersicht der Konzeptdokumente\"). Das Markdown folgt den Folientiteln und damit derselben Nummerierung 1-13, ebenso bei den Unterabschnitten 1.1, 1.2, 2.1-2.3, 3.1, 3.2, 4.1, 4.2, 11.1-11.3. Zitate im Code auf Paragraphen wie \"Dokument 00 Abschnitt 7\" oder \"11.2\" treffen in beiden Quellen denselben Inhalt. Auch die Kennungen D-001..D-023, A-001..A-012 und O-001..O-018 sind vollstaendig und lueckenlos deckungsgleich. Die einzige nicht nummerierte PDF-Einheit ist die Steuerungsfeld-Tabelle auf Seite 2, die im Markdown fehlt - sie laesst sich daher nicht ueber eine Abschnittsnummer referenzieren.

### Im PDF vorhanden, im Markdown fehlend

**[mittel] Seite 2, Tabelle "Steuerungsfeld | Festlegung", Zeile Owner**

> Owner Human Product Owner / Project Memory / Documentation / GitHub Steward

Die einzige Stelle des Dokuments, die eine Verantwortlichkeit (Owner) für Dokument 00 festlegt, fehlt im Markdown vollständig. Damit ist im Repository nicht dokumentiert, welche Rollen den Master-Index pflegen und freigeben duerfen - obwohl die Zeile im PDF ausdruecklich als "Festlegung" gekennzeichnet ist. Die genannten Rollen (Project Memory, Documentation, GitHub Steward) sind Agentenrollen aus Dokument 20B; ihre Zustaendigkeit fuer Dokument 00 ist im Projekt derzeit nirgends verankert.

*Betroffen:* Governance-/Rollenzuordnung fuer Konzeptpflege; betrifft die Skills bootstrap-session, handover, project-memory-sync und die Agentenvertraege aus 20B.

**[niedrig] Seite 2, Tabelle "Steuerungsfeld | Festlegung", Zeilen Zentrale Wahrheit und Nicht autoritativ**

> Zentrale Wahrheit Aktive Markdown-Dateien, ADRs, Decision Records, Tests und Status im Repository | Nicht autoritativ Chats, Auto-Memory, lokale Notizen, archivierte Versionen und unversionierte Exporte

Das PDF definiert die zentrale Wahrheit breiter als das Markdown-Zitat im Kopf (dort nur "Markdown-Dokumentation"): ADRs, Decision Records, Tests und Status gehoeren im PDF ausdruecklich dazu. Ebenso fehlen auf der Nicht-autoritativ-Seite "Auto-Memory", "archivierte Versionen" und "unversionierte Exporte" (Auto-Memory taucht erst spaeter in Abschnitt 5 auf, archivierte Versionen und unversionierte Exporte gar nicht in dieser Aufzaehlung). Die Verengung ist inhaltlich folgenlos geblieben, weil CLAUDE.md die vollstaendige Liste fuehrt, im Konzeptdokument selbst ist sie aber nicht mehr belegt.

*Betroffen:* CLAUDE.md Abschnitt "Verbindliche Projektwahrheit" (deckt die PDF-Fassung bereits ab)

**[niedrig] Seite 2, Einleitungsabsatz "Projektverfassung & zentrale Wahrheit"**

> Dokument 00 ist der Einstiegspunkt für Menschen, Claude Code und die virtuelle KI-Firma. Es erklärt, welche Quellen verbindlich sind, wie die 24 Konzeptdokumente zusammenhängen und wie neue Versionen ohne Wissensverlust aktiviert werden.

Die explizite Adressatenbestimmung (Menschen, Claude Code, virtuelle KI-Firma) fehlt im Markdown; dort steht nur die verkuerzte Kopfzeile "Zweck: Navigationssystem, Projektverfassung und Statusquelle". Inhaltlich kein Verlust einer Anforderung, aber der Auftrag "Aktivierung neuer Versionen ohne Wissensverlust" wird als Zweck nicht mehr genannt.

### Nur im Markdown, vom PDF nicht getragen

**[mittel] Markdown Zeile 9, Blockquote "Zentrale Wahrheit"**

> Die versionierte Markdown-Dokumentation im GitHub-Repository ist verbindlich. Einstiegspunkt ist `docs/00_master-index/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG.md`.

Das PDF sagt an dieser Stelle nur: "Die aktive Markdown-Dokumentation im Repository ist verbindlich. DOCX und PDF sind geprüfte Lesefassungen." - ohne Pfad und ohne Nennung von GitHub. Der Pfad erscheint im PDF ausschliesslich in Abschnitt 11.1 unter der ausdruecklichen Ueberschrift "Empfohlene Struktur:" - also als Empfehlung, nicht als verbindlicher Einstiegspunkt. Das Markdown macht daraus eine Festlegung. Praktisch relevant: die Datei liegt im Repository tatsaechlich unter docs/concept/active/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.2.md, also weder am im Markdown behaupteten Pfad noch konform zur PDF-Regel "Links im Master-Index zeigen immer auf die aktive Markdown-Datei ohne Versionsnummer". Zusaetzlich legt "GitHub-Repository" eine Plattform fest, die das PDF an dieser Stelle offenlaesst und die CLAUDE.md ausdruecklich als noch offene Technikentscheidung fuehrt.

*Betroffen:* Pfadangaben in CLAUDE.md, Context Packs und allen Skills, die den Master-Index laden; Dateibenennung docs/concept/active/*_v1.2.md

**[niedrig] Markdown Zeile 5, Kopfzeile Status**

> **Status:** Aktiv - Konzeptbaseline vollständig und Weiterentwicklungsbetrieb ergänzt

Das PDF nennt auf der Titelseite ausschliesslich "STATUS Aktiv - Konzeptbaseline vollständig". Der Zusatz "und Weiterentwicklungsbetrieb ergänzt" ist eine Ergaenzung des Ableiters. Sie ist inhaltlich durch Dokument 21 gedeckt und damit sachlich unschaedlich, steht aber so nicht im Original.

---

## Dokument 01 — KLEINE_ABWEICHUNGEN

Die Markdown-Fassung bildet Dokument 01 inhaltlich praktisch vollstaendig ab: alle 15 Abschnitte, alle Tabellen (5.1 Problembaum, 6.2, 7 Ebenenmodell, 9.1 Kernformeln, 9.2 Effekttreiber, 10 Differenzierung, 11.2 Erfolgsdimensionen, 12.3 Risiken), alle Entscheidungen 01-D01 bis 01-D10, alle Annahmen 01-A01 bis 01-A06, alle offenen Fragen 01-O01 bis 01-O10 sowie die Quellen S1 bis S7 sind woertlich uebernommen. Auch die verbindlich wirkenden Saetze (ENTSCHEIDUNG-Boxen, NORTH STAR, DESIGNGESETZ, Qualitaetsregel, Kreativitaetsregel, "Die Plattform muss immer erklaeren, warum ein Service empfohlen wird") stehen unveraendert im Markdown. Es fehlt nichts Materielles. Zwei Ergaenzungen stehen nur im Markdown: ein ausformulierter Mermaid-Flowchart als Ersatz fuer die Bild-Abbildung 1 und eine Liste kanonischer Quellen-URLs; beide sind plausible Aufloesungen von Bild- bzw. Hyperlink-Inhalten, die die reine Textextraktion nicht wiedergeben kann, aber aus dem PDF-Text nicht belegbar sind. Die Abschnittsnummerierung 1 bis 15 stimmt exakt ueberein.

**Nummerierung:** Kein Nummerierungsproblem. Die Folientitel im PDF sind durchgehend 1. bis 15. nummeriert (1. Dokumentauftrag und Leselogik bis 15. Quellenbasis, Aenderungsprotokoll und naechste Schritte), die Unterabschnitte 1.1 bis 15.3. Das Markdown folgt exakt dieser Folientitel-Nummerierung, inklusive aller Unterabschnitte. Eine abweichend nummerierte Navigationsleiste ist in der Textextraktion nicht enthalten; im Kopfbereich stehen nur die Wiederholzeilen "ISMS Managed Service Platform | Dokument 01 | v1.0" und "Vertraulicher Konzeptentwurf - neutrale Produktentwicklung | <Seitenzahl>". Zitate im Code, die sich auf Paragraphen von Dokument 01 beziehen (z. B. 7.2, 9.1, 12.2), treffen daher in PDF und Markdown denselben Inhalt. Auch die ID-Raeume 01-D01..01-D10, 01-A01..01-A06, 01-O01..01-O10 und S1..S7 sind deckungsgleich.

### Nur im Markdown, vom PDF nicht getragen

**[mittel] 8.1 / Abbildung 1 (Markdown Zeilen 199-211)**

> flowchart LR   A[Verknuepfte Kundendaten] --> B[Bessere Priorisierung]   B --> C[Weniger Routineaufwand]   C --> D[Mehr Mandanten pro Team]   D --> E[Mehr Lernen und Standardisierung]   E --> F[Staerkere Services und Kundenbindung]   F --> A

Das PDF enthaelt an dieser Stelle nur die Bildunterschrift 'Abbildung 1: Managed-ISMS-Wertschleife (Produktidee, keine empirische Marktbehauptung)'; die Wertschleife selbst ist eine Grafik, deren Beschriftungen in der Textextraktion nicht vorkommen. Die sechs Knotenbezeichnungen im Markdown sind damit aus dem PDF-Text nicht belegbar. Sehr wahrscheinlich sind sie eine korrekte Transkription der Grafik, aber wenn spaetere Artefakte (Business-Case-Modelle, Wertschleifen-Logik, Kennzahlenketten) genau diese sechs Stufen als kanonische Kette verwenden, stuetzen sie sich auf eine nicht gegengepruefte Quelle. Empfehlung: die Grafik im Original-PDF visuell gegen die sechs Knoten pruefen. Nebenbefund ohne inhaltliche Wirkung: die Bildunterschrift steht im Markdown doppelt (einmal kursiv mit Gedankenstrich, einmal als Klartextzeile).

*Betroffen:* Business-Case-/Wertschleifen-Darstellungen und jede spaetere Herleitung, die die sechs Stufen als feste Kette zitiert

**[niedrig] 15.1 / Anhang 'Kanonische Quellenlinks' (Markdown Zeilen 447-455)**

> ## Kanonische Quellenlinks - S1: https://www.iso.org/standard/27001 - S2: https://www.bsi.bund.de/DE/Themen/... /Lektion_5_05_node.html - S7: https://www.bsi.bund.de/DE/Themen/... /Lektion_6_02_node.html

Dieser Abschnitt existiert im PDF nicht. Das PDF nennt in Tabelle 15.1 nur Herausgeber und das Wort 'oeffnen' (Hyperlink), dessen Ziel-URL in der Textextraktion nicht sichtbar ist. Die URLs sind damit eine Ergaenzung der Ableitung. Inhaltlich unkritisch, solange sie tatsaechlich den Hyperlinks des PDF entsprechen; die tief verschachtelten BSI-Kurs-URLs (S2, S7) sollten jedoch gegen die tatsaechlichen PDF-Links geprueft werden, bevor sie als Evidenzquelle in Code, Tests oder Reports zitiert werden.

*Betroffen:* Quellen-/Evidenzverweise, die S1-S7 mit URL zitieren

---

## Dokument 02 — TREU

Die Markdown-Fassung von Dokument 02 bildet das PDF-Original inhaltlich vollstaendig ab. Alle 20 Abschnitte, saemtliche Tabellen (Marktstruktur A-E, Zielsegmente, Bewertungskriterien K1-K8, Benchmark 6.6, Capability-Matrix Abschnitt 10, White Space, Nutzungsmomente, Build/Integrate/License/Partner, Win Themes, Risiken R1-R8, Validierung V1-V6), die zehn Differenzierungssaeulen D1-D10, die zehn Entscheidungen 02-D01 bis 02-D10, alle Annahmen, offenen Fragen, der Ideenparkplatz und das komplette Quellenregister S1-S30 stimmen zellenweise mit dem PDF ueberein - inklusive aller H/M/L-Werte beider Matrizen. Die Abschnittsnummerierung 1-20 ist identisch, es besteht keine Verwechslungsgefahr. Einziger Unterschied sind zwei eingefuegte Bild-Platzhalter mit eigener Kurzbildunterschrift; die Original-Bildunterschriften des PDFs stehen zusaetzlich unveraendert daneben, es wurde also keine Aussage veraendert.

**Nummerierung:** Das Markdown folgt exakt der Folientitel-Nummerierung des PDFs (1. Dokumentauftrag ... 20. Dokumentabhaengigkeiten), einschliesslich aller Unterabschnitte (1.1, 1.2, 2.1, 3.1, 4.1, 6.1-6.7, 8.1-8.3, 11.1, 18.1-18.4). In der Textextraktion ist keine abweichende Navigationsleisten-Nummerierung erkennbar. Zitate im Code, die auf Paragraphen-Nummern aus Dokument 02 verweisen (z. B. "02 Abschnitt 12" fuer die Differenzierungssaeulen oder "02-D01".."02-D10"), treffen in beiden Quellen dieselbe Stelle. Keine Verwechslungsgefahr.

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Abschnitt 3 (nach der Kategorientabelle) und Abschnitt 11 (nach der White-Space-Tabelle)**

> ![Interpretative Marktkarte](doc02_market_map.png)  *Abbildung 1: Interpretative Marktkarte auf Basis oeffentlich belegter Produktpositionierungen.* ... ![Differenzierungs-Stack](doc02_differentiation_stack.png)  *Abbildung 2: Differenzierung als gestapeltes Service-Betriebssystem.*

Zwei Bildeinbindungen mit eigenen, neu formulierten Kurzbildunterschriften, die so nicht im PDF stehen. Das PDF enthaelt an diesen Stellen nur die Legendentexte 'Abbildung 1 - Interpretative Marktkarte; Positionen beruhen auf oeffentlicher Produktpositionierung und sind keine unabhaengige Qualitaetsbewertung.' bzw. 'Abbildung 2 - Differenzierung entsteht als gestapeltes Betriebssystem, nicht als einzelnes AI- oder Dashboard-Feature.' Diese Originaltexte stehen im Markdown zusaetzlich unveraendert daneben, es geht also keine Aussage verloren und keine Anforderung wird veraendert. Nebenbefund: die referenzierten Dateien doc02_market_map.png und doc02_differentiation_stack.png existieren im Verzeichnis docs/concept/active/ nicht, die Bilder sind also tote Verweise.

*Betroffen:* Kein gebautes Artefakt betroffen - reine Darstellungsartefakte der Ableitung, keine Produktanforderung.

---

## Dokument 03 — SCHWERWIEGEND

Die Markdown-Fassung ist eine stark gekürzte Zusammenfassung des PDFs, keine treue Ableitung. Mehrere komplette Abschnitte fehlen vollständig: die RACI-Matrix der Entscheidungsrechte (Kap. 11), die Regel-Tabelle zu adaptiver Komplexität (Kap. 10), das Anfängererlebnis (10.1), die verbindlichen Demo-Accounts mit Logins (13.1), die Spalte "Erwartetes Plattformverhalten" der Arbeitssituationen (Kap. 8) sowie die Akzeptanzkriterien für die Folgedokumente (16.1). Zusätzlich fehlen bei ALLEN Rollen die Blöcke "ENTSCHEIDUNGEN / FREIGABEN" und "ERFOLGSSIGNALE", also genau die Autorisierungsgrenzen (z.B. Auditor "keine operative Änderung", Evidence Contributor "keine Risiko- oder Freigabeentscheidung"). An zwei Stellen ist eine Anforderung inhaltlich abgeschwächt (03-D06 verliert "Read-only", Kap. 14 verliert das Verbot der Personenüberwachung durch Einfügen von "verdeckt"), und die fünf Rollenfamilien werden im Markdown als benannte Liste erfunden.

**Nummerierung:** Die Hauptnummerierung 1-17 stimmt zwischen PDF-Folientiteln und Markdown exakt ueberein (1 Dokumentauftrag ... 17 Änderungsprotokoll); hier besteht keine Verwechslungsgefahr. Das Markdown folgt der Folientitel-Nummerierung. ABER: die gesamte zweite Ebene des PDFs fehlt im Markdown als Nummer. Betroffen sind 1.1, 1.2, 2.1, 3.1, 10.1, 10.2, 12.1, 13.1, 15.1, 15.2, 15.3 und 16.1 - im Markdown stehen dort unnummerierte Unterueberschriften oder gar nichts. Ein Verweis wie 'Dok 03 §13.1' (Verbindliche Demo-Accounts) oder '§16.1' (Akzeptanzkriterien) laesst sich im Markdown nicht aufloesen; 16.1 existiert dort ueberhaupt nicht. Zweitens: die Entscheidungs-IDs 03-D01 bis 03-D10 sind im Markdown erhalten, die Annahmen-IDs 03-A01 bis 03-A07 und die Fragen-IDs 03-Q01 bis 03-Q10 wurden dagegen ersatzlos durch unnummerierte Stichpunkte ersetzt. Ein Codekommentar oder ADR, der auf '03-A02' oder '03-Q07' verweist, findet im Markdown keinen Anker - die Reihenfolge stimmt zwar noch, ist aber nicht als verbindlich erkennbar. Drittens weichen drei Kapitelueberschriften ab (PDF 8 'Reale Arbeitssituationen und Nutzungsmomente' vs. MD 'Reale Arbeitssituationen'; PDF 10 'Kontext, Reife und adaptive Nutzerführung' vs. MD 'Adaptive Nutzerführung'; PDF 14 'Rollenbezogene Erfolgs- und Qualitätsindikatoren' vs. MD 'Rollenbezogene Erfolgsindikatoren') - inhaltlich passend zu den jeweils weggelassenen Teilen, aber bei Suche nach Kapitelnamen irrefuehrend.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] Kap. 11 Zusammenarbeit, Handoffs und Entscheidungsrechte - RACI-Tabelle**

> Entscheidung / Ergebnis | Accountable | Responsible | Freigabe / Gate | Consulted / Informed -- Zielprofil ändern: Executive Sponsor / CISO / ISMS Manager / Engagement Manager / betroffene Owner ... Risiko akzeptieren: benannter Risk Owner / CISO / Consultant / Executive Sponsor nach Schwellenwert / Auditor / Compliance

Die gesamte Matrix mit acht Entscheidungstypen und je vier Rollenzuordnungen fehlt. Damit fehlt die einzige Quelle dafür, WER welche Entscheidung verantwortet, ausführt, freigibt und wer zu konsultieren ist. Ein Freigabe-/Gate-Modell laesst sich aus dem Markdown nicht ableiten.

*Betroffen:* Jedes Approval-/Workflow-Modell, Decision Center (Dok 10), Rechtekonzept (Dok 19)

**[hoch] Kap. 16.1 Akzeptanzkriterien für nachfolgende Dokumente**

> Jede Kernfunktion in Dokument 05 nennt mindestens eine primäre Rolle und eine reale Nutzungssituation. ... Dokument 19 übersetzt die Rollen in ein mandanten-, objekt-, auftrags- und zweckgebundenes Rechtekonzept. Demo-Daten bilden mindestens drei Kundenprofile und neun Rollen glaubwürdig ab.

Der komplette Abschnitt 16.1 mit sechs verbindlichen Akzeptanzkriterien fehlt im Markdown. Diese Kriterien sind Pruefmassstab fuer die Dokumente 04, 05, 06, 15, 19 und die Demo-Daten. Ohne sie existiert kein dokumentiertes Done-Kriterium fuer die Folgearbeit.

*Betroffen:* Alle Work Packages, die aus Dok 04/05/06/15/19 abgeleitet werden; Demo-Daten-WP

**[hoch] Kap. 4-7, alle Rollensteckbriefe - Bloecke ENTSCHEIDUNGEN / FREIGABEN und ERFOLGSSIGNALE**

> ENTSCHEIDUNGEN / FREIGABEN: Nur Zuarbeit im zugewiesenen Scope; keine Risiko- oder Freigabeentscheidung. ... ENTSCHEIDUNGEN / FREIGABEN: Prüffeststellung und Bewertung; keine operative Änderung. Konflikte und Unabhängigkeit müssen sichtbar sein. ... keine automatische Änderung des Kundenrisikos ohne definierte Freigabe.

Das Markdown uebernimmt pro Rolle nur Mission/Jobs/Plattformbedarf und laesst die Entscheidungsrechte und Erfolgssignale aller zwoelf Rollen weg. Damit fehlen die negativen Autorisierungsgrenzen ('keine ...'), die serverseitig erzwungen werden muessten, sowie die Wirksamkeitsmessung je Rolle.

*Betroffen:* Rollen-/Rechtemodell, Audit Workspace, Evidence-Contributor-One-task-Flow

**[hoch] Kap. 10 Kontext, Reife und adaptive Nutzerführung - Tabelle mit Spalte 'Regel'**

> Komplexität wird schrittweise freigegeben ... seltene Nutzer sehen keine interne Systemkomplexität ... jede Ebene kann in die Begründung drillen ... Unsicherheit wird sichtbar, nicht versteckt ... Zielprofil steuert Oberfläche und Priorität ... kritische Kernhandlungen sind mobil möglich

Die sechs Dimensionen mit jeweils einfachem Modus, vertieftem Modus und einer verbindlichen Regel sind auf zwei Fliesstextsaetze reduziert. Alle sechs Regeln - darunter die Mobil-Pflicht fuer kritische Kernhandlungen und das Sichtbarmachen von Unsicherheit - fehlen als Anforderung.

*Betroffen:* UX-Modi (Dok 06), Confidence-/Lineage-Anzeige, Mobile-Anforderungen

**[hoch] Kap. 10.1 Anfängererlebnis**

> Der erste Login erklärt in einem Satz Rolle, Ziel und nächsten Schritt. ... Neue Nutzer sehen keine leere Plattform, sondern realistische Startdaten, geführte Aufgaben oder eine klare Einladung. ... Fehlerzustände erklären Konsequenz und Korrektur, nicht nur einen Fehlercode.

Der Abschnitt mit fuenf konkreten UI-Anforderungen fehlt vollstaendig. Das betrifft Empty States, Error States und Bestaetigungen nach Zuarbeit - also genau die Zustaende, die die Frontendregeln als Teil von Done verlangen.

*Betroffen:* Onboarding/First-Login, Empty- und Error-States (Dok 06)

**[hoch] Kap. 13.1 Verbindliche Demo-Accounts**

> alex.meyer | Managed Service Lead ... julia.koch | Engagement Manager ... samir.wolff | ISMS Consultant ... dr.lena.hartmann | Executive Sponsor ... tobias.klein | CISO / Security Lead ... maria.santos | ISMS Manager ... oliver.brandt | Control Owner ... eva.schulz | Auditor ... nina.becker | Tenant Administrator

Die Ueberschrift lautet 'Verbindliche Demo-Accounts'. Das Markdown nennt nur 'Neun Demo-Accounts decken ... ab' ohne einen einzigen Login-Namen und ohne den demonstrierten Nutzen. Die Demo-Logins sind stabile IDs; ohne sie wuerden Seed-Daten frei erfunden. Im Repo taucht noch keiner der Namen auf, der Schaden ist also noch abwendbar.

*Betroffen:* Demo-/Seed-Daten, Deterministic Demo Mode, Reset-Skript

**[hoch] Kap. 8 Reale Arbeitssituationen - Spalte 'Erwartetes Plattformverhalten'**

> Morning Mission verdichtet Veränderungen, Wirkung, Fristen, Kapazität, Reisezeit und Kundenpriorität. ... Betroffene Assets, Prozesse, Controls, Risiken, Owner und Services werden verknüpft; Route und Mission werden neu berechnet. ... Vertrauensindikator zeigt Unsicherheit und priorisiert die kleinste Datenerhebung mit höchstem Erkenntniswert.

Das Markdown listet nur die zehn Situationen, nicht aber das erwartete Systemverhalten und die Realitaetsspalte. Damit faellt die eigentliche funktionale Anforderung je Situation weg - das Markdown wird von einer Spezifikation zu einer Aufzaehlung.

*Betroffen:* Morning Mission, Betroffenheitsanalyse, Auditvorbereitungs-Workflow

**[hoch] Kap. 12.1 Unabhängigkeit und Interessenkonflikte**

> Das Produkt muss Rollen- und Auftragskonflikte sichtbar machen, getrennte Workspaces ermöglichen und verhindern, dass ein Nutzer dieselbe Kontrolle unbemerkt implementiert und unabhängig bestätigt.

Eine Muss-Anforderung mit Segregation-of-Duties-Charakter ist auf den Stichpunkt 'sichtbare Trennung von Beratung, Betrieb und unabhängiger Prüfung' reduziert. Die technische Verhinderung von Selbstbestaetigung ist im Markdown nicht mehr als Anforderung erkennbar.

*Betroffen:* Rechte-/Konfliktpruefung, Audit Workspace

**[hoch] Kap. 12 Zugriff, Datenschutz und Vertrauensgrenzen - 'Sichere Exporte' und Einleitung**

> Personas dürfen nicht mit pauschalen Vollzugriffen umgesetzt werden. ... Sichere Exporte: PDF, PPTX und Datenexporte tragen Scope, Datenstand, Klassifizierung und Freigabestatus.

Das Markdown verkuerzt auf 'sichere und klassifizierte Exporte'. Die vier verpflichtenden Metadatenfelder jedes Exports (Scope, Datenstand, Klassifizierung, Freigabestatus) und das Verbot pauschaler Vollzugriffe fehlen als Pflichtangabe.

*Betroffen:* Reporting-/Export-Engine (Dok 12), Export-Manifest

**[hoch] Kap. 11 - Pflichtfelder des Decision Record**

> Kritische Entscheidungen werden als strukturierte Decision Records gespeichert: Entscheidung, Optionen, Begründung, Datenstand, Unsicherheit, Wirkung, Entscheider, Freigabe und spätere Überprüfung.

Das Markdown listet 'Optionen, Begründung, Datenstand, Unsicherheit, Wirkung, Entscheider und spätere Überprüfung' - die Felder 'Entscheidung' und 'Freigabe' fehlen. Ein daraus abgeleitetes Datenmodell haette kein Freigabefeld, obwohl Freigaben an anderer Stelle verbindlich gefordert sind.

*Betroffen:* Decision-Record-Datenmodell, Decision Center

**[mittel] Kap. 1.2 Bewusste Abgrenzung und DESIGN-THINKING-REGEL**

> Eine Rolle ist nicht durch ihren Titel definiert, sondern durch Situation, Ziel, Informationsbedarf, Verantwortung, Unsicherheit und Konsequenz einer Entscheidung. Das Produkt muss diese Realität abbilden.

Die als eigener Merkkasten hervorgehobene Design-Thinking-Regel fehlt komplett. Ebenso fehlt in der Abgrenzung, dass Dokument 03 'kein vollständiges IAM-Berechtigungsmodell und keine Stellenbeschreibungen eines konkreten Unternehmens' definiert - eine Abgrenzung, die Fehlinterpretationen des Rollenmodells verhindert.

**[mittel] Kap. 11 Einleitung**

> Die Plattform muss Verantwortungsdiffusion verhindern. ... Kommentare allein ersetzen keine Entscheidung.

Der zweite Satz - eine klare Negativregel gegen 'Entscheidung per Kommentar' - fehlt im Markdown. Er ist relevant fuer die Ausgestaltung von Kommentar- und Freigabefunktionen.

*Betroffen:* Kommentar-/Kollaborationsmodell (Dok 11)

**[mittel] Kap. 3.1 Rollenprinzipien**

> Vertretung und Delegation sind zeitlich begrenzt, nachvollziehbar und widerrufbar. ... Externe Auditoren erhalten einen kontrollierten Prüfbereich statt pauschalem Vollzugriff.

Das Markdown schreibt 'zeitlich begrenzt und protokolliert' - die Eigenschaft 'widerrufbar' (aktiver Widerruf einer Delegation) fehlt und ist nicht dasselbe wie protokolliert. Ebenso entfaellt die Abgrenzung 'statt pauschalem Vollzugriff' und der Bezug auf EXTERNE Auditoren.

*Betroffen:* Delegations-/Vertretungsfunktion, Auditor-Zugriff

**[mittel] Kap. 13 Demo-Organisationen - Tabelle Profil / Ziel / Wichtige Rollen**

> Nordwerk Manufacturing SE | Mittelständischer Produktionsverbund, mehrere Standorte | Reifegrad 3 erreichen, OT/IT-Risiken priorisieren, begrenzte interne Kapazität | Executive Sponsor, CISO, ISMS Manager, Plant Owner, Berater

Das Markdown nennt nur die vier Firmennamen. Profil, Zielsituation und die je Organisation vorgesehenen Rollen fehlen - damit fehlt die dokumentierte Storyline, die die Demo-Datenregeln verlangen.

*Betroffen:* Demo-Storyline, Seed-Daten

**[mittel] Kap. 13 ENTSCHEIDUNG zu Demo-Daten**

> Alle Demo-Daten sind erfunden, konsistent, versioniert und als synthetisch gekennzeichnet.

Das Markdown uebernimmt nur den zweiten Satz (kein PwC-/Kundendatenbezug). Die positive Anforderung - konsistent, versioniert und sichtbar als synthetisch gekennzeichnet - fehlt.

*Betroffen:* Demo-Datenversionierung, Kennzeichnung im UI

**[mittel] Kap. 14 Erfolgs- und Qualitätsindikatoren - Tabelle**

> Executive: Entscheidungen geöffnet, Optionen verglichen, Report genutzt | Entscheidungszeit, weniger Rückfragen, bestätigte Wirkung ... Admin / Operations: Provisioning-Zeit, Supportfälle, Sync-Health | Fehlkonfigurationen, MTTR, Datenschutzkonformität

Die Tabelle mit acht Rollengruppen und je zwei Indikatorenkategorien ist auf einen Satz mit Beispielen reduziert. Die konkreten Fruehindikatoren pro Rolle fehlen als messbare Groessen.

*Betroffen:* KPI-/Analytics-Modell (Dok 10)

**[mittel] Kap. 9 Rollenübergreifende Jobs-to-be-done - Spalte 'damit ...'**

> Nachweis | eine Umsetzung belegt werden muss | gültige Evidenz einfach zuordnen und wiederverwenden | Prüfbarkeit ohne Dokumentenjagd entsteht ... Lernen | eine Maßnahme abgeschlossen ist | tatsächliche Wirkung bestätigen und Route anpassen | Fortschritt nicht mit Aktivität verwechselt wird

Das Markdown behaelt die acht Jobs, streicht aber Ausloeser ('Wenn ...') und Zweck ('damit ...'). Damit geht der Erfolgsmassstab jedes Jobs verloren, z.B. 'Fortschritt nicht mit Aktivität verwechselt wird'.

**[mittel] Kap. 8 Einleitung**

> Nutzer öffnen die Plattform selten „um Daten zu pflegen“. Sie öffnen sie, weil eine Entscheidung, Frist, Veränderung, Besprechung oder Zuarbeit ansteht. Das Produkt muss deshalb ereignis- und missionsorientiert führen.

Die verbindliche Gestaltungsvorgabe 'ereignis- und missionsorientiert führen' fehlt im Markdown vollstaendig. Sie ist die Begruendung fuer Morning Mission und Deep-Link-Flows.

*Betroffen:* Navigations- und Einstiegskonzept (Dok 06)

**[niedrig] Kap. 8, Zeile 'Morgenstart eines Beraters'**

> 08:00, 45 Mandanten, zwei Reisen und ein Audit in 9 Tagen

Die konkreten Groessenordnungen (45 Mandanten pro Berater) sind im Markdown zu 'mit vielen Mandanten' verallgemeinert. Die Zahl ist eine implizite Skalierungsannahme fuer Portfolio-Sichten.

*Betroffen:* Portfolio-/Kapazitaetsplanung (Dok 15)

**[niedrig] Kap. 16 Ideenparkplatz - Spalte 'Nutzen'**

> Skill- und Staffing-Matching | Portfolioarbeit berücksichtigt Fähigkeiten, Zertifizierungen, Verfügbarkeit, Standort und Reiseaufwand.

Das Markdown listet nur die acht Ideentitel ohne Nutzenbeschreibung. Geringe Auswirkung, da Ideenparkplatz nicht bindend ist.

### Nur im Markdown, vom PDF nicht getragen

**[hoch] Kap. 2 Nutzer- und Betreiberökosystem - Liste der fünf Rollenfamilien**

> Fünf Rollenfamilien arbeiten auf einem gemeinsamen Datenmodell: 1. Executive & Governance; 2. Kunde / ISMS-Betrieb; 3. Beratung / Managed Service; 4. Assurance & Review; 5. Plattform & Betrieb.

Das PDF nennt in der Zwischenzeile nur 'Drei Erlebniswelten, fünf Rollenfamilien, ein gemeinsames Datenmodell' und beschreibt im Fliesstext andere Gruppen: 'Management, ISMS-Verantwortliche, fachliche Owner, Nachweislieferanten und Auditoren' beim Kunden sowie 'Serviceleitung, Engagement Management und Fachberater' beim Betreiber. Die fuenf benannten Familien im Markdown sind eine Erfindung der Ableitung (offenbar aus den Kapitelueberschriften 4-7 rekonstruiert). Wer sie als Taxonomie implementiert, baut eine Gruppierung, die das Original nicht traegt.

*Betroffen:* Rollengruppierung in Navigation, Rechte- oder Seed-Modellen

**[hoch] Kap. 14 Rollenbezogene Erfolgsindikatoren - Schlusssatz**

> Kennzahlen dienen nicht zur verdeckten individuellen Mitarbeiterüberwachung.

Das PDF formuliert an dieser Stelle absolut: 'Kennzahlen dienen nicht zur Überwachung einzelner Personen. ... Individuelle Leistungsbewertung ist kein Produktziel.' Das Wort 'verdeckt' stammt aus Entscheidung 03-D10 und wird hier faelschlich in die Kapitel-14-Regel importiert. Dadurch wird aus einem Verbot der Personenueberwachung ein blosses Verbot der HEIMLICHEN Ueberwachung - offen ausgewiesenes Personen-Monitoring waere nach dem Markdown zulaessig, nach dem PDF nicht. Zusaetzlich fehlen die Vorgaben 'aggregiert, zweckgebunden und transparent'.

*Betroffen:* Analytics-/Telemetriemodell, Datenschutzkonzept (Dok 19)

**[hoch] Kap. 15 Entscheidungen - 03-D06**

> 03-D06 Kontrollierter Audit Workspace.

Das PDF entscheidet: 'Auditoren arbeiten in einem kontrollierten Read-only Audit Workspace.' Die Eigenschaft 'Read-only' - die harte technische Restriktion - fehlt in der Markdown-Entscheidung. Da Code und Reviews auf die D-Nummern verweisen, kann ein Audit-Workspace mit Schreibrechten gebaut und trotzdem als 03-D06-konform gelten. Im Rollensteckbrief (Kap. 7) ist 'Read-only Audit Workspace' im Markdown zwar erhalten, die Entscheidungsliste widerspricht ihm aber in der Verbindlichkeit.

*Betroffen:* Audit Workspace, Auditor-Rechte (Dok 19)

**[mittel] Kap. 15 Entscheidungen - 03-D01**

> 03-D01 Drei Erlebniswelten.

Das PDF benennt sie konkret: 'Drei primäre Erlebniswelten: Executive, Kunde/ISMS und Beratung/Operations.' Das Markdown laesst offen, welche drei es sind, und legt an anderer Stelle stattdessen fuenf Rollenfamilien fest. Damit ist die zentrale Erlebniswelt-Einteilung im Markdown nicht mehr eindeutig bestimmbar.

*Betroffen:* UX-Erlebniswelten (Dok 06), Navigationsstruktur

**[mittel] Kap. 3 Rollentabelle - R11 Specialist Consultant**

> | R11 | Specialist Consultant | Betreiber | Spezialanalyse und Review |

Das PDF definiert R11 als 'Spezialanalyse etwa Cloud, IAM, BCM, Supplier Risk oder Threats'. Das Markdown streicht die fuenf Fachdomaenen und ergaenzt stattdessen 'Review'. 'Review' ist im PDF ein Teil der Entscheidungsrechte ('Spezialempfehlung und Review'), nicht der Kernverantwortung - die Kernverantwortung wurde also umformuliert und die Domaenenliste ging verloren.

**[mittel] Kap. 10 Adaptive Nutzerführung - Nachvollziehbarkeit von Aktionen**

> Der aktive Modus ist sichtbar; Aktionen tragen Rolle, Mandant, Zeitpunkt und Datenstand.

Das PDF verlangt: 'Aktionen, Freigaben und Exporte tragen Rolle, Mandant, Zeitpunkt und Datenstand.' Das Markdown reduziert den Geltungsbereich auf 'Aktionen'; Freigaben und Exporte sind nicht mehr ausdruecklich erfasst, obwohl gerade Exporte an anderer Stelle Metadatenpflichten haben.

*Betroffen:* Audit Trail, Exportmetadaten

**[niedrig] Kap. 9 Rollenübergreifende Jobs-to-be-done, Punkt 5**

> 5. Nachweisen - Evidenz zuordnen, validieren und wiederverwenden.

Das PDF formuliert 'gültige Evidenz einfach zuordnen und wiederverwenden'. Ein eigener Schritt 'validieren' als Nutzerjob steht dort nicht; im PDF ist Gueltigkeit eine Eigenschaft der Evidenz, kein Arbeitsschritt des Nutzers. Kleine, aber funktional relevante Verschiebung, falls daraus ein Validierungsworkflow abgeleitet wird.

**[niedrig] Kap. 9 Rollenübergreifende Jobs-to-be-done, Punkt 8**

> 8. Lernen - tatsächliche Wirkung bestätigen und Zielroute neu berechnen.

Das PDF sagt 'tatsächliche Wirkung bestätigen und Route anpassen'. 'Neu berechnen' impliziert eine automatische Systemberechnung, 'anpassen' eine Anpassung. Formulierungsverschaerfung ohne Deckung im Original.

**[niedrig] Kap. 2 Primäre Zielgruppen - Tabelle Nutzungslogik**

> | Beratungs- und Managed-Service-Anbieter | ... | Betreiber, Käufer und Leistungserbringer |

Das PDF nennt vier Funktionen: 'Betreiber, Käufer, Administrator und Leistungserbringer'. Die Rolle 'Administrator' fehlt im Markdown; ebenso fehlt bei den regulierten Unternehmen die Funktion 'Mitwirkender' ('Kunde, Dateninhaber, Entscheider und Mitwirkender'). Kleine, aber systematische Kuerzung der Zielgruppenlogik.

---

## Dokument 04 — SCHWERWIEGEND

Die Markdown-Fassung ist eine starke Verdichtung, keine treue Ableitung: Fünf normative Tabellen des PDF (Lebenszyklus-Gates und verbindliche Outputs in §3, Journey-Zustände mit Bedeutung und erlaubten Folgeschritten in §4, Anfänger-Momente in §9.1, Fehler- und Eskalationsverhalten in §10, Journey-Metriken mit unzulässigen Fehlinterpretationen in §11) sind auf blosse Namenslisten reduziert - das gesamte vorgeschriebene Verhalten fehlt. Zwölf der dreizehn Nutzerreisen haben im Markdown keine Akzeptanzkriterien, keine Vertrauensanforderungen und keinen Fehler-/Rückkehrpfad mehr, obwohl genau daraus Tests und Definition of Done abzuleiten waeren. Zusaetzlich wurden Anforderungen abgeschwaecht (04-D06 verliert "sensible Exporte", 04-D10 verliert "vor Veröffentlichung", 04-D13 verliert "frühere Scopes"/"rückwirkend") und in §4 ein Rhythmus "Orientieren, Bewerten, Entscheiden, Umsetzen, Nachweisen und Lernen" erfunden, der der verbindlichen Entscheidung 04-D01 widerspricht. Die Abschnittsnummerierung 1-16, die Journey-IDs J01-J13 und die Decision-IDs 04-D01 bis 04-D14 stimmen dagegen exakt ueberein; nur die IDs der offenen Fragen (04-O01 bis 04-O10) fehlen im Markdown vollstaendig.

**Nummerierung:** Keine Verwechslungsgefahr bei Abschnitten und Entscheidungen: PDF und Markdown fuehren identisch die Abschnitte 1 bis 16 mit gleichen Titeln, die Nutzerreisen J01 bis J13 in gleicher Reihenfolge und gleicher Zuordnung zu den Abschnitten 5 bis 8, sowie die Entscheidungen 04-D01 bis 04-D14 in gleicher Nummerierung. Das PDF hat in dieser Extraktion keine abweichend nummerierte Navigationsleiste. ABER: Die offenen Fragen tragen im PDF die IDs 04-O01 bis 04-O10 mit jeweils einem Klaerungsziel ("Spätestens zu klären in Dokument xx"). Im Markdown-Abschnitt 14 sind alle zehn IDs und alle Klaerungsziele ersatzlos entfallen; es steht nur eine ID-lose Stichwortliste. Ein Codekommentar oder Konzeptverweis auf 04-O03 oder 04-O06 laesst sich damit aus dem Markdown allein nicht mehr aufloesen.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] §3 Vollständiger Kunden- und Service-Lebenszyklus (Tabelle)**

> Phase Eintrittskriterium Austritts-Gate Verbindlicher Output | Entdecken ... Discovery Summary | Onboarden ... Onboarding Record | Baselinen ... Baseline v1 | Aktivieren ... Service Charter | Betreiben ... Betriebsjournal | Prüfen ... Review Record | Anpassen ... Change Decision | Übergeben ... Exit Package

Das PDF definiert je Lebenszyklusphase ein Eintrittskriterium, ein Austritts-Gate und einen VERBINDLICHEN OUTPUT. Das Markdown ersetzt die gesamte Tabelle durch eine achtzeilige Stichwortliste ohne Gates und ohne die acht Pflichtartefakte. Damit fehlt die komplette Uebergangslogik des Lebenszyklus - wann eine Phase betreten und wann sie verlassen werden darf und welches Artefakt dabei zwingend entsteht.

*Betroffen:* Lebenszyklus-/Onboarding-Modellierung (docs/concept/active/16_KUNDEN_ONBOARDING_ZIELPROFIL_LIFECYCLE_v1.0.md, packages/demo-seed/src/managed-services.ts)

**[hoch] §4 Journey-Zustände (Tabelle)**

> Zustand Bedeutung Erlaubte nächste Schritte | Entwurf ... Vervollständigen, verwerfen, zur Prüfung senden. | Blockiert ... Blocker lösen, Route ändern, Frist neu entscheiden. | Überholt Ziel, Scope oder Datenlage hat sich verändert. Neue Version erzeugen; Historie erhalten.

Das PDF definiert fuer alle acht Journey-Zustaende Bedeutung UND erlaubte naechste Schritte, also faktisch eine Zustandsmaschine mit erlaubten Transitionen. Das Markdown listet nur die acht Zustandsnamen. Jede im Code implementierte Zustandslogik konnte daher nicht aus der Projektwahrheit abgeleitet werden, sondern musste erraten werden.

*Betroffen:* packages/contracts/src/vocabularies.ts (Statusvokabulare, u. a. 'Überholt', 'blockiert', 'Wirksamkeitsprüfung')

**[hoch] §10 Fehler-, Sonder- und Eskalationsreisen (Tabelle)**

> Situation Sicheres Standardverhalten Eskalation / Wiederanlauf | Daten widersprechen sich: Keine automatische Überschreibung; beide Quellen und Konflikt markieren. | Mandantenkontext unklar: Schreibaktionen sperren; aktiven Kontext erneut bestätigen. | Export enthält sensible Daten: Export vor Freigabe blockieren oder klassifizieren.

Das PDF schreibt fuer elf Stoerungssituationen jeweils ein sicheres Standardverhalten und einen Eskalations-/Wiederanlaufweg vor - darunter harte Sicherheitsregeln wie das Sperren von Schreibaktionen bei unklarem Mandantenkontext und das Blockieren sensibler Exporte vor Freigabe. Das Markdown nennt nur die zehn Situationsnamen in einem Satz. Das gesamte vorgeschriebene Verhalten fehlt, obwohl das PDF ausdruecklich sagt: 'Fehlerfälle sind Teil des Produktkerns.'

*Betroffen:* Tenant-Scope- und Export-Guardrails (docs/concept/active/19_SICHERHEIT_DATENSCHUTZ_RECHTE_AUDITIERBARKEIT_v1.0.md)

**[hoch] §11 Journey-Messung und Service-Erfolg (Tabelle)**

> Messbereich Beispielkennzahlen Nicht zulässige Fehlinterpretation | Servicequalität: SLA, First-time-right, Eskalationen, Review-Ergebnis, Kundennutzen. Mitarbeiter dürfen nicht über rohe Aktivitätsmengen überwacht werden. | Vertrauen ... Hohe Akzeptanz darf nicht durch versteckte Defaults erzwungen sein.

Das PDF definiert je Messbereich konkrete Beispielkennzahlen und - wichtiger - eine ausdruecklich NICHT ZULAESSIGE Fehlinterpretation. Beides fehlt im Markdown vollstaendig. Damit ist weder messbar noch pruefbar, was ein KPI bedeuten darf und was verboten ist.

**[hoch] Akzeptanzkriterien J02 bis J13**

> Akzeptanzkriterien: Jede Maßnahme besitzt eine testbare Definition of Done, einen nachvollziehbaren Review und einen sichtbaren Effekt auf mindestens ein Ziel oder Risiko. (J08); Ein Nutzer kann innerhalb von 30 Sekunden seine drei wichtigsten Handlungen und deren erwartete Wirkung benennen. (J06)

Das PDF gibt jeder der dreizehn Reisen ein explizites Akzeptanzkriterium. Im Markdown existiert nur bei J01 ein Akzeptanzkriterium; bei J02 bis J13 fehlen sie ersatzlos. Da das Projekt Tests laut .claude/rules/testing.md aus Acceptance Criteria ableitet, fehlt fuer zwoelf Kernreisen die Testgrundlage.

**[hoch] Vertrauen & Emotion und Fehler-/Rückkehrpfad in J02 bis J13**

> Fehler- und Rückkehrpfad (J06): Bei Überlastung schlägt die Plattform Umpriorisierung, Vertretung, Serviceunterstützung oder Fristentscheidung vor. Kritische Aufgaben dürfen nicht still nach hinten rutschen.

Das PDF gibt jeder Reise einen eigenen Vertrauens- und einen Fehler-/Rückkehrpfad-Block. Das Markdown behaelt beides nur bei J01 (und in Resten bei J06, J09, J10, J12). Damit sind die im Zweck des Dokuments ausdruecklich versprochenen Wiederanlaufpfade fuer die meisten Reisen nicht mehr Bestandteil der Projektwahrheit.

**[hoch] §4 Übergabeprinzipien**

> Übergaben sind sichtbar angenommen, abgelehnt, delegiert oder überfällig. Stille Verantwortungswechsel sind nicht zulässig.

Eine ausdrueckliche Verbotsregel ('nicht zulässig') samt vier Pflichtzustaenden fuer Uebergaben fehlt im Markdown vollstaendig. Ein Uebergabe-/Delegationsmodell ohne diese vier sichtbaren Zustaende erfuellt das PDF nicht.

*Betroffen:* Aufgaben-/Delegationsmodell (docs/concept/active/11_ZUSAMMENARBEIT_AUFGABEN_KOMMUNIKATION_v1.0.md)

**[hoch] §4 Übergabeprinzipien**

> Jede freigegebene Entscheidung erzeugt einen Decision Record und kann später anhand tatsächlicher Wirkung überprüft werden.

Die generelle Pflicht, dass JEDE freigegebene Entscheidung einen Decision Record erzeugt, fehlt im Markdown. Dort erscheint der Decision Record nur noch als Ergebnis einzelner Reisen (J07, J10), nicht als uebergreifende Regel.

**[hoch] J11 Vertrauen & Emotion**

> Keine automatische Veröffentlichung. KI-generierte Formulierungen sind als Entwurf behandelt; Zahlen und Aussagen müssen auf Plattformdaten zurückführbar sein.

Drei harte Reporting-Regeln fehlen im Markdown: Verbot automatischer Veröffentlichung, Entwurfsstatus KI-generierter Formulierungen, Rueckfuehrbarkeitspflicht aller Zahlen. Das Markdown sagt zu J11 nur 'Exporte werden freigegeben, versioniert und protokolliert'.

*Betroffen:* Reporting-/Presentation-as-Code-Strang (.claude/rules/reporting.md, Claims mit Quelle/Methodik/Confidence)

**[hoch] J11 Fehler- und Rückkehrpfad**

> Bei fehlenden Daten wird kein scheinbar vollständiger Bericht erzeugt. Lücken erscheinen als klarer Platzhalter, Ausschluss oder offene Prüfaufgabe.

Verbindliches Verhalten der Reporting Engine bei Datenluecken (drei erlaubte Darstellungsformen) fehlt im Markdown komplett. Ein Generator, der Luecken stillschweigend fuellt oder weglaesst, verletzt das PDF.

**[hoch] J05 Ablauf Schritt 5 und Fehlerpfad**

> Vor Aktivierung werden Shared Responsibility, Ausschlüsse, Eskalationen, Reporting und Exit-Regeln bestätigt. ... Wenn Preis, SLA oder Vertrag noch nicht final sind, kann ein nicht produktiver Simulationsmodus genutzt werden. Produktive Aufgaben starten erst nach Freigabe.

Fuenf Pflichtbestaetigungen vor Serviceaktivierung und die Regel, dass produktive Aufgaben erst nach Freigabe starten (davor nur nicht produktiver Simulationsmodus), fehlen im Markdown. Das ist ein Aktivierungs-Gate, das im Code als Zustandsschranke haette existieren muessen.

**[hoch] J07 Ablauf Schritte 2 und 4**

> Der digitale Zwilling ermittelt potenziell betroffene Objekte und unterscheidet bestätigt, wahrscheinlich und ungeklärt. ... Optionen werden simuliert: beobachten, kompensieren, behandeln, akzeptieren, transferieren oder Service aktivieren.

Zwei geschlossene Wertelisten fehlen im Markdown: die drei Betroffenheitsgrade (bestätigt/wahrscheinlich/ungeklärt) und die sechs Handlungsoptionen. Das Markdown schreibt nur 'auf potenziell betroffene Objekte abgebildet ... und in Handlungsoptionen übersetzt'. Beide Listen sind typische Enums - ohne sie wurde vermutlich frei erfunden.

*Betroffen:* Risikobehandlungs-/Vokabular-Ebene (packages/contracts/src/vocabularies.ts)

**[hoch] §12 Entscheidung 04-D06**

> 04-D06: Aktivierung, Scope, risikorelevante Entscheidungen und sensible Exporte benötigen menschliche Freigaben.

Das Markdown formuliert 04-D06 als 'Menschliche Freigabe für Scope, Aktivierung und risikorelevante Entscheidungen' und laesst SENSIBLE EXPORTE weg. Damit ist eine ausdrueckliche Freigabepflicht aus der verbindlichen Entscheidungsliste verschwunden - sicherheitsrelevant, weil Exporte ohne Human Gate gebaut worden sein koennen.

**[hoch] J09 Ablauf Schritt 3 und Vertrauen**

> Ein Audit Workspace stellt nur freigegebene, aktuelle und scopegerechte Evidenz bereit. ... Auditorunabhängigkeit, Zugriffstrennung und unveränderte Evidenzhistorie sind sichtbar.

Die drei Filterbedingungen des Audit Workspace (nur freigegeben, aktuell, scopegerecht) und die Sichtbarkeitspflichten zur Auditorunabhaengigkeit fehlen. Das Markdown sagt nur 'kontrollierter Audit Workspace' - eine Autorisierungsanforderung wurde zu einem Adjektiv.

**[mittel] §12 Entscheidungen 04-D10 und 04-D13**

> 04-D10: Berichte und Präsentationen werden aus demselben Datenmodell erzeugt und vor Veröffentlichung freigegeben. ... 04-D13: Historische Entscheidungen und frühere Scopes werden nicht rückwirkend überschrieben.

Im Markdown wird 04-D10 zu 'PDF/PPTX entstehen aus demselben Datenmodell und werden freigegeben' - der Zeitpunkt 'vor Veröffentlichung' entfaellt. 04-D13 verliert 'frühere Scopes' und 'rückwirkend'. Beide Kuerzungen schwaechen den Schutzumfang messbar ab.

**[mittel] §9.1 Der erste Kontakt eines vollständigen Anfängers (Tabelle)**

> Moment Nutzer denkt / fühlt Erforderliche Gestaltung | Einladung ... Absender, Organisation, Zweck, Frist und Datenschutz klar erklären. | Erste Seite ... Nur eine Aufgabe, Klartext, Fortschritt und Hilfe anzeigen. | Rückfrage ... Konkrete fachliche Begründung statt generischem Fehler.

Sechs definierte Momente mit jeweils erforderlicher Gestaltung fehlen im Markdown; dort steht nur ein zusammenfassender Absatz. Ebenso fehlt das ausdrueckliche Verbot 'Die Oberfläche darf deshalb nicht mit Scope, SoA, Control Mapping oder Risikomatrix beginnen' und die beiden konkreten Aufgabenbeispiele.

**[mittel] §9.2 Vertrauenssignale**

> Rollen- und Mandantenkontext: Aktive Rolle, Organisation und Scope bleiben sichtbar; Rollenwechsel wird bewusst bestätigt. ... Menschliche Entscheidung: Kritische Empfehlungen zeigen Freigabepflicht, Entscheider und Folgen einer Ablehnung. ... Unsicherheit: Die Plattform darf „nicht ausreichend belegt“ sagen

Das Markdown behaelt die sechs Ueberschriften, streicht aber jede Erlaeuterung. Konkrete UI-Pflichten (bewusste Bestaetigung des Rollenwechsels, Anzeige von Entscheider und Ablehnungsfolgen, Rollback und Änderungsprotokoll) sind damit nicht mehr Teil der Projektwahrheit.

**[mittel] §2 Journey-Architektur (Spalte Plattformleistung)**

> Nachweisen ... Evidenz, Review, Wirksamkeit, Audit Trail und Decision Record. | Handeln ... Workflow, Owner, SLAs, Reise-/Kapazitätsbezug und Eskalation. | Orientieren ... Rollenbezogenes Briefing, Datenstand, Priorität und Kontext.

Das Markdown uebernimmt Phase und Leitfrage, streicht aber die dritte Spalte 'Plattformleistung', die je Phase festlegt, was die Plattform konkret liefern muss. Der Rhythmus bleibt damit eine leere Huelle ohne Leistungszusage.

**[mittel] J02 Fehler- und Rückkehrpfad sowie Ablauf Schritt 4**

> Kritische Lücken blockieren nur betroffene Funktionen, nicht das gesamte Onboarding. ... Kanonische Produktrollen werden Personen zugeordnet; Vertretungen, Vier-Augen-Prinzip und Auditorzugriffe werden vorbereitet.

Eine Verhaltensregel zur Blockadegranularitaet und die Pflichtelemente Vier-Augen-Prinzip, Auditorzugriffe und Datenregion fehlen im Markdown. Dort steht nur 'Produktrollen und Vertretungen zuordnen'.

**[mittel] J13 Ablauf Schritte 3 und 5**

> Rechte und Integrationen werden stufenweise reduziert; notwendige Übergabezugriffe bleiben zeitlich begrenzt erhalten. ... Löschung, Aufbewahrung und rechtliche Holds werden ausgeführt.

Die Stufigkeit des Rechteabbaus, die zeitlich begrenzten Uebergabezugriffe und die rechtlichen Holds fehlen im Markdown ('Rechte und Integrationen werden kontrolliert reduziert'). Rechtliche Holds sind eine Compliance-Anforderung, die so nicht gebaut worden sein kann.

**[mittel] §14 Offene Fragen**

> ID Frage Spätestens zu klären in | 04-O03 Welche formalen Managementfreigaben und Schwellenwerte gelten im ersten Zielmarkt? Dokument 09 und 19 | 04-O06 Welche Daten müssen in einem Exit Package zwingend maschinenlesbar exportiert werden? Dokument 18 und 19

Alle zehn IDs 04-O01 bis 04-O10 und alle Klaerungsziele (Zieldokumente) fehlen im Markdown; uebrig bleibt eine ID-lose Stichwortliste. Verweise auf eine offene Frage lassen sich aus dem Markdown nicht mehr aufloesen, und die Faelligkeit gegenueber Dokument 05, 06, 09, 14, 15, 17, 18, 19 und 20C ist verloren.

**[mittel] §1 Leitsatz und §10 Entscheidung**

> Die Nutzerreise ist die eigentliche Produktlogik - Screens und Module dienen ihr. ... KI darf Qualität und Geschwindigkeit erhöhen, aber nicht die grundlegende Fortsetzungsfähigkeit bestimmen.

Der Leitsatz von Abschnitt 1 fehlt im Markdown ganz. Bei der ENTSCHEIDUNG in §10 uebernimmt das Markdown nur den ersten Satz und laesst die Praezisierung weg, was KI darf und was nicht.

**[mittel] J03, J04, J06, J08, J10, J12 - einzelne Pflichtdetails**

> Wenn Management keine endgültige Route freigibt, kann ein zeitlich begrenztes Arbeitsprofil genutzt werden. Es bleibt deutlich als Annahme markiert und löst eine Wiedervorlage aus. ... Bei fehlender Entscheidung bleibt der bisherige Zustand aktiv; die Plattform zeigt Konsequenz, spätesten Entscheidungszeitpunkt und Eskalationspfad.

Mehrere konkrete Fallback-Mechaniken fehlen: befristetes Arbeitsprofil mit Wiedervorlage (J03), Wiederherstellungsmission und 'letzte verlässliche Version bleibt verfügbar' bei Integrationsfehler (J04), Begruendungspflicht bei Rueckgabe ungeeigneter Evidenz und Eingabenerhalt (J08), Konsequenzanzeige bei ausbleibender Managemententscheidung (J10), 'Nutzer sehen deutlich, welche Version produktiv ist' (J12). Ebenso fehlt das Datenqualitätsprofil als Ergebnis von J04.

### Nur im Markdown, vom PDF nicht getragen

**[hoch] §4 Rollenübergreifender End-to-End-Entscheidungsfluss, Einleitungssatz**

> Kunde, Plattform und Service-Team durchlaufen gemeinsam Orientieren, Bewerten, Entscheiden, Umsetzen sowie Nachweisen und Lernen.

Dieser Satz steht so nirgends im PDF. Er nennt einen abweichenden Rhythmus mit den Phasennamen 'Bewerten' und 'Umsetzen', waehrend das PDF in §2 und in der verbindlichen Entscheidung 04-D01 durchgaengig 'Orientieren - Verstehen - Entscheiden - Handeln - Nachweisen - Lernen' festlegt. Im selben Markdown-Dokument stehen damit zwei widersprechende Phasenbenennungen. Wer den Rhythmus aus Abschnitt 4 statt aus 04-D01 implementiert hat, hat falsche Phasennamen gebaut.

*Betroffen:* Alles, was den Entscheidungsrhythmus als Phasenfolge abbildet (UI-Schrittleisten, Vokabulare in packages/contracts/src/vocabularies.ts)

**[hoch] §3 Vollständiger Kunden- und Service-Lebenszyklus, Liste**

> 3. **Baselinen:** Ist-Zustand, Datenvertrauen, digitaler Zwilling und Zielroute.  2. **Onboarden:** Organisation, Rollen, Scope und Strategie-DNA.

Das PDF ordnet die Zielroute NICHT der Baselinen-Phase zu, sondern nennt 'Zielroute und Serviceoptionen vorhanden' als EINTRITTSKRITERIUM der Phase Aktivieren; ebenso taucht die Strategie-DNA in der PDF-Lebenszyklustabelle nicht unter Onboarden auf. Das Markdown verschiebt Inhalte zwischen Phasen und ersetzt die Gate-Semantik durch eine Themenzuordnung. Zugleich entfaellt aus dem Onboarden-Gate der Punkt 'Datenschutz'. Eine daraus gebaute Phasenlogik ordnet Artefakte der falschen Phase zu.

*Betroffen:* Lifecycle-/Onboarding-Modell (docs/concept/active/16_KUNDEN_ONBOARDING_ZIELPROFIL_LIFECYCLE_v1.0.md)

**[hoch] §11 Journey-Messung und Service-Erfolg**

> Rohe Aktivität oder Uploadmenge sind keine ausreichenden Erfolgsindikatoren.

Das Markdown formt eine Datenschutz-Verbotsregel in eine Metrik-Qualitaetsaussage um. Das PDF sagt bei Servicequalität ausdruecklich: 'Mitarbeiter dürfen nicht über rohe Aktivitätsmengen überwacht werden.' Aus einem Verbot der Mitarbeiterueberwachung wird im Markdown ein blosser Hinweis auf Aussagekraft - die Schutzwirkung fuer Beschaeftigte ist verschwunden.

**[mittel] §2 Übergreifende Prinzipien, fünfter Punkt**

> Automatisierung darf vorbereiten; kritische Entscheidungen bleiben menschlich freigegeben.

Das PDF hat in §2 genau vier Prinzipien (Ein Datenraum, Ein roter Faden, Keine Sackgassen, Fortsetzbar). Dieses fuenfte Prinzip stammt aus den Uebergabeprinzipien in §4 und wurde dabei inhaltlich veraendert: Das PDF sagt 'Automatisierung darf vorbereiten, erinnern, klassifizieren und vorbefüllen; risikorelevante Entscheidungen bleiben ROLLENBASIERT freigegeben.' Aus 'rollenbasiert' wurde 'menschlich', aus 'risikorelevant' wurde 'kritisch', und die drei weiteren erlaubten Automatisierungsleistungen (erinnern, klassifizieren, vorbefuellen) fehlen.

**[mittel] §8 J11**

> Aus demselben Datenmodell entstehen Executive-Präsentation, Monatsbericht, Auditbericht oder Workshop-Unterlage.

Das PDF nennt 'Vorstandstermin, Monatsbericht, Service Review, Audit, Workshop oder spontane Eskalation' als AUSLOESER der Reise, nicht als Katalog erzeugbarer Artefakttypen. Das Markdown macht daraus vier Ausgabeformate und laesst dabei Service Review und spontane Eskalation weg. Ein daraus abgeleiteter Report-Typ-Enum waere erfunden und unvollstaendig.

*Betroffen:* Reporting-/Template-Katalog

**[mittel] §12 Entscheidung 04-D08**

> 04-D08: Umsetzung, Evidenz und Wirksamkeit sind getrennte Zustände.

Das PDF sagt: 'Umsetzung, Evidenz und Wirksamkeit werden getrennt behandelt.' Das Markdown erhebt sie zu 'Zuständen'. Das PDF fuehrt in §4 eine abschliessende Liste von acht Journey-Zustaenden, in der 'Umsetzung', 'Evidenz' und 'Wirksamkeit' nicht als Zustandsnamen vorkommen. Die Umformulierung legt ein Statusmodell nahe, das das PDF nicht traegt.

*Betroffen:* packages/contracts/src/vocabularies.ts (Status-/Nachweisvokabular)

**[mittel] §12 Entscheidung 04-D12**

> 04-D12: Exit und Datenportabilität sind Produktfunktionen.

Das PDF lautet: '04-D12: Exit, Export, Wissenstransfer und Löschung sind Produktfunktionen und keine spätere Betriebsnotiz.' Das Markdown ersetzt drei benannte Pflichtfunktionen (Export, Wissenstransfer, Loeschung) durch den im PDF an dieser Stelle nicht verwendeten Sammelbegriff 'Datenportabilität'. Wissenstransfer und Loeschung sind damit als eigenstaendige Produktfunktionen aus der Entscheidungsliste verschwunden.

**[mittel] §10 Fehler-, Sonder- und Eskalationsreisen**

> Wesentliche Fälle sind Integrationsausfall, widersprüchliche Daten, abgelehnte Empfehlung, nicht reagierender Owner, Rollenwechsel, Auditverschiebung, KI/API-Ausfall, sensibler Export, unklarer Mandantenkontext und fehlendes Budget oder Kapazität.

Das Markdown nennt 'Rollenwechsel', das PDF beschreibt aber den Fall 'Rolle oder Person verlässt Organisation' mit dem Standardverhalten 'Zugriff sofort kontrollieren; offene Verantwortungen sichtbar halten'. Ein Rollenwechsel ist etwas anderes als ein Ausscheiden aus der Organisation - der sicherheitskritische Offboarding-Fall ist im Markdown umbenannt und dadurch verharmlost. Ebenso faellt bei 'Auditverschiebung' der zweite Fall 'Reise fällt aus' weg.

**[niedrig] §2 Übergreifende Prinzipien, vierter Punkt**

> Fortsetzbarkeit nach Gerätewechsel, Vertretung, Reise oder späterem Login.

Das PDF sagt: 'Jede Reise kann nach Gerätewechsel, Vertretung oder späterem Login am letzten sicheren Zustand fortgesetzt werden.' Das Markdown ergaenzt den Ausloeser 'Reise' (nicht im PDF) und streicht zugleich die entscheidende Zusicherung 'am letzten sicheren Zustand'. Die Wiederaufnahme-Garantie verliert ihren definierten Zielzustand.

**[niedrig] §9 Anfängererlebnis**

> Ein vollständiger Anfänger erhält keine Fachbegriffs- oder Dashboardwand, sondern eine konkrete Aufgabe in Klartext.

Das PDF formuliert konkret und pruefbar: 'Die Oberfläche darf deshalb nicht mit Scope, SoA, Control Mapping oder Risikomatrix beginnen.' Das Markdown ersetzt diese vier namentlich verbotenen Einstiegselemente durch das im PDF nicht vorkommende Bild 'Dashboardwand'. Aus einem konkreten Verbot wird eine unpruefbare Metapher.

---

## Dokument 05 — SCHWERWIEGEND

Die Markdown-Fassung ist eine stark gekuerzte Zusammenfassung, nicht eine treue Ableitung: Von 20 PDF-Abschnitten bleiben 15, und mindestens fuenf vollstaendige Abschnitte fehlen ersatzlos (Architekturprinzipien, Betriebsfluss-Tabelle, globale Daten-/Ereignisfluesse, Demo-Welt, Fehlerfall-Tabelle, globale Akzeptanz- und Qualitaetskriterien, Dokumentabhaengigkeiten). Zusaetzlich fehlen die je vier Funktionsbullets aller 33 Module (rund 130 Funktionsaussagen), die Umsetzungsgrade U1/U2/U3 mit ihren Qualitaetsgrenzen und mehrere ausdruecklich als VERBINDLICH markierte Regeln. Gefaehrlich ist ausserdem, dass die zentrale ENTSCHEIDUNG in §1 umformuliert und ein Kriterium ausgetauscht wurde, dass die Liste der Flagship-Szenarien im Markdown gegenueber dem PDF veraendert und um zwei Eintraege erweitert ist und dass die Nummerierung durchgaengig abweicht. Wer im Code auf "Dokument 05 §7" oder §11 verweist, meint je nach Quelle unterschiedliche Inhalte.

**Nummerierung:** Das Markdown folgt einer EIGENEN Nummerierung (15 Abschnitte) und nicht der des PDF (20 Abschnitte). Die Abweichung beginnt ab Abschnitt 3: PDF §3 (Produktarchitektur) und §4 (Betriebsfluss) sind im Markdown zu §3 verschmolzen; PDF §5 (Domaenenuebersicht) und §6.1-6.7 (Domaenen A-G) sind zu Markdown §4 verschmolzen. Danach verschiebt sich alles um zwei bis fuenf Zaehler: PDF §7 Querschnittsfaehigkeiten = MD §5, PDF §8 Rollenmatrix = MD §6, PDF §9 Kanonische Zustaende = MD §7, PDF §11 Priorisierung = MD §8, PDF §13 Nicht-Ziele = MD §10, PDF §15 Verbindliche Entscheidungen = MD §11, PDF §16 = MD §12, PDF §17 = MD §13, PDF §18 = MD §14, PDF §20 = MD §15. PDF §10, §12, §14 und §19 haben im Markdown gar keine Entsprechung. Verwechslungsgefahr ist hoch und konkret: "Dok 05 §7" bedeutet im PDF Querschnittsfaehigkeiten, im Markdown Kanonische Zustaende; "§11" bedeutet im PDF Priorisierung/Umsetzungsgrade, im Markdown Verbindliche Entscheidungen. Stabil und unproblematisch sind nur die ID-basierten Verweise 05-D01..D15, 05-A01..A10 und 05-O01..O12 sowie die Modul-IDs M01-M33 - Zitate im Code sollten ausschliesslich diese IDs verwenden. Die Modulnummerierung 6.1-6.7 des PDF (Folientitel) taucht im Markdown gar nicht auf, dort heissen die Domaenen nur A. bis G.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] §5 Produktdomaenen und Modeluebersicht - Kasten VERBINDLICH**

> VERBINDLICH Eine simulierte Funktion muss klar als Demo- oder Beispieldatenlogik gekennzeichnet sein. Sie darf keine reale Integration, Live-Bedrohungsbewertung oder garantierte Risikowirkung vortaeuschen.

Die einzige ausdruecklich als VERBINDLICH markierte Kennzeichnungspflicht des Dokuments fehlt im Markdown vollstaendig. Ohne sie gibt es keine dokumentierte Pflicht, simulierte Bereiche in der UI als Demo-Logik zu markieren - das Verbot, eine Live-Bedrohungsbewertung vorzutaeuschen, ist im Projekt nie angekommen.

*Betroffen:* Alle U2-/Demo-Flaechen und der Deterministic Demo Mode; betrifft jede Oberflaeche mit simulierten Werten.

**[hoch] §14 Globale Akzeptanz- und Qualitaetskriterien (gesamter Abschnitt)**

> Die Kriterien gelten fuer jedes Modul und werden spaeter in detaillierte Tests und Definition of Done ueberfuehrt. ... Mandanten- und Rechtesicherheit: Zugriff wird serverseitig nach Mandant, Rolle, Objekt und Aktion geprueft.

Ein kompletter Abschnitt mit zwoelf Mindestkriterien (Nutzerwert, Kohaerenz, Nachvollziehbarkeit, Mandanten-/Rechtesicherheit, Fehlerverhalten, Wiederaufnahme, KI-Resilienz, Export, Performance, Barrierefreiheit, Testbarkeit, Dokumentation) samt geforderten Nachweisen fehlt. Das ist die pro Modul gueltige Definition of Done - sie wurde nie in die Projektwahrheit uebernommen.

*Betroffen:* Definition of Done und Testableitung fuer jedes Modul-Work-Package.

**[hoch] §10 Globale Daten-, Ereignis- und Entscheidungsfluesse (gesamter Abschnitt)**

> Normalisierung | Mapping, Dublettenpruefung, Konflikt und Quarantaene | Kein stilles Ueberschreiben widerspruechlicher Informationen

Der gesamte Abschnitt zur Ereignisverarbeitung fehlt: sieben Verarbeitungsstufen von Quellsignal bis Nachweis mit je einer Kontrollanforderung, plus die Prioritaetslogik. Damit fehlen unter anderem das Verbot des stillen Ueberschreibens und die Regel, dass Missionen nicht allein aus einem Risikoscore entstehen duerfen.

*Betroffen:* Integration Hub (M29), Digital Twin (M08), Morning Mission (M02) und jede Priorisierungslogik.

**[hoch] §10 Prioritaetslogik**

> Missionen und Portfolio-Prioritaeten duerfen nicht allein aus einem Risikoscore entstehen. Sie kombinieren Zielabweichung, Business Impact, Frist, SLA, Datenvertrauen, Abhaengigkeiten, verfuegbare Skills, Reise/Standort, Aufwand, erwartete Wirkung und menschliche Uebersteuerung.

Explizites Verbot mit vollstaendiger Faktorenliste fuer die Priorisierung. Fehlt es, kann eine reine Risikoscore-Sortierung gebaut werden, die dem PDF direkt widerspricht.

*Betroffen:* M02 Morning Mission, M04 Portfolio Cockpit, Decision Center.

**[hoch] §6.1-6.7 Modulbeschreibungen - Funktionsbullets aller 33 Module**

> M14 - Evidence & Assurance ... Evidence Requests und sichere Uploads / Mapping auf Control, Scope und Zeitraum / Qualitaetspruefung, Wiederverwendung und Ablauf / Pruefkette und nachvollziehbare Ablehnung

Das PDF gibt jedem der 33 Module vier konkrete Funktionsbullets. Das Markdown uebernimmt nur Kernfrage, Einzeiler und Rollen und laesst rund 130 Funktionsaussagen weg - der eigentliche Funktionsumfang, den das Dokument im Titel verspricht. Beispiele: bei M08 Datenherkunft/Aktualitaet/Vertrauensgrad, bei M21 die nicht rueckwirkend manipulierbare Historie, bei M31 SSO/MFA, SoD und Notfallzugriff.

*Betroffen:* Jedes Modul-Work-Package; der Funktionsscope wurde aus einer Kurzfassung abgeleitet.

**[hoch] §9 Kanonische Zustaende - Einleitung**

> Module duerfen zusaetzliche Unterzustaende besitzen, muessen aber auf die kanonischen Zustaende abbildbar bleiben.

Verbindliche Regel fuer alle Statusmodelle fehlt. Ohne sie ist unklar, ob Module eigene Zustaende einfuehren duerfen - und die Abbildbarkeitspflicht als Bedingung wurde nie dokumentiert.

*Betroffen:* Statusmodelle in Datenbank und Workflow Engine (M22).

**[hoch] §9 Uebergabeprinzip**

> Jede Uebergabe zwischen Rolle, Modul oder Agent enthaelt mindestens: Objekt und Scope, Ausgangszustand, erwartetes Ergebnis, Owner, Frist, Entscheidung/Freigabe, Datenbasis, offene Unsicherheit und sicheren Wiederaufnahmepunkt.

Eine Pflichtfeldliste mit neun Feldern fuer jede Uebergabe fehlt vollstaendig. Das ist ein konkreter Datenvertrag, der ohne PDF nicht implementiert werden kann.

*Betroffen:* Handover-/Uebergabeobjekte zwischen Rollen, Modulen und Agenten.

**[hoch] §9 Keine Sackgassen**

> Abgelehnte Freigaben, fehlende Daten, Integrationsfehler, Rollenwechsel, Abwesenheit oder Budgetmangel erzeugen einen verstaendlichen Rueckkehrpfad und keinen unsichtbaren Endzustand.

Das Sackgassen-Verbot mit seinen sechs konkreten Ausloesern fehlt. Im Markdown gibt es keine Entsprechung, obwohl es eine harte Anforderung an jeden Fehlerpfad ist.

*Betroffen:* Error-/Empty-/Conflict-States aller Seiten (siehe Frontendregel zu Zustaenden).

**[hoch] §13 Fehlerfaelle, Sonderfaelle und Systemgrenzen - Tabelle Verbindliches Produktverhalten**

> Owner reagiert nicht | Vertretung, Eskalationsweg und SLA nutzen; keine automatische Freigabe. ... Sensibler Export | Datenklasse, Zielgruppe, Freigabe, Watermark/Vertraulichkeit und Audit Log anwenden.

Zehn Fehler- und Sonderfaelle mit jeweils verbindlich vorgeschriebenem Produktverhalten fehlen komplett; das Markdown uebernimmt aus §13 nur die Nicht-Ziele. Verloren gehen unter anderem das Verbot der automatischen Freigabe bei ausbleibender Owner-Reaktion, die Watermark-/Audit-Log-Pflicht bei sensiblen Exporten und die Regel, dass historische Bewertungen bei Scope-Aenderung unveraendert bleiben.

*Betroffen:* Exportfunktionen, Eskalationslogik (M22), Scope-Aenderung (M09), Integrationsfehlerbehandlung (M29).

**[hoch] §11 Priorisierung - Tabelle Umsetzungsgrade U1/U2/U3**

> U2 - Konsistent interaktiv ... Keine falschen Live- oder Produktionsbehauptungen. U3 - Contract / Expansion ... Erweiterung darf Kernmodell nicht brechen.

Das Markdown nennt drei Umsetzungsgrade nur als Fliesstext ohne die Bezeichnungen U1/U2/U3, ohne Beispiele und vor allem ohne die drei Qualitaetsgrenzen. Damit fehlt das Vokabular, mit dem Bauphasen im Rest des Konzepts eingeordnet werden, sowie die Qualitaetsschranke jedes Grades.

*Betroffen:* Bauphasenplanung und Scope-Entscheidung jedes Work Packages.

**[hoch] §12 Demo-Welt und zusammenhaengende Produktgeschichte (gesamter Abschnitt)**

> Nordstern Bank AG | reguliert, hoher Reifegrad | DORA/ISO-orientiert; Investitionssimulation und Drittparteienrisiko ... EcoLogistik Gruppe | fruehe Aufbauphase | gefuehrtes Onboarding, Strategie-DNA und einfache Zielroute

Die fuenf synthetischen Demo-Unternehmen mit Ausgangslage und Produktstory sowie die siebenschrittige Fuenf-Minuten-Demo-Dramaturgie fehlen im Markdown vollstaendig. Das ist die verbindliche Demo-Storyline, auf die die Demo-Datenregeln des Projekts verweisen. Sie taucht im Repository nur noch verstreut in Dokument 10 und 16 auf, nicht in ihrer Quelle.

*Betroffen:* Demo-Datensatz, Seed-Skripte, Deterministic Demo Mode.

**[hoch] §3 Produktarchitektur - Architekturprinzipien**

> Keine isolierten Scores: Reifegrad, Risiko, Readiness und Servicewirkung sind bis zu Ursachen, Datenquellen und Annahmen erklaerbar. ... Keine Verkaufsfalle: Managed-Service-Empfehlungen zeigen interne, unterstuetzte und vollstaendig gemanagte Alternativen.

Fuenf benannte Architekturprinzipien (Ein Objekt mehrere Perspektiven, Keine isolierten Scores, Keine toten Dokumente, Keine Verkaufsfalle, Keine KI-Abhaengigkeit) fehlen als Abschnitt. Besonders die Drei-Alternativen-Pflicht bei Managed-Service-Empfehlungen ist eine harte Produktanforderung.

*Betroffen:* M20 Recommendation & Opportunity Engine, alle Score-Darstellungen.

**[hoch] §8 Rollen- und Funktionsmatrix - Einleitung**

> Die Matrix beschreibt Schwerpunkte, keine pauschalen Berechtigungen. Konkrete Rechte werden in Dokument 19 nach Mandant, Objekt, Aktion, Datenklasse und Freigaberegel spezifiziert.

Der ausdrueckliche Hinweis, dass die Matrix KEINE Berechtigungen definiert, fehlt. Das Markdown formuliert stattdessen Entscheidet/verantwortet je Rolle - daraus koennte faelschlich ein Berechtigungsmodell abgeleitet worden sein, obwohl Dokument 19 zustaendig ist.

*Betroffen:* Rollen-/Rechtemodell (M31), Autorisierungspruefungen.

**[mittel] §4 Betriebsfluss der Plattform - Tabelle Sieben wiederkehrende Schritte**

> Verbinden | Welche Informationen liegen vor? | Daten aus Integrationen, Importen, Workshops und manueller Erfassung mit Quelle, Zeitpunkt und Vertrauensgrad aufnehmen.

Das Markdown nennt die sieben Schritte nur als Pfeilkette in einem Satz. Leitfrage und Plattformleistung je Phase - also der eigentliche fachliche Inhalt der Tabelle - fehlen komplett.

*Betroffen:* Gesamtnavigation und Kernprozessmodell.

**[mittel] §5 Produktdomaenen - Domaenentabelle**

> D Intelligence & Optimierung | M17-M20 | Relevanz, Prognose, Simulation und Empfehlung | Benoetigt belastbare Daten und erklaerbare Regeln.

Die Tabelle mit primaerem Wert und zentraler Abhaengigkeit je Domaene fehlt. Das Markdown listet nur Domaenennamen und Module - die Abhaengigkeitsaussagen zwischen den Domaenen gehen verloren.

*Betroffen:* Modulschnittreihenfolge und Abhaengigkeitsplanung.

**[mittel] §7 Querschnittsfaehigkeiten - Einleitung und Prueffrage**

> Sie sind verbindliche Anforderungen an alle Produktbereiche. ... Prueffrage: Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt?

Das Markdown listet die Querschnittsfaehigkeiten als Aufzaehlung, ohne ihre Verbindlichkeit fuer alle Produktbereiche und ohne die einheitliche Pruefrage. Damit fehlt das Abnahmekriterium, an dem jede Faehigkeit pro Modul gemessen wird.

*Betroffen:* Review-Checkliste jedes Modul-Work-Packages.

**[mittel] §7 Querschnittsfaehigkeit Wiederaufnahme**

> Wiederaufnahme: Jede Reise kann nach Unterbrechung, Vertretung oder Geraetewechsel am letzten sicheren Zustand fortgesetzt werden.

Die drei konkreten Ausloeser (Unterbrechung, Vertretung, Geraetewechsel) und der Begriff letzter sicherer Zustand fehlen; das Markdown ersetzt sie durch eine allgemeinere Formulierung (siehe Befund unter nurImMarkdown).

*Betroffen:* Resume-Verhalten, das laut Testregeln explizit getestet werden muss.

**[mittel] §8 Adaptive Erlebniswelten**

> Assurance/Audit: kontrollierter Scope, Evidence Requests, Findings, Historie und Unabhaengigkeit.

Die fuenf adaptiven Erlebniswelten (Executive, Kunden-/ISMS-Team, Beratung/Managed Service, Assurance/Audit, Administration/Betrieb) fehlen komplett. Sie sind die Bruecke zur Frontendregel rollenbezogene Erlebniswelten auf demselben Datenmodell.

*Betroffen:* Rollenbezogene UI-Varianten, Dokument 06.

**[niedrig] §19 Dokumentabhaengigkeiten und naechste Schritte**

> Dokument 00 wird nach Freigabe um Status "Dokument 05 erstellt" und neue globale Entscheidungen aktualisiert.

Der Abschnitt zu Dokumentabhaengigkeiten fehlt bis auf den Einzeiler Naechster Schritt; insbesondere die Pflicht, Dokument 00 nach Freigabe zu aktualisieren, und die Zuordnung 08-17 fachlich / 18-20C technisch.

**[niedrig] §1 Dokumentauftrag - Das Dokument legt fest**

> Abhaengigkeiten zu den Dokumenten 06 bis 20C.

Die sechsteilige Aufzaehlung, was das Dokument festlegt, fehlt; das Markdown fasst sie in einem Satz zusammen und laesst dabei die Dokumentreihe 20C weg (Markdown sagt nur 08 bis 20).

### Nur im Markdown, vom PDF nicht getragen

**[hoch] MD §1, ENTSCHEIDUNG**

> Eine Funktion gehoert nur dann in den Produktkern, wenn sie mindestens einer dokumentierten Nutzerreise dient, mit einem klaren Problem, messbarem Nutzen und nachvollziehbarer Einbettung in das gemeinsame Datenmodell.

Die zentrale ENTSCHEIDUNG wurde inhaltlich veraendert. Das PDF fordert: "ein reales Problem loest, einen messbaren Nutzen besitzt und mit Ziel, Risiko, Verantwortung, Wirkung oder Nachweis verbunden ist". Das Markdown ersetzt das fachliche Kriterium (Verknuepfung mit Ziel/Risiko/Verantwortung/Wirkung/Nachweis) durch ein technisches ("Einbettung in das gemeinsame Datenmodell"). Damit kann eine Funktion die Aufnahmehuerde passieren, obwohl sie nach dem Original nicht in den Produktkern gehoert.

*Betroffen:* Scope-Entscheidung jedes Features / Work Packages.

**[hoch] MD §9 Flagship-Szenarien**

> Portfolio Lead erkennt ueber viele Mandanten wiederkehrende Muster, Kapazitaetsengpaesse und standardisierbare Workflows. ... Kunde aendert Zielprofil oder Scope; Auswirkungen auf Route, Risiken, Services und Reports werden versioniert neu berechnet.

Das PDF listet unter "Empfohlene Flagship-Journeys fuer U1" genau acht Journeys. Das Markdown macht daraus zehn frei umformulierte Szenarien: die beiden zitierten stehen im PDF nicht in der Flagship-Liste, und die PDF-Journey "Login, Rollen-/Mandantenwechsel und Morning Mission" fehlt. Da 05-O01 offen laesst, welche fuenf bis sieben Journeys produktiv gebaut werden, wurde moeglicherweise die falsche Auswahl priorisiert - und der Rollen-/Mandantenwechsel, ein sicherheitsrelevanter Pfad, ist aus der Flagship-Liste verschwunden.

*Betroffen:* Auswahl der U1-Journeys, Tenant-Switch-Tests.

**[hoch] MD §10 Systemgrenzen und Nicht-Ziele**

> Keine erfundenen PwC-internen Preise, Kundendaten oder geschuetzten Templates.

Das PDF verbietet etwas anderes: "keine Nutzung nichtoeffentlicher PwC-Daten, interner Preise oder geschuetzter Templates". Das Markdown verbietet nur ERFUNDENE Angaben - die Nutzung tatsaechlicher nichtoeffentlicher PwC-Daten waere danach nicht verboten. Das ist eine Abschwaechung einer Compliance-Grenze und widerspricht sinngemaess auch der Demo-Datenregel des Projekts.

*Betroffen:* Demo-Daten und Preisdarstellung (M25).

**[hoch] MD §10 Systemgrenzen und Nicht-Ziele**

> Keine automatisierte Risikofreigabe ohne verantwortlichen Menschen.

Das PDF formuliert absolut: "keine autonome Risikoakzeptanz oder Managementfreigabe". Das Markdown erlaubt implizit eine automatisierte Risikofreigabe, solange irgendein verantwortlicher Mensch existiert, und laesst die Managementfreigabe ganz weg. Aufweichung eines Human-Gate-Nicht-Ziels.

*Betroffen:* Freigabe-/Human-Gate-Logik bei Risikoakzeptanz (M10, M21).

**[mittel] MD §5 Cross-Cutting Capabilities**

> Suche und Wiederaufnahme: Globale Suche, zuletzt bearbeiteter Kontext und universeller Wiederaufnahmepunkt verhindern Orientierungsverlust.

Das Markdown verschmilzt eine im PDF nicht existierende Querschnittsfaehigkeit: Das PDF kennt an dieser Stelle nur "Wiederaufnahme: Jede Reise kann nach Unterbrechung, Vertretung oder Geraetewechsel am letzten sicheren Zustand fortgesetzt werden." Die globale Suche ist im PDF eine Funktion von M24, keine Querschnittsanforderung. Gleichzeitig ist die harte Anforderung (Vertretung, Geraetewechsel, letzter sicherer Zustand) durch das weiche Ziel "verhindern Orientierungsverlust" ersetzt.

*Betroffen:* Resume-Verhalten und Suchfunktion.

**[mittel] MD §10 Systemgrenzen und Nicht-Ziele**

> Keine Black-Box-Empfehlung ohne Datenbasis, Unsicherheit und Alternativen.

Das PDF nennt "ohne Quelle, Annahme und Unsicherheit". Im Markdown ist die Pflichtangabe "Annahme" durch "Alternativen" ersetzt und "Quelle" zu "Datenbasis" verallgemeinert. Die Pflichtfelder einer Empfehlung weichen damit vom Original ab.

*Betroffen:* M20 Recommendation Engine, Anzeige von Empfehlungen.

**[mittel] MD §5 Kausalitaet und Wirkung**

> Kausalitaet und Wirkung: Scores muessen durch Ursachen, betroffene Objekte, Annahmen und erwartete Wirkungswege erklaert werden.

Das PDF sagt "Jede relevante Bewertung erklaert Ursachen, betroffene Objekte, Annahmen und erwartete Wirkung". Das Markdown verengt den Geltungsbereich auf Scores; Bewertungen ohne Scorewert (etwa Reifegradaussagen, SLA-Bewertungen, Zielabweichungen) fallen damit formal aus der Erklaerungspflicht.

*Betroffen:* Erklaerbarkeits-/Drilldown-Funktionen aller Bewertungen.

**[niedrig] MD Kopfbereich, Leitsatz**

> Leitsatz: Das Produkt ist kein Menue mit Einzelfunktionen. Es ist ein zusammenhaengendes Betriebs-, Entscheidungs- und Service-System, in dem jede Aktion auf Ziel, Risiko, Verantwortung, Wirkung und Nachweis zurueckgefuehrt werden kann.

Diesen als Leitsatz hervorgehobenen Satz gibt es im PDF nicht. Er ist eine Neuschoepfung aus Formulierungen des PDF (Abschnittstitel §3 und Kriterien der ENTSCHEIDUNG) - inhaltlich nicht falsch, aber als hervorgehobene Leitaussage im Original nicht vorhanden. Beachtenswert: Die Kriterien, die hier in den Leitsatz gewandert sind, wurden gleichzeitig aus der eigentlichen ENTSCHEIDUNG entfernt.

**[niedrig] MD §1 Dokumentauftrag**

> die fachliche Tiefenspezifikation in den Dokumenten 08 bis 20

Das PDF unterscheidet klar: "Dokument 08 bis 17 vertiefen Fachlogik, Services und Integrationen. Dokument 18 bis 20C definieren Architektur, Sicherheit, KI und Entwicklungsbetrieb." Das Markdown fasst beides als fachliche Tiefenspezifikation zusammen und laesst die Reihe 20C weg.

---

## Dokument 06 — SCHWERWIEGEND

Die Markdown-Fassung ist eine stark gekuerzte Zusammenfassung des PDF, keine treue Ableitung. Mindestens zwoelf inhaltlich tragende Bloecke des Originals fehlen vollstaendig, darunter die Tabelle "6.1 Verbindliche Seitenbausteine" mit neun Pflichtinhalten, "6.2 Detailtiefe", "4.2 Sichtbarer Kontext" samt CROSS-TENANT-SCHUTZ, die DESIGNREGEL zum Rollenwechsel, die Rollenvarianten der Morning Mission, die "Verbindlichen Portfolio-Signale", die acht Pflichtfelder der Decision Card, die Benachrichtigungsprinzipien, der Trust Layer, die "Verbindlichen Demo-Szenen" und die Bullet-Listen zu Datenvisualisierung/Accessibility. Zusaetzlich enthaelt das Markdown Aussagen, die das PDF nicht traegt oder denen es widerspricht - am gravierendsten "Graph und Liste sind gleichberechtigte Darstellungen" gegen die PDF-DESIGNREGEL, dass Graphvisualisierung nur eine zusaetzliche Erkenntnisebene ist. Die Abschnitte 4 bis 26 sind gleich nummeriert, die Abschnitte 1 bis 3 dagegen verschoben, was Paragraphen-Zitate im Code fehlleiten kann.

**Nummerierung:** Das Markdown folgt der FOLIENTITEL-Nummerierung des PDF (1-26), nicht der Navigationsleiste ("Inhalt", 01-10) - das ist die richtige Wahl. ABER: die ersten drei Abschnitte sind verschoben. Im PDF ist "Dokumentauftrag & Verbindlichkeit" unnummeriert, danach folgen "1. Executive Summary", "2. UX-Vision", "3. Zwoelf verbindliche Designprinzipien". Das Markdown macht daraus "1. Dokumentauftrag und Abgrenzung", "2. Executive Summary" und fasst PDF-2 und PDF-3 zu "3. UX-Vision und Designprinzipien" zusammen. Folge: ein Verweis "Dok 06 §1" meint im Markdown den Dokumentauftrag, im PDF die Executive Summary; "§2" meint im Markdown die Executive Summary, im PDF die UX-Vision. Ab Abschnitt 4 (Informationsarchitektur) bis 26 (Aenderungsprotokoll) stimmen beide Nummerierungen wieder ueberein, ebenso die IDs 06-D01..D15, 06-A01..A10, 06-O01..O12 und die Screen-IDs S01..S11. Zusaetzlich fehlen im Markdown die Unterabschnittsnummern des PDF (4.1, 4.2, 5.1, 5.2, 6.1, 6.2, 17.1) vollstaendig - Zitate auf "§6.1" laufen im Markdown ins Leere.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] 6.1 Verbindliche Seitenbausteine (Tabelle)**

> Baustein Zweck Pflichtinhalt | Question Header ... Frage, Objekt/Scope, Status, Owner. | Context Bar ... Mandant, Rolle, Scope, Datenstand, Vertraulichkeit. | Summary / Pulse ... | Relationship Panel ... | Impact Panel ... | Decision Card ... | Action Rail ... | History / Decision Record ... | Trust Layer ...

Die komplette Tabelle mit neun verbindlichen Seitenbausteinen und ihrem jeweiligen PFLICHTINHALT fehlt im Markdown ersatzlos. Das Markdown-Kapitel 6 besteht nur noch aus zwei Saetzen mit fuenf Leitfragen. Damit fehlt die einzige normative Definition, welche Bausteine eine Seite haben MUSS und welche Felder darin Pflicht sind - die zentrale Bauvorschrift des Dokuments.

*Betroffen:* apps/web/components/shell (App Shell, WP-011), MissionControlContent.tsx (WP-016), ObjectDetailView.tsx/TenantDetailView.tsx (WP-014) - Question Header, Context Bar und Trust Layer wurden ohne die PDF-Pflichtinhalte gebaut.

**[hoch] 6.2 Detailtiefe**

> Ebene 1 zeigt Klartext, Zustand und Handlung. Ebene 2 oeffnet Ursachen, Beziehungen und Alternativen. Ebene 3 zeigt Rohdaten, Mappings, Historie und technische Nachweise. Nutzer koennen eine bevorzugte Tiefe speichern; sicherheitskritische Warnungen bleiben jedoch immer sichtbar.

Das dreistufige Detailtiefen-Modell und die verbindliche Ausnahme fuer sicherheitskritische Warnungen ('bleiben jedoch immer sichtbar') fehlen vollstaendig. Progressive Offenlegung ist im Markdown nur noch als Prinzip P06 vorhanden, ohne operationalisierte Ebenen und ohne die Sicherheitsschranke.

**[hoch] 4.2 Sichtbarer Kontext / CROSS-TENANT-SCHUTZ**

> CROSS-TENANT-SCHUTZ: Ein Wechsel zwischen Mandanten benoetigt eine klare visuelle Kontextaenderung. Entwuerfe, Uploads und Freigaben duerfen nicht still in einen anderen Mandanten uebernommen werden.

Diese verbindliche Mandantentrennungsregel fehlt im Markdown komplett. Ebenso fehlt die darueberstehende Liste des sichtbaren Kontexts (aktiver Mandant/Organisationseinheit, aktive Rolle UND zeitlich begrenzte Vertretung, Scope, Datenstand/letzter Sync, Vertraulichkeitsstufe UND Exportrestriktion, Vertrauensgrad bei abgeleiteten Aussagen). Sicherheitsrelevant.

*Betroffen:* App Shell WP-011 (Mandanten-/Rollenwechsel), apps/web/lib/shell/places.ts

**[hoch] 5.2 Rollenwechsel / DESIGNREGEL**

> Er aendert nicht rueckwirkend Daten, Verantwortlichkeiten oder Decision Records. Kritische Aktionen speichern die aktive Rolle mit. ... DESIGNREGEL: Rollenwelten duerfen niemals zu vier getrennten Anwendungen oder widerspruechlichen Dashboards werden. Jede Aussage muss auf dasselbe Objekt und denselben Datenstand zurueckfuehrbar sein.

Der gesamte Abschnitt 5.2 fehlt. Damit fehlen zwei harte Regeln: die Audit-Anforderung 'Kritische Aktionen speichern die aktive Rolle mit' (Nachvollziehbarkeit) und die 'niemals'-Designregel gegen getrennte Rollenanwendungen. 06-D05 deckt nur die Datenmodell-Haelfte ab.

*Betroffen:* Rollenwechsel in der App Shell (WP-011) - ob die aktive Rolle bei kritischen Aktionen mitgespeichert wird, wurde nie als Anforderung gefuehrt.

**[hoch] 8. Mission Control - Rollenvarianten (Tabelle)**

> Rolle Missionsfokus Ausblendung | Executive: Freigaben, Top-Risiken, Zielabweichung, Investition / Operative Taskdetails | ISMS Manager: ... / Portfolio-/Umsatzsicht | Consultant: ... / Unbegruendete Vertriebsimpulse | Service Lead: SLA, Eskalationen, Qualitaet, Auslastung, Profitabilitaet / Objektdetails ohne Eskalationsbezug

Die Tabelle definiert je Rolle, was die Morning Mission zeigt UND was sie ausblendet. Sie fehlt im Markdown vollstaendig. Ebenso fehlen die vier Leitfragen von Mission Control, die Abgrenzung 'kein aggregiertes Reporting-Dashboard', die benannte Fuenf-Ebenen-Struktur und der WOW-MOMENT ('innerhalb von 30 Sekunden').

*Betroffen:* WP-016 Mission Control: apps/web/components/shell/MissionControlContent.tsx, apps/web/lib/heute/data.ts und framing.ts - die rollenspezifische Ausblendungslogik hatte keine dokumentierte Quelle.

**[hoch] 11. Consulting & Portfolio Experience - Verbindliche Portfolio-Signale**

> Verbindliche Portfolio-Signale: Kunde kippt ...; Terminrisiko ...; Kapazitaetskonflikt: Arbeit und Reise ueberschreiten realistische Verfuegbarkeit.; Wiederverwendung ...; Service Opportunity ...; Value Proof: Zeitersparnis, Risikowirkung und Servicequalitaet werden nachvollziehbar sichtbar.

Sechs ausdruecklich als VERBINDLICH bezeichnete Portfolio-Signale fehlen im Markdown vollstaendig. Das Markdown reduziert Kapitel 11 auf zwei Saetze. Ebenso fehlt die Planungsliste 'Auditfenster, Vor-Ort-Anforderungen, Reisezeit, Reisekosten, Skills, Vertretung, Kapazitaet und SLA'.

*Betroffen:* Screen S04 Portfolio Cockpit (noch nicht gebaut) - die Akzeptanzkriterien dafuer fehlen bislang im Repository.

**[hoch] 13. Collaboration - Decision Card Pflichtfelder**

> Decision Card - Pflichtfelder: Entscheidungsfrage und Frist; Optionen einschliesslich Nichtstun; Business-/Zielwirkung und Risiken; Kosten-, Zeit- und Kapazitaetsannahmen; Datenquellen, Luecken und Vertrauensgrad; Empfehlung und Gegenargument; Entscheider, Vertretung und Freigabestufe; Review-Datum und Erfolgskriterium

Acht Pflichtfelder werden im Markdown auf sechs Stichworte verkuerzt ('Optionen, Begruendung, Datenstand, Unsicherheit, Entscheider und Review-Datum'). Es fehlen: Entscheidungsfrage und Frist, Optionen einschliesslich Nichtstun, Kosten-/Kapazitaetsannahmen, Empfehlung UND Gegenargument, Vertretung, Freigabestufe, Erfolgskriterium. Auch der Satz 'Aufgaben sind keine losgeloesten Tickets, sondern abgeleitete Arbeitspakete mit Wirkung und Definition of Done' fehlt.

*Betroffen:* WP-017 Entscheidungen im Zwilling (aktiv) - das Decision-Card-Datenmodell wird gerade auf der verkuerzten Feldliste gebaut.

**[hoch] 16. Suche & Benachrichtigungsprinzipien**

> Ergebnisse werden mandanten- und rollenbezogen gruppiert; vertrauliche Treffer werden nicht ueber Snippets geleakt. ... In-App Inbox als zentrale Quelle ...; Digest statt Einzelalarm ...; Jede Nachricht erklaert warum der Nutzer adressiert ist ...; Ruhestunden, Vertretung und Abwesenheit werden beruecksichtigt.; Keine Erfolgs- oder Aktivitaetsgamification auf Personenebene ohne klaren Zweck.

Die sechs Benachrichtigungsprinzipien fehlen bis auf eine Halbzeile. Besonders kritisch ist der fehlende Datenschutz-Satz, dass vertrauliche Treffer nicht ueber Suchsnippets geleakt werden duerfen - eine Sicherheitsanforderung an die globale Suche. Ebenso fehlt 'Globale Suche ist ein primaerer Navigationsweg' und die Aufzaehlung der auffindbaren Objekttypen.

*Betroffen:* Globale Suche in der App Shell (WP-011) - Snippet-Leak-Schutz war nie als Anforderung dokumentiert.

**[hoch] 17. Trust Layer / GRUNDSATZ**

> Bei Risiko, Reifegrad, Empfehlung, Simulation und Report kann der Nutzer eine Vertrauensebene oeffnen. Sie zeigt Herkunft, letzten Datenzeitpunkt, Vollstaendigkeit, widerspruechliche Quellen, Modell-/Regelversion, Annahmen, menschliche Reviews und die Auswirkung von Datenluecken. ... GRUNDSATZ: Unsicherheit wird nicht versteckt.

Der gesamte Trust-Layer-Abschnitt inklusive Pflichtinhalt und GRUNDSATZ fehlt im Markdown. Kapitel 17 des Markdown enthaelt nur noch die Zustandsliste. Der Trust Layer ist eines der zentralen Differenzierungsmerkmale des Produkts und wurde ohne dokumentierte Feldliste gebaut.

*Betroffen:* Trust-/Confidence-Anzeigen in apps/web/components/twin (WP-004, WP-014)

**[hoch] 20. Demo- und Prototyp-Spezifikation - Verbindliche Demo-Szenen**

> Verbindliche Demo-Szenen: Consultant Login -> Morning Mission -> Portfolio-Prioritaet -> Kundendetail.; Neue Bedrohung -> Betroffenheitsanalyse -> Risiko/Control-Kette -> Massnahme/Serviceoption.; Executive Lens -> Investitionssimulation -> Freigabe -> Decision Record.; Auditvorbereitung -> Evidence Request -> Reiseplanung -> Finding -> Massnahme.; ...

Sieben ausdruecklich verbindliche Demo-Szenen (End-to-End-Wege) fehlen komplett. Sie waeren die natuerliche Grundlage fuer Demo-Datenstoryline, E2E-Tests und Roadmap-Reihenfolge gewesen.

*Betroffen:* Demo-Daten und Roadmap (docs/project/ROADMAP.md) - die Szenenfolge wurde nie als Anforderung gefuehrt.

**[hoch] 19. Datenvisualisierung, Accessibility & Responsive**

> Risiko-Heatmaps sind optional; Listen und Ursachenketten bleiben verfuegbar. Reifegrad zeigt Ziel, Ist, Trend, Vertrauensgrad und nicht nur eine Prozentzahl. Route Planner zeigt Alternativen, Annahmen und erwartete Wirkung, nicht scheinpraezise Prognosen. Portfolio-Visualisierungen vermeiden personenbezogene Rankings.

Sechs Datenvisualisierungs- und sechs Accessibility-Regeln werden auf drei Saetze eingedampft. Es fehlen u.a. 'Keine Bedeutung ausschliesslich durch Farbe, Position oder Bewegung', 'Fehlermeldungen nennen Feld, Ursache und Korrektur', 'Semantische Ueberschriften, Landmarken, Labels und Tabellenkoepfe', der Satz 'Mobile ist kein verkleinertes Desktop' und 'Sensible Freigaben koennen zusaetzliche Authentifizierung benoetigen'.

**[mittel] 3. Bewusst vermiedene Muster**

> Bewusst vermiedene Muster: Dashboard- oder Ampelwaende ohne erkennbare naechste Entscheidung.; Modulnamen als primaere Orientierung ...; Unerklaerte Reifegrad-, Risiko- oder KI-Scores.; ... Erfolgsmeldungen ohne Hinweis, welche Wirkung tatsaechlich bestaetigt wurde.; Automatische Personalisierung, die Navigation oder Verantwortung ueberraschend veraendert.

Die acht bewusst vermiedenen Muster - die Negativabgrenzung der Designprinzipien - fehlen im Markdown vollstaendig. Sie waeren als Review-Checkliste fuer jede UI direkt einsetzbar gewesen.

**[mittel] Dokumentensteuerung (Tabelle)**

> Aenderungsregel: Neue Hauptnavigation, Rollenwelt oder globale UI-Regel benoetigt Decision Record. | Quelle der Wahrheit: Markdown-Datei 06 im Repository; PDF/DOCX sind freigegebene Lesefassungen.

Die Dokumentensteuerungstabelle fehlt. Damit fehlt die verbindliche Aenderungsregel (Decision Record bei neuer Hauptnavigation/Rollenwelt/globaler UI-Regel) und die explizite Festlegung der Quelle der Wahrheit. Auch 'Folgedokumente 07; 19; 20C' ist im Markdown nur unvollstaendig (20C fehlt) und der Owner fehlt.

**[mittel] 2. UX-Vision (LEITBILD)**

> LEITBILD: Die Plattform fuehlt sich an wie ein ruhiger Sicherheitsnavigator: Sie erklaert den aktuellen Zustand, macht Ursachen verstaendlich, vergleicht verantwortbare Wege und fuehrt bis zur bestaetigten Wirkung.

Das eigentliche Leitbild des PDF fehlt im Markdown und ist dort durch einen anders formulierten 'Leitsatz' ersetzt, der im PDF nicht vorkommt. Auch der Abschnittstitel 'Zwoelf VERBINDLICHE Designprinzipien' verliert im Markdown das Wort verbindlich.

**[mittel] 9. Customer Workspace - vier Lenses**

> Executive Lens: Geschaeftsrisiko, Ziel, Optionen, Budget und Entscheidung.; ISMS Lens: Datenqualitaet, Risiken, Controls, Massnahmen, Evidence und Reviews.; Consulting Lens: offene Entscheidungen, Delivery, Termine, Services und Deliverables.; Audit Lens: Scope, Nachweise, Versionen, Requests, Findings und Herkunft.

Die inhaltliche Definition der vier Lenses wird im Markdown auf 'Ein Rollenfilter verdichtet dieselbe Wahrheit fuer Executive, ISMS, Beratung oder Audit' reduziert. Welche Inhalte je Lens sichtbar sein muessen, ist damit nicht mehr spezifiziert.

*Betroffen:* S02 Customer Workspace / TenantDetailView.tsx

**[mittel] 18. Visuelles Designsystem (Tabelle) und Kernkomponenten**

> Karten: Nur fuer eigenstaendige Aussage, Entscheidung oder Objektgruppe. Keine dekorative Card-Flut. | Icons: Konsistent, mit Textlabel bei kritischen Aktionen. | Animation: Nur zur Orientierung, Statusaenderung oder Relationship-Fokus. | Branding: Logo, Farben und Vorlagen konfigurierbar innerhalb sicherer Tokens.

Die achtzeilige Festlegungstabelle mit Begruendungen wird auf einen Absatz verkuerzt; die Regeln zu Karten, Icons, Animation und White-Label-Branding entfallen. In der Kernkomponentenliste fehlen gegenueber dem PDF: Summary/Pulse, Route/Scenario Card, Empty State und Help Pattern.

**[mittel] 10. Executive Experience / MANAGEMENT-FRAGE**

> Die Executive Experience ist fast ein eigenes Produkt, nutzt jedoch dieselben Daten. ... Jede Decision Card enthaelt Problem in Klartext, Business Impact, Optionen einschliesslich Nichtstun, Zeit-/Budgetannahmen, erwartete Wirkung, Datenvertrauen, Empfehlung und Freigabeverlauf.

Das Markdown ersetzt 'Datenvertrauen' durch 'Unsicherheit', 'Empfehlung und Freigabeverlauf' durch 'Freigabe' und laesst 'Problem in Klartext' weg. Der MANAGEMENT-FRAGE-Kasten fehlt ganz. Die Pflichtfelder der Executive Decision Card sind damit veraendert statt uebernommen.

**[mittel] 14. Reporting / ZIELGRUPPENLOGIK**

> ZIELGRUPPENLOGIK: Executive: Entscheidung und Business Impact. CISO: Risiko, Zielroute und Ressourcen. Auditor: Scope, Evidence und Historie. Berater: Storyline, Empfehlungen und naechste Schritte.

Die Zielgruppenlogik fuer Reports fehlt im Markdown. Zusaetzlich fehlen 'Die Plattform erzeugt einen Entwurf aus verifizierten Daten', der Vorschau-Pflichtinhalt 'sensible Inhalte' und 'PDF und PPTX werden versioniert und protokolliert' (Protokollierung).

**[mittel] 1. Executive Summary**

> Ein Anfaenger lernt damit ein Prinzip statt 33 unterschiedliche Module. ... kritische Aktionen sind reversibel oder freigabepflichtig. Mandant, aktive Rolle, Scope und Datenstand bleiben sichtbar. Die Plattform darf intelligent wirken, aber nie unvorhersehbar oder von generativer KI abhaengig sein.

Das Markdown formuliert die Executive Summary neu und laesst dabei die Kernaussagen zu Reversibilitaet/Freigabepflicht kritischer Aktionen und zur Nicht-Abhaengigkeit von generativer KI weg. Beides sind Aussagen mit verbindlicher Wirkung, die nur teilweise ueber 06-D15 und die Akzeptanzkriterien aufgefangen werden.

**[niedrig] 3. NICHT-ZIEL**

> NICHT-ZIEL: Die Plattform ersetzt weder SIEM noch Ticketing, Schwachstellenscanner oder Dokumentenablage. Sie verbindet deren Signale und uebersetzt sie in Governance, Entscheidungen, Nachweise und Services.

Die Scope-Abgrenzung fehlt in Dokument 06 des Markdown. Sie steht zwar sinngemaess in CLAUDE.md, ist aber im Konzeptdokument selbst nicht mehr belegt.

**[niedrig] 16. Universeller Wiederaufnahmepunkt**

> Letzter bestaetigter Zustand, Aenderungen seitdem, offener Entwurf, Blocker, naechster Schritt und moegliche Vertretung werden nach Unterbrechung zusammengefuehrt.

Im Markdown fehlt das Element 'moegliche Vertretung' in der Aufzaehlung des Wiederaufnahmepunkts. Kleine, aber konkrete Feldluecke.

*Betroffen:* Wiederaufnahme in Mission Control (WP-016)

### Nur im Markdown, vom PDF nicht getragen

**[hoch] Markdown 12. Digital Twin, ISMS Workspaces und Graphnavigation**

> Graph und Liste sind gleichberechtigte Darstellungen.

Das PDF sagt das Gegenteil einer Gleichrangigkeit: 'DESIGNREGEL Graphvisualisierung ist eine zusaetzliche Erkenntnisebene. Jede Beziehung bleibt alternativ als strukturierte Liste und ueber die globale Suche zugaenglich.' Im PDF ist die Liste der garantierte Basiszugang und der Graph das Zusatzangebot; im Markdown werden beide gleichgestellt. Damit entfaellt die Pflicht, jede Beziehung auch ueber Liste UND globale Suche erreichbar zu machen. Das ist ein echter inhaltlicher Widerspruch, nicht nur eine Kuerzung.

*Betroffen:* WP-004/WP-014 Digital Twin Explorer (apps/web/components/twin/), FINDING-0003 zur Narrative Chain

**[hoch] Markdown 12. Digital Twin**

> Jede Beziehung besitzt Typ, Richtung, Herkunft, Aktualitaet und ggf. Vertrauensgrad.

Das PDF formuliert ohne Einschraenkung: 'Jede Beziehung nennt Typ, Richtung, Quelle, Aktualitaet und Vertrauensgrad.' Das eingefuegte 'ggf.' macht aus einem Pflichtfeld ein optionales Feld. Genau das ist im Twin Explorer relevant, wo Vertrauensgrad teilweise fehlen darf.

*Betroffen:* apps/web/lib/twin/object-detail.ts, ObjectDetailView.tsx

**[hoch] Markdown 20. Demo- und Prototyp-Spezifikation**

> Flagship-Wege funktionieren durchgaengig; fortgeschrittene Datenquellen duerfen deterministisch simuliert sein.

Diese Erlaubnis steht so nicht im PDF. Das PDF-Kapitel 20 nennt stattdessen sieben verbindliche Demo-Szenen und verlangt, dass die Praesentationsfassung 'wie ein fertiges Produkt wirken' soll. Der Begriff 'Flagship-Wege' existiert im PDF gar nicht. Es wurde also eine Abkuerzungserlaubnis in die Produktwahrheit eingefuegt, die der Product Owner nicht geschrieben hat.

*Betroffen:* Demo-Daten-Strategie und Roadmap-Priorisierung

**[mittel] Markdown 4. Informationsarchitektur und globale Navigation**

> Die globale Shell enthaelt Produkt-/Betreiberidentitaet, Mandant, aktive Rolle, globale Suche, Benachrichtigungen, Hilfe und Nutzerkonto. Die linke Navigation enthaelt acht stabile Orte.

Der PDF-Fliesstext zu Kapitel 4 enthaelt diese Aufzaehlung nicht; er beschreibt nur die Arbeitsabsichten ('orientieren, Kunden verstehen, ISMS steuern, ...'). Die konkrete Shell-Bestueckung und insbesondere die Festlegung 'LINKE Navigation' stammen moeglicherweise aus einer Grafik, sind im Text aber nicht belegt. Gleichzeitig ersetzt diese erfundene Passage die im PDF an dieser Stelle stehende Liste '4.2 Sichtbarer Kontext'. Die Layoutfestlegung 'links' wurde so gebaut, ohne Quelle.

*Betroffen:* App Shell WP-011, apps/web/lib/shell/places.ts

**[mittel] Markdown 6. Universelle Seitenanatomie**

> Jede Hauptseite folgt fuenf Fragen: (1) Was ist das? (2) Warum ist es wichtig? (3) Womit haengt es zusammen? (4) Wie entwickelt es sich? (5) Was soll als Naechstes passieren? Querschnittlich sind Rolle, Mandant, Scope, Datenstand, Vertrauensgrad, Version und Hilfe sichtbar.

Der PDF-Fliesstext formuliert die kognitive Reihenfolge anders: 'erst verstehen, dann Kontext und Beziehungen erfassen, anschliessend Entwicklung pruefen und verantwortbar handeln'. Die fuenf woertlichen Fragen stehen im extrahierten PDF-Text nicht (vermutlich Grafik) - sie sind mit 06-D03 'fuenfteilige Seitenanatomie' vereinbar, aber nicht belegt. Problematisch ist vor allem, dass diese Fassung die im PDF stehende Tabelle der neun Pflichtbausteine ERSETZT: 'fuenfteilige Seitenanatomie' wird im Markdown als fuenf Fragen gelesen, im PDF als Bausteinstruktur mit Pflichtinhalten.

*Betroffen:* Alle Seitenlayouts der App (WP-011 bis WP-016)

**[mittel] Markdown 19. Datenvisualisierung**

> Diagramme muessen eine konkrete Frage beantworten, Achsen/Skalen nennen und eine Textalternative besitzen. Tabellen sind filterbar, tastaturbedienbar und exportierbar.

Das PDF verlangt an dieser Stelle etwas anderes: 'Jedes Diagramm beantwortet eine benannte Frage und nennt Scope sowie Datenstand.' Aus 'Scope und Datenstand' wurde im Markdown 'Achsen/Skalen'. Die Tabellenanforderung (filterbar/exportierbar) steht so nicht im PDF. Eine inhaltlich wichtige Pflichtangabe (Scope und Datenstand am Diagramm) wurde durch eine formale ersetzt.

**[niedrig] Markdown Leitsatz (Kopf)**

> Leitsatz: Die Plattform soll nicht erklaeren, wo eine Funktion liegt, sondern den Nutzer sicher zur naechsten verantwortbaren Entscheidung fuehren.

Dieser Leitsatz steht nicht im PDF. Das PDF hat stattdessen das LEITBILD vom 'ruhigen Sicherheitsnavigator'. Inhaltlich verwandt, aber es ist eine Neuformulierung, die als Zitat aus Dokument 06 verwendet werden koennte, ohne im Original zu existieren.

**[niedrig] Markdown 11. Consulting & Portfolio Experience**

> Portfolio Cockpit, Mandantenprioritaet, Audit-/Reiseplanung, SLA, Kapazitaet, Skill Matching, Deliverables und begruendete Service Opportunities bilden eine Operations-Welt.

Der Begriff 'Skill Matching' und die Formulierung 'Operations-Welt' stehen nicht im PDF; dort heisst es nur 'Skills' als einer von acht Planungsfaktoren. Klein, aber es suggeriert eine eigenstaendige Matching-Funktion, die das Original nicht fordert.

**[niedrig] Markdown 21. Akzeptanzkriterien**

> Kernreisen funktionieren ohne generative KI und besitzen dokumentierte Fallbacks.

Das PDF-Kriterium lautet knapper: 'Kernreisen funktionieren ohne generative KI.' Der Zusatz 'und besitzen dokumentierte Fallbacks' ist eine Verschaerfung, die im PDF an dieser Stelle nicht steht (sinngemaess aber von 06-D15 gedeckt). Nur der Vollstaendigkeit halber gemeldet - kein Konflikt.

---

## Dokument 07 — SCHWERWIEGEND

Die Markdown-Fassung übernimmt die stabilen Kataloge (P01-P12, F01-F09, Objektvertrag-Felder, R01-R25, Lebenszyklus, Akzeptanzkriterien, 07-D01 bis -D18, 07-A01 bis -A12, 07-O01 bis -O15, Ideenparkplatz) wörtlich und treu. Dagegen fehlen mehrere vollständige Tabellen und Regelblöcke des PDF ersatzlos oder auf zwei Sätze verkürzt: die Konfliktklassen-Tabelle (13), die API-Bausteine mit Leitplanken (17), die Connector-Zustände und die achtstufige Ingestion-Definition (12), die sieben Stop-Regeln der Wirkungspropagation (14), die acht Frageklassen und der Vertrag für gespeicherte Sichten (15), die sieben Sicherheitsprinzipien inkl. Supportzugriff/Retention (16), zwei End-to-End-Szenarien (18), die quantitativen Demo-Vorgaben (19), der Kardinalitäts-/Zyklenblock (8), der Objektkatalog-Vertrag (5), die Dokumentensteuerung mit Änderungsregel sowie die Regelboxen ARCHITEKTURREGEL, IDENTITÄTSREGEL und PRIVACY BY DESIGN. Umgekehrt enthält das Markdown wenige, aber reale Zusätze (u. a. optionales Beziehungsattribut "Gewicht oder Wirksamkeitsannahme", eine Erlaubnisaussage zu Cross-Tenant-Analysen in der Demo, absolut gesetzte Reversibilität von Merges). Hinzu kommt eine systematische Nummernverschiebung um +1 gegenüber den Foliennummern des PDF.

**Nummerierung:** Das PDF nummeriert doppelt: Die Inhalt-Leiste zählt "1 Auftrag · 2 Executive Summary · 3 Prinzipien · 4 Definition · 5 Schichten · 6 Objektkatalog · 7 Identität · 8 Lebenszyklus · 9 Beziehungen · 10 Objekt-360 · 11 Zeit · 12 Vertrauen · 13 Ingestion · 14 Konflikte · 15 Kausalität · 16 Abfragen · 17 Sicherheit · 18 APIs · 19 Szenarien · 20 Demo · 21 Akzeptanz · 22-25 Governance", während die Folientitel den Dokumentauftrag NICHT mitzählen und deshalb um 1 niedriger liegen: "1. Executive Summary", "2. Grundprinzipien", "3. Definition und bewusste Grenzen", "4. Fünfschichtige Vertrauensarchitektur", "5. Objektökosystem" (mit 5.1/5.2), "6. Objektvertrag, Identität und Metadaten" (mit 6.1), "7. Lebenszyklus", "8. Beziehungen" (mit 8.1), "9. Objekt-360", "10. Zeitmodell", "11. Vertrauen", "12. Dateneingang", "13. Matching/Konflikte", "14. Kausalität", "15. Abfragen", "16. Mandantenfähigkeit", "17. APIs", "18. Szenarien", "19. Demo-Graphen", "20. Globale Akzeptanzkriterien", "21. Verbindliche Entscheidungen", "22. Begründete Annahmen", "23. Offene Fragen", "24. Ideenparkplatz", "25. Änderungsprotokoll".

Das Markdown folgt der Inhalt-Leiste (Auftrag = 1) und läuft dadurch bis 26, weil es Annahmen/Fragen/Ideen/Changelog einzeln nummeriert (22 Entscheidungen, 23 Annahmen, 24 Offene Fragen, 25 Ideenparkplatz, 26 Änderungsprotokoll), während das PDF diese Folien als 21-25 führt.

Konkrete Verwechslungsgefahr für Code-/Doku-Zitate: "Dok 07 §21" bedeutet im PDF "Verbindliche Entscheidungen", im Markdown aber "Akzeptanzkriterien". Analog §20 (PDF: Akzeptanzkriterien / MD: Demodaten), §17 (PDF: APIs / MD: Mandantenfähigkeit), §16 (PDF: Mandantenfähigkeit / MD: Abfragen), §13 (PDF: Matching und Konflikte / MD: Dateneingang), §12 (PDF: Dateneingang / MD: Vertrauen), §5 (PDF: Objektökosystem / MD: Fünfschichtige Architektur). Ab §2 ist praktisch jede Paragraphenreferenz zwischen den beiden Fassungen um genau eins verschoben. Stabil und unverwechselbar zitierbar sind nur die ID-getragenen Elemente (07-Dxx, 07-Axx, 07-Oxx, Pxx, Fxx, Rxx) - diese stimmen in beiden Fassungen vollständig überein.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] 13. Matching, Dubletten, Konflikte und Stewardship - Tabelle "Konfliktklassen"**

> Identität | Zwei Connectoren melden dasselbe System mit unterschiedlichen IDs. | Matchkandidat, Quellvergleich, Merge mit Undo. ... Zeit | Stilllegung rückwirkend gemeldet. | Valid Time korrigieren, Record Time beibehalten. ... Klassifikation | Evidence niedriger eingestuft als zugehörige Datenklasse. | Strengere Regel, Review und Exportblocker.

Die komplette Tabelle mit sechs Konfliktklassen (Identität, Attribut, Beziehung, Zeit, Scope, Klassifikation) und je definierter Behandlung fehlt. Das Markdown (§14) reduziert das auf drei Sätze ohne eine einzige Klasse. Damit fehlt die gesamte fachliche Vorgabe, WIE Konflikte erkannt und aufgelöst werden - inklusive der harten Regel, dass eine zu niedrig klassifizierte Evidence einen Exportblocker auslöst und dass rückwirkende Stilllegungen die Valid Time korrigieren, aber die Record Time unangetastet lassen.

*Betroffen:* Konflikt-/Stewardship-Logik und Import-Validierung des Twin-Datenmodells

**[hoch] 17. APIs, Events und Erweiterbarkeit - Tabelle "Baustein / Funktion / Leitplanke"**

> Object API ... Tenant, ETag/Version und Validierung sind Pflicht. Query API ... Kostenlimits, Pagination, keine Datenlecks. Import API | Batch, Dry Run, Fehlerbericht, Mapping. | Idempotenz, Herkunft und Rollback. Event Stream | ObjectChanged, RelationChanged, ReviewDue, ConflictRaised. | Versioniert, replaybar, tenantisoliert.

Die achtzeilige API-Tabelle (Object, Relationship, Query, Import, Event Stream, Schema Registry, Export, Extension Pack) mit jeweils verbindlicher Leitplanke fehlt. Das Markdown (§18) fasst sie in zwei Sätzen zusammen und verliert dabei sämtliche Pflichtvorgaben: ETag/Version-Pflicht, Kostenlimits und Pagination, Idempotenz und Rollback beim Import, die vier konkreten Event-Namen, Replaybarkeit sowie Signatur und Deinstallierbarkeit von Extension Packs.

*Betroffen:* API- und Event-Schnittstellen der Plattform

**[hoch] 16. Mandantenfähigkeit, Rechte und Datenschutz - "Sicherheitsprinzipien"**

> Tenant Isolation für Daten, Indizes, Caches, Events, Dateien und Backups. ... Supportzugriff ist genehmigt, zeitlich begrenzt, protokolliert und standardmäßig ohne Inhaltszugriff. ... Klassifikation vererbt sichere Mindestanforderungen an Evidence, Exporte und abgeleitete Artefakte. ... Löschung und Retention berücksichtigen Historie, rechtliche Pflichten, Decision Records und Exit Packages.

Vier der sieben Sicherheitsprinzipien fehlen im Markdown (§17) vollständig: der Geltungsbereich der Tenant Isolation (Indizes, Caches, Events, Dateien, Backups), das gesamte Supportzugriffs-Regime, die Vererbung der Klassifikation auf Evidence/Exporte/abgeleitete Artefakte und die Retention-/Löschregel. Zusätzlich fehlt die Box PRIVACY BY DESIGN ("Der Twin modelliert Verantwortlichkeit, nicht unnötige Mitarbeiterüberwachung"). Das sind genau die Anforderungen, die Backup-, Cache- und Supportpfade absichern.

**[hoch] 14. Kausalität, Betroffenheit und Wirkungspropagation - "Stop-Regeln"**

> fehlende oder veraltete Daten; nicht unterstützter Beziehungstyp; unzureichender Vertrauensgrad; unklarer Scope; Berechtigungsgrenze; widersprüchliche Quellen; Regel-/Modellversion nicht freigegeben.

Das PDF definiert sieben Abbruchbedingungen der Wirkungspropagation. Das Markdown (§15) nennt nur drei: "Wirkungspropagation stoppt bei fehlender Datenqualität, nicht unterstützter Regel oder Berechtigungsgrenze". Es fehlen unzureichender Vertrauensgrad, unklarer Scope, widersprüchliche Quellen und die nicht freigegebene Regel-/Modellversion. Eine Implementierung nach Markdown propagiert in vier Fällen weiter, in denen das Original zwingend stoppt.

*Betroffen:* Impact-/Propagationsberechnung

**[hoch] 19. Synthetische Demo-Graphen**

> mindestens 10 Geschäftsprozesse, 25-50 relevante Assets und 8-15 Lieferanten je Kundentenant; ... mindestens ein Datenkonflikt, eine veraltete Quelle und ein erklärbarer Trust-State; mehrere Rollenansichten auf denselben Objekt-IDs; keine nichtöffentlichen PwC-Daten, internen Preise oder geschützten Vorlagen.

Sämtliche quantitativen und qualitativen Mindestvorgaben für die Demodaten fehlen im Markdown (§20). Damit fehlt auch die Pflicht, dass jeder Demo-Tenant mindestens einen Datenkonflikt, eine veraltete Quelle und einen erklärbaren Trust-State enthalten muss - genau die Fälle, die die Vertrauens- und Konfliktfunktionen überhaupt demonstrierbar machen. Ebenso fehlt das explizite Verbot nichtöffentlicher PwC-Daten, Preise und Vorlagen an dieser Stelle.

*Betroffen:* Demo-Datensatz und Deterministic Demo Mode

**[hoch] 12. Dateneingang, Normalisierung und Synchronisation - Achtschrittfolge und "Connector-Zustände"**

> 4. Validieren - Schema, Pflichtattribute, Kardinalität, Zyklen und Scope kontrollieren. 5. Beziehungen bilden - assertierte und abgeleitete Kanten getrennt erzeugen. ... 8. Veröffentlichen - neue Version, Ereignis und abhängige Neuberechnungen auslösen. Connector-Zustände: verbunden / gesund; verzögert; teilweise; fehlerhaft; Berechtigung abgelaufen; Quelle entfernt; Daten veraltet; Re-Sync läuft.

Das Markdown (§13) übernimmt zwar die acht Schrittnamen als Pfeilkette, verliert aber die Definition jedes Schritts (was validiert wird, dass assertierte und abgeleitete Kanten getrennt erzeugt werden, dass ein Data Steward oder Owner kritische Zustände bestätigt, dass Veröffentlichen abhängige Neuberechnungen auslöst). Die acht Connector-Zustände fehlen komplett - das ist eine konkrete Statusliste, die ohne PDF nicht rekonstruierbar ist.

*Betroffen:* Ingestion-Pipeline und Connector-Statusanzeige

**[hoch] 8. Beziehungen als erstklassige Daten - "Kardinalität, Richtung und Zyklen"**

> Beziehungen haben eine kanonische Leserichtung; inverse Darstellung ist UI-Komfort, kein zweiter Datensatz. Hierarchische Beziehungen verbieten Zyklen; Netzwerkbeziehungen dürfen Zyklen besitzen, wenn fachlich sinnvoll. Kardinalitäten werden je Typ definiert und bei Importen als Warnung oder Fehler geprüft.

Dieser vierteilige Regelblock fehlt im Markdown (§9) vollständig, ebenso der vierte Punkt "Eine Beziehung kann zeitlich enden, ohne dass die historischen Objekte gelöscht werden." Ohne ihn fehlt die verbindliche Aussage, dass inverse Kanten KEIN zweiter Datensatz sein dürfen - eine Datenmodellentscheidung, die bei Nichtbeachtung doppelte Kanten und inkonsistente Historien erzeugt.

*Betroffen:* Beziehungs-/Kantenmodell und Importvalidierung

**[hoch] 18. End-to-End-Szenarien**

> Policy Change: neue Version -> betroffene Requirements/Controls -> Lesebestätigung -> Evidence Review -> Audit- und Reportstatus. Managed Service Aktivierung: Bedarf -> Service Charter -> covered_by-Beziehungen -> Workflow -> Deliverables -> KPI/Wertnachweis -> Service Review.

Von sechs End-to-End-Szenarien enthält das Markdown (§19) nur vier. Es fehlen ausgerechnet Policy Change und Managed Service Aktivierung - letzteres ist der einzige Pfad, der das Produktversprechen "skalierbare Managed Services" durchgängig beschreibt und die Beziehung covered_by operationalisiert.

**[hoch] 5. Objektökosystem - "Objektkatalog als versionierter Vertrag" inkl. BEISPIEL**

> Jeder Typ besitzt Definition, Pflichtattribute, erlaubte Status, Beziehungsmuster, Validierungsregeln, Standardansichten und Migrationsregeln. Branchenpakete dürfen den Katalog erweitern, aber Kernbegriffe nicht still umdeuten.

Das Markdown (§6) übernimmt die Tabelle F01-F09 wörtlich, lässt aber den darunterstehenden Vertragsblock samt Beispiel weg. Damit fehlt die verbindliche Festlegung, welche sieben Bestandteile jeder Objekttyp mitbringen muss, und das Verbot der stillen Umdeutung von Kernbegriffen ("Ein 'System' darf nicht bei einem Kunden eine Anwendung und bei einem anderen einen Geschäftsprozess bedeuten").

*Betroffen:* Objektkatalog / Schema Registry

**[hoch] 15. Abfragen, Suche und Perspektiven - "Kanonische Frageklassen" und "Gespeicherte Sichten"**

> Verantwortung: Welche Objekte haben keinen gültigen Owner oder keine Vertretung? ... Service: Welche kritischen Objekte liegen im Managed-Service-Scope, aber außerhalb des vereinbarten SLA? ... Gespeicherte Sichten enthalten Query, Filter, Scope, Sortierung, Darstellung, Rolle und Freigabestatus.

Das PDF definiert acht benannte Frageklassen (Abhängigkeit, Coverage, Impact, Historie, Verantwortung, Qualität, Wiederverwendung, Service). Das Markdown (§16) macht daraus vier unbenannte Beispielfragen und verliert die Klassen Verantwortung, Qualität und Service. Zusätzlich fehlt der komplette Vertrag für gespeicherte Sichten inklusive der Regel "Freigegebene Views können Reports und Missionen speisen; persönliche Views bleiben privat."

**[mittel] Dokumentensteuerung (Deckblattfolie)**

> Änderungsregel: Neue Kernobjekte, Beziehungstypen oder globale Semantik benötigen Decision Record und Schema-Version. Quelle der Wahrheit: Markdown-Datei 07 im Repository; PDF/DOCX sind geprüfte Lesefassungen.

Die gesamte Dokumentensteuerungstabelle (Zweck, Owner, Abhängigkeiten, Folgedokumente 08/09/10/17/18/19, Änderungsregel, Quelle der Wahrheit) fehlt im Markdown. Die Änderungsregel ist eine Governance-Pflicht: Jeder neue Objekt- oder Beziehungstyp braucht Decision Record UND Schema-Version. Ohne sie kann der Katalog unkontrolliert wachsen.

**[mittel] 4. Fünfschichtige Vertrauensarchitektur - Box ARCHITEKTURREGEL**

> Dokument 07 definiert das fachliche Modell. Dokument 18 darf die technische Umsetzung optimieren, aber weder Identität noch Beziehungssinn oder Historienregeln unbemerkt verändern.

Die Vorrangregel zwischen Dokument 07 und Dokument 18 fehlt im Markdown (§5). Das Markdown sagt nur "Der semantische Vertrag ist stabiler als die konkrete Technologie" - das ist eine Feststellung, keine Schranke. Die Aussage, dass Dokument 18 Identität, Beziehungssinn und Historienregeln NICHT unbemerkt ändern darf, ist die eigentliche Schutzklausel des Datenmodells.

**[mittel] 6. Objektvertrag, Identität und Metadaten - Box IDENTITÄTSREGEL**

> Externe IDs sind Quellreferenzen, keine primäre Produktidentität. Ein Objekt kann mehrere Quell-IDs besitzen und bleibt auch bei Connectorwechsel stabil.

Die Feldtabelle ist im Markdown (§7) wörtlich vollständig, aber die Identitätsregel darunter fehlt. Die Regel "ein Objekt kann mehrere Quell-IDs besitzen" ist eine Kardinalitätsvorgabe für source_refs/externe IDs und die Grundlage für Connectorwechsel ohne Identitätsverlust.

**[mittel] 10. Zeitmodell, Versionierung und Ereignisse - Tabelle "Bitemporales Grundmuster"**

> Snapshot | Welcher konsistente Stand speist Report oder Simulation? | Management Review Snapshot 2027-Q2. ... NICHT ÜBERSCHREIBEN: Freigegebene Entscheidungen, Auditstände und Evidence-Verwendungen bleiben historisch erhalten. Korrekturen erzeugen neue Versionen oder rückwirkende Ereignisse mit Begründung.

Die fünfzeilige Tabelle (Valid Time, Record Time, Version, Event, Snapshot) fehlt als Struktur. Insbesondere die Dimension Snapshot - der konsistente Stand, der Report oder Simulation speist - kommt im Markdown (§11) gar nicht vor, obwohl Reporting und Simulation darauf aufsetzen. Ebenso fehlt der explizite Schutz von Auditständen und Evidence-Verwendungen vor Überschreiben.

*Betroffen:* Report-/Simulations-Snapshots und Versionierung

**[mittel] 11. Herkunft, Datenqualität und Vertrauen - Box TRANSPARENZ**

> Ein Gesamtindikator darf die Dimensionen verdichten, aber nie verbergen. Nutzer können jede Bewertung bis zur Quelle, Regel und letzten menschlichen Prüfung öffnen.

Das Markdown (§12) übernimmt die Dimensionstabelle vollständig, formuliert aber nur "ersetzt aber nie die sichtbaren Dimensionen". Die Drill-down-Anforderung - jede Bewertung bis zu Quelle, Regel und letzter menschlicher Prüfung aufklappbar - fehlt. Das ist eine UI- und Datenhaltungsanforderung, keine Formulierung.

**[mittel] 9. Objekt-360 und Navigationsvertrag**

> Rollen erhalten unterschiedliche Verdichtung, aber dieselben Objekt-IDs und dieselbe Historie.

Diese verbindliche Aussage fehlt im Markdown (§10). Sie ist die operative Ausprägung von P06 auf Ebene der Objektseite und schließt rollenabhängig abweichende Objekt-IDs oder Historien aus. Das Markdown beschreibt an dieser Stelle nur die Inhalte einer Objektseite.

**[niedrig] 1. Executive Summary - Box DIE KERNIDEE**

> Eine Unternehmenswahrheit entsteht nicht durch einen einzigen Score, sondern durch stabile Identitäten, explizite Beziehungen, nachvollziehbare Zeitstände, sichtbare Herkunft und menschliche Verantwortung.

Die Kernidee-Box und die vier Leitfragen des PDF ("Warum ist ein Risiko hoch? Welche Geschäftsprozesse wären betroffen? Welche Control wirkt tatsächlich? Welche Entscheidung wurde auf welcher Datenbasis getroffen?") fehlen im Markdown (§2), das stattdessen abstrakt umschreibt. Inhaltlich weitgehend über P01-P12 abgedeckt, aber die Anti-Score-Position geht als Leitsatz verloren.

**[niedrig] 3. Definition und bewusste Grenzen - Box NICHT-ZIEL**

> Der Twin ist kein CMDB-, SIEM-, Ticketing-, ERP- oder Data-Lake-Ersatz. Er integriert diese Systeme, übernimmt relevante Fakten und übersetzt sie in einen gemeinsamen Sicherheits- und Entscheidungskontext.

Das Markdown (§4) nennt nur CMDB, Data Lake und SIEM und lässt Ticketing und ERP weg. Wichtiger: der zweite Satz - der Twin integriert diese Systeme und übersetzt ihre Fakten - fehlt ganz. Damit fehlt die positive Abgrenzung, die erklärt, in welchem Verhältnis der Twin zu Quellsystemen steht.

### Nur im Markdown, vom PDF nicht getragen

**[hoch] 9. Beziehungsmodell (MD) vs. 8. Beziehungen als erstklassige Daten (PDF)**

> Sie besitzen Quelle, Ziel, kanonischen Typ, Richtung, fachliche Gültigkeit, Erfassungszeit, Status, Quelle, Vertrauensgrad, Owner und optional Gewicht oder Wirksamkeitsannahme.

Das PDF listet: "Quelle, Ziel, Typ, Richtung, Gültigkeit, Herkunft, Status, Vertrauen und ggf. Owner." Die Attribute "Gewicht" und "Wirksamkeitsannahme" stehen an dieser Stelle NICHT im PDF - sie sind im Markdown ergänzt. Gleichzeitig ersetzt das Markdown "Herkunft" durch ein zweites "Quelle". Ein nach dem Markdown gebautes Kantenschema hätte damit zwei erfundene optionale Felder und würde die Herkunft (Provenienz, im PDF von der reinen Quellangabe unterschieden) verlieren. Das ist ein Datenmodell-Delta, kein Stilproblem.

*Betroffen:* Beziehungs-/Kantenschema des Informationsgraphen

**[hoch] 20. Synthetische Demodaten (MD) vs. 19. Synthetische Demo-Graphen (PDF)**

> Cross-Tenant-Analysen dürfen nur anonymisierte, freigegebene Benchmarks oder Plattformreferenzen verwenden.

Dieser Satz steht so nirgends im PDF. Das PDF kennt an dieser Stelle nur die Demo-Anforderungen; Cross-Tenant regelt es ausschließlich in 07-D11 ("Cross-Tenant-Beziehungen sind grundsätzlich verboten, außer zu versionierten Plattformreferenzen") und im Ideenparkplatz ("Twin Quality Benchmark ... nicht gegen andere Kunden ohne Einwilligung" - eine Idee, keine Festlegung). Das Markdown macht aus einem Verbot plus einer Idee eine positive Erlaubnis für Cross-Tenant-Analysen. Wenn darauf ein Benchmark-Feature gebaut wurde, beruht es auf einer nicht getroffenen Produktentscheidung.

**[mittel] 14. Matching, Dubletten und Konfliktauflösung (MD) vs. 13. Box GOLDEN RECORD (PDF)**

> Ein Golden Record ist kein stilles Überschreiben: Quellen bleiben erhalten, Prioritätsregeln sind sichtbar und manuelle Merges reversibel.

Das PDF formuliert vorsichtiger: "Merge, Split und Override werden protokolliert und soweit möglich reversibel gestaltet." Das Markdown streicht den Vorbehalt "soweit möglich", streicht die Protokollierungspflicht und verengt den Gegenstand von Merge/Split/Override auf "manuelle Merges". Ergebnis: eine absolute Reversibilitätszusage für Merges, die das Original nicht gibt, bei gleichzeitigem Wegfall der Pflicht, Split und Override überhaupt zu protokollieren.

**[mittel] 16. Abfragen, Suche und Perspektiven (MD) vs. 15. (PDF)**

> Kernzugänge sind globale Suche, Objekt-360, Graph Explorer, Listen/Tabellen, gespeicherte Sichten, Impact View, Timeline und Scope View.

Das PDF nennt an dieser Stelle "Graph, Liste, Tabelle, Timeline und Impact View". Die Zugänge "globale Suche", "Graph Explorer" und "Scope View" als benannte Kernzugänge sind Markdown-Ergänzungen. Inhaltlich plausibel (Suche und Scope kommen an anderer Stelle im PDF vor), aber als benannte UI-Bausteine nicht vom PDF getragen. Zusätzlich ersetzt das Markdown die PDF-Frage "Wie sah der freigegebene Scope beim letzten Management Review aus?" durch "Welche Änderungen seit dem letzten Management Review beeinflussen die Zielroute?" - aus einer Stichtagsrekonstruktion wird eine Delta-Abfrage.

**[niedrig] 1. Dokumentauftrag und Abgrenzung (MD)**

> ISMS-Prozesslogik folgt in Dokument 08, Risiko-/Reifegradberechnung in 09 und 10, Integrationen in 17, physische Architektur in 18 sowie Rechte und Datenschutz in 19.

Das PDF nennt in der Dokumentensteuerung nur die Folgedokumente "08, 09, 10, 17, 18 und 19" ohne Themenzuordnung und im Fließtext lediglich "Die konkrete Datenbank- und Cloudarchitektur folgt in Dokument 18". Die Zuordnung der übrigen Themen zu 09/10/17/19 ist eine Markdown-Interpretation. Plausibel und teils durch andere Stellen gestützt (Dokument 19 für Rechte), aber vom PDF nicht als Aussage getragen.

**[niedrig] 13. Dateneingang und Synchronisation (MD) vs. 12. (PDF)**

> Daten gelangen über manuelle Erfassung, geführte Workshops, Dateiimporte, API-Konnektoren, Event-Streams, Evidence Uploads und kontrollierte KI-Unterstützung in den Twin.

Das PDF zählt als Datenquellen "Workshops, manueller Pflege, Dateien, APIs, Konnektoren, Events und Evidence" auf. KI ist im PDF ausdrücklich KEIN Eingangskanal, sondern erscheint nur in der FALLBACK-Box als unterstützende Funktion ("kann Texte klassifizieren oder Matchkandidaten vorschlagen"). Das Markdown macht daraus einen gleichrangigen Eingangskanal - eine Verschiebung, die der Regel "KI-gestützt, nicht KI-abhängig" entgegenläuft.

---

## Dokument 08 — MATERIALE_ABWEICHUNGEN

Der nummerierte Hauptteil (Abschnitte 1 bis 34) ist praktisch wortgleich und vollstaendig uebernommen - alle 18 Kernprozesse, alle 15 Prinzipien, alle Zustandsketten, alle 18 Akzeptanzkriterien, D01 bis D20, A01 bis A12, O01 bis O15, Ideenparkplatz und Quellenregister stimmen ueberein. Die Abweichung liegt ausschliesslich im Vorspann: die komplette PDF-Seite 2 "Dokumentauftrag & Verbindlichkeit" mit der Verbindlichkeitsklausel gegenueber Folgedokumenten, der "Zentralen Produktregel" und der Dokumentensteuerungstabelle (Vorgaenger, Nachfolger, Source of Truth, Aenderungsrecht) fehlt im Markdown ersatzlos. An ihrer Stelle steht im Markdown eine "Zentrale Festlegung", die im PDF an keiner Stelle vorkommt und die verbindliche Produktregel des Originals inhaltlich ersetzt. Die Abschnittsnummerierung ist identisch, es besteht keine Verwechslungsgefahr fuer Paragraphenzitate im Code.

**Nummerierung:** Das Markdown folgt exakt der Folientitel-Nummerierung des PDF: 1 Dokumentauftrag ... 34 Aenderungsprotokoll, inklusive aller Unternummern (3.1/3.2, 9.1/9.2, 10.1 bis 10.4, 11.1 bis 11.4, 12.1 bis 12.3, 13.1 bis 13.4, 14.1 bis 14.4, 16.1 bis 16.3, 19.1 bis 19.3, 20.1 bis 20.3, 21.1/21.2, 23.1 bis 23.4). Die Navigationsleiste/Inhaltszeile des PDF ("1 Auftrag - 2 Executive Summary - 3 Bezugsrahmen - 4 Betriebsmodell - 5 Prinzipien - 6 Prozesskatalog - 7 bis 21 Prozessdetails - 22 Managed-Service-Grenzen ... 34 Aenderungslog") verwendet dieselbe Zaehlung, es gibt hier also keine zweite konkurrierende Nummerierung. Zitate wie "08 Abschnitt 27" oder "08-D14" treffen in beiden Fassungen dasselbe. Achtung nur bei der Textextraktion: die nummerierten Kernablauf-, Ablauf- und Szenariolisten erscheinen im extrahierten PDF-Text mit fortlaufenden Zaehlern (z. B. Kernablauf ISMS-01 als "8. bis 14.", Risikoablauf als "15. bis 24.", Automatisierungsstufen als "25. bis 30.", Szenario als "31. bis 42.", Quellen als "43. bis 50."). Das ist ein reiner Extraktionsartefakt; das Markdown zaehlt korrekt jeweils ab 1, die Reihenfolge und Anzahl der Punkte stimmt in allen Faellen ueberein.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] PDF Seite 2, Abschnitt "Dokumentauftrag & Verbindlichkeit" (vor Abschnitt 1)**

> Dokument 08 ist die kanonische fachliche Prozessquelle für das ISMS-Kernprodukt. Nachfolgende Dokumente dürfen Prozesse technisch oder visuell konkretisieren, aber weder Verantwortlichkeiten noch Freigaben, Zustände oder Nachweisanforderungen stillschweigend verändern.

Eine Klausel mit unmittelbar verbindlicher Wirkung fuer alle Folgedokumente (09, 10, 11, 13 bis 20C) fehlt im Markdown vollstaendig. Sie legt fest, dass nachgelagerte Konzepte Verantwortlichkeiten, Freigaben, Zustaende und Nachweisanforderungen aus Dokument 08 NICHT still veraendern duerfen. Ohne diese Klausel gibt es in der Projektwahrheit keine dokumentierte Vorrangregel; spaetere Dokumente koennen abweichende Zustandsketten oder Freigaberegeln einfuehren, ohne dass ein Konflikt formal erkannt wird.

*Betroffen:* Betrifft die Konsistenzpruefung zwischen Dokument 08 und den daraus abgeleiteten Dokumenten 09/10/11/13-20C sowie jeden Code, der Zustandsmodelle oder Freigabelogik aus einem Folgedokument statt aus 08 implementiert.

**[hoch] PDF Seite 2, "Zentrale Produktregel" (vor Abschnitt 1)**

> Zentrale Produktregel: Die Plattform führt unterschiedliche Kunden nicht zu demselben maximalen Reifegrad. Sie führt jeden Kunden nachvollziehbar zu seinem freigegebenen Zielprofil - mit angemessener Tiefe, klaren Verantwortungen und belastbarer Evidence.

Die als "Zentrale Produktregel" ausgewiesene Kernaussage des Originals fehlt im Markdown. Inhaltlich wird sie zwar von P01 und 08-D02 getragen, aber ihre herausgehobene Stellung als Produktregel geht verloren - und im Markdown steht an genau dieser Stelle eine andere, im PDF nicht vorhandene Aussage (siehe Befund unter nurImMarkdown). Wer das Markdown liest, erhaelt eine andere Leitaussage als der Product Owner geschrieben hat.

*Betroffen:* Zielprofil-/Reifegradlogik, Onboarding-Flows und jede UI, die einen Zielzustand vorgibt statt das freigegebene Zielprofil zu spiegeln.

**[hoch] PDF Seite 2, Tabelle "Dokumentensteuerung"**

> Dokument-ID 08 | Status Erstellt - Version 1.0 | Zentrale Vorgänger 00 bis 07 | Zentrale Nachfolger 09, 10, 11, 13 bis 20C | Source of Truth 08_ISMS_KERNPROZESSE_v1.0.md im Repository; PDF und DOCX sind Veröffentlichungsfassungen | Änderungsrecht Nur über versionierten Decision Record und Abhängigkeitsprüfung

Die komplette Dokumentensteuerungstabelle fehlt. Damit fehlen im Markdown vier verbindliche Metaangaben: die Vorgaenger-/Nachfolgerkette (fuer Abhaengigkeitspruefungen), die ausdrueckliche Festlegung, dass genau diese .md-Datei die Source of Truth ist und PDF/DOCX nur Veroeffentlichungsfassungen sind, sowie die Aenderungsregel "Nur ueber versionierten Decision Record und Abhaengigkeitspruefung". Letztere ist eine Pflichtregel fuer jede kuenftige Aenderung an diesem Dokument.

*Betroffen:* Prozess zur Konzeptaenderung (Decision Records, ADRs), Abhaengigkeitspruefung bei Aenderungen an 08, sowie die Frage welche Fassung bei Widerspruch gilt.

**[niedrig] PDF Titelfolie (Seite 1), Metazeile**

> ABHÄNGIGKEITEN  Dokument 00 bis 07

Die Abhaengigkeitsangabe der Titelfolie fehlt im Markdown-Frontmatter. Geringe eigenstaendige Wirkung, da Abschnitt 1 die Bezuege zu 05 und 07 nennt, aber die vollstaendige Vorgaengerkette 00 bis 07 ist im Markdown nirgends dokumentiert.

**[niedrig] PDF Seite 2, Abschnitt "Inhalt"**

> 1 Auftrag · 2 Executive Summary · 3 Bezugsrahmen · 4 Betriebsmodell · 5 Prinzipien · 6 Prozesskatalog · 7 bis 21 Prozessdetails · 22 Managed-Service-Grenzen · 23 Workflow-Architektur · 24 Rhythmen · 25 Szenario · 26 Datenanforderungen · 27 Akzeptanz · 28 bis 31 Governance · 32 Quellen · 33 Abhängigkeiten · 34 Änderungslog

Reines Inhaltsverzeichnis, im Markdown nicht uebernommen. Kein inhaltlicher Verlust, da alle genannten Abschnitte vorhanden sind; nur der Orientierungsueberblick fehlt.

### Nur im Markdown, vom PDF nicht getragen

**[mittel] Markdown Zeile 9, Blockquote "Zentrale Festlegung" (direkt nach dem Frontmatter)**

> > **Zentrale Festlegung:** Die Plattform bildet kein starres Normen-Checklistenprodukt ab. Sie orchestriert ein lebendes, zielorientiertes ISMS, in dem Scope, Geschäftsbezug, Risiken, Controls, Maßnahmen, Nachweise, Entscheidungen und Managed Services als durchgängige, versionierte Prozessketten zusammenarbeiten.

Diese Aussage steht so an KEINER Stelle im PDF - die Begriffe "Normen-Checklistenprodukt", "orchestriert" und "lebendes ISMS" kommen im Originaltext nicht vor. Sie sitzt genau an der Stelle, an der das PDF seine "Zentrale Produktregel" fuehrt (Kunde wird zu seinem freigegebenen Zielprofil gefuehrt, nicht zu maximalem Reifegrad), und ersetzt diese faktisch. Inhaltlich ist die Markdown-Formulierung nicht falsch - sie ist eine Verdichtung aus Abschnitt 3.2 ("nicht als identische Checklisten behandelt") und Abschnitt 25 ("keine isolierten Checklisten") - aber sie ist eine Interpretation des Ableiters, kein Satz des Product Owners, und sie ist im Markdown mit dem Autoritaetslabel "Zentrale Festlegung" versehen. Wer 08 zitiert, zitiert damit moeglicherweise eine Aussage, die der Product Owner nie getroffen hat, und verliert gleichzeitig die tatsaechliche zentrale Regel.

*Betroffen:* Jede Ableitung, die sich auf die "Zentrale Festlegung aus Dokument 08" beruft - insbesondere Zielprofil-/Reifegradsteuerung und Positionierungstexte. Zu pruefen ist, ob Folgedokumente oder Context Packs diesen Satz als verbindliche Produktwahrheit weiterzitieren.

**[niedrig] Markdown Zeile 7, Frontmatter-Feld "Zweck"**

> **Zweck:** Verbindliches fachliches Betriebsmodell für Aufbau, Betrieb, Überwachung und kontinuierliche Verbesserung kundenindividueller Informationssicherheits-Managementsysteme.

Das PDF formuliert auf der Titelfolie "Verbindliche Prozesslogik für Aufbau, Betrieb, Überwachung und kontinuierliche Verbesserung..." und traegt den Untertitel "Das fachliche Betriebsmodell". Das Markdown verschmilzt beides zu "Verbindliches fachliches Betriebsmodell". Sachlich deckungsgleich, nur eine Umformulierung ohne veraenderte Anforderung - hier nur der Vollstaendigkeit halber vermerkt, kein Handlungsbedarf.

---

## Dokument 09 — MATERIALE_ABWEICHUNGEN

Der fachliche Hauptteil (Abschnitte 1 bis 32, alle Tabellen, Formeln, Gewichtungen, AC/D/A/O-Listen) ist im Markdown praktisch wortgetreu und vollstaendig uebernommen - inklusive aller Referenzgewichte (0,20/0,25/0,20/0,35 Maturity; 0,15/0,25/0,20/0,40 Control Effectiveness; Threat-Score 20/20/15/15/15/10/5; Goal Proximity 25/20/20/15/10/10). Materiale Abweichung ist die komplett fehlende Governance-Folie "Dokumentauftrag & Verbindlichkeit" (PDF Seite 2) mit der Kanonizitaetsregel, der Aenderungskontrolle fuer Methoden-, Gewichtungs- und Schwellenaenderungen sowie Owner, Gueltigkeit und Nachfolgerdokumenten. Umgekehrt enthaelt das Markdown eine vorangestellte "Zentrale Festlegung" mit dem Wort "niemals", die im PDF-Text so nicht vorkommt - inhaltlich zwar durch M01/M05 und 09-D01/09-D02 gedeckt, aber als eigenstaendig zitierbare Verbindlichkeit hinzugefuegt. Die Abschnittsnummerierung 1 bis 32 stimmt exakt ueberein.

**Nummerierung:** Die Nummerierung der Hauptabschnitte 1 bis 32 stimmt zwischen PDF und Markdown exakt ueberein, ebenso alle Unterabschnitte (4.1 bis 4.3, 5.1 bis 5.5, 25.1 bis 25.3 usw.). Auch die Navigations-/Inhaltszeile im PDF ("1 Auftrag - 2 Executive Summary - 3 Prinzipien - 4 Strategie-DNA - 5 bis 7 Reife und Confidence - 8 bis 11 Risiko - 12 bis 14 Threat/Vulnerability - 15 bis 17 Control Intelligence - 18 Zielerreichung/Readiness - 19 Benchmarking - 20 Erklaerbarkeit - 21 KI-Grenzen - 22 Rollen - 23 Szenarien - 24 bis 32 Governance und Uebergaben") deckt sich mit der Markdown-Struktur. Verwechslungsgefahr fuer Paragraphenzitate im Code besteht daher nicht. Hinweis: Im PDF laufen die nummerierten Listen in 12.2, 17.1 und 23.1 durch (12.2 = Punkte 5 bis 12, 17.1 = Punkte 13 bis 22, 23.1 = Punkte 23 bis 32) - ein Word-Listenfehler des Originals. Das Markdown startet diese Listen korrekt bei 1; die Reihenfolge und Anzahl der Punkte (8 / 10 / 10) ist identisch. Das ist eine Korrektur, kein Inhaltsverlust. Die IDs 09-AC01 bis AC15, 09-D01 bis D18, 09-A01 bis A12 und 09-O01 bis O15 sind vollstaendig und identisch nummeriert.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] PDF Seite 2, Folie "Dokumentauftrag & Verbindlichkeit", Einleitungssatz**

> Dokument 09 ist die kanonische fachliche Quelle für Reifegrad-, Risiko-, Threat-, Control- und Confidence-Logik. Nachfolgende Dokumente dürfen diese Modelle visualisieren, technisch implementieren oder profilspezifisch konfigurieren, aber nicht still semantisch verändern.

Die Kanonizitaets- und Vorrangregel fehlt im Markdown vollstaendig. Sie legt verbindlich fest, dass nachgelagerte Dokumente (10, 17, 18, 19, 20A, 20C) die Modelle nicht still semantisch veraendern duerfen. Ohne diese Regel ist im Repository nicht dokumentiert, dass Dokument 09 bei Widerspruch gegenueber spaeteren Dokumenten Vorrang hat - Abweichungen in Folgedokumenten oder in der Implementierung koennen so unbemerkt zur neuen 'Wahrheit' werden.

*Betroffen:* Jede spaetere Umsetzung von Scoring-, Risiko- und Control-Logik aus Dokumenten 10/17/18/20A sowie die Konsistenzpruefung zwischen Konzeptdokumenten.

**[hoch] PDF Seite 2, Steuerungsfeld-Tabelle, Zeile "Änderungskontrolle"**

> Änderungskontrolle  Methoden-, Gewichtungs- und Schwellenänderungen benötigen Version, Begründung, Impactanalyse und Freigabe.

Eine verbindliche Prozessanforderung fehlt. Das Markdown enthaelt zwar 09-AC07 ("Methoden- und Gewichtungsaenderungen sind versioniert") und 09-D14, aber nicht die zusaetzlichen Pflichtbestandteile Begruendung, Impactanalyse und Freigabe und nicht die Erstreckung auf Schwellenwerte. Eine Implementierung, die nur versioniert, erfuellt die PDF-Anforderung nicht.

*Betroffen:* Konfigurations-/Weighting-Verwaltung, Method-Governance, 09-AC07, 09-D14, 09-O04

**[mittel] PDF Seite 2, Steuerungsfeld-Tabelle, Zeilen Owner / Gültigkeit / Zentrale Nachfolger; Titelfolie "ABHÄNGIGKEITEN"**

> Owner  Product Architecture / ISMS Method Owner   |   Gültigkeit  Bis zur freigegebenen Nachfolgeversion   |   Zentrale Nachfolger  Dokument 10, 17, 18, 19, 20A und 20C

Der Markdown-Header nennt nur Arbeitsbezeichnung, Version, Status, Stand und einen Zweck-Satz. Owner, Gueltigkeitsregel und die Liste der zentralen Nachfolgerdokumente fehlen, ebenso die Angabe "ABHÄNGIGKEITEN Dokument 00 bis 08" der Titelfolie. Damit ist im Repository nicht ersichtlich, wer methodisch verantwortlich ist und welche Dokumente bei einer Aenderung zwingend nachgezogen werden muessen.

*Betroffen:* Dokumenten-Governance, Impact-Analyse bei Konzeptaenderungen

### Nur im Markdown, vom PDF nicht getragen

**[mittel] Markdown Zeile 9, Blockquote "Zentrale Festlegung" (vor Abschnitt 1)**

> **Zentrale Festlegung:** Die Plattform zeigt niemals nur einen Score. Jede verdichtete Aussage wird in fachliche Bedeutung, Datenstand, Ursachen, Unsicherheit, Zielbezug und nächste sinnvolle Handlung zerlegt.

Dieser Satz steht so im PDF nicht - weder auf der Titelfolie noch in Abschnitt 1, 2 oder 3. Das PDF sagt in M01 nur: "Ein Gesamtwert darf Details verdichten, aber nie Reife, Risiko, Wirksamkeit und Confidence ununterscheidbar vermischen" und in Abschnitt 2 "Aus diesen Dimensionen entsteht keine einzige magische Sicherheitszahl". Die Markdown-Fassung formuliert daraus eine schaerfere, absolute UI-Regel ("zeigt niemals nur einen Score") und eine feste Sechs-Elemente-Zerlegung (fachliche Bedeutung, Datenstand, Ursachen, Unsicherheit, Zielbezug, naechste sinnvolle Handlung), die im PDF an dieser Stelle keine Entsprechung hat. Das PDF definiert die verpflichtende Zerlegung erst in Abschnitt 20 als Explain Panel mit zehn anderen Elementen. Wer die Blockquote als Anforderung zitiert, baut eine Regel, die der Product Owner so nicht geschrieben hat. Inhaltlich widerspricht sie dem PDF nicht (gedeckt durch M01, M05, 09-D01, 09-D02), sie ist aber eine Zuspitzung des Ableiters.

*Betroffen:* Alle UI-/Score-Darstellungskomponenten, die sich auf die "Zentrale Festlegung" statt auf Abschnitt 20 (Explain Panel) berufen. Hinweis: dasselbe Blockquote-Muster existiert auch in den Markdown-Fassungen 07, 08, 10, 11, 12, 13 und 14 - es handelt sich vermutlich um ein systematisches Artefakt der Ableitung.

**[niedrig] Markdown Zeile 7, Kopfzeile "Zweck"**

> **Zweck:** Verbindliches Bewertungs-, Vertrauens- und Entscheidungsmodell für Reifegrad, Zielerreichung, Risiken, Bedrohungssignale und Control-Wirksamkeit.

Im PDF lautet der Untertitel der Titelfolie "Erklärbare Bewertungs-, Vertrauens- und Entscheidungslogik für ein lebendes, zielorientiertes ISMS." Das Markdown ersetzt "Erklärbare ... Logik" durch "Verbindliches ... Modell". Die Verbindlichkeit ist zwar durch die (im Markdown fehlende) Folie "Dokumentauftrag & Verbindlichkeit" gedeckt, der Kernbegriff "erklärbar" und der Zusatz "für ein lebendes, zielorientiertes ISMS" gehen jedoch verloren. Geringe Tragweite, da Erklaerbarkeit an vielen anderen Stellen (M04, Abschnitt 20) unveraendert erhalten ist.

*Betroffen:* Dokument-Metadaten, keine bekannte Implementierung

---

## Dokument 10 — MATERIALE_ABWEICHUNGEN

Der Fachteil des Dokuments (Abschnitte 1 bis 34) ist in der Markdown-Fassung praktisch wortgetreu und vollstaendig abgebildet - alle Listen, Tabellen, Pflichtfelder, Akzeptanzkriterien, Entscheidungen, Annahmen und offenen Fragen stimmen in Anzahl und Wortlaut ueberein. Materiell fehlt jedoch die komplette Governance-Folie "Dokumentauftrag & Verbindlichkeit" (PDF-Seite 2) mit der Kanonizitaetsregel, der Aenderungskontrolle fuer KPI-, Priorisierungs-, Simulations- und Routenaenderungen sowie Owner und Gueltigkeit. Umgekehrt enthaelt das Markdown eine einleitende "Zentrale Festlegung", die im PDF-Text nicht vorkommt und eine eigene Pflichtattribut-Liste fuer jede Entscheidung aufstellt. Die Abschnittsnummerierung 1 bis 34 stimmt exakt ueberein; die abweichenden Zahlen bei nummerierten Listen im PDF-Text sind reine Extraktionsartefakte.

**Nummerierung:** Die Hauptnummerierung ist identisch: PDF-Folientitel 1 bis 34 entsprechen exakt den Markdown-Ueberschriften 1 bis 34 (inkl. Unterabschnitten wie 5.4, 9.1, 13.1, 18.1, 23, 28, 29). Zitate im Code auf Paragraphen-Nummern von Dokument 10 sind damit eindeutig, es besteht keine Verwechslungsgefahr. Achtung nur bei Roh-Zitaten aus der PDF-Extraktion: dort laufen nummerierte Listen ueber Folien hinweg durch, sodass "5.1 Fuenf Ebenen" mit Punkt 7 beginnt, "14.2 Kanonischer Ablauf" mit Punkt 12 und "25. Demo-Spezifikation" mit Punkt 22. Das ist ein Extraktionsartefakt; das Markdown numeriert diese Listen korrekt mit 1-5 bzw. 1-10 neu. Die Inhaltsuebersicht auf PDF-Seite 2 ("1 Auftrag - 2 Summary - 3 Prinzipien ...") bestaetigt die Markdown-Nummerierung.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] PDF Seite 2, Kopftext von "Dokumentauftrag & Verbindlichkeit"**

> Dokument 10 ist die kanonische fachliche Quelle für Decision Center, Missionen, KPI-Verträge, Priorisierung, Zielrouten, Simulationen, Forecasts und Wertnachweise. Nachfolgende Dokumente dürfen diese Logik technisch implementieren, visualisieren oder profilspezifisch konfigurieren, aber nicht still semantisch verändern.

Verbindliche Kanonizitaets- und Vorrangregel. Sie legt fest, dass spaetere Dokumente (11, 12, 13 bis 20C) und damit auch deren Umsetzung die Decision-Center-Semantik nicht still veraendern duerfen. Ohne diese Regel im Markdown fehlt der Konfliktloesungsmassstab: bei Widerspruch zwischen Dokument 10 und einem Nachfolgedokument ist im Repository nicht dokumentiert, wer gewinnt.

*Betroffen:* WP-016 (Mission Control/Heute) und WP-017 (Entscheidungen im Zwilling) leiten Semantik aus Dokument 10 ab; Dokument 12 (Reporting) und Dokument 06 (Decision Cards) sind potenzielle Konfliktquellen.

**[hoch] PDF Seite 2, Steuerungsfeld-Tabelle, Zeile "Änderungskontrolle"**

> Änderungskontrolle  KPI-, Priorisierungs-, Simulations- und Routenänderungen benötigen Version, Begründung, Tests und Impactanalyse.

Eine verbindliche Change-Control-Pflicht mit vier Mindestartefakten (Version, Begruendung, Tests, Impactanalyse) fehlt komplett. Abschnitt 22.2 im Markdown deckt nur Aenderungen an KPI- und Simulationsmethoden ab und nennt andere Artefakte (Method Owner, Impactanalyse, Test gegen Referenzdaten, Freigabe, Migrationshinweis) - die dokumentweite Regel inklusive Priorisierungs- und Routenaenderungen ist nicht abgebildet.

*Betroffen:* Jede spaetere Aenderung an Priorisierungs- oder Routenlogik (u. a. WP-016/WP-017) waere ohne dokumentierte Version, Begruendung, Tests und Impactanalyse durchgefuehrt worden.

**[mittel] PDF Seite 2, Steuerungsfeld-Tabelle (Owner, Gültigkeit, Zentrale Nachfolger)**

> Owner  Product Architecture / Decision Intelligence Owner | Gültigkeit  Bis zur freigegebenen Nachfolgeversion | Zentrale Nachfolger  Dokument 11, 12, 13 bis 20C

Verantwortlichkeit, Gueltigkeitsdauer und die Liste der abhaengigen Nachfolgedokumente fehlen im Markdown-Kopf. Damit ist im Repository nicht erkennbar, wer fachlicher Owner ist und welche Dokumente bei einer Aenderung von Dokument 10 zwingend nachgezogen werden muessen.

**[niedrig] PDF Seite 1, Titelfolie (Untertitel und Abhängigkeiten)**

> Von komplexen ISMS-Daten zu wenigen erklärbaren Entscheidungen, realistischen Zielrouten und belegbarer Wirkung. ... ABHÄNGIGKEITEN Dokument 00 bis 09

Der Zielsatz des Dokuments und die explizite Aufwaertsabhaengigkeit "Dokument 00 bis 09" fehlen im Markdown-Kopf. Inhaltlich wird die Abhaengigkeit in Abschnitt 1 und 33 teilweise aufgefangen, der Verlust ist daher gering.

### Nur im Markdown, vom PDF nicht getragen

**[mittel] Markdown Zeile 9, Blockzitat "Zentrale Festlegung" (vor Abschnitt 1)**

> **Zentrale Festlegung:** Das Decision Center ist kein dekoratives Dashboard und keine Sammlung möglichst vieler Kennzahlen. ... Jede Entscheidung zeigt Zielbezug, Ursache, erwartete Wirkung, Aufwand, Unsicherheit, Abhängigkeiten, Alternativen, Verantwortliche und spätere Ergebnisprüfung.

Dieser Absatz kommt im extrahierten PDF-Text an keiner Stelle vor (Volltextsuche nach "dekorativ", "Zentrale Festlegung", "Ergebnisprüfung" ohne Treffer). Er ist inhaltlich anschlussfaehig - Abschnitt 10 sagt "KPIs dienen Steuerung, nicht Dekoration", Abschnitt 9.1 listet Decision-Card-Pflichtfelder - stellt aber eine eigene, im PDF so nicht formulierte Neun-Attribut-Pflicht fuer JEDE Entscheidung auf. Diese Liste ist kuerzer und anders geschnitten als die 14 Pflichtfelder in 9.1 (kein Auslöser, keine Baseline, keine Optionen, keine Frist, keine Provenance). Wenn im Code gegen diese Neunerliste statt gegen 9.1 implementiert wurde, fehlen Pflichtfelder. Dasselbe Muster findet sich in allen abgeleiteten Dokumenten 07 bis 14 - es ist offenbar eine systematische Zutat der Ableitung, nicht ein Einzelfall.

*Betroffen:* Decision-Card-Modellierung in WP-017 (Entscheidungen im Zwilling) und apps/web/lib/heute/framing.ts

**[niedrig] Markdown Zeile 7, Kopffeld "Zweck"**

> **Zweck:** Verbindliches Steuerungs-, KPI-, Priorisierungs- und Simulationskonzept für rollenbezogene Entscheidungen im Kunden-, Berater- und Executive-Kontext.

Formulierung steht so nicht im PDF. Sie ist eine sinngemaesse Verdichtung der PDF-Zeile "Dokument 10 ist die kanonische fachliche Quelle für Decision Center, Missionen, KPI-Verträge, Priorisierung, Zielrouten, Simulationen, Forecasts und Wertnachweise", laesst dabei aber Zielrouten, Forecasts und Wertnachweise weg und ersetzt "kanonische Quelle" durch das schwaechere "verbindliches Konzept". Keine widersprechende Anforderung, aber eine Abschwaechung des Geltungsanspruchs.

---

## Dokument 11 — MATERIALE_ABWEICHUNGEN

Der fachliche Hauptteil (Kapitel 1 bis 33) ist praktisch wortgleich uebertragen - Pflichtfelder, Work-Item-Typen, Rollen, Lebenszyklus, Approval Contract, SLA, Blocker, Notification Classes, Handover, Szenarien, Akzeptanzkriterien, alle 15 Entscheidungen, 10 Annahmen, 15 offenen Fragen und das Aenderungsprotokoll stimmen inhaltlich exakt ueberein. Die Abweichungen liegen ausschliesslich im Vorspann: Die komplette PDF-Folie "Dokumentauftrag & Verbindlichkeit" mit dem Steuerungsfeld-Block (Owner, Gueltigkeit, Aenderungskontrolle, Zentrale Nachfolger) und der bindenden Aussage, dass Nachfolgedokumente die Logik "nicht still semantisch veraendern" duerfen, fehlt im Markdown ersatzlos. Umgekehrt enthaelt das Markdown einen als "Zentrale Festlegung" gekennzeichneten Absatz, der im PDF an keiner Stelle vorkommt. Die Kapitelnummerierung ist identisch, hier besteht keine Verwechslungsgefahr.

**Nummerierung:** Die Nummerierung ist deckungsgleich. Die Navigationsleiste im PDF ("1 Auftrag · 2 Summary · 3 Verfassung · 4 Work-Item-Modell · 5 Verantwortung · 6 Team Workspace · 7 Lebenszyklus · 8 Arbeitspakete · 9 Freigaben · 10 Kommunikation · 11 Evidence Requests · 12 SLA/Eskalation · 13 Attention · 14 Uebergabe · 15 Meetings · 16 bis 20 ... · 21 bis 33 ...") und die Folientitel verwenden dieselben Nummern wie die Markdown-Ueberschriften 1 bis 33. Auch die Unterabschnitte (3.1, 4.1, 4.2, 5.1-5.4, 9.3, 13.1-13.4, 22.1-22.3, 24.1-24.2) stimmen. Zitate im Code auf Paragraphen wie "Dok 11 §4.1" oder "§27" treffen in beiden Quellen dieselbe Stelle. Einzige Besonderheit: Kapitel 23 und 24 haben im extrahierten PDF-Text fortlaufende Listennummern (7-46, 47-56) statt je Szenario neu bei 1 beginnend - das ist ein reiner Extraktionsartefakt der Aufzaehlungen, nicht der Abschnittsnummerierung.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] PDF Folie 2 - "Dokumentauftrag & Verbindlichkeit", Einleitungssatz**

> Dokument 11 ist die kanonische fachliche Quelle für Work Items, Aufgaben, Requests, Threads, Beteiligungsrollen, Freigabearbeit, SLA, Eskalation, Übergaben, Meetings und Attention Management. Nachfolgende Dokumente dürfen diese Logik technisch implementieren, integrieren oder profilspezifisch konfigurieren, aber nicht still semantisch verändern.

Die Verbindlichkeitsklausel des Dokuments fehlt komplett. Sie legt fest, dass Dokument 11 die kanonische Quelle fuer Work-Item-Semantik ist und dass nachgelagerte Dokumente (12 bis 20C, insbesondere 18 als technische Architektur) die Semantik nicht still veraendern duerfen. Ohne diese Klausel im Markdown ist im Repository nicht dokumentiert, dass Dokument 11 gegenueber Dokument 18 semantischen Vorrang hat - ein technisches Design, das die Work-Item-Semantik abweichend umsetzt, waere aus der Markdown-Fassung heraus nicht als Regelverstoss erkennbar.

*Betroffen:* Jedes Work Package, das Work-Item-, Status- oder Freigabesemantik aus Dokument 18 statt aus Dokument 11 ableitet.

**[hoch] PDF Folie 2 - Steuerungsfeld-Tabelle, Zeile "Änderungskontrolle"**

> Änderungskontrolle: Änderungen an Work-Item-Semantik, Freigaben, Status, SLA oder Eskalationsregeln benötigen Version, Tests und Impactanalyse.

Eine explizite Change-Control-Pflicht mit drei konkreten Anforderungen (Version, Tests, Impactanalyse) fehlt im Markdown. Das ist eine verbindliche Prozessregel, die im Projekt nicht sichtbar ist: Aenderungen an Statusmodell, Freigabelogik oder SLA-Regeln koennten ohne Versionierung, ohne Tests und ohne Impactanalyse durchgefuehrt werden, weil die Markdown-Fassung diese Pflicht nicht traegt.

*Betroffen:* Alle spaeteren Aenderungen an Work-Item-Status, Approval- oder SLA-Logik in Code und Konzept.

**[mittel] PDF Folie 2 - Steuerungsfeld-Tabelle, Zeilen "Owner", "Gültigkeit", "Zentrale Nachfolger"**

> Owner: Product Architecture / Collaboration & Workflow Owner | Gültigkeit: Bis zur freigegebenen Nachfolgeversion | Zentrale Nachfolger: Dokument 12 bis 20C

Owner-Zuordnung, Gueltigkeitsregel und die Angabe der nachgelagerten Dokumente fehlen. Die Gueltigkeitsregel ist eine Festlegung (das Dokument gilt bis zur freigegebenen Nachfolgeversion, nicht bis zu einem Datum). Die Nachfolgerliste zeigt, welche Dokumente von Aenderungen betroffen waeren - relevant fuer die im PDF geforderte Impactanalyse.

**[niedrig] PDF Folie 1 - Deckblatt**

> ABHÄNGIGKEITEN Dokument 00 bis 10

Die Angabe der Vorgaengerabhaengigkeiten fehlt im Markdown-Kopf. Inhaltlich teilweise kompensiert durch Kapitel 32 Dokumentenabhaengigkeiten, das dieselben Dokumente einzeln auffuehrt. Geringer Verlust.

**[niedrig] PDF Folie 1 - Deckblatt, Untertitel**

> Vom isolierten To-do zur kontextreichen, prüfbaren Teamarbeit über Kunde, Beratung, Management und Audit.

Der Leitsatz des Dokuments fehlt im Markdown. Rein positionierend, keine Anforderung. Nur der Vollstaendigkeit halber gemeldet.

### Nur im Markdown, vom PDF nicht getragen

**[mittel] Markdown Kopf, Zeile 9 - Blockquote "Zentrale Festlegung"**

> > **Zentrale Festlegung:** Zusammenarbeit findet nicht in isolierten Chats, E-Mail-Ketten oder losen To-do-Listen statt. Jede relevante Aufgabe, Frage, Entscheidung, Freigabe, Datei und Nachricht bleibt mit ihrem fachlichen Kontext, Ziel, Owner, Datenstand, Definition of Done und Audit Trail verbunden. Die Plattform koordiniert Arbeit - sie ersetzt nicht die fachliche Verantwortung der Menschen.

Dieser Absatz steht im PDF an keiner Stelle - weder auf dem Deckblatt, noch auf der Verbindlichkeitsfolie, noch in Kapitel 1 oder 2. Er traegt das Label "Zentrale Festlegung" und liest sich damit als normative Kernaussage des Dokuments, ist aber vom Original nicht gedeckt. Inhaltlich widerspricht er dem PDF nicht (er verdichtet C01, C05, C07, C08 und C12 sowie die Pflichtfelder aus 4.1), aber er ist eine Interpretation des Ableitenden, keine Aussage des Product Owners. Praktische Gefahr: Er steht an der prominentesten Stelle des Dokuments und wird bei Zitaten wahrscheinlich als staerkste Anforderung herangezogen - insbesondere die absolute Formulierung "Jede relevante Aufgabe, Frage, Entscheidung, Freigabe, Datei und Nachricht bleibt ... verbunden", die strenger klingt als die abgestuften Einzelprinzipien im PDF. Zudem hat er die im PDF an dieser Stelle stehende, tatsaechlich verbindliche Klausel (kanonische Quelle / keine stille semantische Aenderung / Aenderungskontrolle) verdraengt.

*Betroffen:* Jedes Artefakt, das die Verbindlichkeit von Kontextbindung aus dem Dokumentkopf statt aus den Prinzipien C01-C15 ableitet.

**[niedrig] Markdown Kopf, Zeile 7 - "Zweck"**

> **Zweck:** Verbindliches Konzept für kontextgebundene Zusammenarbeit, Aufgaben, Anfragen, Freigaben, Übergaben, Benachrichtigungen und prüfbare Kommunikation zwischen Kunde, Beratung, Management, Audit und Plattformbetrieb.

Formulierung so nicht im PDF. Sie ist eine Paraphrase des PDF-Satzes zur kanonischen Quelle, ergaenzt aber "Plattformbetrieb" als Beteiligten, der im PDF-Untertitel ("über Kunde, Beratung, Management und Audit") nicht genannt wird. Geringe Auswirkung, aber es ist eine Hinzufuegung des Ableitenden.

---

## Dokument 12 — MATERIALE_ABWEICHUNGEN

Der eigentliche Fachteil ist aussergewoehnlich treu: Von Abschnitt 1 bis 35 ist die Markdown-Fassung nach Normalisierung Wort fuer Wort identisch mit dem PDF - alle Prinzipien R01-R15, alle Pflichtfeldtabellen, der Case-Katalog, die 22 Entscheidungen, 14 Annahmen, 21 offenen Fragen und die 25 Akzeptanzkriterien stimmen exakt ueberein. Die Abweichungen liegen ausschliesslich im Vorspann: Die PDF-Seite "Dokumentauftrag & Verbindlichkeit" mit dem Steuerungsfeld (Owner, Gueltigkeit, Aenderungskontrolle) fehlt vollstaendig, darunter eine Regel mit verbindlicher Wirkung ("benoetigen nachvollziehbare Impactanalyse und Review"). Umgekehrt enthaelt das Markdown einen Blockquote "Zentrale Festlegung", der so nicht im PDF steht - inhaltlich vom PDF gedeckt, also Zusammenfassung und keine Erfindung. Die Abschnittsnummerierung 1-35 stimmt exakt ueberein, es besteht keine Verwechslungsgefahr fuer Paragraphen-Zitate im Code.

**Nummerierung:** Keine Abweichung. Das PDF nummeriert die Folientitel 1. bis 35. und die Navigationszeile ("Inhalt: 1-9 ... 10 ... 11-24 ... 25-35") verwendet dieselben Nummern. Das Markdown folgt dieser Nummerierung 1:1, inklusive aller Unterabschnitte (3.1, 4.1-4.3, 10.1-10.12 usw.). Zitate der Form "Dok 12, Abschnitt 10.9" oder "ENTSCHEIDUNG 12-18" treffen in beiden Quellen dieselbe Stelle. Auch die im PDF unregelmaessige Abbildungsreihenfolge (Abschnitt 2 = Abbildung 1, Abschnitt 4 = Abbildung 3, Abschnitt 6 = Abbildung 2) ist im Markdown ueber die Platzhalter FIG1/FIG3/FIG2 korrekt uebernommen.

### Im PDF vorhanden, im Markdown fehlend

**[mittel] PDF Seite 2, Abschnitt "Dokumentauftrag & Verbindlichkeit", Steuerungsfeld-Tabelle, Zeile "Aenderungskontrolle" (vor Abschnitt 1)**

> Änderungskontrolle: Änderungen an Claims, Templates, Audience Modes, geschützten Regionen, Freigaben oder externen Veröffentlichungen benötigen nachvollziehbare Impactanalyse und Review.

Satz mit verbindlicher Wirkung ("benoetigen"), der komplett fehlt. Er legt fest, dass Aenderungen an genau den Kernobjekten dieses Dokuments - Claims, Templates, Audience Modes, geschuetzten Regionen, Freigaben, externen Veroeffentlichungen - nicht still erfolgen duerfen, sondern eine dokumentierte Impactanalyse und einen Review erfordern. Im Markdown existiert kein Aequivalent: Abschnitt 29 und 30 regeln die Governance im Produkt, aber nicht die Aenderungskontrolle am Konzeptdokument selbst. Wer nur das Markdown liest, kann Audience Modes oder Template-Regeln ohne Impactanalyse aendern.

*Betroffen:* Betrifft die Konzept-Governance, nicht ein gebautes Artefakt. Relevant fuer kuenftige Aenderungen an Dokument 12 und fuer .claude/rules/docs.md ("Keine stille Widerspruchsaufloesung").

**[niedrig] PDF Seite 2, Steuerungsfeld-Tabelle, Zeilen "Owner" und "Gueltigkeit"**

> Owner: Product / Reporting & Communication / Security & Quality — Gültigkeit: Bis zur freigegebenen Nachfolgeversion

Owner-Rollen und Gueltigkeitsregel des Dokuments fehlen im Markdown-Kopf, der nur Arbeitsbezeichnung, Version, Status, Stand und Zweck nennt. Aus der verbindlichen Projektwahrheit ist dadurch nicht ableitbar, welche Rollen fuer Aenderungen an diesem Konzept zustaendig sind und bis wann die Fassung gilt. Auch der Satz "Version 1.0 bleibt archiviert; Version 1.1 ist aktiv." fehlt explizit; der Status ist nur indirekt aus der Tabelle in Abschnitt 35 erkennbar.

**[niedrig] PDF Abschnitte 2, 4, 6, 8.2 und 10.5 - Bildunterschriften Abbildung 1 bis 5**

> Abbildung 5: Das Presentation Repository trennt Templates, Manifests, Snapshots und Assets und ermöglicht kontrollierte Updates mit Diff, Schutz manueller Inhalte, Review und Release.

Alle fuenf Bildunterschriften sind im Markdown durch reine Platzhalter ([[FIGURE:FIG1]] bis [[FIGURE:FIG5]]) ersetzt; der Beschreibungstext ist ersatzlos entfallen. Die Captions enthalten verdichtete Aussagen, etwa dass das Repository Templates, Manifests, Snapshots und Assets trennt, oder dass das Zielgruppenprisma Sprache, Detailtiefe und Dramaturgie veraendert, "ohne die zugrunde liegenden Fakten zu veraendern". Andere Konzeptdokumente im selben Repository (z. B. 01 und 02) behalten die Caption-Texte als kursive Zeile neben dem Platzhalter - Dokument 12 weicht von dieser Konvention ab.

*Betroffen:* Keine bekannte direkte Codeabhaengigkeit; betrifft die Vollstaendigkeit der Produktwahrheit fuer Abschnitt 10.5 (Presentation Repository).

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Markdown Zeile 9, Blockquote "Zentrale Festlegung" (direkt nach dem Kopf, vor Abschnitt 1)**

> **Zentrale Festlegung:** Die Plattform erzeugt nicht einfach schöne Dateien. [...] Jede Aussage, Kennzahl, Grafik und Empfehlung bleibt auf Quellen, Methodik, Snapshot, Verantwortliche und Version zurückführbar.

Dieser Absatz steht in dieser Formulierung nirgends im PDF. Das PDF hat an der entsprechenden Stelle die Zeile "Zentrale Neuerung: Repositorygestuetzte Pflege wiederkehrender Presentation Cases mit Manifest, Update statt Neuerstellung und Schutz manueller Inhalte." sowie die Titel-Subline "Eine Datenbasis. Viele verantwortungsvolle Narrative. Kontrolliert aktualisiert." Der Markdown-Text ist eine eigene Zusammenfassung; inhaltlich ist er durch R05, Abschnitt 15 und Abschnitt 29 gedeckt, es wird also keine neue Anforderung erfunden. Ein als "Zentrale Festlegung" hervorgehobener Satz suggeriert aber Originalwortlaut des Product Owners, den es nicht gibt. Die Formulierung "Jede Aussage, Kennzahl, Grafik und Empfehlung bleibt ... zurueckfuehrbar" ist zudem breiter als das PDF-Original R05, das ausdruecklich nur "Materiale Aussagen, Kennzahlen und Empfehlungen" verlangt - "jede Grafik" kommt hinzu.

*Betroffen:* Falls ein Work Package die Traceability-Pflicht aus diesem Blockquote statt aus R05 / Abschnitt 15 abgeleitet hat, waere sie zu weit gefasst ("jede Grafik" statt "materiale Aussagen").

**[niedrig] Markdown Zeile 7, Kopfzeile "Zweck"**

> **Zweck:** Verbindliches Produkt- und Fachkonzept für die Erzeugung, Prüfung, Freigabe, Ausgabe, repositorygestützte Pflege und kontrollierte Aktualisierung zielgruppengerechter Reports, PDF-Dokumente, PowerPoint-Präsentationen, Briefings, Auditpakete und Management-Unterlagen

Umformulierung des PDF-Satzes "Dokument 12 Version 1.1 ist die verbindliche Produkt- und Fachquelle fuer Report Packages, PDF- und PowerPoint-Ausgaben, Presentation Cases, Templates, Manifests, Snapshots, Update-Diffs, geschuetzte manuelle Inhalte, Reviews, Freigaben und kontrollierte Creative Modes." Die Aufzaehlung wurde ausgetauscht: Im PDF stehen die Geltungsobjekte (Presentation Cases, Templates, Manifests, Snapshots, Update-Diffs, geschuetzte manuelle Inhalte, Creative Modes), im Markdown stehen Artefaktarten (Briefings, Auditpakete, Management-Unterlagen). Keine Anforderung wird dadurch veraendert, aber der Geltungsbereich des Dokuments ist im Markdown anders beschrieben als im Original.

---

## Dokument 13 — MATERIALE_ABWEICHUNGEN

Die Markdown-Fassung bildet die Fachkapitel 1 bis 38 des PDF praktisch wortgleich ab - Prinzipien MS01 bis MS15, alle Tabellen (Service Instance, Rollen, Run-Typen, Rhythmen, Health, Governance, Eskalation, Aktivitaet/Output/Outcome/Impact), Quality Gates, Akzeptanzkriterien, ENTSCHEIDUNG 13-01 bis 13-15, ANNAHME 13-A1 bis A10, OFFENE FRAGE 13-Q1 bis Q12, Ideenparkplatz, Dokumentenabhaengigkeiten und Aenderungsprotokoll stimmen inhaltlich vollstaendig ueberein. Zwei materiale Abweichungen bestehen dennoch: Die komplette Steuerungsseite "Dokumentauftrag & Verbindlichkeit" (Seite 2 des PDF) mit der Vorrangregel gegenueber Nachfolgedokumenten und der Aenderungskontrolle fehlt im Markdown ersatzlos. Umgekehrt enthaelt das Markdown eine "Zentrale Festlegung" mit einer eigenen Pflichtbestandteil-Liste, die so im PDF nirgends steht. Die Abschnittsnummerierung 1 bis 38 ist identisch, hier besteht keine Verwechslungsgefahr.

**Nummerierung:** Die Hauptnummerierung stimmt exakt ueberein: PDF-Folientitel und Markdown-Ueberschriften laufen beide von "1. Dokumentauftrag und Abgrenzung" bis "38. Aenderungsprotokoll", auch alle Unterabschnitte (3.1, 4.3, 12.3, 28.7 usw.) sind deckungsgleich. Das Markdown folgt der Folientitel-Nummerierung. Einzige Auffaelligkeit: die Inhalts-/Navigationszeile auf PDF-Seite 2 fasst zusammen "18/19 Responsibility" und "28 bis 38 Szenarien und Governance", waehrend die Folientitel 18 (Customer Responsibilities) und 19 (Provider Responsibilities) getrennt fuehren. Das Markdown folgt korrekt den Folientiteln. Zitate im Code auf Paragraphen-Nummern von Dokument 13 sind damit unbedenklich.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] PDF Seite 2, Block "Dokumentauftrag & Verbindlichkeit" (vor Abschnitt 1)**

> Dokument 13 ist die kanonische fachliche Quelle für Service Definition, Service Instance, Service Charter, Shared Responsibility, Transition, Service Runs, Governance, Quality, Value, Improvement, Skalierung und Exit. Nachfolgende Dokumente dürfen Preise, Ressourcen, Technik und KI konkretisieren, aber diese Betriebssemantik nicht still verändern.

Diese Vorrangregel fehlt im Markdown vollstaendig. Sie legt verbindlich fest, dass Dokument 13 die kanonische Quelle der Betriebssemantik ist und dass Dokument 14 bis 20C sie nur konkretisieren, aber nicht still veraendern duerfen. Ohne diese Regel gibt es im Repository keine dokumentierte Konfliktaufloesung, wenn ein spaeteres Dokument (z. B. 14 zu SLA/Preisen oder 20A zu KI-Guardrails) der Servicesemantik widerspricht - dann gilt faktisch das zuletzt gelesene Dokument.

*Betroffen:* Alle Artefakte, die Servicesemantik aus Dokument 14 bis 20C ableiten (Service-Objektmodell, SLA-Logik, KI-Guardrails). Ein Widerspruch zwischen 13 und einem Nachfolgedokument waere ohne diese Klausel nicht als Stop Condition erkennbar.

**[hoch] PDF Seite 2, Steuerungsfeld-Tabelle, Zeile "Änderungskontrolle"**

> Änderungskontrolle  Änderungen an Serviceobjekten, Charter, Responsibility, Lifecycle, Quality, Value, Change oder Exit benötigen Version, Tests und Impactanalyse.

Verbindliche Aenderungskontrolle mit drei Pflichtbestandteilen (Version, Tests, Impactanalyse) fuer genau benannte Objektklassen. Fehlt im Markdown komplett. Damit steht in der als Produktwahrheit genutzten Fassung kein Hinweis, dass eine Aenderung am Serviceobjektmodell oder an Charter/Responsibility/Lifecycle zwingend Tests und eine Impactanalyse nach sich zieht - ein Work Package koennte diese Objekte aendern, ohne die geforderte Impactanalyse zu erstellen.

*Betroffen:* Jedes zukuenftige WP, das Service Definition/Instance/Charter/Run oder Exit-Logik aendert.

**[mittel] PDF Seite 2, Steuerungsfeld-Tabelle, Zeilen Owner / Gültigkeit / Zentrale Nachfolger**

> Owner  Product Architecture / Managed Service Operating Model Owner | Gültigkeit  Bis zur freigegebenen Nachfolgeversion | Zentrale Nachfolger  Dokument 14 bis 20C

Ownership, Gueltigkeitsregel und die Kette der Nachfolgedokumente fehlen im Markdown-Kopf. Das Markdown nennt nur Version, Status, Stand und Abhaengigkeiten (Dokument 00 bis 12), also nur die Vorgaenger. Wer das Dokument verantwortet und bis wann es gilt, ist im Repository nicht dokumentiert.

**[niedrig] PDF Seite 1, Untertitel der Titelfolie**

> Vom fachlich begründeten Bedarf über Transition und wiederholbare Delivery bis zu messbarer Wirkung, Skalierung und geordnetem Exit.

Der Untertitel des Originals fehlt und ist im Markdown durch eine selbst formulierte Zweck-Zeile ersetzt (siehe Befund unter nurImMarkdown). Inhaltlich weitgehend aequivalent, aber die Original-Formulierung des Product Owners ist nicht mehr auffindbar.

### Nur im Markdown, vom PDF nicht getragen

**[hoch] Markdown Zeile 10, Blockquote "Zentrale Festlegung" (direkt vor Abschnitt 1)**

> > **Zentrale Festlegung:** Ein Managed Service ist keine lose Sammlung von Berateraufgaben und kein automatisch verlängertes Projekt. Er ist eine versionierte, kundenspezifische Service Instance mit eindeutigem Outcome, Scope, Verantwortungen, Betriebsrhythmus, Qualitätsregeln, Leistungsversprechen, Datenbasis, Governance, Wertnachweis und Exit-Fähigkeit.

Dieser Absatz steht im PDF an keiner Stelle - weder auf der Titelfolie, noch auf der Verbindlichkeitsseite, noch in Abschnitt 1 bis 4. Er ist eine Neuformulierung. Kritisch ist die aufgezaehlte Pflichtbestandteil-Liste: sie weicht von beiden verbindlichen Listen des PDF ab. ENTSCHEIDUNG 13-03 im PDF nennt "Outcome, Scope, Shared Responsibility, Quality, Wert und Exit sind Pflichtbestandteile", Abschnitt 32 nennt "Outcome, Scope, Charter, Owner, RACI+, Rhythmus, Quality Gates, Messmodell und Exit-Regel". Das Markdown fuegt "Leistungsversprechen" und "Datenbasis" als Pflichtbestandteile hinzu, laesst dafuer "Charter", "Owner" und "RACI+" weg. Wer diese Zeile als Kurzdefinition liest, baut ein Service-Instance-Schema mit falschem Pflichtfeldsatz. Da der Absatz ganz oben und hervorgehoben steht, ist genau das wahrscheinlich.

*Betroffen:* Service-Instance-Datenmodell und Pflichtfeldvalidierung; jede Ableitung der Pflichtbestandteile aus dem Dokumentkopf statt aus Abschnitt 4.3, 32 oder ENTSCHEIDUNG 13-03.

**[niedrig] Markdown Zeile 8, Kopfzeile "Zweck"**

> **Zweck:** Verbindliches Fach- und Betriebsmodell dafür, wie wiederkehrende ISMS-Leistungen ausgewählt, kundenspezifisch konfiguriert, überführt, erbracht, geprüft, gesteuert, verbessert, skaliert und geordnet beendet werden.

Formulierung steht so nicht im PDF; sie ist eine Zusammenfassung, die den Untertitel der Titelfolie ersetzt. Inhaltlich mit dem PDF vereinbar (Abschnitt 1 beschreibt denselben Gegenstand), aber das Wort "Verbindlich" ist eine Zuschreibung der Ableitung, nicht des Originals. Kein eigener Anforderungsgehalt, daher niedrige Schwere - aber es ist ein Beleg dafuer, dass der Dokumentkopf frei formuliert wurde und nicht als PDF-Zitat gelesen werden darf.

**[niedrig] Markdown Zeilen 37, 88, 191, 293**

> [[FIGURE:FIG1]] / [[FIGURE:FIG2]] / [[FIGURE:FIG3]] / [[FIGURE:FIG4]]

Vier Grafik-Platzhalter ohne aufgeloesten Inhalt in Abschnitt 2, 4, 5.3 und 8.2. Der Bildinhalt der Originalfolien (u. a. zur Shared Responsibility in 5.3 und zu den vier Standard/Konfiguration/Customization-Ebenen in 8.2) ist im Repository nicht verfuegbar. Aus dem extrahierten PDF-Text laesst sich nicht pruefen, ob die Grafiken zusaetzliche Festlegungen tragen. Als offener Punkt zu vermerken, nicht als Widerspruch.

---

## Dokument 14 — MATERIALE_ABWEICHUNGEN

Der fachliche Hauptteil (Abschnitte 1 bis 33) ist praktisch wortgleich uebernommen: alle Prinzipien CP01-CP15, Katalogtabellen SF01-SF12 und SO01-SO15, Service-Tiefen, Paketfamilien, SLA-Baender, Preisformeln, Preisbaender, Marktanker, Akzeptanzkriterien, Entscheidungen D14-01 bis D14-15, Annahmen, offene Fragen und Quellenregister stimmen inhaltlich und in der Nummerierung ueberein. Materiale Abweichung ist die komplett fehlende Governance-Folie "Dokumentauftrag & Verbindlichkeit" (PDF-Seite 2) mit dem Steuerungsfeld-Block, der eine verbindliche Aenderungskontrolle fuer Service Offers, Preisformeln, SLA-Baender, Paketgrenzen und Commercial Baseline festlegt und Folgedokumenten das stille Veraendern der kommerziellen Semantik untersagt. Umgekehrt enthaelt das Markdown eine als "Zentrale Festlegung" gerahmte Kernaussage, die im PDF in dieser Form nicht existiert. Die Abschnittsnummerierung ist verwechslungsfrei; das Markdown folgt exakt der Foliennummerierung.

**Nummerierung:** Das Markdown folgt exakt der Nummerierung der Folientitel (1. Dokumentauftrag und Abgrenzung bis 33. Aenderungsprotokoll), inklusive aller Unterabschnitte (z.B. 8.4 Illustrative Service-Level-Baender, 12.5 Audit Route, 19.3 Change-Kategorien). Die Navigationsleiste am Seitenkopf ("1 Auftrag - 2 Summary - 3 Verfassung - 4 Preisobjekte - 5 Katalog - 6 Tiefen - 7 Pakete - 8 SLA - 9 Preisformel - 10 Treiber - 11 Lizenz - 12/13 Preisbaender - 14 Add-ons - 15 Marktanker - 16 Business Case - 17 Unit Economics - 18 Rabatte - 19 Usage/Change - 20 Reise - 21 Angebots-UX - 22 Lifecycle - 23 Governance - 24 bis 33 Szenarien und Governance") verwendet dieselben Nummern, nur mit Kurzlabels. Es besteht daher keine Verwechslungsgefahr fuer Paragraphen-Zitate im Code; Verweise wie "Dok 14, 9.2" oder "D14-07" treffen in beiden Quellen dasselbe. Die nicht uebernommene Governance-Folie war im PDF unnummeriert (Titelfolge vor Abschnitt 1) und verschiebt deshalb keine Nummern.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] PDF Seite 2, Folie "Dokumentauftrag & Verbindlichkeit", Zeile Aenderungskontrolle**

> Aenderungskontrolle  Aenderungen an Service Offers, Preisformeln, SLA-Baendern, Paketgrenzen oder Commercial Baseline benoetigen Version, Impactanalyse, Tests und Freigabe.

Verbindliche Change-Control-Pflicht fuer genau die Objekte, die spaeter als Software gebaut werden (Offer, Price Book, SLA-Band, Package, Commercial Baseline). Im Markdown fehlt sie vollstaendig; Abschnitt 3.1 CP08 deckt nur Preisaenderungen ab, nicht Impactanalyse und Tests. Wer nur das Markdown liest, kennt die Pflicht zu Impactanalyse und Test bei Katalog- oder SLA-Aenderungen nicht.

*Betroffen:* Price Book / Service-Offer-Versionierung und jede spaetere Aenderung an Katalog-, SLA- oder Baseline-Datenmodellen

**[hoch] PDF Seite 2, Folie "Dokumentauftrag & Verbindlichkeit", Einleitungsabsatz**

> Dokument 14 ist die kanonische Quelle fuer Servicefamilien, kaufbare Offers, Service-Tiefen, Paketarchitektur, Leistungsversprechen, Price Book, Commercial Baseline, Preisbaender, Mengentreiber, Rabatte, Mehrmengen, Reise- und Drittanbieterlogik. Nachfolgende Dokumente duerfen technische und operative Details konkretisieren, aber diese kommerzielle Semantik nicht still veraendern.

Vorrangregel gegenueber den Dokumenten 15 bis 20C. Ohne sie ist im Repository nicht dokumentiert, dass spaetere technische Dokumente (z.B. Dok 18 Pricing Rules) die kommerzielle Semantik nicht ueberschreiben duerfen. Das Markdown nennt in 1. nur die Aufzaehlung der kanonischen Inhalte, nicht das Verbot der stillen Veraenderung.

*Betroffen:* Konfliktaufloesung zwischen Dok 14 und Dok 18/19 bei Pricing Rules, Entitlements und Billing Events

**[mittel] PDF Seite 2, Folie "Dokumentauftrag & Verbindlichkeit", Zeilen Owner / Gueltigkeit / Zentrale Nachfolger**

> Owner  Product Architecture / Service Portfolio & Commercial Model Owner   Gueltigkeit  Bis zur freigegebenen Nachfolgeversion   Zentrale Nachfolger  Dokument 15 bis 20C

Ownership- und Gueltigkeitsmetadaten fehlen im Markdown-Kopf. Fuer die Governance des Dokuments relevant (wer darf freigeben, bis wann gilt Version 1.0), aber ohne direkte Auswirkung auf gebaute Funktionalitaet.

*Betroffen:* Dokument-Governance, Freigabepfad fuer Aenderungen an Dok 14

**[niedrig] PDF Seite 2, Folie "Dokumentauftrag & Verbindlichkeit", Zeile Preisstatus**

> Preisstatus  Alle Preisbaender sind synthetische Designannahmen und keine realen Angebote.

Doppelt verankerte Kernaussage im Steuerungsfeld. Sie ist im Markdown nur an anderer Stelle vorhanden (Abschnitt 12 Einleitung und D14-11), fehlt aber im Kopfbereich, wo sie im PDF unuebersehbar steht. Geringes Risiko, weil inhaltlich an zwei anderen Stellen getragen.

*Betroffen:* Demo-Daten-Kennzeichnung

**[niedrig] PDF Seite 1, Titelfolie, Untertitel**

> Eine modulare, transparente und wirtschaftlich steuerbare Angebotsarchitektur fuer Plattform, Transition und wiederkehrende Managed Services.

Der Untertitel des Originals wurde im Markdown durch eine eigene Zweck-Formulierung ersetzt. Inhaltlich kompatibel, aber der Originalwortlaut ist nicht mehr auffindbar.

### Nur im Markdown, vom PDF nicht getragen

**[mittel] Markdown Zeile 10, Blockquote "Zentrale Festlegung"**

> > **Zentrale Festlegung:** Die Plattform verkauft weder undurchsichtige Beraterstunden noch eine starre Einheitslizenz. ... Preise duerfen konfigurierbar sein, aber nie willkuerlich, rueckwirkend oder fachlich unbegruendet.

Dieser hervorgehobene, normativ formulierte Kernsatz existiert im PDF nicht - weder auf der Titelfolie noch in der Verbindlichkeitsfolie noch in Abschnitt 2. Er ist eine zulaessige Verdichtung von CP01, CP02, CP08 und D14-13 und widerspricht dem PDF nicht, wird durch die Rahmung als "Zentrale Festlegung" aber wie eine eigenstaendige Produktentscheidung gelesen. Formulierungen wie "nie willkuerlich, rueckwirkend" koennen als Zitatquelle missverstanden werden, obwohl das PDF an dieser Stelle nichts sagt.

*Betroffen:* Alles, was sich zur Begruendung der Preislogik auf eine "Zentrale Festlegung" in Dok 14 beruft

**[niedrig] Markdown Zeile 8, Kopfzeile "Zweck"**

> **Zweck:** Verbindliches Produkt- und Kommerzialisierungskonzept dafuer, wie Plattformfunktionen und Managed Services verstaendlich katalogisiert, modular paketiert, mit belastbaren Leistungsversprechen versehen, transparent kalkuliert, angeboten, veraendert und wirtschaftlich gesteuert werden.

Freie Zweckformulierung, die im PDF so nicht vorkommt; das PDF hat stattdessen den Untertitel der Titelfolie und die Kanonizitaetsaussage der Verbindlichkeitsfolie. Inhaltlich deckungsgleich, aber die Bezeichnung "Verbindliches Produkt- und Kommerzialisierungskonzept" ist eine Zuschreibung des Ableiters.

**[niedrig] Markdown Zeilen 42, 199, 286, 316 - Platzhalter**

> [[FIGURE:FIG1]] ... [[FIGURE:FIG2]] ... [[FIGURE:FIG3]] ... [[FIGURE:FIG4]]

Vier Grafikplatzhalter ohne inhaltliche Beschreibung. Die zugehoerigen Diagramminhalte aus dem PDF sind im Textextrakt nicht enthalten und im Markdown nicht ausformuliert. Kein hinzugedichteter Inhalt, aber eine unbelegte Luecke: falls die Folien-Grafiken zusaetzliche Aussagen tragen, sind diese im Repository nicht verfuegbar.

---

## Dokument 15 — MATERIALE_ABWEICHUNGEN

Der Fachteil des Dokuments (Abschnitte 1 bis 37) ist zwischen PDF und Markdown wortgleich - ein normalisierter Wortdiff zeigt ausschliesslich Formatierungsartefakte (Tabellentrenner, PDF-Silbentrennungen wie "Standard-Work- Packages", wiederholte Tabellenkopfzeilen ueber Folienumbrueche). Es wurde inhaltlich NICHTS hinzugedichtet: kein einziger Satz im Markdown ist ohne PDF-Deckung. Fehlend ist jedoch die komplette Governance-Folie "Dokumentauftrag & Verbindlichkeit" (PDF-Seite 2) mit dem Steuerungsfeld-Block - darin stehen zwei verbindliche Aussagen, die im Markdown nirgends stehen: die Klausel, dass Nachfolgedokumente die operative Semantik "nicht still veraendern" duerfen, und die Aenderungskontroll-Pflicht fuer Capacity Ledger, Staffing, Coverage, Reise-, Cost-to-Serve- und Fairnesslogik. Die Abschnittsnummerierung ist identisch und ungefaehrlich; Paragraphenzitate im Code verweisen korrekt.

**Nummerierung:** Keine Verwechslungsgefahr. Das PDF nummeriert die Folientitel 1 bis 37 und die Inhalts-/Navigationszeile auf Seite 2 nutzt exakt dieselben Nummern ("1 Auftrag · 2 Summary · 3 Operations-Verfassung · 4 Objekte · 5 Rollen · ... · 25 bis 37 Integrationen, KI, Sicherheit, Demo und Governance"). Das Markdown folgt dieser Nummerierung 1:1, inklusive Unterabschnitten (3.1, 6.2, 9.3, 28.7 usw.). Auch die IDs O01-O15, D15-01 bis D15-15, ENTSCHEIDUNG 15-01 bis 15-15 und ANNAHME 15-A01 bis 15-A10 stimmen vollstaendig ueberein. Einzige Nummern-Luecke: der ungezaehlte Vorspann "Dokumentauftrag & Verbindlichkeit" existiert im Markdown nicht, hat aber ohnehin keine Abschnittsnummer.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] Vorspann-Folie "Dokumentauftrag & Verbindlichkeit" (PDF S. 2), Steuerungsfeld-Zeile "Änderungskontrolle"**

> Änderungskontrolle: Änderungen an Capacity Ledger, Staffing, Coverage, Reise-, Cost-to-Serve- oder Fairnesslogik benötigen Version, Impactanalyse, Tests und Freigabe.

Verbindliche Change-Control-Pflicht fuer genau die Kernlogiken, die dieses Dokument definiert. Sie fehlt im Markdown vollstaendig - im Projekt existiert damit keine aus Dokument 15 abgeleitete Regel, dass Aenderungen an Kapazitaets-, Staffing-, Coverage-, Reise-, Cost-to-Serve- oder Fairness-Logik zwingend Versionierung, Impactanalyse, Tests und Freigabe erfordern.

*Betroffen:* Alle kuenftigen Work Packages zu Capacity Ledger, Staffing/Assignment Engine, Coverage Plan, Reiseplanung, Cost-to-Serve und Fairness Review; betrifft auch die Definition of Done / ADR-Pflicht im Projekt.

**[hoch] Vorspann-Folie "Dokumentauftrag & Verbindlichkeit" (PDF S. 2), Einleitungsabsatz**

> Dokument 15 ist die kanonische Quelle für Beraterportfolio, Demand- und Work-Package-Planung, Skill- und Kapazitätsmodell, Staffing, Kalender, Vor-Ort, Reise, Coverage, Delivery-Qualität, Cost-to-Serve und Portfolio-Profitabilität. Nachfolgende Dokumente dürfen technische Integrationen und Implementierungsdetails konkretisieren, aber diese operative Semantik nicht still verändern.

Die Vorrangklausel gegenueber Dokument 16 bis 20C fehlt. Das Markdown enthaelt in §1 zwar die Kanonizitaetsaussage, aber NICHT das Verbot, dass Nachfolgedokumente die operative Semantik still veraendern duerfen. Damit fehlt die Konfliktregel, wenn spaetere Dokumente (17 Integrationen, 18 Architektur, 20A KI) abweichende Semantik einfuehren.

*Betroffen:* Konsistenzpruefung gegen Dokument 16 bis 20C; Aufloesung von Konzeptwidersprüchen (Stop Condition "materialer Konzeptwiderspruch").

**[mittel] Vorspann-Folie "Dokumentauftrag & Verbindlichkeit" (PDF S. 2), Steuerungsfeld-Zeilen "Owner" und "Gültigkeit"**

> Owner: Product Architecture / Consultant Operations & Resource Planning Owner — Gültigkeit: Bis zur freigegebenen Nachfolgeversion

Verantwortlichkeit und Gueltigkeitsdauer des Dokuments fehlen im Markdown-Header. Ohne Owner ist unklar, wer materiale Aenderungen freigeben darf; ohne Gueltigkeitsregel ist unklar, wann die Fassung ihre Verbindlichkeit verliert.

*Betroffen:* Freigabe-/Human-Gate-Prozess bei Aenderungen an Dokument 15.

**[niedrig] Vorspann-Folie "Dokumentauftrag & Verbindlichkeit" (PDF S. 2), Steuerungsfeld-Zeile "Datenstatus"**

> Datenstatus: Alle Personen, Unternehmen, Termine, Preise und Reisen der Demo sind synthetisch.

Die dokumentweite Synthetik-Zusage fehlt an dieser prominenten Stelle. Inhaltlich ist sie in §30.2 ("Alle Namen, Unternehmen, Preise, Reisen und Termine sind synthetisch.") und in ENTSCHEIDUNG 15-15 vorhanden, der Verlust ist daher nur redundanzmindernd, nicht substanziell.

*Betroffen:* Demo-Datenset (Rheinwerk, Nordhafen, Elbfin, HanseCloud, Suedlicht).

**[niedrig] Vorspann-Folie "Dokumentauftrag & Verbindlichkeit" (PDF S. 2), Zeile "Inhalt"**

> Inhalt: 1 Auftrag · 2 Summary · 3 Operations-Verfassung · 4 Objekte · 5 Rollen · 6 Portfolio · 7 Demand · 8 Work Packages · 9 Kapazität · 10 Skills · 11 Staffing · 12 Kalender · 13 Morning Mission · 14/15 Vor-Ort und Reise · 16 Gesundheit · 17 Coverage · 18 Qualität · 19/20 Wirtschaft · 21 Opportunities · 22 Szenarien · 23/24 Sichten und Notifications · 25 bis 37 Integrationen, KI, Sicherheit, Demo und Governance

Reine Inhaltsuebersicht ohne eigene Anforderung. Kein inhaltlicher Verlust, da alle 37 Abschnitte im Markdown vollstaendig vorhanden sind. Nur zur Vollstaendigkeit gemeldet.

---

## Dokument 16 — MATERIALE_ABWEICHUNGEN

Die Markdown-Fassung ist inhaltlich eine nahezu wortgleiche Ableitung des PDF: ein normalisierter Wort-fuer-Wort-Diff ueber das gesamte Dokument zeigt ausser Kopf-/Fusszeilen keinerlei Umformulierung, keine geaenderte Liste, keine veraenderte Pflichtfeldmenge und keine erfundenen Inhalte in den Abschnitten 1 bis 41. Die einzige materielle Luecke ist die komplette Governance-Seite "Dokumentauftrag & Verbindlichkeit" (PDF Seite 2) mit der Vorrangregel gegenueber den Nachfolgedokumenten und dem Steuerungsfeld (Owner, Gueltigkeit, Datenstatus, Aenderungskontrolle) - sie fehlt im Markdown vollstaendig. Zusaetzlich fehlen die vier Abbildungsunterschriften (nur Platzhalter [[FIGURE:FIGn]]) und der Untertitel des Deckblatts. Die Abschnittsnummerierung 1 bis 41 stimmt exakt ueberein; Folientitel und Navigationsleiste ("Inhalt") des PDF verwenden dieselben Nummern, es besteht keine Verwechslungsgefahr fuer Paragraphen-Zitate im Code.

**Nummerierung:** Keine Abweichung. Das Markdown folgt der Nummerierung der Folientitel (1. Auftrag und Abgrenzung ... 41. Aenderungsprotokoll). Die Navigationsleiste/Inhaltszeile im PDF ("1 Auftrag · 2 Summary · 3 Verfassung · 4 Objekte · 5 Lifecycle · 6 Qualification · 7 Organisation · 8 Identitaet · 9 Scope · 10 Datenaufnahme · 11 Strategie-DNA · 12 Zielprofile · 13 Risikotoleranz · 14 Requirements · 15 Budget & Kapazitaet · 16 Serviceanteil · 17 Baseline · 18 Datenqualitaet · 19 Zielrouten · 20 Serviceempfehlung · 21 Simulation · 22 Readiness · 23 Sichten · 24 Guided UX · 25 Zusammenarbeit · 26 Transition · 27 Regelbetrieb · 28 Changes · 29 Ausbau/Reduktion · 30 M&A · 31 Exit · 32 Sonderfaelle · 33 KPIs · 34 Demo · 35-41 Governance") verwendet dieselben Nummern. Auch die Unterabschnitte (x.y) und die ID-Raeume OL01-OL16, 16-AC01 bis 16-AC20, 16-D01 bis 16-D18, 16-A01 bis 16-A10, 16-Q01 bis 16-Q15 sind identisch und vollstaendig. Zitate im Code, die auf Paragraphen-Nummern verweisen, sind damit belastbar. Einzige Ausnahme: die im PDF nicht nummerierte Governance-Seite "Dokumentauftrag & Verbindlichkeit" hat im Markdown keine Entsprechung und kann daher auch nicht zitiert werden.

### Im PDF vorhanden, im Markdown fehlend

**[mittel] PDF Seite 2, Abschnitt "Dokumentauftrag & Verbindlichkeit" (vor Kapitel 1)**

> Dokument 16 ist die kanonische Quelle fuer Kundenanlage, Qualification, Scope, Strategie-DNA, Zielprofil, Datenaufnahme, Baseline, Zielroute, Servicekonfiguration, Operational Readiness, Aktivierung, Lifecycle-Aenderungen und Exit. Nachfolgende Dokumente duerfen technische Umsetzung und Sicherheitsmechanismen konkretisieren, aber diese fachliche Lifecycle-Semantik nicht still veraendern.

Die Vorrangregel gegenueber den Nachfolgedokumenten 17 bis 20C fehlt komplett. Damit fehlt die verbindliche Aussage, dass technische Dokumente die fachliche Lifecycle-Semantik nicht still ueberschreiben duerfen. Kapitel 1 des Markdown enthaelt nur die Abgrenzung ("Diese werden in Dokument 17 bis 20C festgelegt"), aber nicht das Verbot der stillen Veraenderung. Wer nur das Markdown liest, hat keine dokumentierte Konfliktregel, wenn Dokument 17/18/19 die Onboarding-Semantik abweichend beschreibt.

*Betroffen:* Konsistenzpruefung zwischen Dokument 16 und den Architektur-/Security-Dokumenten 17-19; jedes WP, das Lifecycle- oder Readiness-Semantik aus einem technischen Dokument ableitet.

**[mittel] PDF Seite 2, Steuerungsfeld-Tabelle im Abschnitt "Dokumentauftrag & Verbindlichkeit"**

> Aenderungskontrolle | Aenderungen an Lifecycle, Strategy DNA, Target Profile, Baseline, Route, Readiness oder Exit benoetigen Version, Impactanalyse, Tests und Freigabe.

Verbindliche Aenderungskontrolle fehlt im Markdown. Abschnitt 40.3 des Markdown deckt nur einen Teil ab ("benoetigen eine versionierte Impactanalyse gegen Dokument 07 bis 20C und eine Aktualisierung des Master-Index") - die Anforderungen "Tests" und "Freigabe" sowie der explizite Objektbezug auf Strategy DNA, Target Profile, Baseline, Route, Readiness und Exit fehlen. Eine Aenderung an diesen Objekten koennte im Projekt bisher ohne Testnachweis und ohne Freigabe erfolgen.

*Betroffen:* Definition of Done und Change-Prozess fuer alle Onboarding-/Lifecycle-Work-Packages

**[niedrig] PDF Seite 2, Steuerungsfeld-Tabelle (Zeilen Dokument-ID, Status, Owner, Gueltigkeit, Datenstatus)**

> Owner | Product Architecture / Customer Lifecycle & Onboarding Owner ... Gueltigkeit | Bis zur freigegebenen Nachfolgeversion ... Datenstatus | Alle Personen, Unternehmen, Preise, Termine und Risiken der Demo sind synthetisch.

Owner, Gueltigkeitsregel und die dokumentweite Datenstatus-Aussage fehlen im Markdown-Kopf. Der Markdown-Kopf fuehrt nur Arbeitsbezeichnung, Version, Status, Stand und Abhaengigkeiten. Die Synthetik-Aussage taucht im Markdown nur lokal in Abschnitt 34.1 ("Alle Personen, Preise, Risiken, Termine, Dokumente, Standorte und Unternehmensdaten der Demo sind synthetisch.") auf, nicht als dokumentweite Festlegung; die Owner-Zuordnung ist gar nicht vorhanden.

*Betroffen:* Verantwortungszuordnung fuer Konzeptaenderungen, Demo-Datenregeln

**[niedrig] PDF Seiten 4, 7, 10, 11 - Abbildungsunterschriften**

> Abbildung 1: Vom qualifizierten Bedarf zum aktivierten, lernenden Kundenbetrieb. ... Abbildung 2: Der Kunden-Lifecycle ist ein geschlossener, versionierter Steuerungskreislauf. ... Abbildung 3: Importierte Daten werden vor Uebernahme gemappt, geprueft, freigegeben und reconciled. ... Abbildung 4: Die Strategie-DNA verbindet Geschaeft, Risiko, Ambition, Kapazitaet und Betriebsmodell.

Im Markdown stehen nur die Platzhalter [[FIGURE:FIG1]] bis [[FIGURE:FIG4]] ohne Bildunterschrift. Es existiert kein separates Abbildungsregister im Repo. Die semantische Aussage der Abbildungen (u.a. dass der Lifecycle ein geschlossener, versionierter Kreislauf ist und dass Importe vor Uebernahme reconciled werden) ist damit nur noch indirekt aus dem Fliesstext ableitbar.

*Betroffen:* Reporting-/Diagrammartefakte zum Lifecycle und zur Import-Pipeline

**[niedrig] PDF Seite 1, Deckblatt-Untertitel**

> Ein gefuehrter Weg vom ersten Kundenbild zu Scope, Strategie-DNA, Baseline, Zielroute, betriebsbereiten Managed Services und einem kontrollierten, lernenden Lifecycle. Kunden-Onboarding: vom unvollstaendigen Startbild zum belastbaren, freigegebenen Betrieb

Der Positionierungssatz des Deckblatts fehlt. Inhaltlich durch Kapitel 1 und 2 abgedeckt, daher ohne Anforderungswirkung.

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Markdown Kopfbereich, Zeile 8**

> **Primäre Nachfolger:** Dokument 17 bis 20C

Dieses Kopffeld existiert im PDF nicht; das PDF-Deckblatt fuehrt nur "ABHAENGIGKEITEN Dokument 00 bis 15". Die Aussage ist inhaltlich vom PDF getragen (Kapitel 1: "Diese werden in Dokument 17 bis 20C festgelegt." sowie Kapitel 40.2), also keine Erfindung, sondern eine hinzugefuegte Zusammenfassung. Kein Anforderungsrisiko, aber es ist ein Feld, das im Original nicht als Metadatum existiert.

---

## Dokument 17 — MATERIALE_ABWEICHUNGEN

Der nummerierte Hauptteil des Dokuments (Abschnitte 1 bis 48, inklusive aller Tabellen, der 18 Grundprinzipien IA01–IA18, der 24 Akzeptanzkriterien 17-AC01–24, der 20 Entscheidungen 17-D01–20, Annahmen, offener Fragen und Quellen S1–S12) ist im Markdown wortwoertlich und vollstaendig abgebildet; ein normalisierter Wort-Diff ergibt dort null inhaltliche Unterschiede. Materiell fehlt jedoch der komplette Frontmatter-Abschnitt "Dokumentauftrag & Verbindlichkeit" von PDF-Seite 2 mit dem Steuerungsfeld-Raster (Owner, Gueltigkeit, Datenstatus, Aenderungskontrolle) - darunter die verbindliche Regel, dass Aenderungen an Data Contracts, Events, Reconciliation, Workflow-Semantik, Human Gates oder externen Schreibaktionen Version, Impactanalyse, Tests und Freigabe benoetigen, sowie das Verbot fuer Nachfolgedokumente, diese Semantik still zu veraendern. Zusaetzlich fehlen die vier Abbildungsunterschriften (im Markdown nur Platzhalter). Erfundene oder umformulierte Anforderungen im Markdown gibt es nicht; die einzige Ergaenzung ("Primaere Nachfolger: Dokument 18 bis 20C") ist durch Abschnitt 1 und 46.2 des PDF inhaltlich gedeckt. Die Abschnittsnummerierung stimmt exakt ueberein.</summary>
<parameter name="nummerierungAbweichend">false

**Nummerierung:** Keine Verwechslungsgefahr. PDF-Folientitel und die "Inhalt"-Navigationsleiste auf Seite 2 verwenden dieselbe Nummerierung 1 bis 48 (Nav-Zeile: "1 Auftrag · 2 Summary · 3 Verfassung · ... · 41-48 Governance, Entscheidungen, Quellen und Abhaengigkeiten"), und das Markdown folgt genau dieser Nummerierung inklusive aller Unterabschnitte (z. B. 3.1, 5.1-5.14, 23.1-23.3, 46.1-46.3). Paragraphenzitate im Code wie "17 §25" oder "17 §41" treffen in beiden Fassungen denselben Inhalt. Die einzige unnummerierte PDF-Einheit ist der Frontmatter-Block "Dokumentauftrag & Verbindlichkeit" vor Abschnitt 1, der im Markdown fehlt - er verschiebt aber keine Nummern.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] Frontmatter "Dokumentauftrag & Verbindlichkeit", Zeile Aenderungskontrolle (PDF S. 2)**

> Aenderungskontrolle: Änderungen an Data Contracts, Events, Reconciliation, Workflow-Semantik, Human Gates oder externen Schreibaktionen benötigen Version, Impactanalyse, Tests und Freigabe.

Verbindliche Change-Control-Regel fuer genau die Artefakte, die dieses Dokument definiert. Das Markdown enthaelt in 46.3 nur eine schwaechere Variante ("benoetigen eine versionierte Impactanalyse gegen Dokument 07 bis 20C") - die Pflicht zu Tests und expliziter Freigabe fehlt dort. Wer nur das Markdown liest, kann Data Contracts oder Human-Gate-Semantik ohne Testnachweis und ohne Freigabe aendern.

*Betroffen:* Betrifft die Governance jeder kuenftigen Aenderung an Connector-/Workflow-Vertraegen; kein bereits gebautes Artefakt direkt.

**[mittel] Frontmatter "Dokumentauftrag & Verbindlichkeit", Einleitungsabsatz (PDF S. 2)**

> Dokument 17 ist die kanonische Quelle für Connectoren, Connection Instances, Data Contracts, Mappings, Synchronisation, Eventverarbeitung, Reconciliation, Workflow-Definitionen, Automatisierungs-Blueprints, Human Gates und den operativen Connector-Betrieb. Nachfolgende Dokumente ... dürfen diese Semantik aber nicht still verändern.

Legt die Kanonizitaet von Dokument 17 und das Verbot stiller Semantikaenderung durch die Nachfolgedokumente 18 bis 20C fest. Ohne diesen Satz ist im Markdown nicht dokumentiert, dass Technik-, Security- und KI-Dokumente die Integrations- und Workflow-Semantik nicht ueberschreiben duerfen.

**[niedrig] Frontmatter, Steuerungsfeld-Zeile Datenstatus (PDF S. 2)**

> Datenstatus: Alle Connector-Payloads, Unternehmen, Personen, Incidents, Tickets und Preise der Demo sind synthetisch.

Explizite Zusicherung zum Demo-Datenstatus auf Dokumentebene. Inhaltlich teilweise redundant zu IA18, 17-D18 und 17-AC22, die im Markdown vorhanden sind - der Verlust ist daher begrenzt, aber die konkrete Aufzaehlung der betroffenen Datenarten (Payloads, Unternehmen, Personen, Incidents, Tickets, Preise) fehlt.

**[niedrig] Frontmatter, Steuerungsfeld-Zeilen Owner und Gueltigkeit (PDF S. 2)**

> Owner: Product Architecture / Integration & Automation Owner — Gültigkeit: Bis zur freigegebenen Nachfolgeversion

Ownership und Gueltigkeitsregel des Dokuments sind im Markdown-Header nicht vorhanden. Damit ist aus dem Markdown nicht ersichtlich, wer fachlich verantwortlich ist und bis wann die Fassung gilt.

**[niedrig] Abbildungsunterschriften 1 bis 4 (PDF S. 4, 7, 14, 17)**

> Abbildung 1: Externe Systeme werden über Connector Gateway, Reconciliation, Graph und Workflows in belastbare Entscheidungen übersetzt. / Abbildung 2: Der Connector-Lifecycle trennt Qualifizierung, Autorisierung, Staging, Validierung, Mapping, Reconciliation, Veröffentlichung und Betrieb.

Das Markdown enthaelt an diesen Stellen nur die Platzhalter [[FIGURE:FIG1]] bis [[FIGURE:FIG4]] ohne Bildunterschrift. Die Unterschriften beschreiben die Pipeline-Reihenfolge (Abb. 1/2) und den geschlossenen Health-Kreislauf "Beobachtung, Erkennung, Eindaemmung, Recovery, Verifikation" (Abb. 4). Es sind erlaeuternde, keine normativen Saetze - der Ablauf steht auch in den Abschnitten 4, 7 und 31.

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Markdown-Kopf, Zeile 8**

> **Primäre Nachfolger:** Dokument 18 bis 20C

Diese Kopfzeile steht so nicht auf dem PDF-Deckblatt (dort nur "ABHAENGIGKEITEN Dokument 00 bis 16"). Inhaltlich ist sie jedoch durch Abschnitt 1 ("Dokument 18 ... 19 ... 20A ... 20B ... 20C") und Abschnitt 46.2 des PDF vollstaendig gedeckt. Keine neue Anforderung, nur eine vorgezogene Zusammenfassung.

---

## Dokument 18 — MATERIALE_ABWEICHUNGEN

Der gesamte Fliesstext der Abschnitte 1 bis 51 ist zwischen PDF und Markdown wortgleich - ein normalisierter Wort-fuer-Wort-Diff zeigt im Korpus keine einzige inhaltliche Abweichung, alle Tabellen (Schichten, Bounded Contexts, Referenztechnologien, Isolationsstufen, Umgebungen, Performancebudgets, Aenderungsprotokoll) und alle Listen (28 AC, 24 Entscheidungen, 15 Annahmen, 22 offene Fragen, 20 Spaeteridee, 10 Quellen) sind vollstaendig und identisch. Materiell fehlt jedoch die komplette (unnummerierte) Deckblatt-Folie "Dokumentauftrag & Verbindlichkeit" mit dem Steuerungsfeld-Kasten: Owner, Gueltigkeit, Datenstatus (Demo-Daten synthetisch) und vor allem die Aenderungskontroll-Regel, die strenger formuliert ist als das in Abschnitt 49.3 uebernommene Pendant. Zusaetzlich fehlt der bindende Satz, dass Dokument 19 bis 20C die Architekturgrenzen nicht still umgehen duerfen. Die Abschnittsnummerierung stimmt exakt ueberein (Folientitel und Navigationsleiste im PDF verwenden dieselbe Zaehlung 1-51), es besteht keine Verwechslungsgefahr fuer Paragraphen-Zitate im Code. Randnotiz: Im PDF existieren Bildunterschriften nur zu Abbildung 1, 2 und 4; das Markdown bildet dieselbe Luecke mit FIG1/FIG2/FIG4 ab, das ist also keine Ableitungsluecke.

**Nummerierung:** Keine Abweichung. Die PDF-Folientitel und die Inhalts-/Navigationszeile am Seitenkopf verwenden dieselbe Zaehlung 1 bis 51; das Markdown folgt ihr exakt, inklusive aller Unterabschnitte (3.1/3.2, 4.1, 5.1, 6.1, 7.1-7.3, 8.1-8.3, 9.1-9.3, 10.1-10.2, 11.1-11.3, 12.1, 13.1-13.3, 14.1-14.2, 15.1-15.3, 17.1-17.2, 18.1-18.2, 19.1-19.3, 21.1-21.2, 24.1-24.3, 25.1, 26.1-26.3, 27.1-27.3, 28.1-28.2, 30.1-30.3, 31.1-31.3, 32.1-32.4, 33.1, 38.1-38.2, 39.1-39.4, 40.1-40.3, 41.1-41.7, 42.1-42.4, 49.1-49.3). Auch die IDs 18-AC01 bis 18-AC28, 18-D01 bis 18-D24, 18-A01 bis 18-A15, 18-Q01 bis 18-Q22 und S1 bis S10 stimmen eins zu eins ueberein. Paragraphen-Zitate im Code, die auf Dokument 18 verweisen, sind damit gegenueber dem PDF eindeutig. Einzige unnummerierte PDF-Einheit ist die Deckblatt-Folie \"Dokumentauftrag & Verbindlichkeit\" zwischen Titel und Abschnitt 1 - genau die im Markdown fehlt; sie kann daher auch nicht ueber eine Nummer zitiert werden.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] Deckblatt-Folie "Dokumentauftrag & Verbindlichkeit", Steuerungsfeld-Tabelle, Zeile "Aenderungskontrolle" (PDF S. 2)**

> Aenderungskontrolle: Aenderungen an System of Record, Tenant Isolation, Event Backbone, Workflow Runtime, Storage, Identity, Backup, RPO/RTO oder Modulgrenzen benoetigen ADR, Impactanalyse, Tests und Freigabe.

Das Markdown traegt diese Regel nur in der schwaecheren Fassung aus Abschnitt 49.3: "benoetigen einen ADR und eine Impactanalyse gegen Dokument 07 bis 20C". Die beiden zusaetzlichen Pflichtbestandteile "Tests" und "Freigabe" fehlen damit vollstaendig in der Projektwahrheit. Wer sich an das Markdown haelt, kann eine Aenderung an System of Record, Tenant Isolation oder Backup mit ADR plus Impactanalyse als hinreichend dokumentiert ansehen, obwohl das Original zusaetzlich Tests und eine Freigabe verlangt.

*Betroffen:* Gate-/Governance-Regeln fuer ADR-pflichtige Aenderungen (CLAUDE.md "Materiale Technologieentscheidungen benoetigen ADR", .claude/rules/architecture.md); jedes WP, das System of Record, Tenant Isolation, Event Backbone, Workflow Runtime, Storage, Identity, Backup oder RPO/RTO beruehrt.

**[mittel] Deckblatt-Folie "Dokumentauftrag & Verbindlichkeit", Einleitungsabsatz (PDF S. 2)**

> Dokument 19 bis 20C konkretisieren Sicherheit, KI, Agenten und Implementierung, duerfen diese Architekturgrenzen aber nicht still umgehen.

Verbindliche Vorrangregel von Dokument 18 gegenueber den Nachfolgedokumenten. Fehlt im Markdown ersatzlos - dort steht nur der (aus Abschnitt 1 uebernommene) Satz "Dokument 18 setzt dafuer verbindliche technische Leitplanken", der keine Nicht-Umgehungs-Pflicht ausspricht. Ohne diese Regel kann eine spaetere Festlegung in 19/20A/20B/20C eine Architekturgrenze aus Dokument 18 faktisch aushebeln, ohne dass ein Konflikt formal sichtbar wird.

*Betroffen:* Konfliktaufloesung zwischen Dokument 18 und 19/20A/20B/20C; Stop Condition "materialer Konzeptwiderspruch".

**[mittel] Deckblatt-Folie "Dokumentauftrag & Verbindlichkeit", Steuerungsfeld-Tabelle, Zeilen Owner / Gueltigkeit / Datenstatus (PDF S. 2)**

> Owner: Chief Architect / Platform Engineering Owner | Gueltigkeit: Bis zur freigegebenen Nachfolgeversion | Datenstatus: Alle Unternehmen, Nutzer, Reports, Integrationen, Lasten und Betriebsereignisse der Demo sind synthetisch.

Drei Steuerungsfelder fehlen im Markdown-Kopf, der nur Arbeitsbezeichnung, Version, Status, Stand und Abhaengigkeiten fuehrt. Besonders relevant ist der Datenstatus: Er ist die dokumenteigene, verbindliche Zusicherung, dass saemtliche Demo-Artefakte - explizit auch Lasten und Betriebsereignisse, nicht nur Unternehmen und Nutzer - synthetisch sind. Diese Ausdehnung auf Last- und Betriebsdaten steht nirgends sonst im Dokument.

*Betroffen:* Demo-Daten- und Seed-Strategie (.claude/rules/demo-data.md), Ownership-/Freigabezuordnung fuer Dokument 18.

**[niedrig] Bildunterschriften Abbildung 1 (S. 4), Abbildung 2 (S. 9) und Abbildung 4 (S. 17)**

> Abbildung 2: Mandanten koennen bei gemeinsamer Produktlogik ueber abgestufte Daten-, Schluessel-, Laufzeit- und Deploymentgrenzen isoliert werden.

Das Markdown ersetzt die Abbildungen durch reine Platzhalter ([[FIGURE:FIG1]], [[FIGURE:FIG2]], [[FIGURE:FIG4]]) ohne die Unterschriften. Die Aussagen selbst sind im Fliesstext (Abschnitte 4, 11.2, 31) gedeckt, es geht also kein Requirement verloren - aber die Platzhalter sind fuer einen Leser ohne PDF inhaltlich leer.

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Markdown-Kopf, Zeile 8**

> **Primäre Nachfolger:** Dokument 19 bis 20C

Dieses Steuerungsfeld existiert im PDF nicht; das PDF-Deckblatt fuehrt nur ABHAENGIGKEITEN "Dokument 00 bis 17". Der Inhalt selbst ist aus dem Dokumentauftrag ableitbar ("Dokument 19 bis 20C konkretisieren ..."), die Ableitung hat daraus aber ein neues Metadatenfeld gemacht - und zwar ausgerechnet aus dem Satz, dessen bindende zweite Haelfte ("duerfen diese Architekturgrenzen aber nicht still umgehen") weggefallen ist. Fuer sich genommen harmlos, aber es kaschiert die Luecke.

*Betroffen:* Keine bekannte Codeabhaengigkeit; reines Dokumentenmetadatum.

---

## Dokument 19 — KLEINE_ABWEICHUNGEN

Die Markdown-Fassung bildet Dokument 19 inhaltlich sehr treu ab: alle 50 nummerierten Abschnitte, alle Prinzipien SP01-SP20, alle Akzeptanzkriterien 19-AC01 bis 19-AC30, Entscheidungen 19-D01 bis 19-D24, Annahmen 19-A01 bis 19-A15, offene Fragen 19-Q01 bis 19-Q26 sowie die Quellen S1-S17 sind wortgleich uebernommen, ebenso alle Tabellen (Schutzgueter, Trust Boundaries, Datenklassen, Kernrollen, Mappings, Aenderungsprotokoll). Ein maschineller Wortabgleich zeigt: es gibt KEIN einziges Inhaltswort im Markdown, das nicht im PDF steht - nichts wurde hinzugedichtet, keine Anforderung umformuliert. Fehlend sind ausschliesslich die Deckblatt-/Governance-Folie "Dokumentauftrag & Verbindlichkeit" mit dem Steuerungsfeld (Owner, Gueltigkeit, Datenstatus, Aenderungskontrolle) sowie die vier Abbildungsunterschriften, die im Markdown durch leere Platzhalter [[FIGURE:FIGn]] ersetzt wurden. Die Nummerierung stimmt exakt ueberein, Zitate auf Paragraphen-Nummern im Code sind unbedenklich.

**Nummerierung:** Keine Verwechslungsgefahr. Das PDF nummeriert die Folientitel 1 bis 50; die Navigationsleiste auf der Inhaltsfolie ("1 Auftrag - 2 Summary - 3 Verfassung - 4 Schutzgueter - 5 Threat Model - 6 Klassifikation - 7-9 Identity ... - 41-50 Szenarien, Mappings, Akzeptanz, Entscheidungen, Quellen und Aenderungen") verwendet dieselbe Nummerierung, fasst nur Bereiche zusammen. Das Markdown folgt dieser Folientitel-Nummerierung eins zu eins, inklusive aller Unterabschnitte (3.1/3.2, 4.1-4.3, 5.1-5.3, 6.1/6.2, 7.1/7.2, 8.1-8.3, 10.1-10.5, 11.1-11.4, 12.1/12.2, 13.1/13.2, 15.1-15.3, 20.1-20.3, 22.1-22.3, 24.1, 25.1/25.2, 26.1-26.3, 27.1/27.2, 29.1/29.2, 31.1/31.2, 33.1-33.3, 34.1-34.3, 37.1/37.2, 41.1-41.8, 48.1-48.3). Auch die stabilen IDs (19-ACnn, 19-Dnn, 19-Ann, 19-Qnn, SPnn, S1-S17) sind identisch. Verweise aus dem Code auf Paragraphen- oder ID-Nummern zeigen damit auf dieselbe Stelle wie im PDF-Original.

### Im PDF vorhanden, im Markdown fehlend

**[mittel] Folie 2 - Dokumentauftrag & Verbindlichkeit, Steuerungsfeld-Tabelle (Zeile Aenderungskontrolle)**

> Aenderungskontrolle: Aenderungen an Identity, Authorization, Tenant Isolation, Support, Kryptografie, Retention, Audit, Logging, File-/Exportpfaden, Secure-SDLC-Gates oder Incident Response benoetigen Security-/Privacy-Impactanalyse, Tests und Freigabe.

Verbindliche Aenderungskontroll-Regel auf Dokumentebene ('benoetigen ... Tests und Freigabe'). Sie steht im Markdown nirgends im Kopfbereich. Inhaltlich wird sie allerdings von Abschnitt 48.3 getragen, der dieselbe Pflicht sogar breiter formuliert (zusaetzlich ADR/Policy Decision Record). Der Verlust ist deshalb Redundanzverlust, keine fehlende Anforderung - die Regel steht Governance-Lesern aber nicht mehr direkt am Dokumentanfang gegenueber.

*Betroffen:* Governance-/Change-Control-Prozess fuer alle Security-relevanten Work Packages; die aequivalente Regel ist ueber Abschnitt 48.3 weiterhin vorhanden.

**[mittel] Folie 2 - Dokumentauftrag & Verbindlichkeit, Steuerungsfeld-Tabelle (Zeilen Owner und Gueltigkeit)**

> Owner: Product Security Owner / Privacy Owner | Gueltigkeit: Bis zur freigegebenen Nachfolgeversion

Die Ownerschaft des Dokuments (Product Security Owner / Privacy Owner) und die Gueltigkeitsregel fehlen im Markdown-Kopf vollstaendig. Der Markdown-Kopf nennt nur Arbeitsbezeichnung, Version, Status, Stand, Abhaengigkeiten. Damit ist aus der Projektwahrheit nicht mehr ableitbar, wer dieses Dokument freigibt und wann es seine Verbindlichkeit verliert.

*Betroffen:* Freigabe- und Reviewzustaendigkeit fuer Aenderungen an Dokument 19; betrifft jedes WP, das eine Konzeptaenderung eskalieren muss.

**[mittel] Abbildung 1 (nach Abschnitt 2), Abbildung 2 (in 10.1), Abbildung 3 (in 18), Abbildung 4 (nach 24.1)**

> Abbildung 1: Die Security- und Privacy-Architektur erzwingt Identitaet, Policy, sichere Anwendung, Datenkontrollen und Assurance als zusammenhaengende Schutzschichten. / Abbildung 4: Fachereignis, Canonical Audit Record, Integritaetsverkettung, geschuetztes Archiv und unabhaengige Verifikation bilden eine beweisfaehige Auditkette.

Alle vier Abbildungen sind im Markdown durch inhaltsleere Platzhalter [[FIGURE:FIG1]] bis [[FIGURE:FIG4]] ersetzt. Die Bildunterschriften enthalten aussagekraeftige Formulierungen mit Wirkung, u.a. 'erzwingt ... als zusammenhaengende Schutzschichten' (Abb. 1) und die Kettenreihenfolge fuer die Auditintegritaet (Abb. 4). Wer nur das Markdown liest, weiss nicht einmal, was die Abbildungen zeigen sollen. Abbildung 2 ('Ein Zugriff wird aus Identity Assurance, Tenantkontext, Rollen, Attributen, Beziehungen, Zweck und zusaetzlichen Safeguards nachvollziehbar entschieden') und Abbildung 3 ('Zweck, Klassifikation, Zugriff, Aufbewahrung, Legal Hold, Export und verifizierte Loeschung begleiten Daten ueber ihren gesamten Lebenszyklus') sind ebenfalls betroffen.

*Betroffen:* Autorisierungs-Pipeline (Abb. 2), Datenschutz-Lifecycle (Abb. 3), Audit-Integritaetskette (Abb. 4). Die Kernaussagen stehen zwar auch im Fliesstext von 10.1, 18 und 24/26, die Platzhalter suggerieren jedoch, es fehle nur eine Grafik, nicht auch Text.

**[niedrig] Folie 2 - Dokumentauftrag & Verbindlichkeit, Steuerungsfeld-Tabelle (Zeile Datenstatus)**

> Datenstatus: Alle Unternehmen, Identitaeten, Incidents, Evidence- und Security-Ereignisse des Demonstrators sind synthetisch.

Verbindliche Aussage mit 'sind' zum Datenstatus des Demonstrators fehlt im Markdown-Kopf. Inhaltlich getragen wird sie weiterhin von SP19 ('Demo- und Testdaten bleiben synthetisch') und Abschnitt 40 ('Der Demonstrator verwendet ausschliesslich synthetische Firmen-, Nutzer-, Risiko-, Evidence-, Incident- und Service-Daten'), daher niedrige Schwere.

*Betroffen:* Demo-Datenregeln; durch SP19 und Abschnitt 40 abgedeckt.

**[niedrig] Folie 2 - Dokumentauftrag & Verbindlichkeit, Einleitungsabsatz**

> Dokument 20A bis 20C konkretisieren KI, Agenten und Umsetzung, duerfen diese Schutzgrenzen aber nicht still umgehen.

Der gesamte Absatz 'Dokumentauftrag & Verbindlichkeit', der Dokument 19 als kanonische Quelle fuer die aufgezaehlten Themenbereiche setzt und die Schutzgrenzen gegenueber 20A-20C sichert, fehlt als eigener Block. Die Substanz ist jedoch in Abschnitt 1 vorhanden ('Dokument 19 definiert jedoch verbindliche Security Gates, die diese Nachfolger nicht umgehen duerfen') - daher niedrige Schwere.

*Betroffen:* Abgrenzung zu Dokument 20A/20B/20C; durch Abschnitt 1 abgedeckt.

**[niedrig] Titelfolie 1 - Claim-Zeile und Untertitel**

> Verbindliche Schutzarchitektur fuer Identitaeten, Mandanten, Policies, Daten, Dateien, Support, Audit Records, Secure SDLC, Incident Response und Privacy by Design. Deny by default. Explainable access. Verifiable evidence. Controlled lifecycle.

Der Leitclaim des Dokuments fehlt im Markdown. Er formuliert die vier Kernversprechen kompakt. Alle vier sind als Prinzipien ausformuliert vorhanden (SP01 Deny by Default, SP14 Explainable Authorization, SP17 Evidence over Assertion, Datenschutz-Lifecycle Abschnitt 18) - es geht nur die verdichtete Leitformel verloren.

*Betroffen:* Keine Umsetzung betroffen; reiner Framing-Verlust.

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Kopfblock, Zeile 8**

> **Primaere Nachfolger:** Dokument 20A bis 20C

Dieses Metadatenfeld existiert im PDF-Kopf nicht; dort steht nur 'ABHAENGIGKEITEN Dokument 00 bis 18'. Die Aussage ist inhaltlich jedoch vom PDF gedeckt: die Folie 'Dokumentauftrag & Verbindlichkeit' nennt 'Dokument 20A bis 20C konkretisieren KI, Agenten und Umsetzung' und Abschnitt 48.2 fuehrt 20A/20B/20C als ausgehende Abhaengigkeiten. Es handelt sich um eine zulaessige Verdichtung, nicht um eine Erfindung - wird nur der Vollstaendigkeit halber gemeldet.

*Betroffen:* Keine Umsetzung betroffen; die Nachfolgerbeziehung ist ueber Abschnitt 48.2 identisch belegt.

---

## Dokument 20A — KLEINE_ABWEICHUNGEN

Der fachliche Hauptteil (Abschnitte 1 bis 40) ist praktisch wortidentisch abgeleitet - eine normalisierte Wortfrequenz-Differenz zwischen PDF-Text und Markdown ergibt ausserhalb von Kopf-/Fusszeilen, Deckblatt, Inhaltsleiste und Abbildungsunterschriften KEINE Abweichung. Alle 20 Verfassungsprinzipien (AI01-AI20), 16 Use Cases, 28 Akzeptanzkriterien, 16 Entscheidungen, 10 Annahmen, 12 offene Fragen und 12 Referenzquellen sind vollstaendig und unveraendert uebernommen. Fehlend ist ausschliesslich die Governance-Folie "Dokumentauftrag & Verbindlichkeit" (Owner, Gueltigkeit, Datenstatus, Verbindlichkeitssatz) sowie die vier Abbildungsunterschriften. Hinzugedichtet wurde nichts Materiales; die einzige Markdown-Ergaenzung ("Primaere Nachfolger: Dokument 20B und 20C") wird durch Abschnitt 38.2 des PDF getragen.

**Nummerierung:** Keine Verwechslungsgefahr. Folientitel und die Inhaltsleiste des PDF nutzen dieselbe Nummerierung: die Leiste auf Seite 2 nennt "1 Auftrag - 2 Summary - 3 Verfassung - 4 Faehigkeiten - 5 Autonomie - 6 Register - 7 Use Cases - 8 Risiko - 9-12 ... - 13-16 ... - 17-20 ... - 21-27 ... - 28-32 ... - 33-40 ...", was exakt den Folienueberschriften und den Markdown-Ueberschriften 1 bis 40 entspricht. Auch alle Unterabschnitte (3.1, 7.1/7.2, 10.1-10.4, 11.1, 13.1-13.3, 16.1/16.2, 18.1-18.3, 20.1-20.4, 22.1-22.3, 27.1-27.3, 28.1-28.6, 30.1-30.3, 38.1-38.3) stimmen ueberein. Die Governance-Folie "Dokumentauftrag & Verbindlichkeit" ist im PDF selbst unnummeriertes Frontmatter, erzeugt also keinen Nummernversatz. Zitate im Code auf Paragraphen-Nummern von 20A (z.B. "Abschnitt 8", "20A-AC04", "ENTSCHEIDUNG 20A-08") sind gegen beide Fassungen gueltig.

### Im PDF vorhanden, im Markdown fehlend

**[mittel] Frontmatter-Folie "Dokumentauftrag & Verbindlichkeit" (PDF Seite 2), Zeile "Owner"**

> Owner AI Product Owner / AI Risk Owner / Product Security

Die Ownerschaft des Dokuments (drei benannte Rollen) fehlt im Markdown ersatzlos. Das Markdown-Frontmatter fuehrt nur Arbeitsbezeichnung, Version, Status, Stand, Abhaengigkeiten und Nachfolger. Wer fuer KI-Produkt-, KI-Risiko- und Produktsicherheitsentscheidungen dieses Dokuments verantwortlich zeichnet, ist aus der Projektwahrheit nicht mehr ableitbar - relevant fuer die Zuordnung von Human Gates und Freigaben (Abschnitt 17, 20A-AC03, ENTSCHEIDUNG 20A-07).

*Betroffen:* Rollen-/Freigabezuordnung fuer AI-Use-Case-Register und Human Gates

**[mittel] Frontmatter-Folie "Dokumentauftrag & Verbindlichkeit" (PDF Seite 2), Einleitungsabsatz**

> Dokument 20A ist die verbindliche Produkt-, Architektur-, Sicherheits- und Qualitaetsquelle fuer KI-Funktionen. Es definiert, welche Faehigkeiten zulaessig sind, welche Entscheidungen menschlich bleiben, wie Modellprovider und Datenwege kontrolliert werden und wie der Demonstrator auch ohne externen API-Zugang vollstaendig funktioniert.

Die explizite Verbindlichkeitserklaerung des Dokuments fehlt. Das Markdown startet direkt mit Abschnitt 1, der 20A nur als "kanonische Quelle fuer die produktseitige Nutzung kuenstlicher Intelligenz" bezeichnet - schwaecher als "verbindliche Produkt-, Architektur-, Sicherheits- und Qualitaetsquelle". Der Geltungsanspruch gegenueber Architektur- und Sicherheitsentscheidungen ist dadurch abgeschwaecht.

*Betroffen:* Vorrangregel gegenueber Dokument 18/19 bei KI-bezogenen Architektur- und Sicherheitsfragen

**[niedrig] Frontmatter-Folie "Dokumentauftrag & Verbindlichkeit" (PDF Seite 2), Zeile "Datenstatus"**

> Datenstatus Demo-, Test- und Golden-Set-Daten sind synthetisch; produktive Provider- und Rechtsfreigaben bleiben offen.

Verbindliche Aussage zum Datenstatus des gesamten Dokuments fehlt. Inhaltlich teilweise durch Abschnitt 22.2 ("Testdaten sind synthetisch oder rechtmaessig freigegeben"), 30.2 und die offenen Fragen 20A-Q01/Q08 abgedeckt, aber die Gesamtaussage "produktive Provider- und Rechtsfreigaben bleiben offen" steht im Markdown nirgends als Statusfestlegung.

*Betroffen:* Golden-Set- und Demo-Datengenerierung, Provider-Freigabestatus

**[niedrig] Frontmatter-Folie "Dokumentauftrag & Verbindlichkeit" (PDF Seite 2), Zeile "Gueltigkeit"**

> Gueltigkeit Bis zur freigegebenen Nachfolgeversion

Gueltigkeitsregel des Dokuments fehlt. Ohne sie ist nicht dokumentiert, dass v1.0 bis zu einer freigegebenen Nachfolgeversion bindend bleibt.

**[niedrig] Abbildungsunterschriften nach Abschnitt 4, 5, 9 und 22.3**

> Abbildung 1: Produktfaehigkeiten greifen nicht direkt auf Modelle zu. AI Control Plane, Model Gateway, Retrieval, Tooling, Assurance und Fallbacks bilden die kontrollierte Zwischenschicht.

Alle vier Abbildungsunterschriften (Abb. 1 Zwischenschicht, Abb. 4 Autonomie-Leiter, Abb. 2 Anfrage-Pipeline "Zweck, Autorisierung, Datenminimierung, Retrievalschutz, Modellbudget, Outputvalidierung, Confidence, Human Gate und Audit", Abb. 3 AI Assurance Loop) sind im Markdown durch reine Platzhalter [[FIGURE:FIGn]] ersetzt. Die Platzhalter stehen an den richtigen Stellen und die Reihenfolge FIG1/FIG4/FIG2/FIG3 entspricht dem PDF, aber der beschreibende Text ist verloren. Das ist eine repo-weite Konvention (alle Konzeptdokumente 09-21 nutzen dieselben Platzhalter), also systematisch, nicht dokumentspezifisch.

*Betroffen:* Architekturdiagramme AI Control Plane / Request-Pipeline

**[niedrig] Deckblatt (PDF Seite 1)**

> KI-gestuetzt. Quellenbasiert. Menschlich verantwortlich. Ohne KI funktionsfaehig.

Leitsatz des Deckblatts fehlt. Inhaltlich vollstaendig durch AI02, AI06, AI07 und Abschnitt 2 abgedeckt; kein Anforderungsverlust, nur der praegnante Merksatz.

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Markdown Frontmatter, Zeile 8**

> **Primäre Nachfolger:** Dokument 20B und 20C

Diese Zeile steht im PDF-Frontmatter nicht (dort nur "ABHAENGIGKEITEN Dokument 00 bis 19"). Sie ist jedoch inhaltlich durch PDF-Abschnitt 38.2 "Ausgehende Abhaengigkeiten - Dokument 20B: ... Dokument 20C: ..." vollstaendig getragen. Keine neue Anforderung, nur eine vorgezogene Zusammenfassung.

---

## Dokument 20B — MATERIALE_ABWEICHUNGEN

Der Fachteil (Paragraphen 1 bis 47) ist inhaltlich sehr treu uebernommen: alle Abschnitte, Tabellen (Organisationsebenen, Role-Contract-Felder, Skills, Artefakte, Autoritaetsstufen, Quality Gates, Fehlermuster, Changelog), alle 26 Akzeptanzkriterien, 16 Entscheidungen, 10 Annahmen, 14 offene Fragen und die Ideenliste stimmen Satz fuer Satz ueberein. Materiale Luecke ist das komplette Governance-Vorblatt "Dokumentauftrag & Verbindlichkeit" (Seite 2 des PDF) mit Verbindlichkeitssatz, Owner, Gueltigkeit, Organisationsstatus und Aenderungskontrolle - es fehlt im Markdown ersatzlos. Zusaetzlich sind die vier Abbildungsunterschriften nur als Platzhalter [[FIGURE:FIGn]] uebernommen; ihre normativen Aussagen (besonders Abbildung 2 zum Capability Request) sind verloren. Erfundene oder umformulierte Anforderungen wurden nicht gefunden; nur eine unbelegte Zusatzzeile im Kopf.

**Nummerierung:** Keine Verwechslungsgefahr. Die Folientitel des PDF sind durchgaengig 1 bis 47 nummeriert, und die Inhaltsuebersicht auf Seite 2 ("1 Auftrag · 2 Summary · 3 Verfassung · 4-7 ... · 41-47 Akzeptanz, Entscheidungen, Annahmen, offene Fragen, Ideen, Abhaengigkeiten und Aenderungen") bestaetigt exakt dieselbe Zaehlung. Das Markdown folgt dieser Nummerierung 1:1, inklusive der Unterabschnitte (8.1-8.3, 9.1-9.4, 11.1-11.4, 12.1-12.3, 13.1-13.2, 15.1-15.2, 17.1-17.3, 24.1-24.3, 26.1-26.3, 31.1-31.5, 33.1-33.2, 37.1-37.3, 39.1-39.5). Zitate der Form "20B Paragraph nn" im Code bleiben damit gueltig. Einzige Verschiebung: das PDF hat vor Paragraph 1 einen unnummerierten Governance-Block ("Dokumentauftrag & Verbindlichkeit"), den das Markdown nicht abbildet - er wird durch keine Paragraphennummer adressierbar.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] Vorblatt Seite 2, Steuerungsfeld-Tabelle, Zeile "Änderungskontrolle"**

> Änderungen an Rollenrechten, Human Gates, Agentenpopulation, Review-Unabhängigkeit, Project Memory oder Security-Freigaben benötigen Organisations-, Product-, Security- und Delivery-Impactanalyse.

Verbindliche Change-Control-Pflicht mit vier Pflicht-Impactanalysen. Fehlt im Markdown ersatzlos - auch Paragraph 34 (Human Gates) deckt sie nicht ab. Rollenrechte, Human Gates oder Review-Unabhaengigkeit koennen dadurch im Projekt geaendert worden sein, ohne dass die geforderte Impactanalyse ueberhaupt bekannt war.

*Betroffen:* Jede Aenderung an Agentenrollen, Toolrechten oder Review-Pflichten (z.B. in .claude/rules/ und Rollen-/Skill-Dateien) haette diese Impactanalyse gebraucht

**[hoch] Vorblatt Seite 2, Steuerungsfeld-Tabelle, Zeile "Organisationsstatus"**

> Die Rollen sind ein Zielmodell. Konkrete Claude-Code-Subagents, Skills, Toolrechte und Repository-Mechanismen werden in Dokument 20C umgesetzt.

Zentrale Statusaussage: die 21 Rollen aus Paragraph 8 bis 28 sind ausdruecklich ein Zielmodell, keine Bauvorgabe. Ohne diesen Satz liest sich das Markdown so, als muessten alle Rollen als reale Subagents existieren - eine Fehlinterpretation, die zu unnoetigem Rollen-/Agentenbau fuehren kann.

*Betroffen:* Anzahl und Zuschnitt tatsaechlich angelegter Subagents/Skills; Umsetzungsentscheidungen, die eigentlich 20C gehoeren

**[mittel] Vorblatt Seite 2, Block "Dokumentauftrag & Verbindlichkeit" (Einleitungssatz)**

> Dokument 20B ist die verbindliche Organisations-, Rollen-, Governance- und Zusammenarbeitsquelle für die virtuelle KI-Firma. Es definiert, welche Agentenrollen benötigt werden, welche Artefakte sie liefern, wie sie sich gegenseitig prüfen, wann menschliche Autorität erforderlich ist und wie das Projekt über Sessions und Kontextgrenzen hinweg fortsetzbar bleibt.

Die ausdrueckliche Verbindlichkeitserklaerung des Dokuments fehlt im Markdown vollstaendig. Damit ist aus der Markdown-Fassung allein nicht erkennbar, dass 20B die autoritative Governance-Quelle fuer Rollen, Reviews und Human Gates ist und nicht nur eine Beschreibung. Paragraph 1 traegt das nur abgeschwaecht als "kanonische Quelle".

*Betroffen:* Rollen-/Subagent-Konfiguration und Review-Regeln in .claude/ und CLAUDE.md, die sich auf 20B berufen

**[mittel] Vorblatt Seite 2, Steuerungsfeld-Tabelle, Zeilen "Owner" und "Gültigkeit"**

> Owner Human Product Owner / CEO-Orchestrator / Quality & Governance Lead | Gültigkeit Bis zur freigegebenen Nachfolgeversion

Ownership und Gueltigkeitsdauer des Dokuments sind nicht uebertragen. Damit ist im Repository nicht dokumentiert, wer 20B verantwortet und dass die Fassung bis zu einer freigegebenen Nachfolgeversion gilt.

**[mittel] Paragraph 11.4 / Abbildung 2 (Bildunterschrift)**

> Abbildung 2: Neue Agentenrollen entstehen nur über einen Capability Request mit belegter Lücke, begrenzten Rechten, Laufzeit, Messung und Abschaltentscheidung.

Restriktiv formulierte Regel ("nur über einen Capability Request") mit fuenf Pflichtbestandteilen. Im Markdown steht an dieser Stelle nur der Platzhalter [[FIGURE:FIG2]]; der Text ist verloren. Paragraph 11.3 und Akzeptanzkriterium 8 decken den Inhalt weitgehend ab, aber ohne die Ausschliesslichkeitsformulierung.

*Betroffen:* Prozess zum Anlegen neuer Agentenrollen/Skills

**[niedrig] Paragraph 26.3 / Abbildung 3 (Bildunterschrift)**

> Abbildung 3: Agenten kommunizieren über strukturierte Repository-Artefakte; Chats verweisen auf die Single Source of Truth und ersetzen sie nicht.

Bildunterschrift mit normativer Aussage zur Single Source of Truth fehlt (nur [[FIGURE:FIG3]]). Inhaltlich durch Paragraph 26.3 und 32 gedeckt, daher geringer Verlust.

**[niedrig] Paragraph 4 / Abbildung 1 und Paragraph 30 / Abbildung 4 (Bildunterschriften)**

> Abbildung 1: Die virtuelle KI-Firma verbindet menschliche Produktverantwortung, zentrale Orchestrierung, vier fachliche Säulen und einen kontrollierten HR-/Capability-Agenten. ... Abbildung 4: Der Agenten-Delivery-Loop führt von Intake und Staffing über Bau, Review und Integration zu einem fortsetzbaren Checkpoint und kontrolliertem Lernen.

Beschreibende Bildunterschriften sind im Markdown durch Platzhalter ersetzt. Der Inhalt wird durch den Fliesstext der Paragraphen 4 und 30 getragen; reiner Erlaeuterungsverlust.

**[niedrig] Deckblatt und Inhaltsuebersicht Seite 1/2**

> Spezialisierte Agentenrollen, klare Entscheidungsrechte, unabhängige Reviews, artifact-first Zusammenarbeit, Projektgedächtnis und kontrollierte Organisationsentwicklung. Spezialisiert. Prüfbar. Fortsetzbar. Menschlich gesteuert.

Deckblatt-Untertitel und die Inhaltsuebersicht ("1 Auftrag · 2 Summary · 3 Verfassung · 4-7 ...") fehlen. Rein orientierend, keine Anforderung betroffen.

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Markdown Kopfbereich, Zeile 8**

> **Primärer Nachfolger:** Dokument 20C – Claude Code, GitHub, Checkpoints und Bauplan

Das PDF 20B kennt weder das Feld "Primärer Nachfolger" noch diesen Titel fuer 20C; es nennt 20C nur als "Repository-Betriebssystem" bzw. als Ziel der Uebergabe (Paragraph 46). Der Untertitel stammt aus einer anderen Quelle und ist im Markdown-Kopf als Eigenschaft von 20B gesetzt. Inhaltlich unschaedlich, aber eine nicht belegte Ergaenzung - und sie steht an der Stelle, an der im PDF die Steuerungsfeld-Tabelle stuende.

---

## Dokument 20C — MATERIALE_ABWEICHUNGEN

Der nummerierte Hauptteil (Abschnitte 1 bis 56) ist praktisch wortgleich uebernommen - alle Tabellen, Pflichtfelder, Regeln, Checkpoint-Typen, Gates, Bauphasen, die 32 Akzeptanzkriterien, 24 Entscheidungen, 14 Annahmen, 18 offenen Fragen und das Quellenregister stimmen inhaltlich vollstaendig ueberein. Die Abweichungen liegen ausschliesslich im Deckblatt-/Steuerungsteil vor Abschnitt 1: Die Tabelle "Steuerungsfeld / Festlegung" mit dem Absatz "Dokumentauftrag & Verbindlichkeit" fehlt im Markdown komplett, darunter die verbindliche Aenderungskontroll-Regel, der Umsetzungsstatus und die Gueltigkeitsregel. Zusaetzlich fehlen die vier Abbildungsunterschriften (nur Platzhalter [[FIGURE:FIGn]]) und die Kapitelvorschau. Umgekehrt enthaelt das Markdown eine Kopfzeile "Nachfolger", die so nicht im PDF steht. Die Abschnittsnummerierung ist identisch, hier besteht keine Verwechslungsgefahr.

**Nummerierung:** Die Nummerierung ist deckungsgleich: PDF-Folientitel und Markdown fuehren beide die Abschnitte 1 bis 56 in identischer Reihenfolge und mit identischen Ueberschriften (1 Auftrag ... 56 Aenderungsprotokoll). Auch die Unterabschnitte (7.1-7.4, 11.1, 15.1-15.4, 21.1-21.3, 25.1-25.3, 38.1-38.5, 45.1-45.4, 46.1-46.4) stimmen ueberein. Die Navigationszeile "Inhalt" im PDF-Deckblatt gruppiert dieselben Nummern (1, 2, 3, 4-10, 11-20, 21-35, 36-41, 42-47, 48-56) und widerspricht den Folientiteln nicht. Zitate im Code, die auf "20C Paragraph N" verweisen, treffen also in beiden Fassungen denselben Inhalt. Auch die IDs D20C-001..024, A20C-001..014 und O20C-001..018 sind vollstaendig und identisch nummeriert.

### Im PDF vorhanden, im Markdown fehlend

**[hoch] Deckblatt/Steuerungsfeld-Tabelle, Zeile "Aenderungskontrolle" (PDF S. 2)**

> Aenderungskontrolle  Aenderungen an Truth-Hierarchie, Checkpoint-Protokoll, Branchschutz, Human Gates, Quality Gates, Repository-Struktur oder Bauphasen benoetigen Product-, Architecture-, Security-, Quality- und Continuity-Impactanalyse.

Eine verbindliche Governance-Pflicht ist im Markdown vollstaendig verloren. Nach dem PDF darf niemand die Truth-Hierarchie, das Checkpoint-Protokoll, den Branchschutz, Human Gates, Quality Gates, die Repository-Struktur oder die Bauphasen aendern, ohne eine fuenffache Impactanalyse (Product, Architecture, Security, Quality, Continuity) durchzufuehren. Da diese Pflicht in der als Projektwahrheit genutzten Markdown-Fassung nicht existiert, konnten genau diese Bereiche bisher ohne die vorgeschriebene Analyse veraendert werden.

*Betroffen:* Betrifft alle bisherigen Aenderungen an CLAUDE.md, .claude/rules/, den Checkpoint-/Handover-Skripten und der Repository-Struktur (Phase 0, WP-001 ff.) - fuer diese existiert kein dokumentierter Impactanalyse-Nachweis.

**[mittel] Deckblatt, Absatz "Dokumentauftrag & Verbindlichkeit" (PDF S. 2)**

> Dokument 20C ist die verbindliche Entwicklungs-, Repository-, Checkpoint-, Handover-, GitHub- und Bauplanquelle. Es definiert, wie Claude Code und die Rollen aus Dokument 20B die vollstaendige Plattform ueber viele Context Windows, Sessions, Branches und Releases hinweg fortsetzbar, prueftbar und sicher umsetzen.

Die explizite Verbindlichkeitserklaerung des Dokuments fehlt. Das Markdown startet direkt mit Abschnitt 1 ("Auftrag und Geltungsbereich"), der den Zweck beschreibt, aber nicht die Aussage traegt, dass 20C DIE verbindliche Quelle fuer Repository, Checkpoints, Handover, GitHub und Bauplan ist. Ohne diesen Satz ist der Vorrang von 20C gegenueber abweichender Praxis oder anderen Dokumenten nicht aus dem Markdown ableitbar.

**[mittel] Deckblatt/Steuerungsfeld-Tabelle, Zeile "Umsetzungsstatus" (PDF S. 2)**

> Umsetzungsstatus  Das Dokument definiert das Zielbetriebssystem. Konkrete Framework-, Hosting- und Toolversionen werden in Phase 0 durch Capability Check und ADR bestaetigt.

Die Abgrenzung zwischen Zielbetriebssystem und noch offener Technikfestlegung fehlt im Markdown. Damit fehlt auch die verbindliche Aussage, dass Framework-, Hosting- und Toolversionen zwingend ueber Capability Check UND ADR in Phase 0 bestaetigt werden muessen. Das Markdown enthaelt diese Pflicht nur indirekt in A20C-010 (Capability Check) und O20C-001/O20C-004, nicht als Statusregel des Gesamtdokuments.

*Betroffen:* Phase 0 / Capability Check (scripts/capability_check.py) und alle ADR-Entscheidungen zum App-Stack.

**[niedrig] Deckblatt/Steuerungsfeld-Tabelle, Zeile "Gueltigkeit" (PDF S. 2)**

> Gueltigkeit  Bis zur freigegebenen Nachfolgeversion

Die Gueltigkeitsregel des Dokuments fehlt. Sie legt fest, dass 20C v1.0 so lange bindend bleibt, bis eine freigegebene Nachfolgeversion existiert - relevant fuer die Frage, ob abweichende spaetere Praxis das Dokument still ueberschreiben darf.

**[niedrig] Deckblatt, Block "Inhalt" (PDF S. 2)**

> Inhalt  1 Auftrag - 2 Summary - 3 Entwicklungsverfassung - 4-10 Repository-Truth, Struktur, Claude-Konfiguration und Context Packs - 11-20 Work Packages, Sessions, Checkpoints und Wiederaufnahme - 21-35 GitHub, Tests, Agenten, Skills, Hooks und Rechte - 36-41 Umgebungen, Recovery, Gates und Metriken - 42-47 Bauphasen und Startprompts - 48-56 Demo, Akzeptanz, Entscheidungen, Annahmen, offene Fragen, Quellen und Aenderungen.

Reine Navigationshilfe ohne eigene Anforderung. Kein inhaltlicher Verlust, aber die Gruppierung der Abschnittsbloecke ist im Markdown nicht mehr sichtbar.

**[niedrig] Abbildungsunterschriften zu Abbildung 1 (Abschnitt 4), Abbildung 2 (Abschnitt 15), Abbildung 3 (Abschnitt 13) und Abbildung 4 (Abschnitt 21)**

> Abbildung 1: Das Repository-first Truth Model trennt Produkt-, Entscheidungs-, Umsetzungs- und Statuswahrheit von nicht verbindlichem Chat- oder Auto-Memory-Kontext. / Abbildung 2: Checkpoints entstehen waehrend der Arbeit nach festen Triggern und nicht erst am Ende einer Session. / Abbildung 4: Der GitHub Delivery Flow isoliert Aenderungen, erzwingt unabhaengige Reviews und integriert nur nach erfolgreichen Quality Gates.

Das Markdown enthaelt an diesen Stellen nur die Platzhalter [[FIGURE:FIG1]], [[FIGURE:FIG2]], [[FIGURE:FIG3]], [[FIGURE:FIG4]] ohne Bildunterschrift. Die Unterschriften transportieren die Kernaussage der jeweiligen Abbildung (u.a. "erzwingt unabhaengige Reviews"); der Regelinhalt ist zwar jeweils im Fliesstext der Abschnitte 4, 13, 15 und 21 abgedeckt, die verdichtete Aussage geht aber verloren.

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Markdown-Kopfzeile, Zeile 10**

> **Nachfolger:** Aktualisierung von Dokument 00; anschliessend Repository-Bootstrap und Claude-Code-Uebergabe

Das Feld "Nachfolger" existiert in der PDF-Steuerungsfeld-Tabelle nicht. Inhaltlich ist es aus Abschnitt 54 abgeleitet, dort steht jedoch nur: "Nach Freigabe dieses Dokuments muss Dokument 00 aktualisiert werden. Anschliessend kann Phase 0 beginnen." Die Formulierung "Repository-Bootstrap und Claude-Code-Uebergabe" ist eine Interpretation von "Phase 0" - sachlich vertretbar (Abschnitt 43 heisst "Phase 0 - Repository Bootstrap"), aber vom PDF nicht woertlich getragen. Zusaetzlich ersetzt das Markdown-Deckblatt damit die im PDF stehenden Steuerungsfelder Gueltigkeit, Umsetzungsstatus und Aenderungskontrolle durch ein anderes, nicht vorhandenes Feld.

**[niedrig] Markdown-Kopfzeile, Zeile 8 (Owner)**

> **Owner:** Human Product Owner, CEO-/Orchestrator-Agent, CTO-/Architecture Lead, GitHub Steward, Project Memory Agent, Quality & Governance Lead

Das PDF nennt: "Human Product Owner / CEO-Orchestrator / CTO / GitHub Steward / Project Memory / Quality Lead". Das Markdown ergaenzt die Rollenbezeichnungen um "-Agent", "-/Architecture Lead" und erweitert "Quality Lead" zu "Quality & Governance Lead". Dieselbe Rollenmenge, aber teils andere Rollennamen als im Original - relevant nur, falls Rollennamen woertlich in Agenten-/Role-Contract-Definitionen uebernommen wurden.

*Betroffen:* .claude/agents/ Rollendefinitionen und Verweise auf Role Contracts aus Dokument 20B.

---

## Dokument 21 — KLEINE_ABWEICHUNGEN

Der Fachteil des Dokuments (Abschnitte 1 bis 53) ist praktisch wortgleich und vollstaendig uebertragen: alle Tabellen (Zielbild, Lernkreislauf, Signaluniversum, Source Registry, Evidenzmodell E0-E4, Competitor Record, Research Brief, Idea Card, Scoring-Gewichte inkl. Prozentwerte, Experimente, CCP-Felder, Impact Matrix, Horizonte, Kadenzen, Fehlerfaelle, Quellenregister, Aenderungsprotokoll), alle Listen, alle fuenf End-to-End-Szenarien, die 24 globalen Akzeptanzkriterien, 15 Entscheidungen, 10 Annahmen und 12 offenen Fragen stimmen inhaltlich ueberein. Die Abschnittsnummerierung 1-53 ist identisch, es besteht keine Verwechslungsgefahr. Abweichungen betreffen ausschliesslich den Kopfbereich: Der PDF-Block "Dokumentauftrag & Verbindlichkeit" mit Owner, Gueltigkeit, Researchstatus und einer Aenderungskontroll-Regel fehlt im Markdown und wurde durch zwei selbst formulierte Kopfzeilen ersetzt; ausserdem fehlen die vier Abbildungsunterschriften. Die Substanz der fehlenden Aenderungskontroll-Regel wird an anderer Stelle des Dokuments (Abschnitte 21, 23, 36) getragen, daher keine materiale Abweichung.

**Nummerierung:** Die Nummerierung stimmt vollstaendig ueberein. Die Folientitel im PDF sind 1. bis 53. durchnummeriert; die Inhaltsuebersicht auf PDF-Seite 2 ("1-5 Auftrag, Summary, Verfassung ... 47-53 Entscheidungen, Annahmen, offene Fragen ...") bestaetigt exakt dieselben Bereiche. Das Markdown folgt dieser Nummerierung eins zu eins, inklusive Unterabschnitten (7.1, 7.2, 9.1-9.3, 10.1-10.4, 11.1-11.3, 12.1-12.3, 13.1-13.3, 15.1-15.3, 16.1-16.2, 19.1-19.4, 22.1-22.3, 24.1-24.3, 27.1-27.4, 30.1-30.5, 33.1-33.3, 37.1-37.4). Zitate im Code auf "Dokument 21, Abschnitt X" sind damit eindeutig und ohne Verwechslungsgefahr.

### Im PDF vorhanden, im Markdown fehlend

**[mittel] Seite 2, Block "Dokumentauftrag & Verbindlichkeit", Steuerungsfeld "Aenderungskontrolle"**

> Aenderungskontrolle: Aenderungen an Evidenzgraden, Human Gates, Konzeptaktivierung, Researchdaten, Wettbewerbsquellen, Roadmap-Horizonten oder Presentation-Claims benoetigen Product-, Domain-, Security-/Privacy- und Dokumenten-Impactanalyse.

Eine explizit benannte Governance-Regel mit verbindlicher Wirkung fehlt im Markdown vollstaendig. Sie nennt sieben konkrete Ausloeser und vier Pflicht-Analysedimensionen. Substantiell wird sie zwar von Abschnitt 21 (CCP-Feld "Freigaben: Product, Domain, Architecture, Security, Human Gate"), Abschnitt 23 (Cross-Document Impact Matrix) und Abschnitt 36 (Concept Quality Gates) getragen, aber die kompakte Ausloeserliste - insbesondere "Evidenzgraden" und "Roadmap-Horizonten" als aenderungskontrollpflichtige Gegenstaende - steht so nur im PDF.

*Betroffen:* Betrifft jedes kuenftige Work Package, das Evidenzgrade (E0-E4), Human Gates oder Roadmap-Horizonte veraendert; ohne die Regel koennte eine solche Aenderung ohne die vier Impactanalysen durchgefuehrt werden.

**[niedrig] Seite 2, Einleitungsabsatz "Dokumentauftrag & Verbindlichkeit"**

> Dokument 21 ist die verbindliche Governance- und Betriebsquelle fuer Research, Competitive Intelligence, Ideenentwicklung, Experimentierung, Konzeptpflege, Roadmap-Lernen und Presentation-Updates. Es definiert, wie externe und interne Signale zu nachvollziehbaren Produktaenderungen werden, ohne dass Agenten ungeprueft Entscheidungen erfinden oder die Konzeptbibliothek unkontrolliert waechst.

Die Selbstverortung als "verbindliche Governance- und Betriebsquelle" und die zwei explizit genannten Schutzziele (Agenten erfinden keine Entscheidungen; Konzeptbibliothek waechst nicht unkontrolliert) fehlen. Das Markdown ersetzt sie durch eine eigene, schwaechere Formulierung. Der Geltungsanspruch des Dokuments ist dadurch weniger klar markiert.

*Betroffen:* Grundlage fuer die Auslegung von Abschnitt 19.4 (Grenzen des Concept Author) und Abschnitt 20 (Wann ein neues Konzeptdokument entsteht).

**[niedrig] Seite 2, Steuerungsfelder "Owner" und "Gueltigkeit"**

> Owner: Human Product Owner / Research & Innovation Orchestrator / Product & Concept Governance | Gueltigkeit: Bis zur freigegebenen Nachfolgeversion

Die formale Ownerschaft und die Gueltigkeitsregel des Dokuments fehlen im Markdown-Kopf. Fuer die Frage, wer eine Aenderung an Dokument 21 freigeben darf, fehlt damit die dokumenteigene Antwort.

*Betroffen:* Relevant fuer Freigabeprozesse und den Master Index (Dokument 00).

**[niedrig] Seite 1, Kopfblock**

> ABHAENGIGKEITEN Dokument 00 bis 20C

Die pauschale Abhaengigkeitsangabe fehlt im Markdown-Kopf. Abschnitt 51 listet die relevanten Dokumente jedoch einzeln und detaillierter auf, daher praktisch kein Informationsverlust.

**[niedrig] Abbildungsunterschriften zu Abbildung 1 bis 4 (Seiten 3, 4, 10, 12)**

> Abbildung 4: Ein breiter Signalstrom wird durch Triage, Research, Validierung und Portfolioentscheidungen zu wenigen belastbaren Commitments verdichtet.

Alle vier Abbildungsunterschriften sind im Markdown durch reine Platzhalter ([[FIGURE:FIG1]] bis [[FIGURE:FIG4]]) ersetzt. Die erlaeuternden Bildlegenden - etwa der Trichtergedanke bei Abbildung 4 oder der Artefakt-Entscheidungsbaum bei Abbildung 3 - sind ohne die zugehoerige Bilddatei nicht mehr lesbar. Fachlich wird der Inhalt jeweils vom umgebenden Fliesstext getragen.

**[niedrig] Seite 2, Abschnitt "Inhalt" (Navigationsuebersicht)**

> 1-5 Auftrag, Summary, Verfassung, Zielbild und Lernkreislauf · 6-14 Signaluniversum, Quellen, Evidenz und Researchrollen · 15-18 Ideation, Scoring und Experimente · 19-23 Concept Author, neue Dokumente, CCP und Konsistenz ...

Die Gliederungsuebersicht fehlt. Sie ist reine Navigation und traegt keine Anforderung; sie bestaetigt aber, dass die Nummerierung 1-53 im Markdown korrekt uebernommen wurde.

### Nur im Markdown, vom PDF nicht getragen

**[niedrig] Markdown-Kopfblock, Zeile 7**

> **Dokumentklasse:** Produktgovernance, Research Operating Model, Innovationssystem und Konzeptpflege

Das Feld "Dokumentklasse" existiert im PDF nicht; das PDF fuehrt stattdessen die Steuerungsfelder Dokument-ID, Status, Owner, Gueltigkeit, Researchstatus und Aenderungskontrolle. Die vier genannten Klassen sind eine Interpretation des Ableiters. Inhaltlich unkritisch, da sie den PDF-Inhalten nicht widersprechen, aber es ist eine hinzugefuegte Kategorie ohne Quelle.

**[niedrig] Markdown-Kopfblock, Zeile 8**

> **Verbindlichkeit:** Dieses Dokument definiert den dauerhaften Prozess, mit dem externe Signale erkannt, bewertet, in Produktideen uebersetzt, als Konzeptaenderungen dokumentiert, priorisiert, umgesetzt und nach ihrer Wirkung ueberprueft werden.

Diese Formulierung steht so nicht im PDF. Sie ersetzt den PDF-Satz "Dokument 21 ist die verbindliche Governance- und Betriebsquelle fuer Research, Competitive Intelligence, Ideenentwicklung, Experimentierung, Konzeptpflege, Roadmap-Lernen und Presentation-Updates" durch eine Prozessbeschreibung. Sie ist inhaltlich vertraeglich, aber schwaecher: Der Anspruch "verbindliche Governance- und Betriebsquelle" und die Schutzklausel gegen ungeprueft erfundene Agentenentscheidungen entfallen.

*Betroffen:* Kein bekanntes gebautes Artefakt betroffen; relevant fuer die Auslegung des Dokumentgeltungsbereichs.
