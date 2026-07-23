# FINDING-0006 – Domain Gate und QA Gate waren nicht besetzt

- **Severity:** Medium (Prozesslücke; betrifft die fachliche Absicherung einer ISMS-Plattform)
- **Status:** In Behebung — ab WP-017 werden beide Gates besetzt
- **Gefunden:** 2026-07-23, auf Nachfrage des Owners, ob nach Dok. 20B gearbeitet wird
- **Betroffen:** Arbeitszyklus (`docs/project/CONTINUATION_BRIEFING.md` §2), alle Work Packages
  seit WP-011

## Befund

Dok. 20B §36 definiert neun **Quality Gates** der Agentenfirma, risikobasiert anzuwenden. In den
Work Packages WP-011 bis WP-016 wurden faktisch nur vier davon besetzt:

| Gate (Dok. 20B §36) | Owner-Rolle | bisher besetzt? |
|---|---|---|
| Product Gate | `product-user-lead` | ✅ durchgängig |
| Code Quality Gate | `code-reviewer` | ✅ durchgängig |
| Security & Privacy Gate | `product-security-privacy` | ✅ in WP-007, WP-014 |
| UX & Accessibility Gate | `ux-service-design` | ⚠️ inhaltlich vom Product Lead mitgeprüft |
| Documentation Gate | `project-memory` | ⚠️ vom Orchestrator selbst erledigt |
| **Domain Gate** | `isms-domain-lead`, `cyber-threat-lead` | ❌ **nie besetzt** |
| **QA Gate** | `qa-test-engineer` | ❌ **nie besetzt** |
| Architecture Gate | `cto-architecture` | ❌ nie besetzt |
| Release Gate | `github-release-steward` + Mensch | ⚠️ vom Orchestrator erledigt |

Die beiden mit ❌ markierten sind die substanziellen:

1. **Domain Gate.** Die fachliche ISMS-Richtigkeit lief bisher als Nebenprodukt des Product Gates
   mit. Bei einer Informationssicherheits-Plattform ist genau das die falsche Lücke — die
   wertvollsten Funde des Projekts (》„wirksam" liest sich wie ein Prüfergebnis《, 》„kein Nachweis"
   behauptet eine Erwartung, die R15 nicht trägt《) waren **fachliche** Befunde, die zufällig ein
   Produkt-Reviewer gefunden hat.
2. **QA Gate.** Die Tests schrieb jeweils der Builder selbst. Das ist auf Testebene exakt das
   Fehlermuster »Builder reviewt sich selbst« aus Dok. 20B §38 — mit derselben Folge: blinde Flecken
   und Scheinsicherheit. Belegbar geworden in WP-016, wo ein Renderfehler durch alle Buildertests
   fiel, weil `textContent` ihn strukturell nicht sehen kann.

## Gegenmaßnahme

- **Ab WP-017** werden Domain Gate (`isms-domain-lead`) und QA Gate (`qa-test-engineer`) zusätzlich
  zu Code- und Product Gate besetzt.
- Der Arbeitszyklus in `CONTINUATION_BRIEFING.md` §2 nennt die Gate-Auswahl künftig explizit statt
  pauschal „zwei unabhängige Reviews".
- **Architecture Gate** (`cto-architecture`) wird risikobasiert ergänzt: bei Contract-, Modul- oder
  Persistenzänderungen — nicht bei reinen read-only-Ansichten.
- **Release Gate** und **Documentation Gate** bleiben vorerst beim Orchestrator; das ist die
  bewusste Abweichung (Dok. 20B §6 erlaubt Rollenkombination in kleinen Phasen, verbietet sie aber
  ausdrücklich **nicht** für Dokumentation und Release — verboten sind nur Implementierung ↔ finale
  Freigabe, Empfehlung ↔ Assurance, Security-Implementierung ↔ Security-Freigabe).

## Warum es nicht früher auffiel

Der Arbeitszyklus im Briefing schrieb „**zwei** unabhängige Reviews" vor — das wurde erfüllt und
las sich vollständig. Dok. 20B §36 verlangt aber eine **risikobasierte Gate-Matrix**, nicht eine
feste Zahl. Die Vorgabe war also erfüllt und die Norm trotzdem verfehlt.
