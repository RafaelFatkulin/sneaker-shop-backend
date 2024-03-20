export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  emailVerified: boolean;
  role: "ADMIN" | "USER"
}
