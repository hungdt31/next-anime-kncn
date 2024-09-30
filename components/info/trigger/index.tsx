"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";
import path from "@/utils/path";
import Link from "next/link";
interface TriggerMovie {
  image: string
  url?: string | undefined
  animeId: string
}
export default function TriggerMovie({ image, url, animeId }: TriggerMovie) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        aspectRatio: 12 / 16,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="relative w-[50%] lg:w-[20%] md:w-[25%] sm:w-[30%] shadow-lg rounded-lg lg:ml-5 sm:ml-5 md:ml-5"
    >
      <Button
        className="absolute top-2 left-2 flex gap-2 px-2 font-semibold"
        variant="secondary"
      >
        <BookmarkPlus className="opacity-40" /> <p>Add to List</p>
      </Button>
      <Link href={url && animeId ? path.watch(animeId, url): path.home}>
      <Button
        className="absolute bottom-0 w-full text-center rounded-t-none h-10"
      >
        WATCH NOW
      </Button>
      </Link>
    </div>
  );
}
