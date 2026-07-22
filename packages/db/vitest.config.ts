import { defineConfig } from 'vitest/config';

/**
 * PGlite lädt beim ersten Zugriff eine WASM-Postgres-Engine. Das kann den ersten
 * Test/Hook über die Vitest-Default-Timeouts (5s) hinaus verzögern; daher großzügigere
 * Timeouts. Tests laufen deterministisch, in-memory und ohne Docker (ADR-0002).
 */
export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
