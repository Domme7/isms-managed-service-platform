# Latest Handover

- **Aktuell:** `HND-20260724-sprint.md`
- **Modus:** Owner-Auftrag „setz alles um, **usability first**" + „modernes 2026-Cockpit, nichts nur Show".
  Autonomer Weiterbau; owner-gated Materie (Auth/DB, Preise-Guardrail, Contract) wird vorbereitet/vorgelegt.
- **Frische Owner-Entscheidungen (2026-07-24): [DR-0014] modernes Cockpit + [DR-0015] acht Kursentscheidungen.**
  - Cockpit: moderne 2026-Dashboard-Sprache (Ampeln, Warnungen, Deckungsringe, farbig) = Umsetzung von DR-0008;
    „nichts nur Show" = jedes Element datengetragen UND funktional (Drill-down). Cockpit wird Landing; A/B/C bleibt Personalisierung.
  - Kurs: Produkt-Tiefe zuerst (nicht Auth/DB); **E-02 bauen** (Change Proposal → Contract/Seed); **alle vier
    Research-Verbesserungen** (Trust-Layer/CCP-005, Regulatory Change/CCP-006, Register of Information/CCP-007, AIMS/BL-05);
    **Demo-Welt = Dok.-16-Fünferliste** (löst O-WP006-01, WP-021, mit synthetischen Bewertungsdaten); getrennte
    Berater-/Kunden-Anmeldewelten JETZT (simuliert); **synthetische Beispielpreise** (Guardrail O-KUNDE-01 umgestellt).
- **Läuft gerade:** **Modern-Cockpit-Rebuild** (DR-0014, funktional + datengetragen) im isolierten Worktree.
  Die erste A/B/C-Version ist bereits in `main` (`7d569e2`) und wird durch das moderne Cockpit ersetzt.
- **Abgenommen:** WP-028, WP-032, **WP-006 Slice 2+3** (Gate 1+2 + Fix-Pass, keine Regression). WP-024, FINDING-0008.
- **Geliefert (nicht-bindend):** `research/` (3 Briefs + Ideen-Backlog BL-01..14 + CCP-005/006/007),
  `docs/project/usability/USABILITY_AUDIT_2026-07-24.md` (U-01..22), `docs/project/design/WP-025_COCKPIT_VARIANTEN_KONZEPT.md`.
- **Testlage:** vor dem Modern-Rebuild `main`=`7d569e2`: web 796 grün, typecheck/lint grün, axe 0 (18 Motive), CI grün.
- **Branch:** `main` · **Remote:** privat, gepusht.
- **Exact Next Step:** (1) Modern-Cockpit-Worktree landet → verifizieren, **„nichts-nur-Show"-Gate** (jedes Element
  datengetragen + funktionaler Drill-down), mergen. (2) `qa:visual` → moderne Cockpit-Screenshots dem Owner zeigen.
  (3) DR-0015-Programm, usability-first: getrennte Login-Welten (simuliert) · synthetische Preise (O-KUNDE-01-Umstellung,
  Security) · WP-033/U-15 Demo-Wörter vom Einstieg · Usability-Quick-Wins (U-16 Topbar-CSS, U-03, U-02, U-17, U-13) ·
  **E-02** (CP → Contract/Seed) → **Decision Center** · **WP-021** Dok.-16-Demo-Welt + synthetische Bewertungen ·
  CCP-005/006/007 Verbesserungen · moderne Bildsprache über die anderen Seiten.
- **WP-006-Rest:** 3 Runde-2-Nits (O-WP006-xx→10, length>80-Guards, GELDBAND-Robustheit) in den Modern-Cockpit-Merge folden.
- **Harte Owner-Gates (weiterhin nicht autonom):** echte Auth (WP-030) · DB→UI (FINDING-0004/RLS) · reale Preise (nie) ·
  Contract-Änderungen brauchen je Human Gate (E-02/CCP sind freigegeben, PDF-gegenlesen).
