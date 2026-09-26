"use client";

import { LegalAuthority } from "@/components/consultation/legal-authority";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import type { Consultation } from "@/lib/store/features/consultations/consultations.types";
import { authorityOpenChanged, selectAuthorityOpen } from "@/lib/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function AuthorityDrawer({ consultation }: { consultation: Consultation | undefined }) {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectAuthorityOpen);

  return (
    <Sheet open={open} onOpenChange={(next) => dispatch(authorityOpenChanged(next))}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
        <SheetTitle className="sr-only">Legal Authority</SheetTitle>
        <SheetDescription className="sr-only">Sources supporting the current answer.</SheetDescription>
        <LegalAuthority consultation={consultation} />
      </SheetContent>
    </Sheet>
  );
}
