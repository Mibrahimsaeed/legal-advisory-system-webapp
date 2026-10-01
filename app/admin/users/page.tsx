import type { Metadata } from "next";
import { UsersView } from "@/components/admin/users/users-view";

export const metadata: Metadata = { title: "User Management" };

export default function AdminUsersPage() {
  return <UsersView />;
}
