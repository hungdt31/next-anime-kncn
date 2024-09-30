"use client"
import React from "react";
import GenresItems from "@/components/common/genres-items";
import dayjs from "dayjs";
import { InfoResponse } from "@/types/anime/info";

interface AnimeInfoDetailProps {
  info: InfoResponse;
}

const AlternativeAnimeInfoDetail: React.FC<AnimeInfoDetailProps> = ({ info }) => {
  return (
    <div className="w-full px-5">
        <div className="grid sm:grid-cols-3 gap-3 pb-5 grid-cols-2">
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
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Studios:</p>
            <p>{info?.studios}</p>
          </div>
          <div className="flex text-sm space-x-2">
            <p className="font-semibold">Current episode:</p>
            <p>{info?.currentEpisode}</p>
          </div>
        </div>
        <div className="mt-5 border-b border-red-500 pb-5">
          {info?.genres && <GenresItems items={info.genres}/>}
        </div>
    </div>
  );
};

export default AlternativeAnimeInfoDetail;
