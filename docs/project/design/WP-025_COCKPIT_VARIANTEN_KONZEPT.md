# WP-025 — Cockpit-Start-Varianten (Design-Vorlage, noch kein Code)

- **Status:** Design-Entwurf zur **visuellen Owner-Freigabe** (DR-0010 Nr. 3 / DR-0012 Stufe A).
  Nach dieser Vorlage **hält der Sprint an** — der Owner wählt Stil/Hybrid, erst danach wird gebaut.
- **Typ:** UX / IA / UI-Contracts — reines Design-Dokument. Es fasst **keinen** `apps/web`- oder
  `packages/`-Code an (eine andere Spur arbeitet dort).
- **Scope:** Startseite nach dem Login (Cockpit / Dashboard). Kein neuer Ort, keine neue Fachlogik.
- **Datum:** 2026-07-24 · **Rolle:** ux-service-design
- **Quellen:** Dok. 06 (WP-019 quellentreu), Dok. 10 (WP-023 quellentreu), DR-0008/0010/0011/0012/0013.
  Belegte Bausteine gelesen (read-only) aus `apps/web/lib/heute/*`, `apps/web/lib/shell/*`,
  `apps/web/components/kunden/KundenStartContent.tsx`, `packages/demo-seed/seed-manifest.json`.

> **Regel Null (DR-0006):** Alle unten zitierten Konzeptaussagen stammen aus den **quellentreu
> abgeleiteten** Markdown-Fassungen (Dok. 06 = WP-019, Dok. 10 = WP-023). Der spätere Builder
> liest die in **§8 (PDF-Verifikationsliste)** markierten Werte trotzdem am PDF gegen
> (`python scripts/pdf_text.py 06`, `… 10`). Zitiert wird der **Abschnittstitel**.

---

## 1. Gemeinsame Grundlage aller Varianten

### 1.1 Welche Nutzerfrage die Startseite beantwortet (je Sphäre)

Der Standard-Startpunkt ist laut Dok. 06 **Abschnitt „Mission Control & Morning Mission"**
ausdrücklich **„kein aggregiertes Reporting-Dashboard, sondern ein rollenspezifischer
Arbeitsplatz"**, mit dem Anspruch „30-Sekunden-Orientierung" (WOW-Moment). Dieselbe Seite,
dieselben Daten, andere Verdichtung je Perspektive (P02 „eine Wahrheit, mehrere Perspektiven";
06-D05; Dok. 10 ENTSCHEIDUNG 10-02). Daraus folgt die Leitfrage je Sphäre:

| Sphäre (Dok. 03, Abschnitt „Kanonisches Rollenmodell") | Startseiten-Leitfrage (heute belegbar) | Sicht des Ortes „Kunden" |
|---|---|---|
| **Kunde** (R01–R06) | „Wie steht **mein Unternehmen** heute da — Bestand, Abdeckung, offene Datenlücken?" | Ein-Unternehmens-Cockpit (Customer Workspace, S02) |
| **Betreiber** (R08–R11) | „Welcher **Mandant** aus meinem Portfolio braucht Aufmerksamkeit — und wie steht der aktive da?" | Portfolio + Mandantenwechsel |
| **Beide** (R12) | wie Betreiber (Sphäre schließt Betreiberseite ein) | Portfolio + Mandantenwechsel |
| **Unabhängig / Auditor** (R07) | „Ist die Aussage des aktiven Mandanten belastbar und nachvollziehbar?" | Ein-Unternehmens-Sicht (kontrollierter Prüfbereich) |
| **neutral** (keine Rolle, DR-0009) | „Was steht für den aktiven Mandanten im Datenbestand?" | Grundform (Portfolio), keine Sphärenannahme |

> Die aspirative S01-Leitfrage **„Was hat sich seit meinem letzten Besuch verändert und was
> verdient Aufmerksamkeit?"** (Dok. 06, Abschnitt „Seiten- und Screenkatalog", Zeile S01) hat
> **keinen Träger**: die Anmeldung speichert keinen „letzten Besuch", und „verdient Aufmerksamkeit"
> wäre eine Priorisierung ohne Frist/Aufwand/Kapazität/Priorität. Sie wird deshalb **nicht** als
> Überschrift geführt (DR-0013 Nr. 1). Ob der `question`-Wortlaut überarbeitet wird, ist
> **O-WP032-02** (offen). Keine Variante darf sie als eingelöstes Versprechen zeigen.

### 1.2 Welche echten Daten/Bausteine zur Verfügung stehen

Alle Varianten rendern **dasselbe** belegte Modell — nichts davon ist erfunden (jede Zahl aus
Seed-Feldern/-Kanten des aktiven Mandanten, `apps/web/lib/heute/*`):

- **Statuskacheln** (`buildHeuteDashboard` → `stockTiles`): Bestand (Objekte/Beziehungen),
  ISMS-Kernobjekte, erfasste Entscheidungen, Managed Services — je mit Frage, Scope, Datenstand,
  Ermittlungsregel, Drill-down.
- **Lebenszyklus-Zählung** (`lifecycleSummary`) mit Pflicht-Glosse „erfasster Stand, kein
  Prüfergebnis" (08-D07).
- **Vier Abdeckungskacheln** „x von y" (`coverage`): Controls mit Nachweis, Risiken mit Minderung,
  Objekte mit Owner, Beziehungen mit Vertrauensgrad — nie Prozent ohne sichtbare Grundgesamtheit.
- **Ampel-/Badge-Logik** (`BADGE_RULES`, Positivliste): siehe §1.4.
- **Frage-Abschnitte** (`lib/heute/framing.ts` + `lib/heute/data.ts`, `MissionControlModel`):
  „Wo stehe ich?", „Was ist erfasst worden?" (Erfassungswellen), „Was weiß ich über die Datenlage?"
  (vier gezählte Beobachtungen), „Wo steige ich ein?" (Orts- und Objekt-Einstiege).
- **Detailtiefe 1/2/3** (`lib/heute/detailtiefe.ts`): Überblick · Ursachen & Datenlage · Rohdaten;
  bevorzugte Tiefe speicherbar (Dok. 06, Abschnitt „Detailtiefe").
- **Rollenfokus** (`lib/heute/rollenvarianten.ts`): vier normierte Varianten (Executive / ISMS
  Manager / Consultant / Service Lead) + Welt-Ableitung — sortiert Kacheln um, **entzieht nichts**.
- **Sphärengerechte Kunden-Sicht** (`lib/shell/sphaere.ts`): `ein_unternehmen` vs. `portfolio`,
  `mandantenwechselSichtbar`.
- **Customer Workspace Stufe 1** (`KundenStartContent`, `buildCustomerWorkspace`): Scopes, Ziele,
  Services, Nachweise, Entscheidungs-Verweis.
- **Kontextleiste** (`PageContextBar`), **Seitenbausteine-Hinweis** (`SeitenbausteineHinweis`).

**Belegte Seed-Größen** (`packages/demo-seed/seed-manifest.json`, gezählt, nicht abgeschrieben):

| Mandant | Objekte | Beziehungen | Charakter |
|---|---:|---:|---|
| Nordwerk Manufacturing SE | 34 | 51 | voll: ISMS-Kern (17/15) + Managed Service (14/28) + Entscheidungen (3/8) |
| Consulting Operator Demo | 9 | 11 | nur Managed-Service-Schicht (keine ISMS-Kernobjekte) |
| Finovia Digital Bank AG | 0 | 0 | **leer** → ehrlicher Empty-State |
| MediCore Health Services GmbH | 0 | 0 | **leer** → ehrlicher Empty-State |
| **Gesamt** | **43** | **62** | |

Konsequenz für die Varianten-Demo: Der **voll befüllte** Fall wird an **Nordwerk** gezeigt, der
**partielle** (Services ohne ISMS-Kern) am **Consulting Operator**, der **leere** an
**Finovia/MediCore**. Jede Variante muss in allen drei Zuständen erlebbar sein.

### 1.3 Die Ehrlichkeitsgrenze (DR-0008 / Antwort-Modus DR-0013)

Was **keinen Datenträger** hat, darf eine Variante nur als **benannte Lücke** zeigen, nie als
erfundenen Wert:

- **Kein** Trend, Puls, Reifegrad, Zielstatus, Managed-Service-**Anteil als Wert**, Score, Prozent,
  Frist, Priorität, Schwellenwert, Delta, Veränderungsfeed, Empfehlung, Serviceangebot.
- Der Customer-Workspace-Kopf aus Dok. 06 Abschnitt „Customer Workspace" (Strategie-DNA, Zielprofil,
  Managed-Service-Anteil, Trend, Puls, Ursache-Wirkungs-Ketten, Hebel, Zeitachse) hat **heute keinen
  Träger** und wird benannt statt simuliert (siehe `KundenStartContent`-Abschnitt „Noch nicht
  hinterlegt"). Träger entstehen erst mit WP-021 (Demo-Fülle) / WP-008 (Aufgaben & Entscheidungen).

**Antwort-Modus (DR-0013), verbindlich für jede Variante:**
1. **Antwort zuerst, Lücke zuletzt** — über der Falz stehen Status/Zahlen, nicht Meta-Text.
2. **Kein internes Vokabular** im UI (kein F01/R12/SO02, keine Feldnamen, keine Scope-IDs).
   Beziehungen in Domänensprache.
3. **Kachel = Frage + Zahl/Balken + Badge + Drill-down.** Scope/Datenstand **einmal** in der
   Kontextleiste, nicht pro Kachel.
4. **Kontextleiste zeigt Belegtes**, nicht Abwesenheit (Mandant · Datenstand · Rolle).
5. **Rollenfokus ohne Beipackzettel** — still umsortieren, höchstens **ein** Nutzen-Satz.
6. **Detailtiefe als kompakter Umschalter**, ohne Erklärabsatz.
7. **Badge-Sprache präzise, zahlengebunden** (siehe §1.4).
8. „wirksam" u. ä. am Wort als **erfasster Stand** kennzeichnen (`STAND_HINWEIS`).
9. **Ein Leitbegriff je Konzept** („Mandant" für die Organisation, „digitaler Zwilling" für den
   Objektgraph); Nav-Label = Seitentitel.
10. **Leerer Mandant = sofort sichtbarer Leerzustand** über der Falz.
11. **Sphäre an Rolle koppeln** (DR-0012): Kundenrollen sehen kein Portfolio.
12. **Header ehrlich** (Übergang bis echte Auth): „Ansicht zurücksetzen" statt „Abmelden";
    Dropdowns „Ansicht: Rolle / Mandant"; keine Rollencodes.

### 1.4 Ampeln/Badges — die einzige offengelegte Regel

Die **Positivliste** `BADGE_RULES` (`lib/heute/dashboard.ts`, DR-0008 / O-WP020-07) ist die
**einzige** erlaubte Ampel-Quelle. Es gibt **keine vierte Regel** (per Test erzwungen) und
**keine Schwere-/Dringlichkeitszuordnung** („hoch/mittel/gering") — welche erfasste Lage welche
Schwere trüge, ist offen (O-WP020-07):

| Regel-Kennung | Bedingung | zahlengebundener UI-Text | Symbol | offengelegte Grenze |
|---|---|---|---|---|
| `vollstaendig_belegt` | x = y (und y > 2) | „alle 34 Objekte haben einen benannten Owner" | ✓ | „Ob die belegte Lage fachlich ausreicht, sagt der Datenbestand nicht." |
| `luecke_erfasst` | x < y | „Datenlücke: 5 Objekte ohne benannten Owner" | ○ | „Ob die Lücke fachlich zulässig ist, sagt der Datenbestand nicht." |
| `kein_datenbestand` | 0 Objekte / 0 Beziehungen | „kein Datenbestand" | – | „Warum nichts erfasst ist, sagt der Datenbestand nicht." |

Zusatzregel **kleine Grundgesamtheit** (`KLEINE_GRUNDGESAMTHEIT = 2`): bei n ≤ 2 **kein**
Erfolgs-Badge und **kein** Vollbalken — stattdessen ein Kleinheits-Hinweis. Jede Ampel trägt
Text **neben** Farbe (nie nur Farbe, Dok. 06 06-D11) und einen **Drill-down** in die Begründung
(P04 „Ursache vor Score"; „bewusst vermiedenes Muster: Ampelwände ohne erkennbare nächste
Entscheidung").

> **Grenze für alle Varianten:** „mehr Ampeln, wo nötig" (Owner) heißt **mehr Verdichtung nach
> diesen drei Regeln** — **nicht** neue Farb-Schwellen. Echte Reifegrad-/Risiko-/KPI-Ampeln mit
> Explain Panel/Confidence sind DR-0012 **Stufe E** (erst nach Dok. 09/10 als Fachmodul).

### 1.5 Kuratierte Personalisierung (DR-0012 Stufe B, WP-029) — nicht Freiform

„Selbst gestaltbar je Anmeldeaccount" (Owner) = **kuratierte** Personalisierung, **kein**
Drag-and-Drop-Layout-Builder (06-O09 ist offen → Stufe C zurückgestellt). Konzeptgedeckt und sofort
baubar (Dok. 06 Abschnitt „Detailtiefe" „Nutzer können eine bevorzugte Tiefe speichern"; Dok. 06
Abschnitt „Experten…" Filter/gespeicherte Sichten; Dok. 10 Abschnitt „Management-Modus"):

- **Feste, konzeptgedeckte Auswahl** aus der **bestehenden** Kachel-/Abschnittsmenge (§1.2) —
  anheften, umsortieren innerhalb der erlaubten Menge, bevorzugte Detailtiefe, Rollenfokus an/aus,
  Management-Modus an/aus. **Keine** frei platzierbaren Widgets, keine erfundenen Kacheln.
- **Harte Leitplanke** (Dok. 06 Abschnitt „Detailtiefe"): sicherheitskritische Warnungen bleiben
  **immer** sichtbar — nichts Kritisches ist wegkonfigurierbar. Heute existiert keine solche
  Warnung; jede künftige rendert außerhalb der Personalisierung.
- **Träger:** ein **versionierter localStorage-Schlüssel je Gerät** nach dem Muster
  `DETAILTIEFE_STORAGE_KEY = 'isms-demo-detailtiefe-v1'` (z. B. `isms-demo-cockpit-v1`).
  **Mandantenfrei** (kein Mandanten-/Rollen-/Objektbezug im gespeicherten Wert → gefahrlos beim
  Mandantenwechsel, Cross-Tenant-Schutz), **reversibel**, ohne Datenwirkung, defensiv geparst
  (ungültig → Standard). Ein echter Account-Träger folgt erst mit der Auth (Dok. 19, WP-030).

---

## 2. Die drei Varianten (erlebbar unterschiedlich, ein Datenmodell)

Alle drei rendern §1.2, halten §1.3/§1.4 ein und differenzieren Kunde/Betreiber über §1.1 +
`sphaere.ts`. Sie unterscheiden sich in **Informationsarchitektur und Erstkontakt**, nicht kosmetisch.

### Variante A — „Verdichtung / Ampel-first" (Kachelraster-Cockpit)

**Leitidee (ein Satz):** Der Zustand des aktiven Mandanten auf **einen Blick** als dichtes
Kachelraster mit ehrlichen Ampel-Badges — maximale Verdichtung über der Falz, für den Experten,
der in Sekunden die Lage liest.

**Wireframe (oben → unten):**
```
┌ Header (ehrlich): "Ansicht: <Rolle> / <Mandant>" · [Ansicht zurücksetzen] ┐
├ Kontextleiste:  Mandant · Datenstand · Rolle          [Überblick|Details|Rohdaten] ┤
├ Klartext-Zeile (1 Satz): "Nordwerk: 34 Objekte und 51 Beziehungen … zuletzt …"     ┤
├───────────── Kachelraster (Ampel-first, 2–3 Spalten) ───────────────┤
│ [Bestand 34/51]  [ISMS-Kern 22]  [Entscheidungen 3]  [Services 6]    │
│ [Lebenszyklus: 7 Stände]                                             │
│ [Controls m. Nachweis  x/ y ✓/○]   [Risiken m. Minderung  x/ y ✓/○]  │
│ [Objekte m. Owner      x/ y ✓/○]   [Beziehungen m. Vertrauensgrad …] │
├ (leerer Mandant → EINE Datenlücken-Kachel "kein Datenbestand –" statt Raster) ┤
└ "Was hier bewusst nicht steht" (benannte Lücken) + Seitenbausteine-Hinweis ┘
```

**Reale Inhalte je Kachel:** exakt das `HeuteDashboardModel` — Statuskacheln, Lebenszyklus-Zählung,
vier Abdeckungskacheln. Jede Kachel: Frage (klein) → **Zahl groß** → Badge → Drill-down; Regel
hinter dezentem Info-Element.

**Ampeln/Badges:** voll ausgereizt nach `BADGE_RULES` (§1.4). Genau hier wird der Owner-Wunsch
„mehr Ampeln, wo nötig" eingelöst — an den vier Abdeckungskacheln und der leeren
Datenlücken-Kachel; n ≤ 2 unterdrückt Erfolgsbadge/Vollbalken.

**Kunde vs. Betreiber:** Kunde → Raster des eigenen Mandanten, **kein** Mandantenwechsler.
Betreiber/Beide → identisches Raster **plus** Mandantenwechsler in der Kopfleiste (Portfolio-Sphäre,
`mandantenwechselSichtbar`); der Raster-Inhalt bleibt der aktive Mandant. Neutral → Grundform.

**Wofür sie steht:** Experten-Effizienz, Verdichtung, Ampel-first. Nächster Nachbar des heutigen
`/heute`-Ebene-1-Zustands — geringstes Baurisiko.

---

### Variante B — „Frage-/Antwort-first" (geführtes Cockpit)

**Leitidee (ein Satz):** Die Startseite ist eine kurze **Kette beantworteter Fragen** — jede
Überschrift ist eine Nutzerfrage, direkt darunter die belegte Antwort; für den Anfänger, der
Orientierung vor Dichte braucht.

**Wireframe (oben → unten):**
```
┌ Header (ehrlich) ┐
├ Kontextleiste + Detailtiefe-Umschalter ┤
│ ▸ "Wo stehe ich?"           → Standort/Klartext des aktiven Mandanten            │
│ ▸ "Was ist erfasst worden?" → Erfassungswellen (Tagesgruppen, kein Änderungsfeed)│
│ ▸ "Was weiß ich über die Datenlage?" → 4 Beobachtungen "x von y" + Ermittlungsregel│
│ ▸ "Wo steige ich ein?"      → Orts-Einstiege + je Objektfamilie ein Einstieg     │
├ (Ebenen kumulativ: Detailtiefe 1 zeigt nur "Wo stehe ich?", 2 öffnet Datenlage, 3 Rohdaten)┤
└ benannte Lücken (Morning Mission etc.) + Seitenbausteine-Hinweis ┘
```

**Reale Inhalte:** das `MissionControlModel` (`framing.ts` + `data.ts`) — Standort,
Erfassungswellen, vier gezählte Beobachtungen (ohne Owner, Scope ohne Objekt, Kante ohne
Vertrauensgrad, nachweisfähig ohne Nachweisbezug), Orts-/Objekt-Einstiege. Die vier Abschnitte
sind bereits gebaut; hier werden sie als **Cockpit-Einstieg** über die Detailtiefe gestaffelt.

**Ampeln/Badges:** **sparsam** — diese Variante ist textgeführt. Ampeln erscheinen nur als „x von y"
an den Beobachtungen; keine Kachel-Ampelwand (P06 „die erste Ebene bleibt ruhig"). Bewusster
Kontrast zu Variante A.

**Kunde vs. Betreiber:** Abschnittsreihenfolge je Welt (`WORLD_FRAMINGS`) — Executive-Welt zieht
„Datenlage" nach vorn, Operations-Welt betont „Datenlücken", Consulting-Welt den „Einstieg".
Kundenrolle → „Wo stehe ich?" ist das **eigene Unternehmen**; Betreiber → mit Mandantenwechsel.

**Wofür sie steht:** Anfänger-Verständlichkeit, progressive Offenlegung, „eine Frage pro Abschnitt".
Macht die Plattform für Neue lesbar, ohne den Experten zu verlieren (Detailtiefe 3 = Rohdaten).

---

### Variante C — „Rollen-Erlebniswelt-first" (Welt-Cockpit)

**Leitidee (ein Satz):** Das Cockpit eröffnet sich als die **Erlebniswelt der aktiven Rolle** —
Weltname und Weltleitfrage oben, darunter der rollengewichtete Inhalt, mit dem
**Management-Modus-Umschalter** als sichtbarem Verdichtungshebel.

**Wireframe (oben → unten):**
```
┌ Header (ehrlich) ┐
├ Weltband:  "Executive World — Bin ich auf Kurs, welche Geschäftsrisiken … was entscheiden?" ┤
│            (Weltname + Weltleitfrage aus roles.ts; neutral → kein Weltband)                 │
├ Kontextleiste + [ Management-Modus: „Wenn ich Geschäftsführer wäre" ▢ ]                      ┤
├ EIN Nutzen-Satz des Rollenfokus: "Für die Executive-Sicht zuerst: Risiko-Minderung."        ┤
├───── rollengewichtete Kacheln (tileOrder der Rollenvariante, jede Kachel genau einmal) ─────┤
│ [Risiken m. Minderung]  [Bestand]  [ISMS-Kern]  [Entscheidungen]  …                          │
├ Management-Modus AN → reduzierte, ruhige Sicht + ehrliche Grenze (s. u.)                     ┤
└ Rollenfokus-Details (Aufklappteil) + benannte Lücken + Seitenbausteine-Hinweis ┘
```

**Reale Inhalte:** `WORLD_FRAMINGS` (Weltname/Leitfrage) + `ROLLENVARIANTEN` (Umsortierung der
Dashboard-Kacheln, `tileOrder`, `nutzenSatz`, `fokusBelegtText`, `fokusLueckenText`) + das
Kachelmodell aus §1.2. Alles vorhanden; neu ist nur die **Welt-Rahmung** und der
Management-Modus-Umschalter.

**Management-Modus (Dok. 10 Abschnitt „Management-Modus", „Wenn ich Geschäftsführer wäre"):** Das
Konzept sieht „drei geschäftliche Risiken", „maximal fünf Entscheidungen", Investitions-/
Nichtstun-Option, erwartete Wirkung/Bandbreite, Freigabebedarf, Quellen/Confidence vor. **Davon
haben heute nur Bestände einen Träger** — es gibt keine erfasste Reihung „Top 3", keine
Investitions-/Wirkungsdaten, keine Confidence-Schwelle. Der Umschalter darf deshalb **nur
reduzieren/umsortieren** (weniger Kacheln, ruhiger) und die fehlenden Träger **benennen** — er
fabriziert **keine** „drei wichtigsten Risiken". (Voller Modus = WP-008-Träger, siehe O-WP025-04.)

**Ampeln/Badges:** wie Variante A verfügbar, aber **rollengewichtet** platziert (die vom
Missionsfokus nach vorn gezogenen Kacheln tragen die Badges zuerst).

**Kunde vs. Betreiber — hier am stärksten:** Diese Variante macht die **Sphärentrennung** (DR-0012)
sichtbar. Kundenwelt → Weltband „Customer Operations World" / Executive-Kundenrolle, Inhalt =
Ein-Unternehmens-Cockpit (Customer-Workspace-Lens). Betreiberwelt → „Consulting & Service World",
Portfolio-Rahmung + Mandantenwechsel. Der Owner-Wunsch „getrennter Einstieg je Anmeldeaccount"
(DR-0012 A) wird hier am unmittelbarsten erfahrbar — **auf einer Plattform, einem Datenmodell**.

**Wofür sie steht:** Rollen-/Sphären-Erlebnis, „getrennte Einstiege auf einer Plattform",
Vorgeschmack auf Management-Modus. Höchster konzeptioneller Anspruch, größtes Baurisiko der drei
(Weltband + Management-Modus neu).

---

### Kurzvergleich

| | A — Ampel-first | B — Frage-first | C — Welt-first |
|---|---|---|---|
| Erstkontakt | dichtes Kachelraster | Kette von Fragen | Weltband + Rollenfokus |
| Zielnutzer | Experte | Anfänger | rollengebunden / Sphäre |
| Ampeldichte | hoch | sparsam | rollengewichtet |
| Sphärentrennung sichtbar | mittel (Wechsler) | mittel (Framing) | **hoch (Weltband)** |
| Neu zu bauen | wenig (nahe `/heute`) | wenig (Abschnitte staffeln) | mittel (Weltband, Mgmt-Modus) |
| Personalisierungs-Andockpunkt | Kacheln anheften/ordnen | Abschnitte an/aus, Tiefe | Rollenfokus/Weltband/Mgmt-Modus |

---

## 3. Abgrenzung & Nicht-Ziele

Bewusst **nicht** im Cockpit (keine Variante darf das):

- **Keine erfundene Bewertung** — kein Score, Reifegrad, Trend, Puls, Zielstatus,
  Managed-Service-Anteil als Wert, kein Prozent ohne Grundgesamtheit, keine Ampel-Schwelle jenseits
  `BADGE_RULES` (DR-0008, §1.3/§1.4).
- **Keine mandantenübergreifende Aggregation auf Kundenseiten** — Sphärengrenze (`sphaere.ts`,
  Cross-Tenant-Schutz). Kundenrollen sehen **kein** Portfolio (DR-0012 / DR-0013 Nr. 11). Der
  aktive Mandant bleibt sichtbar, aber keine Existenzaussage über fremde Mandanten.
- **Keine Demo-/Simulations-Etiketten** im UI (DR-0011) — „synthetisch/Demo/Simulation" bleibt
  draußen; die **Datenehrlichkeit** (Herkunft/Belastbarkeit, „x von y", 08-D07) bleibt drin.
- **Keine Buchung, keine Preise, keine auslösbare Aktion** — read-only Ausbaustufe; keine leere
  Action-Rail als Attrappe.
- **Kein internes Vokabular** (Codes/Feldnamen/Scope-IDs), **kein aspiratives Frage-Versprechen**,
  das die Seite im nächsten Satz zurücknimmt (DR-0013 Nr. 1).
- **Kein Freiform-Layout-Builder** (06-O09 offen → Stufe C). Personalisierung ist **kuratiert**
  (§1.5).

**Bezug:** **WP-029** liefert die kuratierte Personalisierung (Stufe B) — dieses Dokument definiert
nur die **Andockpunkte** je Variante, baut sie nicht. **WP-025** (dieses WP) endet mit den
Varianten und dem **Owner-Varianten-Stopp** (Visual-Pass via `pnpm qa:visual`, DR-0010).

---

## 4. Offene Fragen (Owner/Concept) — O-WP025-xx

| ID | Frage | Warum offen | Vorschlag/Default |
|---|---|---|---|
| **O-WP025-01** | **Welche Personalisierungs-Granularität** (Stufe B)? Nur anheften/ordnen bestehender Kacheln, oder auch Abschnitte ein-/ausblenden? | 06-O09 (Personalisierungsumfang) ist offen; Leitplanke „sicherheitskritische Warnungen immer sichtbar" (Dok. 06 „Detailtiefe") gilt. | Default: anheften + ordnen + Detailtiefe + Rollenfokus/Mgmt-Modus an/aus; **kein** freies Layout. |
| **O-WP025-02** | **Getrennte Cockpits je Sphäre oder ein adaptives Cockpit?** | DR-0012 A: „getrennter Einstieg auf EINER Plattform"; zwei getrennte Login-Front-Doors sind laut DR-0012 **Erweiterung (nicht im PDF)**. Variante C tendiert zu getrennt, A/B zu adaptiv. | Default: **ein adaptives** Cockpit, das je Sphäre umschaltet (P02 „eine Wahrheit"); getrennte Front-Doors erst mit Auth-WP (WP-030). |
| **O-WP025-03** | **Welche Ampel-Schwellen sind konzeptgedeckt?** Bleibt es bei `BADGE_RULES` (belegt/Lücke/leer) oder kommen Schwere-Stufen? | O-WP020-07: Schwere-Zuordnung ist offen; echte Reifegrad-/Risiko-Ampeln = DR-0012 Stufe E (Dok. 09/10 nachziehen). | Default: **nur** `BADGE_RULES`, keine neuen Farb-Schwellen bis Stufe E. |
| **O-WP025-04** | **Management-Modus jetzt** (nur reduzieren/umsortieren + Lücke benennen) **oder erst mit Trägern** (WP-008 Aufgaben/Entscheidungen)? | Dok. 10 „Management-Modus" verlangt „3 Risiken/5 Entscheidungen" — Reihung/Frist/Priorität fehlen als Träger. | Default: **reduzierende Vorschau jetzt** (ehrliche Grenze), voller Modus mit WP-008. Betrifft nur Variante C. |
| **O-WP025-05** | **Welche Variante / welcher Hybrid?** (der eigentliche Stopp-Punkt) | DR-0010 Nr. 3: nach den Varianten STOPP für die visuelle Owner-Freigabe. | kein Default — **Owner-Entscheidung**. |
| **O-WP025-06** | **Wortlaut der Seiten-Leitfrage** (aspirative S01/Screenkatalog-Frage überarbeiten?) | identisch zu **O-WP032-02** (bereits offen). | Default: heutige Leitfrage NICHT als Überschrift führen (DR-0013 Nr. 1). |
| **O-WP025-07** | **Customer-Workspace-Kopf** (Strategie-DNA/Zielprofil/Trend …) — wann Träger, bis dahin benannte Lücke? | kein Datenträger bis WP-021/WP-008 (`KundenStartContent` „Noch nicht hinterlegt"). | Default: benannte Lücke, kein simulierter Wert. |

---

## 5. Bau-Wegweiser (für den späteren Builder)

### 5.1 Wiederverwendbar (bereits gebaut, quellentreu)

| Baustein | Datei | Rolle in den Varianten |
|---|---|---|
| Dashboard-Modell + Badges | `apps/web/lib/heute/dashboard.ts` (`buildHeuteDashboard`, `BADGE_RULES`, `STAND_HINWEIS`) | A/C Kacheln + Ampeln |
| Frage-Abschnitte + Beobachtungen | `apps/web/lib/heute/framing.ts`, `apps/web/lib/heute/data.ts` (`MissionControlModel`) | B Abschnittskette |
| Detailtiefe 1/2/3 | `apps/web/lib/heute/detailtiefe.ts` | alle (Verdichtungshebel) |
| Rollenfokus | `apps/web/lib/heute/rollenvarianten.ts` (`ROLLENVARIANTEN`, `WELT_VARIANTE`) | C Umsortierung, A optional |
| Erlebniswelten | `apps/web/lib/shell/roles.ts` (`EXPERIENCE_WORLDS`) | C Weltband |
| Sphären-Sicht | `apps/web/lib/shell/sphaere.ts` (`kundenSicht`, `mandantenwechselSichtbar`) | alle (Kunde vs. Betreiber) |
| Customer Workspace | `apps/web/components/kunden/KundenStartContent.tsx`, `lib/kunden/data.ts` | C Kundenwelt-Inhalt |
| Kontextleiste / Seitenbausteine | `PageContextBar`, `SeitenbausteineHinweis`, `lib/shell/seitenbausteine.ts` | alle |
| Seed-Fakten / Manifest | `packages/demo-seed/seed-manifest.json`, `seed-facts.ts` | Demo-Dramaturgie (Nordwerk/Operator/leer) |

### 5.2 Neu zu bauen

- **Cockpit-Varianten-Umschalter/Layout-Wrapper** (reversibel, versionierter localStorage-Schlüssel
  `isms-demo-cockpit-v1` nach Muster `DETAILTIEFE_STORAGE_KEY`; mandantenfrei, defensiv geparst).
- **Variante A:** Kachelraster-Anordnung des `HeuteDashboardModel` (überwiegend Umlayout).
- **Variante B:** Staffelung der vier `MissionControlModel`-Abschnitte als Cockpit-Einstieg über
  Detailtiefe (überwiegend Umlayout bestehender Abschnitte).
- **Variante C:** Weltband-Komponente (`EXPERIENCE_WORLDS`) + Management-Modus-Umschalter
  (reduzieren/umsortieren + Lücke benennen, **keine** Fabrikation).
- **Kuratierte Personalisierung** (Andockpunkte je Variante) — gehört zu **WP-029**, hier nur
  vorgesehen, nicht gebaut.

### 5.3 Geschätzte Slice-Zerlegung

1. **Slice 1 — Variante A** (Kachelraster) als alternatives `/heute`-Layout hinter einem
   Varianten-Flag; `pnpm qa:visual` (Nordwerk voll · Operator partiell · Finovia leer).
2. **Slice 2 — Variante B** (Frage-first): bestehende Abschnitte als Cockpit-Einstieg staffeln;
   qa:visual je Zustand.
3. **Slice 3 — Variante C** (Welt-first): Weltband + Rollenfokus-Reihenfolge + Management-Modus
   (reduzierend); qa:visual je Sphäre (Kundenrolle vs. Betreiberrolle vs. neutral).
4. **Slice 4 — Screenshots + axe** aller drei Varianten sammeln → **STOPP für Owner-Freigabe**
   (DR-0010 Nr. 3 / DR-0012 Stufe A).
5. **danach (nicht Teil von WP-025):** gewählte Variante ausbauen → **WP-029** kuratierte
   Personalisierung an den vorgesehenen Andockpunkten.

Jeder Slice: Antwort-Modus-Wächter grün halten (kein Prozess-/Bewertungsvokabular, `BADGE_RULES`
unverändert, Ehrlichkeits-Substanz einmal je Seite), Sphären-/Cross-Tenant-Wächter grün,
Leerzustand-Wächter grün.

---

## 6. Realitäts-Anker-Nachweis (read-only gelesen)

- `apps/web/lib/heute/dashboard.ts`, `detailtiefe.ts`, `rollenvarianten.ts`, `framing.ts`, `data.ts`
- `apps/web/lib/shell/places.ts`, `roles.ts`, `sphaere.ts`, `seitenbausteine.ts`
- `apps/web/components/kunden/KundenStartContent.tsx`
- `packages/demo-seed/src/tenants.ts`, `seed-facts.ts`, `seed-manifest.json`
- Dok. 06 Abschnitte „Seiten- und Screenkatalog", „Mission Control & Morning Mission",
  „Customer Workspace", „Detailtiefe", „Verbindliche Seitenbausteine"; Dok. 10 Abschnitt
  „Management-Modus"; DR-0008/0010/0011/0012/0013.

---

## 7. Bezug zu WP-025 (Visual-Pass) & WP-029 (Personalisierung)

- **WP-025** (dieses WP): 2–3 Varianten bauen + `qa:visual` + **Owner-Varianten-Stopp**. Dieses
  Dokument ist die Vorlage dafür.
- **WP-029:** kuratierte Personalisierung (DR-0012 Stufe B) — dockt an die in §1.5/§5.2 definierten
  Punkte an. **Nicht** Teil von WP-025.

---

## 8. PDF-Verifikationsliste (Regel Null — der Builder liest gegen)

Bevor gebaut wird, gegen das **PDF** prüfen (`python scripts/pdf_text.py 06`, `… 10`):

1. **Screenkatalog S01–S04** (Dok. 06 „Seiten- und Screenkatalog"): Inhaltslisten S01 Mission
   Control, S02 Customer Workspace, S04 Portfolio Cockpit — Wortlaut/Reihenfolge.
2. **Mission Control** (Dok. 06 „Mission Control & Morning Mission"): „kein aggregiertes
   Reporting-Dashboard, sondern ein rollenspezifischer Arbeitsplatz"; die vier Fragen; die
   Rollenvarianten-Tabelle (Executive/ISMS Manager/Consultant/Service Lead) **wortgleich**.
3. **Customer Workspace** (Dok. 06 „Customer Workspace"): Kopf-Bausteine (Strategie-DNA, Zielprofil,
   Managed-Service-Anteil, Trend, Puls, Ursache-Wirkungs-Ketten, Hebel, Zeitachse) + vier Lenses.
4. **Detailtiefe** (Dok. 06 „Detailtiefe"): „Nutzer können eine bevorzugte Tiefe speichern;
   sicherheitskritische Warnungen bleiben jedoch immer sichtbar."
5. **Management-Modus** (Dok. 10 „Management-Modus"): Umschalter „Wenn ich Geschäftsführer wäre",
   **3 Risiken / maximal 5 Entscheidungen** + die weiteren Punkte.
6. **Ausdrücklich als Erweiterung markiert (nicht im PDF):** zwei getrennte Login-Front-Doors
   (DR-0012); der überarbeitete Wortlaut der Seiten-Leitfrage (O-WP032-02). Diese sind Owner-/
   Concept-Entscheidungen, keine PDF-Aussagen.

Widerspricht das PDF einer der obigen Aussagen, **gilt das PDF** — Widerspruch als Befund melden,
Variante anpassen.
