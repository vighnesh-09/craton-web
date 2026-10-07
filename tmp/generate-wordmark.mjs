import { createRequire } from 'module'
import fs from 'fs'

const require = createRequire(import.meta.url)
const fontkit = require('fontkit')

// Same family/weight as logo (Syne / font-semibold)
const file =
  'node_modules/@fontsource/syne/files/syne-latin-600-normal.woff2'
const font = fontkit.openSync(file)

const text = 'craton'
const run = font.layout(text)

let x = 0
let minX = Infinity
let minY = Infinity
let maxX = -Infinity
let maxY = -Infinity
let combined = ''

run.glyphs.forEach((glyph, i) => {
  const p = glyph.path
  for (const c of p.commands) {
    const a = c.args
    const pts = []
    if (c.command === 'moveTo' || c.command === 'lineTo') pts.push([a[0], a[1]])
    else if (c.command === 'quadraticCurveTo') pts.push([a[0], a[1]], [a[2], a[3]])
    else if (c.command === 'bezierCurveTo')
      pts.push([a[0], a[1]], [a[2], a[3]], [a[4], a[5]])

    for (const [px, py] of pts) {
      minX = Math.min(minX, px + x)
      maxX = Math.max(maxX, px + x)
      minY = Math.min(minY, py)
      maxY = Math.max(maxY, py)
    }

    if (c.command === 'moveTo')
      combined += `M${+(a[0] + x).toFixed(2)} ${+a[1].toFixed(2)}`
    else if (c.command === 'lineTo')
      combined += `L${+(a[0] + x).toFixed(2)} ${+a[1].toFixed(2)}`
    else if (c.command === 'quadraticCurveTo')
      combined += `Q${+(a[0] + x).toFixed(2)} ${+a[1].toFixed(2)} ${+(a[2] + x).toFixed(2)} ${+a[3].toFixed(2)}`
    else if (c.command === 'bezierCurveTo')
      combined += `C${+(a[0] + x).toFixed(2)} ${+a[1].toFixed(2)} ${+(a[2] + x).toFixed(2)} ${+a[3].toFixed(2)} ${+(a[4] + x).toFixed(2)} ${+a[5].toFixed(2)}`
    else if (c.command === 'closePath') combined += 'Z'
  }
  x += run.positions[i].xAdvance
})

const w = maxX - minX
const h = maxY - minY
const vbW = 1640
const vbH = 380
// Nearly full-bleed like Hebbia
const unitScale = Math.min((vbW * 0.995) / w, (vbH * 0.92) / h)
const pathW = w * unitScale
const pathH = h * unitScale
const tx = (vbW - pathW) / 2 - minX * unitScale
const flippedTop = -maxY * unitScale
const ty = (vbH - pathH) / 2 - flippedTop

const component = `/**
 * Full-bleed footer wordmark (Hebbia-scale).
 * Syne 600 = logo font. nonzero fill avoids evenodd “cut” seams.
 * Gradient: top fades out, bottom stays visible.
 */
export default function FooterWordmark({ className = '' }) {
  return (
    <div
      className={\`block w-full \${className}\`}
      role="img"
      aria-label="Craton"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${vbW}"
        height="${vbH}"
        fill="none"
        viewBox="0 0 ${vbW} ${vbH}"
        aria-hidden="true"
        className="block h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="craton-footer-wordmark"
            x1="${vbW / 2}"
            x2="${vbW / 2}"
            y1="0"
            y2="${vbH}"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--hero-soft)" stopOpacity="0" />
            <stop offset="0.55" stopColor="var(--hero-soft)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--hero-soft)" />
          </linearGradient>
        </defs>
        <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${unitScale.toFixed(6)} ${(-unitScale).toFixed(6)})">
          <path
            fill="url(#craton-footer-wordmark)"
            fillOpacity="0.2"
            fillRule="nonzero"
            d="${combined}"
          />
        </g>
      </svg>
    </div>
  )
}
`

fs.writeFileSync('src/components/ui/FooterWordmark.jsx', component)
console.log({ font: font.fullName, w, h, unitScale, tx, ty })
