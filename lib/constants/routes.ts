export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  consultation: "/consultation",
  consultationDetail: (id: string) => `/consultation/${id}`,
  settings: "/settings",
  help: "/help",
  upgrade: "/upgrade",
  admin: {
    dashboard: "/admin",
    users: "/admin/users",
    rag: "/admin/rag",
    analytics: "/admin/analytics",
    profile: "/admin/profile",
  },
} as const;
