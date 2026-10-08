import os from 'node:os'

/** Non-loopback IPv4 addresses on this machine, so LAN access works after the IP changes. */
function lanDevOrigins() {
  const hosts = new Set()

  for (const entries of Object.values(os.networkInterfaces())) {
    for (const entry of entries ?? []) {
      const isIpv4 = entry.family === 'IPv4' || entry.family === 4
      if (isIpv4 && !entry.internal) hosts.add(entry.address)
    }
  }

  return [...hosts]
}

const devOrigins = lanDevOrigins()

if (process.env.NODE_ENV !== 'production' && devOrigins.length > 0) {
  console.log(`[dev] allowedDevOrigins: ${devOrigins.join(', ')}`)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  allowedDevOrigins: devOrigins,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
        ],
      },
    ]
  },
}

export default nextConfig
