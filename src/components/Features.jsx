import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Boxes,
  LayoutDashboard,
  Rocket,
  MousePointer2,
  Radio,
  Workflow,
  Check,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

/* ------------------------------------------------------------------ */
/* Card 1 — Diagnostic Shuffler                                        */
/* 3 overlapping cards cycling every 3s via array.unshift(array.pop()) */
/* ------------------------------------------------------------------ */
const SHUFFLE_CARDS = [
  {
    id: 'arch',
    label: 'Architecture → Backend',
    meta: 'system design · APIs · data models',
    Icon: Boxes,
  },
  {
    id: 'ux',
    label: 'UX → Admin tooling',
    meta: 'dashboards · internal tools · flows',
    Icon: LayoutDashboard,
  },
  {
    id: 'ship',
    label: 'Production-ready delivery',
    meta: 'testing · deploy · monitoring',
    Icon: Rocket,
  },
]

function DiagnosticShuffler() {
  const [stack, setStack] = useState(SHUFFLE_CARDS)

  useEffect(() => {
    const id = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-56">
      {stack.map((card, i) => {
        const { Icon } = card
        const isBack = i === stack.length - 1
        return (
          <div
            key={card.id}
            className="absolute inset-x-0 top-0 rounded-[1.6rem] border border-white/10 bg-surface/90 p-5 backdrop-blur-sm"
            style={{
              transform: `translateY(${i * 18}px) scale(${1 - i * 0.06})`,
              zIndex: stack.length - i,
              opacity: isBack ? 0.55 : 1,
              transition: `transform 0.7s ${SPRING}, opacity 0.7s ease`,
              boxShadow:
                i === 0 ? '0 24px 60px -30px rgba(123,97,255,0.6)' : 'none',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] bg-accent/15 text-accent">
                <Icon size={18} />
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-light/40">
                0{stack.length - i}
              </span>
            </div>
            <p className="mt-4 text-lg font-semibold leading-tight text-light">
              {card.label}
            </p>
            <p className="mt-1 font-mono text-xs text-light/45">{card.meta}</p>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Card 2 — Telemetry Typewriter                                       */
/* ------------------------------------------------------------------ */
const FEED_MESSAGES = [
  'KPIs + charting (Chart.js)',
  'CSV ETL + aggregation workflows',
  'Insights that drive decisions',
]

function TelemetryTypewriter() {
  const [display, setDisplay] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [log, setLog] = useState([])

  useEffect(() => {
    const full = FEED_MESSAGES[msgIdx]
    let char = 0
    let typeTimer
    let holdTimer

    const type = () => {
      setDisplay(full.slice(0, char))
      if (char <= full.length) {
        char += 1
        typeTimer = setTimeout(type, 52)
      } else {
        holdTimer = setTimeout(() => {
          setLog((prev) => [full, ...prev].slice(0, 3))
          setMsgIdx((m) => (m + 1) % FEED_MESSAGES.length)
        }, 1600)
      }
    }
    type()

    return () => {
      clearTimeout(typeTimer)
      clearTimeout(holdTimer)
    }
  }, [msgIdx])

  return (
    <div className="flex h-56 flex-col rounded-[1.6rem] border border-white/10 bg-black/40 p-5 font-mono">
      <div className="mb-4 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-light/50">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 pulse-dot" />
        </span>
        Live Feed
      </div>

      <div className="flex flex-1 flex-col justify-end gap-1.5 text-sm">
        {log.slice().reverse().map((line, i) => (
          <p key={`${line}-${i}`} className="truncate text-light/30">
            <span className="text-accent/50">›</span> {line}
          </p>
        ))}
        <p className="text-light/90">
          <span className="text-accent">›</span> {display}
          <span className="cursor-blink ml-0.5 inline-block h-4 w-[0.55rem] translate-y-0.5 bg-accent" />
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Card 3 — Cursor Protocol Scheduler                                  */
/* ------------------------------------------------------------------ */
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const TARGET_DAY = 3 // Wednesday

function CursorProtocolScheduler() {
  const containerRef = useRef(null)
  const cursorRef = useRef(null)
  const cellRefs = useRef([])
  const deckRef = useRef(null)
  const [activeDay, setActiveDay] = useState(null)
  const [deckPressed, setDeckPressed] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      let tl

      const build = () => {
        if (!containerRef.current || !cellRefs.current[TARGET_DAY]) return
        const cont = containerRef.current.getBoundingClientRect()
        const cell = cellRefs.current[TARGET_DAY].getBoundingClientRect()
        const deck = deckRef.current.getBoundingClientRect()

        const cx = cell.left - cont.left + cell.width / 2 - 4
        const cy = cell.top - cont.top + cell.height / 2 - 2
        const dx = deck.left - cont.left + deck.width / 2 - 4
        const dy = deck.top - cont.top + deck.height / 2 - 2

        tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
        tl.set(cursorRef.current, { x: 14, y: 10, opacity: 0, scale: 1 })
          .call(() => {
            setActiveDay(null)
            setDeckPressed(false)
          })
          .to(cursorRef.current, { opacity: 1, duration: 0.3 })
          .to(cursorRef.current, {
            x: cx,
            y: cy,
            duration: 1.1,
            ease: 'power3.out',
          })
          .to(cursorRef.current, {
            scale: 0.9,
            duration: 0.14,
            ease: 'power2.inOut',
          })
          .call(() => setActiveDay(TARGET_DAY))
          .to(cursorRef.current, { scale: 1, duration: 0.22, ease: 'power2.inOut' })
          .to(cursorRef.current, {
            x: dx,
            y: dy,
            duration: 1.1,
            delay: 0.45,
            ease: 'power3.out',
          })
          .to(cursorRef.current, { scale: 0.9, duration: 0.14 })
          .call(() => setDeckPressed(true))
          .to(cursorRef.current, { scale: 1, duration: 0.22 })
          .to(cursorRef.current, { opacity: 0, duration: 0.4, delay: 0.35 })
      }

      build()

      const ro = new ResizeObserver(() => {
        if (tl) tl.kill()
        build()
      })
      if (containerRef.current) ro.observe(containerRef.current)

      // returned cleanup runs on ctx.revert()
      return () => ro.disconnect()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-56 select-none">
      <div className="grid grid-cols-7 gap-1.5">
        {DAYS.map((d, i) => (
          <div
            key={i}
            ref={(el) => (cellRefs.current[i] = el)}
            className={`flex aspect-square items-center justify-center rounded-[0.8rem] border text-xs font-medium transition-all duration-300 ${
              activeDay === i
                ? 'border-accent bg-accent text-night glow-accent'
                : 'border-white/10 bg-surface/60 text-light/55'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {['APIs + webhooks', 'Role-based access', 'WhatsApp Cloud API navigation'].map(
          (t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[0.65rem] text-light/55"
            >
              {t}
            </span>
          )
        )}
      </div>

      <div className="mt-5 flex justify-start">
        <button
          ref={deckRef}
          type="button"
          className={`rounded-[1.1rem] border px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
            deckPressed
              ? 'border-accent bg-accent text-night'
              : 'border-white/15 bg-surface/60 text-light/70'
          }`}
        >
          Request deck
        </button>
      </div>

      {/* animated SVG cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-20 drop-shadow-[0_0_10px_rgba(123,97,255,0.7)]"
        style={{ opacity: 0 }}
      >
        <MousePointer2
          size={22}
          className="fill-light text-accent"
          strokeWidth={1.5}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section wrapper                                                     */
/* ------------------------------------------------------------------ */
const CARDS = [
  {
    tag: 'Full-Stack Development',
    title: 'Full-stack, end to end',
    copy: 'I design and build the whole product — frontend, backend, database, and the deploy — so one person is accountable from idea to production.',
    points: [
      'React / Node / Express web apps',
      'API & database design',
      'Admin tooling + production deploys',
    ],
    Icon: Boxes,
    Artifact: DiagnosticShuffler,
  },
  {
    tag: 'Data Analytics & Dashboards',
    title: 'Analytics that talk',
    copy: 'I turn raw data into dashboards and reports that actually drive decisions — charting, ETL, and aggregation built right into the product.',
    points: [
      'KPI dashboards & charting (Chart.js)',
      'CSV ETL & aggregation pipelines',
      'Reporting & insight generation',
    ],
    Icon: Radio,
    Artifact: TelemetryTypewriter,
  },
  {
    tag: 'Automation & Integrations',
    title: 'Automation on rails',
    copy: 'I connect your tools and automate the busywork — from webhooks and role-based access to full WhatsApp Cloud API workflows.',
    points: [
      'APIs, webhooks & integrations',
      'Role-based access control',
      'WhatsApp Cloud API automation',
    ],
    Icon: Workflow,
    Artifact: CursorProtocolScheduler,
  },
]

export default function Features() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-feature-head]', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-feature-head]', start: 'top 85%' },
      })
      gsap.from('[data-feature-card]', {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '[data-feature-grid]', start: 'top 78%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="artifacts"
      ref={root}
      className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-20"
    >
      <div data-feature-head className="mb-14 max-w-2xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-accent">
          What I do
        </p>
        <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-light sm:text-5xl">
          Whatever you&rsquo;re building,{' '}
          <span className="font-drama italic text-accent">one builder</span>{' '}
          end to end.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-light/55">
          Full-stack development, data analytics, automation, and whatever your
          build needs next — shown as live instruments you can interact with,
          not static screenshots.
        </p>
      </div>

      <div
        data-feature-grid
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {CARDS.map(({ tag, title, copy, points, Icon, Artifact }) => (
          <article
            data-feature-card
            key={tag}
            className="group flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-accent/30"
          >
            <div className="mb-5">
              <Artifact />
            </div>
            <div className="mt-auto">
              <div className="mb-2 flex items-center gap-2 text-accent">
                <Icon size={15} />
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em]">
                  {tag}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-light">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-light/55">
                {copy}
              </p>
              <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                {points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-light/70"
                  >
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-accent"
                      strokeWidth={2.5}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
