"use client";

import { ResearchView } from "@/components/landing/preview/research-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScaleIcon } from "lucide-react";
import { SAMPLE_RESEARCH } from "@/lib/constants/landing-samples";

export function DomainShowcase() {
  return (
    <Tabs
      defaultValue={SAMPLE_RESEARCH[0].id}
      className="gap-0 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-xl shadow-foreground/5"
    >
      <div className="flex flex-col gap-3 border-b bg-muted/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ScaleIcon className="size-4 text-muted-foreground" aria-hidden />
          Research workspace
        </div>
        <TabsList aria-label="Legal domain" className="h-9 w-full sm:w-auto">
          {SAMPLE_RESEARCH.map((sample) => (
            <TabsTrigger key={sample.id} value={sample.id} className="px-3">
              {sample.domain}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {SAMPLE_RESEARCH.map((sample) => (
        <TabsContent key={sample.id} value={sample.id}>
          <ResearchView sample={sample} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
