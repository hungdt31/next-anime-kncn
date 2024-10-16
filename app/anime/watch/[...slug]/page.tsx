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
import InfoWatch from "@/components/watch/info";
import Container from "@/components/layout/container";
import Comment from "@/components/comment";
import { MessageCircleMore } from "lucide-react";
import MoreLikeThis from "@/components/watch/more-like-this";
import { AiFillLike } from "react-icons/ai";
import { Share2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { toggleFrame, selectFrame } from "@/hooks/slices/use-isframe";

const getDataFormatForPlayer = (videos: Source[]) => {
  const rs = [];
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

function formatEpisodeTitle(slug: string): string {
  // Split the string by hyphens
  const parts = slug.split("-");

  // Remove the last part if it starts with "episode"
  if (parts[parts.length - 1].startsWith("episode")) {
    parts.pop();
  }

  // Capitalize the first letter of each word
  const formattedTitle = parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return formattedTitle;
}

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
  const dispatch = useAppDispatch();
  const frame = useAppSelector(selectFrame);
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
  }, [slug, mutate, router]);

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
      <div className="mt-[80px] flex gap-5 py-5 px-3 md:flex-row flex-col justify-center">
        <div className="md:w-2/3 lg:w-[70%]">
          {frame.isFrame ? (
            <Player
              Hls={Hls}
              source={getDataFormatForPlayer(episodeStreaming.sources)}
              color="#FF0000"
              poster={animeInfo.image}
              className="w-full h-full"
              playerRef={playerRef}
            />
          ) : (
            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center" />
          )}

          <h4 className="mt-5">{formatEpisodeTitle(slug[1])}</h4>
          <div className="mt-2 flex gap-3">
            <Button onClick={() => dispatch(toggleFrame())} variant={"outline"}>
              {frame.message}
            </Button>
            <Button className="rounded-full flex items-center bg-orange-700 hover:bg-orange-500 gap-2">
              <p>Like</p> <AiFillLike />
            </Button>
            <Button className="rounded-full flex items-center gap-2 bg-cyan-700 hover:bg-cyan-500">
              <p>Share</p> <Share2 />
            </Button>
          </div>
          <div className="flex gap-3 py-5 overflow-scroll">
            {animeInfo?.episodes.map((item: Episode, index: number) => {
              return (
                <Link href={path.watch(slug[0], item.id)} key={index}>
                  <Button
                    variant={item.id === slug[1] ? "default" : "secondary"}
                  >
                    {item.number}
                  </Button>
                </Link>
              );
            })}
          </div>
          <InfoWatch data={animeInfo} />
          <Container title="Comments" icon={MessageCircleMore}>
            <Comment id={animeInfo.id} />
          </Container>
        </div>
        <div className="md:w-1/3 lg:w-[20%]">
          <MoreLikeThis
            recommendations={animeInfo?.recommendations}
            relations={animeInfo?.relations}
          />
        </div>
      </div>
    );
  }
  return null; // Trả về null nếu không có dữ liệu
};

export default WatchPage;
