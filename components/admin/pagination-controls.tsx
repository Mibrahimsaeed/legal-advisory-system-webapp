"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/admin/format";
import { ADMIN_PAGE_SIZE } from "@/lib/constants/admin-tables";

interface PaginationControlsProps {
  offset: number;
  shown: number;
  total: number;
  noun: string;
  onChange: (offset: number) => void;
}

export function PaginationControls({ offset, shown, total, noun, onChange }: PaginationControlsProps) {
  const first = total ? offset + 1 : 0;
  const last = offset + shown;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-muted-foreground">
        Showing {formatNumber(first)}–{formatNumber(last)} of {formatNumber(total)} {noun}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={offset === 0}
          onClick={() => onChange(Math.max(0, offset - ADMIN_PAGE_SIZE))}
        >
          <ChevronLeftIcon />
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled={last >= total} onClick={() => onChange(offset + ADMIN_PAGE_SIZE)}>
          Next
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
