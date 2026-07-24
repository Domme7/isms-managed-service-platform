# Owner-Vision, Entscheidungen & Backlog — HIER ZUERST LESEN

> **Zweck:** Diese Datei bündelt **alles, was der Owner in der Sprint-Session 2026-07-24 entschieden und
> gewünscht hat** — Vision, Zielpublikum, alle Kursentscheidungen, das neue Cockpit-Zielbild, den Fahrplan
> und die offenen Fragen. Sie ist die **eine, eindeutig sichtbare Einstiegsstelle** für jeden, der
> weiterarbeitet. Detailbelege stehen in den verlinkten Decision Records und `OPEN_QUESTIONS.md`.
> Bei Konflikt gilt die Reihenfolge: PDF-Konzept (Regel Null) → Decision Records → diese Datei.

Stand: **2026-07-24**. Aktueller Baustand & Testlage: `docs/project/CURRENT_STATE.md` · Wiedereinstieg:
`docs/project/handovers/LATEST.md`.

---

## 1. Vision & Zielpublikum

Ein **digitaler Unternehmenszwilling für kontinuierliches Informationssicherheits-Management** + skalierbare
Managed Services — modern, farbig, **ehrlich** („nichts nur Show": jede Zahl/Ampel/Grafik aus echten Daten,
jeder Klick führt zu Realem). **Zielpublikum (alle vier, hohe Messlatte in jeder Richtung):** interne
PwC-Präsentation · Kunden-Verkaufsdemo · Investoren/Stakeholder · Portfolio/Handwerksnachweis.

## 2. Owner-Entscheidungen (verbindlich)

| DR | Kern |
|---|---|
| [DR-0014](../decisions/DR-0014_modernes_cockpit_nichts_nur_show.md) | Modernes, farbiges Cockpit (Ampeln/Warnungen/Deckungsringe), **„nichts nur Show"** (alles datengetragen + funktional), hell/dunkel |
| [DR-0015](../decisions/DR-0015_owner_kursentscheidungen_20260724.md) | **Kursentscheidungen:** Produkt-Tiefe zuerst (nicht Auth/DB) · E-02 bauen · alle vier Verbesserungen · **Demo-Welt = fünf Dok-16-Firmen reich** · getrennte Login-Welten (simuliert) · **synthetische Preisbänder** · Cockpit = Startseite · A/B/C-Personalisierung · Hosting später · Demo-Welt zuerst · Decision Cards zuerst |
| [DR-0016](../decisions/DR-0016_cockpit_redesign_drilldown_dashboard.md) | **NEU — Cockpit-Redesign:** kompaktes Grafik-Dashboard mit **Drill-down + „Eintauch"-Animation** statt Langscroll (siehe §3) |
| DR-0008 | Ampeln/Dashboards/Charts erwünscht (datengestützt, keine erfundenen Bewertungen) |
| DR-0011 · DR-0013 | Keine „Demo/synthetisch/Simulation"-Etiketten im UI · Antwort-Modus (Antwort zuerst, Lücke ruhig) |

## 3. Das neue Cockpit-Zielbild (DR-0016 — nächster großer UX-Schritt)

Owner-O-Ton: *„Cockpit viel zu lang; besser ein Dashboard aus vielen Grafiken, dann immer tiefer in die
Bereiche klicken — mit einer Animation, als ob man tiefer eintaucht — immer tiefer verzweigen, nicht so
langgezogen."*

- **Kompaktes Grafik-Dashboard „über der Falz"** (Kennzahlen/Ampeln/Charts auf einen Blick), **kein
  Langscroll**.
- **Progressiver Drill-down:** Übersicht → Bereich → Objekt, per Klick, mit **„Eintauch"-Übergang** (Zoom/
  Tiefe). Verzweigende Navigation statt endloser Seite.
- **Ehrlichkeit bleibt:** jede Grafik datengetragen, jeder Drill-down zu realem Detail; `prefers-reduced-
  motion` respektieren; axe 0.
- **Umsetzung:** eigenes WP; die gebaute Datenlogik bleibt, nur Präsentation/Navigation neu. (Ersetzt das
  heutige Langscroll-Cockpit; A/B/C-Personalisierung wird dabei neu bewertet.)
- **✅ Owner-Freigabe (2026-07-24):** die interaktive Drill-down-/„Eintauch"-Vorschau **gefällt dem Owner
  sehr gut** und ist die verbindliche Basis (darf gebaut werden). **Vor der finalen Festlegung noch
  ausprobieren** (Design-Experimente, dann wählt der Owner): (1) mehr Charts; (2) unterschiedliche
  Kachelgrößen (nicht uniform, Wichtiges größer); (3) Radar-/Web-Chart + andere Grafiktypen wo sinnvoll;
  (4) coolere/stärkere Animation. Details: [DR-0016](../decisions/DR-0016_cockpit_redesign_drilldown_dashboard.md).

## 4. Fahrplan (Sequenz, usability-first)

**Fertig & testbar:** modernes Cockpit (hell/dunkel, Ampeln) · Einstiegswelt (Landing `/willkommen` +
getrennte Login-Welten) · **WP-021 Slice 1 (Nordstern tief → Ampeln leuchten amber)** · Servicekatalog +
Struktur-Assistent · Antwort-Modus · Reports/Wissen/Administration · digitaler Zwilling/Objekt-360.

**Als Nächstes (offen, in Reihenfolge):**
1. **Cockpit-Redesign (DR-0016)** — kompaktes Dashboard + Drill-down + Tauch-Animation. *(neu priorisiert durch das Feedback)*
2. **WP-021 Slices 3–6** — die vier weiteren Firmen reich (je eigene Ampel-Verteilung).
3. **Synthetische Preisbänder** (O-KUNDE-01-Umstellung, mit Security) · **WP-033/U-15** (Demo-Wörter vom Einstieg raus).
4. **E-02 → echte Decision Cards** (Change Proposal → Contract/Seed; CCP-008-Entwurf liegt).
5. **WP-021 Slice 7** — synthetische Bewertungsscores (Reifegrad/Risiko-Level), **gated** über CCP-008/E-02.
6. **Die vier Verbesserungen** — Trust-Layer (CCP-005) · Regulatory Change (CCP-006) · Register of Information (CCP-007) · AIMS-Cockpit.
7. **Modern-Rollout** der Bildsprache über die übrigen Seiten + Landing-Minors (Rollen je Welt, 4→2-Brücke).
8. **Usability-Quick-Wins-Rest** (U-17, U-20) · globale Suche (WP-027).

## 5. Offene Fragen & Gates (Owner entscheidet)

Vollständig in **[`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md)** (O-WP006/O-WP025/O-WP021/O-KUNDE …). Die
**owner-gated** Kernpunkte, die auf Freigabe warten:

- **Contract-Erweiterungen (Change Proposals liegen als Entwurf):** CCP-005 (Trust-Layer) · CCP-006
  (Regulatory Change Record) · CCP-007 (Register of Information) · **CCP-008 (Reifegrad + Risiko-Level →
  leuchtende Score-Ampeln, WP-021 Slice 7)** · E-02 (Aufgaben/Fristen/Entscheidungen → Decision Cards).
  Alle unter `research/change-proposals/`.
- **Zurückgestellt (Owner: Produkt-Tiefe zuerst):** echte Anmeldung/getrennte Konten (WP-030) · Datenbank
  ans UI (FINDING-0004/RLS) · Hosting/online teilbare Version (O-COST-001).
- **Preise:** synthetische Bänder freigegeben (DR-0015 Nr. 8); reale Preise nie autonom.
- **Konzeptspannungen:** Firmenliste Dok-03 vs Dok-16 (O-WP006-01, Richtung Dok-16) · „Nordstern"
  Bank/Fertiger (O-WP021-10) · Cockpit A/B/C-Zukunft nach DR-0016.

## 6. Wie man weiterarbeitet

1. `CLAUDE.md` (Regel Null: alles am PDF unter `docs/concept/pdf/`), diese Datei, `CURRENT_STATE.md`,
   `LATEST.md`, `OPEN_QUESTIONS.md` lesen.
2. Nächsten Schritt aus §4 nehmen; Kontext-Pack/WP-Definition unter `work-packages/` + `context-packs/`.
3. Builder ≠ Reviewer: bauen → verifizieren (vitest/typecheck/lint/build + `qa:visual`/axe) → Gates → committen+pushen.
4. Jeder materiale Schritt aktualisiert `CURRENT_STATE.md`, `LATEST.md` und ggf. diese Datei.
