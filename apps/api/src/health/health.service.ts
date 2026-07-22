export interface HealthStatus {
  status: 'ok';
  service: string;
  phase: string;
  timestamp: string;
}

/**
 * Pure health logic (no framework decorators) so it is trivially unit-testable.
 * The NestJS controller delegates to this function.
 */
export function getHealth(now: Date = new Date()): HealthStatus {
  return {
    status: 'ok',
    service: 'isms-api',
    phase: 'phase-0-skeleton',
    timestamp: now.toISOString(),
  };
}
