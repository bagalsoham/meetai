/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This suppresses hydration warnings caused by browser extensions
    suppressHydrationWarning: true,
  },
  // Optional: Clean up the workspace warning too
  outputFileTracingRoot: process.cwd(),
}

module.exports = nextConfig