"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompletedAnime } from "@/data/anime";
import { AnimeCard } from "@/components/anime";
import Container from "@/components/layout/container";
import { SkeletonCards } from "../loading/skeleton";
import ErrorQuery from "../common/error-query";
import styles from "@/styles/cards.module.css";
import { ListCheck } from "lucide-react";
import { SearchAnime } from "@/types/anime/search";
import { getAnimeTitle } from "@/utils/constant";

export default function CompletedAnime() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Completed"],
    queryFn: () => getCompletedAnime(),
  });
  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;
  return (
    <Container title="Completed Anime" icon={ListCheck}>
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
