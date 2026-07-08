// Global inline SVG noise overlay using <feTurbulence>, rendered at 0.05 opacity
// (opacity + mix-blend handled in .noise-overlay). Fixed, above everything,
// non-interactive.
export default function NoiseOverlay() {
  return (
    <svg className="noise-overlay" aria-hidden="true" focusable="false">
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  )
}
