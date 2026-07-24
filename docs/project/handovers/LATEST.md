# Latest Handover

- **Aktuell:** `HND-20260724-sprint.md`
- **Modus:** Produktkorrektur-Sprint (DR-0010), **autonomer Weiterbau ohne Rückfragen** (Owner)
- **Stand:** Alle acht Shell-Orte live · Antwort-Modus (WP-028) + Reports/Wissen/Administration
  (WP-032) **abgenommen** (Gate-Runde 1+2, Fix-Pass, Nachfix fertig) · WP-024 Treue-Check fertig ·
  FINDING-0008 geschlossen
- **Testlage:** 835 Tests grün (web 705), lint + typecheck + format:check grün, axe 0 über alle
  15 Motive · **beide GitHub-CI-Workflows grün** (Repository-Contract-Job war seit WP-024 rot,
  weil dem Runner `pypdf` fehlte → `requirements.txt` + Install-Schritt ergänzt, `a8b9d90`)
- **Branch:** `main` · **Remote:** privat, alles gepusht
- **Exact Next Step:** WP-028/032 sind abgenommen und CI ist grün. Weiter mit
  Kundenwelt Slice 2/3 (Servicekatalog + Struktur-Assistent, read-only Dok. 14/16, preisfrei) →
  2–3 Cockpit-Varianten → **STOPP für visuelle Owner-Freigabe** (DR-0010); danach WP-033
  (Seed-Textpass), WP-029 (Personalisierung), WP-027 (Suche).
- **Harte Owner-Gates (nicht autonom):** FINDING-0004/RLS → DB→UI · WP-030 echte Auth ·
  CCP-001..004 + E-02 · WP-021 Demo-Firmenliste (O-WP006-01). Details: `ACTIVE_WORK_PACKAGE.md`.
