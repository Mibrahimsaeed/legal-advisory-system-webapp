import type { Metadata } from "next";
import { ProfileView } from "@/components/admin/profile/profile-view";

export const metadata: Metadata = { title: "Admin Profile" };

export default function AdminProfilePage() {
  return <ProfileView />;
}
