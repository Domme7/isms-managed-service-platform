# Context Pack – WP-006 Kundenwelt Stufe 1 (read-only aus Dok. 14/16)

**Für:** `frontend-engineer` (Slices 1–3, sequenziell; committet nie selbst)
**WP-Definition (maßgeblich):** `work-packages/WP-006_KUNDENWELT_STUFE_1.md`
**Stand der Quellen:** 2026-07-23 (Seed 1.2.0 · web-Tests 403 grün · Dok. 03–07 quellentreu
seit WP-019 · **Dok. 14/16 quellentreu seit WP-023** — DR-0010-Bauregel damit erfüllbar)

## 1. Auftrag in einem Absatz

Der Kunde bekommt seinen sichtbaren Pfad, read-only auf dem heutigen Seed (DR-0009
Entscheidung 2, vorgezogen per DR-0010 Nr. 2): eine mandantenlokale **Kunden-Startseite
„verwalten"** (eigene Scopes, Ziele, Services, Nachweise — Stufe-1-Näherung an den Customer
Workspace aus Dok. 06), ein **Servicekatalog zum Ansehen** (Dok. 14: Servicefamilien,
Offers, Service-Tiefen, Pakete — vollständig **preisfrei**), und ein
**Onboarding/Zielprofil-Struktur-Assistent** (Dok. 16: erklärte Strukturen, **kein Formular,
keine Speicherung**). Fehlende Träger (Demo-Accounts, Preise, Buchung, echter Login,
Strategie-DNA-/Zielprofil-Objekte) werden sichtbar benannt statt erfunden.
**Kein Contract-/Seed-/DB-Umbau. Read-only. Synthetisch. Kundensphäre ist Sicherheitsthema.**

## 2. Regel Null und steuernde Entscheidungen

- **Produktwahrheit sind die PDFs** (`docs/concept/pdf/`, DR-0006). Jede Tabelle, jedes
  Vokabular, jede Kardinalität vor Übernahme dort nachlesen; **Abschnittstitel zitieren**.
  Werkzeug: `python scripts/pdf_text.py 14 --suche "Paketarchitektur"` (analog 16/03/06).
  Sitzungs-Extrakte (flüchtig, nur Komfort):
  `C:/Users/Domme/AppData/Local/Temp/claude/C--Users-Domme-Desktop-coding-apps-ISMS/f7ae6458-013c-45fe-bc68-2cb25c71a7da/scratchpad/pdf-extrakte/dok_14.txt`, `dok_16.txt`, `dok_03.txt`, `dok_06.txt`.
  Markdown-Zweitquelle (quellentreu, Kopfnotiz mit Konkordanz beachten):
  `docs/concept/active/14_…`, `16_…`, `03_…`, `06_…`. Bei Widerspruch gilt das PDF.
- **DR-0010 Nr. 5 (Bauregel):** Ein neues Fachmodul wird nur aus PDF-Originalen oder
  nachweislich quellentreuen Fassungen gebaut. Für die Kundenwelt heißt das: jeder
  Dok.-14/16-Anteil wird am PDF/Extrakt belegt.
- **DR-0009 Entscheidung 2:** Konzeptanker-Tabelle der Kundenwelt (anmelden → R03–R06 +
  Demo-Accounts; verwalten → Customer Workspace/Scope Governance/Zielprofile; buchen →
  Dok. 14 mit Aktivierungs-Gate; Strukturen → Dok. 16 + Anfängererlebnis). **Buchen ist
  Stufe 2** (Human Gate, Dok. 04 J05), **echter Login eigenes Auth-WP** (O-KUNDE-02).
- **DR-0010 Nr. 2:** Stufe 1 vor WP-021 — die Demo-Accounts und Konzept-Unternehmen
  existieren noch nicht; Lücken benennen, nicht füllen.
- **DR-0008:** Ehrlichkeitsgrenze gilt fort — die UI errechnet/behauptet keine Bewertung
  ohne Datenträger (kein Zielstatus, Trend, Puls, Reifegrad).
- **O-KUNDE-01:** Der Preis-Guardrail bleibt in diesem WP **streng** — keine Währungs-/
  Preisangabe irgendwo im Produkttext. Preisstellen der Quellstruktur = benannte Lücke.
- **DR-0005:** Konzeptlücken benennen (O-WP006-xx), nie füllen; „oder besser" nur als
  Vorschlag.

## 3. Normative Kernaussagen (am PDF verifizieren, hier nur kuratiert)

### Dok. 06 — Ort und Gestalt der Kundenwelt

- Abschnitt **„Acht stabile Hauptorte"**, Zeile Kunden: „Portfolio und Customer Workspaces —
  Für Kundenrollen ggf. direkt der eigene Workspace." **06-D01:** genau acht Orte (kein
  neuer Nav-Ort). **06-D02:** „Kundennutzer können tenantbezogen direkt im eigenen Customer
  Workspace starten" (Stufe 1: sichtbarer Einstieg statt Redirect → O-WP006-03).
- Screenkatalog **S02 „Customer Workspace"**: Leitfrage „Wie verstehe ich diesen Kunden in
  einer Minute?" — Inhalte: Strategie-DNA, Zielstatus, Puls, Top-Ursachen, Hebel, Zeitachse,
  Servicewirkung; Zielgruppe „Kunde und Beratung".
- Abschnitt **„Customer Workspace"**: oben Strategie-DNA, Zielprofil, Managed-Service-Anteil,
  aktueller Trend; darunter Puls, Veränderungen, Ursache-Wirkungs-Ketten, Hebel,
  Servicebeitrag, Zeitachse; Executive/ISMS/Consulting **Lens**.
  **Achtung:** Fast nichts davon hat heute einen Datenträger → benennen (WP-016-Muster),
  nicht simulieren. Lens-Umschaltung ist Nicht-Ziel (O-WP006-06).

### Dok. 03 — Kundenrollen, Sphäre, Anfängererlebnis

- Abschnitt **„Kanonisches Rollenmodell"**, Spalte „Sphäre": **Kundensphäre = R01 Executive
  Sponsor, R02 CISO/Security Lead, R03 ISMS Manager, R04 Business/Process Owner, R05
  Asset/Control Owner, R06 Evidence Contributor** (R07 Unabhängig, R08–R11 Betreiber,
  R12 Beide). Rollenprinzip: „Serviceanbieter sehen nur Kunden und Daten, für die ein
  aktiver Auftrag und Scope besteht."
- Abschnitt **„Zugriff, Datenschutz und Vertrauensgrenzen"**: „Personas dürfen nicht mit
  pauschalen Vollzugriffen umgesetzt werden"; Scope-basiert („Zugriff folgt Mandant,
  Einheit, Objekt, Auftrag, Aufgabe und Zeitraum"); Need-to-know.
  **Umkehrschluss für die Kundenwelt:** Portfolio-Heatmap, Auslastung, Profitabilität,
  Mandantenvergleiche sind Betreiber-Inhalte (Steckbrief „Managed Service Lead") und haben
  auf Kundenseiten nichts zu suchen. Kundenrollen-Steckbriefe (R01–R06) enthalten nichts
  Mandantenübergreifendes.
- Abschnitt **„Anfängererlebnis"**: „Neue Nutzer sehen keine leere Plattform, sondern
  realistische Startdaten, geführte Aufgaben oder eine klare Einladung." → Leerzustand
  Finovia/MediCore = Einladung mit Struktur-Assistent + Katalog.
- Abschnitt **„Demo-, Test- und Beispielrollen"** + **„Verbindliche Demo-Accounts"**: vier
  Demo-Organisationen, neun Demo-Accounts — **kommen erst mit WP-021**, als Lücke benennen.
  **Befund:** Dok. 16, Abschnitt „Synthetische Demo-Daten und Demo-Dramaturgie" nennt
  **fünf andere** Unternehmen (Nordstern, AlpenCloud, Rheinbank, MediNova, GreenGrid) →
  O-WP006-01, nicht auflösen.

### Dok. 14 — Servicekatalog (Slice 2)

- Abschnitt **„Servicefamilien und vollständiger Katalog"**:
  - „Katalogübersicht": **SF01–SF12** (ISMS Governance & Leadership · Risk & Treatment ·
    Control Assurance & Evidence · Policy & Documentation · Audit & Certification Readiness ·
    Third-Party & Supply Chain · Threat, Vulnerability & Incident Governance · Awareness &
    Competence · Compliance & Regulatory Change · Reporting & Decision Support · Virtual
    CISO / ISMS Office · Platform & Data Operations) — je mit Primärem Outcome und
    typischem Käufer (Spalten am PDF gegenlesen).
  - „Kanonische Service Offers": **SO01–SO15** (Managed ISMS Governance · Managed Risk
    Management · Managed Control Assurance · Managed Policy Lifecycle · Managed Evidence
    Operations · Managed Audit Readiness · Managed Supplier Risk · Managed Threat &
    Vulnerability Governance · Managed Findings & Exceptions · Managed Awareness &
    Competence · Regulatory Change Monitoring · Executive Reporting & Board Advisory ·
    Virtual CISO / Strategic Security Office · Platform & Integration Operations · ISMS
    Transition & Target Profile) — je mit Standardergebnis und typischem Rhythmus.
  - „Angebotskarte je Service": **zehn Fragen** (Problem · gekauftes Ergebnis · enthalten ·
    bleibt beim Kunden · Daten/Voraussetzungen · Frequenz/Service-Level · Qualitäts-/
    Wirkungsmessung · **Preisbildung → nur als benannte Lücke** · Alternativen ·
    Reduktion/Erweiterung/Ende).
- Abschnitt **„Service-Tiefen statt starrer Goldpakete"**: **L1 Guide, L2 Co-Manage,
  L3 Operate, L4 Embedded Office** — „beschreiben Verantwortung und Delivery-Intensität,
  nicht Prestige"; „Nicht jedes Service Offer unterstützt alle Tiefen."
- Abschnitt **„Paketarchitektur"**: „Pakete beschleunigen die Auswahl, ersetzen aber keine
  Charter"; acht Pflichtbestandteile je Paket — darunter „**eine illustrative
  Preisbandbreite**" (→ benannte Lücke, O-WP006-05); Tabelle „Empfohlene Paketfamilien":
  **Navigate · Co-Managed ISMS · Managed ISMS Office · Embedded Security Office · Audit
  Route · Regulatory Route** (mit enthaltenen Kern-Offers und typischer Tiefe).
- Leitplanken: „Kommerzielle Verfassung" **CP11** („Interne Alternative bleibt sichtbar …
  damit die Plattform nicht zur versteckten Verkaufsmaschine wird") und „Was ausdrücklich
  vermieden wird"; Abschnitt „Preis- und Angebots-UX", Opportunity Card: „**Verbot der
  automatischen Buchung**"; Steuerungsfeld „Preisstatus" + **D14-11** (alle Preisbänder
  synthetische Designannahmen — Stufe 1 übernimmt **gar keine**).
- **Nicht übernehmen:** Abschnitte „Preisverfassung und Preisformel", „Illustrative
  Plattformbänder", „Illustrative Managed-Service-Pakete", „Illustrative
  Einzelservice-Bänder", „Öffentliche Marktanker" — Existenz als Lücke benennen
  (O-KUNDE-01), keine Zahl rendern.

### Dok. 16 — Struktur-Assistent (Slice 3)

- Abschnitt **„Lifecycle-Modell"**, Tabelle „Kanonische Phasen": **elf Phasen 0–10**
  (Prospect/Sandbox · Qualification · Foundation · Discover · Design · Validate ·
  Transition · Activate · Operate & Improve · Change · Reduce/Internalize/Exit) — je mit
  Ziel, zentralen Ergebnissen, Exit Gate.
- Abschnitt **„Qualification und Onboarding Charter"**: **zehn Mindestfragen** der
  Qualification; Charter-Mindestinhalte (Ziel/Nicht-Ziele · vorläufiger Scope/Ausschlüsse ·
  Sponsor/Owner/Leads · Einstiegspfad/Phasen · Deliverables · Entscheidungs-/
  Eskalationsrechte · Daten-/Zugriffsvoraussetzungen · Termin-/Budgetkorridor · Risiken/
  Annahmen/Abbruchkriterien · Definition of Ready).
- Abschnitt **„Firmenanlage und Organisationsfundament"**: vier Anlagewege (manuell geführt ·
  Strukturimport · Klonen neutraler Vorlage · Konzernstruktur); **Mindeststruktur** (acht
  Punkte: Kundenname/neutrale Identität · Region/Datenresidenz · mindestens eine
  Organisationseinheit · mindestens ein kritischer Geschäftsprozess/Service · Sponsor +
  ISMS Owner + operative Vertretung · vorläufiger Scope · Zielhypothese · Datenowner);
  „Strukturtiefe": Übermodellierung wird als Risiko angezeigt.
- Abschnitt **„Identität, Rollen und Zugriff"**: reale Personen werden „auf die kanonischen
  Produktrollen aus Dokument 03 gemappt"; Zugriffsprinzipien (Least Privilege/Need-to-Know ·
  getrennte Kunden- und Provideradministration · zeitlich begrenzte Zugriffe · explizite
  Freigabe sensibler Daten · protokollierte Änderungen · Entzugs-/Exit-Prozesse); „Access
  Readiness Gate".
- Abschnitt **„Scope Discovery und Scope Governance"**: **neun Scope-Dimensionen**;
  **sechs Pflichtangaben je Ausschluss** (Begründung · verantwortliche Entscheidung ·
  Abhängigkeiten/Schnittstellen · verbleibendes Risiko · Überprüfungstermin · Auswirkung);
  Scope-Qualitätsprüfung und -Versionierung (nur erklären, nicht bauen).
- Abschnitt **„Strategie-DNA"**, Tabelle „Pflichtdimensionen": **zwölf Dimensionen**
  (Geschäftskritikalität · Risikophilosophie · Regulierungsintensität · Zielambition ·
  Geschwindigkeit · Budgetflexibilität · Interne Kapazität · Managed-Service-Anteil ·
  Automatisierungsgrad · Nachweistiefe · Entscheidungsstil · Kommunikationsstil) — je mit
  Leitfrage und Beispielausprägungen.
- Abschnitt **„Zielprofile"**: **neun Zielprofiltypen** (Minimum Viable Security ·
  Capability Target · Regulatory Compliance · Certification Readiness · Risk Reduction ·
  Operational Resilience · Customer Trust · Transformation Enablement · Managed Capability);
  „Zielprofil-Vertrag" (elf Inhalte); „Mehrere Zielprofile".
- Rahmung: Abschnitt „Guided UX und Einstiegspfade" (Guided Quickstart, sieben Schritte —
  als **erklärte** Führung); Verfassung **OL01** (Ziel vor Vollständigkeit), **OL04** (jede
  Annahme bleibt sichtbar), **OL06** (Datenminimierung), **OL07/16-D07** (Scope, Zielprofil,
  Risikotoleranz, Serviceübernahme, Go-live = menschliche Freigabe — zeigen, nicht
  simulieren); **16-D01** (Lifecycle, kein Wizard), **16-D02/D03** (drei Einstiegspfade,
  gleiche kanonische Objekte), **16-D05** (Audit-Readiness nur eine Zielart), **16-D12**
  (keine automatische Buchung), **16-D16** (alles synthetisch); Abschnitt
  „Serviceempfehlung und Servicekonfiguration", „Kein Dark Pattern".

## 4. Code-Landkarte (Ist-Zustand `apps/web`, nach WP-020 Slice 1–4 + Slice 2 in Arbeit)

| Bereich | Datei(en) | Relevanz |
|---|---|---|
| Orte | `lib/shell/places.ts` | Ort `kunden` ist `live: true`, `href: '/twin'`, **`match` enthält bereits `/kunden`** (freie Route); Ort `services` trägt „Katalog" in der Inhaltsbeschreibung. **Kein neuer Nav-Ort** (06-D01) |
| Rollen | `lib/shell/roles.ts` | R01–R12 mit `sphere: 'Kunde' \| 'Betreiber' \| 'Unabhängig' \| 'Beide'` — Kundenrollen-Rahmung darüber ableiten; Rollen sind **keine** Autorisierung (Kopfkommentar) |
| Session | `lib/shell/session.ts` | Nach WP-020 Slice 2: `roleId` optional („neutral"), Rollenwahl in der Topbar. **Beim Start verifizieren** — sonst Stop Condition |
| Seitenbausteine | `lib/shell/seitenbausteine.ts`, `components/shell/SeitenbausteineHinweis.tsx` | Konvention aus WP-020 Slice 3: je Ort Zuordnung zu neun Bausteinen (`BAUSTEIN_ABDECKUNG`), vier Status, keine leeren Attrappen. Neue Seiten brauchen eigene Einträge (`BausteinOrt` erweitern, Muster `objekt360`) |
| Detailtiefe/Dashboard | `lib/heute/detailtiefe.ts`, `lib/heute/dashboard.ts` | WP-020-Slice-3/4-Muster für Ebenen und react-freie Kachel-Ableitungen |
| Service-Ableitungen | `lib/services/data.ts` | Mandantenlokale Auflösung Managed Service + SLA/Deliverables/Reviews/covered/required/contributions — **wiederverwenden** für die Startseite (Slice 1) und die „aktive Services"-Hälfte des Katalogs (Slice 2) |
| ISMS/Twin-Ableitungen | `lib/isms/data.ts`, `lib/twin/data.ts`, `lib/twin/object-detail.ts` | Evidence-/Objektlisten und Objekt-360-Verlinkung (`objectDetailHref` ist seed-frei) |
| Kontextleiste | `components/shell/PageContextBar.tsx` (`CONTEXT_GAPS`) | Pflicht auf neuen Hauptseiten; benannte Lücken nach O-WP016-08-Muster |
| Wächter | `components/__tests__/prozessvokabular.test.tsx` · `kontextleiste.test.tsx` · `leerzustand-mandantengrenze.test.tsx` · `seitenbausteine.test.tsx` | Alle vier haben **Meta-Assertionen gegen die `live: true`-Orte** und Register je Ort. Neue Seiten/Komponenten **eintragen**; Regeln nie abschwächen. Leerzustände sind die Leak-Versuchungsstelle (FINDING-0009) |
| QA | `pnpm qa:visual WP-006` | Screenshots + axe → `docs/project/visual/WP-006/`; QA-Build strikt getrennt (`.next-qa`/Port 3100) |

## 5. Belegte Datenbasis (heutiger Seed — nachrechnen, nie abschreiben)

Seed 1.2.0: **43 Objekte / 62 Beziehungen** — Nordwerk 34/51, Consulting Operator 9/11,
**Finovia 0/0, MediCore 0/0**. Referenz: `python scripts/seed_facts.py`.

- **Trägt die Startseite (Nordwerk):** `scope_ids` (rohe Kennungen — Scopes existieren
  **nicht** als Objekte, O-WP014-03), `Objective`/`KPI` (je 1, aus der Service-Schicht),
  `Managed Service` + `SLA`/`Deliverable`/`Review` (nur Nordwerk + Consulting Operator),
  `Evidence`-Objekte, `Decision Record` (3, auf `/entscheidungen`), `lifecycle_status`
  (08-D07-Glosse: kein Prüfergebnis), Kanten-`confidence`.
- **Existiert im Contract, aber nicht im Seed** (→ benannte Lücke, WP-021): `Strategie-DNA`
  (F01), `Target Profile` (F09), `ISMS-Scope`/`Ausschluss` (F01), `Task` (F08).
- **Existiert gar nicht im Contract** (→ Code-Konstante statt Daten, O-WP006-02):
  Service Family, Service Offer, Package, Onboarding Case, Customer Account, Baseline,
  Target Route, Responsibility Blueprint.
- **Nicht existent (⇒ keine Anzeige, sondern benannte Lücke):** Preise/Preisbänder,
  Zielstatus/Trend/Puls/Hebel/Zeitachse, Managed-Service-Anteil als Wert, Demo-Accounts,
  Freigaben/Approver, Aufgaben/Fristen.

## 6. Ehrlichkeits- und Sicherheitsregeln (kompakt)

1. **Kundensphäre:** Neue Seiten rendern und verlinken ausschließlich mandantenlokal; keine
   Namen/IDs/Zählungen fremder Mandanten (auch nicht im Leerzustand — FINDING-0009-Klasse);
   keine Betreiber-Inhalte (Portfolio, Auslastung, Profitabilität, Mandantenvergleich).
2. **Preisfreiheit:** kein Währungszeichen, kein Betrag, kein Band — Preisstellen der
   Quellstruktur als benannte Lücke mit O-KUNDE-01-Verweis.
3. **Katalog = Konzeptstruktur, Services = Datenbestand** — zwei sichtbar getrennte
   Herkünfte, kein erfundenes Mapping Instanz↔Offer.
4. **Struktur-Assistent erfasst nichts:** kein Eingabefeld, kein neuer
   localStorage-Schlüssel, Beschriftung „erklärte Struktur, keine Erfassung" (sinngemäß).
5. Jede wörtlich übernommene PDF-Tabelle als react-freie Konstante mit Abschnittstitel-
   Quellkommentar; Kardinalitäten im Test gegen die Konstante, die Konstante gegen das PDF
   (Konzepttreue-Gate).
6. Fehlende Träger benennen statt füllen (WP-016-Ehrlichkeitsblock-Muster); keine Bewertung,
   kein Prozessvokabular, keine erfundene Übersetzung im Produkttext (Wächter).
7. Anmeldung/Rollen bleiben beschriftete Simulation (O-KUNDE-02); neutral-fähig (Session
   ohne Rolle rendert vollständig).
8. Loading/Empty/Error-Zustände gestalten (`.claude/rules/frontend.md`); Leerzustand =
   Einladung (Dok. 03 „Anfängererlebnis").
9. Minimal beginnen, per `qa:visual` zeigen; große Gestaltung gehört in WP-025.
10. Kollision wörtlicher PDF-Strukturtexte mit Wächter-Verbotslisten (z. B. „Budget" in
    Dok.-16-Tabellen): **nicht still lösen** — Stop Condition, Regelevolution nur über
    QA-/Product-Gate (Muster O-WP020-12).

## 7. Relevante offene Fragen und Findings (referenzieren, nicht neu lösen)

- **O-KUNDE-01** (Preis-Guardrail — bleibt hier streng), **O-KUNDE-02** (Login Simulation).
- **O-WP020-08** (06-D02 Kundenstart — Stufe 1 liefert die Teil-Auflösung, O-WP006-03).
- **O-WP014-03** (Scopes sind keine Objekte — rohe IDs zeigen, Lücke benennen).
- **O-WP012-01** (Service Definition/Offer/Instance nicht im Objektvertrag → O-WP006-02).
- **O-WP016-08** (Querschnittsfelder ohne Mandantenwert — Kontextleisten-Lücken).
- **FINDING-0009** (Leerzustands-Leak-Klasse — Negativbeweise sind Pflicht-ACs).
- **FINDING-0004/O-WP014-09** (kein DB→UI; client-seitiger `DEMO_SEED` ist bekannte, benannte
  Demo-Grenze — nicht verschärfen, Muster der bestehenden Orte übernehmen).
- **O-WP006-01…07**: Vorschlagstabelle in der WP-Definition — beim Abschluss in
  `docs/project/OPEN_QUESTIONS.md` registrieren.

## 8. Kommandos

```bash
pnpm install
pnpm lint && pnpm typecheck && pnpm build
pnpm --filter @isms/web exec vitest run          # frisch, ohne Turbo-Cache
python scripts/validate_handoff.py
python scripts/seed_facts.py                     # kanonische Seed-Zahlen
python scripts/pdf_text.py 14 --suche "Servicefamilien"   # Regel Null
python scripts/pdf_text.py 16 --suche "Zielprofil"
pnpm --filter @isms/web dev                      # http://localhost:3000/login
pnpm qa:visual WP-006                            # Screenshots + axe → docs/project/visual/WP-006/
```

**Nie:** `pnpm build` bei laufendem Dev-Server (qa:visual nutzt `.next-qa`/Port 3100).
Der Builder committet nie selbst; nach jedem Slice übergibt er an den Orchestrator.
