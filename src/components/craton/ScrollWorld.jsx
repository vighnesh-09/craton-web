/**
 * Static page wash. Scroll-linked blurs and backdrop-filters were
 * repainting full-viewport layers on every frame.
 */
export default function ScrollWorld() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 12% -8%, var(--scene-a), transparent 42%), radial-gradient(ellipse at 88% 8%, var(--scene-b), transparent 38%), radial-gradient(ellipse at 50% 95%, var(--scene-c), transparent 42%), var(--ink)',
        }}
      />
    </div>
  )
}
