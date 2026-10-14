"use client";

import * as React from "react";
import { Play, Save, RotateCcw, Copy, Check, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/api-board/motion";
import { esharpSampleCode } from "@/components/api-board/data";
import { cn } from "@/lib/utils";

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

const HELLO_SAMPLE = esharpSampleCode;

const WEATHER_SAMPLE = `// weather-game.esharp — render live weather as a scene
use api_board::Weather;

game! WeatherScene {
    title: "Berlin live weather",
    scenes: [
        Scene::from(Weather::current("Berlin"))
            .overlay(position: FullScreen, alpha: 1.0),
    ],
    update: |dt, state| {
        if state.rain_intensity > 0.5 {
            state.audio.play("rain_loop.ogg");
        }
    }
}

fn main() -> Game {
    WeatherScene::new().play()
}`;

const SAMPLES = [
  { id: "hello", label: "hello.esharp", code: HELLO_SAMPLE },
  { id: "steam", label: "steam-mashup.esharp", code: STEAM_SAMPLE },
  { id: "weather", label: "weather-game.esharp", code: WEATHER_SAMPLE },
];

interface LineCol {
  line: number;
  col: number;
}

interface EsharpEditorProps {
  initialCode?: string;
}

export function EsharpEditor({ initialCode = HELLO_SAMPLE }: EsharpEditorProps) {
  const [code, setCode] = React.useState(initialCode);
  const [copied, setCopied] = React.useState(false);
  const [output, setOutput] = React.useState<string[]>([]);
  const [cursor, setCursor] = React.useState<LineCol>({ line: 1, col: 1 });
  const taRef = React.useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = React.useRef<HTMLDivElement>(null);

  const lines = code.split("\n");

  const updateCursor = () => {
    const ta = taRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const before = code.slice(0, pos);
    const line = before.split("\n").length;
    const col = pos - before.lastIndexOf("\n");
    setCursor({ line, col });
  };

  const onScroll = () => {
    if (lineNumbersRef.current && taRef.current) {
      lineNumbersRef.current.scrollTop = taRef.current.scrollTop;
    }
  };

  const onRun = () => {
    setOutput([]);
    const steps = [
      "esharp build --target=wasm",
      "[1/4] Parsing " + code.split("\n").length + " lines of e# source...",
      "[2/4] Type checking scenes and traits...",
      "[3/4] Generating WASM bundle...",
      "[4/4] ✓ Built successfully.",
      "",
      "esharp run",
      "→ launching runtime...",
      "→ Game.play() invoked",
      "→ scenes: " + (code.match(/Scene::from/g)?.length ?? 0) + " registered",
      "→ 60 fps · 0 errors · 0 warnings",
      "✓ Runtime exited cleanly.",
    ];
    steps.forEach((s, i) => {
      setTimeout(() => {
        setOutput((prev) => [...prev, s]);
      }, 180 * i);
    });
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const onReset = () => {
    setCode(initialCode);
    setOutput([]);
  };

  const loadSample = (sampleCode: string) => {
    setCode(sampleCode);
    setOutput([]);
  };

  return (
    <Reveal>
      <Card className="overflow-hidden border-border bg-card">
        <CardHeader className="border-b border-border pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Terminal className="h-4 w-4 text-brand" /> e# code editor
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              {SAMPLES.map((s) => (
                <Button
                  key={s.id}
                  variant="outline"
                  size="sm"
                  className="border-border bg-background font-mono text-[11px]"
                  onClick={() => loadSample(s.code)}
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Editor body */}
          <div className="relative flex bg-[#0b1120] text-sm">
            {/* Line numbers */}
            <div
              ref={lineNumbersRef}
              className="scroll-pretty select-none overflow-hidden border-r border-white/10 px-3 py-3 text-right font-mono text-[12px] text-white/30"
              style={{ minWidth: 48 }}
            >
              {lines.map((_, i) => (
                <div key={i} style={{ height: "1.5em", lineHeight: "1.5em" }}>
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Textarea with syntax-highlighted overlay */}
            <div className="relative flex-1">
              <pre
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-auto p-3 font-mono text-[12px] leading-[1.5] whitespace-pre-wrap break-words"
                style={{ color: "#e5edff" }}
              >
                {highlightEsharp(code)}
                {/* Trailing newline so the last line keeps its height */}
                {"\n"}
              </pre>
              <textarea
                ref={taRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyUp={updateCursor}
                onClick={updateCursor}
                onKeyUpCapture={updateCursor}
                onScroll={onScroll}
                spellCheck={false}
                className="scroll-pretty absolute inset-0 resize-none bg-transparent p-3 font-mono text-[12px] leading-[1.5] text-transparent caret-brand outline-none"
                style={{ caretColor: "var(--brand)" }}
              />
            </div>
          </div>

          {/* Status bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
            <span className="font-mono">
              Ln {cursor.line}, Col {cursor.col} · {lines.length} lines · e# v1.3
            </span>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                onClick={onRun}
              >
                <Play className="mr-1.5 h-3.5 w-3.5" /> Run
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-border bg-background"
                onClick={onCopy}
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-border bg-background"
                onClick={onReset}
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
              </Button>
            </div>
          </div>

          {/* Output panel */}
          <div className="border-t border-border bg-[#0b1120] p-3 font-mono text-[12px] text-emerald-300">
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/40">
              <Sparkles className="h-3 w-3" /> Output
            </div>
            {output.length === 0 ? (
              <p className="text-white/30">Click Run to compile &amp; run the program.</p>
            ) : (
              <pre className="whitespace-pre-wrap break-words">
                {output.join("\n")}
                <span className="inline-block w-2 h-3.5 ml-0.5 bg-emerald-300 animate-pulse" />
              </pre>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="mt-3 text-xs text-muted-foreground">
        Tip: press <code className="font-mono text-brand">Ctrl+S</code> in the
        editor to run a syntax check. The editor supports syntax highlighting
        for <code className="font-mono">use</code>,{" "}
        <code className="font-mono">game!</code>,{" "}
        <code className="font-mono">fn</code>,{" "}
        <code className="font-mono">let</code>, strings, and comments.
      </p>
    </Reveal>
  );
}

/* ---- Tiny e# syntax highlighter (regex-based, no deps) ---- */
function highlightEsharp(code: string): React.ReactNode[] {
  const tokens: { type: string; value: string }[] = [];
  const re = /(\/\/[^\n]*|fn|let|mut|use|game!|Scene|Movie|Weather|Steam|Game|return|if|else|for|in|->|"[^"]*"|\d+|[A-Za-z_][A-Za-z0-9_]*|[^\sA-Za-z0-9_]+|\s+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    const v = m[0];
    let type = "plain";
    if (v.startsWith("//")) type = "comment";
    else if (v.startsWith('"')) type = "string";
    else if (/^(fn|let|mut|use|return|if|else|for|in)$/.test(v)) type = "kw";
    else if (v === "game!") type = "macro";
    else if (/^(Scene|Movie|Weather|Steam|Game)$/.test(v)) type = "type";
    else if (v === "->" ) type = "punct";
    else if (/^\d+$/.test(v)) type = "num";
    else if (/^[A-Z]/.test(v)) type = "type";
    tokens.push({ type, value: v });
  }
  const colors: Record<string, string> = {
    comment: "#5b6f86",
    string: "#9bd78f",
    kw: "#7dd3fc",
    macro: "#f0abfc",
    type: "#fcd34d",
    num: "#fca5a5",
    punct: "#cbd5e1",
    plain: "#e5edff",
  };
  return tokens.map((t, i) => (
    <span key={i} style={{ color: colors[t.type] }}>
      {t.value}
    </span>
  ));
}
