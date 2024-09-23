"use client";
import { use, useState } from "react";
import { getAnimeTitle, AllSeason as tabs } from "@/utils/constant";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./index.module.css";
import Container from "../layout/container";
import { YearPickUp } from "./year-pick-up";
import { useMutation } from "@tanstack/react-query";
import { getAnimeSeason } from "@/data/anime";
import { useEffect } from "react";
import SeasonItem from "./season-item";
import ErrorQuery from "../common/error-query";
import { SkeletonCards } from "../loading/skeleton";
import { Mountain } from "lucide-react";

export default function SeasonAnime() {
  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ["season"],
    mutationFn: ({ season, year }: { season: string; year: number }) =>
      getAnimeSeason(season, year),
  });

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (selectedTab) {
      mutate({ season: selectedTab.value, year });
    }
  }, [selectedTab, year]);
  return (
    <Container title="Season Anime" icon={Mountain}>
      <YearPickUp onChange={setYear} />
      <div className={styles.window}>
        <div className={styles.nav}>
          <ul className={styles.tabs}>
            {tabs.map((item) => (
              <li
                key={item.label}
                className={`${styles.tabItem} ${
                  item === selectedTab ? styles.selected : ""
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
              {isError ? <ErrorQuery /> : null}
              {isPending ? <SkeletonCards /> : null}
              {data?.map((anime: any) => (
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
