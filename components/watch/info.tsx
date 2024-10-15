import React from "react";
import { InfoResponse } from "@/types/anime/info";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getAnimeTitle } from "@/utils/constant";
import GenresItems from "../common/genres-items";
import { Button } from "../ui/button";
import Link from "next/link";
import path from "@/utils/path";
import { FaCaretRight } from "react-icons/fa6";
import { PiBellRingingBold } from "react-icons/pi";

interface InfoWatch {
  data: InfoResponse;
}

export default function InfoWatch({ data }: InfoWatch) {
  return (
    <div className="flex gap-5 w-full">
      <div className="lg:w-1/4 aspect-[16/12] md:w-1/3 w-1/2 relative">
        <LazyLoadImage
          src={data.image}
          width="100%"
          height="100%"
          effect="blur"
          alt={getAnimeTitle(data.title)}
          className="w-full h-full"
        />
        <Link
          style={{
            backgroundColor: "#FF9A8B",
            backgroundImage:
              "linear-gradient(157deg, #FF4E90 0%, #FF2525 100%)",
          }}
          className="font-semibold text-white absolute top-1 left-1 rounded-lg px-2 text-[14px]"
          href={path.anime(data.id)}
        >
          {data.season} - {data.startDate.year}
        </Link>
        <Link
          href={path.anime(data.id)}
          className="sm:hidden block absolute right-1 bottom-1"
        >
          <Button
            className="flex items-center rounded-none"
            variant={"secondary"}
          >
            <p>Detail</p> <FaCaretRight />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col space-y-5 lg:w-3/4 md:w-2/3 w-1/2">
        <h3
          style={{
            color: data.color,
          }}
        >
          {getAnimeTitle(data.title)}
        </h3>
        <GenresItems items={data.genres.slice(0, 3)} />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="line-clamp-3"
        />
        <div className="flex gap-3 flex-wrap">
          <Link href={path.anime(data.id)} className="hidden sm:block">
            <Button
              className="rounded-full flex items-center"
              variant={"secondary"}
            >
              <p>Detail</p> <FaCaretRight />
            </Button>
          </Link>
          <Button className="rounded-full flex items-center gap-2">
            <p>Follow</p> <PiBellRingingBold />
          </Button>
        </div>
      </div>
    </div>
  );
}
