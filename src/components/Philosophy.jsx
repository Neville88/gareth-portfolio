import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMAGES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

// "The Manifesto" — full-width dark band, an organic texture parallaxing behind
// the text at low opacity, and two contrasting statements.
export default function Philosophy() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-manifesto-bg]', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.from('[data-manifesto-line]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="manifesto"
      ref={root}
      className="relative isolate overflow-hidden bg-night py-28 sm:py-40"
    >
      <img
        data-manifesto-bg
        src={IMAGES.philosophy}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-[130%] w-full -translate-y-[10%] object-cover opacity-[0.14]"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/40 to-night" />

      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <p
          data-manifesto-line
          className="mb-12 font-mono text-xs uppercase tracking-[0.35em] text-accent"
        >
          The manifesto
        </p>

        <div className="space-y-10">
          <p
            data-manifesto-line
            className="text-3xl font-medium leading-tight tracking-tight text-light/40 sm:text-5xl"
          >
            Most portfolios focus on:{' '}
            <span className="font-drama italic text-light/55">
              static lists.
            </span>
          </p>

          <p
            data-manifesto-line
            className="text-3xl font-semibold leading-tight tracking-tight text-light sm:text-5xl"
          >
            I focus on: delivery +{' '}
            <span className="font-drama italic text-accent glow-text">
              analytics
            </span>{' '}
            + automation.
          </p>
        </div>
      </div>
    </section>
  )
}
