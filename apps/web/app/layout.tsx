import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'ISMS Managed Service Platform',
  description: 'Phase-1 Digital Twin Explorer (read-only)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
