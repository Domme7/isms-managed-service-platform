export default function Home() {
  return (
    <main style={{ padding: '3rem 1.5rem', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>ISMS Managed Service Platform</h1>
      <p style={{ color: '#555' }}>Phase-0 App-Shell — Grundgerüst läuft. Noch keine Produktfeatures.</p>
      <ul style={{ color: '#555', lineHeight: 1.8 }}>
        <li>Web: Next.js (App Router) · Port 3000</li>
        <li>
          API-Health: <code>http://localhost:3001/health</code>
        </li>
      </ul>
      <p style={{ color: '#888', fontSize: '0.9rem' }}>
        Stack laut ADR-0001 · WP-002 · siehe <code>docs/architecture/adr/ADR-0001</code>.
      </p>
    </main>
  );
}
