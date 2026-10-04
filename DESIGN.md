# The Swiss Waffle Co. — Design system

The design reference for the theswisswaffle.co rebuild. It records what the site is made of and why, so that anyone editing it (a designer, a developer, or an AI coding tool) keeps it consistent.

Values here match the shipped code in `assets/css/style.css`, `assets/js/main.js` and `_source/scene.src.js`. If the code and this file disagree, the code is current and this file needs updating.

---

## 1. What the site is

A single scrolling brand page for a Lucknow dessert brand with three outlets. Its job is to make someone hungry, show them the whole menu, and send them to Zomato, Swiggy or an outlet.

The product is a **Swaffle**: two crisp waffle halves with a molten filling, cut into a quarter-round wedge and served warm. Everything on the page comes from that object and the brand's own name:

| Idea | Where it shows up |
|---|---|
| **Swiss + waffle** | The page merges the two words into SWAFFLE, and the Swiss cross stretches into a waffle grid. |
| **The press** | Type gets heavier as the iron closes. The founders' quote "bakes" from thin batter into bold white. |
| **The layers** | A real-time 3D wedge is pressed, pulled apart with molten strands, then refilled. |
| **The pocket** | The 12-column grid lines on red sections are the waffle ridges. |

Audience: people in Lucknow ordering dessert, mostly on phones, often late at night.

---

## 2. Principles

1. **One red.** `#DE301F` is sampled from the logo. Never introduce a second red for decoration.
2. **Real content only.** Product names, categories, addresses, hours and photos all come from the brand. Nothing is invented: no prices, no reviews, no claims the brand hasn't made.
3. **The object leads.** The 3D wedge and the product photos carry the page. Type and layout stay disciplined around them.
4. **Motion explains the product.** Every scroll scene shows something true about a Swaffle: how it's pressed, what's inside, how the filling pulls. Motion that only decorates gets cut.
5. **Plain words.** Copy names things the way the brand and its customers do, and says what is true without jokes or flourishes (see §10).
6. **Square corners.** The only rounded shapes are the category pills (their printed menu uses them), the veg-mark dot and the round plates.

---

## 3. Colour

All colours are CSS custom properties on `:root`. Components read tokens and never hard-code hex values.

| Token | Hex | Role |
|---|---|---|
| `--red` | `#DE301F` | Brand red. Section grounds (hero, Swiss + waffle, grid, hours start, footer), primary buttons on white, menu cards 3 and 7. |
| `--red-ink` | `#B32416` | Red text and hover states on white (links, counts, selected items). |
| `--sugar` | `#FFFFFF` | White. Text on red and dark, white section grounds, plate rims. |
| `--cocoa` | `#2A1209` | Reading text on light grounds, nav bar, "Choco" menu card. |
| `--night` | `#1C0A05` | After-hours ground: founders section, end of hours, "Cakes & drinks" card. |
| `--butter` | `#F2B84B` | Focus rings, small highlights, the dial knob, item dots on dark cards, the "Pancake bites" card. |
| `--gold` | `#E3A44E` | Golden crust. "Stuffed" menu card. |
| `--cream` | `#F6E7D4` | Raw batter. "Ice cream" menu card. |
| `--waffle` / `--waffle-deep` / `--waffle-edge` | `#D8913F` / `#B0682A` / `#7E3D12` | Hours dial only: baked surface, pockets, rim. |
| `--muted` | `#6E5A51` | Secondary text on white. |
| `--veg` | `#1E8A3C` | The green veg mark only. |
| `--rule` | `rgba(42,18,9,.14)` | Hairlines on white. |
| `--rule-red` | `rgba(255,255,255,.2)` | Hairlines and grid ridges on red and dark. |

### Pairings (WCAG contrast)

| Text on ground | Ratio | Use |
|---|---|---|
| sugar on red | 4.62 | OK for all text sizes (AA). |
| cocoa on red | 3.83 | **Do not use for text.** |
| butter on red | 2.58 | **Do not use for text.** |
| sugar on cocoa / night | 17.7 / 19.2 | All text. |
| butter on night | 10.7 | Labels and highlights. |
| cocoa on gold / butter / cream | 8.2 / 9.9 / 14.6 | All text on light menu cards. |
| cocoa on sugar | 17.7 | Body text. |
| red-ink on sugar | 6.6 | Links and small red text on white. |
| muted on sugar | 6.5 | Secondary text. |

The site is deliberately light-only. It does not switch to a dark theme; dark sections are part of the story (late night).

---

## 4. Typography

One family: **Archivo** (variable, self-hosted, SIL OFL), using two axes: weight `wght 100–900` and width `wdth 62–125`. Fallbacks are `"Arial Narrow", "Helvetica Neue", Arial, sans-serif`.

### Scale (tokens)

| Token | Value |
|---|---|
| `--t-xs` | 13px |
| `--t-sm` | 15px |
| `--t-md` | 17px (body) |
| `--t-lg` | clamp(19px, 1.45vw, 23px) |
| `--t-xl` | clamp(26px, 2.6vw, 40px) |
| `--t-2xl` | clamp(40px, 5.6vw, 92px) (section headings) |
| `--t-mega` | clamp(76px, 10.4vw, 210px) (hero) |

### Roles

| Role | Setting |
|---|---|
| Hero title (LAYERED SWISSFULLY) | 900, width 62%, uppercase, line-height .8 |
| Section heading `.h2` | 800, width 75%, line-height .9, tracking −.012em, balanced wrap |
| Press heading ("Three layers, taken apart.") | Animated from `wght 250 / wdth 112` to `wght 860 / wdth 75` as the iron closes |
| Founders' quote | Each word animates from `wght 160 / wdth 92` (pale batter) to `wght 860 / wdth 75` (white). Both settings measure almost the same width, so nothing reflows. |
| Menu card title | 900, width 62%, uppercase, clamp(56px, 6.6vw, 124px), line-height .82 |
| Category pill | 800, width 80%, uppercase, 12–14px, tracking .035em |
| Body | 400, 17px, line-height 1.55, max ~52ch |
| Lede | `--t-lg`, line-height 1.45, max ~36–40ch |
| Small labels (`.k`) | width 75%, 13px, sentence case |
| Numbers (times, counts) | `font-variant-numeric: tabular-nums` |
| Footer word (SWAFFLE) | 900, width animates 62% → 125% on scroll, fitted to the full page width |

### Rules

- Uppercase is reserved for the hero title, the SWAFFLE words, menu card titles and category pills (the brand's menu convention). Everything else is sentence case.
- Never italicise for emphasis. Italic appears only in the dictionary entry and the "pull a warm one apart" caption.
- Don't colour or bold a single word inside a headline.

---

## 5. Layout

- **Gutter:** `--gut: clamp(16px, 4vw, 60px)` on every section (`.sec`). Nothing sits closer to the screen edge.
- **Grid:** 12 columns between the gutters. On red sections the column lines are drawn (`.ridges`) as the waffle ridges; on phones the drawn grid drops to 6 columns.
- **Nav height:** `--nav-h: 84px` (76px on phones). Content in pinned scenes starts below it.
- **Alignment:** flush left, ragged right. Centre alignment only for the SWAFFLE word, the plate captions and the dictionary moment.
- **Viewport units:** use `svh` for full-screen scenes so mobile browser bars don't cause jumps.
- **Breakpoints:** `960px` (nav tightens) and `760px` (phone layout: single column, burger menu, stacked menu cards, no horizontal reel).
- **Ground sequence down the page:** red → red → red → white (inside) → white (menu) → red fading to night (hours) → night (founders) → white (outlets) → red (footer).

---

## 6. Page map

Pinned scenes hold the page while the scroll drives an animation. Pin lengths are in viewport heights.

| # | Section | Ground | Pinned | What happens |
|---|---|---|---|---|
| 1 | Hero `#top` | red | — | Title rises letter by letter; the 3D wedge drops in, with chocolate sprinkles floating around it; the wedge tips back and fades as you leave. |
| 2 | Swiss + Waffle `#word` | red | 1.6 | SWISS and WAFFLE merge into SWAFFLE; a dictionary entry appears. |
| 3 | The grid `#grid` | red | 2.0 | The Swiss cross stretches into a waffle grid, the grid lines draw in, the pockets fill with chocolate, then the grid tilts into 3D. |
| 4 | Inside `#inside` | white | 9.5 | The wedge is pressed (pale → golden), pulled apart slowly with molten strands, fully separated with labelled layers, finished with drizzle and sugar, then moves left for "Pick your filling" (six flavours, each poured in). |
| 5 | Menu `#menu` | white | reel length | Seven menu cards slide sideways (see §7.4). |
| 6 | Hours `#hours` | red → night | 2.4 | A 24-hour round-waffle dial; the hand sweeps 11:00 → 02:00 and the pockets fill. |
| 7 | Founders `#founders` | night | — | Names, the quote baking word by word, bio, the box label, three photos. |
| 8 | Outlets `#find` | white | — | Three outlets as stops on one red line that draws itself. |
| 9 | Order `#order` | red | — | The wedge returns with sprinkles; order buttons, contact rows, the SWAFFLE word. |

---

## 7. Components

### 7.1 Nav
- A logo block (white logo on red) on the left. On the right: a cocoa link bar with a separate **Order** cell.
- **Order adapts to the ground:** it's red with white text over white and dark sections, and turns white with red text (`.nav.over-red`) whenever the nav is over a red section, including while that section is pinned. This keeps the main action visible everywhere.
- Phones: a burger opens a full-screen red sheet with large condensed links.

### 7.2 Buttons
- `.btn` is 54px tall, 22px side padding, 15px/600 type, square, with a 1.5px border and an outward-arrow icon for external links.
- On red: `.btn-solid` is white with red text, `.btn-line` is white outline. On white (`.on-sugar`): solid is red, line is cocoa outline.
- Hover adds a 4px inner bottom shadow. Press runs a Motion spring (scale .95, see §8.3). Buttons never move on hover.

### 7.3 Category pill and veg mark
- `.tag` is a fully rounded pill with condensed uppercase text. It's red with white text by default and inverts to white with red text on red cards. A count in small tabular numbers follows it.
- `.veg-mark` is an 18px square with a 2px green border and a green dot: the Indian veg symbol the brand prints on its menu. Always pair it with the words "100% veg".

### 7.4 Menu reel
The full menu: 56 items in the brand's 11 categories, grouped into seven cards.

| # | Card | Theme | Categories | Starting plate photo |
|---|---|---|---|---|
| 01 | Stuffed | gold | Surprise Stuffed (8), Classic Butter (1) | Crispy KitKat Treat |
| 02 | Choco | cocoa | Choco Indulgence (7) | Almond Brownie Fudge |
| 03 | Red & dark | red | Swissfully Red (2), Dark Obsession (3) | Swiss Red Bliss |
| 04 | Ice cream | cream | Ice Cream Swaffles (4), Swaffle Sundaes (5) | Swiss Berry Sundae |
| 05 | Pancake bites | butter | Pancake Bites (11) | Choco Nutella Indulgence pancake bites |
| 06 | Cakes & drinks | night | Swaffle Cakes (4), Beverages (8) | Nutella Indulgence Shake |
| 07 | Fab 4 boxes | red | Combo Treats (3) | Assorted Premium Delights box |

- **Card:** `min(80vw, 1240px)` wide, up to 760px tall. The text column (7fr) holds the `01 / 07` counter, the title, one plain line, then pill subheads with items in two columns. The plate column (5fr) holds the plate.
- **Theme variables** per card: `--ink`, `--rule-c`, `--tag-bg`, `--tag-fg`, `--dot`. Add a theme by setting these five; don't restyle children.
- **Plate:** a circular crop of a real photo with a 8–14px white rim and a two-layer soft shadow, so the food reads as served on a plate. It turns from −14° to +10° as the card crosses the screen.
- **Items:** 15px/600 rows with hairlines. Items that have a photo carry a dot. Pointing at one (or tapping it on a phone) puts its photo on the plate with its name and description, via a Motion spring. Leaving the card restores the starting photo.
- **Index:** a row of section names under the reel with a red progress bar; clicking one scrolls to that card.
- **Phones:** cards stack vertically with the plate on top, and items go to one column.

### 7.5 Box label ("In every Swaffle")
A white panel styled like a food-packaging label: a 10px cocoa rule under the title, 1px rules between rows, a 5px rule at the end, and the veg mark top-right. Rows: Batter, Made, Fillings, Ingredients, Portions, Served. Max width 460px.

### 7.6 Founders photos
Beside the bio and label sits a block of one tall photo and two stacked ones. Its top aligns with the bio and its bottom with the end of the label. Each photo has slow parallax inside its frame. On phones: one 4:3 photo above two squares.

### 7.7 Hours dial
A 24-hour clock drawn as a round waffle, with midnight at the top:
- The open hours (11:00 to 02:00, 225° of the circle) are baked waffle with square pockets.
- The closed hours (02:00 to 11:00) are a dashed empty slice labelled "Closed".
- The hand sweeps from 11:00 as you scroll, and each pocket fills with chocolate as the hand passes it.
- A large readout shows the time.

### 7.8 Outlet line
The three outlets as metro-style stops (34px square marks: white with a cocoa border and a red centre) on a 10px red line that draws itself on scroll. On desktop the line steps up and down between stops; on phones it runs vertically.

### 7.9 Callouts (inside scene)
Leader lines are drawn from projected points on the 3D model to text labels: Layer 1 of 3 (the lid), 2 of 3 (the filling), 3 of 3 (the base), and the finish. Each line has a red dot at the model end and draws in as its label appears.

---

## 8. Motion

### 8.1 Libraries and their jobs

| Library | Job |
|---|---|
| **Lenis 1.3** | Smooth scrolling (`lerp .085`), synced to the GSAP ticker. |
| **GSAP 3.13** with ScrollTrigger, SplitText, DrawSVG | All scroll choreography: pins, scrubs, the horizontal reel (with `containerAnimation`), text splitting, line drawing. |
| **Motion 12** (the standalone build of Framer Motion; the site is not React) | Interaction springs: plate swaps, press feedback, copy-button bounce, reveals as blocks enter the view. |
| **Three.js r170** | The 3D Swaffle (§9). |

### 8.2 Scroll rules
- Scrubbed scenes use a `scrub` of 0.6–0.9 seconds of smoothing, so motion trails the finger slightly instead of jittering.
- One shared state object (`RIG`) drives the 3D wedge. Each scene keeps its own copy (HERO, INS, ORD), and a director hands the right one to the renderer based on scroll position. Scenes never fight over the wedge.
- Pins are created in page order, so ScrollTrigger measures them correctly.

### 8.3 Spring presets (Motion)

| Use | Stiffness | Damping |
|---|---|---|
| Press down | 700 | 30 |
| Press release | 520 | 14 (slight overshoot) |
| Plate photo swap | 220 | 24 |
| Text swap | 380 | 30 |
| Reveals | 260 | 26 |
| Default (`SPRING`) | 420 | 36 (mass .8) |

The CSS easing for hovers is `--ease: cubic-bezier(.16, 1, .3, 1)`.

### 8.4 Reduced motion
With `prefers-reduced-motion`:
- Lenis is off (native scrolling).
- Entrance animations, idle drifting of the wedge, word splitting, the quote bake and Motion springs are skipped.
- CSS transitions are near-instant.
- Scroll-scrubbed scenes still follow the scroll position, because they carry content.

---

## 9. The 3D Swaffle

Procedural geometry, so there are no model files to load.

- **Shape:** a quarter of a 2-unit-radius round. Three parts:
  - **Lid and base:** slabs 0.36 thick with a rounded edge, rounded-square pockets (pitch 0.36, depth 0.2) and uneven browning.
  - **Filling:** a molten slab with a slightly rippled top that carries a faint print of the pockets.
- **Materials:**
  - **Waffle:** physical material with a toast gradient (batter → light → gold → dark) and crumb colour and relief from 3D noise. A clearcoat and a warm sheen give it a caramelised surface.
  - **Filling:** glossy, near-mirror clearcoat. Its colour changes by a *pour*: the new colour spreads outward from the wedge's point with a wet, shiny front.
- **Details:**
  - **Drips:** hang off the filling and draw back up when the layers separate.
  - **Strands:** 13 of them (8 above, 5 below) stretch between layers, thin at the neck and snap at set lengths. Some survive full separation.
  - **Drizzle:** a flat ribbon piped across the lid that sags into the pockets.
  - **Sugar:** points fall onto the lid.
  - **Sprinkles:** 36 chocolate vermicelli float around the wedge in the hero and footer (22 on phones).
- **Lighting:** a studio environment (warm key, overhead softbox, a brand-red bounce from the right) plus a contact shadow under the base. ACES tone mapping.
- **Flavours:** six entries in `FLAVORS` (main.js). Each sets the four batter colours, the filling colour, the sauce colour and the filling's roughness, plus the panel copy and photo.
- **Performance:** pixel ratio capped at 1.75; slab mesh 160×160 (120×120 on phones). The canvas fades out to zero cost between scenes. If WebGL isn't available, the page shows the brand's photos in the same slots.

---

## 10. Copy and voice

The site speaks the way a well-informed person behind the counter would: plainly, specifically, without performing.

### Do
- Use the brand's own names: Swaffle, filling, Fab 4 boxes, Swissfully Red, Dark Obsession. Use their category and item names exactly, apart from fixing obvious typos (Ferrero, not "Fererro").
- Describe what something is: "Red velvet-style batter with a white cream filling."
- Use facts from the brand: 100% veg, eggless batter, open 11:00 to 02:00, three outlets.
- Use sentence case, short sentences and active verbs. Buttons say exactly what happens ("Order on Zomato", "Get directions", "Copy").

### Don't
- End descriptions on a fragment punchline ("No breaks.", "Mostly.", "Hazelnut first, cocoa after.").
- Use "not X, but Y" constructions ("Sized for a craving, not a garnish").
- Use jokes, winks or invented rituals ("We won't tell anyone", "Second dessert. Also allowed.").
- Use em-dash asides, colon-then-reveal lines, or the same sentence rhythm three times in a row.
- Make claims the brand hasn't made (sweetness levels, sourcing details, prices, ratings).

The founders' quote is the one place their own punctuation stays as written:
> "We didn't just want to make waffles. We wanted to make people smile — one golden, crispy bite at a time."

---

## 11. Imagery

- **Source:** only the brand's own photography (product shots, Instagram posts, menu boxes). No stock photos and no generated food images.
- **Treatment:**
  - **Studio shots** are levelled so the backdrop reads as clean white, and set with `mix-blend-mode: multiply` on white grounds.
  - **On menu cards** the photos sit inside round plates.
  - **Lifestyle photos** (with the logo card) are used full-frame in the founders block.
- **Format:** WebP, ≤ 1000px wide, around 80 quality.
- **Gaps:** there's no founder portrait (the old site's link is broken), and 37 of the 56 menu items have no photo.

---

## 12. Accessibility

- **Contrast:** colour pairings follow §3; no text below 4.5:1.
- **Focus:** a 3px butter focus ring with a 3px offset on every interactive element.
- **Keyboard and screen readers:**
  - A skip link jumps to the menu.
  - The burger menu closes with Esc.
  - Menu items with photos are real buttons, and they update the plate on focus as well as on hover.
- **Text alternatives:** the hero title has an `aria-label`. Decorative SVG and the WebGL canvas are `aria-hidden`. All photos have alt text naming the item.
- **Touch targets:** 44px minimum on phones (menu rows, chips, burger, buttons).
- **Motion:** reduced-motion behaviour is in §8.4.
- **Contact details:** the phone number and email are shown as selectable text with Copy buttons, so they don't rely on `tel:` or `mailto:` links working.

---

## 13. Decisions log

| Decision | Status |
|---|---|
| Keep the logo red `#DE301F` as the only brand red | Kept |
| Steam rising off the wedge, and icing sugar falling like snow over the hero | Tried, then **reverted at the client's request**. The floating chocolate sprinkles stay. |
| Outlet map plotted from GPS pins with distances and a km scale | Tried, then **reverted at the client's request**. The metro-style outlet line stays. |
| Italic quote with a red bar | Replaced by the word-by-word "baking" quote, full width |
| Menu as accordion rows, then as tabs with a preview | Replaced by the seven-card sideways reel with plates |
| Single icon row (Eggless / Pressed fresh / …) | Replaced by the box label |
| Analog clock | Replaced by the 24-hour waffle dial |
| Order button in the nav | Made adaptive (§7.1) after it blended into red sections |
| Footer word | SWAFFLE kept, because it bookends the Swiss + Waffle section. Alternative if the client prefers recall of the full name: keep SWAFFLE big and set "The Swiss Waffle Co., Lucknow" small beneath it. |

---

## 14. Before launch

- Add a photo of Ankit and Paridhi.
- Add photos for the remaining menu items (`data-img` on the item; see README).
- Point the `og:image` meta tag at the live domain.
- Decide whether prices belong on the site (currently they're only on Zomato and Swiggy).

---

## 15. Files

| Path | What it holds |
|---|---|
| `index.html` | All content and copy |
| `assets/css/style.css` | Tokens (§3–5) and component styles |
| `assets/js/main.js` | Scroll choreography, menu reel, dial, outlet line, `FLAVORS`, `RIG` |
| `assets/js/scene.js` | Compiled 3D scene (edit `_source/scene.src.js`, then `npm run build` in `_source/`) |
| `assets/js/vendor/` | GSAP, Lenis, Motion |
| `assets/fonts/` | Archivo (latin and latin-ext, upright and italic) |
| `assets/img/` | Product photos, social preview image |
| `README.txt` | How to open, deploy and edit |
