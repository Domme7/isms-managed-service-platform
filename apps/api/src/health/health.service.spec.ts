import { describe, it, expect } from 'vitest';
import { getHealth } from './health.service';

describe('getHealth', () => {
  it('returns an ok status with service metadata', () => {
    const result = getHealth(new Date('2026-07-22T00:00:00.000Z'));
    expect(result.status).toBe('ok');
    expect(result.service).toBe('isms-api');
    expect(result.phase).toBe('phase-0-skeleton');
    expect(result.timestamp).toBe('2026-07-22T00:00:00.000Z');
  });

  it('uses the current time by default', () => {
    const before = Date.now();
    const ts = Date.parse(getHealth().timestamp);
    expect(ts).toBeGreaterThanOrEqual(before);
  });
});
