# Idee: Kundengelieferte Aufgaben/Fristen → Eisenhower-Ranking → Berater-Portfolio-Cockpit

- **Datum:** 2026-07-24 · **Quelle:** Owner (Chat) · **Status:** Idee / Konzept (noch nicht gebaut)
- **Bezug:** löst die Ehrlichkeitslücke „Termine/Dringlichkeit" im Berater-Cockpit (DR-0016 Nachtrag 3,
  Schritt 4) und konkretisiert **E-02 / CCP-008** (Aufgaben · Fristen · Entscheidungen).

## Die Idee (O-Ton verdichtet)
Kunden können **Aufgaben (und Dateien) mit Frist, Dringlichkeit und Wichtigkeit** einreichen. Das
System rankt sie nach der **Eisenhower-Matrix** (wichtig × dringend) und zeigt sie auf dem
**Berater-Cockpit** — je Kunde verarbeitet/sortiert **und** in einer **Gesamt-Rangliste über alle
Kunden hinweg**, sortiert nach Dringlichkeit.

## Warum das wichtig ist (Ehrlichkeit, Regel Null)
Heute gibt es KEINEN Datenträger für „dringend/Termine" → deshalb war das Berater-Cockpit dafür nur
ehrlich über Datenlücken. Mit dieser Idee **liefert der Kunde die Dringlichkeit/Wichtigkeit/Frist
selbst** — das Ranking ist dann eine **offengelegte Ableitung aus echten Eingaben**, kein erfundener
Score. „Nichts nur Show" bleibt gewahrt.

## Datenmodell-Skizze (Contract-Erweiterung → Owner-Gate)
- Neues Objekt **Aufgabe / Task** (E-02-Familie), je Mandant, Felder u. a.:
  `titel`, `beschreibung`, `frist` (Datum), `dringlichkeit` (kundenseitig, z. B. hoch/mittel/niedrig),
  `wichtigkeit` (hoch/niedrig), optional `anhang` (Datei-/Evidence-Bezug), `status`, `owner`,
  `bezug` (verknüpft mit Risiko/Control/Objekt).
- **Eisenhower-Quadrant = abgeleitet** (offengelegte Regel): Q1 „sofort" (wichtig + dringend),
  Q2 „planen" (wichtig + nicht dringend), Q3 „delegieren" (nicht wichtig + dringend), Q4 „später"
  (nicht wichtig + nicht dringend). Dringlichkeit darf zusätzlich aus **Frist-Nähe** verstärkt werden
  (Frist in ≤ N Tagen) — Regel sichtbar, kein verstecktes Gewicht.
- **Sortierung:** primär Eisenhower-Quadrant, sekundär Frist (aufsteigend), tertiär erfasste
  Dringlichkeit.

## Berater-Sicht (Portfolio) — Tenant-Scoping ist Pflicht
- **Kunde** erfasst/sieht NUR die eigenen Aufgaben (Kunden-Sphäre).
- **Berater/Betreiber** aggregiert die Aufgaben **seines Portfolios**: (a) „Gesamt-Rangliste über
  alle Kunden" nach Dringlichkeit/Quadrant, (b) je-Kunde-Gruppierung „bei welchem Kunden brennt es".
  Kein Kunde sieht fremde Aufgaben; die Aggregation ist serverseitig auf das Portfolio des Betreibers
  zu scopen (Cross-Tenant-Schutz).

## Gates / Reihenfolge
1. **Contract/Seed-Erweiterung** (neues Objekt + Felder) = Owner-Gate (E-02/CCP-008). Change Proposal
   + Consistency-Review nötig.
2. **Demo zuerst synthetisch:** Seed-Aufgaben je Mandant (mit Frist/Dringlichkeit/Wichtigkeit),
   read-only Ranking im Cockpit — belegt das Erlebnis, ohne echte Eingabe/Upload.
3. **Echte Kunden-Eingabe + Datei-Upload + Portfolio-Aggregation** brauchen echte Anmeldung/getrennte
   Konten (WP-030) und serverseitige Mandantentrennung/RLS (FINDING-0004) → später, gated.

## Nächster Schritt
Fließt in das **Berater-Portfolio-Cockpit-Konzept** ein (DR-0016 Schritt 4): ich zeige es als
**Entwurf/Mockup** (Eisenhower-Quadranten + Portfolio-Rangliste), bevor gebaut wird.
