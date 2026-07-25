# DR-0018 – Großer Umbau: durchklickbares Produkt, zwei Welten, „go live"

- Typ: Product / UX / IA (groß) · Status: **Accepted (Owner-Richtung, 2026-07-25)** · Decision Owner: **Human Product Owner**
- Baut auf DR-0017 (Drill-only IA), DR-0012 (Sphären Kunde/Betreiber), DR-0015 (Kursentscheidungen), DR-0011 (keine „Demo"-Etiketten).

## O-Ton (verdichtet)
„Gründlicher Umbau. Nichts löschen, aber Nicht-Struktur-Teile ausblenden. Landing mit Produktinfo + Login
(Berater & Kunde). Kunde-Welt: Ablage/Ordnerstruktur zum Ablegen & Kategorisieren, ein Dashboard für sein
ISMS, eine Seite mit buchbaren Services. Berater startet auf dem Portfolio (bleibt) → Eintauchen in den
Kunden → Cockpit (bleibt) → Zwilling. Nach Login soll man auf dem Portfolio landen und sich durchklicken,
nicht URLs tippen. **Die Demodaten sollen nicht mehr als Demo erscheinen — wie echte Daten, kein Unterschied.
Wir gehen live; ich will das Produkt so vorstellen, wie es sein kann.** Alle Kundendaten behalten und mit
Priorität + Frist durchtaggen.“

## Entscheidung
1. **Einstieg = Landing** (öffentlich, Produktinfo) → Login → **zwei Welten** (DR-0012):
   - **Berater-Welt:** Portfolio-Dashboard (BLEIBT wie gebaut) → Eintauchen Kunde → **Cockpit** (BLEIBT) → Zwilling.
   - **Kunde-Welt (neu):** Mein Dashboard (sein Mandanten-Cockpit) · **Meine Ablage** (Ordner/Kategorien für Dokumente) · **Services buchen** (Servicekatalog).
2. **Nach Login landet man in seiner Welt** (Berater→Portfolio, Kunde→Kunde-Welt); Durchklicken statt URL-Tippen.
3. **Ausblenden statt löschen:** die heutigen 8 Bereiche + Objekt-360 bleiben im Code und tiefer-per-Klick
   erreichbar; die Navigation läuft neu über die Welt-Struktur. **Alle Kundendaten bleiben.**
4. **GO-LIVE-PRÄSENTATION (materielle Kursänderung, bewusst benannt):** Das UI zeigt das Produkt „wie es sein
   kann" — **keine sichtbaren „Demo/synthetisch/illustrativ/Vorschau/abgeleiteter Vorschlag"-Etiketten mehr**.
   Die synthetischen Daten präsentieren als das, was sie darstellen (Firmen lesen sich wie echte Kunden).
5. **Was die Ehrlichkeit weiterhin garantiert (DR-0008 auf DATEN-Ebene bleibt):** Zahlen/Ampeln/Ableitungen
   werden weiter aus echten Feldern **berechnet**, nicht frei erfunden. Es wird **nichts Falsches erzeugt** —
   nur die erklärenden Caveats wandern aus dem UI in die **Doku/Codekommentare** (die Wahrheit bleibt
   auffindbar, sie steht nur nicht mehr auf dem Produktschirm).

## Ehrlichkeits-Gates (bleiben technisch Schale; Wahrheit hier dokumentiert)
- **Echte Anmeldung / getrennte Konten (WP-030):** heute Profil-Auswahl (simuliert). In der Live-Vorführung
  funktioniert der Login **in der Sitzung**, ohne echten Auth-Server.
- **Datei-Ablage/Upload-Persistenz (FINDING-0004/DB):** Kunde-Ablage arbeitet **in der Sitzung** (kein
  serverseitiger Speicher). Synthetische Startordner/-dokumente.
- **Kunden-Aufgaben/Fristen (E-02):** die Priorisierung wird weiterhin **aus dem Datenzustand abgeleitet**
  (offengelegte Regel im Code); echte Kunden-Eingabe folgt mit E-02. Der `tags_custom_fields`-Riegel bleibt.

**Verantwortung (einmalig benannt):** Bei einer Live-Vorführung vor echten Stakeholdern sind die drei Gates
funktional noch Schalen. Der Owner steuert die Vorführung bewusst; die Plattform erzeugt keine falschen
Daten, macht aber (auf Owner-Wunsch) die noch-nicht-echten Fähigkeiten nicht mehr im UI kenntlich.

## Umsetzung (staged, nie kaputt — nichts löschen)
- **Stufe 1:** Landing poliert (Produktinfo + zwei Login-Einstiege), Caveat-Etiketten raus. ← Start
- **Stufe 2:** Einstiegsfluss verdrahten (Login → Welt), Nicht-Struktur ausblenden, Durchklick-Kette.
- **Stufe 3:** Kunde-Welt (Mein Dashboard · Meine Ablage/Ordner · Services buchen).
- **Stufe 4:** Prio/Frist auf allen Kundendaten sichtbar; „go-live"-Politur (verbliebene Caveats raus).
- Jede Stufe: bauen → verifizieren → committen; alle Kundendaten bleiben.
