"use client"
import path from "@/utils/path";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link className="flex items-center gap-3 font-bold text-red-700" href={path.home}>
      <div className="border-4 border-red-700 w-10 h-10 flex items-center justify-center relative rounded-bl-full rounded-tr-full">
        <span>N</span>
        <span className="absolute top-0 left-2">N</span>
      </div>
      <h3 
      style={{
        textShadow: "2px 2px 0px rgba(0, 0, 0, 0.2)"
      }}
      >ANIME</h3>
    </Link>
  );
};
