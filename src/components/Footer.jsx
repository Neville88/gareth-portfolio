import { ArrowUpRight } from 'lucide-react'
import { BRAND, PURPOSE, EMAIL, LINKS } from '../data/content'

const FOOTER_LINKS = [
  { label: 'FootyStats', href: LINKS.footystats },
  { label: 'AfroKreate', href: LINKS.afrokreate },
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'WhatsApp', href: LINKS.whatsapp },
]

export default function Footer() {
  return (
    <footer className="relative z-20 mt-10 rounded-t-[4rem] border-t border-white/10 bg-[#050509] px-6 pb-10 pt-16 sm:px-12 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-emerald-300/90">
                System Operational
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-light">
              {BRAND}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-light/50">
              {PURPOSE}
            </p>
            <a
              href={LINKS.email}
              className="lift mt-4 inline-block font-mono text-sm text-light/70 hover:text-accent"
            >
              {EMAIL}
            </a>
          </div>

          <nav className="flex flex-col gap-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-light/35">
              Endpoints
            </span>
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="lift group flex items-center gap-2 text-lg font-medium text-light/80 hover:text-accent"
              >
                {l.label}
                <ArrowUpRight
                  size={16}
                  className="opacity-40 transition-opacity group-hover:opacity-100"
                />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-light/35 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
            © {new Date().getFullYear()} {BRAND}. All systems reserved.
          </p>
          <p className="font-mono">
            Privacy · Terms · Legal — placeholder text, coming soon.
          </p>
        </div>
      </div>
    </footer>
  )
}
