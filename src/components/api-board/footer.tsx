"use client";

import Link from "next/link";
import { Github, Heart } from "lucide-react";
import { CubeLogo } from "@/components/api-board/cube-logo";
import { REPO_URL } from "@/components/api-board/data";
import type { TabId } from "@/components/api-board/header";

interface FooterProps {
  onTabChange: (tab: TabId) => void;
}

export function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <CubeLogo size={28} />
              <span className="text-base font-semibold tracking-tight">
                API Board
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Free API keys, copy-paste code sheets, and Vercel-style docs for
              movie search, weather, tracking, and more. Open source on
              GitHub.
            </p>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-brand/40 hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> gefrus112/API-board
            </a>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { id: "home" as TabId, label: "Home" },
                { id: "apis" as TabId, label: "APIs" },
                { id: "management" as TabId, label: "Management" },
                { id: "downloads" as TabId, label: "Downloads" },
                { id: "esharp" as TabId, label: "e#" },
                { id: "docs" as TabId, label: "Docs" },
                { id: "sheets" as TabId, label: "Code Sheets" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onTabChange(item.id)}
                    className="text-foreground/80 transition hover:text-brand"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 transition hover:text-brand"
                >
                  GitHub repository
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}#readme`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 transition hover:text-brand"
                >
                  README
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/issues`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 transition hover:text-brand"
                >
                  Issues
                </a>
              </li>
              <li>
                <Link
                  href={REPO_URL}
                  target="_blank"
                  className="text-foreground/80 transition hover:text-brand"
                >
                  Releases
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} API Board. MIT licensed.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Built with <Heart className="h-3.5 w-3.5 fill-brand text-brand" /> by
            the open source community
          </p>
        </div>
      </div>
    </footer>
  );
}
