# fzkaipeng.com — Team Website

A complete, production-ready static website for the fzkaipeng.com R&D studio based in Sheffield, United Kingdom.

## Structure

```
fzkaipeng/
├── index.html            # Home
├── services.html         # Services & capabilities
├── advantages.html       # Team advantages & stats
├── updates.html          # Studio updates & timeline
├── contact.html          # Contact information + form
├── privacy.html          # Privacy Policy (20 sections, 25+ laws covered)
├── terms.html            # Terms of Service (22 sections, DMCA, app stores)
├── robots.txt            # SEO crawler directives
├── sitemap.xml           # XML sitemap
├── app-ads.txt           # IAB Authorized Sellers for Apps (AdMob, etc.)
├── css/
│   └── global.css        # Complete design system (dark + light mode)
├── js/
│   └── main.js           # Theme, nav, hero canvas, terminal, counters, forms
└── images/
    ├── logo.svg          # Brand logo
    ├── hero-bg.png       # Hero background (1920×1080)
    ├── og-cover.png      # Open Graph cover (1200×630)
    ├── hero-orb.svg      # Hero orbital graphic
    ├── visual-*.svg      # Procedural / privacy / zen / network visuals
    └── icon-*.svg        # All UI icons (shield, code, cube, spark, etc.)
```

## Pages

| Path | Purpose |
|------|---------|
| `/` | Home — Hero, pillars, procedural/privacy/zen features, app matrix, CTA |
| `/services.html` | Three disciplines, eight capabilities, three engagement models |
| `/advantages.html` | Six advantage pillars, four stats, persona-specific value props |
| `/updates.html` | Eight timeline items, subscribe card, press kit |
| `/contact.html` | Two info blocks, full contact form, six-step process |
| `/privacy.html` | 20 sections covering GDPR, UK-GDPR, CCPA/CPRA, COPPA, AADC, all US state laws, LGPD, PIPEDA, APPI, PIPA, DPDPA, PDPA, etc., with full AdMob / mediation / attribution disclosure and ad formats table |
| `/terms.html` | 22 sections: license, app store terms, subscriptions, refunds, IP, acceptable use, warranties, liability, indemnification, termination, governing law, dispute resolution, export controls, accessibility, DMCA |

## Features

- **Computer-science aesthetic**: monospace accents, grid backdrops, terminal UI, animated particle network, layered gradients.
- **Dark mode + light mode**: persists in localStorage; toggle button in nav.
- **Animated hero**: canvas particle network + typewriter terminal.
- **Scroll reveal**: IntersectionObserver-driven fade-ups on every card and section.
- **Active section TOC**: legal pages auto-highlight the current section while scrolling.
- **Form handler**: contact form provides UX feedback (no backend yet).
- **Responsive**: mobile nav, fluid grids, breakpoint at 720/980/1240px.
- **Accessible**: ARIA landmarks, alt text, focus rings, semantic HTML, `prefers-reduced-motion` honoured.
- **SEO**: canonical URLs, Open Graph, Twitter cards, JSON-LD organisation schema, sitemap, robots.txt.
- **App-store compliant**: privacy policy covers AdMob, AppLovin MAX, Unity Ads, Meta Audience Network, Vungle, ironSource, Tapjoy, AdColony, Chartboost, Pangle, InMobi, Mintegral, Liftoff, Criteo, Taboola, Outbrain, plus attribution providers (AppsFlyer, Adjust, Branch, Kochava, Singular, Tenjin, Mixpanel, Amplitude, Sentry, Bugsnag).

## Deployment

Drop the entire `fzkaipeng/` folder into any static host (Netlify, Vercel, Cloudflare Pages, S3, GitHub Pages, etc.). No build step required.

## Customisation

- Replace `images/logo.svg` and brand name throughout if rebranding.
- Update `sitemap.xml`, `robots.txt`, and `<link rel="canonical">` to match your production domain.
- Replace `app-ads.txt` placeholder publisher IDs with real ones from each ad network's dashboard before going live.