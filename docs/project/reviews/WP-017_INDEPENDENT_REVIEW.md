# WP-017 – Unabhängige Reviews, Gegenprüfungen und Browser-QA

**Work Package:** WP-017 Entscheidungen im Zwilling (Seed-Erweiterung + Ort „Entscheidungen", read-only)
**Datum:** 2026-07-23
**Builder:** `data-graph-analytics` (Slice 1 Seed) + `frontend-engineer` (Slice 2 Ort, Fix-Pass) — **Builder ≠ Reviewer**
**Reviewer:** `code-reviewer` + `product-user-lead` (je zwei Runden)
**Commits:** `6f27878`* (Bau Slice 1, siehe Git-Note) · `ebe3da9`/`b36086b` (Fixes) — *Slice 1 rutschte
in einen Docs-Commit; per Git-Note offengelegt.

## Ablauf

| Runde | Reviewer | Urteil | Findings |
|---|---|---|---|
| 1 | Code | **Nacharbeit nötig** | 3 major, 3 minor, 3 nit |
| 1 | Product-User-Lead | **Nacharbeit nötig** | 5 major, 5 minor, 2 nit |
| 2 | Code | Freigabe mit Minor-Fixes | 8 neue Punkte (2 major → sofort behoben) |
| 2 | Product-User-Lead | Freigabe mit Minor-Fixes | dito |

15 Findings im gebündelten Fix-Pass, die letzten (Doku-Zahlen, `/isms`-Leak, Wächtertest)
vom Orchestrator direkt — jeweils mit eigener Testabdeckung.

## Was dieses WP bewiesen hat

**Die Historien-Ableitung aus WP-014/WP-016 ist echt.** Das `supersedes`-Ablösepaar (D2 löst D1 ab)
ist die **erste Versionshistorie im Seed**. Die Wächtertests, die dafür gebaut wurden, wurden
planmäßig rot und wurden auf die neue, korrekte Aussage umgestellt — **ohne einen einzigen Wächter
zu entschärfen**. `/heute` sagt jetzt aus den Daten abgeleitet: *„Eine Versionshistorie ist im
Datenbestand belegt: 1 „supersedes"-Beziehung ist erfasst"* — vorher stand dort monatelang das
ehrliche Gegenteil. Der Satz hat sich von selbst umgedreht; genau das war der Beweis.

**Dok. 10 §9.2 (im PDF gegengelesen, Owner-Auflage E-02):** Ein Decision Record ist *unveränderbar,
Korrekturen erfolgen als neue Version*. Die Ablösekette bildet exakt dieses Korrekturmodell ab —
der Bau war richtig, stand aber zunächst auf der verkürzten Markdown-Begründung.

## Der wichtigste Fund — und er betrifft nicht WP-017

**Dieselbe Mandantengrenzverletzung existierte auch in `/isms`, seit WP-013 unbemerkt.**

Der WP-017-Leerzustand sagte „Die Entscheidungsschicht ist derzeit für einen Mandanten
ausmodelliert" — eine Existenzaussage über einen fremden Mandanten (Dok. 07, Abschnitt
„Mandantenfähigkeit, Rechte und Datenschutz" / P09, WP-Stop-Condition). Die Gegenprüfung fand
daraufhin denselben Satz sinngemäß in `/isms`: *„Die Risiko- und Control-Sicht ist derzeit für
einen anderen Demo-Mandanten ausmodelliert."*

**Der bestehende Test hatte den Leak nicht nur durchgelassen, sondern festgeschrieben** — er prüfte
wörtlich auf genau diese Formulierung. Ein Test, der Verhalten festhält statt die Regel, zementiert
den Defekt.

Konsequenz: beide Stellen mandantenlokal umformuliert, der leckende Helfer als test-only markiert,
und ein **Wächtertest** (`components/__tests__/leerzustand-mandantengrenze.test.tsx`) prüft den
**gerenderten Text** aller leeren Orte gegen sieben Formulierungsmuster plus alle fremden
Mandantennamen/-IDs. Zwei unabhängige Vorkommen derselben Fehlerklasse → Mechanik statt
Aufmerksamkeit.

## Weitere behobene Findings (Auswahl)

- **Kontextzeile widersprach dem Inhalt:** „keine Erfassung im Datenbestand" neben „9 Objekte
  modelliert" — Datenstand jetzt auf die Entscheidungen eingegrenzt.
- **`/heute` kannte den neuen Ort nicht:** „Orte mit Bestand dieses Mandanten" listete
  `/entscheidungen` nicht, obwohl die Seite verspricht, Orte ohne Bestand zu benennen statt
  auszublenden. Vierter Eintrag ergänzt, eine Zählquelle (`buildDecisionRegister`).
- **Die Seed-Doku beschönigte die Kernaussage des WP:** „sieben Pflichtfelder ohne Träger, sechs
  teilweise" = 13 von 14, arithmetisch unmöglich, mit „Alternativen" ein Feld, das Dok. 10 nicht
  kennt. Korrekt: **neun ohne Träger, fünf teilweise** — an allen Stellen inkl.
  `ACTIVE_WORK_PACKAGE.md`, WP-Datei und Context Pack korrigiert, per Test festgenagelt.
- **Sechs identische Erklärabsätze je Karte** → einmalig auf Abschnittsebene; die Seite wurde
  dadurch erstmals lesbar. Die eine Rahmung, die am Wert kleben muss („genehmigt" ist kein
  Freigabeergebnis), blieb bewusst pro Karte.
- **Blanke §-Zitate aus dem Produkttext entfernt** — die Dok.-07-Nummerierung ist zwischen PDF und
  Markdown um eins verschoben; gerendert werden jetzt Abschnittstitel und stabile IDs.
- `satisfies`-Kopplung der Typkonstanten an den Contract, `calendarDay` entdupliziert
  (seed-freies `lib/twin/routes.ts`), A11y der Ablösekette (`aria-labelledby` je Liste),
  `decided_in`-Kantenstatus beziehungsbezogen formuliert.

## Neue offene Fragen

**O-WP017-01…12** im Register — darunter drei mit Konzeptwirkung: `Task` hat keinen einzigen
Beziehungstyp (blockiert WP-008), Dok. 06 führt eine **zweite, abweichende**
Decision-Card-Feldliste (O-WP017-11), und „Freigabe" ist Pflichtinhalt des Decision Record ohne
jeden Träger im Objektvertrag (O-WP017-12 — gehört ins E-02-Change-Proposal). Dazu **O-KONZ-01**:
die PDFs erklären selbst das Markdown zur Wahrheit; Auflösung im DR-0006-Nachtrag.

## Verifikation

| Prüfung | Ergebnis |
|---|---|
| `pnpm test --force` (ohne Cache) | **428 Tests grün** — api 2 · contracts 55 · demo-seed **45** · web **307** · db 19 |
| `pnpm --filter @isms/web run typecheck` | grün |
| `pnpm --filter @isms/web run build` | grün, **60** statische Seiten (43 Objektseiten) |
| `python scripts/validate_handoff.py` | grün — inkl. der neuen echten Statuskonsistenz-Prüfung |
| Counts | am Seed nachgerechnet: 43 Objekte / 62 Beziehungen; Nordwerk 34/51; Entscheidungsschicht 3/8; dritte Erfassungswelle 16.03.2026 |

## Browser-QA (Dev-Server, DOM-basiert)

| Weg | Ergebnis |
|---|---|
| `/entscheidungen`, Nordwerk + R03 | 3 Karten, Einschränkung der Leitfrage **direkt unter** der Leitfrage, 15 Objektlinks — **kein einziger** mandantenfremd |
| Ablösekette | beidseitig sichtbar („Löst ab" / „Wurde abgelöst durch"), Vorgänger nicht versteckt |
| Rahmung | „Lebenszyklus-Stand (kein Prüf- oder Freigabeergebnis)" an jeder Karte |
| Consulting Operator | Leerzustand **mandantenlokal**; Kontextzeile „Datenstand der Entscheidungen = keine Entscheidung erfasst"; kein Nordwerk im DOM |
| `/isms` mit Finovia | behobener Leak bestätigt: keine Aussage über fremde Mandanten |
| `/heute` | vierter Ort „Entscheidungen" gelistet; Zwilling zeigt 34/51; Historiensatz umgedreht mit korrektem Numerus |
| Responsive 375 px | kein Überlauf, kein überbreites Element |
| Konsole | keine Fehler |

**Vorfall während der QA:** `pnpm build` hatte erneut das `.next` des laufenden Dev-Servers
überschrieben (Chunk-404). Zweites Auftreten dieser Klasse → als Lektion im Briefing, Kandidat
für WP-018 (getrenntes Build-Verzeichnis).

**Nicht erbracht:** Screenshots (Browser-Pane rendert keine Frames) — Abnahme DOM-/geometriebasiert.
Ab WP-018 werden Screenshots automatisch erzeugt (DR-0007 E-03).

## Gesamturteil

**Freigegeben.** Der Ort „Entscheidungen" ist echt, der Seed trägt seine erste belegte
Versionshistorie, und die Seite behauptet nirgends eine Decision Card. Zwölf Konzeptlücken benannt
statt gefüllt. Als Nebenertrag wurde eine seit WP-013 bestehende Mandantengrenzverletzung in
`/isms` gefunden, behoben und mit einem Wächtertest gegen Wiederholung abgesichert.
