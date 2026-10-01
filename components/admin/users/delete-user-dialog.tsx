"use client";

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
import type { AdminUser } from "@/lib/store/features/admin/admin.types";

interface DeleteUserDialogProps {
  user: AdminUser | null;
  onCancel: () => void;
  onConfirm: (user: AdminUser) => void;
}

export function DeleteUserDialog({ user, onCancel, onConfirm }: DeleteUserDialogProps) {
  return (
    <AlertDialog open={user !== null} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {user?.fullName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the account from the sample user list for this session. No real data is deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => user && onConfirm(user)}>
            Delete user
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
