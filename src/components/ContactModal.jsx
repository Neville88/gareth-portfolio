import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { X, Copy, Check, Linkedin, MessageCircle, Mail } from 'lucide-react'
import { PHONE, EMAIL, LINKS } from '../data/content'
import MagneticButton from './MagneticButton'

export default function ContactModal({ open, onClose }) {
  const backdropRef = useRef(null)
  const panelRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        panelRef.current,
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = PHONE
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!open) return null

  return (
    <div
      ref={backdropRef}
      onMouseDown={(e) => e.target === backdropRef.current && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2.5rem] border border-white/10 bg-surface/95 p-8 shadow-[0_40px_120px_-30px_rgba(123,97,255,0.5)] sm:p-10"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="lift absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-light/60 hover:text-light"
        >
          <X size={16} />
        </button>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Start a conversation
        </p>
        <h3 className="mt-4 text-2xl font-bold leading-tight text-light">
          Let&rsquo;s scope your build.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-light/60">
          Send a note or call directly. A short discovery, then a clear proposal
          with deliverables and timeline.
        </p>

        <div className="mt-7 space-y-3">
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="lift flex w-full items-center justify-center gap-2 rounded-[1.5rem] bg-[#25D366] px-6 py-4 text-sm font-semibold text-night transition-colors duration-300"
          >
            <MessageCircle size={16} />
            Message me on WhatsApp
          </a>

          <a
            href={LINKS.email}
            className="lift flex w-full items-center justify-center gap-2 rounded-[1.5rem] bg-accent px-6 py-4 text-sm font-semibold text-night transition-colors duration-300"
          >
            <Mail size={16} />
            Send me an email
          </a>

          <MagneticButton
            onClick={copyPhone}
            fillClassName="bg-accent"
            className="w-full rounded-[1.5rem] border border-white/15 px-6 py-4 text-sm font-medium text-light/80 transition-colors duration-500 ease-magnetic hover:text-night"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied 0702777745' : 'Copy phone number'}
          </MagneticButton>

          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="lift flex w-full items-center justify-center gap-2 rounded-[1.5rem] border border-white/15 px-6 py-4 text-sm font-medium text-light/80 hover:border-accent/40 hover:text-light"
          >
            <Linkedin size={16} />
            Connect on LinkedIn
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center gap-1 font-mono text-xs text-light/40">
          <a href={LINKS.email} className="lift hover:text-accent">
            {EMAIL}
          </a>
          <span>{PHONE}</span>
        </div>
      </div>
    </div>
  )
}
