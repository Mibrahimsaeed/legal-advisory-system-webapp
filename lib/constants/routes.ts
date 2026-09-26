export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  consultation: "/consultation",
  consultationDetail: (id: string) => `/consultation/${id}`,
  settings: "/settings",
  help: "/help",
} as const;
