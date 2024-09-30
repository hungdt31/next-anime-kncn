"use client"
import React from "react";
import GenresItems from "@/components/common/genres-items";
import dayjs from "dayjs";
import { InfoResponse } from "@/types/anime/info";

interface AnimeInfoDetailProps {
  info: InfoResponse;
}

const AnimeInfoDetail: React.FC<AnimeInfoDetailProps> = ({ info }) => {
  return (
    <div className="md:w-[342px] w-full h-full flex md:bg-[#0000003a] px-5 items-center text-white">
      <div className="w-full">
        <div className="space-y-3 border-b border-gray-200 w-full pb-5">
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Japanese:</p>
            <p className="line-clamp-1">{info?.title?.native}</p>
          </div>
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Synonyms:</p>
            <p className="line-clamp-1">{info?.synonyms[0]}</p>
          </div>
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Aired:</p>
            <p className="line-clamp-1">
              {dayjs(info?.nextAiringEpisode?.airingTime * 1000).format(
                "DD/MM/YYYY"
              )}
            </p>
          </div>
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Country:</p>
            <p className="line-clamp-1">{info?.countryOfOrigin}</p>
          </div>
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Daration:</p>
            <p className="line-clamp-1">{info?.duration}</p>
          </div>
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Status:</p>
            <p className="line-clamp-1">{info?.status}</p>
          </div>
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Rating:</p>
            <p className="line-clamp-1">{info?.rating}</p>
          </div>
        </div>
        <div className="mt-5 border-b border-gray-200 pb-5">
          {info?.genres && <GenresItems items={info.genres} color="white"/>}
        </div>
        <div className="mt-5 space-y-3">
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Studios:</p>
            <p>{info?.studios}</p>
          </div>
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Current episode:</p>
            <p>{info?.currentEpisode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfoDetail;
