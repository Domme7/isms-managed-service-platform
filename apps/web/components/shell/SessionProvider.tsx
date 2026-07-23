'use client';

/**
 * Client-Context der simulierten Rollen-/Mandanten-Auswahl (WP-011).
 *
 * Hält die Auswahl im State und spiegelt sie nach `localStorage` (Persistenz über Reloads).
 * KEINE Auth, KEINE Session, KEINE Sicherheitsgrenze – reine Demo-Perspektive
 * (`.claude/rules/security.md`, Dok. 19). Der Provider sitzt im Root-Layout, damit auch
 * `/` und `/login` (außerhalb der Shell-Gruppe) die Auswahl lesen/setzen können.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  SESSION_STORAGE_KEY,
  parseSession,
  resolveSession,
  serializeSession,
  type DemoSession,
  type ResolvedSession,
} from '../../lib/shell/session';

interface SessionContextValue {
  /** Rohe Auswahl (Mandant + optionale Rolle) oder `null`, wenn nicht "angemeldet". */
  readonly session: DemoSession | null;
  /** Aufgelöste Auswahl (oder `null`); `resolved.role === null` ist der neutrale Zustand. */
  readonly resolved: ResolvedSession | null;
  /** `true`, sobald `localStorage` einmal gelesen wurde (verhindert Flackern/SSR-Mismatch). */
  readonly hydrated: boolean;
  /**
   * Mandant + optionale Rolle setzen ("anmelden"/wechseln). `roleId: null` = neutraler
   * Zustand (DR-0009: Rollenwahl ist optional und lebt in der App).
   */
  readonly signIn: (roleId: string | null, tenantId: string) => void;
  /** Auswahl verwerfen ("abmelden"). */
  readonly signOut: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  // Server und erster Client-Render starten identisch mit `null` (kein Hydration-Mismatch);
  // der echte Wert wird erst nach dem Mount aus localStorage gelesen.
  const [session, setSession] = useState<DemoSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setSession(parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY)));
    } catch {
      setSession(null);
    }
    setHydrated(true);
  }, []);

  const signIn = useCallback((roleId: string | null, tenantId: string) => {
    const next: DemoSession = roleId !== null ? { roleId, tenantId } : { tenantId };
    // Defensiv (WP-011 Code-Review-Nit): nur setzen, wenn die Auswahl real auflösbar ist
    // (Mandant bekannt; eine GESETZTE Rolle bekannt – neutral ist immer auflösbar).
    if (!resolveSession(next)) return;
    setSession(next);
    try {
      window.localStorage.setItem(SESSION_STORAGE_KEY, serializeSession(next));
    } catch {
      // Speicher nicht verfügbar (z. B. privater Modus) – Auswahl bleibt nur im State.
    }
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    try {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // ignorieren
    }
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({ session, resolved: resolveSession(session), hydrated, signIn, signOut }),
    [session, hydrated, signIn, signOut],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/** Zugriff auf die simulierte Auswahl. Muss innerhalb von `SessionProvider` verwendet werden. */
export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession muss innerhalb von <SessionProvider> verwendet werden.');
  }
  return ctx;
}
