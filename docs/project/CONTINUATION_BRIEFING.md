# Continuation Briefing – autonomer Weiterbau

**Zweck:** Betriebsanleitung für eine neue Session, die möglichst lange **ohne Rückfragen** weiterbaut.
Diese Datei ist die Arbeitsweise; **Produktwahrheit** bleibt `docs/concept/active/` (24 Dokumente),
**Statuswahrheit** bleibt `CURRENT_STATE.md`, `ACTIVE_WORK_PACKAGE.md`, `WORK_QUEUE.md`, `handovers/LATEST.md`.

---

## 0. „Mach weiter" – das genügt als Auftrag

Diese Datei ist so gebaut, dass eine neue Session mit **einem einzigen Satz** starten kann:
*„Übernimm das Projekt in `C:/Users/Domme/Desktop/coding/apps/ISMS` und mach weiter."*
Alles Weitere steht im Repository. Reihenfolge:

1. `CLAUDE.md` — verbindliche Arbeitsregeln
2. **diese Datei** — Arbeitsweise, Leitplanken, Lektionen
3. `docs/project/CURRENT_STATE.md` — wo das Projekt steht
4. `docs/project/handovers/LATEST.md` — letzter Stand und exakter nächster Schritt
5. `docs/project/ACTIVE_WORK_PACKAGE.md` — was gerade läuft (oder dass nichts läuft)
6. `docs/project/OWNER_DECISIONS.md` — die wenigen Fragen, die den Owner wirklich brauchen.
   Jede Karte hat einen **Default**: ohne Antwort wird weitergebaut, nie gewartet.

Dann verifizieren:

```bash
pnpm install && pnpm test --force && python scripts/validate_handoff.py
```

**Und die App wirklich ansehen, nicht nur den Code lesen.** Der Zustand des Produkts steht nicht
vollständig in den Statusdateien — starte den Dev-Server und geh die vier echten Orte durch
(`/heute`, `/twin`, `/isms`, `/services`), inklusive einer Objekt-360-Seite und eines
Mandantenwechsels. Vieles, was in Reviews gefunden wurde, war nur dort sichtbar (siehe §7).

```bash
pnpm --filter @isms/web dev      # http://localhost:3000/login
```

**⚠️ Regel Null: Alles kommt aus den PDFs.** Jede Anforderung, jedes Pflichtfeld, jedes Vokabular
und jede Zahl, die in Code, Datenmodell, Seed, Tests oder Acceptance Criteria einfließt, wird **im
PDF** nachgelesen — nicht im Markdown, nicht aus dem Chat. Grund: Der Abgleich vom 2026-07-23 hat
**5 schwerwiegend und 14 material abweichende** Markdown-Fassungen gefunden, nur **eine** war treu
(FINDING-0007, DR-0006, `docs/concept/abgleich/`). Werkzeug:

```bash
python scripts/pdf_text.py 07                     # Dokument als Text
python scripts/pdf_text.py 06 --suche "Trust Layer"
```

Zitiere immer den **Abschnittstitel**, nicht nur die Nummer — die Nummerierung weicht ab.

**Wo die Produktwahrheit liegt:**

| Quelle | Rolle |
|---|---|
| **`docs/concept/pdf/*.pdf` (24 Originale)** | **Produktwahrheit — Pflichtlektüre (DR-0006).** Bei Abweichung gilt das PDF. Textextraktion mit Python + `pypdf`. |
| `docs/concept/active/*.md` (24 Dokumente) | Arbeitsfassung. **Dok. 03–07 seit WP-019 quellentreu** (Kopfnotiz mit Konkordanz beachten); die übrigen weiterhin nicht verlustfrei (FINDING-0007, WP-023). Eine Aussage, die nur hier steht, ist begründungspflichtig. |
| `docs/concept/MANIFEST.json` | Hashes; `validate_handoff.py` prüft sie |
| `docs/project/PROJECT_UNDERSTANDING.md` | destilliertes Gesamtverständnis für den schnellen Einstieg — **nicht** autoritativ |
| `docs/project/OPEN_QUESTIONS.md` | alle benannten Konzeptlücken (O-…) — hier steht, was bewusst **nicht** gebaut wurde |
| `docs/decisions/`, `docs/architecture/adr/` | getroffene Entscheidungen samt Begründung |
| `docs/project/reviews/` | was frühere Reviews gefunden haben — vermeidet Wiederholung derselben Fehler |
| `research/ideas/` | **Feature-Ideen des Owners** (Idea Cards) — legitime Anforderungsquelle, aber nichts davon „nebenbei" bauen; Umsetzung über Queue/CCP |

Lade **nicht** alle Konzeptdokumente pauschal (`CLAUDE.md`, Context-Regel) — nimm das Context Pack
des aktiven Work Packages und lies gezielt nach.

Der Owner muss **nie** einen Übergabetext aus einem Chat kopieren. Wenn etwas davon nicht stimmt,
ist das ein Fehler in der Arbeitsweise, kein Grund nachzufragen — dann zuerst den Stand korrigieren.

---

## 1. Wo das Projekt steht

Lauffähige Demo-App (read-only, rein synthetisch). Drei Orte der Shell sind echt:
**Kunden/Zwilling · Services · ISMS**. Persistenzschicht existiert, ist aber bewusst **noch nicht** ans UI angebunden.

| Bereich | Stand |
|---|---|
| Repository/Continuity | WP-001 ✅ (getaggt `phase-0-baseline`) |
| Stack + Grundgerüst | WP-002 ✅ (ADR-0001: TypeScript · Next.js · NestJS · PostgreSQL · pnpm/Turborepo) |
| Datenverträge + Demo-Welt | WP-003 ✅ (`@isms/contracts`, `@isms/demo-seed`) |
| Twin Explorer | WP-004 ✅ |
| Persistenz | WP-007 ✅ (`@isms/db`, Drizzle; getestet gegen PGlite, **ohne Docker**) |
| App-Shell + Rollen/Mandanten | WP-011 ✅ |
| Managed-Service-Welt | WP-012 ✅ |
| ISMS-Kern-Welt | WP-013 ✅ |
| Visuelles Design | WP-015 ✅ (minimal, DR-0003) |
| Objekt-360-Detailseite | WP-014 ✅ (Graph durchgängig begehbar, 40 Objektseiten) |
| Mission Control „Heute" | WP-016 ✅ (**ohne** Morning Mission — Datenlage trägt sie nicht) |
| Entscheidungen im Zwilling | WP-017 ✅ (erste Versionshistorie im Seed; Register statt Decision Card) |
| Werkzeuge & sichtbare Abnahme | WP-018 ✅ (Linter, `qa:visual` mit Screenshots+axe je WP, drei Wächter) |
| Konzeptfassungen Dok. 03–07 | WP-019 ✅ (quellentreu aus den PDFs; Kopfnotizen mit Konkordanz; 11 WP-020-Punkte im Nachtrag) |
| **Nächstes** | **WP-020 verlorene Anforderungen** (11-Punkte-Liste im Nachtrag, Cross-Tenant-Schutz zuerst) → WP-021 Demo-Welt → WP-023 Konzept Teil 2 |

Testlage: **448 Tests grün** (api 2 · contracts 55 · demo-seed 54 · web 318 · db 19). CI grün.
Seit WP-018: `pnpm lint` (Biome), `pnpm qa:visual <WP>` (Screenshots + axe nach `docs/project/visual/`).

---

## 2. Arbeitszyklus je Work Package (verbindlich)

1. **Planen** – WP + Context Pack existiert (oder per `program-manager` erstellen lassen), aktiv setzen,
   Micro-Checkpoint, **committen + pushen**.
2. **Bauen** – an einen Fach-Agenten delegieren (`frontend-engineer`, `backend-engineer`,
   `data-graph-analytics`). Der Builder **committet nie selbst**.
3. **Prüfen** – **Gates risikobasiert besetzen** (Dok. 20B §36, nicht einfach „zwei Reviews"),
   Builder ≠ Reviewer, und der Builder darf ein Finding nie selbst schließen (§31.3):
   - **immer:** Code Quality (`code-reviewer`) + Product (`product-user-lead`)
   - **immer bei fachlichem Inhalt:** Domain (`isms-domain-lead`, bei Bedrohungsbezug
     `cyber-threat-lead`) — war bis WP-016 nie besetzt, siehe **FINDING-0006**
   - **immer bei neuen Tests:** QA (`qa-test-engineer`) — sonst prüft der Builder seine eigenen
     Tests (Dok. 20B §38 „Builder reviewt sich selbst")
   - **bei Contract-/Modul-/Persistenzänderung:** Architecture (`cto-architecture`)
   - **bei Sicherheits-/Mandantenthemen:** Security & Privacy (`product-security-privacy`)
   - **bei Konzeptbezug:** `concept-consistency-reviewer`
   Danach **eine zweite Runde**: dieselben Reviewer prüfen nach, ob ihre Findings behoben sind —
   das hat bisher **jedes Mal** eine vom Fix erzeugte Regression gefunden.
4. **Fixen** – Findings gebündelt in *einem* Pass umsetzen (nicht tröpfchenweise).
5. **Verifizieren** – frisch (ohne Turbo-Cache) testen, `pnpm build/typecheck`, `validate_handoff.py`,
   plus **Browser-QA** bei UI-Arbeit (Dev-Server starten, DOM/Text prüfen, Server wieder stoppen).
6. **Abschließen** – Review-Notiz unter `docs/project/reviews/`, Status-/Queue-/CURRENT_STATE-Update,
   Verified Checkpoint, **Handover erneuern**, **committen + pushen**.
7. **Berichten** – kurzer Fortschrittsreport mit Balken (siehe §6).

---

## 3. Parallelität – erlaubt und verboten

**Erlaubt** (disjunkte Schreibbereiche, gleichzeitig):
- ein Builder in `apps/web` **und** ein Builder in `packages/*` (verschiedene Pakete)
- beliebig viele **read-only** Reviews
- `program-manager` (nur `work-packages/`, `context-packs/`)
- `concept-author` (nur `research/change-proposals/`)

**Verboten:**
- zwei Writer auf denselben Dateien
- den Seed ändern, während ein Builder das Monorepo testet (er sieht dann fremde Fehler)
- ein Folge-WP starten, das auf Artefakten aufbaut, die gerade im Review sind

**Faustregel:** 3–4 gleichzeitige Ströme sind das Maximum; darüber steigt Rework, nicht Output.

---

## 4. Harte Regeln (nicht verhandelbar)

- **Aus dem Konzept ableiten, nie erfinden.** Fehlt etwas in `docs/concept/active/` oder im Contract:
  als `// OFFENE FRAGE` markieren, in `docs/project/OPEN_QUESTIONS.md` eintragen — **nicht** raten.
  (Bisher so entstanden: O-D07-01…11, O-WP012-01…06, O-WP013-01, O-WP014-01…11, O-WP016-01…08.)
- **Zielbild vollständig, Konzeptfehler nicht (DR-0005).** Das Konzept wird nie verkleinert — aber
  eine nachweislich **falsche oder widersprüchliche** Konzeptaussage muss nicht gebaut werden.
  Dann gilt: benennen, begründen, Besseres vorschlagen (OFFENE FRAGE + Change Proposal in
  `research/change-proposals/`), im Produkt bis zur Freigabe den ehrlichen Zustand zeigen,
  Umsetzung der Korrektur **erst nach Owner-Freigabe**. Weder den Fehler noch die Korrektur still.
- **Keine echten Daten, Secrets, Preise, Kundennamen.** Nur synthetischer Seed. Es existiert ein
  Guardrail-Test gegen Währungs-/Preisangaben im Seed.
- **Tenant-Isolation** ist Pflicht und wird mit **Negativbeweisen** getestet.
- **Ehrlichkeit vor Wirkung:** keine erfundenen Bewertungen/Ampeln/Scores; Lebenszyklus-Stände sind
  **keine** Prüfergebnisse (Dok. 08 08-D07); Annahmen als Annahmen kennzeichnen; Datenlücken sichtbar machen.
- **Accessibility ist Teil von Done:** Kontrast ≥ AA, Fokus sichtbar, Status nie nur über Farbe,
  `prefers-reduced-motion` respektieren.
- **Nach jedem WP: committen + pushen + `LATEST.md` aktualisieren.** Auch mitten im WP darf der Stand
  jederzeit resumbar sein (Hintergrund-Agenten können ohne Vorwarnung abgeräumt werden — schon passiert).
- **Keine stille Widerspruchsauflösung** (`.claude/rules/docs.md`).

---

## 5. Offene Human Gates – NICHT autonom entscheiden

| Gate | Inhalt | Wirkung |
|---|---|---|
| **CCP-001/002/003** | Konzeptänderungs-Vorschläge (Lifecycle-Vereinheitlichung, Managed-Service-Objektmodell, Wertfelder/Skalen) — Entwürfe in `research/change-proposals/` | Nur nach Owner-Freigabe umsetzen. Bis dahin bleibt der Code wertoffen/dual. |
| **Docker-Engine** | Docker Desktop installiert (CLI 29.6.2), Daemon antwortet mit 500 | Reale Postgres-Validierung von `@isms/db` wartet; **PGlite deckt Dev/Test vollständig** → kein Blocker. |
| **FINDING-0004** | DB-RLS + least-privilege-Rolle | **Pflicht, bevor** `@isms/db` hinter eine nutzergesteuerte API/UI kommt. |
| Kosten/Cloud/Prod | jede kostenpflichtige oder produktive Ressource | Immer erst fragen. |

---

## 6. Berichtsformat – Fortschrittsbalken (verbindlich)

Der Owner steuert das Projekt **über die Balken**. Sie sind kein Schmuck, sondern sein
Hauptinstrument, um zu sehen, wo das Produkt steht und wo er eingreifen muss.

**Wann berichten:**
- nach **jedem abgeschlossenen Work Package** (Pflicht),
- bei jedem längeren Arbeitsblock zwischendurch, damit er nicht im Dunkeln sitzt,
- immer wenn er nach dem Stand fragt.

**Format** — genau so, kurz, kein Fließtextberg:

```
Gesamtprodukt:  █████████░░░░░░░░░░░░  ~41 %
Phase 0/1:      █████████████████████  ~98 %   Fundament + Demo-Welt
Phase 2:        ██████░░░░░░░░░░░░░░░  ~30 %   Persistenz da, nicht am UI
Phase 6:        ████░░░░░░░░░░░░░░░░░  ~20 %   Managed-Service-Vorgeschmack
Phase 3/4/5/7-9:░░░░░░░░░░░░░░░░░░░░░    0 %   ISMS-Tiefe, Decisions, Reporting, …
```

Darunter, in dieser Reihenfolge und jeweils **wenige Zeilen**:

1. **Was fertig wurde** — in Produktsprache, nicht in Dateinamen.
2. **Testlage und Commit** — Zahl der grünen Tests, Commit-Hash, gepusht ja/nein.
3. **Die wertvollsten Review-Funde** — was hätte das Produkt beschädigt, wenn es durchgegangen wäre.
   Das ist für den Owner oft der lehrreichste Teil.
4. **Was ehrlich nicht geht** — benannte Lücken, bewusste Abweichungen, nicht Erbrachtes.
5. **Was ich von dir bräuchte** — offene Owner-Entscheidungen, klar als „blockiert nichts"
   gekennzeichnet, wenn autonom weitergebaut werden kann.

**Regeln:**
- Die Balken sind **Schätzungen** und dürfen so benannt werden — aber sie müssen begründbar sein
  (abgeschlossene Work Packages, Module aus Dok. 05, Phasen aus dem Master-Index).
- **Nie beschönigen.** Ein Balken, der nach einem Rückschritt kürzer wird, ist wertvoller als einer,
  der nur wächst. Fehlgeschlagene Tests, nicht erbrachte QA und offene Findings gehören in den Report.
- Keine Wall-of-Text. Wenn ein Punkt lang wird, gehört er ins Repository (Review-Notiz, Finding,
  offene Frage) und in den Report nur als ein Satz mit Verweis.

---

## 7. Gelernte Lektionen (Wiederholung vermeiden)

1. **Gestaltungswünsche minimal interpretieren.** „Etwas mehr Wow, nicht viel" wurde in einen Auftrag
   mit „dunkle Navy-Basis, Glow, Glas-Topbar" übersetzt → komplett verworfen (DR-0003).
   **Regel: zuerst die kleinste Variante bauen und zeigen.**
2. **Früh committen.** Ein Hintergrund-Builder wurde durch einen Session-Neustart abgeräumt; nur weil
   der Stand auf der Platte lag, ging nichts verloren.
3. **Reviews finden das Wertvollste im Wording.** Der größte Fund bisher: „Control · Status: wirksam"
   las sich wie ein Prüfergebnis, war aber nur ein Lebenszyklus-Stand.
4. **Ripple mitziehen.** Seed-Änderungen brechen Counts in `demo-seed`-, `db`- und `web`-Tests — im
   selben Pass anpassen, sonst rot.
5. **Turbo-Cache täuscht.** Für echte Verifikation `pnpm --filter <pkg> exec vitest run` (frisch) nutzen.
6. **Agentenzahlen nachrechnen, nicht übernehmen.** „41 Objekte" wanderte aus einem Builder-Bericht
   ungeprüft in drei Statusdateien; es sind 40. Zahlen am Seed verifizieren, bevor sie Projektwahrheit werden.
7. **Manche Fehler sieht keine Testschicht.** Zwei benachbarte inline-Spans ließen im Browser Text
   zusammenlaufen — `textContent` fügt zwischen Elementen nie Whitespace ein, also kann kein
   Text-Assertion das finden. Für Layout-Effekte **Struktur** prüfen und im Browser die Geometrie messen.
8. **Ein zweiter Reviewdurchgang lohnt sich.** In WP-014 und WP-016 hat jeweils erst die Nachprüfung
   eine Regression gefunden, die der Fix-Pass selbst erzeugt hatte.
9. **Explizit stagen, nie `git add -A`.** Ein Bau ist so versehentlich in einen Docs-Commit gerutscht.
10. **Nie `pnpm build`, während der Dev-Server läuft.** Beide schreiben in `apps/web/.next`; der
   Build zerschießt dem laufenden Server die Chunks (Symptom: 404 auf `page.js`, Seite hängt bei
   „Lade Kontext …"). Zweimal passiert. Erst Server stoppen, dann bauen — oder getrenntes
   Build-Verzeichnis einführen (Kandidat WP-018).
11. **Ein Test, der eine Formulierung festschreibt, kann einen Defekt zementieren.** Der
   `/isms`-Leerzustand leakte eine Existenzaussage über fremde Mandanten — und der Test prüfte
   wörtlich auf genau diesen Satz. Wächter prüfen die REGEL (verbotene Muster), nicht den Wortlaut.
12. **Leerzustände sind die Versuchungsstelle für Mandanten-Leaks** („nicht hier, aber woanders").
   Zweimal unabhängig entstanden (WP-013 `/isms`, WP-017 `/entscheidungen`). Mechanischer Schutz:
   `components/__tests__/leerzustand-mandantengrenze.test.tsx` — neue leere Orte dort eintragen.

---

## 8. Roadmap nach WP-014

Reihenfolge ist Vorschlag, der Orchestrator darf verfeinern (Vision nie verkleinern):

1. ~~WP-014 Objekt-360-Detailseite~~ ✅ · ~~WP-016 Mission Control „Heute"~~ ✅
2. **Blocker für ganz Dok. 10 sichtbar geworden:** der Seed trägt keine `Task`- und keine
   `Decision Record`-Objekte, der Objektvertrag keine Frist-/Aufwand-/Kapazitäts-/Prioritätsfelder
   (O-WP016-03/-04). Das blockiert **Morning Mission und Decision Center gleichermaßen**.
   → Entweder Seed/Contract erweitern (Human Gate, Concept Author) oder vorerst umgehen.
3. **Executive-Welt** (Dok. 06/10): wenige verdichtete Entscheidungen — läuft in dieselbe Grenze
4. **API-Schicht + DB→UI** (NestJS) — **erst nach FINDING-0004 (RLS)**
5. **Reporting/Presentation-as-Code** (Dok. 12)
6. **Integrationen/Workflow** (Dok. 17), **KI-Guardrails** (Dok. 20A) — späte Phasen

**Realistische Erwartung:** Das Gesamtprodukt (9 Phasen, 33 Module) ist ein Marathon über viele
Sessions. Eine Session baut typischerweise 1–3 Work Packages.

**Der Stand ist immer übernahmefähig — das ist eine laufende Pflicht, kein Notfallverfahren.**
Eine neue Session braucht nichts als den Satz „mach weiter": Sie liest `CURRENT_STATE.md`,
`handovers/LATEST.md` und `ACTIVE_WORK_PACKAGE.md` und weiß, wo das Projekt steht und was als
Nächstes dran ist. Damit das jederzeit stimmt:

- **Nach jedem logischen Teilziel committen und `git push origin main`** — nicht erst am WP-Ende.
- **Statusdateien mit dem Code aktualisieren**, nicht nachgelagert: `CURRENT_STATE.md`,
  `ACTIVE_WORK_PACKAGE.md`, `WORK_QUEUE.md`, `handovers/LATEST.md`.
- **Auch mitten im Work Package** muss aus dem Repository hervorgehen, was gerade läuft, was fertig
  ist und was der nächste Schritt wäre — dafür sind die Micro Checkpoints da.
- Es wird **nie** mitten in einem Work Package abgebrochen, ohne dass der Stand gesichert und
  beschrieben ist.

---

## 9. Startkommandos

```bash
pnpm install
pnpm test --force && pnpm typecheck && pnpm build   # erwartet: alles grün, 343 Tests
python scripts/validate_handoff.py
pnpm --filter @isms/web dev                   # http://localhost:3000/login
```
