# @isms/demo-seed – Synthetische Demo-Seed-Grundlage

Deterministische, **rein synthetische** Demo-Datenbasis des digitalen Unternehmenszwillings
(WP-003, Slice 2). Reine typisierte Daten + Integritätshelfer – **keine Datenbank, kein ORM,
keine UI**. Der Seed wird später nur auf Repositories gemappt.

## Struktur vs. Inhalt

- **Struktur/Vokabular = strikt kanonisch.** Objekttypen (F01–F09) und Beziehungstypen
  (R01–R25) sowie alle Pflichtfelder stammen unverändert aus `@isms/contracts`
  (abgeleitet aus Dok. 07 v1.0). Am Modell wird nichts erfunden.
- **Inhalt = bewusst synthetisch.** Firmen-, Prozess-, Asset-, Risiko-, Control- und
  Evidence-Werte sind frei erfunden und plausibel (Demo-Datenregel,
  `.claude/rules/demo-data.md`). Keine realen Unternehmen, Personen oder Preise.

## Vier Demo-Mandanten (Dok. 07 §20)

| tenant_id | Anzeigename | Objektgraph in Slice 2 |
|---|---|---|
| `tenant-nordwerk` | Nordwerk Manufacturing SE | ja |
| `tenant-finovia` | Finovia Digital Bank AG | nein (spätere WPs) |
| `tenant-medicore` | MediCore Health Services GmbH | nein (spätere WPs) |
| `tenant-consulting-operator` | Consulting Operator Demo | nein (spätere WPs) |

Alle `tenant_id` sind stabil und unveränderlich (P02) und bilden eine harte
Mandantengrenze (P09, D11, Dok. 19). Der Seed enthält **keine** Cross-Tenant-Beziehung.

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

## Determinismus & Reset

Alle IDs und Zeitstempel (`valid_time`, `record_time`) sind fest kodiert – kein `Date.now()`,
kein Zufall. „Reset“ = erneuter Import von `DEMO_SEED` (`src/seed.ts`); jeder Lauf ist
identisch. Bitemporalität ist sichtbar: fachliche Gültigkeit (`valid_time.from`
= 2026-01-01) und Systemerfassung (`record_time.recorded_at` = 2026-01-15) sind bewusst
verschieden.

## Exporte

- `DEMO_TENANTS`, `TENANT_ID`, `DemoTenant`
- `NORDWERK_OBJECTS`, `NORDWERK_RELATIONSHIPS`, `NORDWERK_OBJECT_ID`
- `DEMO_SEED`, `SEED_VERSION`, `DemoSeed`
- Integritätshelfer: `findDuplicateIds`, `indexObjectsById`,
  `findDanglingRelationships`, `findCrossTenantRelationships`, `findUnresolvedOwnerRefs`

## Tests (`src/seed.spec.ts`, Vitest, deterministisch)

1. **Schema-Validität** – jedes Objekt parst mit `ObjectEnvelope`, jede Beziehung mit
   `RelationshipEnvelope`.
2. **Stabile/eindeutige IDs** – keine doppelten `object_id`/`relationship_id`; der
   Duplikat-Detektor wird zusätzlich per Negativ-Beweis geprüft.
3. **Tenant-Isolation** – jede Beziehung ist tenant-konsistent; ein bewusst konstruierter
   Cross-Tenant-Fall wird vom Isolationsprüfer erkannt (beweist die Isolation).
4. **Referenzielle Integrität** – jede Beziehung zeigt auf existierende Objekte; Negativ-Beweise
   für nicht existierendes `source_id` und `target_id`.
5. **Owner-Ref-Kohärenz** – jede `owner_id` löst auf ein existierendes Seed-Objekt auf
   (Positiv- und Negativtest).
6. **Vokabular-Konformität** – alle `object_type`/`relationship_type` liegen in den
   kanonischen Contract-Vokabularen.
7. **Manifest-Konsistenz** – `seed-manifest.json` counts stimmen mit `DEMO_SEED` überein.
