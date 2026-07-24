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
  ein echtes Portfolio; Owner-Reaktion auf den Entwurf steht aus.
- ⏳ **Schritt 2 (5 Profile)** + **Schritt 3 (Mandanten füllen, WP-021 Slices 3–6)** — beides Code-Änderungen
  mit Test-Count-Churn (all-or-nothing für grüne Suite), bewusst für einen fokussierten Durchgang gelassen,
  damit kein halbfertiger, roter Zwischenstand entsteht. Nächster Einstieg: WP-021 Slices 3–6 (AE-2-Mapping),
  dann 5-Profile-Login, dann Berater-Cockpit Teil 1 bauen.
