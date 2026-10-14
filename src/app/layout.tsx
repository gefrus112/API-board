import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/api-board/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "API Board — Free API Keys, Docs & Code Sheets",
  description:
    "API Board gives you ready-to-use API keys, copy-paste code sheets, and Vercel-style docs for movie search, weather, package tracking, and more. Open source on GitHub.",
  keywords: [
    "API Board",
    "free API keys",
    "movie API",
    "weather API",
    "tracking API",
    "RapidAPI",
    "API docs",
    "code sheets",
  ],
  authors: [{ name: "gefrus112" }],
  icons: {
    icon: "/cube.svg",
  },
  openGraph: {
    title: "API Board — Free API Keys, Docs & Code Sheets",
    description:
      "Ready-to-use API keys, code sheets, and docs for movie search, weather, tracking, and more.",
    url: "https://github.com/gefrus112/API-board",
    siteName: "API Board",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Board",
    description: "Free API keys, code sheets, and docs in one place.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
