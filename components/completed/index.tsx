"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompletedAnime } from "@/data/anime";
import { AnimeCard } from "@/components/anime";
import Container from "@/components/layout/container";
import { SkeletonCards } from "../loading/skeleton";
import ErrorQuery from "../common/error-query";
import styles from "@/styles/cards.module.css";
import { ListCheck } from "lucide-react";

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