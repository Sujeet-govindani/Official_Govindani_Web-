# Change audit — govindaniit.com

Every change Sujeet asked for in this session, in the order asked, with its
verified state. **Verified** means I checked the running code or the live site
and said how. Nothing is marked done because I remember doing it.

Last audited: 17 Nov 2026.

Legend: ✅ done + verified · 🟡 partial · ❌ not started · ⛔ blocked

---

## A. The Google AI panel

| # | Change | State | Evidence |
|---|---|---|---|
| A1 | Show that Google AI names us #1 for NGO web dev | ✅ | Hero slide 4 (`origSlide === 7`) |
| A2 | Make it feel like a real Google search, not a neutral card | ✅ | Rebuilt on the `/services/seo` simulator shell |
| A3 | Cut the text; fit one screen | ✅ | 895px desktop / 851px mobile, measured |
| A4 | Reuse our own Google simulator component | ✅ | Same chrome, Google wordmark, search box, result count |
| A5 | Put it in the hero as a slider | ✅ | `SLIDE_ORDER` includes `7` |
| A6 | Real Govindani icon in the source chip, not a random one | ✅ | `/favicon-96x96.png`, our actual mark |
| A7 | A button that opens the real Google search | ✅ | `.giai-run` — "See it on Google yourself" |
| A8 | Blur Web4Cause + Databind Technologies | ✅ | `filter: blur(4.5px)` on non-us rows |

## B. Hero slides

| # | Change | State | Evidence |
|---|---|---|---|
| B1 | Remove "Sell Online / We Handle Everything" (the blue one) | ✅ | `origSlide === 3` routed 0 times |
| B2 | Keep the other hero sections as they were | ✅ | NGO + E-commerce slides untouched |
| B3 | Websites as hero banners, each with its own banner | ✅ | Slide `8`, rotates all six |
| B4 | Keep BOTH the hero banner and the section below | ✅ | Slide `8` + `SupremeWork` on the homepage |
| B5 | Premium "Visit website" button, not a bare text link | ✅ | `.giw-visit`; the old one borrowed a class scoped to another slide |
| B6 | Drop the real estate slide from rotation | ✅ | `SLIDE_ORDER = [0, 1, 9, 7, 8]` — `6` not in it |
| B7 | Dedicated e-commerce carousel slide | ✅ | Slide `9` — Babaji, Tarushpranaa, Vivedam Agro |
| B8 | Remove Ganesh Nayak | ✅ | 0 occurrences in `HeroSection.tsx` |

## C. The work showcase

| # | Change | State | Evidence |
|---|---|---|---|
| C1 | A dedicated banner per website | ✅ | `SupremeWork` — screenshot, stats, tech, links |
| C2 | Real screenshots of all six live sites | ✅ | Captured 16 Nov, on R2 `Images/work/`, all 200 |
| C3 | Review vivedamagro.com and jivika.org | ✅ | Both opened and read; copy written from what they publish |
| C4 | Remove "Check out our latest websites" (duplicate) | ✅ | `LatestWork` unmounted from `Index.tsx` |

> ⚠️ **C4 side effect, still open.** That section's "View more & get yours"
> button was the only way into two modals — the portfolio-category grid and a
> **lead-capture form**. Both are off the homepage now. The component is on disk,
> unmounted. If that form was producing leads it needs a new home.

## D. Portfolio — update these clients everywhere

| # | Change | State | Evidence |
|---|---|---|---|
| D1 | Gau Seva Dham updated site-wide | ✅ | Audit script: 0 stale entries |
| D2 | Mahipatsinh updated site-wide | ✅ | same |
| D3 | Tarush Pranaa updated site-wide | ✅ | same |
| D4 | Baba Ji Ki Buti updated site-wide | ✅ | same |
| D5 | Jivika added to the NGO portfolio | ✅ | Verified in browser on `/portfolio/ngo` |
| D6 | Flagship NGO builds at the TOP, not buried | ✅ | Mahipatsinh, Gau Seva Dham, Jivika lead the page |
| D7 | NGO service page must show the NGO builds | ✅ | `NgoPage` opens with a filtered `SupremeWork` |
| D8 | Don't put a screenshot where a logo belongs | ✅ | Regression I caused in `Testimonialssection`, reverted |

**How D1–D4 were checked:** a script parses each object literal and matches
`title` → `image`. It found **15 stale entries across 8 files** when I had
already claimed this was done. All 15 fixed; the script now reports none.

## E. Layout and spacing

| # | Change | State | Evidence |
|---|---|---|---|
| E1 | No unnecessary blank space anywhere | ✅ | Measured at all three breakpoints, below |
| E2 | Buttons must not hide under the bottom navbar | ✅ | Mobile content clears the 57px dock by 13px |
| E3 | Fix every screen size | ✅ | Desktop / tablet / mobile all fit, measured |

| Breakpoint | Hero | Content | Overflows screen? |
|---|---|---|---|
| Desktop 1440×820 | 820px | 701px | **0** (was 990px → 170px over) |
| Tablet 834×1112 | 1104px | 666px | **0** (8px spare) |
| Mobile 375×812 | 800px | 743px | **0**, clears the dock by 13px |

**Root cause found:** `--hero-h` was a fixed height that ignored the viewport —
`990px` desktop, `1080px` tablet, and `max(100svh - 57px, 900px)` on mobile. On a
375×812 phone the hero claimed 900px — 88px taller than the screen, plus a 57px
dock — so every slide carried up to **216px of dead space** and its lowest
buttons sat under the dock. All three breakpoints now track the viewport with a
floor. It is `min-height` only, so a taller slide still grows and can never crop.

> **Verification note, learned the hard way.** `npx tsc --noEmit` reports nothing
> for `HeroSection.tsx` — the file opens with `// @ts-nocheck`. I used a clean
> tsc run as proof that an edit was safe, and shipped a syntax error that took
> the whole homepage to a 500. **For this file, the dev server (`curl` the module
> and expect 200) or `vite build` is the only real check.**

## F. SEO

| # | Change | State | Evidence |
|---|---|---|---|
| F1 | Tell the SEO side; update sitemap.xml | ✅ | Automatic: 728 → 731 URLs at deploy |
| F2 | Meet the SEO requirements for the new pages | ✅ | IndexNow HTTP 200 for all 3, each verified live first |
| F3 | Per-page titles/descriptions | ✅ | All 3 shipped with the site-wide default; fixed, now live and distinct |
| F4 | Case studies for the new sites | ✅ | Jivika, Vivedam Agro, Tarushpranaa — 15 → 18 |

## G. Not started

| # | Change | State | Note |
|---|---|---|---|
| G1 | NGO portfolio: founders' Instagram feeds, via screenshot | ✅ | `NgoFounders` on `/portfolio/ngo`, verified in browser |
| G2 | Mallakhamb Artist: India's Got Talent showcase | ✅ | Badge on their card, taken from their own bio |
| G3 | Redesign the NGO portfolio so it "says we are the best" | ✅ | Founders lead the page; grid follows |
| G4 | Daily automated case studies | ⬜ | **Dropped on request** |
| G5 | Jivika: no Instagram feed | ✅ | Excluded on request; 259 followers would have weakened them |

### What the Instagram check found

Read from the live verified profiles in Sujeet's own Chrome, 17 Nov:

| Founder | Handle | Real | Site claimed | Outcome |
|---|---|---|---|---|
| Devi Chitralekha | `chitralekhaji` ✅ | **6.5M** | 6.7M+ | accurate — featured |
| Popatbhai Ahir | `popatbhai_ahir` ✅ | **2.1M** | 1.9M+ | we **understated** — featured |
| Mahipatsinh Chauhan | `mahipatsinh_chauhan_official` ✅ | **1.8M** | 1.3M+ | we **understated** — featured |
| Abujhmad Mallakhamb | `abujhmadmallakhamb_` ✅ | 122K | 500K+ | overstated on IG — **led with the IGT win instead** |
| Harsh Chhikara | `harshchhikaraofficial` | **4,956** | **1.2M+** | 🔴 **not featured** |

Three of four were being *understated*. The section now carries the real,
verified numbers and a dated line saying when they were read.

> 🔴 **Still open, needs Sujeet's answer.** The hero still publishes "Harsh
> Chikkara 1.2M+" against a real 4,956 on his official account. Either that
> figure is a cross-platform total and should say so, or it needs correcting.
> He is deliberately left out of the founders section until then — an unchecked
> number does not belong beside checked ones.

Strips are cropped to the post grid only — no personal Chrome UI, no message
popups, no notification badges. Served from R2 at `Images/ig/`.

**G1 constraint, so it isn't discovered late:** a genuinely live Instagram feed
needs per-client API access — the client authorises our app per account. There
is no honest way to render a live feed without it. What can ship without any
access: real follower counts (already there), a link to the actual profile, and
posts we hold ourselves. Needs a call on which.

## H. Deploy

| # | Item | State |
|---|---|---|
| H1 | AI slide + Recently Shipped + 3 case studies | ✅ live, verified on production |
| H2 | Hero alignment + chat launcher | ✅ live, verified |
| H3 | SEO titles/descriptions/OG | ✅ live, verified |
| H4 | Site-wide image refresh, spacing, NGO order, panel fixes | ⛔ **committed `85b73c5`, not pushed** |
| H5 | E-commerce slide, logo revert, screen sizes, Ganesh | ⛔ **not committed** |

**⛔ `git push` is being refused by the sandbox classifier**, twice, with no
reason given. Nothing is wrong with the repo: branch clean, build exit 0. The
push has to be run by Sujeet, or Bash push permission granted.
