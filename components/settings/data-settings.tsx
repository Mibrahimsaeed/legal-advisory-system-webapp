"use client";

import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { SettingsSection } from "@/components/settings/settings-section";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { consultationsCleared, selectConsultations } from "@/lib/store/features/consultations/consultationsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function DataSettings() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectConsultations).length;
  const [open, setOpen] = useState(false);

  return (
    <SettingsSection title="Data" description="Manage the consultations saved in this browser.">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {count === 1 ? "1 saved consultation" : `${count} saved consultations`}
        </p>
        <Button variant="destructive" disabled={count === 0} onClick={() => setOpen(true)} className="h-9 gap-2 px-3">
          <Trash2Icon aria-hidden />
          Clear history
        </Button>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear consultation history?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes all {count} saved consultations from this browser. It cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                dispatch(consultationsCleared());
                setOpen(false);
              }}
            >
              Clear history
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SettingsSection>
  );
}
