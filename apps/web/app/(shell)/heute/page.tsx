/**
 * `/heute` – Standard-Startpunkt (Dok. 06 06-D02). Rollenabhängige Rahmung via `HeuteView`.
 */
import { HeuteView } from '../../../components/shell/HeuteView';

export const metadata = {
  title: 'Heute – ISMS Managed Service Platform',
};

export default function HeutePage() {
  return <HeuteView />;
}
