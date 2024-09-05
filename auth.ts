import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
 

export const { auth, handlers: {GET, POST}, signIn, signOut } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      return token
    },
    session({ session, token }) {
      if(token.sub && session.user){
        session.user.id = token.sub;
      }
      return session
    },
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig
})