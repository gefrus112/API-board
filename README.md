# API Board

> One board for every API key you need. **v1.3** — GitHub Pages live, in-browser e# code editor, Steam game combiner, community comments with image uploads + upvoting.

API Board is an open-source single-page web app that bundles **13 free APIs** behind one dashboard, with copy-paste code sheets, Vercel-style documentation, a Windows installer for Visual Studio, **e# (esharp)** — a Rust-inspired programming language for combining Steam games together — and a built-in code editor.

![API Board](public/cube.svg)

## v1.3 highlights

- **GitHub Pages live** — The static HTML5 version of the site is now published at **<https://gefrus112.github.io/API-board/>** via the `/docs` folder. Visit the URL to see the full website (not just the README).
- **In-browser e# code editor** — Custom textarea with line numbers, syntax-highlighted overlay (use / game! / fn / let / Scene / strings / comments), a Run button that simulates the build + run output, and three switchable sample programs (hello / steam-mashup / weather-game).
- **Combine Steam games together** — New `SteamMashup` sample program shows how `Steam::library().pick("Portal 2")` returns a renderable scene, and the `+` operator composes multiple games into one playable experience.
- **VS Code walkthrough with stylized screenshots** — 4 annotated mockup screenshots of VS Code showing: new project, open hello.esharp, paste the Steam mashup, press F5 to run.
- **Comments tab** — Sign in with GitHub to post comments about the website, code, e# language, or other features. Upload images (up to 1.5 MB each), upvote comments (toggleable), delete your own comments, sort by Top or Newest. All persisted in localStorage.
- **3 stat cards** at the top of Comments — total comments, total upvotes, total topics.

## GitHub Pages

The static HTML5 version lives in the [`/docs`](docs/) folder. GitHub Pages serves it from `main` branch, `/docs` path.

Live URL: **<https://gefrus112.github.io/API-board/>**

## Features

- **13 free APIs** — Movie Search, Weather, Rapid Tracking, IP Geolocation, Currency Exchange, Jokes, News Headlines, QR Generator, Sports Scores, Books, Recipes, Random User, Email & Signup
- **Single dashboard** for managing API keys — create, rotate, pause, revoke, with editor + purpose columns
- **GitHub profile card** in the dashboard when signed in
- **Live activity feed** — see every call, rotation, and warning in real time
- **Copy-paste code sheets** in CSS, JavaScript, TypeScript, C++, Python, and esharp
- **Vercel-style docs** — searchable sidebar, multiple categories, tip/warn callouts
- **Light / Dark / System theme toggle** — persisted to localStorage
- **Custom blue cube mascot** with animated rotation + pulsing glow — also the favicon
- **e# (esharp) programming language** — combine Steam games together, Rust-inspired syntax, VS project template, in-browser editor
- **Windows batch installers** — run as administrator to install the API in Visual Studio, install e#, or connect style sheets to any project
- **Static HTML5 version** for GitHub Pages — single self-contained site in `/docs`, no build needed
- **Mobile responsive** — hamburger nav, single-column grids on phones
- **Comments** — sign in to post, upload images, upvote, sort by Top/Newest

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Animations**: Framer Motion + custom CSS keyframes
- **Code highlighting**: react-syntax-highlighter (Prism — One Light / One Dark)
- **Theme**: next-themes (Light / Dark / System)
- **Icons**: lucide-react
- **GitHub auth**: Direct browser-side calls to `api.github.com/user` with the user's PAT (read:user scope)

## Getting started

```bash
git clone https://github.com/gefrus112/API-board.git
cd API-board
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Sign in with GitHub

1. Click **Sign in** in the header.
2. Paste your GitHub PAT (generate one at <https://github.com/settings/tokens> with the `read:user` scope).
3. The app fetches your public profile via `api.github.com/user` and shows your avatar + username in the header.
4. The token is stored in `localStorage` and only ever sent to `api.github.com`.

## Tabs

1. **Home** — Hero ("Welcome to API Board"), pillars (Fast / Secure / Composable), 13-API feature grid, cURL preview, GitHub CTA
2. **APIs** — Searchable, filterable showcase of all 13 APIs with endpoint, sample key, cURL example, and JSON response
3. **Management** — GitHub profile card + dashboard with stats + key list (reveal/copy/rotate/pause/revoke + sparkline + editor + purpose) + live activity feed + create-key modal
4. **Downloads** — 6 downloadable items: 3 Windows batch files, 1 esharp sample, style.css, static HTML5 version
5. **e#** — esharp language page: mascot icon, Steam game combiner sample, in-browser code editor, 4 VS Code walkthrough screenshots, 6 feature cards, install steps
6. **Comments** — Sign in to post comments + upload images + upvote. Sort by Top or Newest. 3 stat cards. Topic chips (Website / Code / e# / Other).
7. **Docs** — Vercel-style docs with sidebar grouped by 5 categories: Introduction, Production, API Guides, Tools, IDE Guides
8. **Code Sheets** — File-tree viewer with 6 drop-in sheets

## License

**API Board Restricted Access License v1.3** — see [LICENSE](LICENSE).

Personal evaluation is allowed. Copying, forking, redistributing, or building derivative works requires written permission from the copyright holder.

## Acknowledgements

Built by gefrus112. Mascot cube designed by gefrus112. The e# (esharp) language is a speculative concept presented for evaluation purposes.
