# Usability-Fix-Backlog — ISMS Managed Service Platform

Datum: 2026-07-24
Autor-Rolle: ux-service-design (Synthese)
Grundlage: drei Lens-Befunde (Anfaenger / Experte / Kritiker) gegen den aktuellen Code
(WP-028 Slice 4, DR-0008/DR-0011/DR-0013), Code = Wahrheit, plus Screenshots unter
`docs/project/visual/WP-028/`.

## Vorbemerkung Screenshots
Die aelteren WP-032-Screenshots sind veraltet (zeigen noch "Demo-Simulation"-Banner, "DEMO"-Chip,
Rollencodes "R01 · Executive Sponsor", Titel "Digital Twin Explorer"). Massgeblich und
code-treu sind die Shots unter `docs/project/visual/WP-028/`. Alle Befunde sind gegen den
aktuellen Code formuliert.

## Regel-Null-Vorbehalt (DR-0006 / FINDING-0007)
Alle Konzeptzitate in diesem Backlog (Dok. 03 "Anfaengererlebnis", Dok. 04 J01, Dok. 06
"Suche, Benachrichtigungen & Wiederaufnahme" / 06-D01 / 06-D09 / 06-D11, Dok. 08-D07,
DR-0008/0011/0013) stammen aus den **Arbeitsfassungen** und den Lens-Belegen. Der Experten-Lens
konnte das PDF-Binaer in seiner Session nicht oeffnen. **Bevor eine dieser Aussagen in eine
Produktentscheidung, ein Datenmodell oder eine Acceptance Criterion eingeht, ist sie im PDF
(`docs/concept/pdf/`, `python scripts/pdf_text.py <nr>`) am Abschnittstitel gegenzulesen.**
Dieser Backlog priorisiert Usability-Fixes; er trifft keine Produktentscheidung.

## Grenzen (fuer alle Fixes verbindlich)
Kein Eintrag darf: (1) Ehrlichkeit opfern (keine erfundenen Bewertungen/Ampeln ohne Datentraeger,
DR-0008), (2) die Mandanten-/Sphaerengrenze verletzen, (3) Demo-/Simulations-Etiketten einfuehren
(DR-0011), (4) die acht Orte vermehren (06-D01). Jeder Eintrag traegt ein Invasivitaets-Tag:
NICHT-INVASIV (nur UI/Text/Interaktion, kein Objektvertrag, keine echte Auth/DB) oder OWNER-GATE.

---

## Dedup-Karte (Lens-Befund -> U-ID)

| Lens | Befund | U-ID |
|------|--------|------|
| Anfaenger | 1 Erstkontakt "Was ist das hier?" | U-01 |
| Anfaenger | 4 Login "Mandant" unerklaert | U-02 |
| Anfaenger | 2a "Begriffe erklaert -> Wissen"-Link | U-03 |
| Anfaenger | 2b + 8 Glossar "Rollen, Sphaeren, Sichten" | U-04 |
| Anfaenger | 3 (non-invasive Teil) + Kritiker 3 Lücken-Widget-Redundanz | U-05 |
| Anfaenger | 3 (gate Teil) DR-0013-Wortlaut/Reihenfolge /heute | U-06 |
| Experte | M1 lokal (Client-Filter /isms + Objektliste) | U-07 |
| Experte | M1 global (globale Suche 06-D09) | U-08 |
| Experte | M2 Abdeckungskacheln -> Lueckenobjekte | U-09 |
| Experte | M3 Scan-/Tabellenmodus + Kanten-Rahmung verdichten | U-10 |
| Experte | M4 neutraler Form-/Symbol-Marker (06-D11) | U-11 |
| Experte | M5 Deckungspfad/Coverage-Chain | U-12 |
| Anfaenger | 7 "Ansicht zuruecksetzen" Hinweis | U-13 |
| Kritiker | 1 Konzept-Scrollwaende: Anker + Aufklapper | U-14 |
| Kritiker | 2 Seed-Anzeigetext "synthetisch"/"Demo" | U-15 |
| Kritiker | 4 Topbar Ein-Unternehmens-Sicht CSS-Defekt | U-16 |
| Kritiker | 5 Objekt-ID-Slug als Nutzertext | U-17 |
| Kritiker | 6 Rahmung vor Antwort + "Kunden"/"Kundenbereich" | U-18 |
| Anfaenger | 6 Kunden-Ort zeigt eigenes Unternehmen | U-19 |
| Anfaenger | 5 Leerer Mandant /heute wirkt wie Sackgasse | U-20 |
| Experte | M6 Modell-/Seed-Luecke Bedrohung->Risiko->Schwachstelle | U-21 |
| Experte | META groesserer synthetischer Mandant (Enabler) | U-22 |

Zusammengefuehrt: Anfaenger-8 ("Leitfrage dieser Erlebniswelt" mit Selbst-Dementi) faellt unter
U-04 (Begriff "Erlebniswelt" erklaeren) und U-05 (Meta-Entrauschen). Anfaenger-3 wurde in einen
non-invasiven Anteil (U-05) und einen gate-pflichtigen Wortlaut-Anteil (U-06) getrennt.
Experte-M1 wurde in lokal (U-07, non-invasiv) und global (U-08, Gate) getrennt.

---

## Backlog (verortet, priorisiert)

### U-01 — Produkt-Erstkontakt / Orientierungsblock
- Ort/Komponente: `apps/web/app/login/page.tsx`, `apps/web/components/shell/MissionControlContent.tsx` (`NeutralerEinstiegHinweis`)
- Nutzer-Schmerz: Neuer Nutzer landet nach Mandantenwahl auf `/heute`; nichts erklaert, was die Plattform ist, dass es acht feste Orte gibt, was Mandant/Rolle bedeuten. Erste Ehrlichkeits-Maschinerie beantwortet Fragen, die er noch nicht hat.
- Fix: Dezenter, schliessbarer Orientierungsblock im neutralen `/heute`-Zustand (und ein Satz auf `/login`): eine Zeile "Diese Plattform zeigt den Sicherheits-/ISMS-Stand eines Unternehmens", eine Zeile "Acht feste Orte in der Navigation, jeder beantwortet eine Frage", eine Zeile "Rolle und Mandant sind eine Ansicht" + Link zu Wissen. Kein Overlay, kein Zwang (Dok. 04 J01 verbietet nur den erzwungenen Rundgang).
- Schweregrad: kritisch | Aufwand: S | NICHT-INVASIV (Product-Lead-Sichtung, weil gate-gepruefte Seite) | Score: 9

### U-02 — Login: Klartextzeile zu "Mandant"
- Ort/Komponente: `apps/web/app/login/page.tsx`, `apps/web/components/shell/LoginForm.tsx` (Feldlabel "MANDANT")
- Nutzer-Schmerz: "Mandant" ist Enterprise-Jargon und das erste Wort im Formular; die Optionen sind Firmennamen, aber nichts erklaert den Begriff.
- Fix: Eine Klartextzeile am Feld: "Mandant = das Unternehmen, dessen Daten Sie ansehen." Bewusst OHNE "Demo/Simulation" (DR-0011); "Beispielunternehmen" ist zulaessig.
- Schweregrad: mittel | Aufwand: S | NICHT-INVASIV | Score: 7

### U-03 — Persistenter "Begriffe erklaert -> Wissen"-Weg auf vokabularstarken Orten
- Ort/Komponente: `IsmsContent.tsx`/`IsmsCards.tsx`, `components/services/*`, `components/kunden/*`, `twin/ObjectDetailView.tsx`; Ziel `WissenContent.tsx`
- Nutzer-Schmerz: Fachvokabular (Control, Evidence, SLA, Outcome, Shared Responsibility, Sphaere, Erlebniswelt, Scope, Lebenszyklus-Stand) trifft den Anfaenger sofort, aber von keiner Fachseite fuehrt ein Weg zum Glossar.
- Fix: Eine ruhige, persistente Zeile "Begriffe erklaert -> Wissen" auf ISMS, Services, Kunden, Objekt-360.
- Schweregrad: hoch | Aufwand: S | NICHT-INVASIV | Score: 8 | QUICK WIN

### U-04 — Glossar-Abschnitt "Rollen, Sphaeren und Sichten"
- Ort/Komponente: `apps/web/lib/wissen/glossar.ts`, `apps/web/components/wissen/WissenContent.tsx`; Ableitung aus `lib/shell/roles.ts` / `places.ts`
- Nutzer-Schmerz: Der Glossar deckt nur Objektfamilien/-arten/Beziehungsarten ab. Die Orientierungsbegriffe, die zuerst getroffen werden (Rolle, Sphaere, Erlebniswelt, Scope, Mandant, Datenstand, Lebenszyklus-Stand, Objekt-360), sind nirgends erklaert. Loest zugleich Anfaenger-8 (Begriff "Erlebniswelt").
- Fix: Glossar um Abschnitt "Rollen, Sphaeren und Sichten" erweitern — abgeleitet aus `roles.ts`/`places.ts`, nichts erfunden.
- Schweregrad: hoch | Aufwand: M | NICHT-INVASIV (Content-Erweiterung im Wissen-Scope; Owner-aware wegen Scope-Wachstum von Wissen) | Score: 6

### U-05 — Luecken-/Meta-Widgets auf einen Ort pro Seite reduzieren
- Ort/Komponente: `shell/PageContextBar.tsx` ("Vollstaendigkeit des Kontexts · Drei Kontextangaben ohne Datentraeger"), `shell/SeitenbausteineHinweis.tsx` ("X von 9 Angaben ohne Datengrundlage"), plus je Seite ein eigener Luecken-Abschnitt; auf `/heute` zusaetzlich die redundante Schlusszeile (`MissionControlContent.tsx` ~208/217/224)
- Nutzer-Schmerz: Auf jeder der acht Seiten dieselben zwei generischen Aufklapp-Bekenntnisse plus mindestens ein seitenspezifischer Luecken-Block; auf `/heute` bis zu viermal dieselbe Abwesenheits-Aussage. Ehrlichkeit kippt in Rauschen; die "X von 9"-Zeile bringt die neun Pflichtbausteine indirekt ins UI zurueck.
- Fix: Auf einen Luecken-Ort pro Seite reduzieren; die generische "Drei Kontextangaben ohne Datentraeger"-Zeile aus der Kontextleiste entfernen oder mit dem SeitenbausteineHinweis zu einem Fusselement zusammenlegen; die redundante `/heute`-Schlusszeile streichen. Keine Einzeldatenaussage geht verloren (Werte bleiben an Objekt-360/Kanten).
- Schweregrad: mittel | Aufwand: M | NICHT-INVASIV | Score: 6

### U-06 — DR-0013-Wortlaut/Reihenfolge auf /heute (nur als Vorschlag)
- Ort/Komponente: `shell/MissionControlContent.tsx` (`TiefenSchalter`, Inline-Satz "… wird hier nicht behauptet", der zusaetzlich vollstaendig unter "Was hier bewusst nicht steht" steht)
- Nutzer-Schmerz: Vor/neben der eigentlichen Antwort stehen Ebene-1/2/3-Umschalter und ein Dementi zu einer nie gestellten Frage; derselbe Satz erscheint doppelt.
- Fix (Vorschlag): Inline-"nicht behauptet"-Satz nur unten belassen; Detailtiefe-Umschalter beim Erstkontakt unter die Antwort setzen. Beruehrt bewusst getroffene DR-0013-Entscheidungen ("Antwort zuerst, Luecke zuletzt").
- Schweregrad: mittel | Aufwand: S | OWNER-GATE (gate-gepruefte Wortlaut-/Reihenfolge-Entscheidung; als Vorschlag, nicht als Alleingang) | Score: 4

### U-07 — Seiteninterne Client-Filterung (ISMS + Objektliste)
- Ort/Komponente: `apps/web/components/isms/IsmsContent.tsx`, `apps/web/components/twin/TenantDetailView.tsx`
- Nutzer-Schmerz: Es gibt in der ganzen App keine Suche/Filter/Sortierung; der Profi haengt sich ueber Ort -> Mandant -> Familie -> Karte durch. Bei n=6 heute unschaedlich, bei Realvolumen blockierend.
- Fix: Reine Client-Filterung (Freitext ueber Kartennamen) auf `/isms` und der Objektliste ueber bereits geladene, mandantengescopte Daten. Kein Objektvertrag, keine Auth/DB, keine Snippet-Leak-Frage der Global-Suche.
- Schweregrad: hoch (latent) | Aufwand: M | NICHT-INVASIV | Score: 7

### U-08 — Globale Suche (Kernnavigation 06-D09)
- Ort/Komponente: neu, Einstieg `shell/Topbar.tsx`
- Nutzer-Schmerz: 06-D09 fordert globale Suche als Kernnavigation ("keine spaetere Komfortfunktion"); heute fehlt sie ganz. Teuerster Klickweg fuer den Profi.
- Fix: Eigenes Vorhaben mit den vom Konzept geforderten Schutzmassnahmen (vertrauliche Treffer nicht ueber Snippets leaken, Mandanten-/Rollen-Gruppierung). Nicht im reinen UI-Scope loesbar.
- Schweregrad: hoch (latent) | Aufwand: L | OWNER-GATE | Score: 5 | Regel-Null: 06-D09 am PDF gegenlesen.

### U-09 — Abdeckungskacheln fuehren ZU den Lueckenobjekten
- Ort/Komponente: `apps/web/lib/heute/dashboard.ts` (`buildControlsCoverageTile`/`buildRisksCoverageTile`), `apps/web/components/isms/IsmsCards.tsx`
- Nutzer-Schmerz: "Datenluecke: 5 Controls ohne Nachweis" ist ehrlich gezaehlt, der Drill-down zeigt aber auf die gesamte Control-Sektion (`#isms-controls`). Die zentrale Audit-Frage ("welche Controls ohne Nachweis / welche Risiken ungemindert?") wird gezaehlt, aber die Handlung dahinter fehlt.
- Fix: Betroffene Objekte sind bereits abgeleitet (`controls.filter(c => c.evidenced_by.length === 0)`). Entweder (a) neutrale textgebundene Markierung "kein Nachweis erfasst" oben an der jeweiligen Karte (entspricht exakt der `BADGE_RULES`-Basis "erfasste Kanten-/Feldlage" — keine Ampel, kein Urteil) oder (b) Drill-down auf gefilterte Teilliste. Kein neuer Datentraeger.
- Schweregrad: hoch | Aufwand: M | NICHT-INVASIV (Ehrlichkeitsgrenze beachten: keine Ampel/Wertung) | Score: 8

### U-10 — ISMS-Scan-/Tabellenmodus + Kanten-Rahmung verdichten
- Ort/Komponente: `apps/web/components/isms/IsmsCards.tsx`, Muster `EntscheidungenContent.tsx` (`RegisterReadingNotes`)
- Nutzer-Schmerz: Jede ControlCard traegt vier Beziehungsbloecke mit je eigener "Beziehung:…"-Erklaerzeile plus Rahmungsabsatz "Lebenszyklus-Stand … kein Pruefergebnis". Bei 6 Objekten schon lang, bei 60 Controls unscanbar; zu niedrige Verdichtung fuer Musterscan.
- Fix: Wiederholte "Beziehung:…"-Erklaerzeilen einmalig auf Sektionsebene ziehen; kompakte Tabellen-/Listenansicht (Name · Typ · Stand · #Nachweise · #Minderungen) als scanbare Alternative. Reine Darstellung derselben Ableitung.
- Schweregrad: mittel (latent) | Aufwand: M | NICHT-INVASIV | Score: 6

### U-11 — Neutraler Form-/Symbol-Marker fuer Lebenszyklus-Stand (KEINE Ampel)
- Ort/Komponente: `apps/web/components/isms/IsmsCards.tsx`, `twin/ObjectCard`
- Nutzer-Schmerz: Auf `/isms` steht der Lebenszyklus-Stand nur als Wort (`tw-card-sub`); dort, wo ein Profi scannt, fehlt jeder visuelle Anker. 06-D11 erlaubt Text + Form/Symbol.
- Fix: Neutraler, phasenbezogener Form-/Symbol-Marker (farbneutral, mit Textlabel daneben). Ehrlichkeitsgrenze: darf KEINE Ampel werden ("wirksam" gruen / "unwirksam" rot waere das verbotene Wirksamkeitsurteil; `STAND_HINWEIS` in `dashboard.ts` existiert eigens dagegen). Vor Umsetzung mit Product/QA abstimmen.
- Schweregrad: mittel | Aufwand: M | NICHT-INVASIV, aber heikel (Product/QA-Abstimmung) | Score: 5 | Regel-Null: 06-D11 am PDF gegenlesen.

### U-12 — Deckungspfad / Coverage-Chain-Lesart
- Ort/Komponente: `apps/web/components/isms/IsmsContent.tsx`, `twin/ObjectDetailView.tsx`
- Nutzer-Schmerz: Die Prueffrage "ist Risiko R durch ein umgesetztes, nachgewiesenes Control gedeckt?" erzwingt 3-4 Spruenge ueber getrennte Karten/Seiten. Objekt-360 liefert Nachbarschaft eines Objekts, aber keinen End-zu-End-Deckungspfad.
- Fix: "Deckungspfad" (Risiko -> minderndes Control -> Nachweis-Stand in einer Zeile) als neue Lesart/Ableitung. Product-Entscheidung, als offene Frage vormerken.
- Schweregrad: mittel | Aufwand: L | OWNER-GATE (neue Sicht/Ableitung) | Score: 4

### U-13 — "Ansicht zuruecksetzen" verstaendlich machen
- Ort/Komponente: `apps/web/components/shell/Topbar.tsx`
- Nutzer-Schmerz: Bewusst kein "Abmelden" (richtig), aber Anfaenger weiss nicht, ob es ausloggt oder Daten verwirft; es fuehrt zur Mandantenauswahl.
- Fix: `title`/`aria`-Hinweis "verwirft Rolle und Mandant und fuehrt zur Mandantenauswahl".
- Schweregrad: niedrig | Aufwand: S | NICHT-INVASIV | Score: 5 | QUICK WIN

### U-14 — Konzept-Scrollwaende: Ankerleiste + standardmaessig zugeklappte Kataloge
- Ort/Komponente: `reports/ReportsContent.tsx`, `administration/AdministrationContent.tsx`, `wissen/WissenContent.tsx`, `kunden/StrukturAssistentContent.tsx`
- Nutzer-Schmerz: Diese Seiten sind im Kern gerenderte Konzeptdokumente (Reports: 43 Berichtstypen/12 Praesentationsfaelle/…; Administration: Dok-19/17/18-Struktur; Struktur-Assistent: 11 Phasen + 10 Fragen + 12 Rollen + 9 Scope-Dimensionen …). Der belegte, mandantenspezifische Anteil geht unter — "Dokumentenfriedhof" als Read-Seite.
- Fix: (1) Kurze "Auf dieser Seite"-Ankerleiste nach dem Lead (h2-`id`s existieren, z. B. `rep-grundlage`, `adm-rollen`). (2) Konzept-Kataloge konsequent standardmaessig zugeklappt (Struktur-Assistent hat gar keine `<details>`; je Sektion eine `<details>` mit Anzahl in der Summary). (3) Struktur-Assistent zweiteilen: "Der Weg in Kuerze" (11 Phasennamen) oben, Detailkataloge aufklappbar darunter.
- Schweregrad: hoch | Aufwand: M | NICHT-INVASIV | Score: 8

### U-15 — Seed-Anzeigetext ohne "Synthetischer…"/"(synthetisch)"/"Synthetischer Decision Record:"
- Ort/Komponente: `packages/demo-seed/src/tenants.ts` (industry+description), `packages/demo-seed/src/decisions.ts` (context) -> gerendert in `shell/LoginForm.tsx`, `shell/MissionControlContent.tsx` (`tenant.industry`), `entscheidungen/EntscheidungenContent.tsx` (`decision.context`)
- Nutzer-Schmerz: DR-0011 verbietet Demo-/Simulations-Etiketten, aber der erste Satz bei der Mandantenwahl lautet "Synthetischer Industriekonzern…", auf /heute steht "Branche: … (synthetisch)", jede Entscheidungskarte beginnt mit "Synthetischer Decision Record:". Der Waechter `produktsprache.test.tsx` maskiert diese Felder als dokumentierte Ausnahme (WP-033 offen) — das Prinzip ist auf dem Einstiegsschirm faktisch aufgeschoben.
- Fix: WP-033-Textpass fuer die tatsaechlich gerenderten Felder vorziehen — `description` ohne "Synthetischer…", `industry` ohne "(synthetisch)", `context` ohne "Synthetischer Decision Record:"-Praefix. Die Ausnahmemenge des Waechters schrumpft automatisch. Fuegt KEINE Demo-Etiketten ein, im Gegenteil.
- Schweregrad: mittel-hoch | Aufwand: M | NICHT-INVASIV fuer description/industry/context; OWNER-GATE nur fuer den Mandantennamen "Consulting Operator Demo" (steht woertlich in Dok. 07 "Synthetische Demodaten" — Umbenennung ist Konzeptaussage, kein stiller UI-Fix) | Score: 7 | Regel-Null: Mandantenname im PDF Dok. 07 gegenlesen.

### U-16 — Topbar Ein-Unternehmens-Sicht: Ausrichtung reparieren (CSS)
- Ort/Komponente: `apps/web/components/shell/Topbar.tsx` (`dl.shell-switch-field--fest`-Block fuer Kundenrollen/Auditor)
- Nutzer-Schmerz: In allen aktuellen WP-028-Shots (`kunden.desktop.png`, `heute.desktop.png`, `isms.desktop.png`) ist die rechte Kopfleiste gequetscht/fehlausgerichtet: der Mandant wird als dreizeiliger dl-Block gerendert (Label "MANDANT" / Firmenname / Berechtigungs-Notiz) statt als Select, "MANDANT" ragt heraus, die einzeilige "ROLLE"-Auswahl steht auf halber Hoehe daneben. Wirkt wie ein Renderfehler — an der Stelle, die Vertrauen signalisieren soll.
- Fix: Festen Mandanten-Block auf die Grundlinie des Rolle-Selects ausrichten (gemeinsame Baseline/`align-items`); Berechtigungs-Notiz aus der Kopfleiste in `title`/Tooltip oder unter die Ansicht verlagern, sodass beide Felder gleich hoch sind. Reines CSS.
- Schweregrad: mittel (wahrgenommen hoch, sichtbarer Defekt auf jeder Seite) | Aufwand: S | NICHT-INVASIV | Score: 8 | QUICK WIN

### U-17 — Objekt-ID-Slug aus Entscheidungskarte entfernen
- Ort/Komponente: `apps/web/components/entscheidungen/EntscheidungenContent.tsx` (`<dt>Objekt-ID</dt><dd>{decision.object_id}</dd>`)
- Nutzer-Schmerz: Das Register zeigt einem Executive Sponsor eine nackte technische Kennung ("nordwerk-decision-risikobehandlung-backup") als eigenes Meta-Feld — internes Vokabular ohne Nutzerwert. Der snake_case-Waechter greift nicht (Bindestriche).
- Fix: Objekt-ID-Zeile aus der sichtbaren Karte entfernen oder hinter "technische Details" (`<details>`) legen. `object_id` bleibt im Datenmodell und in der Route (`decision.href`) unveraendert — nur der Anzeigetext verschwindet.
- Schweregrad: niedrig-mittel | Aufwand: S | NICHT-INVASIV | Score: 6 | QUICK WIN

### U-18 — Rahmung vor der Antwort reduzieren + Namenskonsistenz "Kunden"/"Kundenbereich"
- Ort/Komponente: Muster (eyebrow -> h1 -> `tw-question` -> `tw-lead` -> farbige Rollen-/Neutral-Notiz -> PageContextBar) in `KundenStartContent.tsx`, `ReportsContent.tsx`, `AdministrationContent.tsx`; Namensdrift `shell/ShellNav` (Label "Kunden") vs. `KundenStartContent.tsx` (h1/CTA "Kundenbereich")
- Nutzer-Schmerz: Auf Kunden/Reports/Administration schieben sich fuenf Rahmungselemente vor den ersten Inhalt ("Antwort zuerst" nur auf Heute/Entscheidungen gut umgesetzt). Zusaetzlich heisst derselbe Ort in Nav "Kunden", in h1/CTA "Kundenbereich".
- Fix: Farbige Rollen-/Neutral-Notiz zu einer dezenten Zeile machen und nur dort, wo sie die Sicht aendert (steht ohnehin am Ende der Kontextleiste). Einen Namen konsequent waehlen.
- Schweregrad: niedrig | Aufwand: S/M | NICHT-INVASIV | Score: 5

### U-19 — Kunden-Ort: Klarstellung "In Ihrer Rolle Ihr eigenes Unternehmen"
- Ort/Komponente: `apps/web/components/twin/EigenerMandantEinstieg.tsx` (unter Nav-Label "Kunden")
- Nutzer-Schmerz: Eine Kundenrolle (R01-R06) klickt "Kunden" und sieht das EIGENE Unternehmen — ein Anfaenger erwartet unter "Kunden" eine Kundenliste. Die Eyebrow "Kunden · {Firma}" disambiguiert bereits.
- Fix: Zusatzzeile im Aufmacher "In Ihrer Rolle zeigt dieser Ort Ihr eigenes Unternehmen". Label-Aenderung waere OWNER-GATE (acht Orte, 06-D01) und ist NICHT vorgesehen; die Textklarstellung ist non-invasiv.
- Schweregrad: niedrig | Aufwand: S | NICHT-INVASIV | Score: 5

### U-20 — Leerer Mandant /heute: ruhiger naechster Schritt oben
- Ort/Komponente: `apps/web/components/shell/DashboardKacheln.tsx` (`EmptyTenantKachel`), `MissionControlContent.tsx` (DashboardSection)
- Nutzer-Schmerz: Beim Erkunden eines leeren Mandanten (z. B. Finovia) trifft der Nutzer zuerst eine Wand aus "bewusst leer"-Ehrlichkeit; der naechste-Schritt-CTA ("Mandant wechseln") steht weit unten im Standort-Abschnitt.
- Fix: Ruhigen naechsten Schritt direkt am oberen Leerblock anbieten — generisch "Mandant oben umstellen", OHNE einen anderen Mandanten namentlich zu nennen (Mandantengrenze).
- Schweregrad: mittel | Aufwand: S | NICHT-INVASIV | Score: 7

### U-21 — Modell-/Seed-Luecke: Bedrohung -> Szenario -> Risiko -> Schwachstelle
- Ort/Komponente: `apps/web/components/isms/IsmsContent.tsx`, `apps/web/lib/isms/data.ts` (OFFENE FRAGE O-WP013-01)
- Nutzer-Schmerz: Die Kernkette ist bewusst unverbunden ("Szenario, Schwachstelle und Risiko sind im Datenmodell nicht direkt verknuepft") — fuer den Risikoanalytiker ist die Herleitung "welche Bedrohung/Schwachstelle treibt dieses Risiko" nicht ablesbar. Kein UI-Bug, Modell-/Seed-Luecke, korrekt benannt.
- Fix: Beziehungstyp bzw. Seed-Kanten sind eine Modellentscheidung — nicht still fuellen. Als offene Frage fuehren.
- Schweregrad: mittel | Aufwand: L | OWNER-/MODELL-GATE | Score: 3 | Regel-Null: Dok. 07 (Beziehungsarten) am PDF gegenlesen.

### U-22 — (Enabler) Groesserer synthetischer Mandant
- Ort/Komponente: `packages/demo-seed/*`, Regeln `.claude/rules/demo-data.md`
- Nutzer-Schmerz: Bei 6 ISMS-Kernobjekten sind die Effizienz-Affordanzen (U-07..U-11) weder testbar noch schmerzhaft; die Ehrlichkeits-Gerueste uebersteigen die Daten volumenmaessig, die Verteilungs-"Grafik" ist sechsmal derselbe 1/6-Balken.
- Fix: Ein groesserer synthetischer Mandant (z. B. 40+ Controls, 20+ Risiken mit realistischer Nachweis-Luecke) macht U-07..U-11 sichtbar/testbar — stabile IDs, Reset, dokumentierte Storyline.
- Schweregrad: mittel (Enabler) | Aufwand: M | NICHT-INVASIV (synthetische Demo-Daten) | Score: 5

---

## Top-10 nach Wert-zu-Aufwand (usability-first)

| Rang | U-ID | Titel | Schwere | Aufwand | Tag | Score |
|------|------|-------|---------|---------|-----|-------|
| 1 | U-01 | Erstkontakt-Orientierungsblock (/heute neutral + /login) | kritisch | S | NICHT-INVASIV (Product-Lead-Sichtung) | 9 |
| 2 | U-16 | Topbar Ein-Unternehmens-Sicht CSS reparieren | mittel/hoch | S | NICHT-INVASIV | 8 |
| 3 | U-03 | Persistenter "Begriffe erklaert -> Wissen"-Link | hoch | S | NICHT-INVASIV | 8 |
| 4 | U-09 | Abdeckungskacheln fuehren zu den Lueckenobjekten | hoch | M | NICHT-INVASIV | 8 |
| 5 | U-14 | Konzept-Scrollwaende: Anker + Aufklapper | hoch | M | NICHT-INVASIV | 8 |
| 6 | U-20 | Leerer Mandant: naechster Schritt oben | mittel | S | NICHT-INVASIV | 7 |
| 7 | U-02 | Login: Klartextzeile zu "Mandant" | mittel | S | NICHT-INVASIV | 7 |
| 8 | U-15 | Seed-Anzeigetext ohne "synthetisch/Demo" | mittel-hoch | M | NICHT-INVASIV (+ 1 Owner-Gate-Anteil) | 7 |
| 9 | U-07 | Client-Filter auf /isms + Objektliste | hoch (latent) | M | NICHT-INVASIV | 7 |
| 10 | U-17 | Objekt-ID-Slug aus Entscheidungskarte entfernen | niedrig-mittel | S | NICHT-INVASIV | 6 |

## Quick Wins — sofort ohne Gate baubar (S, NICHT-INVASIV)
- U-16 Topbar-CSS reparieren (sichtbarer Renderfehler auf jeder Seite) — hoechster Sofort-Wert.
- U-03 "Begriffe erklaert -> Wissen"-Link — hoher Anfaenger-Hebel, minimaler Eingriff.
- U-20 Leerer Mandant: generischer naechster Schritt oben.
- U-02 Login-Klartext zu "Mandant".
- U-17 Objekt-ID-Slug ausblenden.
- U-13 "Ansicht zuruecksetzen" title/aria-Hinweis.

U-01 ist der groesste Anfaenger-Hebel und technisch S/non-invasiv, gilt aber wegen der
gate-geprueften Seite als "Product-Lead-Sichtung vor Bau" — nicht in der strengen
Ohne-Gate-Quick-Win-Menge, aber Prioritaet 1.

## Owner-Gate / Vorschlag (nicht im Alleingang bauen)
- U-06 DR-0013-Wortlaut/Reihenfolge auf /heute (als Vorschlag an Product-Lead).
- U-08 Globale Suche (eigenes Vorhaben, 06-D09, Snippet-Leak-Schutz).
- U-11 Neutraler Form-/Symbol-Marker (Ehrlichkeit heikel: keine Ampel; Product/QA).
- U-12 Deckungspfad/Coverage-Chain (neue Sicht/Ableitung).
- U-15 nur der Mandantenname "Consulting Operator Demo" (PDF Dok. 07).
- U-21 Modell-/Seed-Kante Bedrohung->Risiko->Schwachstelle (nicht still fuellen).
- U-04 Owner-aware (Scope-Wachstum von Wissen).

## Grenzabgleich
Kein Eintrag erfindet Bewertungen/Ampeln (U-09/U-11 explizit auf "erfasste Kanten-/Feldlage"
ohne Urteil begrenzt), verletzt die Mandanten-/Sphaerengrenze (U-20 nennt keinen Fremdmandanten),
fuehrt Demo-Etiketten ein (U-15 entfernt sie im Gegenteil) oder vermehrt die acht Orte
(U-19 belaesst das Label). Ehrlichkeit bleibt erhalten: alle Meta-Entrauschungen (U-05/U-06)
verlagern Substanz, loeschen sie nicht.
