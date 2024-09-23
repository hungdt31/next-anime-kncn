"use client";
import { useQuery } from "@tanstack/react-query";
import { getAnimeMovies } from "@/data/anime";
import { AnimeCard } from "@/components/anime";
import Container from "@/components/layout/container";
import { SkeletonCards } from "../loading/skeleton";
import ErrorQuery from "../common/error-query";
import styles from "@/styles/cards.module.css";
import { Popcorn } from "lucide-react";
import { SearchAnime } from "@/types/anime/search";
import { getAnimeTitle } from "@/utils/constant";

export default function MovieAnime() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Movies"],
    queryFn: () => getAnimeMovies(),
  });
  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;
  return (
    <Container title="Anime Movie" icon={Popcorn}>
      <div className={styles.card}>
        {data?.map((anime: SearchAnime) => (
          <AnimeCard
            key={anime.id}
            title={getAnimeTitle(anime.title) || ""}
            type={anime.type}
            image={anime.image}
            id={anime.id}
          />
        ))}
      </div>
    </Container>
  );
}