import type { User } from "@/lib/store/features/auth/auth.types";

// Temporary demo credentials. Remove once the backend authenticates users and
// returns their role with the session.
const DEMO_ADMINS: readonly { password: string; user: User }[] = [
  {
    password: "Admin@123",
    user: {
      id: "admin-demo",
      fullName: "System Administrator",
      email: "admin@legaladvisor.com",
      role: "super_admin",
    },
  },
];

export function findDemoAdmin(email: string, password: string): User | null {
  return DEMO_ADMINS.find((admin) => admin.user.email === email && admin.password === password)?.user ?? null;
}

export function isReservedAdminEmail(email: string): boolean {
  return DEMO_ADMINS.some((admin) => admin.user.email === email);
}
