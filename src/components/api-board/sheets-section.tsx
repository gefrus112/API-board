"use client";

import * as React from "react";
import {
  FileCode2,
  ExternalLink,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/api-board/code-block";
import { codeSheets, REPO_URL, type CodeSheet } from "@/components/api-board/data";
import { cn } from "@/lib/utils";

const LANG_COLORS: Record<string, string> = {
  css: "text-sky-500",
  javascript: "text-amber-500",
  python: "text-emerald-500",
  cpp: "text-blue-500",
  bash: "text-violet-500",
};

export function SheetsSection() {
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState(codeSheets[0].id);

  const filtered = codeSheets.filter(
    (s) =>
      !query ||
      s.filename.toLowerCase().includes(query.toLowerCase()) ||
      s.language.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
  );

  const active = codeSheets.find((s) => s.id === activeId) ?? codeSheets[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <Badge
          variant="outline"
          className="mb-3 gap-1.5 border-border px-2 py-0.5 text-xs"
        >
          <FileCode2 className="h-3.5 w-3.5 text-brand" /> Code Sheets
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Copy-paste code sheets
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Drop-in stylesheets and widgets for every API on the board. Pull them
          raw from the GitHub repo, drop them into your project, plug in your
          key, and ship.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by filename, language, or description"
            className="h-10 pl-9"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* File list */}
        <div className="grid gap-2 lg:max-h-[calc(100vh-260px)] lg:overflow-y-auto scroll-pretty lg:pr-1">
          {filtered.map((s) => {
            const isActive = s.id === active.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition hover:border-brand/40 hover:shadow-sm",
                  isActive && "border-brand/60 bg-brand-soft/40 ring-1 ring-brand/30"
                )}
              >
                <FileCode2
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    LANG_COLORS[s.language] ?? "text-muted-foreground"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm font-medium">
                    {s.filename}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {s.language}
                  </p>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-xs text-muted-foreground">
              No sheets match your search.
            </div>
          )}
        </div>

        {/* File viewer */}
        <SheetViewer sheet={active} />
      </div>
    </div>
  );
}

function SheetViewer({ sheet }: { sheet: CodeSheet }) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-0">
        {/* File header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <FileCode2
              className={cn(
                "h-5 w-5",
                LANG_COLORS[sheet.language] ?? "text-muted-foreground"
              )}
            />
            <div>
              <p className="font-mono text-sm font-semibold">{sheet.filename}</p>
              <p className="text-[11px] text-muted-foreground">
                {sheet.language} · {sheet.code.split("\n").length} lines
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-border bg-background"
              asChild
            >
              <a
                href={sheet.rawUrl}
                target="_blank"
                rel="noreferrer"
                className="gap-1.5"
              >
                Raw
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-border bg-background"
              asChild
            >
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="gap-1.5"
              >
                Repo
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="border-b border-border bg-muted/30 px-4 py-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {sheet.description}
          </p>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
            {sheet.rawUrl}
          </p>
        </div>

        {/* Code */}
        <CodeBlock
          code={sheet.code}
          language={sheet.language}
          showLineNumbers
        />
      </CardContent>
    </Card>
  );
}
