import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextNProgressClient from "@/components/progress";
import ReactQueryConfig from "@/lib/react-query";
import NextAuthProvider from "@/lib/next-auth-provider";
import { RightDrawer } from "@/components/drawer";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import ScrollToTop from "@/components/common/ScrollToTop";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next Anime",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <ReactQueryConfig>
              <NextNProgressClient />
              <Header/>
              {children}
              <ScrollToTop/>
              <RightDrawer/>
              <Toaster/>
            </ReactQueryConfig>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
