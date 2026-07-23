# DR-0013 – Antwort-Modus statt Rechtfertigungs-Modus (Usability-Reframe)

- Typ: Product / UX
- Status: **Accepted**
- Datum: 2026-07-23
- Decision Owner: **Human Product Owner** („lass einen sehr kritischen Usability-Agenten drüber
  laufen, mit der Firma beraten, dann ein Konzept und Anpassung")
- Grundlage: kritischer Usability-Audit aus vier Fachperspektiven (ux-service-design,
  product-critic, isms-domain-lead, product-user-lead), belegt an 14 echten UI-Screenshots.
  Alle vier Linsen kamen unabhängig zur selben Kerndiagnose.

## Kerndiagnose (Konsens aller vier Linsen)

Das **Fundament ist stark** — fragegeführte Seiten, ehrliche „x von y"-Abdeckung mit sichtbarem
Nenner statt erfundener Prozente, konsequente Trennung „erfasst" vs. „geprüft/bewertet",
durchgängige Kontextleiste, Objekt-360 als menschliche Fragekette. Das ist GRC-Handwerk, das viele
Marktprodukte **nicht** beherrschen (O-Ton isms-domain-lead).

**Aber die Präsentation sabotiert die Substanz:** Das Produkt ist im **Rechtfertigungs-Modus**.
Jede Seite öffnet mit einer Wand aus Erklärung, Vorbehalt und Selbstzweifel, bevor ein einziger
Statuswert erscheint. Mehrere Seiten **verneinen ihre eigene Überschrift** („Welche Entscheidung
ist jetzt erforderlich?" → „Diese Frage beantwortet die Seite heute nicht"). Ein CISO schließt so
eine App nach 30 Sekunden wieder („die entschuldigt sich für sich selbst"); ein Anfänger hält das
halbleere Gerüst für kaputt.

**Zielbild: Antwort-Modus.** Jede Seite führt mit dem, was sie **kann** (Zahlen, Stände,
Abdeckungen); Lücken sind **eine ruhige, nachgeordnete Zeile**, keine Wand. Das ist **kein**
Bruch mit „Ehrlichkeit vor Wirkung" — es ist deren konzepttreue Ausführung: Dok. 06 P06 „**Die
erste Ebene bleibt ruhig**", DR-0008 „**nicht absolut übertrieben**". Souverän statt entschuldigend.

## Die Grenze — was BLEIBT (Substanz), was sich ÄNDERT (Präsentation)

**BLEIBT (die Ehrlichkeits-Substanz, nie entfernt):** Trennung erfasst/geprüft (08-D07); „x von y"
mit Nenner; keine erfundenen Scores/Ampeln; ehrliche Leerzustände; benannte Datenlücken;
Mandantengrenze. Die Datenehrlichkeit **wird einmal pro Seite ruhig gesagt**, nicht in jeder Kachel
wiederholt.

**ÄNDERT sich (die Präsentation):**

1. **Antwort zuerst, Lücke zuletzt.** Über der Falz stehen Status/Zahlen, nicht Meta-Text. Die
   Leitfrage jeder Seite ist die, die die Seite **heute beantwortet** — nie eine aspirative Frage,
   die im nächsten Satz zurückgenommen wird. „Entscheidungen" heißt **Entscheidungsregister** und
   listet sofort; „Heute" führt mit „Stand von <Mandant>".
2. **Kein internes Vokabular im UI.** Weg: „Dok. 07 §9 R15", Feldnamen (`delivered_by`,
   `owner_ids`, `confidence`), Muster-/Familiencodes (F01, R12, SO02, MS01), Scope-IDs. Beziehungen
   in Domänensprache: „mitigates/R12" → **„wird gemindert durch"**, „evidences/R15" → **„ist
   belegt durch"**, „delivered_by" → **„erbracht durch das Managed-Service-Team"**. (Deckt und
   erweitert die Jargon-Seite von DR-0011.)
3. **Kachel-Boilerplate raus.** Scope + Datenstand **einmal** je Dashboard in der Kontextleiste,
   nicht 9× pro Kachel. Kachel = Frage + Zahl/Balken + Badge + Drill-down. „Ermittlungsregel"
   hinter ein dezentes Info-Element. Zahl groß, Kontext klein — Hierarchie umkehren.
4. **Kontextleiste zeigt Belegtes, nicht Abwesenheit.** Nur die 2–3 orientierenden, belegten
   Felder (Mandant · Datenstand · Rolle) in einer schmalen Zeile; leere Felder werden **nicht als
   „nicht erfasst" ausgestellt**; das „Warum nicht erfasst?"-Disclosure entfällt.
5. **Rollenfokus ohne Beipackzettel.** Die Rollen-Personalisierung sortiert **still** um; höchstens
   **ein** Nutzen-Satz („Für die Executive-Sicht zuerst: Risiko-Minderung"). Weg: „im Konzept
   normiert", „ohne Träger", „gegenstandslos", „Betonung" — Design-Theorie gehört in die Doku.
6. **Detailtiefe als kompakter Umschalter** (Überblick · Details · Rohdaten) oben rechts, ohne
   Erklärabsatz und ohne localStorage-/Datenschutz-Prosa (still speichern).
7. **Badge-Sprache präzise.** „vollständig belegt" → **„alle x tragen die Beziehung"** bzw.
   „ohne Datenlücke"; „Lücke erfasst" → **„Datenlücke: y−x ohne Beziehung"**. Bei kleiner
   Grundgesamtheit (n≤2) kein Erfolgs-Badge/Vollbalken — die absolute Kleinheit sichtbar machen.
8. **„wirksam"-Widerspruch auflösen.** Der Lebenszyklus-Stand „wirksam" widerspricht dem
   „keine bewertete Wirksamkeit"-Text auf derselben Seite → am Wort kennzeichnen, dass es ein
   **erfasster Stand** ist (kein Wirksamkeitsurteil), oder Stand umbenennen (Concept/Seed-Frage).
9. **Ein Leitbegriff je Konzept.** Nav „Kunden" → Seite „Digital Twin Explorer" → „Mandanten" →
   „Zwilling" ist Wildwuchs. Festlegen: **„Mandant"** für die Organisation, **„Digitaler
   Zwilling"** für den Objektgraph; durchgängig deutsch; Nav-Label = Seitentitel.
10. **Leerer Mandant = sofort sichtbarer Leerzustand** über der Falz, nicht das volle Gerüst
    eines befüllten Mandanten.
11. **Sphäre an Rolle koppeln (DR-0012):** Kundenrollen (R01–R06) sehen **kein**
    Mandanten-Portfolio, sondern starten im eigenen Ein-Unternehmens-Cockpit; die Multi-Mandanten-
    Sicht ist Betreiber-/Berater-Rollen vorbehalten. (Der Audit fand R01/Executive in einer
    Portfolio-Sicht — ein echter Sphären-Logik-Fehler.)
12. **Header ehrlich (Übergang bis echte Auth):** „Abmelden" ohne Login → „Ansicht zurücksetzen";
    Dropdowns als **„Ansicht: Rolle / Mandant"**; Rollencodes („R01 · …") ausblenden.

## Wächter-Implikation (wichtig, nicht still)

Der Prozessvokabular- und der Bewertungsvokabular-Wächter bleiben **scharf**. Aber die
Ehrlichkeits-Negationen („kein Prüfergebnis", „wird nicht behauptet") werden **von jeder Kachel
auf einen ruhigen Seitenhinweis** verlagert — das ist eine **Präsentations-**, keine
Regeländerung. Wo ein Wächter bisher die Wiederholung der Negation erzwang, wird er
**regel-erhaltend** darauf umgestellt, die Aussage **einmal je Seite** zu verlangen (nicht je
Kachel). Kein Wächter wird abgeschwächt; die Datenehrlichkeit bleibt testbar.

## Umsetzung

**Konsolidierter Umbau** (WP-028, erweitert): Antwort-Modus + Sprachbereinigung (DR-0011) in
**einem** koordinierten Durchgang, weil beide denselben app-weiten Text berühren. Slices nach
Wirkung: (1) `/heute` Antwort-Modus + Kontextleiste + Kachel-Dedup, (2) Jargon/Referenzen
app-weit in Domänensprache, (3) Rollenfokus + Detailtiefe + Badges, (4) `/entscheidungen`- und
`/isms`-Köpfe, (5) Sphäre-Rolle-Kopplung + Navigations-Vokabular + Header. Gates: Product +
Konzepttreue (Substanz darf nicht erodieren) + QA (Wächter regel-erhaltend). Owner-Abnahme am
Varianten-Stopp (die Cockpit-Varianten zeigen dann den Antwort-Modus).

## Verhältnis zu bestehenden Entscheidungen

Führt DR-0008 („nicht übertrieben") und die WP-020-Product-Findings (Entschuldigungs-Wand, Jargon
— dort als Owner-Stellschrauben markiert) konsequent zu Ende. Konzeptanker: Dok. 06 P06/P04, §18
(Text+Symbol+Farbe), DR-0008. Bestätigt die Substanz von „Ehrlichkeit vor Wirkung"
(`CLAUDE.md`) und ändert nur deren **Dosierung in der Oberfläche**.
