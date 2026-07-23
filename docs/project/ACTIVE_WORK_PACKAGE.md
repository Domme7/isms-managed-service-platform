# Active Work Package

- **ID:** WP-020 – Verdichtungs-Umbau, Dashboard-Schicht aus belegten Daten, neuer Einstiegsfluss (DR-0008/DR-0009)
- **Definition:** `work-packages/WP-020_VERDICHTUNG_DASHBOARD_EINSTIEG.md`
- **Context Pack:** `context-packs/WP-020_CONTEXT_PACK.md`
- **Status:** Active — Slice 1 (Cross-Tenant-Schutz & sichtbarer Kontext) in Arbeit
- **Builder:** `frontend-engineer` (Slices 1–5, strikt sequenziell, committet nie selbst);
  `concept-author` für Slice 6 (nur `research/change-proposals/`, parallel zulässig)
- **Gates:** Code + Product + Domain + QA + **Security & Privacy (Pflicht)** + Konzepttreue;
  zweite Runde nach dem Fix-Pass
- **Human Gates:** Owner-Stil-Abnahme je Stufe via `pnpm qa:visual WP-020` (DR-0008 Nr. 4);
  Slice 6 erzeugt ein Human Gate (CCP zu `weight`/`effectiveness_assumption`), wird nie hier umgesetzt

## Slices

1. **Cross-Tenant-Schutz & vollständiger sichtbarer Kontext** (Sicherheits-Slice, zuerst)
2. **Einstiegsfluss DR-0009:** `/login` nur Mandant, rollenlose Session, Rollenwahl in der App; Punkt 9 (`roles.ts`-PDF-Wortlaut)
3. **Verdichtungs-Gerüst:** Detailtiefe-Ebenen 1–3, neun Pflicht-Seitenbausteine als Konvention
4. **Dashboard-Schicht aus belegten Daten** (DR-0008): Kacheln/Verteilungen/Abdeckungen/Badges, je mit Drill-down
5. **Rollenvarianten-Personalisierung + Konzeptabgleiche** (Decision-Card-Zweitliste, Trust-Layer-Felder)
6. **CCP-Auftrag** `weight`/`effectiveness_assumption` (concept-author, Human Gate)

## Verbleib der 11 WP-019-Übergabepunkte

in-scope: 1, 2, 4, 5, 7, 9 · teilweise: 3 (O-WP020-04-Anker) · nur CCP: 8 ·
deferred benannt: 6 (O-WP020-05, Such-WP) und 10 (Folge-WP-Vorschlag WP-026) ·
erledigt verifiziert: 11. Details in der WP-Definition.

> Zuletzt abgeschlossen: **WP-019 Konzeptfassungen aus den PDFs** (FINDING-0007) —
> Review-Notiz `docs/project/reviews/WP-019_INDEPENDENT_REVIEW.md`.
> Danach: WP-021 Demo-Welt (E-01) → WP-006 Kundenwelt Stufe 1; WP-025 Design-Exploration parallel möglich.
> Offene Human Gates: CCP-001..003, Docker, FINDING-0004, O-WP014-09, FINDING-0008 (Product Gate).
