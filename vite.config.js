import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-DNS-Prefetch-Control': 'off',
}

function securityHeadersPlugin() {
  const apply = (_req, res, next) => {
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      res.setHeader(key, value)
    }
    next()
  }

  return {
    name: 'lumen-security-headers',
    configureServer(server) {
      server.middlewares.use(apply)
    },
    configurePreviewServer(server) {
      server.middlewares.use(apply)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'

  return {
    plugins: [react(), tailwindcss(), securityHeadersPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: Number(env.VITE_PORT) || 3000,
      strictPort: true,
      open: false,
      headers: SECURITY_HEADERS,
    },
    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 4173,
      strictPort: true,
      headers: SECURITY_HEADERS,
    },
    build: {
      target: 'es2022',
      sourcemap: !isProd,
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 600,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'react',
                test: /node_modules[\\/](react|react-dom)[\\/]/,
              },
              { name: 'motion', test: /node_modules[\\/]framer-motion[\\/]/ },
              {
                name: 'router',
                test: /node_modules[\\/](react-router|react-router-dom)[\\/]/,
              },
            ],
          },
          ...(isProd
            ? {
              minify: {
                compress: {
                  dropConsole: true,
                  dropDebugger: true,
                },
              },
            }
            : {}),
        },
      },
    },
  }
})
