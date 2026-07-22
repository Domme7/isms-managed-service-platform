/** Kleine, wiederverwendbare Badge-Primitive (rein präsentational, WP-004). */
import type { ReactNode } from 'react';

type BadgeVariant = 'graph' | 'nograph' | 'family';

export function Badge({ variant, children }: { variant: BadgeVariant; children: ReactNode }) {
  return <span className={`tw-badge tw-badge--${variant}`}>{children}</span>;
}
