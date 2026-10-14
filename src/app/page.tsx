"use client";

import * as React from "react";
import { Header, type TabId } from "@/components/api-board/header";
import { Hero } from "@/components/api-board/hero";
import { ApisSection } from "@/components/api-board/apis-section";
import { ManagementSection } from "@/components/api-board/management-section";
import { DocsSection } from "@/components/api-board/docs-section";
import { SheetsSection } from "@/components/api-board/sheets-section";
import { Footer } from "@/components/api-board/footer";
import { PageTransition } from "@/components/api-board/motion";

export default function Page() {
  const [tab, setTab] = React.useState<TabId>("home");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header active={tab} onTabChange={setTab} />
      <main className="flex-1">
        <PageTransition key={tab}>
          {tab === "home" && <Hero onTabChange={setTab} />}
          {tab === "apis" && <ApisSection />}
          {tab === "management" && <ManagementSection />}
          {tab === "docs" && <DocsSection />}
          {tab === "sheets" && <SheetsSection />}
        </PageTransition>
      </main>
      <Footer onTabChange={setTab} />
    </div>
  );
}
