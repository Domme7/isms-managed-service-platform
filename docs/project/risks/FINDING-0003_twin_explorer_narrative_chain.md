# FINDING-0003 – Twin Explorer: Ursache-Wirkungs-Kette nicht als geführte Kette erlebbar

- **Quelle:** UX-/Produktregel-Review WP-004 (Finding UX-M2)
- **Schwere:** Low (Enhancement, nicht blockierend)
- **Datum:** 2026-07-22
- **Status:** Offen — bewusst auf Folge-Slice/WP verschoben
- **Betroffen:** `apps/web/components/twin/RelationshipList.tsx`, `apps/web/components/twin/TenantDetailView.tsx`

## Beschreibung

Im read-only Digital Twin Explorer (WP-004) werden die 15 Nordwerk-Beziehungen als **flache Liste**
gerendert. Die fachliche **Ursache-Wirkungs-Kette** (Geschäftsprozess → Information Asset → Risiko →
Control → Evidence) wird dadurch nur auf Roh-Kanten-Niveau sichtbar, nicht als geführter Pfad. Das
„Womit hängt es zusammen?" aus Dok. 06 (§6/§12, Seitenanatomie) wird damit nur teilweise eingelöst.

Mildernd: Die Zielgruppe des Digital Twin Explorers (Dok. 06 S05: Power User/Auditor) ist an
Kantenlisten gewöhnt; für Executive-Sichten wäre eine geführte Kette wichtiger.

## In WP-004 bereits adressiert (nicht Teil dieses Findings)

- Klartext-Labels für Beziehungstypen, `confirmation_level` statt bloßer Dimensions-Zählung,
  qualitativer Vertrauensgrad, Leitfrage auf der Detailseite, `main`-Landmark/Skip-Link, deutscher 404.

## Empfehlung / möglicher nächster Schritt

- Geführte Kettenansicht bzw. „Impact Path" für eine gewählte Wurzel (z. B. ein Risiko), die die
  verbundenen Objekte in Wirkungsreihenfolge zeigt (Dok. 07 Impact Path / Objekt-360).
- Optional zusätzlich: Anzeige der `source_refs`/Herkunft je Objekt/Kante (Dok. 07 §12) — in WP-004
  bewusst zurückgestellt.

## Trigger

Wird aufgegriffen, wenn der Digital Twin Explorer interaktiv ausgebaut wird (z. B. mit WP-011 App-Shell
oder einem Twin-Detail-WP der Phase 2).
