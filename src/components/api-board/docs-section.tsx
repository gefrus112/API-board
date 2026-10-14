"use client";

import * as React from "react";
import {
  BookOpen,
  Search,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/api-board/code-block";
import { docsPages, REPO_URL, type DocPage } from "@/components/api-board/data";
import { cn } from "@/lib/utils";

export function DocsSection() {
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState(docsPages[0].id);

  const filtered = docsPages.filter(
    (p) =>
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  const categories = React.useMemo(() => {
    const seen = new Map<string, DocPage[]>();
    for (const p of filtered) {
      const arr = seen.get(p.category) ?? [];
      arr.push(p);
      seen.set(p.category, arr);
    }
    return Array.from(seen.entries());
  }, [filtered]);

  const activePage = docsPages.find((p) => p.id === activeId) ?? docsPages[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <Badge
          variant="outline"
          className="mb-3 gap-1.5 border-border px-2 py-0.5 text-xs"
        >
          <BookOpen className="h-3.5 w-3.5 text-brand" /> Documentation
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Docs
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Start with the getting-started guide, then dive into per-API guides
          for movie search, weather, and tracking. Every code example is
          copy-paste ready.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter docs"
              className="h-9 pl-9"
            />
          </div>
          <nav className="scroll-pretty max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {categories.map(([cat, pages]) => (
              <div key={cat} className="mb-5">
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {cat}
                </h3>
                <ul className="space-y-0.5">
                  {pages.map((p) => {
                    const isActive = p.id === activePage.id;
                    return (
                      <li key={p.id}>
                        <button
                          onClick={() => setActiveId(p.id)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition",
                            isActive
                              ? "bg-brand-soft font-medium text-brand-soft-foreground"
                              : "text-foreground/80 hover:bg-accent hover:text-foreground"
                          )}
                        >
                          <span className="truncate">{p.title}</span>
                          {isActive && (
                            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {categories.length === 0 && (
              <p className="px-2 py-4 text-xs text-muted-foreground">
                No docs match your search.
              </p>
            )}
          </nav>
        </aside>

        {/* Content */}
        <article className="min-w-0">
          <div className="mb-6 border-b border-border pb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-brand">
              {activePage.category}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              {activePage.title}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {activePage.description}
            </p>
          </div>

          <div className="prose-docs space-y-3">
            {activePage.body.map((block, i) => {
              switch (block.type) {
                case "h":
                  return (
                    <h3
                      key={i}
                      className="pt-4 text-lg font-semibold tracking-tight scroll-mt-24"
                    >
                      {block.text}
                    </h3>
                  );
                case "p":
                  return (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-foreground/90 sm:text-[15px]"
                    >
                      {block.text}
                    </p>
                  );
                case "ul":
                  return (
                    <ul
                      key={i}
                      className="space-y-1.5 pl-1 text-sm text-foreground/90 sm:text-[15px]"
                    >
                      {block.items.map((it, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                          <span className="leading-relaxed">{it}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case "tip":
                  return (
                    <div
                      key={i}
                      className="my-4 flex items-start gap-3 rounded-lg border border-emerald-300/40 bg-emerald-50/60 p-3 text-sm dark:border-emerald-500/30 dark:bg-emerald-500/10"
                    >
                      <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <p className="leading-relaxed text-foreground/90">
                        <span className="font-semibold">Tip. </span>
                        {block.text}
                      </p>
                    </div>
                  );
                case "warn":
                  return (
                    <div
                      key={i}
                      className="my-4 flex items-start gap-3 rounded-lg border border-amber-300/50 bg-amber-50/70 p-3 text-sm dark:border-amber-500/30 dark:bg-amber-500/10"
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                      <p className="leading-relaxed text-foreground/90">
                        <span className="font-semibold">Warning. </span>
                        {block.text}
                      </p>
                    </div>
                  );
                case "code":
                  return (
                    <CodeBlock
                      key={i}
                      code={block.code}
                      language={block.lang}
                      caption={block.caption}
                      showLineNumbers={false}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Footer of doc */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
            <Button variant="outline" size="sm" asChild>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="gap-1.5 border-border bg-background"
              >
                Edit this page on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const idx = docsPages.findIndex(
                    (p) => p.id === activePage.id
                  );
                  if (idx > 0) setActiveId(docsPages[idx - 1].id);
                }}
                disabled={docsPages.findIndex((p) => p.id === activePage.id) === 0}
              >
                ← Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const idx = docsPages.findIndex(
                    (p) => p.id === activePage.id
                  );
                  if (idx < docsPages.length - 1)
                    setActiveId(docsPages[idx + 1].id);
                }}
                disabled={
                  docsPages.findIndex((p) => p.id === activePage.id) ===
                  docsPages.length - 1
                }
              >
                Next →
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
