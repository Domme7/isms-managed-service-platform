# @isms/demo-seed – Synthetische Demo-Seed-Grundlage

Deterministische, **rein synthetische** Demo-Datenbasis des digitalen Unternehmenszwillings
(WP-003 Slice 2: ISMS-Kerngraph; WP-012 Slice 1: Managed-Service-Schicht; WP-017 Slice 1:
Entscheidungsschicht). Reine typisierte Daten + Integritätshelfer – **keine Datenbank, kein ORM,
keine UI**. Der Seed wird später nur auf Repositories gemappt.

Aktuelle Seed-Version: **1.2.0** · **43 Objekte / 62 Beziehungen** über zwei Mandanten.

## Struktur vs. Inhalt

- **Struktur/Vokabular = strikt kanonisch.** Objekttypen (F01–F09) und Beziehungstypen
  (R01–R25) sowie alle Pflichtfelder stammen unverändert aus `@isms/contracts`
  (abgeleitet aus Dok. 07 v1.0). Am Modell wird nichts erfunden; fachliche Lücken sind als
  `OFFENE FRAGE` markiert (siehe unten).
- **Inhalt = bewusst synthetisch.** Firmen-, Prozess-, Asset-, Risiko-, Control-, Evidence-
  und Service-/SLA-Werte sind frei erfunden und plausibel (Demo-Datenregel,
  `.claude/rules/demo-data.md`). Keine realen Unternehmen, Personen, Kunden, Verträge —
  und **keine Preise**. SLA-Zahlen sind illustrative Designannahmen (Dok. 14 §8.4), keine
  Vertragszusagen.

## Vier Demo-Mandanten (Dok. 07 §20)

| tenant_id | Anzeigename | Objekte / Beziehungen | Inhalt |
|---|---|---|---|
| `tenant-nordwerk` | Nordwerk Manufacturing SE | 34 / 51 | ISMS-Kerngraph (17/15) + Managed-Service-Schicht (14/28) + Entscheidungsschicht (3/8) |
| `tenant-finovia` | Finovia Digital Bank AG | 0 / 0 | bewusst leer (Empty-State) |
| `tenant-medicore` | MediCore Health Services GmbH | 0 / 0 | bewusst leer (spätere WPs) |
| `tenant-consulting-operator` | Consulting Operator Demo | 9 / 11 | Managed-Service-Schicht (WP-012) |

Alle `tenant_id` sind stabil und unveränderlich (P02) und bilden eine harte
Mandantengrenze (P09, D11, Dok. 19). Der Seed enthält **keine** Cross-Tenant-Beziehung; die
spätere Portfolio-Sicht über mehrere Mandanten entsteht ausschließlich durch Aggregation je
Mandant, nie durch Kanten.

## Nordwerk-Storyline (Objektgraph)

Nordwerk Manufacturing SE betreibt in **Werk Nord – Produktion** den Kernprozess
**Auftragsabwicklung**, der die **Kundenauftragsdaten** verarbeitet. Eine **ungepatchte
ERP-Integrationsschnittstelle** exponiert diese Daten; eine **Ransomware-Bedrohung** droht
sie zu verschlüsseln. Daraus entsteht das **Risiko einer Betriebsunterbrechung**. Ein
**Backup-&-Recovery-Control** (lokal umgesetzt als **Backup-Job**, erfüllt **Requirement
A.8.13**) mindert das Risiko; ein **Restore-Test-Protokoll** belegt dessen Wirksamkeit. Eine
**Patch-Management-Maßnahme** behandelt die Schwäche und mindert das Szenario.

17 Objekte über sechs Familien (F01, F02, F03, F06, F07, F08), 15 Beziehungen. Alle in
`owner_ids` referenzierten Rollen/Einheiten (Prozessverantwortung, CISO-Rolle, IT-Betrieb)
sind als echte Seed-Objekte materialisiert, sodass jede Owner-Referenz auflöst.
(Quelle: `src/nordwerk-graph.ts`, Export `NORDWERK_OBJECTS`/`NORDWERK_RELATIONSHIPS`.)

### Kanonische Kette (source → target, Richtung laut Contract)

```
Geschäftsprozess  --R07 processes-->   Information Asset      [Kette 1/5]
Weakness          --R08 exposes-->     Information Asset
Threat            --R09 threatens-->   Risk Scenario          [Kette 2/5]
Threat            --R09 threatens-->   Information Asset
Risk              --R10 affects-->     Geschäftsprozess
Risk              --R10 affects-->     Information Asset       [Kette 3/5]
Control           --R12 mitigates-->   Risk                    [Kette 4/5]
Measure           --R12 mitigates-->   Risk Scenario
Measure           --R18 remediates-->  Weakness
Control Impl.     --R13 implements-->  Control
Control           --R14 satisfies-->   Requirement
Evidence          --R15 evidences-->   Control                 [Kette 5/5]
Requirement       --R01 part_of-->     Framework
Organisationseinh.--R01 part_of-->     Organisation
fachliche Rolle   --R03 owns-->        Geschäftsprozess
```

> Hinweis: Einige Pfeile zeigen relativ zur erzählten Kette „rückwärts“ (z. B. `evidences`
> ist per Vertrag `Evidence -> Control`). Das ist korrekt: die Richtung folgt strikt der in
> Dok. 07 §9 definierten Semantik des jeweiligen Beziehungstyps, nicht der Leserichtung.

## Managed-Service-Schicht (WP-012 Slice 1, `src/managed-services.ts`)

Fachlich abgeleitet aus **Dok. 13** (Service Instance §4.3, Deliverable/Outcome Review §4.5,
Shared Responsibility §5.3, MS01 „Outcome vor Aktivität“, MS15 „keine versteckte
Verkaufslogik“), **Dok. 14** (Service Offers SO02–SO06/SO12 §5.2, Service-Level-Bänder §8.4 als
ausdrücklich illustrative Designannahmen) und **Dok. 15** (Portfolio/Engagement §4.1/4.2 – nur
so weit, wie kanonisch abbildbar).

### Nordwerk (14 Objekte / 28 Beziehungen)

| Service Instance | Zustand | SLA | Deliverables |
|---|---|---|---|
| Kontinuierliches Risiko- & Control-Monitoring | `aktiv` | Band „Standard“ | Risiko- & Control-Review 2026-06, Control-Assurance-Paket Q2/2026 |
| Nachweis- & Evidence-Betrieb | `aktiv` | Band „Priority“ | Audit-Readiness-Evidence-Pack Q2/2026 |
| Management- & Entscheidungsreporting | `Review` | Band „Standard“ | Management-Report Q2/2026 (Entwurf) |

Ergänzend: `Objective` „Auditfähigkeit ISO/IEC 27001“, `KPI` „Nachweisquote priorisierter
Controls“, `Review` „Outcome Review Q2/2026“ und ein `Team` als Delivery-Verantwortung.

### Consulting Operator Demo (9 Objekte / 11 Beziehungen)

Eigener Mandant des Betreibers mit `Audit-Readiness-Betrieb` (`aktiv`) und
`Policy-Lifecycle-Betrieb` (`konfiguriert`), je mit SLA und Deliverable, Organisation, Team und
`Managed Service Lead`-Rolle. Zweck: die spätere Portfolio-Sicht zeigt **mehrere** Mandanten.

### Kanonische Servicekanten (source → target)

```
SLA / Deliverable / Review --R01 part_of-->        Managed Service
Managed Service/Deliverable--R21 delivered_by-->   Team (Delivery-Verantwortung, gleicher Mandant)
Risk/Control/Ctrl-Impl/Evid.--R22 covered_by-->    Managed Service   (liegt im Serviceumfang)
Managed Service            --R19 requires-->       Control / Evidence
Managed Service / Control  --R20 contributes_to--> Objective / KPI
Deliverable (Evidence-Pack)--R15 evidences-->      Control
Risk                       --R10 affects-->        Objective
fachliche Rolle            --R03 owns-->           Managed Service   (Operator)
```

### Offene Fragen (nicht erfunden, bewusst offen)

| ID | Lücke |
|---|---|
| O-WP012-01 | Dok. 13 trennt Service **Definition/Offer/Instance**; kanonisch existiert nur `Managed Service` → nur die Service Instance ist materialisiert. |
| O-WP012-02 | **Service Run** (Dok. 13 §4.5) und **Work Package** (Dok. 15 §4.4) haben keinen Objekttyp → Deliverables hängen direkt an der Service Instance. |
| O-WP012-03 | **Portfolio/Engagement** (Dok. 15) sind mandantenübergreifend und haben keinen Typ → Portfolio-Sicht nur per Aggregation, nie per Kante. |
| O-WP012-04 | R21 `delivered_by` zeigt auf ein „Provider Team“; Cross-Tenant-Kanten sind verboten → Delivery-Team wird je Mandant als tenant-eigenes `Team` modelliert. |
| O-WP012-05 | Dok. 07 §7 kennt keine typisierten SLA-/KPI-Felder (Zeiten, Schwellen, Zielwerte) → Klartext in `description`. |
| O-WP012-06 | Für `Deliverable` nennt Dok. 07 §9 nur R21 als Beispiel; `part_of`/`evidences` folgen der Regelspalte, nicht der Beispielspalte. |

## Entscheidungsschicht (WP-017 Slice 1, `src/decisions.ts`)

Fachlich abgeleitet aus **Dok. 07** (F09 `Decision Record` §6, Objektvertrag §7, Lebenszyklus §8,
Beziehungen R03/R15/R23/R24 §9, Bitemporalität §11), **Dok. 10 §9.2** („Nach Freigabe wird die
Karte zum unveränderbaren Decision Record. Korrekturen erfolgen als neue Version oder Nachtrag.")
und **Dok. 05 §7** (Entscheidungs-Lifecycle).

**Ausdrücklich keine Decision Card** nach Dok. 10, Abschnitt „Decision Cards“ / „Pflichtfelder“
(§9.1). Die 14 Pflichtfeldnamen lauten dort wörtlich: Entscheidungsfrage, Zielbezug, Auslöser,
Baseline, Optionen, Wirkung, Ressourcen, Abhängigkeiten, Confidence, Empfehlung, „Owner und
Approver“, Frist, Outcome Check, Provenance. Im Objektvertrag haben **neun** davon **keinen
Träger** (Auslöser, Baseline, Optionen, Wirkung, Ressourcen, Abhängigkeiten, Empfehlung, Frist,
Outcome Check), die übrigen **fünf** (Entscheidungsfrage, Zielbezug, Confidence, „Owner und
Approver“, Provenance) nur **teilweise**. Sie werden weder als Feld noch als Klartext in
`description` erfunden. Ebenso wenig enthält die Schicht Fristen, Aufwände, Kapazitäten, Prioritäten,
Bewertungen, Empfehlungen – oder Preise.

### Nordwerk (3 Objekte / 8 Beziehungen)

| Entscheidungsfrage (`display_name`) | Lebenszyklus-Stand | fachliche Gültigkeit | Anbindung |
|---|---|---|---|
| Womit wird das Risiko der Betriebsunterbrechung in der Auftragsabwicklung abgesichert? | `Überholt` (Dok. 07 §8) | 2026-01-05 **bis** 2026-03-01 (geschlossen) | `decided_in` vom Risiko, `evidences` vom Restore-Test-Protokoll, `owns` von der CISO-Rolle; **Ziel** der `supersedes`-Kante |
| Wird die Absicherung der Auftragsabwicklung um die Härtung der ERP-Schnittstelle erweitert? | `genehmigt` (Dok. 05 §7) | ab 2026-03-01 (offen) | **`supersedes` → Vorgänger**, `decided_in` vom Risiko, `owns` von der CISO-Rolle |
| In welchem Rhythmus liefert der Reporting-Service sein Managementbild? | `zur Freigabe` (Dok. 05 §7) | ab 2026-03-01 (offen) | `decided_in` vom Managed Service „Management- & Entscheidungsreporting", `owns` von der CISO-Rolle |

### Kanonische Entscheidungskanten (source → target)

```
Risk / Managed Service --R23 decided_in--> Decision Record   („Risk/Change/Service -> Decision Record")
Decision Record        --R24 supersedes--> Decision Record   (NACHFOLGER ist die Quelle)
Evidence               --R15 evidences-->  Decision Record   („Evidence -> Control/Measure/Decision")
fachliche Rolle        --R03 owns-->       Decision Record   („Person/Rolle/Einheit -> Objekt")
```

### Ablösung ohne historische Überschreibung

Die Ablösung ist **fachlich** modelliert (R24 zwischen zwei eigenständigen Objekten): der
abgelöste Stand trägt ein **geschlossenes** `valid_time`-Intervall, behält aber `version: 1` und
**kein** `record_time.replaced_at` und bleibt vollständig sichtbar. Damit trägt der Seed erstmals
eine **belegte** Versionshistorie – die entsprechenden Produktaussagen (`/heute`, Objekt-360)
sind aus den Daten abgeleitet und nicht hartkodiert.

### Offene Fragen (nicht erfunden, bewusst offen)

| ID | Lücke |
|---|---|
| O-WP017-01 | `Task` (F08) kommt in Dok. 07 §9 in **keiner** Zeile R01–R25 vor → kein `Task` materialisiert, kein Kantentyp zweckentfremdet. |
| O-WP017-02 | **Neun** der 14 Decision-Card-Pflichtfelder (Dok. 10, „Decision Cards“/„Pflichtfelder“) haben im Objektvertrag keinen Träger, **fünf** nur teilweise → nichts erfunden. |
| O-WP017-03 | `LIFECYCLE_STATUS_DECISION` kennt keinen Zustand „abgelöst" → generischer Zustand `Überholt` (Dok. 07 §8); kanonische Bestätigung steht aus. |
| O-WP017-04 | „Zielbezug" und „Auslöser" sind getrennte Pflichtfelder, kanonisch existiert nur R23 → die Kante wird neutral als Bezug modelliert. |
| O-WP017-05 | „Approver" hat im Modell keinen Träger (`owner_ids` trägt nur `fachlich`/`technisch`, R03 nur Verantwortung) → kein erfundener Approver. |
| O-WP017-07 | Datensatzversion (`version`/`replaced_at`) vs. fachliche Ablösung (R24) existieren ohne Regel nebeneinander → hier R24, `version: 1`, kein `replaced_at`. |
| O-WP017-08 | Ob der Betreiber-Mandant eigene Entscheidungen tragen soll, ist offen → nur Nordwerk ausmodelliert. |
| — | Ein fachliches **Ende** der Bezugs-/Nachweis-/Verantwortungskanten des abgelösten Stands ist im Konzept nicht belegt → diese Kanten bleiben offen. |

## Determinismus & Reset

Alle IDs und Zeitstempel (`valid_time`, `record_time`) sind fest kodiert – kein `Date.now()`,
kein Zufall. „Reset“ = erneuter Import von `DEMO_SEED` (`src/seed.ts`); jeder Lauf ist
identisch. Bitemporalität ist sichtbar, und der Seed trägt **drei** Erfassungswellen
(Systemachse `record_time`):

| erfasst am | Schicht | Objekte / Beziehungen | fachlich gültig ab |
|---|---|---|---|
| 2026-01-15 | ISMS-Kerngraph (Nordwerk) | 17 / 15 | 2026-01-01 |
| 2026-02-16 | Managed-Service-Schicht (Nordwerk + Consulting Operator) | 23 / 39 | 2026-02-01 |
| 2026-03-16 | Entscheidungsschicht (Nordwerk) | 3 / 8 | je Objekt gesetzt (2026-01-05 bzw. 2026-03-01) |

Für **jedes** Objekt und **jede** Beziehung gilt `valid_time.from < record_time.recorded_at`.
Die Entscheidungsschicht ist die erste Schicht mit **objektweise** gesetzter fachlicher
Gültigkeit, weil der abgelöste Stand ein geschlossenes Intervall braucht.

## Exporte

- `DEMO_TENANTS`, `TENANT_ID`, `DemoTenant`
- `NORDWERK_OBJECTS`, `NORDWERK_RELATIONSHIPS`, `NORDWERK_OBJECT_ID` (ISMS-Kerngraph)
- `NORDWERK_SERVICE_OBJECTS`, `NORDWERK_SERVICE_RELATIONSHIPS`, `NORDWERK_SERVICE_OBJECT_ID`,
  `OPERATOR_OBJECTS`, `OPERATOR_RELATIONSHIPS`, `OPERATOR_OBJECT_ID`,
  `MANAGED_SERVICE_OBJECTS`, `MANAGED_SERVICE_RELATIONSHIPS` (Serviceschicht)
- `NORDWERK_DECISION_OBJECTS`, `NORDWERK_DECISION_RELATIONSHIPS`,
  `NORDWERK_DECISION_OBJECT_ID`, `DECISION_OBJECTS`, `DECISION_RELATIONSHIPS`
  (Entscheidungsschicht)
- `DEMO_SEED`, `SEED_VERSION`, `DemoSeed`
- Integritätshelfer: `findDuplicateIds`, `indexObjectsById`,
  `findDanglingRelationships`, `findCrossTenantRelationships`, `findUnresolvedOwnerRefs`

## Tests (`src/seed.spec.ts`, Vitest, deterministisch)

1. **Schema-Validität** – jedes Objekt parst mit `ObjectEnvelope`, jede Beziehung mit
   `RelationshipEnvelope`.
2. **Stabile/eindeutige IDs** – keine doppelten `object_id`/`relationship_id`; der
   Duplikat-Detektor wird zusätzlich per Negativ-Beweis geprüft.
3. **Tenant-Isolation** – jede Beziehung ist tenant-konsistent, die Objekt-/Kantenzahl wird
   **pro Mandant** geprüft (Nordwerk 34/51, Operator 9/11, Finovia/MediCore 0/0) und keine
   Mandantensicht enthält fremde Objekte; ein bewusst konstruierter Cross-Tenant-Fall wird vom
   Isolationsprüfer erkannt (beweist die Isolation).
4. **Referenzielle Integrität** – jede Beziehung zeigt auf existierende Objekte; Negativ-Beweise
   für nicht existierendes `source_id` und `target_id`.
5. **Owner-Ref-Kohärenz** – jede `owner_id` löst auf ein existierendes Seed-Objekt auf
   (Positiv- und Negativtest).
6. **Vokabular-Konformität** – alle `object_type`/`relationship_type` liegen in den
   kanonischen Contract-Vokabularen.
7. **Managed-Service-Schicht** – mehrere Mandanten tragen Services; jeder Service hat genau ein
   SLA, mindestens ein Deliverable und eine `delivered_by`-Kante auf ein Team **desselben**
   Mandanten; die Services docken über `covered_by`/`requires` am ISMS-Kerngraphen an; der Seed
   enthält keinerlei Währungs-/Preisangabe (Guardrail-Test).
8. **Entscheidungsschicht** – nur Nordwerk trägt `Decision Record`-Objekte; jede Entscheidung hat
   mindestens eine eingehende `decided_in`-Kante von einem bestehenden Objekt, einen auflösbaren
   Owner **und** eine eingehende `owns`-Kante derselben Rolle; genau ein `supersedes`-Paar in der
   Richtung Nachfolger → Vorgänger mit geschlossenem `valid_time` am Vorgänger und lückenlosem
   Anschluss der Nachfolgerin; die `evidences`-Quelle ist ein Objekt vom Typ `Evidence`;
   `version` bleibt 1 und `replaced_at` ungesetzt; Guardrail gegen Frist-, Aufwands-,
   Kapazitäts-, Prioritäts-, Alternativen-, Baseline- und Wirkungsangaben in Namen, Beschreibungen
   und Kantentexten der Schicht.
9. **Manifest-Konsistenz** – `seed-manifest.json` stimmt in Version, Gesamt- und Pro-Tenant-Counts,
   `has_object_graph`, `object_families_used` und `relationship_types_used` mit `DEMO_SEED` überein.
