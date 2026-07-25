# DR-0019 – Ein-Produkt-Fokus im Bestand: kein Neuanfang, Firmen/Portfolio/Cockpit bleiben

- Typ: Product / Kurs (groß) · Status: **Accepted (Owner, 2026-07-25)** · Decision Owner: **Human Product Owner**
- Baut auf DR-0018 (zwei Welten, ausblenden statt löschen, Go-Live-Posture) und ersetzt dessen
  Stufenliste durch die neue Master-To-do-Liste (unten). Maßstab-Dokument:
  `docs/project/PRODUKTBESCHREIBUNG_NEUSTART_2026-07-25.md`.

## O-Ton (verdichtet)
„Software auf EIN Produkt runterkürzen: Der Kunde verwaltet in der Anwendung alle Daten seines
ISMS; wir erkennen z. B. Gaps und helfen, nötige Dokumente ausfindig zu machen; wenn er es dazubucht,
schreiben wir die Dokumente oder sorgen dafür, dass sie automatisch aktuell bleiben. Jedes Dokument,
das der Kunde anlegt, bekommt DREI Tags: eine Frist (auch wiederkehrend wählbar), eine Prio
(wichtig / mittelwichtig / eher unwichtig) und einen Verwaltungsstempel (wir kümmern uns / ich
kümmere mich selbst / nur warnen, wenn etwas nicht stimmt). — Kein Neuanfang: die Firmen behalten,
Portfolio und Cockpit behalten."

## Entscheidung
1. **Kein Greenfield.** Weiterbau im bestehenden Monorepo. Explizit bleiben: die **fünf
   Kundenfirmen** (inkl. laufender GreenGrid-Befüllung), das **Portfolio-Dashboard** (Ranking,
   Heatmap, Eisenhower-Umschalter) und das **Bento-Cockpit** mit Drilldown in den Zwilling.
2. **Ein-Produkt-Fokus:** Das sichtbare Produkt ist die Kunde-Welt „Mein ISMS" (Dashboard · Ablage ·
   Services) plus die Betreiber-Sicht (Portfolio → Cockpit → Zwilling). Alle übrigen Bereiche werden
   aus der Sicht genommen — ausblenden statt löschen (DR-0018 Nr. 3 gilt fort).
3. **Drei Tags als ECHTE Kundeneingabe** (Kursöffnung gegenüber dem bisherigen E-02-Verbot,
   ausdrücklich Owner-gewollt):
   - **Frist:** Fälligkeitsdatum; Wiederholung einmalig / monatlich / quartalsweise / halbjährlich / jährlich.
   - **Prio:** wichtig / mittelwichtig / eher unwichtig.
   - **Verwaltungsstempel:** „Wir kümmern uns" / „Ich kümmere mich selbst" / „Nur warnen".
   - Die vorhandene Ableitung (Eisenhower-Engine) bleibt als **Vorschlag** (übernehmen oder
     überschreiben) — sie erfindet weiterhin nichts.
   - **Persistenz-Grenze (ehrlich dokumentiert):** Bis Backend/DB angebunden sind (FINDING-0004,
     WP-030), werden Kunden-Tags **gerätelokal** gespeichert (localStorage je Mandant+Objekt).
     Der Seed-/Contract-Riegel (`tags_custom_fields` bleibt im Seed leer, Guard in `seed.spec.ts`)
     bleibt UNVERÄNDERT bestehen — Kunden-Tags leben in einer eigenen Client-Schicht, nicht im
     ausgelieferten Datenbestand. Die echte Contract-/DB-Persistenz ist der erste Schritt nach dem
     Backend-Gate.
4. **Gap-Erkennung + buchbare Betreuung** sind Kernfunktionen des Produkts (Lücken-Sätze aus dem
   echten Bestand; „Schreibt mir dieses Dokument" / „Haltet es aktuell" als bestätigte Anfrage;
   sichtbarer Status „in Betreuung durch uns"; Stempel-Kopplung).
5. **Wächter-Pass:** Guard-Tests, die alte Texte/Strukturen festnageln (Ehrlichkeits-Etiketten,
   Acht-Orte-Vokabular), werden EINMAL systematisch auf das neue Zielbild umgestellt statt bei jedem
   Schritt einzeln bekämpft. Die Daten-Ehrlichkeit (berechnet statt erfunden, Nenner, Lücken zeigen)
   bleibt in voller Härte getestet.

## Master-To-do (Reihenfolge)
1. Drei-Tags-Modell (Datenmodell + gerätelokale Persistenz + Vorschlags-Übernahme).
2. Meine Ablage voll interaktiv (anlegen, kategorisieren, taggen, filtern, Fälligkeitssicht).
3. Gap-Erkennung mit Handlungsangebot.
4. Buchen aus Lücke/Dokument (Anfrage + Bestätigung + Betreuungsstatus).
5. Warn-Logik („Nur warnen"-Objekte) im Kunden-Dashboard.
6. Kunden-Dashboard fokussieren (Fälligkeiten/Warnungen/Lücken/Betreuung; keine Berater-Kacheln).
7. Wächter-Pass + Sicht-Schnitt + Hedge-Etiketten raus + GreenGrid fertig + Endabnahme.

QS-Basis: `docs/project/reviews/QS_DR-0018_SOLL_IST_2026-07-25.md` (Findings F-01…F-10 werden durch
diese Liste abgeräumt oder gehen in ihr auf).
