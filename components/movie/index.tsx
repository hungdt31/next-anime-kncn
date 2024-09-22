"use client";
import { useQuery } from "@tanstack/react-query";
import { getAnimeMovies } from "@/data/anime";
import { AnimeCard } from "@/components/anime";
import Container from "@/components/layout/container";
import { SkeletonCards } from "../loading/skeleton";
import ErrorQuery from "../common/error-query";
import styles from "@/styles/cards.module.css";
import { ListCheck } from "lucide-react";

export default function MovieAnime() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Movies"],
    queryFn: () => getAnimeMovies(),
  });
  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;
  return (
    <Container title="Anime Movie" icon={ListCheck}>
      <div className={styles.card}>
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
      </div>
    </Container>
  );
}