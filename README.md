# PEAK 48 Construction — demo site

React + Vite + TypeScript + Tailwind v4. Animation: GSAP (ScrollTrigger, SplitText) + Lenis.
All copy lives in `src/content/companyContent.ts`.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview
```
Note: if npm hangs behind the corporate proxy, add `--noproxy=registry.npmjs.org`.

## Cloudflare Pages
Build command `npm run build`, output directory `dist`. `public/_headers` sets cache/security headers.

## Pending client confirmation
- Real services (capabilities are placeholders)
- Real project photography, names, locations (Work section uses conceptual SVG art)
- Process copy and the "Precision" philosophy line (proposed)
- Contact email, phone, address, and a mail backend (form is demo-only, sends nothing)
- Official logo files (header uses a simple placeholder mark)
- Verified company facts (founding year, licenses, service area): none are claimed
