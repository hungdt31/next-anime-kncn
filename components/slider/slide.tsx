"use client";
import React from "react";
import Link from "next/link";
import { BsFillPlayCircleFill, BsFillCalendarDateFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { GrStatusDisabledSmall } from "react-icons/gr";
import styles from "./index.module.css";
import { TrendingAnime } from "@/types/anime/trending";
import { getAnimeTitle } from "@/utils/constant";
import path from "@/utils/path";
import { GenresItem } from "../common/genres-item";
import { Button } from "../ui/button";
import { IoMdArrowDropright } from "react-icons/io";
import { cn } from "@/lib/utils";
import { ArrowBigRight, ArrowBigLeft } from "lucide-react";

interface SlideProps {
  tredingAnime: TrendingAnime;
  handleNextClick: () => void;
  handlePrevClick: () => void;
}

const Slide: React.FC<SlideProps> = ({ tredingAnime, handleNextClick, handlePrevClick }) => {
  return (
    <div
      className={cn(
        styles.slide,
        "lg:aspect-[3/1.2] md:aspect-[3/1.5] aspect-[1/1] w-full"
      )}
      style={{ backgroundImage: `url(${tredingAnime.cover})` }} // Using the inline style for background image
    >
      <div className="md:inline hidden">
        <div className={styles.circle}>
          <ArrowBigLeft
            size={40}
            onClick={handlePrevClick}
            className="absolute z-40 top-[50%] left-4 cursor-pointer"
          />
          <img src={tredingAnime.image} />
          <ArrowBigRight
            size={40}
            onClick={handleNextClick}
            className="absolute z-40 top-[50%] right-4 cursor-pointer"
          />
        </div>
      </div>
      <div className={styles.info}>
        <h3 style={{ color: tredingAnime?.color }}>
          {getAnimeTitle(tredingAnime.title)}
        </h3>
        <div className="flex items-center space-x-4 md:mt-4 mt-3">
          {tredingAnime?.type && (
            <p className="flex items-center space-x-2 text-sm">
              <BsFillPlayCircleFill />
              <span>{tredingAnime?.type}</span>
            </p>
          )}
          {tredingAnime?.duration && (
            <p className="flex items-center space-x-2 text-sm">
              <AiFillClockCircle />
              <span>{tredingAnime?.duration}</span>
            </p>
          )}
          {tredingAnime?.releaseDate && (
            <p className="flex items-center space-x-2 text-sm">
              <BsFillCalendarDateFill />
              <span>{tredingAnime?.releaseDate}</span>
            </p>
          )}
          {tredingAnime?.status && (
            <p className="flex items-center space-x-2 text-sm">
              <GrStatusDisabledSmall />
              <span>{tredingAnime?.status}</span>
            </p>
          )}
        </div>
        <div className={styles.genres}>
          {tredingAnime.genres?.map((genre, index) => (
            <GenresItem key={index} item={genre} />
          ))}
        </div>
        <div
          className={cn(styles.des,
            "lg:line-clamp-3 md:line-clamp-2 line-clamp-1")}
          dangerouslySetInnerHTML={{ __html: tredingAnime.description }}
        />
        <div className="space-x-4 flex items-center mt-5">
          <Link href={path.anime(tredingAnime?.id)}>
            <Button className="rounded-full flex items-center space-x-2">
              <BsFillPlayCircleFill className="md:text-sm text-lg" />
              <span className="font-semibold md:text-sm text-xs">
                Watch now
              </span>
            </Button>
          </Link>
          <Link href={path.anime(tredingAnime?.id)}>
            <Button
              className="rounded-full flex items-center space-x-2"
              variant={"secondary"}
            >
              <span className="font-semibold md:text-sm text-xs">Detail</span>
              <IoMdArrowDropright className="md:text-sm text-lg" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
