# DR-0009 – Strategischer Einstieg vor Rollenwahl + Kundenwelt wird Kernpfad

- Typ: Product / UX / Roadmap
- Status: **Accepted**
- Datum: 2026-07-23
- Decision Owner: **Human Product Owner** (Steuerung nach Live-Ansicht; „mach das klar für den
  weiteren Aufbau, ich will, dass das umgesetzt wird — ändere, was du dafür ändern musst")
- Betroffen: Einstiegsfluss (`/login`, `/heute`), WP-020, WP-006 (Kundenwelt), WP-021,
  Dok. 06/14/16, langfristig Dok. 19 (echte Auth)

## Owner-Anforderung (sinngemäß vollständig)

1. **Einstieg:** Nach dem Login zuerst die **strategische Main-Ebene als Dashboard** sehen —
   neutral, ohne dass vorher eine Rolle gewählt werden muss. Die Rolle wählt man **danach, bereits
   eingeloggt**; erst dann personalisieren sich Dashboard und Rest.
2. **Kundenwelt:** „Vom Kunden gibt es noch gefühlt gar nichts." Der Kunde soll sich **anmelden**
   können und von seiner Seite aus **alles verwalten**, Services **dazubuchen** und **Strukturen**
   bekommen, **die ihm beim Aufbau helfen**.

## Entscheidung 1 — Einstiegsfluss: strategisch zuerst, Rolle danach

Neuer Fluss: **Anmelden (Mandant) → strategisches Main-Dashboard (Ebene 1, neutral) →
Rollenwahl in der App (optional, jederzeit) → Personalisierung** von Verdichtung, Reihenfolge
und Fokus.

- Das fügt sich in das Ebenenmodell (Dok. 06 §6.2): **Ebene 1 ist für alle strategisch**, die
  Rolle verändert Betonung und Ausblendung (Mission-Control-Rollenvarianten), nicht die Wahrheit.
- **Abweichung vom bisherigen Bau, benannt:** Bisher erzwingt `/login` die Rollenwahl **vor** dem
  Einstieg. Dok. 06 (06-D02) nennt „Heute" als rollenabhängigen Standard-Startpunkt — der neue
  Fluss präzisiert das: der Startpunkt bleibt „Heute", aber seine **Ebene 1 ist rollenneutral
  strategisch**, Personalisierung ist Verfeinerung statt Voraussetzung. Keine stille Auflösung:
  falls die Konzeptpflege das anders sieht → Change Proposal; bis dahin gilt die Owner-Ansage.
- **Zukunftssicher für echte Auth (Dok. 19):** In Produktion kommt die Rolle aus dem Konto, nicht
  aus freier Wahl. Der Fluss überlebt das: Konto → neutrale Ebene 1 → rollenbedingte
  Personalisierung automatisch. Die freie Rollenwahl bleibt Demo-Eigenschaft.
- **Umsetzung:** Teil von **WP-020** (Verdichtungs-Umbau) — die neutrale Ebene 1 ist ohnehin
  dessen Kern; dazu Rollenwahl-Umzug von `/login` in die App (Topbar/Erstbesuchs-Hinweis).

## Entscheidung 2 — Kundenwelt wird priorisierter Kernpfad

Der Kunde bekommt seinen vollständigen Pfad. **Das Konzept trägt ihn bereits fast komplett:**

| Owner-Wunsch | Konzeptanker (vorhanden) |
|---|---|
| „sich anmelden können" | Kundenrollen R03–R06 (Dok. 03); Demo-Accounts (Dok. 03 §13.1, kommen mit WP-021); Identität/Rollen/Zugriff (Dok. 16 §8); echte Auth: Dok. 19 |
| „von seiner Seite alles verwalten" | Customer Workspace (Dok. 05/06), Scope Governance (Dok. 16 §9), Zielprofile (Dok. 16 §12) |
| „Services dazubuchen" | **Dok. 14**: Servicefamilien + vollständiger Katalog (§5), Service-Tiefen (§6), Paketarchitektur (§7), Preisverfassung (§9); Aktivierungs-Gate aus Dok. 04 J05 (produktiv erst nach Freigabe) |
| „Strukturen, die beim Aufbau helfen" | **Dok. 16**: Onboarding Charter (§6), Firmenanlage (§7), Scope Discovery (§9), Strategie-DNA (§11), Zielprofile (§12); Anfängererlebnis (Dok. 03 §10.1: „Neue Nutzer sehen keine leere Plattform, sondern … geführte Aufgaben") |

**Umsetzungspfad (ehrlich gestuft — „Buchen" ist die erste Schreibfunktion des Produkts):**

1. **WP-006 (neu geschnitten, nach WP-021):** Kundenwelt Stufe 1 — Servicekatalog ansehen
   (Dok. 14 §5–§7 aus dem Seed), geführtes Onboarding/Zielprofil als **Struktur-Assistent**
   (Dok. 16, read + geführte Demo-Flows), Kunden-Startseite „verwalten" (eigene Scopes, Ziele,
   Services, Nachweise an einem Ort).
2. **Stufe 2 — Buchung:** Buchungs-/Aktivierungsfluss mit Human Gate (Dok. 04 J05: Simulation vor
   produktiver Aktivierung; Dok. 05 „keine Verkaufsfalle": immer Alternativen inkl. interner
   Umsetzung). **Echte Persistenz erst nach FINDING-0004 (RLS)** — davor als geführter Demo-Fluss
   ohne Speicherung, klar gekennzeichnet.
3. **Echter Kundenlogin** (Passwort, Konten): eigenes Auth-WP nach Dok. 19 — nicht Demo-Simulation.

**Voraussetzung WP-021 (Demo-Welt) bleibt davor:** die fünf Konzept-Unternehmen und die neun
benannten Demo-Accounts (darunter Kundenrollen) sind die Datengrundlage der Kundenwelt; ohne sie
würde der Kundenpfad wieder auf erfundenen Mandanten stehen.

## Neue offene Fragen (Register)

- **O-KUNDE-01:** Der Seed-Guardrail-Test verbietet derzeit **jede** Währungs-/Preisangabe.
  Dok. 14 §9 definiert aber eine Preisverfassung, und die Demo-Welt (Dok. 05 §12) sagt „alle
  Werte, Namen, **Preise** … als Beispiele gekennzeichnet". Für den Katalog mit Buchung muss der
  Guardrail von „keine Preise" auf „nur synthetische, gekennzeichnete Preise, keine realen
  PwC-Preise" umgestellt werden → Entscheidung im WP-021/WP-006-Schnitt.
- **O-KUNDE-02:** Echter Kundenlogin = echte Authentisierung → Dok. 19, eigenes WP mit Security
  Review; bis dahin bleibt jeder „Login" Simulation und wird als solche beschriftet.

## Reihenfolge (aktualisiert)

**WP-020** Verdichtung + Dashboard-Schicht + neuer Einstiegsfluss → **WP-021** Demo-Welt
(inkl. Bewertungsdaten und Demo-Accounts) → **WP-006** Kundenwelt Stufe 1 → Buchung (Stufe 2,
Gates beachten) → parallel WP-025 Design-Exploration. Der Owner nimmt jede Stufe per Screenshot
ab („das ist jetzt okay", DR-0008).
