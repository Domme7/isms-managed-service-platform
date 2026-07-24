# Berater-Portfolio-Cockpit — Konzept & Entwurf (DR-0016 Schritt 4)

- **Datum:** 2026-07-24 · **Status:** Konzept + Entwurf (Owner-Reaktion ausstehend) · **Quelle:** Owner-Wunsch
- **Bezug:** [DR-0016](../../decisions/DR-0016_cockpit_redesign_drilldown_dashboard.md) Schritt 4;
  Eisenhower-Datenträger: [`research/ideas/IDEA-2026-07-24_eisenhower-dringlichkeit-berater-cockpit.md`](../../../research/ideas/IDEA-2026-07-24_eisenhower-dringlichkeit-berater-cockpit.md);
  Entwurf (Mockup) im Chat: `berater_portfolio_cockpit_konzept`.

## Zweck
Ein Cockpit für das **Berater/Admin-Profil** (Portfolio-Sphäre): auf einen Blick **über alle Kunden hinweg**
sehen, **wo es gerade brennt** und **welche Termine anstehen** — statt in jeden Kunden einzeln zu schauen.

## Zwei Teile (ehrlich getrennt)

### Teil 1 — Kunden-Rangliste nach offenen Punkten (ECHT, heute baubar)
- Alle Mandanten des Betreiber-Portfolios, **sortiert nach erfasster Lücken-Last** (echte Zahlen je Kunde:
  offene Datenlücken, Controls ohne Nachweis, Objekte ohne Owner, Risiken ohne Minderung — dieselben
  Ableitungen wie im Kunde-Cockpit, nur je Mandant aggregiert).
- Jede Zeile: Firma + Kurzprofil + die realen Lücken-Badges + eine „Lücken-Last"-Leiste. **Klick → das
  Kunde-Cockpit dieses Mandanten** (Drill-down in die Sphäre).
- **Tenant-Scoping (Pflicht):** aggregiert wird **serverseitig** nur das Portfolio DIESES Betreibers; kein
  Kunde sieht fremde Mandanten. (Heute Demo-simuliert; echt mit WP-030 + FINDING-0004/RLS.)

### Teil 2 — Eisenhower-Board für Termine/Dringlichkeit (GEPLANT, E-02)
- **Der Kunde liefert selbst**: Aufgabe (optional Datei), **Frist**, **Dringlichkeit**, **Wichtigkeit**.
- Das System sortiert automatisch nach der **Eisenhower-Matrix** in vier Quadranten (Sofort · Einplanen ·
  Delegieren · Später) **und** in eine **Gesamt-Dringlichkeitsliste über alle Kunden** (nach Quadrant, dann
  Frist). Regel offengelegt; nichts erfunden — die Dringlichkeit kommt vom Kunden, die Frist-Nähe verstärkt
  sie nach sichtbarer Regel.
- Im Entwurf **illustrativ** dargestellt und klar als „geplant (E-02)" markiert (kein Datenträger heute).

## Ehrlichkeit (Regel Null)
- Teil 1 = echte erfasste Lücken (heute für Nordstern real; übrige Firmen nach WP-021 Slices 3–6).
- Teil 2 = **E-02** (Aufgaben/Fristen/Entscheidungen): erst nach Contract-/Seed-Erweiterung (Owner-Gate),
  zuerst synthetisch, dann echte Kunden-Eingabe/Upload (WP-030 + RLS). Bis dahin **benannte Lücke**, nicht
  gefüllt.

## Abhängigkeiten / Reihenfolge
1. **Mandanten füllen** (WP-021 Slices 3–6) — sonst ist die Portfolio-Rangliste nur ein Kunde.
2. **Profile: Berater/Admin-Profil** (5-Profile-Modell) — der Einstieg, unter dem dieses Cockpit lebt.
3. **Teil 1 bauen** (echte Portfolio-Aggregation, read-only) — sofort ehrlich möglich.
4. **Teil 2 (Eisenhower/E-02)** — nach Owner-Freigabe des Change Proposals; synthetisch zuerst.

## Owner-Feedback (2026-07-24)
Der Entwurf **gefällt** als Idee — der Owner will beim Bau aber **deutlich mehr**: **mehr Dashboard, stärker
interaktiv**, auf einen Blick **wo bei welchem Kunden was wie hängt**. Also nicht nur Rangliste + Board,
sondern ein reiches, interaktives Portfolio-Dashboard — z. B. **Heatmap/Matrix Kunde × Bereich** (Controls,
Risiken, Owner, Nachweise, Fristen), Drill-down je Zelle in die konkrete Hängestelle, Live-Verdichtung,
Filter. Wird beim Bau (nach Schritt 2+3) umgesetzt; der jetzige Entwurf ist die tragfähige Basis. Vor dem
Bau zeige ich einen **erweiterten, „krasseren" Entwurf**.

## Offen (Owner)
- OF-B1: Reicht die Lücken-Last als „Dringlichkeit" für Teil 1, bis E-02 da ist? (Default: ja, klar so benannt.)
- OF-B2: Eisenhower-Achsen — Dringlichkeit/Wichtigkeit rein kundengesetzt, oder Frist-Nähe automatisch
  gewichten? (Default: beides, Regel sichtbar.)
