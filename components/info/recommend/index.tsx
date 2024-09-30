"use client";
import React from "react";
import { AnimeCard } from "@/components/anime";
import { getAnimeTitle } from "@/utils/constant";
import styles from "@/styles/info.module.css"
import Container from "@/components/layout/container";
import { ListVideo } from "lucide-react";
import { Recommendation } from "@/types/anime/info";

interface RelationProps {
  relationItems: Recommendation[] | undefined;
}
export default function RecommendForYou({ 
  relationItems 
}: RelationProps) {
  return (
    <Container title="Recommended for you" icon={ListVideo}>
    <div className={styles.cards}>
      {
        relationItems?.map((recommendItem: Recommendation, index: number) => {
          const image : string = recommendItem?.image as string
          return (
            <AnimeCard
              key={index}
              title={getAnimeTitle(recommendItem.title) || ""}
              id={recommendItem?.id ? recommendItem.id.toString() : ""}
              image={recommendItem.image}
              isResponsive={false}
              isFixedWidth={false}
            />
          )
        })
      }
    </div>
    </Container>
  );
}
