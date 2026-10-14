"use client";

import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  language: string;
  caption?: string;
  showLineNumbers?: boolean;
  maxHeight?: number;
}

export function CodeBlock({
  code,
  language,
  caption,
  showLineNumbers = true,
  maxHeight,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="group relative my-3 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="font-mono">{language}</span>
          {caption && (
            <span className="hidden sm:inline">
              <span className="px-1 text-foreground/30">·</span>
              {caption}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground/80 transition hover:bg-accent hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <div
        className="scroll-pretty overflow-auto text-sm"
        style={{ maxHeight: maxHeight ?? undefined }}
      >
        <SyntaxHighlighter
          language={language}
          style={isDark ? oneDark : oneLight}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "1rem 1rem 1rem 0.5rem",
            fontSize: "13px",
          }}
          lineNumberStyle={{
            color: "var(--muted-foreground)",
            opacity: 0.5,
            minWidth: "2.5em",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
