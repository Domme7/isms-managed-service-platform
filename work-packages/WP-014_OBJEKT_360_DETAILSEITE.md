# WP-014 – Objekt-360-Detailseite (read-only)

## Identität
- **Phase:** 1/6-Vorgeschmack auf Phase-1-Basis (Twin-Navigation)
- **Priorität:** P1 (nächster Baustein nach WP-013; macht den Demo-Graphen erstmals durchgängig)
- **Status:** Draft (Aktivierung/Integration durch Orchestrator)
- **Risk Class:** Low (read-only, synthetisch, keine DB/Auth/Kosten)
- **Builder:** Frontend-Engineer (Slice 1 + Slice 2)
- **Reviewer:** Code-Reviewer + Product-User-Lead (read-only)
- **Human Gates:** keiner (read-only, ausschließlich synthetische Daten)
- **Abhängigkeit:** WP-013 (ISMS-Ansicht) muss für die Verlinkung aus der ISMS-Welt vorhanden
  sein; ist sie es nicht, entfällt genau dieser Link – ohne Scope-Ersatz.

## Ziel
Der **Objekt-360-Navigationsvertrag** (Dok. 07 §10, testbar gemacht in §21: „Ein Nutzer kann von
Prozess zu Asset, Risiko, Control, Evidence, Maßnahme, Entscheidung und Service navigieren, ohne
den Kontext zu verlieren") wird als **eine generische, read-only Objekt-Detailseite** eingelöst:

`/twin/[tenantId]/objekt/[objectId]` beantwortet für **jedes** Seed-Objekt die fünf Fragen der
universellen Seitenanatomie (Dok. 06 §6) – gespeist ausschließlich aus dem kanonischen
`ObjectEnvelope` und den Kanten des **einen** Mandanten:

1. **Was ist das?** `object_type` + Objektfamilie (F01–F09), `lifecycle_status`, `classification`,
   `description`, `scope_ids`, `owner_ids` (auf Seed-Objekte aufgelöst), `object_id`.
2. **Warum ist es wichtig?** Klassifikation/Schutzbedarf sowie die **belegten** Bezüge zu Risiken
   und Zielen (`affects`, `threatens`, `exposes`, `mitigates`, `contributes_to`, `requires`) –
   ohne Gewichtung, ohne Score.
3. **Womit hängt es zusammen?** **eingehende und ausgehende** Kanten getrennt, je mit deutschem
   Klartext-Label + kanonischem Typ/R-ID, Richtung, `assertion_kind`, Vertrauensgrad
   (`confidenceQualitative`), Kantenstatus und fachlicher Gültigkeit – **jede Kante verlinkt auf
   die Detailseite des Nachbarobjekts** (navigierbarer Graph).
4. **Wie entwickelt es sich?** Bitemporalität sichtbar: `valid_time` (fachlich gültig) **vs.**
   `record_time` (im System erfasst) als getrennte Achsen, `version`, plus die
   Datenqualitäts-Dimensionen aus `quality_state` (Dok. 07 §12, insbesondere „Bestätigung").
   **Keine erfundene Historie:** der Seed trägt ausschließlich `version: 1`, kein `replaced_at`,
   keine `supersedes`-Kante – das wird als Datenlücke **ausgesprochen**, nicht kaschiert.
5. **Was als Nächstes?** Ausschließlich **belegte** Verweise aus dem Graphen, z. B. eine über
   `remediates`/`mitigates` verknüpfte Maßnahme mit ihrem `lifecycle_status`, ein über
   `covered_by` zuständiger Managed Service, oder die **Beobachtung** „kein Nachweis
   (`evidences`) verknüpft". Formuliert als Beobachtung mit Quelle, **nicht** als Empfehlung.

**Verlinkung (Slice 2):** Twin-Explorer, ISMS-Ansicht und Services-Ansicht verlinken auf diese
Seite. Erst dadurch wird der Demo-Graph durchgängig begehbar statt in Listen zu enden.

## Nicht-Ziele
- **kein Scoring, kein Reifegrad, keine Kritikalitäts-/Confidence-Berechnung, keine Simulation
  und keine Impact-Propagation** – Dok. 09/10 sind ausdrücklich spätere WPs; ein verdichteter
  Vertrauensindikator (Dok. 07 §12/D10) wird **nicht** berechnet,
- **keine erfundenen Empfehlungen, kein Upselling, keine Handlungsvorschläge** – „Was als
  Nächstes?" zeigt nur, was als Objekt/Kante im Seed steht (Dok. 13 MS15, Dok. 10 D10),
- **keine erfundene Historie/Timeline**: fehlende Versions- und Ereignisdaten werden benannt,
  nicht durch synthetische Verläufe ersetzt,
- keine Schreibfunktion, keine Kommentare/Aufgaben/Freigaben am Objekt (Dok. 06 §13 später),
- keine Graphvisualisierung (Dok. 07 D08: Liste ist gleichwertiger Zugang; keine Canvas-/
  Diagrammabhängigkeit),
- keine DB-Anbindung, keine echte Auth/Authz (Rollen-/Mandantensimulation aus WP-011 bleibt reine
  Demo-Perspektive; **kein** Rollen-Gating der Detailseite),
- **keine Seed- oder Contract-Änderung**: fehlt eine fachlich nötige Aussage → OFFENE FRAGE +
  Finding, nicht erfinden.

## Scope

### Slice 1 – Route + View-Helfer + Detailseite (`apps/web`)
**React-freie View-Helfer** (Muster `lib/twin/data.ts` / `lib/services/data.ts` / `lib/isms/data.ts`),
z. B. `lib/twin/object-detail.ts`: reine, deterministische Ableitung eines
`ObjectDetailModel` aus `DEMO_SEED` für **ein** Paar (`tenant_id`, `object_id`) mit den fünf
Abschnitten. Regeln:
- Auflösung **strikt innerhalb eines Mandanten**; ein Objekt, dessen `tenant_id` nicht der Route
  entspricht, gilt als **nicht existent** (kein Sonderfehler, keine Existenzaussage – Dok. 07 §17:
  verdeckte Objekte dürfen nicht über Fehlermeldungen erkennbar werden).
- Kanten werden in **eingehend** (`target_id === objectId`) und **ausgehend**
  (`source_id === objectId`) getrennt; das deutsche Label kommt aus `relationshipTypeLabel`, die
  R-ID aus `relationshipTypeId`, der Vertrauensgrad aus `confidenceQualitative` (alle bereits in
  `lib/twin/data.ts` vorhanden – **wiederverwenden, nicht duplizieren**).
- `owner_ids`/`scope_ids` werden gegen Seed-Objekte desselben Mandanten aufgelöst; nicht
  auflösbare Referenzen fallen sichtbar auf die rohe ID zurück (Fail-loud-Muster aus
  `resolveRelationships`).
- Die Historien-Aussage wird **aus dem Envelope abgeleitet** (`version`, `record_time.replaced_at`,
  vorhandene `supersedes`-Kanten), nicht als konstanter Text hartkodiert.

**Route** `app/(shell)/twin/[tenantId]/objekt/[objectId]/page.tsx` (Server Component, Muster
`app/(shell)/twin/[tenantId]/page.tsx`): `params` als Promise, `generateStaticParams` über alle
(Mandant, Objekt)-Paare des Seeds, `generateMetadata` mit Objektname, `notFound()` für unbekannte
oder mandantenfremde IDs; eigener 404 `app/(shell)/twin/[tenantId]/objekt/not-found.tsx`
(„Objekt nicht gefunden", Rücklink auf die Mandantenseite) analog `twin/not-found.tsx`.

**Darstellung** (`components/twin/ObjectDetailView.tsx` + Abschnittskomponenten): fünf klar
benannte Abschnitte in der Reihenfolge der fünf Fragen, Kontextzeile (Mandant, Objekttyp,
Familie, Datenstand) nach Dok. 06 §6, Zustände nach Dok. 06 §17 – insbesondere **Empty**
(„keine Kante dieses Typs im Demo-Seed") und **Partial data** (Datenlücke mit Quelle/Aktualität
benannt). Deutsche Klartext-Labels, saubere Heading-Hierarchie (h1 Objektname, h2 je Frage),
Tastaturbedienbarkeit, responsive Kernwege, bestehendes CSS-Vokabular (`tw-card`, `tw-meta`,
`tw-quality`) weiterverwenden.

**Tests mit der Funktion**: Vitest-Unit-Tests der Helfer (Trennung ein-/ausgehend, Labels/R-IDs,
Vertrauensgrad, Owner-/Scope-Auflösung, Historien-Ableitung, Tenant-Isolation **inkl.
Negativ-Beweis**: fremde Objekt-ID unter fremdem Mandanten liefert `undefined`) + Render-Tests
der Seite (alle fünf Abschnitte belegt, Nachbar-Links vorhanden und korrekt adressiert,
Empty-/„keine Historie"-Texte).

### Slice 2 – Verlinkung, unabhängiger Review, Browser-QA, Abschluss
Verlinkung der bestehenden Ansichten auf die Detailseite:
`components/twin/ObjectCard.tsx` (Objektname) und `components/twin/RelationshipList.tsx`
(beide Endpunkte), `components/isms/IsmsCards.tsx` (Kartenköpfe + `LinkItems`, `IsmsLink` trägt
bereits `object_id`), `components/services/ServiceCard.tsx` sowie
`components/services/PortfolioOverview.tsx`. Die `tenantId` für den Link stammt bei den
session-gebundenen Ansichten aus dem aktiven Mandanten der Session (WP-011) – niemals aus einem
fremden Mandanten.
Danach: Code-Review (Code-Reviewer) und fachlicher Review (Product-User-Lead) gegen Dok. 07
§10/§21 und Dok. 06 §6/§17; Browser-QA der Kernwege (von Twin-Liste über mehrere Objekte
navigieren und zurück, ISMS-/Services-Einstieg, 404-Wege, responsive, A11y-Stichprobe); Findings
dokumentieren und beheben; Builder ≠ Reviewer; Verified Checkpoint + Statusabschluss.

## Acceptance Criteria
1. Für **jedes** Objekt des Seeds existiert eine Detailseite unter
   `/twin/[tenantId]/objekt/[objectId]`; alle Paare werden statisch generiert
   (`generateStaticParams`) und rendern ohne Laufzeitfehler.
2. Die Seite enthält **fünf** klar benannte Abschnitte entsprechend Dok. 06 §6; jeder Abschnitt
   ist ausschließlich aus dem Envelope bzw. den Seed-Kanten belegt – nichts hartkodiert, nichts
   erfunden.
3. **Was ist das?** zeigt `object_type` + Objektfamilie (F01–F09), `lifecycle_status`,
   `classification` (falls belegt), `description`, `scope_ids` und `owner_ids` (auf
   Seed-Objektnamen aufgelöst; nicht auflösbare Referenz sichtbar als rohe ID).
4. **Womit hängt es zusammen?** listet **eingehende und ausgehende** Kanten getrennt, je mit
   deutschem Klartext-Label, kanonischem Typ + R-ID, `assertion_kind` und – falls vorhanden –
   Vertrauensgrad und Kantenstatus; **jede** Kante ist ein funktionierender Link auf die
   Detailseite des Nachbarobjekts (per Test belegt).
5. **Navigierbarkeit (Dok. 07 §21):** ein Testpfad führt vom Geschäftsprozess über
   Information Asset, Risiko, Control, Evidence und Maßnahme bis zum Managed Service –
   ausschließlich über gerenderte Links, ohne Kontextverlust (Mandant bleibt konstant).
6. **Wie entwickelt es sich?** zeigt `valid_time` und `record_time` als **getrennte** Achsen,
   `version` und die erfassten `quality_state`-Dimensionen; da der Seed keine Vorgängerversion,
   kein `replaced_at` und keine `supersedes`-Kante enthält, wird dies als ehrliche Datenlücke
   ausgegeben („keine Versionshistorie im Demo-Seed") – **aus den Daten abgeleitet**, nicht als
   Konstante, und ohne erfundene Timeline.
7. **Was als Nächstes?** enthält ausschließlich Verweise mit Seed-Beleg (verknüpfte Maßnahme mit
   Status, zuständiger Managed Service, fehlender `evidences`-Bezug als Beobachtung); es
   erscheinen **keine** Empfehlung, kein Score, kein Reifegrad, kein Serviceangebot. Der Abschnitt
   ist ohne Beleg leer mit erklärendem Empty-Text.
8. **Tenant-Isolation im Routing:** eine gültige Objekt-ID unter einem **fremden** Mandanten
   liefert 404 (identisch zur unbekannten ID – keine Existenzaussage, keine abweichende
   Fehlermeldung, keine fremden Daten/Namen im DOM); eine unbekannte Objekt-ID liefert 404;
   beides per Test belegt, inkl. Negativ-Beweis im Helfer.
9. Zustände nach Dok. 06 §17: leere Kanten-/Abschnittslisten mit erklärendem Empty-Text
   (Nutzen + nächster Schritt), Datenlücken sichtbar (Partial data), eigener deutscher 404 mit
   Rücklink.
10. Die bestehenden Ansichten (Twin-Explorer, ISMS, Services) verlinken auf die Detailseite; der
    Link nutzt immer den Mandanten des jeweiligen Objekts.
11. Tests grün (Helfer + Render + Navigationspfad), Monorepo grün (Lint/Typecheck/Test/Build);
    Browser-QA dokumentiert (inkl. 404-Wege und responsive Stichprobe).
12. Unabhängige Reviews dokumentiert (Builder ≠ Reviewer; Code + Product-User-Lead); fachliche
    Lücken als OFFENE FRAGE/Finding markiert statt gefüllt.

## Stop Conditions
- eine der fünf Fragen ist mit dem vorhandenen Seed/Contract **nicht** belegbar (→ OFFENE FRAGE/
  Finding und ehrlicher Leerzustand; **keine** Seed-Erweiterung, keine Erfindung in diesem WP),
- Scope-Drift Richtung Scoring/Reifegrad/Impact-Simulation (Dok. 09/10), Graphvisualisierung,
  Kommentare/Freigaben, Schreibfunktionen, DB oder Auth,
- Bedarf, Objekte über die Mandantengrenze zu verlinken oder aufzulösen (verboten – Dok. 07 P09),
- Konflikt mit parallelen Änderungen an Shell/ISMS-/Services-Ansicht, der nicht sicher
  integrierbar ist.

## Done Evidence
- grüne Tests + CI, DOM/Screenshot-QA (inkl. Navigationspfad und 404), Commit/Push, Checkpoints,
  Review-Notizen, Statusdateien.
