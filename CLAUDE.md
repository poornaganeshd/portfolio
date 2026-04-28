# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack at localhost:3000
npm run build    # Production build with Turbopack
npm run start    # Serve the production build
npm run lint     # Run ESLint
```

There are no tests in this project.

## Architecture

**Next.js 15 App Router** portfolio site with heavy client-side animation. The stack is React 19, TypeScript, Tailwind CSS v3, GSAP (animation), and Lenis (smooth scroll).

### Route/Page Pattern

Every route follows a two-file pattern:
- `page.tsx` — server component, minimal wrapper that imports the client component
- `*Client.tsx` — `"use client"` component containing all interactivity and animation

Routes: `/` (home), `/projects`, `/ai-lab`, `/contact`, `/playground`

### Global Providers (layout.tsx)

The root layout wraps everything in:
1. `CursorProvider` — exposes `useCursor()` / `setCursorType()` to drive the custom cursor state
2. `SoundProvider` — exposes `useSound()` / `playSound()` using the Web Audio API (no audio files)
3. `SmoothScroll` — initialises Lenis and connects it to the GSAP ticker

`template.tsx` wraps each page in a `#page-transition-container` div and runs a GSAP entry animation on every route change.

### Animation Conventions

- All animations use **GSAP**. Register plugins at module level: `gsap.registerPlugin(ScrollTrigger)`.
- Use `gsap.context(() => { ... }, ref)` inside `useLayoutEffect` for scoped animations; always return `ctx.revert()` from the cleanup.
- Lenis smooth scroll drives `ScrollTrigger` via `gsap.ticker.add(raf)` — do not call `ScrollTrigger.refresh()` arbitrarily as it can conflict.
- `TextGravityReveal` (`src/app/components/TextGravityReveal.tsx`) and `SplitText` (`src/app/lib/splitText.tsx`) are reusable character-level animation utilities.
- `Magnetic` (`src/app/components/Magnetic.tsx`) wraps a single child element and applies an elastic mouse-tracking offset via GSAP quickTo.

### Custom Cursor

`body { cursor: none }` is set globally. `CustomCursor` reads `cursorType` from `CursorContext` and morphs the dot/outline elements via GSAP. When adding interactive elements, call `setCursorType("hover")` on `onMouseEnter` and `setCursorType("default")` on `onMouseLeave`. Available types: `"default" | "hover" | "text" | "hidden" | "view" | "none" | "menu"`.

### Data Layer

Static data lives in `src/data/`:
- `projects.ts` — array of project objects consumed by `CardDeck` and `ProjectsClient`
- `aiTools.ts` — array of AI tool objects consumed by `AILabClient`

To add a project or tool, edit the relevant data file.

### Styling Conventions

- **Dark theme**: background `#050505`, text `#F1F1F1` throughout.
- **CSS variables** in `globals.css` define the full colour palette (sunset-neon gradient, cyber green `#00FFA3`, aqua `#00F0FF`, etc.). Prefer these variables over hardcoded hex values in new components.
- **Font families** via Tailwind: `font-display` (Anton — large hero type), `font-serif` (Playfair Display — headings), `font-sans` (Inter — body), `font-cyber` (Space Grotesk), `font-tech` (Space Mono — monospace/UI labels).
- The `.layout-container` utility class (`max-w-[1800px] mx-auto px-4 md:px-12`) is the standard full-width content wrapper.
- External images must be proxied through `next.config.ts`; currently `image.pollinations.ai` is whitelisted under `remotePatterns`.

### Menu System

`MenuContainer` wraps `MenuButton`, `MenuOverlay`, and `MenuContent`. State is managed by `MenuContext` (`useMenu()`), which also hides the button after the user scrolls past 80 % of the viewport height. `MenuContainer` is rendered inside `layout.tsx`, outside `<main>`, so it overlays all pages.
