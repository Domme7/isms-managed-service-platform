# Context Pack – WP-020 Verdichtungs-Umbau, Dashboard-Schicht, Einstiegsfluss

**Für:** `frontend-engineer` (Slices 1–5) · `concept-author` (Slice 6)
**WP-Definition (maßgeblich):** `work-packages/WP-020_VERDICHTUNG_DASHBOARD_EINSTIEG.md`
**Stand der Quellen:** 2026-07-23 (Seed 1.2.0 · 448 Tests grün · Dok. 03–07 quellentreu seit WP-019)

## 1. Auftrag in einem Absatz

Cross-Tenant-Schutz und vollständiger sichtbarer Kontext zuerst (Sicherheits-Slice); dann
Einstiegsfluss nach DR-0009 (Anmelden nur mit Mandant → neutrale strategische Ebene 1 auf
`/heute` → Rollenwahl in der App, Rollenwahl zieht aus `/login` um); dann Verdichtungs-Gerüst
nach Dok. 06 (Detailtiefe-Ebenen 1–3, neun Pflicht-Seitenbausteine als Konvention); dann die
erste Dashboard-Schicht **ausschließlich aus belegten Seed-Daten** (DR-0008: Statuskacheln,
Lebenszyklus-Verteilungen, Abdeckungsbalken, Ampel-Badges auf erfassten Zuständen — je mit
Drill-down); dann Rollenvarianten-Personalisierung und zwei Konzeptabgleiche
(Decision-Card-Zweitliste, Trust-Layer-Felder). Slice 6 ist reine Konzeptarbeit (CCP).
**Kein Contract-/Seed-/DB-Umbau. Read-only. Synthetisch.**

## 2. Regel Null und steuernde Entscheidungen

- **Produktwahrheit sind die PDFs** (`docs/concept/pdf/`, DR-0006). Jede Anforderung, jedes
  Feld, jedes Vokabular vor Übernahme dort nachlesen; **Abschnittstitel zitieren** (die
  Nummerierung weicht ab, siehe Kopfnotizen der Markdown-Fassungen).
  Werkzeug: `python scripts/pdf_text.py 06 --suche "Trust Layer"` (analog 03/04/07/10).
  Sitzungs-Extrakte (flüchtig, nur Komfort):
  `C:/Users/Domme/AppData/Local/Temp/claude/C--Users-Domme-Desktop-coding-apps-ISMS/f7ae6458-013c-45fe-bc68-2cb25c71a7da/scratchpad/pdf-extrakte/dok_0{3,4,6,7}.txt`, `dok_10.txt`.
  Markdown-Zweitquelle (seit WP-019 quellentreu, Kopfnotiz mit Konkordanz beachten):
  `docs/concept/active/` Dok. 03–07. Bei Widerspruch gilt das PDF.
- **DR-0008** (`docs/decisions/DR-0008_ampeln_dashboards_erwuenscht.md`): Dashboards/Ampeln
  **erwünscht**; die UI darf alles visualisieren, **was die Daten tragen**; verboten bleibt:
  UI errechnet/behauptet eine Bewertung ohne Datenträger, Ampel ohne Drill-down,
  Lebenszyklus-Stand als Prüfergebnis (08-D07). Stilleitplanke „nicht absolut übertrieben";
  Owner nimmt jede Stufe per `qa:visual` ab.
- **DR-0009** (`docs/decisions/DR-0009_einstiegsfluss_und_kundenwelt.md`): Einstiegsfluss
  Mandant → neutrale Ebene 1 → Rollenwahl in der App; Abweichung von 06-D02 ist dort benannt
  (Owner-Schicht geht vor). Kundenwelt ist **WP-006**, nicht hier.
- **DR-0005:** Konzeptlücken benennen (O-WP020-xx), nie füllen. **DR-0003:** minimal beginnen,
  zeigen, dann steigern — wird durch DR-0008 kontrolliert abgelöst, nicht still.

## 3. Normative Kernaussagen (am PDF verifizieren, hier nur kuratiert)

**Dok. 06 — Abschnitt „Sichtbarer Kontext" (Slice 1):** sechs Kontextelemente: aktiver
Mandant/Organisationseinheit · aktive Produktrolle und zeitlich begrenzte Vertretung ·
Scope/Objektkontext · Datenstand/letzter Synchronisationszeitpunkt · Vertraulichkeitsstufe und
Exportrestriktion · Vertrauensgrad bei abgeleiteten Aussagen. Kasten **CROSS-TENANT-SCHUTZ**:
„Ein Wechsel zwischen Mandanten benötigt eine klare visuelle Kontextänderung. Entwürfe,
Uploads und Freigaben dürfen nicht still in einen anderen Mandanten übernommen werden."
Globales Akzeptanzkriterium: „Cross-Tenant-Fehlaktionen werden visuell und technisch
verhindert."

**Dok. 06 — Abschnitt „Rollenwechsel":** aktiver Modus in der Shell sichtbar; Wechsel ändert
Prioritäten/Sprache/Aktionen/Verdichtung, nie rückwirkend Daten; **„Kritische Aktionen
speichern die aktive Rolle mit"** (kein Träger im read-only-Produkt → O-WP020-04).
Designregel: Rollenwelten nie vier getrennte Anwendungen/widersprüchliche Dashboards.

**Dok. 06 — Abschnitt „Verbindliche Seitenbausteine" (Slice 3):** neun Bausteine mit
Pflichtinhalt: Question Header (Frage, Objekt/Scope, Status, Owner) · Context Bar (Mandant,
Rolle, Scope, Datenstand, Vertraulichkeit) · Summary/Pulse (Trend, Veränderung, wichtigste
Ursache) · Relationship Panel (verknüpfte Objekte, Richtung, Herkunft) · Impact Panel (Ziel,
Risiko, Zeit, Budget, Services) · Decision Card (Optionen, Nichtstun, Annahmen, Unsicherheit) ·
Action Rail (freigeben, delegieren, simulieren, exportieren) · History/Decision Record
(Version, Änderung, Entscheider, Review) · Trust Layer (Quelle, Aktualität, Vollständigkeit,
Konflikte). Achtung: 06-D03 sagt „fünfteilige Seitenanatomie" → Zählungskonflikt O-WP020-02.

**Dok. 06 — Abschnitt „Detailtiefe" (Slice 3):** Ebene 1 Klartext/Zustand/Handlung; Ebene 2
Ursachen/Beziehungen/Alternativen; Ebene 3 Rohdaten/Mappings/Historie/technische Nachweise;
bevorzugte Tiefe speicherbar; sicherheitskritische Warnungen bleiben immer sichtbar.

**Dok. 06 — Abschnitt „Mission Control & Morning Mission", Tabelle „Rollenvarianten"
(Slice 5, normativ):**

| Rolle | Missionsfokus | Ausblendung |
|---|---|---|
| Executive | Freigaben, Top-Risiken, Zielabweichung, Investition | Operative Taskdetails |
| ISMS Manager | Risiken, Maßnahmen, Evidence, Reviews, Datenlücken | Portfolio-/Umsatzsicht |
| Consultant | Mandantenpriorität, Audits, Deliverables, Kapazität, Reise | Unbegründete Vertriebsimpulse |
| Service Lead | SLA, Eskalationen, Qualität, Auslastung, Profitabilität | Objektdetails ohne Eskalationsbezug |

Nur diese vier sind normiert (übrige Rollen → Welt-Ableitung, O-WP020-03). Merksatz desselben
Abschnitts: Mission Control ist „kein aggregiertes Reporting-Dashboard" — DR-0009 präzisiert:
Ebene 1 neutral strategisch, Personalisierung als Verfeinerung.

**Dok. 06 — Abschnitt „Collaboration, Entscheidungen & Freigaben", Liste „Decision Card –
Pflichtfelder" (Slice 5, die ZWEITE Liste, O-WP017-11):** Entscheidungsfrage und Frist ·
Optionen einschließlich Nichtstun · Business-/Zielwirkung und Risiken · Kosten-, Zeit- und
Kapazitätsannahmen · Datenquellen, Lücken und Vertrauensgrad · Empfehlung und Gegenargument ·
Entscheider, Vertretung und Freigabestufe · Review-Datum und Erfolgskriterium.
(Die Dok.-10-Liste mit 14 Feldern ist bereits auf `/entscheidungen` abgeglichen.)

**Dok. 06 — Abschnitt „Sonder-, Fehler- und Vertrauenszustände", Absatz „Trust Layer"
(Slice 5, acht Angaben):** Herkunft · letzter Datenzeitpunkt · Vollständigkeit ·
widersprüchliche Quellen · Modell-/Regelversion · Annahmen · menschliche Reviews ·
Auswirkung von Datenlücken.

**Dok. 06 — Leitplanken für Slice 4:** „Bewusst vermiedene Muster": Dashboard-/Ampelwände
ohne erkennbare nächste Entscheidung; unerklärte Scores. „Visuelles Designsystem": Status =
Text + Symbol/Form + optional Farbe; Navy Struktur, Teal aktive Orientierung, Warnfarben
sparsam. „Datenvisualisierung …": jedes Diagramm beantwortet eine benannte Frage und nennt
Scope + Datenstand. Globale Akzeptanz: „Keine kritische Bewertung ist nur Farbe oder
unerklärter Score." Dok. 10, Abschnitt „Portfolio Mission Control": „Eine Ampelfarbe ohne
Erklärung ist unzulässig."

**Dok. 06 — Abschnitt „Suche, Benachrichtigungen & Wiederaufnahme":** „vertrauliche Treffer
werden nicht über Snippets geleakt" — **nicht bauen**, nur als O-WP020-05 registrieren.

**Dok. 03 — Abschnitt „Kanonisches Rollenmodell" (Slice 2, Punkt 9 — PDF-Wortlaut Spalte
„Kernverantwortung", vor Übernahme gegenlesen):**
R01 Strategische Entscheidungen, Risikoakzeptanz, Budget und Managementkommunikation ·
R02 Sicherheitssteuerung, Eskalation, Prioritäten und Managementübersetzung ·
R03 Operativer ISMS-Betrieb, Koordination, Reviews, Maßnahmen und Nachweise ·
R04 Geschäftsauswirkung, Schutzbedarf, Priorität und Risikoentscheidung ·
R05 Umsetzung und Wirksamkeit konkreter Assets oder Controls ·
R06 Nachweise, Statusupdates und fachliche Zuarbeit ·
R07 Prüfung, Stichprobe, Feststellung und Nachvollziehbarkeit ·
R08 Serviceportfolio, Qualität, Kapazität, Profitabilität und Eskalation ·
R09 Mandantenbeziehung, Scope, Termine, Entscheidungen und Delivery-Steuerung ·
R10 Analyse, Moderation, Maßnahmensteuerung, Reporting und Beratung ·
R11 Spezialanalyse etwa Cloud, IAM, BCM, Supplier Risk oder Threats ·
R12 Nutzer, Rollen, Konfiguration, Integrationen und Betriebsfähigkeit.

**Dok. 07 (Slice 6, nur CCP):** Abschnitt „Beziehungen als erstklassige Daten": Beziehung =
„versionierter fachlicher Datensatz mit Quelle, Ziel, Typ, Richtung, Gültigkeit, Herkunft,
Status, Vertrauen und ggf. Owner" — **kein `weight`, keine `effectiveness_assumption`**.
Abschnitt „Herkunft, Datenqualität und Vertrauen" + 07-D10 (Dimensionen einzeln sichtbar).

## 4. Code-Landkarte (Ist-Zustand `apps/web`)

| Bereich | Datei(en) | Relevanz |
|---|---|---|
| Orte/Navigation | `apps/web/lib/shell/places.ts` | `NAV_PLACES`, `live: true`-Orte: heute, kunden(/twin), isms, entscheidungen, services. Wächter-Meta-Assertions hängen daran |
| Rollen | `apps/web/lib/shell/roles.ts` | R01–R12 + Welten; `responsibility`-Strings = Punkt 9; `worldForRole` |
| Session | `apps/web/lib/shell/session.ts` | `SESSION_STORAGE_KEY = 'isms-demo-session-v1'`; `DemoSession { roleId, tenantId }` — **roleId wird optional** (Slice 2); `parseSession` verwirft heute Sessions mit unbekannter Rolle |
| Login | `apps/web/app/login/page.tsx`, `apps/web/components/shell/LoginForm.tsx` | Rollenwahl (radiogroups je Welt) + Mandanten-Select → Rollenwahl entfernen |
| Shell/Topbar | `apps/web/components/shell/AppShell.tsx`, `SessionProvider.tsx`, `Topbar.tsx`, `ShellNav.tsx` | Topbar trägt Rolle-/Mandant-Selects (heute stiller Wechsel — Slice 1) und wird Ort der Rollenwahl (Slice 2) |
| Heute | `apps/web/app/(shell)/heute/page.tsx`, `components/shell/HeuteView.tsx`, `MissionControlContent.tsx`, `lib/heute/data.ts`, `lib/heute/framing.ts` | WP-016-Stand: vier Abschnitte, react-freie Ableitung, Rollen-Rahmung nur Reihenfolge. Wird Ebene-1-Dashboard (Slices 3/4) |
| ISMS | `components/isms/IsmsContent.tsx` u. a., `lib/isms/data.ts` | Kandidat für Abdeckungsbalken (Controls↔Nachweis) |
| Entscheidungen | `components/entscheidungen/EntscheidungenContent.tsx`, `lib/entscheidungen/data.ts` | trägt den 14-Felder-Abgleich (Dok. 10) — Zweitliste ergänzen (Slice 5) |
| Objekt-360 | `components/twin/ObjectDetailView.tsx`, `lib/twin/object-detail.ts` | „Datenvertrauen"-Anzeige → Trust-Layer-Abgleich (Slice 5); Ebene-3-Ziel der Drill-downs |
| Styles | `apps/web/app/globals.css` | bestehendes CSS-Vokabular (`tw-*`, `shell-*`, `login-*`) — kein neues Designsystem |
| QA-Skript | `qa/`-Verzeichnis in `apps/web` (WP-018; setzt Session direkt via localStorage, Default R01/tenant-nordwerk) | **im selben Pass ans neue Session-Format anpassen** (AC 8) |

**Wächter/Tests, die dieses WP berühren (Regel erhalten, nie abschwächen):**

- `components/__tests__/leerzustand-mandantengrenze.test.tsx` — neue leere Orte/Zustände
  eintragen; Leerzustände sind die Leak-Versuchungsstelle (Briefing §7 Lektion 12).
- `components/__tests__/prozessvokabular.test.tsx` — Meta-Assertion gegen `live: true`-Orte;
  verbotene Muster (WP-Kennungen etc.) im Produkttext.
- `components/shell/__tests__/mission-control.test.tsx` — Rollen-Gleichheitstest („alle zwölf
  Rollen sehen dieselben Daten") wird in Slice 5 **kontrolliert** auf „dieselben Daten
  erreichbar + dokumentierte Betonung/Ausblendung" umgestellt.
- `app/(shell)/twin/[tenantId]/objekt/__tests__/route.test.ts` — Tenant-Isolation im Routing
  (mandantenfremde ID == unbekannte ID) — muss unverändert grün bleiben.
- Testzahl vor WP-020: **448 grün** (api 2 · contracts 55 · demo-seed 54 · web 318 · db 19).

## 5. Belegte Datenbasis für die Dashboard-Schicht (Slice 4)

Seed 1.2.0: **43 Objekte / 62 Beziehungen** — Nordwerk 34/51, Consulting Operator 9/11,
**Finovia 0/0, MediCore 0/0** (leere Mandanten = ehrliche Datenlücken-Kachel).
Referenz: `python scripts/seed_facts.py` (nachrechnen, nie abschreiben — Lektion 6).

Belegte Träger (Feldnamen vor Nutzung in `@isms/contracts` verifizieren):

- Envelope: `lifecycle_status`, `owner_ids`, `scope_ids`, `valid_time`/`record_time`,
  `quality_state` (Dimensionen; `confidence_indicator` ist im Seed NICHT gesetzt —
  O-WP014-02, nicht berechnen), `classification`.
- Kanten: Typ (R01–R25), Richtung, `confidence` (belegt, wird im Twin-Explorer gezeigt),
  Gültigkeit. Für Abdeckungen: **R15 `evidences`** (Nachweis→Control/Maßnahme/Entscheidung),
  **R12 `mitigates`** (Control/Maßnahme→Risiko), **R03 `owns`**.
- Bereits gebaute Ableitungen wiederverwenden: `lib/heute/data.ts` (Zählungen, Wellen,
  Beobachtungen), `lib/isms/data.ts` (Risiko/Control/Nachweis-Stände),
  `lib/services/data.ts` (SLA/Deliverables), `lib/entscheidungen/data.ts` (Register,
  Ablösekette).

**Nicht existent (⇒ keine Kachel, sondern benannte Lücke):** Risiko-Level, Reifegrade,
KPI-/Zielwerte, Trends, Fristen, Aufgaben (`Task`), Freigaben/Approver, Besuchszeitpunkt
(„seit letztem Besuch", O-WP016-02), Vertretung, Vertraulichkeits-/Exportrestriktion auf
Mandantenebene (O-WP016-08).

## 6. Ehrlichkeits- und Gestaltungsregeln (kompakt)

1. Jede Zahl aus dem Seed abgeleitet, react-frei, getestet; nichts hartkodiert.
2. Jede Kachel: benannte Frage + Scope + Datenstand + Ermittlungsregel + Drill-down.
3. Ampel-Badges nur auf erfassten Zuständen (Positivliste im Code); nie nur Farbe
   (Farbe + Form + Text, 06-D11); `prefers-reduced-motion` respektieren.
4. Lebenszyklus-Stand ist kein Prüfergebnis (08-D07-Glosse an Verteilungen).
5. Datenlücken sind ein Ergebnis (leere Mandanten, fehlende Träger) — zeigen, nicht kaschieren.
6. Verdichtung ist Umordnung: WP-016-Inhalte wandern in Ebene 2/3, gehen nicht verloren.
7. Loading/Empty/Error/Partial-Zustände gestalten (`.claude/rules/frontend.md`, Dok. 06
   Abschnitt „Erlebnisfluss & UI-Zustände").
8. Minimal beginnen und per `qa:visual` zeigen (DR-0003-Lektion, DR-0008 Nr. 4) — Stil
   „nicht absolut übertrieben"; große Gestaltung gehört in WP-025.
9. Keine Prozesskennungen im Produkttext (Wächter); keine erfundenen Übersetzungen (`null`).
10. FINDING-0008-Strukturen (`<dl role="group">` auf /heute, /entscheidungen, Objekt-360)
    nur dort verbessern, wo der Umbau sie ohnehin neu baut; per axe belegen.

## 7. Relevante offene Fragen und Findings (nicht neu lösen, referenzieren)

- **O-WP016-01** (Rollen-Reihenfolge nur je Welt normiert) → Muster für O-WP020-03.
- **O-WP016-02** („seit letztem Besuch" ohne Träger) → Ebene 1 behauptet keine Deltas.
- **O-WP016-08** (Vertrauensgrad/Version querschnittlich ohne Mandantenwert) → Context Bar.
- **O-WP017-11** (zwei widersprüchliche Decision-Card-Listen) → Slice 5 zeigt beide, ohne zu
  entscheiden.
- **O-WP014-02** (`confidence_indicator` nicht gesetzt, nicht berechnen).
- **O-KUNDE-02** (Login bleibt beschriftete Simulation).
- **FINDING-0004** (kein DB→UI), **FINDING-0008** (s. o.), **FINDING-0007/Regel Null**.

## 8. Kommandos

```bash
pnpm install
pnpm lint && pnpm typecheck && pnpm build
pnpm --filter @isms/web exec vitest run          # frisch, ohne Turbo-Cache
python scripts/validate_handoff.py
python scripts/seed_facts.py                     # kanonische Seed-Zahlen
python scripts/pdf_text.py 06 --suche "Seitenbausteine"   # Regel Null
pnpm --filter @isms/web dev                      # http://localhost:3000/login
pnpm qa:visual WP-020                            # Screenshots + axe → docs/project/visual/WP-020/
```

**Nie:** `pnpm build` bei laufendem Dev-Server (Lektion 10; qa:visual nutzt `.next-qa`/Port
3100). Der Builder committet nie selbst; nach jedem Slice übergibt er an den Orchestrator.
