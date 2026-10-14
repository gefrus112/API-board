# API Board

> One board for every API key you need. **v1.2** — GitHub sign-in, API Management dashboard, Windows installers, the e# language, and a static HTML5 version for GitHub Pages.

API Board is an open-source single-page web app that bundles **13 free APIs** behind one dashboard, with copy-paste code sheets, Vercel-style documentation, a Windows installer for Visual Studio, and **e# (esharp)** — a Rust-inspired programming language for combining video games together.

![API Board](public/cube.svg)

## v1.2 highlights

- **GitHub sign-in** — Users authorize access with their own GitHub Personal Access Token (PAT). We only call `api.github.com/user` with `read:user` scope; the token stays in your browser's localStorage.
- **API Management dashboard** — Create keys per service, per editor, per purpose. See quota, usage trends, and the editor you used (Visual Studio 2022 / VS Code / Cursor / WebStorm / Rider / Neovim / Other).
- **Create-key modal** — Pick the service, environment (production / staging / sandbox), editor, and purpose. Choose your own key prefix (`ab_live_`, `ab_test_`, `ab_demo_`, `ab_trial_`) and key name.
- **New API: Email & Signup** — Generate branded sign-up pages with email verification, magic-link login, and inbound email webhooks.
- **New tab: Downloads** — Windows batch files (`install-apiboard-vs.bat`, `install-esharp.bat`, `connect-style-sheets.bat`), the `hello.esharp` sample, the downloadable `style.css`, and a static HTML5 version of the site.
- **New tab: e#** — The esharp programming language: mascot icon, sample code, 6 feature cards, install steps.
- **New docs** — Connect API Board to Visual Studio, How to use style sheets in Visual Studio, The e# language guide, Batch files & downloads guide.
- **Cool VFX** — Rotating 3D cube logo, pulsing glow, aurora background blobs, particle drift, scanline sweep on download cards, animated tab transitions, glitch hover on the headline. All respect `prefers-reduced-motion`.
- **Static HTML5 version** — A self-contained `index.html` + inline CSS + inline JS that recreates the homepage. Drag-and-drop into GitHub Pages `/docs` folder to publish.
- **Restrictive license** — v1.2 ships under the API Board Restricted Access License. Personal evaluation is allowed; copying, forking, or building derivative works requires written permission. See [LICENSE](LICENSE).

## Features

- **13 free APIs** — Movie Search, Weather, Rapid Tracking, IP Geolocation, Currency Exchange, Jokes, News Headlines, QR Generator, Sports Scores, Books, Recipes, Random User, Email & Signup
- **Single dashboard** for managing API keys — create, rotate, pause, revoke
- **Per-key editor & purpose** — see at-a-glance which editor you used and what the key is for
- **GitHub profile card** in the dashboard when signed in
- **Live activity feed** — see every call, rotation, and warning in real time
- **Quota tracking** with sparklines per key
- **Copy-paste code sheets** in CSS, JavaScript, TypeScript, C++, Python, and esharp
- **Vercel-style docs** — searchable sidebar, multiple categories, tip/warn callouts
- **Light / Dark / System theme toggle** — persisted to localStorage
- **Custom blue cube mascot** with animated rotation + pulsing glow — also the favicon
- **e# (esharp) programming language** — combine games together, Rust-inspired syntax, VS project template
- **Windows batch installers** — run as administrator to install the API in Visual Studio, install e#, or connect style sheets to any project
- **Static HTML5 version** for GitHub Pages — single self-contained file, no build needed
- **Mobile responsive** — hamburger nav, single-column grids on phones

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Animations**: Framer Motion + custom CSS keyframes (cube-spin, cube-pulse-glow, aurora-drift, scan-sweep, glitch-shake)
- **Code highlighting**: react-syntax-highlighter (Prism — One Light / One Dark)
- **Theme**: next-themes (Light / Dark / System)
- **Icons**: lucide-react
- **GitHub auth**: Direct browser-side calls to `api.github.com/user` with the user's PAT (read:user scope)

## Getting started

### Prerequisites

- Node.js 20+ (recommended 22 LTS)
- npm, pnpm, or bun
- Git
- A GitHub Personal Access Token with `read:user` scope (for sign-in)

### Install & run

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

### Windows installers

| File | What it does | Admin? |
|---|---|---|
| `install-apiboard-vs.bat` | Installs the API Board Connect extension into every VS 2022 instance. | ✅ |
| `install-esharp.bat` | Installs the e# compiler + runtime + .esharp file association + VS project template. | ✅ |
| `connect-style-sheets.bat` | Downloads `style.css` into `./css/style.css` of any project. | ❌ |

All three live in `public/downloads/` and are downloadable from the **Downloads** tab of the website.

### Static HTML5 version

A self-contained single-file version of the site lives at `public/downloads/api-board-static.html`. Download it and drop it into any static host — no build step needed.

## Available scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the dev server on port 3000        |
| `npm run build`   | Build for production                     |
| `npm run start`   | Start the production server             |
| `npm run lint`    | Run ESLint                              |
| `npm run db:push` | Push the Prisma schema to the database  |

## Tabs

1. **Home** — Hero ("Welcome to API Board"), pillars (Fast / Secure / Composable), 13-API feature grid, cURL preview, GitHub CTA
2. **APIs** — Searchable, filterable showcase of all 13 APIs with endpoint, sample key, cURL example, and JSON response for each
3. **Management** — GitHub profile card + dashboard with stats + key list (reveal/copy/rotate/pause/revoke + sparkline + editor + purpose) + live activity feed + create-key modal
4. **Downloads** — 6 downloadable items: 3 Windows batch files, 1 esharp sample, style.css, static HTML5 version. Each card has Download / Raw / Copy-PowerShell buttons.
5. **e#** — esharp language page: mascot icon, sample code, 6 feature cards (Compose games, Rust-grade safety, Zero-cost abstractions, Cross-platform, API Board bindings, Visual Studio support), install steps
6. **Docs** — Vercel-style docs with sidebar grouped by 5 categories: Introduction, Production, API Guides, Tools, IDE Guides (How to use in Visual Studio / VS Code / push to GitHub / Connect to VS / use style sheets / e# language / batch files)
7. **Code Sheets** — File-tree viewer with 6 drop-in sheets (style.css, weather.js, movie.js, tracking.js, weather.cpp, weather.py)

## API list

| # | API                | Category      | Method | Auth             | Sample key prefix     |
|---|--------------------|---------------|--------|------------------|-----------------------|
| 1 | Movie Search       | Entertainment | GET    | Bearer Token     | `ab_live_movie_…`     |
| 2 | Weather            | Climate       | GET    | API Key (query)  | `ab_live_weather_…`   |
| 3 | Rapid Tracking     | Logistics     | POST   | Bearer Token     | `ab_live_track_…`     |
| 4 | IP Geolocation     | Network       | GET    | API Key (header) | `ab_live_geo_…`       |
| 5 | Currency Exchange  | Finance       | GET    | Bearer Token     | `ab_live_fx_…`        |
| 6 | Jokes              | Fun           | GET    | API Key (query)  | `ab_live_jokes_…`     |
| 7 | News Headlines     | Media         | GET    | Bearer Token     | `ab_live_news_…`      |
| 8 | QR Generator       | Utility       | GET    | API Key (query)  | `ab_live_qr_…`        |
| 9 | Sports Scores      | Entertainment | GET    | Bearer Token     | `ab_live_sports_…`    |
| 10| Books              | Entertainment | GET    | API Key (query)  | `ab_live_books_…`     |
| 11| Recipes            | Utility       | GET    | API Key (header) | `ab_live_recipes_…`   |
| 12| Random User        | Utility       | GET    | Bearer Token     | `ab_live_users_…`     |
| 13| Email & Signup     | Utility       | POST   | Bearer Token     | `ab_live_email_…`     |

## Documentation

### IDE Guides

- **How to use API Board in Visual Studio** — Install the Node.js workload, clone the repo, set environment variables, run the dev server, and set breakpoints.
- **How to use API Board in VS Code** — Lighter-weight setup with recommended extensions, tasks, and the JavaScript Debug Terminal.
- **How to push API Board to GitHub from Visual Studio** — Authenticate, create a feature branch, stage/commit changes, push, and resolve merge conflicts.
- **Connect API Board to Visual Studio** — Install the API Board Connect extension, paste your key, generate a strongly-typed C#/TS client, and use the built-in playground.
- **How to use API Board style sheets in Visual Studio** — Drop style.css into wwwroot, wire it into _Layout.cshtml, and use the .ab- utility classes.

### Production guides

- **Getting Started**, **Authentication**, **Rate Limits & Quotas**, **Errors & Status Codes**, **Deployment** (Vercel / Netlify / self-hosted Docker)
- **API Guides** for Movie Search, Weather, and Rapid Tracking
- **SDKs & CLI** — JavaScript, Python, Go SDKs + the `apiboard` CLI for key rotation
- **Batch files & downloads** — What every .bat file does and when to run as administrator.

### The e# language

- **The e# (esharp) programming language** — Combine video games together with a Rust-inspired syntax. Scene composition, ownership, and API Board bindings.

## License

**API Board Restricted Access License v1.2** — see [LICENSE](LICENSE).

Personal evaluation is allowed. Copying, forking, redistributing, or building derivative works requires written permission from the copyright holder. To request access or a commercial license, open an issue at <https://github.com/gefrus112/API-board/issues>.

## Contributing

This project is **not open for unsolicited contributions** under the restrictive license. To propose a feature, fix, or extension, please:

1. Open an issue describing the change and your intended use.
2. Wait for a fork-and-extend grant from the maintainer.
3. Once granted, fork the repo, create a feature branch, and open a Pull Request.

## Acknowledgements

Built by gefrus112. Mascot cube designed by gefrus112. The e# (esharp) language is a speculative concept presented for evaluation purposes.
