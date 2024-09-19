"use client";
import { useQuery } from "@tanstack/react-query";
import { getPopularAnime, getTrendingAnime } from "@/data/anime";
import { AnimeCard } from "@/components/anime";
import Container from "@/components/layout/container";
import { SkeletonCards } from "../loading/skeleton";
import ErrorQuery from "../common/error-query";

export default function PopularAnime() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular"],
    queryFn: () => getPopularAnime(),
  });
  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;
  return (
    <div className="">
      <Container title="Popular Anime">
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
