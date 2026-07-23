# DR-0011 – Produktsprache ohne „synthetisch/Demo/Simulation"-Disclaimer

- Typ: Product / UX
- Status: **Accepted**
- Datum: 2026-07-23
- Decision Owner: **Human Product Owner** („nimm alle Hinweise auf synthetische Daten raus –
  alle, die die App bedienen, wissen das; wir brauchen das nirgendwo, nimm das überall raus")
- Betroffen: alle nutzersichtbaren Texte in `apps/web`, Login, Kontextleiste, Kacheln,
  Leerzustände, Seitentitel; die zugehörigen Tests und die qa:visual-Motive

## Entscheidung

Die **nutzersichtbaren Meta-Disclaimer**, die das Produkt als synthetisch/Demo/Simulation
kennzeichnen, werden **überall aus der Produktoberfläche entfernt**. Wer die App bedient, weiß,
dass es ein Aufbaustand ist — der Hinweis ist Rauschen und lenkt vom Inhalt ab.

Konkret entfernt (Produkttext, nicht Code-Kommentare):
- „Anmelden – Simulation", „Demo — simulierte Anmeldung, keine echte Sicherheit", der
  Login-Disclaimer,
- „(Simulation)" in Überschriften/Zuständen (z. B. „Nicht angemeldet (Simulation)"),
- „synthetischer Demo-Datenbestand", „im Demo-Datenbestand", „Demo-Mandant", „Demo-Seed" und
  vergleichbare Formulierungen in Leads, Scopes, Ermittlungsregeln, Leerzuständen,
- „Simulation"-Beschriftungen an Rollen-/Mandantenwechsel, soweit sie nur die Demo-Natur
  benennen.

## Was ausdrücklich BLEIBT (die wichtige Grenze — keine stille Miterledigung)

1. **Die Datenehrlichkeit** (Kern der Produktverfassung, Dok. 08 08-D07, DR-0008): Aussagen
   darüber, was ein **Wert bedeutet**, bleiben unverändert — „Lebenszyklus-Stand, kein
   Prüfergebnis", „Wirkungsannahme (nicht nachgewiesen)", „Ampel beruht auf einem erfassten
   Zustand", „x von y" mit Ermittlungsregel, benannte Datenlücken. Das ist **nicht** ein
   Synthetik-Hinweis, sondern die Aussage über Herkunft und Belastbarkeit der Daten — sie ist
   das Herz des Produkts und wird nie entfernt.
2. **Die Mandantengrenze und ihre Sichtbarkeit** (Dok. 06 CROSS-TENANT-SCHUTZ, FINDING-0009):
   „nur der aktive Mandant", der angekündigte Kontextwechsel, die Wächter — alles bleibt. Es
   geht um Kontext, nicht um Demo-Kennzeichnung.
3. **Die Repository-Regel „nur synthetische Daten"** (`CLAUDE.md`, `.claude/rules/demo-data.md`):
   **unverändert in Kraft.** Diese DR ändert die **Anzeige**, nicht die Datenpolitik — es werden
   weiterhin ausschließlich synthetische, keine realen Kundendaten verwendet. „Hinweis raus" ≠
   „echte Daten rein".

## Bezug zur echten Authentisierung

Der Login-„Simulation"-Hinweis entfällt auch deshalb, weil die getrennten echten
Anmeldewelten (Berater vs. Kunde, Dok. 19 „Identitäts-Lifecycle"/„Authentisierung") die
nächste Richtung sind (eigene Owner-Direktive vom selben Tag → eigenes Konzept/DR). Bis die
echte Auth steht, bleibt die Anmeldung technisch eine Auswahl der Perspektive — sie wird nur
**nicht mehr als „Simulation ohne Sicherheit" beschriftet**. Sicherheits-Nettozustand: Die
clientseitige Rollen-/Mandantenwahl ist weiterhin **keine** serverseitige Zugriffsgrenze; das
härtet erst das Auth-WP nach Dok. 19 (FINDING-0004-Umfeld). Diese Restrisiko-Notiz lebt ab
jetzt in der Doku, nicht mehr im UI.

## Umsetzung

Eigener Umsetzungs-Slice (nutzersichtbare Strings + Tests, die diese Strings festnageln, +
qa:visual-Neulauf). Gate: Product + Konzepttreue (Datenehrlichkeit darf nicht miterodieren) +
QA (kein Wächter wird abgeschwächt). Die Prozessvokabular-/Ehrlichkeits-Wächter bleiben scharf;
ein neuer Wächter kann sicherstellen, dass die entfernten Demo-Begriffe nicht zurückkehren.
