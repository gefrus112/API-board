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
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/api-board/code-block";
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
          A Rust-inspired programming language that lets you combine video
          games together. Two scenes + the <code className="font-mono text-brand">+</code> operator = one composed game.
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

      {/* Sample code */}
      <Reveal className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold tracking-tight">
          A first program
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
          Every e# program has a <code className="font-mono text-brand">main()</code> function that returns a Game.
          The <code className="font-mono text-brand">game!</code> macro builds
          the Game struct from a list of scenes drawn from any API on the board.
        </p>
        <CodeBlock
          code={esharpSampleCode}
          language="rust"
          showLineNumbers
          caption="hello.esharp"
        />
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
              {[
                "Download install-esharp.bat from the button above.",
                "Right-click the file → Run as administrator.",
                "The installer wires esharp onto your PATH and registers the .esharp file extension with Visual Studio 2022.",
                "Open a new command prompt and run: esharp new hello && cd hello && esharp run",
              ].map((step, i) => (
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
