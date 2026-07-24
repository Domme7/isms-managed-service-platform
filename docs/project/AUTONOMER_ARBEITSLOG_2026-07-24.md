# Autonomer Arbeitslog — 2026-07-24 (Owner abwesend)

> **Auftrag (Owner, 2026-07-24):** „Arbeite alles ab; falls du eine Frage/Bestätigung brauchst,
> schreib sie hier auf und arbeite woanders weiter — ich bin weg, setz so viel um wie du kannst."
> Dieser Log hält **fest getroffene autonome Entscheidungen** und **offene Fragen** an den Owner,
> ohne zu blockieren. Verbindliche Belege stehen in den Decision Records / WP-Dateien.

## Programm (Owner-Reihenfolge)
1. **Kunde-Cockpit modular umbauen** (DR-0016 Nachtrag 3) — kompaktes Ein-Screen-Dashboard, alles
   per Eintauchen. **Stand: gebaut & live** (`029bc10`), Cleanup + Visual-Politur laufen.
2. **Rollen → Profile-Modell (präzisiert 2026-07-24): 5 Profile** = die Demo-Firmen je als eigenes
   **Kunden-Profil** (Login „als Firma X" → deren Kundensicht auf den eigenen Mandanten) **+ 1
   Berater/Admin-Profil** (Portfolio über alle Kunden). Die feine 12-Rollen-Perspektive kommt im Login
   vorerst raus. Hängt an Schritt 3 (die „Firmen als Profile" sollen gefüllte Mandanten sein).
3. **Mandanten füllen** (WP-021 Slices 3–6: AlpenCloud/Rheinbank/MediNova/GreenGrid reich).
4. **Berater-Portfolio-Cockpit** (über alle Kunden, Dringlichkeit/Termine) — **Konzept + Entwurf**
   zeigen, dann bauen. Ehrlicher Datenträger = Eisenhower-Idee (kundengelieferte Aufgaben/Fristen),
   siehe `research/ideas/IDEA-2026-07-24_eisenhower-dringlichkeit-berater-cockpit.md`.

## Autonome Entscheidungen (getroffen, um nicht zu blockieren)
- **AE-1 (Cockpit-Cleanup):** Die Alt-Ansichten (A/B/C `CockpitVariantenContent`/`CockpitView`,
  Bento `CockpitBentoContent`/`CockpitBentoView`, `lib/cockpit/varianten.ts`) werden **gelöscht**
  (Gate-Befund „verwaist"; DR-0016 Nachtrag 3 mustert A/B/C aus). Die Vokabular-/Sphären-/Leerzustand-
  Guards werden auf die neue Live-Ansicht `CockpitModulContent` **umgezogen** (O-WP034-04).
- **AE-2 (WP-021 Tenant-Mapping, O-WP021-02):** Der Owner sagte früher „entscheide du". Gewählt:
  die **heute leeren Mandanten umbenennen/anreichern** (schlanker Seed, stabile Struktur), bei Bedarf
  ein bis zwei neue Mandanten ergänzen, damit fünf Dok-16-Firmen existieren. „Consulting Operator"
  bleibt als Betreiber-/Portfolio-Kontext bestehen. Wird im WP dokumentiert.
- **AE-3 (Berater-Cockpit):** wird **erst als Konzept + Mockup** gezeigt (Owner-Wunsch), nicht
  blind gebaut. Ehrliche Basis heute = Portfolio-Rangliste nach echten Datenlücken je Kunde; echte
  Fristen/Dringlichkeit = E-02/Eisenhower (Owner-Gate).
- **AE-4 (WP-021 Mandanten-Mapping konkret, verfeinert AE-2):** Kanonische Demo-Welt = die fünf
  Dok-16-§34.1-Firmen + Provider. Mapping (stabile `tenant_id`, Anzeigename/Inhalt auf Dok-16):
  Nordstern=`tenant-nordwerk` (reich ✓); AlpenCloud=**neu** `tenant-alpencloud` (Slice 3);
  Rheinbank=Slot `tenant-finovia` (Slice 4, Umbenennung+Graph gebündelt); MediNova=Slot
  `tenant-medicore` (Slice 5, gebündelt); GreenGrid=**neu** `tenant-greengrid` — **bleibt bewusst
  LEER** (Owner-Direktive „ein Mandant bleibt leer" + Dok-16-Profil „getrennter Discovery-Scope").
  DR-0005-Spannung Dok-07 §20 ↔ Dok-16 §34.1 im `tenants.ts`-Kopf benannt. Sequenz: erst beide
  Neuen als Leer-Mandanten, dann Graphen **einzeln** füllen — nie roter Zwischenstand.
- **AE-6 (DR-0017 Stage 3 Ansatz):** Die 8 Bereiche werden über einen **geteilten, inhalts-neutralen
  Dashboard-Rahmen** (`BereichRahmen`) in die Cockpit-Sprache überführt (gleiche Fläche/Farbwelt,
  geteilte Themenwahl), **ohne** die feinjustierte Ehrlichkeits-/Antwort-Modus-/Detailtiefe-Logik der
  Inhalte anzutasten (DR-0017 Pkt. 3 „Inhaltskomponenten wiederverwenden"; O-DR17-02-Default „im selben
  Rahmen"). Ein tieferer Innen-Umbau reicher Bereiche in echte Bento-Kacheln wartet auf Owner-Richtung
  (offene Frage O-DR17-02, im DR-0017-Fortschrittsblock unten notiert) — er würde bewährte, getestete
  Nuancen berühren und ist deshalb kein stiller Alleingang (DR-0005).
- **AE-7 (synthetische Preisbänder — AUTORISIERT, kein Gate):** Zunächst sah es nach einem Konflikt
  aus: `lib/services/katalog.ts` (WP-006) ist als „PREISFREIHEIT ABSOLUT (O-KUNDE-01/DR-0008)"
  dokumentiert. **Regel-Null-Prüfung ergab: dieser Kommentar ist VERALTET.** **DR-0015 (Owner,
  2026-07-24), Punkt 8** stellt O-KUNDE-01 ausdrücklich um: „gekennzeichnete, synthetische
  Beispielpreise im Servicekatalog/den Paketen erlaubt (mit Security); keine realen Preise,
  DR-0011-konform ohne ‚Demo'-Etikett". Die Aufgabe ist damit autonom autorisiert. Quelle (Regel Null):
  Dok. 14 „Illustrative Plattformbänder" (Core/Professional/Enterprise/Provider) — vom Konzept selbst
  als „Produktannahmen … synthetische Designannahmen und keine realen Preise" markiert. **Slice 1
  (fertig):** react-freier Datenträger `lib/services/preisbaender.ts` (4 Plattformbänder worttreu,
  Provider ohne erfundene Zahl = benannte „individuelle Vereinbarung", `formatPreisband`, Ehrlichkeits-
  zeile ohne „Demo"-Wort), 5 Tests, web 874 grün. **Slice 2 (FERTIG):** Die Plattformbänder werden
  jetzt im Servicekatalog (`/services/katalog`) angezeigt (neue `PlattformbaenderSection`, ehrlich
  „Produktannahmen, kein Angebot"). **Guardrail umgestellt:** der Preisfrei-Wächter AC7 ging von „strikt
  preisfrei" auf „illustrative Bänder gezeigt, ehrlich gekennzeichnet; Offer-/Paket-PreisFORMEL bleibt
  benannte Lücke; keine Fremdwährung/kein Prozent-Score"; das „Demo"-Etikett-Verbot (DR-0011) prüft
  weiter der `produktsprache`-Wächter (NICHT blanket auf „Simulation" — das träfe das Fachwort
  „Wirkungssimulationen"). Veralteten `katalog.ts`-„PREISFREIHEIT ABSOLUT"-Kopf + die „ohne Preise"-
  Rahmungen korrigiert. web 876 grün, browserverifiziert. **Weitere Bänder** (Pakete, Einzel-Managed-
  Services aus Dok. 14 „Illustrative Managed-Service-Pakete"/„Einzelservice-Bänder") folgen als eigene
  Scheiben, je vollständig gelesen.
- **AE-8 (WP-033 Seed-Textpass, U-15-Kern fertig):** Die im UI **gerenderten** Demo-Etiketten aus den
  Seed-Texten entfernt (DR-0011; entfernt Labels, fügt keine hinzu): Tenant-`industry` ohne „(synthetisch)"
  (6×), Tenant-`description` ohne „Synthetischer/Synthetische"-Präfix (6×), Decision-`description` ohne
  „Synthetischer Decision Record:"-Präfix (3×), Deliverable-`display_name` ohne „(synthetisch)"/„(Entwurf,
  synthetisch)"→„(Entwurf)", eine Ergebnis-Prosa entschärft. Der Tenant-**Name** „Consulting Operator Demo"
  BLEIBT (kanonisch, PDF Dok. 07). Der `produktsprache`-Wächter maskiert Seed-Strings mechanisch → seine
  Ausnahmemenge schrumpft von selbst. Nach Seed-Änderung `demo-seed build` VOR den Tests; 6 Test-Assertions
  auf die neuen Namen nachgezogen. demo-seed 90 · db 19 · web 876 grün; Browser: /login, /heute,
  /entscheidungen ohne „synthetisch". **Verbleibend (eigene Scheibe):** code-lastige Beschreibungen
  („Synthetische Service Instance (Dok. 13 §4.3), Muster SO02/SO03…") → Domänensprache (Regel Null), und
  die „Synthetische(r) X:"-Präfixe in den Objekt-Graphen (alpencloud/rheinbank/medinova) — größerer Pass.

## Offene Fragen an den Owner (nicht blockierend — Default gewählt, jederzeit umstellbar)
- **OF-1 (2 Profile):** Sollen die 12 Rollen-Perspektiven wirklich ganz raus, oder nur der
  Login-Einstieg auf „Kunde/Berater" reduziert und die Rollen intern behalten werden? **Default:**
  Login zeigt nur zwei Profile; die feine Rollen-Logik bleibt im Code (später leicht reaktivierbar),
  wird aber im UI nicht mehr angeboten. (Risiko: viele Guard-/Rollen-Tests hängen an R01–R12 — ich
  reduziere UI-seitig und lasse die interne Sphären-Zuordnung bestehen, um Tests stabil zu halten.)
- **OF-2 (Eisenhower/E-02):** echte Kunden-Eingabe + Datei-Upload brauchen echte Anmeldung (WP-030)
  + Mandantentrennung (FINDING-0004). **Default:** zuerst synthetische Seed-Aufgaben + read-only
  Ranking; echte Eingabe später, gated.

## Fortschritt (chronologisch)
- ✅ Modularer Cockpit-Baum `lib/cockpit/module.ts` + 6 Tests (`2758682`).
- ✅ Modulare Ansicht live: `CockpitModulContent`/`CockpitModulView` + CSS, `/cockpit` umgestellt
  (`029bc10`); rendert mit echten Nordstern-Daten, 875 Tests grün.
- ✅ Visual-Politur (`ca504ce`): eigene Inline-SVG-Icons (Webfont @tabler verworfen wegen 174-Paket-
  Ballast + CI-Risiko), Kontrast-Fix, Briefing-Hero; **qa:visual axe 0** auf cockpit/-eintauchen/-dunkel.
  Screenshot gleicht dem freigegebenen Entwurf (kompakt, ein Screen, alles per Eintauchen).
- ✅ Cleanup: **A/B/C + Bento gelöscht** (11 Dateien: CockpitVarianten/View, CockpitBento*, KpiBand,
  Warnungen-/Lebenszyklus-Komponente, varianten.ts, 3 Alt-Tests), **5 Guards** (produktsprache,
  prozessvokabular, seitenbausteine, kontextleiste, leerzustand) **auf `CockpitModulContent` umgezogen**,
  neuer Komponententest `cockpit-modul.test.tsx` (8). **835 Tests + lint + typecheck grün.** Schließt
  Gate-Befunde AE-1 (A/B/C verwaist) + Guard-Abdeckung (O-WP034-04).
- **✅ SCHRITT 1 (Kunde-Cockpit modular) FERTIG** (`040372c`).
- ✅ **Schritt 4 (Konzept)**: Berater-Portfolio-Cockpit als **Entwurf** gezeigt (Mockup
  `berater_portfolio_cockpit_konzept`) + Konzeptdoc `docs/project/design/BERATER_PORTFOLIO_COCKPIT_KONZEPT.md`
  — Teil 1 echte Kunden-Rangliste nach Lücken-Last, Teil 2 Eisenhower/E-02 (geplant). Braucht Schritt 3 für
  ein echtes Portfolio. **Owner-Feedback (2026-07-24): gefällt als Idee, will aber MEHR — mehr Dashboard,
  interaktiver, „wo hängt bei welchem Kunden was wie" (z. B. Heatmap Kunde × Bereich, Drill-down je Zelle).**
  Vor dem Bau erweiterten „krasseren" Entwurf zeigen.
- ⏳ **Schritt 2 (5 Profile)** + **Schritt 3 (Mandanten füllen, WP-021 Slices 3–6)** — beides Code-Änderungen
  mit Test-Count-Churn (all-or-nothing für grüne Suite), bewusst für einen fokussierten Durchgang gelassen,
  damit kein halbfertiger, roter Zwischenstand entsteht.

### Autonomer /loop-Durchgang (2026-07-24, Owner gab Liste A frei)
- ✅ **Cockpit-Hinweisblöcke raus** (`25c6639`): Kontextleiste/Legende/Sphären-/Seitenbausteine-Hinweis
  aus dem eigenständigen Cockpit entfernt; eine ehrliche Datenstand-Zeile bleibt; Cockpit aus den
  Shell-Seiten-Konventionen (Seitenbausteine/Kontextleiste) herausgenommen (DR-0017, dokumentiert). 826
  Web-Tests grün.
- ✅ **WP-021 Teilschritt 1a** (`54bebbe`): AlpenCloud + GreenGrid als leere Dok-16-Mandanten ergänzt
  (Mandantenwelt 6); `seed.spec` + Manifest 1.4.0 nachgezogen; demo-seed 63 + db 19 + web 826 grün.
- ✅ **WP-021 Slice 3 (AlpenCloud-Graph)** (`e174ae9`): Entwurf per Subagent, Integration + Verifikation
  durch mich. AlpenCloud trägt jetzt 30 Objekte / 34 Kanten (F01–F09), bewusste Lücken (API-Gateway-
  Control ohne Nachweis, Wachstumsrisiko ohne Minderung, Telemetriedaten ohne Owner) + Dok-07-Pflichten
  (Konflikt/veraltete Quelle/Trust-State), keine numerische Bewertung (Slice 7 gated). `depends_on`
  erstmals belegt. demo-seed 72 + db 19 + web 826 + typecheck grün. Manifest 1.5.0.
- ✅ **AlpenCloud-Politur** (`b01542b`): Domänen-Review-Fund behoben (mitigates von Verschlüsselung
  auf IAM umgehängt — API-Exfiltration wird durch Zugriffssteuerung gemindert, nicht durch
  Ruhedaten-Verschlüsselung); zwei klärende Kommentare.
- ✅ **WP-021 Slice 4 (Rheinbank Digital AG)** (`07955df`): Slot `tenant-finovia`, Anzeige→Rheinbank,
  eigener ISMS-Graph (30/34), neue Typen `operates`/`caused_by`. **Mandantenwelt: 3 gefüllte
  Kundenfirmen** (Nordstern, AlpenCloud, Rheinbank) + Provider; MediCore + GreenGrid leer.
- 🔴 **KRITISCHER BEFUND (stale dist):** `apps/web` und `packages/db` lösen `@isms/demo-seed` über das
  **gebaute `dist/`** auf (`main: dist/index.js`, `dist/` ist **gitignored**). **Lokale Web-/DB-Tests
  liefen gegen einen veralteten Seed** und zeigten falsch-grün, bis
  `pnpm --filter @isms/demo-seed build` lief. **REGEL für jede Seed-Änderung: erst `demo-seed build`,
  dann Web-/DB-Tests** — sonst spiegelt weder die App noch die Suite den neuen Seed. (CI baut via Turbo
  vor dem Test frisch; nur lokal ist der manuelle Rebuild nötig.) Der frische-dist-Fallout (Beziehungs-
  typ-Labels, „Slice"-Beschreibungsleck, CISO-Namenskollision, `finovia`→`greengrid` als Leer-Fixture,
  „vier→sechs"-Counts) wurde in `07955df` behoben; alle Suiten gegen frisches dist grün.
- ✅ **WP-021 Slice 5 (MediNova Clinics Holding)** (`0c5067c`): Slot `tenant-medicore`, Anzeige→MediNova,
  eigener ISMS-Graph (30/36), **erster Mandant mit F05 Lieferkette** (System/Lieferant/Unterauftragnehmer),
  mehrere Deckungslücken (dezentral). Fallout wie Rheinbank behoben (medicore→greengrid, Anzeigename,
  Framework-Namenskollision distinkt, getIsmsCoreTenants +MediCore, db 157/199, Manifest 1.7.0 + F05).
- 🎉 **WP-021 MANDANTEN-FÜLLEN KOMPLETT (Liste-A-Punkt 1):** vier gefüllte Kundenfirmen — Nordstern
  (nordwerk), AlpenCloud (neu), Rheinbank (finovia-Slot), MediNova (medicore-Slot) — + **GreenGrid
  bewusst leer** (der dauerhaft leere Mandant, = „ein Mandant bleibt leer") + Consulting Operator
  (Provider). demo-seed 90 + db 19 + web 840 grün. Seed 1.7.0, 157 Objekte / 199 Kanten.
  - **Offen an WP-021 (nicht mehr autonom / minor):** (a) **Slice 7** (numerische Bewertungen: Reifegrad,
    Risiko-Level, KPI-Zielwerte) = **E-02-Owner-Gate**, blockiert (CCP-003/005/008). (b) *Minor autonom:*
    CCP-008-Trägerschema-Vorschlag (`research/change-proposals/`) + Firmen-Storylines in
    `packages/demo-seed/README.md` (AC-10) — nachziehbar, blockiert nichts.
- ✅ **DR-0017 Stage 1 (Berater-Portfolio-Einstieg) KOMPLETT (Liste-A-Punkt 2):**
  - `53bb388` **1a Datenschicht** `lib/portfolio/data.ts`: `buildPortfolioDashboard()` verdichtet je
    Kunde die belegten `x-von-y`-Abdeckungen (keine 2. Zählregel); Rang nach echter ISMS-Lücken-Last;
    Provider ausgeschlossen; GreenGrid = Empty-State. 9 Tests.
  - `f02cf48` **1b UI** `/portfolio` (eigenständig, kein NAV_PLACES-Ort): Kunden-Rangliste (Nordstern
    39 > MediNova 23 > Rheinbank 17 > AlpenCloud 16 > GreenGrid leer) + **Heatmap Kunde×Abdeckung**;
    Eintauchen → Kunde-Cockpit (end-to-end im Browser verifiziert, keine Konsolenfehler). In
    produktsprache+prozessvokabular registriert. 7 Komponententests.
  - `8bbe16d` **1c Routing** `einstiegHref(role)`: Berater→`/portfolio`, Kunde→`/cockpit`, neutral→
    Portfolio. Login + Root-Redirect verdrahtet. web 857 grün.
  - **Ehrlich getrennt:** Teil 1 (Lücken-Last-Rangliste + Heatmap) = echte Daten. Teil 2
    (Eisenhower/Fristen/Dringlichkeit) = **E-02-Owner-Gate**, als benannte Lücke gezeigt, nicht gebaut.
- ✅ **5-Profile-Login (Liste-A-Punkt 3)** (`9c1fe51`): primärer Login = Profile statt Rolle×Mandant-
  Matrix — 5 Firmen-Profile (`als [Firma] eintreten` → Kundensicht R03 → /cockpit) + 1 Berater/Admin
  (R08 → /portfolio). Feine 12-Rollen (LoginWelten) + neutraler Einstieg (DR-0009) im eingeklappten
  „Weitere Ansichten" (OF-1: Rollen-Logik bleibt). DR-0005-Spannung DR-0015→Profil-Modell im
  `LoginProfile`-Kopf benannt. `LoginProfile` + 4 Komponenten- + 2 Page-Tests; Login visuell geprüft.
  web 863 grün.
- ✅ **DR-0017 Stage 2 (Kunde-Dashboard-Einstieg) im Kern fertig** (`5d644e5`): Das Cockpit IST der
  Kunde-Einstieg mit den 8 Bereichen als Kacheln (`BereichKacheln`, seit DR-0016). Ergänzt: eine
  **Rückkehr-Brotkrume „Portfolio › [Mandant]"** für die Berater-Sicht (schließt den Drill-Loop
  Portfolio↔Cockpit); die Kundensicht trägt bewusst keine Rückkehr (kein Portfolio darüber). web 864.
- ✅ **DR-0017 Stage 4 (Sidebar raus → Drill-Brotkrume) fertig:** `ShellNav` (8-Orte-Sidebar)
  gelöscht; die Shell trägt jetzt `ShellBreadcrumb` — Kundensicht „Cockpit › [Bereich]", Berater-Sicht
  „Portfolio › Cockpit › [Bereich]" (der Portfolio-Rücksprung erscheint nur in der Portfolio-Sphäre).
  Navigation läuft nur noch per Eintauchen aus den Cockpit-Kacheln (`BereichKacheln`); die Bereich-
  Seiten behalten ihren Inhalt, verlieren die laterale Nav. `AppShell` rendert Brotkrume statt Sidebar
  (navOpen-Toggle-Verdrahtung raus; `Topbar`-Toggle nur noch bedingt). `shell.test.tsx`-Nav-Block auf
  das Drill-Modell umgeschrieben (Brotkrume/aria-current/Sphäre statt 8-Orte-Sidebar); die „8 Orte"-
  Deckung als `BereichKacheln`-Test ins `cockpit-modul.test.tsx` verschoben (Kunden-Kachel folgt der
  Sphäre: R03→/kunden, R08→/twin). Totes Sidebar-CSS (`.shell-nav*`, `--shell-nav-w`, responsive
  Nav-Einklapper) entfernt; `.shell-body` auf eine Spalte. Konzept-Override Dok. 06-D01 in
  `ShellBreadcrumb`-Kopf als DR-0005-Spannung benannt (von DR-0017/DR-0006 gedeckt). Browser: beide
  Sphären am `/isms` bzw. `/services` verifiziert (keine Sidebar, kein Toggle, keine Konsolenfehler).
  **web: lint 0 · typecheck 0 · 865 grün (55 Dateien).**
- 🟡 **DR-0017 Stage 3 begonnen — geteilter Dashboard-Rahmen, Bereich 1/8 (Wissen) fertig:**
  Ansatz (AE-6, s. u.): ein wiederverwendbarer **`BereichRahmen`** (`components/shell/BereichRahmen.tsx`)
  trägt dieselbe Cockpit-Fläche (`.ck-cockpit`) und übernimmt die im Cockpit gewählte Hell/Dunkel-Stufe
  über den GETEILTEN Schlüssel (`lib/cockpit/theme.ts`, aus dem Cockpit herausgezogen → DRY; der
  Umschalter bleibt im Cockpit, die Bereiche lesen nur). Der Rahmen ist **inhalts-neutral**: Kopf,
  Leitfrage, Kontextleiste und die feinjustierte Antwort-Modus-/Ehrlichkeitsrahmung (DR-0013) bleiben
  in der jeweiligen Bereichs-Inhaltskomponente UNVERÄNDERT — so gewinnt der Bereich die Dashboard-Optik,
  ohne dass eine generische Hülle die per-Bereich-Nuancen einebnet. **Wissen** als erster (einfacher,
  O-DR17-02-„Dive-Detail") Adopter: `WissenContent` unverändert, nur `WissenView` umschließt sie mit dem
  Rahmen. 4 `BereichRahmen`-Tests; web lint 0 · typecheck 0 · **869 grün**. Browser: `/wissen` in
  `.ck-cockpit--bereich`, Dunkel aus dem Cockpit übernommen (Panel `rgb(20,22,28)`), keine Konsolenfehler.
- ✅ **DR-0017 Stage 3 Frame-Rollout KOMPLETT — alle 8 Bereiche im geteilten Dashboard-Rahmen:**
  ISMS, Services, Entscheidungen, Reports, Administration, Kunden(KundenStart) + Heute als Batch auf
  `BereichRahmen` umgestellt (je *View* umschließt den unveränderten *Content* per Ternary; kein eigener
  Kopf → genau ein h1). Heute (reich, `MissionControlContent`) bekam **nur den Rahmen** — die Detailtiefe-/
  Ehrlichkeitslogik blieb unangetastet. web lint 0 · typecheck 0 · **869 grün** (auch die 4 direkt
  getesteten Views Isms/Services/Entscheidungen/Heute bleiben grün). Browser: `/isms` in
  `.ck-cockpit--bereich`, Dunkel-Kontinuität aus dem Cockpit, genau ein h1, keine Konsolenfehler.
  - **Autonom fertig = der Frame-Rollout.** Der tiefere **Bento-Innenumbau** reicher Bereiche (v. a. Heute)
    bleibt an **O-DR17-02 (Owner)** gated (s. u.) — er würde getestete Nuancen berühren.
  - **↪ OFFENE FRAGE O-DR17-02 (Owner) — Tiefe der Überführung je Bereich:** Reicht der geteilte
    **Dashboard-Rahmen um den bestehenden Inhalt** (so gebaut, DR-0017-Default „im selben Rahmen",
    inhalts-treu, risikoarm), oder sollen reiche Bereiche (v. a. Heute) zusätzlich **innen in echte
    Bento-Kacheln + Dive** umgebaut werden (mehr „grafisch geil", aber Eingriff in feinjustierte
    Ehrlichkeits-/Detailtiefe-Logik → Gefahr, Nuancen einzuebnen)? Autonom umgesetzt: der Rahmen. Der
    tiefere Innen-Umbau je Bereich wartet auf Owner-Richtung.
- **Owner-Gates weiter offen (nicht autonom):** WP-021 Slice 7 (numerische Bewertungen, E-02),
  Eisenhower/Fristen (E-02), echte Auth (WP-030), DB→UI (FINDING-0004).
- ~~⏳ **WP-021 Slice 5 (MediNova Clinics Holding):** Entwurf `medinova-graph.ts` liegt fertig auf Platte~~
  (Workflow, 30 Objekte/36 Kanten, inkl. F05 Lieferkette), noch **nicht verdrahtet**. Integration wie
  Rheinbank: Slot `tenant-medicore`, Anzeige→MediNova; `seed.ts`/`index`/`seed-facts`/`seed.spec`/
  Manifest 1.7.0; Web-Test-Churn für die **MediCore-Leer-Fixtures** (→ `tenant-greengrid`) + Anzeigename.
  GreenGrid bleibt leer (= Slice 6, der bewusst leere Mandant).
- ⏳ **WP-021 Slices 4+5 (Rheinbank/MediNova) + AlpenCloud-Review** — Hintergrund-**Workflow**
  (`wp021-slice45-draft-und-ac-review`): zwei `data-graph-analytics`-Agenten entwerfen `rheinbank-graph.ts`
  (Finovia-Slot, Anzeige→Rheinbank) + `medinova-graph.ts` (MediCore-Slot, Anzeige→MediNova, inkl. F05
  Lieferkette) parallel; zwei Reviewer (Konzepttreue + Domäne) prüfen den AlpenCloud-Graph adversarial.
  Integration jeder Firma (Umbenennung + Web-Test-Churn) + Verifikation + Commit sequenziell durch mich.
  Danach: 5-Profile-Login, Berater-Portfolio-Entry, DR-0017 Stages 2–4, Cleanup, Preisbänder, Suche.
