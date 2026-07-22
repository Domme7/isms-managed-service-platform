# Hooks

Hooks sind absichtlich noch nicht aktiv konfiguriert. WP-001 prüft die installierte Claude-Code-Version und dokumentiert, welche Lifecycle-Events und blockierenden Hookmechanismen verfügbar sind.

Vorgesehene Guardrails:

- vor Sessionende frisches Handover/Checkpoint prüfen,
- vor destruktiven Bash-Befehlen blockieren,
- vor Commit Secret- und Dateigrößenprüfung,
- nach Tests Ergebnis in Checkpoint übernehmen.

Bis zur Capability-Prüfung werden die Python-Skripte unter `scripts/` manuell oder über CI verwendet.
