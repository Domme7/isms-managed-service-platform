/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Workspace-Pakete werden als CJS-Dist mitgeliefert; Next transpiliert sie mit, damit
  // sowohl `next dev` als auch `next build` (via turbo) sie sauber auflösen (WP-004).
  transpilePackages: ['@isms/demo-seed', '@isms/contracts'],
};

export default nextConfig;
