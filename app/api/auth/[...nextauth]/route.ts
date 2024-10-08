import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@/db/db";
import { authConfig } from "@/lib/auth";

const handler= NextAuth(authConfig);
export{ handler as GET, handler as POST}