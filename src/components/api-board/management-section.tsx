"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Key,
  RefreshCw,
  Pause,
  Play,
  Trash2,
  Check,
  Copy,
  Plus,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  managedKeys,
  activityFeed,
  type ManagedKey,
  type ActivityEvent,
} from "@/components/api-board/data";
import { Reveal, Stagger, fadeUp } from "@/components/api-board/motion";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ManagedKey["status"], string> = {
  active:
    "border-emerald-500/30 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  rotating:
    "border-amber-400/40 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  revoked:
    "border-rose-500/30 bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  paused:
    "border-slate-400/30 bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300",
};

const ENV_STYLES: Record<ManagedKey["environment"], string> = {
  production: "border-brand/30 bg-brand-soft text-brand",
  staging:
    "border-violet-400/30 bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300",
  sandbox:
    "border-slate-400/30 bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300",
};

const ACTIVITY_ICON: Record<
  ActivityEvent["type"],
  { icon: LucideIcon; color: string }
> = {
  created: { icon: Plus, color: "text-emerald-500" },
  rotated: { icon: RefreshCw, color: "text-amber-500" },
  revoked: { icon: Trash2, color: "text-rose-500" },
  called: { icon: Zap, color: "text-brand" },
  limited: { icon: AlertTriangle, color: "text-amber-500" },
  warned: { icon: AlertTriangle, color: "text-amber-500" },
};

export function ManagementSection() {
  const totalCallsToday = managedKeys.reduce((sum, k) => sum + k.callsToday, 0);
  const totalCallsMonth = managedKeys.reduce((sum, k) => sum + k.callsMonth, 0);
  const activeKeys = managedKeys.filter((k) => k.status === "active").length;
  const rotatingKeys = managedKeys.filter((k) => k.status === "rotating").length;
  const quotaUsedPct = Math.round(
    (totalCallsToday /
      (managedKeys.reduce((sum, k) => sum + k.quotaPerDay, 0) || 1)) *
      100
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge
              variant="outline"
              className="mb-3 gap-1.5 border-border px-2 py-0.5 text-xs"
            >
              <Key className="h-3.5 w-3.5 text-brand" /> API Management
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Create, rotate, and revoke your API Board keys from a single
              view. Track quota, monitor usage trends, and watch live traffic
              in real time.
            </p>
          </div>
          <Button className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Plus className="mr-1.5 h-4 w-4" /> New key
          </Button>
        </div>
      </Reveal>

      {/* Stats */}
      <Stagger
        className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
        stagger={0.1}
      >
        <StatCard
          icon={Activity}
          label="Calls today"
          value={totalCallsToday.toLocaleString()}
          trend="+12% vs avg"
          trendUp
        />
        <StatCard
          icon={Zap}
          label="Calls this month"
          value={totalCallsMonth.toLocaleString()}
          trend="+8% vs prev"
          trendUp
        />
        <StatCard
          icon={Key}
          label="Active keys"
          value={`${activeKeys} / ${managedKeys.length}`}
          trend={`${rotatingKeys} rotating`}
          trendUp={false}
        />
        <StatCard
          icon={Shield}
          label="Quota used"
          value={`${quotaUsedPct}%`}
          trend={`${managedKeys.length * 1000}/day total`}
          trendUp
        />
      </Stagger>

      {/* Two-column: key list + activity feed */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Key list */}
        <Reveal variant="slideInLeft">
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 text-base">
                <Key className="h-4 w-4 text-brand" /> API keys
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="scroll-pretty max-h-[640px] overflow-y-auto">
                {managedKeys.map((k, i) => (
                  <KeyRow key={k.id} k={k} index={i} />
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Activity feed */}
        <Reveal variant="slideInRight">
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-brand" /> Live activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="scroll-pretty max-h-[640px] overflow-y-auto p-2">
                <ol className="space-y-1">
                  {activityFeed.map((ev, i) => {
                    const meta = ACTIVITY_ICON[ev.type];
                    const Icon = meta.icon;
                    return (
                      <motion.li
                        key={ev.id}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex items-start gap-3 rounded-lg px-2 py-2 transition hover:bg-muted/40"
                      >
                        <div
                          className={cn(
                            "mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-muted",
                            meta.color
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-medium">
                              {ev.service}
                            </p>
                            <time className="flex-shrink-0 font-mono text-[10px] text-muted-foreground">
                              {ev.time}
                            </time>
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {ev.detail}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

function StatCard({ icon: Icon, label, value, trend, trendUp }: StatCardProps) {
  return (
    <motion.div variants={fadeUp}>
      <Card className="group relative h-full overflow-hidden border-border bg-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
        <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-soft-foreground transition-transform duration-300 group-hover:scale-x-100" />
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand transition group-hover:scale-110">
              <Icon className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trendUp ? "text-emerald-500" : "text-amber-500"
              )}
            >
              {trendUp ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {trend}
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface KeyRowProps {
  k: ManagedKey;
  index: number;
}

function KeyRow({ k, index }: KeyRowProps) {
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const pct = Math.min(100, Math.round((k.callsToday / k.quotaPerDay) * 100));

  const masked = k.key.slice(0, 12) + "•".repeat(8) + k.key.slice(-4);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(k.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.3 }}
      className="border-b border-border px-4 py-4 transition last:border-b-0 hover:bg-muted/20"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        {/* Left: identity */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold">{k.service}</h3>
            <Badge
              variant="outline"
              className={cn(
                "px-1.5 py-0 text-[10px] font-medium",
                STATUS_STYLES[k.status]
              )}
            >
              {k.status}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "px-1.5 py-0 text-[10px] font-medium",
                ENV_STYLES[k.environment]
              )}
            >
              {k.environment}
            </Badge>
            <span className="text-[11px] text-muted-foreground">{k.label}</span>
          </div>
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            className="mt-2 flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2 py-1 font-mono text-xs text-foreground transition hover:border-brand/40"
          >
            <span className="truncate">{revealed ? k.key : masked}</span>
            <span className="text-[10px] uppercase text-muted-foreground">
              {revealed ? "hide" : "reveal"}
            </span>
          </button>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Last used{" "}
            <time className="font-mono">
              {new Date(k.lastUsedAt).toLocaleString()}
            </time>
          </p>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-foreground"
            aria-label="Copy key"
            title="Copy key"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-brand"
            aria-label="Rotate"
            title="Rotate"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          {k.status === "paused" ? (
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-emerald-500"
              aria-label="Resume"
              title="Resume"
            >
              <Play className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-amber-500"
              aria-label="Pause"
              title="Pause"
            >
              <Pause className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-rose-500"
            aria-label="Revoke"
            title="Revoke"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Usage bar + sparkline */}
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_120px] sm:items-center">
        <div>
          <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>
              {k.callsToday.toLocaleString()} /{" "}
              {k.quotaPerDay.toLocaleString()} today
            </span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={cn(
                "h-full rounded-full",
                pct > 90
                  ? "bg-rose-500"
                  : pct > 70
                    ? "bg-amber-500"
                    : "bg-brand"
              )}
            />
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {k.callsThisMonth.toLocaleString()} calls this month
          </p>
        </div>
        <Sparkline data={k.trend} />
      </div>
    </motion.div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const lastX = (data.length - 1) * step;
  const lastY = h - ((data[data.length - 1] - min) / range) * h;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className="ms-auto block h-8"
      aria-label="Usage trend"
      role="img"
    >
      <polyline
        points={points}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill="var(--brand)"
        opacity="0.08"
      />
      <circle cx={lastX} cy={lastY} r="2.5" fill="var(--brand)" />
    </svg>
  );
}
