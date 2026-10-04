# The Swiss Waffle Co. — Next.js Website

A pixel-perfect Next.js implementation of The Swiss Waffle Co. website featuring:
- Procedural 3D WebGL Swaffle wedge (Three.js)
- Smooth inertial scrolling (Lenis)
- Multi-scene scroll choreography & pinned timeline sequences (GSAP & ScrollTrigger)
- Interactive 24-hour round waffle dial
- 7-section horizontal sideways menu reel with plate hover previews
- Dynamic SVG transit route drawing between outlets
- Self-hosted Archivo variable typography

---

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

To build the static production bundle:

```bash
npm run build
npm run start
```

---

## Project Structure

```
├── app/
│   ├── layout.tsx         # Root layout, metadata, viewport, stylesheet links
│   ├── page.tsx           # Complete page markup & all SVG symbols
│   └── ScriptsLoader.tsx  # Client loader for vendor libraries, main script & 3D scene
├── public/
│   ├── assets/
│   │   ├── css/style.css  # Brand styling & variable font settings
│   │   ├── fonts/         # Self-hosted Archivo WOFF2 font files
│   │   ├── img/           # WebP product photography & imagery
│   │   └── js/
│   │       ├── vendor/    # GSAP, ScrollTrigger, SplitText, DrawSVG, Lenis, Motion
│   │       ├── main.js    # Scroll choreography, menu reel, dial, transit line
│   │       └── scene.js   # Compiled 3D procedural WebGL scene
│   ├── favicon.svg        # Site favicon
│   └── apple-touch-icon.png
├── _source/               # Editable source for the 3D WebGL wedge (optional dev tooling)
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

---

## 3D Scene Source (`_source/`)

The compiled 3D scene is located at `public/assets/js/scene.js`. If you wish to edit the procedural geometry, shaders, or physics of the wedge, the source is located in `_source/`:

```bash
cd _source
npm install
npm run build
```

This will recompile directly to `public/assets/js/scene.js`.
