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
  const [progress, setProgress] = useState(0); // State để theo dõi tiến trình
  const intervalDuration = 7000; // Thời gian chuyển đổi slide (7 giây)

  const startAutoChange = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (data ? (prevIndex + 1) % data.length : 0));
      setProgress(0); // Reset tiến trình khi chuyển đổi slide
    }, intervalDuration);
  };

  const stopAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Cập nhật progress
  useEffect(() => {
    if (data) {
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) return 0;
          return prevProgress + (100 / (intervalDuration / 100)); // Tăng dần phần trăm
        });
      }, 100); // Cập nhật mỗi 100ms

      return () => clearInterval(progressInterval);
    }
  }, [data, activeIndex]);

  // Start auto-change khi dữ liệu đã load
  useEffect(() => {
    if (data) {
      startAutoChange();
    }
    return () => stopAutoChange();
  }, [data]);

  // Restart auto-change khi activeIndex thay đổi
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
    setProgress(0); // Reset tiến trình khi chuyển slide
  };

  // Go to next slide
  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (data ? (prevIndex + 1) % data.length : 0));
    stopAutoChange();
    startAutoChange();
    setProgress(0); // Reset tiến trình khi chuyển slide
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
      {
        // Hiển thị các dots
        data && (
          <div className={styles.dots}>
            {data.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === activeIndex ? styles.active : ""
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  stopAutoChange();
                  startAutoChange();
                  setProgress(0); // Reset tiến trình khi chuyển slide
                }}
              ></button>
            ))}
          </div>
        )
      }
      {
        // Hiển thị thanh tiến trình
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      }
    </div>
  );
}
