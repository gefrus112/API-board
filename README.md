# API Board

> One board for every API key you need. Free API keys, copy-paste code sheets, and Vercel-style docs for movie search, weather, package tracking, geolocation, currency, jokes, news, QR generation, sports scores, books, recipes, and random user generation.

API Board is an open-source single-page web app that bundles **12 free APIs** behind one dashboard, with copy-paste code sheets and Vercel-style documentation.

![API Board](public/cube.svg)

## Features

- **12 free APIs** — Movie Search, Weather, Rapid Tracking, IP Geolocation, Currency Exchange, Jokes, News Headlines, QR Generator, Sports Scores, Books, Recipes, Random User
- **Single dashboard** for managing API keys — create, rotate, pause, revoke
- **Live activity feed** — see every call, rotation, and warning in real time
- **Quota tracking** with sparklines per key
- **Copy-paste code sheets** in CSS, JavaScript, TypeScript, C++, and Python
- **Vercel-style docs** — searchable sidebar, multiple categories, tip/warn callouts
- **Light / Dark / System theme toggle** — persisted to localStorage
- **Custom blue cube mascot** with a friendly face — also used as the favicon
- **Mobile responsive** — hamburger nav, single-column grids on phones
- **Open source on GitHub** — MIT licensed

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Animations**: Framer Motion (scroll-triggered reveals, staggered grids, page transitions)
- **Code highlighting**: react-syntax-highlighter (Prism — One Light / One Dark)
- **Theme**: next-themes (Light / Dark / System)
- **Icons**: lucide-react
- **Database**: Prisma ORM (SQLite client) — available but unused in the demo

## Getting started

### Prerequisites

- Node.js 20+ (recommended 22 LTS)
- npm, pnpm, or bun
- Git

### Install & run

```bash
git clone https://github.com/gefrus112/API-board.git
cd API-board
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the dev server on port 3000        |
| `npm run build`   | Build for production                     |
| `npm run start`    | Start the production server              |
| `npm run lint`    | Run ESLint                               |
| `npm run db:push` | Push the Prisma schema to the database   |

## Project structure

```
.
├── public/
│   └── cube.svg                # Blue cube mascot — also used as favicon
├── src/
│   ├── app/
│   │   ├── globals.css        # Brand palette, scrollbar, grid bg, glow
│   │   ├── layout.tsx         # Root layout + ThemeProvider + metadata
│   │   └── page.tsx           # Single-page tab switcher
│   └── components/
│       ├── api-board/
│       │   ├── code-block.tsx     # Reusable code block w/ copy + syntax highlight
│       │   ├── cube-logo.tsx      # Blue cube mascot SVG (inline)
│       │   ├── data.ts            # 12 APIs, 8 keys, 8 events, 12 docs, 6 code sheets
│       │   ├── docs-section.tsx   # Vercel-style docs reader
│       │   ├── footer.tsx         # Sticky footer with sitemap
│       │   ├── header.tsx         # Sticky header w/ tabs + theme toggle + mobile menu
│       │   ├── hero.tsx           # Landing page (Welcome to API Board)
│       │   ├── apis-section.tsx   # Searchable API showcase
│       │   ├── management-section.tsx  # API key dashboard
│       │   ├── motion.tsx         # Reusable framer-motion helpers
│       │   ├── sheets-section.tsx # Code sheet viewer
│       │   ├── theme-provider.tsx # next-themes wrapper
│       │   └── theme-toggle.tsx   # Light/Dark/System dropdown
│       └── ui/                    # shadcn/ui components
├── prisma/schema.prisma
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Tabs

1. **Home** — Hero ("Welcome to API Board"), pillars (Fast / Secure / Composable), 12-API feature grid, cURL preview, GitHub CTA
2. **APIs** — Searchable, filterable showcase of all 12 APIs with endpoint, sample key, cURL example, and JSON response for each
3. **Management** — Dashboard with stats (calls today/month, active keys, quota used), key list with reveal/copy/rotate/pause/revoke buttons + sparkline per key, and a live activity feed
4. **Docs** — Vercel-style docs with sidebar grouped by category: Introduction, Production, API Guides, Tools, IDE Guides (How to use in Visual Studio / VS Code / push to GitHub from VS)
5. **Code Sheets** — File-tree viewer with 6 drop-in sheets (style.css, weather.js, movie.js, tracking.js, weather.cpp, weather.py) — each with raw GitHub URL and syntax-highlighted source

## API list

| # | API                | Category      | Method | Auth            | Sample key prefix     |
|---|--------------------|---------------|--------|-----------------|-----------------------|
| 1 | Movie Search       | Entertainment | GET    | Bearer Token    | `ab_live_movie_…`     |
| 2 | Weather            | Climate       | GET    | API Key (query) | `ab_live_weather_…`  |
| 3 | Rapid Tracking     | Logistics     | POST   | Bearer Token    | `ab_live_track_…`    |
| 4 | IP Geolocation     | Network       | GET    | API Key (header)| `ab_live_geo_…`      |
| 5 | Currency Exchange  | Finance       | GET    | Bearer Token    | `ab_live_fx_…`       |
| 6 | Jokes              | Fun           | GET    | API Key (query) | `ab_live_jokes_…`    |
| 7 | News Headlines     | Media         | GET    | Bearer Token    | `ab_live_news_…`     |
| 8 | QR Generator       | Utility       | GET    | API Key (query) | `ab_live_qr_…`       |
| 9 | Sports Scores      | Entertainment | GET    | Bearer Token    | `ab_live_sports_…`   |
| 10| Books              | Entertainment | GET    | API Key (query) | `ab_live_books_…`    |
| 11| Recipes            | Utility       | GET    | API Key (header)| `ab_live_recipes_…`  |
| 12| Random User        | Utility       | GET    | Bearer Token    | `ab_live_users_…`    |

## Documentation

### IDE Guides

- **How to use API Board in Visual Studio** — Install the Node.js workload, clone the repo, set environment variables, run the dev server, and set breakpoints.
- **How to use API Board in VS Code** — Lighter-weight setup with recommended extensions, tasks, and the JavaScript Debug Terminal.
- **How to push API Board to GitHub from Visual Studio** — Authenticate, create a feature branch, stage/commit changes, push, and resolve merge conflicts.

### Production guides

- **Getting Started**, **Authentication**, **Rate Limits & Quotas**, **Errors & Status Codes**, **Deployment** (Vercel / Netlify / self-hosted Docker)
- **API Guides** for Movie Search, Weather, and Rapid Tracking
- **SDKs & CLI** — JavaScript, Python, Go SDKs + the `apiboard` CLI for key rotation

## License

MIT — see [LICENSE](LICENSE).

## Contributing

Pull requests welcome. Please read the contributing guide before opening a PR.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/): `feat(apis): add recipes search by ingredient`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## Acknowledgements

Built by the open source community. Mascot cube designed by gefrus112.
