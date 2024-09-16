"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { UAvatar } from "./avatar";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { authRoutes } from "@/routes";
import path from "@/utils/path";

export function UHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="flex gap-3 items-center">
      <ModeToggle />
      <Link href={path.search}>
        <Search />
      </Link>
      {authRoutes.includes(pathname) ? (
        <></>
      ) : session?.user ? (
        <UAvatar
          imgUrl={session.user.image as string}
          alt={session.user.name as string}
        />
      ) : (
        <Link href={path.signIn}>
          <Button>Sign In</Button>
        </Link>
      )}
    </div>
  );
}
