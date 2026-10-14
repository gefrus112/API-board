"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  ShieldCheck,
  Zap,
  Globe,
  Plug,
  Code2,
  Download,
  ArrowRight,
  Gamepad2,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/api-board/code-block";
import { EsharpEditor } from "@/components/api-board/esharp-editor";
import {
  esharpFeatures,
  esharpSampleCode,
  REPO_URL,
} from "@/components/api-board/data";
import { Reveal, Stagger, fadeUp } from "@/components/api-board/motion";

const ICONS: Record<string, LucideIcon> = {
  Boxes,
  ShieldCheck,
  Zap,
  Globe,
  Plug,
  Code2,
};

const STEAM_SAMPLE = `// steam-mashup.esharp — combine 3 Steam games into one
use api_board::{Steam, Weather};

game! SteamMashup {
    title: "Open-world crossover",
    scenes: [
        Scene::from(Steam::library().pick("Portal 2")),
        Scene::from(Steam::library().pick("Stardew Valley")),
        Scene::from(Steam::library().pick("Hollow Knight"))
            .overlay(position: TopRight, alpha: 0.6),
    ],
    on_exit: |state| {
        state.save();
    }
}

fn main() -> Game {
    let mut game = SteamMashup::new();
    game.play()
}`;

const VS_STEPS = [
  "Install e# via install-esharp.bat (run as administrator).",
  "Open Visual Studio → File → New → Project → e# Game.",
  "Name your project (e.g. SteamMashup) and click Create.",
  "Solution Explorer shows hello.esharp — open it.",
  "Replace the sample with the steam-mashup.esharp code above.",
  "Press F5 to compile and run the game.",
  "The runtime renders all 3 scenes in their overlays.",
];

export function EsharpSection() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Hero */}
      <Reveal className="mb-12 text-center">
        <div className="mb-4 flex justify-center">
          <img
            src="/esharp.svg"
            alt="e# esharp logo"
            className="cube-float h-20 w-20"
          />
        </div>
        <Badge
          variant="outline"
          className="mb-3 gap-1.5 border-border px-2 py-0.5 text-xs"
        >
          <Code2 className="h-3.5 w-3.5 text-brand" /> Programming Language
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          e#{" "}
          <span className="bg-gradient-to-r from-brand to-brand-soft-foreground bg-clip-text text-transparent">
            esharp
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          A Rust-inspired programming language that lets you combine Steam
          games together. Two scenes + the{" "}
          <code className="font-mono text-brand">+</code> operator = one
          composed game.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <a
              href="/downloads/install-esharp.bat"
              download
              className="gap-1.5"
            >
              <Download className="h-4 w-4" /> install-esharp.bat
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-border bg-background"
          >
            <a
              href="/downloads/hello.esharp"
              download
              className="gap-1.5"
            >
              <Download className="h-4 w-4" /> hello.esharp
            </a>
          </Button>
          <Button variant="ghost" asChild className="gap-1.5">
            <a href={REPO_URL} target="_blank" rel="noreferrer">
              View on GitHub <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </Reveal>

      {/* Steam mashup sample */}
      <Reveal className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold tracking-tight">
          Combine Steam games together
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
          The <code className="font-mono text-brand">Steam::library()</code>{" "}
          adapter wraps your installed Steam library as a stream of renderable
          scenes. Pick a game with{" "}
          <code className="font-mono text-brand">.pick(title)</code> and compose
          multiple games into a single playable experience — overlays, side-by-side,
          or stitched maps.
        </p>
        <CodeBlock
          code={STEAM_SAMPLE}
          language="rust"
          showLineNumbers
          caption="steam-mashup.esharp"
        />
      </Reveal>

      {/* In-browser editor */}
      <Reveal className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold tracking-tight">
          Try the e# editor
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
          Our custom in-browser code editor with e# syntax highlighting, line
          numbers, a fake build output panel, and a Run button. Switch between
          three samples (hello / steam-mashup / weather-game) without leaving
          the page.
        </p>
        <EsharpEditor />
      </Reveal>

      {/* VS Code screenshots / how-to */}
      <Reveal className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold tracking-tight">
          How to use e# in Visual Studio Code
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
          Step-by-step walkthrough with annotated screenshots. The same steps
          work in Visual Studio 2022 — just use{" "}
          <code className="font-mono text-brand">File → New → Project → e# Game</code>{" "}
          instead.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <VsScreenshot
            step={1}
            title="New e# Game project"
            caption="File → New → Project → e# Game in VS 2022 (or Ctrl+Shift+P → e# Game in VS Code)."
          />
          <VsScreenshot
            step={2}
            title="Open hello.esharp"
            caption="Solution Explorer → hello.esharp. IntelliSense kicks in for the game! macro."
          />
          <VsScreenshot
            step={3}
            title="Paste the Steam mashup"
            caption="Replace the sample with steam-mashup.esharp. Hover Scene::from to see the trait signature."
          />
          <VsScreenshot
            step={4}
            title="Press F5 to run"
            caption="Output panel shows esharp build → 4 steps → runtime → 60 fps. No errors."
          />
        </div>
      </Reveal>

      {/* Feature grid */}
      <Stagger
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.07}
      >
        {esharpFeatures.map((f) => {
          const Icon = ICONS[f.icon] ?? Code2;
          return (
            <motion.div key={f.title} variants={fadeUp}>
              <Card className="group relative h-full overflow-hidden border-border bg-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-soft-foreground transition-transform duration-300 group-hover:scale-x-100" />
                <CardContent className="p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand transition group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Stagger>

      {/* Install steps */}
      <Reveal className="mt-12">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Install e# on Windows
            </h3>
            <ol className="space-y-3 text-sm">
              {VS_STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-foreground/90">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}

/* Mock "screenshot" card — a stylized rendering of what VS Code would show */
function VsScreenshot({
  step,
  title,
  caption,
}: {
  step: number;
  title: string;
  caption: string;
}) {
  return (
    <Reveal variant="fadeUp">
      <Card className="scan-on-hover group overflow-hidden border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[11px] text-muted-foreground">
            step-{step}.png
          </span>
        </div>
        <CardContent className="p-0">
          {/* Stylized VS Code body */}
          <div className="flex">
            {/* Activity bar */}
            <div className="flex w-10 flex-col items-center gap-3 border-r border-border bg-muted/30 py-3">
              <span className="h-5 w-5 rounded bg-brand/40" />
              <span className="h-5 w-5 rounded bg-muted" />
              <span className="h-5 w-5 rounded bg-muted" />
              <span className="h-5 w-5 rounded bg-muted" />
            </div>
            {/* Editor area */}
            <div className="flex-1 bg-[#0b1120] p-3 font-mono text-[11px] leading-[1.6] text-emerald-300">
              <div className="flex">
                <div className="select-none pr-3 text-white/30">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>
                <div className="text-white/80">
                  <div>
                    <span className="text-sky-400">use</span>{" "}
                    <span className="text-amber-300">api_board</span>
                    <span className="text-white/40">::</span>
                    <span className="text-amber-300">{`{Steam}`}</span>;
                  </div>
                  <div className="mt-2 text-fuchsia-300">game!{" "}
                    <span className="text-amber-300">SteamMashup</span> {"{"}
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-300">title</span>:{" "}
                    <span className="text-emerald-300">"Open-world crossover"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-300">scenes</span>: [
                  </div>
                  <div className="pl-8">
                    <span className="text-amber-300">Scene::from</span>(
                    <span className="text-amber-300">Steam::library</span>().pick(
                    <span className="text-emerald-300">"Portal 2"</span>)),
                  </div>
                  <div className="pl-4">],</div>
                  <div>{"}"}</div>
                </div>
              </div>
              {/* Output */}
              <div className="mt-3 border-t border-white/10 pt-2 text-white/40">
                <div className="text-[10px] uppercase tracking-wider">
                  Output
                </div>
                <div className="mt-1 text-emerald-300">
                  ✓ Built successfully · 60 fps · 0 errors
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="border-t border-border bg-muted/30 px-3 py-2">
          <p className="text-xs font-semibold">{title}</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
            {caption}
          </p>
        </div>
      </Card>
    </Reveal>
  );
}

// Keep the icons referenced for future use
void Gamepad2;
void ImageIcon;
