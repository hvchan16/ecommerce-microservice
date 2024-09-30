import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  id: number;
  email: string;
  role: "client" | "user";
  exp: number;
}

export const getTokenPayload = (token: string): TokenPayload | null => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
