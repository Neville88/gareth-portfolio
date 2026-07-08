import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { PRICING_STATEMENT } from '../data/content'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

// "Get Started" — no fixed prices, so a single large CTA plus the quoting
// statement (verbatim) stands in for the membership/pricing area.
export default function GetStarted({ onOpenModal }) {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-start]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="start"
      ref={root}
      className="relative z-20 mx-auto max-w-5xl bg-night px-6 py-28 text-center sm:px-10 sm:py-40"
    >
      <p
        data-start
        className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-accent"
      >
        Get started
      </p>
      <h2
        data-start
        className="text-balance text-4xl font-bold leading-[1.02] tracking-tight text-light sm:text-6xl lg:text-7xl"
      >
        Bring the problem.{' '}
        <span className="font-drama italic text-accent glow-text">
          Leave with a system.
        </span>
      </h2>

      <p
        data-start
        className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.02] px-7 py-6 text-base leading-relaxed text-light/60 sm:text-lg"
      >
        {PRICING_STATEMENT}
      </p>

      <div data-start className="mt-10">
        <MagneticButton
          onClick={onOpenModal}
          fillClassName="bg-light"
          className="rounded-[1.8rem] bg-accent px-9 py-5 text-base font-semibold text-night glow-accent transition-colors duration-500 ease-magnetic sm:text-lg"
        >
          Request the portfolio deck
          <ArrowUpRight size={19} strokeWidth={2.4} />
        </MagneticButton>
      </div>
    </section>
  )
}
