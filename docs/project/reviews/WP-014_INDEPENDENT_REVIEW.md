# WP-014 – Unabhängige Reviews, Nachprüfungen und Browser-QA

**Work Package:** WP-014 Objekt-360-Detailseite (read-only)
**Datum:** 2026-07-22/23
**Builder:** `frontend-engineer` (Slice 1, Slice 2, zwei Fix-Pässe) — **Builder ≠ Reviewer**
**Reviewer:** `code-reviewer`, `product-user-lead`, `product-security-privacy` (alle read-only)
**Commits:** `43694fc` (Bau) · `62b1e11` (DR-0004 + offene Fragen) · `f50fca6` (Review-Fixes)

## Ablauf

Drei unabhängige Reviews auf den Bau, danach **zwei** Nachprüfungsrunden — die erste fand eine
Regression, die der Fix selbst erzeugt hatte, die zweite gab frei.

| Runde | Reviewer | Urteil | Findings |
|---|---|---|---|
| 1 | Code | Freigabe mit Minor-Fixes | 1 major, 4 minor, 3 nit |
| 1 | Product-User-Lead | **Nacharbeit nötig** | 4 major, 8 minor |
| 1 | Security/Privacy | Freigabe mit Minor-Fixes | 1 major, 3 minor |
| 2 | Code | alle Findings behoben | 4 neue (1 minor, 3 nit) |
| 2 | Product-User-Lead | teilweise behoben | **1 major (Regression)**, 5 weitere |
| 3 | Code | **Freigabe** | 4 nit/minor (WP-012-Bestand) |
| 3 | Product-User-Lead | **Freigabe mit Minor-Fixes** | 1 minor (falscher Verweis), 4 nit |

Insgesamt **18 + 10 Findings** umgesetzt, die letzten sechs vom Orchestrator direkt.

## Die drei wertvollsten Funde

**1. Der größte Fund des Projekts wäre rückgängig gemacht worden.** In WP-013 war beanstandet worden,
dass „Control · Status: wirksam" sich wie ein Prüfergebnis liest, obwohl es nur ein Lebenszyklus-Stand
ist. Die neue, **generische** Objektseite trug diese Formulierung wieder ungerahmt — und zwar für alle
41 Objekte statt nur im ISMS-Bereich. Behoben: „Lebenszyklus-Stand" statt „Status", plus seitenweite
Rahmung. Die Rahmung wurde in Runde 2 nochmals **präzisiert**, weil sie zu weit griff: der Status
einer *Beziehung* darf laut Dok. 07 §9 R15 sehr wohl ein Prüfstatus sein („Nachweisbezug mit Zeitraum
und Prüfstatus"). Eine Rahmung, die das leugnet, wäre selbst wieder unehrlich gewesen.

**2. Eine erfundene Erwartung auf 36 von 41 Seiten.** Der Bau zeigte „Kein Nachweis verweist auf dieses
Objekt" für *jedes* Objekt ohne `evidences`-Kante — auch für eine Organisation, eine Rolle, ein SLA.
Dok. 07 §9 R15 sieht dort gar keinen Nachweisbezug vor; der Satz behauptete also eine Lücke, die
fachlich keine ist. Behoben durch Einschränkung auf die nachweisfähigen Objekttypen. **Nebenwirkung
mit Wert:** dadurch wurde der bis dahin unerreichbare Empty-Zustand real erreichbar — ein Zweig, den
zwei Reviewer unabhängig als toten Code markiert hatten.

**3. Der Fix erzeugte einen Selbstwiderspruch — gefunden in der Nachprüfung.** Weil `covered_by` nur
in *ausgehender* Richtung ausgewertet wurde, stand auf allen fünf Managed-Service-Seiten „weder eine
Maßnahme noch ein Servicebezug erfasst", während derselbe Bildschirm darunter mehrere eingehende
„abgedeckt durch"-Kanten auflistete. Ohne die zweite Reviewrunde wäre das ins Produkt gegangen.

## Weitere behobene Findings (Auswahl)

- **Aussagerichtung umgekehrt:** Eingehende Kanten wurden in ausgehender Leserichtung gerendert —
  auf der Asset-Seite las sich „R09 · bedroht → Ransomware-Angriff", also *das Asset bedroht den
  Angriff*. Jetzt richtungstreu: „Ransomware-Angriff — R09 · bedroht → dieses Objekt".
- **Frage 2 hatte keine eigene Antwort:** Sie wiederholte die Klassifikation aus Frage 1 und eine
  Teilmenge der Kanten aus Frage 3 in identischer Detailtiefe. Jetzt verdichtet mit Verweis.
- **Überschrift widerlegte ihren Inhalt:** „Belegte Bezüge zu Risiken und Zielen" listete über
  `requires` (R19) einen Managed Service. Überschrift und Erläuterung decken jetzt die tatsächlich
  gefilterte Typmenge ab.
- **Tenant-Isolation im Routing war ungetestet:** Belegt war nur der Helfer. Genau `generateMetadata`
  ist aber die Leak-Oberfläche. Neuer Routentest prüft identischen Titel und identischen 404-Pfad für
  mandantenfremde und unbekannte ID sowie die Mandantentreue von `generateStaticParams`.
- **Latenter Datumsfehler:** `formatIsoDateDe` rechnete über UTC und hätte einen Zeitstempel mit
  Offset um einen Tag verschoben — auf genau der Achse, die dieses WP sichtbar machen soll.
- **Sprachkonsistenz:** Dieselben Seed-Felder hießen einen Klick entfernt anders. ISMS-, Services- und
  Objektansicht sagen jetzt einheitlich „Lebenszyklus-Stand" und „Status der Beziehung".

## Bewusste Abweichungen (keine stille Auflösung)

- **404-Rücklink zeigt auf `/twin`,** nicht auf die Mandantenseite wie im WP-Text. Begründung und
  Security-Argument: **DR-0004**.
- **Objektseite bleibt parameter-gebunden** und erzwingt nicht Routen-Mandant == Session-Mandant:
  DR-0004, offene Frage **O-WP014-04**.
- **Elf Objekttypen bleiben roh englisch** („Control", „Threat", „Requirement" …): es existiert keine
  freigegebene deutsche Bezeichnung, und Übersetzungen zu erfinden ist verboten → **O-WP014-11**.
- **Beispielspalte von Dok. 07 §9 als Einschränkung genutzt**, während WP-012 sie als nicht
  abschließend behandelt hatte — methodische Inkonsistenz, dokumentiert als **O-WP014-10**.

## Verifikation

| Prüfung | Ergebnis |
|---|---|
| `pnpm test --force` (ohne Cache) | **265 Tests grün** — api 2 · contracts 55 · demo-seed 38 · web **151** · db 19 |
| `pnpm --filter @isms/web run typecheck` | grün |
| `pnpm build --force` | grün, 57 Seiten statisch, davon 41 Objektseiten (SSG) |
| `python scripts/validate_handoff.py` | 4/4 OK |

Web-Tests: 77 (vor WP-014) → 151.

## Browser-QA (Dev-Server, DOM-basiert)

| Weg | Ergebnis |
|---|---|
| Control-Seite (`nordwerk-ctrl-backup-recovery`) | alle fünf Abschnitte belegt; 14 Objektlinks, **kein einziger** auf einen fremden Mandanten |
| Eingehende Kanten (Asset-Seite) | richtungstreu: „Ransomware-Angriff — R09 · bedroht → dieses Objekt" |
| Managed-Service-Seite | zeigt drei Deckungsbezüge statt „kein Servicebezug" — Selbstwiderspruch weg |
| Organisationsseite | „Kein Nachweis…" erscheint **nicht**; ehrlicher, evidenzgebundener Leerzustand |
| Klick-Navigation Prozess → Asset | funktioniert, Mandant bleibt konstant |
| `tenant-finovia` + gültige Nordwerk-ID | **HTTP 404**, Antwort nach Normalisierung der angefragten ID **inhaltsgleich** zur unbekannten ID (Restdifferenz: nur Next-Dev-Cache-Timestamps); keine fremden Namen im DOM |
| Unbekannte ID | HTTP 404, identische Seite, Titel „Objekt nicht gefunden" |
| Heading-Hierarchie | h1 → h2 (fünf Fragen) → h3, keine Sprünge |
| Responsive 375 px | kein horizontaler Überlauf, kein überbreites Element |
| Konsole | keine Fehler |

**Nicht erbracht:** Screenshots — die Browser-Pane rendert in dieser Session keine Frames
(`screenshot timed out`). Die Abnahme erfolgte DOM- und textbasiert, was für die geprüften Aussagen
trägt; eine rein visuelle Abnahme (Layout/Kontrast der neuen Abschnitte) steht aus.

## Offene Punkte für spätere Work Packages

1. **31 von 41 Objektseiten** haben ein leeres „Was als Nächstes?". Alle Leersätze sind sachlich
   richtig, wirken in dieser Menge aber wie ein Standardtext → Produktentscheidung, ob der Abschnitt
   für solche Typen überhaupt erscheinen soll.
2. **`/services` trägt keinen seitenweiten Rahmungssatz** (anders als `/isms` und die Objektseite).
   WP-012-Bestand; die Feldbeschriftungen wurden bereits angeglichen.
3. **Client-Bundle** enthält weiterhin den vollständigen `DEMO_SEED` aller Mandanten → **O-WP014-09**,
   spätestens mit der DB→UI-Anbindung zusammen mit FINDING-0004 zu lösen.

## Gesamturteil

**Freigegeben.** Acceptance Criteria 1–12 erfüllt; Abweichung bei AC 9 (404-Rücklink) dokumentiert in
DR-0004. Zehn Konzeptlücken wurden **benannt statt gefüllt** (O-WP014-01…11). Keine Seed- oder
Contract-Änderung, keine DB, keine Auth, kein Scoring.
