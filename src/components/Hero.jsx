import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { IMAGES, PURPOSE } from '../data/content'
import MagneticButton from './MagneticButton'

// "The Opening Shot" — full-bleed hero image, heavy accent-to-black gradient,
// content anchored to the bottom-left third. Text + CTA fade up on load.
export default function Hero({ onOpenModal }) {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1 },
        delay: 0.15,
      })
      tl.from('[data-hero-fade]', {
        y: 40,
        opacity: 0,
        filter: 'blur(8px)',
        stagger: 0.08,
      })
        .from(
          '[data-hero-scroll]',
          { y: 16, opacity: 0, duration: 0.8 },
          '-=0.4'
        )
      // slow ambient drift on the backdrop
      gsap.to('[data-hero-img]', {
        scale: 1.08,
        duration: 18,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={root}
      className="relative flex h-[100dvh] w-full items-end overflow-hidden"
    >
      <img
        data-hero-img
        src={IMAGES.hero}
        alt="Bioluminescent surf glowing across dark water"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* heavy primary-to-black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/85 to-night/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/25 via-night/40 to-transparent mix-blend-multiply" />

      <div className="relative z-10 w-full px-6 pb-16 sm:px-10 sm:pb-24 lg:px-20">
        <div className="max-w-2xl">
          <p
            data-hero-fade
            className="mb-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent sm:text-xs sm:tracking-[0.35em]"
          >
            Full-stack · Analytics · Automation
          </p>

          <h1 className="text-balance font-sans text-[3rem] font-extrabold leading-[0.95] tracking-tight text-light sm:text-6xl lg:text-8xl">
            <span data-hero-fade className="block">
              Software is the
            </span>
            <span
              data-hero-fade
              className="block font-drama text-[3.6rem] font-normal italic text-accent glow-text sm:text-7xl lg:text-[9rem]"
            >
              Signal.
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-lg text-base leading-relaxed text-light/70 sm:text-lg"
          >
            {PURPOSE}
          </p>

          <div
            data-hero-fade
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton
              onClick={onOpenModal}
              fillClassName="bg-light"
              className="rounded-[1.6rem] bg-accent px-7 py-4 text-sm font-semibold text-night transition-colors duration-500 ease-magnetic hover:text-night"
            >
              Request the portfolio deck
              <ArrowUpRight size={17} strokeWidth={2.4} />
            </MagneticButton>

            <a
              href="#artifacts"
              className="lift inline-flex items-center gap-2 px-2 py-3 text-sm text-light/70 hover:text-light"
            >
              See the instruments
              <span className="font-mono text-accent">↓</span>
            </a>
          </div>
        </div>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-light/40 sm:flex lg:right-20"
      >
        Scroll
        <ArrowDown size={13} className="animate-bounce" />
      </div>
    </section>
  )
}
