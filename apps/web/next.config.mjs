/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Getrenntes Build-Verzeichnis für den QA-Lauf (WP-018 Slice 2, Briefing §7 Lektion 10):
  // `next dev`/`pnpm build` nutzen unverändert `.next`; der QA-Lauf (`pnpm qa:visual`) setzt
  // NEXT_DIST_DIR=.next-qa und kann deshalb bauen, während ein Dev-Server auf `.next` läuft.
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  // Workspace-Pakete werden als CJS-Dist mitgeliefert; Next transpiliert sie mit, damit
  // sowohl `next dev` als auch `next build` (via turbo) sie sauber auflösen (WP-004).
  transpilePackages: ['@isms/demo-seed', '@isms/contracts'],
};

export default nextConfig;
