"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CubeLogo } from "@/components/api-board/cube-logo";
import { ThemeToggle } from "@/components/api-board/theme-toggle";
import { GitHubAuthButton } from "@/components/api-board/github-auth";
import { REPO_URL } from "@/components/api-board/data";
import { cn } from "@/lib/utils";

export type TabId =
  | "home"
  | "apis"
  | "management"
  | "docs"
  | "sheets"
  | "downloads"
  | "esharp";

interface HeaderProps {
  active: TabId;
  onTabChange: (tab: TabId) => void;
}

const NAV: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "apis", label: "APIs" },
  { id: "management", label: "Management" },
  { id: "downloads", label: "Downloads" },
  { id: "esharp", label: "e#" },
  { id: "docs", label: "Docs" },
  { id: "sheets", label: "Code Sheets" },
];

export function Header({ active, onTabChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const go = (tab: TabId) => {
    onTabChange(tab);
    setMobileOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo + name */}
        <button
          type="button"
          onClick={() => go("home")}
          className="group flex items-center gap-2.5 outline-none"
          aria-label="API Board home"
        >
          <span className="brand-glow cube-pulse-glow rounded-lg bg-background p-1 transition group-hover:scale-105">
            <span className="cube-float block">
              <CubeLogo size={28} />
            </span>
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold tracking-tight">
              API Board
            </span>
            <span className="hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
              v1.2
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm font-medium transition",
                active === item.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <GitHubAuthButton />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden xl:inline-flex"
          >
            <Link
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="gap-2"
            >
              <Github className="h-4 w-4" /> GitHub
            </Link>
          </Button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={cn(
                  "block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition",
                  active === item.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
