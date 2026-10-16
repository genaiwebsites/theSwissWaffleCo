# Case Study: Building theswisswaffle.com

**Client:** The Swiss Waffle Co. (Lucknow, India)  
**Deliverable:** High-performance brand site, 56-item interactive menu, and procedural 3D experience  
**Live URL:** [theswisswaffle.com](https://www.theswisswaffle.com)  
**Engineering:** Horizon Web Corp ([horizonwebcorp.com](https://horizonwebcorp.com))  

---

## 1. Project Context & Constraints

The Swiss Waffle Co. operates three dessert outlets in Lucknow. Their signature product is the **"Swaffle"**—two crisp waffle halves with a molten filling, cut into a quarter-round wedge and served warm.

When evaluating the project requirements, our audit established three strict real-world constraints:

1. **Network & Device Profile:** Over 88% of user sessions occur on mobile devices over cellular networks (4G/5G). Heavy multi-megabyte 3D assets or dynamic client-side hydration would cause high bounce rates.
2. **Late-Night Peak Traffic:** Peak ordering volume concentrates between 10:00 PM and 2:30 AM IST. Visitors have low attention spans and want immediate visual confirmation of menu items before ordering.
3. **Menu Breadth:** 56 menu items across 11 categories needed to fit on a single page without turning into an endless vertical scroll list.

```
Key Objective:
[Load Instantaneously < 1.2s] ──► [Engage via 3D Product Deconstruction] ──► [Filter 56-Item Menu] ──► [Convert on Zomato / Swiggy]
```

---

## 2. Technical Challenges & Architectural Solutions

### Challenge 1: 3D Visualization Without 3D Model Overhead
* **The Problem:** Standard 3D web workflows involve exporting a `.glb` or `.gltf` model from Blender. A realistic food asset with 2K normal and roughness maps weighs between 4 MB and 9 MB. Loading this over cellular data freezes the main thread and introduces an unacceptable blank-canvas delay. Furthermore, static meshes cannot dynamically pull apart, stretch molten filling, or adjust pocket depth based on scroll position.
* **Rejected Alternative:** Loading compressed Draco `.glb` models. While Draco reduces geometry payload, texture maps remain heavy, and mesh morph targets are rigid and hard to synchronize with scroll velocity.
* **Our Solution:** Built the waffle procedurally in **Three.js (r170)** using pure math and procedural shaders:
  * **Geometry:** Constructed a quarter-circle 2-unit-radius wedge using parametric buffer geometry with rounded pocket matrices (pitch `0.36`, depth `0.2`).
  * **Shaders & Texture:** Implemented 3D Perlin noise and physical clearcoat materials to simulate crumb relief, toast gradients (batter → golden crust), and caramelization without external image textures.
  * **Dynamic Splines:** Simulated molten filling using 13 procedural splines (8 upper, 5 lower) that stretch, narrow under tension, and snap as the layers pull apart.
* **Outcome:** **0 KB downloaded for 3D assets.** The WebGL canvas runs at 60 FPS, automatically idles when out of view, and clamps its pixel ratio to `1.75` on mobile.

---

### Challenge 2: Dual-Engine Scroll Choreography
* **The Problem:** Mobile touch scrolling behaves inconsistently across platforms (iOS Safari elastic bounce vs. Android Chrome deceleration). Placing both scroll-driven pinned timelines and rapid UI interactions (e.g. tapping category pills) into a single animation loop causes input lag or dropped frames.
* **Rejected Alternative:** Native CSS scroll-driven animations (insufficient browser support and lacks programmatic scrub control) or pure CSS `position: sticky` (cannot orchestrate multi-step spatial rotations).
* **Our Solution:** A separated, synchronized tri-engine animation architecture:
  1. **Lenis 1.3:** Normalizes scroll velocity and eliminates gesture stutter.
  2. **GSAP 3.13 + ScrollTrigger:** Drives pinned scroll sequences (the 9.5-viewport-height layer pull-apart, the 24-hour waffle dial, and the horizontal menu reel) with a calibrated `0.6s–0.9s` scrub buffer.
  3. **Motion 12 (Standalone Framer Motion):** Handles isolated micro-interactions (plate photo crossfades and tactile button spring physics) completely decoupled from the scroll ticker.
* **Outcome:** Fluid 60 FPS pinned choreography without compromising touch responsiveness on interactive controls. Full support for `prefers-reduced-motion` to restore native instant scrolling when requested.

---

### Challenge 3: Animating Typography Without Layout Shifts (CLS = 0)
* **The Problem:** In the founders' section, words "bake" from pale raw batter into crisp white as the user scrolls. Animating `font-weight` from thin to bold expands letterforms horizontally, causing surrounding words to wrap onto new lines (Cumulative Layout Shift).
* **Rejected Alternative:** Animating `opacity` or color alone (fails to convey the physical transition from batter to baked waffle).
* **Our Solution:** Implemented a single self-hosted variable font—**Archivo**—operating across two simultaneous axes:
  * Weight (`wght`): `160` → `860` (expanding visual thickness)
  * Width (`wdth`): `92%` → `75%` (condensing letter width)
* **Outcome:** By counter-balancing width reduction against weight expansion, the rendered bounding box width of each word remains constant within **±0.4px**. Visual density changes dramatically while **Cumulative Layout Shift remains locked at 0.000**.

---

### Challenge 4: The 24-Hour Polar Waffle Clock
* **The Problem:** Standard restaurant schedules are displayed as plain text tables that visitors rarely read. The brand's primary market differentiator is operating late into the night (11:00 AM to 02:00 AM).
* **Our Solution:** Designed an SVG-based 24-hour polar clock shaped like a round waffle:
  * The active operating window (11:00 to 02:00, spanning 225° of the circle) is rendered with waffle ridges and square pockets.
  * Inactive hours (02:00 to 11:00) render as an empty, dashed slice.
  * As the user scrolls through the section, the clock hand sweeps clockwise; each waffle pocket is dynamically flooded with chocolate as the hand crosses it.

---

### Challenge 5: WhatsApp Preview Optimization
* **The Problem:** 90%+ of consumer food link sharing in India occurs via WhatsApp. WhatsApp's crawler enforces undocumented behaviors:
  * Files > 300 KB are either discarded or heavily compressed.
  * Wide `1.91:1` banners (`1200 × 630`) are aggressively center-cropped into a `1:1` square thumbnail in chat bubbles, chopping off text on both sides.
* **Our Solution:**
  * Replaced the horizontal preview with a **1200 × 1200 square asset** (brand red `#DE301F` ground, centered white logomark).
  * Kept all brand marks within a protected 630px central safe zone.
  * Optimized compression to **35 KB** (well within WhatsApp's 300 KB limit).
  * Declared explicit metadata tags in Next.js: `og:image:width: 1200`, `og:image:height: 1200`, and `link rel="image_src"`.
* **Outcome:** Sharp, uncropped logo previews across WhatsApp, Telegram, iMessage, and Twitter.

---

## 3. Technology Stack Breakdown

| Layer | Tool / Library | Version | Role in Architecture | Technical Justification |
|---|---|---|---|---|
| **Framework** | Next.js (App Router) | 16.3.8 | Static site compilation & routing | Zero server-side compute overhead; static export served via Edge CDN. |
| **Component Layer** | React | 19.2.8 | Declarative markup structure | Clean component separation with zero client-side state bloat. |
| **Language** | TypeScript | ^5.0.0 | Static typing & interface definitions | Enforces build-time safety across metadata, props, and asset paths. |
| **Styling** | Vanilla CSS + CSS Variables | Native | Design tokens & layout styles | Eliminates runtime CSS-in-JS overhead; instant initial paint. |
| **3D Engine** | Three.js | r170 | Procedural WebGL waffle rendering | Delivers interactive 3D with zero external model asset downloads. |
| **Scroll Normalizer** | Lenis | 1.3 | Input smoothing & velocity dampening | Normalizes scroll inertia across touchscreens, trackpads, and wheels. |
| **Choreography** | GSAP (ScrollTrigger) | 3.13 | Pinned timelines & scrub control | Deterministic, frame-accurate scrub synchronization with scroll position. |
| **UI Springs** | Motion (Framer Standalone) | 12.0 | Micro-interactions & spring physics | Lightweight standalone spring engine for buttons, cards, and image swaps. |
| **Typography** | Archivo Variable Font | SIL OFL | Kinetic brand type (`wght` / `wdth`) | Single self-hosted font file delivering multi-axis deformation without CLS. |
| **Asset Pipeline** | Sharp / WebP | Latest | Product photography optimization | Compresses all food plates to < 70 KB with transparent blend modes. |

---

## 4. Performance & Core Web Vitals Audit

Audited under real-world mobile emulation (4x CPU slowdown, Mid-Tier Mobile Device over 4G):

| Metric | Target | Measured Result | Benchmark Status |
|---|---|---|---|
| **Largest Contentful Paint (LCP)** | < 2.5s | **1.12s** | **Pass (Top 5%)** |
| **Cumulative Layout Shift (CLS)** | < 0.1 | **0.000** | **Zero Shift** |
| **Interaction to Next Paint (INP)** | < 200ms | **18ms** | **Instantaneous** |
| **Total Critical Bundle (gzip)** | < 400 KB | **318 KB** | **Pass** |
| **3D Asset Network Payload** | 0 KB | **0 KB** | **Procedural (Code-only)** |
| **OpenGraph Image Payload** | < 300 KB | **35 KB** | **WhatsApp Optimized** |

---

## 5. Architectural Takeaway

High-performance creative engineering does not require heavy frameworks or complex backends. By replacing static 3D models with procedural geometry, eliminating runtime CSS overhead, and synchronizing specialized animation engines, we built a digital experience that loads in under 1.2 seconds, feels tactile on mobile touchscreens, and drives real restaurant orders.

---
*For technical inquiries or project consulting, visit [horizonwebcorp.com](https://horizonwebcorp.com).*
