"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileTerminal,
  FileCode2,
  FileText,
  Palette,
  Globe,
  Shield,
  Check,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { downloads, type DownloadItem } from "@/components/api-board/data";
import { Reveal, Stagger, fadeUp } from "@/components/api-board/motion";
import { cn } from "@/lib/utils";

const KIND_META: Record<
  DownloadItem["kind"],
  { icon: LucideIcon; color: string; label: string }
> = {
  batch: { icon: FileTerminal, color: "text-violet-500", label: "Windows .bat" },
  esharp: { icon: FileCode2, color: "text-sky-500", label: "e# source" },
  stylesheet: { icon: Palette, color: "text-pink-500", label: "CSS" },
  text: { icon: FileText, color: "text-amber-500", label: "Text" },
  html: { icon: Globe, color: "text-emerald-500", label: "HTML5" },
};

export function DownloadsSection() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyCurl = async (item: DownloadItem) => {
    const cmd = `powershell -c "iwr ${item.rawUrl} -OutFile ${item.filename}"`;
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal className="mb-8">
        <Badge
          variant="outline"
          className="mb-3 gap-1.5 border-border px-2 py-0.5 text-xs"
        >
          <Download className="h-3.5 w-3.5 text-brand" /> Downloads
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Download installers &amp; code sheets
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Windows batch files to install the API in Visual Studio, the e#
          language toolchain, and the style sheet connector. Plus esharp
          samples and a static HTML5 version of this site for GitHub Pages.
        </p>
      </Reveal>

      {/* Admin warning banner */}
      <Reveal variant="scaleIn">
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-300/50 bg-amber-50/70 p-4 text-sm dark:border-amber-500/30 dark:bg-amber-500/10">
          <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="font-semibold text-amber-700 dark:text-amber-300">
              Run as administrator
            </p>
            <p className="mt-0.5 leading-relaxed text-amber-700/90 dark:text-amber-200/80">
              <code className="font-mono">install-apiboard-vs.bat</code> and{" "}
              <code className="font-mono">install-esharp.bat</code> require
              admin rights because they install extensions and register PATH
              entries.{" "}
              <code className="font-mono">connect-style-sheets.bat</code> does
              not need admin.
            </p>
          </div>
        </div>
      </Reveal>

      <Stagger
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        stagger={0.08}
      >
        {downloads.map((item) => {
          const meta = KIND_META[item.kind];
          const Icon = meta.icon;
          return (
            <motion.div key={item.id} variants={fadeUp}>
              <Card className="scan-on-hover group h-full border-border bg-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                <CardHeader className="border-b border-border pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand transition group-hover:scale-110">
                        <Icon className={cn("h-5 w-5", meta.color)} />
                      </div>
                      <div>
                        <CardTitle className="font-mono text-sm">
                          {item.filename}
                        </CardTitle>
                        <p className="text-[11px] text-muted-foreground">
                          {meta.label} · {item.size}
                        </p>
                      </div>
                    </div>
                    {item.adminRequired && (
                      <Badge
                        variant="outline"
                        className="border-amber-400/40 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                      >
                        admin
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      What it does
                    </p>
                    <ul className="space-y-1">
                      {item.steps.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs leading-relaxed text-foreground/80"
                        >
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button
                      asChild
                      size="sm"
                      className="bg-brand text-brand-foreground hover:bg-brand/90"
                    >
                      <a
                        href={item.publicPath}
                        download={item.filename}
                        className="gap-1.5"
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border bg-background"
                      asChild
                    >
                      <a
                        href={item.rawUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="gap-1.5"
                      >
                        Raw
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCurl(item)}
                      className="gap-1.5 text-xs"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied
                        </>
                      ) : (
                        <>Copy PowerShell</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Stagger>
    </div>
  );
}
