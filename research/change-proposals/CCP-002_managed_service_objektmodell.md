# CCP-002 – Managed-Service-Objektmodell im digitalen Zwilling (Definition/Offer/Instance, Run/Work Package, Portfolio/Engagement, delivered_by)

| Feld | Inhalt |
|---|---|
| CCP ID / Titel | CCP-002 – Managed-Service-Objektmodell im digitalen Zwilling |
| Status | **Entwurf — Human Gate ausstehend** |
| Datum | 2026-07-22 |
| Autor (Rolle) | Concept Author (Prozess nach Dok. 21 §21) |
| Auslöser | WP-012 Slice 1 (synthetische Managed-Service-Demo-Schicht); Frage-IDs **O-WP012-01**, **O-WP012-02**, **O-WP012-03**, **O-WP012-04** (`docs/project/OPEN_QUESTIONS.md`, `packages/demo-seed/seed-manifest.json` open_questions) |
| Betroffene Dokumente | Dok. 07 v1.0 §6 (F09-Katalog), §9 (R21/R22), §17/07-D11 (Tenant-Grenze, Plattformreferenzen), §24 (07-O06); Dok. 13 v1.0 §4.1–§4.5; Dok. 14 v1.0 §4 (Katalogobjekte); Dok. 15 v1.0 §4.1/§4.2/§4.4 |
| Betroffene Artefakte | `packages/contracts/src/vocabularies.ts` (`OBJECT_TYPES_F09`, `RELATIONSHIP_TYPES` R21/R22), `packages/demo-seed/src/managed-services.ts` (Service-Schicht, Delivery-Team-Modellierung), `packages/demo-seed/README.md`, `docs/project/OPEN_QUESTIONS.md` |

> **Keine Änderung aktiver Spezifikationen durch dieses Dokument; Umsetzung erst nach
> Freigabe (Human Gate) via Concept-Author-WP.**

---

## 1. Problem und Evidenz

Beim Ausmodellieren der Managed-Service-Demo-Schicht (WP-012 Slice 1, strikt nur kanonische
Typen aus Dok. 07 via `@isms/contracts`) wurden vier echte Lücken zwischen dem
Betriebsmodell (Dok. 13/15) und dem kanonischen Objektmodell (Dok. 07 §6/§9) sichtbar.
Nichts wurde erfunden; die Demo nutzt dokumentierte Workarounds.

### 1.1 O-WP012-01 – Service Definition / Offer / Instance vs. ein Typ „Managed Service"

- **Dok. 13 §4** trennt ausdrücklich: „Das Betriebsmodell trennt wiederverwendbare
  Definition, kundenspezifische Aktivierung und konkrete Leistungserbringung." §4.1 nennt
  die **Service Definition** ein „versioniertes, mandantenunabhängiges Muster"; §4.2 das
  **Service Offer** als „kommerzielle und vertriebliche Ausprägung"; §4.3 die
  **Service Instance** als „aktivierte kundenspezifische Leistung" mit Pflichtfeldgruppe
  Identität („Service-Instance-ID, Mandant, Service Definition, Version, Status").
- **Dok. 14 §4** führt Service Family, Service Definition, Service Offer, Package,
  Price Book, Quote/Commercial Baseline als **eigene kanonische Katalog- und Preisobjekte**.
- **Dok. 07 §6 (F09)** kennt dagegen nur den Kernobjekttyp `Managed Service` (neben SLA,
  Deliverable, Review). Welche der drei Dok.-13-Ebenen dieser Typ meint, ist unspezifiziert.
- Demo-Workaround: nur die Service Instance ist materialisiert.

### 1.2 O-WP012-02 – Service Run und Work Package ohne Objekttyp

- **Dok. 13 §4.5:** ein **Service Run** „repräsentiert eine konkrete Periode oder einen
  Trigger … bündelt Work Packages, Entscheidungen, Evidence, Deliverables, Quality Gates
  und Abweichungen"; der **Outcome Review** prüft nachgelagert die Wirkung; „Ein
  abgeschlossener Run ohne Outcome Review ist vollständig dokumentiert, aber noch nicht als
  wirksam bestätigt."
- **Dok. 15 §4.4:** ein **Work Package** ist „die kleinste planbare Einheit mit fachlichem
  Ergebnis" (Mindestvertrag mit Outcome, Scope, Skills, Owner, Quality Gate …).
- **Dok. 07 §6** kennt weder `Service Run` noch `Work Package`; F08 enthält allerdings den
  Kernobjekttyp `Task` (Familie „Arbeit, Nachweis & Assurance").
- Demo-Workaround: Deliverables hängen direkt per `part_of` an der Service Instance; Runs
  sind nicht adressierbar.

### 1.3 O-WP012-03 – Portfolio/Engagement sind mandantenübergreifend, ohne Typ

- **Dok. 15 §4.1:** ein **Portfolio** ist „eine gesteuerte Menge von Kunden, Service
  Instances, Engagements oder Regionen"; §4.2: ein **Engagement** „bildet den verantworteten
  Kundenkontext" (Vertrag, aktive Service Instances, Stakeholder, Datenzugriffe …).
- **Dok. 07 §17 / 07-D11:** „Cross-Tenant-Beziehungen sind grundsätzlich verboten, außer zu
  versionierten Plattformreferenzen wie Frameworks oder öffentlichen Bedrohungsobjekten."
- Ein Portfolio über mehrere Kunden-Tenants kann daher nicht als Graphobjekt mit Kanten auf
  Kundendaten existieren. Demo-Workaround: Portfolio-Sicht entsteht ausschließlich durch
  Aggregation je Mandant, nie durch Kanten.

### 1.4 O-WP012-04 – R21 `delivered_by` zielt auf „Provider Team"

- **Dok. 07 §9, R21:** Beispiel „Managed Service/Deliverable -> Provider Team", Regel
  „Delivery-Verantwortung und Servicekontext."
- Das Provider-Team gehört organisatorisch zum Betreiber (eigener Tenant), das
  Managed-Service-Objekt zum Kunden-Tenant → eine wörtliche R21-Kante wäre eine verbotene
  Cross-Tenant-Kante (07-D11).
- Demo-Workaround (reversibel): je Kunden-Tenant existiert ein tenant-eigenes `Team`-Objekt
  als Repräsentation der Delivery-Verantwortung; alle `delivered_by`-Kanten bleiben
  tenant-intern (durch `seed.spec.ts` Tenant-Isolationstests abgesichert).

## 2. Ziel

Ein konsistentes, tenant-sicheres Zielbild, welches Managed-Service-Objekt im Zwilling
lebt, wie Delivery-Struktur (Run/Work Package) adressierbar wird, wo Portfolio/Engagement
modelliert werden und worauf R21 zulässig zeigt — ohne die harte Mandantengrenze
aufzuweichen.

## 3. Optionen

### Kernfrage K1 – Was ist der Zwillings-Typ `Managed Service`? (O-WP012-01)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K1-A** | **`Managed Service` (F09) = Service Instance (Dok. 13 §4.3).** Service Definition/Offer bleiben Objekte der Katalog-/Commercial-Domäne (Dok. 14 §4) außerhalb des Tenant-Zwillings; die Instance referenziert Definition + Version als Attribut/`source_refs` (perspektivisch als versionierte Plattformreferenz, vgl. 07-A04/07-O06). Dok. 07 §6 wird um einen Klarstellungssatz ergänzt. | + Deckt sich mit Dok. 13 §4.3 (Pflichtfeld „Mandant") und Dok. 14 §4 (eigene Katalogobjekte). + Keine neue Cross-Tenant-Mechanik nötig. + Status quo der Demo bleibt gültig. − Definition/Version sind im Graph zunächst nur als Referenz, nicht als navigierbares Objekt sichtbar. |
| K1-B | F09 um `Service Definition` und `Service Offer` als kanonische Objekttypen erweitern; Definition/Offer als **Plattformreferenzobjekte** (Erweiterung der 07-D11-Ausnahmeliste) tenantübergreifend teilen. | + Volle Navigierbarkeit (Instance → Definition im Graph). − Material: erweitert die 07-D11-Ausnahmeliste (bislang Frameworks/Bedrohungsobjekte) und greift 07-O06 vor; braucht Security-Review und Versionierungskonzept für Plattformreferenzen. − Offer ist kommerziell (Preislogik) — Preisdaten gehören laut Dok. 14 nicht in den Kunden-Twin. |
| K1-C | Nichtstun (Lücke dokumentiert lassen). | − Mehrdeutigkeit bleibt; jede weitere Serviceschicht-Arbeit (Portfolio, Reporting) erbt die Unschärfe. |

### Kernfrage K2 – Service Run und Work Package als Objekttypen? (O-WP012-02)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K2-A** | **`Service Run` als neuer F09-Kernobjekttyp** (Kanten: `Service Run part_of Managed Service`; `Deliverable part_of Service Run`; `Review` prüft Run-Wirkung). **Work Package** wird nicht als neuer Twin-Typ eingeführt; das Verhältnis zu F08 `Task` wird geklärt (Work Package = Operations-Objekt in Dok.-15-Domäne, das im Twin — falls nötig — als `Task` erscheint). | + Dok. 13 §4.5 beschreibt den Run als zentrales Delivery-Objekt mit eigenem Zustand („abgeschlossen, aber nicht wirksam bestätigt") — ohne Typ nicht abbildbar. + Deliverables werden periodenscharf zuordenbar. − Katalogerweiterung von Dok. 07 §6 ist material (neuer Typvertrag, Migration der Demo-Kanten). |
| K2-B | Kein neuer Typ: Runs als zeitlich abgegrenzte Gruppen über `valid_time` + `tags_custom_fields` an Deliverables abbilden. | + Kein Katalogeingriff. − Run-Ebene (Quality Gates, Abweichungen, Outcome-Bezug) bleibt nicht adressierbar; Auswertungen basieren auf Konvention statt Vertrag. |
| K2-C | Run **und** Work Package vollständig außerhalb des Twins in der Delivery-/Operations-Domäne (Dok. 13/15-Module) halten; der Twin zeigt nur Ergebnisse (Deliverable, Evidence, Review). | + Kleinster Twin; klare Domänentrennung. − Bricht die Navigationskette „Service → Run → Deliverable → Evidence" im Objekt-360 (Dok. 07 §10); Outcome Review verlöre seinen Graph-Anker. |

### Kernfrage K3 – Wo leben Portfolio und Engagement? (O-WP012-03)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K3-A** | **Portfolio/Engagement als Objekte im Betreiber-Tenant** (z. B. `tenant-consulting-operator`): Engagement referenziert Kunden-Tenant/Service-Instances nur über **attributbasierte, berechtigungsgeprüfte Referenzen** (IDs), niemals über Graph-Kanten; Portfolio-Sichten werden serverseitig je Mandant aggregiert. | + Dok.-15-Steuerungsobjekte werden persistent, versionierbar, auditierbar. + Keine Cross-Tenant-Kante; 07-D11 bleibt unangetastet. − Attribut-Referenzen über Tenants sind ein neues Muster und brauchen ein explizites Security-/Privacy-Review (Leak über Referenzen vermeiden, Dok. 07 §17: keine Erkennbarkeit verdeckter Beziehungen). |
| K3-B | Kein Twin-Objekt: Portfolio/Engagement bleiben reine Aggregations-/Steuerungssichten der Operations-Domäne (Status quo der Demo). | + Kein neues Sicherheitsrisiko; schnell. − Kein Objekt-360, keine Historie/Versionierung für Engagements; Dok.-15-Funktionen (Portfolio Mission Control, Delivery Snapshot) müssten ihre Wahrheit vollständig außerhalb des Twins führen. |
| K3-C | Neue Plattform-Ebene „Betreiberobjekte" oberhalb der Tenants einführen. | − Größter Eingriff: berührt Dok. 07 §17, Dok. 19 (Rechte/Datenräume) und die Persistenzarchitektur (Dok. 18); für das aktuelle Ziel überdimensioniert. |

### Kernfrage K4 – Worauf zeigt R21 `delivered_by`? (O-WP012-04)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K4-A** | **Status quo bestätigen und präzisieren:** R21 zeigt auf ein **tenant-eigenes** `Team`-Objekt, das die Delivery-Verantwortung repräsentiert; die Zugehörigkeit zum Betreiber wird über `source_refs`/Attribut (z. B. Provider-Kennung) dokumentiert. Dok. 07 §9 R21-Beispieltext wird entsprechend präzisiert („Provider Team" → „Delivery-Team (tenant-eigene Repräsentation der Provider-Verantwortung)"). | + Kein Konzeptbruch, keine neue Ausnahme; bereits implementiert und durch Tenant-Isolationstests gedeckt. − Spiegelobjekte je Kunde: Provider-seitige Teamänderungen müssen synchronisiert werden (Governance-Aufwand). |
| K4-B | Provider-Teams als versionierte **Plattformreferenzobjekte** zulassen (Erweiterung der 07-D11-Ausnahmeliste); R21 darf auf die Plattformreferenz zeigen. | + Ein Team, keine Spiegel. − Material: Personenbezug/Teamdaten als Plattformreferenz berührt Datenschutz (07-D12, Dok. 19) und die 07-D11-Liste; braucht Security-Gate; koppelt an 07-O06. |
| K4-C | R21-Semantik ändern: Ziel ist eine fachliche **Rolle** im Kunden-Tenant (z. B. `Produktrolle`/`fachliche Rolle`), das konkrete Provider-Team bleibt Dok.-15-Operations-Wissen. | + Datensparsam (07-D12). − Verliert Team-Granularität im Twin; Dok. 13 §5.1 (Delivery-Rollen) erwartet Teamsichtbarkeit im Servicekontext. |

## 4. Empfehlung (klar als Empfehlung markiert, keine Entscheidung)

**Empfohlen: K1-A, K2-A, K3-A, K4-A — als Paket, aber je Frage einzeln freigebbar.**

- **K1-A:** `Managed Service` wird als Service Instance klargestellt; Definition/Offer
  bleiben Katalogdomäne (Dok. 14). Geringster Eingriff, deckungsgleich mit Dok. 13 §4.3
  und Dok. 14 §4.
- **K2-A:** `Service Run` wird kanonischer F09-Typ, weil Dok. 13 §4.5 ihm eigenen Zustand
  und eigene Bündelfunktion zuschreibt; Work Package bleibt Operations-Domäne (Dok. 15),
  Verhältnis zu F08 `Task` wird nur klargestellt, nicht neu erfunden.
- **K3-A:** Engagement/Portfolio als Betreiber-Tenant-Objekte mit attributbasierten
  Referenzen — **unter Vorbehalt eines expliziten Security-/Privacy-Reviews**; bis dahin
  bleibt der Demo-Status-quo (K3-B) gültig.
- **K4-A:** kurzfristig bestätigen (kein Bruch, getestet); K4-B nur zusammen mit einer
  späteren 07-O06-Entscheidung über Plattformreferenzen erneut prüfen.

Alternativen bleiben ausdrücklich offen; insbesondere K1-B/K4-B hängen an derselben
übergeordneten Frage (Plattformreferenz-Governance, 07-O06) und können gemeinsam später
entschieden werden.

## 5. Auswirkungen und Abhängigkeiten (Cross-Document Impact Matrix)

| Artefakt | Stelle | Art der Änderung (nach Freigabe, je nach gewählter Option) |
|---|---|---|
| Dok. 07 §6 | F09-Zeile | Klarstellung `Managed Service` = Service Instance (K1-A); ggf. neuer Kernobjekttyp `Service Run` (K2-A) |
| Dok. 07 §9 | R21-Zeile | Beispieltext präzisieren (K4-A); ggf. Beispielspalte für `Service Run`-Kanten ergänzen |
| Dok. 07 §17 / §22 (07-D11) | Tenant-Regeln | nur bei K1-B/K3-C/K4-B: Erweiterung der Ausnahmeliste (Security-Gate zwingend) |
| Dok. 13 §4 | Querverweis | Verweis auf kanonische Twin-Abbildung (welche Ebene im Graph liegt) |
| Dok. 14 §4 | Querverweis | Abgrenzung Katalogobjekte ↔ Twin-Objekte |
| Dok. 15 §4.1/4.2/4.4 | Querverweis | Verortung Portfolio/Engagement/Work Package (Twin vs. Operations-Domäne) |
| `@isms/contracts` | `vocabularies.ts` | ggf. `OBJECT_TYPES_F09` + `Service Run`; R21-Kommentar/Provenance aktualisieren; **additiv, kein Bruch** |
| `@isms/demo-seed` | `managed-services.ts`, Manifest, README | ggf. Runs zwischen Service und Deliverables einziehen; offene Fragen als gelöst markieren |
| `docs/project/OPEN_QUESTIONS.md` | O-WP012-01..04 | Status gemäß Gate-Entscheid |

Abhängigkeiten: 07-O06 (Plattformreferenzen) für K1-B/K4-B; Dok. 19 (Rechte/Datenräume)
für K3-A; CCP-003 (SLA-/KPI-Felder) ist orthogonal, betrifft aber dieselben F09-Typen.

## 6. Validierung (nach Umsetzung)

- `packages/demo-seed/src/seed.spec.ts`: Tenant-Isolation, referenzielle Integrität und
  Vokabular-Konformität grün; bei K2-A neue Assertions „jeder Run gehört zu genau einem
  Managed Service", „Deliverable hängt an Run oder Service (Übergangsregel)".
- `packages/contracts`: Provenance-Tests für neue/angepasste Vokabeln.
- Concept Consistency Review über Dok. 07/13/14/15 (Dok. 21 §22.2: „Konflikte im digitalen
  Zwilling", „Managed Services ohne Shared Responsibility").
- Bei K3-A zusätzlich: dokumentiertes Security-/Privacy-Review (Referenz-Leak-Prüfung,
  Dok. 07 §21 „Cross-Tenant-Daten werden weder über Suche, Counts, Kanten … geleakt").

## 7. Risiken und Rücknahmeplan

- **Scope-Risiko:** K2-A + K3-A zusammen sind ein spürbarer Katalogeingriff; deshalb je
  Kernfrage getrennt freigeben und umsetzen (kleine WPs).
- **Sicherheitsrisiko (K3-A):** attributbasierte Cross-Tenant-Referenzen könnten verdeckte
  Beziehungen erkennbar machen; ohne bestandenes Security-Review bleibt K3-B Status quo.
- **Rücknahmeplan:** neue Typen/Kanten sind additiv; Rückbau = Typ als deprecated markieren,
  Demo-Seed auf vorherige Struktur zurücksetzen (deterministischer Seed, Reset-fähig);
  Dokumentversionen werden archiviert, nicht überschrieben.

## 8. Offene Punkte (bewusst nicht Teil dieses Proposals)

- **O-WP012-06** (Deliverable-Kanten `part_of`/`evidences` nur durch Regel-, nicht
  Beispielspalte von Dok. 07 §9 gedeckt): angrenzend, aber hier nicht entschieden; kann bei
  Freigabe als rein redaktionelle Ergänzung der §9-Beispielspalte im selben
  Concept-Author-WP mitlaufen.
- **O-WP012-05** (SLA-/KPI-Felder) wird in **CCP-003** behandelt.
- Vollständiges Operations-Objektmodell (Dok. 15 §4.5–§4.10: Resource Profile, Capacity
  Ledger, Assignment …) bleibt außerhalb des Twins und außerhalb dieses Proposals.
- Governance-Modell für Plattformreferenzen (07-O06) bleibt offen.

## 9. Freigaben

| Gate | Status |
|---|---|
| Concept Consistency Reviewer | ausstehend |
| Security/Privacy Review (nur K3-A/K4-B/K1-B) | ausstehend |
| Human/Product Gate | **ausstehend** |
