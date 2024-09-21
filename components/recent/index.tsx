"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentAnime } from "@/data/anime";
import { AnimeCard } from "@/components/anime";
import Container from "@/components/layout/container";
import ErrorQuery from "../common/error-query";
import { SkeletonCards } from "../loading/skeleton";
import { RecentItem } from "./recent-item";
import { RecentEpisode } from "@/types/anime/recent-anime-episodes";
import { Cross } from "lucide-react";

export default function RecentAnime() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trend"],
    queryFn: () => getRecentAnime(),
  });
  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;
  return (
    <Container title="Recent Episodes" icon={Cross}>
      <div className="grid lg:grid-cols-4 gap-3 grid-cols-2 md:grid-cols-3">
        {data?.map((anime: RecentEpisode) => (
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
