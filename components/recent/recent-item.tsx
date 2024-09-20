"use client";
import Link from "next/link";
import path from "@/utils/path";
import React from "react";
import { Title } from "@/types/utils";
import { getAnimeTitle } from "@/utils/constant";
import styles from "./recent-item.module.css";

interface RecentItemProps {
  title: Title;
  image: string;
  id: string;
  episodeId: string;
  episodeTitle: string;
}
export const RecentItem: React.FC<RecentItemProps> = ({
  title,
  image,
  id,
  episodeId,
  episodeTitle,
}) => {
  return (
    <Link href={path.watch(episodeId)} className={styles.card}>
      <img
        loading="lazy"
        src={image}
        alt={image}
        className={styles.imageCard}
      />
      <div className={styles.des}>
        <h4>{getAnimeTitle(title)}</h4>
        <p>{episodeTitle}</p>
      </div>
    </Link>
  );
};
