# FINDING-0009 – Cross-Tenant-Leak im /services-Leerzustand (seit WP-012)

- **Schwere:** mittel (Demo-Scope, rein synthetische Daten; aber Verstoß gegen die
  Mandantengrenze im gerenderten Produkttext)
- **Status:** **behoben** (Commit `7971bc6`, WP-020 Slice 1) — **Verifikation durch das
  Security-Gate steht aus** (der Builder darf ein Finding nicht selbst schließen,
  Dok. 20B §31.3)
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
`live: true`-Orte ist das mechanisch geschlossen. **Offen:** Bestätigung durch
`product-security-privacy` im WP-020-Review (dann Status → geschlossen).
