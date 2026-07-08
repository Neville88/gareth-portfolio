// Single source of truth for copy, links, and imagery.
// Preset D — "Vapor Clinic" (Neon Biotech): bioluminescence, dark water,
// neon reflections, microscopy. All Unsplash URLs verified to resolve.

export const BRAND = 'Gareth Neville Kisuze'
export const BRAND_SHORT = 'GNK'
export const PURPOSE =
  'End-to-end full-stack products with data analytics, dashboards, and automation.'
export const PHONE = '0702777745'
export const EMAIL = 'garethneville3@gmail.com'
// Same number in international (Uganda +256) format for WhatsApp deep links.
export const WHATSAPP = '256702777745'

export const LINKS = {
  footystats: 'https://footystats.timelessbranch.com',
  afrokreate: 'https://neville88.github.io/afrokreate-website/',
  linkedin:
    'https://www.linkedin.com/in/gareth-kisuze-060b7a26a/?isSelfProfile=true',
  whatsapp: 'https://wa.me/256702777745',
  email: 'mailto:garethneville3@gmail.com',
}

const U = (id, w) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  // bioluminescent surf — neon glow on dark water
  hero: U('photo-1476673160081-cf065607f449', 2400),
  // deep-field galaxy — organic microscopy-like texture
  philosophy: U('photo-1534796636912-3b95b3ab5986', 1800),
  // dark water surface
  protocol1: U('photo-1509233725247-49e657c54213', 1600),
  // abstract blue field
  protocol2: U('photo-1462331940025-496dfbfc7564', 1600),
  // aurora / neon reflections
  protocol3: U('photo-1419242902214-272b3f66ee7a', 1600),
}

export const PRICING_STATEMENT =
  'I quote based on the nature of the assignment and scope. After a short discovery, you\u2019ll receive a clear proposal with deliverables and timeline.'

export const NAV_LINKS = [
  { label: 'Artifacts', href: '#artifacts' },
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Protocol', href: '#protocol' },
  { label: 'Contact', href: '#start' },
]

// Protocol / case-study archive
export const PROTOCOL_STEPS = [
  {
    step: '01',
    title: 'FootyStats \u2014 End-to-end build',
    lines: [
      'Co-founder and primary builder of a real-time tournament ecosystem with a live-score experience and an admin dashboard.',
      'A data pipeline drives it end to end: CSV ETL, statistical aggregation, and predictive infrastructure \u2014 team placed 2nd at HACK UCU 2025, live in production.',
    ],
    tag: 'footystats.timelessbranch.com',
    href: LINKS.footystats,
  },
  {
    step: '02',
    title: 'Analytics inside the product',
    lines: [
      'Chart.js dashboards with KPI tracking, aggregation, and reporting built directly into the product surface.',
      'The point is not charts for their own sake \u2014 it is insight generation that turns raw events into decisions.',
    ],
    tag: 'Chart.js \u00b7 KPIs \u00b7 reporting',
    href: LINKS.footystats,
  },
  {
    step: '03',
    title: 'AfroKreate \u2014 WhatsApp decision navigation',
    lines: [
      'A WhatsApp-based decision navigation platform built on the Meta WhatsApp Cloud API, full-stack across React, Node, Express, and Supabase.',
      'Bundled with an analytics suite so insight scales alongside every conversation the navigator handles.',
    ],
    tag: 'Meta WhatsApp Cloud API',
    href: LINKS.afrokreate,
  },
]
