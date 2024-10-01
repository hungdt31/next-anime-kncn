"use client";
import React, { useEffect } from "react";
import { getAnimeInfo } from "@/data/anime";
import { useMutation } from "@tanstack/react-query";
import { SkeletonCards } from "@/components/loading/skeleton";
import ErrorQuery from "@/components/common/error-query";
import Relation from "@/components/info/relation";
import RecommendForYou from "@/components/info/recommend";
import { getAnimeTitle } from "@/utils/constant";
import styles from "@/styles/info.module.css";
import { cn } from "@/lib/utils";
import TriggerMovie from "@/components/info/trigger";
import Nav from "@/components/info/nav";
import MiniInfo from "@/components/info/mini";
import AnimeInfoDetail from "@/components/info/detail";
import AlternativeAnimeInfoDetail from "@/components/info/alternative-detail";
import ShareSocial from "@/components/common/share-social";

export default function AnimeInfoPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { data, isPending, isError, mutate } = useMutation({
    mutationKey: ["Info"],
    mutationFn: (id: string) => getAnimeInfo(id),
  });
  useEffect(() => {
    mutate(params.id);
  }, [params.id]);
  if (isPending) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;
  return (
    <div className="flex-col flex justify-center items-center">
      <div
        className={cn(styles.banner, "lg:w-[80%] w-[100%]")}
        style={{
          backgroundImage: `url(${data?.cover})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className={styles.concept}>
          {data && (
            <TriggerMovie
              image={data.image}
              url={data?.episodes[0]?.id || ""}
              animeId={data?.id}
            />
          )}
          <div className="flex flex-col space-y-3 mr-3">
            <p className="lg:text-3xl font-bold text-2xl">
              {data?.title && (
                <p
                  style={{
                    color: `${data.color}`,
                  }}
                >
                  {getAnimeTitle(data.title)}
                </p>
              )}
            </p>
            <MiniInfo
              releaseDate={data?.releaseDate}
              currentEpisode={data?.currentEpisode}
              totalEpisodes={data?.totalEpisodes}
              type={data?.type}
            />
            <div className="items-center space-x-5 mt-5 flex">
              <div className="text-sm border-l-[2px] border-red-500 pl-4">
                <h5 className="text-red-500 font-semibold">Share</h5>
                <p className="text-white">to your friends</p>
              </div>
              {data?.title && data?.id && (
                <ShareSocial
                  link={`${process.env.NEXT_PUBLIC_NEXT_ANIME_URL}/anime/${data.id}`}
                  title={`Next Anime - ${getAnimeTitle(data.title)} - Detail`}
                />
              )}
            </div>
          </div>
          <div className="hidden lg:block h-full">
            {data && <AnimeInfoDetail info={data} />}
          </div>
        </div>
      </div>
      <div className="mt-5 w-full lg:hidden block">
        {data && <AlternativeAnimeInfoDetail info={data} />}
      </div>
      <div className="lg:w-[80%] sm:w-[90%]">
        <Nav
          desSection={data?.description || "No description available"}
          characters={data?.characters}
          title={data?.title ? (getAnimeTitle(data.title) as string) : ""}
          video={data?.trailer}
        />
        <Relation relationItems={data?.relations} />
        <RecommendForYou relationItems={data?.recommendations} />
      </div>
    </div>
  );
}
