# WP-016 – Unabhängige Reviews, Gegenprüfung und Browser-QA

**Work Package:** WP-016 Mission Control „Heute" (read-only, **ohne** Morning Mission)
**Datum:** 2026-07-23
**Builder:** `frontend-engineer` (Slice 1, Slice 2, ein Fix-Pass) — **Builder ≠ Reviewer**
**Reviewer:** `code-reviewer` + `product-user-lead` (read-only)
**Commits:** `af350a0` (WP + Context Pack) · `6f27878` (Bau, siehe Hinweis unten) · `ebe3da9` (Fixes)

> **Hinweis zur Nachvollziehbarkeit:** Der Bau landete versehentlich im Docs-Commit `6f27878`
> (`git add -A` statt expliziter Pfade). Die History wurde **nicht** umgeschrieben, weil bereits
> gepusht; stattdessen trägt der Commit eine `git note`, die den tatsächlichen Inhalt benennt.

## Ablauf

| Runde | Reviewer | Urteil | Findings |
|---|---|---|---|
| 1 | Code | Freigabe mit Minor-Fixes | 1 major, 6 minor, 4 nit |
| 1 | Product-User-Lead | **Nacharbeit nötig** | 3 major, 7 minor, 3 nit |
| 2 | Code | **Freigabe** | 3 nit |
| 2 | Product-User-Lead | Freigabe mit Minor-Fixes | 1 minor, 2 nit |

17 Findings im Fix-Pass, die letzten vier vom Orchestrator direkt.

## Die wertvollsten Funde

**1. Ein echter Renderfehler, den kein Test sehen konnte.** In den Einstiegslisten standen zwei
benachbarte `<span class="sv-item-meta">`. Die Klasse ist inline (kein `display:block`), und JSX
entfernt den reinen Whitespace-Zeilenumbruch zwischen zwei Elementen — im Browser lief der Text
zusammen: *„…43 BeziehungenWessen digitalen Zwilling…"*, an 10 Stellen je Mandantenseite.
Beide Reviewer fanden es unabhängig; der Orchestrator hat es am CSS verifiziert.

**Der lehrreiche Teil:** Der naheliegende Regressionstest (`textContent` mit erwartetem Whitespace)
hätte den Fehler **nicht** gefunden — `textContent` fügt zwischen Elementen nie Whitespace ein,
auch nicht bei `display:block`. Genau deshalb war die bestehende Testschicht blind. Der Fix prüft
jetzt die **Struktur** („höchstens ein `.sv-item-meta` je `<li>`"), und die Browser-QA bestätigt die
tatsächliche Geometrie (Meta-Unterkante 1349 px, Note-Oberkante 1351 px → eigene Zeile).

**2. Die Seite versprach mehr, als sie hält — an zwei Stellen.** Der Question-Header stellt die
volle Leitfrage aus Dok. 06 §7 S01 („Was hat sich seit meinem letzten Besuch verändert **und was
verdient Aufmerksamkeit?**"), der Lead dementierte aber nur die erste Hälfte. Dazwischen steht
„22 von 31 Objekten ohne erfassten Owner" — genau das, was ein Leser als Antwort auf „was verdient
Aufmerksamkeit" missversteht. Ebenso stand die **Leitfrage der Erlebniswelt** ungerahmt da; sie
fragt je nach Welt nach Entscheidungen, Kurs oder Portfolio — alles Dinge, die diese Seite bewusst
nicht beantwortet. Beide sind jetzt gerahmt.

**3. Die aufgeladenste Zeile der Seite hatte keinen Entlastungssatz.** Beobachtung (a) endete
vorbildlich mit „Ob ein Owner fachlich erforderlich ist, sagt der Datenbestand nicht — hier steht
nur, ob einer erfasst ist." Bei (d) „Nachweisfähige Objekte ohne Nachweis-Beziehung" fehlte er —
und genau diese Zeile liest ein CISO oder Auditor unweigerlich als Compliance-Mangel statt als
Erfassungsstand. Ergänzt, ebenso bei (c).

## Weitere behobene Findings (Auswahl)

- **Funktionsversprechen vs. eigener Anspruch:** „Eine echte Rechtevergabe entsteht in einem eigenen
  Work Package" — genau die Zusageform, die der Ehrlichkeitsblock zwei Abschnitte weiter für sich
  ausschließt („kein Zeitplan"). Zudem internes Prozessvokabular im Produkt.
- **Rollenrahmung überzeichnet:** Die Seite behauptete, die Rolle „wählt die Sprache". Tatsächlich
  variiert nur die Abschnittsreihenfolge — der eigene Rollen-Gleichheitstest belegt, dass sonst kein
  Wort abweicht. Zurückgenommen, plus Klarstellung, dass die Reihenfolge **keine Rangfolge** ist.
- **Tote API mit tautologischem Test:** `emphasis` wurde von keinem Renderer konsumiert, und der
  Test prüfte `emphasis === sectionOrder[1]` — also genau die Definition. Entfernt.
- **Deutsche Grammatik:** „22 von 31 **Objekte**" → Dativ. Auf einer Seite, deren einziger Trumpf
  Klartext-Präzision ist, viermal je Mandant sichtbar.
- **Interne Findings-ID im UI:** „Das ist die bekannte Lücke O-WP014-03" stand im sichtbaren Text.
- **Sichtbare Typenliste hartkodiert:** „Control, Measure und Decision Record" war von
  `EVIDENCE_TARGET_TYPES` entkoppelt — Verstoß gegen AC 1. Wird jetzt daraus erzeugt.
- **`<time dateTime>` behauptete Präzision:** Eine Welle ist eine Kalendertags-Gruppe, das Attribut
  trug den Zeitstempel des zufällig ersten Datensatzes.
- **Wächtertest gegen Bewertung hatte Lücken:** „empfohlen" matchte weder `/empfehl/i` noch
  `/Empfehlung/i` (Partizip), und `data.test.ts` verglich case-sensitiv mit `includes`. Ergänzt.
  Die zwei **verneinenden** Produktsätze („Es wird nichts bewertet, gewichtet oder empfohlen") sind
  als **selbstprüfende** Ausnahme hinterlegt: ihr Fehlen lässt den Test fehlschlagen.
- **Route an einer von fünf Stellen:** `tenantDetailHref` war neu eingeführt, aber vier Call-Sites
  bauten `/twin/${id}` weiter selbst — und ohne `encodeURIComponent`. Alle fünf umgestellt.

## Bewusste Abweichungen (keine stille Auflösung)

- **AC 4 wird nicht wörtlich erfüllt:** Die Erfassungswellen werden **nicht** fachlich benannt
  („ISMS-Kerngraph" / „Managed-Service-Schicht"). Diese Namen sind Fakten der Seed-Quelldateien,
  nicht der Envelopes — und wären unscharf, weil die zweite Nordwerk-Welle Objekte **beider** Scopes
  trägt. Ausgewiesen werden stattdessen die belegten `scope_ids` → **O-WP016-07**, Product-Gate.
- **Morning Mission, Veränderungsfeed und Wiederaufnahme fehlen bewusst** — begründet im WP und im
  Produkt sichtbar → **O-WP016-02/-03/-04**.
- **AC 15 fordert Lint, es existiert kein Linter** → **FINDING-0005**, nicht stillschweigend
  abgehakt.

## Verifikation

| Prüfung | Ergebnis |
|---|---|
| `pnpm test --force` (ohne Cache) | **343 Tests grün** — api 2 · contracts 55 · demo-seed 38 · web **229** · db 19 |
| `pnpm --filter @isms/web run typecheck` | grün |
| `pnpm build --force` | grün, 57 Seiten statisch, `/heute` 10 kB / 200 kB First Load |
| Lint | **nicht möglich** — kein Linter im Stack (FINDING-0005) |

Web-Tests: 151 (nach WP-014) → 229.

## Browser-QA (Dev-Server)

| Weg | Ergebnis |
|---|---|
| `/heute`, Nordwerk + R02 | vier Abschnitte + Ehrlichkeitsblock; 19 Listeneinträge, **kein einziger** mit zwei Inline-Metazeilen; alle Notizen `display:block` |
| Geometrie des Renderfehlers | Meta-Unterkante 1349 px, Note-Oberkante 1351 px → eigene Zeile, kein Zusammenlaufen |
| Erfassungswellen | 15.01.2026 (17 Objekte / 15 Beziehungen) und 16.02.2026 (14 / 28), je mit belegten Scope-Kennungen |
| Beobachtungen | „22 von 31 Objekten…", „2 von 2 verschiedenen Scope-Kennungen…", „1 von 2 Objekten der Typen…" — je mit Ermittlungsregel und Entlastungssatz |
| Leerer Mandant (Finovia + R08) | ehrliche Leerhinweise; **keine** Nordwerk-Namen, **keine** Objekt-Links im DOM |
| Rollenwechsel R02 → R08 | Abschnittsreihenfolge ändert sich, Datenmenge nicht |
| Heading-Hierarchie | h1 → h2 (5×) → h3, keine Sprünge |
| Responsive 375 px | kein horizontaler Überlauf, kein überbreites Element |
| Konsole | keine Fehler |

**Nicht erbracht:** Screenshots — die Browser-Pane rendert in dieser Session keine Frames. Die
Abnahme erfolgte über berechnete Styles und Geometrie, was für den zentralen Befund (Zusammenlaufen)
sogar aussagekräftiger ist als ein Screenshot; eine rein ästhetische Abnahme steht aus.

## Offene Punkte für spätere Work Packages

1. **O-WP016-05 ist die entscheidende Nutzenfrage:** „22 von 31 Objekten ohne Owner" ist ohne einen
   Weg zu **diesen 22 Objekten** kaum verwertbar. Der heutige Link führt auf **alle** Objekte.
   Vorschlag: gefilterte Zwilling-Ansicht statt gekürzter Liste (eine gekürzte Liste wäre wieder
   implizite Priorisierung).
2. **Produktfrage an den Owner:** Diese Seite ist ehrlicherweise zu großen Teilen eine Aussage
   **über den Datenbestand**, nicht über die Sicherheitslage. Sie sagt das auch. Für die Demo-Story
   sollte bewusst entschieden sein, ob `/heute` bis WP-008 der Standard-Startpunkt bleibt.
3. Restredundanz Rollen-ID/Produktrolle zwischen Kontextzeile und Standort-Abschnitt; Helfer-Wächter
   deckt `OBJECT_ENTRY_RULE` nicht ab (Render-Ebene tut es). Beides ohne Nutzerschaden.

## Gesamturteil

**Freigegeben.** Acceptance Criteria 1–14 und 16 erfüllt; AC 4 mit dokumentierter Abweichung
(O-WP016-07), AC 15 teilweise (Lint unmöglich, FINDING-0005). Acht Konzeptlücken **benannt statt
gefüllt** (O-WP016-01…08). Keine Seed- oder Contract-Änderung, keine DB, keine Auth, kein Scoring —
und keine erfundene Morning Mission.
