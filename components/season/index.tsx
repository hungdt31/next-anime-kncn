"use client";
import { useState, useMemo } from "react";
import { getAnimeTitle, AllSeason as tabs } from "@/utils/constant";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowWidth } from '@react-hook/window-size'
import styles from "./index.module.css";
import Container from "../layout/container";
import { YearPickUp } from "./year-pick-up";
import { useMutation } from "@tanstack/react-query";
import { getAnimeSeason } from "@/data/anime";
import { useEffect } from "react";
import SeasonItem from "./season-item";
import ErrorQuery from "../common/error-query";
import { SkeletonCards } from "../loading/skeleton";
import { Shapes } from "lucide-react";
import { SearchAnime } from "@/types/anime/search";

export default function SeasonAnime() {
  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ["season"],
    mutationFn: ({ season, year, perPage }: { season: string; year: number; perPage: number }) =>
      getAnimeSeason(season, year, perPage)
  });

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [year, setYear] = useState(new Date().getFullYear());
  const onlyWidth = useWindowWidth()
  const mutationParams = useMemo(() => {
    if (!selectedTab) return null;
    if (onlyWidth > 1024) return { season: selectedTab.value, year, perPage: 9 };
    else if (onlyWidth > 768) return { season: selectedTab.value, year, perPage: 8 };
    else if (onlyWidth > 567) return { season: selectedTab.value, year, perPage: 6 };
    return { season: selectedTab.value, year, perPage: 5 };
  }, [selectedTab, year, onlyWidth]);


  useEffect(() => {
    if (mutationParams) {
      mutate(mutationParams);
    }
  }, [mutationParams]);

  return (
    <Container title="Collection" icon={Shapes}>
      <YearPickUp onChange={setYear} />
      <div className={styles.window}>
        <div className={styles.nav}>
          <ul className={styles.tabs}>
            {tabs.map((item) => (
              <li
                key={item.label}
                className={`${styles.tabItem} ${item === selectedTab ? styles.selected : ""
                  }`}
                onClick={() => setSelectedTab(item)}
              >
                {`${item.icon} ${item.label}`}
                {item === selectedTab ? (
                  <motion.div
                    className={styles.underline}
                    layoutId="underline"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        {isError ? <ErrorQuery /> : null}
        <div className={styles.main}>
          <AnimatePresence mode="wait">

            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:grid-cols-3"
            >
              {/* {selectedTab ? selectedTab.icon : "😋"} */}

              {isPending ? <SkeletonCards /> : null}
              {data?.map((anime: SearchAnime) => (
                <SeasonItem
                  color={anime.color}
                  key={anime.id}
                  title={getAnimeTitle(anime.title) || ""}
                  image={anime.image}
                  id={anime.id}
                  type={anime.type}
                  ep={anime.totalEpisodes}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}
