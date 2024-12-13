"use client";
import path from "@/utils/path";
import { getAnimeToWatch } from "@/data/anime";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { InfoResponse } from "@/types/anime/info";
import { SkeletonCards } from "@/components/loading/skeleton";
import ErrorQuery from "@/components/common/error-query";
// import Player from "@/components/player";
import { AnimeEpisodeStreaming } from "@/types/anime/episode-streaming-links";
import { Source } from "@/types/anime/episode-streaming-links";
// import Hls from "hls.js";
import { Episode } from "@/types/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InfoWatch from "@/components/watch/info";
import Container from "@/components/layout/container";
import Comment from "@/components/comment";
import { MessageCircleMore } from "lucide-react";
import MoreLikeThis from "@/components/watch/more-like-this";
import { useSession } from "next-auth/react";
import { IoIosShareAlt } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { toggleFrame, selectFrame } from "@/hooks/slices/use-isframe";
import LikeEpisode from "@/components/like-episode";
import Iframe from 'react-iframe'

// const getDataFormatForPlayer = (videos: Source[]) => {
//   const rs = [];
//   for (const video of videos) {
//     if (video.isM3U8) {
//       rs.push({
//         label: video.quality,
//         url: video.url,
//       });
//     }
//   }
//   return rs;
// };

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
  const { data: session } = useSession();
  const router = useRouter();
  // const playerRef = useRef<HTMLVideoElement | null>(null);
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
            // <Player
            //   Hls={Hls}
            //   source={getDataFormatForPlayer(episodeStreaming.sources)}
            //   color="#FF0000"
            //   poster={animeInfo.image}
            //   className="w-full h-full"
            //   playerRef={playerRef}
            // />
            //           <video
            //   id="my-video"
            //   className="video-js"
            //   controls
            //   preload="auto"
            //   width="640"
            //   height="264"
            //   poster="MY_VIDEO_POSTER.jpg"
            //   data-setup="{}"
            // >
            //   {episodeStreaming.sources && <source src={episodeStreaming.sources[0].url} type="application/x-mpegURL" />}
            //   {/* <p className="vjs-no-js">
            //     To view this video please enable JavaScript, and consider upgrading to a
            //     web browser that
            //     <a href="https://videojs.com/html5-video-support/" target="_blank"
            //       >supports HTML5 video</a
            //     >
            //   </p> */}
            // </video>
            <Iframe url={episodeStreaming.headers.Referer}
              className="w-full aspect-video bg-gray-800 flex items-center justify-center"
              display="block"
              position="relative" />
          ) : (
            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center" />
          )}
          <h4 className="mt-5 mb-2">{formatEpisodeTitle(slug[1])}</h4>
          <div className="mt-2 flex gap-3">
            <Button onClick={() => dispatch(toggleFrame())} variant={"outline"}>
              {frame.message}
            </Button>
            {session?.user && <LikeEpisode userId={session.user.id} episodeId={slug[1]} />}
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              `${process.env.NEXT_PUBLIC_NEXT_ANIME_URL}${path.watch(slug[0], slug[1])}`
            )}&t=${slug[1]}`}>
              <Button className="rounded-full bg-cyan-700 hover:bg-cyan-500">
                <p className="mr-1">Share</p> <IoIosShareAlt />
              </Button>
            </Link>
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
