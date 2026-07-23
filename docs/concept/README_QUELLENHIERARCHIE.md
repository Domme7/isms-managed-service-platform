# Welche Konzeptquelle gilt?

**Kurz: die PDFs — plus die Owner-Entscheidungen danach.** Das vollständige Schichtenmodell
(1. PDF-Basis → 2. Steuerungsschicht `docs/decisions/` → 3. Ideen `research/ideas/`) steht in
`docs/README.md`. Die PDFs sind eingefroren (Juli 2026); DRs ergänzen und präzisieren sie und
gehen bei Konflikt vor (gleicher Autor: der Owner).

| Ordner | Rolle |
|---|---|
| `pdf/` | **Produktwahrheit.** Die 24 vom Owner geschriebenen Originaldokumente. Bei jeder Abweichung gilt diese Fassung. |
| `active/` | **Arbeitsfassung.** Aus den PDFs abgeleitetes Markdown. **Dok. 03–07 sind seit WP-019 quellentreu neu abgeleitet** (Kopfnotiz je Datei); der Rest ist nachweislich **nicht verlustfrei** (FINDING-0007). |
| `abgleich/` | Der vollstaendige Abgleich beider Fassungen vom 2026-07-23. |
| `archive/` | Vorgaengerversionen. Nicht verwenden. |
| `MANIFEST.json` | Hashes der Markdown-Dateien. Erkennt unbemerkte Aenderungen — sagt **nichts** ueber Treue zum PDF. |

## Warum das wichtig ist

Am 2026-07-23 wurden alle 24 Markdown-Fassungen gegen ihre PDFs geprueft:

| Urteil | Dokumente |
|---|---|
| **SCHWERWIEGEND** | **5** — Dok. 03, 04, 05, 06, 07 |
| MATERIALE ABWEICHUNGEN | 14 |
| KLEINE ABWEICHUNGEN | 4 |
| TREU | 1 |

Die fuenf schwerwiegenden sind ausgerechnet Rollen, Nutzerreisen, Produktlandkarte, UX und der
digitale Zwilling — also genau die Dokumente, aus denen alles Gebaute abgeleitet ist.

**Stand nach WP-019:** Genau diese fuenf (Dok. 03–07) wurden quellentreu neu abgeleitet und
gegengeprueft; die Vorgaenger liegen in `archive/`. Die 14 material abweichenden folgen mit
WP-023, der automatische Treue-Check mit WP-024. Bis dahin gilt fuer Dok. 08–24 weiterhin:
vor jeder Produktaussage das PDF gegenlesen.

Verlorene Beispiele: die komplette Tabelle der neun verbindlichen Seitenbausteine (Dok. 06 §6.1),
der Cross-Tenant-Schutz („Entwuerfe, Uploads und Freigaben duerfen nicht still in einen anderen
Mandanten uebernommen werden"), die Pflicht „Kritische Aktionen speichern die aktive Rolle mit",
und die Datenmodellregel „inverse Darstellung ist UI-Komfort, kein zweiter Datensatz".

Hinzugedichtete Beispiele: „Graph und Liste sind gleichberechtigt" (das PDF macht die Liste zum
garantierten Basiszugang), „ggf. Vertrauensgrad" statt Pflichtfeld, und der Wegfall von „Read-only"
beim Audit Workspace.

Details: `abgleich/PDF_MARKDOWN_ABGLEICH_2026-07-23.md`, FINDING-0007, DR-0006.

## PDF lesen

```bash
python scripts/pdf_text.py                        # alle Dokumente auflisten
python scripts/pdf_text.py 07                     # Dokument 07 als Text
python scripts/pdf_text.py 06 --suche "Trust Layer"
python scripts/pdf_text.py 20B --abschnitte       # nur Ueberschriften
```

**Zitierregel:** immer den **Abschnittstitel** nennen, nicht nur die Nummer. In mehreren PDFs
weicht die Nummerierung der Folientitel von der Navigationsleiste ab, und das Markdown folgt
teils der einen, teils der anderen.
