# WP-006 – Kundenwelt Stufe 1: sichtbarer Kundenpfad read-only aus Dok. 14/16 (DR-0009/DR-0010)

## Identität

- **Phase:** 1/2 (Demo Foundation, Produktoberfläche; kein Persistenz-/Auth-Bau)
- **Priorität:** P1 — **Bestandteil des Produktkorrektur-Sprints** (DR-0010 Nr. 2: „Stufe 1
  wird read-only aus den PDFs Dok. 14/16 auf dem heutigen Seed gebaut; fehlende Träger
  werden sichtbar benannt statt erfunden"). Sprint-Position: **nach WP-020 Slice 5, vor den
  Cockpit-Varianten und dem STOPP** (`docs/project/ACTIVE_WORK_PACKAGE.md`,
  „Sprint-Reihenfolge", Punkt 5).
- **Status:** Draft (Aktivierung durch Orchestrator nach Abschluss WP-020 Slice 5)
- **Risk Class:** **Medium** — read-only und synthetisch, aber: (a) die Kundenwelt arbeitet
  direkt an der **Kundensphäre als sichtbarer Mandanten- und Sphärengrenze** (Dok. 03,
  Abschnitt „Zugriff, Datenschutz und Vertrauensgrenzen"; Lehre aus FINDING-0009 — dritte
  Instanz der Leerzustands-Leak-Klasse kam aus genau so einem neuen Ort), (b) neue Seiten
  unter bestehenden `live: true`-Orten müssen alle vier Wächter erfüllen, (c) der
  Servicekatalog berührt die Preis-Guardrail-Grenze (O-KUNDE-01).
- **Builder:** `frontend-engineer` (derselbe wie WP-020; sequenziell, **committet nie
  selbst** — der Orchestrator committet je Slice). Ein Modul (`apps/web`), kein Parallelbau.
- **Reviewer/Gates (Dok. 20B §36 / FINDING-0006):**
  - **Code Quality:** `code-reviewer` (immer),
  - **Product:** `product-user-lead` (neuer Kernpfad des Produkts),
  - **Domain:** `isms-domain-lead` (Servicefamilien/-tiefen, Onboarding-Fachstrukturen,
    Scope-/Zielprofil-Semantik),
  - **QA:** `qa-test-engineer` (Wächter-Erweiterungen, Negativbeweise, Registerpflege),
  - **Security & Privacy:** `product-security-privacy` — **Pflicht**: Kundensphäre =
    Sicherheitsthema; Urteil zu Mandanten- und Sphärengrenze der neuen Seiten explizit,
  - **Konzepttreue:** `concept-consistency-reviewer` — **jedes Dok.-14/16-Zitat wird am PDF
    geprüft** (Regel Null + DR-0010 Nr. 5: die Markdown-Fassungen 14/16 sind seit WP-023
    quellentreu und als Zweitquelle zulässig, Belege trotzdem am PDF/Extrakt),
  - Builder ≠ Reviewer; **zweite Runde derselben Reviewer nach dem Fix-Pass** (hat bisher
    jedes Mal eine vom Fix erzeugte Regression gefunden).
- **Human Gates:**
  - **Keine neue Freigabe nötig zum Start** — DR-0009 (Entscheidung 2) und DR-0010 (Nr. 2)
    sind die Owner-Freigaben für genau diesen Zuschnitt.
  - **Owner sieht die Kundenwelt am Varianten-Stopp** (DR-0010 Nr. 3): `pnpm qa:visual WP-006`
    liefert die Screenshots für die visuelle Owner-Freigabe des Sprints.
  - **Die Preis-Guardrail-Umstellung (O-KUNDE-01) ist ausdrücklich NICHT Teil dieses WP** —
    sie braucht Owner + Security und gehört zum WP-021-/Stufe-2-Schnitt. Stufe 1 bleibt
    vollständig preisfrei.
- **Abhängigkeiten:** WP-020 Slices 1–4 ✓ (Kontextleiste/Mandantenwechsel-Schutz `7971bc6`;
  Dashboard/Detailtiefe/Seitenbausteine-Konvention `c45f581`); **WP-020 Slice 2 (neutrale
  Session, Rollenwahl in der Topbar) wird als abgeschlossen angenommen** — ist das beim
  Aktivieren nicht der Fall: Stop Condition. WP-023 ✓ (Dok. 14/16 quellentreu — die
  DR-0010-Bauregel Nr. 5 ist damit erfüllbar). DR-0009, DR-0010, DR-0008 (Ehrlichkeitsgrenze
  gilt fort), DR-0006/Regel Null, DR-0005.

## Ziel

Der Kunde bekommt seinen sichtbaren Pfad — read-only auf dem heutigen Seed, drei Kernstücke
(DR-0009, Entscheidung 2, Umsetzungspfad Punkt 1):

1. **Kunden-Startseite „verwalten":** eigene Scopes, Ziele, Services und Nachweise an einem
   Ort, aus der Perspektive der Kundenrollen (R01–R06, Sphäre „Kunde") — die Stufe-1-Näherung
   an den Customer Workspace (Dok. 06, Screenkatalog **S02 „Customer Workspace"** und
   Abschnitt **„Customer Workspace"**).
2. **Servicekatalog ansehen:** Servicefamilien und vollständiger Katalog, Service-Tiefen und
   Paketarchitektur (Dok. 14, Abschnitte **„Servicefamilien und vollständiger Katalog"**,
   **„Service-Tiefen statt starrer Goldpakete"**, **„Paketarchitektur"**) — ansehen, nicht
   buchen, ohne jede Preisangabe.
3. **Onboarding/Zielprofil als Struktur-Assistent:** geführte Read-Ansicht der
   Dok.-16-Strukturen (Lifecycle-Phasen, Onboarding Charter, Firmenanlage-Mindeststruktur,
   Identität/Rollen/Zugriff, Scope Discovery, Strategie-DNA, Zielprofile) — **erklärte
   Struktur, kein Formular, keine Speicherung**. Konzeptanker: Dok. 03, Abschnitt
   „Anfängererlebnis" („Neue Nutzer sehen keine leere Plattform, sondern realistische
   Startdaten, geführte Aufgaben oder eine klare Einladung").

**Fehlende Träger werden sichtbar benannt statt erfunden** (DR-0010 Nr. 2): Demo-Accounts
(Dok. 03, Abschnitt „Verbindliche Demo-Accounts" → WP-021), Preise (Dok. 14, Abschnitt
„Preisverfassung und Preisformel" → O-KUNDE-01), echter Login (O-KUNDE-02), Buchung (Stufe 2,
Dok. 04 J05), nicht materialisierte Objekttypen (Strategie-DNA, Target Profile, ISMS-Scope).

## Nicht-Ziele

- **Keine Preise, keine Währungsangabe, kein Preisband** — der Seed-/Produkt-Guardrail bleibt
  streng (O-KUNDE-01). Wo die Dok.-14-Struktur Preisbestandteile vorsieht (Angebotskarte
  Frage 8 „Wie wird der Preis gebildet?"; Paketbestandteil „eine illustrative
  Preisbandbreite"; Abschnitte „Preisverfassung und Preisformel", „Illustrative
  Managed-Service-Pakete", „Illustrative Einzelservice-Bänder"), erscheint eine **benannte
  Lücke mit Grund**, nie eine Zahl.
- **Keine Buchung, kein Konfigurator, keine Serviceempfehlung, keine Opportunity Card** —
  Buchung ist Stufe 2 mit Human Gate (DR-0009 Umsetzungspfad Punkt 2; Dok. 04 J05; Dok. 16
  16-AC09/16-D12 „keine automatische Buchung"; Dok. 14, Abschnitt „Preis- und Angebots-UX",
  „Verbot der automatischen Buchung").
- **Kein echter Login, keine Konten, keine Demo-Accounts** — Anmeldung bleibt beschriftete
  Simulation (O-KUNDE-02); die neun Demo-Accounts kommen mit WP-021 und werden als Lücke
  benannt.
- **Kein Contract-/Seed-/DB-Umbau** — `packages/contracts`, `packages/demo-seed`,
  `packages/db` bleiben unverändert. Katalog- und Onboarding-Strukturen aus den PDFs leben
  als quellenbelegte, react-freie Code-Konstanten in `apps/web/lib/` (etabliertes Muster
  `roles.ts`/`seitenbausteine.ts`).
- **Keine neuen Bewertungen** (DR-0008-Grenze): kein Reifegrad, kein Zielstatus, kein Trend,
  kein Puls, kein „Hebel mit größter Wirkung" — die Dok.-06-§-„Customer Workspace"-Inhalte
  ohne Datenträger werden benannt, nicht simuliert.
- **Kein neuer Hauptnavigations-Ort** — 06-D01 fixiert die acht Orte; die Kundenwelt lebt
  unter dem bestehenden Ort **„Kunden"** (Dok. 06, Abschnitt „Acht stabile Hauptorte":
  „Kunden — Portfolio und Customer Workspaces — Für Kundenrollen ggf. direkt der eigene
  Workspace").
- **Keine rollenspezifischen Onboarding-Sichten** (Dok. 16, Abschnitt „Onboarding Workspace
  und rollenbezogene Sichten") und **keine Lens-Umschaltung** (Dok. 06, Abschnitt „Customer
  Workspace": Executive/ISMS/Consulting Lens) — spätere Stufe, als Lücke benannt.
- **Keine Authz:** Rollen bleiben Perspektive, keine Rechte (`roles.ts`-Grundsatz). Die
  Kundensphäre wird auf den **neuen Seiten** strikt eingehalten; ihre **technische
  Erzwingung** produktweit ist Dok.-19-/Auth-Territorium (O-WP006-04).

## Scope

### Slice 1 – Kunden-Startseite „verwalten" (Customer Workspace Stufe 1, mandantenlokal)

Quellen (Regel Null): Dok. 06, Abschnitt „Acht stabile Hauptorte" (Zeile „Kunden") und
Abschnitt „Customer Workspace" (S02-Leitfrage „Wie verstehe ich diesen Kunden in einer
Minute?"; Inhalte: Strategie-DNA, Zielprofil, Managed-Service-Anteil, Trend, Puls,
Ursache-Wirkungs-Ketten, Hebel, Servicebeitrag, Zeitachse); 06-D02; Dok. 03, Abschnitte
„Kanonisches Rollenmodell" (R01–R06, Sphäre „Kunde"), „Zugriff, Datenschutz und
Vertrauensgrenzen" (Scope-basiert, Need-to-know) und „Anfängererlebnis"; Dok. 16, Abschnitte
„Scope Discovery und Scope Governance" und „Zielprofile" (was „verwalten" fachlich umfasst).

Umsetzung:

- **Neue Kunden-Startseite unter dem Ort „Kunden"** (Routenvorschlag `/kunden` — das
  `match`-Präfix existiert bereits in `places.ts`; endgültige Route Builder-Entscheidung,
  im Code begründet). Kein neuer Nav-Ort.
- Inhalt **ausschließlich aus dem aktiven Mandanten**, aus Kundenrollen-Perspektive
  gerahmt: **Scopes** (belegte `scope_ids` als rohe Kennungen — O-WP014-03 sichtbar
  referenzieren), **Ziele** (belegte `Objective`/`KPI`-Objekte), **Services** (Managed
  Services des Mandanten samt SLA/Deliverables — bestehende mandantenlokale Ableitungen aus
  `lib/services/data.ts` wiederverwenden), **Nachweise** (`Evidence`-Objekte mit
  Lebenszyklus-Stand, 08-D07-Glosse), Verweise auf `/entscheidungen` und Objekt-360.
- **Dok.-06-Inhalte ohne Träger benennen statt attrappieren** (WP-016-Muster): Strategie-DNA,
  Zielprofil, Managed-Service-Anteil, Trend, Puls, Hebel, Zeitachse haben im heutigen
  Datenbestand keinen Träger — ein Block benennt das ehrlich (Contract kennt die Typen
  `Strategie-DNA` (F01) und `Target Profile` (F09), der Seed materialisiert sie nicht →
  WP-021-Verweis).
- **Leere Mandanten (Finovia/MediCore):** ehrliche, mandantenlokale **Einladung** statt
  leerer Plattform (Dok. 03, Abschnitt „Anfängererlebnis") — mit Einstieg in Struktur-
  Assistent (Slice 3) und Katalog (Slice 2); **keine Existenzaussage über fremde Mandanten**
  (FINDING-0009-Lehre, Wächter-Muster `leerzustand-mandantengrenze`).
- **Kundensphäre:** Die Seite rendert und verlinkt ausschließlich mandantenlokale Ziele;
  keine Portfolio-Aggregation, keine Betreiber-Inhalte (Auslastung, Profitabilität,
  Mandantenvergleich — laut Dok. 03 Steckbrief „Managed Service Lead" Betreiber-Sphäre).
- **Neutral-Fähigkeit:** funktioniert ohne Rollenwahl (WP-020-Slice-2-Session); die
  Kundenrollen-Rahmung ist Betonung, keine Bedingung. Für Kundenrollen wird die Startseite
  prominent erreichbar (sichtbarer Einstieg von `/heute`), **kein erzwungener Redirect** —
  Teil-Auflösung von O-WP020-08/06-D02, Rest → O-WP006-03.

### Slice 2 – Servicekatalog ansehen (Dok. 14 §5–§7, vollständig preisfrei)

Quellen (Regel Null): Dok. 14, Abschnitte „Servicefamilien und vollständiger Katalog"
(Katalogübersicht SF01–SF12; Kanonische Service Offers SO01–SO15; „Angebotskarte je Service"
mit zehn Fragen), „Service-Tiefen statt starrer Goldpakete" (L1 Guide, L2 Co-Manage,
L3 Operate, L4 Embedded Office; „Nicht jedes Service Offer unterstützt alle Tiefen"),
„Paketarchitektur" (Paketprinzip; Tabelle „Empfohlene Paketfamilien"; Paketmodularität),
„Kommerzielle Verfassung" (CP11 interne Alternative sichtbar; „Was ausdrücklich vermieden
wird"); Steuerungsfeld „Preisstatus" + D14-11 (alle Preisbänder sind synthetische
Designannahmen — hier: gar nicht übernommen).

Umsetzung:

- **Katalogstrukturen als react-freie, quellenbelegte Code-Konstanten** in `apps/web/lib/`
  (Muster `roles.ts`/`seitenbausteine.ts`: wörtliche Übernahme der PDF-Tabellen mit
  Quellkommentar; kein Seed-Objekt, kein Contract-Typ — die Objekttypen Service Offer/
  Service Family/Package existieren im Objektvertrag nicht, O-WP006-02/vgl. O-WP012-01).
- **Katalogansicht** unter dem Ort „Services" (dessen Inhaltsbeschreibung „Katalog, aktive
  Services, …" den Katalog nennt) oder als eigene Unterroute — Builder-Entscheidung; von der
  Kunden-Startseite und von `/services` aus verlinkt.
- **Zwei Herkünfte, sichtbar getrennt, kein erfundenes Mapping:** (a) „Katalogstruktur aus
  dem Konzept" (SF/SO/Tiefen/Pakete) und (b) „aktive Services dieses Mandanten aus dem
  Datenbestand" (Seed-Service-Instanzen). Die Seed-Services tragen **keinen** Offer-Bezug —
  es wird keine Zuordnung Instanz↔Offer behauptet.
- **Preisfreiheit:** kein Währungszeichen, kein Betrag, kein Band im gerenderten Text. Wo
  die Quellstruktur Preisbestandteile vorsieht (Angebotskarte Frage 8; Paketbestandteil
  „illustrative Preisbandbreite"), steht eine benannte Lücke mit O-KUNDE-01-Verweis.
- **Ansehen, nicht buchen:** sichtbare Beschriftung, dass Buchung/Aktivierung erst in
  Stufe 2 nach menschlicher Freigabe kommt (Dok. 04 J05; Dok. 16 16-AC09); kein
  Buchungs-CTA, keine Empfehlung, kein „Verkaufsfallen"-Muster (Dok. 14 „Was ausdrücklich
  vermieden wird"; Dok. 16 „Kein Dark Pattern").

### Slice 3 – Onboarding/Zielprofil als Struktur-Assistent (Dok. 16, geführt, read-only)

Quellen (Regel Null): Dok. 16, Abschnitte „Lifecycle-Modell" (Tabelle „Kanonische Phasen"
0–10), „Qualification und Onboarding Charter" (zehn Mindestfragen; Charter-Mindestinhalte),
„Firmenanlage und Organisationsfundament" (Anlagewege; Mindeststruktur; Strukturtiefe/
Übermodellierungs-Warnung), „Identität, Rollen und Zugriff" (Rollen-Mapping auf die
Dok.-03-Produktrollen; Zugriffsprinzipien), „Scope Discovery und Scope Governance"
(Scope-Dimensionen; Pflichtangaben je Ausschluss), „Strategie-DNA" (Tabelle
„Pflichtdimensionen", zwölf Dimensionen), „Zielprofile" (neun Zielprofiltypen;
„Zielprofil-Vertrag"), „Guided UX und Einstiegspfade" (Guided Quickstart als Rahmung der
Führung); Verfassungsprinzipien OL01 (Ziel vor Vollständigkeit), OL04 (jede Annahme bleibt
sichtbar), OL06 (Datenminimierung), OL07 (menschliche Freigabe); 16-D01/16-D02/16-D05/16-D07.

Umsetzung:

- **Geführte Read-Ansicht** („Struktur-Assistent"), erreichbar aus der Kunden-Startseite
  (insbesondere aus dem Leerzustand): erklärt Schritt für Schritt, **welche Strukturen ein
  Kunde beim Aufbau anlegt und entscheidet** — Phasenweg → Qualification/Charter →
  Firmenanlage-Mindeststruktur → Rollen/Zugriff → Scope mit Ein-/Ausschlüssen →
  Strategie-DNA → Zielprofil. Die PDF-Tabellen und -Listen werden struktur- und worttreu
  gezeigt (Code-Konstanten wie in Slice 2).
- **Kein Formular, keine Eingabe, keine Speicherung, keine Fortschrittsmessung** — sichtbare
  Beschriftung als „erklärte Struktur aus dem Konzept, keine Erfassung". Menschliche
  Freigabepflichten (16-D07) werden als Strukturinhalt **gezeigt**, nicht simuliert.
- **Rollen-Mapping-Anker:** der Abschnitt Identität/Rollen/Zugriff verweist auf die zwölf
  kanonischen Produktrollen aus `roles.ts` (Dok. 16: „werden … auf die kanonischen
  Produktrollen aus Dokument 03 gemappt") — vorhandene Datenbasis, nichts Neues.
- **Materialisierungs-Lücken benennen:** ISMS-Scope, Ausschluss, Strategie-DNA, Target
  Profile sind kanonische Objekttypen (F01/F09), im Seed aber nicht materialisiert; der
  Assistent sagt das ehrlich (WP-021-Verweis), statt leere Objekte oder Beispiele zu
  erfinden.

## Acceptance Criteria

Jedes Kriterium nennt Kommando und erwartetes Ergebnis.
Testkommando, sofern nicht anders genannt: `pnpm --filter @isms/web exec vitest run` (frisch,
ohne Turbo-Cache) → grün.

**Slice 1 – Kunden-Startseite**

1. **Startseite existiert und ist mandantenlokal:** Unter dem Ort „Kunden" rendert die neue
   Startseite für Nordwerk Scopes (rohe `scope_ids` mit benannter O-WP014-03-Lücke), Ziele
   (Objective/KPI), Services (mit SLA/Deliverables) und Nachweise — ausschließlich Objekte
   mit `tenant_id` des aktiven Mandanten; per Test belegt.
2. **Kundensphäre-Negativbeweis:** Der gerenderte Text der Startseite (voller UND leerer
   Mandant) enthält keine Namen, IDs oder Zählungen anderer Mandanten und keine
   Betreiber-Portfolio-Inhalte (keine mandantenübergreifende Aggregation, keine
   Auslastungs-/Profitabilitäts-Begriffe); Muster `leerzustand-mandantengrenze`/FINDING-0009;
   per Test je Mandant belegt.
3. **Leerzustand als Einladung:** Finovia/MediCore zeigen die mandantenlokale Einladung mit
   Einstieg in Struktur-Assistent und Katalog; kein leerer Platzhalter, keine
   Fremdmandanten-Existenzaussage; per Test belegt.
4. **Fehlende Dok.-06-Inhalte benannt:** Strategie-DNA, Zielprofil, Managed-Service-Anteil,
   Trend/Puls/Hebel/Zeitachse erscheinen als benannte Lücken (Text vorhanden, kein
   erfundener Wert, kein Bewertungsvokabular); per Test belegt.
5. **Neutral-Fähigkeit:** Ohne gewählte Rolle rendert die Startseite vollständig; mit
   Kundenrolle (z. B. R03) erscheint die Kundenrollen-Rahmung; kein Redirect-Zwang; per
   Test belegt.

**Slice 2 – Servicekatalog**

6. **Katalog vollständig und quellentreu:** Die Ansicht zeigt alle 12 Servicefamilien
   (SF01–SF12), alle 15 Service Offers (SO01–SO15), die vier Service-Tiefen (L1–L4) und die
   sechs Paketfamilien; ein Test prüft Anzahl und Kennungen gegen die Code-Konstanten; jede
   Konstante trägt den PDF-Abschnittstitel als Quellkommentar (Konzepttreue-Gate liest am
   PDF gegen).
7. **Preisfreiheit bewiesen:** Ein Negativbeweis-Test zeigt, dass der gerenderte Katalogtext
   kein Währungszeichen/`EUR`/Zahlenband enthält; die Preis-Strukturstellen erscheinen als
   benannte Lücke mit O-KUNDE-01-Verweis; bestehende Geld-/Bewertungs-Wächter bleiben
   unverändert grün.
8. **Zwei Herkünfte getrennt, kein Mapping erfunden:** Konzeptkatalog und belegte
   Mandanten-Services sind sichtbar als getrennte Herkünfte gekennzeichnet; es existiert
   keine gerenderte Zuordnung Instanz↔Offer; per Test belegt.
9. **Ansehen statt buchen:** Kein Buchungs-/Aktivierungs-Element; die Stufe-2-Beschriftung
   (Buchung erst nach menschlicher Freigabe) ist vorhanden; per Test belegt.

**Slice 3 – Struktur-Assistent**

10. **Strukturen vollständig:** Der Assistent zeigt die 11 Lifecycle-Phasen (0–10), die zehn
    Qualification-Mindestfragen, die Charter-Mindestinhalte, die Firmenanlage-Mindeststruktur,
    die Scope-Dimensionen samt Ausschluss-Pflichtangaben, die zwölf
    Strategie-DNA-Pflichtdimensionen und die neun Zielprofiltypen; ein Test prüft die
    Vollzähligkeit gegen die Code-Konstanten (11/10/8/9/12/9 als belegte Kardinalitäten am
    PDF verifizieren, nicht abschreiben).
11. **Read-only bewiesen:** Die Assistent-Ansicht enthält kein Eingabefeld und schreibt
    keinen neuen localStorage-Schlüssel (bestehende Session-/Tiefe-Schlüssel ausgenommen);
    die Beschriftung „erklärte Struktur … keine Erfassung" (sinngemäß) ist vorhanden; per
    Test belegt.
12. **Materialisierungs-Lücken benannt:** Der Assistent benennt sichtbar, dass ISMS-Scope,
    Ausschluss, Strategie-DNA und Target Profile im Objektvertrag existieren, im Seed aber
    nicht materialisiert sind (WP-021-Verweis); per Test belegt.

**Übergreifend**

13. **Alle vier Wächter decken die Kundenwelt ab:** `prozessvokabular`, `kontextleiste`,
    `leerzustand-mandantengrenze` und `seitenbausteine` führen die neuen Seiten in ihren
    Registern; die Meta-Assertionen gegen die `live: true`-Orte bleiben intakt (wird ein
    neuer Ort/`BausteinOrt` eingeführt, ist er eingetragen — Muster `objekt360`); kein
    Wächter wird abgeschwächt; `pnpm --filter @isms/web exec vitest run` grün.
14. **Seitenbausteine-Konvention erfüllt:** Jede neue Seite hat eine Zuordnung ihres Bestands
    zu den neun Bausteinen (`BAUSTEIN_ABDECKUNG`), rendert `SeitenbausteineHinweis` und
    keine leeren Attrappen; Kontextleiste mit Mandant/Rolle/Scope/Datenstand und benannten
    Lücken nach WP-020-Muster; per Test belegt.
15. **Gates besetzt wie zugeschnitten:** Code + Product + Domain + QA + Security & Privacy +
    Konzepttreue; zweite Runde nach dem Fix-Pass; Review-Notiz unter `docs/project/reviews/`
    mit explizitem Security-Urteil zur Kundensphäre (Mandantengrenze + Sphärengrenze der
    neuen Seiten).
16. **Gesamtverifikation:** `pnpm lint`, `pnpm typecheck`, `pnpm build`,
    `pnpm --filter @isms/web exec vitest run`, `python scripts/validate_handoff.py` grün;
    `git diff --stat` je Slice enthält **keine** `packages/`-Pfade.
17. **Owner-Sicht vorbereitet:** `pnpm qa:visual WP-006` gelaufen, Screenshots + axe-Report
    unter `docs/project/visual/WP-006/` committet (Kunden-Startseite voll + leer, Katalog,
    Assistent) — Beitrag zur visuellen Owner-Freigabe am Varianten-Stopp (DR-0010 Nr. 3);
    keine neuen `serious`/`critical`-axe-Befunde auf den neuen Seiten.
18. **Offene Fragen registriert:** Die O-WP006-Vorschläge unten stehen bei Abschluss in
    `docs/project/OPEN_QUESTIONS.md`; jede beim Bauen neu gefundene Lücke kommt als
    weiterer O-WP006-Eintrag dazu — geraten wird nichts (DR-0005).

## Benannte Lücken und offene Fragen (Vorschlag für `docs/project/OPEN_QUESTIONS.md`)

| ID (Vorschlag) | Frage | Art | Umgang in WP-006 | Owner / Gate |
|---|---|---|---|---|
| O-WP006-01 | **Zwei konkurrierende Demo-Firmenlisten:** Dok. 03, Abschnitt „Demo-, Test- und Beispielrollen" nennt **vier** Organisationen (Nordwerk, Finovia, MediCore, Consulting Operator — heutiger Seed), Dok. 16, Abschnitt „Synthetische Demo-Daten und Demo-Dramaturgie" nennt **fünf andere** (Nordstern Manufacturing, AlpenCloud, Rheinbank Digital, MediNova Clinics, GreenGrid Energy). DR-0009 spricht für WP-021 von „den fünf Konzept-Unternehmen" — welche Liste ist kanonisch? | **Konzeptspannung** | Stufe 1 bleibt auf dem heutigen Seed (Dok.-03-Namen); keine Umbenennung, keine Vermischung | Concept Author + Owner **vor dem WP-021-Schnitt** |
| O-WP006-02 | Service Family, Service Offer und Package haben **keinen kanonischen Objekttyp** (Dok. 07 F01–F09); der Katalog lebt deshalb als Code-Konstante statt als Daten. Dauerhaft in Ordnung oder Contract-Erweiterung (E-02-Umfeld)? | Konzeptlücke (vgl. O-WP012-01) | Katalog als quellenbelegte Konstante; kein Mapping Instanz↔Offer | Concept Author |
| O-WP006-03 | 06-D02: „Kundennutzer können tenantbezogen direkt im eigenen Customer Workspace starten" — Stufe 1 löst das als **sichtbaren Einstieg** ohne Redirect (neutraler Einstieg nach DR-0009 bleibt); die tenantgebundene Startlogik gehört zu echten Konten (Dok. 19). Reicht das als Auflösung von O-WP020-08? | Produktfrage | Einstieg gebaut, Redirect-Frage offen gehalten | Product / Owner (schließt O-WP020-08 teilweise) |
| O-WP006-04 | **Kundensphäre ist Perspektive, keine technische Grenze:** Rollen sind keine Autorisierung; eine „Kundenrolle" kann per Rollenwechsel weiterhin Portfolio-Sichten (`/twin`, `/services`-Portfolio) öffnen. Ab wann erzwingt das Produkt die Sphäre technisch? | Security-Grenze (bekannt, Demo-Simulation) | neue Seiten strikt sphärenrein; produktweite Erzwingung benannt statt vorgetäuscht | Security / Dok.-19-Auth-WP (mit FINDING-0004-Umfeld terminieren) |
| O-WP006-05 | Dok. 14, Abschnitt „Paketarchitektur": jedes Paket enthält als Pflichtbestandteil „eine illustrative Preisbandbreite" — kollidiert mit dem strengen Preis-Guardrail. Stufe 1 lässt Preisbänder weg; die Guardrail-Umstellung auf „synthetisch + gekennzeichnet" (Dok. 05-Demo-Regel) steht aus | Regel-Anpassung (präzisiert O-KUNDE-01) | Preisstellen als benannte Lücke; keine Guardrail-Änderung | Owner + Security beim WP-021-/Stufe-2-Schnitt |
| O-WP006-06 | Dok. 16, Abschnitt „Onboarding Workspace und rollenbezogene Sichten" definiert fünf rollenspezifische Sichten; Dok. 06, Abschnitt „Customer Workspace" drei Lenses — Stufe 1 baut eine gemeinsame Read-Struktur ohne Sichten-/Lens-Umschaltung | Lücke (spätere Stufe) | als benannte Lücke im Produkt | Product / UX (Stufe-2+-Schnitt) |
| O-WP006-07 | Die S02-Leitfrage „Wie verstehe ich diesen Kunden in einer Minute?" ist aus Berater-Perspektive formuliert; für Kundenrollen ist „dieser Kunde" das eigene Unternehmen. Braucht die Kunden-Startseite eine eigene, konzeptgedeckte Leitfragen-Formulierung? | Wortlaut-Frage | Builder wählt eine sinngemäße, im Code begründete Formulierung; nichts wird als PDF-Zitat ausgegeben, was keines ist | Product + Concept Author |

## Stop Conditions

- Ein Inhalt der Kundenwelt ließe sich **nur mit einer Preisangabe, einer erfundenen
  Zuordnung (Instanz↔Offer) oder einer Bewertung ohne Datenträger** darstellen → stoppen,
  als Lücke zeigen, O-WP006-Eintrag (DR-0008-/O-KUNDE-01-Grenze).
- Der Bau **erzwingt eine Änderung an `packages/contracts`, `packages/demo-seed` oder
  `packages/db`** → stoppen; das ist WP-021-/E-02-Territorium (Human Gate).
- Die Kunden-Startseite ließe sich **nur mit Existenzaussagen über fremde Mandanten oder
  Betreiber-Portfolio-Daten** füllen → stoppen, Security-Gate einbeziehen
  (FINDING-0009-Klasse).
- Ein Wächter ließe sich **nur grün bekommen, indem seine Regel abgeschwächt, eine Ausnahme
  verallgemeinert oder der Test übersprungen wird** → stoppen; insbesondere wenn wörtliche
  PDF-Strukturtexte (z. B. „Budget" in Dok.-16-Tabellen) mit Wächter-Verbotslisten
  kollidieren: Regelevolution **nur** dokumentiert über QA-/Product-Gate (Muster
  O-WP020-12), nie still.
- **WP-020 Slice 2 ist beim Aktivieren nicht abgeschlossen** (Session ohne optionale Rolle,
  Rollenwahl noch auf `/login`) → stoppen, Zuschnitt gegen den echten Stand prüfen statt auf
  eine angenommene Basis zu bauen.
- Scope-Drift Richtung **Buchung/Konfigurator, Preise, Demo-Accounts/Demo-Welt (WP-021),
  echte Auth, DB→UI, rollenspezifische Onboarding-Sichten** → stoppen, Stand sichern, an
  Queue/Owner.

## Done Evidence

- Kommandoprotokolle in der Review-Notiz: `pnpm lint`, `pnpm typecheck`, frischer
  `vitest run` je Paket, `pnpm build`, `python scripts/validate_handoff.py`, finaler
  `pnpm qa:visual WP-006`,
- Screenshots + axe-Report committet unter `docs/project/visual/WP-006/` (Startseite
  voll/leer, Katalog, Assistent),
- Review-Notiz unter `docs/project/reviews/` mit allen sechs Gates, zweiter Runde und
  explizitem Security-Urteil zur Kundensphäre,
- aktualisierte `docs/project/CURRENT_STATE.md`, `docs/project/ACTIVE_WORK_PACKAGE.md`
  (Sprint-Punkt 5 abgehakt), `docs/project/OPEN_QUESTIONS.md` (O-WP006-01…07 + Neufunde),
  `docs/project/handovers/LATEST.md`,
- getrennte Commits je Slice (explizit gestaged, nie `git add -A`), Verified Checkpoint,
  Commit + Push.
