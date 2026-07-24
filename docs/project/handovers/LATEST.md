# Latest Handover

- **Aktuell:** `HND-20260724-sprint.md`
- **Modus:** Produktkorrektur-Sprint (DR-0010) + Owner-Auftrag „alles umsetzen, **usability first**",
  **autonomer Weiterbau ohne Rückfragen**; owner-gated Materie wird vorbereitet und vorgelegt, nicht eigenmächtig gebaut.
- **Stand:** Alle acht Shell-Orte live · Antwort-Modus (WP-028) + Reports/Wissen/Administration (WP-032)
  **abgenommen** · **WP-006 Slice 2+3** (Servicekatalog `/services/katalog` + Struktur-Assistent
  `/kunden/struktur`) **inhaltlich abgenommen** (Gate 1+2 + Fix-Pass, keine Regression; offen nur der
  gebündelte `qa:visual`-Lauf). WP-024 Treue-Check + FINDING-0008 fertig.
- **Neu geliefert (nicht-bindend, Owner-gated):**
  - **Research/Innovation:** `research/briefs/` (Wettbewerb/Regulatorik/Markt-Web), `research/ideas/IDEEN_BACKLOG_2026-07-24.md`
    (14 Ideen BL-01..14), `research/change-proposals/CCP-005/006/007_*_DRAFT.md`.
  - **Usability-Audit:** `docs/project/usability/USABILITY_AUDIT_2026-07-24.md` (22 Fixes U-01..22, Top-10 + Quick-Wins).
  - **Cockpit-Design:** `docs/project/design/WP-025_COCKPIT_VARIANTEN_KONZEPT.md`.
- **Läuft gerade:** WP-025 **Cockpit-Varianten-Bau** im **isolierten Worktree** (agentbasiert, apps/web).
- **Testlage:** **886 Tests grün** (web 756 · contracts 55 · demo-seed 54 · db 19 · api 2), lint + typecheck +
  format:check grün, beide GitHub-CI-Workflows grün.
- **Branch:** `main` · **Remote:** privat, alles bis `c64f5e8` gepusht.
- **Exact Next Step:** (1) Cockpit-Worktree landet → verifizieren/mergen, dabei die 3 WP-006-Runde-2-Nits
  folden (O-WP006-xx→10, length>80-Guards, GELDBAND-Robustheit). (2) Gebündelter `qa:visual` (Cockpit + WP-006),
  Cockpit-Screenshots dem Owner vorlegen (DR-0010 Nr. 3 STOPP-Punkt). (3) **Usability-Quick-Wins** (non-invasiv):
  U-16 Topbar-CSS-Renderfehler, U-03 „Begriffe→Wissen", U-02 Login-Mandant-Erklärung, U-17 Objekt-ID ausblenden,
  U-13 „Ansicht zurücksetzen"-Tooltip, U-20 Leerzustand-Nächster-Schritt. (4) **WP-033/U-15** Seed-Textpass
  („synthetisch/Demo" vom Einstiegsschirm entfernen — koppelt an `produktsprache`-Wächter, deshalb nach Cockpit).
  (5) **BL-01 Trust-/Confidence-Layer** (non-invasiv). (6) U-01 Erstkontakt-Orientierung (Product-Lead-Sichtung).
- **Harte Owner-Gates (vorbereitet, NICHT autonom):** FINDING-0004/RLS → DB→UI · WP-030 echte Auth ·
  CCP-001..004 + **CCP-005/006/007** + E-02 (Contract) · BL-05 AIMS-Zusage · BL-08 Framework-Lizenz ·
  BL-14 Pricing · WP-021 Demo-Firmenliste (O-WP006-01) · U-06/U-08/U-11/U-12 (Product/QA-Sichtung).
