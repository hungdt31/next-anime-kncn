"use client";
import React from "react";
import { Relation as RelationItem } from "@/types/anime/info";
import { AnimeCard } from "@/components/anime";
import { getAnimeTitle } from "@/utils/constant";
import styles from "@/styles/info.module.css"
import Container from "@/components/layout/container";
import { ChevronRight } from "lucide-react";

interface RelationProps {
  relationItems: RelationItem[] | undefined;
}
export default function Relation({ 
  relationItems 
}: RelationProps) {
  return (
    <Container title="Relations for anime" icon={ChevronRight}>
    <div className={styles.cards}>
      {
        relationItems?.map((relationItem: RelationItem, index: number) => {
          return (
            <AnimeCard
              key={index}
              title={getAnimeTitle(relationItem.title) || ""}
              id={relationItem?.id ? relationItem.id.toString() : ""}
              image={relationItem.image}
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
