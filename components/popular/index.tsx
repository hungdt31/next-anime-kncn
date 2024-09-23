"use client";
import { useQuery } from "@tanstack/react-query";
import { getPopularAnime } from "@/data/anime";
import { AnimeCard } from "@/components/anime";
import Container from "@/components/layout/container";
import { SkeletonCards } from "../loading/skeleton";
import ErrorQuery from "../common/error-query";
import styles from "@/styles/cards.module.css";
import { Component } from "lucide-react";
import { getAnimeTitle } from "@/utils/constant";
import type { PopularAnime } from "@/types/anime/popular";

export default function PopularAnime() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular"],
    queryFn: () => getPopularAnime(),
  });
  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;
  return (
    <Container title="Popular Anime" icon={Component}>
      <div className={styles.card}>
        {data?.map((anime: PopularAnime) => (
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
