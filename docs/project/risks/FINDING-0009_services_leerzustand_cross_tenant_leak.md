# FINDING-0009 – Cross-Tenant-Leak im /services-Leerzustand (seit WP-012)

- **Schwere:** mittel (Demo-Scope, rein synthetische Daten; aber Verstoß gegen die
  Mandantengrenze im gerenderten Produkttext)
- **Status:** **GESCHLOSSEN** (2026-07-23) — vom Security-Gate in der **zweiten Reviewrunde**
  bestätigt (unabhängig, Builder ≠ Reviewer, Dok. 20B §31.3). Behebung über zwei Commits:
  `7971bc6` (WP-020 Slice 1, /services-Leerzustand) und `4a195a9` (WP-020 Fix-Pass,
  `TenantDetailView`/`EmptyGraphState` + Meta-Assertion).
- **Gefunden:** 2026-07-23 beim Kontextleisten-Umbau (WP-020 Slice 1)

## Befund

Der Leerzustand der Seite `/services` enthielt seit WP-012 eine Existenzaussage über fremde
Mandanten: „Services laufen derzeit für Nordwerk Manufacturing SE und Consulting Operator
Demo; weitere Mandanten folgen …" — sichtbar für jeden Mandanten ohne eigene Services
(Finovia, MediCore). Das verletzt die Mandantengrenze (Dok. 07, Abschnitt „Mandantenfähigkeit,
Rechte und Datenschutz" / P09) und ist die **dritte** unabhängig entstandene Instanz der
Leerzustands-Leak-Klasse (zuvor WP-013 `/isms`, WP-017 `/entscheidungen` — Briefing §7
Lektion 12). Ein bestehender Test hatte den Defektwortlaut zusätzlich festgeschrieben
(Briefing §7 Lektion 11).

## Behebung

Leerzustand mandantenlokal formuliert (Muster `/isms`); der festnagelnde Test mit Begründung
umgebaut; `/services` in den Wächter `components/__tests__/leerzustand-mandantengrenze.test.tsx`
aufgenommen (Meta-Assertion verhindert stilles Veralten).

## Lehre / offener Rest

Der Wächter deckte bis WP-020 nur die dort eingetragenen Orte ab — die Klasse entstand
dreimal, bevor der jeweilige Ort eingetragen war. Mit der Meta-Assertion gegen die
`live: true`-Orte ist das mechanisch geschlossen. Bestätigung durch `product-security-privacy`
liegt vor (zweite Reviewrunde, siehe Abschluss unten) — Status **geschlossen**.

## Abschluss 2026-07-23 (Security-Gate, zweite Runde)

**Vierte Instanz derselben Leak-Klasse — im Fix-Pass gefunden und behoben:** Die
`kunden`-Mandanten-Detailseite (`TenantDetailView`) nannte im Leerzustand fremde Mandanten
**und verlinkte auf deren Detailseiten** (arguably gravierender als der /services-Text). Der
Fix-Pass (`4a195a9`) hat sie auf einen mandantenlokalen `EmptyGraphState` umgestellt (nennt nur
den aktiven Mandanten, verlinkt auf die legitime `/twin`-Portfolio-Übersicht) und `kunden` in den
FREMDER_MANDANT-Scan aufgenommen. Klassen-Historie damit: WP-013 `/isms`, WP-017
`/entscheidungen`, WP-012/WP-020-Slice-1 `/services`, **WP-020-Fix-Pass `TenantDetailView`**.

**Mechanischer Klassenschutz jetzt real** (in Runde 1 war er nur behauptet): Der Wächter
`leerzustand-mandantengrenze.test.tsx` hat eine **Meta-Assertion gegen die `live:true`-Orte**
(`NAV_PLACES`) — ein neuer echter Ort macht ihn rot, bis er eingetragen ist. Zusätzlich fangen
drei neue Muster die Zähl-/„weitere/übrige Mandanten"-Formulierungen (mit Fixture-Negativbeweis:
alle zehn Muster feuern, keine der vier legitimen mandantenlokalen Sätze), und eine exhaustive
`display_name`/`tenant_id`-Prüfung gegen jeden fremden Mandanten ist die zweite
Verteidigungslinie. Damit ist die Fehlerklasse nicht nur punktuell behoben, sondern mechanisch
gegen Wiederkehr gesichert.
