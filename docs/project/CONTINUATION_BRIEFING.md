# Continuation Briefing – autonomer Weiterbau

**Zweck:** Betriebsanleitung für eine neue Session, die möglichst lange **ohne Rückfragen** weiterbaut.
Diese Datei ist die Arbeitsweise; **Produktwahrheit** bleibt `docs/concept/active/` (24 Dokumente),
**Statuswahrheit** bleibt `CURRENT_STATE.md`, `ACTIVE_WORK_PACKAGE.md`, `WORK_QUEUE.md`, `handovers/LATEST.md`.

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
| **Nächstes** | **WP-014 Objekt-360-Detailseite** (Entwurf + Context Pack liegen bereit) |

Testlage: **191 Tests grün** (api 2 · contracts 55 · demo-seed 38 · web 77 · db 19). CI grün.

---

## 2. Arbeitszyklus je Work Package (verbindlich)

1. **Planen** – WP + Context Pack existiert (oder per `program-manager` erstellen lassen), aktiv setzen,
   Micro-Checkpoint, **committen + pushen**.
2. **Bauen** – an einen Fach-Agenten delegieren (`frontend-engineer`, `backend-engineer`,
   `data-graph-analytics`). Der Builder **committet nie selbst**.
3. **Prüfen** – **zwei unabhängige Reviews** (`code-reviewer` + `product-user-lead` bzw.
   `concept-consistency-reviewer`, bei Sicherheitsthemen `product-security-privacy`). Builder ≠ Reviewer.
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
  (Bisher so entstanden: O-D07-01…11, O-WP012-01…06, O-WP013-01.)
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

## 6. Berichtsformat (der Owner steuert damit)

Nach jedem Meilenstein ein **kurzer** Report mit Balken:

```
Gesamtprodukt:  ███████░░░░░░░░░░░░░░  ~34 %
```
plus Phasentabelle (0–9), was fertig wurde, was als Nächstes läuft, und offene Owner-Entscheidungen.
Keine Wall-of-Text; der Owner nutzt die Balken zum strategischen Steuern.

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

---

## 8. Roadmap nach WP-014

Reihenfolge ist Vorschlag, der Orchestrator darf verfeinern (Vision nie verkleinern):

1. **WP-014** Objekt-360-Detailseite → macht den Graphen durchgängig klickbar *(Entwurf bereit)*
2. **Heute/Morning Mission** für die Kundenrolle (Dok. 10) — erst read-only, ohne Scoring
3. **Executive-Welt** (Dok. 06/10): wenige verdichtete Entscheidungen
4. **API-Schicht + DB→UI** (NestJS) — **erst nach FINDING-0004 (RLS)**
5. **Reporting/Presentation-as-Code** (Dok. 12)
6. **Integrationen/Workflow** (Dok. 17), **KI-Guardrails** (Dok. 20A) — späte Phasen

**Realistische Erwartung:** Das Gesamtprodukt (9 Phasen, 33 Module) ist ein Marathon über viele
Sessions. Eine Session baut typischerweise 1–3 Work Packages. Wenn der Kontext voll wird:
Stand sichern, `LATEST.md` erneuern, Übergabe-Prompt ausgeben — **nicht** mitten im WP abbrechen.

---

## 9. Startkommandos

```bash
pnpm install
pnpm test && pnpm typecheck && pnpm build     # erwartet: alles grün, 191 Tests
python scripts/validate_handoff.py
pnpm --filter @isms/web dev                   # http://localhost:3000/login
```
