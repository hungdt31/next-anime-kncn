"use client";
import path from "@/utils/path";
import { getAnimeToWatch } from "@/data/anime";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { InfoResponse } from "@/types/anime/info";
import { SkeletonCards } from "@/components/loading/skeleton";
import ErrorQuery from "@/components/common/error-query";
import Player from "@/components/player";
import { AnimeEpisodeStreaming } from "@/types/anime/episode-streaming-links";
import { Source } from "@/types/anime/episode-streaming-links";
import Hls from "hls.js";
import { Episode } from "@/types/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getDataFormatForPlayer = (videos: Source[]) => {
  let rs = [];
  for (const video of videos) {
    if (video.isM3U8) {
      rs.push({
        label: video.quality,
        url: video.url,
      });
    }
  }
  return rs;
};
const WatchPage = ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  const { slug } = params || {};
  const router = useRouter();
  const playerRef = useRef<HTMLVideoElement | null>(null);

  // Sử dụng useMutation để lấy dữ liệu từ API
  const { data, mutate, isPending, isError } = useMutation({
    mutationKey: ["watch"],
    mutationFn: ({ id, ep }: { id: string; ep: string }) =>
      getAnimeToWatch(id, ep),
  });

  // Gọi mutate khi slug thay đổi
  useEffect(() => {
    if (slug && slug.length === 2) {
      mutate({
        id: slug[0],
        ep: slug[1],
      });
    } else if (slug && slug.length === 1) {
      router.push(path.anime(slug[0]));
    }
  }, [slug]);

  // Nếu đang tải dữ liệu, hiển thị SkeletonCards
  if (isPending) return <SkeletonCards />;

  // Nếu có lỗi xảy ra, hiển thị ErrorQuery
  if (isError) return <ErrorQuery />;

  // Nếu có dữ liệu, hiển thị thông tin
  if (data) {
    const [animeInfo, episodeStreaming] = data as [
      InfoResponse,
      AnimeEpisodeStreaming
    ];

    return (
      <div className="flex gap-5 mt-[80px] justify-center">
        <div className="px-3 py-5">
          <Player
            Hls={Hls}
            source={getDataFormatForPlayer(episodeStreaming.sources)}
            color="#FF0000"
            poster={animeInfo.image}
            className="w-full h-full"
            playerRef={playerRef}
          />
          <div className="flex gap-3 py-5 flex-wrap">
          {animeInfo.episodes.map((item: Episode) => {
            return (
              <Link href={path.watch(slug[0], item.id)}>
                <Button variant={item.id === slug[1] ? "default" : "secondary"}>
                  {item.number}
                </Button>
              </Link>
            );
          })}
        </div>
        </div>
        
        {/* Có thể hiển thị thêm thông tin từ animeInfo và episodeStreaming */}
      </div>
    );
  }
  return null; // Trả về null nếu không có dữ liệu
};

export default WatchPage;
