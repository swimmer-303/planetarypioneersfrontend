/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

// Allow overriding basePath/assetPrefix for GitHub Pages via env var
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['api.placeholder.com'],
  },
  // Configure basePath and assetPrefix when provided (e.g., "/repo-name").
  // Fallback to relative assetPrefix for static hosting so CSS/JS load correctly.
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {
        assetPrefix: './',
      }),
}

module.exports = nextConfig
