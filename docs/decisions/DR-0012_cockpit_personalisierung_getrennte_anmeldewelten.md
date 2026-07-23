# DR-0012 – Cockpit-Einstieg, Personalisierung und getrennte Anmeldewelten (Berater vs. Kunde)

- Typ: Product / UX / Architektur / Roadmap
- Status: **Accepted** — beide Unterentscheidungen vom Owner getroffen (2026-07-23):
  **A → (a) getrennter Einstieg auf einer Plattform**; **B → (a) kuratierte Personalisierung zuerst.**
  Beide sind die konzepttreuen Optionen. Umsetzung: Stufen B/D unten, in die Queue aufgenommen.
- Datum: 2026-07-23
- Decision Owner: **Human Product Owner** („einfacher/intuitiver bedienen; mehr Dashboards und
  Ampeln wo nötig; eine Cockpit-Seite beim Start, selbst gestaltbar je Anmeldeaccount; getrennte
  Anmelde-Accounts für Berater und für die Kundenumgebung — nicht gleich; und mehr Konzepttreue")
- Grundlage: PDF-Verankerung aller vier Dimensionen (Regel Null), Belege je Punkt unten;
  Owner-Schicht 2 (DR-0008/0009/0010) geht bei Konflikt vor, ist aber als solche gekennzeichnet.

## Leitbild (ein Satz)

Jeder Anmeldeaccount betritt die Plattform durch ein **Cockpit, das sich in 30 Sekunden selbst
erklärt** — rollen- und sphärengerecht, mit ehrlichen Ampeln und Verdichtung, in dem der Nutzer
Reihenfolge, Tiefe und Fokus **selbst steuert** —, wobei **Berater und Kunde getrennte Identitäten
mit getrenntem Einstieg** sind, aber **eine gemeinsame Wahrheit** teilen (P02, 06-D05).

## 1. Getrennte Anmeldewelten Berater vs. Kunde — KONZEPTGETRAGEN (Substanz), Form teils Erweiterung

**Belegt (Regel Null):**
- Dok. 19 §7.1 **Identitätstypen**: „Kundenbenutzer, Berater und Managed-Service-Personal,
  externe Auditoren … Administratoren" sind **getrennte Identitätstypen** — je eigener Principal,
  Herkunft, Assurance-Level, Owner, Mandantenzuordnung. → „nicht gleich" ist konzeptioneller Kern.
- Dok. 19 §8.1 **Authentisierung**: produktive Mandanten föderieren ihren **eigenen IdP** (OIDC/
  SAML); Betreiber/Berater über den Betreiber-IdP. Lokale Passwörter nur für Demo/Recovery/Übergang.
- Dok. 19 §5.1 **Trust Boundary Betreiber↔Kunde**: der Berater ist **nicht per se** in der
  Kundenumgebung, sondern nur über Just-in-Time-Zugriff (Freigabe, Masking, Audit).
- Dok. 19 §10.4 **ReBAC**: Berater-Zugriff braucht eine **aktive Beziehung** (Engagement) zum
  Kunden — kein geteiltes Login.
- Dok. 03 §3 **Sphären-Spalte**: R01–R06 = **Kunde**, R08–R11 = **Betreiber**, R07 = Unabhängig,
  R12 = Beide. Dok. 16 §8.2: „**getrennte Kunden- und Provideradministration**".

**Erweiterung (nicht im PDF):** Zwei **eigenständige Login-Front-Doors** („Berater-Login" vs.
„Kunden-Login", die auch optisch „nicht gleich" sind) als Produktanforderung. Das PDF trägt die
**Substanz** der Trennung (Identität, Sphäre, Trust Boundary, Föderation), aber nicht zwei
getrennte Anmelde-Oberflächen. DR-0009 (O-KUNDE-02) verweist den echten Kundenlogin ohnehin auf
ein eigenes Auth-WP nach Dok. 19.

**Wichtige Grenze (nicht still auflösen):** Dok. 03 §2 „**ein gemeinsames Datenmodell**" und
Dok. 06 §5.2 Designregel „**niemals vier getrennte Anwendungen oder widersprüchliche
Dashboards**" (P02 „eine Wahrheit, mehrere Perspektiven"). → **Getrennte Identitäten + getrennter
Einstieg auf EINER Plattform** ist konzepttreu; **getrennte Systeme/Datenplattformen** wären ein
Konzeptbruch. Siehe Owner-Entscheidung A.

## 2. Cockpit-Einstieg + selbst gestaltbar — Start KONZEPTGETRAGEN, freies Layout ist OFFENE FRAGE

**Belegt:**
- Dok. 06 §8 **Mission Control** ist der **Standard-Startpunkt** — ein rollenspezifischer
  **Arbeitsplatz** mit 30-Sekunden-Orientierung, ausdrücklich „**kein aggregiertes
  Reporting-Dashboard**".
- Dok. 06 06-D02: Standard-Start Mission Control; **Kundennutzer starten tenantbezogen direkt im
  eigenen Customer Workspace** (deckt sowohl Start-Cockpit als auch getrennten Kundeneinstieg).
- Dok. 06 §6.2 **Detailtiefe**: „**Nutzer können eine bevorzugte Tiefe speichern**;
  sicherheitskritische Warnungen bleiben jedoch immer sichtbar." → klarster Anker für speicherbare
  Personalisierung (bereits in WP-020 gebaut).
- Dok. 06 §15: Experten erhalten **Filter, gespeicherte Sichten, Bulk-Aktionen**.
- Dok. 10 §5.5 **Nutzerkontrolle**: „Nutzer dürfen Missionen **umsortieren, splitten, delegieren
  oder verwerfen**." Dok. 10 §6.3 **Management-Modus**: Umschalter „Wenn ich Geschäftsführer wäre"
  reduziert auf 3 Risiken / max. 5 Entscheidungen.

**Erweiterung / offen:** Ein **frei anordbares Kachel-/Widget-Cockpit je Konto** (Drag-and-Drop-
Builder) ist **genau die offene Konzeptfrage 06-O09**: „Welche Personalisierung darf ein Nutzer
speichern: **Layout**, Filter, Briefing, Benachrichtigungen, **Startseite**?" Zusätzlich begrenzt
06-O05 die Automatik und P04 verbietet „**überraschende Auto-Personalisierung**". → Der volle
Selbst-Design-Umfang ist **nicht entschieden** — siehe Owner-Entscheidung B.

**Harte Leitplanke jeder Selbstgestaltung:** sicherheitskritische Warnungen bleiben **immer
sichtbar** (Dok. 06 §6.2) — nichts Kritisches darf wegkonfigurierbar sein.

## 3. Mehr Dashboards/Ampeln — ERWÜNSCHT (DR-0008), mit belegter Ehrlichkeitsgrenze

- Dok. 06 P04 „**Ursache vor Score**": Bewertungen zeigen Gründe, Beziehungen, Datenlage und
  Unsicherheit — **nie nur eine Zahl oder Ampelfarbe**. „Bewusst vermiedene Muster": **Ampelwände
  ohne erkennbare nächste Entscheidung**.
- Dok. 06 §21 / 06-D11 / §18: Status = **Text + Symbol/Form + optional Farbe**; Warnfarben
  sparsam (A11y — Ampel nie nur Farbe).
- Dok. 10 §7.2: „Eine **Ampelfarbe ohne Erklärung ist unzulässig**" (Portfolio-Health kein
  Ampelfriedhof).
- Dok. 09 §11 „Ein Gesamtportfolio muss **mehr zeigen als die Summe einzelner Ampeln**"; M05
  **Confidence getrennt anzeigen** (hoher Score bei schwacher Datenlage sichtbar abgeschwächt);
  09-AC01 „Jeder sichtbare Score besitzt Scope, Zielbezug, Methode, Version, Datenstand und
  Confidence"; §20 **Explain Panel** je Score.
- Dok. 08 08-D07: „Implemented ≠ effective" — Ampel darf Lebenszyklus-Stand nie als Prüfergebnis
  verkleiden.

→ **Mehr Ampeln/Dashboards ja** (DR-0008), aber **jede** Ampel trägt: nächste Entscheidung +
Drill-down in die Ursache + Confidence/Datenstand + Text-neben-Farbe. Echte Bewertungs-/
Aggregationslogik erst nach Nachziehen von Dok. 09/10 (bereits als DR-0008-Umsetzungspfad benannt).

## 4. Kundenumgebung als eigener Erlebnisraum — KONZEPTGETRAGEN

- Dok. 06 §7 **S02 Customer Workspace**: eigenes Kunden-Cockpit, Leitfrage „Wie verstehe ich
  diesen Kunden in einer Minute?", Strategie-DNA/Zielstatus/Puls/Servicewirkung.
- Dok. 06 §5.1 **Customer Operations World**: eigene Welt, „keine Portfolio-/Vertriebsmetriken
  ohne Zweck". Dok. 06 §11 / **S04 Portfolio Cockpit**: der Berater managt ein **Portfolio vieler
  Mandanten** — der Kunde ein **Ein-Unternehmens-Cockpit**. → so unterscheiden sich die Arbeitsplätze.
- Dok. 16 §23 **Onboarding Workspace** mit rollenbezogenen Sichten (Customer Sponsor / ISMS
  Manager / Consultant / Managed-Service Lead); Dok. 03 §10.1 **Anfängererlebnis** („keine leere
  Plattform … geführte Aufgaben oder klare Einladung"); Dok. 16 §24 **Guided Quickstart**.

**Benannte Spannung (nicht still auflösen):** Dok. 03 §2.1 ANNAHME „direkter Self-Service für
Einzelunternehmen bleibt möglich, ist aber **nicht der primäre Startfall**" steht der
Owner-Priorisierung (Kundenwelt als Kernpfad, DR-0009) gegenüber; S02 nennt als Rollen „Kunde
**und** Beratung" (Consulting Lens) — der „eigene Raum" ist konzeptionell ein **geteiltes
Artefakt mit Lenses**, keine abgeschottete App. → gehört in die Konzeptpflege (Change Proposal).

## Konzepttreuer, phasierter Umsetzungspfad

| Stufe | Inhalt | Konzeptstand | Gate |
|---|---|---|---|
| **jetzt (gebaut/laufend)** | neutrales Ebene-1-Cockpit, Detailtiefe speicherbar, Rollenvarianten, Ampel-Badges auf belegten Daten, Kundenwelt Stufe 1 | DR-0008/0009/0010 + PDF-Anker | im Sprint |
| **A – Cockpit-Varianten** | 2–3 Stilvarianten des Start-Cockpits → **Owner-Varianten-Stopp** | DR-0010 | Owner-Freigabe |
| **B – kuratierte Personalisierung** | Kacheln umsortieren/anheften, gespeicherte Sichten/Filter, Management-Modus-Umschalter (Dok. 10 §6.3) — **kein freier Layout-Builder** | Dok. 06 §6.2/§15, Dok. 10 §5.5/§6.3 | Product |
| **C – Personalisierungs-Umfang klären** | 06-O09 beantworten: darf ein Konto **Layout/Startseite** frei gestalten? | **OFFENE FRAGE 06-O09** | Concept Author + Owner (Change Proposal) |
| **D – getrennte Anmeldewelten** | zwei Einstiege (Berater/Kunde) + echte Identitätstypen/Föderation, Kontextwechsel, ReBAC | Dok. 19 §7/8/10/11 (Substanz); Front-Door-Form = Erweiterung | **eigenes Auth-WP, Security Review, FINDING-0004** |
| **E – Bewertungs-/Ampel-Tiefe** | echte Reifegrad-/Risiko-/KPI-Ampeln mit Explain Panel/Confidence | erst nach Dok. 09/10 quellentreu (WP-023 ✓ deckt 09/10) | Domain + Concept |

## Owner-Entscheidungen (die zwei, die die Roadmap wirklich verändern)

**A. Trennung Berater/Kunde — welche Form?** → **Owner-Entscheidung: (a).**
- (a) ✅ **Getrennter Einstieg auf EINER Plattform** (getrennte Login-Front-Doors + getrennte
  Identitäten/Sphären/Föderation, gemeinsames Datenmodell). Konzepttreu. **Gewählt.**
- (b) Vollständig getrennte Systeme/Datenplattformen. Konzeptbruch (Dok. 03 „ein gemeinsames
  Datenmodell", Dok. 06 §5.2). Verworfen.

**B. „Cockpit selbst designen" — welcher Umfang zuerst?** → **Owner-Entscheidung: (a).**
- (a) ✅ **Kuratierte Personalisierung** (umsortieren/anheften/Tiefe/gespeicherte Sichten/Modi) —
  konzeptgedeckt, sofort baubar. **Gewählt als Stufe B.**
- (b) Freier Layout-Builder je Konto — berührt 06-O09; **zurückgestellt** (Stufe C, erst nach
  Konzeptentscheidung 06-O09).

## Verhältnis zu bestehenden Entscheidungen

Präzisiert DR-0008 (Ampel-Ehrlichkeitsgrenze am PDF belegt), DR-0009 (Einstieg + Kundenwelt;
Auth-WP), DR-0010 (Varianten-Stopp). Löst DR-0003 (Design minimal) weiter kontrolliert ab.
Neue offene Fragen ins Register: 06-O09 (Personalisierungsumfang), Spannung Dok. 03 §2.1 vs.
Kundenwelt-Kernpfad, 06-O08 (Cross-Tenant-Ansichten für Beratung).
