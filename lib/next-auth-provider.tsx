"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
export default function NextAuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SessionProvider basePath="/api/auth">{children}</SessionProvider>;
}