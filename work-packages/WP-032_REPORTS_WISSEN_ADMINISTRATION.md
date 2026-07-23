# WP-032 – Reports, Wissen, Administration: die letzten drei Platzhalter-Orte werden echte read-only Seiten (DR-0013)

## Identität

- **Phase:** 1 (Produktoberfläche, read-only auf dem heutigen Seed; kein Persistenz-/Auth-/
  Reporting-Engine-Bau)
- **Priorität:** **P1 — Owner-priorisiert VOR den Cockpit-Varianten.** Der Usability-Audit
  (DR-0013) bemängelte, dass „fast die Hälfte der Hauptnavigation Platzhalter" ist: von den acht
  stabilen Orten (Dok. 06, Abschnitt „Acht stabile Hauptorte", 06-D01) sind **Reports, Wissen,
  Administration** die letzten drei, die noch `<PlaceholderPage>` zeigen. Dieses WP schließt die
  Lücke. Owner-Auftrag: „bau die drei letzten Platzhalter-Orte zu echten read-only Seiten aus,
  vor den Cockpit-Varianten."
- **Status:** Draft (Aktivierung durch Orchestrator)
- **Risk Class:** **Medium–High** — read-only und synthetisch, aber:
  (a) **Administration ist sicherheitsnah** (Dok. 19 „Sicherheit, Datenschutz, Rechte &
  Auditierbarkeit"): die Seite darf **nichts über fremde Mandanten oder echte, durchgesetzte
  Rechte suggerieren** und **keinen Schreib-Hebel** anbieten — Nutzer anlegen, Rechte ändern,
  Integrationen schalten sind **Schreibaktionen** und damit **Stop Condition** (gehören zu echter
  Auth, WP-030). (b) Drei **neue `live: true`-Orte** müssen **alle vier Wächter** erfüllen; jeder
  neue Ort ist eine neue Instanz der Leerzustands-Leak-Klasse (FINDING-0009). (c) Die
  Reports-Seite berührt die **Preis-Guardrail** (Service-Value-/Investment-Reports nennen im
  Konzept Preisannahmen — hier preisfrei). (d) Alle drei **Leitfragen sind aspirativ** und heute
  nur teilweise beantwortbar — der Antwort-Modus (DR-0013) muss von Anfang an sauber sitzen.
- **Builder:** `frontend-engineer` (sequenziell, **committet nie selbst** — der Orchestrator
  committet je Slice). Ein Modul (`apps/web`), kein Parallelbau, ein Slice je Ort.
- **Reviewer/Gates (Dok. 20B §36 / FINDING-0006):**
  - **Code Quality:** `code-reviewer` (immer),
  - **Product:** `product-user-lead` (drei neue Kernorte; Antwort-Modus, Leitfragen-Framing),
  - **Domain:** `isms-domain-lead` (Reporting-Bausteine, Sicherheits-/Rechte-Modell,
    Glossar-Fachbegriffe),
  - **QA:** `qa-test-engineer` (Wächter-Erweiterungen um drei Orte, Negativbeweise,
    Registerpflege, Meta-Assertionen),
  - **Security & Privacy:** `product-security-privacy` — **Pflicht (v. a. Administration)**:
    explizites Urteil zu Mandantengrenze, „keine echten Rechte/keine Schreib-Hebel", „keine
    falsche Sicherheitszusage",
  - **Konzepttreue:** `concept-consistency-reviewer` — **jedes Zitat am PDF geprüft**
    (Regel Null): Dok. 12 (Reporting), Dok. 06 §4/§7 (Orte/Screens), Dok. 19/17/18
    (Administration), Dok. 07 (Glossar-Vokabular). Dok. 12 ist **seit WP-023 quellentreu**
    (Zweitquelle zulässig, Beleg trotzdem am PDF/Extrakt).
  - Builder ≠ Reviewer; **zweite Runde derselben Reviewer nach dem Fix-Pass** (hat bisher jedes
    Mal eine vom Fix erzeugte Regression gefunden).
- **Human Gates:**
  - **Keine neue Owner-Freigabe nötig zum Start** — der Ausbau der acht stabilen Orte ist durch
    06-D01 gedeckt; der Read-only-/Ehrlichkeits-Rahmen durch DR-0005/DR-0008; der Antwort-Modus
    durch DR-0013; der Wegfall der Demo-Disclaimer durch DR-0011.
  - **Owner sieht die drei Orte** über `pnpm qa:visual WP-032` (Screenshots + axe) — Beitrag zur
    visuellen Owner-Sicht; die Cockpit-Varianten kommen danach und zeigen dann diese Orte im
    Antwort-Modus.
  - **Nicht in diesem WP** (Stop Condition, eigenes Gate): echte Auth/Nutzerverwaltung (WP-030),
    globale Suche mit Snippet-Leak-Schutz (WP-027), Report-Generierung PDF/PPTX (Phase 5, WP-009),
    reale/Mock-Connectoren (Integrations-WP).
- **Abhängigkeiten:** WP-020 ✓ (Kontextleiste, Seitenbausteine-Konvention, Cross-Tenant-Schutz,
  `live: true`-Meta-Assertionen der Wächter — `docs/project/ACTIVE_WORK_PACKAGE.md`); WP-006 ✓
  (Muster einer neuen read-only Seite unter einem Ort, `kundenstart`-`BausteinOrt`, `lib/kunden/`);
  **WP-028 (Antwort-Modus/Sprachbereinigung) ist die Grundlage des DR-0013-Modus** — ist WP-028
  beim Aktivieren noch **nicht** abgeschlossen, baut dieses WP den Antwort-Modus für die drei
  Orte **eigenständig** korrekt (kein Rückfall in den Rechtfertigungs-Modus) und erzeugt keinen
  Jargon, der WP-028 hinterher aufräumen müsste. DR-0006/Regel Null, DR-0005, DR-0008, DR-0011,
  DR-0013.

## Ziel

Die drei letzten Platzhalter-Orte der Hauptnavigation werden **echte, read-only Seiten auf dem
heutigen Seed**, im **Antwort-Modus** (DR-0013: Inhalt/Antwort zuerst, Lücke als ruhige
Schlusszeile), ohne Demo-Disclaimer (DR-0011), ohne internes Vokabular (keine Dok.-§, keine
Feld-/Familien-/Beziehungscodes wie `F01`/`R12`/`mitigates`), mit **ehrlich benannten Lücken statt
erfundener Werte** (DR-0005/DR-0008):

1. **Administration** (`/administration`) — der **stärkste Seed-Träger**: der aktuelle
   (Demo-)Konfigurationsstand des Mandanten — Rollenmodell, Sphären, Scopes, Mandantenkontext —
   plus das **Sicherheits-, Rechte- und Integrations-Modell als Struktur**. **Keine echten
   Admin-Aktionen, keine durchgesetzten Rechte, keine falsche Sicherheitszusage.**
2. **Reports** (`/reports`) — der **mittlere Träger**: die **Reporting-Bausteine aus Dok. 12** als
   sichtbare Struktur (welche Berichts-/Präsentationsfälle es geben wird, aus welchen Bausteinen
   ein Bericht entsteht) **plus** die **belegbare Datengrundlage** des heutigen Mandanten (welches
   Material seine Berichte bereits tragen würden). **Keine Berichtserzeugung, kein PDF/PPTX.**
3. **Wissen** (`/wissen`) — der **dünnste Träger**: ein **Glossar der ISMS-Begriffe und
   Objekttypen** in Domänensprache (aus dem kanonischen Vokabular). Suche, Vorlagen, Best
   Practices und Lernhinweise werden **als benannte Lücken** gezeigt, nicht erfunden.

**Reihenfolge und Begründung (Priorisierung des program-manager):**
**Slice 1 Administration → Slice 2 Reports → Slice 3 Wissen.** Begründung: (a) **abnehmende
Seed-Deckung** — Administration trägt echtes Material (Mandant, R01–R12, Scopes,
Mandantenisolation als gelebte, per Wächter belegte Tatsache), Reports trägt Konzeptstruktur +
belegbare Zählungen, Wissen trägt nur das globale Vokabular; der Antwort-Modus fällt dort am
leichtesten, wo am meisten belegt ist. (b) **Administration ist sicherheitsnah** — sie wird
zuerst gebaut, solange die Security-Gate-Disziplin frisch ist, und setzt das
Mandantengrenzen-/„keine-Schreib-Hebel"-Muster für die beiden folgenden Orte. (c) Wissen zuletzt,
weil dort die **ehrliche Konzeptlücke** am größten ist (siehe O-WP032-04) und die geringste
Fläche entsteht.

## Nicht-Ziele

- **Keine Schreibaktionen — durchgängig, alle drei Orte** (Stop Condition, `.claude/rules/security.md`):
  kein Nutzer anlegen/deaktivieren, keine Rechte-/Rollen-/Scope-Änderung, kein Connector
  schalten/konfigurieren, keine Report-Erzeugung/-Freigabe/-Verteilung, kein Glossar-Editor.
  Read-only heißt: **keine auslösbare Aktion** (Action Rail bleibt `ohne_traeger`, Muster
  `seitenbausteine.ts`).
- **Administration: keine echten Rechte, keine Sicherheitszusage.** Das Rollenmodell ist
  **Perspektive, keine Autorisierung** (`roles.ts`-Grundsatz, Dok. 19 19-D01); es wird **keine
  Rechtematrix** gerendert, die reale Durchsetzung suggeriert. Die Seite behauptet **nicht**, der
  Mandant sei „sicher" (die Durchsetzung von RBAC/ABAC/ReBAC ist nicht gebaut — FINDING-0004,
  WP-030). Kein Zugriff/keine Zählung fremder Mandanten (Mandantengrenze, FINDING-0009).
- **Reports: keine Berichtserzeugung.** Kein PDF/PPTX/DOCX/Export, kein „Bericht generieren"-CTA,
  keine Vorschau eines erzeugten Artefakts, keine Claims mit echter Confidence/Freigabe — das ist
  die Reporting-/Präsentations-Engine (Dok. 12 §10–§11), Phase 5 / WP-009. **Keine Preise, keine
  Preisannahmen, keine Währung** (Dok. 12 nennt Preisannahmen in Service-/Investment-Reports →
  benannte Lücke, nie eine Zahl). Keine erfundene Zuordnung „Bericht ↔ Seed-Objekt", die eine
  Wertung wäre (kein Ampel-/Score-/Trend-Report — DR-0008-Grenze, Prozessvokabular-Wächter).
- **Wissen: keine Suche, keine Vorlagen, keine erfundenen Best Practices.** Kein Suchfeld, das
  halb funktioniert (globale Suche + Snippet-Leak-Schutz sind WP-027); keine Vorlagen-Downloads;
  keine ausgedachten „bewährten Vorgehen". Der Glossar zeigt **nur** das kanonische Vokabular in
  Domänensprache.
- **Kein internes Vokabular im Produkt** (DR-0013 Nr. 2): keine Familien-/Beziehungscodes
  (`F01`, `R12`, `SO02`), kein `snake_case`-Beziehungstyp (`mitigates`, `delivered_by`), keine
  Dok.-§-Referenz, kein Feldname (`scope_ids`, `record_time`), kein „Work Package"/„Screen S11" im
  UI. Der bisherige `PlaceholderPage`-Text („Dok. 06, 06-D01", „eigenes Work Package") verschwindet
  ersatzlos.
- **Keine Demo-/Synthetik-Disclaimer** (DR-0011): keine „Simulation"-/„Demo-Datenbestand"-Hinweise.
  Die Datenehrlichkeit (was ein Wert bedeutet, „x von y", Mandantengrenze) bleibt unverändert.
- **Kein Contract-/Seed-/DB-Umbau.** `packages/contracts`, `packages/demo-seed`, `packages/db`
  bleiben unverändert. Konzeptstrukturen (Berichtstypen, Case-Katalog, Rollen-/Rechte-/
  Connector-Modell) leben als quellenbelegte, react-freie Code-Konstanten in `apps/web/lib/`
  (etabliertes Muster `roles.ts`/`seitenbausteine.ts`/`lib/kunden/`).
- **Keine neuen Bewertungen** (DR-0008-Grenze): kein Reifegrad, kein Sicherheits-Score, keine
  Health-Ampel für Connectoren, kein Report-„Status grün". Nur gezählte, belegte Aussagen mit
  Grundgesamtheit.
- **Kein neuer Hauptnavigations-Ort** — 06-D01 fixiert genau acht; die drei Orte existieren
  bereits in `places.ts`.

## Scope

### Slice 1 – Administration (`/administration`): Konfigurations- und Betriebs-Überblick, read-only

**Leitfrage (heute):** Die in `places.ts` hinterlegte Frage „Ist der Tenant sicher, korrekt
konfiguriert und verbunden?" ist ein **Sicherheits-Urteil**, das der heutige Bau **nicht bejahen
kann** (keine durchgesetzten Rechte, keine echten Identitäten, keine Connectoren). Der Builder
wählt eine **antwort-modus-taugliche, sichtbare Rahmung** (im Code begründet, Konzeptanker
erhalten), die mit dem **belegten Konfigurationsstand führt** und die drei Teilfragen (sicher /
konfiguriert / verbunden) ehrlich auf „gebaut / Modell / noch nicht" abbildet — nicht eine
Zusage, die im nächsten Satz zurückgenommen wird (DR-0013 Nr. 1; O-WP032-02/03).

Quellen (Regel Null): Dok. 06, Abschnitt „Acht stabile Hauptorte" (Zeile Administration: „Nutzer,
Rechte, Integrationen, Konfiguration, Audit Logs, Betrieb — Nur bei entsprechender Berechtigung")
und Abschnitt „Seiten- und Screenkatalog" (Screen S11 „Administration & Integration Health",
Kerninhalt „Nutzer, Rollen, Scope, Connectoren, Jobs, Fehler, Audit Log, Supportzugriff"); Dok. 03,
Abschnitt „Kanonisches Rollenmodell" (R01–R12, Sphäre); Dok. 19, Abschnitte „Identitäts-Lifecycle"
(Identitätstypen; Joiner/Mover/Leaver), „Autorisierungsmodell: RBAC, ABAC und Beziehungen"
(10.2 „RBAC als verständliche Basis": kanonische Basisrollen; 10.3 ABAC; 10.4 ReBAC),
„Mandantenisolation und Kontextwechsel" (mehrschichtige Isolation; Kontextwechsel; Metadatenlecks),
„Canonical Audit Records" (Auslöser-Ereignisse; Mindestfelder), 19-D01; Dok. 17, Abschnitte
„Priorisierter Connector-Katalog", „Connector Health Record", IA16 „Operative Sichtbarkeit",
IA18 „Demo ohne Produktivdaten"; Dok. 18, Abschnitte „Observability & Operations" (Betriebsrollen,
Health Checks, SLO).

Umsetzung — **baubar auf dem heutigen Seed (read-only):**

- **Konfigurationsstand des aktiven Mandanten:** aktiver Mandant, seine erfassten **Scopes**
  (mandantenlokal, aus den vorhandenen Scope-Zuordnungen abgeleitet — vgl. `page-context.ts`;
  rohe Kennungen mit benannter O-WP014-03-Lücke), Datenstand. Das ist der belegte Teil der Frage
  „korrekt konfiguriert?".
- **Rollenmodell** (aus `roles.ts`, Dok. 03/Dok. 19 §10.2): die zwölf kanonischen Produktrollen
  mit **Sphäre** (Kunde/Betreiber/Unabhängig/Beide) und **Kernverantwortung**, sichtbar gerahmt
  als **Modell/Perspektive, nicht als durchgesetzte Rechte** und **nicht als „Nutzer dieses
  Mandanten"** (es gibt keine Konten im Seed). Die Administrations-Rolle selbst (Tenant / Platform
  Administrator, Sphäre „Beide") wird als die für diesen Ort zuständige Rolle benannt (Dok. 06:
  „Nur bei entsprechender Berechtigung") — der Ort ist heute für alle Rollen sichtbar (keine
  Authz), das wird ehrlich benannt (O-WP032-03).
- **Mandantenisolation als gelebte Tatsache:** die Seite rendert ausschließlich mandantenlokal;
  das **Isolationsmodell** (mehrschichtig; sichtbarer Kontextwechsel; Metadatenleck-Schutz aus
  Dok. 19 §11) erscheint als **Struktur**, die gelebte Trennung wird durch die Wächter belegt —
  **ohne** serverseitige Durchsetzung zu behaupten, die es (noch) nicht gibt (FINDING-0004,
  client-seitiger Seed, O-WP014-09).

Umsetzung — **benannte Lücken (mit PDF-Beleg, nicht gefüllt):**

- **Echte Nutzer/Konten & Identitäts-Lifecycle** (Dok. 19, Abschnitt „Identitäts-Lifecycle":
  Identitätstypen; Joiner/Mover/Leaver): der Seed trägt keine Konten/Identitäten; Rollen sind
  Perspektive. → als **Modellstruktur** gezeigt, Bau → WP-030 (echte Auth).
- **Durchsetzung RBAC/ABAC/ReBAC** (Dok. 19, Abschnitt „Autorisierungsmodell …", 19-D01): als
  **Modell** gezeigt (die drei Ebenen und wofür sie stehen), ausdrücklich **nicht durchgesetzt**
  → FINDING-0004/WP-030. **Keine Rechtematrix.**
- **Integration Health / Connectoren** (Dok. 17, Abschnitte „Priorisierter Connector-Katalog",
  „Connector Health Record", IA16/IA18): es gibt keine Connectoren; → **Connector-Familien-Katalog
  als Konzeptstruktur** (react-freie Konstante), **ohne erfundenen Health-Zustand**, ohne
  grün/degraded-Badge. Das ist der ehrliche Teil der Frage „verbunden?" (O-WP032-06).
- **Audit Log** (Dok. 19, Abschnitt „Canonical Audit Records": Auslöser + Mindestfelder): die
  Plattform erzeugt heute keine Audit-Ereignisse (read-only, keine Nutzeraktionen) → **Struktur
  gezeigt** (wofür Audit Records entstehen), keine erfundenen Log-Zeilen (O-WP032-07).
- **Betrieb/Observability** (Dok. 18, Abschnitt „Observability & Operations"): keine Telemetrie im
  Demo → als **Konzept** benannt (Betriebsfähigkeit, Health Checks, SLO), keine erfundenen
  Metriken.

### Slice 2 – Reports (`/reports`): Berichts- und Präsentationsstruktur + belegbare Datengrundlage, read-only

**Leitfrage (heute):** „Welche Geschichte soll aus demselben Datenstand entstehen?" (S10) setzt
einen Generator voraus, den es nicht gibt. Antwort-Modus: die Seite **führt mit der konkreten
Struktur** (welche Berichte/Fälle die Plattform produzieren wird, aus welchen Bausteinen) **und mit
der belegbaren Grundlage** des Mandanten; die Nicht-Erzeugbarkeit ist die ruhige Schlusszeile
(O-WP032-02).

Quellen (Regel Null): Dok. 12, Abschnitte „Kanonisches Report Package" (Pflichtfelder;
Lebenszyklus), „Report- und Artefakttypen" (Management/Executive; CISO/ISMS-Betrieb; Audit;
Managed Services/Beratung; operative Auszüge), „Content-Block-Architektur" (kanonische Blocktypen
mit Mindestanforderung), „PowerPoint-Engine" (Presentation Repository; **Kanonischer
Case-Katalog**; Update statt Neuerstellung; **Geschützte manuelle Inhalte** locked/
review-on-change/replaceable), „Claims, Quellen und Nachvollziehbarkeit" (Claim-Modell: Typ,
Confidence, Owner, Freigabe), „Reporting-Verfassung" (R01–R15; „Was die Engine bewusst
verhindert"); Dok. 06, Abschnitt „Seiten- und Screenkatalog" (S10 „Reporting Studio") und
Abschnitt „Reporting-, PDF- und Präsentationserlebnis"; `.claude/rules/reporting.md` (Case/
Template/Snapshot/Manifest/Build-Artefakt trennen; Claims mit Quelle/Methodik/Confidence/Freigabe).

Umsetzung — **baubar (read-only):**

- **Berichts- und Artefakttypen** und der **kanonische Case-Katalog** (Dok. 12 §5 / §10.7) als
  quellenbelegte, react-freie Konstante: welche Berichte/Präsentationsfälle die Plattform
  produzieren wird, je mit Ziel/Zielgruppe/typischen Inhalten — **struktur- und worttreu**, nicht
  interpretiert.
- **Content-Block-Architektur** (Dok. 12 §7.1) als Struktur: aus welchen wiederverwendbaren,
  versionierten Bausteinen ein Bericht entsteht (je mit der PDF-„Mindestanforderung"), und die
  **Report-Package-Pflichtfelder** (Dok. 12 §4.1) als „was ein Bericht in der Plattform ist".
- **Belegbare Datengrundlage des aktiven Mandanten** (der ehrliche Antwort-Modus-Brückenschlag):
  aus dem heutigen Seed **gezählte, mandantenlokale** Grundgesamtheiten, die ein Bericht bereits
  tragen würde — z. B. „für einen ISMS-Statusbericht liegen X Controls und Y Nachweise vor",
  „für einen Managed-Service-Bericht Z Services samt SLA/Deliverables", „für eine
  Entscheidungsunterlage N erfasste Entscheidungen". **Nur Zählungen mit Grundgesamtheit** (Muster
  `/heute`-Beobachtungen), **keine Wertung, keine Ampel, kein Trend, keine Zuordnung
  Bericht↔Objekt**. Bestehende mandantenlokale Ableitungen (`lib/isms/data.ts`,
  `lib/services/data.ts`, `lib/entscheidungen/data.ts`) wiederverwenden.

Umsetzung — **benannte Lücken (mit PDF-Beleg):**

- **Keine Berichtserzeugung** (Dok. 12, Abschnitte „PowerPoint-Engine", „PDF-Engine"): kein
  Artefakt, keine Vorschau, kein Export → Phase 5 / WP-009. Ruhig benannt, kein CTA.
- **Report Package ist kein Objekt im Datenmodell:** Dok. 12 nennt das Report Package „das
  kanonische Objekt", aber der Objektvertrag (Dok. 07, Objektfamilien F01–F09) kennt weder Report
  Package noch Content Block noch Presentation Manifest → der Katalog lebt als **Konzeptkonstante**
  (Muster Servicekatalog, O-WP012-01) und **behauptet keine Seed-Berichte** (O-WP032-01).
- **Keine Claims/Confidence/Freigabe, keine Snapshots** (Dok. 12 §14/§15/§17; Dok. 06, Abschnitt
  „Trust Layer") → als **Struktur** gezeigt (was ein Claim/Snapshot/Review ist), keine live
  belegten Claims.
- **Preisfreiheit** (Dok. 12 nennt Preisannahmen in Service-Value-/Investment-/Proposal-Reports):
  wo die Quellstruktur Preis nennt, **benannte Lücke** mit O-KUNDE-01-Verweis, nie eine Zahl.

### Slice 3 – Wissen (`/wissen`): Glossar der ISMS-Begriffe und Objekttypen, read-only

**Leitfrage (heute):** „Wo finde ich Erklärung, Vorlage und bewährtes Vorgehen zum aktuellen
Kontext?" — die Seite kann heute **Erklärung** liefern (Glossar), **nicht** Vorlage/bewährtes
Vorgehen und **nicht** Kontextsensitivität (die braucht Suche/Kontext-Infra). Antwort-Modus: mit
dem Glossar führen; Vorlagen/Best Practices/Suche als ruhige Lücken (O-WP032-02/04).

Quellen (Regel Null): Dok. 06, Abschnitt „Acht stabile Hauptorte" (Zeile Wissen: „Suche, Glossar,
Vorlagen, Best Practices, Lernhinweise — Kontextsensitiv und rollenbezogen"), Abschnitt „Suche,
Benachrichtigungen & Wiederaufnahme" (globale Suche; **vertrauliche Treffer werden nicht über
Snippets geleakt**), Abschnitt „Onboarding, adaptive Komplexität & Hilfe" (geführte Journeys,
Hilfe); Dok. 07, Abschnitt „Objektfamilien und kanonischer Katalog" (F01–F09, Namen/Leitfragen/
Objekttypen) und Abschnitt „Beziehungsmodell" (Beziehungstypen mit Regel) — **als Glossarinhalt in
Domänensprache**, nicht als Codes.

Umsetzung — **baubar (read-only):**

- **Glossar** der ISMS-Begriffe/Objekttypen aus dem kanonischen Vokabular
  (`@isms/contracts`), gruppiert nach den **neun Objektfamilien** (deutsche Familienname +
  Leitfrage), mit den zugehörigen **Objekttypen** und einer verständlichen Einordnung; **plus** die
  **Beziehungsarten in Domänensprache** (die deutschen Klartext-Labels, z. B. „wird gemindert
  durch", „ist belegt durch") mit ihrer Bedeutung. Quelle der Domänensprache: die bereits
  bestehenden UI-Labels (`objectTypeLabel`/`relationshipTypeLabel`, `lib/twin/data.ts`) —
  **keine** `F01`/`R12`/`snake_case`-Codes im UI (DR-0013; O-WP032-05). Der Glossar ist
  **mandantenunabhängig** (globales Vokabular) und daher ohne Mandantengrenzen-Risiko im Inhalt.

Umsetzung — **benannte Lücken (mit PDF-Beleg):**

- **Suche** (Dok. 06, Abschnitt „Suche, Benachrichtigungen & Wiederaufnahme"): eigenes WP mit
  Snippet-Leak-Schutz als Pflicht-AC (WP-027, O-WP020-05) → **kein** Suchfeld, benannte Lücke.
- **Vorlagen** (Dok. 06 §4; vgl. Dok. 12, Abschnitt „Template-, Branding- und White-Label-Konzept";
  Dok. 16 Struktur-Assistent): keine Vorlagenobjekte im Seed, „Vorlage" ist kein Objekttyp →
  benannte Lücke; **keine erfundenen Vorlagen** (O-WP032-08: Überschneidung Wissen-Vorlagen ↔
  Report-Templates).
- **Best Practices / Lernhinweise** (Dok. 06 §4 + Abschnitt „Onboarding, adaptive Komplexität &
  Hilfe"): das Konzept trägt hier fast nichts Konkretes → **ehrlich als dünnste Stelle benannt**,
  nicht erfunden (O-WP032-04).
- **Kontextsensitivität/Rollenbezug** (Dok. 06 §4 Navigationsregel „Kontextsensitiv und
  rollenbezogen"): braucht Kontext-/Suchinfrastruktur → benannt, nicht gebaut.

### Übergreifend (in allen drei Slices)

- **`live: true` in `places.ts`** für `reports`, `wissen`, `administration` setzen (entfernt den
  `plannedScreen`-Platzhalterpfad; macht die Orte zu Live-Orten, die die Wächter-Meta-Assertionen
  erfassen). Der `<PlaceholderPage>`-Aufruf der drei Seiten wird durch die echte Seite ersetzt.
- **Drei neue `BausteinOrt`-Einträge** (`reports`/`wissen`/`administration`) in
  `seitenbausteine.ts` mit vollständiger `BAUSTEIN_ABDECKUNG` (alle neun Bausteine je Ort genau
  einmal, ehrlicher Status; erwartbar `ohne_traeger`-lastig — Summary/Pulse, Impact, Decision
  Card, Action Rail, History haben auf diesen Orten meist keinen Träger). `SeitenbausteineHinweis`
  rendert die ehrliche Benennung, keine leeren Attrappen.
- **Kontextleiste** (`PageContextBar`) auf jeder der drei Seiten: Mandant/Rolle/Scope/Datenstand
  mit benannten Lücken (Muster O-WP016-08); der Glossar (mandantenunabhängig) benennt seinen
  mandantenneutralen Charakter statt einen Scope zu erfinden.
- **Antwort-Modus (DR-0013):** Antwort/Struktur/Zählung über der Falz, Lücke als ruhige
  Schlusszeile; keine Rechtfertigungs-Wand; kein internes Vokabular; die sichtbare Leitfrage ist
  die, die die Seite heute beantwortet (Builder-Framing je Ort, Konzeptanker erhalten).
- **Keine Demo-Disclaimer (DR-0011).**

## Acceptance Criteria

Jedes Kriterium nennt Kommando und erwartetes Ergebnis. Testkommando, sofern nicht anders genannt:
`pnpm --filter @isms/web exec vitest run` (frisch, ohne Turbo-Cache) → grün. Kardinalitäten
(Anzahl Rollen, Berichtstypen, Cases, Blocktypen, Familien, Beziehungsarten) werden **am PDF
verifiziert, nicht abgeschrieben** (Muster WP-006); jede Konstante trägt den PDF-Abschnittstitel
als Quellkommentar (Konzepttreue-Gate liest gegen).

**Slice 1 – Administration**

1. **Seite existiert und ist mandantenlokal:** `/administration` rendert für Nordwerk den
   Konfigurationsstand (aktiver Mandant, erfasste Scopes als rohe Kennungen mit O-WP014-03-Lücke,
   Datenstand) und das Rollenmodell (R01–R12 mit Sphäre/Kernverantwortung, als Modell benannt) —
   der Mandantenteil ausschließlich aus Objekten mit `tenant_id` des aktiven Mandanten; per Test
   belegt.
2. **Keine echten Rechte / keine Schreib-Hebel:** Der gerenderte Inhalt enthält **keine** als
   durchgesetzt dargestellte Rechtematrix, **kein** Bedienelement zum Anlegen/Ändern/Schalten
   (kein Formular, kein Button mit Schreibsemantik) und **keine** Behauptung, der Mandant sei
   „sicher"; das Rollenmodell ist sichtbar als Perspektive/Modell gerahmt; per Test (Positiv:
   Modell-Rahmung vorhanden; Negativ: keine Schreib-/Sicherheitszusage-Marker).
3. **Mandantengrenze-Negativbeweis:** Der gerenderte Text (voller UND leerer Mandant) enthält
   keine Namen/IDs/Zählungen anderer Mandanten; Muster `leerzustand-mandantengrenze`/FINDING-0009;
   per Test je Mandant belegt.
4. **Modelle & Lücken benannt:** Identitäts-Lifecycle, RBAC/ABAC/ReBAC (nicht durchgesetzt),
   Connector-Katalog (ohne erfundenen Health), Audit Records (ohne erfundene Zeilen) und
   Betrieb/Observability erscheinen als benannte Struktur/Lücke (Text vorhanden, kein erfundener
   Wert, kein Bewertungsvokabular); per Test belegt.
5. **Leerzustand als ehrliche Datenlücke:** Finovia/MediCore zeigen den mandantenlokalen
   Leerzustand (kein Scope, kein Konfigurationsstand) ohne Fremdmandanten-Existenzaussage; das
   globale Rollenmodell darf gezeigt werden (mandantenunabhängig), aber nicht als „Nutzer dieses
   Mandanten"; per Test belegt.

**Slice 2 – Reports**

6. **Struktur vollständig und quellentreu:** Die Seite zeigt die Berichts-/Artefakttypen, den
   kanonischen Case-Katalog, die Content-Block-Typen (je mit Mindestanforderung) und die
   Report-Package-Pflichtfelder; ein Test prüft Anzahl und Kennungen gegen die Code-Konstanten;
   Kardinalitäten am PDF verifiziert (Abschnitte „Report- und Artefakttypen", „Kanonischer
   Case-Katalog", „Content-Block-Architektur", „Kanonisches Report Package").
7. **Belegbare Datengrundlage ohne Wertung:** Die mandantenlokale Grundlage erscheint als gezählte
   Grundgesamtheiten (Controls, Nachweise, Services, Entscheidungen o. ä.) **ohne** Ampel, Score,
   Trend, Prozent oder Zuordnung Bericht↔Objekt; Prozessvokabular-/Bewertungs-Wächter bleiben
   unverändert grün; per Test (Positiv: Zählung mit Grundgesamtheit; Negativ: kein
   Wertungsvokabular).
8. **Keine Erzeugung, keine Preise:** Kein Erzeugungs-/Export-/Vorschau-Element; ein
   Negativbeweis-Test zeigt, dass der gerenderte Text kein Währungszeichen/`EUR`/Preisband
   enthält; die Erzeugung und die Preisstellen erscheinen als benannte Lücke
   (WP-009-/O-KUNDE-01-Verweis); per Test belegt.
9. **Mandantengrenze & Leerzustand:** Für leere Mandanten ist die belegbare Grundlage leer und
   mandantenlokal benannt (keine Fremdmandanten-Zählung); die Konzeptstruktur (Katalog) bleibt
   sichtbar (mandantenunabhängig); per Test belegt.

**Slice 3 – Wissen**

10. **Glossar vollständig und in Domänensprache:** Der Glossar zeigt die neun Objektfamilien
    (deutscher Name + Leitfrage), ihre Objekttypen und die Beziehungsarten in Klartext-Labels;
    ein Test prüft Vollzähligkeit gegen das kanonische Vokabular; ein **Negativbeweis** zeigt,
    dass der gerenderte Text **keine** Codes (`F01`…`F09`, `R01`…`R25`) und **keinen**
    `snake_case`-Beziehungstyp enthält (DR-0013; O-WP032-05); Prozessvokabular-Wächter grün.
11. **Lücken benannt statt erfunden:** Suche (WP-027), Vorlagen, Best Practices/Lernhinweise und
    Kontextsensitivität erscheinen als benannte Lücken; **kein** Suchfeld, **keine** Vorlage,
    **keine** erfundene „bewährte Praxis"; per Test belegt.
12. **Read-only bewiesen:** Die Seite enthält kein Eingabefeld und schreibt keinen neuen
    localStorage-Schlüssel (bestehende Session-/Tiefe-Schlüssel ausgenommen); per Test belegt.

**Übergreifend**

13. **Drei Orte `live: true` und Wächter-Abdeckung:** `reports`/`wissen`/`administration` stehen in
    `places.ts` auf `live: true`; `prozessvokabular`, `kontextleiste`, `leerzustand-mandantengrenze`
    und `seitenbausteine` führen die drei neuen Orte in ihren Registern; die Meta-Assertionen gegen
    die `live: true`-Orte bleiben intakt (neuer Ort/`BausteinOrt` ist eingetragen — Muster
    `objekt360`/`kundenstart`); kein Wächter wird abgeschwächt; `vitest run` grün.
14. **Seitenbausteine-Konvention erfüllt:** Jeder der drei Orte hat eine vollständige
    `BAUSTEIN_ABDECKUNG` (neun Bausteine, ehrlicher Status mit Begründung), rendert
    `SeitenbausteineHinweis` und keine leeren Attrappen; Kontextleiste nach WP-020-Muster; per
    Test belegt.
15. **Antwort-Modus & kein internes Vokabular (DR-0013):** Über der Falz steht Inhalt/Struktur/
    Zählung, nicht eine Rechtfertigungs-Wand; die sichtbare Leitfrage ist heute beantwortbar
    gerahmt; ein Negativbeweis-Test zeigt, dass der gerenderte Text der drei Seiten **keine**
    Dok.-§-Referenz, **keinen** Feldnamen (`scope_ids`, `record_time`, `owner_ids`), **keinen**
    Familien-/Beziehungscode und **kein** „Work Package"/„Screen S…"/„Simulation"/„Demo-Seed"
    enthält (DR-0013 + DR-0011); der alte `PlaceholderPage`-Text ist entfernt.
16. **Gates besetzt wie zugeschnitten:** Code + Product + Domain + QA + Security & Privacy +
    Konzepttreue; zweite Runde nach dem Fix-Pass; Review-Notiz unter `docs/project/reviews/` mit
    **explizitem Security-Urteil** zu Administration (Mandantengrenze, keine echten Rechte, keine
    Schreib-Hebel, keine falsche Sicherheitszusage).
17. **Gesamtverifikation:** `pnpm lint`, `pnpm typecheck`, `pnpm build`,
    `pnpm --filter @isms/web exec vitest run`, `python scripts/validate_handoff.py` grün;
    `git diff --stat` je Slice enthält **keine** `packages/`-Pfade.
18. **Owner-Sicht vorbereitet:** `pnpm qa:visual WP-032` gelaufen, Screenshots + axe-Report unter
    `docs/project/visual/WP-032/` committet (Administration voll+leer, Reports voll+leer, Wissen);
    keine neuen `serious`/`critical`-axe-Befunde auf den neuen Seiten.
19. **Offene Fragen registriert:** Die O-WP032-Vorschläge unten stehen bei Abschluss in
    `docs/project/OPEN_QUESTIONS.md`; jede beim Bauen neu gefundene Lücke kommt als weiterer
    O-WP032-Eintrag dazu — geraten wird nichts (DR-0005).

## Benannte Lücken und offene Fragen (Vorschlag für `docs/project/OPEN_QUESTIONS.md`)

| ID (Vorschlag) | Frage | Art | Umgang in WP-032 | Owner / Gate |
|---|---|---|---|---|
| O-WP032-01 | Dok. 12, Abschnitt „Kanonisches Report Package" nennt das Report Package „das kanonische Objekt", aber der Objektvertrag (Dok. 07, Objektfamilien F01–F09) kennt weder Report Package noch Content Block noch Presentation Manifest. Dauerhaft Konzeptkonstante oder Contract-Erweiterung (E-02-Umfeld, vgl. O-WP012-01/O-WP006-02)? | **Konzeptspannung** | Katalog als quellenbelegte Konstante; keine Seed-Berichte behauptet | Concept Author |
| O-WP032-02 | Alle drei Leitfragen (`places.ts` `question`) sind aspirativ und heute nur teilweise beantwortbar (Reports: kein Generator; Wissen: keine Vorlagen/Suche; Administration: keine Durchsetzung/Connectoren). DR-0013 Nr. 1 will die Leitfrage = was die Seite heute beantwortet. Reicht die im Code begründete Antwort-Modus-Rahmung, oder werden die `question`-Strings selbst überarbeitet (vgl. O-WP006-07, `/entscheidungen`→Register)? | Produkt/Wortlaut | Builder wählt sichtbare Rahmung, Konzeptanker erhalten; `question`-Änderung offen | Product / Owner |
| O-WP032-03 | Administrations-Leitfrage „Ist der Tenant **sicher** …?" verlangt ein Sicherheits-Urteil, das der Bau nicht bejahen kann (keine RBAC/ABAC/ReBAC-Durchsetzung — FINDING-0004/WP-030; keine echten Identitäten — Dok. 19, Abschnitt „Identitäts-Lifecycle"). Wie präsentiert Administration eine Sicherheitsfrage, ohne zu alarmieren **und** ohne falsch zu beruhigen? | **Security-/Produkt-Grenze** | belegter Konfigurationsstand + Modell; keine Sicherheitszusage; Nicht-Durchsetzung benannt | Security / Product |
| O-WP032-04 | **Wissen ist am dünnsten konzeptgedeckt:** eine Navigationszeile (Dok. 06, Abschnitt „Acht stabile Hauptorte") plus die Querschnitte „Suche …" und „Onboarding … & Hilfe"; **kein** eigenes Wissens-/Knowledge-Konzeptdokument. Dok. 21 („Research/Innovation") ist **interne** Entwicklungs-/Research-Operation (ADRs, Glossare fürs Bau-Team, Threat-Knowledge-Base als Datenquelle), **kein** nutzerseitiger Wissensort. Ist ein Glossar-only-Stufe-1 akzeptabel, oder braucht „Wissen" ein eigenes Konzept vor weiterem Ausbau? | **Konzeptlücke** | Glossar aus kanonischem Vokabular; Rest als benannte Lücke; Dünne offen benannt | Concept Author / Owner |
| O-WP032-05 | Der Glossar zeigt das kanonische Vokabular — DR-0013 Nr. 2 verbietet Codes (`F01`, `R12`, `snake_case`) im UI. Bestätigen: Glossar nutzt **nur** Domänensprache; die kanonischen englischen Typnamen (Threat, Control, Framework) gelten als Fachbegriffe (app-weit bereits gezeigt), nicht als verbotene Codes. | Konzept/QA (Wächter) | Domänensprache; Negativbeweis gegen Codes; englische Fachbegriffe erlaubt | Concept / QA |
| O-WP032-06 | Connector-Katalog & Connector Health (Dok. 17, Abschnitte „Priorisierter Connector-Katalog", „Connector Health Record") als Struktur ohne erfundenen Health — die Leitfrage fragt „**verbunden?**", es gibt aber keine Connectoren. Wann kommen reale/Mock-Connectoren (Dok. 17 IA18: synthetische Payloads/Mock-Endpunkte)? | Lücke (spätere Phase) | Katalog als Struktur; kein Health-Badge | Product / Integrations-WP |
| O-WP032-07 | Audit Log (Dok. 19, Abschnitt „Canonical Audit Records") braucht reale Aktionen; die read-only Plattform erzeugt keine Audit-Ereignisse. Struktur zeigen, keine Zeilen erfinden. Terminierung mit WP-030 (Auth + Schreibaktionen)? | Lücke (bekannt) | Struktur der Auslöser/Mindestfelder; keine Log-Zeilen | Security / WP-030 |
| O-WP032-08 | „Vorlagen" erscheint in **Dok. 06 §4 (Wissen)** **und** in **Dok. 12, Abschnitt „Template-, Branding- und White-Label-Konzept" (Report-Templates)** **und** im Onboarding-Struktur-Assistenten (Dok. 16). Wo leben Vorlagen — Wissen (allgemein), Reports (Bericht-Templates) oder verteilt? | Konzeptüberschneidung | Stufe 1 benennt Vorlagen als Lücke an beiden Orten, ohne zu erfinden | Product / Concept |

## Stop Conditions

- Ein Inhalt ließe sich **nur mit einem Schreib-Hebel** (Nutzer/Rechte/Scope/Connector/Report
  anlegen/ändern/schalten/erzeugen/freigeben) darstellen → **stoppen**; das ist WP-030/WP-009/
  Integrations-Territorium (Human Gate, `.claude/rules/security.md`).
- Administration ließe sich **nur mit einer als durchgesetzt dargestellten Rechtematrix, einer
  Sicherheitszusage („Tenant ist sicher") oder Existenz-/Zählaussagen über fremde Mandanten**
  füllen → **stoppen**, Security-Gate einbeziehen (FINDING-0009-/FINDING-0004-Klasse).
- Ein Bericht/Case ließe sich **nur mit einer Preisangabe, einer erfundenen Zuordnung
  Bericht↔Objekt oder einer Wertung/Ampel ohne Datenträger** darstellen → **stoppen**, als Lücke
  zeigen, O-WP032-/O-KUNDE-01-Eintrag (DR-0008-Grenze).
- Der Glossar ließe sich **nur unter Verwendung von Codes** (`F01`/`R12`/`snake_case`) sinnvoll
  bauen → **stoppen**; DR-0013 verbietet interne Codes im UI — Domänensprache verwenden oder
  O-WP032-05 eskalieren.
- Der Bau **erzwingt eine Änderung an `packages/contracts`, `packages/demo-seed` oder
  `packages/db`** → **stoppen**; das ist E-02-/Contract-Territorium (Human Gate).
- Ein Wächter ließe sich **nur grün bekommen, indem seine Regel abgeschwächt, eine Ausnahme
  verallgemeinert oder der Test übersprungen wird** → **stoppen**; Regelevolution nur dokumentiert
  über QA-/Product-Gate (Muster O-WP020-12), nie still. Insbesondere wenn wörtliche PDF-Strukturtexte
  (z. B. „Budget"/„Kosten" in Report-/Rechte-Tabellen) mit Wächter-Verbotslisten kollidieren.
- **WP-028 (Antwort-Modus) ist beim Aktivieren nicht abgeschlossen und die drei Seiten ließen sich
  nur im Rechtfertigungs-Modus bauen** → Zuschnitt gegen den echten Stand prüfen; der
  Antwort-Modus wird für diese drei Orte eigenständig korrekt gebaut, nicht auf WP-028 vertagt.
- Scope-Drift Richtung **echte Auth/Nutzerverwaltung, Suche, Report-Generierung, Mock-Connectoren,
  DB→UI** → **stoppen**, Stand sichern, an Queue/Owner.

## Done Evidence

- Kommandoprotokolle in der Review-Notiz: `pnpm lint`, `pnpm typecheck`, frischer `vitest run`,
  `pnpm build`, `python scripts/validate_handoff.py`, finaler `pnpm qa:visual WP-032`,
- Screenshots + axe-Report committet unter `docs/project/visual/WP-032/` (Administration voll/leer,
  Reports voll/leer, Wissen),
- Review-Notiz unter `docs/project/reviews/WP-032_INDEPENDENT_REVIEW.md` mit allen sechs Gates,
  zweiter Runde und explizitem Security-Urteil zu Administration,
- aktualisierte `docs/project/CURRENT_STATE.md`, `docs/project/ACTIVE_WORK_PACKAGE.md`,
  `docs/project/WORK_QUEUE.md` (WP-032-Zeile), `docs/project/OPEN_QUESTIONS.md`
  (O-WP032-01…08 + Neufunde), `docs/project/handovers/LATEST.md`,
- getrennte Commits je Slice (explizit gestaged, nie `git add -A`), Verified Checkpoint,
  Commit + Push.
