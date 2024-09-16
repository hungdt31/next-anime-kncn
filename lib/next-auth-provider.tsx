"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
export default async function NextAuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SessionProvider>{children}</SessionProvider>;
}
