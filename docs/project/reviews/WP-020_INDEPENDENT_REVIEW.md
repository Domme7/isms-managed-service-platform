# WP-020 – Unabhängige Reviews (Verdichtung, Dashboard, Einstiegsfluss, Rollenvarianten)

**Abgeschlossen:** 2026-07-23 · **Modus:** Produktkorrektur-Sprint (DR-0010) ·
**Endstand:** web 450 Tests grün, lint + typecheck grün, axe sauber (nur Objekt-360-Altbestand),
`packages/*` unverändert. Commits: `88971c5` (Zuschnitt) · `7971bc6` (Slice 1) ·
`ca9a7bb` (CCP-004) · `c45f581` (Slice 3+4) · `03b092c` (Slice 2) · `91a9270` (Slice 5) ·
`a4d5bf1` (qa:visual) · `4a195a9` (Fix-Pass 1) · `3de7074` (FINDING-0009 geschlossen) ·
`3df1224` (Fix-Pass 2).

## Gates (risikobasiert, Dok. 20B §36 / FINDING-0006)

| Gate | Rolle | Runde 1 | Runde 2 |
|---|---|---|---|
| Code Quality | `code-reviewer` | Freigabe mit Auflagen (F1 Drilldown ins Leere u. a.) | Restfindings behoben, keine Regression |
| Product | `product-user-lead` | Freigabe mit Auflagen (F1 „ohne Ampeln", F2 Screenshots ohne Dashboard, F3 Entschuldigungs-Wand) | Restauflage N1 (fix-induziert) |
| Domain | `isms-domain-lead` | Freigabe mit Auflagen (2 falsche Absenz-/Beleg-Behauptungen) | **Neue Fehlbehauptung** (mandantenblinder Review-Satz) |
| QA | `qa-test-engineer` | Freigabe mit Auflagen (FINDING-0008, Meta-Assertion) | Restauflagen (2 Regressionstests), keine Regel-Abschwächung |
| Security & Privacy | `product-security-privacy` | Sicher für Demo-Scope mit Auflage A1 | A1 erfüllt, **FINDING-0009 geschlossen**, keine neue Leak-Fläche |
| Konzepttreue | `concept-consistency-reviewer` | Treu mit Auflagen (CCP-004-Matrix, Register) | (Doku-Auflagen in Fix-Pass 1 erledigt) |

Builder ≠ Reviewer; kein Finding vom Builder selbst geschlossen (§31.3). Zweite Runde nach dem
Fix-Pass — **hat wie bei jedem bisherigen WP eine vom Fix erzeugte Regression gefunden**
(diesmal die mandantenblinde Review-Existenzaussage). Nach dem Fable-5-Limit des Builders hat der
Orchestrator (Opus) den Fix-Pass zu Ende gebracht und die Test-Anpassungen selbst gemacht —
die zweite QA-Runde hat ausdrücklich bestätigt, dass **keine** davon eine Regel abgeschwächt hat.

## Die wertvollsten Funde (für die nächste Session)

1. **Falsche Absenz ist so schädlich wie Erfindung.** Der ursprüngliche F1-Fix ersetzte eine
   falsche „kein Review erfasst"-Behauptung durch eine — statische — „trägt einen Review"-Behauptung,
   die für den Consulting Operator (ohne Review) wieder falsch war. Die zweite Domain-Runde fing das.
   Lehre: mandantenspezifische Existenzaussagen **immer** aus dem Bestand des aktiven Mandanten
   ableiten (`hatReview`), nie statisch an eine Variante hängen. Regressionstest: `rollenvarianten.test.ts`.
2. **`/isms`-Drilldown ins Leere.** Die Lebenszyklus-Kachel verlinkte statisch auf die
   `/isms`-Verteilung, die es für Mandanten ohne ISMS-Kernobjekte nicht gibt — toter Link auf den
   Leerzustand. Behoben (mandantenabhängig), Regressionstest ergänzt (der alte Bug wäre grün geblieben).
3. **Vierte Instanz der Leerzustands-Leak-Klasse.** `TenantDetailView` nannte fremde Mandanten
   **und verlinkte** auf deren Detailseiten. Im Fix-Pass behoben; der Leerzustands-Wächter hat jetzt
   eine **Meta-Assertion gegen die `live:true`-Orte** (ein neuer Ort macht ihn rot) plus
   Zähl-Formulierungs-Muster mit Fixture-Negativbeweis. FINDING-0009 damit mechanisch gegen
   Wiederkehr gesichert und geschlossen.
4. **„ohne Ampeln" neben Ampel-Badges.** Ein Relikt der Vor-DR-0008-Auslegung: `/isms` beschrieb
   sich als ampelfrei, während es Badges rendert. Selbstwiderspruch behoben.
5. **Screenshots zeigten die Dashboard-Schicht nicht.** Die erste qa:visual-Runde bildete nur
   Seitenköpfe ab — das Kern-Deliverable war unsichtbar. Zusatzmotive (`heute-dashboard-*`,
   `isms-verdichtung`, `heute-rollenfokus`, `heute-leerer-mandant`) ergänzt, damit der Owner am
   Varianten-Stopp fundiert entscheiden kann.
6. **Der Wächter fing eine Prozesskennung.** „CCP-004" landete versehentlich im sichtbaren
   Trägertext — der Prozessvokabular-Wächter machte es rot. Belegt, dass der Wächter greift.

## Bewusst offen / benannt (nicht Alleingang)

- **O-WP020-19 / CCP-004:** „Wirkung → teilweise" stützt sich auf `effectiveness_assumption`
  (nicht PDF-gedeckt, Human Gate offen). Domain bejaht (Trust-Layer-Konsistenz), QA/Code sehen es
  owner-gate-abhängig — **im Produkt mit Vorbehalt sichtbar, bei CCP-004-„entfernen" rückabzuwickeln.**
- **FINDING-0008:** Rest = 1 serious `dlitem` auf Objekt-360 (WP-014-Altbestand), bewusst
  Folge-WP (Product Gate). Alle sieben umgebauten Seiten sind saniert.
- **O-WP020-01..18** in `docs/project/OPEN_QUESTIONS.md` (Detailtiefe-Granularität, Rollenvarianten
  nur 4/12 normiert, Trust-Layer-Träger, Suche/Snippet-Schutz als Folge-WP-Anker u. a.).
- **Product N2–N4** (Badge-Farbe, Kachel-Dichte, Meta-Text im Rollenfokus) sind ausdrücklich
  **Owner-Stellschrauben am Varianten-Stopp**, keine Auflagen.

## Verbleib der 11 WP-019-Übergabepunkte

in-scope erledigt: 1, 2, 4, 5, 7, 9 · teilweise (O-WP020-04-Anker): 3 · nur CCP-004: 8 ·
deferred benannt: 6 (WP-027 Suche), 10 (WP-026 Dok.-04-Vokabular) · erledigt: 11.
