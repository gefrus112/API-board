"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Film,
  CloudSun,
  PackageSearch,
  Globe,
  Coins,
  Laugh,
  Newspaper,
  QrCode,
  Trophy,
  BookOpen,
  CookingPot,
  Users,
  Check,
  Copy,
  ExternalLink,
  Search,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apis, REPO_URL, type ApiEntry } from "@/components/api-board/data";
import { CodeBlock } from "@/components/api-board/code-block";
import { Reveal } from "@/components/api-board/motion";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Film,
  CloudSun,
  PackageSearch,
  Globe,
  Coins,
  Laugh,
  Newspaper,
  QrCode,
  Trophy,
  BookOpen,
  CookingPot,
  Users,
};

const CATEGORIES = [
  "All",
  "Entertainment",
  "Climate",
  "Logistics",
  "Network",
  "Finance",
  "Fun",
  "Media",
  "Utility",
];

export function ApisSection() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [selectedId, setSelectedId] = React.useState(apis[0].id);

  const filtered = apis.filter((a) => {
    const matchesQuery =
      !query ||
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = category === "All" || a.category === category;
    return matchesQuery && matchesCategory;
  });

  // Keep selected item valid as filters change
  React.useEffect(() => {
    if (!filtered.find((a) => a.id === selectedId) && filtered[0]) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected = apis.find((a) => a.id === selectedId) ?? apis[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          API keys &amp; endpoints
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every API on the board ships with a free key (1,000 calls/day), a
          documented endpoint, and copy-paste request/response examples. Use the
          search box to filter by name or tag.
        </p>
      </Reveal>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tag — e.g. movie, weather, ups, geo, recipes"
            className="h-10 pl-9"
          />
        </div>
      </div>
      <div className="mb-8 overflow-x-auto scroll-pretty">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="flex w-max">
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c} value={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No APIs match your search. Try a different tag or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          {/* List */}
          <div className="grid gap-3">
            {filtered.map((api, i) => {
              const Icon = ICONS[api.icon] ?? Film;
              const isActive = api.id === selected.id;
              return (
                <motion.button
                  key={api.id}
                  onClick={() => setSelectedId(api.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition hover:border-brand/40 hover:shadow-sm",
                    isActive && "border-brand/60 bg-brand-soft/40 ring-1 ring-brand/30"
                  )}
                >
                  <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-base font-semibold">
                        {api.name}
                      </h3>
                      {api.free && (
                        <Badge
                          variant="outline"
                          className="border-brand/30 bg-brand-soft px-1.5 py-0 text-[10px] font-medium text-brand"
                        >
                          FREE
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {api.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {api.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Detail */}
          <ApiDetail key={selected.id} api={selected} />
        </div>
      )}
    </div>
  );
}

function ApiDetail({ api }: { api: ApiEntry }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                {(() => {
                  const Icon = ICONS[api.icon] ?? Film;
                  return <Icon className="h-5 w-5" />;
                })()}
              </div>
              <div>
                <CardTitle className="text-lg">{api.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{api.category}</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="gap-1 border-brand/30 bg-brand-soft px-2 py-1 text-[11px] font-medium text-brand"
            >
              <Lock className="h-3 w-3" /> {api.authType}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {api.description}
          </p>

          {/* Endpoint */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Endpoint
              </span>
              <Badge
                variant="secondary"
                className="font-mono text-[11px] font-semibold"
              >
                {api.method}
              </Badge>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 font-mono text-xs text-foreground">
              <span className="truncate">{api.endpoint}</span>
              <CopyButton text={api.endpoint} />
            </div>
          </div>

          {/* API key */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Sample API key
              </span>
              <span className="text-[11px] text-muted-foreground">
                rotate every 90 days
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-brand/30 bg-brand-soft/50 px-3 py-2 font-mono text-xs text-brand-soft-foreground">
              <span className="truncate">{api.sampleKey}</span>
              <CopyButton text={api.sampleKey} />
            </div>
          </div>

          {/* Request */}
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Request example
            </h4>
            <CodeBlock
              code={api.requestExample}
              language="bash"
              showLineNumbers={false}
              caption="copy & run"
            />
          </div>

          {/* Response */}
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Response (200)
            </h4>
            <CodeBlock
              code={api.responseExample}
              language="json"
              showLineNumbers={false}
              caption="truncated for clarity"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
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
                View on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-border bg-background"
              asChild
            >
              <a href={api.docsUrl} className="gap-1.5">
                Read the docs
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label="Copy"
      className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-foreground"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
