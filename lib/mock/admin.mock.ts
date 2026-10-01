import type { AdminOverview, AdminUser } from "@/lib/store/features/admin/admin.types";

// Sample figures for the admin prototype. They are not real platform data.
export const MOCK_ADMIN_OVERVIEW: AdminOverview = {
  stats: {
    totalUsers: 1248,
    activeUsers: 864,
    newUsers: 238,
    totalQueries: 18430,
    freeChatsUsed: 6912,
    paidUsers: 112,
    monthlyRevenue: 428000,
    ragDocuments: 1284,
  },
  userGrowth: [
    { month: "Jan", value: 320 },
    { month: "Feb", value: 455 },
    { month: "Mar", value: 610 },
    { month: "Apr", value: 780 },
    { month: "May", value: 1010 },
    { month: "Jun", value: 1248 },
  ],
  revenue: [
    { month: "Jan", value: 96000 },
    { month: "Feb", value: 148000 },
    { month: "Mar", value: 212000 },
    { month: "Apr", value: 276000 },
    { month: "May", value: 352000 },
    { month: "Jun", value: 428000 },
  ],
  queries: [
    { month: "Jan", value: 1420 },
    { month: "Feb", value: 2050 },
    { month: "Mar", value: 2780 },
    { month: "Apr", value: 3310 },
    { month: "May", value: 4060 },
    { month: "Jun", value: 4810 },
  ],
  userDistribution: [
    { label: "Free users", value: 1132 },
    { label: "Paid users", value: 112 },
    { label: "Admins", value: 4 },
  ],
  subscribersByPlan: [
    { label: "Monthly plan", value: 74 },
    { label: "Quarterly plan", value: 38 },
  ],
};

export const MOCK_ADMIN_USERS: AdminUser[] = [
  { id: "admin-demo", fullName: "System Administrator", email: "admin@legaladvisor.com", role: "super_admin", status: "active", plan: "free", chatsUsed: 0, joinedAt: "2026-01-02" },
  { id: "u-1002", fullName: "Nadia Qureshi", email: "nadia.qureshi@example.com", role: "admin", status: "active", plan: "free", chatsUsed: 12, joinedAt: "2026-01-15" },
  { id: "u-1003", fullName: "Ayesha Khan", email: "ayesha.khan@example.com", role: "user", status: "active", plan: "quarterly", chatsUsed: 184, joinedAt: "2026-01-21" },
  { id: "u-1004", fullName: "Bilal Ahmed", email: "bilal.ahmed@example.com", role: "user", status: "active", plan: "monthly", chatsUsed: 96, joinedAt: "2026-02-03" },
  { id: "u-1005", fullName: "Fatima Malik", email: "fatima.malik@example.com", role: "user", status: "inactive", plan: "free", chatsUsed: 6, joinedAt: "2026-02-11" },
  { id: "u-1006", fullName: "Hamza Siddiqui", email: "hamza.siddiqui@example.com", role: "user", status: "active", plan: "free", chatsUsed: 5, joinedAt: "2026-02-27" },
  { id: "u-1007", fullName: "Zainab Hussain", email: "zainab.hussain@example.com", role: "user", status: "active", plan: "monthly", chatsUsed: 141, joinedAt: "2026-03-08" },
  { id: "u-1008", fullName: "Usman Tariq", email: "usman.tariq@example.com", role: "user", status: "active", plan: "free", chatsUsed: 3, joinedAt: "2026-03-19" },
  { id: "u-1009", fullName: "Sana Javed", email: "sana.javed@example.com", role: "user", status: "inactive", plan: "monthly", chatsUsed: 58, joinedAt: "2026-04-02" },
  { id: "u-1010", fullName: "Ali Raza", email: "ali.raza@example.com", role: "user", status: "active", plan: "quarterly", chatsUsed: 223, joinedAt: "2026-04-17" },
  { id: "u-1011", fullName: "Mehwish Iqbal", email: "mehwish.iqbal@example.com", role: "user", status: "active", plan: "free", chatsUsed: 6, joinedAt: "2026-05-06" },
  { id: "u-1012", fullName: "Omar Farooq", email: "omar.farooq@example.com", role: "user", status: "active", plan: "free", chatsUsed: 2, joinedAt: "2026-05-24" },
  { id: "u-1013", fullName: "Hira Shah", email: "hira.shah@example.com", role: "user", status: "active", plan: "monthly", chatsUsed: 37, joinedAt: "2026-06-09" },
];
