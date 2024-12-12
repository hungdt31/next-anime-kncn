"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";
import path from "@/utils/path";
import Link from "next/link";
import { AddAnimeToList } from "@/action/list";
import { useSession } from "next-auth/react";
import { checkList } from "@/data/anime";
import { Check } from "lucide-react";
// import { Toast } from "@/components/ui/toast";
interface TriggerMovie {
  image: string;
  url?: string | undefined;
  animeId: string;
  animeTitle: string;
  animeType: string;
  animeColor: string;
  animeImage: string;
  nextEpisodeTime: number;
}
export default function TriggerMovie({ image, url, animeId, animeColor, animeImage, animeTitle, animeType, nextEpisodeTime }: TriggerMovie) {
  const { data } = useSession();
  const [isAdded, setIsAdded] = React.useState(false);
  const handleAddToList = async () => {
    const rs = await AddAnimeToList({
      userId: data?.user.id,
      animeId,
      animeImage,
      animeTitle,
      animeType,
      animeColor,
      nextEpisodeTime,
    })
    if (rs) {
      alert("Added to list");
      setIsAdded(true);
    } else {
      alert("Failed to add to list");
      setIsAdded(false);
    }
  }

  const handleExist = async () => {
    const rs = await checkList({
      animeId,
      userId: data?.user.id,
    })
    if (rs) {
      setIsAdded(true);
    } else setIsAdded(false);
  }

  useEffect(() => {
    handleExist()
  }, []);

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
      {isAdded ?
        <Button
          className="absolute top-1 left-1 flex gap-2 px-2 font-semibold rounded-br-lg rounded-tl-lg rounded-bl-none rounded-tr-none z-20"
          variant="secondary"
        >
          <Check className="opacity-40" /> <p>Exist in List</p>
        </Button>
        : <Button
          className="absolute top-1 left-1 flex gap-2 px-2 font-semibold rounded-br-lg rounded-tl-lg rounded-bl-none rounded-tr-none z-20"
          variant="secondary"
          onClick={handleAddToList}
        >
          <BookmarkPlus className="opacity-40" /> <p>Add to List</p>
        </Button>}
      <Link href={url && animeId ? path.watch(animeId, url) : path.anime(animeId)}>
        <Button
          style={{
            backgroundColor: "#FF9A8B",
            backgroundImage:
              "linear-gradient(157deg, #FF4E90 0%, #FF2525 100%)",
          }}
          className="absolute bottom-0 w-full text-center rounded-t-none h-10 hover:opacity-70"
        >
          WATCH NOW
        </Button>
        <div className="w-0 h-0 border-t-[0.5rem] border-t-secondary border-l-[1rem] border-l-transparent z-10 top-10 left-1 absolute"></div>
      </Link>
    </div>
  );
}
