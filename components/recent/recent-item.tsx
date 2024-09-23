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
      <LazyLoadImage
        src={image}
        alt={image}
        width="100%"
        height="100%"
        effect="blur"
        wrapperProps={{
          className: "transition duration-300 ease-in-out",
        }}
      />
      <CirclePlay className={styles.icon} />
      <div className={styles.des}>
        <h4>{getAnimeTitle(title)}</h4>
        <p className="font-thin">{episodeTitle}</p>
      </div>
    </Link>
  );
};
