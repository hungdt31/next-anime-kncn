"use client";
import path from "@/utils/path";
import Link from "next/link";
import React from "react";
import styles from "./anime-card.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface AnimeCardProps {
  title: string;
  type: string;
  image: string;
  id: string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ image, title, id }) => {
  return (
    <Link href={path.anime(id)}>
      
      <div className={styles.card}>
      <div className="hover:scale-125 transition duration-300 ease-in-out w-full h-full">
        <LazyLoadImage
          src={image}
          width="100%"
          height="100%"
          effect="blur"
          alt={image}
        />
        </div>
        <div className={styles.info}>
          <p
            className={styles.title}
          >
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
