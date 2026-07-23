# Active Work Package

- **ID:** WP-020 – Verdichtungs-Umbau, Dashboard-Schicht aus belegten Daten, neuer Einstiegsfluss (DR-0008/DR-0009)
- **Modus:** **Produktkorrektur-Sprint (DR-0010)** — Reihenfolge Owner-geändert, Kundenwelt
  Stufe 1 und Cockpit-Varianten in den Sprint gezogen, danach **STOPP für visuelle Freigabe**
- **Definition:** `work-packages/WP-020_VERDICHTUNG_DASHBOARD_EINSTIEG.md`
- **Context Pack:** `context-packs/WP-020_CONTEXT_PACK.md`
- **Status:** Active — Slice 1 fertig + committet (`7971bc6`); als Nächstes Slice 3+4 (Dashboard)
- **Builder:** `frontend-engineer` (sequenziell, committet nie selbst); `concept-author` für
  Slice 6 ✓ (CCP-004 liegt vor, `ca9a7bb`)
- **Gates:** Code + Product + Domain + QA + **Security & Privacy (Pflicht)** + Konzepttreue;
  zweite Runde nach dem Fix-Pass. FINDING-0009 (behoben in Slice 1) wartet auf Security-Gate.
- **Human Gates:** Owner-Stil-Abnahme am **Varianten-Stopp** (DR-0010 Nr. 3, DR-0008 Nr. 4);
  CCP-004 (Human Gate offen, keine Umsetzung)

## Sprint-Reihenfolge (DR-0010)

1. ~~Slice 1 Cross-Tenant-Schutz & sichtbarer Kontext~~ ✅ (`7971bc6`; FINDING-0009 gefunden + behoben)
2. ~~Slice 3+4: strategisches Dashboard~~ ✅ (`c45f581`; web 403 Tests; O-WP020-12/13 neu)
3. **Slice 2: Einstiegsfluss Login → neutrales Dashboard → Rollenwahl in der App (+ Punkt 9 roles.ts)** ← **in Arbeit**
4. Slice 5: Rollenvarianten-Personalisierung + Konzeptabgleiche (Decision-Card-Zweitliste, Trust-Layer)
5. **Sichtbare Kundenwelt Stufe 1** (WP-006 vorgezogen, DR-0010 Nr. 2): read-only aus PDFs
   Dok. 14/16, fehlende Träger benannt
6. **2–3 Cockpit-Varianten** (WP-025-Kern) per `qa:visual` → **STOPP, visuelle Owner-Freigabe**

~~Slice 6 CCP-004~~ ✅ (nur Vorlage, Human Gate offen)

## Parallel (DR-0010 Nr. 4)

**WP-023 ✅ abgeschlossen** (2026-07-23): alle 14 Fassungen quellentreu (13× FREIGABE Runde 1;
Dok. 10 inhaltlich bestanden, einziger Gate-Befund war die fehlende Archivkopie — für alle 14
mechanisch nachgezogen). Nachtrag: `docs/concept/abgleich/NACHTRAG_WP-023_2026-07-23.md`.
Damit ist die fachliche Basis der Kundenwelt (Dok. 14/16) **geprüft** — DR-0010-Bauregel erfüllbar.

## Verbleib der 11 WP-019-Übergabepunkte

in-scope: 1 ✓, 2 ✓ (Slice 1), 4, 5, 7, 9 · teilweise: 3 (O-WP020-04-Anker ✓) · nur CCP: 8 ✓ ·
deferred benannt: 6 (O-WP020-05, WP-027) und 10 (WP-026) · erledigt verifiziert: 11.

> Zuletzt abgeschlossen: **WP-019**. Nach dem Sprint: WP-021 Demo-Welt (E-01).
> Offene Human Gates: CCP-001..004, Docker, FINDING-0004, O-WP014-09, FINDING-0008.
