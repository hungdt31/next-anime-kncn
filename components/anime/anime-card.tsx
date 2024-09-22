"use client";
import path from "@/utils/path";
import Link from "next/link";
import React from "react";
import styles from "./anime-card.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getAnimeTitle } from "@/utils/constant";
import { Title } from "@/types/utils";

interface AnimeCardProps {
  title: Title;
  type: string;
  image: string;
  id: string;
  color: string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ image, title, id, color }) => {
  return (
    <Link href={path.anime(id)}>
      <div className={styles.card}>
        <LazyLoadImage
          src={image}
          width="100%"
          height="100%"
          effect="blur"
          alt={image}
          wrapperProps={{
            className: "transition duration-300 ease-in-out",
          }}
        />
        <div className={styles.info}>
          <h5
            style={{
              color: color,
            }}
          >
            {getAnimeTitle(title)}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
