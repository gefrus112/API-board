# API Board

> One board for every API key you need. **v1.4** — GitHub Pages upgraded with no emojis, real SVG icons, multi-page nav, scroll-reveal animations, Cloud Console preview, Game Launcher Detector batch file, and 4 new docs pages.

![API Board](public/cube.svg)

## v1.4 highlights

- **GitHub Pages upgraded** — `docs/index.html` rebuilt with no emojis, real inline SVG icons (cube mascot + 13 API icons), a glass nav, scroll-reveal animations, and a multi-page nav linking to esharp / cloud-console / games / comments / docs sub-pages.
- **Multi-page site** — `docs/index.html`, `docs/esharp.html`, `docs/cloud-console.html`, `docs/games.html`, `docs/comments.html`, `docs/docs.html`. Each page has its own hero, prose, code samples, and download buttons.
- **Game Launcher Detector** — New `public/downloads/game-launcher-detector.bat` (no admin needed) detects Steam (parses `libraryfolders.vdf` + `manifest_*.acf`), Roblox (`RobloxPlayerBeta.exe`), Minecraft (`launcher_profiles.json`), Epic Games (`Manifests/*.item`), writes `games.json`, and prints a copy-paste e# snippet.
- **Comments: no bot comments** — Removed the 3 seeded sample comments (gefrus112 / ada / lin). The list starts empty — yours can be the first. Topic chips also had their emojis removed.
- **4 new docs pages** in the Next.js app:
  - **What is e# (esharp)?** — 60-second explainer + how to run your first program.
  - **How to use the Comments tab** — sign-in flow, topics, image upload, upvote, delete.
  - **Cloud Console — manage every key** — sidebar layout, Overview / API Keys / Usage / Activity / Webhooks sections.
  - **Game Launcher Detector** — what the .bat detects + how to use the output in e#.
- **Static site CSS upgraded** — Cool blue theme with three brand colors (blue + indigo + sky), aurora background blobs, cube-spin + cube-pulse-glow + aurora-drift + text-shimmer + glitch-shake + dot-pulse animations, glass header with `backdrop-filter: blur(12px) saturate(180%)`, hover lift on cards, gradient top bar on pillar hover, scanline sweep on download cards. Respects `prefers-reduced-motion`.
- **Scroll reveal** — IntersectionObserver adds `.is-visible` to every `.reveal` element as it enters the viewport, with optional `data-delay` for staggered timing.

## GitHub Pages

The static HTML5 site lives in the [`/docs`](docs/) folder and is published at **<https://gefrus112.github.io/API-board/>**.

| Page | URL |
|---|---|
| Home | https://gefrus112.github.io/API-board/ |
| What is e# | https://gefrus112.github.io/API-board/esharp.html |
| Cloud Console | https://gefrus112.github.io/API-board/cloud-console.html |
| Game Launcher | https://gefrus112.github.io/API-board/games.html |
| Comments | https://gefrus112.github.io/API-board/comments.html |
| Docs hub | https://gefrus112.github.io/API-board/docs.html |

## Tabs in the Next.js app

1. **Home** — Hero ("Welcome to API Board"), pillars, 13-API feature grid, cURL preview, GitHub CTA
2. **APIs** — All 13 APIs with endpoint, sample key, cURL example, JSON response
3. **Management** — Dashboard with GitHub profile, stats, key list (reveal/copy/rotate/pause/revoke + sparkline + editor + purpose) + create-key modal
4. **Downloads** — 7 downloadable items including the new `game-launcher-detector.bat`
5. **e#** — esharp language page: mascot, Steam mashup sample, in-browser editor, VS Code walkthrough, 6 feature cards
6. **Comments** — Sign in with GitHub to post + upload images + upvote (no bot comments)
7. **Docs** — Vercel-style docs with sidebar (5 categories, 16 docs pages including 4 new)
8. **Code Sheets** — File-tree viewer with 6 drop-in sheets

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Animations**: Framer Motion + custom CSS keyframes
- **Static site**: Plain HTML5 + CSS3 + vanilla JS (no build, GitHub Pages friendly)
- **Code highlighting**: react-syntax-highlighter (Prism)
- **Theme**: next-themes (Light / Dark / System)
- **Icons**: lucide-react (Next.js app) + inline SVG sprite (static site)
- **GitHub auth**: PAT-based, calls `api.github.com/user` with `read:user` scope

## Getting started

```bash
git clone https://github.com/gefrus112/API-board.git
cd API-board
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For the static GitHub Pages site, just open `docs/index.html` in a browser, or visit <https://gefrus112.github.io/API-board/>.

## License

**API Board Restricted Access License v1.4** — see [LICENSE](LICENSE).

Personal evaluation is allowed. Copying, forking, redistributing, or building derivative works requires written permission.

## Acknowledgements

Built by gefrus112. Mascot cube designed by gefrus112. The e# (esharp) language is a speculative concept presented for evaluation purposes.
