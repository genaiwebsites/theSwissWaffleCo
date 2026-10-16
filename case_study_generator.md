# Horizon Web Corp: Technical Case Study Generator & Ruleset
**Version:** 1.0.0  
**Purpose:** Standard operating procedure and scanning rules for producing authentic, technical, non-slop portfolio case studies from any client codebase.  
**Firm:** Horizon Web Corp ([horizonwebcorp.com](https://horizonwebcorp.com))  

---

## 1. The Core Philosophy: "Evidence Over Claims"

At Horizon Web Corp, our case studies are technical post-mortems and architectural teardowns, not marketing brochures. They exist to prove to technical founders, CTOs, and product leaders that our firm approaches engineering with empirical rigor.

### The "Anti-Slop" Tone Rules:
1. **No Grandiose Buzzwords:** Strictly ban words like *revolutionary, bespoke, paradigm shift, seamless tapestry, cognitive psychology, unprecedented, state-of-the-art, game-changer*.
2. **No Competitor Bashing / Agency Drama:** Do not write lines like *"Unlike standard amateur agencies..."* or *"Most developers fail to understand..."*. State the technical problem factually.
3. **No Fluff Openers:** Jump straight into the client context, device profile, and core problem.
4. **Always Cite Rejected Alternatives:** Good engineering is about trade-offs. Every solution must clearly state *what other approach was rejected and why* (e.g., why Draco GLTF was rejected in favor of procedural WebGL).
5. **Concrete Technical Specifics:** Include exact package versions, CSS token values, file paths, millisecond latencies, and kilobyte counts. Never use vague terms like *"optimized image sizes"*; specify *"compressed from 4.2 MB to 35 KB"*.

---

## 2. Codebase Scanning Protocol (How to Audit a Project)

When instructed to generate a case study for a codebase, run this systematic 6-phase scan before drafting a single sentence:

```
[Phase 1: Dependencies] ──► [Phase 2: Styling & Tokens] ──► [Phase 3: Motion & Render Loop]
         │                            │                               │
         ▼                            ▼                               ▼
[Phase 4: Assets & Media] ──► [Phase 5: Crawler & Edge]  ──► [Phase 6: Web Vitals Audit]
```

### Phase 1: Dependency & Framework Scan
- Read `package.json`, `Cargo.toml`, or `go.mod`.
- Extract exact package versions (`next`, `react`, `three`, `gsap`, `lenis`, etc.).
- Identify the rendering model: Pure Static (SSG), Edge SSR, Incremental Static Regeneration (ISR), or SPA.

### Phase 2: Design System & Styling Architecture
- Locate design tokens (`:root` CSS variables or Tailwind theme configuration).
- Check color contrast ratios against WCAG 2.2 AA standards.
- Check typography implementation: Is it a variable font? Are multiple weights loaded via separate HTTP calls or self-hosted in a single file?

### Phase 3: Interactive & Motion Pipeline
- Identify scroll and animation engines (`lenis`, `gsap`, `framer-motion`, `three.js`).
- Inspect how animations are tied to scroll position (e.g., `ScrollTrigger.scrub`, `requestAnimationFrame`).
- Check if `prefers-reduced-motion` is respected.
- Check if canvas rendering loops idle when off-screen.

### Phase 4: Asset & Geometry Pipeline
- Scan the `public/` and `assets/` directories.
- Note image formats (WebP, AVIF, SVG, PNG).
- If 3D is used: Determine whether geometry is loaded from external files (`.glb`/`.gltf`) or generated procedurally in code. Record network payload savings.

### Phase 5: Crawler, Edge & Metadata Verification
- Inspect root layout (`app/layout.tsx` or `index.html`).
- Check OpenGraph tags (`og:image`, `og:image:width`, `og:image:height`, `og:image:secure_url`).
- Verify social media preview compliance (e.g., WhatsApp 1:1 square crop constraints, payload limits under 300 KB).

### Phase 6: Metrics & Core Web Vitals
- Measure or calculate real metrics:
  - **LCP (Largest Contentful Paint)**
  - **CLS (Cumulative Layout Shift)**
  - **INP (Interaction to Next Paint)**
  - **Total Critical Bundle Size (gzipped)**

---

## 3. Mandatory Case Study Document Structure

Every case study generated for Horizon Web Corp must strictly adhere to this 5-part layout:

### Part 1: Project Metadata & Real-World Constraints
- Client name, industry, and live URL.
- 2–3 sentences defining the core business and user intent.
- A bulleted list of real-world constraints (e.g., cellular data speeds, mobile-dominant traffic, peak hours, menu depth).

### Part 2: Technical Challenges & Architectural Solutions (3 to 5 items)
Format each challenge with four consistent sub-headers:
- `The Problem`: What was slow, broken, or complex?
- `Rejected Alternative`: What common approach was considered and discarded, and why?
- `Our Solution`: What tool, formula, or architecture did we implement?
- `Outcome`: What concrete metric or user result was achieved?

### Part 3: Technology Stack Breakdown Table
A complete Markdown table with these exact 5 columns:
1. `Layer` (Framework, Styling, 3D Engine, Motion, Typography, etc.)
2. `Tool / Library` (Exact name)
3. `Version` (Semver from package manifest)
4. `Role in Architecture` (Component or subsystem where it runs)
5. `Technical Justification` (Why this tool was chosen over industry alternatives)

### Part 4: Performance & Core Web Vitals Audit Table
A clean benchmark table comparing target values against measured results:
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Interaction to Next Paint (INP)
- Total Critical Bundle Size
- Asset Network Payloads

### Part 5: Architectural Takeaway & Horizon Contact Link
- 1–2 paragraphs summarizing the high-level engineering lesson.
- Clean footer pointing to [horizonwebcorp.com](https://horizonwebcorp.com).

---

## 4. One-Shot Prompt for Generating Future Case Studies

Copy and paste this prompt whenever you want an AI coding agent or engineer to analyze a new repository and generate a portfolio-ready case study:

```text
Please analyze this codebase and generate a comprehensive, technical portfolio case study for Horizon Web Corp (horizonwebcorp.com) following the strict rules in case_study_generator.md.

Mandatory Guidelines:
1. Ground every claim in the actual repository files, dependencies, and code patterns. No invented facts.
2. Maintain an engineer-to-engineer, understated tone. Do not use marketing hype, hyperbolic buzzwords, or agency fluff.
3. Follow the 5-part structure:
   - Part 1: Project Metadata & Real-World Constraints
   - Part 2: 3–5 Technical Challenges (Problem -> Rejected Alternative -> Our Solution -> Outcome)
   - Part 3: Tabular Tech Stack (Layer, Tool, Version, Role, Technical Justification)
   - Part 4: Performance & Core Web Vitals Audit Table
   - Part 5: Architectural Takeaway
4. Output the result in a clean, rich-formatted Markdown file.
```
