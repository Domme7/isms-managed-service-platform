# IDEA-001 – Modernisierung der Benutzeroberfläche („Zeitgeist 2026")

| Feld | Inhalt |
|---|---|
| Status | **Vom Owner bekräftigt und präzisiert (2026-07-23 abends)** — siehe Nachtrag unten |
| Quelle | Human Product Owner, 2026-07-23 (wörtliche Anforderung unten) |
| Art | Produkt-/Design-Idee, mittelfristig |
| Reifegrad | Idee — braucht Design-Exploration vor jedem Bau |
| Berührt | `apps/web/app/globals.css`, alle Ansichten, Dok. 06 („Visuelles Designsystem", „Datenvisualisierung, Accessibility & Responsive") |
| Spannungsfeld | **DR-0003** (Design bleibt minimal — gilt weiter, bis diese Idee aktiviert wird) |

## Owner-Anforderung (sinngemäß vollständig)

Die Software wirkt aktuell noch wie eine klassische Version 1.0 aus dem Jahr 2015. Das Design soll
stärker dem technologischen Zeitgeist von 2026 entsprechen: **moderner, hochwertiger,
übersichtlicher und dynamischer**. Orientierung: die Design-Evolution von Enterprise-Plattformen
wie Qualys über die Jahre. Mögliche Elemente:

- dezente Animationen und Übergänge,
- leichte Bewegungen oder dynamische Elemente im Hintergrund,
- modernes Cockpit-/Control-Center-Design,
- Dashboard-Grafiken, Statistiken und Statusanzeigen,
- klare Priorisierung wichtiger Informationen.

Die Animationen sollen **hochwertig und dezent** bleiben und nicht von der Arbeit ablenken.

## Verhältnis zu DR-0003 (wichtig — keine stille Widerspruchsauflösung)

DR-0003 hat einen früheren „Wow"-Uplift vollständig zurückgenommen, **weil der Auftrag maximiert
statt minimal interpretiert wurde** — nicht, weil der Owner dauerhaft ein 2015-Design will. Diese
Idee ist die bewusste, vom Owner selbst formulierte Weiterentwicklung. Es gilt:

1. **DR-0003 bleibt in Kraft**, bis ein UI-Modernisierungs-WP aktiviert wird.
2. Bei der Umsetzung gilt die **DR-0003-Lektion verschärft**: in kleinen Schritten, jede Stufe dem
   Owner **zeigen** (jetzt möglich: `pnpm qa:visual` liefert Screenshots je Stand), nie mehrere
   Stilebenen auf einmal.
3. „Dezent und hochwertig" ist die Leitplanke — der zurückgenommene Uplift (Navy, Glow, Glas) ist
   dokumentiert als das, was **nicht** gemeint war.

## Was das bestehende Konzept bereits vorgibt (Anker, kein Neuland)

- **Dok. 06 „Visuelles Designsystem"**: neutrales Designsystem, Klartext, Zustände — die
  Modernisierung ändert die *Ausprägung*, nicht diese Regeln.
- **Dok. 06 „Datenvisualisierung, Accessibility & Responsive"** (PDF!): Heatmaps optional, Listen
  und Ursachenketten bleiben verfügbar; Reifegrad zeigt Ziel/Ist/Trend/Vertrauensgrad, nie nur eine
  Prozentzahl; Route Planner ohne Scheinpräzision. **Dashboard-Grafiken müssen diesen Regeln folgen.**
- **Ehrlichkeit vor Wirkung** (Dok. 08, 08-D07): Statusanzeigen und Cockpit-Elemente dürfen
  **keine erfundenen Ampeln/Scores** zeigen. Ein „Control Center" braucht echte, belegte Werte —
  heute existieren dafür erst Zählungen; KPIs/Trends sind durch **O-WP016-04** (fehlende
  Contract-Felder) und Dok.-09/10-Logik (spätere Phasen) begrenzt.
- **A11y ist Teil von Done**: `prefers-reduced-motion` wird bereits respektiert (qa:visual testet
  mit reduced motion); jede Animation braucht diesen Fallback.

## Architektur-Andockpunkte (heute schon berücksichtigt)

| Baustein | Andockpunkt | Stand |
|---|---|---|
| Design-Tokens | `globals.css` nutzt CSS-Variablen (`--tw-*`); ein Theme-Wechsel ist eine Token-Änderung, kein Umbau | ✅ vorhanden |
| Komponenten-Vokabular | Alle Ansichten nutzen dieselben Klassen (`tw-*`, `sv-*`, `od-*`) — ein Restyle wirkt zentral | ✅ vorhanden |
| Sichtbare Abnahme | `pnpm qa:visual` erzeugt Screenshots je Stand — die Owner-Feedback-Schleife, die DR-0003 gefehlt hat | ✅ seit WP-018 |
| Dashboard-Daten | `seed_facts` / `buildMissionControl` liefern belegte Zählungen; KPI-/Trenddaten fehlen (O-WP016-04, Dok. 10 §10) | ⚠️ teilweise |
| Animationslayer | Noch keine Animationsbibliothek — Entscheidung (CSS only vs. Framer Motion o. ä.) braucht ADR | ❌ offen |

## Sinnvoller Zeitpunkt

Nach **WP-021** (Demo-Welt konzeptkonform): Cockpit und Dashboards werden erst mit den
Mindestdatenmengen (25–50 Assets je Mandant, Konflikte, Trust-States) glaubwürdig. Vorher
umgesetzt, würde die neue Oberfläche vor allem leere Flächen inszenieren.

## Nächste Schritte bei Aktivierung

1. Design-Exploration als eigenes Mini-WP: 2–3 Stilvarianten als **statische Screenshots**
   (kein Code im Produkt), Owner wählt.
2. ADR für ggf. neue Abhängigkeiten (Animation, Charts — Chart-Regeln aus Dok. 06 beachten).
3. Umsetzung in Stufen (Tokens → Layout → Bewegung), je Stufe `qa:visual` + Owner-Blick.


## Nachtrag 2026-07-23 (Owner-Steuerung nach Live-Ansicht)

Der Owner hat die Umgebung selbst angesehen und präzisiert:

> „An sich erstmal gut, aber das ist nicht wirklich Cockpit und Dashboard … ich hätte gern mehr
> auf einen Blick und würde am Anfang gern strategisch sein und dann kann ich mich immer tiefer
> klicken. Ich glaube, da müssen wir was an der Architektur ändern, am Design auf jeden Fall."

**Einordnung:** Das ist keine neue Anforderung, sondern die Bestätigung des Konzepts — die
maßgeblichen Abschnitte (Dok. 06 §6.2 Detailtiefe-Ebenenmodell, Mission-Control-Rollenvarianten
mit Fokus/Ausblendung je Rolle, WOW-MOMENT „30 Sekunden", Executive Experience „drei bis fünf
entscheidungsreife Themen") fehlten in der alten Markdown-Fassung und sind seit WP-019 wieder da.
Die flache UI ist eine Folge von FINDING-0007, nicht einer Designentscheidung.

**Architektur-Einschätzung (ehrlich):** Kein Umbau von Framework oder Datenmodell nötig — die
Änderung liegt in der **Informationsarchitektur der Seiten** (Verdichtung zuerst, Ebenen,
Drill-down) und im visuellen Design. Was „strategisch auf einen Blick" an *Inhalten* zeigen darf,
bleibt durch die Ehrlichkeitsregeln und die Datenlage begrenzt (keine erfundenen Scores; KPIs,
Trends und Zielabweichung brauchen E-02) — aber Struktur, Verdichtung und Drill-down sind mit den
heutigen belegten Daten baubar.

**Konsequenz für die Planung:** WP-020 wird nicht als Sammlung einzelner nachgeholter Regeln
geschnitten, sondern als **kohärenter Verdichtungs-Umbau** nach Dok. 06 — Detailtiefe-Ebenen +
Rollenvarianten der Mission Control + Pflicht-Seitenbausteine zusammen, Cross-Tenant-Schutz als
Sicherheits-Slice vorweg. Parallel dazu die Design-Exploration aus dieser Idea Card (2–3 statische
Stilvarianten, Owner wählt; DR-0003: kleinste Variante zeigen, `qa:visual` liefert die Bilder).
