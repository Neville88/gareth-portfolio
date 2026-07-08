import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { PROTOCOL_STEPS, IMAGES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/* ---- SVG art #1: rotating concentric circles ---- */
function ConcentricMotif() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-ring-cw]', {
        rotate: 360,
        transformOrigin: '50% 50%',
        duration: 18,
        ease: 'none',
        repeat: -1,
      })
      gsap.to('[data-ring-ccw]', {
        rotate: -360,
        transformOrigin: '50% 50%',
        duration: 26,
        ease: 'none',
        repeat: -1,
      })
      gsap.to('[data-ring-pulse]', {
        scale: 1.12,
        transformOrigin: '50% 50%',
        duration: 2.4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="h-full w-full">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#7B61FF" strokeOpacity="0.15" strokeWidth="1" />
      <g data-ring-cw>
        <circle cx="100" cy="100" r="74" fill="none" stroke="#7B61FF" strokeWidth="1.5" strokeDasharray="4 10" strokeOpacity="0.55" />
        <circle cx="100" cy="26" r="3" fill="#7B61FF" />
      </g>
      <g data-ring-ccw>
        <circle cx="100" cy="100" r="54" fill="none" stroke="#F0EFF4" strokeWidth="1" strokeDasharray="1 8" strokeOpacity="0.35" />
        <circle cx="46" cy="100" r="2.5" fill="#F0EFF4" fillOpacity="0.7" />
      </g>
      <g data-ring-pulse>
        <circle cx="100" cy="100" r="30" fill="none" stroke="#7B61FF" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="100" cy="100" r="6" fill="#7B61FF" />
      </g>
    </svg>
  )
}

/* ---- SVG art #2: laser line scanning across a dot grid ---- */
function LaserGridScan() {
  const ref = useRef(null)
  const dots = []
  const cols = 9
  const rows = 9
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ x: 20 + c * 20, y: 20 + r * 20, key: `${r}-${c}` })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-laser]',
        { attr: { x: 6 } },
        {
          attr: { x: 186 },
          duration: 2.6,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        }
      )
      gsap.to('[data-laser-glow]', {
        opacity: 0.85,
        duration: 1.1,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="h-full w-full">
      {dots.map((d) => (
        <circle key={d.key} cx={d.x} cy={d.y} r="1.6" fill="#F0EFF4" fillOpacity="0.22" />
      ))}
      <defs>
        <linearGradient id="laserGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7B61FF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#7B61FF" stopOpacity="1" />
          <stop offset="1" stopColor="#7B61FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect data-laser-glow x="0" y="10" width="16" height="180" fill="#7B61FF" fillOpacity="0.25" style={{ mixBlendMode: 'screen' }}>
        <animate attributeName="x" values="0;178;0" dur="2.6s" repeatCount="indefinite" />
      </rect>
      <rect data-laser x="6" y="10" width="2.5" height="180" fill="url(#laserGrad)" />
    </svg>
  )
}

/* ---- SVG art #3: pulsing EKG waveform via stroke-dashoffset ---- */
function EkgWaveform() {
  const ref = useRef(null)
  const pathRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.3 })
        .to(path, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' })
        .to(path, { strokeDashoffset: -len, duration: 2, ease: 'power2.inOut' })

      gsap.to('[data-ekg-blip]', {
        scale: 1.5,
        opacity: 0.2,
        transformOrigin: '50% 50%',
        duration: 1,
        ease: 'power2.out',
        repeat: -1,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="h-full w-full">
      <line x1="0" y1="100" x2="200" y2="100" stroke="#F0EFF4" strokeOpacity="0.08" />
      <path
        ref={pathRef}
        d="M0 100 H50 L60 100 L70 60 L80 140 L92 100 H120 L130 100 L140 70 L150 130 L160 100 H200"
        fill="none"
        stroke="#7B61FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_6px_rgba(123,97,255,0.8)]"
      />
      <circle data-ekg-blip cx="80" cy="140" r="4" fill="#7B61FF" />
    </svg>
  )
}

const ART = [ConcentricMotif, LaserGridScan, EkgWaveform]
const STEP_IMAGES = [IMAGES.protocol1, IMAGES.protocol2, IMAGES.protocol3]

export default function Protocol() {
  const root = useRef(null)

  useEffect(() => {
    // Prevents pin jumps when mobile browser chrome (URL bar) resizes the viewport.
    ScrollTrigger.config({ ignoreMobileResize: true })

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      const spacer = root.current?.querySelector('.protocol-spacer')

      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          // Last card needs extra scroll distance so the pin releases before
          // Get Started / footer content slides in underneath it on mobile.
          end: isLast && spacer ? () => `+=${spacer.offsetHeight}` : undefined,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        })

        // underneath cards scale down, blur, and fade as the next enters
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            filter: 'blur(20px)',
            opacity: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          })
        }
      })

      ScrollTrigger.refresh()
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="protocol" ref={root} className="relative">
      {PROTOCOL_STEPS.map((s, i) => {
        const Art = ART[i]
        return (
          <div
            key={s.step}
            className="protocol-card relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-night"
            style={{ zIndex: i + 1 }}
          >
            <img
              src={STEP_IMAGES[i]}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-night via-night/90 to-night/70" />
            <div className="absolute inset-3 rounded-[2rem] border border-white/10 sm:inset-8 sm:rounded-[3rem]" />

            <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-7 px-6 sm:gap-10 sm:px-14 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1">
                <div className="mb-3 flex items-center gap-3 sm:mb-6 sm:gap-4">
                  <span className="font-drama text-5xl italic text-accent glow-text sm:text-7xl">
                    {s.step}
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-light/40 sm:text-xs">
                    Protocol step
                  </span>
                </div>
                <h3 className="text-balance text-2xl font-bold leading-[1.1] tracking-tight text-light sm:text-5xl">
                  {s.title}
                </h3>
                <div className="mt-3 space-y-2 max-w-xl sm:mt-6 sm:space-y-3">
                  {s.lines.map((line, li) => (
                    <p
                      key={li}
                      className="text-sm leading-relaxed text-light/60 sm:text-lg"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="lift mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 px-3.5 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-accent hover:bg-accent/10 sm:mt-8 sm:px-4 sm:text-xs"
                >
                  {s.tag}
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="order-1 mx-auto aspect-square w-32 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm sm:w-full sm:max-w-sm sm:rounded-[2.5rem] sm:p-12 lg:order-2">
                <Art />
              </div>
            </div>
          </div>
        )
      })}
      {/* Scroll runway so the last pinned card can release before Get Started */}
      <div className="protocol-spacer h-[100dvh] w-full shrink-0" aria-hidden="true" />
    </section>
  )
}
