# Latest Handover

- **Aktuell:** `HND-20260725-dr0019.md` — DR-0019 Ein-Produkt-Fokus (kein Neuanfang; Firmen,
  Portfolio, Cockpit bleiben; Master-Liste 1–6, Punkt 1 Drei-Tags-Modell ✅).
- **Historie (Vormittag, 2026-07-25): DR-0018 „Großer Umbau", autonomer Loop über die 5-Stufen-Liste.**
- **Modus:** Owner-Auftrag „durchklickbares Produkt in zwei Welten, ausblenden statt löschen, go live —
  keine Demo-Etiketten mehr". Selbst-getakteter `/loop`; pro Stufe grün committen. Entscheidung: [DR-0018].
- **DR-0018-Fortschritt: Stufe 0–4 ✅ (committet+gepusht), Stufe 5 offen.** 0 DR-0018+Handover ·
  1 Landing mit zwei Login-Einstiegen (`7058668`) · 2 Nicht-Struktur-Nav ausgeblendet (Marken-Link
  sphärengerecht) · 3 Kunde-Welt (`(kunde)`-Gruppe: Mein Dashboard/Meine Ablage/Services buchen,
  Login-Kunde → `/mein-dashboard`) · 4 Prio+Frist je Objekt (`PrioBadge` in Meine Ablage + Objekt-360,
  read-time via `ableitenPrioritaet`, E-02 unangetastet). Durchklick-Kette Berater steht.
- **Exact Next Step (Stufe 5):** (a) **GreenGrid reich füllen** = großer Rest: `greengrid-graph.ts`
  analog `medinova-graph.ts` (30 Objekte/~34 Kanten, Welle 2026-07-15, Deckungslücken, E-02-Riegel),
  in `seed.ts`/`tenants.ts` verdrahten, Leere-Guards umschreiben (`seed.spec.ts` GREENGRID-`toEqual([])`
  ~Z.100/114, `seed-facts.ts`, Portfolio-Empty-State-Test), Seed-Version-Bump, `pnpm --filter
  @isms/demo-seed build` VOR Web/DB-Tests. (b) Hedge-Etiketten raus (Servicekatalog „illustrativ/ohne
  Buchung", Login „beschriftete Vorschau"/„ohne echtes Konto"), Guard-Tests mitziehen. (c) Bereich-
  Kacheln im Kunde-Dashboard in der Kunde-Welt halten. (d) Politur + axe-0-Endabnahme.
- **BLOCKER 2026-07-25 ~15:00: wöchentliches API-Limit erreicht** (reset 15:00 Europe/Berlin) — der
  GreenGrid-Subagent brach ab, ohne zu schreiben (Arbeitsbaum sauber). Alles aus dem Repo fortsetzbar.
- **Vorheriger Modus:** Owner-Auftrag „setz alles um, usability first, modernes Cockpit, nichts nur Show".
  Owner-gated Materie (echte Auth/DB) zurückgestellt (DR-0015). Entscheidungen: [DR-0014], [DR-0015].
- **MEILENSTEIN — Modernes Cockpit fertig ([DR-0014]):** `/cockpit` ist die Startseite nach Login, moderne 2026-
  Dashboard-Sprache (farbige KPI-Kacheln, SVG-Deckungsringe, Ampel-Legende, Warnungen-Panel „Offene Datenlücken",
  Lebenszyklus-Ampelleiste), **hell UND dunkel** (axe 0 auch im Dunkelmodus), A/B/C als dezente Stil-Personalisierung.
  „Nichts nur Show": jedes Element aus echter Ableitung (`lib/cockpit/{ampel,warnungen,lebenszyklus}.ts`), jeder
  Drill-down zu realen Objekten. Zwei Gate-Runden bestanden + separater Dark-axe-Fix. Commit `87a5ace`.
- **Abgenommen:** WP-028, WP-032, WP-006 Slice 2+3, **WP-025 Cockpit (DR-0014, hell+dunkel)**, **Einstiegswelt**
  (Landing `/willkommen` + getrennte Kunde/Berater-Login-Welten), **WP-021 Slice 1 (Nordstern tief — Ampeln leuchten
  amber: Controls 2/3, Risiken 2/3, Owner 21/58, mit Objekt-360-Drilldowns)**. WP-024, FINDING-0008. CCP-008-Entwurf liegt.
- **Läuft gerade:** WP-021-Slice-1-Gate (Wächter-Feinjustierung „Risiko", ISMS-Fachlichkeit, Regel Null, Mandantenisolation).
- **Testlage (`28c8ae4`):** **995 Tests grün** (web 856 · demo-seed 63 · db 19 · contracts 55 · api 2), typecheck/lint/
  format grün, **axe 0 über 21 Motive** (inkl. cockpit-dunkel), CI grün. Seed **1.3.0** (tenant-nordwerk = Nordstern 58/84).
- **PDF-Grundwahrheit vorab extrahiert** (Enabler): Dok 16 Firmen · Dok 10 Decision Cards · Dok 14 Preise →
  `…/scratchpad/pdf-prep/` (flüchtig; sonst `PYTHONUTF8=1 python scripts/pdf_text.py <nr> --suche "…"`).
- **Branch:** `main` · **Remote:** privat, gepusht.
- **Exact Next Step (Feinsequenz DR-0015):** (1) WP-021 **Slices 3–6** (AlpenCloud/Rheinbank/MediNova/GreenGrid reich,
  je eigene Ampel-Verteilung, Muster = Slice 1) → dann **Slice 7 (synthetische Bewertungsscores Reifegrad/Risiko-Level,
  GATED über CCP-008/E-02)**. (2) synthetische Preisbänder (O-KUNDE-01-Umstellung, Security) · **WP-033/U-15** (Demo-Wörter
  vom Einstieg). (3) **E-02 → echte Decision Cards**. (4) die vier Verbesserungen (CCP-005/006/007 + AIMS). (5) Modern-
  Rollout über die übrigen Seiten + Landing-Minors (Rollen je Welt, 4→2-Brücke, Hero-Lead). WP-Pipeline-Workflow + Registry-Wächter als Enabler offen.
- **Owner-Antworten offen fürs Programm:** 2–3 Lanes parallel · WP-021 Flaggschiff-zuerst · Enabler (Registry-Wächter,
  WP-Pipeline-Workflow, PDF-Prep ✓) · neue Idee Produkt-Landing (in Lane A) · Hosting später · Decision Cards zuerst.
- **Harte Owner-Gates (nicht autonom):** echte Auth (WP-030) · DB→UI (FINDING-0004/RLS) · reale Preise (nie) ·
  Contract-Änderungen je Human Gate (E-02/CCP freigegeben, PDF-gegenlesen).
