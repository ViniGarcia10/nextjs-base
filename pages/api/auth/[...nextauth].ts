import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthUser } from "../../../@types/AuthUser";
import api from "../../../libs/api";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials?.email && credentials.password) {
          const User: any = await api.getUserByEmail(credentials.email);

          if (User) {
            return {
              id: User.id,
              name: User.name,
              email: User.email,
              role: User.role,
            };
          }
        }

        return null as any;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("token", token, "user", user);
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("session: ", session, "token: ", token);
      if (token) {
        session.user = token.user as AuthUser;
      }

      return session;
    },
  },
  pages: {
    //   signIn: "/login",
  },
};

export default NextAuth(authOptions);
