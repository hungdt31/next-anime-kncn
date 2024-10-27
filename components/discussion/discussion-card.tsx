import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import path from "@/utils/path";
import { getCreatedTime } from "@/utils/constant";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface DiscussionCardProps {
  animeName: string;
  animeColor: string;
  animeCover: string;
  animeId: string;
  userName: string;
  userAvatar: string;
  createdAt: Date;
  comment: string;
}

export default function DiscussionCard({
  animeId,
  animeName,
  animeColor,
  comment,
  createdAt,
  userAvatar,
  userName,
  animeCover,
}: DiscussionCardProps) {
  return (
    <div
      className="rounded-lg"
      style={{
        backgroundImage: `url(${animeCover})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <AspectRatio
        ratio={16 / 12}
        className="relative rounded-lg overflow-hidden shadow-lg"
      >
        <div
          style={{
            boxShadow: 'inset 0 0 100px #000'
          }}
          className="absolute top-0 z-30 bg-black bg-opacity-50 w-full h-full">
        </div>

        {/* <div
          style={{
            backgroundColor: animeColor,
            boxShadow: 'inset 0 0 10px #000'
          }}
          className={`h-[75%] w-[120%] rounded-[20px] skew-x-[19deg] skew-y-[-9deg] absolute top-[45%] left-[-15%] z-10`}
        ></div> */}
        <div className="absolute bottom-[5%] w-full overflow-hidden z-40 flex flex-col items-end gap-3 px-3">
          <div className="flex gap-3 self-start">
            <Avatar className="rounded-lg">
              <AvatarImage src={userAvatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-bold mt-1 text-white">{userName}</p>
          </div>
          <div
            style={{
              backgroundColor: animeColor,
              // boxShadow: 'inset 0 0 10px #000'
            }}
            className="line-clamp-3 text-sm rounded-lg px-3 py-2 text-white max-w-[60%]"
            dangerouslySetInnerHTML={{ __html: comment }}
          />
          <Link href={path.anime(animeId)}>
            <button
              style={{
                color: animeColor,
                borderColor: animeColor
              }}
              className="font-bold italic line-clamp-1 overflow-hidden rounded-lg px-2 py-1 whitespace-nowrap text-ellipsis lg:max-w-[200px] md:max-w-[180px] max-w-[150px]">
              {animeName}
            </button>
          </Link>
        </div>
        <p

          className="absolute left-[8%] top-[10%] pb-2 text-xs z-40 text-white">
          {getCreatedTime(new Date(createdAt))}
        </p>
      </AspectRatio>
    </div>
  );
}
