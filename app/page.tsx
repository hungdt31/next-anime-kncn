"use client";
import RecentAnime from "@/components/recent";
import PopularAnime from "@/components/popular";
import Slider from "@/components/slider";
import CompletedAnime from "@/components/completed";
import MovieAnime from "@/components/movie";
import SeasonAnime from "@/components/season";
import Feedback from "@/components/discussion";

export default function Home() {
  return (
    <main>
      <Slider/>
      <RecentAnime />
      <PopularAnime />
      <CompletedAnime />
      <MovieAnime />
      <Feedback/>
      <SeasonAnime />
    </main>
  );
}
