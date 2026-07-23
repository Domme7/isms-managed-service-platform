# Context Pack – WP-032 Reports, Wissen, Administration (read-only, Antwort-Modus)

**Für:** `frontend-engineer` (Slices 1–3, sequenziell; committet nie selbst)
**WP-Definition (maßgeblich):** `work-packages/WP-032_REPORTS_WISSEN_ADMINISTRATION.md`
**Stand der Quellen:** 2026-07-23 (Seed 1.2.0 · Dok. 03–07 quellentreu seit WP-019 · Dok. 12/17/18
quellentreu seit WP-023 · Dok. 19 in der kleinen Rest-Abweichungsliste, aber am PDF belegbar —
Regel Null gilt unverändert)

## 1. Auftrag in einem Absatz

Die drei letzten Platzhalter-Orte der Hauptnavigation — **Reports** (`/reports`), **Wissen**
(`/wissen`), **Administration** (`/administration`) — werden **echte read-only Seiten auf dem
heutigen Seed**, im **Antwort-Modus** (DR-0013: Inhalt zuerst, Lücke als ruhige Schlusszeile),
ohne Demo-Disclaimer (DR-0011), **ohne internes Vokabular** (keine Dok.-§, keine
`F01`/`R12`/`snake_case`-Codes, keine Feldnamen), mit **ehrlich benannten Lücken statt erfundener
Werte**. Reihenfolge: **Administration → Reports → Wissen** (abnehmende Seed-Deckung; Administration
zuerst, weil sicherheitsnah und Seed-stark). **Kein Contract-/Seed-/DB-Umbau. Keine Schreibaktionen.
Read-only. Synthetisch. Administration ist Sicherheitsthema.**

## 2. Regel Null und steuernde Entscheidungen

- **Produktwahrheit sind die PDFs** (`docs/concept/pdf/`, DR-0006). Jede Tabelle, jedes Vokabular,
  jede Kardinalität vor Übernahme dort nachlesen; **Abschnittstitel zitieren** (Nummerierung weicht
  ab). Werkzeug: `python scripts/pdf_text.py 12 --suche "Case-Katalog"` (analog 06/19/17/18/03/07).
  Sitzungs-Extrakte (flüchtig, Komfort):
  `C:/Users/Domme/AppData/Local/Temp/claude/C--Users-Domme-Desktop-coding-apps-ISMS/f7ae6458-013c-45fe-bc68-2cb25c71a7da/scratchpad/pdf-extrakte/dok_12.txt`,
  `dok_06.txt`, `dok_19.txt`, `dok_17.txt`, `dok_18.txt`, `dok_03.txt`, `dok_07.txt`.
  Bei Widerspruch PDF vs. Markdown gilt das PDF; die Abweichung als Befund melden.
- **DR-0013 (Antwort-Modus):** Antwort/Struktur/Zählung über der Falz; Lücke als ruhige
  Schlusszeile, keine Wand; **kein internes Vokabular im UI**; die sichtbare Leitfrage ist die, die
  die Seite **heute** beantwortet (nicht die aspirative aus `places.ts`, die im nächsten Satz
  zurückgenommen würde). Beziehungen/Objekte in Domänensprache.
- **DR-0011 (keine Demo-Disclaimer):** keine „Simulation"/„Demo-Datenbestand"-Hinweise. Die
  Datenehrlichkeit (was ein Wert bedeutet, „x von y", Mandantengrenze) **bleibt**.
- **DR-0008 (Ehrlichkeitsgrenze):** keine erfundene Bewertung — kein Reifegrad, kein
  Sicherheits-Score, keine Connector-Health-Ampel, kein Report-„Status grün". Nur gezählte,
  belegte Aussagen mit Grundgesamtheit.
- **DR-0005 (Konzepttreue/-fehler):** Lücken benennen (O-WP032-xx), nie füllen; „oder besser" nur
  als Vorschlag, kein Alleingang.
- **`.claude/rules/security.md`:** keine echten Rechte, keine Schreib-Hebel, Mandantenisolation,
  kritische Aktionen bräuchten Human Gate — hier alle vermieden (read-only).
- **`.claude/rules/reporting.md`:** Case/Template/Snapshot/Manifest/Build-Artefakt trennen; Claims
  brauchen Quelle/Methodik/Confidence/Freigabe; manuelle Blöcke locked/review-on-change/replaceable
  — hier **als Struktur gezeigt**, nicht als lebende Engine gebaut.

## 3. Normative Kernaussagen (am PDF verifizieren, hier nur kuratiert)

### Administration (Slice 1)

- **Dok. 06, Abschnitt „Acht stabile Hauptorte":** Administration = „Nutzer, Rechte, Integrationen,
  Konfiguration, Audit Logs, Betrieb — **Nur bei entsprechender Berechtigung**." Abschnitt „Seiten-
  und Screenkatalog", **Screen S11 „Administration & Integration Health"**: Leitfrage „Ist der
  Tenant sicher, korrekt konfiguriert und verbunden?"; Kerninhalt „Nutzer, Rollen, Scope,
  Connectoren, Jobs, Fehler, Audit Log, Supportzugriff"; Rollen „Admin, Platform Ops". Abschnitt
  „Rollenbezogene Erlebniswelten": **Assurance & Administration World** (Auditor, Admin, Platform
  Ops), Leitfrage „Ist die Aussage belastbar, der Zugriff kontrolliert und der Betrieb
  nachvollziehbar?".
- **Dok. 03, Abschnitt „Kanonisches Rollenmodell":** R01–R12 mit Sphäre — Kunde (R01–R06),
  Unabhängig (R07), Betreiber (R08–R11), **R12 Tenant / Platform Administrator, Sphäre „Beide",
  Kernverantwortung „Nutzer, Rollen, Konfiguration, Integrationen und Betriebsfähigkeit"** — genau
  dieser Ort. Quelle im Code: `apps/web/lib/shell/roles.ts` (wörtlich, PDF-belegt).
- **Dok. 19, Abschnitt „Autorisierungsmodell: RBAC, ABAC und Beziehungen":** 10.2 „RBAC als
  verständliche Basis" (kanonische Basisrollen; **„Rollen sind keine universellen Rechtepakete"**),
  10.3 ABAC (Datenklasse, Region, Risikoschwelle, Zweck …), 10.4 ReBAC (Owner/Reviewer,
  Engagement-Zuordnung, Audit-Room). **19-D01: RBAC allein ist nicht ausreichend** →
  Kombinationsmodell. **Als Modell zeigen, nicht als durchgesetzt behaupten.**
- **Dok. 19, Abschnitt „Identitäts-Lifecycle":** Identitätstypen (Kundenbenutzer, Berater/
  Managed-Service-Personal, externe Auditoren/Lieferanten, Plattform-/Security-Admins, Service
  Accounts/Workload Identities, Connector Identities, kurzlebige Demo-/Testidentitäten, KI-/
  Agentenidentitäten); Joiner/Mover/Leaver; **keine Konten im Seed → Struktur, Bau = WP-030.**
- **Dok. 19, Abschnitt „Mandantenisolation und Kontextwechsel":** mehrschichtige Isolation
  (Tenant Context, RLS, Storage-Prefixes, Queue/Job-Metadaten, getrennte Connections, Search/Graph,
  Report Snapshots), Kontextwechsel (Kontext-Nonce, veralteter Mandantenkontext wird abgelehnt),
  Metadatenlecks (Trefferzahlen, Autocomplete, Graphkanten, Fehlertexte, Reportvorschauen).
  **Achtung:** Der Demo läuft client-seitig, **keine** serverseitige Durchsetzung (FINDING-0004,
  O-WP014-09) — die gelebte Trennung belegen die Wächter, die Durchsetzung **nicht** behaupten.
- **Dok. 19, Abschnitt „Canonical Audit Records":** Auslöser (Login/MFA/Session, Membership-/
  Rollen-/Policyänderung, Kontextwechsel, Risikoakzeptanz, Datei-Upload/Export, Support/Break-Glass,
  Connector-/Workflowänderung, Report-Freigabe …) + Mindestfelder — **keine Ereignisse im Seed →
  Struktur, keine Zeilen erfinden.**
- **Dok. 17, Abschnitte „Priorisierter Connector-Katalog"** (Connector-Familien mit Priorität und
  Prototyp-Tiefe), **„Connector Health Record"** (Authentifizierung, Erreichbarkeit, Datenfrische,
  Fehlerquote, Schemaabweichungen, Backlog, Reconciliation Queue), **IA16 „Operative Sichtbarkeit"**
  (Datenfrische, Connector Health, letzte Synchronisation), **IA18 „Demo ohne Produktivdaten"**
  (synthetische Payloads, Mock-Endpunkte). **Keine Connectoren im Produkt → Katalog als Struktur,
  kein Health-Zustand.**
- **Dok. 18, Abschnitt „Observability & Operations":** Betriebsrollen (Platform Operations),
  Health Checks/Rollback, SLO/Failure Mode, Observability by Design (Correlation/Causation ID,
  Tenant ID). **Keine Telemetrie im Demo → Konzept benannt, keine Metriken.**

### Reports (Slice 2)

- **Dok. 06, Abschnitt „Seiten- und Screenkatalog", Screen S10 „Reporting Studio":** Leitfrage
  „Welche Geschichte soll aus demselben Datenstand entstehen?"; Kerninhalt „Zielgruppe, Zeitraum,
  Narrative, Module, Vorschau, Freigabe, PDF/PPTX"; Rollen „Consultant, CISO". Abschnitt
  „Reporting-, PDF- und Präsentationserlebnis": Studio beginnt mit Anlass/Zielgruppe; Vorschau zeigt
  fehlende Daten/Quellen/Versionsstand/sensible Inhalte vor Export.
- **Dok. 12, Abschnitt „Kanonisches Report Package":** Pflichtfelder (Identität, Kommunikationsziel,
  Zielgruppe, Scope, Snapshot, Storyline, Content Blocks, Owner, Reviewer, Approver, Klassifikation,
  Artefakte, Verteilung, Historie, Outcome) + Lebenszyklus (geplant → … → archiviert).
  **Report Package ist NICHT im Objektvertrag (Dok. 07 F01–F09) → Konzeptkonstante (O-WP032-01).**
- **Dok. 12, Abschnitt „Report- und Artefakttypen":** Management/Executive (Executive One-Pager,
  Vorstandspräsentation, Management Review Pack, Investment Brief, Change Brief), CISO/ISMS-Betrieb,
  Audit/Assurance, Managed Services/Beratung, operative Auszüge. **Anzahl je Gruppe am PDF zählen.**
- **Dok. 12, Abschnitt „Content-Block-Architektur":** kanonische Blocktypen (Key Message, Decision
  Card, KPI Card, Trend Chart, Risk Landscape, Route View, Impact Chain, Action Block,
  Control/Evidence Block, Service Value Block, Timeline, Recommendation, Data Quality Block,
  Methodology Note, Evidence Appendix) je mit Mindestanforderung. **Anzahl am PDF verifizieren.**
- **Dok. 12, Abschnitt „PowerPoint-Engine", „Kanonischer Case-Katalog":** die wiederverwendbaren
  Presentation Cases (Executive Board Update, CISO Monthly Review, ISMS Management Review, Audit
  Readiness & Kick-off, Risk Investment Case, Managed Service Review, Customer Workshop, Incident
  Executive Update, Consultant Meeting Prep, Service Proposal, Portfolio Review, Handover &
  Transition Pack). „Geschützte manuelle Inhalte": **locked / review-on-change / replaceable.**
- **Dok. 12, Abschnitt „Claims, Quellen und Nachvollziehbarkeit":** Claim = Aussage + Typ (Fakt/
  Interpretation/Prognose/Empfehlung/Annahme) + Daten + Methode + Confidence + Owner/Reviewer +
  Freigabe. **Als Struktur zeigen, keine live Claims.** Abschnitt „Reporting-Verfassung" R01–R15
  (u. a. R06 „Unsicherheit ist sichtbar", R07 „Entwurf ist keine Freigabe") und „Was die Engine
  bewusst verhindert" (u. a. „grüne Statusdarstellung trotz fehlender Evidence") — deckt die
  DR-0008-Grenze.
- **Preis:** Dok. 12 nennt Preisannahmen (Investment Brief, Service Value/Proposal) → **benannte
  Lücke, nie eine Zahl** (O-KUNDE-01). Erzeugung PDF/PPTX = Phase 5 / WP-009.

### Wissen (Slice 3)

- **Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile Wissen:** „Suche, Glossar, Vorlagen, Best
  Practices, Lernhinweise — **Kontextsensitiv und rollenbezogen**." Abschnitt „Suche,
  Benachrichtigungen & Wiederaufnahme": globale Suche ist primärer Navigationsweg; **vertrauliche
  Treffer werden nicht über Snippets geleakt** (→ WP-027, nicht hier). Abschnitt „Onboarding,
  adaptive Komplexität & Hilfe": geführte Journeys, Hilfe.
- **Dok. 07, Abschnitt „Objektfamilien und kanonischer Katalog":** F01–F09 mit deutschem Namen +
  Leitfrage + Objekttypen (Quelle: `packages/contracts/src/vocabularies.ts` `OBJECT_FAMILIES`).
  Abschnitt „Beziehungsmodell": R01–R25 mit Typ/Beispiel/Regel. **Im UI in Domänensprache** (die
  deutschen Labels aus `lib/twin/data.ts`), **keine Codes** (DR-0013; O-WP032-05).
- **Ehrliche Wahrheit:** Wissen ist am dünnsten konzeptgedeckt (eine Navigationszeile + zwei
  Querschnitte). **Dok. 21 ist NICHT der Wissensort** — es ist interne Research-/Innovations-
  Operation (ADRs, Glossare fürs Bau-Team, Threat-Knowledge-Base als Datenquelle), nicht
  nutzerseitig. → O-WP032-04, offen benennen.

## 4. Code-Landkarte (Ist-Zustand `apps/web`)

| Bereich | Datei(en) | Relevanz |
|---|---|---|
| Orte | `lib/shell/places.ts` (Zeilen 100–125) | `reports`/`wissen`/`administration` mit `plannedScreen`, **ohne** `live`. **`live: true` setzen** (macht sie zu Wächter-erfassten Live-Orten). `question`/`hint` sind die Konzeptanker; sichtbare Antwort-Modus-Rahmung im Code begründen (O-WP032-02) |
| Platzhalter | `app/(shell)/{reports,wissen,administration}/page.tsx` · `components/shell/PlaceholderPage.tsx` | Die drei Seiten rendern heute `<PlaceholderPage>` (mit internem Text „Dok. 06, 06-D01", „eigenes Work Package") — **ersetzen**; `PlaceholderPage` bleibt für evtl. andere Nutzung, wird hier nur nicht mehr aufgerufen |
| Rollenmodell | `lib/shell/roles.ts` | R01–R12 mit `sphere`/`responsibility` (PDF-wörtlich); **Quelle für Administration Slice 1**; Kopfkommentar: Rollen sind **keine** Autorisierung |
| Vokabular (Glossar) | `packages/contracts/src/vocabularies.ts` | `OBJECT_FAMILIES` (F01–F09: Name/Leitfrage/Typen), `RELATIONSHIP_TYPES` (R01–R25) — **Quelle für Wissen Slice 3**; NICHT die Codes rendern |
| Domänen-Labels | `lib/twin/data.ts` | `objectTypeLabel`/`relationshipTypeLabel` (deutsche Klartext-Labels, DR-0013-konform) — **so** wird der Glossar sprachlich gerendert |
| Seed-Ableitungen (Reports-Grundlage) | `lib/isms/data.ts`, `lib/services/data.ts`, `lib/entscheidungen/data.ts` | mandantenlokale Zählbasis (Controls, Nachweise, Services/SLA, Entscheidungen) — **wiederverwenden** für die belegbare Datengrundlage (Slice 2), nur zählen |
| Kontextleiste | `components/shell/PageContextBar.tsx`, `lib/shell/page-context.ts` | Pflicht auf jeder neuen Seite; `derivePageContextFacts` liefert Scopes+Datenstand aus **bereits mandantengefilterten** Listen (nicht selbst filtern) |
| Seitenbausteine | `lib/shell/seitenbausteine.ts`, `components/shell/SeitenbausteineHinweis.tsx` | `BausteinOrt` um `reports`/`wissen`/`administration` erweitern; je Ort alle neun Bausteine mit ehrlichem Status (erwartbar viel `ohne_traeger`); Muster `objekt360`/`kundenstart` |
| Wächter | `lib/shell/__tests__/*` + `components/__tests__/{prozessvokabular,kontextleiste,leerzustand-mandantengrenze,seitenbausteine}.test.tsx` | Alle vier haben **Meta-Assertionen gegen die `live: true`-Orte** und Register je Ort. Drei neue Orte **eintragen**; Regeln nie abschwächen; Leerzustände sind die Leak-Versuchungsstelle (FINDING-0009) |
| QA | `pnpm qa:visual WP-032` | Screenshots + axe → `docs/project/visual/WP-032/`; QA-Build strikt getrennt (`.next-qa`/Port 3100) |

## 5. Belegte Datenbasis (heutiger Seed — nachrechnen, nie abschreiben)

Seed 1.2.0: **43 Objekte / 62 Beziehungen** — Nordwerk 34/51, Consulting Operator 9/11,
**Finovia 0/0, MediCore 0/0**. Referenz: `python scripts/seed_facts.py`.

- **Trägt Administration (Slice 1):** aktiver Mandant + `scope_ids` (rohe Kennungen, keine
  Scope-Objekte — O-WP014-03), Datenstand (`record_time`), das globale Rollenmodell (R01–R12,
  mandantenunabhängig).
- **Trägt die Reports-Grundlage (Slice 2, nur Zählungen, mandantenlokal):** Controls/Nachweise
  (aus `lib/isms/data.ts`), Managed Services + SLA/Deliverables/Reviews (nur Nordwerk + Consulting
  Operator, aus `lib/services/data.ts`), Decision Records (3, aus `lib/entscheidungen/data.ts`).
- **Trägt Wissen (Slice 3):** das kanonische Vokabular (F01–F09, R01–R25) — **mandantenunabhängig**,
  daher voll renderbar auch für leere Mandanten.
- **Nicht existent (⇒ keine Anzeige, sondern benannte Lücke):** Konten/Identitäten, durchgesetzte
  Rechte, Connectoren/Health, Audit-Ereignisse, Betriebs-Metriken, Report-Package-/Content-Block-/
  Manifest-Objekte, Claims/Snapshots, Vorlagen, Best Practices, Preise.

## 6. Ehrlichkeits- und Sicherheitsregeln (kompakt)

1. **Administration = Sicherheitsthema:** keine echten Rechte, **keine Rechtematrix als
   durchgesetzt**, **keine Sicherheitszusage** („Tenant ist sicher"), keine Schreib-Hebel; nur
   mandantenlokaler Konfigurationsstand + Modelle als Struktur. Rollen = Perspektive (`roles.ts`).
2. **Mandantengrenze überall:** kein Name/keine ID/keine Zählung fremder Mandanten (auch im
   Leerzustand — FINDING-0009). Globales Konzept (Rollenmodell, Katalog, Glossar) darf gezeigt
   werden, aber **nicht** als „Daten dieses Mandanten" ausgegeben werden.
3. **Read-only heißt read-only:** kein Eingabefeld, kein Button mit Schreibsemantik, kein neuer
   localStorage-Schlüssel; Action Rail bleibt `ohne_traeger`.
4. **Antwort-Modus (DR-0013):** Inhalt zuerst, Lücke als ruhige Schlusszeile; sichtbare Leitfrage =
   heute beantwortbar; **kein internes Vokabular** (keine Dok.-§, keine `F01`/`R12`/`snake_case`,
   keine Feldnamen, kein „Work Package"/„Screen S…").
5. **Keine erfundene Bewertung** (DR-0008): keine Ampel/Score/Trend/Prozent; Reports-Grundlage nur
   als Zählung mit Grundgesamtheit (Muster `/heute`-Beobachtungen); Prozessvokabular-Wächter grün.
6. **Preisfreiheit** (Reports): kein Währungszeichen/Betrag/Band; Preisstellen als benannte Lücke.
7. **Glossar in Domänensprache:** deutsche Labels; englische Fachbegriffe (Threat, Control,
   Framework) erlaubt (app-weit üblich), Codes/`snake_case` nicht (O-WP032-05).
8. **Keine Demo-Disclaimer** (DR-0011); Datenehrlichkeit bleibt.
9. Loading/Empty/Error/Conflict-Zustände gestalten (`.claude/rules/frontend.md`, Dok. 06 Abschnitt
   „Erlebnisfluss & UI-Zustände"): Empty erklärt Nutzen/nächsten Schritt, keine leere Tabellenwüste.
10. Minimal beginnen, per `qa:visual` zeigen; große Gestaltung gehört zu den Cockpit-Varianten.
11. Kollision wörtlicher PDF-Strukturtexte mit Wächter-Verbotslisten (z. B. „Budget"/„Kosten" in
    Report-/Rechte-Tabellen): **nicht still lösen** — Stop Condition, Regelevolution nur über
    QA-/Product-Gate (Muster O-WP020-12).

## 7. Relevante offene Fragen und Findings (referenzieren, nicht neu lösen)

- **FINDING-0009** (Leerzustands-Leak-Klasse — Negativbeweise sind Pflicht-ACs, v. a. Administration).
- **FINDING-0004 / O-WP014-09** (keine serverseitige Durchsetzung / voller Seed im Client — bekannte
  benannte Grenze; **nicht verschärfen**, Muster der bestehenden Orte übernehmen; Administration
  behauptet keine Durchsetzung).
- **O-WP014-03** (Scopes sind keine Objekte — rohe IDs zeigen, Lücke benennen).
- **O-WP012-01 / O-WP006-02** (Katalog-Objekttypen nicht im Vertrag → Konzeptkonstante; jetzt auch
  Report Package, O-WP032-01).
- **O-WP020-05 / WP-027** (globale Suche + Snippet-Leak-Schutz — Wissen verweist, baut nicht).
- **O-WP020-02** (9 Bausteine vs. „fünfteilige Seitenanatomie" — die drei neuen Orte sind
  `ohne_traeger`-lastig; Zählkonflikt bekannt, nicht harmonisieren).
- **O-WP032-01…08**: Vorschlagstabelle in der WP-Definition — beim Abschluss in
  `docs/project/OPEN_QUESTIONS.md` registrieren.

## 8. Kommandos

```bash
pnpm install
pnpm lint && pnpm typecheck && pnpm build
pnpm --filter @isms/web exec vitest run            # frisch, ohne Turbo-Cache
python scripts/validate_handoff.py
python scripts/seed_facts.py                       # kanonische Seed-Zahlen
python scripts/pdf_text.py 12 --suche "Case-Katalog"   # Regel Null (Reports)
python scripts/pdf_text.py 19 --suche "Mandantenisolation"  # (Administration)
python scripts/pdf_text.py 06 --suche "Screenkatalog"       # S10/S11
pnpm --filter @isms/web dev                        # http://localhost:3000/administration
pnpm qa:visual WP-032                              # Screenshots + axe → docs/project/visual/WP-032/
```

**Nie:** `pnpm build` bei laufendem Dev-Server (qa:visual nutzt `.next-qa`/Port 3100).
Der Builder committet nie selbst; nach jedem Slice übergibt er an den Orchestrator.
Reihenfolge: **Slice 1 Administration → Slice 2 Reports → Slice 3 Wissen** (WP-Definition,
Abschnitt „Ziel", Priorisierung).
