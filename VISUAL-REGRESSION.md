# Visual regression (BackstopJS)

Catches unintended layout/spacing shifts across the site. You take a baseline of
every key page (phone + desktop), then after any change you run a test and every
pixel that moved shows up as a red diff in a browser report. This is the safety
net for keeping spacing consistent everywhere.

Config: [`backstop.config.cjs`](backstop.config.cjs) · ready script:
[`backstop_data/engine_scripts/onReady.cjs`](backstop_data/engine_scripts/onReady.cjs)

## One-time setup

BackstopJS is run on demand and is **not** a build dependency (keeps CI lean).
Install it once, globally or as a dev dep:

```bash
npm i -D backstopjs
```

## Workflow

1. Start the site you want to check (local dev, default port 5199):

```bash
npm run dev -- --port 5199
```

2. Capture the baseline from a known-good state:

```bash
npm run vr:ref
```

3. Make your changes, then compare:

```bash
npm run vr:test
```

A browser report opens showing reference / test / diff side by side for every
page and viewport. Green = unchanged, red = something moved.

4. If the changes are intended, promote them to the new baseline:

```bash
npm run vr:approve
```

## Pointing at a different URL

Base URL is env-driven (default `http://localhost:5199`):

```bash
# Check the live production site instead of local
BACKSTOP_BASE=https://govindaniit.com npm run vr:test

# A different local port
BACKSTOP_BASE=http://localhost:5213 npm run vr:ref
```

## What's watched

Homepage, all six portfolio pages (NGO, builders, business, ecommerce,
healthcare, hospitality), Services + a service page, WhatsApp Business API, Blog,
About, Contact, Pricing (NGO OS) and the USA landing — each at **390px (phone)**
and **1440px (desktop)**. Add a page by adding one row to the `PAGES` array in
`backstop.config.cjs`.

Notes:
- The homepage hero is an auto-rotating carousel, so its content differs shot to
  shot; that scenario uses a higher mismatch tolerance so it only flags real
  layout shifts, not a different slide. Re-run `vr:ref` after deliberate hero
  changes.
- `onReady.cjs` freezes animations, scrolls to load lazy images, and waits for
  fonts, so diffs reflect layout — not motion or load timing.
- The reference baseline (`backstop_data/bitmaps_reference/`) is committed; the
  generated test output and reports are git-ignored.
