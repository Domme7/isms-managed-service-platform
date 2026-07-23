# Active Work Package

- **ID:** — (kein aktives Work Package)
- **Zuletzt abgeschlossen:** **WP-019 Konzeptfassungen aus den PDFs** (FINDING-0007)
  - Review-Notiz: `docs/project/reviews/WP-019_INDEPENDENT_REVIEW.md`
  - Ergebnis: Dok. 03–07 quellentreu (Vollableitung + Konsistenz-Gate je Dokument; Dok. 04 in
    Runde 2 — das Gate fing rekonstruierte Abbildungstranskriptionen); `scripts/update_manifest.py`;
    Nachtrag mit **11 WP-020-Übergabepunkten**; O-WP019-01…08; O-WP014-01 präzisiert
  - **Owner-Sichtprüfung erbeten (O-WP019-04/-08):** einige PDF-Abbildungen (Dok. 03 §2/§8,
    Dok. 04 §3/§4, Dok. 06 §17 teilweise) waren maschinell nicht verifizierbar — ein kurzer Blick
    ins Original klärt sie abschließend. Blockiert nichts.

## Nächstes Work Package: WP-020 Verdichtungs-Umbau + Dashboard + Einstiegsfluss (DR-0008/0009)

Die 11-Punkte-Übergabeliste steht in `docs/concept/abgleich/NACHTRAG_WP-019_2026-07-23.md`.
Empfohlene Reihenfolge: **Cross-Tenant-Schutz (Dok. 06 §4.2) zuerst**, dann „aktive Rolle bei
kritischen Aktionen" (§5.2), Trust-Layer-Feldliste (§17.1), Seitenbausteine (§6.1),
Mission-Control-Rollenvarianten (§8), Decision-Card-Zweitliste (§13), Suche-Snippet-Schutz (§16),
`roles.ts`-Texte (Dok. 03 §3), Journey-Zustände/Optionen (Dok. 04).
**Punkt 8 (`weight`/`effectiveness_assumption` nicht PDF-gedeckt) berührt den Contract →
E-02-Umfeld, Human Gate — nur als Change Proposal.**

Ein WP + Context Pack existiert noch nicht — vom `program-manager` erstellen lassen.

> Abgeschlossen: WP-001..004, 007, 011..019.
> Danach: WP-021 Demo-Welt (E-01) → WP-022 Research Assistenz-Vision → WP-023 Konzept Teil 2 →
> WP-024 Treue-Check.
> Offene Human Gates: CCP-001..003, Docker, FINDING-0004, O-WP014-09, FINDING-0008 (Product Gate),
> E-02 nur Change Proposal.
