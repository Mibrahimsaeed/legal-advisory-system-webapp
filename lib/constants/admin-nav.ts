import {
  ChartColumnIcon,
  DatabaseIcon,
  FileStackIcon,
  LayoutDashboardIcon,
  MessageSquareTextIcon,
  ScrollTextIcon,
  ServerIcon,
  UserCogIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import type { AdminPermission } from "@/lib/admin/permissions";
import { ROUTES } from "@/lib/constants/routes";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  permission?: AdminPermission;
}

export const ADMIN_NAV: readonly AdminNavItem[] = [
  { label: "Dashboard", href: ROUTES.admin.dashboard, icon: LayoutDashboardIcon },
  { label: "User Management", href: ROUTES.admin.users, icon: UsersIcon, permission: "users:manage" },
  { label: "RAG Data Management", href: ROUTES.admin.rag, icon: DatabaseIcon, permission: "rag:create" },
  { label: "Analytics", href: ROUTES.admin.analytics, icon: ChartColumnIcon, permission: "analytics:view" },
  { label: "Questions", href: ROUTES.admin.questions, icon: MessageSquareTextIcon, permission: "analytics:view" },
  { label: "Documents", href: ROUTES.admin.documents, icon: FileStackIcon, permission: "analytics:view" },
  { label: "System", href: ROUTES.admin.system, icon: ServerIcon },
  { label: "Audit Log", href: ROUTES.admin.audit, icon: ScrollTextIcon, permission: "users:manage" },
  { label: "Admin Profile", href: ROUTES.admin.profile, icon: UserCogIcon },
];
