"use client";
import { useState, useEffect, useRef } from "react";
import { getTrendingAnime } from "@/data/anime";
import Slide from "./slide";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCards } from "../loading/skeleton";
import ErrorQuery from "../common/error-query";
import styles from "./index.module.css";

export default function Slider() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trending"],
    queryFn: () => getTrendingAnime(),
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoChange = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (data ? (prevIndex + 1) % data.length : 0));
    }, 7000); // Change slide every 7 seconds
  };

  const stopAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start auto-change when data is loaded
  useEffect(() => {
    if (data) {
      startAutoChange();
    }
    return () => stopAutoChange();
  }, [data]);

  // Restart auto-change when activeIndex changes
  useEffect(() => {
    stopAutoChange();
    startAutoChange();
  }, [activeIndex, data]);

  // Go to previous slide
  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      data ? (prevIndex - 1 + data.length) % data.length : 0
    );
    stopAutoChange();
    startAutoChange();
  };

  // Go to next slide
  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (data ? (prevIndex + 1) % data.length : 0));
    stopAutoChange();
    startAutoChange();
  };

  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;

  return (
    <div className={styles.slider}>
      {data && (
        <Slide
          tredingAnime={data[activeIndex]}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          key={data[activeIndex]?.id}
        />
      )}
    </div>
  );
}
