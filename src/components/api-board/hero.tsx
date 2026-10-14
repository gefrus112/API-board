"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  ArrowRight,
  Film,
  CloudSun,
  PackageSearch,
  Globe,
  Coins,
  Laugh,
  Newspaper,
  QrCode,
  Sparkles,
  Trophy,
  BookOpen,
  CookingPot,
  Users,
  Zap,
  Shield,
  Layers,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CubeLogo } from "@/components/api-board/cube-logo";
import { Reveal, Stagger, fadeUp, scaleIn } from "@/components/api-board/motion";
import { REPO_URL } from "@/components/api-board/data";
import type { TabId } from "@/components/api-board/header";

interface HeroProps {
  onTabChange: (tab: TabId) => void;
}

const FEATURES = [
  { icon: Film, title: "Movie Search", text: "Posters, plot, cast, ratings, and streaming availability in one call." },
  { icon: CloudSun, title: "Weather Forecast", text: "Current conditions, 7-day forecast, and 30 years of historical data." },
  { icon: PackageSearch, title: "Rapid Tracking", text: "200+ carriers auto-detected. Webhook alerts on every status change." },
  { icon: Globe, title: "IP Geolocation", text: "Country, city, ISP, ASN, and proxy/VPN detection from any IP." },
  { icon: Coins, title: "Currency Exchange", text: "Live FX rates for 170+ currencies. Historical data back to 1999." },
  { icon: Laugh, title: "Jokes", text: "Programming, dad, and knock-knock jokes in 6 languages." },
  { icon: Newspaper, title: "News Headlines", text: "Top stories from 80,000+ sources in 50+ countries." },
  { icon: QrCode, title: "QR Generator", text: "Generate QR codes for URLs, vCards, Wi-Fi, and crypto as PNG/SVG." },
  { icon: Trophy, title: "Sports Scores", text: "Live scores, schedules, and standings for 30+ leagues worldwide." },
  { icon: BookOpen, title: "Books", text: "Search 30M+ books by ISBN, title, author, or genre with covers." },
  { icon: CookingPot, title: "Recipes", text: "2M+ recipes searchable by ingredients, diet, cuisine, or meal type." },
  { icon: Users, title: "Random User", text: "Generate realistic mock profiles for testing, demos, and seed data." },
  { icon: Mail, title: "Email & Signup", text: "Branded signup pages with email verification, magic-link, and inbound webhooks." },
];

const PILLARS = [
  {
    icon: Zap,
    title: "Fast",
    text: "Edge-cached responses, sub-50ms TTFB on hot routes, and automatic retry on 5xx errors.",
  },
  {
    icon: Shield,
    title: "Secure",
    text: "Keys prefixed ab_live_ for prod and ab_test_ for sandbox. Rotate with 7-day grace period.",
  },
  {
    icon: Layers,
    title: "Composable",
    text: "Every API ships with a TypeScript SDK, a cURL example, and a drop-in code sheet.",
  },
];

export function Hero({ onTabChange }: HeroProps) {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <div className="aurora-blob b1" aria-hidden="true" />
        <div className="aurora-blob b2" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" aria-hidden="true" />

        {/* Floating blue cube */}
        <motion.div
          initial={{ opacity: 0, y: -40, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-1/2 top-12 -z-10 hidden -translate-x-1/2 opacity-10 lg:block"
        >
          <CubeLogo size={260} />
        </motion.div>

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:pt-32">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-6 gap-1.5 rounded-full border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand" />
                13 free APIs · one dashboard · open source
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="cube-pulse-glow brand-glow mb-6 rounded-2xl bg-background p-2"
            >
              <div className="cube-spin">
                <CubeLogo size={72} />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-brand"
            >
              Welcome to API Board
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              One board for every{" "}
              <span className="bg-gradient-to-r from-brand to-brand-soft-foreground bg-clip-text text-transparent">
                API key
              </span>{" "}
              you need
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              API Board bundles movie search, weather, package tracking,
              geolocation, currency, jokes, news, QR generation, sports scores,
              books, recipes, and random user generation behind a single
              dashboard — with copy-paste code sheets and Vercel-style docs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                onClick={() => onTabChange("apis")}
              >
                Browse APIs
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-background"
                onClick={() => onTabChange("management")}
              >
                Manage keys
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2"
                asChild
              >
                <Link href={REPO_URL} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" /> Star on GitHub
                </Link>
              </Button>
            </motion.div>

            {/* Quick stats */}
            <motion.dl
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
              }}
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {[
                { k: "12", v: "Live APIs" },
                { k: "1,000 / day", v: "Free quota" },
                { k: "200+", v: "Carriers tracked" },
                { k: "170+", v: "FX currencies" },
              ].map((s) => (
                <motion.div
                  key={s.v}
                  variants={scaleIn}
                  className="rounded-xl border border-border bg-card/60 px-4 py-3 text-left"
                >
                  <dt className="text-xs font-medium text-muted-foreground">
                    {s.v}
                  </dt>
                  <dd className="mt-0.5 text-lg font-semibold text-foreground">
                    {s.k}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.12}>
          {PILLARS.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <Card className="group relative h-full overflow-hidden border-border bg-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-soft-foreground transition-transform duration-300 group-hover:scale-x-100" />
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition group-hover:scale-110">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {p.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What&apos;s on the board
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Each API ships with its own key, its own rate limit, and its own
              docs page. Use one or use them all.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="hidden border-border bg-background sm:inline-flex"
            onClick={() => onTabChange("apis")}
          >
            View all
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </Reveal>

        <Stagger
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.06}
        >
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={fadeUp}>
              <Card
                className="group relative h-full cursor-pointer border-border bg-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
                onClick={() => onTabChange("apis")}
              >
                <CardContent className="p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand transition group-hover:scale-110 group-hover:rotate-3">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.text}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-brand opacity-0 transition group-hover:opacity-100">
                    Explore
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* Code preview */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal variant="slideInLeft">
            <Badge
              variant="outline"
              className="mb-4 gap-1.5 rounded-full border-border px-2.5 py-0.5 text-xs"
            >
              <span className="font-mono text-brand">curl</span>
            </Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              One curl call. Real data.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every API on the board returns structured JSON. The example on
              the right queries the Weather API for Berlin and prints the
              current temperature, condition, and humidity. Swap the key, the
              city, or the units — the response shape stays the same.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                <span>
                  <strong className="font-medium">Bearer-token auth</strong> for
                  server calls and <code className="font-mono text-brand">X-API-Key</code> for browser proxies.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                <span>
                  <strong className="font-medium">Rate limit headers</strong> on every response, so you can throttle in real time.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                <span>
                  <strong className="font-medium">Stable error envelope</strong> with a request_id you can pass to support.
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Button
                variant="outline"
                size="sm"
                className="border-border bg-background"
                onClick={() => onTabChange("sheets")}
              >
                Browse code sheets
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </Reveal>

          <Reveal variant="slideInRight">
            <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
              <pre className="scroll-pretty overflow-auto p-4 text-[13px] leading-relaxed text-foreground/90">
{`curl -X GET \\
  'https://api.apiboard.dev/v1/weather/forecast?city=Berlin&units=metric' \\
  -H 'Authorization: Bearer ab_live_weather_4e2f9a8c1d6b3f7e'

# {
#   "location": { "name": "Berlin", "country": "DE" },
#   "current": {
#     "temp_c": 14.2,
#     "feels_like_c": 13.1,
#     "humidity_pct": 64,
#     "wind_kph": 18,
#     "condition": "Partly cloudy"
#   },
#   "forecast": [
#     { "date": "2026-10-15", "high_c": 16, "low_c": 8, "condition": "Sunny" }
#   ]
# }`}
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Open source CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal variant="scaleIn">
          <div className="overflow-hidden rounded-2xl border border-border bg-brand-soft/60 p-6 sm:p-10">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <Github className="h-8 w-8 flex-shrink-0 text-brand" />
                <div>
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Open source on GitHub
                  </h2>
                  <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                    The API Board spec, sample sheets, and docs are
                    MIT-licensed. Open issues, send PRs, and shape the roadmap.
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                asChild
                className="bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <Link href={REPO_URL} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> gefrus112/API-board
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
