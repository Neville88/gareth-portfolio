# Gareth Neville Kisuze — Portfolio

A cinematic, single-page portfolio built as a "digital instrument."
End-to-end full-stack products with data analytics, dashboards, and automation.

**Aesthetic:** Preset D — _Vapor Clinic_ (Neon Biotech).

## Stack

- React 19 + Vite 6
- Tailwind CSS v3.4.17
- GSAP 3 + ScrollTrigger
- Lucide React icons
- Fonts (Google Fonts): Sora · Instrument Serif · Fira Code

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Structure

```
index.html            Google Fonts + root
src/
  main.jsx
  index.css           Tailwind directives, noise overlay, magnetic-button + lift utilities
  App.jsx             orchestrates sections, navbar morph, contact modal
  data/content.js     all copy, links, verified Unsplash image URLs
  components/         Navbar, Hero, Features, Philosophy, Protocol, GetStarted,
                      ContactModal, Footer, NoiseOverlay, MagneticButton
```

## Deploy — GitHub Pages (GitHub Actions)

`vite.config.js` uses `base: ''` (relative asset paths), so the same build works
for both project pages (`user.github.io/repo/`) and user pages.

1. Push this folder to a GitHub repo (`main` branch).
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on
   every push to `main`. The live URL appears in the workflow run summary.
