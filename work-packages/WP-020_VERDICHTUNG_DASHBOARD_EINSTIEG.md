# WP-020 – Verdichtungs-Umbau, Dashboard-Schicht aus belegten Daten, neuer Einstiegsfluss (DR-0008/DR-0009)

## Identität

- **Phase:** 1/2 (Demo Foundation, Produktoberfläche; kein Persistenz-/Auth-Bau)
- **Priorität:** P1 (Queue: **Next**; Owner-gesteuert nach der Live-Ansicht vom 2026-07-23 —
  DR-0008 „Umsetzungspfad" Zeile WP-020, DR-0009 „Umsetzung: Teil von WP-020")
- **Status:** Draft (Aktivierung durch Orchestrator)
- **Risk Class:** **Medium** — read-only und synthetisch, aber: (a) der Sicherheits-Slice berührt
  die sichtbare Mandantengrenze (Dok. 06, Kasten **CROSS-TENANT-SCHUTZ** unter „Sichtbarer
  Kontext"), (b) der Einstiegsfluss ändert das Session-Format, an dem `pnpm qa:visual` und
  mehrere Wächtertests hängen, (c) die Dashboard-Schicht arbeitet direkt an der
  Ehrlichkeitsgrenze aus DR-0008 (keine von der UI errechnete oder behauptete Bewertung).
- **Builder:** **ein** Builder (`frontend-engineer`) für die Slices 1–5 — alles berührt
  `apps/web`, Parallelbau wäre ein Writer-Konflikt (Briefing §3). Slices **strikt sequenziell**;
  der Builder **committet nie selbst** (Briefing §2), der Orchestrator committet je Slice.
  **Slice 6 (CCP-Auftrag) baut kein Produkt** und geht an `concept-author`
  (Schreibbereich nur `research/change-proposals/` — laut Briefing §3 parallel zulässig).
- **Reviewer/Gates (risikobasiert nach Dok. 20B §36 / FINDING-0006):**
  - **Code Quality:** `code-reviewer` (immer),
  - **Product:** `product-user-lead` (immer — dieses WP ist ein Produktoberflächen-Umbau),
  - **Domain:** `isms-domain-lead` — fachlicher ISMS-Inhalt ist da (Lebenszyklus-Verteilungen,
    Abdeckungen Control↔Nachweis, Risiko-Kacheln, 08-D07-Grenze),
  - **QA:** `qa-test-engineer` — neue und umgebaute Tests (Session-Format, Wächter-Erweiterung,
    Rollenvarianten-Test),
  - **Security & Privacy:** `product-security-privacy` — **Pflicht** wegen Slice 1
    (Mandantengrenze/sichtbarer Kontext) und wegen des Session-Umbaus,
  - **Konzepttreue:** `concept-consistency-reviewer` — dieses WP setzt Dok. 06 um; jedes Zitat
    wird am PDF geprüft (Regel Null),
  - Builder ≠ Reviewer; der Builder schließt kein Finding selbst (Dok. 20B §31.3); nach dem
    Fix-Pass eine **zweite Runde** derselben Reviewer (Briefing §2 — hat bisher jedes Mal eine
    vom Fix erzeugte Regression gefunden).
- **Human Gates:**
  - **Keine neue Freigabe nötig zum Start** — DR-0008 und DR-0009 sind die Owner-Freigaben.
  - **Owner-Stil-Abnahme je Stufe** (DR-0008 Nr. 4: „iterativ bauen, jede Stufe per `qa:visual`
    zeigen, bis der Owner sagt ‚das ist jetzt okay'"). Die Abnahme ist Teil dieses WP; größere
    Gestaltungswünsche wandern in WP-025 (Design-Exploration), nicht in Scope-Drift.
  - **Slice 6 erzeugt ein Human Gate** (Change Proposal zu Contract-Feldern, E-02-Umfeld) —
    es wird in diesem WP **nur erstellt, nie umgesetzt**.
- **Abhängigkeiten:** WP-019 ✓ (quellentreue Fassungen Dok. 03–07 + Nachtrag mit der
  11-Punkte-Übergabeliste), WP-018 ✓ (`pnpm qa:visual`, Wächter, Linter), WP-016/WP-017 ✓
  (Bestand von `/heute` und `/entscheidungen`), DR-0008, DR-0009, DR-0006 (Regel Null),
  DR-0005 (Konzeptfehler benennen statt füllen), DR-0003 (wird durch DR-0008 **kontrolliert**
  abgelöst — nicht still).

## Ziel

Drei Owner-Aufträge und die aus WP-019 übergebenen Korrekturpunkte werden in **einem**
Oberflächen-WP umgesetzt:

1. **Cross-Tenant-Schutz und vollständiger sichtbarer Kontext** (Dok. 06, Abschnitt
   „Sichtbarer Kontext" mit Kasten **CROSS-TENANT-SCHUTZ**) — als Sicherheits-Slice **vorweg**.
2. **Verdichtungs-Umbau nach Dok. 06:** Detailtiefe-Ebenen (Abschnitt „Detailtiefe"),
   die neun Pflicht-Seitenbausteine (Abschnitt „Verbindliche Seitenbausteine"), die
   Rollenvarianten der Mission Control (Abschnitt „Mission Control & Morning Mission",
   normative Tabelle „Rollenvarianten").
3. **Erste Dashboard-Schicht aus belegten Daten** (DR-0008): Statuskacheln,
   Lebenszyklus-Verteilungen, Abdeckungsbalken, Ampel-Badges auf **erfassten** Zuständen —
   je mit Drill-down. Die UI errechnet oder behauptet **keine** Bewertung, die im Datenbestand
   nicht existiert.
4. **Neuer Einstiegsfluss nach DR-0009:** Anmelden (Mandant) → neutrales strategisches
   Main-Dashboard (Ebene 1) → Rollenwahl **in der App** (optional, jederzeit) →
   Personalisierung. Die Rollenwahl zieht von `/login` in die App um.

**Bekannte, benannte Abweichung (keine stille Auflösung):** Dok. 06 nennt Mission Control
„kein aggregiertes Reporting-Dashboard, sondern ein rollenspezifischer Arbeitsplatz"
(Abschnitt „Mission Control & Morning Mission") und 06-D02 einen rollenabhängigen
Standard-Startpunkt; der Abschnitt „Onboarding, adaptive Komplexität & Hilfe" lässt den
Einstieg „nach Rolle, Ziel und aktueller Aufgabe" fragen. **DR-0009 ist die Owner-Entscheidung
der Schicht 2 und geht vor** — die Ebene 1 wird rollenneutral strategisch, Personalisierung
wird Verfeinerung statt Voraussetzung. DR-0009 benennt die Abweichung selbst und verlangt bei
abweichender Konzeptpflege ein Change Proposal; siehe O-WP020-08/-09 unten.

## Verbleib der 11 Übergabepunkte aus dem WP-019-Nachtrag

Quelle: `docs/concept/abgleich/NACHTRAG_WP-019_2026-07-23.md`, Abschnitt
„Übergabeliste an WP-020".

| # | Punkt | Verbleib | Wo |
|---|---|---|---|
| 1 | Dok. 06 „Verbindliche Seitenbausteine" (neun Bausteine) | **in-scope** | Slice 3 |
| 2 | „Sichtbarer Kontext" vollständig + CROSS-TENANT-SCHUTZ | **in-scope** | Slice 1 |
| 3 | „Rollenwechsel": kritische Aktionen speichern die aktive Rolle mit | **teilweise**: im read-only-Produkt existiert keine kritische Aktion — die Regel wird als verbindlicher Anker für jedes künftige Schreib-WP festgehalten (O-WP020-04), der Rollenwahl-Mechanismus wird darauf vorbereitet dokumentiert | Slice 1 (Verankerung) |
| 4 | Rollenvarianten-Ausblendungen der Mission Control (normative Tabelle) | **in-scope** — WP-016 wird an der Tabelle gemessen, Ausblendung/Betonung so weit Datenträger existieren, Rest benannt | Slice 5 |
| 5 | Zweite Decision-Card-Pflichtfeldliste (Dok. 06 „Collaboration, Entscheidungen & Freigaben") | **in-scope** — Feldabgleich auf `/entscheidungen` ergänzen (O-WP017-11) | Slice 5 |
| 6 | Snippet-Leak-Schutz der globalen Suche | **deferred, benannt** — es existiert keine Suche; die Anforderung wird als Pflicht-AC des künftigen Such-WP registriert (O-WP020-05). Eine Suche „nebenbei" zu bauen wäre Scope-Drift | O-WP020-05 |
| 7 | Trust-Layer-Feldliste (8 Angaben, Abschnitt „Sonder-, Fehler- und Vertrauenszustände") | **in-scope** — bestehende Trust-/Datenqualitätsanzeigen dagegen abgleichen, fehlende Träger benennen statt füllen | Slice 5 |
| 8 | `weight`/`effectiveness_assumption` in `contracts`/`db` nicht PDF-gedeckt; „Herkunft" als eigenes Konzept prüfen | **nur Change-Proposal-Auftrag** (Human Gate, E-02-Umfeld) — **kein Bau, kein Contract-Umbau** in diesem WP | Slice 6 |
| 9 | `roles.ts`-`responsibility`-Strings sind gekürzte Alt-Fassungen | **in-scope** — auf den PDF-Wortlaut der Spalte „Kernverantwortung" (Dok. 03 „Kanonisches Rollenmodell") bringen | Slice 2 |
| 10 | Dok. 04 Journey-Zustandsmaschine (8 Zustände + Übergänge), sechs Handlungsoptionen, drei Betroffenheitsgrade fehlen in `packages/` | **deferred in ein benanntes Folge-WP** (Vorschlag: „WP-026 Dok.-04-Steuerungsvokabular in den Contracts"). Begründung: (a) Contract-/`packages/`-Umbau ist explizites Nicht-Ziel dieses WP, (b) es gäbe in WP-020 keinen UI-Konsumenten — eine Zustandsmaschine ohne Journeys wäre toter Code, (c) sie hängt fachlich an den fehlenden `Task`-/Decision-Trägern (O-WP016-03, O-WP017-01), die ihrerseits am E-02-Human-Gate hängen, (d) ein Builder, ein Modul (Briefing §3). Der Orchestrator trägt das Folge-WP in die Queue ein | Queue (Folge-WP) |
| 11 | `PROJECT_UNDERSTANDING.md` historisch markieren | **erledigt** — geprüft: die Datei liegt unter `docs/project/archive/PROJECT_UNDERSTANDING.md`, `CURRENT_STATE.md` führt sie als „(historisch) … nicht autoritativ", der WP-019-Eintrag bestätigt „historisch markiert und archiviert". Kein neuer Scope | — |

## Nicht-Ziele

- **Kein Contract-/Seed-Umbau** (`packages/contracts`, `packages/demo-seed`, `packages/db`
  bleiben unverändert; einzige Ausnahme: keine — auch Punkt 8 ist nur ein Proposal-Text).
  Synthetische Bewertungsdaten (Risiko-Level, KPI-Werte, Trust-States) kommen erst mit
  **WP-021** (DR-0008 „Umsetzungspfad").
- **Keine Bewertungs-/Aggregationslogik nach Dok. 09/10** (Reifegrade, Scores, KPI-Verträge,
  Priorisierung, Simulationen) — erst nachdem Dok. 09 am PDF gegengelesen/nachgezogen ist
  (DR-0008; Dok. 09/10 gehören zu den 14 material abweichenden Fassungen, WP-023).
- **Keine Morning Mission und keine Decision Card** — die Datenträger fehlen weiterhin
  (O-WP016-03/-04, O-WP017-01/-02); die Lücken bleiben im Produkt benannt.
- **Keine globale Suche** (Punkt 6 → O-WP020-05, eigenes WP trotz 06-D09).
- **Keine echte Authentisierung** — der Login bleibt beschriftete Simulation (O-KUNDE-02,
  Dok. 19 folgt als eigenes WP).
- **Keine DB→UI-Anbindung** (FINDING-0004 RLS zuerst; O-WP014-09).
- **Keine Demo-Welt-Erweiterung** (fünf Unternehmen, neun Accounts = WP-021) und
  **keine Kundenwelt** (WP-006).
- **Keine Design-Exploration** — Stilvarianten sind WP-025; hier gilt die Stilleitplanke
  „nicht absolut übertrieben" (DR-0008 Nr. 3) auf dem bestehenden CSS-Vokabular. Farbwelt
  nach Dok. 06 „Visuelles Designsystem": Navy für Struktur, Teal für aktive Orientierung,
  Warnfarben sparsam.
- **Kein pauschales A11y-Sanierungs-WP:** FINDING-0008 (`<dl role="group">`) wird **nur dort**
  behoben, wo der Verdichtungs-Umbau die betroffene Struktur ohnehin neu baut — dann per
  axe-Lauf belegt und im Review ausgewiesen; alles Übrige bleibt beim Folge-WP mit
  Product Gate.
- **Keine erfundene Bewertung, kein erfundener Schwellenwert, keine erfundene Übersetzung,
  keine erfundene Vertretungs-/Vertraulichkeitsangabe** — fehlende Träger werden benannt
  (DR-0005).

## Scope

### Slice 1 – Cross-Tenant-Schutz & vollständiger sichtbarer Kontext (Sicherheits-Slice, zuerst)

Quelle (Regel Null, am PDF gegenlesen): Dok. 06, Abschnitt **„Sichtbarer Kontext"** mit den
sechs Kontextelementen (aktiver Mandant/Organisationseinheit; aktive Produktrolle und zeitlich
begrenzte Vertretung; Scope/Objektkontext; Datenstand/letzter Synchronisationszeitpunkt;
Vertraulichkeitsstufe und Exportrestriktion; Vertrauensgrad bei abgeleiteten Aussagen) und dem
Kasten **CROSS-TENANT-SCHUTZ** („Ein Wechsel zwischen Mandanten benötigt eine klare visuelle
Kontextänderung. Entwürfe, Uploads und Freigaben dürfen nicht still in einen anderen Mandanten
übernommen werden."); Abschnitt „Globale Akzeptanzkriterien" („Cross-Tenant-Fehlaktionen
werden visuell und technisch verhindert"); 06-D04.

Umsetzung:

- **Mandantenwechsel mit klarer visueller Kontextänderung:** Der heutige stille
  `<select>`-Wechsel in der Topbar (`components/shell/Topbar.tsx`) wird so umgebaut, dass der
  Wechsel eine **unübersehbare, angekündigte Kontextänderung** erzeugt (z. B. expliziter
  Bestätigungsschritt und/oder deutliche, benannte Umschalt-Rückmeldung mit Mandantenname —
  Gestaltung Builder-Entscheidung, minimal beginnen, DR-0003-Lektion). Nie nur Farbe
  (06-D11). Gleiches Prinzip für den Rollenwechsel (sichtbarer Moduswechsel, Abschnitt
  „Rollenwechsel").
- **Kontextleiste vervollständigen:** Die Context Bar der Hauptseiten zeigt die sechs
  Kontextelemente **so weit belegt**; Vertretung, Vertraulichkeitsstufe/Exportrestriktion und
  Vertrauensgrad haben im heutigen Datenbestand **keinen Mandanten-Träger** und erscheinen als
  **benannte Datenlücke** statt als erfundener Wert (Muster O-WP016-08 — vorhandene offene
  Frage dort referenzieren, nicht duplizieren).
- **„Kritische Aktionen speichern die aktive Rolle mit"** (Abschnitt „Rollenwechsel"): im
  read-only-Produkt gibt es keine kritische Aktion. Die Regel wird als **O-WP020-04**
  registriert und als Pflicht-Anker für jedes künftige Schreib-WP formuliert; der neue
  Rollenwahl-Mechanismus (Slice 2) dokumentiert im Code, dass eine künftige Aktion die aktive
  Rolle mitschreiben muss.
- **Wächter erweitern:** `components/__tests__/leerzustand-mandantengrenze.test.tsx` deckt
  alle neuen/umgebauten leeren Zustände ab; ein **Negativbeweis** zeigt, dass die neue
  Kontextänderung bei Mandantenwechsel wirklich erscheint und dass kein Zustand des alten
  Mandanten (Auswahl, Filter, offene Detailansicht fremder Objekte) still in den neuen
  übernommen wird — so weit der read-only-Stand das trägt, Rest benannt.

### Slice 2 – Einstiegsfluss nach DR-0009 (Mandant zuerst, Rolle in der App)

Quellen: DR-0009 Entscheidung 1; Dok. 06 06-D02 (benannte Abweichung, s. o.); Dok. 03,
Abschnitt **„Kanonisches Rollenmodell"** (PDF-Wortlaut Spalte „Kernverantwortung" für Punkt 9).

Umsetzung:

- **`/login` fragt nur noch den Mandanten** (Simulation, weiterhin klar beschriftet). Die
  Rollenwahl verschwindet von `/login`.
- **Session erlaubt einen rollenlosen Zustand** („neutral"): `lib/shell/session.ts` wird so
  erweitert, dass `roleId` optional ist. **Achtung Ripple:** Der Speicherschlüssel ist
  versioniert (`isms-demo-session-v1`); Formatänderung entweder abwärtskompatibel parsen oder
  Schlüssel auf `v2` heben — Entscheidung des Builders, im Code begründet. **Im selben Pass**
  anpassen: das `qa:visual`-Skript (setzt die Session direkt per localStorage, WP-018 AC 11),
  alle Tests, die eine Session mit Rolle voraussetzen.
- **Nach der Anmeldung landet der Nutzer auf `/heute` in der neutralen Ebene 1** (Slice 3
  liefert deren Inhalt; bis dahin rendert `/heute` rollenlos in kanonischer Reihenfolge ohne
  Welt-Leitfrage).
- **Rollenwahl in der App:** jederzeit über die Topbar (bestehender Wechsler, um „keine
  Rolle/neutral" ergänzt) plus ein **Erstbesuchs-Hinweis** auf der neutralen Ebene 1
  („Rolle wählen, um Betonung und Reihenfolge zu personalisieren" — sinngemäß, Klartext,
  optional, kein erzwungener Rundgang; Dok. 04 J01 „Kein erzwungener Rundgang").
- **Punkt 9:** die zwölf `responsibility`-Strings in `lib/shell/roles.ts` werden auf den
  **PDF-Wortlaut** der Spalte „Kernverantwortung" gebracht (Dok. 03, Abschnitt „Kanonisches
  Rollenmodell"); IDs, Namen, Sphären stimmen bereits.
- **Zukunftssicherheit dokumentieren** (DR-0009): in Produktion kommt die Rolle aus dem Konto;
  die freie Wahl bleibt Demo-Eigenschaft — als Code-Kommentar an der Rollenwahl verankern.

### Slice 3 – Verdichtungs-Gerüst: Detailtiefe-Ebenen & Pflicht-Seitenbausteine

Quellen: Dok. 06, Abschnitt **„Detailtiefe"** („Ebene 1 zeigt Klartext, Zustand und Handlung.
Ebene 2 öffnet Ursachen, Beziehungen und Alternativen. Ebene 3 zeigt Rohdaten, Mappings,
Historie und technische Nachweise. Nutzer können eine bevorzugte Tiefe speichern;
sicherheitskritische Warnungen bleiben jedoch immer sichtbar."), Abschnitt **„Verbindliche
Seitenbausteine"** (neun Bausteine: Question Header, Context Bar, Summary/Pulse, Relationship
Panel, Impact Panel, Decision Card, Action Rail, History/Decision Record, Trust Layer),
06-D03, 06-D07 (progressive Offenlegung), P06.

Umsetzung:

- **`/heute` wird die strategische Ebene 1** (DR-0009): verdichteter Klartext-Zustand des
  Mandanten statt der heutigen langen Zähllisten; die bestehenden Abschnitte („Erfassungswellen",
  Beobachtungen, Einstiege) wandern in **Ebene 2/3** (aufklappbare/verlinkte Tiefe), nichts
  wird gelöscht — **Verdichtung ist Umordnung, kein Informationsverlust**.
- **Seitenbausteine als gemeinsame Konvention auf den sechs Live-Orten** (`/heute`, `/twin`,
  `/isms`, `/services`, `/entscheidungen`, Objekt-360): jede Seite ordnet ihren Bestand den
  neun Bausteinen zu. Bausteine **mit** Träger werden als solche erkennbar strukturiert
  (Question Header und Context Bar existieren überall; Relationship Panel/History auf
  Objekt-360; Summary/Pulse neu auf `/heute`). Bausteine **ohne** Träger (Decision Card,
  Action Rail im read-only-Produkt, Impact Panel ohne Wirkungsdaten, Trust Layer ohne
  Modell-/Reviewdaten) erscheinen **nicht als leere Attrappe**, sondern die Seite benennt an
  einer Stelle ehrlich, welche Bausteine der Datenbestand (noch) nicht trägt — Muster des
  WP-016-Ehrlichkeitsblocks.
- **Bevorzugte Tiefe speichern:** lokale, pro Nutzer/Gerät gespeicherte Voreinstellung
  (localStorage, versionierter Schlüssel); es existieren derzeit keine sicherheitskritischen
  Warnungen, die eine Tiefe unterdrücken könnte — im Code als Invariante dokumentiert.
- **Zählungskonflikt benennen:** 06-D03 spricht von „fünfteiliger Seitenanatomie", der
  Abschnitt „Verbindliche Seitenbausteine" führt neun Bausteine, die Abbildung des
  §-6-Einstiegs ist im Textlayer nicht lesbar → **O-WP020-02**, nicht still harmonisieren.

### Slice 4 – Dashboard-Schicht aus belegten Daten (DR-0008)

Quellen: DR-0008 Nr. 1–3 (wörtlich: „Statuskacheln, Lebenszyklus-Verteilungen,
Abdeckungsbalken, Ampel-Badges auf erfassten Zuständen — je mit Drill-down"); Dok. 06,
Abschnitte „Zwölf verbindliche Designprinzipien" (P04 Ursache vor Score), „Bewusst vermiedene
Muster" („Dashboard- oder Ampelwände ohne erkennbare nächste Entscheidung"),
„Visuelles Designsystem" (Status = Text + Symbol/Form + optional Farbe),
„Datenvisualisierung, Accessibility & Responsive Design" (jedes Diagramm beantwortet eine
benannte Frage und nennt Scope sowie Datenstand), „Globale Akzeptanzkriterien" („Keine
kritische Bewertung ist nur Farbe oder unerklärter Score"); Dok. 10, Abschnitt „Portfolio
Mission Control" („Eine Ampelfarbe ohne Erklärung ist unzulässig") als Leitplanke; Dok. 08
08-D07 (Lebenszyklus-Stand ist kein Prüfergebnis).

**Belegte Datenbasis (heutiger Seed, 43 Objekte / 62 Beziehungen — per
`python scripts/seed_facts.py` verifizieren, nie abschreiben):**

- Objekt-/Kantenzählungen je Familie, Typ, Mandant (heute schon auf `/heute`),
- `lifecycle_status` je Objekt → **Verteilungen** (mit sichtbarer 08-D07-Glosse:
  Lebenszyklus-Stand, kein Prüfergebnis),
- **Abdeckungen** aus Kanten: Controls mit/ohne Nachweis-Kante (R15 `evidences`), Risiken
  mit/ohne mitigierende Control (R12 `mitigates`), Objekte mit/ohne benannten Owner
  (`owner_ids`/R03) — Form „x von y", nie Prozent-Score ohne Grundgesamtheit,
- Kanten-**Vertrauensgrade** (belegtes `confidence`-Feld) und belegte
  `quality_state`-Dimensionen (Feldnamen am Contract verifizieren, nicht raten),
- Erfassungswellen (`record_time`) und **Datenlücken als Ergebnis**: Finovia/MediCore sind
  leer (0/0) — das wird eine ehrliche Kachel, kein Weglassen.

Umsetzung:

- Statuskacheln/Verteilungen/Abdeckungsbalken auf der neuen Ebene 1 von `/heute`
  (und, wo fachlich passend, auf `/isms`), **jede** Kachel mit: benannter Frage, Scope,
  Datenstand, sichtbarer Ermittlungsregel und **Drill-down** in Ebene 2/3 bzw. auf die
  Objektlisten/Objekt-360 (Dok. 09-Prinzip via DR-0008: „bis zu Ursachen, Datenquellen und
  Annahmen erklärbar").
- **Ampel-Badges nur auf erfassten Zuständen:** zulässig sind regelbasierte, in der UI
  offengelegte Zuordnungen auf belegte Fakten (z. B. „ohne Nachweis-Kante", „Kantenvertrauen:
  niedrig" — erfasster Feldwert, „Mandant ohne Datenbestand"). **Unzulässig:** jedes
  Urteil ohne erfasstes Datum (kein „Risiko hoch", kein Reifegrad, kein Trend, kein
  Zielwert — diese Daten existieren erst ab WP-021). Grenzfälle → **O-WP020-07**, nicht
  entscheiden.
- **Nie nur Farbe** (06-D11, DR-0008): Farbe + Form + Text; axe-Lauf als Beleg.
- Verdichtung ersetzt keine Wahrheit: jede Kachel-Zahl ist aus dem Seed abgeleitet
  (Muster `lib/heute/data.ts` — react-freie, deterministisch getestete Ableitung).

### Slice 5 – Rollenvarianten-Personalisierung & Konzeptabgleiche

Quellen: Dok. 06, Abschnitt **„Mission Control & Morning Mission"**, Tabelle
**„Rollenvarianten"** (normativ: Executive — Fokus Freigaben/Top-Risiken/Zielabweichung/
Investition, blendet operative Taskdetails aus; ISMS Manager — Risiken/Maßnahmen/Evidence/
Reviews/Datenlücken, blendet Portfolio-/Umsatzsicht aus; Consultant — Mandantenpriorität/
Audits/Deliverables/Kapazität/Reise, blendet unbegründete Vertriebsimpulse aus; Service
Lead — SLA/Eskalationen/Qualität/Auslastung/Profitabilität, blendet Objektdetails ohne
Eskalationsbezug aus); Abschnitt „Collaboration, Entscheidungen & Freigaben", Liste
**„Decision Card – Pflichtfelder"** (acht Felder — die **zweite** Liste, O-WP017-11);
Abschnitt „Sonder-, Fehler- und Vertrauenszustände", Absatz **„Trust Layer"** (acht Angaben:
Herkunft, letzter Datenzeitpunkt, Vollständigkeit, widersprüchliche Quellen,
Modell-/Regelversion, Annahmen, menschliche Reviews, Auswirkung von Datenlücken).

Umsetzung:

- **Personalisierung nach Rollenwahl** (DR-0009: „Rolle verändert Betonung und Ausblendung,
  nicht die Wahrheit"): Nach Wahl einer Rolle ordnet/betont die Ebene 1 die Kacheln nach der
  normativen Tabelle **so weit Datenträger existieren** (ISMS Manager: Risiken/Maßnahmen/
  Nachweise/Datenlücken sind belegt; Service Lead: SLA/Deliverables aus der Service-Schicht;
  Executive: Risiko-Kacheln — Freigaben/Zielabweichung/Investition haben **keinen** Träger und
  werden als Lücke benannt). „Ausblendung" heißt: nicht auf Ebene 1 — über Drill-down bleibt
  alles erreichbar (P02/06-D05: eine Wahrheit; keine getrennten Dashboards, Designregel im
  Abschnitt „Rollenwechsel").
- **Normiert sind nur vier Rollen** — die Zuordnung der übrigen acht läuft über die
  Erlebniswelten (bestehendes Muster `lib/heute/framing.ts`, O-WP016-01) → **O-WP020-03**.
- **Bestehender Rollen-Gleichheitstest** (`mission-control.test.tsx`: alle zwölf Rollen sehen
  dieselben Daten) wird **kontrolliert** umgestellt: neue Invariante „dieselben Daten
  erreichbar (keine getrennte Wahrheit), dokumentierte Betonung/Ausblendung nur nach der
  normativen Tabelle bzw. Welt-Ableitung" — die Regel wird umgebaut, nicht gelöscht.
- **Feldabgleich `/entscheidungen`** um die zweite Decision-Card-Liste ergänzen: der sichtbare
  Abgleich (heute gegen die 14 Dok.-10-Felder) zeigt zusätzlich die acht Dok.-06-Felder samt
  Kennzeichnung des Widerspruchs beider Listen (O-WP017-11 bleibt offen — welche Liste
  kanonisch ist, entscheidet der Concept Author, nicht dieses WP).
- **Trust-Anzeigen-Abgleich:** die bestehenden Datenvertrauens-Anzeigen (Objekt-360
  „Datenvertrauen", Kanten-Vertrauensgrad) werden gegen die acht Trust-Layer-Angaben
  gestellt; belegte Angaben werden zugeordnet, unbelegte (Modell-/Regelversion, Annahmen,
  menschliche Reviews, Auswirkung von Datenlücken als berechnete Aussage) als **O-WP020-06**
  benannt statt gefüllt.

### Slice 6 – CCP-Auftrag „Beziehungs-Zusatzfelder" (Punkt 8; kein Bau)

Builder: `concept-author`, Schreibbereich **nur** `research/change-proposals/`.
Auftrag: Change Proposal (Nummer fortzählen, CCP-004 falls frei) zu dem Befund, dass
`weight` und `effectiveness_assumption` in `@isms/contracts`/`@isms/db` **nicht** durch
Dok. 07 gedeckt sind (PDF-Abschnitt **„Beziehungen als erstklassige Daten"**: Typ, Richtung,
Gültigkeit, Herkunft, Status, Vertrauen, ggf. Owner — kein Gewicht, keine
Wirksamkeitsannahme) und dass „Herkunft" als eigenes Konzept zu prüfen ist (Abschnitt
„Herkunft, Datenqualität und Vertrauen", 07-D10). Das Proposal enthält: Befund mit
PDF-Beleg, Optionen (Felder entfernen / als Erweiterung deklarieren / ins Konzept heben),
Empfehlung, Auswirkungsanalyse (Contracts, DB-Schema, Seed, Tests). **Human Gate: Owner.
Keine Umsetzung in diesem WP** — bis zur Entscheidung bleibt der Code unverändert.

## Acceptance Criteria

Jedes Kriterium nennt Kommando und erwartetes Ergebnis.

**Slice 1 – Cross-Tenant-Schutz & sichtbarer Kontext**

1. **Mandantenwechsel ist eine sichtbare Kontextänderung:** Ein Test in `apps/web` weist nach,
   dass der Wechsel des Mandanten in der Topbar nicht mehr still erfolgt (Bestätigung
   und/oder deutliche, benannte Rückmeldung mit altem und neuem Mandantennamen, Text + Form,
   nicht nur Farbe). `pnpm --filter @isms/web exec vitest run` grün.
2. **Kein stiller Zustandsübertrag:** Ein Negativbeweis zeigt, dass nach dem Mandantenwechsel
   kein mandantengebundener Anzeigezustand des vorherigen Mandanten weiterlebt (mindestens:
   Objekt-360 fremder Objekte bleibt wie bisher unerreichbar — bestehende Tests bleiben grün —
   und neue Ebenen-/Tiefen-Zustände aus Slice 3/4 werden beim Wechsel zurückgesetzt oder sind
   mandantenfrei; im Test dokumentiert, was read-only nicht prüfbar ist).
3. **Kontextleiste vollständig oder ehrlich:** Auf jeder Live-Hauptseite zeigt die Context Bar
   Mandant, Rolle (oder „neutral"), Scope-Bezug und Datenstand aus belegten Daten; Vertretung
   und Vertraulichkeit/Exportrestriktion erscheinen als benannte Datenlücke (Text vorhanden,
   per Test belegt, kein erfundener Wert).
4. **Wächter erweitert:** `leerzustand-mandantengrenze.test.tsx` umfasst alle neuen/umgebauten
   Leerzustände (Meta-Assertion gegen die `live: true`-Orte bleibt intakt); der
   Prozessvokabular-Wächter läuft grün über den umgebauten Stand.

**Slice 2 – Einstiegsfluss**

5. **`/login` fragt nur den Mandanten:** Der gerenderte Login enthält keine Rollenauswahl mehr
   und bleibt als Simulation beschriftet; per Test belegt.
6. **Neutraler Einstieg:** Nach Anmeldung ohne Rollenwahl rendert `/heute` vollständig
   (keine Fehl-/Leerseite), als neutrale strategische Ebene 1 gekennzeichnet, mit
   Erstbesuchs-Hinweis auf die Rollenwahl; per Test belegt.
7. **Rollenwahl in der App, jederzeit, reversibel:** Topbar erlaubt Wahl und Abwahl
   („neutral") der Rolle; die Wahl personalisiert (Slice 5), die Abwahl kehrt zur neutralen
   Ebene 1 zurück; per Test belegt.
8. **Session-Format sauber migriert:** `parseSession` verwirft keine gültige Alt-Session
   unbeabsichtigt und erfindet keine Rolle; das `qa:visual`-Skript setzt das neue Format und
   `pnpm qa:visual WP-020` läuft durch (Beleg: committete Artefakte). Schlüsselversionierung
   im Code begründet.
9. **Punkt 9 erledigt:** Die zwölf `responsibility`-Strings in `lib/shell/roles.ts` entsprechen
   wörtlich der PDF-Spalte „Kernverantwortung" (Dok. 03, Abschnitt „Kanonisches
   Rollenmodell"); der `concept-consistency-reviewer` prüft am PDF gegen.

**Slice 3 – Verdichtungs-Gerüst**

10. **Drei Ebenen auf `/heute`:** Ebene 1 zeigt verdichteten Klartext-Zustand + Kacheln
    (Slice 4); Ebene 2 öffnet Ursachen/Beziehungen (die heutigen Beobachtungen/Wellen);
    Ebene 3 führt zu Rohdaten (Objektlisten/Objekt-360). Kein Inhalt des WP-016-Stands geht
    verloren (Test: alle bisherigen Kernaussagen bleiben erreichbar).
11. **Bevorzugte Tiefe speicherbar:** Die gewählte Tiefe übersteht einen Reload (localStorage,
    versionierter Schlüssel); per Test belegt; Invariante „keine sicherheitskritische Warnung
    wird unterdrückt (es existiert keine)" ist im Code dokumentiert.
12. **Seitenbausteine-Konvention:** Für jeden der sechs Live-Orte existiert eine im Code
    dokumentierte Zuordnung Bestand → neun Bausteine; jede Seite benennt sichtbar, welche
    Bausteine der Datenbestand nicht trägt (keine leeren Attrappen); per Test je Ort belegt
    (mindestens: Kennzeichnung vorhanden, keine erfundenen Inhalte).

**Slice 4 – Dashboard-Schicht**

13. **Kacheln nur aus belegten Daten:** Jede Statuskachel/Verteilung/Abdeckung entsteht in
    einer react-freien Ableitung (Muster `lib/heute/data.ts`) ausschließlich aus Seed-Feldern
    und -Kanten; Tests decken die Zählwege ab; keine Zahl ist hartkodiert
    (`python scripts/seed_facts.py` als Referenz).
14. **Jede Kachel erklärt sich:** benannte Frage, Scope, Datenstand, Ermittlungsregel und
    Drill-down-Ziel sind je Kachel vorhanden; per Test belegt (Struktur, nicht Wortlaut —
    Lektion 11).
15. **Ampel-Grenze eingehalten:** Ein Test weist nach, dass jedes Badge auf einem erfassten
    Feldwert oder einer belegten Kantenlage beruht (Positivliste der zulässigen Regeln im
    Code); es existiert kein Badge für Bewertungen ohne Datenträger (kein „hoch/mittel/
    gering"-Risiko, kein Reifegrad, kein Trend). Lebenszyklus-Kacheln tragen die
    08-D07-Glosse.
16. **Nie nur Farbe:** axe-Lauf (`pnpm qa:visual WP-020`) ohne neue `serious`/`critical`-Färbungsbefunde
    auf den umgebauten Seiten; Status-Badges tragen Text + Form; im Report ausgewiesen.
    Wird eine von FINDING-0008 betroffene Struktur neu gebaut, zeigt der axe-Report die
    Verbesserung (sonst bleibt FINDING-0008 unverändert offen und wird nicht angetastet).

**Slice 5 – Rollenvarianten & Abgleiche**

17. **Rollenvarianten messbar:** Für die vier normierten Rollen entspricht Betonung/Ausblendung
    der Ebene 1 der Tabelle „Rollenvarianten" so weit Träger existieren; fehlende Fokusinhalte
    (z. B. Freigaben, Investition) sind als Lücke benannt; per Test je normierter Rolle belegt.
    Der umgestellte Gleichheitstest sichert weiterhin: dieselben Daten, keine getrennte
    Wahrheit, jede Ausblendung über Drill-down erreichbar.
18. **Zweite Decision-Card-Liste sichtbar:** `/entscheidungen` zeigt den Feldabgleich gegen
    **beide** Listen (Dok. 10 „Pflichtfelder" und Dok. 06 „Decision Card – Pflichtfelder")
    inklusive benanntem Widerspruch (O-WP017-11); per Test belegt; keine Decision Card wird
    gebaut.
19. **Trust-Abgleich sichtbar dokumentiert:** Die Zuordnung der belegten Vertrauensanzeigen zu
    den acht Trust-Layer-Angaben liegt als Code-Dokumentation + sichtbare Benennung der
    unbelegten Angaben vor (O-WP020-06 registriert); nichts wird berechnet oder erfunden.

**Slice 6 – CCP**

20. **Proposal liegt vor:** `research/change-proposals/CCP-004_*.md` (Nummer ggf. fortzählen)
    mit PDF-Beleg, Optionen, Empfehlung, Auswirkungsanalyse; als Human-Gate-Vorlage
    gekennzeichnet; **kein** Code geändert.

**Übergreifend**

21. **Gates besetzt wie zugeschnitten:** Code + Product + Domain + QA + Security & Privacy +
    Konzepttreue; zweite Runde nach dem Fix-Pass; Review-Notiz unter `docs/project/reviews/`
    dokumentiert Besetzung, Findings und Verbleib.
22. **Owner-Abnahme vorbereitet:** `pnpm qa:visual WP-020` final gelaufen, Artefakte unter
    `docs/project/visual/WP-020/` committet; Fortschrittsreport mit Screenshots an den Owner;
    Owner-Reaktion („das ist jetzt okay" oder Änderungswünsche) im Abschlussbericht
    festgehalten — größere Stilwünsche → WP-025, nicht Scope-Drift.
23. **Gesamtverifikation:** `pnpm lint`, `pnpm typecheck`, `pnpm test` (frisch, ohne
    Turbo-Cache: `pnpm --filter <pkg> exec vitest run`), `pnpm build`,
    `python scripts/validate_handoff.py` grün; `packages/*` nachweislich unverändert
    (`git diff --stat` je Slice enthält keine `packages/`-Pfade; Ausnahme: keine).
24. **Offene Fragen registriert:** Alle unten benannten O-WP020-Einträge stehen in
    `docs/project/OPEN_QUESTIONS.md`; jede beim Bauen neu gefundene Lücke kommt als
    weiterer O-WP020-Eintrag dazu — geraten wird nichts (DR-0005).

## Benannte Lücken und offene Fragen (Vorschlag für `docs/project/OPEN_QUESTIONS.md`)

| ID (Vorschlag) | Frage | Art | Umgang in WP-020 | Owner / Gate |
|---|---|---|---|---|
| O-WP020-01 | Dok. 06 „Detailtiefe": Wo und wie granular wird die bevorzugte Tiefe gespeichert (je Ort? je Nutzer? — 06-O09 „Welche Personalisierung darf ein Nutzer speichern" ist konzeptseitig offen)? | Konzeptlücke | eine einfache lokale Voreinstellung (versionierter localStorage-Schlüssel), im Code als reversible Anzeigeentscheidung markiert | Product / UX |
| O-WP020-02 | 06-D03 „fünfteilige Seitenanatomie" vs. neun „Verbindliche Seitenbausteine"; die Abbildung des §-6-Einstiegs ist im Textlayer nicht lesbar (vgl. O-WP019-04) | Konzeptspannung | Bausteine-Liste (9) wird als normativ behandelt, der Zählungskonflikt benannt | Concept Author + Owner-Sichtprüfung am Original |
| O-WP020-03 | Rollenvarianten sind nur für Executive, ISMS Manager, Consultant, Service Lead normiert — die Zuordnung der übrigen acht Rollen (R04–R07, R09, R11, R12, …) fehlt | Konzeptlücke | Welt-Ableitung wie O-WP016-01, als reversible Anzeigeentscheidung mit Quellzeile | Product / UX + Concept Author |
| O-WP020-04 | „Kritische Aktionen speichern die aktive Rolle mit" (Dok. 06 „Rollenwechsel") hat im read-only-Produkt keinen Träger | Anforderungsanker | als Pflicht-AC für jedes künftige Schreib-WP registriert; Rollenwahl-Code trägt den Hinweis | program-manager (bei jedem Schreib-WP-Schnitt) |
| O-WP020-05 | Snippet-Leak-Schutz der globalen Suche (Dok. 06 „Suche, Benachrichtigungen & Wiederaufnahme": „vertrauliche Treffer werden nicht über Snippets geleakt") — es existiert keine Suche, obwohl 06-D09 sie zur Kernnavigation erklärt | verlorene Anforderung → Folge-WP | Pflicht-AC des künftigen Such-WP; hier nicht gebaut | program-manager (Such-WP-Schnitt), Security |
| O-WP020-06 | Trust-Layer-Angaben ohne Träger: Modell-/Regelversion, Annahmen, menschliche Reviews, Auswirkung von Datenlücken (Dok. 06 „Trust Layer") | Datenlücke | zugeordnet, was belegt ist; Rest sichtbar benannt | Concept Author / Seed (WP-021-Umfeld) |
| O-WP020-07 | Welche erfassten Zustände dürfen ein Warn-Badge tragen und mit welcher Zuordnung (z. B. „ohne Nachweis-Kante" = Hinweis oder Warnung)? Schwellen/Zuordnungen sind Produktentscheidungen ohne Konzeptzahl | Produktfrage | nur regelbasierte, in der UI offengelegte Zuordnungen auf Fakten; strittige Fälle unmarkiert lassen und hier sammeln; Owner sieht das Ergebnis via qa:visual | Product + Owner (qa:visual-Abnahme) |
| O-WP020-08 | 06-D02: „Kundennutzer können tenantbezogen direkt im eigenen Customer Workspace starten" — Verhältnis zum neutralen Einstieg (DR-0009) für Kundenrollen | offen bis Kundenwelt | neutraler Einstieg für alle; Kundenstart-Sonderfall wird mit WP-006 entschieden | Product (WP-006-Schnitt) |
| O-WP020-09 | Dok. 06 „Onboarding, adaptive Komplexität & Hilfe" lässt den Einstieg „nach Rolle, Ziel und aktueller Aufgabe" fragen; DR-0009 verschiebt die Rollenwahl hinter den Einstieg | benannte Spannung (durch DR-0009 gedeckt) | Owner-Schicht geht vor; bei der Konzeptpflege (WP-023-Umfeld) als Prüfpunkt führen | Concept Author |
| O-WP020-10 | Dok.-04-Steuerungsvokabular (Journey-Zustände „Entwurf … Überholt" mit erlaubten Übergängen im Abschnitt „Rollenübergreifender End-to-End-Entscheidungsfluss"; sechs Handlungsoptionen und drei Betroffenheitsgrade aus J07) fehlt vollständig in `packages/` | verlorene Anforderung → Folge-WP | benanntes Folge-WP (Vorschlag WP-026), gekoppelt an E-02/Task-Träger-Entscheidung | program-manager + Concept Author |

## Stop Conditions

- Eine Kachel, ein Badge oder eine Verdichtung ließe sich **nur mit einer Bewertung füllen,
  die im Datenbestand nicht existiert** (Risiko-Level, Reifegrad, Trend, Zielwert, Score) →
  stoppen, Kachel weglassen oder als Lücke zeigen, O-WP020-07 ergänzen (DR-0008-Grenze).
- Der Umbau **erzwingt eine Änderung an `packages/contracts`, `packages/demo-seed` oder
  `packages/db`** → stoppen; das ist WP-021-/E-02-Territorium (Human Gate).
- Das neue Session-Format lässt sich **nicht ohne Bruch von `qa:visual` oder der
  Wächtertests** einführen → stoppen, Befund dokumentieren (WP-018-Artefakte sind
  Prozessinfrastruktur, keine Kollateralschäden).
- Ein Wächter- oder Gleichheitstest ließe sich **nur grün bekommen, indem seine Regel
  abgeschwächt, die Ausnahme verallgemeinert oder der Test übersprungen wird** → stoppen
  (WP-017-Prinzip; die Rollenvarianten-Umstellung in Slice 5 ist die einzige genehmigte,
  im Zuschnitt beschriebene Regelevolution).
- Der Mandantenwechsel-Umbau würde eine **Existenzaussage über fremde Mandanten** oder
  sonstige Cross-Tenant-Metadaten sichtbar machen (Leerzustands-Leak-Muster, Lektion 12) →
  stoppen, Security-Gate einbeziehen.
- Druck, **FINDING-0008 flächig „mitzufixen"** außerhalb ohnehin neu gebauter Strukturen →
  Finding bleibt beim Folge-WP.
- Scope-Drift Richtung **Demo-Welt (WP-021), Kundenwelt (WP-006), Suche, echte Auth,
  DB→UI, Dok.-09/10-Logik oder Design-Exploration (WP-025)** → stoppen, Stand sichern,
  an Queue/Owner.
- Die **Owner-Abnahme** ergibt grundlegende Richtungsänderungen (mehr als Feinschliff) →
  stoppen, als Owner-Entscheidung dokumentieren, ggf. WP-025 vorziehen statt hier iterieren.

## Done Evidence

- Kommandoprotokolle in der Review-Notiz: `pnpm lint`, `pnpm typecheck`, frische Testläufe je
  Paket, `pnpm build`, `python scripts/validate_handoff.py`, `python scripts/seed_facts.py`
  (Referenzzahlen), finaler `pnpm qa:visual WP-020`,
- Screenshots + axe-Report committet unter `docs/project/visual/WP-020/`; Owner-Reaktion im
  Abschlussbericht festgehalten (DR-0008 Nr. 4),
- Review-Notiz unter `docs/project/reviews/` mit allen sechs Gates, zweiter Runde und dem
  Verbleib jedes Findings; Security-Gate-Urteil zu Slice 1/2 explizit,
- CCP-Dokument unter `research/change-proposals/` (Slice 6) als Human-Gate-Vorlage,
- aktualisierte `docs/project/CURRENT_STATE.md`, `docs/project/WORK_QUEUE.md`
  (inkl. benanntem Folge-WP für Punkt 10 und Such-WP-Anker), `docs/project/OPEN_QUESTIONS.md`
  (O-WP020-01…10 + Neufunde), `docs/project/handovers/LATEST.md`,
  `docs/project/CONTINUATION_BRIEFING.md` (Testzahl, Einstiegsfluss-Beschreibung,
  Startkommandos-Hinweis auf neutralen Einstieg),
- getrennte Commits je Slice (explizit gestaged, nie `git add -A` — Lektion 9),
  Verified Checkpoint, Commit + Push.
