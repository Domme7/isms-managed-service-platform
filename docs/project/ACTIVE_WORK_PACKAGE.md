# Active Work Package

- **ID:** — (kein aktives Work Package)
- **Zuletzt abgeschlossen:** **WP-018 Werkzeuge & sichtbare Abnahme**
  - Datei: `work-packages/WP-018_WERKZEUGE_SICHTBARE_ABNAHME.md`
  - Review-Notiz: `docs/project/reviews/WP-018_INDEPENDENT_REVIEW.md`
  - Ergebnis: Linter (FINDING-0005 geschlossen, ADR-0003) · `pnpm qa:visual <WP>` mit committeten
    Screenshots + axe-Report (ADR-0004, E-03 eingelöst) · drei Wächtertests · 448 Tests grün
  - Erster axe-Lauf → **FINDING-0008** (dl-Semantik, Folge-Arbeit mit Product Gate)
  - Neue Owner-Fragen: O-WP018-04 (QA-Lauf in CI = Kosten), O-WP018-06 (weitere Abnahme-Perspektiven)

## Nächstes Work Package: WP-019 Konzeptfassungen aus den PDFs (FINDING-0007)

Die Markdown-Arbeitsfassungen werden aus den PDF-Originalen **korrigiert** — beginnend mit den
fünf schwerwiegend abweichenden Dok. 03, 04, 05, 06, 07 (Rohbefund:
`docs/concept/abgleich/PDF_MARKDOWN_ABGLEICH_2026-07-23.md`). Keine Produktentscheidung, sondern
Reparatur der Übertragung (DR-0006) — **kein Human Gate nötig**, aber `concept-consistency-reviewer`
als Gate. Danach werden die offenen Fragen neu bewertet, die Artefakte der Ableitung sind
(Kandidat: O-WP014-01), und `MANIFEST.json` wird nachgezogen.

Ein WP + Context Pack existiert noch nicht — vom `program-manager` erstellen lassen.

Danach: **WP-020** verlorene Anforderungen (Cross-Tenant-Schutz zuerst) → **WP-021** Demo-Welt
konzeptkonform (E-01) → **WP-022** Research Assistenz-Vision (IDEA-003).

> Abgeschlossen: WP-001..004, 007, 011..018.
> Offene Human Gates (nicht blockierend): CCP-001..003, Docker-Engine-Start, FINDING-0004,
> O-WP014-09 vor DB→UI; E-02 nur als Change Proposal; FINDING-0008 mit Product Gate.
