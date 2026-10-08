import Script from 'next/script'
import { env } from '@/config/env'
import { site } from '@/config/site'
import { fontVariableClassName } from '@/lib/fonts'
import {
  jsonLdString,
  organizationJsonLd,
  shareImage,
  websiteJsonLd,
} from '@/lib/seo'
import Providers from './providers'
import '@/styles/index.css'

export const metadata = {
  metadataBase: new URL(env.appUrl),
  title: {
    default: `${env.appName} — ${site.tagline}`,
    template: `%s · ${env.appName}`,
  },
  description: site.description,
  authors: [{ name: env.appName }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: env.appUrl,
    siteName: env.appName,
    title: `${env.appName} — ${site.tagline}`,
    description:
      'We invent, protect, and ship AI-enabled products for trust-critical work — from a stable core, across many domains.',
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${env.appName} — ${site.tagline}`,
    description:
      'We invent, protect, and ship AI-enabled products for trust-critical work — from a stable core, across many domains.',
    images: [shareImage.url],
  },
}

/**
 * Netlify inserts a promo comment and a newline into <head> on *.netlify.app.
 * Those nodes are not in the React tree, so hydration throws React #418.
 * This runs from next/script beforeInteractive, before hydrate, then removes
 * itself so the extra executor tag is not left in <head>.
 */
const stripInjectedHeadNodes = `(function(){
  var head = document.head;
  if (!head) return;
  var keep = {"$":1,"/$":1,"$?":1,"$!":1,"$~":1,"&":1,"/&":1," ":1};
  var node = head.firstChild;
  while (node) {
    var next = node.nextSibling;
    var drop = node.nodeType === 8 ? !keep[node.data] : node.nodeType === 3 && !/\\S/.test(node.textContent);
    if (drop) head.removeChild(node);
    node = next;
  }
  var current = document.currentScript;
  if (current && current.parentNode) current.parentNode.removeChild(current);
})();`

export const viewport = {
  themeColor: site.themeColor,
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
}

export default function RootLayout({ children }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()]

  return (
    <html
      lang={site.language}
      className={fontVariableClassName}
      suppressHydrationWarning
    >
      <head>
        <Script id="strip-injected-head" strategy="beforeInteractive">
          {stripInjectedHeadNodes}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
