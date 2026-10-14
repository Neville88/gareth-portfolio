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
  ballo: 'https://ballonetwork.com',
  senate: 'https://senateleague.ballonetwork.com',
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
    title: 'Ballo \u2014 Amateur football, on record',
    lines: [
      'Ballo, formerly FootyStats, is the all-in-one platform for amateur football: leagues and tournaments, player and team records, and a public trail that stays intact.',
      'Live scores, the admin dashboard, and match history sit in one system so schools, scouts, and clubs can use the record.',
    ],
    tag: 'ballonetwork.com',
    href: LINKS.ballo,
  },
  {
    step: '02',
    title: 'Senate League \u2014 Unified system',
    lines: [
      'One master leaderboard for the MoMo Senate League, fed by every discipline, with live match recording from a single admin console.',
      'A result is recorded once and scored twice, so each sport keeps its own table while the master table stays in lockstep. Only one match can be live at a time.',
    ],
    tag: 'senateleague.ballonetwork.com',
    href: LINKS.senate,
  },
  {
    step: '03',
    title: 'Analytics inside the product',
    lines: [
      'Chart.js dashboards with KPI tracking, aggregation, and reporting built directly into Ballo.',
      'The point is not charts for their own sake \u2014 it is insight generation that turns raw events into decisions.',
    ],
    tag: 'ballonetwork.com',
    href: LINKS.ballo,
  },
  {
    step: '04',
    title: 'AfroKreate \u2014 WhatsApp decision navigation',
    lines: [
      'A WhatsApp-based decision navigation platform built on the Meta WhatsApp Cloud API, full-stack across React, Node, Express, and Supabase.',
      'Bundled with an analytics suite so insight scales alongside every conversation the navigator handles.',
    ],
    tag: 'Meta WhatsApp Cloud API',
    href: LINKS.afrokreate,
  },
]
