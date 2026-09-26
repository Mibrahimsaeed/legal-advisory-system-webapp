"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { getDomainLabel } from "@/lib/constants/consultation";
import { ROUTES } from "@/lib/constants/routes";
import { formatRelativeDay } from "@/lib/format";
import { selectConsultations } from "@/lib/store/features/consultations/consultationsSlice";
import { useAppSelector } from "@/lib/store/hooks";

export function ConsultationHistory() {
  const items = useAppSelector(selectConsultations);
  const { id: activeId } = useParams<{ id?: string }>();
  const { setOpenMobile } = useSidebar();
  const [query, setQuery] = useState("");

  const visible = items.filter((item) => item.title.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-[0.16em] uppercase">Recent</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <div className="relative px-2">
          <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-4.5 size-3.5 -translate-y-1/2 text-sidebar-foreground/60" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search consultations"
            placeholder="Search history"
            className="h-8 border-sidebar-border bg-transparent pl-8 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>
        <SidebarMenu>
          {visible.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                size="lg"
                isActive={item.id === activeId}
                render={<Link href={ROUTES.consultationDetail(item.id)} onClick={() => setOpenMobile(false)} />}
              >
                <div className="grid min-w-0 flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-medium">{item.title}</span>
                  <span className="truncate text-xs text-sidebar-foreground/60">
                    {getDomainLabel(item.domain)} · {formatRelativeDay(item.updatedAt)}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {visible.length === 0 && (
            <li className="px-2 py-3 text-xs text-sidebar-foreground/60">No matching consultations.</li>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
