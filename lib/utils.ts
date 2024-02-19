import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "emial",
          placeholder: "john@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email or password is empty!");
        }

        const client = await prismadb.client.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!client || !client.id || !client.password) {
          throw new Error("Invalid user!");
        }

        const machtedPassword = await bcrypt.compare(
          credentials.password,
          client.password
        );

        if (!machtedPassword) {
          throw new Error("Invalid password");
        }
        return client;
      },
    }),
  ],
};
