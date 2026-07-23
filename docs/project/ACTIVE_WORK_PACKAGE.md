# Active Work Package

- **ID:** WP-019
- **Titel:** Konzeptfassungen aus den PDFs nachziehen (FINDING-0007)
- **Datei:** `work-packages/WP-019_KONZEPTFASSUNGEN_AUS_PDFS.md`
- **Context Pack:** `context-packs/WP-019/CONTEXT_PACK.md`
- **Führende Quellen:** die PDF-Originale von Dok. 03–07 (`docs/concept/pdf/`) · Abgleichbericht
  `docs/concept/abgleich/PDF_MARKDOWN_ABGLEICH_2026-07-23.md` · DR-0006 (+ Nachtrag O-KONZ-01)
- **Status:** Active — Slice 0 (`scripts/update_manifest.py`), dann Dok. 06/07, dann 03/04/05
- **Builder:** `concept-author` je Dokument (Schreib-Scope für diesen Auftrag explizit erweitert,
  im WP begründet) · `platform-devops-reliability` (Manifest-Skript)
- **Gates:** `concept-consistency-reviewer` je Dokument (neue Fassung gegen den PDF-Text), zwei
  Runden; Code-Review für das Skript
- **Human Gates:** keine (DR-0006: Reparatur der Übertragung, keine Produktentscheidung).
  ABER: widerlegt eine Korrektur eine **gebaute** Produktaussage → Befundliste für WP-020,
  nicht hier fixen (DR-0005-Weg).
- **Ziel:** Die fünf schwerwiegend abweichenden Arbeitsfassungen (Dok. 03, 04, 05, 06, 07) tragen
  den PDF-Inhalt vollständig; 73 hoch-Befunde einzeln nachgewiesen, alle 145 mit Verbleib;
  Manifest regenerierbar; O-WP014-01 am PDF neu bewertet.

> Abgeschlossen: WP-001..004, 007, 011..018.
> Danach: WP-020 verlorene Anforderungen → WP-021 Demo-Welt → WP-022 Research Assistenz-Vision.
> Offene Human Gates: CCP-001..003, Docker, FINDING-0004, O-WP014-09, FINDING-0008 (Product Gate),
> E-02 nur Change Proposal.
