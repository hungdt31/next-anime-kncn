"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentAnime } from "@/data/anime";
import Container from "@/components/layout/container";
import ErrorQuery from "../common/error-query";
import { SkeletonCards } from "../loading/skeleton";
import { RecentItem } from "./recent-item";
import { RecentEpisode } from "@/types/anime/recent-anime-episodes";
import { Cross } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useWindowWidth } from "@react-hook/window-size";

export default function RecentAnime() {
  const onlyWidth = useWindowWidth();
  const [recentAnime, setRecentAnime] = useState<RecentEpisode[]>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recent"],
    queryFn: () => getRecentAnime(),
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (onlyWidth > 1024) return data;
    if (onlyWidth > 768) return data.slice(0, 9);
    if (onlyWidth > 567) return data.slice(0, 8);
    return data.slice(0, 6);
  }, [data, onlyWidth]);

  useEffect(() => {
    setRecentAnime(filteredData);
  }, [filteredData]);

  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;

  return (
    <Container title="Recent Episodes" icon={Cross}>
      <div className="grid lg:grid-cols-4 gap-3 grid-cols-2 md:grid-cols-3">
        {recentAnime?.map((anime: RecentEpisode) => (
          <RecentItem
            key={anime.id}
            image={anime.image}
            title={anime.title}
            id={anime.id}
            episodeId={anime.episodeId}
            episodeTitle={anime.episodeTitle}
          />
        ))}
      </div>
    </Container>
  );
}
