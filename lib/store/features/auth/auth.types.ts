export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  fullName: string;
}

export interface AuthResponse {
  user: User;
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
