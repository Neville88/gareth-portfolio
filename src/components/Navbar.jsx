import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { BRAND_SHORT, NAV_LINKS } from '../data/content'
import MagneticButton from './MagneticButton'

// "The Floating Island" — a fixed, horizontally-centered pill that morphs from
// transparent to a blurred, bordered surface once the hero has scrolled past.
export default function Navbar({ scrolled, onOpenModal }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-4 z-[80] flex justify-center px-4 sm:top-6">
      <nav
        className={`flex w-full max-w-4xl items-center justify-between gap-4 rounded-[2rem] px-3 py-3 transition-all duration-500 ease-magnetic sm:px-5 ${
          scrolled
            ? 'border border-white/10 bg-night/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl'
            : 'border border-transparent bg-transparent backdrop-blur-0'
        }`}
      >
        <a
          href="#top"
          className="lift group flex items-center gap-2 pl-2 font-mono text-sm font-medium tracking-widest text-light"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent glow-accent" />
          {BRAND_SHORT}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="lift text-sm text-light/70 hover:text-light"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticButton
            onClick={onOpenModal}
            className="rounded-[1.4rem] border border-accent/40 px-4 py-2 text-sm font-medium text-light"
          >
            <span className="hidden sm:inline">Request deck</span>
            <span className="sm:hidden">Deck</span>
            <ArrowUpRight size={15} strokeWidth={2.2} />
          </MagneticButton>

          {/* Mobile menu toggle — navbar collapses to this minimal version */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lift flex h-9 w-9 items-center justify-center rounded-[1.2rem] border border-white/10 text-light md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown sheet */}
      {open && (
        <div className="absolute top-[4.5rem] w-[calc(100%-2rem)] max-w-4xl rounded-[2rem] border border-white/10 bg-night/90 p-3 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-[1.4rem] px-4 py-3 text-light/80 transition-colors hover:bg-white/5 hover:text-light"
                >
                  {l.label}
                  <ArrowUpRight size={15} className="opacity-50" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
