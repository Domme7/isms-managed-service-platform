# Latest Handover

- **Modus:** Owner-Auftrag „setz alles um, usability first, modernes Cockpit, nichts nur Show" + „mehr parallel".
  Autonomer Weiterbau; owner-gated Materie (echte Auth/DB) zurückgestellt (DR-0015). Entscheidungen: [DR-0014], [DR-0015].
- **MEILENSTEIN — Modernes Cockpit fertig ([DR-0014]):** `/cockpit` ist die Startseite nach Login, moderne 2026-
  Dashboard-Sprache (farbige KPI-Kacheln, SVG-Deckungsringe, Ampel-Legende, Warnungen-Panel „Offene Datenlücken",
  Lebenszyklus-Ampelleiste), **hell UND dunkel** (axe 0 auch im Dunkelmodus), A/B/C als dezente Stil-Personalisierung.
  „Nichts nur Show": jedes Element aus echter Ableitung (`lib/cockpit/{ampel,warnungen,lebenszyklus}.ts`), jeder
  Drill-down zu realen Objekten. Zwei Gate-Runden bestanden + separater Dark-axe-Fix. Commit `87a5ace`.
- **Abgenommen:** WP-028, WP-032, WP-006 Slice 2+3, **WP-025 Cockpit (DR-0014)**. WP-024, FINDING-0008.
- **Läuft gerade (2 parallele Lanes + Orchestrator):**
  - **Lane A (apps/web Worktree):** Einstiegs-Erlebniswelt — Produkt-Landing vor Login + getrennte Berater-/Kunden-
    Anmeldewelten (simuliert, DR-0015 Nr.7) + Usability-Quick-Wins (U-16 Topbar-CSS, U-02, U-03).
  - **Lane B (Doku):** WP-021-Spezifikation (Demo-Welt: fünf reiche Dok-16-Firmen + synthetische Bewertungen).
- **Testlage (`87a5ace`):** web 837 grün, typecheck/lint/format grün, **axe 0 über 19 Motive** (inkl. cockpit-dunkel), CI grün.
- **PDF-Grundwahrheit vorab extrahiert** (Enabler): Dok 16 Firmen · Dok 10 Decision Cards · Dok 14 Preise →
  `…/scratchpad/pdf-prep/` (flüchtig; sonst `PYTHONUTF8=1 python scripts/pdf_text.py <nr> --suche "…"`).
- **Branch:** `main` · **Remote:** privat, gepusht.
- **Exact Next Step (Feinsequenz DR-0015):** (1) Lane A landet → „nichts-nur-Show"/Usability-Gate → qa:visual → merge.
  (2) WP-021-Spec fertig → **WP-021 Slice 1 Flaggschiff (Nordstern tief, synthetische Bewertungen)** bauen →
  lässt die Cockpit-Ampeln grün/amber/rot leuchten. (3) synthetische Preisbänder (O-KUNDE-01-Umstellung, Security) ·
  WP-033 (Demo-Wörter vom Einstieg) · WP-033/U-15. (4) **E-02 → echte Decision Cards** (Change Proposal → Contract/Seed).
  (5) die vier Verbesserungen (CCP-005/006/007 + AIMS). (6) Modern-Rollout über die übrigen Seiten.
- **Owner-Antworten offen fürs Programm:** 2–3 Lanes parallel · WP-021 Flaggschiff-zuerst · Enabler (Registry-Wächter,
  WP-Pipeline-Workflow, PDF-Prep ✓) · neue Idee Produkt-Landing (in Lane A) · Hosting später · Decision Cards zuerst.
- **Harte Owner-Gates (nicht autonom):** echte Auth (WP-030) · DB→UI (FINDING-0004/RLS) · reale Preise (nie) ·
  Contract-Änderungen je Human Gate (E-02/CCP freigegeben, PDF-gegenlesen).
