"use client";
import path from "@/utils/path";
import Link from "next/link";
import React from "react";
import styles from "./anime-card.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import Image from "next/image";

interface AnimeCardProps {
  title: string;
  type?: string;
  image: string;
  id: string;
  isResponsive?: boolean; // Biến xác định việc có sử dụng responsive hay không
  isFixedWidth?: boolean; // Biến xác định việc có sử dụng chiều rộng cố định hay không
}

const AnimeCard: React.FC<AnimeCardProps> = ({
  image,
  title,
  id,
  isResponsive = true,
  isFixedWidth = true,
}) => {
  return (
    <Link href={path.anime(id)}>
      <div
        className={`${styles.card} ${isResponsive ? styles.responsive : ""} ${
          isFixedWidth ? styles.fixedWidth : ""
        }`}
      >
        <div className="hover:scale-125 transition duration-300 ease-in-out w-full h-full">
          <LazyLoadImage
            src={image}
            width="100%"
            height="100%"
            effect="blur"
            alt={image}
          />
          {/* <Image
            src={image}
            width={500}
            height={500}
            placeholder="blur"
            loading="lazy"
            alt={title}
            blurDataURL={image}
          /> */}
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
