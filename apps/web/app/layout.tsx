import type { ReactNode } from 'react';

export const metadata = {
  title: 'ISMS Managed Service Platform',
  description: 'Phase-0 App-Shell',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  );
}
