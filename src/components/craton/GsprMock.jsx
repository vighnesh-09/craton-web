import { motion } from 'framer-motion'

const rows = [
  {
    req: 'GSPR 1 · Performance and safety',
    status: 'ok',
    label: 'Covered',
    evidence: 'CER-04 · RMF-02',
  },
  {
    req: 'GSPR 3 · Risk management system',
    status: 'gap',
    label: 'Gap',
    evidence: 'RMF-02 · partial',
  },
  {
    req: 'GSPR 10.4 · Substances (CMR / ED)',
    status: 'crit',
    label: 'Critical gap',
    evidence: 'No evidence linked',
  },
  {
    req: 'GSPR 23.4 · Instructions for use',
    status: 'gap',
    label: 'Gap',
    evidence: 'IFU-01 · rev. pending',
  },
]

const badge = {
  ok: 'bg-success/15 text-success',
  gap: 'bg-accent/15 text-accent',
  crit: 'bg-danger/20 text-danger',
}

export default function GsprMock({ className = '' }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-ink-3 to-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.75)] ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="pointer-events-none absolute inset-0 noise opacity-[0.04]" />
      <div className="flex items-center justify-between border-b border-line px-5 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span className="flex items-center gap-2 text-cream/90">
          <span className="size-1.5 rounded-full bg-accent" />
          GSPR gap assessment
        </span>
        <span>Illustrative view</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 p-4 sm:p-5">
        {[
          ['GSPR gaps', '7', 'of 23'],
          ['Critical gaps', '2', ''],
          ['Evidence docs', '41', 'mapped'],
        ].map(([label, value, sub]) => (
          <div
            key={label}
            className="rounded-lg border border-line bg-white/[0.03] px-3 py-3"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              {label}
            </p>
            <p className="mt-1.5 font-mono text-xl tracking-tight text-cream sm:text-2xl">
              {value}
              {sub ? (
                <span className="ml-1 text-xs text-muted">{sub}</span>
              ) : null}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto px-4 pb-4 sm:px-5 sm:pb-5">
        <table className="w-full min-w-[420px] border-collapse text-left text-[12.5px]">
          <thead>
            <tr className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              <th className="pb-2 font-medium">Requirement</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Evidence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={3}
                className="border-t border-line py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
              >
                Chapter I · General requirements
              </td>
            </tr>
            {rows.map((row) => (
              <tr key={row.req} className="border-t border-line/70">
                <td className="py-2.5 pr-3 text-cream/90">{row.req}</td>
                <td className="py-2.5 pr-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${badge[row.status]}`}
                  >
                    {row.label}
                  </span>
                </td>
                <td className="py-2.5 font-mono text-[11px] text-muted">
                  {row.evidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className="flex flex-wrap justify-between gap-2 border-t border-line px-5 py-3.5 text-[11px] text-muted">
        <span>Expert review remains central</span>
        <span>Rule + evidence traceability on every row</span>
      </figcaption>
    </motion.figure>
  )
}
