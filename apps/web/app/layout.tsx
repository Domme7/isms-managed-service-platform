import type { ReactNode } from 'react';
import './globals.css';
import { SessionProvider } from '../components/shell/SessionProvider';

export const metadata = {
  title: 'ISMS Managed Service Platform',
  description: 'Mandantenfähige Plattform für kontinuierliches Informationssicherheitsmanagement',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // SessionProvider im Root, damit auch `/` und `/login` (außerhalb der Shell-Gruppe)
  // die simulierte Rollen-/Mandanten-Auswahl lesen und setzen können.
  return (
    <html lang="de">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
