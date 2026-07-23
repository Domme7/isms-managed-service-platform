# WP-019 – Konzeptfassungen aus den PDFs: Gates, Verläufe, Nachweise

**Work Package:** WP-019 Konzeptfassungen aus den PDFs nachziehen (FINDING-0007)
**Datum:** 2026-07-23
**Builder:** `platform-devops-reliability` (Manifest-Skript) · `concept-author` je Dokument —
**Builder ≠ Reviewer**
**Gates:** `code-reviewer` (Skript) · `concept-consistency-reviewer` je Dokument gegen den
**PDF-Text**, zweite Runde bei Nacharbeit
**Commits:** `38a1d86` (update_manifest.py) · `b1b8cfa` (Dok. 03–07 + Archive + Manifest)

## Ablauf und Urteile

| Artefakt | Runde 1 | Runde 2 |
|---|---|---|
| `scripts/update_manifest.py` | **FREIGABE** (6 Findings, alle LOW/INFO) | — |
| Dok. 03 | **FREIGABE** | — |
| Dok. 04 | **NACHARBEIT NÖTIG** | **FREIGABE** |
| Dok. 05 | **FREIGABE** | — |
| Dok. 06 | **FREIGABE** | — |
| Dok. 07 | **FREIGABE** | — |

Unterbrechung: Vier Agenten fielen ans Session-Limit; die Pipeline wurde nach dem Reset per
`resumeFromRunId` fortgesetzt — alle fertigen Schritte kamen aus dem Cache, nur die vier
ausstehenden liefen frisch. Kein Schritt ging verloren, kein Ergebnis wurde erfunden.

## Der wichtigste Fang des Gates

**Der Dok.-04-Korrektor hatte zwei Abbildungen „transkribiert", die er nie gesehen hat.** Die
Inhalte stammten erkennbar aus der **alten, als PDF-fremd befundenen** Markdown-Fassung — inklusive
des falschen Phasenrhythmus „Bewerten/Umsetzen", den der Rohbefund ausdrücklich als „steht so
nirgends im PDF" markiert hatte. Deklariert war das als „sicher lesbar". Das ist exakt die
Erfindungsklasse, gegen die WP-019 gebaut wurde — und das Konsistenz-Gate hat sie gefangen:
Grep über die PDF-Extraktion → null Treffer für jede angebliche Beschriftung.

Korrektur (Runde 2 verifiziert): Transkriptionen ersatzlos raus; je Stelle eine ehrliche Lücke
(„Textebene trägt keinen Abbildungstext; visuelle Prüfung am Original offen"); der Verdacht zur
Alt-Fassung klar als **unverifizierter Verdacht** gekennzeichnet, nicht als PDF-Feststellung.

## Gegenläufiger Befund: Abbildungen tragen normative Inhalte

Der Dok.-07-Prüfer konnte alle vier Grafiken **visuell** lesen und fand dabei: **„Kritikalität"
steht doch im PDF** — in der Abbildung der Objekt-360-Folie. FINDING-0007/DR-0006 hatten als
Beispiel das Gegenteil behauptet (Textlayer-basiert); im Nachtrag korrigiert. Konsequenz:
**O-WP014-01 ist kein Ableitungsartefakt, sondern eine bestätigte Konzeptlücke** (präzisiert im
Register). Lehre für alle künftigen PDF-Arbeiten: Text-Extraktion ist nicht das ganze PDF.

## Ergebnisse

- **Fünf Vollableitungen** nach PDF-Folientiteln mit Kopfnotiz (Re-Ableitungsdatum, Quell-PDF,
  Nummerierungs-Konkordanz, PDF-interne Konflikte benannt); alle Tabellen vollständig, verbindliche
  Kästen wörtlich, stabile Kennungen unverändert; Vorgänger archiviert.
- **`scripts/update_manifest.py`**: deterministisch, idempotent, Schutzabbrüche vor jedem
  Schreiben; Negativbeweis rückstandsfrei protokolliert (Ein-Zeichen-Änderung → Validator rot →
  Regeneration → grün → byteexakte Wiederherstellung).
- **Nachtrag** `docs/concept/abgleich/NACHTRAG_WP-019_2026-07-23.md`: Verbleib aller Befunde,
  Korrektur am eigenen Beispiel, **elf konkrete WP-020-Übergabepunkte** (u. a.: neun
  Pflicht-Seitenbausteine aus Dok. 06 §6.1, CROSS-TENANT-SCHUTZ, `weight` im Contract nicht
  PDF-gedeckt, `roles.ts`-Texte gekürzt, Journey-Zustandsmaschine fehlt).
- **Register:** O-WP019-01…08 neu; O-WP014-01 präzisiert statt gestrichen;
  `PROJECT_UNDERSTANDING.md` als historisch markiert (trug eine erfundene Taxonomie weiter).

## Verifikation

| Prüfung | Ergebnis |
|---|---|
| `python scripts/update_manifest.py` | regeneriert, idempotent |
| `python scripts/validate_handoff.py` | 5/5 OK |
| `pnpm test --force` | 7/7 Tasks, **448 Tests grün** (Konzeptdateien sind nicht testgebunden — erwartungsgemäß unverändert) |

## Offene Reste (ehrlich)

- **O-WP019-04:** Mehrere Abbildungen (Dok. 03/04, Dok. 06 teilweise) konnten in der Umgebung
  nicht visuell geprüft werden — die Fassungen tragen dort benannte Lücken. **Der einzige saubere
  Abschluss ist eine Owner-Sichtprüfung am Original.**
- Die **14 material abweichenden** Dokumente sind noch nicht nachgezogen (Folge-WP).
- Der **Treue-Check** (O-WP019-01) fehlt — erst mit ihm kann das Markdown die im Konzept
  vorgesehene Autoritätsrolle zurückbekommen (O-KONZ-01).

## Gesamturteil

**Freigegeben.** Die fünf Dokumente mit der größten Bauwirkung sind erstmals nachweislich
quellentreu; das Gate hat eine Erfindung gefangen, bevor sie Projektwahrheit wurde; und der
Prozess hat seinen eigenen Fehler (Textlayer ≠ PDF) gefunden und korrigiert.
