"use client";
import Link from "next/link";
import path from "@/utils/path";
import React from "react";
import { Title } from "@/types/utils";
import { getAnimeTitle } from "@/utils/constant";
import styles from "./recent-item.module.css";
import { CirclePlay } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  episodeId,
  episodeTitle,
}) => {
  return (
    <Link href={path.watch(episodeId)} className={styles.card}>
      <div className={styles.component}>
        <LazyLoadImage
          src={image}
          alt={image}
          width="100%"
          height="100%"
          effect="blur"
        />
      </div>
      <CirclePlay className={styles.icon} />
      <div className={styles.des}>
        <p className={styles.title}>{getAnimeTitle(title)}</p>
        <p className="font-thin text-[0.8rem]">{episodeTitle}</p>
      </div>
    </Link>
  );
};
