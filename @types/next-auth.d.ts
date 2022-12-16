import "next-auth";
import { AuthUser } from "./AuthUser";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
