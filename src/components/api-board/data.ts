export interface ApiEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  authType: string;
  sampleKey: string;
  requestExample: string;
  responseExample: string;
  docsUrl: string;
  icon: string; // lucide icon name
  tags: string[];
  free: boolean;
}

export const REPO_URL = "https://github.com/gefrus112/API-board";

export const apis: ApiEntry[] = [
  {
    id: "movie-search",
    name: "Movie Search API",
    category: "Entertainment",
    description:
      "Search movies by title, year, or genre. Returns poster, plot, cast, ratings, and streaming availability. Powered by OMDb / TMDB-style metadata.",
    endpoint: "https://api.apiboard.dev/v1/movies/search",
    method: "GET",
    authType: "Bearer Token",
    sampleKey: "ab_live_movie_9f3c7d2a1b8e4c6f",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/movies/search?q=inception&year=2010' \\
  -H 'Authorization: Bearer ab_live_movie_9f3c7d2a1b8e4c6f'`,
    responseExample: `{
  "page": 1,
  "results": [
    {
      "id": "tt1375666",
      "title": "Inception",
      "year": 2010,
      "runtime_min": 148,
      "genres": ["Action", "Sci-Fi", "Thriller"],
      "rating": 8.8,
      "poster": "https://cdn.apiboard.dev/p/inception.jpg",
      "director": "Christopher Nolan",
      "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
    }
  ],
  "total": 1
}`,
    docsUrl: "#docs",
    icon: "Film",
    tags: ["movies", "tmdb", "omdb", "streaming"],
    free: true,
  },
  {
    id: "weather",
    name: "Weather API",
    category: "Climate",
    description:
      "Current conditions, 7-day forecast, severe alerts, and historical climate data for any city, ZIP code, or lat/lon. Supports metric and imperial units.",
    endpoint: "https://api.apiboard.dev/v1/weather/forecast",
    method: "GET",
    authType: "API Key (query)",
    sampleKey: "ab_live_weather_4e2f9a8c1d6b3f7e",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/weather/forecast?city=Berlin&units=metric&key=ab_live_weather_4e2f9a8c1d6b3f7e'`,
    responseExample: `{
  "location": {
    "name": "Berlin",
    "country": "DE",
    "lat": 52.52,
    "lon": 13.405
  },
  "current": {
    "temp_c": 14.2,
    "feels_like_c": 13.1,
    "humidity_pct": 64,
    "wind_kph": 18,
    "condition": "Partly cloudy"
  },
  "forecast": [
    { "date": "2026-10-15", "high_c": 16, "low_c": 8, "condition": "Sunny" }
  ]
}`,
    docsUrl: "#docs",
    icon: "CloudSun",
    tags: ["weather", "forecast", "climate", "openweather"],
    free: true,
  },
  {
    id: "rapid-tracking",
    name: "Rapid Tracking API",
    category: "Logistics",
    description:
      "Real-time package tracking for 200+ carriers worldwide: UPS, FedEx, DHL, USPS, YunExpress, and more. Returns shipment status, ETA, and event history.",
    endpoint: "https://api.apiboard.dev/v1/tracking/status",
    method: "POST",
    authType: "Bearer Token",
    sampleKey: "ab_live_track_7b1c3e9d4a2f6c8b",
    requestExample: `curl -X POST \\
  'https://api.apiboard.dev/v1/tracking/status' \\
  -H 'Authorization: Bearer ab_live_track_7b1c3e9d4a2f6c8b' \\
  -H 'Content-Type: application/json' \\
  -d '{ "carrier": "ups", "tracking_number": "1Z999AA10123456784" }'`,
    responseExample: `{
  "tracking_number": "1Z999AA10123456784",
  "carrier": "ups",
  "status": "in_transit",
  "eta_iso": "2026-10-17T16:30:00Z",
  "events": [
    { "time_iso": "2026-10-14T08:12:00Z", "location": "Louisville, KY, US", "status": "Departed origin facility" },
    { "time_iso": "2026-10-14T11:45:00Z", "location": "Columbus, OH, US", "status": "In transit" }
  ]
}`,
    docsUrl: "#docs",
    icon: "PackageSearch",
    tags: ["tracking", "ups", "fedex", "dhl", "logistics"],
    free: true,
  },
  {
    id: "ip-geo",
    name: "IP Geolocation API",
    category: "Network",
    description:
      "Lookup country, region, city, ISP, ASN, and proxy/VPN detection from any IPv4 / IPv6 address. Useful for analytics, fraud prevention, and personalization.",
    endpoint: "https://api.apiboard.dev/v1/geo/ip",
    method: "GET",
    authType: "API Key (header)",
    sampleKey: "ab_live_geo_2f8a4e6c1b3d9f7e",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/geo/ip?ip=8.8.8.8' \\
  -H 'X-API-Key: ab_live_geo_2f8a4e6c1b3d9f7e'`,
    responseExample: `{
  "ip": "8.8.8.8",
  "country": "US",
  "country_name": "United States",
  "region": "CA",
  "city": "Mountain View",
  "isp": "Google LLC",
  "asn": "AS15169",
  "proxy": false,
  "vpn": false
}`,
    docsUrl: "#docs",
    icon: "Globe",
    tags: ["geo", "ip", "location", "fraud"],
    free: true,
  },
  {
    id: "currency",
    name: "Currency Exchange API",
    category: "Finance",
    description:
      "Live FX rates for 170+ currencies including crypto. Supports historical rates back to 1999 and currency conversion with one call.",
    endpoint: "https://api.apiboard.dev/v1/fx/convert",
    method: "GET",
    authType: "Bearer Token",
    sampleKey: "ab_live_fx_6a9b2c4d8e1f7b3c",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/fx/convert?from=USD&to=EUR&amount=42.50' \\
  -H 'Authorization: Bearer ab_live_fx_6a9b2c4d8e1f7b3c'`,
    responseExample: `{
  "from": "USD",
  "to": "EUR",
  "amount": 42.50,
  "rate": 0.918,
  "result": 39.015,
  "fetched_at": "2026-10-14T13:00:00Z"
}`,
    docsUrl: "#docs",
    icon: "Coins",
    tags: ["fx", "currency", "exchange", "finance"],
    free: true,
  },
  {
    id: "jokes",
    name: "Jokes API",
    category: "Fun",
    description:
      "Programming, dad, and knock-knock jokes in 6 languages. Filter by category, safe mode, and blacklist flags. Great for chatbots and demo apps.",
    endpoint: "https://api.apiboard.dev/v1/jokes/random",
    method: "GET",
    authType: "API Key (query)",
    sampleKey: "ab_live_jokes_1c8a2b6d3e9f4c7a",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/jokes/random?category=programming&lang=en' \\
  -H 'key: ab_live_jokes_1c8a2b6d3e9f4c7a'`,
    responseExample: `{
  "id": "ab_jk_421",
  "category": "programming",
  "lang": "en",
  "safe": true,
  "type": "single",
  "joke": "Why do programmers prefer dark mode? Because light attracts bugs."
}`,
    docsUrl: "#docs",
    icon: "Laugh",
    tags: ["jokes", "fun", "chatbot", "demo"],
    free: true,
  },
  {
    id: "news",
    name: "News Headlines API",
    category: "Media",
    description:
      "Top headlines and full-text articles from 80,000+ sources in 50+ countries. Filter by source, domain, language, and date range.",
    endpoint: "https://api.apiboard.dev/v1/news/top",
    method: "GET",
    authType: "Bearer Token",
    sampleKey: "ab_live_news_5e8a3c1b7d9f2c4a",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/news/top?country=us&category=technology' \\
  -H 'Authorization: Bearer ab_live_news_5e8a3c1b7d9f2c4a'`,
    responseExample: `{
  "status": "ok",
  "total": 23,
  "articles": [
    {
      "title": "Next.js 16 ships with Turbopack stable",
      "source": "techcrunch.com",
      "url": "https://example.com/article-1",
      "published_iso": "2026-10-14T10:00:00Z",
      "summary": "Vercel announces Turbopack stable..."
    }
  ]
}`,
    docsUrl: "#docs",
    icon: "Newspaper",
    tags: ["news", "headlines", "articles", "media"],
    free: true,
  },
  {
    id: "qr-code",
    name: "QR Code Generator API",
    category: "Utility",
    description:
      "Generate QR codes for URLs, vCards, Wi-Fi, calendar events, and crypto addresses. Output as PNG, SVG, or base64 with custom colors and logo overlay.",
    endpoint: "https://api.apiboard.dev/v1/qr/generate",
    method: "GET",
    authType: "API Key (query)",
    sampleKey: "ab_live_qr_3d2a6b8f1e4c7a9d",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/qr/generate?data=https://github.com/gefrus112/API-board&format=svg&color=%230066ff' \\
  -H 'key: ab_live_qr_3d2a6b8f1e4c7a9d'`,
    responseExample: `{
  "format": "svg",
  "size": 256,
  "data": "https://github.com/gefrus112/API-board",
  "content": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" ...></svg>"
}`,
    docsUrl: "#docs",
    icon: "QrCode",
    tags: ["qr", "generator", "barcode", "utility"],
    free: true,
  },
  {
    id: "sports",
    name: "Sports Scores API",
    category: "Entertainment",
    description:
      "Live scores, schedules, rosters, and standings for NFL, NBA, MLB, NHL, EPL, La Liga, and 30+ leagues. Includes player stats and injury reports.",
    endpoint: "https://api.apiboard.dev/v1/scores/live",
    method: "GET",
    authType: "Bearer Token",
    sampleKey: "ab_live_sports_8c4a2e9d1b7f3c6a",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/scores/live?league=nba&date=2026-10-14' \\
  -H 'Authorization: Bearer ab_live_sports_8c4a2e9d1b7f3c6a'`,
    responseExample: `{
  "league": "nba",
  "date": "2026-10-14",
  "games": [
    {
      "id": "nba_20261014_lal_bos",
      "status": "in_progress",
      "clock": "Q4 02:18",
      "home": { "team": "BOS", "score": 102 },
      "away": { "team": "LAL", "score": 98 }
    }
  ]
}`,
    docsUrl: "#docs",
    icon: "Trophy",
    tags: ["sports", "nba", "nfl", "soccer", "scores"],
    free: true,
  },
  {
    id: "books",
    name: "Books API",
    category: "Entertainment",
    description:
      "Search 30M+ books by ISBN, title, author, or genre. Returns covers, descriptions, ratings, and Goodreads-style reviews. ISBN normalization included.",
    endpoint: "https://api.apiboard.dev/v1/books/search",
    method: "GET",
    authType: "API Key (query)",
    sampleKey: "ab_live_books_3b9c1d4a6f2e8c7d",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/books/search?q=clean+code&author=martin' \\
  -H 'key: ab_live_books_3b9c1d4a6f2e8c7d'`,
    responseExample: `{
  "total": 1,
  "books": [
    {
      "isbn13": "9780132350884",
      "title": "Clean Code",
      "authors": ["Robert C. Martin"],
      "publisher": "Prentice Hall",
      "year": 2008,
      "pages": 464,
      "rating": 4.7,
      "cover": "https://cdn.apiboard.dev/b/cleancode.jpg"
    }
  ]
}`,
    docsUrl: "#docs",
    icon: "BookOpen",
    tags: ["books", "isbn", "literature", "reviews"],
    free: true,
  },
  {
    id: "recipes",
    name: "Recipes API",
    category: "Utility",
    description:
      "Search 2M+ recipes by ingredients, diet, cuisine, or meal type. Returns full instructions, nutrition facts, and step-by-step images.",
    endpoint: "https://api.apiboard.dev/v1/recipes/search",
    method: "GET",
    authType: "API Key (header)",
    sampleKey: "ab_live_recipes_2d8b4a6c1f3e9b7d",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/recipes/search?ingredients=chicken,rice&diet=gluten-free' \\
  -H 'X-API-Key: ab_live_recipes_2d8b4a6c1f3e9b7d'`,
    responseExample: `{
  "results": [
    {
      "id": "r_4821",
      "title": "One-pan chicken and rice",
      "ready_in_min": 35,
      "servings": 4,
      "calories": 520,
      "image": "https://cdn.apiboard.dev/r/one-pan.jpg",
      "source_url": "https://example.com/one-pan"
    }
  ]
}`,
    docsUrl: "#docs",
    icon: "CookingPot",
    tags: ["recipes", "food", "cooking", "nutrition"],
    free: true,
  },
  {
    id: "random-user",
    name: "Random User API",
    category: "Utility",
    description:
      "Generate realistic mock user profiles (name, email, phone, address, avatar) for testing, demos, and seed data. 50+ nationalities supported.",
    endpoint: "https://api.apiboard.dev/v1/users/random",
    method: "GET",
    authType: "Bearer Token",
    sampleKey: "ab_live_users_5a1c9b3d2e7f4c8a",
    requestExample: `curl -X GET \\
  'https://api.apiboard.dev/v1/users/random?nat=us&results=3' \\
  -H 'Authorization: Bearer ab_live_users_5a1c9b3d2e7f4c8a'`,
    responseExample: `{
  "results": [
    {
      "gender": "female",
      "name": { "first": "Emily", "last": "Carter" },
      "email": "emily.carter@example.com",
      "phone": "(555) 010-2934",
      "nat": "US",
      "avatar": "https://cdn.apiboard.dev/u/emily.jpg"
    }
  ],
  "info": { "results": 3, "version": "1.4" }
}`,
    docsUrl: "#docs",
    icon: "Users",
    tags: ["users", "mock", "test-data", "demo"],
    free: true,
  },
];

export interface ManagedKey {
  id: string;
  service: string;
  label: string;
  key: string;
  environment: "production" | "staging" | "sandbox";
  status: "active" | "rotating" | "revoked" | "paused";
  createdAt: string;
  lastUsedAt: string;
  callsToday: number;
  callsThisMonth: number;
  quotaPerDay: number;
  trend: number[]; // last 14 days
}

export const managedKeys: ManagedKey[] = [
  {
    id: "mk_movie_prod",
    service: "Movie Search",
    label: "prod · web",
    key: "ab_live_movie_9f3c7d2a1b8e4c6f",
    environment: "production",
    status: "active",
    createdAt: "2026-08-12T09:14:00Z",
    lastUsedAt: "2026-10-14T13:11:42Z",
    callsToday: 412,
    callsThisMonth: 8421,
    quotaPerDay: 1000,
    trend: [180, 240, 260, 310, 290, 350, 410, 380, 420, 460, 440, 480, 510, 412],
  },
  {
    id: "mk_weather_prod",
    service: "Weather",
    label: "prod · web",
    key: "ab_live_weather_4e2f9a8c1d6b3f7e",
    environment: "production",
    status: "active",
    createdAt: "2026-08-12T09:14:00Z",
    lastUsedAt: "2026-10-14T13:11:50Z",
    callsToday: 980,
    callsThisMonth: 21400,
    quotaPerDay: 1000,
    trend: [620, 740, 810, 870, 910, 940, 980, 1010, 990, 1020, 980, 970, 960, 980],
  },
  {
    id: "mk_track_prod",
    service: "Rapid Tracking",
    label: "prod · backend",
    key: "ab_live_track_7b1c3e9d4a2f6c8b",
    environment: "production",
    status: "rotating",
    createdAt: "2026-09-22T14:30:00Z",
    lastUsedAt: "2026-10-14T13:11:18Z",
    callsToday: 156,
    callsThisMonth: 3220,
    quotaPerDay: 1000,
    trend: [40, 80, 120, 140, 180, 160, 200, 210, 180, 190, 170, 150, 165, 156],
  },
  {
    id: "mk_geo_staging",
    service: "IP Geolocation",
    label: "staging · qa",
    key: "ab_test_geo_2f8a4e6c1b3d9f7e",
    environment: "staging",
    status: "active",
    createdAt: "2026-10-01T11:00:00Z",
    lastUsedAt: "2026-10-14T12:48:09Z",
    callsToday: 42,
    callsThisMonth: 980,
    quotaPerDay: 1000,
    trend: [12, 18, 24, 30, 28, 36, 40, 38, 44, 42, 48, 46, 50, 42],
  },
  {
    id: "mk_fx_prod",
    service: "Currency Exchange",
    label: "prod · cron",
    key: "ab_live_fx_6a9b2c4d8e1f7b3c",
    environment: "production",
    status: "active",
    createdAt: "2026-08-12T09:14:00Z",
    lastUsedAt: "2026-10-14T13:10:55Z",
    callsToday: 1,
    callsThisMonth: 31,
    quotaPerDay: 1000,
    trend: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: "mk_jokes_sandbox",
    service: "Jokes",
    label: "sandbox · demo",
    key: "ab_test_jokes_1c8a2b6d3e9f4c7a",
    environment: "sandbox",
    status: "paused",
    createdAt: "2026-09-05T16:22:00Z",
    lastUsedAt: "2026-10-10T18:30:00Z",
    callsToday: 0,
    callsThisMonth: 184,
    quotaPerDay: 1000,
    trend: [0, 0, 12, 24, 8, 16, 20, 4, 0, 0, 0, 0, 0, 0],
  },
];

export interface ActivityEvent {
  id: string;
  time: string;
  type: "created" | "rotated" | "revoked" | "called" | "limited" | "warned";
  service: string;
  detail: string;
}

export const activityFeed: ActivityEvent[] = [
  { id: "a1", time: "13:11:50", type: "called", service: "Weather", detail: "GET /v1/weather/forecast?city=Berlin — 200 (84ms)" },
  { id: "a2", time: "13:11:42", type: "called", service: "Movie Search", detail: "GET /v1/movies/search?q=inception — 200 (132ms)" },
  { id: "a3", time: "13:10:55", type: "called", service: "Currency Exchange", detail: "GET /v1/fx/convert?USD→EUR — 200 (61ms)" },
  { id: "a4", time: "12:48:09", type: "limited", service: "IP Geolocation", detail: "Daily quota 4% used (42 / 1000)" },
  { id: "a5", time: "11:30:14", type: "rotated", service: "Rapid Tracking", detail: "Key ab_live_track_old_… rotated; grace expires in 6d 22h" },
  { id: "a6", time: "10:02:00", type: "created", service: "Books", detail: "New key ab_live_books_3b9c1d4a… created in production environment" },
  { id: "a7", time: "09:14:00", type: "warned", service: "Jokes", detail: "Sandbox key paused — no activity in 4 days" },
  { id: "a8", time: "08:30:11", type: "revoked", service: "QR Generator", detail: "Key ab_test_qr_… revoked (expired)" },
];

export interface DocPage {
  id: string;
  title: string;
  description: string;
  category: string;
  body: Array<
    | { type: "p"; text: string }
    | { type: "h"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "code"; lang: string; code: string; caption?: string }
    | { type: "tip"; text: string }
    | { type: "warn"; text: string }
  >;
}

export const docsPages: DocPage[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Sign up, grab an API key, and make your first request in under 60 seconds.",
    category: "Introduction",
    body: [
      { type: "p", text: "API Board bundles eight free APIs (movie search, weather, package tracking, IP geolocation, currency, jokes, news, and QR generation) behind a single dashboard. One account, one API key namespace per service, and one billing surface. This guide walks you from zero to first successful call." },
      { type: "p", text: "Every API on API Board is free for up to 1,000 requests per day. Paid tiers unlock higher rate limits, SLAs, and historical data exports. You can mix free and paid tiers across different APIs without changing your account." },
      { type: "h", text: "1. Create an account" },
      { type: "p", text: "Head to the API Board dashboard and sign in with GitHub or email. We use GitHub as the primary identity provider so contributors to the open source repo get automatic access to elevated free tiers." },
      { type: "h", text: "2. Generate your first key" },
      { type: "p", text: "Open the API Keys panel, pick a service (e.g. Movie Search), and click Generate. Keys are prefixed with ab_live_ for production and ab_test_ for sandbox. Sandbox keys return mock data and never count against your quota." },
      { type: "tip", text: "Rotate keys quarterly. Old keys keep working for 7 days after rotation so you can deploy without downtime." },
      { type: "h", text: "3. Make your first call" },
      { type: "p", text: "Most APIs accept the key either as a Bearer token in the Authorization header or as a key query parameter. The example below uses the Bearer header, which is the recommended approach because query parameters get logged by proxies and CDN edge servers." },
      {
        type: "code",
        lang: "bash",
        caption: "Get a Berlin weather forecast in one line",
        code: `curl -X GET \\
  'https://api.apiboard.dev/v1/weather/forecast?city=Berlin&units=metric' \\
  -H 'Authorization: Bearer ab_live_weather_4e2f9a8c1d6b3f7e'`
      },
      { type: "p", text: "A successful call returns HTTP 200 with a JSON body matching the response schema documented on the API's detail page. Errors always return a JSON envelope with code, message, and a request_id you can include in support tickets." },
      { type: "warn", text: "Never commit API keys to git. The API Board CLI scans your repository and revokes leaked keys automatically — see the Security guide for details." },
    ],
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "How API keys work, how to rotate them, and how to scope them per environment.",
    category: "Introduction",
    body: [
      { type: "p", text: "Every API Board endpoint requires authentication. We support two flows: Bearer tokens in the Authorization header (recommended for server-to-server traffic) and the X-API-Key header (recommended for browser-side calls where you proxy through your own backend)." },
      { type: "h", text: "Bearer token flow" },
      { type: "p", text: "Send the key as a Bearer token. The token never expires by default, but you can set a TTL of 1 hour to 1 year when generating a key. Expired tokens return 401 invalid_token with a refresh URL." },
      {
        type: "code",
        lang: "bash",
        code: `GET /v1/movies/search?q=inception HTTP/1.1
Host: api.apiboard.dev
Authorization: Bearer ab_live_movie_9f3c7d2a1b8e4c6f
Accept: application/json`
      },
      { type: "h", text: "X-API-Key header flow" },
      { type: "p", text: "For client-side calls (e.g. a Next.js route handler proxying to API Board) we recommend the X-API-Key header because it is stripped from server logs by default and avoids leaking the key into query strings that show up in CDN analytics dashboards." },
      {
        type: "code",
        lang: "bash",
        code: `GET /v1/geo/ip?ip=8.8.8.8 HTTP/1.1
Host: api.apiboard.dev
X-API-Key: ab_live_geo_2f8a4e6c1b3d9f7e`
      },
      { type: "h", text: "Key rotation" },
      { type: "p", text: "To rotate a key, open the dashboard, find the key, and click Rotate. A new key is generated immediately and the old key is queued for revocation in 7 days. During the grace period, both keys work — this lets you ship a new deploy without breaking the old one." },
      { type: "tip", text: "Use the rotation grace period to run a blue/green deploy: ship the new key to green, switch traffic, then revoke the old key once metrics confirm green is healthy." },
    ],
  },
  {
    id: "rate-limits",
    title: "Rate Limits & Quotas",
    description: "Free tier limits, headers to monitor, and how to upgrade.",
    category: "Production",
    body: [
      { type: "p", text: "API Board applies two layers of throttling: a per-second burst limit and a per-day total quota. The free tier allows 5 requests per second and 1,000 requests per day across all services combined. Paid tiers lift both numbers and can be configured per API." },
      { type: "p", text: "Every response includes rate limit headers so you can monitor usage in real time. Failing to read these headers is the single most common cause of 429 errors in production code." },
      {
        type: "code",
        lang: "http",
        caption: "Rate limit headers",
        code: `X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1728912000
X-Daily-Quota-Limit: 1000
X-Daily-Quota-Remaining: 612
X-Daily-Quota-Reset: 1728960000`
      },
      { type: "p", text: "When you hit a rate limit, the API returns 429 Too Many Requests with a Retry-After header containing the seconds until your next request will succeed. Implement exponential backoff with jitter; do not retry synchronously." },
      { type: "h", text: "Recommended backoff strategy" },
      { type: "ul", items: [
        "Retry-After > 0: sleep exactly Retry-After seconds, then retry once.",
        "Otherwise: exponential backoff 1s, 2s, 4s, 8s, max 60s, with +-25% jitter.",
        "After 5 consecutive failures, fail open (return cached value or graceful default).",
        "Log the request_id from the 429 body so support can see exactly which request hit the limit.",
      ]},
      { type: "warn", text: "Concurrent 429s across all your services usually means a stuck retry loop. Use a circuit breaker per service, not a global one." },
    ],
  },
  {
    id: "errors",
    title: "Errors & Status Codes",
    description: "The full HTTP status code table and the JSON error envelope.",
    category: "Production",
    body: [
      { type: "p", text: "API Board uses standard HTTP status codes. The body is always JSON, even for 5xx errors, and contains a stable code string, a human-readable message, and a request_id you can share with support." },
      { type: "h", text: "Status code reference" },
      {
        type: "code",
        lang: "text",
        code: `200 OK                 — Request succeeded.
201 Created            — Resource created (e.g. webhook subscription).
204 No Content         — Success, no body (e.g. DELETE).
400 Bad Request        — Malformed JSON, missing required field.
401 Unauthorized       — Missing or invalid API key.
403 Forbidden          — Valid key, but you do not own the resource.
404 Not Found          — Endpoint or resource does not exist.
409 Conflict           — Resource already exists (e.g. duplicate webhook).
422 Unprocessable      — Valid JSON, but failed schema validation.
429 Too Many Requests  — Rate limit or quota exceeded.
500 Internal Error     — Server-side fault; safe to retry after delay.
502 Bad Gateway        — Upstream provider unreachable; retry in 30s.
503 Service Unavailable— Maintenance window; respect Retry-After.`
      },
      { type: "h", text: "Error envelope" },
      { type: "p", text: "Every error follows the same shape. The code field is stable and matches the keys in the API Board error catalog, so you can branch on it in code instead of parsing the message string." },
      {
        type: "code",
        lang: "json",
        code: `{
  "code": "rate_limited",
  "message": "You have exceeded 5 requests per second.",
  "request_id": "req_01H8M3F4K2J7E9C0Z5A1B6D8",
  "retry_after_s": 2,
  "docs": "https://github.com/gefrus112/API-board#errors"
}`
      },
      { type: "tip", text: "Forward request_id to your users when surfacing errors in your UI — it lets API Board support reproduce the exact request without asking for the raw payload." },
    ],
  },
  {
    id: "movie-search-guide",
    title: "Movie Search API — Guide",
    description: "Search, filter, and paginate movies. How to combine title, year, and genre.",
    category: "API Guides",
    body: [
      { type: "p", text: "The Movie Search API exposes a single endpoint that handles both keyword and faceted search. The q parameter matches against title, alternative titles, and cast. You can further filter by year (single value or inclusive range), genre, country, and minimum rating." },
      { type: "h", text: "Common queries" },
      { type: "p", text: "Below are four real-world query patterns. Combine as many filters as you need — the API short-circuits when there are zero matches and returns 200 with an empty results array, never 404." },
      {
        type: "code",
        lang: "bash",
        caption: "1. Free-text search by title",
        code: `curl 'https://api.apiboard.dev/v1/movies/search?q=dark+knight' \\
  -H 'Authorization: Bearer ab_live_movie_9f3c7d2a1b8e4c6f'`
      },
      {
        type: "code",
        lang: "bash",
        caption: "2. Genre filter with year range",
        code: `curl 'https://api.apiboard.dev/v1/movies/search?genre=scifi&year_from=2015&year_to=2025&sort=rating_desc' \\
  -H 'Authorization: Bearer ab_live_movie_9f3c7d2a1b8e4c6f'`
      },
      { type: "h", text: "Pagination" },
      { type: "p", text: "Results are paginated with page and per_page query parameters. per_page defaults to 20 and is capped at 50. The response includes total, page, and per_page at the root level so you can render pagination UI without an extra call." },
      { type: "warn", text: "page starts at 1, not 0. Requesting page 0 returns 422 invalid_page." },
    ],
  },
  {
    id: "weather-guide",
    title: "Weather API — Guide",
    description: "Current, forecast, and historical weather endpoints explained.",
    category: "API Guides",
    body: [
      { type: "p", text: "The Weather API exposes three endpoints: /weather/now, /weather/forecast, and /weather/history. All three accept city, zip, or lat/lon as the location parameter; if you pass more than one, the API uses lat/lon and ignores the others." },
      { type: "h", text: "Units" },
      { type: "p", text: "Pass units=metric for Celsius and kph, units=imperial for Fahrenheit and mph, or units=uk for Celsius and mph (used by UK Met Office convention). Default is metric. The response always returns the unit suffix in the field name (e.g. temp_c, wind_kph) so you do not have to track which unit you requested." },
      { type: "h", text: "Forecast horizon" },
      { type: "p", text: "The free tier returns a 3-day forecast. The paid tier unlocks 7-day and 14-day. Historical data goes back 5 years on the free tier and 30 years on the enterprise tier — useful for climate research and renewable energy modeling." },
      {
        type: "code",
        lang: "bash",
        caption: "7-day forecast for a coordinate",
        code: `curl 'https://api.apiboard.dev/v1/weather/forecast?lat=52.52&lon=13.405&days=7&units=metric' \\
  -H 'Authorization: Bearer ab_live_weather_4e2f9a8c1d6b3f7e'`
      },
      { type: "tip", text: "If you only need the current condition, hit /weather/now — it is 3x cheaper on your daily quota than /weather/forecast." },
    ],
  },
  {
    id: "tracking-guide",
    title: "Rapid Tracking API — Guide",
    description: "Track packages across 200+ carriers, with webhook alerts on status change.",
    category: "API Guides",
    body: [
      { type: "p", text: "The Rapid Tracking API unifies 200+ carriers behind one schema. You POST a tracking number plus an optional carrier hint; if the carrier is omitted, the API auto-detects from the number format using a fuzzy regex library that is updated monthly." },
      { type: "h", text: "Webhooks" },
      { type: "p", text: "Polling is wasteful. Subscribe to status changes with the /v1/tracking/webhooks endpoint: provide a callback URL, sign with HMAC-SHA256, and we will POST every event to your endpoint within 30 seconds of the carrier reporting it." },
      {
        type: "code",
        lang: "bash",
        caption: "Subscribe to tracking events",
        code: `curl -X POST 'https://api.apiboard.dev/v1/tracking/webhooks' \\
  -H 'Authorization: Bearer ab_live_track_7b1c3e9d4a2f6c8b' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "url": "https://example.com/webhooks/tracking",
    "events": ["status_changed", "delivered", "exception"]
  }'`
      },
      { type: "p", text: "If your endpoint returns a non-2xx status, we retry with exponential backoff for up to 24 hours. After 24 hours, the subscription is automatically paused and you will receive an email at the account's primary address." },
      { type: "warn", text: "Always verify the X-Board-Signature header on your webhook endpoint before trusting the payload. The signature is HMAC-SHA256(your webhook secret, raw body). Reject anything that fails verification." },
    ],
  },
  {
    id: "sdk",
    title: "SDKs & CLI",
    description: "Official SDKs for JavaScript, Python, and Go. The API Board CLI for key rotation.",
    category: "Tools",
    body: [
      { type: "p", text: "API Board ships first-party SDKs for JavaScript, Python, and Go. The SDKs wrap every endpoint, expose TypeScript types (where applicable), and ship with built-in retry, exponential backoff, and automatic rate-limit handling." },
      { type: "h", text: "JavaScript / TypeScript" },
      {
        type: "code",
        lang: "bash",
        code: `npm install @apiboard/sdk`
      },
      {
        type: "code",
        lang: "ts",
        caption: "Search movies in 4 lines",
        code: `import { ApiBoard } from "@apiboard/sdk";

const board = new ApiBoard(process.env.APIBOARD_MOVIE_KEY!);
const results = await board.movies.search({ q: "inception", year: 2010 });
console.log(results.items[0].title); // "Inception"`
      },
      { type: "h", text: "Python" },
      {
        type: "code",
        lang: "bash",
        code: `pip install apiboard`
      },
      {
        type: "code",
        lang: "python",
        code: `from apiboard import ApiBoard

board = ApiBoard(api_key=os.environ["APIBOARD_WEATHER_KEY"])
forecast = board.weather.forecast(city="Berlin", units="metric")
print(forecast.current.temp_c)  # 14.2`
      },
      { type: "h", text: "CLI" },
      { type: "p", text: "The apiboard CLI lets you rotate keys, watch live request logs, and ship a key to Vercel / Netlify environment variables in one command. Install with brew install apiboard or download a binary from the GitHub releases page." },
      {
        type: "code",
        lang: "bash",
        caption: "Rotate a key and ship the new one to Vercel",
        code: `apiboard keys rotate ab_live_movie_9f3c7d2a1b8e4c6f \\
  --ship-to vercel:my-site`
      },
    ],
  },
  {
    id: "visual-studio-setup",
    title: "How to use API Board in Visual Studio",
    description:
      "Clone the repo, install the workload, set environment variables, and run the project inside Visual Studio 2022.",
    category: "IDE Guides",
    body: [
      { type: "p", text: "Visual Studio 2022 (the full IDE, not VS Code) works great with the API Board Next.js project once you install the Node.js workload. This guide assumes Visual Studio 2022 17.8+ on Windows 11; the same steps apply to the Mac version with minor UI differences." },
      { type: "h", text: "1. Install the Node.js workload" },
      { type: "p", text: "Open the Visual Studio Installer, click Modify, and under the Workloads tab check Node.js development. This installs the Node.js runtime, npm, and the project templates you need. The full download is about 1.4 GB; you do not need the Python or .NET workloads for an API Board project." },
      { type: "h", text: "2. Clone the repo from inside Visual Studio" },
      { type: "p", text: "On the start window click Clone a repository. In the Repository location field paste https://github.com/gefrus112/API-board. Pick a local path (avoid spaces in the path) and click Clone. Visual Studio opens the Solution Explorer pane and initializes git LFS if you have it installed." },
      { type: "tip", text: "If the clone fails with a 401, your PAT does not have the repo:read scope. Generate a new token with repo and read:org scopes from Settings → Developer settings → Personal access tokens." },
      { type: "h", text: "3. Restore npm packages" },
      { type: "p", text: "Right-click the project node in Solution Explorer and choose Open in Terminal. Run npm install (or pnpm install / yarn install if you prefer). The first install takes 90-120 seconds on a warm cache; subsequent installs are 10-15 seconds." },
      {
        type: "code",
        lang: "powershell",
        caption: "From the project root",
        code: `npm install
# or
pnpm install`
      },
      { type: "h", text: "4. Set your API key environment variables" },
      { type: "p", text: "API Board reads API keys from process.env, so the easiest way to inject them in Visual Studio is to create a launchSettings.json-style .env file at the project root. Visual Studio does not load .env automatically for Node projects, so we use the cross-env package or the built-in Next.js support." },
      {
        type: "code",
        lang: "bash",
        caption: ".env.local at the project root",
        code: `APIBOARD_MOVIE_KEY=ab_live_movie_9f3c7d2a1b8e4c6f
APIBOARD_WEATHER_KEY=ab_live_weather_4e2f9a8c1d6b3f7e
APIBOARD_TRACK_KEY=ab_live_track_7b1c3e9d4a2f6c8b
APIBOARD_GEO_KEY=ab_live_geo_2f8a4e6c1b3d9f7e
APIBOARD_FX_KEY=ab_live_fx_6a9b2c4d8e1f7b3c`
      },
      { type: "warn", text: ".env.local is in .gitignore by default — never commit it. If you accidentally commit a key, rotate it from the dashboard and force-push a clean history." },
      { type: "h", text: "5. Run the dev server" },
      { type: "p", text: "Press F5 (or Ctrl+F5 to start without debugging). Visual Studio runs npm run dev and attaches to the Next.js process. The browser opens at https://localhost:3000 automatically. Hot reload works out of the box — edit a .tsx file, save, and the browser updates in under a second." },
      { type: "tip", text: "Set the browser to launch at a specific URL with the browserPath setting in .vscode/launch.json — but for Visual Studio, use Project → Properties → Debug → Default browser URL." },
      { type: "h", text: "6. Set breakpoints and debug" },
      { type: "p", text: "Click in the gutter next to any line in src/app/page.tsx to set a breakpoint. The first request that hits that line pauses execution and you get the full call stack, locals, and watches. The Node.js debugger in Visual Studio understands source maps, so TypeScript lines map correctly." },
    ],
  },
  {
    id: "vscode-setup",
    title: "How to use API Board in VS Code",
    description:
      "The lighter-weight setup: clone, install the ESLint + Prettier extensions, run the dev server, and debug.",
    category: "IDE Guides",
    body: [
      { type: "p", text: "VS Code is the recommended editor for the API Board codebase on macOS, Linux, and Windows. This guide assumes VS Code 1.90+ with the official extensions listed below." },
      { type: "h", text: "1. Clone from the Source Control panel" },
      { type: "p", text: "Open the Source Control panel (Ctrl+Shift+G), click Clone Repository, and paste https://github.com/gefrus112/API-board. VS Code offers to open the cloned folder in the current window — say yes." },
      { type: "h", text: "2. Install the recommended extensions" },
      { type: "p", text: "When you open the project for the first time, VS Code shows a notification asking to install recommended extensions. Accept it. The list ships in .vscode/extensions.json and includes ESLint, Prettier, the Tailwind CSS IntelliSense, and the Next.js snippet pack." },
      {
        type: "code",
        lang: "json",
        caption: ".vscode/extensions.json",
        code: `{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "unifiedjs.vscode-mdc",
    "ms-vscode.js-debug"
  ]
}`
      },
      { type: "h", text: "3. Install npm packages" },
      { type: "p", text: "Open the integrated terminal (Ctrl+`) and run npm install. VS Code auto-detects package.json changes and re-runs install on save." },
      { type: "h", text: "4. Run the dev server" },
      { type: "p", text: "The fastest way: press Ctrl+Shift+B and choose npm: dev. This runs next dev in the integrated terminal. The Tasks: Run Task menu also exposes npm: lint and npm: build for one-click access." },
      {
        type: "code",
        lang: "json",
        caption: ".vscode/tasks.json",
        code: `{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm: dev",
      "type": "npm",
      "script": "dev",
      "isBackground": true,
      "problemMatcher": "$next-js-watch",
      "group": { "kind": "build", "isDefault": true }
    }
  ]
}`
      },
      { type: "h", text: "5. Debug with breakpoints" },
      { type: "p", text: "Open the Run and Debug panel (Ctrl+Shift+D), click create a launch.json file, and choose Node.js. VS Code auto-detects Next.js and writes a launch config that attaches to the dev server. Set a breakpoint in src/app/page.tsx, press F5, and reload the browser — execution pauses at your breakpoint." },
      { type: "tip", text: "Use the JavaScript Debug Terminal for server-side code that runs in Node (e.g. API routes). It automatically attaches a debugger to any process started in that terminal, so you don't need a launch config." },
    ],
  },
  {
    id: "push-to-github",
    title: "How to push API Board to GitHub from Visual Studio",
    description:
      "Set up Git credentials, stage changes, write a meaningful commit message, and push to a feature branch from inside the IDE.",
    category: "IDE Guides",
    body: [
      { type: "p", text: "Visual Studio has first-class Git support built in (Team Explorer was replaced by the integrated Git Experience in VS 2022 17.x). This guide walks through pushing changes to your API-board fork from inside the IDE — no command line needed." },
      { type: "h", text: "1. Authenticate with GitHub" },
      { type: "p", text: "Open Git → Settings → GitHub. Click Connect and follow the OAuth flow in the browser. VS stores the token in the Windows Credential Manager so you don't have to re-authenticate on every push. If you need to push to a private fork, generate a Personal Access Token with repo scope from https://github.com/settings/tokens and paste it when prompted." },
      { type: "warn", text: "Treat your PAT like a password. Set an expiration of 30-90 days, never commit it to source, and revoke it immediately if it leaks. The token is logged in plaintext in your shell history if you ever paste it on the command line — use the GUI auth flow instead." },
      { type: "h", text: "2. Create a feature branch" },
      { type: "p", text: "In the Status bar at the bottom right, click the branch name (usually main), choose New Branch, and name it feature/<short-name> (e.g. feature/add-recipes-api). VS creates the branch and switches to it automatically. All your commits now land on this branch." },
      { type: "h", text: "3. Stage and commit changes" },
      { type: "p", text: "Open the Git Changes window (View → Git Changes). Modified files show up in the Changes section. Right-click a file → Stage to add it to the next commit, or click Stage All to add everything. Enter a commit message in the box and press Ctrl+Enter to commit." },
      {
        type: "code",
        lang: "text",
        caption: "Example commit message (Conventional Commits)",
        code: `feat(apis): add Recipes API with ingredient search

Adds the Recipes API to the public catalog with ingredient and diet
filters, 2M+ recipe index, and step-by-step images. Updates the
management dashboard mock to include the new service.

BREAKING CHANGE: reorders the API list — utility category now has 3 entries.`
      },
      { type: "tip", text: "Use Conventional Commits prefixes (feat:, fix:, docs:, chore:, refactor:) — the API Board CI auto-generates a changelog from them on release." },
      { type: "h", text: "4. Push the branch" },
      { type: "p", text: "Click the Sync button in the Git Changes window to push your branch to origin. The first push of a new branch shows a Create Pull Request button — click it to open the PR wizard in your browser. Fill in the title and description, link any related issues with Closes #123, and submit." },
      { type: "h", text: "5. Resolve merge conflicts" },
      { type: "p", text: "If your branch is behind main, click Fetch then Pull to fast-forward. If there are conflicts, VS opens a three-way merge editor with side-by-side diffs and per-hunk accept/reject buttons. Resolve each conflict, save, then commit the merge and push." },
      { type: "warn", text: "Never git push --force to main or to a shared feature branch. Use --force-with-lease instead — it aborts the push if someone else has committed on top of your branch, preventing accidental history overwrites." },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    description:
      "Ship API Board to Vercel, Netlify, or your own server in under 5 minutes.",
    category: "Production",
    body: [
      { type: "p", text: "API Board is a standard Next.js 16 app, so any platform that runs Next.js works. This guide covers the three most popular options: Vercel (one-click), Netlify (one-click), and a self-hosted Node server (manual)." },
      { type: "h", text: "Vercel" },
      { type: "p", text: "Push your fork to GitHub, go to vercel.com/new, import the repo, and click Deploy. Vercel detects Next.js automatically, builds with next build, and provisions an Edge Network global CDN. Set your APIBOARD_*_KEY environment variables under Project Settings → Environment Variables before the first build." },
      { type: "tip", text: "Connect your GitHub account to Vercel once. Every push to main auto-deploys to production; every push to a feature branch deploys a preview URL with a unique subdomain — perfect for sharing review copies." },
      { type: "h", text: "Netlify" },
      { type: "p", text: "On netlify.com/sites/new, pick your repo, set the build command to next build and the publish directory to .next. Netlify uses the @netlify/plugin-nextjs plugin automatically. Push to main → deploy." },
      { type: "h", text: "Self-hosted" },
      { type: "p", text: "For air-gapped or compliance-restricted deployments, run next build && next start on a Node 20+ server. Put it behind a reverse proxy (Caddy, nginx, Traefik) that terminates TLS and rate-limits. Set a HEALTHCHECK in your Dockerfile that pings /api/health." },
      {
        type: "code",
        lang: "dockerfile",
        caption: "Minimal Dockerfile",
        code: `FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`
      },
      { type: "warn", text: "Never expose your APIBOARD_*_KEY environment variables to the browser. Use NEXT_PUBLIC_ prefix only for client-safe values; the secret keys stay on the server side via Next.js server components / route handlers." },
    ],
  },
];

export interface CodeSheet {
  id: string;
  filename: string;
  language: string;
  description: string;
  rawUrl: string; // simulated raw URL
  code: string;
}

export const codeSheets: CodeSheet[] = [
  {
    id: "style-css",
    filename: "style.css",
    language: "css",
    description:
      "Drop-in CSS variables and utility classes that give your project the API Board blue look (light + dark themes included). Import once at the top of your stylesheet.",
    rawUrl: "https://raw.githubusercontent.com/gefrus112/API-board/main/sheets/style.css",
    code: `/* ============================================================
   API Board — style.css
   Drop-in stylesheet: blue brand palette, light + dark themes,
   and a small set of utility classes for cards, buttons, and
   code blocks. @import at the top of your stylesheet.
   ============================================================ */

:root {
  --ab-bg: #ffffff;
  --ab-fg: #0f172a;
  --ab-muted: #64748b;
  --ab-border: #e2e8f0;
  --ab-brand: #2563eb;
  --ab-brand-hover: #1d4ed8;
  --ab-brand-soft: #eff6ff;
  --ab-brand-soft-fg: #1e40af;
  --ab-radius: 12px;
  --ab-shadow: 0 8px 30px -8px rgba(37, 99, 235, 0.25);
}

@media (prefers-color-scheme: dark) {
  :root {
    --ab-bg: #0b1120;
    --ab-fg: #e5edff;
    --ab-muted: #94a3b8;
    --ab-border: #1e293b;
    --ab-brand: #3b82f6;
    --ab-brand-hover: #60a5fa;
    --ab-brand-soft: #0f1c3a;
    --ab-brand-soft-fg: #bfdbfe;
  }
}

.ab-card {
  background: var(--ab-bg);
  border: 1px solid var(--ab-border);
  border-radius: var(--ab-radius);
  padding: 24px;
  box-shadow: var(--ab-shadow);
}

.ab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background 120ms ease, border-color 120ms ease;
}

.ab-btn--primary {
  background: var(--ab-brand);
  color: #fff;
}
.ab-btn--primary:hover { background: var(--ab-brand-hover); }

.ab-btn--ghost {
  background: transparent;
  color: var(--ab-brand-soft-fg);
  border-color: var(--ab-border);
}
.ab-btn--ghost:hover { border-color: var(--ab-brand); }

.ab-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  background: var(--ab-brand-soft);
  color: var(--ab-brand-soft-fg);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.875em;
}

.ab-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
  background: var(--ab-brand-soft);
  color: var(--ab-brand-soft-fg);
  border: 1px solid color-mix(in srgb, var(--ab-brand) 25%, transparent);
}`,
  },
  {
    id: "weather-js",
    filename: "weather.js",
    language: "javascript",
    description:
      "Minimal browser-safe weather widget. Fetches the current condition and updates the DOM. Drop the script tag in, pass your key, done.",
    rawUrl: "https://raw.githubusercontent.com/gefrus112/API-board/main/sheets/weather.js",
    code: `/* API Board — weather.js
 * Render the current weather for a city into any element with
 * <div data-ab-weather="Berlin"></div>
 */
(function () {
  const API_BASE = "https://api.apiboard.dev/v1/weather/now";
  const API_KEY = window.APIBOARD_WEATHER_KEY; // set in <script>

  async function renderCity(el, city) {
    const url = new URL(API_BASE);
    url.searchParams.set("city", city);
    url.searchParams.set("units", "metric");
    url.searchParams.set("key", API_KEY);

    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error("weather fetch failed: " + r.status);
      const data = await r.json();
      el.innerHTML =
        '<strong>' + data.location.name + '</strong> ' +
        data.current.temp_c + '°C, ' + data.current.condition;
    } catch (err) {
      el.textContent = "Weather unavailable";
      console.error(err);
    }
  }

  function init() {
    document.querySelectorAll("[data-ab-weather]").forEach(function (el) {
      renderCity(el, el.dataset.abWeather);
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();`,
  },
  {
    id: "movie-js",
    filename: "movie.js",
    language: "javascript",
    description:
      "Search-as-you-type movie lookup. Debounced input, renders posters, and falls back gracefully on no results.",
    rawUrl: "https://raw.githubusercontent.com/gefrus112/API-board/main/sheets/movie.js",
    code: `/* API Board — movie.js
 * Attach to: <input id="ab-movie-search" placeholder="Search movies...">
 * Renders into: <div id="ab-movie-results"></div>
 */
(function () {
  const API_BASE = "https://api.apiboard.dev/v1/movies/search";
  const API_KEY = window.APIBOARD_MOVIE_KEY;

  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      const ctx = this, args = arguments;
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  async function search(q) {
    const results = document.getElementById("ab-movie-results");
    if (!q) { results.innerHTML = ""; return; }
    const url = new URL(API_BASE);
    url.searchParams.set("q", q);
    const r = await fetch(url, { headers: { Authorization: "Bearer " + API_KEY } });
    const data = await r.json();
    if (!data.results || data.results.length === 0) {
      results.innerHTML = '<p class="ab-muted">No movies found.</p>';
      return;
    }
    results.innerHTML = data.results.map(function (m) {
      return (
        '<div class="ab-card">' +
          '<img src="' + m.poster + '" alt="' + m.title + '" loading="lazy">' +
          '<h3>' + m.title + ' (' + m.year + ')</h3>' +
          '<p>★ ' + m.rating + ' · ' + m.genres.join(", ") + '</p>' +
        '</div>'
      );
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("ab-movie-search");
    if (input) input.addEventListener("input", debounce(function (e) {
      search(e.target.value.trim());
    }, 250));
  });
})();`,
  },
  {
    id: "tracking-js",
    filename: "tracking.js",
    language: "javascript",
    description:
      "Package tracker with carrier auto-detection. Submit a tracking number, render the timeline.",
    rawUrl: "https://raw.githubusercontent.com/gefrus112/API-board/main/sheets/tracking.js",
    code: `/* API Board — tracking.js
 * Usage:
 *   <form data-ab-tracking>
 *     <input name="tracking_number" required>
 *     <button>Track</button>
 *   </form>
 *   <ol data-ab-tracking-timeline></ol>
 */
(function () {
  const API_BASE = "https://api.apiboard.dev/v1/tracking/status";
  const API_KEY = window.APIBOARD_TRACK_KEY;

  function renderTimeline(events) {
    const ol = document.querySelector("[data-ab-tracking-timeline]");
    if (!ol) return;
    ol.innerHTML = events.map(function (ev) {
      return (
        '<li>' +
          '<time>' + new Date(ev.time_iso).toLocaleString() + '</time>' +
          '<strong>' + ev.status + '</strong>' +
          '<span>' + ev.location + '</span>' +
        '</li>'
      );
    }).join("");
  }

  document.addEventListener("submit", async function (e) {
    const form = e.target.closest("[data-ab-tracking]");
    if (!form) return;
    e.preventDefault();
    const fd = new FormData(form);
    const tracking = fd.get("tracking_number");
    const r = await fetch(API_BASE, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tracking_number: tracking }),
    });
    const data = await r.json();
    renderTimeline(data.events || []);
  });
})();`,
  },
  {
    id: "cpp-weather",
    filename: "weather.cpp",
    language: "cpp",
    description:
      "C++17 example using libcurl to fetch the current weather for a city. Compiles with g++ -std=c++17 weather.cpp -lcurl -o weather.",
    rawUrl: "https://raw.githubusercontent.com/gefrus112/API-board/main/sheets/weather.cpp",
    code: `// API Board — weather.cpp
// C++17 + libcurl example. Fetch current weather for a city.
// Build: g++ -std=c++17 weather.cpp -lcurl -o weather

#include <curl/curl.h>
#include <iostream>
#include <string>

static const std::string API_BASE =
    "https://api.apiboard.dev/v1/weather/now";
static const std::string API_KEY =
    "ab_live_weather_4e2f9a8c1d6b3f7e"; // move to env var in prod

static size_t write_cb(void *ptr, size_t size, size_t nmemb, void *user) {
  ((std::string *)user)->append((char *)ptr, size * nmemb);
  return size * nmemb;
}

int main(int argc, char **argv) {
  if (argc < 2) {
    std::cerr << "Usage: " << argv[0] << " <city>\\n";
    return 1;
  }
  std::string city = argv[1];
  std::string url = API_BASE + "?city=" + curl_easy_escape(nullptr, city.c_str(), 0)
                  + "&units=metric&key=" + API_KEY;

  CURL *curl = curl_easy_init();
  if (!curl) { std::cerr << "curl init failed\\n"; return 1; }

  std::string buf;
  curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_cb);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, &buf);

  CURLcode rc = curl_easy_perform(curl);
  if (rc != CURLE_OK) {
    std::cerr << "Request failed: " << curl_easy_strerror(rc) << "\\n";
    curl_easy_cleanup(curl);
    return 1;
  }
  std::cout << buf << "\\n";
  curl_easy_cleanup(curl);
  return 0;
}`,
  },
  {
    id: "python-weather",
    filename: "weather.py",
    language: "python",
    description:
      "Python 3 example using only the standard library. Fetches the current weather and prints temperature, humidity, and condition.",
    rawUrl: "https://raw.githubusercontent.com/gefrus112/API-board/main/sheets/weather.py",
    code: `#!/usr/bin/env python3
"""API Board — weather.py
Stdlib-only weather fetcher. No requests, no httpx.
Usage: python weather.py Berlin
"""

import os
import sys
import json
import urllib.request
import urllib.parse

API_BASE = "https://api.apiboard.dev/v1/weather/now"
API_KEY = os.environ.get("APIBOARD_WEATHER_KEY", "ab_live_weather_4e2f9a8c1d6b3f7e")


def get_weather(city: str) -> dict:
    params = urllib.parse.urlencode({
        "city": city,
        "units": "metric",
        "key": API_KEY,
    })
    url = f"{API_BASE}?{params}"
    with urllib.request.urlopen(url, timeout=10) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: python weather.py <city>")
        return 1
    data = get_weather(sys.argv[1])
    cur = data["current"]
    print(f"{data['location']['name']}, {data['location']['country']}")
    print(f"  {cur['temp_c']}°C (feels like {cur['feels_like_c']}°C)")
    print(f"  {cur['condition']}, humidity {cur['humidity_pct']}%")
    print(f"  wind {cur['wind_kph']} kph")
    return 0


if __name__ == "__main__":
    sys.exit(main())`,
  },
];
