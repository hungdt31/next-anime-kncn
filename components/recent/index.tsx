"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentAnime } from "@/data/anime";
import { AnimeCard } from "@/components/anime";
import Container from "@/components/layout/container";
import ErrorQuery from "../common/error-query";
import { SkeletonCards } from "../loading/skeleton";

export default function RecentAnime() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trend"],
    queryFn: () => getRecentAnime(),
  });
  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;
  return (
    <div className="">
      <Container title="Recent Episodes">
        {data?.map((anime: any) => (
          <AnimeCard
            key={anime.id}
            title={anime.title}
            type={anime.type}
            image={anime.image}
            id={anime.id}
            color={anime.color}
          />
        ))}
      </Container>
    </div>
  );
}
